import {ASSETS} from './assets.js';
export const DURATION=2400000;
export function phase(start,now=Date.now()){return start===null?'waiting':now<start+DURATION?'running':'ended'}
const initial=()=>({sessionId:'initial',start:null,phase:'waiting',deadline:null,remainingMs:DURATION});
export function normalize(data){if(data?.schema===2)return data;const start=data?.start??null;return {schema:2,revision:0,timeline:[{at:0,...initial()},...(start===null?[]:[{at:start,sessionId:'legacy-'+start,start,phase:'running',deadline:start+DURATION,remainingMs:DURATION}])]}}
export function project(data,at=Date.now()){
 const timeline=normalize(data).timeline;let entry={at:0,...initial()};for(const item of timeline){if(item.at<=at)entry=item;else break}
 const currentPhase=entry.phase==='running'&&at>=entry.deadline?'ended':entry.phase;
 const remainingMs=entry.phase==='running'?Math.max(0,entry.deadline-at):entry.phase==='stopped'?0:entry.remainingMs;
 return {...entry,phase:currentPhase,remainingMs,now:at,revision:normalize(data).revision};
}
export function transition(data,action,now=Date.now()){
 const model=normalize(data),s=project(model,now);let next;
 if(action==='start'&&s.phase==='waiting')next={...s,sessionId:s.sessionId==='initial'?crypto.randomUUID():s.sessionId,start:now,phase:'running',deadline:now+DURATION,remainingMs:DURATION};
 else if(action==='pause'&&s.phase==='running')next={...s,phase:'paused',deadline:null};
 else if(action==='resume'&&s.phase==='paused')next={...s,phase:'running',deadline:now+s.remainingMs};
 else if(action==='stop'&&['running','paused'].includes(s.phase))next={...s,phase:'stopped',deadline:now,remainingMs:0};
 else if(action==='reset')next={...initial(),sessionId:crypto.randomUUID()};
 else return null;
 delete next.now;delete next.revision;
 return {...model,revision:model.revision+1,timeline:[...model.timeline,{...next,at:now,action}]};
}
export function classify(s){return s.phase==='waiting'?'before-start':s.phase==='paused'?'paused':s.phase==='running'?'on-time':'late'}

const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'none'"};
const json=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{...headers,'Content-Type':'application/json'}});
function equal(a,b){if(typeof a!=='string'||typeof b!=='string')return false;let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0}
export async function validSignature(raw,signature,secret){if(!secret||!signature)return false;const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);const bytes=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(raw));return equal(signature,'sha256='+Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join(''))}
async function readModel(env){const object=await env.BUCKET.get('event.json');return {model:normalize(object?await object.json():null),etag:object?.etag};}
async function state(env,at=Date.now()){const {model}=await readModel(env);return project(model,at);}
async function change(env,action){for(let attempt=0;attempt<6;attempt++){const {model,etag}=await readModel(env);const next=transition(model,action);if(!next)return {error:'This action is unavailable in the current state.',state:project(model)};const condition=etag?{'If-Match':'\"'+etag+'\"'}:{'If-None-Match':'*'};const saved=await env.BUCKET.put('event.json',JSON.stringify(next),{onlyIf:new Headers(condition)});if(saved)return project(next);}return {error:'Another organiser changed the event. Refresh and try again.'};}
export default {async fetch(request,env){try{
const path=new URL(request.url).pathname,method=request.method;
if(path==='/api/state'&&method==='GET'){const rawAt=new URL(request.url).searchParams.get('at');const at=rawAt===null?Date.now():Number(rawAt);if(!Number.isFinite(at)||at<0||at>Date.now()+60000)return json({error:'Invalid event timestamp'},400);return json(await state(env,at));}
if(path==='/api/problems'&&method==='GET'){if((await state(env)).phase==='waiting')return json({error:'Problems are locked until the organiser starts the event.'},423);return json(JSON.parse(env.PROBLEMS_JSON))}
if(path.startsWith('/api/admin/')){
 if(!env.ADMIN_TOKEN||env.ADMIN_TOKEN.length<24||!equal(request.headers.get('Authorization'),'Bearer '+env.ADMIN_TOKEN))return json({error:'Organiser authentication required'},401);
 if(method==='POST'&&/^\/api\/admin\/(start|pause|resume|stop|reset)$/.test(path)){
  const action=path.split('/').at(-1);
  if(action==='start'){const problems=JSON.parse(env.PROBLEMS_JSON);if(!Array.isArray(problems)||problems.length!==3)throw Error('Invalid private problem configuration');}
  const result=await change(env,action);return json(result,result.error?409:200);
 }
 if(path==='/api/admin/history'&&method==='GET')return json((await readModel(env)).model);
 if(path==='/api/admin/submissions'&&method==='GET'){
  const rows=[];let cursor;do{const page=await env.BUCKET.list({prefix:'deliveries/',cursor});for(const obj of page.objects){rows.push(await (await env.BUCKET.get(obj.key)).json())}cursor=page.truncated?page.cursor:undefined}while(cursor);rows.sort((a,b)=>a.received-b.received);return json(rows);
 }
 return json({error:'Unknown organiser action'},404);
}
if(path==='/api/github/webhook'&&method==='POST'){
 if(Number(request.headers.get('Content-Length')||0)>1048576)return json({error:'Payload too large'},413);
 const raw=await request.text();if(raw.length>1048576)return json({error:'Payload too large'},413);
 if(!await validSignature(raw,request.headers.get('X-Hub-Signature-256'),env.GITHUB_WEBHOOK_SECRET))return json({error:'Invalid signature'},401);
 const payload=JSON.parse(raw),delivery=request.headers.get('X-GitHub-Delivery'),event=request.headers.get('X-GitHub-Event');
 if(payload.repository?.full_name!==(env.GITHUB_REPOSITORY||'Unlock-Her-Tech/problem-solving-challenge')||!delivery||!/^[-a-zA-Z0-9]+$/.test(delivery))return json({error:'Invalid repository or delivery'},400);
 if(event==='ping')return json({ok:true});
 if(event!=='pull_request'||!['opened','synchronize','reopened'].includes(payload.action))return json({ignored:true});
 const key='deliveries/'+delivery+'.json',existing=await env.BUCKET.get(key);if(existing)return json(await existing.json());
 const s=await state(env),received=Date.now(),pr=payload.pull_request;
 const status=classify(s);
 const row={id:delivery,received,pr:pr.number,sha:pr.head.sha,status,sessionId:s.sessionId};
 const saved=await env.BUCKET.put(key,JSON.stringify(row),{onlyIf:new Headers({'If-None-Match':'*'})});
 if(saved&&env.GITHUB_TOKEN){const response=await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY||'Unlock-Her-Tech/problem-solving-challenge'}/issues/${pr.number}/labels`,{method:'POST',headers:{Authorization:'Bearer '+env.GITHUB_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json','User-Agent':'UnlockHerTech-Challenge'},body:JSON.stringify({labels:[status]})});if(!response.ok)console.error('Label update failed',response.status)}
 return json(row);
}
if(method==='GET'&&ASSETS[path]){const asset=ASSETS[path];return new Response(asset.base64?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body,{headers:{...headers,'Content-Type':asset.type}})}
return json({error:'Not found'},404);
}catch(e){console.error('Challenge request failed:',e.message);return json({error:'Service unavailable. Ask the organiser to check configuration.'},503)}}};

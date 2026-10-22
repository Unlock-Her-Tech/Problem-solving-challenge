import {ASSETS} from './assets.js';
export const DURATION=2400000;
export function phase(start,now=Date.now()){return start===null?'waiting':now<start+DURATION?'running':'ended'}
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'none'"};
const json=(v,status=200)=>new Response(JSON.stringify(v),{status,headers:{...headers,'Content-Type':'application/json'}});
function equal(a,b){if(typeof a!=='string'||typeof b!=='string')return false;let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0}
export async function validSignature(raw,signature,secret){if(!secret||!signature)return false;const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);const bytes=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(raw));return equal(signature,'sha256='+Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join(''))}
async function state(env){const object=await env.BUCKET.get('event.json');const start=object?(await object.json()).start:null;return {start,deadline:start===null?null:start+DURATION,now:Date.now(),phase:phase(start)}}
export default {async fetch(request,env){try{
const path=new URL(request.url).pathname,method=request.method;
if(path==='/api/state'&&method==='GET')return json(await state(env));
if(path==='/api/problems'&&method==='GET'){if((await state(env)).phase==='waiting')return json({error:'Problems are locked until the organiser starts the event.'},423);return json(JSON.parse(env.PROBLEMS_JSON))}
if(path.startsWith('/api/admin/')){
 if(!env.ADMIN_TOKEN||env.ADMIN_TOKEN.length<24||!equal(request.headers.get('Authorization'),'Bearer '+env.ADMIN_TOKEN))return json({error:'Organiser authentication required'},401);
 if(path==='/api/admin/start'&&method==='POST'){
  const problems=JSON.parse(env.PROBLEMS_JSON);if(!Array.isArray(problems)||problems.length!==3)throw Error('Invalid private problem configuration');
  // Atomic create-if-absent: duplicate and concurrent starts cannot reset time.
  await env.BUCKET.put('event.json',JSON.stringify({start:Date.now()}),{onlyIf:new Headers({'If-None-Match':'*'})});
  return json(await state(env));
 }
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
 const status=s.start===null?'before-start':received>=s.deadline?'late':'on-time';
 const row={id:delivery,received,pr:pr.number,sha:pr.head.sha,status};
 const saved=await env.BUCKET.put(key,JSON.stringify(row),{onlyIf:new Headers({'If-None-Match':'*'})});
 if(saved&&env.GITHUB_TOKEN){const response=await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY||'Unlock-Her-Tech/problem-solving-challenge'}/issues/${pr.number}/labels`,{method:'POST',headers:{Authorization:'Bearer '+env.GITHUB_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json','User-Agent':'UnlockHerTech-Challenge'},body:JSON.stringify({labels:[status]})});if(!response.ok)console.error('Label update failed',response.status)}
 return json(row);
}
if(method==='GET'&&ASSETS[path]){const asset=ASSETS[path];return new Response(asset.body,{headers:{...headers,'Content-Type':asset.type}})}
return json({error:'Not found'},404);
}catch(e){console.error('Challenge request failed:',e.message);return json({error:'Service unavailable. Ask the organiser to check configuration.'},503)}}};

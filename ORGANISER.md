# Organiser guide

## What is implemented

- Participant page and password-protected organiser API at `/admin`.
- One shared 40-minute session stored durably on the server.
- Atomic one-time Start; double clicks or concurrent starts cannot reset it.
- Server-only question release; `/api/problems` returns HTTP 423 before Start.
- Signed GitHub webhook receiver and authenticated JSON log export.
- Optional automatic GitHub labels when a repository token is configured.

The event date has deliberately not been guessed. Questions stay locked indefinitely until you press Start. There is no public reset route. Do not test Start on the real event instance: use a local preview or a separate deployment instead.

## Hosting

The hosted version runs `worker/index.js` with `worker/assets.js` on Cloudflare Workers through Sites. Bind a private R2 bucket as `BUCKET`. Store runtime secrets separately:

| Variable | Purpose |
| --- | --- |
| `ADMIN_TOKEN` | At least 24 random characters; organiser only |
| `PROBLEMS_JSON` | Private JSON array of the three problems |
| `GITHUB_WEBHOOK_SECRET` | Random secret also entered in GitHub webhook settings |
| `GITHUB_TOKEN` | Optional repository-scoped token with Issues read/write for labels |
| `GITHUB_REPOSITORY` | `Unlock-Her-Tech/problem-solving-challenge` |

Each problem is an object with `id`, `title`, `marks`, and `statement`. Keep statements, answers, grading tests, and organiser credentials outside the public repository and its history. The server has no endpoint for listing bucket objects publicly. Never place the problem JSON in public assets or an environment variable exposed to frontend builds.

Runtime secrets must be applied through the hosting service, followed by deployment. The supplied hosted deployment has its problem secret configured separately. The organiser password is delivered separately, never in this repository. Losing it requires changing the server secret, not a public password reset.

## Local preview and tests

Requires Node.js 24 or later. There are no third-party runtime dependencies.

```sh
npm test
```

To preview, copy `.env.example` to an ignored `.env` and set `ADMIN_TOKEN` plus `PROBLEMS_FILE` to an absolute path **outside the repo**. Use dummy questions for rehearsals. Then:

```sh
node --env-file=.env server.mjs
```

Open `http://127.0.0.1:3000` and `/admin`. Local data is in ignored `data/`. It is separate from production. For externally accessible self-hosting, use HTTPS, set `HOST=0.0.0.0`, and persist `DATA_DIR` across restarts. Do not expose the organiser password over HTTP.

If you edit files in `public/`, regenerate `worker/assets.js` before deployment; it is an embedded copy of those assets. The hosted Worker entry must bundle the two modules or inline the assets. This public repository does not contain the Sites project identity or its source credentials.

## Default automatic tracking: GitHub Actions

The committed `.github/workflows/deadline.yml` runs on PR open, reopen, and branch updates in the base repository. It reads only event metadata and the public timer state; it never checks out or executes participant code. It creates cumulative labels and appends an audit comment with the submitted SHA, GitHub workflow creation time, and deadline. No separately configured GitHub token or webhook is required for this default mode.

Verify Actions is enabled in the base repository, then run **Submission deadline → Run workflow** to check connectivity without starting the event. If organisational policy blocks Actions or write permissions, fix that before the event or announce manual timing review. Watch failed runs; a missing comment is not proof of an on-time submission. Reruns retain the original run creation time, and repeat comments identify their run/attempt. Do not interpret them as new submissions.

For grading, use the last on-time SHA from the PR audit comments. Webhook export is empty unless you additionally configure the optional integration below. The workflow intentionally adds flags/comments rather than failing the job for lateness.

## Optional: connect signed-webhook tracking

This requires an organisation/repository administrator and runtime secret configuration. It is **not enabled by merely forking the repository**.

1. Generate a webhook secret. Configure it as server secret `GITHUB_WEBHOOK_SECRET`.
2. In the base repository's **Settings → Webhooks → Add webhook**, enter the hosted origin followed by `/api/github/webhook`, choose `application/json`, enter the matching secret, enable SSL verification, and subscribe to **Pull requests**. Do not select a participant's fork.
3. For visible labels, create labels `on-time`, `late`, and `before-start`. Configure `GITHUB_TOKEN` with access only to this repository and Issues read/write. Logging works without this optional token; automatic GitHub labels do not.
4. Redeploy after adding runtime secrets. Verify the GitHub webhook ping succeeds. Rehearse an opened PR and a push against a separate test instance, checking its exported log. Do not start the real event to rehearse.
5. Keep GitHub's webhook delivery history available. Failed deliveries need investigation and redelivery; the app does not silently infer missing events.

No participant code is checked out or executed by the webhook service. It trusts only authenticated GitHub payloads for the configured repository. Repeated delivery IDs are ignored. Missing label permissions do not lose the saved submission log; inspect hosting logs for label failures. Labels are informational; use the full log for grading.

The receiver records **arrival time**. Network/GitHub delays mean it cannot prove the exact push time, and it cannot automatically capture a deadline version when an earlier webhook is missing. Announce this limitation and resolve disputed flags manually from GitHub delivery evidence. Do not use user-authored Git commit times as proof.

## On the day

1. Verify the participant page says waiting and questions remain locked. Confirm workflow connectivity and organiser password work without pressing Start.
2. Ask everyone to fork, create a submission branch, disable AI tools, and select Individual or Team (max two).
3. Explain the marking, rules, documentation policy, receipt-time deadline, and separate rankings.
4. Open `/admin`, enter your organiser password, and press **Start the challenge**, then confirm the start prompt. All three questions become visible immediately.
5. Ask participants to open PRs early and push frequently. Share the absolute deadline displayed by `/api/state` if needed; its timestamps are Unix milliseconds.
6. At zero, announce Time's up. No manual Stop is required. The original server deadline remains fixed across deployments and refreshes as long as its bucket is retained.
7. Read the PR audit comments (or download the optional webhook submission log from `/admin`). For each PR, select the latest entry marked `on-time` and its SHA. A PR containing only `before-start` or `late` entries needs manual review. Check for failed or delayed deliveries before finalising grades.
8. Review the selected version, run the participant's documented tests in an isolated environment, and apply the rubric. Do not run untrusted code with organiser secrets or write tokens.

The questions are public once released and cannot be made secret again by hiding the page. For another event, use new questions and a fresh deployment/storage namespace. Preserve this event's logs and deadline for audit.

# Organiser guide

Participant page: https://unlockhertech-problemsolving.netlify.app

Organiser page: https://unlockhertech-problemsolving.netlify.app/admin

## Unlock the controls

Enter the organiser password and press **Unlock controls**. This authenticates you without changing the live event. The password is delivered separately; it is never included in this repository. It stays in memory only while the page is open. **Lock controls** removes it from the page's memory. Server authentication is required for every control, history request and log export.

## Timer controls

| Control | When available | What it does |
| --- | --- | --- |
| Start challenge | Waiting | Reveals all three questions and starts 40 minutes for everyone |
| Pause | Running | Freezes the remaining time for everyone |
| Resume | Paused | Continues with exactly the time remaining; the deadline moves accordingly |
| Stop session | Running or paused | Ends the current session immediately; later submissions are late |
| Reset to 40:00 | Any state | Creates a fresh session, restores 40 minutes and locks the questions again |

Start, Stop and Reset ask for confirmation. All participant pages update automatically, normally within one second. Pause does not hide already released questions. Ask everyone to stop coding while paused; submissions during a pause are flagged for review. Stop leaves questions visible for reviewing. Reset replaces the displayed questions with the locked screen on connected pages and locks the problem API. A page refresh or device clock change cannot control the official timer.

You can now start, explore, stop and reset when rehearsing. **The actual questions become visible to anyone with the participant link when you Start. Reset cannot erase screenshots, copied questions or other knowledge.** Use a separate local instance with dummy questions for a private rehearsal. If participants have seen the real questions before a competitive event, use a new question set for fairness.

The event date is not guessed and no automatic release is scheduled. You choose when to start. A stopped or expired session cannot resume; Reset prepares a fresh one.

## Session history and grading

Every control change is recorded with its timestamp. Reset creates a new session ID without deleting earlier timing history or optional webhook records. Download **timer history** for the complete timeline and **submission log** for signed-webhook records, if that optional integration is configured.

The default `.github/workflows/deadline.yml` queries the server state **at GitHub's workflow creation timestamp**. This accounts for pauses, resumes, early stops and resets, even if the job runs later. PR comments include the session ID and submitted SHA. For each participant, grade the latest `on-time` SHA from the intended session. Old comments and cumulative labels are kept, so do not mistake a previous rehearsal for the live event.

Labels are `before-start`, `on-time`, `paused`, and `late`. Submissions during a pause need organiser review. A failed or missing workflow needs investigation; a missing comment is not proof of an on-time submission. GitHub event delivery delays can affect borderline flags. Review disputed cases manually rather than trusting author-editable commit timestamps.

The workflow never checks out or executes participant code with its write token. It uses only PR metadata and the public timer API. A manual workflow dispatch checks connectivity without starting or changing the event. Organisation Actions restrictions can prevent it from running; verify the repository’s Actions policy before the session.

## Event-day checklist

1. Confirm the page says **Waiting to start**, shows **40:00**, and the questions are locked. If you previously rehearsed, Reset and check this state before inviting participants.
2. Ask participants to fork, prepare their language tools, disable AI tools, and select Individual or Team (maximum two).
3. Explain the rules, marking, separate rankings and pause policy. Ask participants to open PRs early and push frequently.
4. Unlock the organiser controls and press **Start challenge** when everyone is ready.
5. Use **Pause** if the session needs to pause for everyone. Use **Resume** when everyone is ready again.
6. At zero or after **Stop session**, announce time is up. Review PR audit comments and the intended session ID before grading.
7. Download the timer history for your records. Reset only when preparing another session. Existing labels and audit comments are retained.

## Hosting and private questions

Netlify hosts the public pages and proxies `/api/*` to the existing durable backend. Keep that backend running: it protects the questions and stores the official timer timeline. Moving the frontend does not reset state. The backend uses a private R2 bucket bound as `BUCKET`, with conditional writes to prevent concurrent controls from overwriting each other. Existing one-time timer records are migrated when read, preserving the previous start and deadline.

The frontend is in `public/`. `worker/assets.js` embeds the same files for the backend fallback pages. Regenerate this module when editing frontend assets, then build the hosted worker. Netlify’s separate upload bundle contains only static assets and proxy rules; it must never contain private questions, answers or passwords. Do not expose the bucket publicly.

Store these runtime values outside version control:

| Variable | Purpose |
| --- | --- |
| `ADMIN_TOKEN` | At least 24 random characters; organiser only |
| `PROBLEMS_JSON` | Private array of three problem objects: `id`, `title`, `marks`, `statement` |
| `GITHUB_WEBHOOK_SECRET` | Optional signed-webhook shared secret |
| `GITHUB_TOKEN` | Optional token with repository Issues read/write for webhook labels |
| `GITHUB_REPOSITORY` | `Unlock-Her-Tech/problem-solving-challenge` |

The default GitHub Actions tracking does not require the optional token or webhook. If you add secrets, redeploy the backend to apply them. No endpoint reveals private configuration before release. `/api/state?at=UNIX_MILLISECONDS` provides historical timer state for auditing, without exposing question text.

## Optional signed webhook

1. Set the backend secret `GITHUB_WEBHOOK_SECRET` and deploy.
2. In the base repository **Settings → Webhooks**, add the public origin plus `/api/github/webhook`, choose JSON, enter the same secret, enable SSL verification, and subscribe to **Pull requests**.
3. To add labels from this integration, create the four labels above and configure the optional repository token. Logging does not require that token.
4. Verify the ping, then rehearse on a separate instance using dummy questions. Inspect delivery failures and manually redeliver if necessary.

Webhook records use server receipt time, include the session ID, and deduplicate retries. Network delays and missing deliveries require manual review. They are separate from the default workflow's PR audit comments.

## Local rehearsal

Requires Node.js 24 or later; there are no third-party runtime dependencies.

```sh
npm test
```

Copy `.env.example` to ignored `.env`, set `ADMIN_TOKEN`, and set `PROBLEMS_FILE` to an absolute private JSON file outside the repository. Use dummy statements when rehearsing.

```sh
node --env-file=.env server.mjs
```

Open `http://127.0.0.1:3000/admin`. Local `data/` is independent of production. Test Start → Pause → Resume → Stop → Reset. Keep persistent local data if you need its history. For self-hosting, use HTTPS and persist the data directory across restarts.

Do not run untrusted submissions in an environment containing organiser credentials or write tokens.

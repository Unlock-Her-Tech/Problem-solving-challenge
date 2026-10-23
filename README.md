# Unlock Her Tech · Problem Solving Challenge

A **40-minute data structures challenge** for junior-to-mid engineers. Work individually or in a **team of two maximum**, using any programming language. Individual and team entries are ranked separately.

**Challenge page:** https://unlockhertech-problemsolving.netlify.app

The organiser presses Start on the event day. Until then, the three problem statements stay on the server and are inaccessible through this repository or the participant page. There is no automatic calendar release. Do not wait for a file to appear in your fork: read the problems on the challenge page.

## Before the event

1. Sign in to GitHub and **fork this repository** into your own account.
2. Clone your fork, then create a branch:
   ```sh
   git clone https://github.com/YOUR-USERNAME/problem-solving-challenge.git
   cd problem-solving-challenge
   git switch -c submission
   ```
3. Check that your editor, compiler/interpreter, Git, and language test tools work. Disable AI autocomplete, AI chat, agents, and AI extensions.
4. Decide whether you are entering individually or as a team. A team shares one fork and one PR. Both members must be named.
5. Open the challenge page and wait for the organiser. You do not need to install or run this repository's timer application to participate.

You may prepare your language tooling, empty files, and a test framework before the start. Do not prepare solutions to the announced topics in the submission branch. Normal non-AI editor autocomplete and official language documentation are allowed. Searching for existing solutions, copying code, or getting outside help is prohibited.

## During the 40 minutes

All three questions appear together when the organiser starts. You can attempt them in any order; partial solutions earn partial credit.

| Folder | Topic | Maximum marks |
| --- | --- | ---: |
| `solutions/challenge-1/` | Hash map | 25 |
| `solutions/challenge-2/` | Recursion with nested data | 30 |
| `solutions/challenge-3/` | Sliding window | 45 |

Put each solution and its tests in the matching folder. Use any language and a clear, idiomatic function signature as specified by each problem. Include a short `README.md` in every attempted folder containing:

- Language and version, dependencies, and exact commands to run the solution and tests.
- Your approach and time/space complexity.
- Tests covering normal cases and edge cases.
- Any incomplete parts or assumptions.

Do not change the timer, event configuration, server code, or challenge instructions in your submission. Such edits cannot change the official hosted deadline.

## Submit a pull request

Commit and push frequently; allow time for uploads and creating the PR. Only pushing to your fork is **not** a submission.

```sh
git add solutions/
git commit -m "Add challenge solutions"
git push -u origin submission
```

On GitHub, select **Contribute → Open pull request** from your fork, or use **Compare & pull request**. Check these targets:

- Base repository: `Unlock-Her-Tech/problem-solving-challenge`
- Base branch: `main`
- Head repository: your fork; compare branch: `submission`
- Title: `Individual: Your Name` or `Team: Your Team Name`

Complete the PR template, including both members for a team and the no-AI declaration. Open one PR per individual/team, ideally early in the session. Later pushes to the same branch update that PR. Do not merge your PR; organisers review submissions after the session.

## Deadline and fairness

The server manages 40 minutes of active challenge time. The organiser can pause everyone’s countdown, resume with the same time remaining, stop early, or reset to a new locked session. Refreshing, changing your device clock, joining late, or running your own copy does not extend your time. If connectivity fails, the server state still applies; the page warns when its clock is stale.

At zero, or when the organiser stops the session, stop editing and pushing. During a pause, stop working until the organiser resumes. The page keeps the questions visible for review. The timer cannot stop local coding or detect all AI use. Participants must be able to explain their work, and organisers may request a short walkthrough.

The base repository's **Submission deadline** GitHub Actions workflow records PR openings, reopenings, and branch updates, including their commit SHA. It adds an audit comment and an `on-time`, `late`, `paused`, or `before-start` label. Opening a PR early does not exempt later pushes. Labels are cumulative: a PR may have both `on-time` and `late`. Organisers grade the latest on-time SHA from the intended session in the audit comments, not a later PR head. A reset creates a new session ID; old audit comments and labels are retained. Updates during a pause are flagged `paused` for organiser review.

Timing uses GitHub's workflow creation time and the server’s historical session state at that instant, never editable commit timestamps. Later pauses, resumes, stops or resets do not retrospectively change an older submission’s classification. GitHub delivery delays can flag last-second updates late, so push well before zero. Failed or missing workflow runs and disputed flags require organiser review. The audit is not a guaranteed exact-deadline snapshot. An optional signed-webhook integration is also available; its log is separate from the default workflow comments.

Public forks and PRs expose code. Do not view or copy other submissions during the event. Individual and team rankings are separate; maximum two people in a team.

## Rules

- **No AI assistance**, including AI chat tools, AI autocomplete, agents, and generated solutions.
- No copying another submission, solution website, or undisclosed third-party code.
- Communicate only with your teammate and the organiser during the session.
- Official language documentation and normal non-AI editor autocomplete are allowed.
- Give the organiser credit for attempted work even if a solution is unfinished; explain what remains.
- Never include secrets, personal documents, or credentials in your fork or PR.

## Marking

Each problem uses 70% correctness, 20% efficiency, and 10% explanation. Organisers may award fractional marks.

| Topic | Correctness | Efficiency | Explanation | Total |
| --- | ---: | ---: | ---: | ---: |
| Hash map | 17.5 | 5 | 2.5 | 25 |
| Recursion | 21 | 6 | 3 | 30 |
| Sliding window | 31.5 | 9 | 4.5 | 45 |

A correct but slower implementation can earn correctness credit. For the recursion problem, recursive processing is part of the efficiency/approach criteria. Clear runnable code, meaningful tests, and an honest explanation make review easier. Equal totals share a rank; submission speed is not a tiebreaker within the allowed time.

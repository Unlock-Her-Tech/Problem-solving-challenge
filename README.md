# Unlock Her Tech · Problem Solving Challenge

**90 minutes · Any programming language · Solo followed by random teams of three**

[Live challenge and shared timer](https://unlockhertech-problemsolving.netlify.app)

| Elapsed time | Activity |
| --- | --- |
| 00:00–00:15 | Welcome, facilitator introductions and setup check |
| 00:15–00:45 | Phase 1 · Individual challenge |
| 00:45–00:50 | Individual PR submission window |
| 00:50–01:20 | Phase 2 · Team challenge in random breakout rooms of three |
| 01:20–01:25 | Team PR submission window |
| 01:25–01:30 | Wrap-up, Q&A and award timeline announcement |

## Before the challenge

1. Fork and clone this repository. If you already have a fork, sync its `main` before creating your submission branches.
2. Check that your editor and language tools work. Disable AI chat, agents and AI autocomplete before the welcome check. Official language documentation and non-AI editor autocomplete are allowed.
3. Open the live page. Each problem unlocks at the beginning of its coding phase. Follow the organiser's pause, resume and stop instructions.

## Solve and submit

| Track | Base for your branch | Folder | Pull request |
| --- | --- | --- | --- |
| Problem 1 (Solo) | Up-to-date fork `main` | [solutions/individual/](solutions/individual/) | One per person, titled `Individual: Your Name` |
| Problem 2 (Team) | Up-to-date fork `main` | [solutions/team/](solutions/team/) | One per team, titled `Team: Your Team Name` |

Start your solo branch with `git switch -c individual-submission main`. Work independently. For the team phase, nominate a submitter and start a clean branch in that person's fork with `git switch -c team-submission main`. Collaborate only with your assigned team during this phase.

Put code and tests in the matching folder. Fill out the README with your language and version, exact run and test commands, time and space complexity, edge cases, and any incomplete work. Teams also record all three members and their contributions.

Stop coding when the coding timer expires. Commit the frozen solution and push its branch to your fork. During your five-minute PR window, open one PR targeting `Unlock-Her-Tech/Problem-solving-challenge:main`, select the correct submission branch, and fill in the template. Keep each PR limited to its own folder. Do not merge it yourself or change your code during the upload window.

The GitHub check records the submitted commit, track and timing. Judges use the latest eligible commit from the correct window and session. GitHub delays, outages and pauses may require organiser review. PRs and forks are public. Avoid viewing other submissions during the event, and keep credentials and personal files out of your changes.

## Fallback submission

If a GitHub or network issue blocks submission, immediately archive only the affected solution folder or create a branch backup with `git bundle create submission-backup.bundle HEAD`. Email the attachment to community@unlockhertech.com within two minutes of the relevant PR window closing. Use subject `[Fallback Submission] Individual / Team – Name` and include your GitHub username, fork URL, commit SHA and completion time. The organiser reviews the received time and available evidence.

## Scoring

Solo and team rankings are separate. Team performance never changes an individual score. Each track is out of 100, partial credit is available, and tied totals share a rank.

| Criterion | Solo | Team |
| --- | ---: | ---: |
| Correctness across five equally weighted case groups | 70 | 60 |
| Time complexity | 15 | 15 |
| Space complexity | 5 | 5 |
| Reproducibility and explanation | 10 | 5 |
| Collaboration evidence | — | 15 |

Judges apply the same cases within each track across languages. Full time-complexity credit is available for a correct linear approach, with partial credit for a correct or demonstrably applicable near-linear approach. Collaboration points cover a clear contribution record, an independently checked test or review finding, and evidence that the team integrated or validated the result. Be ready to explain your own work. AI-generated code, AI assistance and copied solutions are prohibited in both phases.

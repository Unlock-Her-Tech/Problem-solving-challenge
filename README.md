# Unlock Her Tech · Problem Solving Challenge

**40 minutes · Any programming language · Individual or team of two**

Challenge page: **https://unlockhertech-problemsolving.netlify.app**

Fork this repository, add your solutions, and open one pull request with your name or team name. You do not need to install or run a website or timer from this repository.

## Before the challenge

1. Sign in to GitHub and click **Fork** to create your own copy.
2. Clone your fork and create a submission branch:

   ```sh
   git clone https://github.com/YOUR-USERNAME/Problem-solving-challenge.git
   cd Problem-solving-challenge
   git switch -c submission
   ```

3. Prepare your editor and preferred language tools. Disable AI chat, agents and AI autocomplete.
4. If entering as a team, work in one fork, share one PR, and name both members. Maximum team size is **two**.
5. Open the challenge page and wait for the organiser. Questions appear there when the shared session starts; they are not included in the repository.

## Add your solutions

| Folder | Topic | Marks |
| --- | --- | ---: |
| `solutions/challenge-1/` | Hash map | 25 |
| `solutions/challenge-2/` | Nested recursion | 30 |
| `solutions/challenge-3/` | Sliding window | 45 |

Use any language. Put your code and any tests inside the matching folder. Replace that folder's README with:

- Your language and version.
- Exact commands to run your solution and tests, including required dependencies.
- A short explanation of your approach and its time/space complexity.
- Edge cases tested and anything incomplete.

Attempt the problems in any order. Partial solutions earn partial credit. Keep changes inside `solutions/`; the instructions and GitHub checks are maintained by the organisers.

## Submit your pull request

Push your work early and update the same branch as you progress:

```sh
git add solutions/
git commit -m "Add challenge solutions"
git push -u origin submission
```

On your fork, click **Contribute → Open pull request** or **Compare & pull request**. Check:

- **Base repository:** `Unlock-Her-Tech/Problem-solving-challenge`
- **Base branch:** `main`
- **Compare:** your fork's `submission` branch
- **PR title:** `Individual: Your Name` or `Team: Your Team Name`

Complete the PR template, including both members for a team. Open **one PR per individual/team**. Later pushes to your submission branch automatically update it. Only pushing to your fork is not a submission: you must open a PR against the base repository. Do not merge it yourself.

## Time and rules

- You have **40 minutes of active challenge time**, controlled by the organiser. Follow any pause, resume or stop instructions shown on the challenge page.
- Refreshing or joining late does not extend the shared timer. Stop coding and pushing when time expires or the organiser stops the session. Do not work during a pause.
- PR openings and updates are checked against the session timeline. They receive `on-time`, `late`, `paused` or `before-start` flags with an audit comment recording the submitted commit. Opening a PR early does not exempt later pushes.
- Submit well before zero: upload and GitHub event delays can affect last-second submissions. The organiser reviews disputed flags. Flags are cumulative; the intended session and latest on-time commit determine the version graded.
- **No AI assistance:** no AI chat tools, AI autocomplete, agents or generated solutions.
- Normal non-AI editor autocomplete and official language documentation are allowed. Do not copy existing solutions or another participant's code, or seek outside help.
- Public forks and PRs expose code. Do not view or copy other submissions during the event.
- Be ready to explain your own work. Do not commit credentials or personal files.

## Marking

Each problem uses **70% correctness, 20% efficiency and 10% explanation**. Maximum total: **100 marks**. Individuals and teams have separate rankings; equal totals share a rank.

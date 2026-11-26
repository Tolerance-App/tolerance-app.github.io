# Using Codex on Tolerance

**The split:** Codex writes staged content in `codex/` on its own local branch. Claude reviews it, turns it into a
build and pushes. Codex never touches the app files or `main`, so it can't break anything testers see.

**What Codex does (and why these two):**
1. **Reveal-card conversion** (`codex/tasks/cards.md`). 1,263 of 1,403 cards are still plain text. Each course is a
   self-contained job with a strict format, a written design standard and an automatic checker, which is exactly what
   hands off well. Codex has the five math courses + Numerical methods (calc1, calc2, calc3, diffeq, linalg, numm:
   126 lessons, 522 cards). Claude chats keep the engineering courses, so the two never collide.
2. **Content audit** (`codex/tasks/audit.md`). Re-derive every answer in a course (1,498 questions in all) and return
   fixes as JSON. A second, independent model is the best way to catch wrong answers, and the output is tiny for
   Claude to apply.

**Not for Codex:** demos and visuals (they depend on the in-app engine and on judging how they look), anything
touching progress, sync, sign-in or Firebase, and shipping builds.

## Option A: Codex on the web (nothing to install; works from any PC or phone)
1. Claude pushes this kit to `main` first (Codex cloud reads the repo from GitHub).
2. Open https://chatgpt.com/codex and sign in with the ChatGPT account.
3. Connect GitHub when it asks. Give access to **only** `Tolerance-App/tolerance-app.github.io`.
4. Create an environment for that repo. Setup script (it gives Codex the checker's headless browser):
   ```
   pip install playwright && python -m playwright install --with-deps chromium
   ```
   Leave the agent's internet access off; the checker only uses 127.0.0.1.
5. New task: repo + branch `main`, mode **Code**, prompt `Do codex/tasks/cards.md for numm.`
6. When it finishes, review the summary and click **Create PR**. Don't merge. Tell Claude: "ship codex PR <number>".
   Claude then fetches the PR branch (`git fetch origin pull/<n>/head:codex-pr-<n>`) and uses it as below.

## Option B: Codex on the home PC (local; one-time setup, about 15 minutes)
1. Install Node, then Codex (PowerShell):
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```
   Close and reopen PowerShell, then:
   ```powershell
   npm install -g @openai/codex
   ```
   (If OpenAI's Codex desktop app is available for Windows, that works too: open the repo folder in it.)
2. Start it in the repo and sign in with your ChatGPT account when it asks:
   ```powershell
   cd C:\Users\sethi\code\tolerance-app.github.io; codex
   ```
3. In Codex, type `/model` and pick the strongest model with **high** reasoning. Content work needs it.
4. Permissions: Codex will ask before running `python tools/check.py` (it starts a local server and headless Chrome).
   Approve it for the session. If checks fail with a network or permission error, type `/approvals` and choose the
   mode that lets commands run in the workspace with network access.
5. First task, as a test run (the smallest course):
   > Do codex/tasks/cards.md for numm.

   Codex makes its own worktree (`..\tol-codex-numm`) and branch (`codex-cards-numm`), so your main folder and any
   Claude session are untouched.

## Day to day
- Start one task per Codex chat: `Do codex/tasks/cards.md for calc1.` or `Do codex/tasks/audit.md for mech.`
  Suggested order: cards numm → calc1 → calc2 → calc3 → diffeq → linalg; audits mech, aero, elec, ctrl, then the rest.
- The $20 plan has usage limits that reset every few hours. Codex commits after each lesson, so if it stops, open a
  new chat later and say `Continue codex/tasks/cards.md for calc1.`
- You can run an audit and a card conversion at the same time (separate worktrees), but each uses your limit.
- When Codex says it's done, tell Claude: **"ship codex cards calc1"** or **"apply codex audit mech"**.
- Optional later: Codex on the web (chatgpt.com/codex, connect the GitHub repo) can run audits in the cloud without
  your PC on. It opens a PR; don't merge it yourself, give the PR to Claude.

## For Claude: integrating Codex output
Codex branches are local (shared repo, separate worktrees): `git log --oneline main..codex-cards-<code>`.

**"ship codex cards <code>"**
1. Read `codex/cards/<code>.md` on that branch first (open questions, question errors it found).
2. In a worktree of your own per the CARD_CONVERSION course protocol, take the file:
   `git show codex-cards-<code>:codex/cards/<code>.js > vNN.js` and add the build header, `FB.ver`, script tag,
   `version.json`, `TF48`, `NEWS` (new-build skill). Don't rewrite Codex's cards wholesale; fix what's wrong.
3. Run the protocol's checks (step 4), look at a sample of `cardshot`s (every Guess, plus a few dense cards), and run
   `content-checker` on the file. Fix, then finish steps 6–8 (tracker row: Build bNN, note "Codex"). Push only if
   everything is clean, as the protocol says; otherwise report to Seth.
4. Remove Codex's worktree and branch once shipped: `git worktree remove ../tol-codex-<code>`,
   `git branch -D codex-cards-<code>`.

**"apply codex audit <code>"**
1. `git show codex-audit-<code>:codex/audit/<code>.json`. Verify every `critical` and `major` yourself (re-run the
   arithmetic; hand number-heavy ones to `content-checker`); `check` items need your call; skim `minor`.
2. Apply the ones that hold up in a new build with `patchQ32`-style edits (`v32.js`), in place, never reordering
   questions. Card fixes for courses with reveal cards go in their `rc98` entries.
3. `python tools/check.py course <code>`, then report to Seth what was applied and what was rejected and why.

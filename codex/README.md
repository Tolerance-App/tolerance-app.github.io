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

## Day to day (pipeline v2, from b112)
Codex is fast and Seth's plan has plenty of Codex usage, so Codex both makes and reviews; Claude only ships.
1. **Make** (one Codex chat per course, several at once is fine; different files):
   `Do codex/tasks/cards.md for calc2.` It pushes branch `codex-cards-calc2` when done.
2. **Review** (a *new* Codex chat, after step 1 finishes): `Do codex/tasks/review.md for calc2.` It fixes the cards
   on the same branch, may add question fixes (`codex/fixes/calc2.js`), and pushes.
3. **Ship**: tell Claude **"ship codex calc2 calc3 …"** (any number of reviewed courses at once).
- Audits: `Do codex/tasks/audit.md for mech.` → branch `codex-audit-mech` with `codex/fixes/mech.js`; then a new
  chat `Do codex/tasks/review.md for mech` isn't needed (audit fixes are small); tell Claude "ship codex fix:mech".
- Courses for Codex: every row marked "reserved: Codex" in `docs/CARD_CONVERSION.md`. Aerospace and Controls belong
  to Claude chats.
- If a chat stops at a usage limit: new chat, `Continue codex/tasks/cards.md for calc2.`

## For Claude: shipping Codex output
**"ship codex <code> [<code> …] [fix:<code> …]"**
1. Fresh worktree of origin/main (`git worktree add ../tol-ship-<n> -b ship-<n> origin/main`), then
   `python tools/ship_codex.py <codes…>`. It builds vNN.js from each branch (cards + any review fix file), adds the
   tag, version, NEWS, TF48, tracker, CLAUDE.md, runs cards/course/demolessons checks per course, checks every card
   has an rc entry and every fix applied, and regenerates codemap + export. Exit 1 = something to fix.
2. Read each report (`## Review` section especially: anything unsettled). Spot-check: 3–4 `cardshot`s per course
   (the densest cards and a Guess) at 1x. Don't re-review everything: the review chat did that. A full
   `content-checker` pass only for a course whose review section looks thin.
3. Fix what's needed in vNN.js, rerun the script's failing check, commit (`bNN: Codex: <courses>`), rebase on
   origin/main (if someone pushed, rerun the script in a new worktree: it renumbers), push. Remove the worktree.

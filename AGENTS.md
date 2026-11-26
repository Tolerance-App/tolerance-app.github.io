# Tolerance: notes for Codex

You are helping build **Tolerance**, a Duolingo-style phone app for engineers (owner: Seth). Claude Code is the main
builder and ships every build. **Your job is to write staged content that Claude then checks and ships.** You never
ship anything yourself.

Read `CLAUDE.md` once for the project rules (it's written for Claude, but every rule applies to you). Then read the
task brief Seth names, in `codex/tasks/`. Each brief says exactly which docs to read.

## Hard rules (no exceptions)
1. **Write only inside `codex/`.** Never edit `index.html`, any `vNN.js`, `tools/`, `docs/`, `firestore.rules`,
   `version.json`, `sw.js` or `CLAUDE.md`. If a task seems to need that, stop and write the need in your report.
2. **Never push, and never commit to `main`.** (In Codex cloud, the pull request it opens for your branch is fine;
   nobody merges it but Claude.) Locally, work on the branch the brief names, in your own worktree. Commit there
   often (at least after each lesson) so work survives if you hit a usage limit. Every push to `main` deploys to
   testers within 2 minutes; only Claude does that.
3. **Never read `index.html` whole** (1.6 MB). Lesson content as the app sees it is in
   `content-export/tolerance-lessons.jsonl` (one lesson per line): grep it by `"id": "<lessonId>"`.
4. Lesson ids and question positions are permanent (`"<id>#<index>"` keys learners' progress). Never reorder,
   delete or insert questions. Card text may change; questions only get edited in place.
5. Re-derive every number yourself, in SI units, 3–4 significant figures. Show the working in a comment or the
   report, never in learner-facing text. Stress is never a safety verdict.
6. If something is unclear, don't guess: write the question in your report and carry on with the rest.

## Testing (do this before saying a task is done)
`python tools/check.py <mode> … --extra codex/cards/<code>.js` loads your staged file as the newest build layer
in headless Chrome at phone width (mock Firebase, nothing goes online). Modes you'll use:
- `cards course "<Course name>"`: reveal-card fit and rules. Must report no issues.
- `course "<Course name>"`: runs every card and question. Must report no issues.
- `cardshot <lessonId> <cardIndex> end <path>.png`: screenshot of a finished card (375 × 812, 2×). Look at it.
  `g0` instead of `end` taps to the Guess and answers option 0.
- `eval "<js>"`: any expression, e.g. `eval "LS.find(l=>l.id=='calc1-limits-1').cards"`.
Exit code 1 means issues. The checker needs Python + Playwright + Chrome (already installed on Seth's PC); it
starts a local server on 127.0.0.1, so it needs local network access in your sandbox. Put screenshots in
`codex/shots/` (git-ignored), not in the repo root.

## When you finish a task
Write the report file the brief asks for, commit it on your branch, and end with a short summary: what you made,
what the checks returned (paste the summary lines), and any open questions for Seth.

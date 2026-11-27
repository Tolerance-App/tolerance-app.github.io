# Tolerance — notes for Claude Code

Duolingo-style app for engineers: short daily lessons across many engineering subjects. Owner: Seth (CU Boulder
mechanical and aerospace student). Testers mostly on phones. Working name **Tolerance**; don't rename anything unless asked.

**Where the detail is (read only what the task needs):**
- `docs/REFERENCE.md`: full notes on every feature and past decision (solver, chips, definitions, sign-in, offline,
  icon, flags, stats, backlog). **Grep it by feature name before changing that feature.** New feature notes go there.
- `docs/CODEMAP.md`: which layer wraps or defines which function or constant. Check it before grepping `index.html`.
  Regenerate it with `python tools/codemap.py` after each build.
- `docs/LEARNING_DESIGN.md`: card layout and learning design. Required before any lesson-card or content work.
- `codex/README.md`: Codex writes staged content in `codex/` on local `codex-*` branches; ship with `tools/ship_codex.py`
  ("ship codex <codes>").
- Skills in `.claude/skills/`: `new-build`, `lesson-cards`, `demo-visual`, `fix`. Agents in `.claude/agents/`.
- **Use the `fix` skill more often than not** (ground in docs, ask all questions up front, short brief, then do the whole
  task in one go). Skip it only for one-line fixes, plain questions, or when Seth says not to. Seth prefers questions
  early over questions mid-work.

## Hosting
- Live: https://tolerance-app.github.io/ (GitHub Pages from `main`, repo `Tolerance-App/tolerance-app.github.io`).
  **Every push to `main` deploys to testers in 1–2 minutes.** "Commit" means commit and push. When Seth's request is
  direct and assertive, commit and push at the end without being asked, once checks pass. Hold and ask only when he
  sounds unsure about a feature ("maybe", "try", "let me see it first") or checks failed.
- Firebase `tolerance-fe244` (Spark): anonymous auth (plus optional Google link) and Firestore. `firestore.rules` is
  published by hand in the console; ask before any rules change that opens access.

## How the code is built
- `index.html` (~1.6 MB) holds the CSS, the base script and all lesson content (`const BUNDLE=[…]`). **Never read it
  whole: grep with a narrow pattern, then read small line ranges.** Don't reformat or rewrite old layers inside it.
- Builds are stacked layers. Each wraps earlier functions, and the last one loaded wins:
  `const _x=fn; fn=function(){ … _x.apply(this,arguments) … }`. Functions get reassigned (`fn=function`), so check
  `docs/CODEMAP.md` for which layer's version runs.
- **A new build = a new `vNN.js` file plus a script tag before the boot line.** The checklist is in the `new-build` skill
  (FB.ver, version.json bump, NEWS, TF48, codemap). Current latest: v115.
- Key globals: `st` (user state, localStorage `tol3`), `SS` (current session), `LS` (lessons after `build()`),
  `QX` (question by key), `view`, `NET`, `DEMOS`, `QD30`. Storage code goes through `NET.db.doc(path).set(...)`,
  the artifact-style API from `fbnet.js`.
- `fbsdk.js` is a bundled Firebase SDK (esbuild from `tools/sdkentry.js`); add exports there if needed.

## Progress: rules that must never break (Seth's top rule: a build never resets anyone's progress)
1. Never rename localStorage `tol3` or the Firestore paths `data/users/{uid}/progress`, `progress_bak`, `people/{uid}`,
   `fb/{uid}`, `ev/{id}`. Add fields, never remove them; migrate shape changes on load.
2. Sync only adds: `mergeP28` never lowers `done`, `xp`, `best`, `days`, `blind`, `doneAt`. A blank start-up copy never
   counts as newer. Per-key collections that can shrink (like `st.miss`/`st.missOff`) merge key by key, not newer-wins.
3. An anonymous account belongs to one origin, and a Home Screen app is a separate device. Never change hosting
   without a move path (`#import=`, see REFERENCE).
4. **Lesson ids and question positions are permanent** (`"<lessonId>#<index>"` keys progress, mistakes and stats).
   Never reorder or insert questions mid-lesson; add new ones at the end.

## Lesson content (details in the `lesson-cards` skill and LEARNING_DESIGN.md)
- v8 format: `{id, sub, subName, field, section, branch, lv(1–6), title, req, plain, cards, eqs, talk?, qs}`.
- Question types: `mc`/`say`/`decode` (`ans` + exactly 3 `wrong`), `fill` (numeric `a` + relative `tol` + `unit`,
  or a list of text answers), `order`, `match` (3–5 pairs), `spot` (`lines`, 0-based `bad`). Every question has a `why`.
- Re-derive every number. SI units, 3–4 significant figures. Formulas state what is held constant and assumed.
  Stress is never a safety verdict. Every lesson should have a demo or visual; keep the ideas in existing demos.

## Design (full list in REFERENCE → "Design decisions"; don't undo without asking)
Calm, not doomscrolling. Refresh the existing UI, don't replace it. Dark by default, blue `#3B8BFF` with an orange
accent, monospace numbers. Never lock scrolling with `body{position:fixed}` (breaks the iOS Home Screen app).

## Testing: verify before saying done
- `python tools/check.py lessons <id…>` / `course <Name>` / `all`: headless Chrome at 390 px with mock Firebase
  (`tools/serve.py` + `tools/mockfb.js`). Runs every card and question and reports errors and malformed questions.
- `python tools/check.py demos <demoId…>` / `demolessons <lessonId…>`: demo layout check at 375 px. Ship demos with an
  empty report.
- `python tools/check.py shot <lessonId> out.png`: a screenshot to look at. `eval "<js>"` runs anything.
- Saving tokens: use `look <lessonId> [cardIndex]` for mid-work checks (visible text + overflow/clipping, no image).
  It can't see canvas/SVG drawings, overlaps, colour or spacing, so **visual work always gets a real screenshot
  before "done"** (2× when fine detail matters, e.g. small demo labels; `1x` otherwise, ~440 vs ~1,500 tokens).
  Keep 2× for shots sent to Seth. Saving tokens must never mean missing bugs.
- Exit code 1 means issues. Report exactly what ran (mock, real Firebase via `check.html`, or a real phone).

## Working with Seth
- Order: real bugs, then small changes, then new content. Be concise; say what changed and what's unverified.
- Small, targeted edits; no unrelated refactors, no speculative features, no extra abstraction; keep his names.
  If something is unclear, ask instead of guessing. Double-check work with the tools above.
- Ask before anything irreversible: deleting data, hosting changes, rules that open access.
- Tester feedback lives in `fb/{uid}`. Seth's devices are his; anyone else's gets checked and raised with him first.
- **Long tasks: post a one-line status at least every ~10 minutes, and never block on a hanging tool.** Prefer
  `tools/check.py` over the browser pane for checks (the pane can collide with another session's server).
- Token habits: one task per session. Use subagents for wide searches and for checks that return short results.

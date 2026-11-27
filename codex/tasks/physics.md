# Task: write one physics unit (or review one)

Seth will say **"Do codex/tasks/physics.md for p1-<unit>."** (make) or
**"Do codex/tasks/physics.md review p1-<unit>."** (review, in a new chat after the make chat has pushed).
`<unit>` is a unit code from the syllabus in `docs/PHYSICS.md` (vec, 1d, 2d, nl, app, circ, en, mom, rot, tq, osc,
wav, fl, th, td). You write new lessons from scratch, for a first-year college student; this is teaching, not
conversion. Claude builds the demos and pictures and ships your file.

## Read first (fully, in this order)
1. `AGENTS.md` (hard rules), then `CLAUDE.md`.
2. `docs/PHYSICS.md`: structure, lesson format, **teaching rules for physics**, and your unit's syllabus rows
   (ids, titles, levels, what to teach, the misconception to target, the demo id).
3. `docs/LEARNING_DESIGN.md`: the card design. This is the standard you're held to.
4. `.claude/skills/lesson-cards/SKILL.md`, "Reveal cards (G+F format, b98)": blocks, markup, Guess/Fill rules,
   question formats.
5. `phys/p1-1d.js`: **the reference lesson `p1-1d-3`.** Copy its layout, comment style, card shapes, figure use and
   question mix. `phys/kit.js` top comment: what the loader does with your data.
6. `phys/demos-*.js` for any demo your unit names that is already built (read its comment and variant hints, so cards
   and questions match what the demo shows and its numbers).

## Setup
**Codex cloud:** branch `codex-phys-<unit>` from `main`; push that branch when done (never `main`, never merge).
**Local:** your own worktree, never Seth's main folder:
```
git fetch origin
git worktree add ../tol-codex-phys-<unit> -b codex-phys-<unit> origin/main
cd ../tol-codex-phys-<unit>
```
Continuing after a usage limit: open `codex/phys/p1-<unit>.js` and carry on from the first lesson that isn't done.

## What to make
`codex/phys/p1-<unit>.js`: one `PH.unit({…}, [lessons])` call with every lesson in your unit's syllabus table,
core (`p1-…`) and calculus-only (`p1c-…`), in id order. Meta: `course:"p1"`, the section and branch names exactly as
the syllabus gives them, `ready:false`, `tracks:["a"]` for th and td, and the unit's equation bank in `eqb` (key
`p1-<unit>`; one variable alone on the left of each formula, plain names like `v0`, no Δ). Exception: unit `1d`
already has `phys/p1-1d.js` with p1-1d-3 and the `p1-kin` bank; write the other 1d lessons in your file with the same
meta but **no** `eqb` (reuse `eqs:["p1-kin"]`), and don't repeat p1-1d-3.

Start the file with a block comment: unit, the build you wrote against (`python tools/check.py eval "FB.ver"`), and a
per-lesson summary (cards, Guess/Fill count, question types). Above each card, a one-line comment: style, interaction,
and **the re-derivation of every number on it**. Same for each numeric question (in the comment, never in `why`
beyond the short working a student needs).

Per lesson:
- `id`, `lv`, `title`, `demo` exactly as the syllabus says. `eqs:["p1-<unit>"]` when the lesson uses the bank.
- **5–7 cards** in `rc` (array, card 0 = the hook: why a student should care, something they've felt or seen).
  Every syllabus "Teach" item is taught on a card; the misconception is broken on a card (best as a Guess) and tested
  again by a question. A numeric lesson has one worked-example card in the course routine (knowns → principle →
  symbols → numbers → check).
- About a third of cards get a Guess, a third a Fill, the rest neither; never both on one card; never on card 0.
- **8–10 questions** in `qs`, the mix in PHYSICS.md rule 5 (≥ 3 conceptual `mc`, ≥ 2 numeric `fill`, a graph
  question with a `plot` figure where the topic has graphs, one `spot`, one `order` ranking task, one `match`).
  Every question has a `why` naming the mistake behind each wrong option. Each learning objective is tested twice in
  different forms. Questions must be answerable from the cards: if a question needs a term, rule or formula, a card
  teaches it.
- **Figures.** Graphs: write them yourself as `plot` data (format in PHYSICS.md; look at p1-1d-3). Anything else
  pictorial (a free-body diagram, a ramp with a block, a pulley, a loop track): write
  `{cap:"…", need:"<exactly what to draw, with every number and label>"}` and Claude draws it. Any question or card
  that says "the graph/diagram shows" must have its figure. A figure must not give away a Guess on its card.
- Use the demo's own numbers where a card or question refers to the demo.

Rules that matter most (from earlier reviews):
- A Guess must not be answered by an earlier piece or an earlier card of the same lesson. Options are the same kind
  of thing; exactly one is right.
- Define every term before using it, in plain words. A Fill hides a relation word, never a new term, number, symbol
  or formula, and the piece that gives it away comes after.
- Keep every `eq`/`step` line short (under ~26 characters of math; cloud fonts are narrower). Steps never wrap.
- Every formula card says what it assumes (`cap`): constant acceleration, no air resistance, frictionless, small
  angle, ideal gas… g = 9.8 m/s². SI units, 3 significant figures, `tol` 0.02 unless there's a reason.
- No "always", "never", "much" without stated conditions. No classmate/professor framing. No `say`/`decode`.
- Calculus-only lessons: say what each derivative or integral means physically before using it, and connect it to the
  algebra result the student already knows.

## Checks (all clean before you finish)
```
python tools/check.py eval "[PH.errs, PH.needs]" --extra codex/phys/p1-<unit>.js
python tools/check.py cards course "Physics 1 (algebra)" --extra codex/phys/p1-<unit>.js
python tools/check.py cards course "Physics 1 (calculus)" --extra codex/phys/p1-<unit>.js
python tools/check.py course "Physics 1 (algebra)" --extra codex/phys/p1-<unit>.js
python tools/check.py course "Physics 1 (calculus)" --extra codex/phys/p1-<unit>.js
python tools/check.py demos <every phf:… id for your plots> --extra codex/phys/p1-<unit>.js
```
`PH.errs` must be `[]`. `PH.needs` lists your `need` figures: that's expected, just check each one reads as a clear
drawing brief. Plot figure ids are `phf:<lessonId>:c<cardIndex>` and `phf:<lessonId>:q<questionIndex>`.

Screenshot **every card finished**, **every Guess answered**, and **every question with a figure**, and look at each:
```
python tools/check.py cardshot <id> <ci> end codex/shots/<id>-<ci>.png --extra codex/phys/p1-<unit>.js
python tools/check.py cardshot <id> <ci> g0 codex/shots/<id>-<ci>-g.png --extra codex/phys/p1-<unit>.js
python tools/check.py qshot <id> <qi> codex/shots/<id>-q<qi>.png --extra codex/phys/p1-<unit>.js
```
Look for: wrapped steps, text off the card, raw `$` or `^`, a figure label sitting on a line or another label, a
figure that gives away the Guess, a card that doesn't fit with Continue showing. Reread every card as a physicist and
as a confused first-year student.

## Report and finish
`codex/phys/p1-<unit>.md`: lessons written; cards with Guess/Fill; the check summary lines; every `need` figure
(lesson, card/question, the brief); anything you weren't sure of; questions for Seth.
Commit on `codex-phys-<unit>` after each lesson (`codex phys <unit>: <lessonId>`) and at the end. Push the branch
(cloud) or leave it committed (local). Never `main`.

## Review mode ("review p1-<unit>", a new chat)
You're the quality gate: Claude ships what you leave on the branch. Check out `codex-phys-<unit>`, read the maker's
report, then go through every card and question with the checklist in `codex/tasks/review.md` (numbers re-derived in
Python, Guess not given away, options, terms defined, Fill, formulas with assumptions, wording, fit) **plus**:
- Does each lesson actually teach its syllabus row? Would a student who reads only the cards get every question right?
- Is the named misconception confronted head-on, and tested again by a question?
- Physics correctness: signs, directions, vector vs scalar, conditions (constant a, small angle, no friction).
- Every graph question has its plot; every pictorial reference has a `need` brief good enough to draw from.
Fix what you find yourself, rerun all checks and screenshots for what you changed, append `## Review` to the report
(each change: card or question, problem, fix, one line each; anything unsettled), commit `codex review phys <unit>`,
push the branch.

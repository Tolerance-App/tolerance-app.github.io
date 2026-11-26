# Task: convert one course to reveal cards

Seth will say e.g. **"Do codex/tasks/cards.md for calc1."** `<code>` below is that course code.

## Read first (in this order, fully)
1. `AGENTS.md` (hard rules), then `CLAUDE.md`.
2. `docs/LEARNING_DESIGN.md`: the card design. This is the standard you're held to.
3. `.claude/skills/lesson-cards/SKILL.md`, section "Reveal cards (G+F format, b98)": blocks, markup, Guess/Fill rules.
4. `v98.js` lines 1–125 (renderer comments + format) and its sample cards after line 250, then `v105.js` and `v102.js`
   as two finished courses: copy their file layout and comment style exactly.
5. `docs/CARD_CONVERSION.md`: tracker. Your course must say "reserved: Codex".

## Setup
**Codex cloud (chatgpt.com/codex):** skip the worktree commands below; work in the checkout you're given. Your
changes become a pull request; that's fine. Continuing after a limit: read `codex/cards/<code>.js` if it exists.
If you can't view screenshots there, say so in the report and rely on the checker.

**Local Codex:** work in your own worktree, never in Seth's main folder (Claude sessions run there):
```
git fetch origin
git worktree add ../tol-codex-<code> -b codex-cards-<code> origin/main   # first time
cd ../tol-codex-<code>
```
If the branch already exists (continuing after a usage limit), `cd` into it and read `codex/cards/<code>.js` to see
which lessons are done; carry on from the first lesson that isn't.

## What to make
`codex/cards/<code>.js`: only `rc98(lessonId, cardIndex, spec)` calls, grouped per lesson with a
`/* ---------- <id> · <title> ---------- */` header, and above each card a one-line comment: its style, its
interaction, and **the re-derivation of every number on the card**. No `FB.ver`, no script tags, no NEWS: Claude adds
those when it ships the file as a build. Start the file with a block comment: course, build it was made against
(`python tools/check.py eval "FB.ver"`), and a Guess/Fill summary (like the top of `v105.js`).

Get each lesson's current cards with
`python tools/check.py eval "LS.find(l=>l.id=='<id>').cards"` or by grepping `content-export/tolerance-lessons.jsonl`.
List the course's lessons with `python tools/check.py eval "LS.filter(l=>l.sub=='<code>').map(l=>l.id+' | '+l.title+' | '+l.cards.length)"`.

Rules that matter most:
- Convert **every** card of every lesson in the course. Keep each card's meaning; rewrite per LEARNING_DESIGN
  "Rewriting card text" (state conditions, define every symbol, split run-ons, add a missing step).
- Never touch `cards`, `qs`, ids or question order. You're only adding `rc98` entries.
- About a third of cards get a Guess, a third a Fill, the rest neither; never both on one card. Guess at `at ≥ 1`,
  right before the piece that answers it. Fill = a relation word or short phrase, never a number, symbol or formula.
- 2–5 pieces per card. Every card must fit one phone screen in every reveal state (the checker tests this).
- If a card has a figure (`fig17`/`LFIG84`) that already draws something, leave that block out.
- Math notation: use the markup in the skill (`$…$`, `_{…}`, `^{…}`, `√{…}`); never stack scripts two deep.

## Checks (all must be clean before you finish)
```
python tools/check.py cards course <code> --extra codex/cards/<code>.js
python tools/check.py course <code> --extra codex/cards/<code>.js
python tools/check.py eval "Object.keys(RC98).filter(id=>LS.find(l=>l.id==id&&l.sub=='<code>')).length" --extra codex/cards/<code>.js
```
The last one should equal the course's lesson count, and every card index of every lesson must have an entry.
Then screenshot **every card finished** and **every Guess answered** and look at each one:
```
python tools/check.py cardshot <id> <ci> end codex/shots/<id>-<ci>.png --extra codex/cards/<code>.js
python tools/check.py cardshot <id> <ci> g0 codex/shots/<id>-<ci>-g.png --extra codex/cards/<code>.js
```
Look for: text running off or wrapping badly, a label that reads as a broken sentence, math that renders wrong
(raw `$` or `^`), a piece that gives away the Guess before it's asked. Fix and recheck. Reread every card as an
engineer: is every number right and every assumption stated?

## Report
`codex/cards/<code>.md`: lessons and cards converted; which cards got a Guess or Fill; the check summary lines;
anything you weren't sure of (a number, a card whose old text seemed wrong, a renderer problem you worked around);
questions for Seth. If you spot an error in a **question** (not a card), list it here with key, problem and fix;
don't edit questions.

Commit on `codex-cards-<code>` after each lesson (`codex <code>: <lessonId>`) and at the end. Don't push.

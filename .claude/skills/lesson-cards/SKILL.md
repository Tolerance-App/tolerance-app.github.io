---
name: lesson-cards
description: How to build, redesign or write Tolerance lesson cards and questions (card layout, content rules, question formats, checks). Use for any lesson-card redesign, new lesson content, question edits, or content review.
---

# Lesson cards and content

**First read `docs/LEARNING_DESIGN.md` in full.** It has the research summary and Seth's decisions: A + B card
layout, tap anywhere to reveal the next piece, upright serif math, **Guess** for answers with few options (numbers,
higher/lower, true/false) and **Fill** for words.

## Where content lives
- `const BUNDLE=[…]` in `index.html`, v8 format:
  `{id, sub, subName, field, section, branch, lv, title, req, plain, cards, eqs, talk?, demoNeeded?, figNeeded?, qs}`.
  Older lessons come from `BASE` (array rows plus `NQ`). `lv` is 1–6 in content; `build()` stores it as 0–5.
- Later builds patch lessons by changing `BUNDLE` before `build()` (v32 pattern: `BUNDLE.push` guarded by `bq32(id)`).
- Find a lesson: `grep -n '{id:"<id>"' index.html`, then read only that line range. `content-export/` has JSON
  exports (`tolerance-lessons.jsonl`, one lesson per line) that are cheaper to grep than `index.html`.
- Card rendering: `cardScreen` (wrapped in ix:v17, ix:v18, v84, v98; see `docs/CODEMAP.md`). v98 renders reveal cards.

## Reveal cards (G+F format, b98)
Cards are being converted, course by course, to reveal cards: one piece per tap, upright serif math, an occasional
Guess or Fill. Progress tracker: `docs/CARD_CONVERSION.md`. Renderer, format and the first 9 cards: `v98.js`.
- **Store** a card with `rc98(lessonId, cardIndex, spec)` in the course's build file (load after v98). `build()` copies
  it to `l.rc[cardIndex]`. Never change `cards` or `qs`; a card without an entry renders as plain text.
- `spec = {p:[piece, …], g?:{at, q, o:[[text, ok, why], …]}}`. A piece is one block or an array of blocks (blocks
  shown together on one tap). 2–5 pieces.
- **Blocks** (`t`), one per catalogue style:
  `p {x}` sentence · `eq {eq, lab?, cap?, vars?}` formula box (cap = what's held constant/assumed) ·
  `vars {vars, lab?}` symbol legend ("First, the symbols") · `giv {rows:[[sym,val,unit,"up"|"dn"]], lab?}` givens grid
  or ↑/↓ change tiles (sym "" for tiles) · `step {f, v, u, fin?}` worked step (fin = final result, blue) ·
  `tbl {head, rows, hi:[r,c]}` change table (hi = the guessed cell) · `term {s, x}` symbol tile + sentence ·
  `vt {l, v, u}` value row · `pc {l, c, v, warn?}` compare panel (label, condition, value; warn = orange) ·
  `chain {items, hl}` process chain · `rel {x}` one-line relation under value rows · `take {x}` bold takeaway.
- **Markup:** `$…$` inline math chip, `**…**` bold, `[[word]]` the one Fill word. Anywhere: `_e`, `_{0}`, `^3`, `^{-1}`
  sub/superscripts, `√{…}` radical with a bar. Never stack scripts two deep: `exp(Δv / v_e)`. Write `vars` symbols,
  `eq`, `f`, `v`, `u` in this syntax; they render serif.
- **Guess:** at most one, on about a third of cards, `at ≥ 1` (never the first piece), placed right before the piece
  that answers it, and that piece states the answer as a relation (highlighted table cell, `rel` line, takeaway).
  2 or 3 short options, exactly one correct; each `why` names the mistake behind that option.
- **Fill:** at most one, on about a third of cards, only a relation word or short phrase ("more than twice",
  "exponentially", "subsonic"), never a number, symbol or formula, and the piece that gives it away comes after.
  A card has a Guess or a Fill, not both; about half the cards have neither.
- **Catalogue (short):** Legend → formula (vars → eq with cap → meaning, Fill → rearranged eq) · Worked example (giv →
  one step per piece, fin last → closing note; no interaction) · Scaling table (what's fixed → Guess → tbl → ∝ line) ·
  Rule in words → formula (p with Fill → eq → second eq with vars → vt) · Process chain (p → chain → why → vt) ·
  Definition → compare pair (eq with vars → pc → pc warn) · Terms (term, term → true/false Guess → take) ·
  Formula → value rows (p + eq/vars → vt → Guess → vt + rel) · Plain text + change tiles (p → giv tiles → p with Fill).
  Full table and rewriting notes: `docs/LEARNING_DESIGN.md`.
- If the card already has a figure (`fig17`/`LFIG84`) that draws the same thing as a block, leave the block out; the
  card must still fit one screen.

### Per-course conversion workflow
1. Pick the next course in `docs/CARD_CONVERSION.md`. New build file (`new-build` skill), one course per session.
2. Convert every card: read the old text, pick its style, rewrite per LEARNING_DESIGN "Rewriting card text" (state
   conditions, define every symbol, split run-ons, add missing steps). Re-derive every number in a comment next to
   the card. Keep the card's meaning; tap-to-define still applies to prose.
3. `python tools/check.py cards course <Name>` must report nothing (fit at 375 × 812 in every reveal state with
   Continue showing, Guess/Fill rules, markers). Then `python tools/check.py course <Name>`.
4. Reread every card like an engineer, on screenshots: `python tools/check.py cardshot <id> <ci> end out.png`
   (also `<taps>` or `g0`/`g1` for mid-reveal, add `light` for the light theme). Hand numbers to `content-checker`.
5. Update the course's row in `docs/CARD_CONVERSION.md`, then give Seth the diff. Don't commit until he says so.

## Permanent keys
Lesson ids and question positions key progress, mistakes, the equation map and stats (`"<id>#<index>"`).
**Never reorder, delete or insert questions mid-lesson.** Add at the end. A card redesign may change `cards`
freely, since cards aren't keyed.

## Question formats
- `mc`, `say`, `decode` (with `who`): `ans` plus exactly 3 `wrong`.
- `fill`: numeric `a` with relative `tol` and `unit`, or text `a` as a list.
- `order`: items in correct order. `match`: 3–5 pairs. `spot`: `lines` plus 0-based `bad`.
- Every question has a `why` that names the specific mistake behind each wrong option.

## Content rules
- Re-derive every number yourself (show the arithmetic in your working, not in the card).
- Every card with a formula says what is held constant and what the model assumes.
- No "always", "much" or "exponentially" without stated conditions.
- Each objective is tested by at least 2 questions in different forms.
- SI units with explicit `tol`, 3–4 significant figures. Stress is never a safety verdict.
- Tap-to-define words: follow the definition-style rules in `docs/REFERENCE.md` ("Tap-to-define").
- Seth wants lots of content ("nothing is too specialized"); lessons may appear in more than one place.

## Workflow for a batch
1. Do one course or one section per session; keep the batch small enough to check properly.
2. Write or redesign the cards in a new build layer (see the `new-build` skill).
3. Run `python tools/check.py course <Name>` (or `lessons <ids>`). It must be clean.
4. Hand numeric content to the `content-checker` agent (Sonnet) to re-derive numbers independently, then fix
   what it finds.
5. Screenshot a sample: `python tools/check.py shot <id> <scratchpad>/card.png`, look at it at phone width.

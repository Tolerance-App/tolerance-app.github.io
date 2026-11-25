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
- Card rendering: `cardScreen` (wrapped in ix:v17, ix:v18, v84; see `docs/CODEMAP.md`).

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

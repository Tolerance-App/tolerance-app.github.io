# Task: review another Codex chat's work, and fix it

Seth will say e.g. **"Do codex/tasks/review.md for calc2."** You are the second pair of eyes: a different chat made
`codex/cards/<code>.js` on branch `codex-cards-<code>`. Claude ships whatever you leave on that branch, so this
review is the main quality gate. Be strict. Fix what you find yourself; don't just list it.

## Read first
1. `AGENTS.md`, then `docs/LEARNING_DESIGN.md` in full (the research and the rules the cards must follow).
2. `.claude/skills/lesson-cards/SKILL.md`, "Reveal cards" section, and `codex/tasks/cards.md` (the maker's brief).
3. `.claude/agents/content-checker.md`: Claude's checker. You do its job, plus the checklist below.

## Setup
Codex cloud: `git fetch origin codex-cards-<code> && git checkout codex-cards-<code>`. Locally: a worktree of that
branch. Read the maker's report `codex/cards/<code>.md` first.

## Checklist, every card (these are the mistakes earlier reviews found)
1. **Numbers.** Re-derive every number on the card and in its comment with Python, not in your head. Check against
   the lesson's questions and demo values (`content-export/tolerance-lessons.jsonl`; demos: grep the demo id in
   `v*.js`), so a card never contradicts a question.
2. **Guess given away.** An earlier piece of the same card, or an earlier card of the same lesson, must not state the
   answer. (A Guess asked before the piece that answers it is fine: that's the design, a prediction.)
3. **Guess options** are the same kind of thing (three functions, three numbers), exactly one is correct, and each
   `why` names the mistake behind that option.
4. **Terms defined before use**, in plain words: every technical term on a card is explained on that card or an
   earlier one in the lesson. If the lesson's questions use a term or rule (e.g. the power rule, "compact"), a card
   must teach it. Missing teaching is the most common gap: add a piece.
5. **Fill** hides a relation word or short phrase ("proportional", "more than twice", "equation"), never a number,
   symbol, formula or brand-new term, and the piece that gives it away comes after.
6. **Formulas** state what's held constant and assumed (`cap`). No "always", "much", "exponentially" without
   conditions. Stress is never a safety verdict.
7. **Wording** reads naturally to a first-year student: no word that suggests the wrong meaning ("acts against"
   for "is multiplied by"), no run-ons, every symbol defined.
8. **Fit.** Every `eq`/`step` line clearly short (cloud fonts are narrower than Seth's PC; aim under ~26 characters
   of math). Worked steps never wrap to a second line.

Also read every question of each lesson once. If a question is wrong or two answers are defensible, don't edit it in
the cards file: write a fix in `codex/fixes/<code>.js` with `qfix(...)` (format in `codex/tasks/audit.md`).

## Then
Run the checks from `codex/tasks/cards.md` (all clean; add `--extra codex/fixes/<code>.js` too if you wrote one,
comma-separated: `--extra codex/cards/<code>.js,codex/fixes/<code>.js`). Screenshot every card you changed.

Append a `## Review` section to `codex/cards/<code>.md`: what you checked, every change you made (card, problem,
fix, one line each), and anything you couldn't settle. Commit on the same branch (`codex review <code>`) and push
the branch (never `main`, never merge).

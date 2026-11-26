# Task: audit one course's questions and cards

Seth will say e.g. **"Do codex/tasks/audit.md for mech."** `<code>` below is that course code. Read-only on the app:
you write one JSON file and one short report.

## Read first
1. `AGENTS.md` (hard rules).
2. `content-export/TOLERANCE_CONTENT_BRIEF.md`: the 12 content rules, severities and real examples. This is the
   checklist. (Its `lv` note: the export's `lv` is 0–5; add 1 for the level name.)

## Setup
In Codex cloud (chatgpt.com/codex), skip these commands and work in the checkout you're given. Locally:
```
git fetch origin
git worktree add ../tol-codex-audit-<code> -b codex-audit-<code> origin/main
cd ../tol-codex-audit-<code>
```
Lessons: every line of `content-export/tolerance-lessons.jsonl` whose `"sub"` is `<code>`. Check `meta.build` in
`content-export/tolerance-lessons.json` and put it in your output. If a lesson has `rc` (reveal cards), audit those
too: they are what the learner sees instead of `cards`.

## How
For every question: re-derive the answer from the question text alone, step by step, **running the arithmetic in
Python** (don't do it in your head). Check it falls inside `tol`. Check each wrong option really is wrong and the
`why` names the mistake behind each one. Then the cards: every number, every formula's stated assumptions.

Report only real problems. A wording preference is not an issue. Never report ids, `key`s, `fig` or `demo` values.
If you aren't sure, use severity `check` and show your working.

## Output 1: `codex/fixes/<code>.js` (ready to ship)
For every `critical` and `major` issue you are sure of, write the fix as guarded JavaScript, so Claude can ship the
file as-is. Questions: edit in place, never reorder or add mid-lesson.
```js
/* mech-beams-2#3 · critical · δ = F L³/(3EI) = 2000·1.2³/(3·200e9·1.04e-7) = 0.0554 m */
qfix("mech-beams-2",3,/cantilever/,q=>{q.a=55.4;q.why="…"});
```
`qfix(lessonId, qIndex, guardRegExp, edit)` works for every lesson (it runs after `build()`). The guard must match
the current `q` text, so the fix can't land on the wrong question. Card text fixes:
if the lesson has an `rc` entry for that card, re-issue the whole `rc98(id, ci, {...})` with the fix; otherwise
skip it and list it in the JSON. Test: `python tools/check.py eval "FIX32.filter(x=>/<code>/.test(x))" --extra
codex/fixes/<code>.js` must list `ok` for every fix, and `python tools/check.py course <code> --extra
codex/fixes/<code>.js` must be clean.

## Output 2: `codex/audit/<code>.json` (every issue, including ones not in the fix file)
```json
{
  "course": "<code>", "build": "b107", "lessons": 31, "questions": 140,
  "issues": [
    {
      "key": "mech-beams-2#3",
      "field": "a",
      "severity": "critical",
      "issue": "Answer 41.7 mm is off: the load is 2 kN, not 1.5 kN.",
      "fix": "a: 55.6",
      "work": "δ = F L³ / (3 E I) = 2000 · 1.2³ / (3 · 200e9 · 1.04e-7) = 0.0554 m"
    }
  ]
}
```
- `key`: question key `"<lessonId>#<index>"`, or `"<lessonId>/card<N>"` for a card (0-based; `rc` cards too).
- `field`: `q`, `a`, `ans`, `wrong[1]`, `why`, `tol`, `unit`, `items`, `pairs`, `lines`, `bad`, `cards[2]`, `rc[2]`.
- `severity`: `critical` | `major` | `minor` | `check` (definitions in the brief).
- `fix`: the exact replacement text or value, ready to paste. For a `why`, write the whole new `why`.
- `work`: the derivation for any number (empty string if none).
Sort issues by severity, then key. Make sure the file parses: `python -c "import json;json.load(open('codex/audit/<code>.json',encoding='utf8'))"`.

## Report: `codex/audit/<code>.md`
Five lines max: lessons and questions checked, counts per severity, the 3 most serious issues in one line each.

Commit on `codex-audit-<code>` (`codex audit <code>`). In Codex cloud, push that branch to GitHub when done
(never `main`, never merge). Locally, don't push.

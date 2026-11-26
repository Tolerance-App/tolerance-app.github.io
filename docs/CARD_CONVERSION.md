# Reveal-card conversion tracker

Every lesson card is being converted to the G+F reveal format (`docs/LEARNING_DESIGN.md`). One course per chat.
Format, catalogue and the per-course workflow: the `lesson-cards` skill. Renderer and the 9 test cards: `v98.js`.

**How a course chat uses this file:** pick the next course marked "to do", set it to "in progress", convert every card
of every lesson in it (`rc98(lessonId, cardIndex, spec)` in a new build file), run
`python tools/check.py cards course <Name>` until it's clean, reread every card on `cardshot` screenshots, then set the
row to "done" with the build number and give Seth the diff. Count a card as converted only when it has an `rc` entry.

Counts are from `LS` at b98 (329 lessons, 1,403 cards). Courses include their older BASE lessons (those carry the
course code, e.g. `mech`, as `subName`); `cards course <Name>` covers them. Recount with:
`python tools/check.py eval "(()=>{const m={};LS.forEach(l=>{const r=m[l.sub]=m[l.sub]||[0,0,0];r[0]++;r[1]+=l.cards.length;r[2]+=l.rc?Object.keys(l.rc).length:0});return m})()"`

| Course | Code | Lessons | Cards | Converted | Status | Build |
|---|---|---:|---:|---:|---|---|
| Mechanical | mech | 31 | 138 | 3 | test cards only | b98 |
| Aerospace | aero | 16 | 64 | 3 | test cards only | b98 |
| Electrical | elec | 20 | 70 | 2 | test cards only | b98 |
| Computer science | cs | 10 | 29 | 1 | test cards only | b98 |
| Manufacturing | mfg | 12 | 50 | 50 | done | b102 |
| Drawings and GD&T | gdt | 8 | 33 | 33 | done | b103 |
| Programming | code | 16 | 65 | 0 | to do | |
| CAM | cam | 8 | 36 | 0 | to do | |
| Machine learning | ml | 12 | 49 | 0 | to do | |
| Controls | ctrl | 12 | 56 | 0 | to do | |
| CAD | cad | 8 | 33 | 0 | to do | |
| Engineering math | math | 4 | 16 | 16 | done | b99, b101 |
| Materials | mat | 4 | 16 | 16 | done | b105 |
| Civil and structures | civil | 4 | 16 | 16 | done | b100 |
| Digital hardware | dig | 9 | 58 | 0 | to do | |
| Measurement and data | daq | 6 | 39 | 0 | to do | |
| Design review | design | 9 | 42 | 0 | to do | |
| Shop vocab | vocab | 12 | 57 | 0 | to do | |
| Engineer, translated | plain | 2 | 14 | 0 | to do | |
| Calculus I | calc1 | 25 | 108 | 0 | to do | |
| Calculus II | calc2 | 24 | 96 | 0 | to do | |
| Calculus III | calc3 | 24 | 96 | 0 | to do | |
| Differential equations | diffeq | 24 | 96 | 0 | to do | |
| Linear algebra | linalg | 24 | 96 | 0 | to do | |
| Numerical methods | numm | 5 | 30 | 0 | to do | |
| **Total** | | **329** | **1,403** | **140** | | |

## Course chat protocol (several chats can run at once)

Seth's standing answers for course chats (2026-11-25), so a chat can finish without asking him:
- **Push when clean.** If every check passes and the content-checker finds nothing left, push to `main` yourself.
  If something truly needs Seth (a content question you can't settle, a check you can't make pass), don't push:
  commit on your branch, set the course's status here to "blocked: <one line>", and put the question in your final
  message.
- Keep b98's behaviour as is: a card shows whole only when revisited in the same session; Guesses aren't logged
  (no `ev` fields, no rules change). Don't change `v98.js`; if you find a renderer bug, describe it in your final
  message and work around it in content.
- Where a card's figure (`fig17` / `LFIG84`) already draws what a block would show, leave the block out.

Steps:
1. **Own worktree.** Other chats may be working in the main folder. Unless you're already in a worktree of your own:
   `git fetch origin && git worktree add ../tol-cards-<code> -b cards-<code> origin/main`, then work only in that
   folder (it has the same `tools/`). `tools/check.py` picks a free port, so parallel runs don't collide.
2. **Build file.** Start it as `vNN.js` with NN = (highest `vNN.js` on origin/main) + 1, following the `new-build`
   skill: header comment, `FB.ver`, script tag after the last one, `version.json`, one `TF48` entry
   (`go:["lesson","<first lesson id>"]`), a one-line `NEWS` entry. Cards only: `rc98(id, ci, spec)` calls; never
   touch `cards`, `qs`, ids or question order.
3. **Convert every card** of every lesson in the course (lesson-cards skill: catalogue, Guess/Fill rules, rewriting
   notes in `docs/LEARNING_DESIGN.md`). Re-derive every number in a comment above the card. About a third of cards
   get a Guess, a third a Fill, the rest neither; never both on one card.
4. **Checks**, all clean: `python tools/check.py cards course "<Name>"`, `python tools/check.py course "<Name>"`,
   `python tools/check.py demolessons <the course's lesson ids>`, `python tools/check.py eval "FB.ver"`.
5. **Review.** Screenshot every card finished (`cardshot <id> <ci> end <scratchpad>/x.png`) and every Guess open
   (`cardshot <id> <ci> g0 …` shows it answered; use the tap count for open) and look at each one: overflow,
   wrapping, a label that reads as a broken sentence. Reread every card as an engineer. Then run the
   `content-checker` agent on the course's reveal cards (give it `vNN.js` and the lesson ids) and fix what it finds.
6. **Update this file:** the course's row (Converted = the course's card count, Status "done", Build "bNN"), and the Total row's Converted (sum of the column).
7. **Integrate and push.** `python tools/codemap.py` and `python tools/check.py export`; commit (`bNN: reveal cards for <Name>` + the attribution line).
   Then `git fetch origin && git rebase origin/main`. If another chat pushed meanwhile:
   - your build number must be the new highest + 1: `git mv` the file, and fix `FB.ver`, the script tag,
     `version.json`, the `TF48` `b:` field, the tracker's Build cell and the commit message to match;
   - conflicts: keep every chat's script tags in number order with yours last; keep every row's update in this
     file; `version.json` = your number; `CLAUDE.md` "Current latest" = your number; regenerate `docs/CODEMAP.md`
     and `content-export/` (`python tools/check.py export`) instead of merging them.
   Rerun step 4 after any renumber, then `git push origin HEAD:main`. If the push is rejected, repeat step 7.
   Afterwards confirm `https://tolerance-app.github.io/version.json` shows your build (1–2 minutes), and remove the
   worktree (`git worktree remove ../tol-cards-<code>`).
8. **Report:** lessons and cards converted, which cards got a Guess or Fill, what the checks and content-checker
   found and fixed, anything left for Seth. Post a one-line status about every 10 minutes while working.

## Done: the 9 test cards (b98)

Card indices are 0-based (`idea i of n` on screen is index + 1).

| Lesson | Card | Style | Interaction |
|---|---:|---|---|
| aero2 (Orbits and rockets) | 1 | Legend → formula | Fill "exponentially" |
| mech-beams-2 (Beam calculations and design checks) | 4 | Worked example | none |
| mech-beams-2 | 5 | Scaling table | Guess (deflection ÷8) |
| elec-sensors-4 (Sampling and aliasing) | 1 | Rule in words → formula | Fill "more than twice" |
| elec-sensors-4 | 2 | Process chain (chain block left out: the card's figure draws it) | none |
| cs-data-structures-3 (Hash collisions and growth) | 1 | Definition → compare pair | none |
| mech-thermodynamics-1 (Heat, work, and energy) | 1 | Terms | Guess (true/false) |
| aero-aerodynamics-5 (Supersonic flow and shocks) | 1 | Formula → value rows | Guess (slower) |
| aero-aerodynamics-5 | 3 | Plain text + change tiles | Fill "subsonic" |

A course chat converting Mechanical, Aerospace, Electrical or Computer science skips these cards (they're already in
`v98.js`); improve them there only if Seth asks.

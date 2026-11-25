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
| Manufacturing | mfg | 12 | 50 | 0 | to do | |
| Drawings and GD&T | gdt | 8 | 33 | 0 | to do | |
| Programming | code | 16 | 65 | 0 | to do | |
| CAM | cam | 8 | 36 | 0 | to do | |
| Machine learning | ml | 12 | 49 | 0 | to do | |
| Controls | ctrl | 12 | 56 | 0 | to do | |
| CAD | cad | 8 | 33 | 0 | to do | |
| Engineering math | math | 4 | 16 | 0 | to do | |
| Materials | mat | 4 | 16 | 0 | to do | |
| Civil and structures | civil | 4 | 16 | 0 | to do | |
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
| **Total** | | **329** | **1,403** | **9** | | |

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

# Calculus III reveal cards

Converted all 96 cards across 24 lessons against b114. There are 24 Guesses, 24 Fills, and 48 cards without an interaction. One Guess and one Fill per lesson leave the two other cards for definitions, examples, or figures.

## Card indexes

Indexes are zero-based.

| Lesson | Guess | Fill | Neither |
|---|---:|---:|---:|
| `calc3-geometry-1` | 3 | 1 | 0, 2 |
| `calc3-geometry-2` | 3 | 1 | 0, 2 |
| `calc3-geometry-3` | 3 | 2 | 0, 1 |
| `calc3-geometry-4` | 3 | 1 | 0, 2 |
| `calc3-partials-1` | 2 | 1 | 0, 3 |
| `calc3-partials-2` | 3 | 1 | 0, 2 |
| `calc3-partials-3` | 1 | 3 | 0, 2 |
| `calc3-partials-4` | 2 | 1 | 0, 3 |
| `calc3-optimization-1` | 3 | 2 | 0, 1 |
| `calc3-optimization-2` | 2 | 1 | 0, 3 |
| `calc3-optimization-3` | 2 | 1 | 0, 3 |
| `calc3-optimization-4` | 3 | 2 | 0, 1 |
| `calc3-multiple-integrals-1` | 3 | 2 | 0, 1 |
| `calc3-multiple-integrals-2` | 2 | 1 | 0, 3 |
| `calc3-multiple-integrals-3` | 3 | 2 | 0, 1 |
| `calc3-multiple-integrals-4` | 3 | 2 | 0, 1 |
| `calc3-line-integrals-1` | 2 | 3 | 0, 1 |
| `calc3-line-integrals-2` | 2 | 1 | 0, 3 |
| `calc3-line-integrals-3` | 3 | 2 | 0, 1 |
| `calc3-line-integrals-4` | 2 | 1 | 0, 3 |
| `calc3-surface-theorems-1` | 3 | 2 | 0, 1 |
| `calc3-surface-theorems-2` | 2 | 1 | 0, 3 |
| `calc3-surface-theorems-3` | 2 | 3 | 0, 1 |
| `calc3-surface-theorems-4` | 2 | 1 | 0, 3 |

## Validation

The course ran in headless Chromium with mock Firebase. The checker loaded `codex/cards/calc3.js` through `--extra`.

- `cards course calc3` — 96 reveal cards in 24 lessons checked, 0 with issues.
- `course calc3` — 24 lessons run, 0 with issues.
- Live coverage — b114 registered all 24 lessons, with reveal entries at every card index (96 total).
- Visual review — 96 finished cards and 24 answered Guess states captured at 375 × 812, 2× scale. The first pass found footer crowding on cards with figures. Shortened those cards, moved the Green’s theorem formula beside its definition, and reran the affected captures.

## Content notes

- The eight existing figures remain on card index 1 of their lessons. The new pieces use them for the illustrated geometry, slicing, or orientation.
- The lesson cards teach terms used by the questions, including Fubini’s theorem, level sets, definiteness, complementary slackness, and spanning surfaces.
- The source question review covered all 102 questions, including independent Python checks of 25 numeric answers. It found no question fixes.
- Open questions for Seth: none.

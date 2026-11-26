# Calculus I reveal-card handoff

Converted all 108 cards across 25 Calculus I lessons against b107. There are 28 cards with a Guess, 34 with a Fill, and 46 with neither. Indices below are zero-based.

| Lesson ID | Cards | Guess indices | Fill indices |
|---|---:|---|---|
| `calc1-functions-1` | 6 | 2, 5 | 0, 4 |
| `calc1-limits-1` | 6 | 2, 5 | 0, 3 |
| `calc1-limits-2` | 6 | 2, 5 | 0, 4 |
| `calc1-limits-3` | 6 | 2, 5 | 1, 3 |
| `calc1-limits-4` | 4 | — | 3 |
| `calc1-continuity-1` | 4 | 3 | 0 |
| `calc1-continuity-2` | 4 | 2 | 0, 3 |
| `calc1-continuity-3` | 4 | 2 | 0 |
| `calc1-continuity-4` | 4 | 2 | 1, 3 |
| `calc1-derivative-rules-1` | 4 | 3 | 0 |
| `calc1-derivative-rules-2` | 4 | 3 | 0 |
| `calc1-derivative-rules-3` | 4 | 3 | 0 |
| `calc1-derivative-rules-4` | 4 | 3 | 0 |
| `calc1-implicit-1` | 4 | 3 | 0 |
| `calc1-implicit-2` | 4 | 3 | 0 |
| `calc1-implicit-3` | 4 | 3 | 0 |
| `calc1-implicit-4` | 4 | 3 | 0 |
| `calc1-applications-1` | 4 | 2 | 0 |
| `calc1-applications-2` | 4 | 2 | 0, 3 |
| `calc1-applications-3` | 4 | 3 | 2 |
| `calc1-applications-4` | 4 | 1 | 3 |
| `calc1-integrals-1` | 4 | 2 | 0, 3 |
| `calc1-integrals-2` | 4 | 2 | 0, 3 |
| `calc1-integrals-3` | 4 | 2 | 3 |
| `calc1-integrals-4` | 4 | 2 | 1 |

## Verification

Each command used `--extra codex/cards/calc1.js` with the repository's mock Firebase server and headless Chromium.

- `cards course calc1` reported **108 reveal cards in 25 lessons checked, 0 with issues**.
- `course calc1` reported **25 lessons run, 0 with issues**.
- The registry check returned **25**. A separate per-index comparison found 108 expected entries and an empty missing list.
- Visually reviewed 108 finished cards and 28 answered Guess states at 375 × 812, captured at 2× in the ignored `codex/shots/` directory.
- A separate content review re-derived the worked values. It also caught missing assumptions for the quotient and inverse rules and ambiguity in the Guess about reversing integral bounds. Those edits are in the staged cards.

The first layout pass found overflow on three cards. The squeeze card's figure caption disclosed the proposed Guess answer, so that card now uses two prose reveals. The difference quotient and average-value cards use named intermediate quantities to fit their formulas. All three passed after those edits.

## Existing figure issue

On `calc1-limits-4#c1`, the squeeze illustration shows axes and a caption, with the plotted bounds and function missing. The same result occurs on b107 without the staged file. Its static figure passes only `w` to `c1squeeze`, whose current plot also reads the function choice `c`. Supplying `c:0` with the existing window rendered all three missing curves during diagnosis. Suggested integration fix is to pass `{w:.4,c:0}` to that existing figure. The staged card teaches the squeeze rule in prose and leaves the figure repair for integration.

## Question fixes for integration

| Question key | Finding | Suggested in-place change |
|---|---|---|
| `calc1-continuity-4#1` | The question asks for a tolerance that ensures the error bound. Any positive tolerance at or below 0.004 works, but the key accepts values near 0.004 only. | Ask for the largest input tolerance guaranteed by the bound. Keep 0.004 as the answer. |
| `calc1-functions-1#4` | The matching description says all input–output pairs are drawn as a curve. Functions with discrete domains also have graphs. | Use “The set of plotted input–output pairs.” |

The proposed figure repair and question wording can be reviewed during integration. There are no open content decisions for the staged cards.

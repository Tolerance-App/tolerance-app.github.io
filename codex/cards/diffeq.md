# Differential equations reveal cards

Staged against b114 on `codex-cards-diffeq`. All 96 cards across 24 lessons have an `rc98` entry. There are 29
Guesses, 30 Fills, and 37 cards without an interaction. Lesson IDs and quiz keys stay in place. Each worked
example or numeric prediction has its derivation in the comment above the card.

| Lesson | Cards | Guess indices | Fill indices |
|---|---:|---|---|
| `diffeq-first-order-1` | 4 | 1 | 0 |
| `diffeq-first-order-2` | 4 | 0, 3 | 1 |
| `diffeq-first-order-3` | 4 | 1 | 0, 2 |
| `diffeq-first-order-4` | 4 | 0 | 2 |
| `diffeq-second-order-1` | 4 | 2, 3 | 0 |
| `diffeq-second-order-2` | 4 | 2 | 1, 3 |
| `diffeq-second-order-3` | 4 | 3 | 1 |
| `diffeq-second-order-4` | 4 | 3 | 1 |
| `diffeq-laplace-1` | 4 | 2 | 0 |
| `diffeq-laplace-2` | 4 | 3 | 0, 2 |
| `diffeq-laplace-3` | 4 | 1 | 0 |
| `diffeq-laplace-4` | 4 | 2 | 0 |
| `diffeq-systems-1` | 4 | 2 | 1 |
| `diffeq-systems-2` | 4 | 2, 3 | 1 |
| `diffeq-systems-3` | 4 | 2 | 0, 3 |
| `diffeq-systems-4` | 4 | 1 | 2 |
| `diffeq-numerical-series-1` | 4 | 2, 3 | 0 |
| `diffeq-numerical-series-2` | 4 | 0 | 1, 2 |
| `diffeq-numerical-series-3` | 4 | 2 | 0 |
| `diffeq-numerical-series-4` | 4 | 1 | 0 |
| `diffeq-pde-1` | 4 | 3 | 0 |
| `diffeq-pde-2` | 4 | 0 | 1, 3 |
| `diffeq-pde-3` | 4 | 2 | 1 |
| `diffeq-pde-4` | 4 | 1, 3 | 2 |

Card indices are zero-based. The Fourier figure at `diffeq-pde-1` card 1 stays in the card flow. Its caption
already explains the jump midpoint and overshoot. The Guess on card 3 instead asks for the normalization
needed to calculate a Fourier coefficient.

## Validation

- `python tools/check.py cards course diffeq --extra codex/cards/diffeq.js` → 96 reveal cards in 24 lessons checked, 0 with issues.
- `python tools/check.py course diffeq --extra codex/cards/diffeq.js` → 24 lessons run, 0 with issues.
- Runtime coverage → 24 registered lessons, 96 of 96 card indices present, no missing card entries.
- Reviewed 96 finished cards and 29 answered Guesses in headless Chromium with mock Firebase at a 375 × 812
  viewport and 2× capture scale. The dense matrix-exponential cards were shortened for phone-width fit.
- The visual review used the cloud browser’s fonts. Seth’s Windows fonts and physical phone rendering remain unverified.

## Existing questions for the review pass

Keys use zero-based question indices.

| Question key | Issue | Suggested fix |
|---|---|---|
| `diffeq-first-order-1#4` | Checking the equation and checking the initial data can occur in either order. | State the checklist order in the stem or use a format that assesses the checks without ranking them. |
| `diffeq-first-order-4#3` | The stem asks for an existence claim, while the keyed claim is about uniqueness. | Ask “Which claim about solution conditions is flawed?” |
| `diffeq-second-order-1#0` | “Parameter-times-exponential” can imply a constant multiplier. | Say “time times the exponential” and show `t exp(rt)`. |
| `diffeq-second-order-2#0` | “Powers of the input” can be read as powers of the forcing rather than powers of the independent variable. | Say to multiply the trial by a power of time equal to the overlapping root’s multiplicity. |
| `diffeq-systems-2#0` | The feedback calls zero real parts inconclusive for decay. A zero real part already rules out asymptotic stability in this linear system. | Explain that zero-real-part modes prevent convergence from all initial states, then distinguish persistent motion from possible growth. |
| `diffeq-systems-3#0` | The prompt gives a zero eigenvalue as sufficient for an inconclusive nonlinear stability test. | Specify that no eigenvalue has positive real part. One positive real part already implies instability. |
| `diffeq-numerical-series-1#3` | The match for Runge–Kutta describes a multistage method. Forward Euler itself is a one-stage Runge–Kutta method. | Label the term “Multistage Runge–Kutta method.” |

The existing `desys4` demo labels `c/2` as the decay rate across its slider range. This is the exponential
envelope rate in the underdamped regime. For `c² > 4k`, the slow rate is
`(c − √(c² − 4k))/2` in the demo’s normalized model. The converted lesson uses a separate example.

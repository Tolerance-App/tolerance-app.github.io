# Numerical Methods reveal cards

Staged against build `b107` in `codex/cards/numm.js`. All five lessons have six reveal cards. The indices below are zero-based.

| Lesson | Cards | Guess | Fill |
|---|---:|---|---|
| `numm-opt-1` Backtracking and Armijo | 6 | 0, 3 | 1, 2 |
| `numm-opt-2` Gradient descent, Newton and Adam | 6 | 2, 5 | 0 |
| `numm-opt-3` KKT conditions | 6 | 2, 4 | 1, 5 |
| `numm-opt-4` Penalty and augmented Lagrangian | 6 | 0 | 1, 3 |
| `numm-reg-1` Linear fits and r² | 6 | 0, 5 | 3, 4 |
| Total | 30 | 9 | 9 |

The worked numbers are re-derived above their card calls and were checked independently against the source examples. The Armijo bounds display four significant figures. The comments retain the exact trial bounds. Regression uses the demo's eight observations and computes r² from unrounded sums.

## Validation

- Reveal-card checker reported `30 reveal cards in 5 lessons checked, 0 with issues`.
- Course runner reported `5 lessons run, 0 with issues`.
- Build and coverage check found `b107` and all 30 card indices across five lessons.
- Visually reviewed all 30 finished cards and all 9 answered Guesses at 375 × 812. The screenshots are in the ignored `codex/shots/` directory.

## Existing questions to review

- `numm-opt-3#4` requires feasibility and multiplier sign to be checked before complementary slackness. These checks can be swapped. Accept the equivalent order `[0,1,3,2,4]` or specify the required sequence.
- `numm-reg-1#4` and `numm-reg-1#5` show two backslashes for MATLAB left division. Use a single backslash. In #5 this leaves the intended `x^j` line as the only broken line and preserves the answer index.
- `numm-opt-2#3` could clarify that Newton's guarantee holds from every start on this quadratic. Gradient descent can also arrive in one step from a single eigendirection with a reciprocal-curvature step size.

Question changes are for the integration pass. No unresolved numerical or content decisions for Seth.

# Linear Algebra reveal cards

Staged against `b114` for review on `codex-cards-linalg`. Converted all 96 cards across 24 lessons. There are 29 Guesses, 24 Fills, and 43 cards without an interaction. The indices below are zero-based. The app's original cards and questions remain in place.

| Lesson | Cards | Guess indices | Fill indices |
| --- | ---: | --- | --- |
| `linalg-matrices-1` | 4 | 0, 2 | 1 |
| `linalg-matrices-2` | 4 | 0 | 2 |
| `linalg-matrices-3` | 4 | 1 | 2 |
| `linalg-matrices-4` | 4 | 0 | 2 |
| `linalg-spaces-1` | 4 | 0 | 2 |
| `linalg-spaces-2` | 4 | 0 | 2 |
| `linalg-spaces-3` | 4 | 1 | 2 |
| `linalg-spaces-4` | 4 | 0, 2 | 1 |
| `linalg-determinants-1` | 4 | 1 | 2 |
| `linalg-determinants-2` | 4 | 0, 3 | 2 |
| `linalg-determinants-3` | 4 | 0 | 2 |
| `linalg-determinants-4` | 4 | 0 | 3 |
| `linalg-eigenvalues-1` | 4 | 2 | 3 |
| `linalg-eigenvalues-2` | 4 | 0, 3 | 2 |
| `linalg-eigenvalues-3` | 4 | 1 | 2 |
| `linalg-eigenvalues-4` | 4 | 2 | 3 |
| `linalg-orthogonality-1` | 4 | 2 | 3 |
| `linalg-orthogonality-2` | 4 | 0 | 1 |
| `linalg-orthogonality-3` | 4 | 0 | 3 |
| `linalg-orthogonality-4` | 4 | 0 | 2 |
| `linalg-svd-1` | 4 | 0 | 3 |
| `linalg-svd-2` | 4 | 0 | 2 |
| `linalg-svd-3` | 4 | 0, 3 | 2 |
| `linalg-svd-4` | 4 | 0 | 2 |

## Checks

- `python3 tools/check.py cards course linalg --extra codex/cards/linalg.js` reported “96 reveal cards in 24 lessons checked, 0 with issues.”
- `python3 tools/check.py course linalg --extra codex/cards/linalg.js` reported “24 lessons run, 0 with issues.”
- A runtime coverage check found all 24 lessons registered in `RC98` and all 96 original card indices present.
- Reviewed 96 finished cards and 29 answered Guesses from 2× screenshots at a 375 × 812 viewport. The browser checks used cloud Chromium and mock Firebase.
- An independent Python calculation verified all 28 numerical question keys.

## Question wording for review

- `linalg-svd-1#1` asks for the largest singular value after listing eigenvalues 9 and 4 of the transpose product. Specify that 9 is the largest eigenvalue, or that those are the only eigenvalues. The intended answer is 3.
- `linalg-determinants-1#4` orders two diagonal products that can be computed independently. With the two products labeled, give credit for either order and ask for the main-diagonal product minus the opposite-diagonal product.

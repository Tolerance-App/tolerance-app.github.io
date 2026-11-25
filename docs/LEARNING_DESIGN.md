# Learning design for lesson cards

Read this before building or changing lesson cards, writing new card content, or adding any new
way to learn in the app (card interactions, reveals, prompts, review). It records what the learning
research says, what Seth has decided, and the patterns that came out of the card mockups
(2026-11-23 to 2026-11-25).

Status: **design only, not built in the app yet.** The mockups are claude.ai artifacts:

- Lesson card study (Now, A, B, A+B, C, D compared): https://claude.ai/artifact/RPm8VfTLxmmsGoCqSz8Zzu
- Reveal cards (Step, Guess, Fill, Turn, Guess + Fill): https://claude.ai/artifact/ThHBR9dqoRG7JHeXxi6eVy

## The problem we're solving

Lesson cards are short (content export: 1,386 cards, median 131 characters, longest 297; 306 contain
a formula or comparison) but dense. Today each card is one 17.5 px semibold paragraph with formulas,
symbols and units inside the sentences, and without a figure the rest of the screen is empty.

## Seth's decisions

1. **Layout: A + B.** Regular-weight text, one sentence per line, values and symbols in small chips
   (A), with B's structure: a formula gets its own box with a legend for its symbols, worked numbers
   become givens then steps, contrasts sit side by side.
2. **Reveal one piece per tap (D).** Tap **anywhere** on the screen (not only the card) for the next
   piece. When the card is finished, the next tap goes to the next card. Nothing should need scrolling
   on a phone: the card, its pieces and any question must fit one screen.
3. **Math font: upright serif** (the "Serif" option in the mockups, STIX Two Text upright). The
   math-italic/cursive look was hard to read. Seth wants a reading-font setting later so engineers can
   pick what they're used to (Sans, Mono, Serif); keep fonts behind a token so that's easy.
4. **Guess and Fill are the two interactions to build.** Pick by the answer's shape:
   - **Guess** when there are only a few possible answers: a number from 2–3 options, higher/lower,
     doubles/halves/same, true/false, which of two. Ask *before* the piece that answers it.
   - **Fill** for **words**, where there would be too many options to guess from. The key word
     arrives hidden; the learner thinks of it, then taps the gap. Numbers stay visible in Fill (they
     belong to Guess).
   - The mockup's default combines them ("Guess + Fill"): word blanks on the pieces, plus one quick
     prediction per card.
5. **Don't show "A wrong guess still helps you remember."** Not on real cards. (Keep the idea in
   the design: guesses are low-stakes and never cost XP, but don't tell the learner so on the card.)
6. Keep the "You were sure, so this is the one worth remembering" line for a confident wrong guess.

Other interactions from the mockups that Seth hasn't chosen (keep for later, don't build unasked):
"Your turn" (an apply question at the end, or the last worked step left blank), an optional "Why?"
self-explanation check, and C ("fill the space": promote the formula/numbers to a hero panel when a
card has no figure).

## What the research says

| Finding | What it means for cards | Source |
|---|---|---|
| Of ten study techniques, only **practice testing** and **spacing practice out** rated high utility. Rereading, highlighting and summarizing rated low. | A reveal on its own is still reading. The guesses and blanks are what make a card stick. Feed card ideas back later through review/mistakes (spacing). | Dunlosky et al. 2013, [summary](https://www.aft.org/ae/fall2013/dunlosky) |
| **Segmenting**: learner-paced pieces gave small-to-medium gains in retention and transfer (56 studies). Strongest for complex material and beginners. | One piece per tap, learner-paced. | Rey et al. 2019, [doi](https://www.doi.org/10.1007/S10648-018-9456-4); Mayer, [segmenting principle](https://www.cambridge.org/core/books/multimedia-learning/segmenting-principle/37240877DDA0362355ADB39936027982) |
| **Pretraining**: knowing the parts first makes the whole easier. | Show the symbols (legend) before the formula that uses them. | Mayer (same) |
| **Pretesting**: guessing before reading improved memory even for items answered wrong. Learners don't notice the benefit. | Guess before the reveal. Make it low-stakes: no XP lost, no "wrong" penalty in score. | Richland, Kornell & Kao 2009, [pdf](https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf); Pan & Rivers 2023, [pmc](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9839203/); review, [Springer 2023](https://link.springer.com/doi/10.1007/s10648-023-09814-5) |
| **Hypercorrection**: errors made with high confidence are corrected more often after feedback than guesses. | Ask "How sure?" (Guess / Fairly / Sure) with the prediction; call out a confident miss. | Butterfield & Metcalfe 2006, [Springer](https://link.springer.com/article/10.1007/s11409-006-6894-z) |
| **Generation effect**: producing an answer beats reading it; robust, largest for recognition and cued recall. | Fill: hide the key word, let them produce it, then tap to check. | Bertsch et al. 2007, [PubMed](https://pubmed.ncbi.nlm.nih.gov/17645161/); McCurdy et al. 2020 / Schindler & Richter 2023, [Springer](https://link.springer.com/article/10.1007/s10648-023-09758-w) |
| **Worked examples, then fading**: novices learn from full worked examples; removing steps from the end lets them take over. Self-explanation prompts help, but can hurt when stacked on top of explanations. | Worked-number cards: givens, then steps. If a step is ever left for the learner, make it the last one. Keep any "Why?" prompt optional. | [Worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect); Renkl & Atkinson, [fading](https://escholarship.org/content/qt2854h4v0/qt2854h4v0.pdf) |
| **Expertise reversal**: guidance that helps beginners can slow down people who know the material. | Give a way to reveal the whole card at once (mockup: "All"), e.g. on repeat visits or for placed-out users. | Kalyuga 2007, [Springer](https://link.springer.com/article/10.1007%2Fs10648-007-9054-3) |
| **Curiosity**: a question that opens a gap improves memory for what fills it. Whether it helps unrelated nearby facts is less settled. | A Guess can open a card (e.g. "Audio goes to 20 kHz. Sample above…?"). Don't count on curiosity to carry unrelated facts. | Gruber et al. 2014, [pmc](https://pmc.ncbi.nlm.nih.gov/articles/PMC4252494/); Keller et al. 2024, [Nature](https://www.nature.com/articles/s41539-024-00234-w.pdf) |

These were read from abstracts and summaries in one research pass, not the full papers. Check a
primary source before quoting an effect size.

## Patterns for building a card

- **Pieces.** Split a card into 2–5 pieces: a symbol legend, a formula box, a sentence, a givens grid,
  a step, a contrast pair, a value row. Keep the lesson's own wording; the card text is content and
  follows the content rules in `CLAUDE.md`.
- **Order.** Symbols before the formula. Givens before steps. The fact a Guess asks about comes
  right after the Guess.
- **Guess (prediction).**
  - At most one per card (two only on long cards). 2–3 short options, exactly one correct.
  - Each option's `why` names the specific mistake behind it (same rule as question `why`s).
  - Feedback after answering: show the chosen option and the correct one only; drop the others.
  - When the learner moves on, the answered Guess shrinks to one line (✓ Predicted X / ✗ Predicted X
    · answer: Y).
  - While a Guess is open, the pieces before it fold into one bar ("The card so far · N pieces · tap
    to look back"). That keeps it on one screen and makes the answer real recall.
  - Tapping elsewhere doesn't skip an unanswered Guess (the mockup shakes it instead).
- **Fill (word blank).**
  - Blank only words or short phrases: names, terms, verbs like "collides". Never numbers or
    formulas (those are Guess material).
  - One to four blanks per card; the gap is the hidden word's width.
  - The next tap reveals the next piece even if a blank is still closed (blanks are optional, never
    a gate).
- **Keep it quick.** A card with its pieces, one Guess and its feedback must fit 375 × 812 without
  scrolling, with the bottom area the Continue button normally uses.
- **Progress dots** under the card show pieces (round) and questions (square).

## Things to keep straight when this is built

- Card guesses and blanks are **not** lesson questions. Don't put them in `qs`: question keys
  `"<lessonId>#<index>"` must never shift. Store them in new optional fields on the lesson (e.g.
  a per-card `guess` object, and a blank marker in card text such as `[[word]]`), so old content
  still renders as plain A + B.
- Guesses don't change `SS.score`, XP or pass/fail. If they're logged, use new fields in the `ev`
  record and add them to the rules' `hasOnly` list (see `CLAUDE.md`).
- Every lesson still needs its demo or visual; the reveal changes how text arrives, not that rule.
- New Guess questions and Fill choices are new content: re-derive every number, follow the content
  rules, and have Seth review before shipping.
- Tap-to-define words (`gl89`) still apply inside pieces; a blank should not also be a defined word.

## Ideas not tried yet

- Bring a card's Guess back days later in review, without the card (spacing + retrieval).
- Higher/lower slider instead of buttons for numeric Guesses.
- Reading-font setting in Settings (Sans / Mono / Serif), applied to math and optionally all card text.

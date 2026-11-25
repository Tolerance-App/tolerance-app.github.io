# Learning design for lesson cards

Read this before building or changing lesson cards, writing new card content, or adding any new
way to learn in the app (card interactions, reveals, prompts, review). It records what the learning
research says, what Seth has decided, and the patterns that came out of the card mockups
(2026-11-23 to 2026-11-25).

Status: **design settled; renderer built in b98 (`v98.js`) with the 9 mockup cards as the test set.**
The chosen style is **Guess + Fill (G+F) with upright serif math**. Next step: convert every lesson
card to it, course by course (format and workflow: the `lesson-cards` skill; progress:
`docs/CARD_CONVERSION.md`), using the card style catalogue and rewriting notes below. The mockups
are claude.ai artifacts:

- Lesson card study (Now, A, B, A+B, C, D compared): https://claude.ai/artifact/RPm8VfTLxmmsGoCqSz8Zzu
- Reveal cards, final G+F style (nine real cards; **?** shows each card's style):
  https://claude.ai/artifact/ThHBR9dqoRG7JHeXxi6eVy

## The problem we're solving

Lesson cards are short (content export: 1,386 cards, median 131 characters, longest 297; 306 contain
a formula or comparison) but dense. Today each card is one 17.5 px semibold paragraph with formulas,
symbols and units inside the sentences, and without a figure the rest of the screen is empty.

## Seth's decisions

1. **Layout: A + B.** Regular-weight text, one idea per piece, values and symbols in small chips
   (A), with B's structure: a formula gets its own box with a legend for its symbols, worked numbers
   become givens then steps, contrasts sit side by side.
2. **Reveal one piece per tap (D).** Tap **anywhere** on the screen (not only the card) for the next
   piece. Nothing should need scrolling on a phone: the card, its pieces and any question must fit
   one screen.
   - If a hidden word (Fill) is still showing, a tap anywhere fills it in first; the next tap moves on.
   - An open Guess must be answered; tapping elsewhere shakes it.
   - **Continue is hidden until the card is finished** (all pieces shown, Guess answered, blanks
     filled), then appears in its usual place. Hiding saves space; if hiding causes layout trouble
     in the app, grey it out instead. When finished, a tap anywhere also goes on.
   - No end-of-card text ("That's the card…"); Continue is the signal. A faint "Tap anywhere for the
     next piece" shows only on the first piece.
   - Earlier pieces are dimmed while the card reveals, and go back to full opacity once it's
     finished, so it reads as a whole.
3. **Math font: upright serif** (STIX Two Text upright). The math-italic/cursive look was hard to
   read. Text stays sans; serif is for math only. Seth wants a reading-font setting later so
   engineers can pick what they're used to (Sans, Mono, Serif); keep fonts behind a token.
4. **Guess and Fill, used sparingly.** At most one per card, and about half the cards get none (the
   mockup: 3 Guess, 3 Fill, 3 with nothing). Both work on **relations**: faster/slower,
   higher/lower, more/less, halves/quarter/eighth, true/false. Not on variables or symbol names,
   unless one is really needed, and then late in the card. Pick by the answer's shape:
   - **Guess** when there are only a few possible answers. Ask it *before* the piece that answers
     it, never on the first piece (set the idea up first).
   - **Fill** for **words**, where there'd be too many options to guess: the relation word or
     phrase ("more than twice", "exponentially", "subsonic"). Numbers, symbols and formulas are
     never blanked. The piece that gives the answer away (e.g. the formula) comes after the blank,
     not in the same piece.
5. **No "A wrong guess still helps you remember"** on real cards. Guesses are low-stakes and never
   cost XP, but the card doesn't say so.
6. **No "How sure?" question.** It added baggage, so no confidence buttons and no "You were sure…"
   line. Guess feedback is Right / Not quite plus the chosen option's `why`.
7. **Sub- and superscripts stay readable**, about 12 px or more: 0.78 em in math chips and steps,
   0.68 em in the 25 px formula box, 0.85–0.9 em in small text (units, captions). Never stack them
   two deep: write `exp(Δv / vₑ)`, not e with a fraction in its exponent. Square roots get a bar over
   the radicand (√ plus a top border), not `√(…)`.

Dropped after trying them: Step only (no interactions), Turn (an apply question at the end, or the
last worked step left blank), the optional "Why?" self-explanation, How sure?. Not chosen, kept for
later: C ("fill the space": promote the formula/numbers to a hero panel when a card has no figure).

## Card style catalogue

Every card is built from these styles. Pick by what the card's text is doing; a card can combine
two. The interaction listed is what the mockup used; most cards in a lesson should have none.

| Style | Use it when the card… | Pieces, in order | Mockup card |
|---|---|---|---|
| **Legend → formula** | introduces an equation with 2+ new symbols | symbols box ("First, the symbols") → formula box, assumption as a small caption under it → meaning in a sentence → rearranged form in its own box. Fill: the relation word in the sentence. | Rocket equation |
| **Worked example** | runs numbers through a formula | givens grid (symbol, value, unit) → one step per piece, formula left and result right, final result in blue → closing note. No interaction. | Beam worked example |
| **Scaling table** | says "double X and Y changes by…" | what's held fixed → Guess on one factor → change table (rows: the change; columns: each output as ×/÷) → the proportionality in one line. | Deeper or wider |
| **Rule in words → formula** | states a rule that also has a formula | the rule as a sentence (Fill on its relation) → formula box → a second formula with legend, if any → one worked value row. | Sampling rate |
| **Process chain** | describes a path or sequence of parts | what the part does → chain chips with arrows, the subject highlighted → why it matters → a real example as a value row. No interaction. | Anti-alias filter |
| **Definition → compare pair** | defines a quantity, then contrasts two cases | definition box with legend → two value panels (label, condition, big value), the bad case in orange. No interaction. | Load factor |
| **Terms** | defines two or three related words | symbol tile + one sentence per term → true/false Guess on the common misconception → takeaway in bold. | Heat and work |
| **Formula → value rows** | gives a formula and typical values | condition in a sentence → formula box with legend → first value row → higher/lower Guess → second value row with the relation in one line under it ("Colder air, slower sound: a ∝ √T"). | Speed of sound |
| **Plain text + change tiles** | describes what rises and falls | sentence → tiles with ↑ (orange) / ↓ (blue) and the quantity → closing sentence, Fill on its relation word. | Shock waves |

Components (class names in the mockup): `eqb` formula/legend box with `eqlab` label and `eqn`
caption, `vars` symbol legend, `givens`/`gv` grid and tiles, `step` row, `pc` value panel, `tbl`
change table, `term` symbol tile, `vt` value row, `chain`, `take` bold takeaway, `f` inline math chip.
Pieces per card: 2–5. Kicker above the card: "<lesson> · idea i of n".

## Rewriting card text

Read every card like an engineer before shipping it. The nine mockup cards needed these fixes, and
the same problems will turn up across the content:

- **State the conditions.** "Depends only on temperature" → "For an ideal gas, …". The rocket
  equation gets "constant vₑ, no gravity or drag losses". A worked example says which beam it is.
- **Define every symbol where it's used**, including half-familiar ones (γ is the heat-capacity
  ratio, R the gas constant).
- **Don't say a rule twice in one breath.** "Sample faster than fₛ > 2B" → the rule in words, then
  the formula.
- **Say what a parameter does,** not just its type: "k: the whole number that puts fₐ between 0 and
  fₛ/2", not "k an integer".
- **Give a vague claim its reason or an example.** "Its transition band requires margin" → a real
  filter can't cut off instantly, plus CD audio (B = 20 kHz, fₛ = 44.1 kHz).
- **Name what changes.** "A sudden jump" → "a thin front where the flow properties jump", then tiles.
- **Add the missing step** in a worked example (M = PL before σ = Mc/I).
- **Split run-on cards.** Each piece is one idea; a sentence carrying a colon and a semicolon is
  usually two pieces.
- Value panels read label → condition → value; don't let the label read as a broken sentence
  ("Every key collides / O(n) / a lookup can take" became "Worst case / every key in one bucket / O(n)").

## What the research says

| Finding | What it means for cards | Source |
|---|---|---|
| Of ten study techniques, only **practice testing** and **spacing practice out** rated high utility. Rereading, highlighting and summarizing rated low. | A reveal on its own is still reading. The guesses and blanks are what make a card stick. Feed card ideas back later through review/mistakes (spacing). | Dunlosky et al. 2013, [summary](https://www.aft.org/ae/fall2013/dunlosky) |
| **Segmenting**: learner-paced pieces gave small-to-medium gains in retention and transfer (56 studies). Strongest for complex material and beginners. | One piece per tap, learner-paced. | Rey et al. 2019, [doi](https://www.doi.org/10.1007/S10648-018-9456-4); Mayer, [segmenting principle](https://www.cambridge.org/core/books/multimedia-learning/segmenting-principle/37240877DDA0362355ADB39936027982) |
| **Pretraining**: knowing the parts first makes the whole easier. | Show the symbols (legend) before the formula that uses them. | Mayer (same) |
| **Pretesting**: guessing before reading improved memory even for items answered wrong. Learners don't notice the benefit. | Guess before the reveal. Low-stakes: no XP lost, no penalty in score. | Richland, Kornell & Kao 2009, [pdf](https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf); Pan & Rivers 2023, [pmc](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9839203/); review, [Springer 2023](https://link.springer.com/doi/10.1007/s10648-023-09814-5) |
| **Hypercorrection**: errors made with high confidence are corrected more often after feedback than guesses. | Tried as a "How sure?" step and dropped (too much baggage). A Guess on a common misconception gets some of the same surprise. | Butterfield & Metcalfe 2006, [Springer](https://link.springer.com/article/10.1007/s11409-006-6894-z) |
| **Generation effect**: producing an answer beats reading it; robust, largest for recognition and cued recall. | Fill: hide the key word, let them produce it, then reveal. | Bertsch et al. 2007, [PubMed](https://pubmed.ncbi.nlm.nih.gov/17645161/); McCurdy et al. 2020 / Schindler & Richter 2023, [Springer](https://link.springer.com/article/10.1007/s10648-023-09758-w) |
| **Worked examples, then fading**: novices learn from full worked examples; removing steps from the end lets them take over. Self-explanation prompts help, but can hurt when stacked on top of explanations. | Worked-number cards: givens, then steps. | [Worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect); Renkl & Atkinson, [fading](https://escholarship.org/content/qt2854h4v0/qt2854h4v0.pdf) |
| **Expertise reversal**: guidance that helps beginners can slow down people who know the material. | Give a way to reveal the whole card at once (mockup: "All"), e.g. on repeat visits or for placed-out users. | Kalyuga 2007, [Springer](https://link.springer.com/article/10.1007%2Fs10648-007-9054-3) |
| **Curiosity**: a question that opens a gap improves memory for what fills it. Whether it helps unrelated nearby facts is less settled. | A Guess can open the key fact. Don't count on curiosity to carry unrelated facts. | Gruber et al. 2014, [pmc](https://pmc.ncbi.nlm.nih.gov/articles/PMC4252494/); Keller et al. 2024, [Nature](https://www.nature.com/articles/s41539-024-00234-w.pdf) |

These were read from abstracts and summaries in one research pass, not the full papers. Check a
primary source before quoting an effect size.

## Patterns for building a card

- **Pieces.** Split a card into 2–5 pieces using the styles above. Keep the lesson's meaning; the
  card text is content and follows the content rules in `CLAUDE.md`.
- **Order.** Symbols before the formula. Givens before steps. The fact a Guess asks about comes
  right after the Guess.
- **Guess (prediction).**
  - At most one per card, on roughly a third of cards. 2–3 short options, exactly one correct; two
    options sit side by side.
  - Each option's `why` names the specific mistake behind it (same rule as question `why`s).
  - Feedback: show the chosen option and the correct one only; drop the others.
  - When the learner moves on, the Guess **disappears** (no "✓ Predicted X" line; Seth found it
    cluttered). The piece right after it must state the answer cleanly as a relation instead: the
    guessed cell highlighted in blue in a change table, a one-line relation under value rows
    ("Colder air, slower sound: a ∝ √T"), or the misconception answered in the takeaway ("A hot
    coffee holds internal energy U, not heat"). The square dot stays in the progress dots.
  - A blank's reveal animation plays once, when it opens, never again on later taps.
  - While a Guess is open, the pieces before it fold into one bar ("The card so far · N pieces · tap
    to look back"). That keeps it on one screen and makes the answer real recall.
- **Fill (word blank).**
  - One per card, on roughly a third of cards. Only a relation word or short phrase.
  - The gap is the hidden word's width. Tap the gap, or tap anywhere, to fill it; never skipped unseen.
- **Keep it quick.** A card with its pieces, its Guess and the feedback must fit 375 × 812 without
  scrolling, including the Continue button once it appears.
- **Progress dots** under the card show pieces (round) and the Guess (square).

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
- The mockup's top strip (‹ card ›, All, ?) is mockup-only. "All" (reveal the whole card) is worth
  keeping in some form for repeat visits; where it goes in the app is undecided.

## Ideas not tried yet

- Bring a card's Guess back days later in review, without the card (spacing + retrieval).
- Higher/lower slider instead of buttons for Guesses on a number.
- Reading-font setting in Settings (Sans / Mono / Serif), applied to math and optionally all card text.

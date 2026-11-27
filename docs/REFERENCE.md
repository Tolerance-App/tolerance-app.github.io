# Tolerance — full reference

The complete project notes (moved out of CLAUDE.md on 2026-11-25 so they don't load on every message).
CLAUDE.md keeps the rules that apply to every task; grep this file by heading when a task touches that feature.
Keep adding feature notes here, not to CLAUDE.md.

Duolingo-style app for engineers: short daily lessons across many engineering subjects (vocab, variables,
equations, component design, design review, "how it sounds at work"). Owner: Seth (CU Boulder mechanical and
aerospace student). Testers: engineers, engineering students and non-engineers, mostly on phones.

The working name is **Tolerance**. A rename is undecided (Shim, Nominal and Epsilon were all set aside), so
don't rename anything in code or UI unless Seth asks.

## Where things live

- **Live site:** https://tolerance-app.github.io/ — GitHub Pages from `main`, repo root (`.nojekyll` present).
  Repo: `Tolerance-App/tolerance-app.github.io` (public). Pushing to `main` deploys in about 1–2 minutes.
- **Old addresses:**
  - `sethijacob.github.io/tolerance` was a 404 after the repo moved to the Tolerance-App org on 2026-11-16.
    Since 2026-11-21 it is a forwarding page that carries progress over (see "Open items").
  - The old claude.ai artifact (`cdd7542b-…`) shows a "Tolerance has moved" card whose button points at that
    address, so it reaches the new site again through the forwarding page.
- **Backend:** Firebase project `tolerance-fe244` (free Spark plan). Anonymous auth only, plus Firestore.
- **Security rules:** `firestore.rules` in the repo is the source of truth, but it is **published by hand** in
  Firebase console → Firestore → Rules. There's no `firebase.json` yet. If the Firebase CLI is set up, deploy
  with `firebase deploy --only firestore:rules` and check them in the emulator first.
- **Project docs:** decision and build logs live in the claude.ai Project "Engineering Duolingo App"
  (files like `PROGRESS_SYNC_…`, `MOVE_TO_OWN_SITE_B33_…`, `LESSON_STATS_B34_…`). `README.md` is out of date:
  it still gives the old URL.

## How the code is built (read this before editing)

- `index.html` (~1.6 MB) is the whole app: CSS, one big script, and the lesson content. Inside it, builds are
  **stacked layers** marked `/* ===== vNN … ===== */` (v4 through v30, plus b31). Each layer changes earlier
  behavior by wrapping functions:
  ```js
  const _fin34 = finishSession;
  finishSession = function () { /* before */ const r = _fin34.apply(this, arguments); /* after */ return r };
  ```
  The same function is often wrapped 5–9 times (`finishSession`, `home`, `showQ`, `settings`, `feedback`…).
  The last wrapper loaded wins, and every wrapper must call through to the one before it.
- **A new build is a new file:** `vNN.js`, plus one `<script src="vNN.js">` tag placed after the previous one
  and before the boot line `<script>applyTheme();build();home();netInit();</script>`. Current order:
  `fbsdk.js → fbnet.js → v32.js → v33.js → v34.js → v35.js → v36.js → v37.js → v38.js → v39.js → v40.js → v41.js → v42.js → v43.js → v44.js → v45.js → v46.js → v47.js → v48.js → v49.js → v50.js → v51.js → v52.js → v53.js → v54.js → v55.js → v56.js → v57.js → v58.js → v59.js → v60.js → v61.js → v62.js → v63.js → v64.js → v65.js → v66.js → v67.js → v68.js → v69.js → v70.js → v71.js → v72.js → v73.js → v74.js → v75.js → v76.js → v77.js → v78.js → v79.js → v80.js → v81.js → v82.js → v83.js → v84.js → v85.js → v86.js → v87.js → v88.js → v89.js → v90.js → v91.js → v92.js → v93.js → v94.js → v95.js → v96.js → v97.js → v98.js → v99.js → v100.js → v101.js → v102.js → v103.js → v104.js → v105.js → v106.js → v107.js → v108.js → v109.js → v110.js → v111.js → v112.js → v113.js → v114.js → v115.js → v116.js → v117.js → v118.js → v119.js → phys/kit.js → phys/demos-motion.js → phys/p1-1d.js → v120.js → boot`.
  - Don't rewrite or reformat old layers inside `index.html`. Prefer small, targeted wrappers in the new file.
  - Set `FB.ver="bNN"`, and add a "What's new" entry with `NEWS.unshift({d, t:[…]})` when testers would notice the change.
  - **Bump `version.json` to `{"v":"bNN"}`** with every build. Since v42 the app fetches it (no-store) on open
    and on returning to the foreground, and reloads at `./?b=bNN` once the user is on a calm screen.
    Without the bump, Home Screen apps keep running the old build.
    b56 adds Settings → Beta → Updates ("Running bNN · latest bMM", tap to force a fresh reload) and lets the
    daily screen count as calm.
- Because they're wrapped, functions declared with `function x(){}` get **reassigned** later (`x=function…`).
  Grep for `x=function` before assuming which version runs.
- **Key globals:**
  - `st`: user state, saved to localStorage `tol3`.
  - `SS`: the current session (`kind`: lesson, review, practice or place; `qs`, `i`, `score`, `t0`, `l`, `u`).
  - `LS`: all lessons after `build()`. `QX`: question lookup by key. `NODES` / `UNITS`: the path.
  - `view`: the current screen. `NET`: db, uid, save status.
  - `DEMOS`: lab registry. `QD30`: per-question equation map. `PASS={lo:.5,hi:.8}`.
- `fbnet.js` makes the claude.ai artifact API (`claude.use("db")` / `claude.use("user")`, `db.doc(p).get/.set`,
  `db.collection("people").onSnapshot`) work on top of Firebase. The app code still talks to that interface, so
  keep new storage code on it (`NET.db.doc(path).set(...)`). That's what lets the app move backends without rewrites.
- `fbsdk.js` is Firebase JS SDK 13.4.0 bundled with esbuild from `tools/sdkentry.js`. It exports only
  initializeApp, getAuth, signInAnonymously, onAuthStateChanged, the persistence helpers, getFirestore, doc,
  getDoc, setDoc, deleteDoc and onSnapshot. To use anything else, add it to `sdkentry.js` and rebuild with
  esbuild. `stats.html` gets Firestore from the gstatic CDN instead.

## Progress: rules that must not break

Seth's top rule: **a new build must never reset anyone's progress.**

1. Never rename the localStorage key `tol3` or the Firestore paths `data/users/{uid}/progress`, `progress_bak`,
   `people/{uid}`, `fb/{uid}` or `ev/{id}`. You may add fields but never remove them. If a field's shape has
   to change, migrate it when the app loads.
2. **Sync only adds.** `mergeP28` (wrapped in v32) never lowers `done`, `xp`, `best`, `days`, `blind` or
   `doneAt`. Streak and last-day come from the copy with the later day; everything else comes from the newer
   copy. A blank start-up copy never counts as newer (`FR32`). Keep this behavior.
   Mistakes merge key by key (v96): `st.miss[key]` = time missed (old entries 1), `st.missOff[key]` = time fixed; a
   key stays if it was missed after its last fix on either copy. Before b96 `miss` came whole from the newer copy, so
   a re-added Home Screen app (which saves during onboarding) wiped mistakes on Google sign-in. Any new per-key
   collection in `st` that can shrink needs the same treatment, not newer-wins.
3. Before the first push each day, the previous cloud copy is saved to `progress_bak`.
4. **An anonymous account belongs to one origin.** Moving to a new domain or path gives every user a new,
   empty account. Never change where the site is hosted without a move path. The existing move path is
   `#import=<base64url JSON {tolerance:"move", st}>`, which the new site merges with `mergeP28` (see `v33.js`).
5. **A Home Screen app on iPhone is a separate device** with its own empty storage and account. v35 asks
   on its first open, "Played Tolerance before?", and offers to paste a progress code. Restoring onto a
   blank copy fills in courses, placement and the welcome (a progress code carries only xp, streak, best,
   last, done, miss, days and blind).
6. Settings → Progress also has "Copy progress code" and "Restore progress", which work by hand.

## Lesson content

- **Learning design: read `docs/LEARNING_DESIGN.md` first** whenever you build or change lesson cards,
  write card content, or add any new way to learn. It has the research summary and Seth's decisions:
  A + B card layout, tap anywhere to reveal the next piece, upright serif math, **Guess** for answers
  with few options (numbers, higher/lower, true/false) and **Fill** for words.
- **Where it lives:**
  - Lessons are in `const BUNDLE=[…]` inside `index.html`, in "v8 format":
    `{id, sub, subName, field, section, branch, lv, title, req, plain, cards, eqs, talk?, demoNeeded?, figNeeded?, qs}`.
  - Older lessons come from `BASE` (array rows plus `NQ`).
  - Later builds patch or add lessons by changing `BUNDLE` before `build()` runs. v32 uses `BUNDLE.push`
    guarded by `bq32(id)`.
- **Levels:** `lv` is 1–6 in content (Basics, Applied, Advanced, Expert, Professional, Specialist).
  `build()` stores it as 0–5.
- **Question types:**
  - `mc`, `say`, `decode` (with `who`): exactly 3 wrong options.
  - `fill`: a numeric `a` with relative `tol` and `unit`, or a text `a` given as a list.
  - `order`: items listed in the correct order. `match`: 3–5 pairs. `spot`: `lines` plus a 0-based `bad`.
- **Ids are permanent.** Progress (`st.done[id]`) uses the lesson id. Mistakes (`st.miss`), the equation map
  (`QD30`) and stats use question keys `"<lessonId>#<index>"`, where index is the question's position. So
  **never reorder or insert questions in the middle of an existing lesson.** Add new ones at the end. If you
  really must restructure, migrate the old keys.
- **Content rules** (from the handoff to ChatGPT, which writes most of the content):
  - Re-derive every number yourself.
  - Every card with a formula says what is held constant and what the model assumes.
  - No "always", "much" or "exponentially" without stated conditions.
  - Each objective is tested by at least 2 questions in different forms. The mistake queue asks a sibling
    question after a correction.
  - Each `why` names the specific mistake behind each wrong option.
  - Use SI units with explicit `tol`, and 3–4 significant figures.
  - Stress is never a safety verdict.
- **Demos and figures:**
  - The labs are in `DEMOS`, and v17 is the data-driven 2D demo engine.
  - The Lab lists lessons; a model shows there only through its lesson (`DEMO_OVR`). v39 adds standalone
    "model sets" (Computational Methods, Dynamics and Control) for demos without lessons: `XD39` holds the
    pasted spec JSON, `XS39` the sets. The top-right plot `note` fits about 36 characters on a phone.
  - Seth wants every lesson to have a demo or visual. Any question that refers to a graph should show one.
  - The **ideas in the existing demos must be kept** even when their visual style is redone.
- Seth wants as much content as possible and will cut it back later. "Nothing is too specialized." Lessons
  may appear in more than one place.

## Lesson stats (b34)

- `v34.js` writes one record per finished or quit lesson, review or practice session to `ev/{uid}_{rand}`.
  - Fields: `u k id t sub br lv n sc pass sec ok miss end at v d ts`. `ok` and `miss` hold first-answer question keys.
  - Records are queued in localStorage `tol_ev` while offline. Placement tests aren't logged.
- `stats.html` is a private dashboard. Rules allow reading `ev` and progress docs only for the IDs listed in
  `isAdmin()`: Seth's phone `WHBKG7KuQRSLpzV30OufPId1VRb2` (older phone ID; one browser or the Home Screen app), his phone's
  stats.html ID `2XLhCOa10YY7DrCgB9CyG3a6Awn2` (added 2026-11-17), computer `P2jBBhX9biR9oE6z9bZtLtGGnUf2`, new phone ID `Qpuv5OLWVcSYxi6055NJi3TyfgI2` (added 2026-11-18), and the Chrome
  profile Claude in Chrome uses `u0izSBG81pVQ2pqO1EGF8RDzB3m2` (added 2026-11-17 so Claude can read stats.html).
- If you add a field to an `ev` record, add it to the `hasOnly([...])` list in the rules too.
- Until 2026-11-17 the published rules refused `ev` writes, and v34 drops a record on a permission error, so
  there are no lesson stats from before that date. A `diag-test` record (k "test") from the Chrome admin is in `ev`.
- If you add an admin ID to `isAdmin()`, add it to `SETH` in `flags.html` too.

## Tester flags (flags.html)

- `flags.html` is the admin flags page (link at the top of stats.html). It lists every item in every `fb/{uid}`
  doc, newest first, with its context (lesson, part, question key, screen, build, viewport).
- Triage lives in `fbtri/{uid}_{itemId}`: `s` status (open, fixed, wontfix, dup), `c` category (bug, content, ui,
  idea, question, other), `fix` build (typing one marks the flag fixed), `note`, `at`, `by`. Admin-only in the rules.
- Price-survey answers (`type:"price"`) are hidden unless ticked. "Copy list as text" copies the filtered list.
- **Test recent fixes** (`v48.js`, `TF48`): a Settings checklist shown only on admin IDs (or a device that
  opened the site with `#fixes`, or tapped the copyright line at the bottom of Settings 7 times: v49, for
  the Home Screen app). Each entry jumps to a lesson, an exact question (by key) or a Lab model.
  **Every build that fixes a lesson, question or model adds an entry to the top of `TF48`** so Seth can
  check it on his phone. Sessions opened from it skip lesson stats (`SS.logged34`).
- Old flags: the 98 flags from the old claude.ai artifacts (all Seth's, b1–b30) were imported on 2026-11-19 into
  `fb/i0Uu2YU1ZTbicAyENHoPmaRfqG13`, an import-only anonymous account nothing else writes to (`OLD_APP` in flags.html,
  shown as "Seth · old app"). Seth's Google-account uid on the app is `ke1WMzWdqOV1J1fRo3wGLK85Osf1` (`SETH_ALSO`,
  display only; it is not in `isAdmin()`).
- Bulk triage hook: flags.html sets `window.FLAGS` (`list(all)`, `set([[key,{s,c,fix,note}],…])`, `reload()`). Claude in
  Chrome's JS runs in an isolated world, so call it by injecting a `<script>` that writes results to `document.body.dataset`.
- Claude works the flags through Claude in Chrome on the admin Chrome profile: open flags.html, read the list,
  suggest categories, and set "Fixed in bNN" after a fix ships. Ask Seth before marking another tester's flag
  won't-fix.

## Design decisions (don't undo without asking)

- **Demo pictures with colour and motion** (v119, `stack119`, `K119`, `G119`): flat graph-only demos get a picture
  of the real thing above the graph (or in place of an older drawing), with gradients and slow CSS-keyframe loops.
  Keyframes live in a `<style>` inside the demo SVG with unique names; the delay is negative from the clock so a
  slider drag (which redraws the SVG) keeps the phase. Class `m119` = stops under prefers-reduced-motion, and the
  static pose is the end state. Motion stays calm: loops of 5–8 s, no flashing. Batch 1: mat-basics-2,
  mfg-sheet-3, elec-mcu-2, diffeq-pde-3, ctrl-pid-1. The remaining graph-only demos are listed in the v119 notes.

- **Top edge in the Home Screen app** (v35, class `sa35`): the strip under the clock and battery is solid
  `--bg`, and the top bar is solid instead of translucent. Seth disliked the fading bar there.
  - b37: the status-bar style tag is `black`, not `black-translucent`. iOS fixes the style when the icon is
    added to the Home Screen, so existing installs keep the translucent bar (diag37 still reads safe-area
    top 59) and the grey fade iOS draws over it. Page code can't remove that fade.
  - **Never lock scrolling by making `<body>` `position:fixed`.** b25's `lock25` did, and in the iOS 26
    Home Screen app that lays out fixed elements in a viewport 59 pt short, leaving a dark strip under
    every sheet. b38 locks with `overflow:hidden` on `<html>` instead.
  - The feedback sheet in the Home Screen app shows a faint diagnostic line (`diag37`, extended in v38).
- **Feel:** calm, relaxing and easy to learn in, not doomscrolling. **Keep the existing UI and refresh it
  (edges, colors, density); don't replace it.** Dark theme by default, blue `#3B8BFF` with an orange accent,
  and monospace for numbers.
- **First run:** plain text only (no logo or tagline splash), then tap into the clean steel-bar bending lab,
  then the teaser question. It can be replayed from Settings.
- **After a wrong answer:** Continue is lightly blocked (three taps get through, with a vibration on each),
  because the explanation is where people learn.
- **"Poke" hint:** using it rules out a perfect score but still lets you pass.
- **Placement:** adaptive. Its progress bar never moves backward.
- **Learn path:** builds bottom-up, with levels climbing upward.
- **Friends:** you add them one at a time by code and only see the people you added. There's no global
  leaderboard.
- **Equations tab (b55): relationships, not plugging in.** Each equation card shows how it scales (auto-derived from
  the formula: `q ∝ ρ·V²`, "V ×2 → q ×4"), a "Play with it" slider set (×0.1–×10, output as a multiple), and optional
  typical values (`TYP55`). b55 retired the solver; **b58 brought it back at Seth's request**: the calculator
  auto-opens the question's equation (v46) and each card has "Use in calculator". Poke still has no Solve button. b57: the question's equation shows before answering again ("For this question"), and Graph opens with it
  (one input as x, the rest from the question's numbers; every card has "Graph it"). The only numbers people should
  memorize are typical ranges and orders of magnitude.
- **Solver equation view (b60):** the solver typesets its equation with KaTeX 0.16.9 (cdnjs, loaded on first use like
  mathjs) and puts each variable's box at its place in the equation (`math60Parse` → `math60Tex`, slots via
  `\htmlClass`). Every new equation gets this for free; a tree that disagrees with `miniEval` (`math60Same`) or no
  KaTeX falls back to the old box grid. Symbol TeX comes from `texSym60` rules; add overrides to `TEXS60`.
  As of b60 all 493 solvable equations parse, match and render; 2 are wider than 375 px and scroll sideways.
  KaTeX fraction rows overlay each other, so slots are hit-tested by position (nearest within 18 px, v61), with
  pointer-events off inside `.katex`. The Graph tab has no preset row since b61.
  b62: solver boxes use the calculator pad ("num"), never the answer-box pad ("fill", which stays on `#ans` only).
  `svNum` takes arithmetic, k/M suffixes and % (plain parseFloat misread "200k" and "1/2"). `svDraw` carries the
  cursor across its redraw (`CAR62`); `svSet` must not move the cursor. Paste replaces a solver box's value.
  The Eqns "All other equations" list is grouped by `EQG62` (bank keys → subject); new banks fall into "Other"
  until added there.
  b63: the solver equation is left-aligned with a small "Solve" button in its bottom-right corner (`.eqw63`, outside
  the sideways scroller); equations that would run under it get bottom padding (67 of 493). Eqns has a search box
  (`eqFind63`: every word must match name, formula, variable text or topic).
- **Paste target (b59):** chips paste on click, by which time iOS has blurred the box, so paste code must use
  `KB.t` (the app keyboard's target), not `document.activeElement`. Refocus with `preventScroll` or iOS jumps.
- **Tools sheet (b57):** the question bar starts expanded (toggle bottom right). Paste chips paste on tap, not
  pointerdown. Graph pans in both axes with two fingers; graph numbers use 0–2 decimals set by the zoom (`fmt57`).
  fit29 sets inline overflow on `#tbody` for calc/graph; any new tab must not inherit it (v57 clears it).
- **Navigation (b64):** bottom tabs are Learn · Field calc · Lab · Practice. Settings opens from a gear on the Learn
  top bar (between XP and the flag). The daily-goal ring left the top bar; the streak flame is an orange outline
  until today's streak is done (`st.last==today()`), then filled. The goal still lives in the streak sheet.
- **Field calculator (b64, view "field"):** opens the same tools sheet with no lesson attached (`srcLesson()` is null
  there). Recent solver equations are kept per device in localStorage `tol_fc64`, never in `tol3`. Entering it
  resets `QK43`/`AUTO46` so a lesson question gets its own equation back afterwards.
- **Google sign-in (b66, `v66.js`):** optional, Settings → Progress → Sign in with Google (also on the Home Screen
  "Played Tolerance before?" sheet). It loads the Firebase auth SDK from gstatic on demand; that copy shares the
  bundled SDK's IndexedDB record, so it sees the same anonymous user. First sign-in links Google to the anonymous
  uid (same uid, nothing moves). A Google account already linked elsewhere switches this device to that uid and
  reloads; netInit then merges local `tol3` in with `mergeP28`. Popup first, redirect fallback (`tol_g66` flag).
  stats.html and flags.html have the same button, so admin access follows Seth's Google account's uid.
  Needs Firebase console → Authentication: Google provider on, `tolerance-app.github.io` in Authorized domains.
- **Offline (b75, `sw.js`):** network-first service worker. Online, every same-origin file comes fresh; the cache
  (`tol-v1`) is used only offline or when a load stalls past 6 s. CDN libs/fonts cached in `tol-lib-v1`. version.json and
  Firebase traffic pass through. New `<script>` tags are picked up automatically (install parses index.html). To retire
  it, ship a sw.js that unregisters itself; never make it cache-first.
- **Tap-to-define (b67, app-wide from b89, `v89.js`):** per-course lists `gl89(sub,[[pattern, def, link, {only, cs}]])`,
  plus `gl89("_",…)` for words that mean the same in every course (a course entry wins). Words whose meaning changes
  between courses (deflection, stiffness, yield, density, phase, tolerance, compression) stay in the course's own list.
  Style rules (from Seth rating 50 samples): plain words, no formulas, say what it is, not what the lesson teaches; an
  everyday link most of the time, ideally something people have felt or seen; a newcomer must be able to learn the word
  from the definition alone. Underline anything a smart non-engineer wouldn't know. Done: Mechanical (b89), Aerospace, Materials, Manufacturing (b90), Calculus I–III, Diff eq, Linear algebra (b91, shared math list MP91), Electrical, Controls, Digital hardware, Measurement (b92, shared electronics list EP92), Programming, Computer science, Machine learning (b93, shared list CP93), and the rest (b94). Every course is covered.
  b96 trims them (Seth: "wayyy overdoing"): each word underlined once per lesson, at most 2 per block, everyday words
  dropped (`DROPW96`: fit, heat, screw…), and an entry with no everyday link is skipped where its sentence already
  explains it (`explained96`). A word explained in its own sentence with no real-world link never needs a definition.
- **App icon (b95):** the ± as two of the app's own buttons (flat face on a darker ledge) sitting on one big blue button
  (face #4282EE→#2E6DE0, ledge #2051B0). Seth likes it as is: b106 tried a shifted face in royal blue and b107 put b95
  back at his request (2026-11-25). Don't change the icon unless he asks. Seth likes the b106 version too and is
  thinking about it: it's kept in `tools/icon-royal/` (PNGs, `icon.svg`, `gen.js` that draws it, `preview.png`).
  Shipping it = copy those PNGs over the root ones, swap the two `data:` icons in `<head>`, new build. Plus bar 0.828, end fillets 0.27× bar, inside corners 0.10× bar; gap between
  plus and minus 0.57. Source `tools/icon.svg`; `icon-180/192/512.png` and the two `data:` icons in `<head>` are exports.
  PNGs are full squares (iOS/Android mask the corners), so the big ledge runs across the bottom. iPhone Home Screen
  copies never refresh their icon; re-adding one starts it with empty storage, so don't push testers to re-add.
- **Reveal cards (b98, `v98.js`):** the G+F card design from `docs/LEARNING_DESIGN.md`, stored as `l.rc[cardIndex]`
  through `rc98(id, ci, spec)`; `cards`/`qs` untouched, and a card without an entry renders as before. All pieces are
  rendered once and shown by class (no re-render per tap), so the blank pop plays once and tap-to-define marks once;
  v98 undoes definition underlines that land on labels or math (`NOMARK98`). Tap anywhere on `.lesson` advances,
  except on buttons, the top bar, figures, demos and defined words; a tap that only closes a definition popup doesn't.
  `#go` is hidden (`.foot.wait98`) and disabled until the card is finished, so the app's Enter→#go handler can't skip
  it. A card finished earlier in the session (back button) shows whole without its Guess (`RS98`, per `SS`). Guesses
  don't touch score/XP and aren't logged (no `ev` fields). Math font STIX Two Text from Google Fonts (cached by sw.js),
  fallback `--math98` Cambria Math → Times New Roman → Georgia. Format, markup and workflow: the `lesson-cards` skill;
  check: `python tools/check.py cards …`, screenshots: `cardshot`. Course progress: `docs/CARD_CONVERSION.md`.
- **Chips paste their prefix (b97, `v97.js`):** a "Given" chip with a prefixed unit pastes its SI value in e-notation
  (200 GPa → `200e9`, 25 mm → `25e-3`) into the calculator line and into solver boxes with no known unit; boxes with a
  known unit keep v71's conversion. A result worked out from those numbers is SI, and `ansCarry` puts it in the answer's
  unit (Pa → MPa) when that unit is in `U97`. No conversion at all for a question whose equation holds a bare 1000/10⁶
  (mm formulas like n = 1000·Vc/(π·D)), whose answer unit isn't convertible (N/mm², mm³/min, rpm…), or whose text has any
  prefixed unit `U97` doesn't know as a whole (kJ/(kg·K), mm/min, µm, min), so converted and plain numbers never mix.
  Also off: non-SI units (h, min, L, g, bar, in, psi), a unit stated once for a list ("σx = 80, σy = 20, τxy = 40 MPa"),
  a number written as 8 × 10⁶, and (no answer-unit field) a prefixed unit in the wording or choices ("in MPa·m³/kg").
  A solver result is carried by its labelled unit only when a box was filled from a converted chip.
  b97 also fixed `imp68` reading `10e-3` as 10·e − 3. Test sweep (b97): 99 questions convert, 67 are blocked; all
  46 chip unit suffixes and 17 convertible answer units checked; 308 questions solved end to end, none worse than b96.
- **Definitions once per lesson (b96) + going back (b97):** each block remembers which words it underlined (`seen.m97`,
  keyed by block type and text), so a card shown again gets the same underlines.
- **Calculator:** Apple-style swipe left to delete, and tapping the entry box counts as Enter.
- **Monetization (later, not built):**
  - First unit of every course free.
  - $3–5 a month for the rest, and nothing a user has done is lost if they cancel.
  - Beta testers never pay.
- **Backlog from flags (moved here 2026-11-21 so flags.html could reach zero; marked won't-fix with a "Backlog" note):**
  more fun vocab demos (review-language); shorter review-language; better ctrl-feedback-3 demo;
  drag to reorder in order questions; rocket landing randomizer and more math; retry on ctrl-exam-1 #1; Poke after
  answering and coming back (unreproduced); remove classmate/professor framing; Lab "all models in one list" mode;
  "vote for this content next" button; in-depth worked solutions; Nyquist two-sine
  overlay demo; graph axis/equation scaling; calculator toggle that fills the answer box;
  3D reference figures with vectors; confirm Friends on real devices; "brake snake in a circle" random demo (b116).
- **Physics courses (b120, `phys/`, `docs/PHYSICS.md`):** Physics 1 (algebra) `phys1a` and Physics 1 (calculus)
  `phys1c`, field Physics. Core lessons (`p1-…`) live in the algebra course and are listed in the calculus one with the
  same id (`also`), calculus-only lessons are `p1c-…`. A module, not stacked layers: later builds edit `phys/*.js` in
  place. Lessons are born as reveal cards (`rc` array, no `plain`), figures and equation banks live in the unit data,
  and units with `ready:false` load only on a dev host (127.0.0.1/localhost), so testers see nothing until a unit is
  flipped ready. Demos are shared between tracks; `PH.mode()` switches labels (slope/area ↔ dx/dt, ∫v dt). Codex
  writes units in `codex/phys/` (`codex/tasks/physics.md`); Claude ships them and builds the demos.
- **Old-app flags rechecked 2026-11-27:** all 47 triaged (35 already fixed by later builds, 10 won't-fix with a
  reason, 2 left open: collapse other sections on Learn so Friends is reachable without scrolling, and more setup
  figures for Joints and fatigue (mech3), done in b117).
- **Not forgotten:**
  - Reintroduce the time-of-day slider.
  - Remove the classmate/professor framing from lessons.
  - Add the ChatGPT mathematics book (Calc 1–3, diff eq).

## Testing

- No test suite is checked in. What has worked: Playwright with Chrome (`/usr/bin/google-chrome` or the local
  Chrome) at a 390×844 mobile size, a local `python3 -m http.server`, and a request route that replaces
  `fbsdk.js` with a mock `window.FBSDK` backed by an in-page object store.
  - A fresh profile needs `st.subj=[...new Set(LS.map(l=>l.sub))]; st.placed=1; save()`, or `finishSession`
    throws on `st.subj`.
  - To drive a lesson: `startId(id)`, call `nextCard()` until `SS.qs` exists, then `feedback(good,'',2); nextQ()`
    for each question. `feedback` adds to `SS.score` itself.
- **Every build that adds or changes a demo runs the layout check** (`tools/demo-check.js`, b52). Seth: overlapping
  text "makes it feel cheap". Load the app locally at 375 px wide (stub `fbsdk.js` so nothing reaches Firebase), add
  the script, then `await demoCheck(["demoId"])` or `await demoCheck(null,{lessons:["lesson-id"]})`. It mounts each
  demo at default, every slider's min and max, and every pill option, and reports labels that overlap each other
  (`text-text`), sit on a straight line (`text-line`), or run off the picture (`clipped`). Ship with an empty report
  for the demos you touched. Move labels beside their lines rather than on them; class `h52` (a halo in the card
  colour, v52) is only for labels that must cross a gridline. Remember the `.demo svg` CSS strokes every shape with
  `currentColor`, so picture layers go inside `<g stroke="none">` and set strokes explicitly.
  - As of b53 all 312 demos pass. b53 (`v53.js`) moves mk2D colour keys and y-axis names into a strip above the
    plot, and `TIDY53` (wraps `demoU`) nudges any label that still collides after each redraw, so a new demo
    usually passes on its own. Don't lean on that: place labels sensibly in the demo itself, and look at it at
    375 px, since the checker ignores curves and the tidy pass only moves labels a few px off them.
  - b115 (`KEY115`, wraps `demoU` after TIDY53): a label right after a key swatch (rect ≤ 12 × 4) is never nudged, so
    a legend entry stays beside its colour even when it crosses a curve (it keeps its h52 halo). Seth flagged "volume factor
    shifted right" in math-found-1.
  - `.demo svg text` sets `font:600 11px`, so a `font-size` attribute on a demo label is ignored (H85.t's `fs`
    included); put the size in `style` (`tx110` in v110.js does). Picture demos built at "9px" were really 11px.
  - **b110 backlog visuals** (registered demos, mapped through `DEMO_OVR`, old demos left underneath):
    `arr110` (cs-data-structures-1: every item drawn, Read/Insert pills, list nodes scattered with head/null),
    `spin110` (cam-feeds-speeds-4: spindle torque envelope, flat to 600 rev/min then constant power, plus power and
    torque margin bars) and `shaft110` (mech-machine-2: stress-banded cross-section with a colour key running to
    max(τmax, 1.33 × allowable) and an allowable tick, τ–r line, "torque in r < d/4").
- Run `check.html` on the live site to test the real Firebase connection.
- Report exactly what ran: mock tests, real Firebase, or a real phone. Never say something was tested or
  deployed unless it was.

## Working with Seth

- Order of work: real bugs first, then smaller changes, then new content.
- Be concise. Explain what changed and what's still unverified. Use SI units.
- Make small, targeted edits with no unrelated refactors, and keep his names, comments and working behavior.
- Ask only when the answer changes correctness, scope or cost, or before anything irreversible: deleting
  data, changing hosting, or rules that open up access.
- **Feedback:** tester feedback is in Firestore `fb/{uid}`. Feedback from Seth's own devices is his. Feedback
  from anyone else gets double-checked and raised with Seth before acting, unless it's an obvious fix.
- Commit to `main` only when asked. Every push deploys straight to testers.

## Open items (2026-11-16)

- **Progress stranded by the repo move: done 2026-11-21.** `sethijacob/tolerance` (public, Pages, local copy in
  `../tolerance-forward`) is one page (also its 404.html) that reads `localStorage.tol3` on the old origin and
  forwards it to `https://tolerance-app.github.io/#import=…`; an incoming `#import=` (the old claude.ai "moved"
  card's button) is passed straight through, so that card works again without editing it. Re-creating the repo
  ended GitHub's automatic redirect from `sethijacob/tolerance` to the org repo (git remotes already use the org).
- `people` rule: `firestore.rules` now has `allow get` for signed-in users and `allow list` only for
  `isAdmin()` (b36 branch). It still has to be published by hand in the Firebase console.
- Friends board has never been confirmed working on real devices.
- Still unexplained: "Poke doesn't work after you answer and come back", and which lab the "recreate the
  shafts in torsion demo" request refers to.

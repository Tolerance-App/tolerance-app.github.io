/* ===== v120 (2026-11-27): physics section scaffold (hidden until ready) =====
   Seth: "I want to build physics courses for my brother … algebra and calculus versions … build it cleaner than the
   rest to follow changes that will come to the rest of the app. Make sure the visuals and demos are quality."
   1. New module phys/ (loaded by the script tags just above this file): kit.js (courses, loader, figures, play/scrub),
      demos-motion.js (cart on a track with x–t / v–t / a–t, thrown ball), p1-1d.js (unit "Motion in a line" with
      the reference lesson p1-1d-3). Design and syllabus: docs/PHYSICS.md. Codex brief: codex/tasks/physics.md.
   2. Two courses per level sharing one path skeleton: Physics 1 (algebra) and Physics 1 (calculus). Core lessons
      live in the algebra course and are listed in the calculus course with the same id, so progress counts in both.
   3. Units are hidden on the live site until marked ready (they load on localhost / 127.0.0.1 for checks), so
      nothing changes for testers in this build.
   From here on, physics changes edit the phys/ files in place; a build still adds a vNN.js for FB.ver and version. */
try{FB.ver="b120"}catch(e){}

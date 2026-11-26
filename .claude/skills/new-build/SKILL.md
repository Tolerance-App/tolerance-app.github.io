---
name: new-build
description: Checklist for shipping a new Tolerance build (vNN.js layer, script tag, FB.ver, version.json, NEWS, TF48, codemap, checks, commit). Use whenever creating the next vNN.js or preparing a build to commit.
---

# New build checklist

1. **Find the number:** the last `<script src="vNN.js">` in `index.html` (grep `src="v9`). The new build is N+1.
2. **Create `vNN.js`** starting with a block comment: `/* ===== vNN (YYYY-MM-DD): one-line summary ===== … */`,
   then numbered sections for each change, quoting Seth's request where there is one.
   - Change behavior by wrapping, never by editing old layers:
     `try{const _f99=fn;fn=function(){/*before*/const r=_f99.apply(this,arguments);/*after*/return r}}catch(e){}`
   - Before wrapping, look up `fn` in `docs/CODEMAP.md` to see which layers already wrap it, and read the latest one.
   - Suffix new globals with the build number (`TF99`, `fix99`) so they never collide.
   - Lesson content changes go through `BUNDLE` before `build()` runs, or through a wrapper on `build`.
     Only append questions (ids and positions are permanent).
3. **Script tag:** add `<script src="vNN.js"></script>` right after the previous one and before
   `<script>applyTheme();build();home();netInit();</script>`.
4. Inside `vNN.js`, set `FB.ver="bNN"`.
5. **`version.json`** → `{"v":"bNN"}`. Without this, Home Screen apps keep the old build.
6. If testers would notice: `NEWS.unshift({d:"YYYY-MM-DD",t:["…"]})` in plain words.
7. If it fixes a lesson, question or model: add an entry to the **top** of `TF48` (see how earlier builds do it:
   grep `TF48.unshift`) so Seth can check it on his phone.
8. If an `ev` record gains a field: add it to `hasOnly([...])` in `firestore.rules` and tell Seth to publish the rules.
9. **Checks** (all must pass):
   - `python tools/check.py lessons <touched ids>`, or `course <Name>` for content changes.
   - `python tools/check.py demos <ids>` for any demo touched.
   - `python tools/check.py eval "FB.ver"` → "bNN" (proves the layer loads without throwing).
10. `python tools/codemap.py` and `python tools/check.py export` (refreshes `content-export/`), then add a short feature note to `docs/REFERENCE.md` under "Design decisions" if
    the behavior is something a future session must not undo. Update the script order line in REFERENCE.md.
11. Bump "Current latest" in `CLAUDE.md`.
12. **Commit only when Seth asks.** Message style: `bNN: short summary` (see `git log --oneline -5`).
    Pushing to `main` deploys to testers.

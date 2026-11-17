# Tolerance

Engineering, one small lesson a day. Live at https://sethijacob.github.io/tolerance/

Progress is backed up to Firebase (project `tolerance-fe244`): every device gets a private anonymous
account the first time it opens the app. `check.html` tests the connection from any browser.

© 2026 Seth Jacob. All rights reserved. No license is granted to copy, modify or redistribute this code or its lesson content.

## Files
- `index.html` — the app (build b32 plus the site changes below)
- `v32.js`, `v33.js` — later builds' code; `v33.js` holds the site-only changes (progress import, backup wording)
- `fbnet.js` — connects the app to Firebase (anonymous account per device, Firestore for progress, friends, feedback)
- `fbsdk.js` — Firebase JS SDK 13.4.0, bundled from `tools/sdkentry.js` with esbuild
- `firestore.rules` — the database rules published in the Firebase console
- `check.html` — connection test

# Tolerance

Engineering, one small lesson a day. Live at https://tolerance-app.github.io/

Progress is backed up to Firebase (project `tolerance-fe244`): every device gets a private anonymous
account the first time it opens the app. `check.html` tests the connection from any browser.

© 2026 Seth Jacob. All rights reserved. No license is granted to copy, modify or redistribute this code or its lesson content.

## Files
- `index.html` — the app (build b32 and earlier layers, plus the lesson content)
- `v32.js` … `v36.js` — later builds, loaded in order after `index.html`'s own script:
  - `v33.js` — site move: progress import (`#import=`), backup wording
  - `v34.js` — lesson stats (`ev` records)
  - `v35.js` — Home Screen app first open, iPhone status-bar strip
  - `v36.js` — phone top and bottom edges
- `fbnet.js` — connects the app to Firebase (anonymous account per device, Firestore for progress, friends, feedback)
- `fbsdk.js` — Firebase JS SDK 13.4.0, bundled from `tools/sdkentry.js` with esbuild
- `firestore.rules` — the database rules, published by hand in the Firebase console (`firestore-rules.txt` is a copy)
- `stats.html` — private lesson-stats dashboard (admin devices only)
- `check.html` — connection test
- `manifest.webmanifest`, `icon-*.png` — Home Screen app

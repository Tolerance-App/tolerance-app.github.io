/* ===== v75 (2026-11-21): works offline =====
   Registers sw.js, a network-first offline cache: online, every file still comes fresh from the site (so builds
   and the version.json reload work as before); offline, or on a load stalled past 6 s, the last copy is used.
   Progress already lives in localStorage tol3 and cloud sync already fails quietly (fbnet FB.err), so lessons,
   Lab, calculator and Practice run offline; sync and friends catch up when the network returns.
   Not registered inside the claude.ai artifact or on file://. */
try{FB.ver="b75"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Tolerance now works offline after you've opened it once online: lessons, Lab and the calculator keep going without signal, and your progress syncs when you're back."]})}catch(e){}
try{if("serviceWorker" in navigator&&/^https:$|^http:$/.test(location.protocol)&&(location.protocol=="https:"||location.hostname=="localhost"))
 window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})})}catch(e){}
try{[{b:"b75",k:"off75",t:"Works offline",c:"Open the app once online, wait a few seconds, then turn on Airplane mode and reopen it from the Home Screen: it loads and lessons work.",go:["learn"]}].forEach(e=>TF48.unshift(e))}catch(e){}

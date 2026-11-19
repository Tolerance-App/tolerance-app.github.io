/* ===== v66 (2026-11-18): optional Sign in with Google =====
   Seth: "Lets have them login with Google." Why: the anonymous account lives in one browser's storage. Safari
   deletes a site's storage after 7 days without a visit, and every browser / Home Screen app is its own copy,
   so people kept getting a new, empty account (and Seth a new admin ID).
   How it works, without touching the boot path in fbnet.js:
   - Firebase Auth keeps the signed-in user in IndexedDB under the API key and the [DEFAULT] app name. A second
     copy of the SDK (gstatic CDN, same 13.4.0, loaded only when this is used) reads the same record, so it sees
     the same anonymous user as the bundled fbsdk.js.
   - First Google sign-in: linkWithPopup on the anonymous user. Same uid, so nothing moves and no paths change.
   - That Google account already belongs to another uid (signed in on another device before): sign in to it with
     signInWithCredential and reload. On reload fbnet restores the Google user, netInit merges this device's local
     tol3 into that account's cloud copy with mergeP28 (sync only adds), so nothing goes down.
   - Popups that fail (blocked, or not supported in some Home Screen apps) fall back to linkWithRedirect; the
     result is picked up on the next load (tol_g66 flag in localStorage, never in tol3). */
try{FB.ver="b66"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Sign in with Google (Settings → Progress) to keep your progress on any phone, browser or Home Screen app. It’s optional, and signing in never removes anything you’ve done."]})}catch(e){}

const G66CFG={apiKey:"AIzaSyAWUOQLmKE26fCbYYNNuc1VffDaWgqrpCE",authDomain:"tolerance-fe244.firebaseapp.com",projectId:"tolerance-fe244",appId:"1:1009554687061:web:d2caeebf8155b19a0540dc"};
const G66SDK="https://www.gstatic.com/firebasejs/13.4.0/";
let G66=null,G66P=null;
function g66Load(){if(G66)return Promise.resolve(G66);if(G66P)return G66P;
 G66P=(async()=>{const [a,b]=await Promise.all([import(G66SDK+"firebase-app.js"),import(G66SDK+"firebase-auth.js")]);
  const app=a.getApps().length?a.getApp():a.initializeApp(G66CFG),auth=b.getAuth(app);try{await auth.authStateReady()}catch(e){}
  G66={b,auth};return G66})().catch(e=>{G66P=null;throw e});return G66P}

/* The CDN copy updates first after a sign-in; the bundled one catches up from IndexedDB a moment later */
function g66User(){try{if(G66&&G66.auth.currentUser)return G66.auth.currentUser}catch(e){}try{if(window.FBSDK)return FBSDK.getAuth().currentUser}catch(e){}return null}
function g66Google(){const u=g66User();if(!u||u.isAnonymous)return null;const p=(u.providerData||[]).find(x=>x&&x.providerId=="google.com");return p?(p.email||u.email||"your Google account"):null}

function g66Msg(s){const m=$("#gm66");if(m)m.textContent=s;else try{toast48(s)}catch(e){}}
function g66Err(e){const c=(e&&e.code)||"";
 if(/popup-closed|cancelled-popup/.test(c))return "Sign-in was closed before it finished. Nothing changed.";
 if(/unauthorized-domain|operation-not-allowed/.test(c))return "Google sign-in isn’t switched on for Tolerance yet. Nothing changed. ("+c+")";
 if(/network/.test(c))return "No connection. Nothing changed; try again when you’re online.";
 return "Couldn’t sign in ("+(c||(e&&e.message)||"error")+"). Nothing changed."}

/* Switch this device to the Google account's existing uid, then reload so fbnet boots on it and merges */
async function g66Switch(cred){
 try{if(typeof pushProgress=="function")await pushProgress()}catch(e){}
 try{save()}catch(e){}
 await G66.b.signInWithCredential(G66.auth,cred);
 localStorage.setItem("tol_g66ok","switch");
 location.replace("./?b="+encodeURIComponent((window.FB&&FB.ver)||"b66")+"&g=1")}

async function g66Done(){
 localStorage.setItem("tol_g66ok","link");
 try{if(typeof pushProgress=="function")pushProgress()}catch(e){}
 try{closeSheet()}catch(e){}
 try{if(view=="settings")settings()}catch(e){}
 g66Msg("Signed in with Google. Sign in the same way on any other phone or browser to get this progress there.");
 try{toast48("Signed in with Google")}catch(e){}}

/* Called straight from the button tap: G66 must already be loaded, or iOS blocks the popup */
async function g66Go(){
 if(!G66){g66Msg("Still loading, tap again in a moment.");try{await g66Load()}catch(e){g66Msg("Couldn’t reach Google sign-in. Check your connection.")}return}
 const {b,auth}=G66,p=new b.GoogleAuthProvider();p.setCustomParameters({prompt:"select_account"});
 const u=auth.currentUser;g66Msg("Opening Google…");
 try{
  if(u&&u.isAnonymous){await b.linkWithPopup(u,p);await g66Done()}
  else if(!u){const r=await b.signInWithPopup(auth,p);localStorage.setItem("tol_g66ok","switch");location.replace("./?b="+encodeURIComponent(FB.ver||"b66")+"&g=1")}
  else await g66Done()}
 catch(e){const c=(e&&e.code)||"";
  if(c=="auth/credential-already-in-use"||c=="auth/email-already-in-use"){const cr=b.GoogleAuthProvider.credentialFromError(e);
   if(cr){g66Msg("Bringing in your saved progress…");try{await g66Switch(cr)}catch(x){g66Msg(g66Err(x))}return}}
  if(c=="auth/popup-blocked"||c=="auth/operation-not-supported-in-this-environment"||c=="auth/web-storage-unsupported"){
   try{localStorage.setItem("tol_g66","r");try{save()}catch(x){}
    if(u&&u.isAnonymous)await b.linkWithRedirect(u,p);else await b.signInWithRedirect(auth,p);return}
   catch(x){localStorage.removeItem("tol_g66");g66Msg(g66Err(x));return}}
  g66Msg(g66Err(e))}}

function g66Sheet(){const em=g66Google();
 if(em){sheet(`<h2 class="sht">Signed in with Google</h2><p class="body">This progress belongs to <b>${esc(em)}</b>. Sign in with the same Google account in Settings → Progress on any other phone, browser or Home Screen app and it shows up there too.</p><p class="body">Tolerance only uses your Google account to find your progress. Friends still see the name you chose.</p><button class="btn" onclick="closeSheet()">OK</button>`);return}
 sheet(`<h2 class="sht">Sign in with Google</h2><p class="body">Right now your progress is tied to this browser. If its data gets cleared, or you open Tolerance somewhere else, you start from zero.</p><p class="body">Signing in keeps it with your Google account instead, so it follows you to any phone or browser. Your XP, streak and finished lessons stay; nothing goes down.</p><p class="body" id="gm66" role="status" style="min-height:22px"></p><button class="btn" id="gb66" onclick="g66Go()">Sign in with Google</button><button class="btn ghost" onclick="closeSheet()">Not now</button>`);
 g66Load().then(()=>{if($("#gm66")&&$("#gm66").textContent=="Still loading, tap again in a moment.")g66Msg("")}).catch(()=>g66Msg("Couldn’t reach Google sign-in. Check your connection."))}

/* Settings → Progress: first row */
const _set66=settings;settings=function(){const r=_set66.apply(this,arguments);try{const rs=$("#rsrow27");if(rs&&!$("#gsrow66")){const em=g66Google();
 rs.insertAdjacentHTML("beforebegin",`<button class="row" id="gsrow66" onclick="g66Sheet()"><span><b>${em?"Signed in with Google":"Sign in with Google"}</b><small>${em?esc(em):"Keep your progress on any phone or browser"}</small></span>${IC.chevR}</button>`);
 const sy=$("#syn28");if(sy&&em)sy.textContent="Saved on this device and synced to your Google account. New versions of the app keep it."}}catch(e){}return r};

/* Home Screen first open ("Played Tolerance before?"): Google sign-in is the easiest way back */
try{if(typeof hsAsk35=="function"){const _hs66=hsAsk35;hsAsk35=function(){const r=_hs66.apply(this,arguments);try{
 const b=document.querySelector(".sheet .btn, #sheet .btn");const h=[...document.querySelectorAll(".sht")].find(x=>/Played Tolerance before/.test(x.textContent));
 if(h&&b&&!$("#gb66h")){b.insertAdjacentHTML("beforebegin",`<p class="body">Signed in with Google before? That’s the quickest way.</p><p class="body" id="gm66" role="status" style="min-height:0"></p><button class="btn" id="gb66h" onclick="g66Go()">Sign in with Google</button>`);b.classList.add("ghost");g66Load().catch(()=>{})}}catch(e){}return r}}}catch(e){}

/* Result of a redirect sign-in, and the note after a switch-and-reload */
(async function(){try{
 const ok=localStorage.getItem("tol_g66ok");
 if(ok){localStorage.removeItem("tol_g66ok");if(ok=="switch")setTimeout(()=>{try{toast48("Signed in with Google. Progress from this device was added.")}catch(e){}},1500)}
 if(localStorage.getItem("tol_g66")!="r")return;localStorage.removeItem("tol_g66");
 await g66Load();const {b,auth}=G66;
 try{const res=await b.getRedirectResult(auth);if(res&&res.user){if(res.operationType!="link"){localStorage.setItem("tol_g66ok","switch");location.replace("./?b="+encodeURIComponent(FB.ver||"b66")+"&g=1")}else setTimeout(()=>{try{toast48("Signed in with Google")}catch(e){}},1500)}}
 catch(e){const c=(e&&e.code)||"";if(c=="auth/credential-already-in-use"||c=="auth/email-already-in-use"){const cr=b.GoogleAuthProvider.credentialFromError(e);if(cr){await g66Switch(cr);return}}
  setTimeout(()=>{try{toast48(g66Err(e))}catch(x){}},1500)}
}catch(e){}})();

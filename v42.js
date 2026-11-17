/* ===== v42 (2026-11-17): the app updates itself to new builds =====
   Nothing used to check for a new build. A Home Screen app on iPhone is often resumed from memory, and
   GitHub Pages lets phones cache index.html for 10 minutes (Cache-Control: max-age=600), so testers kept
   running old builds. Now:
   - When the app opens, and when it comes back to the foreground (at most once a minute), it fetches
     version.json with caching off. version.json holds {"v":"bNN"}; bump it with every build.
   - If that build is newer than the one running (FB.ver), the app saves and reloads at ./?b=bNN. The new
     query string makes the phone fetch a fresh index.html. localStorage, the account and progress are
     untouched (same origin and path).
   - It only reloads on a calm screen (learn, lab, settings, practice list…) with no sheet open and no
     text field focused. In a lesson or on a result screen it waits and tries again every 5 s.
   - Loop guard: the same newer build is tried at most once every 10 minutes (localStorage tol_upd42),
     in case a stale index.html comes back anyway.
   - After a reload, ?b=… is removed from the address bar again. */
try{FB.ver="b42"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["The app now updates itself when a new build is out, including the Home Screen app. It waits until you’re out of a lesson."]})}catch(e){}

const UPD42={pend:null,last:0,timer:null};
const bnum42=v=>{const m=/^b(\d+)$/.exec(String(v||""));return m?+m[1]:0};
const SAFE42=["learn","lab","labdemo","settings","practice","explore","sections","guide"];
function calm42(){try{if(SAFE42.indexOf(view)<0)return false;if($("#scrim"))return false;
 const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))return false;return true}catch(e){return false}}
function tried42(v){try{const o=JSON.parse(localStorage.getItem("tol_upd42")||"{}");return o.v==v&&Date.now()-o.at<6e5}catch(e){return false}}
function apply42(){const v=UPD42.pend;if(!v)return;
 if(tried42(v)){UPD42.pend=null;return}
 if(!calm42()){if(!UPD42.timer)UPD42.timer=setInterval(()=>{if(!document.hidden)apply42()},5000);return}
 clearInterval(UPD42.timer);UPD42.timer=null;
 try{save()}catch(e){}
 try{localStorage.setItem("tol_upd42",JSON.stringify({v,at:Date.now()}))}catch(e){}
 location.replace(location.pathname+"?b="+encodeURIComponent(v))}
async function check42(force){if(!force&&Date.now()-UPD42.last<6e4)return;UPD42.last=Date.now();
 try{const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)return;const j=await r.json();
  if(bnum42(j.v)>bnum42(FB.ver)){UPD42.pend=j.v;apply42()}}catch(e){}}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)check42(false)});
window.addEventListener("pageshow",e=>{if(e.persisted)check42(true)});
/* tidy the address bar after an update reload (keeps any #hash, e.g. a pending #import) */
try{if(/[?&]b=/.test(location.search))history.replaceState(null,"",location.pathname+location.hash)}catch(e){}
setTimeout(()=>check42(true),3000);

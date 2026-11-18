/* ===== v49 (2026-11-17): unlock the fix checklist inside the Home Screen app =====
   b48 shows "Test recent fixes" to admin IDs or after opening the site with #fixes. A Home Screen app on
   iPhone has its own account and its own storage, and no address bar, so neither works there.
   Now: tap the copyright line at the bottom of Settings 7 times within 4 s to turn the checklist on (or
   off) for this device. It only adds content shortcuts; it reads no one's data. */
try{FB.ver="b49"}catch(e){}
let TAP49=[];
function tap49(){const t=Date.now();TAP49=TAP49.filter(x=>t-x<4000);TAP49.push(t);if(TAP49.length<7)return;TAP49=[];
 try{const on=localStorage.getItem("tol_tf48on")=="1";if(on)localStorage.removeItem("tol_tf48on");else localStorage.setItem("tol_tf48on","1");
  toast48(on?"Fix checklist hidden on this device":"Fix checklist on for this device")}catch(e){}
 const y=scrollY;settings();scrollTo(0,y)}
const _set49=settings;settings=function(){_set49.apply(this,arguments);try{const c=$("#copyline");if(c&&!c.dataset.t49){c.dataset.t49=1;c.addEventListener("click",tap49)}}catch(e){}};

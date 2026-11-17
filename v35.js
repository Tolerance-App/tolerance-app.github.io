/* ===== v35 (2026-11-16): Home Screen app first open, and the iPhone status-bar strip =====
   1. A Home Screen app on iPhone gets its own empty storage (a new device to the app). On its first open,
      once the online backup has been checked and the copy is still blank, ask once:
      "Played Tolerance before?" -> paste a progress code (the existing Restore progress sheet).
      Asked once per install (localStorage "tol_hs35"); never shown if this copy already has progress.
   2. Restoring onto a brand-new copy also fills in what a progress code doesn't carry: courses (from the
      restored lessons), placement done, and the welcome marked seen. Otherwise a restored new phone was
      sent back through onboarding.
   3. Home Screen app only (class "sa35" on <html>): the strip under the clock and battery is painted solid
      in the app background, and the top bar is solid instead of see-through, so nothing scrolls under the
      status bar. iOS draws its own fade there and tints it from what's underneath. */
try{FB.ver="b35"}catch(e){}
try{NEWS.unshift({d:"2026-11-16 night",t:["Using Tolerance from your Home Screen? The first time it opens it asks if you’ve played before, so you can paste your progress code and pick up where you left off.","Home Screen app: cleaner top edge under the clock and battery."]})}catch(e){}

/* ---------- 3. status-bar strip (first so it applies before anything draws) ---------- */
const SA35=(()=>{try{return hsStandalone()}catch(e){return false}})();
if(SA35){try{
 document.documentElement.classList.add("sa35");
 document.head.insertAdjacentHTML("beforeend",`<style id="sa35css">
.sa35 body::before{content:"";position:fixed;left:0;right:0;top:0;height:env(safe-area-inset-top);background:var(--bg);z-index:65;pointer-events:none}
.sa35 .topbar{background:var(--bg);-webkit-backdrop-filter:none;backdrop-filter:none}
</style>`);
 const _at35=applyTheme;applyTheme=function(){const r=_at35.apply(this,arguments);try{const m=$('meta[name="theme-color"]'),c=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();if(m&&c)m.content=c}catch(e){}return r};
}catch(e){}}

/* ---------- 2. restore onto a new copy: fill what the code doesn't carry ---------- */
const _rm35=restoreMerge27;restoreMerge27=function(){const r=_rm35.apply(this,arguments);try{
 const got=LS.filter(l=>st.done&&st.done[l.id]!==undefined);
 if((!st.subj||!st.subj.length)&&got.length)st.subj=[...new Set(got.map(l=>l.sub))];
 if(got.length&&!st.placed)st.placed=1;
 if(got.length&&!wlSeen())st.welcomed=WLLOC;
 save()}catch(e){}return r};

/* ---------- 1. first open of a Home Screen app ---------- */
function fresh35(){try{return !Object.keys(st.done||{}).length&&!(+st.xp>0)}catch(e){return false}}
function hsAsk35(){try{
 if(!SA35||localStorage.getItem("tol_hs35")||!fresh35()||SS)return;
 localStorage.setItem("tol_hs35","1");
 sheet(`<p class="kick blue">Welcome</p><h2 class="sht">Played Tolerance before?</h2><p class="body">The Home Screen app starts with its own storage, separate from your browser, so your progress isn’t here yet.</p><p class="body">To bring it over: open Tolerance where you played before, go to <b>Settings → Progress → Copy progress code</b>, then come back here and paste it.</p><button class="btn" onclick="closeSheet();restoreSheet27()">Paste my progress code</button><button class="btn ghost" onclick="closeSheet()">I’m new here</button>`,"var(--blue)");
}catch(e){}}
if(SA35){let n35=0;const t35=setInterval(()=>{n35++;
 /* wait until the online backup has answered (it may already hold this install's progress), max ~8 s */
 const ready=(typeof NET!="undefined"&&(NET.cg32||NET.done32))||n35>=16;
 if(!ready)return;clearInterval(t35);if(fresh35())hsAsk35()},500)}

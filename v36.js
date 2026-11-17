/* ===== v36 (2026-11-17): phone top and bottom edges =====
   1. Top edge, browser and Home Screen app alike (v35 only did the Home Screen app):
      - the strip under the clock / Dynamic Island is solid --bg, and the top bar is solid instead of
        see-through, on phone widths (< 960 px);
      - the strip now sits under the menu backdrop (z 59, backdrop is 60), so it dims with the rest of
        the screen when a menu opens instead of staying bright;
      - theme-color follows the real --bg. The base meta said #0F1216 but the v-layer palette uses
        #0B0E13, so older iOS Safari tinted the status bar a slightly different shade from the page.
   2. Bottom edge: menus (feedback, settings sheets, tools) could leave a dark line under the sheet,
      where the dimmed backdrop showed through below the sheet's bottom edge (iOS rounding, and Safari's
      floating toolbar area). On phone widths the backdrop now runs 120 px past the bottom of the
      screen, and the sheet paints its own colour 120 px below itself, so any gap is sheet-coloured. */
try{FB.ver="b36"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["Cleaner top edge under the clock and Dynamic Island, in the browser too.","Fixed a dark line that could show under menus like Feedback."]})}catch(e){}

try{
 document.documentElement.classList.add("sa36");
 document.head.insertAdjacentHTML("beforeend",`<style id="sa36css">
@media(max-width:959px){
.sa36 body::before{content:"";position:fixed;left:0;right:0;top:0;height:env(safe-area-inset-top);background:var(--bg);z-index:59;pointer-events:none}
.sa36 .topbar{background:var(--bg);-webkit-backdrop-filter:none;backdrop-filter:none}
.sa36 #scrim.scrim{bottom:-120px;padding-bottom:120px}
.sa36 #scrim .sheet{box-shadow:0 120px 0 var(--s1)}
}
</style>`);
 if(typeof SA35=="undefined"||!SA35){
  const _at36=applyTheme;applyTheme=function(){const r=_at36.apply(this,arguments);try{const m=$('meta[name="theme-color"]'),c=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();if(m&&c)m.content=c}catch(e){}return r};
 }
}catch(e){}

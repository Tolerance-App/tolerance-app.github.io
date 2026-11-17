/* ===== v37 (2026-11-17): Home Screen app top and bottom edges, second try =====
   Seth's iPhone screenshots after b36 (Home Screen app, iOS 26):
   - Top: iOS draws its own grey fade over the status bar when the status bar is "black-translucent"
     (the page runs underneath it). The app's own solid top bar can't paint over that.
   - Bottom: with the feedback sheet open, the last 59 pt of the screen (exactly the status-bar height)
     showed the plain page background, not dimmed and not sheet-coloured. iOS had made the page 59 pt
     too short, so nothing positioned on the page (b36's extended backdrop included) could reach it.
   Fix:
   1. index.html: apple-mobile-web-app-status-bar-style "black-translucent" -> "black". iOS paints an opaque
      status bar and starts the page below it: no fade, and no status-bar height to miscount.
      Takes effect on the next full launch of the Home Screen app. Safari ignores this tag.
   2. Fallback for any gap left under the page: the root background (what iOS shows outside the page)
      is the sheet / nav colour (--s1) while a sheet is open or the bottom nav is showing, so a gap
      matches what sits above it. The body keeps --bg, so the page itself looks the same.
   3. Feedback sheet, Home Screen app only: a faint line with screen / page / safe-area heights, so a
      screenshot shows what iOS did if the edges are still wrong. */
try{FB.ver="b37"}catch(e){}
try{NEWS.unshift({d:"2026-11-17 evening",t:["Home Screen app: solid status bar at the top, and no dark strip under menus. Close the app fully and reopen it once to get this."]})}catch(e){}

try{document.head.insertAdjacentHTML("beforeend",`<style id="sa37css">
html:has(#scrim),html:has(body.has-nav){background:var(--s1)}
body{background:var(--bg)}
.diag37{margin:14px 0 0;font:500 11px/1.4 "JetBrains Mono",ui-monospace,monospace;color:var(--fa);opacity:.7;text-align:center}
</style>`)}catch(e){}

function diag37(){try{
 const p=document.createElement("div");p.style.cssText="position:fixed;left:0;top:0;width:0;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);visibility:hidden;pointer-events:none";
 document.body.appendChild(p);const cs=getComputedStyle(p),t=parseFloat(cs.paddingTop)||0,b=parseFloat(cs.paddingBottom)||0;p.remove();
 const vv=window.visualViewport,sb=($('meta[name="apple-mobile-web-app-status-bar-style"]')||{}).content||"-";
 return `${FB.ver} · screen ${screen.height} · page ${innerHeight}`+(vv?` · view ${Math.round(vv.height)}@${Math.round(vv.offsetTop)}`:"")+` · safe ${Math.round(t)}/${Math.round(b)} · ${sb}`;
}catch(e){return ""}}
const _fbs37=fbSheet;fbSheet=function(){const r=_fbs37.apply(this,arguments);try{
 if(typeof SA35!="undefined"&&SA35){const sh=$("#scrim .sheet"),s=diag37();if(sh&&s)sh.insertAdjacentHTML("beforeend",`<p class="diag37">${esc(s)}</p>`)}
}catch(e){}return r};

/* ===== v38 (2026-11-17): the real cause of the dark strip under menus =====
   b25's lock25() froze the page behind an open sheet by making <body> position:fixed (top:-scrollY).
   In the iOS 26 Home Screen app (status bar over the page, safe-area top 59 pt) that makes iOS lay out
   fixed elements in a viewport 59 pt short while the body is fixed: the backdrop and sheet stopped
   59 pt above the bottom of the screen and the frozen page's --bg showed below (Seth's b37 screenshots:
   page 852, sheet bottom 793). The bottom nav was fine because the body is only fixed while a sheet is
   open. b36's longer backdrop and b37's root colour couldn't help, since both sit inside that viewport.
   Fix: lock by stopping scroll on the root (overflow:hidden on <html>) instead of moving the body.
   The page stays where it is, so nothing needs restoring on close. The feedback sheet's diag37 line
   (Home Screen app only) now also shows where the sheet's bottom edge landed. */
try{FB.ver="b38"}catch(e){}
try{NEWS.unshift({d:"2026-11-17 night",t:["Fixed the dark strip under menus in the Home Screen app."]})}catch(e){}

try{
 if(typeof LK25!="undefined"&&LK25){const b=document.body;b.style.position=b.style.top=b.style.left=b.style.right=b.style.width="";LK25=null}
 let LK38=false;
 lock25=function(on){try{const h=document.documentElement;
  if(on&&!LK38){LK38=true;h.style.overflow="hidden"}
  else if(!on&&LK38){LK38=false;h.style.overflow=""}
 }catch(e){}};
}catch(e){}

const _fbs38=fbSheet;fbSheet=function(){const r=_fbs38.apply(this,arguments);try{
 setTimeout(()=>{try{const sh=$("#scrim .sheet"),p=sh&&sh.querySelector(".diag37");if(p)p.textContent+=` · sheet ${Math.round(sh.getBoundingClientRect().bottom)} · lock ${document.body.style.position||"html"}`}catch(e){}},700);
}catch(e){}return r};

/* ===== v81 (2026-11-21): tools sheet flags =====
   1. Pull down anywhere on the tools sheet to close it (Seth: "anywhere on the tools tab"). Same rule as the grab
      handle (90 px, or a quick 24 px flick). Not started on the graph, a slider, the sideways equation scroller
      or the entry box, and only when whatever you touched is scrolled to its top, so scrolling still scrolls.
   2. Solver: a tap goes to the nearest variable box within 32 px (was 18), so boxes are much easier to hit. */
try{FB.ver="b81"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Tools: pull down anywhere on the sheet to close it.","Solver: variable boxes are easier to tap."]})}catch(e){}
function pd81(sh){if(!sh||sh._pd81)return;sh._pd81=1;let y0=null,x0=0,dy=0,t0=0,live=false;
 const bad=t=>!t||t.closest("svg,canvas,input,textarea,.eqw63,.eq60,.gwrap,#gexp,.ent,.entry,[contenteditable]");
 const atTop=t=>{for(let e=t;e&&e!==sh.parentNode;e=e.parentElement){if(e.scrollTop>0)return false}return true};
 sh.addEventListener("touchstart",e=>{if(!sh.classList.contains("tools29")||e.touches.length!==1||bad(e.target)||e.target.closest(".grabzone")||!atTop(e.target)){y0=null;return}
  y0=e.touches[0].clientY;x0=e.touches[0].clientX;dy=0;t0=Date.now();live=false},{passive:true});
 sh.addEventListener("touchmove",e=>{if(y0===null)return;const d=e.touches[0].clientY-y0,dx=Math.abs(e.touches[0].clientX-x0);
  if(!live){if(d>12&&d>dx*1.5){live=true;sh.classList.add("dragging")}else if(d<-6||dx>14){y0=null;return}else return}
  dy=Math.max(0,d);sh.style.transform=`translateY(${dy}px)`},{passive:true});
 const end=()=>{if(y0===null)return;y0=null;if(!live)return;live=false;const v=dy/Math.max(1,Date.now()-t0);sh.classList.remove("dragging");
  if(dy>90||(v>.5&&dy>24)){sh.style.transform="translateY(110%)";const d=$("#scrim");if(d)d.classList.remove("in");setTimeout(()=>closeSheet(true),240)}else sh.style.transform=""};
 sh.addEventListener("touchend",end);sh.addEventListener("touchcancel",end)}
try{const _sd81=sheetDrag;sheetDrag=function(sh){const r=_sd81.apply(this,arguments);try{pd81(sh)}catch(e){}return r}}catch(e){}
try{const _h81=sv61Hit;sv61Hit=function(eq,x,y){let best=null,bd=1e9;eq.querySelectorAll(".s60").forEach(el=>{const r=el.getBoundingClientRect();
 const dx=x<r.left?r.left-x:x>r.right?x-r.right:0,dy=y<r.top?r.top-y:y>r.bottom?y-r.bottom:0,d=Math.hypot(dx,dy);
 if(d<bd||(d==bd&&d==0&&best&&r.width*r.height<best.getBoundingClientRect().width*best.getBoundingClientRect().height)){bd=d;best=el}});return bd<=32?best:_h81.apply(this,arguments)}}catch(e){}
try{[{b:"b81",k:"pd81",t:"Pull down anywhere to close Tools",c:"Open Tools, put a finger on the question bar or the history and pull down: it closes. Scrolling the history and keypad taps still work.",go:["q","mech-machine-4",0,1]},
 {b:"b81",k:"sv81",t:"Easier solver taps",c:"Tap near (not exactly on) km in the bolt equation: its box is picked.",go:["q","mech-machine-4",0,1]}].forEach(e=>TF48.unshift(e))}catch(e){}

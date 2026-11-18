/* ===== v61 (2026-11-18): solver taps and graph room (flags on b60) =====
   1. "Can't select km" in C = kb/(kb + km): KaTeX lays a fraction's numerator out as a full-width row
      (.vlist) that sits over the denominator, so taps on the bottom kb and on km hit that row, not the box.
      Taps on the equation now go to the nearest box within 18 px of the finger (KaTeX's own layers ignore
      pointers), which also makes every box a bigger target.
   2. "Touch boxes hard to find; use more space": the equation is drawn larger (1.55×), boxes get more padding
      and a stronger outline, and the calculator tip strip is hidden while the solver is open.
   3. "Remove the suggested graphs under the graph": the preset row is gone from the Graph tab, and the graph
      takes the space. It redraws whenever its size changes. */
try{FB.ver="b61"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Every variable in the solver’s equation can be tapped (km in the bolt equation couldn’t), and the boxes are bigger.","The graph is bigger: the suggested graphs under it are gone."]})}catch(e){}

/* 1. nearest-slot tapping */
function sv61Hit(eq,x,y){let best=null,bd=1e9;eq.querySelectorAll(".s60").forEach(el=>{const r=el.getBoundingClientRect();
  const dx=x<r.left?r.left-x:x>r.right?x-r.right:0,dy=y<r.top?r.top-y:y>r.bottom?y-r.bottom:0,d=Math.hypot(dx,dy);
  if(d<bd||(d==bd&&d==0&&best&&r.width*r.height<best.getBoundingClientRect().width*best.getBoundingClientRect().height)){bd=d;best=el}});
 return bd<=18?best:null}
const _svd61=svDraw;svDraw=function(){const r=_svd61.apply(this,arguments);try{const eq=$(".sv .eq60");
  /* fit: shrink long equations to the width (to 1em), then scroll */
  if(eq){const kx=eq.querySelector(".katex");if(kx){kx.style.fontSize="";const w=kx.scrollWidth,av=eq.clientWidth-12;if(w>av&&av>0)kx.style.fontSize=Math.max(1,1.55*av/w).toFixed(3)+"em"}}
  if(eq&&!eq.dataset.h61b){eq.dataset.h61b=1;
  let p0=null;eq.addEventListener("pointerdown",e=>{p0={x:e.clientX,y:e.clientY}});
  eq.addEventListener("click",e=>{if(p0&&Math.hypot(e.clientX-p0.x,e.clientY-p0.y)>10)return;const el=sv61Hit(eq,e.clientX,e.clientY);if(!el)return;const m=/s60-(\d+)/.exec(el.className);if(m){e.preventDefault();sv60Pick(+m[1])}})}}catch(e){}return r};

/* 3. graph: redraw when the canvas changes size */
try{const ro=new ResizeObserver(()=>{try{if($("#gcv"))drawGraph()}catch(e){}});let cur=null;
 setInterval(()=>{const c=$("#gcv");if(c===cur)return;if(cur)ro.unobserve(cur);cur=c;if(c)ro.observe(c)},400)}catch(e){}

document.head.insertAdjacentHTML("beforeend",`<style>
.sv .eq60 .katex *{pointer-events:none}
.sv .eq60{cursor:pointer;padding:4px 4px 6px}
.sv .eq60 .katex{font-size:1.55em}
.sv .eq60 .s60,.sv .eq60 .s60f,.sv .eq60 .s60w,.sv .eq60 .s60sel{border:0!important;padding:0 4px;margin:0 3px;border-radius:5px;box-shadow:0 0 0 2px color-mix(in srgb,var(--blue) 35%,var(--line))}
.sv .eq60 .s60f{box-shadow:0 0 0 2px color-mix(in srgb,var(--blue) 60%,var(--line))}
.sv .eq60 .s60w{box-shadow:0 0 0 2px var(--orange);outline:1px dashed var(--orange);outline-offset:3px}
.sv .eq60 .s60sel{box-shadow:0 0 0 2.5px var(--blue)}
.sv .eq60 .katex-display{margin:10px 0}
#tbody:has(.sv) .calctip{display:none}
#tbody .gpre,#tbody .gprel{display:none!important}
</style>`);

try{TF48.unshift(
 {b:"b61",k:"km61",t:"Every variable can be tapped",c:"C = kb/(kb + km): tap km, then the bottom kb. Each turns blue. Boxes are bigger.",go:["q","mech-machine-4",0,1]},
 {b:"b61",k:"gr61",t:"Bigger graph",c:"Graph tab: no suggested graphs under it; the graph fills the space.",go:["q","mech-machine-4",0,1]}
)}catch(e){}

/* ===== v57 (2026-11-18): tools sheet fixes from Seth's calculator list =====
   1. Scrolling: fit29 (v29) sets an inline overflow-y:hidden on #tbody for the calculator and graph tabs, and
      nothing cleared it when you switched tabs. The calculator opens first, so Eqns, Lesson and Help could
      never scroll. Tabs that aren't full-height now drop that inline style (and --kh).
   2. Eqns shows the question's own equation ("For this question", Best match) before you answer again.
      b55 had hidden it until after answering; Seth wants the obvious equation visible.
   3. Paste chips: the "Yours" result chips also carried the generic .res class (search result rows), which
      made each one full width. Reset inside the tray. Chips now paste on tap (click), not on pointerdown,
      so swiping the tray sideways no longer pastes.
   4. The question at the top of the tools sheet starts expanded; its collapse toggle sits at the bottom right.
      Collapsing is remembered for that question only.
   5. Graph: two-finger drag pans both ways (was horizontal only), and pinching zooms both axes. Reset,
      a new function or a preset go back to the automatic y range.
   6. Graph the equation: opening the Graph tab on a question loads the question's equation with x as one
      input (the biggest lever the question gives a value for) and the other inputs set to the question's
      numbers when it states them ("V = 20 m/s"), otherwise 1. Axes are labelled with the symbols. Every
      equation card also has "Graph it".
   7. Graph numbers use 0–2 decimals, set by the zoom: ticks by the grid step, readouts by about 1/200 of the
      window. Small windows or small values get more decimals only when they need them. */
try{FB.ver="b57"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Tools: Eqns, Lesson and Help scroll again.","Eqns shows the equation for the question you’re on.","Graph opens with the question’s equation, and every equation has “Graph it”. Pan up and down as well as sideways with two fingers.","Pasting a number from the calculator takes a tap; swiping the row no longer pastes. The pasted-answer chips are back to normal size.","The question at the top of the tools starts expanded."]})}catch(e){}

/* 1. tabs that aren't full-height drop fit29's inline overflow */
const _tb57=toolsBody;toolsBody=function(){gPrefill57();const r=_tb57.apply(this,arguments);try{const b=$("#tbody");
 if(b&&!b.classList.contains("full")){b.style.overflowY="";b.style.removeProperty("--kh")}}catch(e){}return r};

/* 2. the question's equation shows before answering (v55 gates it on SS.busy) */
const _er57=eqRender25;eqRender25=function(){if(!SS)return _er57.apply(this,arguments);const b=SS.busy;SS.busy=true;try{return _er57.apply(this,arguments)}finally{SS.busy=b}};

/* 3. paste chips: tap only */
const _td57=trayDraw;trayDraw=function(){const r=_td57.apply(this,arguments);try{
 document.querySelectorAll("#tray .qchip[onpointerdown]").forEach(c=>{const m=/qIns\('([^']*)'\)/.exec(c.getAttribute("onpointerdown")||"");if(!m)return;
  c.setAttribute("onpointerdown","event.preventDefault()");c.dataset.v=m[1];c.onclick=()=>qIns(c.dataset.v)})}catch(e){}return r};

/* 4. question bar starts open */
const _tqm57=tqMount;tqMount=function(){const r=_tqm57.apply(this,arguments);try{const t=$("#tq"),x=SS&&SS.qs&&SS.qs[SS.i],k=x?SS.i+"|"+(x.key||""):"";
 if(t&&!t.dataset.m57){t.dataset.m57=1;if(CALC.tqc57!==k)t.classList.add("open");t.addEventListener("click",()=>{CALC.tqc57=t.classList.contains("open")?null:k})}}catch(e){}return r};

/* 7. number formatting: decimals from a resolution */
function fmt57(v,res){if(!isFinite(v))return "—";const d=Math.min(8,Math.max(0,Math.ceil(-Math.log10(Math.abs(res)||1)-1e-9)));const s=(+v.toFixed(d))+"";return s=="-0"?"0":s}

/* 5 + 7. drawGraph rebuilt from the original (index.html) and v25's axis-label overlay, with a pannable y range */
drawGraph=function(){const cv=$("#gcv");if(!cv)return;
 if(CALC.gm!==undefined&&CALC.glab){const st=gstep25();CALC.gm=Math.round(CALC.gm/st)*st}
 const dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;if(!w)return;cv.width=w*dpr;cv.height=h*dpr;const c=cv.getContext("2d");c.scale(dpr,dpr);
 const cs=getComputedStyle(document.documentElement),col=n=>cs.getPropertyValue(n).trim();
 const ex=CALC.g.split(";").map(s=>s.trim().replace(/^y\s*=\s*/,"")).filter(Boolean),[x0,x1]=CALC.gx;
 const fns=ex.map(e=>{const n=norm(e);try{if(MJ){const cc=MJ.compile(n);return x=>{const r=cc.evaluate({x,...(CALC.deg?degFns():{})});return typeof r=="number"?r:NaN}}miniEval(n,{x:1});return x=>miniEval(n,{x})}catch(err){return null}});
 const N=480,data=fns.map(f=>{if(!f)return null;const pts=[];for(let k=0;k<=N;k++){const x=x0+(x1-x0)*k/N;let y;try{y=f(x)}catch(e){y=NaN}pts.push([x,isFinite(y)?y:NaN])}return pts});
 let y0=-1,y1=1;
 if(CALC.gy&&isFinite(CALC.gy[0])&&isFinite(CALC.gy[1])&&CALC.gy[1]>CALC.gy[0]){[y0,y1]=CALC.gy}
 else{const ys=data.filter(Boolean).flat().map(p=>p[1]).filter(isFinite).sort((a,b)=>a-b);
  if(ys.length){y0=ys[Math.floor(ys.length*.02)];y1=ys[Math.max(0,Math.ceil(ys.length*.98)-1)];if(y1-y0<1e-9){y0-=1;y1+=1}const pd=(y1-y0)*.12;y0-=pd;y1+=pd}}
 CALC.gya=[y0,y1];
 const X=x=>(x-x0)/(x1-x0)*w,Y=y=>h-(y-y0)/(y1-y0)*h;
 const nice=r=>{const s=Math.pow(10,Math.floor(Math.log10(r/5)));const m=r/5/s;return s*(m>5?10:m>2?5:m>1?2:1)};
 c.font="600 11px JetBrains Mono, monospace";c.lineWidth=1;
 const gx=nice(x1-x0),gy=nice(y1-y0);c.strokeStyle=col("--line");c.fillStyle=col("--fa");
 for(let v=Math.ceil(x0/gx)*gx;v<=x1;v+=gx){c.beginPath();c.moveTo(X(v),0);c.lineTo(X(v),h);c.stroke();c.fillText(fmt57(v,gx),X(v)+3,h-5)}
 for(let v=Math.ceil(y0/gy)*gy;v<=y1;v+=gy){c.beginPath();c.moveTo(0,Y(v));c.lineTo(w,Y(v));c.stroke();c.fillText(fmt57(v,gy),4,Y(v)-4)}
 c.strokeStyle=col("--mu");c.lineWidth=1.5;if(x0<0&&x1>0){c.beginPath();c.moveTo(X(0),0);c.lineTo(X(0),h);c.stroke()}if(y0<0&&y1>0){c.beginPath();c.moveTo(0,Y(0));c.lineTo(w,Y(0));c.stroke()}
 const cols=[col("--blue"),col("--orange"),"#2DD4BF","#A78BFA","#FB7185"];
 data.forEach((pts,k)=>{if(!pts)return;c.strokeStyle=cols[k%cols.length];c.lineWidth=2.5;c.beginPath();let pen=false,prev=null;pts.forEach(([x,y])=>{if(!isFinite(y)||(prev!==null&&Math.abs(Y(y)-Y(prev))>h*1.5)){pen=false;prev=isFinite(y)?y:null;return}if(!pen){c.moveTo(X(x),Y(y));pen=true}else c.lineTo(X(x),Y(y));prev=y});c.stroke()});
 const rd=$("#gread"),bad=fns.map((f,k)=>f?null:ex[k]).filter(Boolean),rx=(x1-x0)/200,ry=(y1-y0)/200;
 const yres=y=>Math.min(ry,Math.abs(y)/100||ry);
 if(CALC.gm!==undefined&&CALC.gm>=x0&&CALC.gm<=x1){c.strokeStyle=col("--tx");c.lineWidth=1;c.setLineDash([4,4]);c.beginPath();c.moveTo(X(CALC.gm),0);c.lineTo(X(CALC.gm),h);c.stroke();c.setLineDash([]);
  const vals=fns.map((f,k)=>{if(!f)return null;let y;try{y=f(CALC.gm)}catch(e){y=NaN}if(isFinite(y)){c.fillStyle=cols[k%cols.length];c.beginPath();c.arc(X(CALC.gm),Y(y),4.5,0,6.3);c.fill()}return {k,y}}).filter(Boolean);
  const xr=Math.min(rx,Math.abs(CALC.gm)/100||rx);
  if(rd){const L=CALC.glab;
   if(L&&vals[0])rd.textContent=`${L.x}: ${fmt57(CALC.gm,xr)} → ${L.y}: ${fmt57(vals[0].y,yres(vals[0].y))}`;
   else rd.textContent=`x = ${fmt57(CALC.gm,xr)}   `+vals.map(v=>`y${v.k+1} = ${fmt57(v.y,yres(v.y))}`).join("   ")}}
 else if(rd&&bad.length)rd.textContent="Couldn’t read: "+bad.join("; ");
 else if(rd&&CALC.glab)rd.textContent="";
 /* axis names (v25) */
 try{const L=CALC.glab;if(L){c.setTransform(dpr,0,0,dpr,0,0);c.font="700 11px Inter, system-ui, sans-serif";
  const lbl=(t,x,y,al)=>{const tw=c.measureText(t).width,xa=al=="right"?x-tw:x;c.fillStyle=col("--s1")||"#111";c.globalAlpha=.85;c.fillRect(xa-4,y-11,tw+8,15);c.globalAlpha=1;c.fillStyle=col("--mu");c.textAlign=al;c.fillText(t,x,y)};
  lbl("↑ "+L.y,w-6,14,"right");lbl(L.x+" →",w-6,h-20,"right");c.textAlign="left"}}catch(e){}};
function gRange57(){const [x0,x1]=CALC.gx,r=(x1-x0)/5,s=Math.pow(10,Math.floor(Math.log10(r))),m=r/s;return s*(m>5?10:m>2?5:m>1?2:1)/10}
gSync=function(){const a=$("#gx0"),b=$("#gx1"),res=gRange57();if(a)a.value=fmt57(CALC.gx[0],res);if(b)b.value=fmt57(CALC.gx[1],res);
 const s=$("#gzr");if(s)s.textContent="x "+fmt57(CALC.gx[0],res)+" to "+fmt57(CALC.gx[1],res);drawGraph()};
/* zoom: x around the finger; y too once it has been panned or pinched */
gZoom=function(f,px,py){const cv=$("#gcv");if(!cv)return;const w=cv.clientWidth||1,h=cv.clientHeight||1,[x0,x1]=CALC.gx;
 const xv=x0+Math.max(0,Math.min(1,px/w))*(x1-x0);let a=xv-(xv-x0)*f,b=xv+(x1-xv)*f;
 if(!isFinite(a)||!isFinite(b)||b-a<1e-12||b-a>1e12)return;CALC.gx=[a,b];
 if(CALC.gy||py!==undefined){const [y0,y1]=CALC.gy||CALC.gya||[-1,1],yv=y1-Math.max(0,Math.min(1,(py===undefined?h/2:py)/h))*(y1-y0),c=yv-(yv-y0)*f,d=yv+(y1-yv)*f;if(isFinite(c)&&isFinite(d)&&d-c>1e-12&&d-c<1e12)CALC.gy=[c,d]}
 gSync()};
const _gr57=gReset;gReset=function(){CALC.gy=null;return _gr57.apply(this,arguments)};
const _gg57=graphGo;graphGo=function(){CALC.gy=null;return _gg57.apply(this,arguments)};
const _gp57=gPre;gPre=function(){CALC.gy=null;return _gp57.apply(this,arguments)};
/* two-finger pan (both axes) and pinch; one finger still traces */
gWire=function(){const cv=$("#gcv");if(!cv||cv.dataset.z)return;cv.dataset.z="1";if(!CALC.g0)CALC.g0=CALC.gx.slice();
 const pts=new Map();let base=null;
 cv.addEventListener("wheel",ev=>{ev.preventDefault();const r=cv.getBoundingClientRect();gZoom(ev.deltaY>0?1.15:1/1.15,ev.clientX-r.left)},{passive:false});
 const mid=()=>{const v=[...pts.values()];return {d:Math.hypot(v[0].x-v[1].x,v[0].y-v[1].y)||1,x:(v[0].x+v[1].x)/2,y:(v[0].y+v[1].y)/2}};
 cv.addEventListener("pointerdown",ev=>{if(ev.pointerType=="mouse")return;pts.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});if(pts.size==2)base=mid()});
 cv.addEventListener("pointermove",ev=>{if(!pts.has(ev.pointerId))return;pts.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
  if(pts.size<2||!base)return;ev.preventDefault();ev.stopPropagation();
  const m=mid(),r=cv.getBoundingClientRect(),w=cv.clientWidth||1,h=cv.clientHeight||1;
  const dx=m.x-base.x,dy=m.y-base.y;
  if(Math.abs(dx)>.5||Math.abs(dy)>.5){const [x0,x1]=CALC.gx,[y0,y1]=CALC.gy||CALC.gya||[-1,1],ddx=dx/w*(x1-x0),ddy=dy/h*(y1-y0);CALC.gx=[x0-ddx,x1-ddx];CALC.gy=[y0+ddy,y1+ddy]}
  if(Math.abs(m.d/base.d-1)>.01)gZoom(base.d/m.d,m.x-r.left,m.y-r.top);else gSync();
  base=m},{passive:false});
 const up=ev=>{pts.delete(ev.pointerId);if(pts.size<2)base=null};
 cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);cv.addEventListener("pointerleave",up);
 const g=$("#gread");if(g&&!$(".gz"))g.insertAdjacentHTML("beforebegin",`<div class="gz"><button onclick="gZoom(1.4,($('#gcv').clientWidth)/2)" aria-label="Zoom out">−</button><button onclick="gZoom(1/1.4,($('#gcv').clientWidth)/2)" aria-label="Zoom in">+</button><button onclick="gReset()">Reset</button><span id="gzr"></span></div>`);
 const s=$("#gzr"),res=gRange57();if(s)s.textContent="x "+fmt57(CALC.gx[0],res)+" to "+fmt57(CALC.gx[1],res)};

/* 6. graph an equation: x = one input, the rest from the question's numbers */
function qVals57(x,syms){const out={};if(!x)return out;const t=" "+String(x.q||"").replace(/<[^>]+>/g," ")+" ";
 syms.forEach(s=>{const e=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const m=new RegExp("(^|[^A-Za-zα-ωΑ-Ω0-9_])"+e+"\\s*=\\s*(-?\\d+(?:\\.\\d+)?(?:e-?\\d+)?)(\\s*[×x]\\s*10\\^?\\s*(-?\\d+))?").exec(t);
  if(m){let v=parseFloat(m[2]);if(m[4])v*=Math.pow(10,+m[4]);if(isFinite(v))out[s]=v}});return out}
function niceUp57(v){if(!(v>0))return 10;const p=Math.pow(10,Math.floor(Math.log10(v))),m=v/p;return (m<=1?1:m<=2?2:m<=5?5:10)*p}
/* list: the question's equations, main one first. An input the question doesn't give, but another listed
   equation defines (q in L = qS·CL, from q = ½ρV²), is substituted in. x is the given input that moves the
   output most (largest log-slope at the question's values). */
function eqGraphSet57(list,x){list=(list||[]).filter(f=>EQX[f]);const f=list[0],q=EQX[f];if(!q||!q.r.length)return false;
 const subs={};list.slice(1).forEach(g=>{const s=EQX[g];if(s&&!(s.l in subs))subs[s.l]=s});
 const allS=new Set(q.r);q.r.forEach(s=>{if(subs[s])subs[s].r.forEach(t=>allS.add(t))});
 const given=qVals57(x,[...allS]);
 const sub1=(Q,xs,deep)=>"("+Q.e.replace(/[A-Za-z_α-ωΑ-Ω][A-Za-z0-9_α-ωΑ-Ω]*/g,m=>{const i=Q.rk.indexOf(m);if(i<0)return m;const s=Q.r[i];
  if(s==xs)return "x";if(s in given)return "("+given[s]+")";if(deep&&subs[s]&&s!=Q.l)return sub1(subs[s],xs,false);return "(1)"})+")";
 const build=xs=>sub1(q,xs,true);
 const pool=[...allS].filter(s=>s in given);const cand=pool.length?pool:q.r.slice();
 const slope=xs=>{try{const e=build(xs),v=given[xs]||1,a=miniEval(e,{x:v},true),b=miniEval(e,{x:2*v},true);const p=Math.log(Math.abs(b/a))/Math.log(2);return isFinite(p)?Math.abs(p):0}catch(e){return 0}};
 const xs=cand.map(s=>[slope(s),s]).sort((a,b)=>b[0]-a[0])[0][1];
 let e=build(xs);for(let k=0;k<4;k++)e=e.replace(/(^|[^A-Za-z0-9_α-ωΑ-Ω])\((-?\d+(?:\.\d+)?(?:e-?\d+)?|x)\)/g,"$1$2");
 const xv=given[xs];CALC.g=e;CALC.gx=[0,xv>0?niceUp57(xv*2):10];CALC.g0=CALC.gx.slice();CALC.gy=null;CALC.gm=undefined;CALC.deg=!!(x&&/°|deg/.test(String(x.q||"")));CALC.glab={y:q.l,x:xs};if(CALC.deg&&/^[α-ωθφ]/.test(xs)){CALC.gx=[0,90];CALC.g0=[0,90]}
 try{const g=$("#gexp");if(g)g.value=e}catch(er){}return true}
function gPrefill57(){try{const graph=TT=="graph"||(TT=="calc"&&CALC.mode=="graph");if(!graph)return;
 const x=SS&&SS.qs&&SS.qs[SS.i]&&view=="lesson"?SS.qs[SS.i]:null;if(!x)return;const k=SS.i+"|"+(x.key||"");if(CALC.gq57===k)return;CALC.gq57=k;
 const m=(mapped30(x)||[]).filter(f=>EQX[f]);if(m.length)eqGraphSet57(m,x)}catch(e){}}
function eqGraph57(id){try{const f=EQR55[id],x=SS&&SS.qs&&SS.qs[SS.i]&&view=="lesson"?SS.qs[SS.i]:null;
 const m=x?(mapped30(x)||[]):[];if(!eqGraphSet57([f].concat(m.filter(g=>g!=f)),x))return;if(x)CALC.gq57=SS.i+"|"+(x.key||"");CALC.mode=null;tools("graph")}catch(e){}}
const _ei57=eqItem25;eqItem25=function(n,f,v){let h=_ei57.apply(this,arguments);try{if(EQX[f]){const id=EQR55.indexOf(f);
 if(id>=0)h=h.replace('<button type="button" class="play55"',`<button type="button" class="graph57" onclick="eqGraph57(${id})">Graph it</button><button type="button" class="play55"`)}}catch(e){}return h};

document.head.insertAdjacentHTML("beforeend",`<style>
#tray .qchip.res{display:inline-flex;align-items:baseline;gap:0;width:auto;margin:0;padding:4px 9px;border-radius:8px;text-align:center;background:color-mix(in srgb,var(--blue) 12%,var(--s2))}
#scrim .sheet.tools29 #tray .qchip.res{padding:4px 9px}
.tq .i{align-self:flex-end}
.eq55 .graph57{margin:10px 8px 0 0;padding:6px 12px;border-radius:99px;border:1px solid var(--line);color:var(--tx);background:transparent;font-size:12.5px;font-weight:800}
</style>`);

try{TF48.unshift(
 {b:"b57",k:"scroll57",t:"Tool tabs scroll",c:"Open the calculator, then Eqns: the list scrolls. Lesson and Help too.",go:["q","aero-aerodynamics-2",0,1]},
 {b:"b57",k:"eqq57",t:"Equation for this question",c:"Eqns shows \"For this question\" with Best match before you answer.",go:["q","aero-aerodynamics-2",0,1]},
 {b:"b57",k:"chip57",t:"Paste chips",c:"Compute something: the result chip under \"Yours\" is small. Swiping the row sideways doesn't paste; a tap does.",go:["q","aero-aerodynamics-2",0,1]},
 {b:"b57",k:"tq57",t:"Question starts expanded",c:"The question at the top of the tools is open; the toggle is at its bottom right. Collapse it, switch tabs: stays collapsed.",go:["q","aero-aerodynamics-2",0,1]},
 {b:"b57",k:"graph57",t:"Graph the question's equation",c:"Open Graph: L vs V from L = qS·CL with ρ, S, CL from the question. Two-finger drag pans up/down too. Labels use 0–2 decimals.",go:["q","aero-aerodynamics-2",0,1]}
)}catch(e){}

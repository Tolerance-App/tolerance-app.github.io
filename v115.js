/* ===== v115 (2026-11-27): flag fixes, visuals (aero1 figure, legend labels, Mach cone jet, datums picture) =====
   1. aero1 card 0 figure. Seth: "Horrible graphic. Looks like the plane is top down view but the vectors are
      obviously side on. Fix asap". Redrawn side on: fuselage profile, tail fin, edge-on wing and tailplane, nose to
      the right. Same four arrows (lift, weight, thrust, drag) and the same caption.
   2. Legend labels stay next to their swatch. Seth (math-found-1): "Volume factor is shifted to the right."
      TIDY53 (v53) moved the "volume factor" key label about 80 px right because it crossed the volume curve, which
      left it detached from its orange swatch. After each redraw, a label that directly follows a key swatch (a rect
      at most 12 × 4) has the TIDY53 nudge taken back. It keeps its h52 halo, so a curve under it still breaks.
   3. Mach cone (mach32, aero-aerodynamics-5). Seth: "make the plane more defined in the demo. Make it more obvious
      which way it's pointing." The arrow glyph becomes a top-view jet (nose, swept wings, tailplane) with its nose
      where the waves start, plus a small "V" arrow ahead of it.
   4. gdt-datums-1 picture. Seth: "Need a better way to show datum and which ways the part can move." Datums are now
      planes, not lines: A the floor (3 points, not in a line), B the back wall (2 points), C the end wall (1 point).
      Each plane lights up as it's engaged. Every motion still free is drawn on the block as an orange arrow
      (straight for moves, curved for tilts and spin), and it disappears when a datum takes it away. Same slider,
      the same six chips and the same "n of 6 motions left". */
try{FB.ver="b115"}catch(e){}

/* ---------- 1. aero1 · four forces, side view ---------- */
try{const f=LFIG17.aero1;if(f){f._svg=null;f.spec={view:[0,12,0,7],eq:true,axes:false,h:190,layers:[
 /* fuselage profile, nose right */
 {t:"poly",pts:[[1.9,3.72],[2.6,3.32],[8.9,3.24],[9.9,3.34],[10.55,3.6],[9.9,3.88],[8.9,3.98],[3.4,4.02],[1.9,3.9]],fill:true,c:"fa",op:.4},
 /* cockpit glass */
 {t:"poly",pts:[[8.75,3.97],[9.35,4.25],[9.85,3.89]],fill:true,c:"blue",op:.45},
 /* tail fin */
 {t:"poly",pts:[[1.95,3.9],[1.55,5.15],[2.3,5.15],[3.35,4.0]],fill:true,c:"fa",op:.4},
 /* tailplane and wing seen edge on (thin airfoil shapes) */
 {t:"poly",pts:[[1.6,3.78],[2.0,3.86],[3.0,3.84],[3.15,3.76],[2.1,3.7]],fill:true,c:"fa",op:.75},
 {t:"poly",pts:[[4.6,3.42],[4.9,3.56],[5.6,3.6],[6.9,3.46],[5.6,3.36],[4.9,3.36]],fill:true,c:"fa",op:.8},
 A17(5.6,3.6,5.6,6.6,"lift","ok",2.4),A17(5.6,3.6,5.6,.6,"weight","bad",2.4),A17(10.55,3.6,11.9,3.6,"thrust","blue",2.4),
 A17(1.9,3.6,.15,3.6,"","orange",2.4),Tx(.15,3.05,"drag")]}}}catch(e){}

/* ---------- 2. key labels stay with their swatch ---------- */
const KEY115=svg=>{try{svg.querySelectorAll("text[data-t53x]").forEach(t=>{const s=t.previousElementSibling;
 if(!s||s.tagName!="rect"||!(+s.getAttribute("width")<=12)||!(+s.getAttribute("height")<=4))return;
 t.setAttribute("transform",(t.getAttribute("transform")||"").replace(/^translate\([^)]*\)\s*/,""));if(!t.getAttribute("transform"))t.removeAttribute("transform");
 delete t.dataset.t53x;delete t.dataset.t53y})}catch(e){}};
try{const _du115=demoU;demoU=function(p){const r=_du115.apply(this,arguments);try{const s=document.getElementById(p+"svg");s&&s.querySelectorAll("svg").forEach(KEY115)}catch(e){}return r}}catch(e){}

/* ---------- 3. Mach cone: a jet, not an arrow ---------- */
try{const D=DEMOS.mach32,run=D.run;D.run=function(v){const r=run.apply(this,arguments);try{const px=250,py=95,
 P=pts=>"M"+pts.map(([x,y])=>(px+x).toFixed(1)+" "+(py+y).toFixed(1)).join("L")+"Z",
 jet=`<g stroke="none" fill="currentColor"><path d="${P([[2,0],[-3,-2.6],[-24,-2.6],[-27,0],[-24,2.6],[-3,2.6]])}"/>`+
  `<path d="${P([[-8,-2.4],[-19,-14],[-22.5,-14],[-17,-2.4]])}"/><path d="${P([[-8,2.4],[-19,14],[-22.5,14],[-17,2.4]])}"/>`+
  `<path d="${P([[-21,-2.4],[-26,-8],[-28.5,-8],[-25.5,-2.4]])}"/><path d="${P([[-21,2.4],[-26,8],[-28.5,8],[-25.5,2.4]])}"/></g>`+
  `<path d="M${px+8} ${py-13}H${px+26}" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M${px+30} ${py-13}L${px+24} ${py-16.5}L${px+24} ${py-9.5}Z" fill="currentColor" stroke="none"/>`+
  `<text x="${px+19}" y="${py-19}" text-anchor="middle">V</text>`;
 r.svg=r.svg.replace(/<path d="M240 95L258 95M247 89L251 95L247 101"[^>]*\/>/,jet)}catch(e){}return r}}catch(e){}

/* ---------- 4. gdt-datums-1: datum planes and free-motion arrows ---------- */
try{PIC85["gdt-datums-1"].pic=v=>{const {p,c,t,r,svg}=H85,n=Math.round(+v.n),on=k=>n>=k;let g="";
 /* block: front face x 100–210, y 90–140; depth vector (36,−26); height 50 */
 const B=(u,dv,w)=>[100+110*u+36*dv,140-26*dv-50*w];
 const Q=(a)=>a.map(q=>B(...q));
 const col=(k,c0)=>on(k)?c0:"var(--fa)";
 /* datum planes, drawn behind the block */
 g+=p(Q([[-.35,-.45,0],[1.15,-.45,0],[1.15,1.6,0],[-.35,1.6,0]]),col(1,"var(--ok)"),on(1)?1.6:1.1,true,on(1)?.16:.05);
 g+=p(Q([[-.25,1.06,-.05],[1.15,1.06,-.05],[1.15,1.06,1.45],[-.25,1.06,1.45]]),col(2,"var(--orange)"),on(2)?1.6:1.1,true,on(2)?.14:.04);
 g+=p(Q([[1.05,-.3,-.05],[1.05,1.06,-.05],[1.05,1.06,1.3],[1.05,-.3,1.3]]),col(3,"var(--blue)"),on(3)?1.6:1.1,true,on(3)?.16:.04);
 /* block */
 /* block: solid faces, so the back wall reads as behind it */
 const F=(a,m)=>`<path d="M${Q(a).map(q=>q[0].toFixed(1)+" "+q[1].toFixed(1)).join("L")}Z" fill="color-mix(in srgb,var(--tx) ${m}%,var(--s1))" stroke="var(--tx)" stroke-width="1.3"/>`;
 g+=F([[0,0,0],[1,0,0],[1,0,1],[0,0,1]],10)+F([[0,0,1],[1,0,1],[1,1,1],[0,1,1]],6)+F([[1,0,0],[1,1,0],[1,1,1],[1,0,1]],16);
 /* contact points: 3 on A (a triangle), 2 on B, 1 on C */
 [[.15,.2,0],[.85,.2,0]].forEach(q=>{const [x,y]=B(...q);g+=c(x,y,3.6,col(1,"var(--ok)"),on(1)?"var(--ok)":"var(--s1)")});
 {const [x,y]=B(.5,.85,0);g+=c(x,y,3.6,col(1,"var(--ok)"),on(1)?"color-mix(in srgb,var(--ok) 35%,transparent)":"none",1.4,"2 1.6")}   /* hidden under the block */
 /* B's two points touch the back face, hidden by the block: dashed, as on a drawing */
 [[.2,1,.55],[.7,1,.55]].forEach(q=>{const [x,y]=B(...q);g+=c(x,y,3.6,col(2,"var(--orange)"),on(2)?"color-mix(in srgb,var(--orange) 35%,transparent)":"none",1.4,"2 1.6")});
 {const [x,y]=B(1,.5,.5);g+=c(x,y,3.6,col(3,"var(--blue)"),on(3)?"var(--blue)":"var(--s1)")}
 /* plane names */
 {const [x,y]=B(-.35,-.45,0);g+=t(x-4,y+4,"A","end",col(1,"var(--ok)"))}
 {const [x,y]=B(-.25,1.06,1.45);g+=t(x-4,y+4,"B","end",col(2,"var(--orange)"))}
 {const [x,y]=B(1.05,1.06,1.3);g+=t(x+6,y+4,"C","start",col(3,"var(--blue)"))}
 /* free motions as orange arrows; a removed motion is not drawn */
 const O="var(--orange)",ar=(a,b)=>{const g0=Math.atan2(b[1]-a[1],b[0]-a[0]),h=6,A=[b[0]-h*Math.cos(g0-.45),b[1]-h*Math.sin(g0-.45)],C=[b[0]-h*Math.cos(g0+.45),b[1]-h*Math.sin(g0+.45)];
  return `<path d="M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${(b[0]-2*Math.cos(g0)).toFixed(1)} ${(b[1]-2*Math.sin(g0)).toFixed(1)}" stroke="${O}" stroke-width="2" fill="none"/><path d="M${b[0].toFixed(1)} ${b[1].toFixed(1)}L${A[0].toFixed(1)} ${A[1].toFixed(1)}L${C[0].toFixed(1)} ${C[1].toFixed(1)}Z" fill="${O}" stroke="none"/>`},
  dbl=(a,b)=>{const m=[(a[0]+b[0])/2,(a[1]+b[1])/2];return ar(m,a)+ar(m,b)},
  /* curved arrow: points of an ellipse arc around centre m, axes e1 and e2, from angle a0 to a1 */
  arc=(m,e1,e2,a0,a1)=>{const P=[];for(let i=0;i<=16;i++){const s=a0+(a1-a0)*i/16;P.push([m[0]+e1[0]*Math.cos(s)+e2[0]*Math.sin(s),m[1]+e1[1]*Math.cos(s)+e2[1]*Math.sin(s)])}
   const L=P.length-1;return `<path d="M${P.slice(0,L).map(q=>q[0].toFixed(1)+" "+q[1].toFixed(1)).join("L")}" stroke="${O}" stroke-width="2" fill="none"/>`+ar(P[L-2],P[L])};
 if(!on(1)){g+=dbl([70,124],[70,80]);   /* move z: up and down, beside the block */
  g+=arc(B(1.02,.5,.5),[0,-14],[11,-8],-.9,2.4);   /* tilt x: about the length axis, on the end face */
  g+=arc(B(.5,-.02,.5),[-22,0],[0,-14],-.2,2.6)}   /* tilt y: about the depth axis, on the front face */
 if(!on(2)){const a=B(.62,.15,1),b=B(.62,.85,1);g+=dbl([a[0],a[1]-3],[b[0],b[1]-3]);   /* move y: across the top */
  g+=arc(B(.3,.5,1),[16,0],[6.5,-4.5],.4,3.9)}       /* spin z: on the top face */
 if(!on(3))g+=dbl([108,156],[200,156]);              /* move x: along the length */
 /* chips and count, as before */
 const M=[["move z",1],["tilt x",1],["tilt y",1],["move y",2],["spin z",2],["move x",3]];
 M.forEach(([s,k],i)=>{const x=10+i*50,gone=n>=k;g+=r(x,172,46,18,gone?"var(--fa)":"var(--orange)",gone?.06:.2,1)+t(x+23,185,s,"middle",gone?"var(--fa)":"var(--tx)",9.5)});
 g+=t(160,210,`${6-M.filter(m=>n>=m[1]).length} of 6 motions left`,"middle","var(--mu)");return svg(218,g)}}catch(e){}

/* ---------- test entries ---------- */
try{TF48.unshift(
 {b:"b115",k:"dt115",t:"Datums picture",c:"Datums are planes now (A floor, B back wall, C end wall), and every motion still free is an orange arrow on the block. Slide 0→3 and watch the arrows go.",go:["lab","gdt-datums-1"]},
 {b:"b115",k:"mc115",t:"Mach cone jet",c:"The arrow is now a jet seen from above, nose where the waves start, with a V arrow ahead of it.",go:["lab","aero-aerodynamics-5"]},
 {b:"b115",k:"key115",t:"Legend stays put",c:"\"volume factor\" sits next to its orange swatch again instead of sliding right.",go:["lab","math-found-1"]},
 {b:"b115",k:"ff115",t:"Four forces, side view",c:"Card 1 picture: the plane is drawn side on now, so lift/weight up and down and thrust/drag along the body make sense.",go:["lesson","aero1"]})}catch(e){}
try{NEWS.unshift({d:"2026-11-27",t:["Clearer pictures: the four forces plane is side on, the Mach cone shows a real jet, and the datums demo shows the planes and which ways the part can still move."]})}catch(e){}

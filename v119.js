/* ===== v119 (2026-11-27): flat graph demos get a picture with colour and motion (batch 1) =====
   Seth: "Find visuals and demos that are flat and boring. Anything that's just a basic graph with sliders. Figure out
   if any of them can incorporate visuals with gradients or movements ... making them all feel quality."
   An audit of all 308 lesson demos (tools/check.py eval, scratch script) found 57 that draw only lines on a plot,
   5 that use any gradient and none that move. This batch adds a picture of the real thing above the existing graph
   for five of the worst. Graph, sliders, keys, readouts and ideas stay exactly as they were.
   1. mat-basics-2 stress-strain: a dogbone test bar in grips, coloured by stress (lower in the wide shoulders, higher
      in the narrow gauge, red once it yields), pulled and released on a slow loop; necks past yield, breaks past
      the ultimate strength.
   2. mfg-sheet-3 springback: a press brake side view. The punch comes down, the sheet folds into the die, the punch
      lifts and the sheet opens by the springback. Tiny springback is drawn larger, and the picture says by how much.
   3. elec-mcu-2 PWM: a pin driving two LEDs. One is slowed down 1000× and blinks with a playhead sweeping the graph;
      the other runs at real speed and just glows at the duty cycle.
   4. diffeq-pde-3 heat modes: the rod itself, coloured by temperature along its length (lined up with the graph's x
      axis), ends held at 0.
   5. ctrl-pid-1 windup: a room with a heater and a thermometer. A playhead sweeps the 80 s run (8 s loop); the heater
      glows with the command (red ring while at its limit), the thermometer and the air warm with the curve.
   Motion: CSS keyframes inside the demo SVG, with a negative delay from the clock so a slider drag (which redraws
   the SVG) keeps the phase instead of restarting. prefers-reduced-motion stops all of it (class m119); the static
   pose is the end state.
   Still graph-only after this batch (audit order, worst first), for the next batches:
   engineering: aero-propulsion-4, elec-motors-drives-3, ctrl-exam-3 (ctQuadAlt), aero-stability-control-3,
   mat-basics-4 (S-N), elec-circuits-1, elec4 (opamp), elec-sensors-4 (alias), elec-mcu-3 (ADC), ctrl-pid-2,
   adc-driving (odrive), cond-grounding (oground), case-logger, req-lang-6, numm-reg-1, ctrl-exam-1;
   ML/code: ml-nn-2, ml-learning-1/2, ml-nn-1, ml-overfitting-validation-2, code-matlab-1/3, cs-networking-4 (retry);
   maths: calc1-implicit-4 (c1ladder), diffeq-first-order-1 (deivp), diffeq-pde-1/4, diffeq-numerical-series-1,
   diffeq-first-order-2, calc2-series-1/3/4, calc1-applications-4 (newton), linalg-svd-3, other calc/diffeq plots.
   Helpers: stack119 (picture above an existing plot SVG), K119 (keyframes), G119 (gradient). */
try{FB.ver="b119"}catch(e){}
try{NEWS.unshift({d:"2026-11-27",t:["Five demos that were only a graph now show the real thing, in colour and moving: the tensile test bar, the press brake springing back, PWM blinking an LED, a rod cooling, and a heater warming a room."]})}catch(e){}
try{const s=document.createElement("style");s.textContent="@media (prefers-reduced-motion:reduce){.m119{animation:none!important}}";document.head.appendChild(s)}catch(e){}

var N119=0;
/* one keyframes rule; returns {css, st(dur, ease)} where st is the inline animation style with a phase-keeping delay */
function K119(frames){const nm="k119_"+(++N119);return {css:`@keyframes ${nm}{${frames}}`,st:(dur,ease)=>`animation:${nm} ${dur}s ${ease||"linear"} ${(-((performance.now()/1000)%dur)).toFixed(2)}s infinite`}}
const TO119=(x,y)=>`transform-box:view-box;transform-origin:${x}px ${y}px;`;
/* linear gradient, stops [[offset 0..1, css colour, opacity?]]; returns {id, def} */
function G119(stops,x1,x2,y1,y2,units){const id="g119_"+(++N119);
 return {id,def:`<linearGradient id="${id}" ${units?`gradientUnits="userSpaceOnUse" x1="${x1}" x2="${x2}" y1="${y1||0}" y2="${y2||0}"`:`x1="${x1||0}" x2="${x2==null?1:x2}" y1="${y1||0}" y2="${y2||0}"`}>${stops.map(s=>`<stop offset="${(+s[0]).toFixed(3)}" style="stop-color:${s[1]};stop-opacity:${s[2]==null?1:s[2]}"/>`).join("")}</linearGradient>`}}
function R119(stops){const id="g119_"+(++N119);return {id,def:`<radialGradient id="${id}">${stops.map(s=>`<stop offset="${s[0]}" style="stop-color:${s[1]};stop-opacity:${s[2]==null?1:s[2]}"/>`).join("")}</radialGradient>`}}
/* picture (drawn in the plot's own width) above an existing "<svg viewBox='0 0 W H'>…</svg>"; over = extra layer drawn on the plot */
function stack119(pic,ph,svg,css,over){const m=String(svg).match(/^<svg viewBox="0 0 ([\d.]+) ([\d.]+)"[^>]*>([\s\S]*)<\/svg>\s*$/);if(!m)return svg;
 return `<svg viewBox="0 0 ${m[1]} ${+m[2]+ph}">${css?`<style>${css}</style>`:""}<g stroke="none">${pic}</g><g transform="translate(0 ${ph})">${m[3]}${over?`<g stroke="none">${over}</g>`:""}</g></svg>`}
/* stress ratio → colour: blue (low) → orange (at yield) → red (yielded) */
const SC119=q=>q>=1?"var(--bad)":`color-mix(in srgb,var(--orange) ${Math.round(Math.max(0,Math.min(1,q))*100)}%,var(--blue))`;
const f119=(x,d)=>H85.n(x,d==null?1:d);

/* ---------- 1. stress-strain: tensile bar ---------- */
function ss119(v){const E=+v.E,Sy=+v.Sy,Su=Math.max(+v.Su,Sy),s=+v.s,q=s/Sy,brk=s>=Su&&s>Sy,yl=s>Sy;
 const el=Math.min(s,Sy)/(E*10),pl=yl&&!brk?-4*Math.log(1-(s-Sy)/Math.max(1e-9,Su-Sy)):0,e=el+pl;
 const ex=Math.min(.22,Math.max(.015,e/20*.25)),exP=yl?Math.max(0,ex-.015):0;
 const neck=brk?.45:yl?.35*Math.min(1,(s-Sy)/Math.max(1e-9,Su-Sy)):0,cy=44,hg=8,hs=15;
 const G=G119([[0,SC119(q*hg/hs)],[.21,SC119(q*hg/hs)],[.29,SC119(q)],[.71,SC119(q)],[.79,SC119(q*hg/hs)],[1,SC119(q*hg/hs)]],30,270,0,0,1);
 const half=(sg)=>{const hm=hg*(1-neck);return `M${150+sg*0} ${cy-hm}C${150+sg*25} ${cy-hm} ${150+sg*35} ${cy-hg} ${150+sg*50} ${cy-hg}L${150+sg*58} ${cy-hg}C${150+sg*66} ${cy-hg} ${150+sg*68} ${cy-hs} ${150+sg*78} ${cy-hs}L${150+sg*120} ${cy-hs}L${150+sg*120} ${cy+hs}L${150+sg*78} ${cy+hs}C${150+sg*68} ${cy+hs} ${150+sg*66} ${cy+hg} ${150+sg*58} ${cy+hg}L${150+sg*50} ${cy+hg}C${150+sg*35} ${cy+hg} ${150+sg*25} ${cy+hm} ${150} ${cy+hm}Z`};
 const gap=brk?5:0,shape=(fill,op)=>[-1,1].map(sg=>`<path d="${half(sg)}" transform="translate(${sg*gap} 0)" fill="${fill}" opacity="${op}" stroke="none"/><path d="${gap?half(sg):half(sg).replace(/Z$/,"")}" transform="translate(${sg*gap} 0)" fill="none" stroke="var(--fa)" stroke-width="1"/>`).join("");
 const grip=x=>`<rect x="${x}" y="${cy-21}" width="22" height="42" rx="3" fill="var(--s3)" stroke="var(--fa)" stroke-width="1"/><path d="M${x+4} ${cy-14}h14M${x+4} ${cy-7}h14M${x+4} ${cy}h14M${x+4} ${cy+7}h14M${x+4} ${cy+14}h14" stroke="var(--fa)" stroke-width="1"/>`;
 const K=K119(`0%{transform:scaleX(1);opacity:1}40%{transform:scaleX(${1+ex})}58%{transform:scaleX(${1+ex})}80%{transform:scaleX(${1+exP});opacity:1}94%{transform:scaleX(${1+exP});opacity:0}95%{transform:scaleX(1);opacity:0}100%{opacity:1}`),
  L=K119(`0%,100%{opacity:0}40%,58%{opacity:1}80%{opacity:${yl?.35:0}}`);
 let g=`<defs>${G.def}</defs><g class="m119" style="${TO119(150,cy)}transform:scaleX(${1+exP});${K.st(5,"ease-in-out")}">`+shape("color-mix(in srgb,var(--mu) 22%,var(--s2))",1)+`<g class="m119" style="opacity:1;${L.st(5,"ease-in-out")}">${shape(`url(#${G.id})`,1)}</g>`+grip(8)+grip(270)+`</g>`;
 g+=H85.a(26,cy+30,4,cy+30,"var(--mu)",1.4)+H85.a(274,cy+30,296,cy+30,"var(--mu)",1.4);
 const msg=brk?"past the ultimate strength: it breaks":yl?`σ/Sy = ${f119(q,2)}: yields, stays stretched`:`σ/Sy = ${f119(q,2)} in the gauge`;
 g+=H85.t(150,12,msg,"middle",brk||yl?"var(--bad)":"var(--mu)",10)+H85.t(150,cy+33,"stretch exaggerated","middle","var(--mu)",9);
 return {g,h:82,css:K.css+L.css}}

/* ---------- 2. springback: press brake (replaces the b116 V picture; same key and note) ---------- */
function sb119(v){const Sy=+v.Sy,E=+v.E,Rt=+v.Rt,a=+v.a,sb=a*Math.min(.9,3*Sy/(E*1000)*(Rt+.5)),b=a-sb;
 const k=sb>=4?1:Math.max(1,Math.min(10,Math.round(4/Math.max(sb,.05)))),incP=Math.max(10,a-sb*k),P=[160,112],Lf=70;
 const fP=(180-incP)/2,fR=(180-a)/2,rad=d=>d*Math.PI/180,T=6,tipR=Math.max(2.5,Math.min(14,Rt*T/2));
 /* die: V block whose faces sit just under the pressed flanges */
 const ap=[P[0],P[1]+T/2/Math.cos(rad(fP))],dl=Lf+6,c=Math.cos(rad(fP)),sn=Math.sin(rad(fP)),top=Math.max(ap[1]-dl*sn,P[1]-56),run=(ap[1]-top)/Math.max(.05,sn)*c;
 const xl=ap[0]-run,xr=ap[0]+run,yb=130;
 const die=`<path d="M${Math.max(4,xl-24).toFixed(1)} ${top.toFixed(1)}L${xl.toFixed(1)} ${top.toFixed(1)}L${ap[0]} ${ap[1].toFixed(1)}L${xr.toFixed(1)} ${top.toFixed(1)}L${Math.min(316,xr+24).toFixed(1)} ${top.toFixed(1)}L${Math.min(316,xr+24).toFixed(1)} ${yb}L${Math.max(4,xl-24).toFixed(1)} ${yb}Z" fill="var(--s3)" stroke="var(--fa)" stroke-width="1"/>`;
 /* punch: wedge with the pressed included angle; dashed circle = inside bend radius */
 const hw=Math.min(36,52*Math.tan(rad(incP/2))),hh=hw/Math.tan(rad(incP/2)),ty=P[1]-T/2-.5;
 const punch=`<path d="M${P[0]} ${ty}L${P[0]-hw} ${(ty-hh).toFixed(1)}L${P[0]-hw} -80L${P[0]+hw} -80L${P[0]+hw} ${(ty-hh).toFixed(1)}Z" fill="color-mix(in srgb,var(--blue) 22%,var(--s2))" stroke="var(--blue)" stroke-width="1.2"/><circle cx="${P[0]}" cy="${(ty-tipR).toFixed(1)}" r="${tipR.toFixed(1)}" fill="none" stroke="var(--blue)" stroke-width="1" stroke-dasharray="2 2"/>`;
 /* flange: bend zone (plastic) orange at the corner, elastic blue toward the free end; rotate() is clockwise on screen */
 const fl=sg=>{const G=G119([[0,"var(--orange)"],[.16,"var(--orange)"],[.42,"var(--blue)"],[1,"var(--blue)"]],P[0],P[0]+sg*Lf,0,0,1),r=d=>-sg*d;
  const A=K119(`0%,8%{transform:rotate(0deg)}30%,55%{transform:rotate(${r(fP)}deg)}68%,90%{transform:rotate(${r(fR)}deg)}100%{transform:rotate(0deg)}`);
  return {css:A.css,def:G.def,g:`<g class="m119" style="${TO119(P[0],P[1])}transform:rotate(${r(fR)}deg);${A.st(6,"ease-in-out")}"><path d="M${P[0]} ${P[1]}H${P[0]+sg*Lf}" stroke="url(#${G.id})" stroke-width="${T}" stroke-linecap="round" fill="none"/></g>`}};
 const L=fl(-1),R=fl(1),Pk=K119(`0%{transform:translateY(-34px)}10%,55%{transform:translateY(0)}64%,100%{transform:translateY(-34px)}`);
 let g=`<defs>${L.def}${R.def}</defs>`+die+L.g+R.g+`<g class="m119" style="transform:translateY(-34px);${Pk.st(6,"ease-in-out")}">${punch}</g>`;
 g+=H85.t(316,12,k>1?`springback drawn ×${k}`:"springback to scale","end","var(--mu)",9);
 g+=H85.l(8,146,26,146,"var(--mu)",2,"5 4")+H85.t(32,150,`under the punch: ${f119(b,1)}°`,"start","var(--mu)",10.5)+H85.l(8,164,26,164,"var(--blue)",3.4)+H85.t(32,168,`after release: ${f119(a,0)}° (the target)`,"start","var(--blue)",10.5);
 g+=H85.t(160,188,`springback ${f119(sb,1)}°: bend past the target by that much`,"middle","var(--orange)",10.5);
 return {g,h:0,css:L.css+R.css+Pk.css,full:`<svg viewBox="0 0 320 196">`}}

/* ---------- 3. PWM: two LEDs ---------- */
function pwm119(v){const D=Math.max(0,Math.min(100,+v.D)),f=D/100,V=+v.V,cy=30;
 const glow=R119([[0,"var(--orange)",.85],[.45,"var(--orange)",.35],[1,"var(--orange)",0]]);
 const led=(x,cls,st,op)=>`<circle cx="${x}" cy="${cy}" r="34" fill="url(#${glow.id})" class="${cls}" style="opacity:${op};${st}"/><circle cx="${x}" cy="${cy}" r="13" fill="color-mix(in srgb,var(--orange) 18%,var(--s2))" stroke="var(--fa)" stroke-width="1"/><circle cx="${x}" cy="${cy}" r="12" fill="var(--orange)" class="${cls}" style="opacity:${op};${st}"/>`;
 const B=f<=0||f>=1?null:K119(`0%,${(f*100-.01).toFixed(2)}%{opacity:1}${(f*100).toFixed(2)}%,100%{opacity:0}`);
 const chip=`<rect x="10" y="${cy-16}" width="44" height="32" rx="3" fill="var(--s3)" stroke="var(--fa)" stroke-width="1"/>`+[0,1,2,3].map(i=>`<path d="M${16+i*10} ${cy-16}v-5M${16+i*10} ${cy+16}v5" stroke="var(--fa)" stroke-width="1.4"/>`).join("");
 let g=`<defs>${glow.def}</defs>`+chip+H85.t(32,cy+4,"pin","middle","var(--mu)",10)+`<path d="M54 ${cy}H246" stroke="var(--fa)" stroke-width="1.4" fill="none"/>`;
 g+=led(128,B?"m119":"",B?B.st(2,"linear"):"",B?1:f)+led(246,"","",(.06+.94*f).toFixed(2));
 g+=H85.t(128,cy+40,"1000× slower: blinks","middle","var(--mu)",9.5)+H85.t(246,cy+40,"real speed: glows","middle","var(--mu)",9.5);
 const Pk=K119(`0%{transform:translateX(0)}100%{transform:translateX(246px)}`);
 const over=`<path class="m119" d="M44 22V170" stroke="var(--orange)" stroke-width="1.4" opacity=".7" fill="none" style="${Pk.st(6,"linear")}"/>`;
 return {g,h:80,css:(B?B.css:"")+Pk.css,over}}

/* ---------- 4. heat equation: the rod ---------- */
function heat119(v){const t=+v.t,b=+v.b,u=x=>Math.exp(-t)*Math.sin(x)+b*Math.exp(-9*t)*Math.sin(3*x),N=40,st=[];
 const col=w=>{w=Math.max(-1,Math.min(1,w/1.4));return w>=0?(w>.6?`color-mix(in srgb,var(--bad) ${Math.round((w-.6)/.4*100)}%,var(--orange))`:`color-mix(in srgb,var(--orange) ${Math.round(w/.6*100)}%,var(--s3))`):`color-mix(in srgb,var(--blue) ${Math.round(-w*100)}%,var(--s3))`};
 for(let i=0;i<=N;i++){const x=i/N*Math.PI;st.push([i/N,col(u(x))])}
 const G=G119(st,0,1),y=12,h=20;
 let g=`<defs>${G.def}</defs><rect x="44" y="${y}" width="246" height="${h}" rx="4" fill="url(#${G.id})" stroke="var(--fa)" stroke-width="1"/>`;
 g+=`<rect x="34" y="${y-5}" width="10" height="${h+10}" rx="2" fill="color-mix(in srgb,var(--blue) 30%,var(--s3))" stroke="var(--fa)" stroke-width="1"/><rect x="290" y="${y-5}" width="10" height="${h+10}" rx="2" fill="color-mix(in srgb,var(--blue) 30%,var(--s3))" stroke="var(--fa)" stroke-width="1"/>`;
 g+=H85.t(167,y+h+16,"the rod: ends held at 0, colour = temperature","middle","var(--mu)",9.5);
 return {g,h:52,css:""}}

/* ---------- 5. PI heater: the room ---------- */
function pid119(v){const r=+v.r,um=+v.um/100,ki=+v.ki,aw=+v.aw>0,S=PID87.sim(r,um,ki,aw),Tm=Math.max(r*1.3,(r+S.os)*1.12,20),x0=30,x1=310,y0=18,hb=162;
 const P=S.pts.filter((q,i)=>i%4==0||i==S.pts.length-1),pc=q=>(q[0]/80*100).toFixed(2)+"%";
 const Kh=K119(P.map(q=>`${pc(q)}{opacity:${(.12+.88*q[2]).toFixed(2)}}`).join("")),
  Ks=K119(P.map(q=>`${pc(q)}{opacity:${q[3]?1:0}}`).join("")),
  Kt=K119(P.map(q=>`${pc(q)}{transform:scaleY(${Math.max(.02,Math.min(1,q[1]/Tm)).toFixed(3)})}`).join("")),
  Ka=K119(P.map(q=>`${pc(q)}{opacity:${(Math.max(0,Math.min(1,q[1]/Tm))*.5).toFixed(2)}}`).join("")),
  Kp=K119(`0%{transform:translateX(0)}100%{transform:translateX(${x1-x0}px)}`),D=8;
 const air=R119([[0,"var(--orange)",.55],[1,"var(--orange)",0]]),glow=R119([[0,"var(--orange)",.9],[1,"var(--orange)",0]]),last=S.pts[S.pts.length-1];
 const tb=68,tt=16,th=tb-tt;
 const cp="c119_"+(++N119);let g=`<defs>${air.def}${glow.def}<clipPath id="${cp}"><rect x="40" y="6" width="240" height="72" rx="4"/></clipPath></defs><rect x="40" y="6" width="240" height="72" rx="4" fill="var(--s2)" stroke="var(--fa)" stroke-width="1.2"/>`;
 g+=`<g clip-path="url(#${cp})">`+`<ellipse class="m119" cx="110" cy="44" rx="120" ry="44" fill="url(#${air.id})" style="opacity:${(Math.min(1,last[1]/Tm)*.5).toFixed(2)};${Ka.st(D)}"/>`;
 g+=`<ellipse class="m119" cx="66" cy="50" rx="30" ry="30" fill="url(#${glow.id})" style="opacity:${(.12+.88*last[2]).toFixed(2)};${Kh.st(D)}"/></g>`;
 g+=`<rect x="52" y="34" width="28" height="36" rx="3" fill="var(--s3)" stroke="var(--fa)" stroke-width="1"/>`+[0,1,2,3,4].map(i=>`<path d="M${56+i*5} 38V66" stroke="var(--orange)" stroke-width="2" fill="none" opacity=".8"/>`).join("");
 g+=`<rect class="m119" x="49" y="31" width="34" height="42" rx="5" fill="none" stroke="var(--bad)" stroke-width="2" style="opacity:0;${Ks.st(D)}"/>`;
 g+=H85.t(66,24,"heater","middle","var(--mu)",9.5)+H85.t(150,24,"room","middle","var(--mu)",9.5);
 const Y=T=>tb-T/Tm*th;
 g+=`<rect x="251" y="${tt}" width="10" height="${th}" rx="5" fill="var(--s3)" stroke="var(--fa)" stroke-width="1"/><rect class="m119" x="253" y="${tt+2}" width="6" height="${th-2}" rx="3" fill="var(--bad)" style="${TO119(256,tb)}transform:scaleY(${Math.min(1,last[1]/Tm).toFixed(3)});${Kt.st(D)}"/><circle cx="256" cy="${tb+3}" r="6" fill="var(--bad)"/>`;
 g+=`<path d="M244 ${Y(r).toFixed(1)}H268" stroke="var(--ok)" stroke-width="1.4" stroke-dasharray="3 2" fill="none"/>`+H85.t(236,Y(r)+3.5,"set","end","var(--ok)",9);
 const over=`<path class="m119" d="M${x0} ${y0}V${hb+2}" stroke="var(--tx)" stroke-width="1.2" opacity=".55" fill="none" style="${Kp.st(D)}"/>`;
 return {g,h:84,css:Kh.css+Ks.css+Kt.css+Ka.css+Kp.css,over}}

/* ---------- install ---------- */
const PIC119={"x:mat-basics-2":ss119,"x:mfg-sheet-3":sb119,"x:elec-mcu-2":pwm119,heat:heat119,"x:ctrl-pid-1":pid119};
function inst119(){
 ["mat-basics-2","mfg-sheet-3","elec-mcu-2"].forEach(id=>{try{const l=LS.find(x=>x.id==id);if(l&&!DEMOS["x:"+id])lessonDemo(l)}catch(e){}});
 Object.entries(PIC119).forEach(([k,pic])=>{try{const D=DEMOS[k];if(!D||D.run.p119)return;const run=D.run;
  const w=function(v){const r=run.apply(this,arguments);try{if(r&&r.svg){const o=pic(v);if(o)r.svg=o.full?`${o.full}<style>${o.css}</style><g stroke="none">${o.g}</g></svg>`:stack119(o.g,o.h,r.svg,o.css,o.over)}}catch(e){}return r};w.p119=1;D.run=w}catch(e){}})}
inst119();
try{const _bu119=build;build=function(){const r=_bu119.apply(this,arguments);try{inst119()}catch(e){}return r}}catch(e){}
try{[
 {b:"b119",k:"ss119",t:"Tensile bar picture",c:"Stress-strain demo: the bar is coloured by stress (gauge hotter than shoulders), pulls and releases; push working stress past yield to see it neck.",go:["lab","mat-basics-2"]},
 {b:"b119",k:"sb119",t:"Press brake springback",c:"Springback demo: punch down, sheet folds, punch up, sheet opens by the springback (drawn larger when tiny, says by how much).",go:["lab","mfg-sheet-3"]},
 {b:"b119",k:"pwm119",t:"PWM LEDs",c:"PWM demo: slowed LED blinks with the playhead, real-speed LED glows at the duty cycle.",go:["lab","elec-mcu-2"]},
 {b:"b119",k:"heat119",t:"Heat rod colours",c:"Heat-equation demo: the rod coloured by temperature above the graph; drag time and watch the n = 3 stripes fade first.",go:["lab","diffeq-pde-3"]},
 {b:"b119",k:"pid119",t:"Heater room",c:"Windup demo: heater glows (red ring at its limit), thermometer and air warm along the playhead; compare anti-windup Off and On.",go:["lab","ctrl-pid-1"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

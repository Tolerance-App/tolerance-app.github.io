/* ===== v69 (2026-11-19): sharper first-run intro =====
   Seth: "make the intro slides and demo better ... easy, surprising, and fun. Keep it focused for engineers,
   not childish fun." The flow stays as decided (plain text → steel-bar lab → bolt teaser); what changes:
   - Page 1 states one concrete problem: 1 m steel bar, 20 mm square, 100 N on the end.
   - The lab starts with a guess (4 choices). Tapping one drops the load on: the bar springs down with a short
     damped wobble and settles at the answer, 12.5 mm.
   - Then the twist: the same 3.14 kg of steel laid flat (40×10) drops 50 mm; on edge (10×40) 3.1 mm. 16× from
     turning it. The square-bar size idea of the old chips is kept in the note (I = bh³/12, height cubed).
   - The load slider stays (0–150 N: flat bar stays under ~225 MPa nominal, within small deflection), and so does
     "See it at real size" (v47), now for any section.
   - The model is stated under the readout: δ = FL³/3EI, E = 200 GPa, own weight ignored, small deflection.
   Page 3 (bolt torque teaser) is unchanged. wlBeam and wlDemoDraw are replaced here, not wrapped: the old square-
   only drawing (and v47's square-only real-size layer) can't draw a 40×10 bar. */
try{FB.ver="b69"}catch(e){}
try{NEWS.unshift({d:"2026-11-19",t:["A new first-run intro: guess how far a steel bar bends, then see what turning it on edge does. Replay it from Settings → Replay intro."]})}catch(e){}

const SEC69={sq:{b:20,h:20,t:"20×20 square"},flat:{b:40,h:10,t:"40×10 flat"},edge:{b:10,h:40,t:"10×40 on edge"}};
const G69=[["under 1 mm",0],["about 3 mm",0],["about 12 mm",1],["about 50 mm",0]];
/* tip deflection in mm: L = 1000 mm, E = 200,000 N/mm², I = bh³/12 mm⁴ */
function d69(F,s){const c=SEC69[s||"sq"],I=c.b*Math.pow(c.h,3)/12;return F*1e9/(3*2e5*I)}
const f69=v=>v<10?v.toFixed(2):v.toFixed(1);

wlBeam=function(dShow){const s=WL.s||"sq",c=SEC69[s],F=WL.F||0,dm=d69(F,s),dv=dShow==null?dm:dShow;
 const x0=46,len=236,y0=62,px=Math.max(-8,Math.min(62,dv*0.95)),N=24;let d=`M${x0} ${y0}`;
 for(let k=1;k<=N;k++){const x=k/N;d+=` L${(x0+x*len).toFixed(1)} ${(y0+px*x*x*(3-x)/2).toFixed(1)}`}
 const tx=x0+len,ty=y0+px,sw=Math.max(3,c.h*0.34);
 const qb=c.b*0.6,qh=c.h*0.6,qx=70,qy=28-qh;/* the cross-section, to scale */
 let g=`<svg viewBox="0 0 320 136" role="img" aria-label="Steel cantilever, ${c.t} section, ${F} newtons at the tip, tip drops ${f69(dm)} millimetres">`+
 `<rect x="${x0-10}" y="22" width="10" height="84" rx="2" fill="var(--s3)"/>`+
 `<line x1="${x0}" y1="${y0}" x2="${x0+len}" y2="${y0}" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4"/>`+
 `<path d="${d}" fill="none" stroke="var(--blue)" stroke-width="${sw.toFixed(1)}" stroke-linecap="round"/>`+
 `<rect x="${qx-qb/2}" y="${qy}" width="${qb}" height="${qh}" rx="1" fill="color-mix(in srgb,var(--blue) 20%,transparent)" stroke="var(--blue)" stroke-width="1.4"/>`+
 `<text x="${qx+qb/2+7}" y="24" font-size="11" fill="var(--mu)">${c.b}×${c.h} mm</text>`;
 if(WL.g==null&&!F)g+=`<g opacity=".45"><line x1="${tx}" y1="${y0-40}" x2="${tx}" y2="${y0-sw/2-4}" stroke="var(--orange)" stroke-width="3" stroke-dasharray="4 3"/><path d="M${tx-6} ${y0-sw/2-11} L${tx} ${y0-sw/2-3} L${tx+6} ${y0-sw/2-11}Z" fill="var(--orange)"/><text x="${tx-10}" y="${y0-28}" text-anchor="end" font-size="12" font-weight="700" fill="var(--orange)">100 N</text></g>`;
 if(F>0)g+=`<line x1="${tx}" y1="${ty-34}" x2="${tx}" y2="${ty-sw/2-4}" stroke="var(--orange)" stroke-width="3"/><path d="M${tx-6} ${ty-sw/2-11} L${tx} ${ty-sw/2-3} L${tx+6} ${ty-sw/2-11}Z" fill="var(--orange)"/>`+
  `<text x="${tx-10}" y="${(ty-24).toFixed(1)}" text-anchor="end" font-size="12" font-weight="700" fill="var(--orange)">${F} N</text>`;
 if(px>6)g+=`<line x1="${tx+14}" y1="${y0}" x2="${tx+14}" y2="${ty.toFixed(1)}" stroke="var(--mu)" stroke-width="1.2"/><text x="${tx+18}" y="${((y0+ty)/2+4).toFixed(1)}" font-size="12" font-weight="700" fill="var(--mu)">δ</text>`;
 return g+`</svg>`};

function real69(){const s=WL.s||"sq",c=SEC69[s],dm=d69(WL.F||0,s),k=pxmm47(),sec=c.h,H=(sec+dm)*k+30;
 const tg=`<button class="real47t" onclick="WL.real=!WL.real;wlDemoDraw()" aria-expanded="${!!WL.real}">${WL.real?"Hide real size":"See it at real size"}</button>`;
 if(!WL.real)return tg;
 if(H>460)return tg+`<div class="real47"><p>${f69(dm)} mm is too far to draw at real size on this screen.</p></div>`;
 const W=300,x1=W-46,x0=x1-130,y0=14,d=dm*k,h=sec*k;let g="";
 g+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${h}" fill="none" stroke="var(--fa)" stroke-dasharray="4 3"/>`;
 g+=`<rect x="${x0}" y="${y0+d}" width="${x1-x0}" height="${h}" rx="1.5" fill="color-mix(in srgb,var(--blue) 35%,transparent)" stroke="var(--blue)" stroke-width="1.5"/>`;
 if(d>3){g+=`<line x1="${x1+12}" y1="${y0}" x2="${x1+12}" y2="${y0+d}" stroke="var(--orange)" stroke-width="2"/>`;
  for(let mm=0;mm<=dm+1e-9;mm++){const yy=y0+mm*k,big=mm%5==0;g+=`<line x1="${x1+12}" y1="${yy.toFixed(1)}" x2="${x1+12+(big?8:4)}" y2="${yy.toFixed(1)}" stroke="var(--mu)" stroke-width="1"/>`}}
 /* labels at each bar's mid-height, pushed apart when the bars nearly coincide */
 let ry=y0+h/2+4,ly=y0+d+h/2+4;if(ly-ry<14){const m=(ry+ly)/2;ry=Math.max(11,m-7);ly=ry+14}
 g+=`<text x="${x0-8}" y="${ry.toFixed(1)}" text-anchor="end" font-size="11" style="fill:var(--mu)">rest</text><text x="${x0-8}" y="${ly.toFixed(1)}" text-anchor="end" font-size="11" font-weight="700" style="fill:var(--blue)">loaded</text>`;
 const HH=Math.ceil(Math.max(H,ly+6));
 return tg+`<div class="real47"><p>Bar tip at real size (about; depends on your screen): ${c.b}×${c.h} mm bar, moving ${f69(dm)} mm.</p><svg width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}" aria-hidden="true">${g}</svg></div>`}

function note69(){const s=WL.s||"sq",F=WL.F||0;
 if(!F)return "Drag the slider to load it.";
 if(s=="sq")return "Same 3.14 kg of steel, rearranged: lay it flat, then stand it on edge.";
 const r=d69(F,"sq"),v=d69(F,s);
 if(s=="flat")return `Same 3.14 kg of steel, laid flat: ${f69(v)} mm, ${(v/r).toFixed(0)}× the square bar’s drop.`;
 return `Same steel on edge: ${f69(v)} mm. That’s 16× stiffer than flat, from turning it. I = bh³/12: height counts cubed, width once. It’s why joists stand on edge.`}

wlDemoDraw=function(dShow){const b=$("#wlbeam");if(b)b.innerHTML=wlBeam(dShow);
 const s=WL.s||"sq",dm=d69(WL.F||0,s),v=dShow==null?dm:Math.max(0,dShow),r=$("#wlread");if(r)r.innerHTML=`<b>${WL.g==null&&dShow==null?"?":f69(v)} mm</b><span>tip drop</span>`;
 if(dShow!=null)return;
 const n=$("#wlnote");if(n)n.textContent=note69();
 const rs=$("#wlreal");if(rs)rs.innerHTML=real69();
 const sl=$("#wlF");if(sl&&+sl.value!==WL.F)sl.value=WL.F;const o=$("#wlFo");if(o)o.textContent=WL.F+" N";
 document.querySelectorAll(".wl-sec69 button").forEach(x=>x.classList.toggle("on",x.dataset.s==s));
 try{tidyWl68()}catch(e){}};

/* damped drop: δ(t) = δ·(1 − e^(−t/τ)·cos ωt), about 0.9 s; skipped with reduced motion */
function drop69(done){const target=d69(WL.F,WL.s||"sq");let red=false;try{red=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
 if(red){wlDemoDraw();return done()}
 const t0=Date.now(),T=900,iv=setInterval(()=>{const t=(Date.now()-t0)/1000;
  if(t*1000>=T||!$("#wlbeam")){clearInterval(iv);wlDemoDraw();return done()}
  wlDemoDraw(target*(1-Math.exp(-t/0.16)*Math.cos(2*Math.PI*t/0.32)))},16)}

function wlGuess69(i){if(WL.g!=null)return;WL.g=i;WL.F=100;WL.s="sq";
 document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{b.disabled=true;if(j==i)b.classList.add("pick")});
 const ask=$(".wl-ask69");if(ask)ask.textContent="";
 drop69(()=>{const ok=G69[i][1];document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{if(G69[j][1])b.classList.add("ok");else if(j==i)b.classList.add("no")});
  try{if(!ok&&typeof buzz=="function")buzz()}catch(e){}
  const v=$("#wlverdict");if(v){v.innerHTML=ok?`<b>Spot on: 12.5 mm.</b> Solid steel, and it still visibly sags over a metre.`:`<b>It drops 12.5 mm.</b> You said ${G69[i][0]}. Solid steel, and it still visibly sags over a metre.`;v.hidden=false}
  setTimeout(()=>{const r=$("#wlrest");if(r){r.hidden=false;wlDemoDraw()}const f=$(".wl-foot");if(f)f.innerHTML=`<button class="btn" onclick="wlGo(2)">Next</button>`},350)})}

const _wp69=wlPage;wlPage=function(){const p=WL.p;
 if(p==0){view="welcome";bare(`<button class="wl wl-intro screen" onclick="wlGo(1)" aria-label="Start"><span class="wl-l1">A steel bar, one metre long, 20&nbsp;mm square.</span><span class="wl-l2">Hang 100&nbsp;N off the end, about a 10&nbsp;kg bag. How far does the tip drop?</span><span class="wl-tap">Tap anywhere</span></button>`);return}
 if(p!=1)return _wp69.apply(this,arguments);
 if(WL.s==null)WL.s="sq";const g=WL.g!=null;if(!g)WL.F=0;
 const body=`<div class="wl-demo wl69"><div id="wlbeam"></div><div class="wl-read" id="wlread"></div>
  <p class="wl-ask69">${g?"":"Your guess, for 100 N on the 20×20 bar:"}</p>
  <div class="wl-g69">${G69.map((o,i)=>`<button ${g?"disabled":""} class="${!g?"":o[1]?"ok":WL.g===i?"no":""}" onclick="wlGuess69(${i})">${o[0]}</button>`).join("")}</div>
  <p class="wl-verdict69" id="wlverdict" ${g?"":"hidden"}>${g?(G69[WL.g][1]?"<b>Spot on: 12.5 mm.</b> Solid steel, and it still visibly sags over a metre.":`<b>It drops 12.5 mm.</b> You said ${G69[WL.g][0]}. Solid steel, and it still visibly sags over a metre.`):""}</p>
  <div id="wlrest" ${g?"":"hidden"}>
   <div class="wl-sec69" role="group" aria-label="Bar section">${Object.keys(SEC69).map(k=>`<button data-s="${k}" onclick="WL.s='${k}';wlDemoDraw()">${SEC69[k].t}</button>`).join("")}</div>
   <p class="wl-note" id="wlnote"></p>
   <div class="wl-load69"><span>Load</span><input id="wlF" type="range" min="0" max="150" step="5" value="${WL.F}" aria-label="Load in newtons" oninput="WL.F=+this.value;wlDemoDraw()"><b id="wlFo" class="mono">${WL.F} N</b></div>
   <div id="wlreal"></div>
   <p class="wl-model69">Model: δ = FL³/3EI, I = bh³/12, steel E = 200 GPa, L = 1 m. Own weight ignored; the drop stays small next to the length.</p>
  </div></div>
  <p class="wl-cap">Every lesson in Tolerance works like this: an idea, something to play with, then a few questions.</p>`;
 const dots=[1,2].map(i=>`<i class="${i==p?"on":""}"></i>`).join("");
 view="welcome";
 bare(`<div class="wl screen"><div class="wl-top"><div class="wl-dots" aria-label="Page 1 of 2">${dots}</div><button class="wl-skip" onclick="wlDone()">Skip</button></div><div class="wl-body">${body}</div><div class="wl-foot">${g?`<button class="btn" onclick="wlGo(2)">Next</button>`:`<small style="margin-top:0">Tap a guess. Nothing is graded.</small>`}</div></div>`);
 wlDemoDraw()};

document.head.insertAdjacentHTML("beforeend",`<style>
.wl69 .wl-read{margin:2px 2px 8px}
.wl-ask69{font-size:15px!important;font-weight:700;color:var(--tx)!important;margin:0 0 8px!important}
.wl-ask69:empty{display:none}
.wl-g69{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.wl69~.wl-cap{margin-top:0}
.wl-body:has(#wlrest:not([hidden])){justify-content:flex-start;gap:10px}
.wl-g69 button{padding:11px 10px;border-radius:14px;background:var(--s1);border:1.5px solid var(--line);font:700 15px "JetBrains Mono",monospace;color:var(--tx)}
.wl-g69 button.pick{border-color:var(--blue)}
.wl-g69 button.ok{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,var(--s1))}
.wl-g69 button.no{border-color:var(--bad);opacity:.75}
.wl-g69 button:disabled{cursor:default}
.wl-verdict69{margin:12px 0 0!important;font-size:15px!important;line-height:1.45}
.wl-sec69{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:16px}
.wl-sec69 button{padding:9px 4px;border-radius:12px;border:1px solid var(--line);background:var(--s2);color:var(--tx);font-size:12.5px;font-weight:700}
.wl-sec69 button.on{border-color:var(--blue);background:color-mix(in srgb,var(--blue) 18%,var(--s2))}
.wl69 .wl-note{min-height:38px}
.wl-load69{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:13px;color:var(--mu);font-weight:700}
.wl-load69 input{flex:1;accent-color:var(--orange)}
.wl-load69 b{min-width:48px;text-align:right;color:var(--tx)}
.wl69 .real47t{margin-top:8px}
.wl .wl-model69{font-size:12px;line-height:1.45;color:var(--fa);margin-top:10px}
</style>`);

try{TF48.unshift({b:"b69",k:"wl69",t:"New first-run intro",c:"Replay intro: the bar question, then guess (12.5 mm is right), watch it drop and settle. Then flat (50 mm) vs on edge (3.1 mm), load slider, real size. Bolt question unchanged.",go:["intro"]})}catch(e){}

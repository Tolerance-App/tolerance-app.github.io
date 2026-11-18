/* ===== v55 (2026-11-18): Equations tab teaches relationships, not plugging in =====
   Seth: the Equations tab let people paste a and b and solve for c without understanding the model. The only
   numbers worth remembering are typical ranges and orders of magnitude.
   1. Every equation card shows how it scales, worked out from the formula itself: "V ×2 → q ×4", a
      proportionality line (q ∝ ρ·V²) and the input it is most sensitive to. Inputs that aren't a clean power
      law say whether the output rises or falls.
   2. "Play with it" replaces "Solve with this": each input gets a slider from ×0.1 to ×10 and the output is
      shown as a multiple of where it started. No absolute numbers go in.
   3. Variables are listed one per line. Optional "Typical values" (TYP55, keyed by formula) hold the ranges and
      orders of magnitude people should know.
   4. During a question the tab no longer names the question's equation; "For this question" and Best match
      appear only after answering. The solver is gone: svOpen does nothing, so the b46 auto-open stops, and
      Poke no longer has a Solve button. The calculator itself stays. */
try{FB.ver="b55"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Equations tab reworked: each equation shows how its quantities pull on each other (double this, that goes ×4), with sliders under “Play with it”.","The solver is gone. Which equation fits a question is marked after you answer, so picking it is part of the learning.","Some equations now list typical values worth knowing."]})}catch(e){}

/* Typical values: the numbers worth remembering. Keyed by the exact formula string in EQB. */
const TYP55={
 "q = ½ρV²":"Sea-level air ρ ≈ 1.2 kg/m³. Car at 30 m/s: q ≈ 0.5 kPa. Airliner cruising at 230 m/s, 11 km up (ρ ≈ 0.38 kg/m³): q ≈ 10 kPa.",
 "σ = F / A":"Yield strength for scale: structural steel ≈ 250–350 MPa, 6061-T6 aluminium ≈ 275 MPa, ABS plastic ≈ 40 MPa.",
 "V = IR":"Logic signals 3.3–5 V. Pull-up resistors 1–10 kΩ. An indicator LED runs at about 10–20 mA.",
 "P = V·I":"Phone charger ≈ 5–20 W. Laptop ≈ 60 W. Electric kettle ≈ 2–3 kW."
};

function eqVal55(q,v){const sc={};q.rk.forEach((k,i)=>sc[k]=v[i]);try{const r=miniEval(q.e,sc,true);return typeof r=="number"&&isFinite(r)?r:NaN}catch(e){return NaN}}
function eqBases55(q){const n=q.rk.length;return [Array(n).fill(.5),q.rk.map((_,j)=>1+j*.37),...[0,1,2,3,4,5].map(tr=>q.rk.map((_,j)=>.4+((j*7+tr*3)%11)/4))]
 .filter(b=>{const y=eqVal55(q,b);return isFinite(y)&&y!=0})}
function eqBase55(q){const B=eqBases55(q);
 return B.find(b=>eqVal55(q,b)>0&&b.every((_,i)=>[.1,10].every(m=>{const c=b.slice();c[i]*=m;return isFinite(eqVal55(q,c))})))||B.find(b=>eqVal55(q,b)>0)||B[0]||null}
const EQS55={};
/* per input: {k:"pow",p} for a clean power law, {k:"up"|"down"} when it moves one way, {k:"mix"} otherwise */
function eqScale55(f){if(EQS55[f])return EQS55[f];const q=EQX[f];if(!q)return null;const B=eqBases55(q);if(!B.length)return null;
 const at=(b,i,m)=>{const c=b.slice();c[i]*=m;return eqVal55(q,c)};
 const out=q.r.map((s,i)=>{const ps=[];let ok=true;
  B.forEach(b=>{const y=eqVal55(q,b);[2,10].forEach(m=>{const y2=at(b,i,m);if(!isFinite(y2)||y2==0||Math.sign(y2)!=Math.sign(y)){ok=false;return}ps.push(Math.log(y2/y)/Math.log(m))})});
  if(ok&&ps.length&&Math.max(...ps)-Math.min(...ps)<.005){let p=ps[0];const s6=Math.round(p*6)/6;if(Math.abs(s6-p)<.01)p=s6;return {s,k:"pow",p}}
  let up=0,dn=0;B.forEach(b=>{const ys=[.25,.5,1,2,4].map(m=>at(b,i,m));for(let j=1;j<ys.length;j++){if(!isFinite(ys[j])||!isFinite(ys[j-1])||Math.sign(ys[j])!=Math.sign(ys[j-1]))continue;const d=ys[j]-ys[j-1];if(d>1e-12*Math.abs(ys[j]))up++;else if(d<-1e-12*Math.abs(ys[j]))dn++}});
  return {s,k:up&&!dn?"up":dn&&!up?"down":"mix"}});
 return EQS55[f]={l:q.l,r:out}}
const nf55=v=>{const a=Math.abs(v);return a>=100?Math.round(v)+"":(+v.toPrecision(3))+""};
function powStr55(s,p){const a=Math.abs(p),S=s;
 if(Math.abs(a-1)<1e-9)return s;if(Math.abs(a-.5)<1e-9)return "√"+S;if(Math.abs(a-1/3)<1e-9)return "∛"+S;
 const sup={2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶"};if(sup[a])return S+sup[a];return (s.length>1?"("+s+")":s)+"^"+nf55(a)}
function eqScaleHTML55(f){const sc=eqScale55(f);if(!sc||!sc.r.length)return "";const L=sc.l;
 const chip=r=>{if(r.k=="pow"){if(Math.abs(r.p)<1e-9)return `<span class="c55">${esc(r.s)} has no effect here</span>`;const fac=Math.pow(2,Math.abs(r.p));
   return `<span class="c55"><b>${esc(r.s)}</b> ×2 → <b>${esc(L)}</b> ${r.p>0?"×":"÷"}${nf55(fac)}</span>`}
  if(r.k=="up")return `<span class="c55"><b>${esc(r.s)}</b> ↑ → <b>${esc(L)}</b> ↑ <i>not in proportion</i></span>`;
  if(r.k=="down")return `<span class="c55"><b>${esc(r.s)}</b> ↑ → <b>${esc(L)}</b> ↓ <i>not in proportion</i></span>`;
  return `<span class="c55"><b>${esc(r.s)}</b>: effect depends on the other values</span>`};
 let h="";const pw=sc.r.filter(r=>r.k=="pow"&&Math.abs(r.p)>1e-9);
 if(pw.length==sc.r.length&&pw.length){const num=pw.filter(r=>r.p>0).map(r=>powStr55(r.s,r.p)),den=pw.filter(r=>r.p<0).map(r=>powStr55(r.s,r.p));
  const nm=num.length?num.join("·"):"1",dn=den.length?(den.length>1?"("+den.join("·")+")":den[0]):"";
  h+=`<div class="pr55">${esc(L)} ∝ ${esc(nm)}${dn?" / "+esc(dn):""}</div>`}
 h+=`<div class="sc55">${sc.r.map(chip).join("")}</div>`;
 if(pw.length>=2){const m=pw.reduce((a,r)=>Math.abs(r.p)>Math.abs(a.p)?r:a);if(pw.filter(r=>Math.abs(Math.abs(r.p)-Math.abs(m.p))<1e-9).length==1)
  h+=`<p class="lv55">Biggest lever: <b>${esc(m.s)}</b>. A 10% change in ${esc(m.s)} moves ${esc(L)} by about ${nf55(Math.abs(Math.pow(1.1,m.p)-1)*100)}%.</p>`}
 return h}
/* "q dynamic pressure (Pa), ρ air density (kg/m³)" → rows */
function eqVars55(v){const parts=String(v||"").split(/,\s+/),rows=[];
 parts.forEach(p=>{const m=/^([A-Za-zΑ-ωΔΦΩΣΓΛ][^\s]*)\s+(.+)$/.exec(p.trim());if(m&&rows.length<12)rows.push([m[1],m[2]]);else if(rows.length)rows[rows.length-1][1]+=", "+p;else rows.push(["",p])});
 if(!rows.length||rows.some(r=>!r[0]))return v?`<small>${esc(v)}</small>`:"";
 return `<div class="vr55">${rows.map(([s,d])=>`<div><b>${esc(s)}</b><span>${esc(d)}</span></div>`).join("")}</div>`}
const EQR55=[];const eqId55=f=>{let i=EQR55.indexOf(f);if(i<0){EQR55.push(f);i=EQR55.length-1}return i};
eqItem25=function(n,f,v){const q=EQX[f],id=eqId55(f),ty=TYP55[f];let sc="";try{sc=q?eqScaleHTML55(f):""}catch(e){}
 const canPlay=q&&q.r.length&&eqBase55(q);
 return `<div class="eq eq55" data-i="${id}"><b>${esc(n)}</b><div class="f">${esc(f)}</div>${sc}${eqVars55(v)}`+
  (ty?`<div class="ty55"><span>Typical values</span>${esc(ty)}</div>`:"")+
  (canPlay?`<button type="button" class="play55" aria-expanded="false" onclick="eqPlay55(${id},this)">Play with it</button><div class="pl55" hidden></div>`:"")+`</div>`};
/* Play with it: log sliders ×0.1…×10 on each input; output as a multiple of the start */
function eqPlay55(id,btn){const f=EQR55[id],q=EQX[f],box=btn&&btn.nextElementSibling;if(!q||!box)return;
 if(!box.hidden){box.hidden=true;btn.setAttribute("aria-expanded","false");btn.textContent="Play with it";return}
 box.hidden=false;btn.setAttribute("aria-expanded","true");btn.textContent="Hide";
 box.innerHTML=`<p class="h55">Slide an input to see how <b>${esc(q.l)}</b> moves. Everything starts at ×1.</p>`+q.r.map((s,i)=>`<label class="s55"><span><b>${esc(s)}</b> <em class="mono" id="pm55_${id}_${i}">×1</em></span><input type="range" min="-1" max="1" step="0.01" value="0" aria-label="Multiply ${esc(s)}" oninput="eqPlayUpd55(${id})" data-i="${i}"></label>`).join("")+
  `<div class="o55"><span><b>${esc(q.l)}</b> <em class="mono" id="po55_${id}">×1</em></span><div class="bar55"><i class="mid"></i><i class="fill" id="pb55_${id}"></i></div><small>Bar runs from ÷100 to ×100.</small></div><button type="button" class="rs55" onclick="eqPlayReset55(${id})">Reset</button>`;
 eqPlayUpd55(id)}
function eqPlayReset55(id){const el=document.querySelector(`.eq55[data-i="${id}"] .pl55`);if(!el)return;el.querySelectorAll("input[type=range]").forEach(r=>r.value=0);eqPlayUpd55(id)}
function eqPlayUpd55(id){const f=EQR55[id],q=EQX[f],el=document.querySelector(`.eq55[data-i="${id}"] .pl55`);if(!q||!el)return;const b=eqBase55(q);if(!b)return;
 const v=b.slice();el.querySelectorAll("input[type=range]").forEach(r=>{const i=+r.dataset.i,m=+Math.pow(10,+r.value).toPrecision(3);v[i]=b[i]*m;const t=$("#pm55_"+id+"_"+i);if(t)t.textContent="×"+nf55(m)});
 const y0=eqVal55(q,b),y=eqVal55(q,v),R=y/y0,o=$("#po55_"+id),bar=$("#pb55_"+id);
 if(!isFinite(R)||R<=0){if(o)o.textContent="outside this formula's range";if(bar){bar.style.width="0";bar.style.left="50%"}return}
 if(o)o.textContent=R>=1?"×"+nf55(R):"÷"+nf55(1/R);
 if(bar){const x=Math.max(-2,Math.min(2,Math.log10(R)))/4*100;bar.style.left=(x<0?50+x:50)+"%";bar.style.width=Math.abs(x)+"%";bar.classList.toggle("dn",x<0)}}

/* Equations tab: the question's equation is named only after answering */
eqRender25=function(){const b=$("#tbody");if(!b||TT!="eq")return;const l=srcLesson(),x=SS&&SS.qs&&SS.qs[SS.i]&&view=="lesson"?SS.qs[SS.i]:null,done=!!(x&&SS.busy),top=eqTopic30(l);
 const others=Object.keys(EQB).filter(k=>!top.includes(k));let h="";
 if(l&&top.length){h+=`<p class="sub" style="margin-top:0">Equations for <b>${esc(l.br)}</b>. Each card shows how its quantities pull on each other. Open <b>Play with it</b> to try it.</p>`;
  if(x&&!done)h+=`<p class="sub eqnone">Which equation fits this question is yours to work out. It's marked here after you answer.</p>`;
  else if(x){const m=mapped30(x);
   if(m&&m.length)h+=`<p class="eqh eqbest">For this question</p>`+eqWithAlt30(m,top).map((f,i)=>eqItem30(f,i==0)).join("");
   else if(m)h+=`<p class="sub eqnone">This one is a definition or a code trace, so no single equation applies.</p>`;
   else{const best=eqBest25(l,x,top);if(best.length)h+=`<p class="eqh eqbest">Best match for this question</p>`+best.map(r=>eqItem25(r[1],r[2],r[3])).join("")}}
  h+=top.map(k=>`<p class="eqh">${esc(EQB[k].t)}</p>`+EQB[k].e.map(e=>eqItem25(...e)).join("")).join("")}
 else h+=`<p class="sub" style="margin-top:0">${l?`No equations are set up for <b>${esc(l.br)}</b> yet.`:"Every equation in the app, by topic. Each card shows how its quantities pull on each other."}</p>`;
 const no=others.reduce((a,k)=>a+EQB[k].e.length,0);
 h+=`<details class="eqall"${l?"":" open"}><summary>${l?"All other equations":"Browse by topic"} <span>${no}</span></summary>`+others.map(k=>`<details class="eqbank"><summary>${esc(EQB[k].t)} <span>${EQB[k].e.length}</span></summary>${EQB[k].e.map(e=>eqItem25(...e)).join("")}</details>`).join("")+`</details>`;
 b.innerHTML=h;b.scrollTop=0};
/* the solver is retired: nothing opens it (b46 auto-open, old buttons) */
svOpen=function(){};
try{if(CALC.sv)CALC.sv=null}catch(e){}
const _tb55=toolsBody;toolsBody=function(){const r=_tb55.apply(this,arguments);try{document.querySelectorAll("#tbody .eq .solve,#tbody .eqref").forEach(e=>e.remove())}catch(e){}return r};
const _pk55=poke;poke=function(){const r=_pk55.apply(this,arguments);try{document.querySelectorAll("#poke .pksolve").forEach(e=>e.remove())}catch(e){}return r};

document.head.insertAdjacentHTML("beforeend",`<style>
.eq55 .pr55{margin-top:6px;font:700 13.5px "JetBrains Mono",monospace;color:var(--blue)}
.eq55 .sc55{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.eq55 .c55{display:inline-block;padding:3px 9px;border-radius:99px;background:color-mix(in srgb,var(--blue) 12%,transparent);border:1px solid color-mix(in srgb,var(--blue) 30%,transparent);font:600 12.5px "JetBrains Mono",monospace;color:var(--tx);line-height:1.5}
.eq55 .c55 b{display:inline;font:inherit;font-weight:800;color:var(--tx);margin:0}
.eq55 .c55 i{font-style:normal;font-family:inherit;color:var(--mu);font-weight:500}
.eq55 .lv55{margin:8px 0 0;font-size:13px;color:var(--mu);line-height:1.45}
.eq55 .lv55 b{display:inline;font-size:inherit;color:var(--tx);margin:0}
.eq55 .vr55{margin-top:8px;display:grid;gap:3px}
.eq55 .vr55 div{display:grid;grid-template-columns:minmax(28px,auto) 1fr;gap:10px;font-size:13px;line-height:1.4;color:var(--mu)}
.eq55 .vr55 b{display:block;margin:0;font:700 13px "JetBrains Mono",monospace;color:var(--tx)}
.eq55 .ty55{margin-top:10px;padding:8px 10px;border-radius:10px;border-left:3px solid var(--orange);background:color-mix(in srgb,var(--orange) 9%,transparent);font-size:13px;line-height:1.45;color:var(--tx)}
.eq55 .ty55 span{display:block;font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--orange);margin-bottom:2px}
.eq55 .play55{margin-top:10px;padding:6px 12px;border-radius:99px;border:1px solid var(--blue);color:var(--blue);background:transparent;font-size:12.5px;font-weight:800}
.eq55 .pl55{margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}
.eq55 .h55{margin:0 0 8px;font-size:13px;color:var(--mu)}.eq55 .h55 b{display:inline;font-size:inherit;color:var(--tx);margin:0}
.eq55 .s55{display:block;margin-bottom:8px}
.eq55 .s55>span,.eq55 .o55>span{display:flex;justify-content:space-between;font-size:13px;color:var(--mu)}
.eq55 .s55 b,.eq55 .o55 b{display:inline;margin:0;font:700 13px "JetBrains Mono",monospace;color:var(--tx)}
.eq55 .s55 em,.eq55 .o55 em{font-style:normal;color:var(--tx);font-weight:700}
.eq55 .s55 input{width:100%;margin:4px 0 0}
.eq55 .o55{margin-top:6px;padding:8px 10px;border-radius:10px;background:var(--s1)}
.eq55 .o55 small{margin-top:4px;font-size:11.5px;color:var(--fa)}
.eq55 .bar55{position:relative;height:8px;margin-top:8px;border-radius:99px;background:var(--line);overflow:hidden}
.eq55 .bar55 .mid{position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:var(--mu)}
.eq55 .bar55 .fill{position:absolute;top:0;bottom:0;left:50%;width:0;background:var(--blue);transition:left .12s,width .12s}
.eq55 .bar55 .fill.dn{background:var(--orange)}
.eq55 .rs55{margin-top:8px;padding:4px 10px;border-radius:99px;border:1px solid var(--line);background:transparent;color:var(--mu);font-size:12px;font-weight:700}
</style>`);

try{TF48.unshift(
 {b:"b55",k:"eq55",t:"Equations show relationships",c:"Open Equations: no Solve buttons, no Best match before you answer. Cards show q ∝ ρ·V², ×2 chips and Play with it. Answer, reopen: For this question appears.",go:["q","aero-aerodynamics-2",0]},
 {b:"b55",k:"calc55",t:"Calculator opens plain",c:"Open the calculator on this question: no solver pops up.",go:["q","mech-machine-3",1,1]},
 {b:"b55",k:"poke55",t:"Poke has no Solve button",c:"Use Poke on a calculation question: the equation is named, with no Solve button.",go:["q","aero-aerodynamics-3",0]}
)}catch(e){}

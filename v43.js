/* ===== v43 (2026-11-17): four tester-flag bugs =====
   1. Equation solver: the equation picked with "Solve with this" stayed open on the next question. It now
      closes when the question changes (like the entry box since v25), and has a Clear button that empties
      every box so you can start over.
   2. Light mode: locked path circles were near-black. The v30-era theme block (":root{…--lock:#222A34…}"
      in index.html) redefines --lock, --lockD, --lockI, --okD, --badD, --goldD and --shadow for dark mode
      but its light block doesn't, and that later :root wins over the earlier [data-theme=light] block.
      Restore the original light values with a more specific selector.
   3. Percents in the solver: "25%" was read as 25 (parseFloat ignores the %), so D = 25 in
      Vavg = D·Vs gave 300 V. "25%" now means 0.25. When a variable is described "as a fraction" the
      solver says so, and refuses a value above 1 with a hint.
   4. Lab demos: a slider that does nothing in the current mode is drawn darker, with a note. First user:
      ctQuadAlt's Ki only acts in PID. */
try{FB.ver="b43"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["Equation solver: it clears when you move to the next question, has a Clear button, and takes percents like 25%.","Light mode: locked lessons on the path are light grey again instead of black.","Quadrotor altitude model: the Ki slider is dimmed unless PID is selected."]})}catch(e){}

/* 2. light-mode colors */
try{const s=document.createElement("style");s.id="v43css";s.textContent=
 `:root[data-theme=light]{--lock:#E2E6EC;--lockD:#C8CED7;--lockI:#97A1AE;--okD:#0D7A4D;--badD:#B03338;--goldD:#B88700;--shadow:0 16px 48px rgba(16,24,40,.16)}
.sv .svh .svbtns{display:flex;gap:6px}
.sl.off43{opacity:.38;filter:saturate(.2)}
.sl.off43 span::after{content:attr(data-off);margin-left:6px;font-size:11px;color:var(--mu)}`;
 document.head.appendChild(s)}catch(e){}

/* 1. solver closes on a new question; Clear button */
let QK43=null;
const _sq43=showQ;showQ=function(){try{const k=SS&&SS.qs&&(SS.i+"|"+((SS.qs[SS.i]||{}).key||""));if(k!==QK43){QK43=k;CALC.sv=null}}catch(e){}return _sq43.apply(this,arguments)};
function svClear43(){if(!CALC.sv)return;CALC.sv.vals={};CALC.sv.msg="";svDraw();setTimeout(()=>{const i=$(".sv .slot input");if(i&&!kbOn())i.focus()},30)}

/* 3. fraction variables and percents */
const FRAC43={};
try{Object.values(EQB).forEach(b=>b.e.forEach(([n,f,v])=>{const q=EQX[f];if(!q)return;
 String(v||"").split(/,\s*/).forEach(t=>{const w=t.trim().split(/\s+/)[0];if(w&&/as a fraction/i.test(t)&&[q.l].concat(q.r).includes(w))(FRAC43[f]=FRAC43[f]||[]).push(w)})}))}catch(e){}
const _svNum43=svNum;svNum=function(s){const t=String(s??"").trim();if(/%$/.test(t)){const v=_svNum43(t.slice(0,-1));return v===null?null:v/100}return _svNum43(s)};
const _svSolve43=svSolve;svSolve=function(){try{const sv=CALC.sv;if(sv){const fr=FRAC43[sv.f]||[];
  for(const s of fr){const raw=String(sv.vals[s]||"").trim();if(!raw)continue;const v=svNum(raw);
   if(v!==null&&!/%$/.test(raw)&&Math.abs(v)>1){sv.msg=`${s} is a fraction: enter ${raw}% or ${sig(v/100,3)}.`;svDraw();return}}}}catch(e){}
 return _svSolve43.apply(this,arguments)};
const _svDraw43=svDraw;svDraw=function(){const r=_svDraw43.apply(this,arguments);try{const box=$(".sv");if(!box||!CALC.sv)return r;
  const x=box.querySelector(".svh .x");if(x&&!box.querySelector(".svclr"))x.insertAdjacentHTML("beforebegin",`<button class="x svclr" onclick="svClear43()" aria-label="Clear every box">Clear</button>`);
  const h=box.querySelector(".svh");if(h&&!h.querySelector(".svbtns")){const w=document.createElement("span");w.className="svbtns";h.querySelectorAll("button").forEach(b=>w.appendChild(b));h.appendChild(w)}
  const fr=FRAC43[CALC.sv.f]||[];const f=box.querySelector(".svf");if(fr.length&&f&&!box.querySelector(".svfr"))(f.closest(".svr29")||f).insertAdjacentHTML("afterend",`<p class="sub svfr" style="margin:0 0 6px;font-size:12.5px">${fr.map(esc).join(", ")} ${fr.length>1?"are fractions":"is a fraction"}: 25% = 0.25.</p>`)}catch(e){}return r};

/* 4. sliders that do nothing in the current mode are dimmed. DIM43[demoId][sliderKey] = [test(values), note] */
const DIM43={ctQuadAlt:{ki:[v=>+v.md==2,"PID only"]}};
const _du43=demoU;demoU=function(p){const r=_du43.apply(this,arguments);try{const box=document.querySelector(`.demo[data-p="${p}"]`),D=box&&DIM43[box.dataset.id];
  if(D){const v=demoVals(p);Object.entries(D).forEach(([k,[on,note]])=>{const i=document.getElementById(p+k),l=i&&i.closest(".sl");if(!l)return;
   const off=!on(v);l.classList.toggle("off43",off);const s=l.querySelector("span");if(s)s.dataset.off=off?"· "+note:""})}}catch(e){}return r};

/* 5. One-time apology in the Home Screen app. Before b42 a Home Screen copy never checked for new builds, so
   testers there may have run old builds for days. Shown once per copy (localStorage "tol_sorry43") on the
   Learn screen, only in the Home Screen app (SA35) and only if this copy already has progress (a new
   install has nothing to apologize for). It has a Copy progress code button, because deleting and
   re-adding the icon starts an empty copy. */
function sorry43(){try{localStorage.setItem("tol_sorry43","1")}catch(e){}
 sheet(`<h2 class="sht">Sorry about the updates</h2><p class="body">Until now, Tolerance on your Home Screen didn’t update itself, so you may have been on an old version for a while and missed fixes and new lessons.</p>
<p class="body">That’s fixed. From now on it updates on its own when you’re between lessons. Your progress is safe.</p>
<p class="body">If it ever looks out of date, swipe the app away and open it again. <b>Before you delete or re-add the icon, copy your progress code.</b> A new icon starts empty, and the code brings your progress back (Settings → Progress → Restore progress).</p>
<button class="btn" id="sorrycp43" onclick="sorryCopy43()">Copy progress code</button><p class="sub" id="sorrym43" role="status" style="text-align:center;min-height:1.4em;margin:6px 0"></p>
<button class="btn ghost" onclick="closeSheet()">Got it</button>`)}
async function sorryCopy43(){const m=$("#sorrym43");try{await navigator.clipboard.writeText(codeText28());if(m)m.textContent="Copied. Keep it somewhere safe, like Notes."}
 catch(e){try{codeSheet28()}catch(x){if(m)m.textContent="Couldn’t copy. Use Settings → Progress → Copy progress code."}}}
let SORRY43=0;
const _learn43=learn;learn=function(){const r=_learn43.apply(this,arguments);try{
 if(!SORRY43&&SA35&&!fresh35()&&!localStorage.getItem("tol_sorry43")){SORRY43=1;setTimeout(()=>{if(view=="learn"&&!$("#scrim")&&!SS)sorry43();else SORRY43=0},300)}}catch(e){}return r};

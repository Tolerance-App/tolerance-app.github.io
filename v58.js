/* ===== v58 (2026-11-18): the equation solver is back =====
   Seth (after b57): the calculator should open with the question's equation loaded, and each equation in Eqns
   needs a button that takes it into the calculator. b55 had retired both (svOpen became a no-op).
   1. svOpen is restored as it was in index.html, so v46's auto-open works again: opening the tools on a
      calculation question loads its equation into the solver (once per question; closing it keeps it closed).
   2. Every equation card the solver can read gets "Use in calculator" next to "Graph it" and "Play with it".
      (v55's toolsBody wrapper still strips the old "Solve with this" buttons; this one has its own class.)
   Poke stays without a Solve button. */
try{FB.ver="b58"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["The calculator opens with the question’s equation ready to solve again.","Every equation in Eqns has “Use in calculator”."]})}catch(e){}

svOpen=function(f){const q=EQX[f];if(!q)return;CALC.sv={f,vals:{},want:null};CALC.mode=null;TT="calc";toolsBody();
 setTimeout(()=>{const i=$(".sv .slot input");if(i&&!kbOn())i.focus()},30)};
function eqCalc58(id){try{const f=EQR55[id];if(f)svOpen(f)}catch(e){}}
const _ei58=eqItem25;eqItem25=function(n,f,v){let h=_ei58.apply(this,arguments);try{if(EQX[f]){const id=EQR55.indexOf(f);
 if(id>=0&&h.indexOf("calc58")<0){const at=h.indexOf('<button type="button" class="graph57"')>=0?'<button type="button" class="graph57"':'<button type="button" class="play55"';
  h=h.replace(at,`<button type="button" class="calc58" onclick="eqCalc58(${id})">Use in calculator</button>`+at)}}}catch(e){}return h};

document.head.insertAdjacentHTML("beforeend",`<style>
.eq55 .calc58{margin:10px 8px 0 0;padding:6px 12px;border-radius:99px;border:1px solid var(--blue);color:#fff;background:var(--blue);font-size:12.5px;font-weight:800}
</style>`);

try{TF48.unshift(
 {b:"b58",k:"auto58",t:"Calculator opens with the equation",c:"Open the tools on this question: the solver shows the bearing-hours equation. Close it, reopen: stays closed.",go:["q","mech-machine-3",1,1]},
 {b:"b58",k:"use58",t:"Use in calculator",c:"Eqns: every solvable card has a blue \"Use in calculator\" button. Tap it: Calc opens with that equation in the solver.",go:["q","aero-aerodynamics-2",0,1]}
)}catch(e){}

/* ===== v62 (2026-11-18): one keypad for the solver, a visible cursor, paste replaces, grouped equation list =====
   Seth after b61 ("it's been a snowball, be careful"). Each change below is limited to the equation solver or the
   Eqns tab display; the lesson answer box keypad (KB.page "fill" on #ans) is untouched.
   1. Two keypad looks: svFocus (index.html) switched the pad to "fill", the answer-box pad (digits, −, k, M, ×10ⁿ,
      no arrows, no operators). Solver boxes now keep the calculator pad ("num"); "=" moves to the next box or
      solves (KB.onEnter, unchanged).
   2. Values: svNum was parseFloat, so "200k" read as 200 and "1/2" as 1 without a word. Plain numbers and v43's
      percent stay as they were; a k/M suffix multiplies; anything else is evaluated as arithmetic (miniEval), and
      if that fails the solver's existing "isn't a number" message shows.
   3. Cursor: every keypress redraws the solver (svSet → svDraw), which rebuilt the hidden box and v59 then put
      the cursor at the end, so ← → had no lasting effect. svDraw now carries the cursor position across the
      redraw, and the selected box shows a cursor mark where typing will go.
   4. Paste: a chip replaces the selected solver box's value (Seth: "it should wipe out the first one"). The
      calculator box still inserts at its cursor.
   5. Eqns: "All other equations" / "Browse by topic" is grouped (Math, Mechanics, …) and starts collapsed; Math
      has Calculus I–III, Differential equations and Linear algebra as subheadings. The equations shown for the
      current question are not touched. Banks are moved, not rebuilt, so their buttons keep working; a bank with no
      group mapping lands in "Other". */
try{FB.ver="b62"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["The equation solver uses the same keypad as the calculator, with a cursor you can move.","Solver boxes take arithmetic (200*2, 1/2) and 2k, 3M or 25%.","Pasting a number into a solver box replaces what was there.","The full equation list is grouped by subject and starts collapsed."]})}catch(e){}

/* ---- 2. values ---- */
const _svn62=svNum;svNum=function(s){const t=String(s??"").trim().replace(/,/g,"");
 if(!t)return null;
 if(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(t))return _svn62.apply(this,arguments);
 let m;if((m=/^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)\s*([kM])$/.exec(t)))return parseFloat(m[1])*(m[2]=="k"?1e3:1e6);
 try{const v=miniEval(t,{},true);return typeof v=="number"&&isFinite(v)?v:null}catch(e){return null}};

/* ---- 1. calculator pad in solver boxes ---- */
const _svf62=svFocus;svFocus=function(k){const r=_svf62.apply(this,arguments);try{if(KB.t=="sv"+k&&KB.page=="fill"){KB.page="num";const kb=$("#tbody .kb");if(kb)kb.outerHTML=kbHTML()}}catch(e){}return r};

/* ---- 3. cursor carried across redraws ---- */
let CAR62=null;/* {id, pos} of the selected solver box */
const _svd62=svDraw;svDraw=function(){let id=null,pos=null,had=false;try{id=/^sv\d+$/.test(KB.t||"")?KB.t:null;const el=id&&$("#"+id);if(el){pos=el.selectionStart??el.value.length;CAR62={id,pos};had=document.activeElement===el}}catch(e){}
 const r=_svd62.apply(this,arguments);
 try{const el=id&&$("#"+id);if(el&&pos!=null){if(had)el.focus({preventScroll:true});const p=Math.min(pos,el.value.length);el.setSelectionRange(p,p)}}catch(e){}return r};
/* v59's svSet put the cursor at the end after every redraw; svDraw now keeps it */
svSet=function(s,v){if(!CALC.sv)return;CALC.sv.vals[s]=v;CALC.sv.msg="";svDraw()};
/* ← and → don't redraw on their own; repaint so the cursor mark moves */
const _kb62=kbKey;kbKey=function(e,v){const r=_kb62.apply(this,arguments);try{if((v=="@l"||v=="@r")&&/^sv\d+$/.test(KB.t||"")&&CALC.sv)svDraw()}catch(x){}return r};
/* value text as TeX: numbers as before, anything typed (200*2, 1/2, sqrt() shown literally */
function valTex62(v){const s=String(v).replace(/,/g,"");let m;if((m=/^(-?[\d.]+)e([+-]?\d+)$/i.exec(s)))return m[1]+"\\times10^{"+(+m[2])+"}";
 return [...s].map(c=>/[0-9.]/.test(c)?c:c=="*"?"\\cdot ":c=="/"?"/":c=="+"?"+":c=="-"?"-":c=="("?"(":c==")"?")":c=="%"?"\\%":c=="^"?"\\hat{\\ }":/[A-Za-z]/.test(c)?"\\mathrm{"+c+"}":c=="e"?"e":"").join("")||"\\ "}
sv60Tex=function(q,t){const sv=CALC.sv,syms=svSyms(q),empty=syms.filter(s=>!(sv.vals[s]||"").trim()),want=empty.length==1?empty[0]:null,sel=/^sv\d+$/.test(KB.t||"")?+KB.t.slice(2):-1;
 const keyToSym={};q.rk.forEach((k,i)=>keyToSym[k]=q.r[i]);keyToSym[q.lk]=q.l;
 const slot=key=>{const s=keyToSym[key]||key,i=syms.indexOf(s);if(i<0)return texSym60(s);const v=(sv.vals[s]||"").trim(),st=texSym60(s);
  const cls="s60 s60-"+i+(i==sel?" s60sel":"")+(s==want?" s60w":"")+(v?" s60f":"");
  let body=st;if(v){const raw=sv.vals[s];let shown=valTex62(raw);
   if(i==sel&&CAR62&&CAR62.id=="sv"+i){const p=Math.max(0,Math.min(CAR62.pos,raw.length));shown=(p?valTex62(raw.slice(0,p)):"")+"\\htmlClass{c62}{\\vphantom{0}}"+(p<raw.length?valTex62(raw.slice(p)):"")}
   body="\\underset{\\scriptscriptstyle "+st+"}{"+shown+"}"}
  return "\\htmlClass{"+cls+"}{"+body+"}"};
 return slot(q.lk)+"="+math60Tex(t,slot)};
/* tapping the calculator or graph box takes the selection off the equation */
document.addEventListener("focusin",e=>{const id=e.target&&e.target.id;if(/^(cin|gexp|gx0|gx1)$/.test(id||""))document.querySelectorAll(".eq60 .s60sel").forEach(el=>el.classList.remove("s60sel"))});

/* ---- 4. paste replaces in solver boxes ---- */
const _qi62=qIns;qIns=function(v){try{const id=KB.t,el=id&&/^sv\d+$/.test(id)&&$("#"+id);
 if(el&&el.classList.contains("svin")){el.value=String(v);try{el.setSelectionRange(el.value.length,el.value.length)}catch(x){}el.dispatchEvent(new Event("input",{bubbles:true}));return}}catch(e){}
 return _qi62.apply(this,arguments)};

/* ---- 5. grouped equation list ---- */
const EQG62=[
 ["Math",["mathf","calc1-limits","calc1-continuity","calc1-derivative-rules","calc1-implicit","calc1-applications","calc1-integrals","calc2-integration","calc2-improper-numerical","calc2-applications","calc2-series","calc2-power-series","calc2-parametric-polar","calc3-geometry","calc3-partials","calc3-optimization","calc3-multiple-integrals","calc3-line-integrals","calc3-surface-theorems","diffeq-first-order","diffeq-second-order","diffeq-laplace","diffeq-systems","diffeq-numerical-series","diffeq-pde","linalg-matrices","linalg-spaces","linalg-determinants","linalg-eigenvalues","linalg-orthogonality","linalg-svd","linfit"]],
 ["Mechanics and structures",["stress","mohr","beams","vibration","civil","mat2"]],
 ["Machine design and manufacturing",["machine","machine2","gdt","tol2","cadx","feeds","cam2","molding","amx"]],
 ["Thermal and fluids",["thermo","heat","fluids","supersonic"]],
 ["Aerospace",["aero","stability","propulsion","space"]],
 ["Electrical and sensing",["circuits","circ2","sensors","sensing2","digital"]],
 ["Controls",["ctrlx","secord","routh","altctl"]],
 ["Optimization and computing",["optstep","kktpen","mlx","cs","bits","net"]]];
function eqGroup62(){const all=document.querySelector("#tbody details.eqall");if(!all||all.dataset.g62)return;all.dataset.g62=1;
 const byTitle={};Object.keys(EQB).forEach(k=>{byTitle[EQB[k].t]=k});
 const banks=[...all.querySelectorAll(":scope > details.eqbank")],found={};
 banks.forEach(d=>{const s=d.querySelector(":scope > summary");const t=s?(s.firstChild&&s.firstChild.nodeType==3?s.firstChild.textContent:s.textContent).trim():"";const k=byTitle[t];if(k)found[k]=d;else found["?"+t]=d});
 const used=new Set(),frag=document.createDocumentFragment();
 const grp=(name,keys)=>{const ds=keys.filter(k=>found[k]);if(!ds.length)return;const g=document.createElement("details");g.className="eqgrp62";
  const n=ds.reduce((a,k)=>a+(EQB[k]?EQB[k].e.length:0),0);g.innerHTML=`<summary>${esc(name)} <span>${n}</span></summary>`;let lastSub=null;
  ds.forEach(k=>{used.add(k);const d=found[k],t=EQB[k]?EQB[k].t:"",m=/^(.+?)\s+—\s+(.+)$/.exec(t);
   if(m){if(m[1]!==lastSub){lastSub=m[1];const p=document.createElement("p");p.className="eqsub62";p.textContent=m[1];g.appendChild(p)}
    const s=d.querySelector(":scope > summary");if(s&&s.firstChild&&s.firstChild.nodeType==3)s.firstChild.textContent=m[2]+" "}
   else lastSub=null;
   g.appendChild(d)});frag.appendChild(g)};
 EQG62.forEach(([name,keys])=>grp(name,keys));
 grp("Other",Object.keys(found).filter(k=>!used.has(k)));
 banks.forEach(d=>{if(d.parentNode===all)d.remove()});all.appendChild(frag)}
const _er62=eqRender25;eqRender25=function(){const r=_er62.apply(this,arguments);try{eqGroup62()}catch(e){}return r};

document.head.insertAdjacentHTML("beforeend",`<style>
.sv .eq60 .c62{border-left:2px solid var(--blue);margin:0 -1px;animation:c62 1s steps(1) infinite}
@keyframes c62{50%{border-left-color:transparent}}
details.eqgrp62{margin:0 0 6px;border:1px solid var(--line);border-radius:12px;background:var(--s1)}
details.eqgrp62>summary{padding:12px 14px;font-weight:800;font-size:15px;cursor:pointer;list-style-position:inside}
details.eqgrp62>summary span{color:var(--mu);font-weight:600;font-size:12.5px;margin-left:4px}
details.eqgrp62[open]>summary{border-bottom:1px solid var(--line)}
details.eqgrp62>details.eqbank{margin:0 10px}
details.eqgrp62>details.eqbank:last-child{margin-bottom:8px}
.eqsub62{margin:12px 14px 2px;font-size:11.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--mu)}
</style>`);

try{TF48.unshift(
 {b:"b62",k:"pad62",t:"One keypad in the solver",c:"Tap kb: the calculator keypad stays (with ← → and operators). Type 200, ← twice, type 5: it lands in the middle and the cursor mark shows where.",go:["q","mech-machine-4",0,1]},
 {b:"b62",k:"val62",t:"Solver takes 2k and 200*2",c:"Put 0.2k in kb and 4*200 in km: Solve gives Cj = 0.2.",go:["q","mech-machine-4",0,1]},
 {b:"b62",k:"paste62",t:"Paste replaces",c:"Tap kb, tap the 200 chip, then the 800 chip: kb shows 800, not 200800.",go:["q","mech-machine-4",0,1]},
 {b:"b62",k:"grp62",t:"Grouped equation list",c:"Eqns → All other equations: collapsed groups (Math, Mechanics…). Math has Calculus I–III subheadings. The question's own equations at the top are unchanged.",go:["q","mech-machine-4",0,1]}
)}catch(e){}

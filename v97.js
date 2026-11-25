/* ===== v97 (2026-11-25): chips paste their prefix; definitions stay when you go back; flag fixes =====
   1. CHIPS PASTE THE PREFIX (Seth: "when I paste a chip and its units are not ×1 like GPa, MPa, paste the units too").
      In the calculator a chip with a prefixed unit now pastes its SI value in e-notation: 200 GPa → 200e9,
      25 mm → 25e-3, 400 mm² → 400e-6, 15 kW → 15e3. A toast says what happened ("200 GPa → 200e9 Pa").
      ×1 units (N, Pa, m, kg/m³…) and everything else paste the plain number, as before.
      Problems this could create, and what handles each:
      a. The answer box wants MPa but the result is in Pa. When the result came from SI-pasted numbers and the answer
         unit is in U71 (MPa, kN, mm, ms…), the carried answer is converted back (1.63e8 → 163) with a toast.
         Results reused later (ans, a "Yours" chip, the kept result) stay marked as SI.
      b. Formulas written for mm (n = 1000·Vc/(π·D), Vc = π·D·n/1000, Lh = L10·10⁶/(60n)): converting D to metres
         would be off by 1000. No conversion when the question's equation holds a bare 1000 or 10⁶.
      c. Mixed units: QNUM reads "900 mm/min" as "900 mm", "1 kJ/(kg·K)" as "1 kJ", and skips "5 µm" or "3 min".
         Converting some numbers and not others would be wrong, so a question converts only if every prefixed unit in
         it is one U97 knows as a whole (qOk97). Also off: non-SI units (h, min, L, g, bar, in, psi…), a unit stated
         once for a list ("σx = 80, σy = 20, τxy = 40 MPa"), a number written as 8 × 10⁶, and, when there's no answer-unit field, a prefixed unit in
         the wording ("in MPa·m³/kg", "Use E in GPa") or in the choices (found by the b97 equation sweep).
      d. Answer units that can't be converted back (N/mm², mm³/min, µm, rpm…): no conversion for that question, so the
         answer box never gets a number in the wrong unit.
      e. Solver boxes: one with a known unit keeps v71's conversion into that unit. One with no known unit (most of
         them: δ = PL³/(3EI), σ = F/A…) now gets the SI value too, unless another box in the equation is in mm, MPa…
         or the formula holds a 1000. The solved value is SI and is carried into the answer box in the answer's unit.
         A solved value whose unit the solver knows (A in mm²) is carried in the answer's prefix too (cm²).
      f. imp68 turned 10e-3 into (10·e) − 3; fixed here (it hit typed negative exponents before this build too).
   2. DEFINITIONS STAY WHEN YOU GO BACK (Seth's b96 flag, Nov 22). b96 underlines each word once per lesson, and going
      back re-renders the card, by which time its words count as "already shown", so they came back plain. Each block
      now remembers which words it underlined and gets exactly those again when it is shown again.
   3. Flags: the stress definition no longer mentions stiletto heels; mfg-sheet-3 #2 (springback) reworded;
      mfg-additive-4 #3 drops "a faster build", which was half right; the piston demo's W label stays put. */
try{FB.ver="b97"}catch(e){}
try{NEWS.unshift({d:"2026-11-25",t:["Number chips with a prefix paste it too: tapping 200 GPa puts 200e9 in the calculator, 25 mm puts 25e-3. When the answer wants MPa, the result goes into the answer box in MPa.","Underlined words stay underlined when you go back a card.","Clearer springback and metal-printing questions."]})}catch(e){}

/* ---------- 1. chips paste the prefix ---------- */
const U97=Object.assign({},U71,{"kJ/kg":["J/kg",1e3]});
/* answer units whose number is already SI-coherent: the result needs no conversion */
const SIOK97=new Set(["","m/s","m/s²","kg","kg/m³","Hz","rad/s","rad","K","N/m","W/m²","J/kg","Pa·s","m³/s","kg/s","V","K/W","N·s","W/(m·K)"]);
function eqMm97(x){try{const q=x&&x.key&&QD30[x.key],L=q&&q[1]||[];
 return L.some(k=>{const e=EQX[k]&&EQX[k].e||k;return /(^|[^\w.])(1000|1e3|1e6|1000000)([^\w.]|$)/.test(e)})}catch(e){return false}}
/* the whole question must be convertible: every prefixed unit in it is one we know as a whole, so converted and
   plain numbers never mix ("12 kJ" with "cv = 1 kJ/(kg·K)", "900 mm/min", "5 µm" all switch it off) */
const UTOK97=/(?<![\p{L}\d.])\d[\d,]*(?:\.\d+)?\s?([kMGTmµμnpc][^\s,;:)?]*)/gu;
/* non-SI units with no prefix letter: hours, minutes, inches, litres, grams, bar, psi… (test sweep, b97) */
const NONSI97=/(?<![\p{L}\d.])\d[\d,]*(?:\.\d+)?\s?(h|hr|hours?|min|minutes?|in|inch(?:es)?|ft|lbf?|psi|L|g|bar|atm|days?|yr|years?|°F|KB|Kb|Kbps)(?![\p{L}\d])/u;
const pre97=u=>/^[kMGTmµμnpc]/.test(u)&&!SIOK97.has(u)&&!(U97[u]&&U97[u][1]==1);
const NOTU97=/^(and|or|to|by|of|at|in|on|for|from|per|is|are|was|x|×|times|with|then|so|each|a|an|the)$/;
const UW97=new Set(["rpm","bytes","bits","min","mol","bar","atm","psi","rad","deg"]);
/* a unit stated once for a list: "σx = 80, σy = 20, τxy = 40 MPa", "between 4 and 20 mA" */
function shared97(s){const re=/(?<![\p{L}\d.])[-−]?\d+(?:,\d{3})*(?:\.\d+)?/gu,N=[];let m;
 while((m=re.exec(s))){const end=m.index+m[0].length,t=/^\s?([^\s,;:)?(]+)/.exec(s.slice(end));let u=t?t[1].replace(/[.]+$/,""):"";
  if(u&&(NOTU97.test(u)||(/^[a-z]{3,}$/.test(u)&&!UW97.has(u))||!/^[\p{L}Ω°%µμ$]/u.test(u)))u="";
  N.push({a:m.index,e:end+(u?t[0].length:0),u})}
 for(let i=N.length-2;i>=0;i--){if(N[i].u)continue;const gap=s.slice(N[i].e,N[i+1].a);
  if(/^\s*(,|;|and|or|to|–|-|\/)\s*(?:(?:and\s+)?[^\s,=]{1,8}\s*=\s*)?$/.test(gap)){N[i].u=N[i+1].u;N[i].sh=1}}
 return N.some(n=>n.sh&&n.u&&pre97(n.u))}
function qOk97(q){try{const s=String(q||"").replace(/```[\s\S]*?```/g,"");let m;UTOK97.lastIndex=0;
 while((m=UTOK97.exec(s))){const u=m[1].replace(/[.]+$/,"");if(!U97[u]&&!SIOK97.has(u))return false}
 if(NONSI97.test(s))return false;if(shared97(s))return false;
 /* "I = 8 × 10⁶ mm⁴": the chips can't carry the power of ten, so that number would be typed in mm⁴ by hand */
 if(/\d\s?[×x·]\s?10\s?(?:[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]|\^)/.test(s))return false;return true}catch(e){return false}}
/* no answer-unit field to convert back into: the unit may still be in the wording ("in MPa·m³/kg", "Use E in GPa")
   or in the choices ("3 MPa"); then the result has to stay in the question's own units */
function wordOk97(x){try{const re=/\bin\s+([^\s,?;]+)/g;let m;const q=String(x.q||"");
 while((m=re.exec(q))){const u=m[1].replace(/[.:)]+$/,"");if(pre97(u))return false}
 const ch=[x.ans,...(x.wrong||[]),...(x.a&&Array.isArray(x.a)?x.a:[])].filter(v=>typeof v=="string").join(" ; ");
 UTOK97.lastIndex=0;while((m=UTOK97.exec(ch))){const u=m[1].replace(/[.]+$/,"");if(pre97(u))return false}return true}catch(e){return false}}
/* {v:"200e9", note} when a calculator paste should carry its prefix, else null */
function si97(v,u){try{if(!u||st.si97===false)return null;const f=U97[u];if(!f||f[1]==1)return null;
 const x=trayQ();if(x){if(eqMm97(x))return null;const au=x.t=="fill"&&typeof x.a=="number"?String(x.unit||"").trim():"";
  if(au){if(!SIOK97.has(au)&&!U97[au])return null}else if(!wordOk97(x))return null;
  if(!qOk97(x.q))return null}
 const p=Math.round(Math.log10(f[1]));if(Math.abs(Math.pow(10,p)-f[1])>f[1]*1e-9)return null;
 const s=String(v).replace(/,/g,"")+"e"+p;return {v:s,note:`${v} ${u} → ${s} ${f[0]}`}}catch(e){return null}}
function svIdx97(){const m=/^sv(\d+)$/.exec(KB.t||"");return m&&$("#"+KB.t)?+m[1]:-1}
/* a solver box with no known unit takes the SI value when nothing else in its equation is in mm, MPa…
   (boxes with a known unit keep v71's conversion into that unit) */
function svOk97(k){try{const f=CALC.sv&&CALC.sv.f,q=f&&EQX[f];if(!q||svUnit71(k))return false;
 if(/(^|[^\w.])(1000|1e3|1e6|1000000)([^\w.]|$)/.test(q.e||""))return false;
 return svSyms(q).every((s,i)=>{const u=svUnit71(i);return !u||SIOK97.has(u)||(U97[u]&&U97[u][1]==1)})}catch(e){return false}}
CALC.si97={k:"",t:new Set()};
function siSet97(){const k=CALC.trayK||"";if(CALC.si97.k!==k)CALC.si97={k,t:new Set()};return CALC.si97.t}
try{const _td97=trayDraw;trayDraw=function(){const r=_td97.apply(this,arguments);try{siSet97();
 document.querySelectorAll("#tray .qchip").forEach(c=>{if(c.dataset.c97||c.dataset.v==null)return;c.dataset.c97=1;const em=c.querySelector("em"),u=em?em.textContent.trim():"",prev=c.onclick;
  c.onclick=function(ev){
   if(c.classList.contains("res"))return prev?prev.call(this,ev):qIns(c.dataset.v);
   const k=svIdx97(),cv=(k<0||svOk97(k))&&si97(c.dataset.v,u);
   if(cv){siSet97().add(cv.v);qIns(cv.v);try{toast48(cv.note)}catch(e){}return}
   const r=prev?prev.call(this,ev):qIns(c.dataset.v);
   /* v71 converted it into a box whose unit is SI ×1 (N, Pa, m…): that value is SI too */
   /* only when the value really is in that unit: v71 converted it, or the chip was already in it (a 1 kHz chip pasted
      as 1 into a box in s is not) */
   try{if(k>=0){const U=svUnit71(k),el=$("#sv"+k),v=el&&el.value.trim();
    if(U&&v&&(SIOK97.has(U)||(U97[U]&&U97[U][1]==1))&&(u==U||(v!=c.dataset.v&&U97[u]&&U97[u][0]==U)))siSet97().add(v)}}catch(e){}
   return r}})}catch(e){}return r}}catch(e){}

/* imp68 (implicit multiplication) read a negative exponent as Euler's e: 10e-3 → (10*e)-3 = 24.2, and so did a
   typed 2.5e-6. Numbers in e-notation are now set aside before it runs and put back after. */
try{const _im97=imp68;imp68=function(s){const keep=[];
 const t=String(s).replace(/(^|[^\w.])((?:\d+\.?\d*|\.\d+)e[+-]?\d+)(?![\w.])/gi,(m,a,n)=>{keep.push(n);return a+"§"+(keep.length-1)+"§"});
 return _im97.call(this,t).replace(/§(\d+)§/g,(m,i)=>keep[+i])}}catch(e){}

/* results worked out from SI-pasted numbers are SI too */
try{const _cr97=calcRun;calcRun=function(){const i=$("#cin"),ex=i?i.value:"",T=siSet97();
 let si=false;try{si=[...T].some(t=>ex.includes(t))||(T.size&&/\bans\b/.test(ex)&&CALC.siLast97)}catch(e){}
 const before=CALC.hist[CALC.hist.length-1];CALC.siRun97=si;
 try{_cr97.apply(this,arguments)}finally{CALC.siRun97=false}
 try{const h=CALC.hist[CALC.hist.length-1];if(h&&h!==before&&!h.err){CALC.siLast97=si;if(si){const n=numOut(h.out);if(n){T.add(n.v);T.add(trayFmt(n.v))}T.add(String(h.out))}}}catch(e){}};}catch(e){}

/* the solver: an unknown worked out from SI-pasted boxes is SI too (unless its own unit is known) */
try{const _ss97=svSolve;svSolve=function(){let si=false;try{const sv=CALC.sv,q=sv&&EQX[sv.f],T=siSet97();if(q&&T.size){const syms=svSyms(q),
 vals=syms.map(s=>String(sv.vals[s]||"").trim()),e=vals.map((v,i)=>v?-1:i).filter(i=>i>=0);
 si=e.length==1&&!svUnit71(e[0])&&vals.some(v=>v&&T.has(v));}
  /* trust the solved value's labelled unit only when some box was filled from a converted chip */
  if(q&&T.size){const syms=svSyms(q),e=syms.map((s,i)=>String(sv.vals[s]||"").trim()?-1:i).filter(i=>i>=0);
   if(e.length==1&&syms.some(s=>T.has(String(sv.vals[s]||"").trim())))CALC.svU97=svUnit71(e[0])}}catch(e){}
 CALC.siRun97=si;try{return _ss97.apply(this,arguments)}finally{CALC.siRun97=false;CALC.svU97=null;
  if(si)try{const sv=CALC.sv,t=sv&&sv.msg&&/=\s*(\S+)$/.exec(sv.msg);if(t)siSet97().add(t[1])}catch(e){}}}}catch(e){}

/* carrying an SI result into an answer box that wants MPa, kN, mm… */
try{const _ac97=ansCarry;ansCarry=function(v){try{const x=trayQ();
 /* a solved value whose unit the solver knows (mm²) going into an answer in another prefix of it (cm²) */
 if(CALC.svU97&&x&&x.t=="fill"&&isFinite(+v)){const au=String(x.unit||"").trim(),a=U97[CALC.svU97],b=U97[au];
  if(a&&b&&a[0]==b[0]&&a[1]!=b[1]){const w=String(+(+v*a[1]/b[1]).toPrecision(6)),r=_ac97.call(this,w);if(r)try{toast48(`${v} ${CALC.svU97} → ${w} ${au} in the answer box`)}catch(e){}return r}}
 if(CALC.siRun97&&x&&x.t=="fill"){const au=String(x.unit||"").trim(),f=U97[au];
 if(f&&f[1]!=1&&isFinite(+v)){const w=String(+(+v/f[1]).toPrecision(6)),r=_ac97.call(this,w);if(r)try{toast48(`${v} ${f[0]} → ${w} ${au} in the answer box`)}catch(e){}return r}}}catch(e){}
 return _ac97.apply(this,arguments)}}catch(e){}

/* ---------- 2. definitions stay when you go back ---------- */
try{const _mk97=mark67;mark67=function(el,lid,x){
 const ses=SS||{};if(!ses.df96||ses.df96l!=lid){ses.df96=new Set();ses.df96l=lid}const seen=ses.df96,M=seen.m97||(seen.m97={});
 let k="";try{k=(el.matches(".prompt")?"p":el.matches(".why")?"w":"c")+"|"+el.textContent.replace(/\s+/g," ").trim()}catch(e){}
 const L=k&&M[k];
 if(L){if(!L.length)return;L.forEach(g=>seen.delete(g));const sv=list89;list89=()=>L.slice();
  try{return _mk97.call(this,el,lid,x)}finally{list89=sv;L.forEach(g=>seen.add(g))}}
 const r=_mk97.call(this,el,lid,x);
 try{if(k)M[k]=[...el.querySelectorAll(".df67")].map(s=>+s.dataset.g89).filter(n=>isFinite(n))}catch(e){}return r}}catch(e){}

/* ---------- 3. flags ---------- */
try{ALL89.forEach(g=>{if(/stiletto/i.test(g.l))g.l="Why a sharp knife slices with a light push and a butter knife just squashes."})}catch(e){}

function fix97(){
 const L=id=>LS.find(l=>l.id==id);
 const q=(id,i,start,patch)=>{try{const l=L(id),x=l&&l.qs[i];if(x&&String(x.q||"").startsWith(start))Object.assign(x,patch)}catch(e){}};
 q("mfg-sheet-3",2,"A bend made to 90° on the brake measures 92°",{
  q:"The brake bends a part to exactly 90°. After the punch lifts, the part springs back open to 92°. To finish the next part at 90°, how should it be bent?",
  ans:"To about 88°: overbend by 2°",wrong:["To about 92°: underbend by 2°","To 90° again, with a larger inside radius","To 90° again, in a thicker sheet"],
  why:"Springback opens the bend by about 2°, so bending 2° past the target (88°) lets it relax to 90°. Bending to 92° adds the springback the wrong way and ends near 94°. A larger radius increases springback, and changing the sheet isn’t a fix the operator makes at the brake."});
 q("mfg-additive-4",3,"A designer merges an 8-piece welded manifold",{
  wrong:["Lower material cost per kilogram","Higher strength than wrought metal in every direction","No need for any post-machining"],
  why:"Part consolidation removes welds and fittings, which are leak and failure points, and cuts assembly labor. Printed metal costs more per kilogram, is usually weaker across its layers than wrought metal, and still needs machining on sealing faces and threads. Build time can go either way, so it isn’t the main benefit."});
}
try{const _bu97=build;build=function(){const r=_bu97.apply(this,arguments);try{fix97()}catch(e){}return r}}catch(e){}

/* piston demo: the W label is pinned above the p–V plot, right-aligned to its edge, instead of riding the bar (Seth, b88 flag) */
function pis97(){try{const D=DEMOS.piston;if(!D||!D.pic85||D.pis97)return;const run=D.run;
 D.run=function(v){const r=run.apply(this,arguments);try{if(r&&r.svg)r.svg=String(r.svg).replace(/<text x="[^"]*" y="[^"]*" text-anchor="[^"]*"([^>]*>W = p·ΔV)/,'<text x="314" y="32" text-anchor="end"$1')}catch(e){}return r};D.pis97=1}catch(e){}}
pis97();try{const _bp97=build;build=function(){const r=_bp97.apply(this,arguments);pis97();return r}}catch(e){}

try{[
 {b:"b97",k:"si97",t:"Chips paste the prefix",c:"Tap the calculator line, then 1.5*, the 10 kN chip, /(, 50 mm, *, 100 mm, ) and =. The chips paste 10e3, 50e-3, 100e-3; the answer box gets 3 (MPa), not 3000000.",go:["q","mech-shear-2",0,1]},
 {b:"b97",k:"si97s",t:"Solver boxes get the prefix too",c:"Beam deflection solver: tap the E box, then the 200 GPa chip: 200e9. Fill P, L, I from chips, Solve: the answer box gets 0.15625 (mm).",go:["q","mech-beams-2",0,1]},
 {b:"b97",k:"e97",t:"Negative exponents in the calculator",c:"Type 10e-3 and =: it gives 0.01 (it used to read it as 10 × e − 3 = 24.2).",go:["field"]},
 {b:"b97",k:"si97b",t:"No prefix in mm formulas",c:"Spindle speed: the 12 mm chip pastes plain 12 (the formula wants mm).",go:["q","cam-feeds-1",0,1]},
 {b:"b97",k:"df97",t:"Definitions stay when you go back",c:"Go to card 2, then back to card 1: the underlined words are still underlined. Forward again: card 2 keeps its own.",go:["les","mech-beams-2"]},
 {b:"b97",k:"heel97",t:"Stress definition: no stilettos",c:"Tap “stress”: the everyday example is a sharp knife versus a butter knife.",go:["les","mech-beams-2"]},
 {b:"b97",k:"sheet97",t:"Springback question reworded",c:"Part springs open to 92°: the answer is to bend to about 88°.",go:["q","mfg-sheet-3",2]},
 {b:"b97",k:"am97",t:"Printed manifold: no half-right option",c:"“A faster build” is gone from the wrong answers.",go:["q","mfg-additive-4",3]},
 {b:"b97",k:"pis97",t:"Piston demo: W label stays put",c:"Move the pressure slider: the W = p·ΔV label stays above the plot.",go:["lab","mech-thermodynamics-2"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

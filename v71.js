/* ===== v71 (2026-11-19): control-lesson flags, calculator chips, poke, demos =====
   From Seth's flags (device ke1WMzstu…) on b70, plus the intro work written earlier today (section 9).
   1. Calculator "Given" chips lost the minus sign (−135° pasted as 135, so PM = 180 + φ gave 315), and pasted
      "10 ms" as 10 into a box that wants seconds (28 648° instead of 28.6°). qNums keeps a leading minus now, and
      a chip pasted into a solver box converts by prefix when the box's unit is known (ms → s, kHz → Hz, kN → N,
      mm → m …), with a short note saying so. Unknown or mismatched units paste as before.
   2. Number answers also accept the same value in the base unit or as a fraction: 0.0005 for "0.5 ms",
      0.1 for "10 %". Only plain numbers, same tolerance.
   3. "Work it out" shows on number questions that give only one number (ζ = 0.5) when the question has an
      equation mapped (QD30). It used to need two numbers.
   4. Poke: after opening, a small Hide button; the Poke button then stays lit and reopens the same hint with no
      further cost (SS.poked is already set). The "doesn't earn the Flawless bonus" line is gone.
   5. Demo status lines (Stable/Unstable, OK/Overstressed …) are tinted green or red. A few neutral ones
      (laminar/turbulent, which load case governs, diode state, mechanism) stay plain.
   6. Content (same indices, keys unchanged): ctrl-pid-4 #2 gives the sample period, ctrl-feedback-2 #1 restates
      τ, ctrl-exam-1 #2 asks one thing, ctrl-pid-2 #3 loses an arguable distractor, ctrl-pid-3 #3 gets a real
      poke, and two cards are reworded (anti-alias filters; the ∫ sign written out). Unit labels added to the
      delay, sample-rate and clock-period equations so chips convert into them.
   7. Demos: windup's anti-windup is an Off/On toggle instead of a 0–1 slider; the sample-rate demo marks the
      current fs/fc on the curve; the circular queue labels the tail as well as the head.
   8. Learn: once today's lesson is done, the big daily card shrinks to the friends row (Seth's choice).
   9. Intro (written earlier today as an unshipped v70): US "meter", 100 N as a 10 kg bag of rice, the bar as
      thick as a thumb, and a calmer reveal (lab top-aligned from the start, verdict, controls and Next ease in). */
try{FB.ver="b71"}catch(e){}
try{NEWS.unshift({d:"2026-11-19",t:["Calculator: numbers you tap from the question keep their minus sign, and 10 ms goes in as 0.01 s when the equation wants seconds.","Answers in base units count: 0.0005 for 0.5 ms, 0.1 for 10%.","Poke can be hidden and reopened.","Clearer questions in the Controls lessons, and status lines in demos are tinted green or red."]})}catch(e){}

/* ---- 6. content patches (guarded: only when the text is what we expect) ---- */
const L71=id=>{try{return BUNDLE.find(l=>l&&l.id==id)}catch(e){return null}};
function pq71(id,i,start,patch){try{const l=L71(id),q=l&&l.qs&&l.qs[i];if(q&&String(q.q||"").startsWith(start))Object.assign(q,patch)}catch(e){}}
function pc71(id,i,start,text){try{const l=L71(id);if(l&&typeof l.cards[i]=="string"&&l.cards[i].startsWith(start))l.cards[i]=text}catch(e){}}
pq71("ctrl-pid-4",2,"A loop crosses over at 100 rad/s and samples at 200 Hz.",{q:"A loop crosses over at 100 rad/s and samples at 200 Hz, a 5 ms sample period. How much phase does the hold’s half-sample delay cost there, in degrees?"});
pq71("ctrl-feedback-2",1,"Same system: what is",{q:"Same system, τ = 5 s: what is the approximate 2% settling time, in s?"});
pq71("ctrl-exam-1",2,"For unity feedback around K/[s(s+3)(s+7)]",{q:"For unity feedback around K/[s(s+3)(s+7)] with rates 3 and 7 s⁻¹, at what frequency does the loop oscillate at its marginal gain, in rad/s?"});
pq71("ctrl-pid-2",3,"What does derivative action add to a loop?",{wrong:["Zero steady-state error","Higher gain at low frequency","A push that keeps growing while any error remains"],why:"D responds to the rate of change, braking motion before it overshoots. Zero steady-state error and a push that grows while error remains are both integral action; higher low-frequency gain comes from P or I, not D."});
pq71("ctrl-pid-3",3,"A loop with 15° phase margin",{hint:"Phase margin works like damping: the less margin, the more the closed loop rings. 15° is well below the 45–60° target."});
pc71("ctrl-pid-4",2,"Why anti-alias filters:","Why anti-alias filters: after sampling, noise faster than half the sample rate looks exactly like a slower wobble, and the loop reacts to it. No filter after sampling can separate the two, so filter before sampling.");
pc71("ctrl-feedback-3",3,"Integral action adds Ki∫e dt","Integral action adds Ki × (the error added up over time). That running total keeps growing while any error remains, so it drives the steady-state error to zero for a constant setpoint.");
/* unit labels so chips can convert into these boxes */
try{const V71={"Td = Ts/2":"Td equivalent delay (s), Ts sample period (s)","fs = 20·fb":"fs sample rate (Hz), fb closed-loop bandwidth (Hz)","T = 1 / f":"T period (s), f frequency (Hz)"};
 Object.keys(EQB).forEach(k=>(EQB[k].e||[]).forEach(en=>{if(V71[en[1]]&&!/\(/.test(en[2]||""))en[2]=V71[en[1]]}))}catch(e){}

/* ---- 7. demos ---- */
try{const d=L71("ctrl-pid-1").demo;const i=d.sliders.findIndex(s=>s.k=="aw");
 if(i>=0){d.sliders.splice(i,1);d.choices=(d.choices||[]).concat([{k:"aw",label:"Anti-windup",options:[["0","Off"],["1","On"]],value:"0"}])}}catch(e){}
try{const d=L71("ctrl-pid-4").demo;if(d&&d.mark==null)d.mark="min(max(fs/fc,2),50)"}catch(e){}
try{const R=DEMOS.ring,run0=R.run;R.hint="Items leave at the head (the oldest) and join after the tail (the newest). The array is reused by wrapping indices with mod C, so the next free slot is (head + count) mod C, even after head has gone around the end.";
 R.run=function(v){const r=run0.apply(this,arguments);try{const C=v.C,h=v.h%C,n=Math.min(v.n,C);
  /* room above slot 0 and below the bottom slot, where head/tail labels used to run off the picture */
  r.svg=r.svg.replace('viewBox="0 0 300 196"','viewBox="0 -12 300 222"');if(n<1)return r;
  if(n==1){r.svg=r.svg.replace(">head</text>",">head = tail</text>");return r}
  const ti=(h+n-1)%C,a=-Math.PI/2+ti*2*Math.PI/C,cx=150,cy=96,R0=98;
  r.svg=r.svg.replace("</svg>",T(+(cx+R0*Math.cos(a)).toFixed(1),+(cy+R0*Math.sin(a)+4).toFixed(1),"tail","middle")+"</svg>")}catch(e){}return r}}catch(e){}

/* ---- 5. tinted demo status ---- */
const NEUT71=new Set(["x:civil-struct-4","x:mech-fluids-4","x:mech-fluids-re-1","x:cad-modeling-3","diode"]);
try{const _du71=demoU;demoU=function(p){const r=_du71.apply(this,arguments);try{const box=document.querySelector(`.demo[data-p="${p}"]`),D=box&&DEMOS[box.dataset.id],
 f=D&&D.spec&&D.spec.flag,e=document.getElementById(p+"o_fl");
 if(f&&e){const neut=NEUT71.has(box.dataset.id),t=e.textContent;e.classList.toggle("fbad71",!neut&&t==f[1]);e.classList.toggle("fok71",!neut&&t==f[2])}}catch(e){}return r}}catch(e){}

/* ---- 1. chips: minus sign, unit conversion into solver boxes ---- */
const _qn71=qNums;qNums=function(t){const base=_qn71.apply(this,arguments);try{
 const s=String(t||"").replace(/```[\s\S]*?```/g,""),neg=new Set();let m;const re=new RegExp(QNUM.source,"g");
 while((m=re.exec(s))){const i=m.index,c=s[i-1],c2=s[i-2];if((c=="−"||c=="-")&&(i<2||/[\s(=:,]/.test(c2)))neg.add(m[1].replace(/,/g,"")+"|"+(m[2]||""))}
 if(!neg.size)return base;
 return base.map(n=>neg.has(n.v+"|"+n.u)?{v:"-"+n.v,u:n.u}:n)}catch(e){return base}};
const U71={ms:["s",1e-3],s:["s",1],kHz:["Hz",1e3],Hz:["Hz",1],mm:["m",1e-3],cm:["m",.01],km:["m",1e3],m:["m",1],kN:["N",1e3],N:["N",1],
 kPa:["Pa",1e3],MPa:["Pa",1e6],GPa:["Pa",1e9],Pa:["Pa",1],"kN·m":["N·m",1e3],"N·m":["N·m",1],kW:["W",1e3],W:["W",1],kJ:["J",1e3],J:["J",1],
 mA:["A",1e-3],A:["A",1],"kΩ":["Ω",1e3],"Ω":["Ω",1],"mm²":["m²",1e-6],"cm²":["m²",1e-4],"m²":["m²",1],"mm³":["m³",1e-9],"cm³":["m³",1e-6],"m³":["m³",1],
 "mm⁴":["m⁴",1e-12],"m⁴":["m⁴",1]};
function svUnit71(k){try{const f=CALC.sv&&CALC.sv.f,q=f&&EQX[f],en=f&&EQIDX30[f];if(!q||!en||!en[2])return null;const sym=svSyms(q)[k];if(!sym)return null;
 const esc=sym.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),m=new RegExp("(?:^|,\\s*)"+esc+"\\s[^,]*\\(([^()]+)\\)\\s*(?=,|$)").exec(en[2]);return m?m[1].trim():null}catch(e){return null}}
function conv71(v,u){try{const id=KB.t,k=/^sv(\d+)$/.exec(id||"");if(!k||!u)return null;const U=svUnit71(+k[1]),a=U71[u],b=U&&U71[U];
 if(!a||!b||a[0]!=b[0]||a[1]==b[1])return null;const n=+v*a[1]/b[1];if(!isFinite(n))return null;return {v:String(+n.toPrecision(10)),note:`${v} ${u} → ${+n.toPrecision(6)} ${U}`}}catch(e){return null}}
try{const _td71=trayDraw;trayDraw=function(){const r=_td71.apply(this,arguments);try{
 document.querySelectorAll("#tray .qchip:not(.res)").forEach(c=>{if(c.dataset.c71||c.dataset.v==null)return;c.dataset.c71=1;const em=c.querySelector("em"),u=em?em.textContent.trim():"";
  c.onclick=()=>{const cv=conv71(c.dataset.v,u);if(cv){qIns(cv.v);try{toast48(cv.note)}catch(e){}}else qIns(c.dataset.v)}})}catch(e){}return r}}catch(e){}

/* ---- 2. base-unit and fraction answers ---- */
try{const _of71=okFill;okFill=function(x,v){const r=_of71.apply(this,arguments);if(r||!x||typeof x.a!="number")return r;try{
 const s=String(v).trim().replace(/,/g,"").replace(/−/g,"-");if(!/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(s))return r;const n=+s,tol=Math.max(x.tol??.05,1e-9),
 near=y=>Math.abs(y-x.a)<=Math.abs(x.a)*tol+1e-12;
 if(x.unit=="%")return near(n*100);const e=U71[x.unit];if(e&&e[1]!=1)return near(n/e[1])}catch(e){}return r}}catch(e){}

/* ---- 3. Work it out with one given number ---- */
try{const _sq71=showQ;showQ=function(){const r=_sq71.apply(this,arguments);try{const x=SS&&SS.qs&&SS.qs[SS.i];
 if(x&&view=="lesson"&&!$(".workbtn")&&x.t=="fill"&&typeof x.a=="number"&&x.key&&QD30[x.key]){const ns=qNums(x.q);
  if(ns.length==1&&isMathy(x)){const at=$("#poke")||$(".prompt");if(at)at.insertAdjacentHTML("afterend",`<button class="workbtn" onclick="tools('calc')">${IC.calc}<span>Work it out</span><small>${ns.map(n=>esc(n.v)+(n.u?" "+esc(n.u):"")).join("")}</small></button>`)}}}catch(e){}return r}}catch(e){}

/* ---- 4. poke: hide and reopen ---- */
try{const _pk71=poke;poke=function(){const r=_pk71.apply(this,arguments);try{const el=$("#poke"),box=el&&el.querySelector(".pokebox");if(!box||box.querySelector(".pkhide71"))return r;
 box.querySelectorAll("small").forEach(s=>{if(/Flawless/.test(s.textContent))s.remove()});
 box.insertAdjacentHTML("afterbegin",`<button class="pkhide71" onclick="pokeHide71()" aria-label="Hide the poke">Hide</button>`)}catch(e){}return r}}catch(e){}
function pokeHide71(){const el=$("#poke"),box=el&&el.querySelector(".pokebox");if(!box)return;box.hidden=true;
 if(!el.querySelector(".used71"))el.insertAdjacentHTML("beforeend",`<button class="pokebtn used71" onclick="pokeShow71()" aria-label="Show the poke again">${IC.spark||IC.star}<span>Poke</span></button>`)}
function pokeShow71(){const el=$("#poke"),box=el&&el.querySelector(".pokebox"),b=el&&el.querySelector(".used71");if(b)b.remove();if(box)box.hidden=false}

/* ---- 9. intro wording and a smoother reveal ---- */
const _wp71=wlPage;wlPage=function(){
 if(WL.p==0){view="welcome";bare(`<button class="wl wl-intro screen" onclick="wlGo(1)" aria-label="Start"><span class="wl-l1">A steel bar, one meter long and 20&nbsp;mm square, about as thick as your thumb.</span><span class="wl-l2">Hang 100&nbsp;N off the end: the weight of a 10&nbsp;kg bag of rice. How far does the tip drop?</span><span class="wl-tap">Tap anywhere</span></button>`);return}
 const r=_wp71.apply(this,arguments);
 try{const v=$("#wlverdict");if(v)v.innerHTML=v.innerHTML.replace(/metre/g,"meter");const a=$(".wl-ask69");if(a&&a.textContent)a.textContent="Your guess: 100 N (a 10 kg bag) on the thumb-thick bar:"}catch(e){}
 return r};
wlGuess69=function(i){if(WL.g!=null)return;WL.g=i;WL.F=100;WL.s="sq";
 document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{b.disabled=true;b.classList.add(j==i?"pick":"dim70")});
 const ask=$(".wl-ask69");if(ask)ask.classList.add("gone70");
 drop69(()=>{const ok=G69[i][1];
  document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{if(G69[j][1]){b.classList.remove("dim70");b.classList.add("ok")}else if(j==i)b.classList.add("no")});
  try{if(!ok&&typeof buzz=="function")buzz()}catch(e){}
  const v=$("#wlverdict");if(v){v.innerHTML=ok?`<b>Spot on: 12.5 mm.</b> Solid steel, and it still visibly sags over a meter.`:`<b>It drops 12.5 mm.</b> You said ${G69[i][0]}. Solid steel, and it still visibly sags over a meter.`;v.hidden=false}
  const r=$("#wlrest");if(r){r.hidden=false;wlDemoDraw()}
  const f=$(".wl-foot");if(f)f.innerHTML=`<button class="btn in70" onclick="wlGo(2)">Next</button>`})};

/* ---- test list for Seth ---- */
try{[
 {b:"b71",k:"wl71",t:"Intro wording and reveal",c:"Meter, 10 kg bag of rice, thumb-thick bar. After a guess the verdict, controls and Next ease in without the page jumping.",go:["intro"]},
 {b:"b71",k:"st71",t:"Daily card after today's lesson",c:"Learn, once today's lesson is done: only the friends row is left where the big card was.",go:["learn"]},
 {b:"b71",k:"rq71",t:"Circular queue tail label",c:"Head on the oldest item, tail on the newest; with one item it reads head = tail.",go:["lab","cs-data-structures-2"]},
 {b:"b71",k:"fl71",t:"Green/red status line",c:"Stable is green; push the delay up until Unstable turns red.",go:["lab","ctrl-pid-3"]},
 {b:"b71",k:"aw71",t:"Anti-windup toggle",c:"Anti-windup is an Off/On switch, not a slider.",go:["lab","ctrl-pid-1"]},
 {b:"b71",k:"sr71",t:"Sample-rate demo marker",c:"The dashed marker moves along the curve as you move either slider.",go:["lab","ctrl-pid-4"]},
 {b:"b71",k:"pk71",t:"Poke hide and reopen",c:"Open Poke: a real hint, no Flawless line, Hide top right. After hiding, Poke stays lit and reopens it.",go:["q","ctrl-pid-3",3]},
 {b:"b71",k:"wo71",t:"Work it out with one number",c:"The ζ = 0.5 question now has Work it out.",go:["q","ctrl-feedback-4",0]},
 {b:"b71",k:"cs71",t:"Delay chip converts ms",c:"Tap the 10 ms chip into T: it goes in as 0.01 with a note, and φd = 28.6.",go:["q","ctrl-pid-3",2,1]},
 {b:"b71",k:"mn71",t:"Minus sign on chips",c:"The chip reads −135, so PM comes out 45.",go:["q","ctrl-pid-3",0,1]},
 {b:"b71",k:"si71",t:"0.0005 accepted for 0.5 ms",c:"Type 0.0005: counts as right.",go:["q","ctrl-pid-4",0]},
 {b:"b71",k:"pc71",t:"0.1 accepted for 10%",c:"Type 0.1: counts as right.",go:["q","ctrl-feedback-3",0]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}
try{const _tg71=tfGo48;tfGo48=function(i){const it=TF48[i];if(it&&it.go&&it.go[0]=="learn"){try{closeSheet(true)}catch(e){}SS=null;home();return}return _tg71.apply(this,arguments)}}catch(e){}

document.head.insertAdjacentHTML("beforeend",`<style>
.fok71{color:color-mix(in srgb,var(--ok) 85%,var(--tx))!important;background:color-mix(in srgb,var(--ok) 12%,transparent);border-radius:6px;padding:0 6px}
.fbad71{color:color-mix(in srgb,var(--bad) 85%,var(--tx))!important;background:color-mix(in srgb,var(--bad) 12%,transparent);border-radius:6px;padding:0 6px}
#poke .pokebox{position:relative}
#poke .pokebox>b:first-of-type{padding-right:52px}
.pkhide71{position:absolute;top:8px;right:8px;padding:3px 9px;border-radius:8px;border:1px solid var(--line);background:var(--s1);color:var(--mu);font:600 12px Inter,sans-serif;cursor:pointer}
.pokebtn.used71{background:color-mix(in srgb,var(--orange) 22%,var(--s1));border-color:color-mix(in srgb,var(--orange) 60%,var(--line));color:var(--tx)}
.daily.ok>.dl-top,.daily.ok>.hb-card{display:none}
.daily.ok{padding-top:4px;padding-bottom:4px}
.wl-body:has(.wl69){justify-content:flex-start;gap:10px;padding-top:8px}
.wl-g69 button{transition:opacity .35s,border-color .35s,background .35s}
.wl-g69 button.dim70{opacity:.4}
.wl-ask69{transition:opacity .3s,max-height .4s,margin .4s;max-height:40px;overflow:hidden}.wl-ask69.gone70{opacity:0;max-height:0;margin:0!important}
@keyframes in70{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#wlverdict:not([hidden]){animation:in70 .45s ease-out both}
#wlrest:not([hidden]){animation:in70 .5s .25s ease-out both}
.wl-foot .in70{animation:in70 .4s .5s ease-out both}
@media (prefers-reduced-motion:reduce){#wlverdict,#wlrest,.wl-foot .in70{animation:none!important}}
</style>`);

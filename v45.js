/* ===== v45 (2026-11-17): second batch of tester flags =====
   1. Equations for the nine b40 exam lessons (Numerical methods, Controls). They shipped with "eqs": [],
      so the calculator had nothing to offer. Six new banks, each question mapped in QD30 (same pattern as
      v32 section 7). Every formula was checked against the lesson's own answers (noted beside each map).
   2. Ordering questions can accept more than one order: an "alt" list of index orders (indices into the
      authored "items"). numm-opt-1#4: the "if rejected" and "when accepted" steps are two branches of the
      same test, so either order is right.
   3. mech-vibration-resonance-1#0: the four options all began "The bracket mode has… / The motor…".
      Shorter, varied wording; same answer and same mistakes behind each wrong option.
   4. Phones held sideways show a "turn your phone upright" screen. iOS ignores the manifest's portrait
      lock, and a CSS orientation query would also fire when the on-screen keyboard shortens a portrait
      viewport, so this reads screen.orientation (or window.orientation) instead.
   5. The welcome sheet after moving progress to this site reads more plainly. */
try{FB.ver="b45"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["Numerical methods and the new Controls lessons now have their equations in the calculator.","Backtracking: the last two ordering steps are accepted either way round.","Natural frequency: less repetitive answer choices.","Turning your phone sideways shows a reminder to hold it upright."]})}catch(e){}

/* 1. equation banks for the b40 lessons */
try{
 EQB.optstep={t:"Optimization steps",e:[
  ["Directional slope with p = −∇f","s = −(g1² + g2²)","s directional slope ∇fᵀp, g1 first gradient component, g2 second gradient component"],
  ["Armijo threshold","fT = f0 + μ1·α·s","fT threshold the trial objective must not exceed, f0 objective at the base point, μ1 sufficient-decrease constant, α step size, s directional slope ∇fᵀp"],
  ["Backtracked step","αk = α0·ρ^k","αk step after k reductions, α0 starting step, ρ contraction factor, k number of reductions"],
  ["Gradient step on a·x²","xn = (1 − 2·a·α)·x","xn new coordinate, a curvature coefficient in a·x², α step size, x current coordinate"],
  ["Newton step for one separable coordinate","p = −gi/hi","p Newton step, gi gradient component, hi curvature (Hessian diagonal entry)"],
  ["Adam first step with bias correction","xn = x − aA·g/√(g²)","xn new coordinate, x current coordinate, aA Adam step size, g gradient component"]]};
 EQB.kktpen={t:"KKT and penalties",e:[
  ["Stationarity with one active constraint","σ = −fg/gg","σ multiplier, fg objective gradient component, gg constraint gradient component"],
  ["Penalty minimizer for f = (x − x0)², g = x + c","x = (2·x0 − μ·c)/(2 + μ)","x minimizer, x0 unconstrained minimum, μ penalty weight, c constant in g = x + c"],
  ["Augmented minimizer for f = (x − x0)², g = x + c","x = (2·x0 − μ·c − λ)/(2 + μ)","x minimizer, x0 unconstrained minimum, μ penalty weight, c constant in g = x + c, λ multiplier estimate"],
  ["Multiplier update (set to 0 if negative)","λn = λ + μ·g","λn new multiplier estimate, λ current estimate, μ penalty weight, g constraint value at the inner minimizer"]]};
 EQB.linfit={t:"Least squares",e:[
  ["Least-squares slope","a1 = (n·Sxy − Sx·Sy)/(n·Sxx − Sx²)","a1 slope, n number of points, Sxy sum of x·y, Sx sum of x, Sy sum of y, Sxx sum of x²"],
  ["Least-squares intercept","a0 = (Sy − a1·Sx)/n","a0 intercept, Sy sum of y, a1 slope, Sx sum of x, n number of points"],
  ["Coefficient of determination","r2 = 1 − Sr/St","r2 coefficient of determination, Sr residual sum of squares, St total sum of squares about the mean"],
  ["Root-mean-square error","RMSE = √(SSE/n)","RMSE root-mean-square error, SSE sum of squared errors, n number of points"]]};
 EQB.routh={t:"Routh stability",e:[
  ["Routh s¹ entry for s³ + a2·s² + a1·s + a0","b1 = (a2·a1 − a0)/a2","b1 first-column s¹ entry, a2 s² coefficient, a1 s coefficient, a0 constant term"],
  ["Gain limit for K/[s(s + a)(s + b)]","Kmax = a·b·(a + b)","Kmax marginal gain, a first pole rate (1/s), b second pole rate (1/s)"],
  ["Oscillation at the gain limit","ω = √(a·b)","ω oscillation frequency (rad/s), a first pole rate (1/s), b second pole rate (1/s)"]]};
 EQB.secord={t:"Second-order response",e:[
  ["Natural frequency of a PD axis","ωn = √(Kp/J)","ωn natural frequency (rad/s), Kp proportional gain (N·m/rad), J inertia (kg·m²)"],
  ["Damping ratio of a PD axis","ζ = Kd/(2·√(J·Kp))","ζ damping ratio, Kd rate gain (N·m·s/rad), J inertia (kg·m²), Kp proportional gain (N·m/rad)"],
  ["Percent overshoot","OS = 100·exp(−π·ζ/√(1 − ζ²))","OS percent overshoot, ζ damping ratio"],
  ["Minimum damping for overshoot M","ζ = −ln(M)/√(π² + ln(M)²)","ζ damping ratio, M overshoot as a fraction"],
  ["Damping ratio from poles −a ± bj","ζ = a/√(a² + b²)","ζ damping ratio, a magnitude of the real part (1/s), b imaginary part (rad/s)"],
  ["2% settling time","ts = 4/(ζ·ωn)","ts settling time (s), ζ damping ratio, ωn natural frequency (rad/s)"],
  ["Real part for a settling limit","σ = −4/ts","σ pole real part (1/s), ts settling time (s)"]]};
 EQB.altctl={t:"Altitude control",e:[
  ["PD offset under gravity","e = m·g/Kp","e steady-state error (m), m mass (kg), g gravity (m/s²), Kp proportional gain (N/m)"],
  ["Offset with mass mismatch in feedforward","e = (m − mh)·g/Kp","e steady-state error (m), m actual mass (kg), mh estimated mass (kg), g gravity (m/s²), Kp proportional gain (N/m)"],
  ["Integral gain limit for m·s³ + Kd·s² + Kp·s + Ki","Kimax = Kd·Kp/m","Kimax largest stable integral gain (N/(m·s)), Kd rate gain (N·s/m), Kp proportional gain (N/m), m mass (kg)"]]};
 const NEW45=["optstep","kktpen","linfit","routh","secord","altctl"];
 NEW45.forEach(k=>EQB[k].e.forEach(([n,f,d])=>{if(!EQX[f]){const q=eqParse25(n,f,d);if(q)EQX[f]=q;else EQBAD30.push(f)}}));
 NEW45.forEach(k=>EQB[k].e.forEach(en=>{if(!EQIDX30[en[1]]){EQIDX30[en[1]]=en;EQBK30[en[1]]=k}}));
 const E=k=>EQB[k].e.map(x=>x[1]),O=E("optstep"),K=E("kktpen"),R=E("linfit"),H=E("routh"),S=E("secord"),A=E("altctl");
 const qd=(id,i,eqs)=>{const l=bq32(id);if(l&&l.qs[i])QD30[id+"#"+i]=[QH30(l.qs[i].q),eqs]};
 const lb=(id,banks)=>{const l=bq32(id);if(l){if(!l.eqs||!l.eqs.length)l.eqs=banks;LB30[id]=banks}};
 qd("numm-opt-1",0,[O[0]]);               /* p1 = −∂f/∂x1 = −6·2 = −12 */
 qd("numm-opt-1",1,[O[0],O[1]]);          /* g = (12, −4), s = −160, fT = 14 + 0.02·0.08·(−160) = 13.744 */
 qd("numm-opt-1",2,[O[2],O[1]]);          /* α = 0.8 → 0.32 → 0.128, accepted at 0.128 */
 qd("numm-opt-2",0,[O[3]]);               /* (1 − 2·4·0.06)·1.5 = 0.78 */
 qd("numm-opt-2",1,[O[4]]);               /* g2 = 4·(1 + 3) = 16, h2 = 4, p2 = −4 */
 qd("numm-opt-2",2,[O[5]]);               /* −1.5 − 0.2·(−9)/9 = −1.3 */
 qd("numm-opt-3",0,[K[0]]);               /* fg = 2(−4 + 2) = −4, gg = 1, σ = 4 */
 qd("numm-opt-3",2,[K[0]]);               /* active at x1 = −2: σ = −2·2·(−3)/1 = 12 ≥ 0, f* = 2·9 = 18 */
 qd("numm-opt-4",0,[K[1]]);               /* (2 − 18)/8 = −2 */
 qd("numm-opt-4",1,[K[2],K[3]]);          /* x = (2 − 12 − 6)/6 = −2.667, g = 0.333, λn = 7.333 */
 qd("numm-opt-4",2,[K[0]]);               /* f′(−1) = 6(−3) = −18, gg = 1, λ = 18 */
 qd("numm-reg-1",0,[R[0],R[1]]);          /* (455 − 405)/(275 − 225) = 1 */
 qd("numm-reg-1",1,[R[2]]);               /* 1 − 3.6/24 = 0.85 */
 qd("numm-reg-1",2,[R[3]]);               /* predictions 1 and 7, errors ±1, √(2/2) = 1 */
 qd("ctrl-exam-1",0,[H[0]]);              /* (70 − 28)/7 = 6 */
 qd("ctrl-exam-1",1,[H[1]]);              /* 2·6·8 = 96 */
 qd("ctrl-exam-1",2,[H[2],H[1]]);         /* √21 = 4.583 rad/s */
 qd("ctrl-exam-2",0,[S[1],S[0]]);         /* 16/(2·√256) = 0.5 */
 qd("ctrl-exam-2",1,[S[1],S[2]]);         /* ζ = 12/(2·12) = 0.5, OS = 16.3% */
 qd("ctrl-exam-2",2,[S[5],S[1],S[0]]);    /* ζ = 0.4, ωn = 2, ts = 4/0.8 = 5 s */
 qd("ctrl-exam-3",0,[A[0]]);              /* 1.8·9.81/45 = 0.3924 m */
 qd("ctrl-exam-3",1,[A[1]]);              /* 0.3·9.81/50 = 0.05886 m */
 qd("ctrl-exam-3",2,[A[2]]);              /* 7.5·36/1.5 = 180 */
 qd("ctrl-exam-4",0,[S[3]]);              /* M = 0.15 → ζ = 0.5169 */
 qd("ctrl-exam-4",1,[S[6]]);              /* −4/1.6 = −2.5 */
 qd("ctrl-exam-4",2,[S[4],S[2]]);         /* ζ = 4/√20 = 0.8944, OS = 0.1867% */
 lb("numm-opt-1",["optstep"]);lb("numm-opt-2",["optstep"]);lb("numm-opt-3",["kktpen"]);lb("numm-opt-4",["kktpen"]);
 lb("numm-reg-1",["linfit"]);lb("ctrl-exam-1",["routh"]);lb("ctrl-exam-2",["secord"]);lb("ctrl-exam-3",["altctl","routh"]);lb("ctrl-exam-4",["secord"]);
 BANK_OF["Line search and descent"]=["optstep"];BANK_OF["Constrained optimization"]=["kktpen"];BANK_OF["Regression"]=["linfit"];
}catch(e){}

/* 2. ordering questions with more than one right order */
try{const l=bq32("numm-opt-1"),q=l&&l.qs[4];if(q&&q.t=="order"&&/^Order backtracking/.test(q.q)&&!q.alt)q.alt=[[0,1,2,4,3]]}catch(e){}
const _doCheck45=doCheck;doCheck=function(){try{const x=SS&&SS.qs&&SS.qs[SS.i];
 if(x&&x.t=="order"&&x.it&&Array.isArray(SS.ord)&&SS.ord.length==x.it.length){
  const src=x.key&&QX[x.key]&&QX[x.key].q,alt=(x.alt||(src&&src.alt)||[]);
  const now=SS.ord.map(c=>x.it[c].k);
  if(alt.some(a=>a.length==now.length&&a.every((v,i)=>v==now[i])))SS.ord.forEach((c,i)=>{x.it[c].k=i});
 }}catch(e){}return _doCheck45.apply(this,arguments)};

/* 3. resonance answer wording */
try{patchQ32("mech-vibration-resonance-1",0,"“The bracket wants to shake at 30 cycles per second",{t:"say",
 q:"“The bracket wants to shake at 30 cycles per second, even though the motor turns at a different rate.”",
 ans:"30 Hz is the bracket’s natural frequency.",
 wrong:["The motor forces the bracket at 30 Hz.","The bracket’s damping is 30 Hz.","30 Hz is the motor’s critical speed."],
 why:"Natural frequency belongs to the bracket’s mode. “The motor forces it at 30 Hz” confuses it with the excitation, which the speaker says is different. Damping isn’t measured in hertz. A critical speed belongs to the rotating shaft, not the bracket."})}catch(e){}

/* 4. hold the phone upright */
try{const s=document.createElement("style");s.id="v45css";s.textContent=
 `#up45{display:none}html.side45 #up45{display:grid;position:fixed;inset:0;z-index:100000;background:var(--bg);color:var(--tx);place-items:center;text-align:center;padding:24px}
#up45 b{display:block;font-size:18px;margin-bottom:6px}#up45 small{color:var(--mu);font-size:14px}`;
 document.head.appendChild(s);
 const d=document.createElement("div");d.id="up45";d.setAttribute("role","status");d.innerHTML="<div><b>Turn your phone upright</b><small>Tolerance is laid out for portrait.</small></div>";document.body.appendChild(d);
 const side=()=>{try{const phone=matchMedia("(pointer:coarse)").matches&&Math.min(screen.width,screen.height)<560;
   const t=screen.orientation&&screen.orientation.type,land=t?/^landscape/.test(t):(typeof window.orientation=="number"&&Math.abs(window.orientation)==90);
   document.documentElement.classList.toggle("side45",!!(phone&&land))}catch(e){}};
 side();if(screen.orientation&&screen.orientation.addEventListener)screen.orientation.addEventListener("change",side);window.addEventListener("orientationchange",side);window.addEventListener("resize",side);
}catch(e){}

/* 5. plainer welcome after a move */
const _sheet45=sheet;sheet=function(h){try{if(typeof h=="string"&&h.includes("Your progress came with you"))
 h=h.replace("Your progress came with you","Your progress is here").replace(/<p class="body">(\d+) lesson(s?) and (\d+) XP are here\. From now on it’s backed up automatically, and new versions won’t erase it\.<\/p>/,
  (m,n,s,xp)=>`<p class="body">We brought over ${n} lesson${s} and ${xp} XP. It’s backed up automatically from now on, and new versions won’t erase it.</p>`);
 }catch(e){}return _sheet45.apply(this,[h].concat([].slice.call(arguments,1)))};

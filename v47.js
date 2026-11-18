/* ===== v47 (2026-11-17): the rest of the open tester flags =====
   1. Penalty / augmented Lagrangian model (cmAugLag): the math was right, but it read as broken. The vertical
      range grew to ~230 at large μ and flattened everything; λ̄ did nothing in penalty mode with no sign of it;
      the infeasible side wasn't marked; the blue curve dipping below f in AL mode wasn't explained.
      Now: infeasible side shaded, range follows the minimum, λ̄ dimmed in penalty mode (DIM43), a readout
      shows λ̄ after 3 multiplier updates (λk = 2 − (2 − λ̄)(2/(2 + μ))^k for this problem), hint explains the dip.
   2. Dark strip under a sheet when the keyboard is up: that strip is the page canvas. An earlier layer
      already paints <html> --s1 (checked in b47 testing), so this was most likely fixed by b38; the rule
      below is a backstop that keeps the canvas --s1 whenever a sheet is open.
   3. Practice screen: each option was a card plus a separate full-width button. Now one tappable row each,
      more space between them; unavailable ones dimmed.
   4. New Lab model "Gradient descent on other landscapes" (cmShapes, Computational Methods set, right after
      cmPaths): round bowl, narrow valley, banana (Rosenbrock, b = 10) and two basins.
   5. Chip thinning and stickout (cam-feeds-4): cards rewritten step by step with terms defined. Questions
      unchanged (keys and equation maps stay valid).
   6. Bolted joint stiffness (mech-machine-4): new picture model. Two plates and a bolt, the load arrows, the
      gap opening at separation, bars for bolt tension and clamp force, and the original load-sharing graph.
   7. Intro bending lab: a "See it at real size" toggle (closed by default, to keep the first run calm) opens a view of the bar tip moving, drawn at the phone's physical scale
      (estimated: ~5.5 CSS px per mm on phones, CSS mm elsewhere).
   8. New lesson "Reynolds number: laminar or turbulent" (mech-fluids-re-1, Level 2, Fluid mechanics) with a
      model, 7 questions and equation maps. Every number re-derived (noted beside each question). */
try{FB.ver="b47"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["New lesson: Reynolds number, laminar or turbulent.","Bolted joint lesson: a new model with the plates, bolt and gap.","Chip thinning lesson rewritten to be clearer.","New Lab model: gradient descent on four landscapes.","Penalty model: clearer scale, shaded infeasible side, and the multiplier after three updates.","Practice screen: roomier, one tap per option.","Intro bending lab: see the bar tip move at real size."]})}catch(e){}

/* 1. cmAugLag */
try{const d=XD39.find(z=>z.id=="cmAugLag");if(d&&!d.v47){d.v47=1;const S=d.spec;
 S.defs=S.defs.map(([k,e])=>k=="hi"?["hi","max(11,fv+12)"]:[k,e]);
 S.layers.unshift({t:"poly",pts:[[-2,"lo"],[1,"lo"],[1,"hi"],[-2,"hi"]],fill:"bad",c:"bad",op:0.07,close:true});
 S.readouts=S.readouts.map(r=>/^Distance/.test(r.label)?{label:"λ̄ after 3 updates",f:"2-(2-ll)*(2/(2+mu))^3",unit:"",d:4,nan:"undefined"}:r);
 S.hint+=" Red side: infeasible (g > 0). In augmented Lagrangian mode the blue curve can sit below f on the feasible side, because λ̄·g is negative there; only where its minimum sits matters. Repeating the update drives λ̄ toward 2.";
 delete DEMOS.cmAugLag;reg17("cmAugLag",S)}
 DIM43.cmAugLag={lb:[v=>+v.md==1,"augmented Lagrangian only"]}}catch(e){}

/* 2 + 3 + 7 styles */
try{const s=document.createElement("style");s.id="v47css";s.textContent=
 `html:has(#scrim .sheet){background:var(--s1)}
.pad .block.p47{margin:0 0 14px}
.prow47{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px;border-radius:18px;background:var(--s1);border:1px solid var(--line);color:var(--tx)}
.prow47 .grow{flex:1;min-width:0}.prow47 b{display:block;font-size:16px}.prow47 small{display:block;color:var(--mu);font-size:13.5px;margin-top:2px;line-height:1.35}
.prow47 .go47{color:var(--fa);display:grid}.prow47 .go47 svg{width:18px;height:18px}
.prow47.hot47{border-color:color-mix(in srgb,var(--orange) 55%,var(--line))}.prow47.hot47 .go47{color:var(--orange)}
.prow47:disabled{opacity:.5}
.real47{margin:12px 0 0;padding:10px 12px;border-radius:14px;background:var(--s2);border:1px solid var(--line)}
.real47t{display:block;margin:8px auto 0;padding:6px 12px;border-radius:99px;background:var(--s2);border:1px solid var(--line);color:var(--mu);font-size:13px;font-weight:700}
.real47 p{margin:0 0 6px;font-size:12.5px;color:var(--mu)}.real47 svg{display:block;max-width:100%}`;
 document.head.appendChild(s)}catch(e){}

/* 3. practice rows */
const _pr47=practice;practice=function(){const r=_pr47.apply(this,arguments);try{
 document.querySelectorAll(".pad .block").forEach(b=>{if(b.classList.contains("p47"))return;
  const c=b.querySelector(":scope > .pcard"),btn=b.querySelector(":scope > .btn");if(!c||!btn||b.children.length!=2)return;
  const row=document.createElement("button");row.className="prow47"+(btn.classList.contains("orange")&&!btn.disabled?" hot47":"");
  row.setAttribute("onclick",btn.getAttribute("onclick")||"");if(btn.disabled)row.disabled=true;
  const pic=c.querySelector(".pic"),txt=c.querySelector(":scope > span:not(.pic)");
  if(pic)row.appendChild(pic);if(txt){txt.classList.add("grow");row.appendChild(txt)}
  row.setAttribute("aria-label",(txt?txt.querySelector("b")?.textContent+": ":"")+btn.textContent.trim());
  if(!btn.disabled)row.insertAdjacentHTML("beforeend",`<span class="go47">${IC.chevR}</span>`);
  b.innerHTML="";b.appendChild(row);b.classList.add("p47")});
}catch(e){}return r};

/* 4. cmShapes */
try{if(!XD39.some(z=>z.id=="cmShapes")){
 const W="w0*(x^2+y^2)+w1*(x^2+10*y^2)+w2*((1-x)^2+10*(y-x^2)^2)+w3*((x^2-1)^2+y^2)";
 const GX="w0*2*x+w1*2*x+w2*(-2*(1-x)-40*x*(y-x^2))+w3*4*x*(x^2-1)",GY="w0*2*y+w1*20*y+w2*20*(y-x^2)+w3*2*y";
 const at=(e,a,b)=>e.replace(/x/g,"(XX)").replace(/y/g,"(YY)").replace(/XX/g,a).replace(/YY/g,b);
 const spec={lessons:[],title:"Gradient descent on four landscapes",
  hint:"Plain gradient descent, x ← x − α∇f, from the orange start. Round bowl (f = x² + y²): straight in for any α < 1. Narrow valley (x² + 10y²): it zigzags across the valley and blows up for α ≥ 0.1. Banana (Rosenbrock with b = 10): it drops into the curved valley fast, then crawls along it to (1, 1); α above about 0.02 blows up near the minimum. Two basins ((x² − 1)² + y²): the start decides which minimum you reach.",
  sliders:[{k:"al",label:"Step α",min:0.002,max:0.3,step:0.002,value:0.016,unit:""},{k:"x0",label:"Start x",min:-2,max:2,step:0.05,value:-1.5,unit:""},{k:"y0",label:"Start y",min:-1.5,max:2,step:0.05,value:1.5,unit:""},{k:"N",label:"Steps",min:5,max:300,step:5,value:100,unit:""}],
  choices:[{k:"md",label:"Landscape",opts:[[0,"round bowl"],[1,"narrow valley"],[2,"banana"],[3,"two basins"]],value:0}],
  defs:[["w0","max(0,1-abs(md))"],["w1","max(0,1-abs(md-1))"],["w2","max(0,1-abs(md-2))"],["w3","max(0,1-abs(md-3))"],
   ["f0",at(W,"x0","y0")],["gx0",at(GX,"x0","y0")],["gy0",at(GY,"x0","y0")]],
  view:[-2.2,2.2,-1.6,2.2],eq:true,axes:true,xl:"x",yl:"y",h:260,
  layers:[{t:"contour",f:W,levels:[0.05,0.25,1,2.5,5,10,20],c:"fa",w:1},
   {t:"iter",map:["x-al*("+GX+")","y-al*("+GY+")"],x0:"x0",y0:"y0",N:"N",c:"blue",w:2},
   {t:"pt",x:0,y:0,c:"ok",r:4,when:"w0+w1"},{t:"pt",x:1,y:1,c:"ok",r:4,when:"w2"},{t:"pt",x:1,y:0,c:"ok",r:4,when:"w3"},{t:"pt",x:-1,y:0,c:"ok",r:4,when:"w3"},
   {t:"pt",x:"x0",y:"y0",c:"orange",r:4}],
  readouts:[{label:"f at start",f:"f0",unit:"",d:4,nan:"undefined"},{label:"Gradient size at start",f:"sqrt(gx0^2+gy0^2)",unit:"",d:4,nan:"undefined"}],
  note:"blue: GD path · green: minimum"};
 const i=XD39.findIndex(z=>z.id=="cmPaths");
 XD39.splice(i<0?XD39.length:i+1,0,{id:"cmShapes",course:"Computational Methods",suggestedLesson:"Gradient descent on other landscapes",spec});
 reg17("cmShapes",spec)}}catch(e){}

/* 5. chip thinning cards */
try{const l=bq32("cam-feeds-4");if(l&&/^Light radial cuts/.test(l.cards[0]))l.cards=[
 "Two terms first. Radial engagement ae is how far the cutter steps sideways into the material; D is the cutter diameter. ae/D = 0.5 means half the cutter is in the cut; ae/D = 0.1 means a tenth.",
 "Chip load fz is how far the cutter moves forward per tooth (mm per tooth). When ae/D is 0.5 or more, each tooth’s chip reaches that full thickness at its thickest point.",
 "In a light side cut, each tooth only skims its arc: it leaves the material before it reaches the thick part of the chip. So its thickest chip, hex, is smaller than fz. That is radial chip thinning.",
 "For r = ae/D at or below 0.5: hex = fz × 2√(r(1 − r)). At r = 0.5 the factor is 1, so hex = fz. At r = 0.1 the factor is 2√(0.1 × 0.9) = 0.6, so hex = 0.6 fz. (Model: a round cutter, feed per tooth small compared with D.)",
 "Why it matters: cutting edges are slightly rounded. A chip thinner than that rounding is smeared instead of cut, which makes heat, rubbing, flank wear and a poor finish. The fix is to raise the programmed feed: fz = target hex ÷ 2√(r(1 − r)).",
 "Stickout L is how far the tool hangs out of the holder. Treated as a cantilever with the same tip force, deflection ∝ L³/d⁴ for tool diameter d. So 50% more stickout gives 1.5³ ≈ 3.4 times the deflection, and a 10 mm tool is (10/6)⁴ ≈ 7.7 times stiffer than a 6 mm one at the same stickout."]}catch(e){}

/* 6. bolted joint picture model */
try{DEMOS.bolt47={t:"Load sharing in a bolted joint",
 hint:"Pull the plates apart with P. Until they separate, the bolt only picks up the share C = kb/(kb + km); the rest of P just relieves the clamp force between the plates. Once the clamp force reaches zero the plates open and the bolt carries all of P. Stiffer members keep C small.",
 ui:()=>slider("kb","Bolt stiffness kb (kN/mm)",50,1000,10,200)+slider("km","Member stiffness km (kN/mm)",50,3000,50,800)+slider("Fi","Preload Fi (kN)",5,50,1,20)+slider("P","External load P (kN)",0,60,1,10),
 ro:()=>rof([["Joint constant C","c"],["Bolt tension","b"],["Clamp force left","m"],["Separation load","s"]]),
 run(v){const C=v.kb/(v.kb+v.km),Ps=v.Fi/(1-C),sep=v.P>=Ps,Fb=sep?v.P:v.Fi+C*v.P,Fm=sep?0:v.Fi-(1-C)*v.P;
  const T=(x,y,s,a="middle",c="var(--mu)",w=600,fs=10.5)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" font-weight="${w}" style="fill:${c}">${s}</text>`;
  const gap=sep?Math.min(10,2+(v.P-Ps)/6):0,cx=70,yT=34,th=26,yI=yT+th;let g="";
  /* plates */
  g+=`<rect x="14" y="${yT-gap/2}" width="112" height="${th}" rx="3" fill="var(--s3)" stroke="var(--line)"/>`+`<rect x="14" y="${yI+gap/2}" width="112" height="${th}" rx="3" fill="var(--s3)" stroke="var(--line)"/>`;
  /* clamp force at the interface */
  const cf=Fm/Math.max(v.Fi,1e-9);if(!sep)g+=`<rect x="${cx-34}" y="${yI-2}" width="68" height="4" rx="2" fill="var(--blue)" opacity="${(.15+.85*cf).toFixed(2)}"/>`;
  /* bolt */
  const bt=Math.min(1,Fb/60);g+=`<rect x="${cx-6}" y="${yT-gap/2-8}" width="12" height="${2*th+gap+16}" rx="2" fill="color-mix(in srgb,var(--orange) ${Math.round(25+65*bt)}%,var(--s2))"/>`+
   `<rect x="${cx-16}" y="${yT-gap/2-16}" width="32" height="9" rx="2" fill="var(--orange)"/><rect x="${cx-14}" y="${yI+th+gap/2+7}" width="28" height="9" rx="2" fill="var(--orange)"/>`;
  /* external load arrows */
  if(v.P>0){const L=Math.min(22,6+v.P/3);[[30,yT-gap/2,-1],[110,yT-gap/2,-1],[30,yI+th+gap/2,1],[110,yI+th+gap/2,1]].forEach(([x,y,s])=>{const y2=y+s*L;g+=`<line x1="${x}" y1="${y}" x2="${x}" y2="${y2}" stroke="var(--tx)" stroke-width="2"/><path d="M${x-4} ${y2-s*5}L${x} ${y2}L${x+4} ${y2-s*5}" fill="none" stroke="var(--tx)" stroke-width="2"/>`});g+=T(cx,14,"P = "+v.P+" kN","middle","var(--tx)")}

  /* bars */
  const bx=150,bw=136,mx=Math.max(60,Fb,v.Fi)*1.05,bar=(y,lab,val,col)=>T(bx,y,lab,"start")+`<rect x="${bx}" y="${y+4}" width="${bw}" height="9" rx="4.5" fill="var(--s3)"/><rect x="${bx}" y="${y+4}" width="${(bw*Math.max(0,val)/mx).toFixed(1)}" height="9" rx="4.5" fill="${col}"/>`+T(bx+bw,y,val.toFixed(1)+" kN","end","var(--tx)");
  g+=bar(22,"Bolt tension",Fb,"var(--orange)")+bar(50,"Clamp force",Fm,"var(--blue)");
  if(sep)g+=T(bx,82,"bolt carries all of P","start","var(--mu)",500,9.5);
  else g+=T(bx,82,`P splits: ${(C*v.P).toFixed(1)} kN into the bolt,`,"start","var(--mu)",500,9.5)+T(bx,94,`${((1-C)*v.P).toFixed(1)} kN off the clamp force`,"start","var(--mu)",500,9.5);
  g+=T(bx,110,sep?"plates have opened":"plates clamped","start",sep?"var(--bad)":"var(--mu)",700,10);
  /* graph of both forces against P */
  const gx=20,gy=124,gw=266,gh=70,X=p=>gx+gw*p/60,Y=f=>gy+gh-gh*Math.min(1,f/mx);let pb="",pm="";
  for(let k=0;k<=60;k++){const s2=k>=Ps,b=s2?k:v.Fi+C*k,m=s2?0:v.Fi-(1-C)*k;pb+=(k?"L":"M")+X(k).toFixed(1)+" "+Y(b).toFixed(1);pm+=(k?"L":"M")+X(k).toFixed(1)+" "+Y(m).toFixed(1)}
  g+=`<line x1="${gx}" y1="${gy+gh}" x2="${gx+gw}" y2="${gy+gh}" stroke="var(--line)"/><line x1="${gx}" y1="${gy}" x2="${gx}" y2="${gy+gh}" stroke="var(--line)"/>`+
   (Ps<=60?`<line x1="${X(Ps)}" y1="${gy}" x2="${X(Ps)}" y2="${gy+gh}" stroke="var(--fa)" stroke-dasharray="3 3"/>`:"")+
   `<path d="${pb}" fill="none" stroke="var(--orange)" stroke-width="2"/><path d="${pm}" fill="none" stroke="var(--blue)" stroke-width="2"/>`+
   `<line x1="${X(v.P)}" y1="${gy}" x2="${X(v.P)}" y2="${gy+gh}" stroke="var(--tx)" stroke-width="1.2"/>`+
   T(gx+gw,gy+gh+12,"external load P (kN), 0–60","end")+T(gx+4,gy+8,"force","start");
  return {svg:`<svg viewBox="0 0 300 210" role="img" aria-label="Bolted joint: plates, bolt, force bars and load-sharing graph">${g}</svg>`,
   lab:{kb:v.kb+"",km:v.km+"",Fi:v.Fi+"",P:v.P+""},
   out:{c:C.toFixed(3),b:sig(Fb)+" kN",m:sig(Fm)+" kN",s:sig(Ps)+" kN"}}}};
 DEMO_OVR["mech-machine-4"]="bolt47"}catch(e){}

/* 7. bending bar at real size */
function pxmm47(){try{if(matchMedia("(pointer:coarse)").matches){const s=Math.min(screen.width,screen.height);return s<600?5.5:4.6}}catch(e){}return 96/25.4}
const _wl47=wlBeam;wlBeam=function(){const h=_wl47.apply(this,arguments);try{
 const L=1,E=200e9,I=Math.pow(WL.h,4)/12*1e-12,dm=WL.F*L*L*L/(3*E*I)*1000,k=pxmm47(),sec=WL.h;
 const H=(sec+dm)*k+24;if(!(dm>=0))return h;
 const tg=`<button class="real47t" onclick="WL.real=!WL.real;wlDemoDraw()" aria-expanded="${!!WL.real}">${WL.real?"Hide real size":"See it at real size"}</button>`;
 if(!WL.real)return h+tg;
 if(H>460)return h+tg+`<div class="real47"><p>${dm.toFixed(1)} mm is too far to draw at real size on this screen.</p></div>`;
 const W=300,x1=W-46,x0=x1-130,y0=12,d=dm*k,s=sec*k;let g="";
 g+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${s}" fill="none" stroke="var(--fa)" stroke-dasharray="4 3"/>`;
 g+=`<rect x="${x0}" y="${y0+d}" width="${x1-x0}" height="${s}" rx="1.5" fill="color-mix(in srgb,var(--blue) 35%,transparent)" stroke="var(--blue)" stroke-width="1.5"/>`;
 if(d>3){g+=`<line x1="${x1+12}" y1="${y0}" x2="${x1+12}" y2="${y0+d}" stroke="var(--orange)" stroke-width="2"/>`;
  for(let mm=0;mm<=dm+1e-9;mm++){const yy=y0+mm*k,big=mm%5==0;g+=`<line x1="${x1+12}" y1="${yy.toFixed(1)}" x2="${x1+12+(big?8:4)}" y2="${yy.toFixed(1)}" stroke="var(--mu)" stroke-width="1"/>`}}
 g+=`<text x="${x0-8}" y="${y0+s/2+4}" text-anchor="end" font-size="11" style="fill:var(--mu)">rest</text><text x="${x0-8}" y="${y0+d+s/2+4}" text-anchor="end" font-size="11" font-weight="700" style="fill:var(--blue)">loaded</text>`;
 return h+tg+`<div class="real47"><p>Bar tip at real size (about; depends on your screen): ${sec}×${sec} mm bar, moving ${dm<10?dm.toFixed(2):dm.toFixed(1)} mm.</p><svg width="${W}" height="${Math.ceil(H)}" viewBox="0 0 ${W} ${Math.ceil(H)}" aria-hidden="true">${g}</svg></div>`;
}catch(e){return h}};

/* 8. Reynolds lesson */
try{if(typeof BUNDLE!="undefined"&&!bq32("mech-fluids-re-1")){const RE="Re = ρVD / μ",bk=EQBK30[RE];
 BUNDLE.push({id:"mech-fluids-re-1",sub:"mech",subName:"Mechanical",field:"Mechanical",section:"Thermal and fluids",branch:"Fluid mechanics",lv:2,
  title:"Reynolds number: laminar or turbulent",req:[],plain:"One number tells you whether a flow slides smoothly or churns.",
  cards:[
   "Reynolds number compares inertia (a fluid’s tendency to keep moving) with viscosity (its internal friction): Re = ρVD/μ = VD/ν. ρ is density (kg/m³), V mean velocity (m/s), D pipe diameter (m), μ dynamic viscosity (Pa·s) and ν = μ/ρ kinematic viscosity (m²/s). Re has no units.",
   "For a straight, smooth, round pipe away from the entrance: below about 2300 the flow is laminar (smooth layers); above about 4000 it is usually turbulent (chaotic eddies); in between it is transitional. These are typical values: disturbances can trip turbulence earlier, and very quiet flows can stay laminar longer.",
   "Why it matters: laminar pipe friction follows f = 64/Re, while turbulent friction depends on Re and wall roughness and is higher at the same Re. Mixing and heat transfer also jump in turbulent flow. Engineers check Re first to pick the right correlation.",
   "Example: water at 20 °C (ν ≈ 1.0×10⁻⁶ m²/s) at 1 m/s in a 20 mm pipe gives Re = 1 × 0.020 / 1.0×10⁻⁶ = 20,000, which is turbulent. Many everyday water and air flows are turbulent.",
   "Scaling: at a fixed flow rate Q, V = 4Q/(πD²), so Re = 4ρQ/(πμD). The same flow in a bigger pipe has a lower Re. Other shapes use a characteristic length instead of D (plate length, wing chord, hydraulic diameter), with their own thresholds."],
  eqs:bk?[bk]:[],
  demo:{title:"Reynolds number and flow regime",hint:"Re grows with speed and size and falls with viscosity. Air (ν ≈ 15 mm²/s) needs about 15 times the speed of water (ν ≈ 1 mm²/s) for the same Re in the same pipe. Thresholds are for smooth round pipes.",
   sliders:[{k:"V",label:"Mean velocity V",min:0.01,max:3,step:0.01,value:0.5,unit:"m/s"},{k:"D",label:"Pipe diameter D",min:5,max:100,step:1,value:25,unit:"mm"},{k:"nu",label:"Kinematic viscosity ν",min:0.5,max:200,step:0.5,value:1,unit:"mm²/s"}],
   x:{label:"mean velocity V (m/s)",min:0.01,max:3},curves:[{label:"Reynolds number",f:"x*1000*D/nu"}],
   refs:[{label:"2300: laminar limit",y:"2300"},{label:"4000: turbulent",y:"4000"}],mark:"V",ylog:true,
   readouts:[{label:"Reynolds number",f:"V*1000*D/nu"},{label:"Velocity at Re = 2300",f:"2300*nu/(1000*D)",unit:"m/s"}],
   flag:{f:"V*1000*D/nu-2300",yes:"Above 2300: not laminar",no:"Laminar (below 2300)"}},
  qs:[
   /* 1000 × 0.50 × 0.025 / 0.0010 = 12,500 */
   {t:"fill",q:"Water (ρ = 1000 kg/m³, μ = 0.0010 Pa·s) flows at 0.50 m/s in a 25 mm pipe. What is the Reynolds number?",a:12500,tol:0.01,hint:"Re = ρVD/μ, with D in metres.",why:"Re = ρVD/μ = 1000 × 0.50 × 0.025 / 0.0010 = 12,500. Leaving D as 25 instead of 0.025 m gives 12.5 million."},
   {t:"mc",q:"A smooth round pipe flow has Re = 12,500. Which regime is it in?",ans:"Turbulent: well above about 4000",wrong:["Laminar, because 0.5 m/s is a slow flow","Transitional, because it is below 40,000","It can’t be judged without the pipe length"],why:"Above about 4000 a pipe flow is usually turbulent. Speed alone doesn’t decide it; Re combines speed, size and viscosity. The transitional band is about 2300–4000, not up to 40,000. Pipe length matters for pressure drop, not for Re."},
   /* V = 2300 × 0.0010 / (1000 × 0.010) = 0.23 m/s */
   {t:"fill",q:"Water (ρ = 1000 kg/m³, μ = 0.0010 Pa·s) flows in a 10 mm tube. Taking Re = 2300 as the laminar limit, what is the highest laminar velocity, in m/s?",a:0.23,tol:0.01,unit:"m/s",hint:"Rearrange Re = ρVD/μ for V.",why:"V = Re·μ/(ρD) = 2300 × 0.0010 / (1000 × 0.010) = 0.23 m/s. Using D = 10 instead of 0.010 m gives 0.00023 m/s."},
   /* 1.20 × 10.0 × 0.200 / 1.80e-5 = 133,333 */
   {t:"fill",q:"Air (ρ = 1.20 kg/m³, μ = 1.80×10⁻⁵ Pa·s) flows at 10.0 m/s along a flat plate 0.200 m long. What is the Reynolds number based on that length?",a:133333,tol:0.01,hint:"Same formula, with the plate length as the characteristic length.",why:"Re = ρVL/μ = 1.20 × 10.0 × 0.200 / 1.80×10⁻⁵ ≈ 1.33×10⁵. Along a flat plate, transition is usually quoted near 5×10⁵, so the 2300 pipe value doesn’t apply here."},
   {t:"mc",q:"The same volume flow rate is sent through a pipe with twice the diameter. What happens to Re?",ans:"It halves",wrong:["It doubles","It stays the same","It drops to a quarter"],why:"V = 4Q/(πD²) drops to a quarter while D doubles, so Re ∝ VD halves. “Doubles” forgets that V falls; “a quarter” tracks V but forgets D in Re; “stays the same” treats Re as a fluid property."},
   /* 2×0.05/1e-6 = 100,000; 5×0.1/1.5e-5 = 33,333; 0.1×0.02/1e-6 = 2,000; 1×0.05/1e-4 = 500 */
   {t:"order",q:"Rank these flows by Reynolds number, highest first. Water has ν = 1.0×10⁻⁶ m²/s.",items:["Water at 2 m/s in a 50 mm pipe","Air (ν = 1.5×10⁻⁵ m²/s) at 5 m/s in a 100 mm duct","Water at 0.1 m/s in a 20 mm tube","Oil (ν = 1.0×10⁻⁴ m²/s) at 1 m/s in a 50 mm pipe"],why:"Re = VD/ν gives 100,000, about 33,300, 2,000 and 500. Air’s ν is 15 times water’s, so it needs more speed or size to match; the oil is laminar."},
   {t:"decode",who:"Process engineer",q:"“At that flow the line is running transitional, so don’t trust the friction factor to better than a factor of two.”",ans:"Re is between about 2300 and 4000, where the flow switches between laminar and turbulent and friction is uncertain",wrong:["The flow is speeding up as it moves along the pipe","The liquid is starting to boil into gas","The pipe is changing diameter partway along"],why:"Transitional means the Re band between laminar and turbulent, where the flow flips unpredictably and neither friction correlation fits well. Speeding up, boiling and a diameter change are different effects."}]});
 const l=bq32("mech-fluids-re-1");[0,2,3].forEach(i=>QD30["mech-fluids-re-1#"+i]=[QH30(l.qs[i].q),[RE]]);if(bk)LB30["mech-fluids-re-1"]=[bk];
}}catch(e){}

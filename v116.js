/* ===== v116 (2026-11-27): flag fixes, content (ML errors first, brake-force graph, springback metals card,
   two sheet-metal pictures, metal-support figure, easier beam lesson) =====
   1. ml-learning-1. Seth on #1 (MSE of [3,5,7] vs [2,5,10]): "split this into two questions. Have us find e1,2,3
      first then apply the [mean squared error] equation." Positions are permanent, so #1 now asks for the errors
      (e = ŷ − y: 1, 0, −3) and a new #5 at the end takes those errors to the MSE (10/3 = 3.33). Card 1 names e.
   2. mfg-sheet-4#1 (thickness doubles, same die). Seth: "Plot the equation in the graph for this question. Use the
      [numbers] from the last question and note where the last t is on the graph." Question figure: F(t) at
      L = 1000 mm, UTS = 400 MPa, V = 16 mm fixed, so F = 1.33·1000·t²·400/16 N = 33.25 t² kN. t = 2 mm → 133 kN
      (#0's answer), t = 4 mm → 532 kN (×4). The figure shows the curve and both points, so it hints at the answer;
      that's what Seth asked for.
   3. mfg-sheet-3. Seth on #4 (rank by springback): "add a lesson card to teach us materials first." New card 4 (cards
      aren't keyed): S_y/E for the four metals in #4, same numbers as its why (500/70 ≈ 7.1, 1000/200 = 5.0,
      250/200 ≈ 1.3, 70/117 ≈ 0.6, MPa per GPa). Seth: "Another boring demo": a picture of the bent part replaces
      the line plot (same sliders and readouts): dashed V = bent under the punch (target − springback), blue V =
      after release (the target), orange arc = springback.
   4. mfg-sheet-2. Seth: "Boring demo." Picture of the bend replaces the line plot (same sliders and readouts):
      sheet with inside radius R and thickness t, dashed neutral axis at R + K·t, the bend allowance drawn as the
      orange neutral-axis arc, angle θ.
   5. mfg-additive-4 card 1 figure. Seth: "Confusing visual." The dashed bulge above the part read as nothing. Two
      panels now: with supports (held flat, heat runs down the supports into the plate) and without (edges curl up).
   6. mech-beams-2. Seth: "This whole lesson is too hard. Make it easier." Cards 0–3, 6, 7 become reveal cards in
      short pieces (4 and 5 already were); #2–#5 keep their answers and keys but get plainer wording. Numbers:
      rod I = π·20⁴/64 = 7,854 mm⁴; tube I = π(25⁴ − 15⁴)/64 = 16,690 mm⁴; ratio 2.125; both areas 314.2 mm². #4: b 40,
      h 20 → I 26,667, δ = 100·500³/(3·200,000·26,667) = 0.7813 mm, σ = 50,000·10/26,667 = 18.75 MPa; on edge I 106,667,
      δ 0.1953, σ 9.375; 2× width δ 0.3906, σ 9.375; 2× E δ 0.3906, σ 18.75. */
try{FB.ver="b116"}catch(e){}

/* ---------- 1. ml-learning-1: errors first, then MSE ---------- */
try{const l=bq32("ml-learning-1");if(l&&l.qs.length==5){
 l.qs.push({t:"fill",q:"Predictions [3, 5, 7] against targets [2, 5, 10] give errors e = ŷ − y of 1, 0 and −3. What is the mean squared error?",a:3.333,tol:.02,
  why:"Square each error: 1, 0, 9. Their mean is 10 / 3 ≈ 3.33. Averaging the errors first (−2/3) and then squaring loses the big miss: square first, then average."});
 if(typeof l.cards[1]=="string")l.cards[1]="The loss measures how wrong predictions are. Each error is e = ŷ − y. Mean squared error is the average of e². Training means finding the w and b that minimize it."}}catch(e){}
qfix("ml-learning-1",1,/^Predictions \[3, 5, 7\] against targets \[2, 5, 10\]\. What is the mean squared error/,q=>{
 Object.assign(q,{t:"mc",q:"Predictions ŷ = [3, 5, 7] against targets y = [2, 5, 10]. What are the errors e = ŷ − y?",ans:"1, 0, −3",
  wrong:["1, 0, 3","−1, 0, 3","5, 10, 17"],
  why:"e₁ = 3 − 2 = 1, e₂ = 5 − 5 = 0, e₃ = 7 − 10 = −3. Dropping the sign of −3 gives 1, 0, 3. Subtracting the other way (y − ŷ) gives −1, 0, 3. Adding instead of subtracting gives 5, 10, 17."});
 delete q.a;delete q.tol;delete q.unit});

/* ---------- 2. mfg-sheet-4#1: force against thickness ---------- */
try{qfig17("mfg-sheet-4#1","Same sheet as the last question (L = 1000 mm, UTS = 400 MPa) and the same die, V = 16 mm. F = 1.33·L·t²·UTS / V grows with t².",
 {view:[0,5,0,700],xl:"thickness t (mm)",yl:"F (kN)",h:190,layers:[
  {t:"fn",f:"33.25*x^2",c:"blue",w:2},
  Ln(2,0,2,133,"mu",1,"3 3"),Ln(4,0,4,532,"mu",1,"3 3"),
  {t:"pt",x:2,y:133,c:"tx",r:5},{t:"pt",x:4,y:532,c:"orange",r:5},
  Tx(1.85,175,"t = 2 mm: 133 kN","end"),Tx(3.85,560,"t = 4 mm: ?","end")]})}catch(e){}

/* ---------- 3. mfg-sheet-3: metals card ---------- */
try{const l=bq32("mfg-sheet-3");if(l&&l.cards.length==4)l.cards.push("For the same R/t, springback grows with yield strength over modulus, Sy/E. Typical values: 7075-T6 aluminum 500 MPa / 70 GPa ≈ 7.1. Spring steel about 1000 / 200 = 5.0 (harder grades go higher). Mild steel 250 / 200 = 1.25. Annealed copper: 70 / 117 ≈ 0.6. Strong but flexible metals spring back most.")}catch(e){}
/* Formula → value rows style, Guess. Ratios in MPa per GPa: 500/70 = 7.14, 1000/200 = 5.00, 250/200 = 1.25, 70/117 = 0.598 */
rc98("mfg-sheet-3",4,{p:[
 {t:"p",x:"Same bend, same $R/t$: springback grows with yield strength over modulus, $S_y/E$."},
 {t:"tbl",head:["Typical metal","$S_y$ / E","Ratio"],rows:[["7075-T6 Al","500 / 70","7.1"],["Spring steel","1000 / 200","5.0"],["Mild steel","250 / 200","1.25"],["Soft copper","70 / 117","0.6"]],hi:[0,2]},
 {t:"p",x:"$S_y$ in MPa, E in GPa. A harder spring steel (1500 MPa) would top the list."},
 {t:"take",x:"High-strength aluminum springs back far more than mild steel or copper: high $S_y$ and a low E."}],
 g:{at:1,q:"Mild steel or 7075 aluminum: which springs back more?",o:[
  ["7075 aluminum",1,"It's about twice as strong as mild steel and has about a third of the modulus, so S_y/E is over 5× larger."],
  ["Mild steel",0,"Steel is stiffer (E ≈ 200 GPa vs 70) and mild steel yields early (≈ 250 MPa), so its S_y/E is small."]]}});

qfix("mfg-sheet-3",4,/^Rank these by springback for the same R\/t/,q=>{q.why="Typical values, ranked by Sy/E (MPa per GPa): 7075-T6 aluminum 500/70 ≈ 7.1, spring steel about 1000/200 = 5.0, mild steel 250/200 = 1.25, annealed copper 70/117 ≈ 0.6. A harder spring steel (1500 MPa and up) would rank first."});

/* ---------- 3b/4. sheet-metal pictures ---------- */
const A116=(x1,y1,x2,y2,c,w)=>H85.a(x1,y1,x2,y2,c,w);
/* mfg-sheet-2: bend allowance picture. Sheet turns through θ around a centre; inside radius R, thickness t. */
pic85("mfg-sheet-2",v=>{const {t,svg}=H85,th=+v.th*Math.PI/180,R=+v.R,T=+v.t,K=+v.K,s=Math.min(14,56/(R+T)),cx=168,cy=112,F=92,
 pt=(r,f)=>[cx+r*s*Math.sin(f),cy+r*s*Math.cos(f)],fx=(r)=>[cx-F,cy+r*s],
 path=(r)=>{const a=fx(r),b=pt(r,0),N=24,P=[a,b];for(let i=1;i<=N;i++)P.push(pt(r,th*i/N));const e=P[P.length-1];P.push([e[0]+F*Math.cos(th),e[1]-F*Math.sin(th)]);return P},
 d=P=>"M"+P.map(q=>q[0].toFixed(1)+" "+q[1].toFixed(1)).join("L");
 const In=path(R),Out=path(R+T),Ne=path(R+K*T),ba=th*(R+K*T);let g="";
 g+=`<path d="${d(In)}L${d(Out.slice().reverse()).slice(1)}Z" fill="color-mix(in srgb,var(--blue) 18%,transparent)" stroke="var(--blue)" stroke-width="1.6"/>`;
 g+=`<path d="${d(Ne)}" stroke="var(--mu)" stroke-width="1.2" stroke-dasharray="4 3" fill="none"/>`;
 /* bend allowance: the neutral-axis arc */
 const arc=[];for(let i=0;i<=24;i++)arc.push(pt(R+K*T,th*i/24));g+=`<path d="${d(arc)}" stroke="var(--orange)" stroke-width="3.4" fill="none"/>`;
 /* centre, radius and angle */
 g+=`<circle cx="${cx}" cy="${cy}" r="2.5" fill="var(--mu)" stroke="none"/>`;
 const rm=pt(R,th/2);g+=H85.l(cx,cy,rm[0],rm[1],"var(--mu)",1);
 const ra=Math.min(18,R*s*.55);if(ra>7){const A=[];for(let i=0;i<=12;i++)A.push([cx+ra*Math.sin(th*i/12),cy+ra*Math.cos(th*i/12)]);g+=`<path d="${d(A)}" stroke="var(--tx)" stroke-width="1" fill="none"/>`}
 /* labels: allowance outside the bend, R beside its line, θ and the neutral axis on the first flange */
 const lr=(R+T)*s+12,lx=cx+lr*Math.sin(th/2),ly=cy+lr*Math.cos(th/2)+4,la=Math.sin(th/2)>.35?"start":"middle";
 g+=t(Math.min(lx,250),Math.min(Math.max(ly,40),190),"BA "+(ba<10?ba.toFixed(2):ba.toFixed(1))+" mm",la,"var(--orange)");
 g+=t(cx-F+4,cy+(R+T)*s+15,"neutral axis, K·t from inside","start","var(--mu)");
 g+=t(8,14,"R "+H85.n(R,1)+" mm · t "+H85.n(T,1)+" mm · θ "+Math.round(+v.th)+"°","start","var(--tx)");
 return svg(196,g)});
/* mfg-sheet-3: springback picture. Included angles: bent under the punch to a − sb, springs open to the target a. */
pic85("mfg-sheet-3",v=>{const {t,l,svg}=H85,a=+v.a,sb=a*Math.min(.9,3*+v.Sy/(+v.E*1000)*(+v.Rt+.5)),b=a-sb,X=160,Y=172,L=110;let g="";
 const V=(ang,c,w,da)=>{const h=ang/2*Math.PI/180,dx=L*Math.sin(h),dy=L*Math.cos(h);return `<path d="M${(X-dx).toFixed(1)} ${(Y-dy).toFixed(1)}L${X} ${Y}L${(X+dx).toFixed(1)} ${(Y-dy).toFixed(1)}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linejoin="round"${da?` stroke-dasharray="${da}"`:""}/>`};
 g+=V(b,"var(--mu)",2,"5 4")+V(a,"var(--blue)",3.4);
 /* springback arc on the right flange, between the two */
 const rA=L*.78,A=[];for(let i=0;i<=12;i++){const h=(b+(a-b)*i/12)/2*Math.PI/180;A.push([X+rA*Math.sin(h),Y-rA*Math.cos(h)])}
 g+=`<path d="M${A.map(q=>q[0].toFixed(1)+" "+q[1].toFixed(1)).join("L")}" stroke="var(--orange)" stroke-width="2.4" fill="none"/>`;
 /* key strip at the top */
 g+=l(10,12,30,12,"var(--mu)",2,"5 4")+t(36,16,"under the punch: "+H85.n(b,1)+"°","start","var(--mu)");
 g+=l(10,30,30,30,"var(--blue)",3.4)+t(36,34,"after release: "+Math.round(a)+"° (the target)","start","var(--blue)");
 g+=t(X,Y+20,"springback "+H85.n(sb,1)+"°: bend past the target by that much","middle","var(--orange)");
 return svg(196,g)});

/* ---------- 5. mfg-additive-4 card 1 figure: with and without supports ---------- */
try{const f=LFIG17["mfg-additive-4"];if(f){f._svg=null;f.cap="Supports pin a metal part to the plate against residual stress and carry heat (red arrows) down into it. Without them the edges curl up as the layers cool.";
 const cur=[];for(let i=0;i<=16;i++){const x=6.9+4.2*i/16,u=(x-9)/2.1;cur.push([x,1.05+.75*u*u])}
 f.spec={view:[0,12,0,6],eq:true,axes:false,h:170,layers:[
  /* with supports */
  {t:"poly",pts:[[.3,.4],[5.7,.4],[5.7,1],[.3,1]],fill:true,c:"fa",op:.5},
  ...[1,1.8,2.6,3.4,4.2,5].map(x=>Ln(x,1,x,2.6,"mu",1.2)),
  {t:"poly",pts:[[.8,2.6],[5.2,2.6],[5.2,3.5],[.8,3.5]],fill:true,c:"orange",op:.35},
  A17(2.2,3.2,2.2,1.25,"","bad",1.6),A17(3.8,3.2,3.8,1.25,"","bad",1.6),
  Tx(3,4.75,"with supports: held flat","middle"),
  /* without */
  {t:"poly",pts:[[6.3,.4],[11.7,.4],[11.7,1],[6.3,1]],fill:true,c:"fa",op:.5},
  {t:"poly",pts:[...cur,...cur.slice().reverse().map(([x,y])=>[x,y+.9])],fill:true,c:"orange",op:.35},
  A17(7.05,3.15,6.9,3.95,"","orange",1.6),A17(10.95,3.15,11.1,3.95,"","orange",1.6),
  Tx(9,4.75,"no supports: edges curl up","middle")]}}}catch(e){}

/* ---------- 6. mech-beams-2: easier ---------- */
/* 0 · Plain text */
rc98("mech-beams-2",0,{p:[
 {t:"p",x:"A beam bends less when its material sits far from the middle."},
 {t:"take",x:"So making a beam taller helps far more than making it wider."}]});
/* 1 · Legend → formula, Fill. δ = PL³/(3EI); 2L → 2³ = 8× */
rc98("mech-beams-2",1,{p:[
 {t:"vars",vars:[["δ","how far the tip drops"],["P","load at the tip"],["L","length"],["E","stiffness of the material"],["I","stiffness of the shape (next card)"]]},
 {t:"eq",lab:"Cantilever, load at the tip",eq:"δ = PL^3 / (3EI)",cap:"slender beam, elastic, small deflection"},
 {t:"p",x:"More load or a longer beam bends it more, and length counts [[cubed]]."},
 {t:"p",x:"Twice as long drops 8× as far. A bigger E or a bigger I bends less."}]});
/* 2 · Terms → formula. I = bh³/12 */
rc98("mech-beams-2",2,{p:[
 {t:"p",x:"$I$, the second moment of area, says how far the material sits from the middle of the beam."},
 {t:"eq",lab:"Rectangle",eq:"I = bh^3 / 12",vars:[["b","width"],["h","height, in the direction it bends"]]},
 {t:"p",x:"Width counts once, height counts **cubed**."},
 {t:"take",x:"A tube puts its material far out: a big I for little area."}]});
/* 3 · Formula, Guess on the E misconception. M = PL at the wall; σ = Mc/I */
rc98("mech-beams-2",3,{p:[
 {t:"p",x:"The wall carries the biggest bending moment: $M = PL$."},
 {t:"eq",lab:"Bending stress",eq:"σ = Mc / I",vars:[["c","distance from the middle to the outer edge"],["M","bending moment"]]},
 {t:"take",x:"E isn't in it. A stiffer material bends less, but at the same load it carries the same stress."}],
 g:{at:2,q:"Same beam and load, but aluminum instead of steel (lower E). The stress…",o:[
  ["stays the same",1,"σ = Mc/I has no E in it. Only the load and the shape set the stress."],
  ["goes up",0,"Lower E means more deflection, not more stress. σ = Mc/I has no E."]]}});
/* 6 · Formula → value rows. Rod I = π·20⁴/64 = 7,854; tube π(25⁴ − 15⁴)/64 = 16,690; areas both π·100 = 314.2 mm² */
rc98("mech-beams-2",6,{p:[
 {t:"p",x:"Same material, same amount of it (314 mm² of area). Only the shape changes."},
 {t:"vt",l:"Solid rod · 20 mm across",v:"I ≈ 7,854",u:"mm^4"},
 [{t:"vt",l:"Tube · 25 mm outside, 15 mm hole",v:"I ≈ 16,690",u:"mm^4"},{t:"rel",x:"About 2.1× the I, so about 2× stiffer: its material sits farther out."}]]});
/* 7 · Plain text */
rc98("mech-beams-2",7,{p:[
 {t:"p",x:"Deflection and stress are two separate checks. A design has to meet both targets."},
 {t:"p",x:"A target stress you pick isn't a tested material allowable."},
 {t:"take",x:"Yielding, fatigue, buckling and joints need their own checks. Passing these two numbers doesn't make a part safe."}]});
qfix("mech-beams-2",2,/^Compare centroidal bending/,q=>{Object.assign(q,{
 q:"A solid rod is 20 mm across. A tube is 25 mm outside with a 15 mm hole, so it has the same area. How many times bigger is the tube's I? (Round section: I = πd⁴/64. Tube: subtract the hole's I.)",
 why:"The π/64 cancels: (25⁴ − 15⁴) / 20⁴ = 340,000 / 160,000 = 2.125. Same area doesn't mean same I. Subtracting the diameters first (10⁴) or using d² (area) gives the wrong ratio."})});
qfix("mech-beams-2",3,/^A steel tube cantilever, OD 25 mm/,q=>{q.q="Steel tube cantilever: 25 mm outside, 15 mm inside, 500 mm long, 100 N at the tip. E = 200,000 N/mm² and I = 16,690 mm⁴. Using δ = PL³/(3EI) and σ = PLc/I, which pair is right?"});
qfix("mech-beams-2",4,/^A small-deflection elastic cantilever has P=100 N/,q=>{Object.assign(q,{
 q:"A steel cantilever (elastic, small deflection; 100 N at the tip, 500 mm long) has a flat section, 40 mm wide and 20 mm tall: δ = 0.781 mm and σ = 18.75 MPa. Targets: δ ≤ 0.25 mm and σ ≤ 10 MPa. Which single change meets both?",
 ans:"Turn it on edge, 20 wide × 40 tall: δ ≈ 0.195 mm, σ ≈ 9.38 MPa",
 wrong:["A material with twice the E: δ ≈ 0.391 mm, σ = 18.75 MPa","Double the width to 80 mm: δ ≈ 0.391 mm, σ ≈ 9.38 MPa","A stronger steel, same E: δ = 0.781 mm, σ = 18.75 MPa"],
 why:"On edge, I grows 4× and c doubles: δ drops 4×, σ halves, both targets met. Twice the E halves δ but leaves σ alone. Twice the width halves both, so δ still misses. A stronger steel with the same E changes neither number. Meeting these targets alone doesn't make it safe."})});
qfix("mech-beams-2",5,/^“Our tip-loaded cantilever model gives/,q=>{Object.assign(q,{
 q:"“The cantilever model says the tip drops 20% of the length. We only entered E, but the spreadsheet says it's safe.”",
 ans:"Recheck the model, that's too much bending for it, and get real strength data.",
 wrong:["A drop of 20% of the length proves the small-deflection model works.","E tells you the yield strength, so the material is approved.","Show fewer decimal places and both problems go away."],
 why:"The formula assumes small deflection; a 20% drop breaks that assumption rather than confirming it. E is stiffness, not strength. Rounding changes how the numbers look, not what's missing. Also check the supports, buckling and joints."})});

/* ---------- test entries ---------- */
try{TF48.unshift(
 {b:"b116",k:"bm116",t:"Beam lesson, easier",c:"Cards are short reveal cards now, and questions 3–6 are reworded (same answers).",go:["lesson","mech-beams-2"]},
 {b:"b116",k:"am116",t:"Metal supports figure",c:"Card 2: two panels, with supports (held flat, heat down) and without (edges curl up).",go:["lesson","mfg-additive-4"]},
 {b:"b116",k:"sb116",t:"Springback picture + metals card",c:"New card 5 ranks the four metals by Sy/E. The demo shows the part under the punch and after release.",go:["lesson","mfg-sheet-3"]},
 {b:"b116",k:"ba116",t:"Bend allowance picture",c:"The demo draws the bend: radius, thickness, dashed neutral axis, orange allowance arc.",go:["lab","mfg-sheet-2"]},
 {b:"b116",k:"pb116",t:"Brake force graph",c:"Question 2 shows F against t with last question's 133 kN point.",go:["q","mfg-sheet-4",1]},
 {b:"b116",k:"ml116",t:"Errors, then MSE",c:"Question 2 asks for e₁, e₂, e₃; a new question 6 takes them to the mean squared error.",go:["q","ml-learning-1",1]})}catch(e){}
try{NEWS.unshift({d:"2026-11-27",t:["Beam calculations is easier to follow, sheet metal demos show the actual bend, and Fitting a line works the errors out before the mean squared error."]})}catch(e){}

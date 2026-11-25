/* ===== v105 (2026-11-25): reveal cards for Materials =====
   1. All 16 cards of mat-basics-1 … mat-basics-4 as reveal cards (rc98, format in v98.js; style catalogue in
      docs/LEARNING_DESIGN.md). Cards only: `cards`, `qs`, lesson ids and question order are unchanged.
      Guess on 5 cards (1·2, 2·0, 3·1, 3·2, 4·1), Fill on 4 (1·1, 2·3, 4·0, 4·2), 7 with neither.
      mat-basics-1 card 0 has an LFIG17 figure (the pulled bar, caption gives σ = F/A and ε = ΔL/L), so that card
      leaves out the formula boxes and carries no interaction. */
try{FB.ver="b105"}catch(e){}

/* ---------- mat-basics-1 · Stress, strain and stiffness ---------- */
/* 0 · Terms, no interaction. Figure draws the bar and its caption gives both formulas. 1 MPa = 10⁶ N / 10⁶ mm² = 1 N/mm². */
rc98("mat-basics-1",0,{p:[
 {t:"term",s:"σ",x:"**Stress**: force per unit area, in MPa."},
 {t:"term",s:"ε",x:"**Strain**: stretch per unit length."},
 {t:"take",x:"Strain is a length over a length, so it has no units. A stress in MPa is newtons per square millimetre."}]});

/* 1 · Rule in words → formula → value rows, Fill "proportional". E: steel ≈ 200 GPa, aluminum ≈ 70, nylon ≈ 3 (2–4).
   Same σ: ε_Al/ε_steel = 200/70 = 2.86 ≈ 3. */
rc98("mat-basics-1",1,{p:[
 {t:"p",x:"In the elastic region, stress is [[proportional]] to strain."},
 {t:"eq",lab:"Hooke's law",eq:"σ = E ε",cap:"elastic region, load along one axis",vars:[["σ","stress"],["E","Young's modulus, a material property"],["ε","strain"]]},
 [{t:"vt",l:"Steel",v:"E ≈ 200",u:"GPa"},{t:"vt",l:"Aluminum",v:"E ≈ 70",u:"GPa"},{t:"vt",l:"Nylon",v:"E ≈ 3",u:"GPa"},
  {t:"rel",x:"Same stress, about 3× the strain in aluminum as in steel: $ε = σ/E$."}]]});

/* 2 · Compare pair + Guess (hardening doesn't change stiffness). A36 mild steel σ_y ≈ 250 MPa; quenched-and-tempered
   4340 σ_y ≈ 1,400 MPa (range ~1,000–1,600). Both E ≈ 200–205 GPa. Deflection ∝ 1/E, so unchanged. */
rc98("mat-basics-1",2,{p:[
 {t:"p",x:"For a given shape and load, $E$ sets how much a part deflects. Strength sets the stress at which it yields or breaks."},
 [{t:"pc",l:"Mild steel",c:"yield ≈ 250 MPa",v:"E ≈ 200 GPa"},
  {t:"pc",l:"Hardened alloy steel",c:"yield ≈ 1,400 MPa",v:"E ≈ 200 GPa"}],
 {t:"take",x:"Hardening raises strength, not stiffness. To deflect less, change the shape or the kind of material."}],
 g:{at:1,q:"Harden a steel shaft so its yield strength rises 5×. Under the same load, it deflects…",o:[
  ["about a fifth as much",0,"That mixes up strength with stiffness. Deflection depends on E, and hardening barely changes E."],
  ["about the same",1,"Deflection depends on E, which stays about 200 GPa. Only the stress it can take before yielding goes up."]]}});

/* 3 · Worked example, no interaction. ε = 100/200,000 = 5×10⁻⁴; ΔL = 5×10⁻⁴ × 1,000 mm = 0.5 mm.
   100 MPa is below the yield strength of common structural steels (≥ 250 MPa), so σ = Eε applies. */
rc98("mat-basics-1",3,{p:[
 {t:"giv",lab:"Steel bar in tension",rows:[["σ","100","MPa"],["E","200,000","MPa"],["L","1,000","mm"]]},
 {t:"step",f:"ε = σ / E = 100 / 200,000",v:"0.0005",u:""},
 {t:"step",f:"ΔL = ε L = 0.0005 × 1,000",v:"0.5",u:"mm",fin:1},
 {t:"p",x:"100 MPa is below the yield strength of common steels, so the bar springs back to 1,000 mm when unloaded."}]});

/* ---------- mat-basics-2 · Yield, ultimate and ductility ---------- */
/* 0 · Plain text + Guess (permanent stretch after unloading past yield). Unloading follows a line of slope E. */
rc98("mat-basics-2",0,{p:[
 {t:"p",x:"On a stress–strain curve, stress first rises in a straight line, with slope $E$: the elastic region."},
 {t:"p",x:"The **yield strength** $σ_y$ ends that line. Unload below it and the bar returns to its original length."},
 {t:"p",x:"Unloaded from past yield, it springs back along a line parallel to the elastic one and keeps a permanent stretch: plastic strain."}],
 g:{at:2,q:"Stretch a steel bar past yield, then take the load off. Its length…",o:[
  ["returns to the original",0,"That's true only below yield. Past it, part of the stretch is plastic and stays."],
  ["stays a little longer",1,"Only the elastic part springs back; the plastic stretch stays."]]}});

/* 1 · Process chain, no interaction. Typical elongation at break: mild steel ≈ 20 % or more. */
rc98("mat-basics-2",1,{p:[
 {t:"p",x:"**Ultimate tensile strength** $σ_{uts}$ is the peak of the curve: the highest stress the bar carries."},
 {t:"chain",items:["straight line","yield","hardening","peak","necking","break"],hl:3},
 {t:"p",x:"After the peak, a ductile bar thins in one spot, called necking, and breaks there."},
 [{t:"p",x:"**Elongation at break** measures ductility."},{t:"vt",l:"Mild steel",v:"≈ 20",u:"%"}]]});

/* 2 · Rule in words → formula → worked value, no interaction. n = 250/100 = 2.5. */
rc98("mat-basics-2",2,{p:[
 {t:"p",x:"A part that has yielded is bent for good: it may no longer fit or work, even though it hasn't broken. So design checks it against yield."},
 {t:"eq",lab:"Safety factor on yield",eq:"n = σ_y / σ",cap:"steady load, ductile material",vars:[["n","safety factor"],["σ_y","yield strength"],["σ","working stress"]]},
 [{t:"p",x:"Bracket: $σ_y$ = 250 MPa, working stress 100 MPa."},
  {t:"step",f:"n = 250 / 100",v:"2.5",u:"",fin:1}],
 {t:"p",x:"Codes and companies set the $n$ a part must reach."}]});

/* 3 · Compare pair, Fill "little warning". Elongation at break: mild steel ≈ 20 %, gray cast iron < 1 %.
   Brittle parts are designed against ultimate strength (no yield point to design to). */
rc98("mat-basics-2",3,{p:[
 {t:"p",x:"Brittle materials such as cast iron, glass and ceramics barely yield, so they break with [[little warning]]."},
 [{t:"pc",l:"Ductile",c:"mild steel, stretch at break",v:"≈ 20 %"},
  {t:"pc",l:"Brittle",c:"gray cast iron, stretch at break",v:"< 1 %",warn:1}],
 {t:"take",x:"With no yield to design to, brittle parts are checked against ultimate strength, with larger safety factors."}]});

/* ---------- mat-basics-3 · Picking materials by index ---------- */
/* 0 · Legend → two formulas, no interaction. Tie rod: k = EA/L, m = ρAL → m ∝ ρ/E. Square beam: k ∝ EI ∝ EA² →
   A ∝ E^{-1/2}, m ∝ ρ/√E. */
rc98("mat-basics-3",0,{p:[
 {t:"p",x:"A **material index** ranks candidate materials for one job. Higher is better."},
 {t:"vars",lab:"First, the symbols",vars:[["E","Young's modulus"],["ρ","density"]]},
 [{t:"eq",lab:"Light, stiff tie rod",eq:"E / ρ",cap:"set length and stiffness, lowest mass"},
  {t:"eq",lab:"Light, stiff beam",eq:"√{E} / ρ",cap:"square section free to grow, set length and stiffness"}]]});

/* 1 · Scaling table + Guess. E ÷ 4: tie rod k ∝ EA → A × 4. Square beam k ∝ EI, I = A²/12 → A² × 4 → A × 2. */
rc98("mat-basics-3",1,{p:[
 {t:"p",x:"Keep the length and the needed stiffness fixed, and switch to a material with a quarter of the $E$."},
 {t:"tbl",head:["Part","Area needed"],rows:[["Tie rod, stiffness ∝ EA","× 4"],["Square beam, stiffness ∝ EA²","× 2"]],hi:[1,1]},
 {t:"p",x:"A square beam's $I$ grows as $A^2$, so its stiffness does too. A low-density material can afford the thicker section: beam mass ∝ $ρ/√{E}$."}],
 g:{at:1,q:"With a quarter of the E, a square beam needs how much more area to stay as stiff?",o:[
  ["4×",0,"That's the tie rod, where stiffness ∝ EA. A beam's stiffness goes as EI, and I grows with area squared."],
  ["2×",1,"Stiffness ∝ EA² for a square beam, so A² must rise 4× and A only 2×."]]}});

/* 2 · Value rows → Guess → table, steel = 1. E/ρ in MPa·m³/kg: steel 200,000/7,850 = 25.5; aluminum 70,000/2,700 = 25.9;
   titanium 110,000/4,430 = 24.8; magnesium 45,000/1,740 = 25.9 (÷ steel: Al 1.02, Mg 1.02).
   Panel index E^{1/3}/ρ (GPa^{1/3}·m³/Mg): steel 5.848/7.85 = 0.745; Al 4.121/2.70 = 1.526 (× 2.05); Mg 3.557/1.74 = 2.044
   (× 2.74). Panel: k ∝ E t³, m ∝ ρ t → m ∝ ρ/E^{1/3}. */
rc98("mat-basics-3",2,{p:[
 [{t:"p",x:"For tie rods, the common metals score almost the same on $E/ρ$:"},
  {t:"vt",l:"Steel",v:"25.5",u:"MPa·m^3/kg"},{t:"vt",l:"Aluminum",v:"25.9",u:"MPa·m^3/kg"},{t:"vt",l:"Titanium",v:"24.8",u:"MPa·m^3/kg"}],
 {t:"tbl",head:["Against steel","Tie rod","Panel"],rows:[["Aluminum","× 1.0","× 2.0"],["Magnesium","× 1.0","× 2.7"]],hi:[0,2]},
 {t:"p",x:"Panel index $E^{1/3}/ρ$, length and width fixed, thickness free: stiffness grows with thickness cubed, so a low density buys a much thicker sheet for the same mass."}],
 g:{at:1,q:"A light, stiff panel in bending. Against steel, aluminum scores…",o:[
  ["about the same",0,"That's the tie-rod index E/ρ. In bending, thickness counts cubed, so low density pays off."],
  ["about 2× better",1,"The panel index is E^{1/3}/ρ: aluminum 1.53 against steel 0.75."]]}});

/* 3 · Plain text, no interaction. Beam index √E/ρ: CFRP √140/1.6 = 7.40; aluminum √70/2.70 = 3.10; ratio 2.39. */
rc98("mat-basics-3",3,{p:[
 {t:"p",x:"An index ranks one need, such as stiffness per kilogram."},
 {t:"p",x:"Real choices add cost, corrosion, joining and how the part will be made."},
 {t:"p",x:"Unidirectional carbon-fiber composite (CFRP), loaded along its fibers, beats aluminum on the beam index by more than 2×. But it costs far more, is weak across the fibers and is usually bonded or bolted, not welded."},
 {t:"take",x:"Use indices to shrink the list, then judge the few that remain on everything else."}]});

/* ---------- mat-basics-4 · Fatigue and endurance ---------- */
/* 0 · Plain text → process chain, Fill "well below". */
rc98("mat-basics-4",0,{p:[
 {t:"p",x:"**Fatigue**: failure under repeated loads, which can happen at stresses [[well below]] yield."},
 {t:"p",x:"Cracks start at stress raisers such as holes, scratches and sharp corners."},
 {t:"chain",items:["stress raiser","crack starts","grows each cycle","sudden break"],hl:2}]});

/* 1 · Formula → value row + Guess. Shigley: S_e' ≈ 0.5 S_ut for S_ut ≤ 1,400 MPa (700 MPa above).
   600 MPa → 300 MPa. Endurance tests run to about 10⁶–10⁷ cycles. */
rc98("mat-basics-4",1,{p:[
 {t:"p",x:"An **S–N curve** plots stress amplitude $S$ against cycles to failure $N$, with $N$ on a log scale. Lower stress, longer life."},
 {t:"p",x:"Many steels level off at an **endurance limit** $S_e$. Below it, a test sample survives 10^6–10^7 cycles, and design treats that as infinite life (steady amplitude, no corrosion)."},
 [{t:"eq",eq:"S_e ≈ 0.5 σ_{uts}",cap:"polished steel samples in rotating bending, σ_{uts} up to about 1,400 MPa"},
  {t:"vt",l:"$σ_{uts}$ = 600 MPa",v:"S_e ≈ 300",u:"MPa"}]],
 g:{at:2,q:"For polished steel samples, the endurance limit is about…",o:[
  ["the yield strength",0,"Fatigue cracks grow at stresses well below yield, so the endurance limit sits lower."],
  ["half the ultimate strength",1,"For polished steel samples, S_e ≈ 0.5 σ_uts, up to about 1,400 MPa."],
  ["a tenth of ultimate",0,"Too low for a polished sample. Notches, rough surfaces and corrosion can pull a real part down a long way, but the sample's limit is about half."]]}});

/* 2 · Compare pair, Fill "finite". Aluminum fatigue strength is usually quoted at 5×10⁸ cycles. */
rc98("mat-basics-4",2,{p:[
 {t:"p",x:"Aluminum's S–N curve never levels off: at every stress amplitude its life is [[finite]], though it can be very long."},
 [{t:"pc",l:"Steel",c:"S–N curve levels off",v:"S_e ≈ 0.5 σ_{uts}"},
  {t:"pc",l:"Aluminum",c:"S–N curve keeps falling",v:"no S_e",warn:1}],
 {t:"p",x:"So aluminum gets a fatigue strength at a stated life, often 5×10^8 cycles, and aircraft parts get finite design lives with inspections."}]});

/* 3 · Worked example, no interaction. S_e' = 0.5·600 = 300 MPa. Marin factors (Shigley): machined k_a = 4.51·600^−0.265 = 0.828;
   size, d = 25 mm, k_b = 1.24·25^−0.107 = 0.879. 300 × 0.83 × 0.88 = 219.1 MPa. Shoulder K_f = 2: 219/2 = 109.6 ≈ 110 MPa. Assumes fully reversed bending, room temperature, 50 % reliability.
   110/300 = 0.37: less than half the sample value. */
rc98("mat-basics-4",3,{p:[
 {t:"p",x:"$S_e$ comes from small polished samples. A real part is rougher, bigger and notched, and each of these lowers its endurance limit."},
 [{t:"p",x:"Machined steel shaft in rotating bending, 25 mm diameter, $σ_{uts}$ = 600 MPa:"},
  {t:"step",f:"polished sample: 0.5 × 600",v:"300",u:"MPa"},
  {t:"step",f:"× 0.83 surface × 0.88 size",v:"219",u:"MPa"}],
 [{t:"p",x:"At a shoulder with fatigue notch factor $K_f$ = 2, the local stress doubles:"},
  {t:"step",f:"219 / 2",v:"≈ 110",u:"MPa",fin:1}],
 {t:"take",x:"Estimated endurance limit at the shoulder: about 110 MPa of nominal stress amplitude, at 50 % reliability. Less than half the sample's 300."}]});

try{NEWS.unshift({d:"2026-11-25",t:["Materials cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b105",k:"rc105a",t:"Reveal cards: Materials",c:"All 16 cards in the 4 materials lessons. Guesses: hardened shaft, unloading past yield, beam area, aluminum panel, endurance limit. Fills: proportional, little warning, well below, finite.",go:["lesson","mat-basics-1"]})}catch(e){}

/* ===== v100 (2026-11-25): reveal cards for Civil and structures =====
   1. All 16 cards of civil-struct-1 … civil-struct-4 as reveal cards (rc98, format in v98.js; style catalogue in
      docs/LEARNING_DESIGN.md). Cards only: `cards`, `qs`, lesson ids and question order are unchanged.
      Guess on 5 cards (1·0, 2·0, 3·2, 4·0, 4·3), Fill on 5 (2·3, 3·0, 3·1, 3·3, 4·2), 6 with neither.
      Three cards have an LFIG84 figure (1·2 tributary strip, 2·2 square vs triangle, 3·1 end conditions): blocks
      the figure already draws are left out, and none of them carries a Guess or Fill its figure would answer. */
try{FB.ver="b100"}catch(e){}

/* ---------- civil-struct-1 · Loads and load paths ---------- */
/* 0 · Terms + Guess (a parked car is live load) */
rc98("civil-struct-1",0,{p:[
 {t:"p",x:"A structure carries three kinds of load."},
 {t:"term",s:"D",x:"**Dead load**: the structure's own weight plus anything permanently fixed to it, such as floors, walls and finishes."},
 {t:"term",s:"L",x:"**Live load**: anything that moves or comes and goes: people, furniture, vehicles."},
 {t:"p",x:"**Environmental loads** come from the site: wind $W$, snow $S$ and earthquakes $E$."}],
 g:{at:2,q:"A car parked in a garage for months. Its weight counts as…",o:[
  ["dead load",0,"Dead load is only the permanent weight of the structure and what's fixed to it. A car can drive away, so it's live load however long it stays."],
  ["live load",1,"It can move or be removed, so it's live load, even while it sits still."]]}});

/* 1 · Process chain, no interaction */
rc98("civil-struct-1",1,{p:[
 {t:"p",x:"A **load path** is the chain of members that carries a load down to the ground."},
 {t:"chain",items:["slab","beam","girder","column","footing","soil"],hl:0},
 {t:"p",x:"Each link, and each connection between links, must carry everything passed to it. One weak link breaks the path."}]});

/* 2 · Legend → formula → worked steps, no interaction. The card's figure (LFIG84) draws the tributary strip and its
   caption says "halfway to its neighbors: the shaded tributary strip", so the rule isn't repeated and nothing is blanked.
   Equally spaced parallel beams, uniform floor pressure. Demo defaults q = 5 kPa = 5 kN/m², s = 3 m, L = 6 m:
   w = 5·3 = 15 kN/m; W = 15·6 = 90 kN. */
rc98("civil-struct-1",2,{p:[
  {t:"eq",eq:"w = q s",cap:"equal spacing, uniform pressure",vars:[["w","load per meter of beam"],["q","floor pressure"],["s","beam spacing"]]},
 {t:"step",f:"w = 5 kPa × 3 m",v:"15",u:"kN/m"},
 {t:"step",f:"W = 15 kN/m × 6 m span",v:"90",u:"kN",fin:1}]});

/* 3 · Value row, no interaction. 50 psf × 47.88 Pa/psf = 2394 Pa ≈ 2.4 kPa; 2394 / 9.81 = 244.0 kg/m². */
rc98("civil-struct-1",3,{p:[
 {t:"p",x:"Codes set a minimum design live load for each use of a floor."},
 [{t:"vt",l:"Office floor, a common value",v:"2.4",u:"kPa"},
  {t:"rel",x:"That's 50 psf, the weight of about 244 kg on each square meter."}],
 {t:"p",x:"The floor is designed for this plus partitions and its own dead load."}]});

/* ---------- civil-struct-2 · Trusses and triangles ---------- */
/* 0 · Terms + Guess (a member loaded between its joints also bends) */
rc98("civil-struct-2",0,{p:[
 {t:"p",x:"An ideal **truss**: straight members joined by pins, with loads applied only at the joints."},
 [{t:"p",x:"Then each member carries only a force along its own length:"},
  {t:"term",s:"T",x:"**Tension**: the member is pulled and stretches."},
  {t:"term",s:"C",x:"**Compression**: the member is pushed and shortens."}],
 {t:"take",x:"Load a member between its joints and it bends as well. That's why trusses take their loads at the joints."}],
 g:{at:2,q:"Hang a load halfway along one member instead of at a joint. That member…",o:[
  ["still only stretches or shortens",0,"Pure tension or compression needs the loads at the pins. A load partway along pushes across the member, so it bends like a small beam."],
  ["bends as well",1,"The load pushes across the member between its pins, so it carries bending on top of its axial force."]]}});

/* 1 · Rule in words → formula + worked value, no interaction. Apex joint, two members at θ = 30°, P = 10 kN:
   ΣF_y: 2F sin θ = P → F = 10/(2·0.5) = 10 kN (both members in compression). */
rc98("civil-struct-2",1,{p:[
 {t:"p",x:"**Method of joints**: treat each pin as a point. Its forces must balance in both directions."},
 {t:"eq",eq:"ΣF_x = 0, ΣF_y = 0",cap:"each pin in static equilibrium"},
 {t:"p",x:"Two equations per joint solve two unknown member forces, so start at a joint with at most two."},
 [{t:"p",x:"Symmetric apex, members 30° above horizontal, 10 kN down. Vertical balance, both members in compression:"},
  {t:"step",f:"2F sin 30° = 10 kN",v:"F = 10",u:"kN",fin:1}]]});

/* 2 · Plain text, no interaction. The card's figure (LFIG84) already draws the racked square next to the rigid
   triangle, so the compare panels are left out and a Guess would be answered by the figure. */
rc98("civil-struct-2",2,{p:[
 {t:"p",x:"Three bars of fixed length fit together in only one shape, so a pinned triangle holds its shape."},
 {t:"p",x:"A square with pinned corners racks into a parallelogram while all four sides keep their length."},
 {t:"take",x:"Add one diagonal and the square becomes two triangles: rigid again."}]});

/* 3 · Legend → formula, Fill "fewer". 2 equations per joint = 2j; 3 support reactions; m = 2j − 3.
   Triangle: j = 3 → m = 3 ✓. */
rc98("civil-struct-2",3,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["m","number of members"],["j","number of joints"]]},
 {t:"eq",lab:"Simple planar truss",eq:"m = 2j − 3",cap:"3 support reactions, members arranged in triangles"},
 [{t:"p",x:"Each joint gives 2 equations. 3 of the 2j equations find the support reactions; the rest find one force per member."},
  {t:"vt",l:"One triangle: $j$ = 3",v:"m = 3",u:""}],
 {t:"p",x:"With [[fewer]] members than that, the truss can move like a mechanism. With more, it's indeterminate: balance alone can't find the forces."}]});

/* ---------- civil-struct-3 · Column buckling ---------- */
/* 0 · Legend → formula, Fill "far below". Demo defaults: π²·200,000 MPa·8×10⁶ mm⁴/(1·4000 mm)²
   = 9.8696·1.6×10¹²/1.6×10⁷ = 9.87×10⁵ N ≈ 987 kN. */
rc98("civil-struct-3",0,{p:[
 {t:"p",x:"A slender column fails by bowing sideways at a load [[far below]] its crushing strength."},
 {t:"vars",lab:"First, the symbols",vars:[["E","Young's modulus of the material"],["I","second moment of area about the bending axis"],["K","effective-length factor, set by the ends"],["L","column length"]]},
 {t:"eq",lab:"Euler's critical load",eq:"P_{cr} = π^2EI / (KL)^2",cap:"straight elastic column, load on its axis"},
 [{t:"p",x:"Steel, $E$ = 200 GPa, $I$ = 8×10^6 mm^4, pinned ends ($K$ = 1):"},{t:"vt",l:"Length $L$ = 4 m",v:"P_{cr} ≈ 987",u:"kN"}]]});

/* 1 · Plain text, Fill "shorter". The card's figure (LFIG84) draws the three end cases with K = 1, 0.5 and 2, so
   the K table is left out. Ideal-end K: 1.0, 0.5, 2.0; AISC recommended design values 0.65 (fixed–fixed), 2.1
   (fixed–free). */
rc98("civil-struct-3",1,{p:[
 {t:"p",x:"$KL$ is the effective length: a pinned-end column that long buckles at the same load."},
 {t:"p",x:"Stiffer end restraint gives a [[shorter]] $KL$ and a higher $P_{cr}$."},
 {t:"p",x:"Real fixed ends rotate a little, so design uses larger values: 0.65 fixed–fixed, 2.1 flagpole."}]});

/* 2 · Scaling table + Guess. P_cr ∝ 1/(KL)²: 2L → ÷4, 3L → ÷9, ½L → ×4. */
rc98("civil-struct-3",2,{p:[
 {t:"p",x:"Same column section, material and ends: $E$, $I$ and $K$ fixed. Change only the length."},
 {t:"tbl",head:["Change","Buckling load"],rows:[["2× length","÷ 4"],["3× length","÷ 9"],["½ length","× 4"]],hi:[0,1]},
 {t:"p",x:"$P_{cr} ∝ 1/L^2$: length enters squared, while $E$ and $I$ enter only once."}],
 g:{at:1,q:"Make the column twice as tall. Its buckling load…",o:[
  ["halves",0,"That treats P_{cr} as 1/L. Length is squared in Euler's formula, (KL)²."],
  ["falls to a quarter",1,"P_{cr} = π²EI/(KL)², so doubling L divides it by 2² = 4."],
  ["falls to an eighth",0,"That would be 1/L³, like a cantilever's tip deflection. Euler's load goes as 1/L²."]]}});

/* 3 · Compare pair, Fill "halves". 100 × 200 mm solid rectangle: I_strong = 100·200³/12 = 6.67×10⁷ mm⁴;
   I_weak = 200·100³/12 = 1.67×10⁷ mm⁴ (4× smaller). Midheight brace: KL → KL/2, P_cr × 4 → equals strong axis. */
rc98("civil-struct-3",3,{p:[
 {t:"p",x:"A column buckles about the axis with the smaller $I$: its weak axis. For a 100 × 200 mm bar:"},
 [{t:"pc",l:"Strong axis",c:"200 mm deep in the bending direction",v:"6.67×10^7 mm^4"},
  {t:"pc",l:"Weak axis",c:"100 mm deep in the bending direction",v:"1.67×10^7 mm^4",warn:1}],
 {t:"p",x:"A brace that stops weak-axis sway at midheight [[halves]] that axis's effective length."},
 {t:"rel",x:"Weak-axis $P_{cr}$ rises 4×, matching the strong axis in this bar. The axis with the lower $P_{cr}$ governs."}]});

/* ---------- civil-struct-4 · Load factors and combinations ---------- */
/* 0 · Formula → worked value + Guess. Demo defaults D = 20, L = 30: 1.2·20 + 1.6·30 = 24 + 48 = 72. */
rc98("civil-struct-4",0,{p:[
 {t:"p",x:"Limit state design multiplies loads up and strengths down."},
 {t:"eq",lab:"A common combination",eq:"U = 1.2D + 1.6L",cap:"D, L and U as the same effect, such as a bending moment",vars:[["D","dead load effect"],["L","live load effect"],["U","factored load effect"]]},
 {t:"take",x:"Dead load is known well from material weights; live load is less certain, so it gets the bigger factor."},
 [{t:"p",x:"For $D$ = 20 and $L$ = 30 kN·m:"},{t:"step",f:"1.2(20) + 1.6(30)",v:"U = 72",u:"kN·m",fin:1}]],
 g:{at:2,q:"Live load gets the bigger factor, 1.6 against 1.2, because it's…",o:[
  ["less certain",1,"Weights of concrete and steel are known well. How many people or how much furniture a floor will hold is not."],
  ["usually larger",0,"Factors don't depend on which load is bigger; dead load is often the larger one. They reflect how uncertain each load is."]]}});

/* 1 · Legend → formula + worked steps, no interaction. M_n = 90 kN·m as in question 1; φM_n = 0.9·90 = 81 kN·m ≥ U = 72 kN·m (card 0). */
rc98("civil-struct-4",1,{p:[
 {t:"p",x:"Resistance factors $φ$ scale strength down to cover variability in materials and construction."},
 {t:"eq",lab:"Design check",eq:"φR_n ≥ U",cap:"one check for each way the member can fail",vars:[["φ","resistance factor, 0.9 for steel bending"],["R_n","nominal strength, such as bending strength M_n"],["U","factored load effect"]]},
 [{t:"step",f:"φM_n = 0.9 × 90",v:"81",u:"kN·m"},{t:"step",f:"U = 1.2D + 1.6L",v:"72",u:"kN·m"}],
 {t:"p",x:"81 ≥ 72, so this bending check is satisfied. Shear, deflection and the connections get their own checks."}]});

/* 2 · Plain text + value rows, Fill "rarely". D = 20, L = 30 kN·m: 1.4D = 28; 1.2D + 1.6L = 72.
   1.4D governs when 1.4D > 1.2D + 1.6L ⇔ 0.2D > 1.6L ⇔ L < D/8. */
rc98("civil-struct-4",2,{p:[
 {t:"p",x:"Maximum wind, snow and people [[rarely]] occur at the same time."},
 {t:"p",x:"So codes list several combinations, each with one load at its maximum and the others reduced. Check them all; the worst governs."},
 [{t:"p",x:"For $D$ = 20 and $L$ = 30 kN·m:"},{t:"vt",l:"1.4D",v:"28",u:"kN·m"},{t:"vt",l:"1.2D + 1.6L",v:"72",u:"kN·m"},
  {t:"rel",x:"Here $1.2D + 1.6L$ governs. $1.4D$ takes over only when $L < D/8$."}]]});

/* 3 · Formula + worked value, Guess (dead load factored down for uplift).
   Light roof: D = 0.5 kPa down, wind 0.6 kPa up: 0.9·0.5 = 0.45; 0.6 − 0.45 = 0.15 kPa net up. */
rc98("civil-struct-4",3,{p:[
 {t:"p",x:"Wind can lift a light roof. Its own dead weight is what holds it down."},
 [{t:"eq",lab:"Net uplift, from 0.9D + 1.0W",eq:"1.0W − 0.9D",cap:"wind W acting upward, dead load D downward"},
  {t:"take",x:"Here dead load helps, so it's factored down: if its weight is overestimated, the uplift is underestimated."}],
 [{t:"p",x:"Light roof: $D$ = 0.5 kPa down, wind 0.6 kPa up."},
  {t:"step",f:"1.0(0.6) − 0.9(0.5)",v:"0.15",u:"kPa up",fin:1}],
 {t:"p",x:"The connections must hold the roof down against that net uplift."}],
 g:{at:1,q:"For this uplift check, the roof's dead load is factored…",o:[
  ["up, like 1.2D",0,"Factoring dead load up is cautious only when it adds to the load. Here it resists the wind, so a bigger D would hide the uplift."],
  ["down, like 0.9D",1,"Dead load works against the wind here, so the cautious choice is to count less of it."]]}});

try{NEWS.unshift({d:"2026-11-25",t:["Civil and structures cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b100",k:"rc100a",t:"Reveal cards: Civil and structures",c:"All 16 cards in the 4 civil lessons. Guesses: parked car, load between truss joints, taller column, live-load factor, uplift. Fills: fewer, far below, shorter, halves, rarely.",go:["lesson","civil-struct-1"]})}catch(e){}

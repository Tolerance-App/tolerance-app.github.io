/* ===== v99 (2026-11-25): reveal cards for Engineering math (math-found-1 to -4, 16 cards) =====
   Seth: "Convert the Engineering math course … to reveal cards, start to finish." Format and renderer: v98.js;
   catalogue and rewriting notes: docs/LEARNING_DESIGN.md. Cards only: `cards`, `qs`, ids and question order untouched.
   Guess on 5 cards, Fill on 4, neither on 7. Card indices are 0-based. */
try{FB.ver="b99"}catch(e){}

/* ---------- Units and conversions (math-found-1) ---------- */
/* card 0 · Terms-ish, Fill "cancel". 150/5 = 30 m/s; 30 × 4 = 120 m */
rc98("math-found-1",0,{p:[
 {t:"p",x:"Every physical quantity is a number times a unit."},
 {t:"p",x:"Treat units like algebra: they multiply, divide and [[cancel]]."},
 [{t:"vt",l:"Divide",v:"150 m / 5 s = 30",u:"m/s"},
  {t:"vt",l:"Over 4 s: s cancels",v:"30 m/s × 4 s = 120",u:"m"}]]});
/* card 1 · Rule in words → worked steps. 2.5 × 1000 = 2,500 mm; 350 / 1000 = 0.35 m */
rc98("math-found-1",1,{p:[
 [{t:"p",x:"To convert, multiply by a fraction equal to one:"},
  {t:"eq",eq:"1000 mm / 1 m = 1"}],
 {t:"p",x:"Pick the fraction so the unit you don't want cancels."},
 {t:"step",f:"2.5 m × (1000 mm / 1 m)",v:"2,500",u:"mm"},
 {t:"step",f:"350 mm × (1 m / 1000 mm)",v:"0.35",u:"m",fin:1}]});
/* card 2 · Scaling table, Guess. 1000² = 10⁶; 1000³ = 10⁹ */
rc98("math-found-1",2,{p:[
 {t:"p",x:"1 m = 1000 mm, and an area is a length times a length."},
 {t:"tbl",head:["Unit","In mm"],rows:[["1 m","10^3 mm"],["1 m^2","10^6 mm^2"],["1 m^3","10^9 mm^3"]],hi:[1,1]},
 {t:"p",x:"Convert every power, not just once: $(1000 mm)^2 = 10^6 mm^2$."}],
 g:{at:1,q:"So 1 m² is…",o:[
  ["1000 mm²",0,"That converts the metre only once. A square metre is 1000 mm × 1000 mm."],
  ["10⁶ mm²",1,"Both lengths convert: 1000 × 1000 = 10⁶."],
  ["10⁹ mm²",0,"That's 1000³, the cube, for a volume. An area has two lengths."]]}});
/* card 3 · Prefix grid → worked steps. 1 MPa = 10⁶ N/m²; 1 m² = 10⁶ mm²; 10⁶/10⁶ = 1 N/mm² */
rc98("math-found-1",3,{p:[
 {t:"giv",lab:"Prefixes",rows:[["k","10^3","kilo"],["M","10^6","mega"],["G","10^9","giga"],["m","10^{−3}","milli"],["µ","10^{−6}","micro"]]},
 [{t:"step",f:"1 MPa",v:"10^6",u:"N/m^2"},{t:"step",f:"1 m^2",v:"10^6",u:"mm^2"}],
 {t:"step",f:"1 MPa = 10^6 N / 10^6 mm^2",v:"1",u:"N/mm^2",fin:1},
 {t:"p",x:"Drawings are in mm, so stresses in N/mm² read directly as MPa."}]});

/* ---------- Dimensional analysis (math-found-2) ---------- */
/* card 0 · Legend → rule, Fill "the same". F = ma → M·L/T² */
rc98("math-found-2",0,{p:[
 {t:"vars",lab:"Base dimensions",vars:[["M","mass"],["L","length"],["T","time"]]},
 {t:"p",x:"A valid equation is dimensionally consistent: both sides reduce to [[the same]] combination of M, L and T."},
 {t:"vt",l:"Force: F = m·a",v:"M × L/T^2",u:""}]});
/* card 1 · Worked example. m v² → M(L/T)² = ML²/T²; J = N·m = (ML/T²)·L = ML²/T² */
rc98("math-found-2",1,{p:[
 [{t:"p",x:"Check a formula by substituting dimensions. Kinetic energy:"},
  {t:"eq",eq:"KE = ½ m v^2"}],
 {t:"step",f:"m v^2 = M (L/T)^2",v:"M L^2/T^2",u:""},
 {t:"step",f:"N·m = (M L/T^2)·L",v:"M L^2/T^2",u:"",fin:1},
 {t:"p",x:"They match: KE comes out in joules (N·m). The ½ is a pure number, so dimensions can't check it."}]});
/* card 2 · Formula → relation, Guess. L / (L/T²) = T², so √(L/g) is a time; √4 = 2 */
rc98("math-found-2",2,{p:[
 {t:"p",x:"Dimensions can catch a wrong formula, or suggest the form of one, before any detailed physics."},
 [{t:"p",x:"A pendulum's period can depend only on its length L and on g (L/T²). The one mix with units of time:"},
  {t:"eq",eq:"period = C √{L/g}",cap:"C is a pure number dimensions can't find (2π for small swings)"}],
 {t:"rel",x:"4× the length, 2× the period: $period ∝ √{L}$"}],
 g:{at:2,q:"Make the pendulum 4× longer. Its period…",o:[
  ["doubles",1,"Period goes as √L, and √4 = 2."],
  ["quadruples",0,"That treats period as proportional to L. Only √(L/g) has units of time, so period goes as √L."],
  ["stays the same",0,"Length sits inside √(L/g). It's mass that drops out, since nothing else carries M."]]}});
/* card 3 · Rule in words → formula, Fill "dimensionless". exp(1 s) vs exp(1/60 min): different values */
rc98("math-found-2",3,{p:[
 {t:"p",x:"Functions like sin, exp and log need [[dimensionless]] arguments."},
 {t:"eq",eq:"exp(−t / τ)",vars:[["τ","time constant, s"]],cap:"t/τ has no units"},
 {t:"p",x:"exp(t) alone is meaningless: its value would change if you measured t in minutes instead of seconds."}]});

/* ---------- Vector components (math-found-3) ---------- */
/* card 0 · Plain text + takeaway. The card's figure (fig17 in index.html) already draws Fx = F cos θ and Fy = F sin θ,
   so the formula block is left out. */
rc98("math-found-3",0,{p:[
 {t:"p",x:"A vector has a magnitude and a direction."},
 {t:"p",x:"Split it into components along x and y."},
 {t:"take",x:"With θ measured from the x-axis, cos goes with x and sin with y."}]});
/* card 1 · Worked example. (3+1, 1+2) = (4, 3); √(16+9) = 5; atan2(3, 4) = 36.87° */
rc98("math-found-3",1,{p:[
 {t:"p",x:"Add vectors by adding their components, then rebuild the magnitude and angle."},
 {t:"giv",rows:[["F_1","(3, 1)","N"],["F_2","(1, 2)","N"]]},
 {t:"step",f:"F = F_1 + F_2",v:"(4, 3)",u:"N"},
 [{t:"step",f:"|F| = √{16 + 9}",v:"5",u:"N"},{t:"step",f:"θ = atan2(3, 4)",v:"36.9°",u:"",fin:1}]]});
/* card 2 · Definition → compare pair. atan(1/1) = atan(−1/−1) = 45°; (−1, −1) is in quadrant III: 225° = −135° */
rc98("math-found-3",2,{p:[
 {t:"p",x:"Plain atan only sees the ratio F_y/F_x. For (1, 1) and (−1, −1) that ratio is 1 both times."},
 {t:"pc",l:"atan(F_y/F_x)",c:"for (−1, −1): ratio only",v:"45°",warn:1},
 {t:"pc",l:"atan2(F_y, F_x)",c:"for (−1, −1): uses both signs (−135° is the same as 225°)",v:"−135°"},
 {t:"p",x:"atan2 uses both signs to pick the right quadrant."}]});
/* card 3 · Formula → value rows, Guess. cos 30° = 0.866; sin 30° = 0.5; cos = sin at 45° */
rc98("math-found-3",3,{p:[
 {t:"p",x:"Sanity-check components against the angle. Take a force F at 30° from the x-axis."},
 [{t:"vt",l:"F_x = F cos 30°",v:"≈ 0.87 F",u:""},{t:"vt",l:"F_y = F sin 30°",v:"= 0.5 F",u:""}],
 {t:"rel",x:"Between 0° and 45°, mostly along x: $cos θ > sin θ$"}],
 g:{at:1,q:"Which way does most of the force point?",o:[
  ["along x",1,"cos 30° ≈ 0.87 is bigger than sin 30° = 0.5, so the x-component is larger."],
  ["along y",0,"That swaps sin and cos. With θ from the x-axis, Fx = F cos θ, and cos 30° ≈ 0.87."],
  ["half and half",0,"An even split happens at 45°, where cos and sin are both about 0.71. At 30° the force leans toward x."]]}});

/* ---------- Dot and cross products (math-found-4) ---------- */
/* card 0 · Formula → value rows, Guess. W = 10·2·cos 0° = 20 J; cos 90° = 0 → 0 J */
rc98("math-found-4",0,{p:[
 {t:"eq",lab:"Dot product",eq:"a·b = |a| |b| cos θ",vars:[["θ","angle between a and b"]],cap:"the result is a scalar"},
 [{t:"p",x:"It measures how much one vector points along the other. Work is one: $W = F·d$. A constant 10 N force, 2 m of motion:"},
  {t:"vt",l:"Along the motion · θ = 0°",v:"W = 20",u:"J"}],
 [{t:"vt",l:"Across the motion · θ = 90°",v:"W = 0",u:"J"},
  {t:"rel",x:"Only the part of F along d does work: $W = F d cos θ$"}]],
 g:{at:2,q:"Now push at 90° to the motion. The work done is…",o:[
  ["zero",1,"cos 90° = 0: none of the force points along the motion."],
  ["still 20 J",0,"Only the part of F along d counts, and at 90° that part is zero."],
  ["negative",0,"Negative work needs θ above 90°, with the force partly against the motion. At exactly 90°, cos θ = 0."]]}});
/* card 1 · Legend → formula, Fill "perpendicular". |M| = 20 × 0.8 × sin 90° = 16 N·m */
rc98("math-found-4",1,{p:[
 {t:"p",x:"The cross product $a × b$ is a vector [[perpendicular]] to both a and b."},
 {t:"eq",lab:"Cross product",eq:"|a × b| = |a| |b| sin θ",cap:"θ: angle between a and b; direction by the right-hand rule"},
 {t:"p",x:"Moment is one: $M = r × F$, with r from the pivot to where F acts."},
 {t:"vt",l:"20 N at 90°, 0.8 m from a hinge",v:"|M| = 16",u:"N·m"}]});
/* card 2 · Compare pair. Push toward the hinge: F antiparallel to r, θ = 180°, sin 180° = 0 */
rc98("math-found-4",2,{p:[
 {t:"p",x:"Dot uses the part of b along a; cross uses the part of b across a."},
 {t:"pc",l:"Dot product",c:"part of b along a",v:"|a| |b| cos θ"},
 {t:"pc",l:"Cross product",c:"part of b across a",v:"|a| |b| sin θ"},
 {t:"p",x:"Push a door along its own plane, toward the hinge: F lines up with r, so sin θ = 0 and nothing turns."}]});
/* card 3 · Worked example with a Guess. M_z = 1·10 − 0·0 = +10 N·m → counterclockwise */
rc98("math-found-4",3,{p:[
 {t:"eq",lab:"2D cross product",eq:"M_z = r_x F_y − r_y F_x",cap:"z-value of r × F, with x right and y up"},
 {t:"giv",lab:"Bar from a pin at the origin to (1, 0)",rows:[["r","(1, 0)","m"],["F","(0, 10)","N"]]},
 [{t:"step",f:"M_z = 1·10 − 0·0",v:"+10",u:"N·m",fin:1},
  {t:"rel",x:"Positive M_z: counterclockwise. Negative: clockwise."}]],
 g:{at:2,q:"The force pushes up on the bar's right end. It turns the bar…",o:[
  ["counterclockwise",1,"Pushing up on the right end swings it up and to the left. M_z = 1·10 − 0·0 = +10 N·m, and positive means counterclockwise."],
  ["clockwise",0,"Clockwise needs the right end pushed down (F_y < 0), which makes M_z negative."]]}});

try{NEWS.unshift({d:"2026-11-25",t:["Engineering math lessons now use the new tap-to-reveal cards, with a few quick guesses and hidden words."]})}catch(e){}
try{TF48.unshift({b:"b99",k:"rc99math",t:"Reveal cards: Engineering math",c:"Units and conversions and the other three Engineering math lessons: every card reveals piece by piece. The third card has the m² Guess.",go:["lesson","math-found-1"]})}catch(e){}

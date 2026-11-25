/* ===== v103 (2026-11-25): reveal cards for Drawings and GD&T =====
   1. All 33 cards of gdt-datums-1 … 4 and gdt-form-1 … 4 as reveal cards (rc98, format in v98.js; style catalogue in
      docs/LEARNING_DESIGN.md). Cards only: `cards`, `qs`, lesson ids and question order are unchanged.
      Guess on 9 cards (d1·0, d3·1, d3·3, d4·2, f1·0, f1·2, f2·2, f3·1, f4·2),
      Fill on 8 (d1·2, d2·0, d2·1, d3·0, d4·0, f1·3, f3·0, f4·3), 16 with neither.
      Three cards have an LFIG17 figure (d2·3 square vs round zone, f2·1 perpendicularity zone, f3·3 profile band):
      blocks the figure draws are left out, and none carries a Guess or Fill its caption would answer.
   2. Content fixes while rewriting: form-1 card 2 said a plate "in size everywhere" could be warped, which clashes
      with Rule #1 on card 3; it now says a two-point (caliper) reading can't see warp. datums-4 card 3 now says
      what baseline dimensioning actually bounds (feature to datum one tolerance, feature to feature two). */
try{FB.ver="b103"}catch(e){}

/* ---------- gdt-datums-1 · What a datum is ---------- */
/* 0 · Terms + Guess (the real face is the datum feature, not the datum) */
rc98("gdt-datums-1",0,{p:[
 {t:"p",x:"Two words that sound alike but aren't the same thing:"},
 [{t:"term",s:"A",x:"**Datum**: a theoretically exact plane, axis or point that measurements start from. Drawings name it with a letter."},
  {t:"term",s:"▱",x:"**Datum feature**: the real surface or hole on the part that establishes it."}],
 {t:"take",x:"The machined face is the datum feature. Datum A is the perfect plane; in inspection, the surface plate it rests on simulates it."}],
 g:{at:2,q:"The machined face labelled A on the part is datum A itself. True or false?",o:[
  ["true",0,"The face is real, so it has bumps and tilt. It's the datum feature; the datum is the exact plane that face establishes."],
  ["false",1,"A real face is never perfectly flat. It establishes the datum, an exact plane, usually simulated by the surface the part rests on."]]}});

/* 1 · Process chain, no interaction. Example frame: position Ø0.2 to A, B, C. */
rc98("gdt-datums-1",1,{p:[
 {t:"p",x:"A **feature control frame** is a row of boxes, read left to right."},
 {t:"chain",items:["symbol","zone size","1st datum","2nd datum","3rd datum"],hl:0},
 [{t:"p",x:"Example: position, Ø0.2, A, B, C. The axis must lie in a Ø0.2 mm zone, located from datum A first, then B, then C."},
  {t:"take",x:"The letter order matters: it says which face the part is set on first."}]]});

/* 2 · Plain text, Fill "both be right" */
rc98("gdt-datums-1",2,{p:[
 {t:"p",x:"One inspector rests a part on its bottom face; another rests it on its side. Both measure the same hole."},
 {t:"p",x:"Without a shared origin, they can get different results and [[both be right]]."},
 {t:"take",x:"Datums give everyone the same starting point, so the measurement repeats."}]});

/* 3 · Table, no interaction. 3 + 2 + 1 = 6 contact points; 3 translations + 3 rotations = 6 DOF. */
rc98("gdt-datums-1",3,{p:[
 {t:"p",x:"A loose rigid part has 6 degrees of freedom: 3 slides and 3 rotations. The 3-2-1 idea removes them all."},
 {t:"tbl",head:["Datum plane","Touches at","Removes"],rows:[["Primary","3 points","3"],["Secondary","2 points","2"],["Tertiary","1 point","1"]]},
 {t:"take",x:"3 + 2 + 1 = 6: three datum planes at right angles hold the part completely when it's pressed against them."}]});

/* ---------- gdt-datums-2 · Position tolerance ---------- */
/* 0 · Terms, Fill "no tolerance" */
rc98("gdt-datums-2",0,{p:[
 {t:"p",x:"**Position** controls where a feature's axis may lie, such as a hole's."},
 {t:"term",s:"50",x:"**Basic dimension**: a boxed, exact value with [[no tolerance]] of its own."},
 [{t:"term",s:"⊕",x:"**True position**: the exact location the basic dimensions set."},
  {t:"take",x:"The allowed error comes only from the position callout, not from the title block's ± tolerances."}]]});

/* 1 · Plain text + value row, Fill "half". Ø0.2 zone → radius 0.1 mm. */
rc98("gdt-datums-2",1,{p:[
 {t:"p",x:"A position tolerance of Ø0.2 means the hole's axis must lie inside a cylinder 0.2 mm in diameter, centered on true position."},
 {t:"p",x:"So the axis may stray up to [[half]] the tolerance from true position, in any direction."},
 {t:"vt",l:"Largest offset for Ø0.2",v:"0.1",u:"mm"}]});

/* 2 · Worked example, no interaction. Demo defaults Δx = 0.03, Δy = 0.04, Ø0.08:
   √(0.03² + 0.04²) = √0.0025 = 0.05 mm; 2·0.05 = Ø0.10 > Ø0.08 → reject. */
rc98("gdt-datums-2",2,{p:[
 {t:"eq",eq:"Ø = 2√{Δx^2 + Δy^2}",cap:"Δx, Δy: measured axis offsets from true position",lab:"Actual position"},
 {t:"giv",rows:[["Δx","0.03","mm"],["Δy","0.04","mm"],["tol","Ø0.08","mm"]]},
 {t:"step",f:"√{0.03^2 + 0.04^2}",v:"0.05",u:"mm"},
 [{t:"step",f:"Ø = 2 × 0.05",v:"0.10",u:"mm",fin:1},
  {t:"p",x:"The factor 2 turns the radial offset into a diameter. 0.10 > 0.08, so this hole is rejected."}]]});

/* 3 · Plain text, no interaction. The card's figure (LFIG17) draws the square inside the Ø0.283 circle and its caption
   gives the 57%, so no compare panels and no Guess. Corner offset √(0.1² + 0.1²) = 0.1414 mm; circle area
   π·0.1414² = 0.0628 mm² vs square 0.2² = 0.0400 mm² → ×1.571. */
rc98("gdt-datums-2",3,{p:[
 {t:"p",x:"Separate ±0.1 mm limits on x and y allow 0.141 mm of offset at the square's corners, but only 0.1 mm straight along x."},
 {t:"p",x:"A mating pin doesn't care which direction the hole is off. Only the distance matters."},
 {t:"take",x:"So position uses a round zone: the same limit in every direction."}]});

/* ---------- gdt-datums-3 · Bonus tolerance at MMC ---------- */
/* 0 · Terms, Fill "smallest" */
rc98("gdt-datums-3",0,{p:[
 {t:"term",s:"Ⓜ",x:"**MMC**, maximum material condition: the size at which a feature holds the most material. For a hole, that's its [[smallest]] size."},
 {t:"p",x:"With position at MMC, the stated tolerance applies when the hole is at that smallest size."},
 {t:"p",x:"As the hole is made bigger, the extra clearance is added to the position tolerance as **bonus tolerance**."}]});

/* 1 · Legend → formula + Guess (shaft bonus grows as it gets smaller) */
rc98("gdt-datums-3",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["t","allowed position tolerance (a diameter)"],["t_{M}","tolerance stated at MMC"],["d","actual size"],["d_{M}","MMC size"]]},
 {t:"eq",lab:"Hole",eq:"t = t_{M} + (d − d_{M})",cap:"position at MMC; d_{M} is the smallest hole"},
 [{t:"eq",lab:"Shaft or pin",eq:"t = t_{M} + (d_{M} − d)",cap:"position at MMC; d_{M} is the largest pin"},
  {t:"rel",x:"Either way, the bonus is how far the size has moved away from MMC."}]],
 g:{at:2,q:"For a pin, the bonus tolerance grows as the pin gets…",o:[
  ["bigger",0,"That's the hole rule. A pin at MMC is at its largest, so it moves away from MMC by getting smaller."],
  ["smaller",1,"A pin holds the most material when largest. A smaller pin leaves more clearance, and that clearance is the bonus."]]}});

/* 2 · Plain text, no interaction */
rc98("gdt-datums-3",2,{p:[
 {t:"p",x:"Why it's fair: the mating pin has a fixed size."},
 {t:"p",x:"A bigger hole leaves more room around that pin, so the hole can sit farther off position and the pin still clears."},
 {t:"take",x:"The assembly still works, and more good parts pass inspection."}]});

/* 3 · Formula + Guess (largest pin that always fits). Hole Ø10.0–10.2, Ø0.1 at MMC: VC = 10.0 − 0.1 = 9.9 mm. */
rc98("gdt-datums-3",3,{p:[
 {t:"eq",lab:"Virtual condition of a hole",eq:"VC = d_{M} − t_{M}",cap:"position at MMC; d_{M} smallest hole, t_{M} stated tolerance"},
 {t:"p",x:"Hole Ø10.0–10.2 with Ø0.1 position at MMC."},
 [{t:"step",f:"VC = 10.0 − 0.1",v:"9.9",u:"mm",fin:1},
  {t:"take",x:"Every good hole leaves a perfect Ø9.9 opening clear: the worst-case boundary a pin must fit through."}]],
 g:{at:2,q:"The largest perfect pin that fits every good hole is…",o:[
  ["Ø10.0",0,"Ø10.0 is the smallest hole, but that hole may also sit 0.05 mm off position, which closes the clear opening."],
  ["Ø9.9",1,"The smallest hole, shifted by its full Ø0.1 position zone, still leaves Ø10.0 − 0.1 = Ø9.9 clear."],
  ["Ø10.1",0,"That's the middle of the size range. Holes can be as small as Ø10.0, so a Ø10.1 pin won't fit them all."]]}});

/* 4 · Worked example, no interaction. 10.15 − 10.0 = 0.15 bonus; 0.1 + 0.15 = Ø0.25; at LMC 0.1 + 0.2 = Ø0.3. */
rc98("gdt-datums-3",4,{p:[
 {t:"giv",rows:[["size","10.0–10.2","mm"],["tol","Ø0.1 Ⓜ","mm"],["d","10.15","mm"]]},
 {t:"step",f:"bonus = 10.15 − 10.0",v:"0.15",u:"mm"},
 {t:"step",f:"t = 0.1 + 0.15",v:"Ø0.25",u:"mm",fin:1},
 {t:"p",x:"At the largest hole, Ø10.2, the allowed position reaches Ø0.3."}]});

/* ---------- gdt-datums-4 · Datum choice and stack-ups ---------- */
/* 0 · Plain text, Fill "short" */
rc98("gdt-datums-4",0,{p:[
 {t:"p",x:"A **stack-up** adds tolerances along a chain of dimensions to find the worst possible gap."},
 {t:"p",x:"Pick datums at the functional features, the ones that touch mating parts, and the chain stays [[short]]."},
 {t:"take",x:"Fewer links in the chain, fewer tolerances adding up."}]});

/* 1 · Legend → two formulas, no interaction */
rc98("gdt-datums-4",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["t_i","± tolerance of dimension i in the chain"],["T","± tolerance of the gap"]]},
 {t:"eq",lab:"Worst case",eq:"T = Σ t_i",cap:"every part at its limit at once"},
 {t:"eq",lab:"Statistical (RSS)",eq:"T = √{Σ t_i^2}",cap:"independent variations, each centered in its range"}]});

/* 2 · Value rows + Guess. n = 4, t = 0.1: worst 4·0.1 = 0.4; RSS √(4·0.01) = √0.04 = 0.2. */
rc98("gdt-datums-4",2,{p:[
 {t:"p",x:"Four parts in a chain, each ±0.1 mm."},
 [{t:"vt",l:"Worst case, 4 × 0.1",v:"±0.4",u:"mm"},
  {t:"vt",l:"RSS, √4 × 0.1",v:"±0.2",u:"mm"}],
 {t:"rel",x:"RSS is smaller because every part at its limit at once is unlikely. It grows with √n, worst case with n."}],
 g:{at:1,q:"By RSS, the gap tolerance is about…",o:[
  ["±0.4 mm",0,"That's the worst case, 4 × 0.1. RSS adds squares: √(4 × 0.1²)."],
  ["±0.2 mm",1,"√(4 × 0.1²) = √0.04 = 0.2 mm."],
  ["±0.1 mm",0,"That's one part alone. Adding parts always widens the gap's spread, just more slowly by RSS."]]}});

/* 3 · Compare pair, no interaction. Four holes, each dimension ±0.1: chained, hole 4 to datum = 4 links → ±0.4;
   baseline, hole 4 to datum = ±0.1, any two holes = 2 dimensions → ±0.2. */
rc98("gdt-datums-4",3,{p:[
 {t:"p",x:"Four holes in a row, every dimension ±0.1 mm. Dimension each hole from one datum, not from the hole before it."},
 [{t:"pc",l:"Chained",c:"hole 4 to the datum, through 4 dimensions",v:"±0.4 mm",warn:1},
  {t:"pc",l:"From the datum",c:"hole 4 to the datum, one dimension",v:"±0.1 mm"}],
 {t:"rel",x:"From one datum, the spacing between any two holes stays within ±0.2, however many holes there are."}]});

/* ---------- gdt-form-1 · Flatness and straightness ---------- */
/* 0 · Terms + Guess (flatness needs no datum) */
rc98("gdt-form-1",0,{p:[
 {t:"p",x:"**Form controls** limit a feature's shape on its own."},
 {t:"term",s:"▱",x:"**Flatness**: every point of the surface lies between two parallel planes a set distance apart."},
 {t:"take",x:"Form needs no datum: the two planes may tilt and shift to hug the surface as closely as they can."}],
 g:{at:2,q:"A flatness callout needs a datum to measure from. True or false?",o:[
  ["true",0,"That's orientation, like parallelism. Flatness compares the surface only with itself, so the planes are free to tilt."],
  ["false",1,"Flatness compares the surface only with itself. The enclosing planes tilt to fit it, so no datum is used."]]}});

/* 1 · Terms, no interaction */
rc98("gdt-form-1",1,{p:[
 {t:"term",s:"—",x:"**Straightness**: a line on the surface, or an axis, lies inside a zone."},
 {t:"term",s:"○",x:"**Circularity**: each cross-section lies between two concentric circles."},
 {t:"term",s:"⌭",x:"**Cylindricity**: the whole round surface lies between two coaxial cylinders."}]});

/* 2 · Plain text + Guess (a caliper can't see warp). Uniform 10.00 mm plate bent into a curve. */
rc98("gdt-form-1",2,{p:[
 {t:"p",x:"A plate can be bent like a potato chip while its thickness stays the same everywhere."},
 {t:"take",x:"Flatness checks the face against a plane, so it catches the warp. A sealing face may need flatness tighter than its size tolerance."}],
 g:{at:1,q:"A caliper reads 10.00 mm at every spot on that plate. Is the face flat?",o:[
  ["yes",0,"A caliper measures thickness between two points. A bent plate of even thickness reads the same everywhere."],
  ["can't tell",1,"Two-point readings only show thickness. Warp shows only when the face is checked against a plane, such as a surface plate."]]}});

/* 3 · Rule in words + value row, Fill "also cap". Shaft Ø10.00–10.05: envelope Ø10.05; at Ø10.00 form error ≤ 0.05. */
rc98("gdt-form-1",3,{p:[
 {t:"p",x:"**Rule #1** (ASME Y14.5): a regular feature of size must have perfect form at MMC."},
 {t:"p",x:"A shaft Ø10.00–10.05 must pass through a perfect Ø10.05 ring, its MMC envelope. So its size limits [[also cap]] its form error."},
 [{t:"vt",l:"Bend allowed at Ø10.00",v:"0.05",u:"mm"},
  {t:"p",x:"ISO drawings don't assume this; there, the size needs an Ⓔ to get the same envelope."}]]});

/* ---------- gdt-form-2 · Perpendicularity and parallelism ---------- */
/* 0 · Terms, no interaction */
rc98("gdt-form-2",0,{p:[
 {t:"p",x:"**Orientation controls** hold a feature at an angle to a datum."},
 [{t:"term",s:"⊥",x:"**Perpendicularity**: at 90°."},
  {t:"term",s:"∥",x:"**Parallelism**: at 0°."},
  {t:"term",s:"∠",x:"**Angularity**: at any other angle, given as a basic angle."}]]});

/* 1 · Plain text, no interaction. The card's figure (LFIG17) draws the zone on datum A and its caption says
   "tilt, not location", so there's no Guess on that. */
rc98("gdt-form-2",1,{p:[
 {t:"p",x:"The zone is two parallel planes, or a cylinder for an axis, set at the exact angle to the datum."},
 {t:"p",x:"It keeps that angle but may slide to wherever the feature is."},
 {t:"take",x:"A perpendicular hole can still be in the wrong place: position or profile locates it."}]});

/* 2 · Scaling table + Guess. Same 0.05 mm zone: atan(0.05/100) = 0.0286°; atan(0.05/10) = 0.286°. */
rc98("gdt-form-2",2,{p:[
 {t:"p",x:"Same 0.05 mm perpendicularity zone, on faces of different length."},
 {t:"tbl",head:["Face length","Allowed tilt"],rows:[["100 mm","0.029°"],["10 mm","0.29°"]],hi:[1,1]},
 {t:"rel",x:"Tilt ≈ zone ÷ length. A zone in mm scales with the feature, which is how a mating part feels the error."}],
 g:{at:1,q:"On the 10 mm face, compared with the 100 mm face, the zone allows…",o:[
  ["the same tilt",0,"That would be true of a tolerance in degrees. A fixed width allows more angle over a shorter length."],
  ["10× more tilt",1,"Tilt ≈ zone ÷ length, so a 10× shorter face may tilt 10× more."],
  ["10× less tilt",0,"Backwards: the same width over a shorter length is a steeper angle, so more tilt fits."]]}});

/* 3 · Legend → formula + worked steps, no interaction. Demo defaults z = 0.05, L = 50: 0.001 rad × 57.30 = 0.0573°;
   slope 0.001 = 1 mm per m. */
rc98("gdt-form-2",3,{p:[
 {t:"eq",lab:"Angle equivalent",eq:"θ ≈ z / L",cap:"small angles, θ in radians",vars:[["θ","allowed tilt"],["z","zone width"],["L","feature length"]]},
 {t:"step",f:"θ = 0.05 mm / 50 mm",v:"0.001",u:"rad"},
 [{t:"step",f:"0.001 × 180/π",v:"0.057",u:"°",fin:1},
  {t:"p",x:"That's a slope of 1 mm per metre."}]]});

/* ---------- gdt-form-3 · Profile of a surface ---------- */
/* 0 · Plain text, Fill "uniform width" */
rc98("gdt-form-3",0,{p:[
 {t:"p",x:"**Profile of a surface** puts a complex surface inside a zone of [[uniform width]] around its true shape."},
 {t:"p",x:"The zone follows every curve, the same thickness everywhere, and every point of the real surface must lie in it."},
 {t:"p",x:"Basic dimensions define the true shape, usually by pointing to the CAD model."}]});

/* 1 · Plain text + Guess (without datums, form only) */
rc98("gdt-form-3",1,{p:[
 {t:"p",x:"Profile can be called out with datums or without them."},
 [{t:"pc",l:"With datums",c:"form, tilt, location and size: the zone is locked to the datums",v:"all four"},
  {t:"pc",l:"No datums",c:"plain surface; the zone floats to fit it",v:"form only",warn:1}]],
 g:{at:1,q:"On a plain surface, profile without datums controls…",o:[
  ["only form",1,"With nothing to locate it, the zone can move and tilt to fit the surface, so only the shape is checked."],
  ["form and location",0,"Location needs something to measure from. Without datums the zone floats, so only shape is checked."]]}});

/* 2 · Process chain, no interaction */
rc98("gdt-form-3",2,{p:[
 {t:"p",x:"Why it's popular: one callout replaces a pile of ± dimensions on curves."},
 {t:"chain",items:["CAD model","probe points","deviation per point","all inside zone?"],hl:2},
 {t:"p",x:"It maps straight onto a coordinate measuring machine (CMM), which compares measured points with the CAD surface."}]});

/* 3 · Plain text, no interaction. The card's figure (LFIG17) draws the band and its caption gives "0.4 means ±0.2",
   so the equal split isn't blanked or repeated. Ⓤ 0.1 on 0.4: 0.1 to the material-adding side, 0.4 − 0.1 = 0.3 other side. */
rc98("gdt-form-3",3,{p:[
 {t:"p",x:"A Ⓤ modifier makes the split unequal."},
 {t:"p",x:"The number after Ⓤ is the part of the zone on the side that adds material. 0.4 Ⓤ 0.1: 0.1 mm there, 0.3 mm on the side that removes it."},
 {t:"take",x:"0.4 Ⓤ 0.4 puts the whole zone on the material-adding side, as for a casting face that must always leave stock to machine."}]});

/* ---------- gdt-form-4 · Runout and rotating parts ---------- */
/* 0 · Terms, no interaction */
rc98("gdt-form-4",0,{p:[
 {t:"p",x:"Runout is checked by spinning the part on its datum axis against a dial indicator."},
 {t:"term",s:"↗",x:"**Circular runout**: one reading at each cross-section, checked one section at a time."},
 {t:"term",s:"⌰",x:"**Total runout**: the indicator sweeps the whole surface while it spins, and every reading counts together."}]});

/* 1 · Plain text, no interaction */
rc98("gdt-form-4",1,{p:[
 {t:"p",x:"A runout reading mixes three errors relative to the spin axis: out-of-round, tilt and offset."},
 {t:"p",x:"The indicator can't tell them apart, so one reading gives the combined, worst-case wobble. Tilt shows fully only in total runout."},
 {t:"take",x:"Runout checks the surface geometry a rotating part spins with. Balance also depends on how the mass is spread."}]});

/* 2 · Formula → value rows + Guess (F ∝ ω²). Demo defaults m = 2 kg, e = 0.05 mm, 3000 rpm:
   ω = 3000·2π/60 = 314.2 rad/s; F = 2·5×10⁻⁵·314.2² = 9.87 N. 6000 rpm: ω = 628.3; F = 1×10⁻⁴·394,784 = 39.5 N. */
rc98("gdt-form-4",2,{p:[
 {t:"eq",lab:"Unbalance force",eq:"F = m e ω^2",cap:"rigid rotor, center of mass offset e from the spin axis",vars:[["m","rotor mass"],["e","offset"],["ω","spin speed, rad/s"]]},
 {t:"vt",l:"2 kg, 0.05 mm offset, 3000 rpm",v:"9.87",u:"N"},
 [{t:"vt",l:"Same rotor, 6000 rpm",v:"39.5",u:"N"},
  {t:"rel",x:"Twice the speed, four times the force: $F ∝ ω^2$. Runout is a quick shop-floor indicator of a geometric offset; mass spread matters too."}]],
 g:{at:2,q:"Spin the same rotor twice as fast. The unbalance force…",o:[
  ["doubles",0,"That treats F as proportional to ω. Speed is squared in F = m e ω²."],
  ["quadruples",1,"F = m e ω², so 2× the speed gives 2² = 4× the force."]]}});

/* 3 · Rule in words → formula, Fill "twice". e = 0.05 mm → FIM 0.10 mm (demo default). */
rc98("gdt-form-4",3,{p:[
 {t:"p",x:"A round surface offset by $e$ from the spin axis swings $e$ toward the indicator, then $e$ away. So the needle moves [[twice]] the offset."},
 {t:"eq",lab:"Full indicator movement",eq:"FIM = 2e",cap:"pure offset, perfectly round surface"},
 {t:"vt",l:"Offset $e$ = 0.05 mm",v:"FIM = 0.10",u:"mm"}]});

try{NEWS.unshift({d:"2026-11-25",t:["Drawings and GD&T cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b103",k:"rc103g",t:"Reveal cards: Drawings and GD&T",c:"All 33 cards in the 8 GD&T lessons. Guesses: datum vs face, pin bonus, virtual condition, RSS, flatness datum, caliper warp, tilt vs length, profile without datums, 2× speed. Fills: both be right, no tolerance, half, smallest, short, also cap, uniform width, twice.",go:["lesson","gdt-datums-1"]})}catch(e){}

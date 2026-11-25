/* ===== v102 (2026-11-25): reveal cards for Manufacturing =====
   1. All 50 cards of the 12 Manufacturing lessons (mfg-injection-molding-1…4, mfg-additive-1…4, mfg-sheet-1…4) as
      reveal cards (rc98, format in v98.js; style catalogue in docs/LEARNING_DESIGN.md). Cards only: `cards`, `qs`,
      lesson ids and question order are unchanged.
      Guess on 13 cards (im1·2, im2·0, im3·4, im4·2, am1·0, am1·3, am2·2, am3·0, am3·3, am4·2, sh1·2, sh2·2, sh3·1),
      Fill on 8 (im1·0, im2·1, im4·3, am3·2, sh1·0, sh1·3, sh3·3, sh4·1), 29 with neither.
      Nine cards have an LFIG17 figure (im2·3, im3·2, am1·2, am2·1, am4·1, sh1·1, sh2·1, sh3·0, sh4·0): blocks the
      figure already draws are left out, and none of them carries a Guess or Fill its figure would answer. */
try{FB.ver="b102"}catch(e){}

/* ---------- mfg-injection-molding-1 · The molding cycle ---------- */
/* 0 · Plain text, Fill "high volume" */
rc98("mfg-injection-molding-1",0,{p:[
 {t:"p",x:"**Injection molding** melts plastic pellets, forces the melt into a closed steel mold, cools it solid, then ejects the part."},
 {t:"p",x:"The mold is the big cost. Once it's made, each part takes seconds."},
 {t:"take",x:"So molding pays off at [[high volume]]: the mold's cost is spread over many parts."}]});

/* 1 · Process chain, no interaction */
rc98("mfg-injection-molding-1",1,{p:[
 {t:"p",x:"Every shot runs the same cycle:"},
 {t:"chain",items:["clamp","inject","pack","cool","eject"],hl:2},
 {t:"p",x:"**Packing** pressure keeps adding melt as the part shrinks, so it doesn't come out undersized or sunk."},
 {t:"p",x:"Ejector pins push the solid part out, and the clamp closes for the next shot."}]});

/* 2 · Guess (cooling takes longest) → reason → takeaway */
rc98("mfg-injection-molding-1",2,{p:[
 {t:"p",x:"Clamp, inject, pack, cool, eject: one of these steps usually sets the cycle time."},
 {t:"p",x:"**Cooling** usually dominates. Plastic conducts heat poorly, so the core stays soft long after the surface has set."},
 {t:"take",x:"The part waits in the mold until its core is solid enough to eject without distorting."}],
 g:{at:1,q:"Which step usually takes longest?",o:[
  ["injecting the melt",0,"Filling is fast: high pressure pushes the melt in within a second or two."],
  ["cooling",1,"Plastic conducts heat poorly, so the core takes the longest to go solid."],
  ["ejecting",0,"Ejection is one quick mechanical stroke of the pins."]]}});

/* 3 · Worked example. 3600/30 = 120 shots/h; 120·4 = 480 parts/h. At 25 s: 3600/25 = 144; 144·4 = 576. */
rc98("mfg-injection-molding-1",3,{p:[
 {t:"giv",lab:"4-cavity mold",rows:[["t","30","s per cycle"],["n","4","cavities"]]},
 {t:"step",f:"3600 s / 30 s",v:"120",u:"shots/h"},
 {t:"step",f:"120 × 4",v:"480",u:"parts/h",fin:1},
 {t:"p",x:"Output is shots per hour times cavities. Cut the cycle to 25 s and it's 144 shots, 576 parts an hour."}]});

/* ---------- mfg-injection-molding-2 · Walls, ribs and cooling ---------- */
/* 0 · Guess (a thick zone cools last) */
rc98("mfg-injection-molding-2",0,{p:[
 {t:"p",x:"Molded parts should have **uniform walls**, about 1 to 4 mm for many plastics."},
 {t:"p",x:"A thick zone cools **last**. It keeps shrinking after the surface around it has set, and pulls that surface in."},
 {t:"take",x:"Keep the walls even, and core out thick spots."}],
 g:{at:1,q:"A part has thin walls and one thick boss. The boss cools…",o:[
  ["first",0,"More plastic holds more heat, and its middle is farther from the cold mold, so it takes longer."],
  ["last",1,"It holds more heat and its core is farther from the mold surface, so it's the last to go solid."]]}});

/* 1 · Rule in words → formula, Fill "square". Demo C = 2.5 s/mm², s = 2 mm: 2.5·4 = 10 s. */
rc98("mfg-injection-molding-2",1,{p:[
 {t:"p",x:"Cooling time grows with the [[square]] of the wall thickness."},
 {t:"eq",lab:"Cooling time",eq:"t ≈ C s^2",cap:"same plastic, melt and mold temperatures",vars:[["s","wall thickness"],["C","constant set by the plastic and the mold temperatures"]]},
 {t:"vt",l:"C = 2.5 s/mm², 2 mm wall",v:"t ≈ 10",u:"s"}]});

/* 2 · Plain text + change tiles, no interaction */
rc98("mfg-injection-molding-2",2,{p:[
 {t:"p",x:"Heat has to travel from the middle of the wall out to the mold surface."},
 {t:"giv",lab:"Thicker wall",rows:[["","↑","heat stored","up"],["","↑","distance to the surface","up"]]},
 {t:"take",x:"Both grow with thickness, so the time goes as $s^2$."}]});

/* 3 · Plain text, no interaction. The card's figure (LFIG17) draws the rib, the fat junction and the sink mark, and
   its caption gives the half-wall rule, so nothing is blanked. */
rc98("mfg-injection-molding-2",3,{p:[
 {t:"p",x:"**Ribs** add stiffness without making the wall thick."},
 {t:"p",x:"Keep a rib about half the wall thickness. A thicker rib makes a fat junction that shrinks late and shows a **sink mark**."}]});

/* 4 · Worked example. t ∝ s²: 10·(3/2)² = 10·2.25 = 22.5 s. */
rc98("mfg-injection-molding-2",4,{p:[
 {t:"giv",lab:"Same plastic and mold",rows:[["s_1","2","mm"],["t_1","10","s"],["s_2","3","mm"]]},
 {t:"step",f:"t_2 = t_1 (s_2/s_1)^2",v:"10 × 2.25",u:""},
 {t:"step",f:"t_2",v:"22.5",u:"s",fin:1},
 {t:"p",x:"A wall 50% thicker needs 2.25 times the cooling time, and the cycle grows with it."}]});

/* ---------- mfg-injection-molding-3 · Clamp force ---------- */
/* 0 · Plain text, no interaction */
rc98("mfg-injection-molding-3",0,{p:[
 {t:"p",x:"Melt pressure in the cavity pushes the two mold halves apart."},
 {t:"p",x:"The clamp holds against that pressure acting on the part's **projected area**: the shadow it casts along the opening direction."}]});

/* 1 · Legend → formula. 1 cm² = 10⁻⁴ m², 1 MPa = 10⁶ Pa: 10⁻⁴·10⁶ = 100 N = 0.1 kN, so cm² × MPa ÷ 10 = kN. */
rc98("mfg-injection-molding-3",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["p","average pressure in the cavity"],["A","projected area of all cavities plus runners"]]},
 {t:"eq",lab:"Clamp force",eq:"F = p A",cap:"average cavity pressure over the projected area"},
 {t:"p",x:"Handy units: cm² × MPa ÷ 10 gives kN."}]});

/* 2 · Plain text, no interaction. The card's figure (LFIG17) draws pressure on every face and the projected area, so a
   Guess here would be answered by the figure. */
rc98("mfg-injection-molding-3",2,{p:[
 {t:"p",x:"Melt pressure pushes on every surface it touches, side walls too."},
 {t:"p",x:"Pressure on opposite side walls pushes sideways and cancels out."},
 {t:"take",x:"Only area facing the opening direction pushes the halves apart: projected area, not surface area."}]});

/* 3 · Worked example. 100 cm² = 0.01 m²; 0.01·40×10⁶ = 400,000 N = 400 kN; 400/9.81 = 40.8 ≈ 41 tf. */
rc98("mfg-injection-molding-3",3,{p:[
 {t:"giv",lab:"One cavity",rows:[["A","100","cm²"],["p","40","MPa"]]},
 {t:"step",f:"A = 100 cm^2",v:"0.01",u:"m^2"},
 {t:"step",f:"F = 0.01 m^2 × 40 MPa",v:"400",u:"kN",fin:1},
 {t:"p",x:"That's about 41 tonnes-force (1 tf = 9.81 kN), the unit press ratings often use."}]});

/* 4 · Guess (too little clamp force → flash) */
rc98("mfg-injection-molding-3",4,{p:[
 {t:"p",x:"Pick a press whose rated force covers $F = pA$, with some margin."},
 {t:"p",x:"Too little clamp force: melt escapes between the halves as **flash**, a thin fin along the parting line."},
 {t:"p",x:"Far too much wastes press capacity and wears the mold."}],
 g:{at:1,q:"The press can't quite hold the mold shut. The parts come out with…",o:[
  ["flash",1,"The halves crack open a little and melt squeezes into the gap along the parting line."],
  ["a short shot",0,"A short shot is melt freezing before the cavity fills, from low injection pressure or cold melt. A weak clamp lets melt out, not in short."],
  ["sink marks",0,"Sink comes from thick sections shrinking after the skin sets, not from the halves opening."]]}});

/* ---------- mfg-injection-molding-4 · Diagnosing defects ---------- */
/* 0 · Terms (four causes), no interaction */
rc98("mfg-injection-molding-4",0,{p:[
 {t:"p",x:"Most molding defects trace to one of four causes."},
 [{t:"term",s:"1",x:"**Not enough material**: short shots."},
  {t:"term",s:"2",x:"**Too much pressure**: flash."}],
 [{t:"term",s:"3",x:"**Trapped gas**: burn marks and bubbles."},
  {t:"term",s:"4",x:"**Uneven cooling and shrinkage**: sink, voids and warp."}],
 {t:"take",x:"Name the cause before changing settings: each one needs a different fix."}]});

/* 1 · Terms, no interaction */
rc98("mfg-injection-molding-4",1,{p:[
 {t:"term",s:"S",x:"**Short shot**: the melt freezes before the cavity fills, from low pressure, cold melt or a long thin flow path."},
 {t:"term",s:"F",x:"**Flash**: melt escapes past the parting line, leaving a thin fin where the mold halves meet."}]});

/* 2 · Terms + true/false Guess (uniform walls can still warp) */
rc98("mfg-injection-molding-4",2,{p:[
 {t:"term",s:"S",x:"**Sink and voids**: a thick section keeps shrinking after its skin freezes. The skin dents in (sink) or the core pulls apart inside (void)."},
 {t:"term",s:"W",x:"**Warp**: regions shrink by different amounts, from uneven walls, uneven cooling or fiber orientation."},
 {t:"take",x:"Even walls help, but uneven cooling or fiber orientation can still warp a part."}],
 g:{at:2,q:"True or false: a part with perfectly uniform walls can't warp.",o:[
  ["True",0,"Uniform walls remove one cause. A hot side of the mold or fibers lined up with the flow still make regions shrink differently."],
  ["False",1,"Uneven cooling or fiber orientation can still make regions shrink by different amounts."]]}});

/* 3 · Plain text, Fill "weaker" */
rc98("mfg-injection-molding-4",3,{p:[
 {t:"p",x:"**Weld lines** form where two flow fronts meet: around a hole, or between two gates."},
 {t:"p",x:"The fronts have started to cool when they meet, so the line is [[weaker]] than the plastic around it."},
 {t:"take",x:"Moving the gate moves where weld lines land. Keep them away from highly loaded spots."}]});

/* ---------- mfg-additive-1 · Printing processes ---------- */
/* 0 · Guess (internal shapes cost little extra) */
rc98("mfg-additive-1",0,{p:[
 {t:"p",x:"**Additive manufacturing** builds a part layer by layer from a digital model."},
 {t:"p",x:"Complex internal shapes cost little extra, unless they need supports or clean-out: the printer traces each layer's outline whatever its shape."},
 {t:"take",x:"It suits prototypes, low volumes and lattices."}],
 g:{at:1,q:"Add internal cooling channels to a printed part. The printing time and cost…",o:[
  ["rises a lot",0,"That's true for machining, where every internal feature needs its own tool path or a split part. A printer just traces different outlines in the same layers."],
  ["change little",1,"The printer traces each layer's outline whatever its shape, so internal detail costs little extra, unless a channel needs supports or powder or resin cleaned out."]]}});

/* 1 · Terms, no interaction */
rc98("mfg-additive-1",1,{p:[
 {t:"p",x:"Three main process families:"},
 {t:"term",s:"E",x:"**Material extrusion** (FDM) melts filament and lays it down through a nozzle."},
 {t:"term",s:"V",x:"**Vat photopolymerization** (SLA) cures liquid resin with light."},
 {t:"term",s:"P",x:"**Powder bed fusion** (SLS, metal) fuses powder with a laser."}]});

/* 2 · Rule in words → formula, no interaction. The card's figure (LFIG17) draws the stair steps and its caption says
   halving the layer height doubles the layers, so nothing is blanked. Fixed time per layer: build time ∝ N. */
rc98("mfg-additive-1",2,{p:[
 {t:"p",x:"Thinner layers smooth the stair steps on slopes, but take more layers to reach the same height."},
 {t:"eq",lab:"Layer count",eq:"N = H / h",cap:"build time ∝ N for a fixed time per layer",vars:[["H","part height"],["h","layer height"]]}]});

/* 3 · Worked example + Guess (layer count doubles). 60/0.2 = 300; 60/0.1 = 600. */
rc98("mfg-additive-1",3,{p:[
 {t:"giv",lab:"Part height",rows:[["H","60","mm"]]},
 {t:"step",f:"N = 60 mm / 0.2 mm",v:"300",u:"layers"},
 [{t:"step",f:"N = 60 mm / 0.1 mm",v:"600",u:"layers",fin:1},
  {t:"rel",x:"Half the layer height, twice the layers: $N ∝ 1/h$"}]],
 g:{at:2,q:"Switch to 0.1 mm layers. The layer count…",o:[
  ["doubles",1,"N = H/h, so halving h doubles N, and roughly doubles the build time."],
  ["halves",0,"Thinner layers mean more of them to reach the same height. N = H/h goes up as h goes down."]]}});

/* ---------- mfg-additive-2 · Overhangs and supports ---------- */
/* 0 · Plain text, no interaction */
rc98("mfg-additive-2",0,{p:[
 {t:"p",x:"FDM can print overhangs up to about 45° from vertical without support on almost any printer."},
 {t:"p",x:"Each new layer still rests partly on the one below it."},
 {t:"p",x:"A well-tuned printer with strong part cooling can often hold 60–75°."}]});

/* 1 · Legend → formula, no interaction. The card's figure (LFIG17) draws the step and its caption explains 45°, so
   nothing is blanked. tan 45° = 1: 0.2·1 = 0.2 mm. */
rc98("mfg-additive-2",1,{p:[
 {t:"eq",lab:"Step per layer",eq:"step ≈ h tan θ",cap:"each layer compared with the one below",vars:[["h","layer height"],["θ","wall angle from vertical"]]},
 {t:"vt",l:"h = 0.2 mm, θ = 45°",v:"step ≈ 0.2",u:"mm"}]});

/* 2 · Formula → value rows + Guess (60° step ≈ 0.35 mm). 0.2·tan 60° = 0.2·1.732 = 0.346 mm = 87% of 0.4 mm.
   Wrong option: linear scaling 0.2·60/45 = 0.267 mm. */
rc98("mfg-additive-2",2,{p:[
 {t:"p",x:"Typical FDM settings: 0.2 mm layers and 0.4 mm wide beads."},
 [{t:"vt",l:"θ = 45°",v:"step ≈ 0.2",u:"mm"},
  {t:"rel",x:"One layer height: half of each bead still sits on the layer below."}],
 [{t:"vt",l:"θ = 60°",v:"step ≈ 0.35",u:"mm"},
  {t:"rel",x:"Steeper wall, much bigger step: step ∝ $tan θ$"}],
 {t:"take",x:"Past 45° most of each bead hangs in air and droops."}],
 g:{at:2,q:"Tilt the overhang to 60°. The step per layer is about…",o:[
  ["0.27 mm",0,"That scales the step with the angle, 0.2 × 60/45. It goes as tan θ, which grows faster: tan 60° = 1.73."],
  ["0.35 mm",1,"0.2 mm × tan 60° = 0.2 × 1.73 ≈ 0.35 mm, most of a 0.4 mm bead."]]}});

/* 3 · Plain text, no interaction */
rc98("mfg-additive-2",3,{p:[
 {t:"p",x:"A **bridge** spans the gap between two supports."},
 {t:"p",x:"Short bridges print fine; long ones sag."},
 {t:"take",x:"Reorienting the part can often remove most supports entirely."}]});

/* ---------- mfg-additive-3 · Orientation and strength ---------- */
/* 0 · Guess (weakest across the layers) */
rc98("mfg-additive-3",0,{p:[
 {t:"p",x:"A printed part is built up in layers, stacked along the build direction."},
 {t:"p",x:"It's weakest **across** its layers, along the build direction: each layer bonds to the last only where they fuse."}],
 g:{at:1,q:"Pull a printed bar along the build direction, straight across its layers. Compared with pulling along the layers, it's…",o:[
  ["weaker",1,"The load has to pass through every layer-to-layer bond, and those are the weakest part of the print."],
  ["stronger",0,"Across the layers the load pulls on the bonds between them, which are weaker than the beads themselves."],
  ["about the same",0,"Printed parts aren't the same in every direction: the bonds between layers are weaker than the beads."]]}});

/* 1 · Value rows, no interaction. Example 50 MPa in-layer; 60% across: 0.6·50 = 30 MPa (within ½–¾). */
rc98("mfg-additive-3",1,{p:[
 {t:"p",x:"For FDM, strength across the layers is often around half to three quarters of the strength along them."},
 [{t:"vt",l:"Along the layers, example",v:"50",u:"MPa"},
  {t:"vt",l:"Across the layers, at 60%",v:"30",u:"MPa"}],
 {t:"p",x:"It drops further when each layer cools before the next one lands on it."}]});

/* 2 · Plain text, Fill "along" */
rc98("mfg-additive-3",2,{p:[
 {t:"p",x:"The same part can be strong or weak depending on how it sits on the bed."},
 {t:"p",x:"Run the main tensile load [[along]] the layers."},
 {t:"take",x:"Then the load pulls on continuous beads, not on the bonds between layers. Orientation is a design decision."}]});

/* 3 · Guess (perimeters beat infill) */
rc98("mfg-additive-3",3,{p:[
 {t:"p",x:"A printed part has **perimeter walls** around the outside and **infill** inside."},
 {t:"p",x:"Perimeters usually matter more: bending and twisting stresses peak at the outer surface and are small near the middle."}],
 g:{at:1,q:"A printed bracket bends too much. Which change helps more?",o:[
  ["more perimeter walls",1,"Extra walls add material at the surface, where bending and twisting stresses are largest."],
  ["denser infill",0,"Infill sits near the middle, where bending stress is small, so it adds weight and time for little stiffness."]]}});

/* ---------- mfg-additive-4 · Metal printing tradeoffs ---------- */
/* 0 · Plain text, no interaction */
rc98("mfg-additive-4",0,{p:[
 {t:"p",x:"Metal **powder bed fusion** melts metal powder with a laser, layer by layer."},
 {t:"p",x:"Rapid heating and cooling lock in **residual stress**."},
 {t:"take",x:"That stress can warp the part or crack its supports."}]});

/* 1 · Plain text, no interaction. The card's figure (LFIG17) draws the supports anchoring the part and carrying heat
   into the plate, so a Guess would be answered by the figure. */
rc98("mfg-additive-4",1,{p:[
 {t:"p",x:"In metal, supports also conduct heat away and anchor the part against distortion."},
 {t:"take",x:"So they're needed even where an overhang would otherwise hold."}]});

/* 2 · Guess (the tall build costs more time) */
rc98("mfg-additive-4",2,{p:[
 {t:"p",x:"For every layer, the machine spreads a fresh coat of powder, then the laser melts that layer's outline."},
 {t:"p",x:"A tall build costs more than a wide one: recoating takes the same time each layer, whatever the part area."},
 {t:"take",x:"Nesting several parts on one plate shares that time between them."}],
 g:{at:1,q:"Two builds hold the same volume of parts: one tall, one wide and flat. Which takes more machine time?",o:[
  ["the tall one",1,"It has more layers, and every layer costs a full recoat regardless of how much area gets melted."],
  ["the wide one",0,"Melting area takes laser time in both, and the volumes match. The tall build adds many more recoats."],
  ["about the same",0,"Equal volume means similar laser time, but the tall build has many more layers to recoat."]]}});

/* 3 · Process chain, no interaction */
rc98("mfg-additive-4",3,{p:[
 {t:"p",x:"Typical post-processing for a metal print:"},
 {t:"chain",items:["stress relief","remove supports","machine critical surfaces"],hl:0},
 {t:"p",x:"Stress relief comes while the part is still on the plate, so it doesn't warp when it's cut free."},
 {t:"p",x:"Machining then brings critical surfaces and holes to size."}]});

/* ---------- mfg-sheet-1 · Bending basics ---------- */
/* 0 · Plain text + change tiles, Fill "compresses" */
rc98("mfg-sheet-1",0,{p:[
 {t:"p",x:"Sheet metal parts are cut flat, then bent on a **press brake**."},
 {t:"p",x:"In the bend, the inside [[compresses]] and the outside stretches."},
 {t:"giv",lab:"Across the bend",rows:[["","↓","inside length","dn"],["","↑","outside length","up"]]}]});

/* 1 · Definition, no interaction. The card's figure (LFIG17) draws the neutral axis at K·t from the inside. */
rc98("mfg-sheet-1",1,{p:[
 {t:"p",x:"Somewhere between the inside and outside is the **neutral axis**, which keeps its length."},
 {t:"eq",lab:"Distance from the inside surface",eq:"y = K t",cap:"K is measured for each material and tooling",vars:[["K","K-factor, typically 0.3–0.5"],["t","sheet thickness"]]}]});

/* 2 · Guess (tighter radius, more stretch) */
rc98("mfg-sheet-1",2,{p:[
 {t:"p",x:"The inside radius R sets how sharply the sheet bends."},
 {t:"p",x:"A tighter radius stretches the outside more. Too tight, and the outside of the bend cracks."},
 {t:"take",x:"A common minimum inside radius is about one material thickness."}],
 g:{at:1,q:"Bend the same sheet around a tighter radius. The outside of the bend stretches…",o:[
  ["more",1,"The outer surface has to wrap a sharper curve while the neutral axis keeps its length, so it stretches further."],
  ["less",0,"A tighter bend stretches the outside more, not less. That's why too small a radius cracks it."]]}});

/* 3 · Plain text, Fill "across" */
rc98("mfg-sheet-1",3,{p:[
 {t:"p",x:"Rolling gives sheet metal a **grain** along the rolling direction."},
 {t:"p",x:"Bend lines [[across]] the grain crack less than bend lines along it."},
 {t:"take",x:"Lay out the flat pattern so tight bends run across the rolling direction."}]});

/* ---------- mfg-sheet-2 · Bend allowance and flat patterns ---------- */
/* 0 · Definition, no interaction */
rc98("mfg-sheet-2",0,{p:[
 {t:"p",x:"To cut the flat blank, you need its length before bending."},
 {t:"p",x:"**Bend allowance** BA: the length of the neutral axis through the bend."},
 {t:"take",x:"The neutral axis keeps its length, so that's the length the blank needs."}]});

/* 1 · Legend → formula, no interaction. The card's figure (LFIG17) draws the neutral-axis arc.
   90° = 1.5708 rad; R + Kt = 2 + 0.4·2 = 2.8 mm; 1.5708·2.8 = 4.398 ≈ 4.40 mm. */
rc98("mfg-sheet-2",1,{p:[
 {t:"eq",lab:"Bend allowance",eq:"BA = θ (R + K t)",cap:"θ in radians",vars:[["R","inside radius"],["t","thickness"],["K","K-factor"]]},
 {t:"vt",l:"90°, R = 2 mm, t = 2 mm, K = 0.4",v:"BA ≈ 4.40",u:"mm"}]});

/* 2 · Guess (ΔK = 0.1 → ΔBA ≈ 0.31 mm). ΔBA = θ·ΔK·t = 1.5708·0.1·2 = 0.314 mm. Wrong option 0.2 = ΔK·t without θ. */
rc98("mfg-sheet-2",2,{p:[
 {t:"p",x:"A wrong K-factor makes every flange slightly off. Take 2 mm sheet and a 90° bend."},
 [{t:"vt",l:"K off by 0.1",v:"ΔBA ≈ 0.31",u:"mm"},
  {t:"rel",x:"Small per bend, but it adds up over every bend in the part."}],
 {t:"p",x:"Shops calibrate K by bending test strips and measuring them."}],
 g:{at:1,q:"K is off by 0.1. How far off is the bend allowance?",o:[
  ["about 0.2 mm",0,"That's ΔK × t without the angle. Multiply by θ = 1.571 rad for 90°: 0.1 × 2 × 1.571 ≈ 0.31 mm."],
  ["about 0.3 mm",1,"ΔBA = θ ΔK t = 1.571 × 0.1 × 2 mm ≈ 0.31 mm."]]}});

/* 3 · Formula + worked step. L-bracket: 20 + 30 + 4.40 = 54.40 mm. */
rc98("mfg-sheet-2",3,{p:[
 {t:"eq",lab:"Flat length",eq:"L = ΣL_s + ΣBA",vars:[["L_s","each straight flat segment"],["BA","one bend allowance per bend"]]},
 [{t:"p",x:"One 90° bend between flats of 20 mm and 30 mm, BA = 4.40 mm:"},
  {t:"step",f:"L = 20 + 30 + 4.40",v:"54.4",u:"mm",fin:1}],
 {t:"p",x:"CAD sheet-metal tools do this from your K-factor."}]});

/* ---------- mfg-sheet-3 · Springback and flange limits ---------- */
/* 0 · Plain text, no interaction. The card's figure (LFIG17) draws the angle opening and the overbend, so nothing is
   blanked. */
rc98("mfg-sheet-3",0,{p:[
 {t:"p",x:"After bending, the elastic part of the strain recovers, so the part springs open a little: **springback**."},
 {t:"take",x:"Brakes overbend so the part springs back to the target angle."}]});

/* 1 · Guess (aluminum springs back more) → change tiles. S_y/E: mild steel 250/200,000 = 1.25×10⁻³;
   aluminum 250/70,000 = 3.6×10⁻³, about 3 times more. */
rc98("mfg-sheet-3",1,{p:[
 {t:"p",x:"How much a bend springs back depends on the material and on how loose the bend is."},
 [{t:"p",x:"It grows with $S_y/E$ (yield strength over modulus) and with R/t:"},
  {t:"giv",lab:"More springback with",rows:[["","↑","yield strength","up"],["","↓","modulus","dn"],["","↑","R/t, a looser bend","up"]]}],
 {t:"take",x:"Aluminum and high-strength steel spring back more than mild steel."}],
 g:{at:1,q:"Same bend in aluminum (E ≈ 70 GPa) instead of mild steel (E ≈ 200 GPa), similar yield strength. Springback is…",o:[
  ["more",1,"Springback grows with S_y/E. Aluminum's E is about a third of steel's, so it recovers about three times the elastic strain."],
  ["less",0,"A lower modulus means more elastic strain at the same stress, so more of the bend recovers."]]}});

/* 2 · Rule → formula → value. 4·2 + 2 = 10 mm. */
rc98("mfg-sheet-3",2,{p:[
 {t:"p",x:"The press-brake die needs something to push against, so a flange needs a minimum length."},
 {t:"eq",lab:"Minimum flange",eq:"b ≈ 4t + R",cap:"rule of thumb",vars:[["t","thickness"],["R","inside radius"]]},
 {t:"vt",l:"t = 2 mm, R = 2 mm",v:"b ≥ 10",u:"mm"}]});

/* 3 · Rule in words → formula, Fill "too close". 2.5·2 + 2 = 7 mm. */
rc98("mfg-sheet-3",3,{p:[
 {t:"p",x:"Holes [[too close]] to a bend get dragged into ovals as the sheet bends."},
 {t:"eq",lab:"Hole to bend line",eq:"d ≈ 2.5t + R",cap:"rule of thumb, minimum",vars:[["d","hole edge to bend line"],["t","thickness"],["R","inside radius"]]},
 {t:"vt",l:"t = 2 mm, R = 2 mm",v:"d ≥ 7",u:"mm"}]});

/* ---------- mfg-sheet-4 · Press brake tonnage ---------- */
/* 0 · Legend → formula, no interaction. The card's figure (LFIG17) draws the punch, sheet and V-die. The worked value
   is on card 1 (with the figure and the full legend it ran under Continue). 1.33·1000 mm·(2 mm)²·400 N/mm² / 16 mm = 1.33·1000·4·400/16 = 133,000 N = 133 kN. */
rc98("mfg-sheet-4",0,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["L","bend length"],["t","sheet thickness"],["UTS","tensile strength"],["V","die opening"]]},
 {t:"eq",lab:"Air bending force",eq:"F ≈ 1.33 L t^2 UTS / V",cap:"rule of thumb; N, mm, N/mm²"}]});

/* 1 · Plain text, Fill "raises". F ∝ 1/V. 8·2 = 16 mm. */
rc98("mfg-sheet-4",1,{p:[
 [{t:"p",x:"Die openings are often about 8 × t: 16 mm for 2 mm sheet."},
  {t:"vt",l:"1 m bend, UTS 400 MPa",v:"F ≈ 133",u:"kN"}],
 {t:"p",x:"A smaller V [[raises]] the force. A larger one lowers it, but makes the inside radius larger."},
 {t:"rel",x:"$F ∝ 1/V$: half the opening, twice the force."}]});

/* 2 · Scaling table, no interaction. F ∝ L t²/V. 1.1² = 1.21. */
rc98("mfg-sheet-4",2,{p:[
 {t:"p",x:"Same material. Change one thing at a time:"},
 {t:"tbl",head:["Change","Force"],rows:[["2× thickness t","× 4"],["2× bend length L","× 2"],["2× die opening V","÷ 2"]],hi:[0,1]},
 {t:"p",x:"Thickness dominates, as $t^2$. Sheet 10% over spec needs 21% more force and can overload a brake."}]});

/* 3 · Value row, no interaction. 0.15·16 = 2.4 mm; 0.17·16 = 2.72 ≈ 2.7 mm. */
rc98("mfg-sheet-4",3,{p:[
 {t:"p",x:"In air bending, the punch tip doesn't set the inside radius."},
 {t:"p",x:"It forms naturally at about 15–17% of the die opening V, for mild steel."},
 {t:"vt",l:"Mild steel, V = 16 mm",v:"R ≈ 2.4–2.7",u:"mm"}]});

try{NEWS.unshift({d:"2026-11-25",t:["Manufacturing cards (molding, 3D printing, sheet metal) now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b102",k:"rc102a",t:"Reveal cards: Manufacturing",c:"All 50 cards in the 12 manufacturing lessons. Try The molding cycle (Guess: which step takes longest) and Overhangs and supports (Guess: step at 60°).",go:["lesson","mfg-injection-molding-1"]})}catch(e){}

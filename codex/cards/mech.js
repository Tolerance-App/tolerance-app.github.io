/* ===== Mechanical reveal cards · staged against b114 =====
   New entries use rc98 (format in v98.js; style catalogue in docs/LEARNING_DESIGN.md).
   The three b98 entries stay in v98.js: mech-beams-2 cards 4 and 5, mech-thermodynamics-1 card 1. */

/* ---------- mech1 · Fasteners and keys ---------- */
/* 0 · Terms → takeaway, Guess (transmits torque). */
rc98("mech1",0,{p:[
 {t:"p",x:"A **fastener** such as a bolt squeezes parts together. A **hub** is the center of a part, such as a gear, that fits around a shaft."},
 {t:"p",x:"A **shaft key** sits in matching slots in the shaft and hub. It makes them turn together so the shaft can transmit torque, a turning effect, to the hub."},
 {t:"take",x:"A key stops relative rotation. A fitted bore centers the hub, and a shoulder or retainer locates it along the shaft."}],
 g:{at:1,q:"What motion does the key in matching slots mainly stop?",o:[
  ["Turning relative to the shaft",1,"The slot sides press on the key when the hub tries to turn relative to the shaft."],
  ["Sliding along the shaft",0,"The key bears against the slot sides to stop turning. A shoulder or retainer handles sliding."]]}});

/* 1 · Terms, Fill “domed”. */
rc98("mech1",1,{p:[
 {t:"p",x:"A **hex bolt** has a six-sided head and a straight threaded shank, the part below the head."},
 {t:"p",x:"A **carriage bolt** has a [[domed]] head. The round top has no wrench flats."},
 {t:"p",x:"A **lag screw** tapers to a point so it can thread into wood. A **hex nut** has internal threads that fit over a bolt."}]});

/* 2 · Compare head and nut features, no interaction. A jam nut is the second nut in a two-nut pair. */
rc98("mech1",2,{p:[
 {t:"p",x:"A **socket head cap screw** takes an Allen key and can sit in a counterbore, a flat-bottomed recess."},
 {t:"p",x:"A **button head** is low and rounded. A **flat head** sits flush in a countersink, a cone-shaped recess."},
 {t:"p",x:"A **nyloc nut** has a nylon ring that grips the threads to resist loosening."},
 {t:"p",x:"A **jam nut** is a thin second nut tightened against the first. A **flange nut** has a built-in washer to spread the clamp load."}]});

/* ---------- mech2 · Fits and gears ---------- */
/* 0 · Compare fits, Fill “smaller”. */
rc98("mech2",0,{p:[
 {t:"p",x:"A **fit** describes how tightly a shaft sits in a hole. A tolerance is the range of sizes a part is allowed to have."},
 {t:"p",x:"With a **clearance fit**, the shaft is always [[smaller]] than the hole."},
 {t:"p",x:"Even the largest allowed shaft leaves a gap in the smallest allowed hole."},
 {t:"p",x:"With an **interference fit** the shaft is larger at every allowed size. A **transition fit** can give either a gap or interference."}]});

/* 1 · Legend → formula with Guess. Tooth engagement gives ωout/ωin = Nin/Nout = 1/3. With Tω conserved, Tout/Tin = 3. */
rc98("mech2",1,{p:[
 {t:"vars",vars:[["N","number of gear teeth"],["r","tooth ratio"],["ω","shaft speed magnitude"],["T","torque magnitude"]]},
 {t:"eq",eq:"r = N_{out}/N_{in}",cap:"One meshing gear pair. In drives out."},
 [{t:"eq",eq:"ω_{out} = ω_{in}/r",cap:"Meshing teeth pass at the same rate."},
  {t:"eq",eq:"T_{out} = rT_{in}",cap:"At steady speed with negligible losses."}],
 {t:"take",x:"A larger driven gear turns more slowly and delivers more torque."}],
 g:{at:2,q:"The driven gear has three times the teeth. How do its speed and torque compare?",o:[
  ["⅓ the speed, 3× the torque",1,"Three times the teeth means one turn for three input turns. With no losses, torque triples."],
  ["⅓ the speed, ⅓ the torque",0,"The speed falls, but reducing torque too would lose power in an ideal pair."],
  ["3× the speed, ⅓ the torque",0,"That reverses the driver and driven gears. The larger gear takes longer to make a turn."]]}});

/* ---------- mech3 · Joints and fatigue ---------- */
/* 0 · Rule in words, no interaction. Existing figure shows the load path. */
rc98("mech3",0,{p:[
 {t:"p",x:"**Preload** is the bolt tension from tightening. It squeezes the plates together."},
 {t:"p",x:"While stiffer plates stay clamped, a pull mainly reduces their squeeze and adds little bolt tension."}]});

/* 1 · Terms → design change, Guess (larger fillet). */
rc98("mech3",1,{p:[
 {t:"p",x:"**Fatigue** is damage from repeated loading. Cracks often start at a **stress concentration**, a spot where local stress rises around a sharp corner, notch, or hole."},
 {t:"p",x:"A **fillet** is the rounded transition at a shaft shoulder, where the diameter changes."},
 {t:"take",x:"A larger fillet radius smooths the change in shape and reduces the local stress rise under the same load."}],
 g:{at:2,q:"Which change spreads the stress around the shoulder more evenly?",o:[
  ["Increase the fillet radius",1,"A gentler transition lowers the stress concentration."],
  ["Decrease the fillet radius",0,"A smaller radius sharpens the transition and raises the local stress."]]}});

/* ---------- mech4 · Cantilevers, stiffness and section orientation ---------- */
/* 0 · Terms → takeaway, Fill “together”. */
rc98("mech4",0,{p:[
 {t:"p",x:"**Deflection** is how far a beam moves under load. A **cross-section** is the shape you see when you cut across the beam."},
 {t:"p",x:"Material stiffness and cross-section geometry work [[together]] to control how far it bends for a given support and load."},
 {t:"take",x:"A beam can bend very little and still fail. Strength needs its own check."}]});

/* 1 · Model conditions, Guess (elastic recovery). */
rc98("mech4",1,{p:[
 {t:"p",x:"A **cantilever** is fixed at one end and free at the other. This beam is straight, slender, and uniform along its length."},
 {t:"p",x:"This model applies a **transverse tip force**, a force across the beam at its free end."},
 {t:"take",x:"It assumes small deflection and a linear-elastic material, so stress is proportional to strain and the material recovers when unloaded."}],
 g:{at:2,q:"What should happen after this model’s load is removed?",o:[
  ["The beam returns to its original shape",1,"Elastic deformation reverses when the load goes away."],
  ["The beam stays permanently bent",0,"A permanent bend means the material has left the elastic range."]]}});

/* 2 · Legend → formula, no interaction. */
rc98("mech4",2,{p:[
 {t:"vars",vars:[["δ","tip deflection"],["P","tip force"],["L","beam length"],["E","Young's modulus, material stiffness"],["I","second moment of area about the bending axis"]]},
 {t:"eq",eq:"δ = PL^3/(3EI)",cap:"Slender, linear-elastic cantilever with a tip force and small deflection."},
 {t:"take",x:"At the same load and length, a larger $EI$ means less deflection."}]});

/* 3 · Legend → formula, Fill “cubically”. Integrating y²dA gives b·h³/12; (2h)³/h³ = 8. */
rc98("mech4",3,{p:[
 {t:"vars",vars:[["b","rectangle width"],["h","depth in the bending direction"],["I","second moment of area, weighted by distance squared from the axis"]]},
 {t:"p",x:"At fixed width, $I$ grows [[cubically]] with depth."},
 {t:"eq",eq:"I = bh^3/12",cap:"Rectangular section. The axis passes through its center, parallel to b."},
 {t:"p",x:"Double the depth at fixed width and $I$ grows eightfold."}]});

/* 4 · Scaling table, Guess (both doubled). I ratios: 2, 2³ = 8, 2·2³ = 16; δ ratios are reciprocals. */
rc98("mech4",4,{p:[
 {t:"p",x:"Hold the tip force, beam length and material fixed. Change only the size of the rectangular section."},
 {t:"tbl",head:["Change","Area moment","Deflection"],rows:[["Double width","×2","÷2"],["Double depth","×8","÷8"],["Double both","×16","÷16"]],hi:[2,2]},
 {t:"rel",x:"Width counts once, depth counts three times: $δ ∝ 1/(bh^3)$."}],
 g:{at:1,q:"Double both width and depth. What happens to tip deflection?",o:[
  ["Drops to one sixteenth",1,"The width doubles I and the depth multiplies it by eight, so deflection falls by sixteen."],
  ["Drops to one eighth",0,"That accounts for the depth change only. Doubling the width divides deflection by two again."],
  ["Drops to one quarter",0,"That follows area. The second moment scales with width times depth cubed."]]}});

/* 5 · Compare pair, no interaction. 20·40³/12 = 106666.7 mm⁴, 40·20³/12 = 26666.7 mm⁴; δ ratio is 1/4. */
rc98("mech4",5,{p:[
 {t:"p",x:"Turn a rectangular bar on its edge. Its area stays the same, but its depth in the bending direction doubles and its width halves."},
 [{t:"vt",l:"Flat · 40 × 20 mm",v:"I ≈ 26,670",u:"mm^4"},
  {t:"vt",l:"Upright · 20 × 40 mm",v:"I ≈ 106,700",u:"mm^4"}],
 {t:"take",x:"Four times the second moment gives one quarter of the deflection at the same load, length and modulus."}]});

/* 6 · Worked example, no interaction. I = .020·.040³/12 = 1.066667×10⁻⁷ m⁴; δ = 100·.500³/(3·200e9·I) = .0001953125 m. */
rc98("mech4",6,{p:[
 {t:"p",x:"Use the upright section for a slender elastic cantilever and assume the tip moves only a small distance."},
 [{t:"giv",rows:[["P","100","N"],["L","500","mm"],["E","200","GPa"]]},
  {t:"giv",rows:[["b","20","mm"],["h","40","mm"],["I","106,700","mm^4"]]}],
 {t:"p",x:"In millimeter units, $E = 200,000$ N/mm². Use the unrounded second moment in the calculation."},
 {t:"step",f:"δ = PL^3/(3EI)",v:"0.1953",u:"mm",fin:1}]});

/* 7 · Rule in words → distinction, Fill “less”. */
rc98("mech4",7,{p:[
 {t:"p",x:"With the same force, supports and geometry, a higher $E$ makes this elastic cantilever bend [[less]]."},
 {t:"p",x:"Nominal bending stress, the stress predicted by the beam model, depends on the imposed force and section geometry. It stays the same."},
 {t:"take",x:"Young's modulus is a stiffness measure. A strength check needs separate data, such as the stress at which the material yields."}]});

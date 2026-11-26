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

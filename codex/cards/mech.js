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

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

/* ---------- mech-beams-2 · Beam calculations and design checks ---------- */
/* 0 · Rule in words, no interaction. */
rc98("mech-beams-2",0,{p:[
 {t:"p",x:"A beam resists bending better when more of its cross-section lies far from the bending axis through its middle."},
 {t:"take",x:"That is why adding height in the bending direction reduces deflection more than adding the same proportion of width."}]});

/* 1 · Legend → formula, Guess (doubling span). At fixed P, E, I the ratio is (2L)³/L³ = 8. */
rc98("mech-beams-2",1,{p:[
 {t:"vars",vars:[["δ","tip deflection"],["P","tip force across the beam"],["L","length from fixed end to tip"],["E","Young's modulus, material stiffness"],["I","second moment of area"]]},
 {t:"eq",eq:"δ = PL^3/(3EI)",cap:"Straight, slender, linear-elastic cantilever. Small deflection under a tip force."},
 {t:"take",x:"Length enters cubed. With everything else fixed, twice the length gives eight times the deflection. A larger $E$ or $I$ reduces it."}],
 g:{at:1,q:"With the same tip force, section and material, doubling the beam length makes deflection…",o:[
  ["Twice as large",0,"That treats length as linear. Each factor of length gets doubled."],
  ["Four times as large",0,"That treats length as squared. The tip displacement depends on length cubed."],
  ["Eight times as large",1,"Deflection scales with length cubed when the load, section and material are fixed."]]}});

/* 2 · Legend → formula, Fill “cubic”. Integrating y² over a rectangle gives bh³/12. */
rc98("mech-beams-2",2,{p:[
 {t:"p",x:"The second moment $I$ adds up the effect of area at different distances from the bending axis. Area farther out counts more."},
 {t:"vars",vars:[["b","width parallel to the axis"],["h","depth across the axis"]]},
 {t:"p",x:"A rectangular section has a [[cubic]] dependence on depth at fixed width."},
 {t:"eq",eq:"I = bh^3/12",cap:"Rectangular section, about the axis through its center parallel to b."},
 {t:"p",x:"A tube can put much of its area far from the axis without needing a solid center."}]});

/* 3 · Legend → formulas, no interaction. */
rc98("mech-beams-2",3,{p:[
 {t:"vars",vars:[["M","bending moment, or turning effect"],["P","tip force"],["L","span"],["c","distance from the centerline to the edge"],["I","second moment of area"],["σ","outer-edge stress magnitude"]]},
 [{t:"eq",eq:"M = PL",cap:"At the fixed end of a tip-loaded cantilever."},
  {t:"eq",eq:"σ = Mc/I",cap:"Nominal bending stress of a slender, linear-elastic beam."}],
 {t:"take",x:"Same force and shape: a higher modulus reduces deflection, and stress stays the same."}]});

/* 6 · Compare equal-area sections, no interaction. (25²−15²)/20² = 1; (25⁴−15⁴)/20⁴ = 2.125. */
rc98("mech-beams-2",6,{p:[
 {t:"p",x:"A 25 mm outer-diameter tube with a 15 mm centered hole has the same area as a solid 20 mm rod."},
 {t:"vars",vars:[["D","outside diameter"],["d","hole diameter, zero for a solid rod"]]},
 {t:"eq",eq:"I = π(D^4 − d^4)/64",cap:"Circular section, bending about a diameter through the center."},
 {t:"take",x:"The tube has 2.125 times the bending stiffness $EI$ at the same modulus. Its area lies farther from the bending axis."}]});

/* 7 · Compare checks, Fill “separately”. */
rc98("mech-beams-2",7,{p:[
 {t:"p",x:"Screen deflection and nominal stress [[separately]]. Each limit answers a different question."},
 {t:"p",x:"A deflection target limits motion. A stress target limits the calculated value, and a verified material allowable needs strength data."},
 {t:"take",x:"Check yielding, fatigue, local buckling, connections, and uncertain loads separately. Passing both screening targets cannot establish overall safety."}]});

/* ---------- mech-thermodynamics-1 · Heat, work, and energy ---------- */
/* 0 · Terms, Fill “can”. */
rc98("mech-thermodynamics-1",0,{p:[
 {t:"p",x:"A **closed system** contains a fixed amount of matter. Its boundary marks what is inside."},
 {t:"p",x:"Energy [[can]] cross that boundary."},
 {t:"p",x:"For example, a sealed piston can move and transfer energy without letting gas escape. An **isolated system** exchanges neither matter nor energy."},
 {t:"term",s:"U",x:"**Internal energy** is energy stored in the system at the microscopic level, such as in molecular motion."}]});

/* 2 · Rule in words, no interaction. Existing figure supplies ΔU = Q − W. */
rc98("mech-thermodynamics-1",2,{p:[
 {t:"p",x:"Heat input $Q$ is positive, and work output $W$ is positive. With negligible changes in motion and elevation, the difference is the change in internal energy $ΔU$."},
 {t:"p",x:"**Adiabatic** means no heat crosses the boundary. Work can still change internal energy and temperature."}]});

/* ---------- mech-thermodynamics-2 · Closed-system energy balances ---------- */
/* 0 · Legend → formula, Fill "subtract". */
rc98("mech-thermodynamics-2",0,{p:[
 {t:"p",x:"A **closed system** keeps the same matter inside its boundary. Heat and work can cross it."},
 {t:"vars",vars:[["ΔU","change in internal energy"],["Q","net heat into the system"],["W","net work out of the system"]]},
 {t:"p",x:"To find the change in internal energy, [[subtract]] work out from heat in."},
 {t:"eq",eq:"ΔU = Q − W",cap:"Neglect changes in bulk speed and elevation."}]});

/* 1 · Rule in words, no interaction. The piston figure gives the constant-pressure work formula. */
rc98("mech-thermodynamics-2",1,{p:[
 {t:"p",x:"For an ideal gas, $m$ is mass and $ΔT$ is final minus initial temperature."},
 {t:"p",x:"If the specific heat at constant volume $c_v$ stays fixed, $ΔU = mc_v ΔT$."}]});

/* 2 · Signs and units, Guess (work enters). (10³ N/m²)·m³ = 10³ N·m = 1 kJ. */
rc98("mech-thermodynamics-2",2,{p:[
 {t:"p",x:"In compression, volume decreases, so $ΔV$ is negative. The pressure is positive."},
 {t:"take",x:"At constant pressure, compression makes $pΔV$ negative. That is work entering the gas."},
 {t:"p",x:"Use $1$ kPa·m³ = $1$ kJ. Include any other work, such as energy delivered by a turning shaft."},
 {t:"p",x:"An **adiabatic** boundary passes no heat. A rigid tank cannot do moving-boundary work."}],
 g:{at:1,q:"Which way does the piston transfer work during compression?",o:[
  ["Into the gas",1,"The volume falls, so pΔV is negative. The sign convention counts work into the gas as negative."],
  ["Out of the gas",0,"That is the sign for expansion. A contracting volume makes pΔV negative."]]}});


/* ---------- mech-thermodynamics-3 · Flowing energy and enthalpy ---------- */
/* 0 · Legend → formula, Fill "includes". */
rc98("mech-thermodynamics-3",0,{p:[
 {t:"p",x:"A **control volume** is a region with a boundary that matter can cross. A **specific** quantity is measured per unit mass."},
 {t:"vars",vars:[["h","specific enthalpy"],["u","specific internal energy"],["p","pressure"],["ρ","mass per volume (density)"]]},
 {t:"p",x:"Enthalpy [[includes]] the work per mass needed to push fluid through the boundary."},
 {t:"eq",eq:"h = u + p/ρ",cap:"For fluid at pressure p and density ρ."}]});

/* 1 · Legend → formula, no interaction. Figure shows inlet, outlet and shaft. K = V²/2. */
rc98("mech-thermodynamics-3",1,{p:[
 {t:"p",x:"At each opening, $h$ is specific enthalpy and $K = V^2/2$ is kinetic energy per mass at speed $V$."},
 {t:"eq",eq:"w_s = h_1 − h_2 + K_1 − K_2",cap:"Shaft work out per mass. Steady, adiabatic flow from inlet 1 to outlet 2 at equal elevation."}]});

/* 2 · Rule in words → formula, Guess (shaft work enters). m²/s² = J/kg; (kg/s)(J/kg) = W. */
rc98("mech-thermodynamics-3",2,{p:[
 {t:"p",x:"Compare kinetic energy and enthalpy in J/kg when speed is in m/s."},
 {t:"p",x:"A steady adiabatic compressor raises the fluid’s enthalpy. Inlet and outlet speeds and elevations are equal."},
 {t:"p",x:"In this compressor, work enters through the shaft. Its work output per mass $w_s$ is negative."},
 {t:"eq",eq:"P_s = ṁw_s",cap:"Steady flow. ṁ is mass per second and P_s is shaft power out."},
 {t:"p",x:"In a steady adiabatic nozzle with no shaft or elevation change, a fall in enthalpy supplies a rise in kinetic energy."}],
 g:{at:2,q:"Which way does work cross the compressor boundary?",o:[
  ["Into the fluid",1,"The enthalpy rises and neither speed nor elevation changes. The shaft supplies the energy increase."],
  ["Out of the fluid",0,"Work output would require a drop in the energy carried by the flow, as in a turbine."]]}});


/* ---------- mech-thermodynamics-4 · Heat-engine feasibility ---------- */
/* 0 · Legend → formula, Fill "difference". */
rc98("mech-thermodynamics-4",0,{p:[
 {t:"p",x:"A **cyclic heat engine** returns to its initial state each cycle. Hot and cold **reservoirs** supply and absorb heat at fixed temperatures."},
 {t:"vars",vars:[["Q_h","heat received per cycle"],["Q_c","heat rejected per cycle"],["W","net work delivered per cycle"]]},
 {t:"p",x:"Net work is the [[difference]] between the incoming and outgoing heat magnitudes."},
 {t:"eq",eq:"W = Q_h − Q_c",cap:"Both heat magnitudes are positive; stored energy returns to its initial value."}]});

/* 1 · Definition and limit, no interaction. Figure gives the two-reservoir efficiency limit. */
rc98("mech-thermodynamics-4",1,{p:[
 {t:"p",x:"Efficiency $η = W/Q_h$ compares work out with heat in. Use kelvin for $T_h$ and $T_c$ in the two-reservoir limit."},
 {t:"p",x:"Only a **reversible** engine reaches this limit. Its ideal cycle generates no entropy."}]});

/* 2 · Legend → formula, Guess (negative entropy generation). S_gen equals net entropy gained by the reservoirs per cycle. */
rc98("mech-thermodynamics-4",2,{p:[
 {t:"p",x:"**Entropy generation** $S_{gen}$ measures irreversibility, the effect of processes such as friction or heat flow across a finite temperature gap."},
 {t:"eq",eq:"S_{gen} = Q_c/T_c − Q_h/T_h",cap:"Per complete cycle with only the two reservoirs. Use kelvin."},
 {t:"take",x:"A cycle can balance energy and still be impossible. The second law requires $S_{gen} ≥ 0$."}],
 g:{at:2,q:"A proposal balances heat and work but needs negative entropy generation. Is the proposal possible?",o:[
  ["Possible",0,"Energy conservation alone allows it, but the second law also has to hold."],
  ["Impossible",1,"The second law requires entropy generation to be zero or positive."]]}});


/* ---------- mech-heat-transfer-1 · Heat transfer mechanisms ---------- */
/* 0 · Definitions, Guess (radiation across vacuum). */
rc98("mech-heat-transfer-1",0,{p:[
 {t:"p",x:"**Conduction** transfers heat through matter without bulk motion, as in a stationary metal bar."},
 {t:"p",x:"**Convection** transfers heat between a surface and moving fluid. A fan can force motion; buoyancy can drive natural convection."},
 {t:"p",x:"**Radiation** transfers heat by electromagnetic waves."},
 {t:"take",x:"Radiation can carry heat across empty space."}],
 g:{at:3,q:"Which mechanism can carry heat between two surfaces with a vacuum between them?",o:[
  ["Conduction",0,"Conduction across the gap needs material between the surfaces."],
  ["Convection",0,"Convection needs a fluid in contact with a surface."],
  ["Radiation",1,"Electromagnetic waves can carry energy across a vacuum."]]}});

/* 1 · Symbols and model assumptions, no interaction. Formula is in the slab figure. */
rc98("mech-heat-transfer-1",1,{p:[
 {t:"p",x:"$Q̇$ is heat rate, $k$ is conductivity, $A$ is face area and $L$ is thickness."},
 {t:"p",x:"$ΔT$ is the temperature drop straight through the slab. Assume steady flow, uniform material and insulated edges."}]});

/* 2 · Scaling, Fill "halves". At fixed k, A and ΔT, Q̇(2L)/Q̇(L) = 1/2. */
rc98("mech-heat-transfer-1",2,{p:[
 {t:"p",x:"For steady conduction, fix conductivity, face area and the temperature difference. Double the slab thickness."},
 {t:"p",x:"The conductive heat rate [[halves]]."},
 {t:"rel",x:"At fixed $k$, $A$ and $ΔT$, $Q̇ ∝ 1/L$."},
 {t:"p",x:"A hot object can lose heat by several mechanisms at once. Across a vacuum gap, radiation can still carry heat."}]});


/* ---------- mech-heat-transfer-2 · Thermal resistance networks ---------- */
/* 0 · Definition → formula, Fill "less". */
rc98("mech-heat-transfer-2",0,{p:[
 {t:"p",x:"**Thermal resistance** $R$ measures how much temperature difference a path needs per watt of heat flow. Its unit is K/W."},
 {t:"p",x:"At a fixed temperature difference $ΔT$, larger resistance passes [[less]] heat per second."},
 {t:"eq",eq:"Q̇ = ΔT/R",cap:"Steady heat flow, from the hot side to the cold side."}]});

/* 1 · Legend → formula, Guess (slab resistance falls). At fixed L and A, R_cond(2k)/R_cond(k) = 1/2. */
rc98("mech-heat-transfer-2",1,{p:[
 {t:"vars",vars:[["L","slab thickness"],["k","thermal conductivity"],["A","area perpendicular to heat flow"],["h","convection coefficient: heat rate per area per kelvin"]]},
 {t:"eq",eq:"R_{cond} = L/(kA)",cap:"Steady, straight-through conduction in a uniform slab."},
 {t:"eq",eq:"R_{conv} = 1/(hA)",cap:"Uniform h and surface temperature over area A."}],
 g:{at:1,q:"Double only the slab conductivity k. What happens to the slab's thermal resistance?",o:[
  ["It halves",1,"Conductivity is in the denominator. Doubling k cuts the slab's resistance in half."],
  ["It doubles",0,"Better conductivity makes heat easier to transfer, so resistance falls."],
  ["It stays the same",0,"The size is unchanged, but the material property k matters too."]]}});

/* 2 · Worked value, no interaction. 60 K/(3 K/W) = 20.0 W. Series figure shows the same rate and each drop. */
rc98("mech-heat-transfer-2",2,{p:[
 {t:"p",x:"Resistances in **series** lie one after another on the same steady heat path. Use their sum as the total resistance."},
 {t:"step",f:"Q̇ = 60 K/(3 K/W)",v:"20.0",u:"W",fin:1},
 {t:"p",x:"Multiply the heat rate by a layer's resistance to find that layer's temperature drop."}]});


/* ---------- mech-heat-transfer-3 · Transient temperature response ---------- */
/* 0 · Legend → formula, Fill "small". Bi < 0.1 is a conventional lumped-capacitance guideline, not a derived limit. */
rc98("mech-heat-transfer-3",0,{p:[
 {t:"p",x:"A **lumped model** uses one temperature for the entire object."},
 {t:"p",x:"This works when resistance to heat flow inside is [[small]] compared with resistance to convection at the surface."},
 {t:"vars",vars:[["h","convection coefficient"],["k","object's thermal conductivity"],["L_c = V/A","object volume divided by exposed area"]]},
 {t:"eq",lab:"Biot number",eq:"Bi = hL_c/k",cap:"Convection at the exposed surface, conduction inside."},
 {t:"p",x:"$Bi < 0.1$ is a common guideline for treating internal temperature differences as small."}]});

/* 1 · Symbols and time constant, no interaction. Figure graphs exp(−t/τ). */
rc98("mech-heat-transfer-3",1,{p:[
 {t:"p",x:"The gap $θ = T − T_{air}$ compares the object with the air. Its initial value is $θ_0$, and $t$ is elapsed time."},
 {t:"eq",lab:"Time constant",eq:"τ = mc/(hA)",cap:"Fixed air temperature, constant h and properties. m is mass and c is specific heat."}]});

/* 2 · Scaling, Guess (both rise). exp(−1) = 0.367879; volume ∝ s³, area ∝ s², so τ and Bi ∝ s. */
rc98("mech-heat-transfer-3",2,{p:[
 {t:"p",x:"After one time constant $τ$, 36.8% of the initial gap from air temperature remains."},
 {t:"p",x:"Scale up the same solid shape. Keep material, convection coefficient and exposed-surface proportions fixed."},
 {t:"take",x:"Both $τ$ and $Bi$ rise. The volume grows faster than the exposed area, so both mass per area and $L_c$ increase."}],
 g:{at:2,q:"As the object gets larger, what happens to its time constant and Biot number?",o:[
  ["Both rise",1,"Both depend on volume per exposed area, which grows with linear size."],
  ["Both fall",0,"Area grows, but volume grows faster. Both ratios increase."],
  ["Both stay fixed",0,"Keeping material fixed keeps its properties fixed, not the ratio of volume to area."]]}});


/* ---------- mech-heat-transfer-4 · Cooling bottleneck decisions ---------- */
/* 0 · Definition → formula, no interaction. Add conductances 1/R_eq = 1/R_1 + 1/R_2. Figure draws the two paths and shared contact. */
rc98("mech-heat-transfer-4",0,{p:[
 {t:"p",x:"**Parallel** heat paths connect the same two temperature points. Each has the same temperature drop, and their heat rates add."},
 {t:"eq",lab:"Equivalent resistance",eq:"R_{eq} = R_1 R_2/(R_1 + R_2)",cap:"Two steady parallel paths with resistances R_1 and R_2."}]});

/* 1 · Legend → formulas, Fill "adds to". */
rc98("mech-heat-transfer-4",1,{p:[
 {t:"vars",vars:[["T_s","source temperature"],["T_a","ambient temperature"],["P","heat generated per second"],["R_c","shared contact resistance"]]},
 {t:"p",x:"The shared contact carries the full heat rate. Its resistance [[adds to]] the equivalent parallel resistance."},
 {t:"eq",eq:"T_s = T_a + P(R_c + R_{eq})",cap:"Steady state, all generated heat leaves through the network."},
 {t:"eq",eq:"Q̇_i = ΔT_b/R_i",cap:"Branch i carries heat rate Q̇_i through R_i; ΔT_b is the drop across the branches."}]});

/* 2 · Limit case, Guess (the shared contact sets the floor). (10 W)(2 K/W) = 20.0 K. */
rc98("mech-heat-transfer-4",2,{p:[
 {t:"giv",lab:"Fixed source and contact",rows:[["P","10","W"],["R_c","2","K/W"]]},
 {t:"p",x:"Imagine the downstream paths reach zero equivalent resistance. The shared contact still carries all the heat."},
 {t:"step",f:"T_s − T_a = PR_c",v:"20.0",u:"K",fin:1},
 {t:"take",x:"To get below this temperature rise at the same power, reduce the shared contact resistance."}],
 g:{at:2,q:"What is the source temperature rise over ambient in this limit?",o:[
  ["Zero",0,"Zero downstream resistance removes only the downstream drop. The contact still carries 10 W."],
  ["20 K",1,"The contact alone takes a 10 W × 2 K/W temperature drop."],
  ["40 K",0,"That would require another 2 K/W downstream, but the example sets it to zero."]]}});


/* ---------- mech-fluids-1 · Hydrostatic pressure ---------- */
/* 0 · Legend → formula, Guess (equal pressures). Equal surface pressure, density, gravity and depth give equal p. */
rc98("mech-fluids-1",0,{p:[
 {t:"p",x:"Two open containers hold still water. One is wide and one is narrow. Both water surfaces are at atmospheric pressure."},
 {t:"take",x:"At the same depth, both pressures are equal."},
 {t:"vars",vars:[["p","pressure at depth"],["p_0","pressure at the surface"],["ρ","fluid mass per volume"],["g","gravitational acceleration"],["h","depth below the surface"]]},
 {t:"eq",lab:"Hydrostatic pressure",eq:"p = p_0 + ρgh",cap:"still fluid, uniform density and gravity"}],
 g:{at:1,q:"How do the pressures compare at the same depth?",o:[
  ["Higher in the wide one",0,"More water can increase the total force on a wider floor. Pressure is force per unit area."],
  ["Higher in the narrow one",0,"The smaller width leaves the depth, density and surface pressure unchanged."],
  ["Equal in both",1,"Equal depth, density and surface pressure give equal pressure."]]}});

/* 1 · Worked example, no interaction. ρg = 1000·9.81 Pa/m = 9.81 kPa/m; ×10 m = 98.1 kPa; standard atmosphere = 101.325 kPa. */
rc98("mech-fluids-1",1,{p:[
 {t:"p",x:"Fresh water adds about 9.81 kPa per metre. Find the pressure increase $Δp$ at 10 m."},
 {t:"giv",lab:"Still fresh water · uniform density",rows:[["ρ","1,000","kg/m^3"],["g","9.81","m/s^2"],["h","10","m"]]},
 {t:"step",f:"Δp = ρgh",v:"98.1",u:"kPa",fin:1},
 {t:"p",x:"That is roughly one standard atmosphere (101 kPa) of extra pressure. A denser fluid, such as mercury, adds more pressure per metre."}]});

/* 2 · Rule in words → formula, Fill “relative to”. 220 + 101 = 321 kPa using rounded standard atmospheric pressure. */
rc98("mech-fluids-1",2,{p:[
 {t:"p",x:"A tire or tank gauge reads pressure [[relative to]] the surrounding atmosphere."},
 {t:"p",x:"Absolute pressure is measured from a vacuum. Add the local atmospheric pressure to the gauge reading."},
 {t:"eq",eq:"p_a = p_g + p_{atm}",vars:[["p_a","absolute pressure"],["p_g","gauge pressure"],["p_{atm}","local atmospheric pressure"]]},
 {t:"vt",l:"220 kPa gauge + 101 kPa air",v:"321",u:"kPa absolute"}]});

/* 3 · Plain text, Fill “perpendicular”. Local p increases with depth; force on an area integrates p over that area. */
rc98("mech-fluids-1",3,{p:[
 {t:"p",x:"In a still fluid, pressure at a point has the same value in every direction."},
 {t:"p",x:"The force from pressure acts [[perpendicular]] to the surface it pushes on."},
 {t:"p",x:"It pushes sideways on a vertical dam wall and down on a flat tank floor."},
 {t:"take",x:"The deepest spots see the greatest pressure. Total force also depends on how much area is loaded."}]});

/* ---------- mech-fluids-2 · Continuity and flow rate ---------- */
/* 0 · Rule in words → formula, Fill “the same”. 0.010·3 = 0.0300 m³/s; 1 m³ = 1000 L, so 30.0 L/s. */
rc98("mech-fluids-2",0,{p:[
 {t:"p",x:"Volume flow rate is the volume passing a cross-section each second. For steady flow at constant density, it is [[the same]] along an unbranched pipe."},
 {t:"vars",vars:[["Q","volume flow rate (m^3/s)"],["A","flow area (m^2)"],["V","mean flow speed (m/s)"]]},
 {t:"eq",eq:"Q = AV",cap:"mean speed normal to the cross-section"},
 {t:"vt",l:"0.010 m² at 3.00 m/s",v:"30.0",u:"L/s"}]});

/* 1 · Scaling, no interaction. The figure gives continuity. A₂/A₁ = (D₂/D₁)² = (1/2)² = 1/4; V₂/V₁ = 1/(1/4) = 4. */
rc98("mech-fluids-2",1,{p:[
 {t:"p",x:"Halve the diameter of a round pipe and the cross-sectional area falls to a quarter. The area scales with diameter squared."},
 {t:"take",x:"If the volume flow stays fixed, the mean speed in that section rises fourfold."}]});

/* 2 · Nozzle → branch comparison, Guess (same speed). Symmetric split: (Q/2)/(A/2) = Q/A. */
rc98("mech-fluids-2",2,{p:[
 {t:"p",x:"A hose nozzle narrows the exit, so at a given flow rate the water leaves faster than it moves in the hose."},
 {t:"take",x:"With an equal flow split and half the area per branch, the branch speed matches the main pipe."}],
 g:{at:1,q:"A pipe splits flow equally between two branches, each half the main pipe's area. The speed in each branch is…",o:[
  ["Half as high",0,"That accounts for the flow split but leaves the area unchanged."],
  ["The same",1,"Flow and area fall by the same factor, leaving their ratio unchanged."],
  ["Twice as high",0,"That accounts for the smaller area but sends the full flow through each branch."]]}});

/* 3 · Legend → formula, Fill “constant”. Mass conservation gives ρ₁Q₁ = ρ₂Q₂ in steady, sealed, unbranched flow. */
rc98("mech-fluids-2",3,{p:[
 {t:"p",x:"Gas density can change along a nozzle, changing the volume that passes per second."},
 {t:"p",x:"In steady flow through a nozzle with no leaks, the mass passing per second stays [[constant]]."},
 {t:"vars",vars:[["ṁ","mass flow rate (kg/s)"],["ρ","local density (kg/m^3)"],["Q","local volume flow rate (m^3/s)"]]},
 {t:"eq",eq:"ṁ = ρQ",cap:"uniform density at the cross-section"}]});

/* ---------- mech-fluids-3 · Bernoulli’s equation ---------- */
/* 0 · Legend → formula, no interaction. Integrating dp/ρ + V dV + g dz = 0 at constant ρ gives the kinetic term ρV²/2. */
rc98("mech-fluids-3",0,{p:[
 {t:"p",x:"A **streamline** follows the local flow direction. Each term below is a form of mechanical energy per unit volume along it."},
 {t:"vars",vars:[["p","static pressure, the pressure the fluid exerts locally"],["ρ","mass per volume"],["V","flow speed"],["g","gravitational acceleration"],["z","height above a reference level"]]},
 {t:"eq",lab:"Bernoulli’s equation",eq:"p + ½ρV^2 + ρgz = const.",cap:"along one streamline, steady, incompressible flow with negligible friction and no shaft work"}]});

/* 1 · Compare pair, Guess (pressure falls). With ρ = 1000 kg/m³, Δp = ½·1000·(3² − 1²) Pa = 4.00 kPa. */
rc98("mech-fluids-3",1,{p:[
 {t:"p",x:"A **Venturi** narrows and then widens. In a level tube, the same water flow passes through a smaller area at the **throat**."},
 {t:"take",x:"With negligible losses, the throat has higher speed and lower static pressure than the wide sections."},
 {t:"p",x:"At equal height with negligible losses, the rise in $½ρV^2$ equals the pressure drop."},
 {t:"vt",l:"Water speeds up from 1 to 3 m/s",v:"4.00",u:"kPa drop"}],
 g:{at:1,q:"In a level Venturi with negligible losses, what happens to static pressure as water enters the throat?",o:[
  ["It falls",1,"The kinetic term rises as water speeds up. At the same height, pressure falls by the same amount."],
  ["It rises",0,"A rise in speed raises the kinetic term. A rise in static pressure too would require added energy."],
  ["It stays the same",0,"The smaller area changes speed, so the static term must change to keep the sum constant."]]}});

/* 2 · Limits in words, Fill “drops”. At fixed V and z, a positive mechanical head loss hL gives p₂ − p₁ = −ρg hL. */
rc98("mech-fluids-3",2,{p:[
 {t:"p",x:"In a level pipe of constant diameter with steady water flow, static pressure [[drops]] along the pipe if friction matters."},
 {t:"p",x:"Friction converts mechanical energy to internal energy. **Head loss** measures the mechanical energy lost per unit weight."},
 {t:"take",x:"Use an energy balance that includes head loss, energy added by pumps, and energy extracted by turbines."}]});

/* 3 · Formula → worked value, no interaction. Equal p, Vsurface ≈ 0 imply ½V² = gh; √(2·9.81·5) = 9.90454 m/s. */
rc98("mech-fluids-3",3,{p:[
 {t:"p",x:"A large open tank drains through a small hole open to the same air. The surface moves slowly, and the pressure is atmospheric at both ends."},
 {t:"p",x:"The outlet speed $V$ equals the speed gained in a free fall of depth $h$. Here $g$ is gravitational acceleration."},
 {t:"eq",eq:"V = √{2gh}",cap:"steady or slowly draining, small opening"},
 {t:"vt",l:"5.00 m below the surface",v:"9.90",u:"m/s"}]});

/* ---------- mech-fluids-4 · Reynolds number and pipe losses ---------- */
/* 0 · Legend → formula, Guess (lower Re). The 2,300 and 4,000 boundaries are empirical guides for round pipes. */
rc98("mech-fluids-4",0,{p:[
 {t:"p",x:"Reynolds number $Re$ compares inertia, the tendency to keep moving, with viscosity, a fluid's internal friction."},
 {t:"vars",vars:[["ρ","density"],["V","mean flow speed"],["D","inside pipe diameter"],["μ","dynamic viscosity"]]},
 {t:"eq",eq:"Re = ρVD/μ",cap:"round pipe; higher viscosity lowers Re at fixed density, speed and diameter"},
 {t:"p",x:"Below about 2,300, flow is **laminar** (smooth layers). Above about 4,000, it is usually **turbulent** (fluctuating eddies). Between them, the flow is **transitional**."}],
 g:{at:2,q:"At the same density and speed in the same pipe, what does greater viscosity do to Reynolds number?",o:[
  ["Lowers it",1,"Viscosity is in the denominator. Raising it lowers Re."],
  ["Raises it",0,"Viscosity strengthens the resistance to flow. That reduces the ratio of inertia to viscosity."],
  ["Leaves it unchanged",0,"Density, speed and diameter are fixed, but viscosity still changes their ratio to viscous effects."]]}});

/* 1 · Rule in words → formula, Fill “inversely”. The figure gives Δp. Laminar wall stress τ = 8μV/D gives Darcy f = 8τ/(ρV²) = 64/Re; smooth turbulent example at Re = 62,500 gives 0.3164/Re^0.25 = 0.02001. */
rc98("mech-fluids-4",1,{p:[
 {t:"p",x:"For developed laminar flow in a round pipe, the Darcy factor $f$ varies [[inversely]] with Reynolds number."},
 {t:"p",x:"Laminar: $f = 64/Re$. In smooth turbulent pipe flow, $f$ is often near 0.020. It depends on $Re$ and wall roughness."}]});

/* 2 · Scaling, Guess (1/32). At fixed Q, V ∝ D⁻²; f(L/D)ρV²/2 ∝ D⁻¹D⁻⁴ = D⁻⁵ for fixed f, L and ρ. 2⁵ = 32. */
rc98("mech-fluids-4",2,{p:[
 {t:"p",x:"Compare two round pipes carrying the same volume per second. Keep length and fluid density fixed, and approximate the turbulent Darcy friction factor as unchanged."},
 {t:"take",x:"Doubling the diameter cuts the pressure drop to about one thirty-second."},
 {t:"eq",eq:"V ∝ 1/D^2",cap:"the same flow passes an area proportional to D squared"},
 {t:"eq",eq:"Δp ∝ 1/D^5",cap:"Darcy–Weisbach: one inverse power from L/D plus four from V squared"},
 {t:"p",x:"At the same volume flow rate, less pressure drop means less power delivered by the pump to the fluid."}],
 g:{at:1,q:"Double the diameter. What fraction of the original pressure drop remains?",o:[
  ["One half",0,"That tracks the change in length over diameter but keeps speed fixed."],
  ["One sixteenth",0,"The speed-squared term gives one sixteenth. Length over diameter adds another factor of one half."],
  ["One thirty-second",1,"Speed drops to a quarter. Squaring gives one sixteenth, and length over diameter halves."]]}});

/* 3 · Worked example, no interaction. D = 25 mm = 0.0250 m; Re = 1000·1.00·0.0250/0.00100 = 25,000. */
rc98("mech-fluids-4",3,{p:[
 {t:"giv",lab:"Water in a round pipe",rows:[["ρ","1,000","kg/m^3"],["V","1.00","m/s"],["D","25.0","mm"],["μ","0.00100","Pa·s"]]},
 {t:"p",x:"Use metres in the formula: $D = 0.0250$ m."},
 {t:"step",f:"Re = ρVD/μ",v:"25,000",u:"",fin:1},
 {t:"take",x:"That is well into the turbulent regime. Many water plumbing flows are turbulent at everyday operating rates."}]});

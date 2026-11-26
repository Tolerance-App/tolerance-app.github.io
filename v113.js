/* ===== v113 (2026-11-25): reveal cards for Aerospace =====
   1. All 61 remaining cards of the 16 Aerospace lessons as reveal cards (rc98, format in v98.js; style catalogue in
      docs/LEARNING_DESIGN.md). The 3 b98 test cards (aero2·1, aero-aerodynamics-5·1 and ·3) stay in v98.js.
      Cards only: `cards`, `qs`, lesson ids and question order are unchanged.
      Cards with an LFIG17 figure (aero1·0, aero-aerodynamics-1·2, -2·1, -3·0, -4·1, aero-propulsion-4·0,
      aero-stability-control-1·2, -2·1, -4·1) leave out what the figure draws and stay short.
      Guess on 19 cards (aero1·1, aero2·0, aerodynamics-1·2, -3·0, -3·2, -4·2, propulsion-1·2, -2·1, -3·2, -4·1,
      stability-control-1·0, -2·0, -2·4, -3·0, -3·4, -4·2, aerodynamics-5·2, cool-roche-1·3, ·5); Fill on 15 (aero1·2,
      aerodynamics-1·0, -3·1, -4·0, propulsion-1·1, -2·2, -2·3, -3·1, -4·3, stability-control-1·1, -2·2, -4·3,
      aerodynamics-5·4, cool-roche-1·1, ·2); 27 with neither.
      Renderer note (v98 unchanged): √{…} can't hold braced subscripts (√{C_{D0}/k} shows raw), so those formulas are
      written squared instead (C_L^2 = C_{D0}/k, V_s^2 = …).
      Indices below are 0-based (screen "idea i of n" = index + 1). */
try{FB.ver="b113"}catch(e){}

/* ---------- aero1 · Four forces ---------- */
/* 0 · Plain text, no interaction. Figure draws the four forces. */
rc98("aero1",0,{p:[
 {t:"p",x:"Four forces act on an airplane: lift up, weight down, thrust forward, drag back."},
 {t:"p",x:"In **steady level flight**, speed and height don't change, so nothing accelerates."},
 {t:"take",x:"So the forces cancel in pairs: lift equals weight, thrust equals drag (thrust along the flight path)."}]});

/* 1 · Scaling table, Guess. L ∝ V² with ρ, S, C_L fixed: 2V → ×4, 3V → ×9, ½V → ÷4. */
rc98("aero1",1,{p:[
 {t:"eq",lab:"Lift",eq:"L = ½ ρ V^2 S C_L",vars:[["ρ","air density"],["V","airspeed"],["S","wing area"],["C_L","lift coefficient"]]},
 {t:"p",x:"Hold $ρ$, $S$ and $C_L$ fixed and change only the speed."},
 {t:"tbl",head:["Speed","Lift"],rows:[["2× V","× 4"],["3× V","× 9"],["½ V","÷ 4"]],hi:[0,1]},
 {t:"p",x:"Lift grows with the square of speed: $L ∝ V^2$."}],
 g:{at:2,q:"Double the airspeed, everything else fixed. Lift…",o:[
  ["doubles",0,"That treats lift as proportional to V. Speed enters squared, through ½ρV²."],
  ["becomes 4×",1,"Lift goes as V², and 2² = 4."],
  ["becomes 8×",0,"That's a cube. Lift goes as V², so 2² = 4."]]}});

/* 2 · Value rows, Fill "faster". ISA: ρ = 1.225 kg/m³ at sea level, 0.4135 at 10 km. L = W at fixed C_L:
   V = √(2W/(ρSC_L)) ∝ 1/√ρ; √(1.225/0.4135) = √2.963 = 1.721. */
rc98("aero1",2,{p:[
 {t:"p",x:"$C_L$ is set by the wing's shape and its angle of attack. It has no units."},
 [{t:"vt",l:"Sea level",v:"ρ ≈ 1.225",u:"kg/m^3"},{t:"vt",l:"10 km up",v:"ρ ≈ 0.414",u:"kg/m^3"}],
 {t:"p",x:"Same weight, same $C_L$: in thinner air the wing has to fly [[faster]] to make the same lift."},
 [{t:"eq",eq:"V = √{2W / (ρ S C_L)}",cap:"level flight, lift = weight W, true airspeed"},
  {t:"rel",x:"At 10 km: $√{1.225 / 0.414}$ ≈ 1.72, so about 72 % faster."}]]});

/* ---------- aero2 · Orbits and rockets (card 1 is in v98.js) ---------- */
/* 0 · Formula → value rows, Guess. GM = 3.986×10¹⁴ m³/s². 200 km: r = 6,571 km, v = √(3.986e14/6.571e6) = √6.066e7
   = 7,789 m/s ≈ 7.8 km/s. GEO: r = 42,164 km (35,786 km up), v = √(3.986e14/4.2164e7) = √9.454e6 = 3,075 m/s. */
rc98("aero2",0,{p:[
 {t:"p",x:"An orbiting spacecraft is falling the whole time. It moves sideways so fast that the ground curves away as fast as it falls."},
 {t:"eq",lab:"Circular orbit speed",eq:"v = √{GM / r}",cap:"circular orbit, Earth's gravity only",vars:[["GM","Earth's gravitational parameter, 3.986 × 10^{14} m^3/s^2"],["r","distance from Earth's center"]]},
 {t:"vt",l:"Low orbit · 200 km up",v:"v ≈ 7.8",u:"km/s"},
 [{t:"vt",l:"Geostationary · 35,786 km up",v:"v ≈ 3.07",u:"km/s"},
  {t:"rel",x:"Farther out, slower orbit: $v ∝ 1/√{r}$"}]],
 g:{at:3,q:"A satellite much farther out, in geostationary orbit, moves…",o:[
  ["slower",1,"Gravity is weaker out there, so less speed keeps it in a circle: v = √(GM/r) ≈ 3.07 km/s."],
  ["faster",0,"A bigger circle doesn't need more speed. Gravity weakens with distance, so v = √(GM/r) falls."]]}});

/* ---------- aero-aerodynamics-1 · Pressure and airflow ---------- */
/* 0 · Rule in words → formula, Fill "speeds up". Incompressible continuity A₁V₁ = A₂V₂: half the area, twice the speed. */
rc98("aero-aerodynamics-1",0,{p:[
 {t:"p",x:"A **streamline** follows the local flow direction at every point. In steady flow, air particles travel along streamlines."},
 {t:"p",x:"Where streamlines squeeze together in a channel, the same flow passes through less area, so it [[speeds up]]."},
 {t:"eq",lab:"Continuity",eq:"A V = constant",cap:"steady, incompressible flow along a channel",vars:[["A","cross-section area"],["V","flow speed"]]},
 {t:"vt",l:"Half the area",v:"V × 2",u:""}]});

/* 1 · Terms → formula → value row, no interaction. q = 0.5 × 1.225 × 100² = 6,125 Pa ≈ 6.13 kPa. */
rc98("aero-aerodynamics-1",1,{p:[
 {t:"term",s:"p",x:"**Static pressure**: the local pressure of the air itself."},
 {t:"term",s:"q",x:"**Dynamic pressure**: a pressure scale set by the flow's speed."},
 {t:"eq",eq:"q = ½ ρ V^2",vars:[["ρ","air density"],["V","flow speed"]]},
 {t:"vt",l:"Sea-level air at 100 m/s",v:"q ≈ 6.13",u:"kPa"}]});

/* 2 · Formula + Guess (stagnation pressure higher). Figure draws the stagnation point and gives p₀ = p + ½ρV². */
rc98("aero-aerodynamics-1",2,{p:[
 {t:"eq",lab:"Bernoulli",eq:"p + ½ ρ V^2 = constant",cap:"along a streamline: steady, incompressible, no friction, no height change"},
 [{t:"p",x:"Where the flow slows, static pressure rises. Brought to rest, it reaches the highest pressure on the streamline:"},
  {t:"take",x:"Stagnation pressure $p_0 = p + q$."}]],
 g:{at:1,q:"Air slows to rest at the nose. Its pressure, compared with upstream, is…",o:[
  ["higher",1,"p + q stays constant, so when q drops to zero, p rises by q."],
  ["lower",0,"Low pressure goes with fast flow. Slowing the flow trades q for static pressure, so p rises."]]}});

/* ---------- aero-aerodynamics-2 · Aerodynamic force coefficients ---------- */
/* 0 · Legend → formula, no interaction. */
rc98("aero-aerodynamics-2",0,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["q","dynamic pressure, ½ρV^2"],["S","reference area"],["C_L, C_D","lift and drag coefficients, no units"]]},
 [{t:"eq",lab:"Lift",eq:"L = q S C_L"},{t:"eq",lab:"Drag",eq:"D = q S C_D"}],
 {t:"p",x:"Dividing out $q$ and $S$ leaves a pure number. That lets a wind-tunnel model and the full-size wing be compared, if their Mach and Reynolds numbers match."}]});

/* 1 · Plain text, no interaction. Figure draws S in plan view and L ⟂ V, D ∥ V. */
rc98("aero-aerodynamics-2",1,{p:[
 {t:"p",x:"For a wing, the reference area $S$ is usually the planform: its outline seen from above."},
 {t:"p",x:"The coefficients aren't fixed numbers. They change with angle of attack, and also with Mach and Reynolds number, so a new speed can mean new coefficients."}]});

/* 2 · Worked example, no interaction. q = ½·1.225·50² = 1,531 Pa. C_L = 10,000/(1,531 × 16) = 10,000/24,500 = 0.408.
   L/D = 0.408/0.034 = 12.0. */
rc98("aero-aerodynamics-2",2,{p:[
 {t:"giv",lab:"Steady level flight · lift = weight",rows:[["W","10,000","N"],["S","16","m^2"],["q","1,531","Pa"],["C_D","0.034",""]]},
 {t:"step",f:"C_L = W / (q S)",v:"0.408",u:""},
 {t:"step",f:"L/D = C_L / C_D",v:"12.0",u:"",fin:1},
 {t:"p",x:"$L = W$ holds when thrust has no vertical part. $L/D = C_L/C_D$ only if both coefficients use the same $S$."}]});

/* ---------- aero-aerodynamics-3 · Stall during maneuvers ---------- */
/* 0 · Terms, true/false Guess. Figure draws α from the chord line and the banked turn. */
rc98("aero-aerodynamics-3",0,{p:[
 {t:"term",s:"α",x:"**Angle of attack**: the angle between the wing's chord line and the oncoming air."},
 {t:"p",x:"Past a critical $α$, the flow separates from the upper surface and lift drops: a **stall**."},
 {t:"take",x:"α is measured from the oncoming air, not the horizon. A wing stalls at its critical α in any attitude."}],
 g:{at:2,q:"True or false: a nose-low airplane can't stall.",o:[
  ["True",0,"Attitude isn't α: a dive pull-out can stall nose-low."],
  ["False",1,"Stall depends on α, measured from the oncoming air, not on attitude."]]}});

/* 1 · Rule in words → formula, Fill "rises". */
rc98("aero-aerodynamics-3",1,{p:[
 {t:"p",x:"A wing can only reach a certain lift coefficient before it stalls: $C_{L,max}$."},
 {t:"p",x:"Pull more g and the wing must make more lift at the same speed, so the stall speed [[rises]]."},
 {t:"eq",lab:"Stall speed",eq:"V_s^2 = 2nW / (ρ S C_{L,max})",cap:"steady flight at load factor n",vars:[["V_s","stall speed"],["n","load factor L/W: 1 in level flight"],["W","weight"],["ρ","air density"],["S","wing area"]]}]});

/* 2 · Scaling table, Guess. n = 1/cos φ: 45° → 1/0.7071 = 1.414, √1.414 = 1.189; 60° → 2, √2 = 1.414 (+41 %). */
rc98("aero-aerodynamics-3",2,{p:[
 {t:"p",x:"In a coordinated level turn at bank angle $φ$, lift tilts with the wings, and its vertical part must still hold the weight."},
 {t:"eq",eq:"n = 1 / cos φ",cap:"coordinated, level turn"},
 {t:"tbl",head:["Bank $φ$","$n$","Stall speed"],rows:[["0°","1","× 1"],["45°","1.41","× 1.19"],["60°","2","× 1.41"]],hi:[2,2]},
 {t:"p",x:"Stall speed grows with $√{n}$: a 60° bank raises it about 41 %."}],
 g:{at:2,q:"At 60° bank, n = 2. The stall speed…",o:[
  ["doubles",0,"That's n itself. Stall speed goes as √n, and √2 ≈ 1.41."],
  ["rises about 41 %",1,"V_stall ∝ √n, and √2 ≈ 1.41."],
  ["stays the same",0,"The stall angle stays the same, but the wing needs twice the lift, so it reaches that angle at a higher speed."]]}});

/* ---------- aero-aerodynamics-4 · Minimum drag tradeoffs ---------- */
/* 0 · Legend → formula, Fill "with the square of". */
rc98("aero-aerodynamics-4",0,{p:[
 {t:"p",x:"Part of a wing's drag comes from making lift: **induced drag**. In a simple model it grows [[with the square of]] the lift coefficient."},
 {t:"eq",lab:"Drag polar",eq:"C_D = C_{D0} + k C_L^2",cap:"simple parabolic model",vars:[["C_{D0}","baseline drag coefficient, constant"],["k","induced-drag factor"]]},
 {t:"p",x:"The first term doesn't change with lift. The second is the induced drag."}]});

/* 1 · Formula, no interaction. Figure plots both terms and V₀. D = qS(C_D0 + kC_L²) with C_L = W/(qS).
   d/dq: SC_D0 = kW²/(q²S) → terms equal → C_L² = C_D0/k. */
rc98("aero-aerodynamics-4",1,{p:[
 {t:"eq",lab:"Drag in level flight",eq:"D = qSC_{D0} + kW^2/(qS)",cap:"steady level flight, lift = weight W"},
 [{t:"p",x:"The first term grows with speed; the induced term shrinks. Drag is lowest where they're equal:"},{t:"eq",eq:"C_L^2 = C_{D0} / k"}]]});

/* 2 · Compare pair, Guess. P = DV ∝ aV³ + b/V. Min D: aV⁴ = b. Min P: 3aV⁴ = b → V_P/V₀ = 3^(−1/4) = 0.760;
   there induced/baseline = b/(aV⁴) = 3. */
rc98("aero-aerodynamics-4",2,{p:[
 {t:"p",x:"Power required is drag times speed: $P = D V$."},
 [{t:"pc",l:"Minimum drag",c:"induced = baseline",v:"V_0"},
  {t:"pc",l:"Minimum power",c:"induced = 3 × baseline",v:"≈ 0.76 V_0"}],
 {t:"p",x:"Both speeds must stay above the stall speed."}],
 g:{at:1,q:"Compared with the minimum-drag speed V₀, the minimum-power speed is…",o:[
  ["lower",1,"P = DV: just below V₀ drag barely changes, but V falls, so power keeps dropping. It bottoms out near 0.76 V₀."],
  ["higher",0,"Above V₀ both drag and speed rise, so P = DV only grows."]]}});

/* ---------- aero-propulsion-1 · Thrust from momentum ---------- */
/* 0 · Legend → formula, no interaction. */
rc98("aero-propulsion-1",0,{p:[
 {t:"p",x:"An engine makes thrust by pushing mass backward. Thrust is the momentum it adds each second."},
 {t:"vars",lab:"First, the symbols",vars:[["ṁ","mass flow, kg/s"],["V_e","exhaust speed"],["V_0","flight speed"]]},
 {t:"eq",lab:"Thrust",eq:"F = ṁ (V_e − V_0)",cap:"exhaust at ambient pressure; otherwise add a pressure term"}]});

/* 1 · Plain text → formula, Fill "drops out". */
rc98("aero-propulsion-1",1,{p:[
 {t:"p",x:"A jet takes in air already moving at flight speed $V_0$. Only the speed it adds counts."},
 {t:"p",x:"A rocket carries all its propellant, so nothing comes in from outside and the $V_0$ term [[drops out]]:"},
 {t:"eq",eq:"F = ṁ V_e",cap:"rocket, exhaust at ambient pressure"}]});

/* 2 · Scaling table, Guess. F = 30 kN. ṁ = 100: ΔV = 300 m/s, ½ṁΔV² = 0.5·100·300² = 4.5 MW (= ½FΔV = 0.5·30,000·300).
   ṁ = 1,000: ΔV = 30, 0.5·1,000·30² = 0.45 MW. Ratio 1/10. Power in the still air's frame. */
rc98("aero-propulsion-1",2,{p:[
 {t:"p",x:"The same thrust can come from a lot of air pushed gently or a little air pushed hard: $F = ṁ ΔV$."},
 {t:"tbl",head:["Mass flow","Speed added","Power left in jet"],rows:[["100 kg/s","300 m/s","4.5 MW"],["1,000 kg/s","30 m/s","0.45 MW"]],hi:[1,2]},
 {t:"p",x:"Energy left in the jet each second is $½ ṁ ΔV^2 = ½ F ΔV$. For a set thrust, a slower jet wastes less, which is why airliners use big fans."}],
 g:{at:1,q:"Same 30 kN of thrust from ten times the air, sped up a tenth as much. Power wasted in the jet…",o:[
  ["stays the same",0,"Thrust is the same, but the wasted power is ½FΔV, which falls with the speed added."],
  ["drops to a tenth",1,"Wasted power is ½FΔV. Same F, a tenth of the ΔV, a tenth of the waste."],
  ["grows ten times",0,"More air does carry energy away, but ½ṁΔV² goes with ΔV squared: 10× the mass at 1/100 the ΔV² is a tenth."]]}});

/* 3 · Worked example, no interaction. 100 × (500 − 200) = 30,000 N. */
rc98("aero-propulsion-1",3,{p:[
 {t:"giv",lab:"Jet engine in flight",rows:[["ṁ","100","kg/s"],["V_0","200","m/s"],["V_e","500","m/s"]]},
 {t:"step",f:"V_e − V_0",v:"300",u:"m/s"},
 {t:"step",f:"F = 100 × 300",v:"30,000",u:"N",fin:1},
 {t:"p",x:"That's 30 kN, with the exhaust at ambient pressure and the fuel's own small mass flow left out."}]});

/* ---------- aero-propulsion-2 · Specific impulse ---------- */
/* 0 · Legend → formula → value row, no interaction. 3,000/9.81 = 305.8 s. */
rc98("aero-propulsion-2",0,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["F","thrust"],["ṁ","propellant mass flow"],["g_0","standard gravity, 9.81 m/s^2"],["V_e","exhaust speed"]]},
 {t:"eq",lab:"Specific impulse",eq:"I_{sp} = F / (ṁ g_0) = V_e / g_0",cap:"V_e is the effective exhaust speed"},
 {t:"p",x:"Dividing by $g_0$ is a convention: it gives seconds in any unit system."},
 {t:"vt",l:"$V_e$ = 3,000 m/s",v:"I_{sp} ≈ 306",u:"s"}]});

/* 1 · Value rows, Guess. Typical: solid ≈ 250 s (matches the lesson's ranking question), RP-1/LOX 300–350 s, LH2/LOX ≈ 450 s in vacuum (≈ 365–390 at sea level). v_e ∝ √(T/M). */
rc98("aero-propulsion-2",1,{p:[
 {t:"p",x:"Higher $I_{sp}$ means more impulse from each kilogram of propellant. Typical values:"},
 [{t:"vt",l:"Solid rocket",v:"≈ 250",u:"s"},{t:"vt",l:"Kerosene + oxygen",v:"300–350",u:"s"}],
 [{t:"vt",l:"Hydrogen + oxygen, vacuum",v:"≈ 450",u:"s"},
  {t:"rel",x:"At similar flame temperature, lighter exhaust molecules leave faster."}]],
 g:{at:2,q:"A hydrogen–oxygen engine, compared with kerosene–oxygen, gets…",o:[
  ["higher Isp",1,"Its exhaust is light (water vapor and spare hydrogen), so it leaves faster: about 450 s."],
  ["lower Isp",0,"Hydrogen's low density makes the tanks big, but per kilogram of propellant it gives more impulse."]]}});

/* 2 · Compare pair, Fill "far below". Ion Isp 1,500–4,000 s; thrust tens of mN up to ~0.25 N. */
rc98("aero-propulsion-2",2,{p:[
 {t:"p",x:"Ion engines accelerate charged atoms with electric fields, to exhaust speeds combustion can't reach."},
 {t:"p",x:"Their thrust is [[far below]] the weight of the spacecraft they push, so they can't launch anything."},
 [{t:"pc",l:"Chemical rocket",c:"Isp 250–450 s",v:"kN to MN"},
  {t:"pc",l:"Ion engine",c:"Isp 1,500–4,000 s",v:"millinewtons",warn:1}],
 {t:"take",x:"In space, a tiny push kept up for months adds up to a large Δv on very little propellant."}]});

/* 3 · Value rows, Fill "more than ten times". Cruise TSFC ≈ 0.5–0.55 lb/(lbf·h) → I_sp = 3,600/0.55 = 6,545 s ≈ 6,500.
   6,500/450 = 14.4. */
rc98("aero-propulsion-2",3,{p:[
 {t:"p",x:"A jet engine breathes air from outside. Only the fuel it carries counts as propellant."},
 {t:"p",x:"So its $I_{sp}$ comes out [[more than ten times]] the best rocket's:"},
 [{t:"vt",l:"Hydrogen + oxygen rocket",v:"≈ 450",u:"s"},{t:"vt",l:"Airliner turbofan, cruise",v:"≈ 6,500",u:"s"}],
 {t:"p",x:"The catch: it needs outside air, so it can't work above the atmosphere."}]});

/* ---------- aero-propulsion-3 · Staging a rocket ---------- */
/* 0 · Formula + plain text, no interaction. */
rc98("aero-propulsion-3",0,{p:[
 {t:"eq",lab:"Rocket equation",eq:"Δv = V_e ln(m_0 / m_f)",cap:"constant V_e, no gravity or drag losses",vars:[["m_0","mass at ignition"],["m_f","mass at burnout"]]},
 {t:"p",x:"Empty tanks and engines stay in $m_f$. They keep being accelerated after their propellant is gone, which holds the mass ratio down."}]});

/* 1 · Rule in words → formula, Fill "adds". */
rc98("aero-propulsion-3",1,{p:[
 {t:"p",x:"Staging drops empty structure partway up, so the next stage starts lighter."},
 {t:"p",x:"Each stage's Δv [[adds]] to the last, and each uses the mass ratio of only its own part of the stack:"},
 {t:"eq",eq:"Δv_{total} = Δv_1 + Δv_2 + …",cap:"each stage: Δv = V_e ln(m_0 / m_f) for the stack it pushes"}]});

/* 2 · Worked steps, Guess. Structure 10 % of fueled mass, no payload: m₀/m_f = 10, ln 10 = 2.303. */
rc98("aero-propulsion-3",2,{p:[
 {t:"p",x:"One stage, no payload. Structure is 10 % of the fueled mass, so burnout leaves a tenth."},
 {t:"step",f:"m_0 / m_f",v:"10",u:""},
 {t:"step",f:"Δv = V_e ln 10",v:"≈ 2.3 V_e",u:"",fin:1},
 {t:"take",x:"Even with no payload, this stage can't beat about 2.3 times its exhaust speed."}],
 g:{at:2,q:"With a mass ratio of 10, the most Δv this stage can give is about…",o:[
  ["10 × exhaust speed",0,"That forgets the logarithm. Δv grows with ln(m₀/m_f), not with the ratio itself."],
  ["2.3 × exhaust speed",1,"Δv = V_e ln 10, and ln 10 ≈ 2.3."],
  ["0.9 × exhaust speed",0,"0.9 is the propellant fraction. The rocket equation uses ln of the mass ratio: ln 10 ≈ 2.3."]]}});

/* 3 · Value rows, no interaction. Kerosene vacuum V_e ≈ 3.3 km/s (I_sp ≈ 336 s): 2.303 × 3.3 = 7.60 km/s.
   9.4 − 7.6 = 1.8 km/s short. */
rc98("aero-propulsion-3",3,{p:[
 {t:"p",x:"Low orbit needs about 7.8 km/s of orbital speed, plus what gravity and drag take on the way up."},
 [{t:"vt",l:"Low orbit, with losses",v:"Δv ≈ 9.4",u:"km/s"},
  {t:"vt",l:"One kerosene stage",v:"≤ 7.6",u:"km/s"}],
 {t:"rel",x:"With $V_e$ ≈ 3.3 km/s and 10 % structure: nearly 2 km/s short, so orbital rockets use two or more stages."}]});

/* ---------- aero-propulsion-4 · Bypass ratio and efficiency ---------- */
/* 0 · Plain text, no interaction. Figure draws the split and gives the ratio. */
rc98("aero-propulsion-4",0,{p:[
 {t:"p",x:"A turbofan splits the air it takes in. The **core** stream goes through the compressor, burners and turbine."},
 {t:"p",x:"The **bypass** stream goes around the core, pushed by the fan alone."},
 {t:"take",x:"Bypass ratio = bypass flow ÷ core flow. A ratio of 10 sends 10 kg around the core for each 1 kg through it."}]});

/* 1 · Formula → value rows, Guess. 2/(1 + 3) = 0.50; 2/(1 + 1.5) = 0.80. */
rc98("aero-propulsion-4",1,{p:[
 {t:"eq",lab:"Propulsive efficiency",eq:"η_p ≈ 2 / (1 + V_e / V_0)",cap:"exhaust at ambient pressure, fuel mass left out",vars:[["V_e","exhaust speed"],["V_0","flight speed"]]},
 {t:"vt",l:"Jet at 3× flight speed",v:"η_p = 50",u:"%"},
 [{t:"vt",l:"Jet at 1.5× flight speed",v:"η_p = 80",u:"%"},
  {t:"rel",x:"Exhaust closer to flight speed, higher efficiency."}]],
 g:{at:2,q:"Slow the jet to 1.5× flight speed. Propulsive efficiency…",o:[
  ["rises",1,"V_e/V₀ falls from 3 to 1.5, so 2/(1 + V_e/V₀) rises from 50 % to 80 %. Each kilogram of air gives less thrust, though."],
  ["falls",0,"A slower jet gives less thrust per kilogram, but it leaves less energy in the wake, so efficiency rises."]]}});

/* 2 · Compare pair, no interaction. Airliner BPR 9–12 (e.g. LEAP ≈ 11, GTF ≈ 12); fighters ≈ 0.3–1. */
rc98("aero-propulsion-4",2,{p:[
 {t:"p",x:"A high bypass ratio moves a lot of air in a big, slow jet, making thrust with less waste."},
 [{t:"pc",l:"Airliner",c:"cruise near Mach 0.8",v:"BPR 9–12"},
  {t:"pc",l:"Fighter",c:"compact, flies supersonic",v:"BPR 0.3–1"}],
 {t:"p",x:"A low-bypass engine is slim, and its fast jet still makes thrust at high flight speed."}]});

/* 3 · Plain text + change tiles, Fill "slower". Tip speed = ω r: a bigger fan at the same rpm has faster tips. */
rc98("aero-propulsion-4",3,{p:[
 {t:"p",x:"A higher bypass ratio needs a bigger fan for the same core, and the fan can't grow forever."},
 {t:"giv",lab:"A bigger fan brings",rows:[["","↑","weight","up"],["","↑","nacelle drag","up"],["","↓","ground clearance","dn"],["","↑","fan-tip speed","up"]]},
 {t:"p",x:"To keep tip speed down, a bigger fan has to turn [[slower]]. Some engines put a gearbox between fan and turbine for that."}]});

/* ---------- aero-stability-control-1 · Restoring pitch moments ---------- */
/* 0 · Plain text, true/false Guess. */
rc98("aero-stability-control-1",0,{p:[
 {t:"p",x:"Disturb an aircraft's angle of attack, and it starts to pitch one way or the other."},
 {t:"p",x:"**Static stability** is about that first tendency. A stable aircraft makes a pitching moment that opposes the disturbance."},
 {t:"take",x:"Static stability only sets the first push. Whether the oscillations then die out depends on damping: dynamic stability."}],
 g:{at:2,q:"True or false: a statically stable aircraft always settles back without growing oscillations.",o:[
  ["True",0,"That mixes static and dynamic stability. A restoring moment can overshoot; without enough damping the swings can grow."],
  ["False",1,"Static stability is only the initial tendency. Damping decides whether the motion dies out."]]}});

/* 1 · Legend → formula, Fill "pushes back". */
rc98("aero-stability-control-1",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["M","pitching moment, N·m, positive nose-up"],["Δα","change in angle of attack, rad"],["k","restoring stiffness, N·m/rad"]]},
 {t:"p",x:"In a stable aircraft the moment [[pushes back]] against the disturbance, so the model has a minus sign:"},
 {t:"eq",lab:"Local pitch model",eq:"M = −k Δα",cap:"small disturbances, linear teaching model"}]});

/* 2 · Compare pair, no interaction. Figure draws Δα > 0 and the nose-down M. */
rc98("aero-stability-control-1",2,{p:[
 {t:"p",x:"Take a positive disturbance: the nose pitches up, $Δα$ > 0."},
 [{t:"pc",l:"$k$ > 0",c:"nose-down moment",v:"restoring"},
  {t:"pc",l:"$k$ < 0",c:"nose-up moment",v:"reinforcing",warn:1}]]});

/* 3 · Worked example, no interaction. −10 × 0.1 = −1 N·m. */
rc98("aero-stability-control-1",3,{p:[
 {t:"giv",lab:"Local pitch model",rows:[["k","10","N·m/rad"],["Δα","0.1","rad"]]},
 {t:"step",f:"M = −k Δα = −10 × 0.1",v:"−1",u:"N·m",fin:1},
 {t:"p",x:"Negative means nose-down: the moment opposes the disturbance. On its own that doesn't show the oscillations will decay."}]});

/* ---------- aero-stability-control-2 · Center of gravity margin ---------- */
/* 0 · Terms, Guess. */
rc98("aero-stability-control-2",0,{p:[
 {t:"term",s:"NP",x:"**Neutral point**: the center-of-gravity position where the pitch moment stops changing with angle of attack."},
 {t:"term",s:"SM",x:"**Static margin**: how far the center of gravity sits ahead of the neutral point, as a fraction of chord."},
 {t:"take",x:"Center of gravity ahead of the neutral point: positive static margin and a restoring moment. The neutral point is for a stated control condition, such as stick fixed."}],
 g:{at:2,q:"Put the center of gravity ahead of the neutral point. The static margin is…",o:[
  ["positive",1,"Static margin measures how far the center of gravity sits ahead of the neutral point, so ahead is positive."],
  ["negative",0,"Negative margin is a center of gravity behind the neutral point, where disturbances grow."]]}});

/* 1 · Formula, no interaction. Figure draws x_cg, x_np and c. */
rc98("aero-stability-control-2",1,{p:[
 {t:"eq",lab:"Static margin",eq:"SM = (x_{np} − x_{cg}) / c",cap:"both positions measured aft from the same reference",vars:[["x_{np}","neutral point"],["x_{cg}","center of gravity"],["c","mean aerodynamic chord"]]},
 {t:"p",x:"$SM$ = 0.1: the center of gravity is a tenth of a chord ahead of the neutral point."}]});

/* 2 · Rule in words → formula, Fill "more negative". */
rc98("aero-stability-control-2",2,{p:[
 {t:"p",x:"More static margin, stiffer in pitch: the moment slope $C_{mα}$ gets [[more negative]]."},
 {t:"eq",lab:"Moment slope",eq:"C_{mα} = −SM · C_{Lα}",cap:"local fixed-control model; same angle units for both slopes",vars:[["C_{mα}","slope of pitching-moment coefficient with α"],["C_{Lα}","slope of lift coefficient with α"]]}]});

/* 3 · Worked example, no interaction. (1.2 − 1.0)/2 = 0.1; −0.1 × 5 = −0.5 rad⁻¹. */
rc98("aero-stability-control-2",3,{p:[
 {t:"giv",lab:"Fixed controls",rows:[["c","2","m"],["x_{np}","1.2","m"],["x_{cg}","1.0","m"],["C_{Lα}","5","rad^{-1}"]]},
 {t:"step",f:"SM = (1.2 − 1.0) / 2",v:"0.1",u:""},
 {t:"step",f:"C_{mα} = −0.1 × 5",v:"−0.5",u:"rad^{-1}",fin:1},
 {t:"p",x:"Negative slope: more angle of attack brings a nose-down moment."}]});

/* 4 · Value rows, Guess. Same aircraft: x_cg = 1.1 → SM = 0.05, C_mα = −0.25; x_cg = 1.3 → SM = −0.05, C_mα = +0.25. */
rc98("aero-stability-control-2",4,{p:[
 {t:"p",x:"Moving the center of gravity aft shrinks the static margin. Same aircraft, $x_{np}$ = 1.2 m:"},
 {t:"vt",l:"$x_{cg}$ = 1.1 m",v:"C_{mα} = −0.25",u:"rad^{-1}"},
 [{t:"vt",l:"$x_{cg}$ = 1.3 m",v:"C_{mα} = +0.25",u:"rad^{-1}"},
  {t:"rel",x:"Aft of the neutral point the slope turns positive: a disturbance grows."}],
 {t:"p",x:"Where the neutral point sits depends on the configuration and on whether the controls are held fixed or left free."}],
 g:{at:2,q:"Move the center of gravity to 1.3 m, behind the neutral point. The moment slope turns…",o:[
  ["positive",1,"SM = (1.2 − 1.3)/2 = −0.05, so C_mα = −SM·C_Lα = +0.25: the moment now reinforces a disturbance."],
  ["more negative",0,"Moving the center of gravity aft cuts the static margin. Past the neutral point it goes negative and the slope flips sign."]]}});

/* ---------- aero-stability-control-3 · Trim and elevator limits ---------- */
/* 0 · Plain text, true/false Guess. */
rc98("aero-stability-control-3",0,{p:[
 {t:"p",x:"**Trim** means zero net pitching moment, so the aircraft holds its pitch without being pushed nose-up or nose-down."},
 {t:"take",x:"Stability and trim are separate. A stable aircraft can still need the elevator deflected to balance at a given lift coefficient."}],
 g:{at:1,q:"True or false: a statically stable aircraft trims with the elevator in its neutral position.",o:[
  ["True",0,"That merges stability with trim. Stability is about the moment's slope; trim needs the moment itself to be zero, which usually takes some elevator."],
  ["False",1,"Stability sets how the moment changes with α. Balancing it to zero at a given C_L usually takes some elevator."]]}});

/* 1 · Legend → formula, no interaction. */
rc98("aero-stability-control-3",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["C_m","pitching-moment coefficient"],["C_{m0}","its offset"],["SM","static margin"],["C_L","lift coefficient"],["δ","elevator deflection"],["C_δ","change in C_m per unit δ"]]},
 {t:"eq",lab:"Local pitch model",eq:"C_m = C_{m0} − SM·C_L + C_δδ",cap:"linear, small deflections"},
 {t:"p",x:"Trim means $C_m$ = 0."}]});

/* 2 · Rule → formula, no interaction. Setting C_m = 0: C_δ δ = SM·C_L − C_m0. */
rc98("aero-stability-control-3",2,{p:[
 {t:"p",x:"Signs: positive $δ$ is trailing edge down, in degrees. That lifts the tail and pitches the nose down, so $C_δ$ is negative."},
 {t:"p",x:"Set $C_m$ = 0 and solve for the elevator angle:"},
 {t:"eq",eq:"δ = (SM·C_L − C_{m0})/C_δ",cap:"linear model, angles in degrees"}]});

/* 3 · Worked example, no interaction. 0.1 × 0.5 − 0.02 = 0.03; 0.03/(−0.01) = −3°. */
rc98("aero-stability-control-3",3,{p:[
 {t:"giv",lab:"Trim at one lift coefficient",rows:[["C_{m0}","0.02",""],["SM","0.1",""],["C_L","0.5",""],["C_δ","−0.01","per °"]]},
 {t:"step",f:"SM · C_L − C_{m0} = 0.05 − 0.02",v:"0.03",u:""},
 {t:"step",f:"δ = 0.03 / (−0.01)",v:"−3",u:"°",fin:1},
 {t:"p",x:"Negative: trailing edge up. That pushes the tail down and adds the nose-up moment needed."}]});

/* 4 · Worked step, Guess. Same aircraft at C_L = 1.4: (0.1 × 1.4 − 0.02)/(−0.01) = 0.12/(−0.01) = −12°, past ±10°. */
rc98("aero-stability-control-3",4,{p:[
 {t:"p",x:"The elevator only moves so far: say ±10°. Same aircraft, slowed down to $C_L$ = 1.4:"},
 {t:"step",f:"δ = (0.14 − 0.02)/(−0.01)",v:"−12",u:"°",fin:1},
 {t:"p",x:"Past the stop, so it can't trim, even with positive static margin. This linear model also leaves out stall, large deflections and changes in elevator effectiveness."}],
 g:{at:1,q:"With ±10° of elevator travel, can it trim at C_L = 1.4?",o:[
  ["Yes, within the travel",0,"The required angle grows with C_L: (0.1 × 1.4 − 0.02)/(−0.01) = −12°, past the −10° stop."],
  ["No, it runs out",1,"It needs −12°, beyond the −10° stop. Positive static margin doesn't guarantee enough elevator."]]}});

/* ---------- aero-stability-control-4 · Tail authority and wing loading ---------- */
/* 0 · Plain text, no interaction. */
rc98("aero-stability-control-4",0,{p:[
 {t:"p",x:"An aft tail balances pitch with a modest force on a long lever arm."},
 {t:"p",x:"That force also counts in the vertical balance, so it changes how much lift the wing must make."}]});

/* 1 · Legend → formula, no interaction. Figure draws F_t, l_t, S_t and V_t. */
rc98("aero-stability-control-4",1,{p:[
 {t:"eq",lab:"Tail force",eq:"F_t = q_t S_t |C_{Lt}|",vars:[["q_t","dynamic pressure at the tail"],["S_t","tail area"],["C_{Lt}","tail lift coefficient"]]},
 {t:"eq",lab:"Tail moment",eq:"M_t = F_t l_t",cap:"l_t: lever arm from the center of gravity"}]});

/* 2 · Formula → value rows, Guess. ρ = 1 kg/m³: 0.5 × 20² = 200 Pa; 0.5 × 14² = 98 Pa; 98/200 = 0.49. */
rc98("aero-stability-control-4",2,{p:[
 {t:"eq",eq:"q_t = ½ ρ V_t^2",cap:"V_t: local flow speed at the tail"},
 {t:"p",x:"A wing's or propeller's wake can change the airflow at the tail, so $V_t$ can differ from the aircraft's speed. With $ρ$ = 1 kg/m^3:"},
 {t:"vt",l:"$V_t$ = 20 m/s",v:"q_t = 200",u:"Pa"},
 [{t:"vt",l:"Wake slows it to 14 m/s",v:"q_t = 98",u:"Pa"},
  {t:"rel",x:"Moment goes with $V_t^2$: 30 % less speed, about half the control moment."}]],
 g:{at:3,q:"A wake slows the tail flow from 20 to 14 m/s. The most tail moment it can make…",o:[
  ["about halves",1,"q_t goes with V_t², and (14/20)² = 0.49."],
  ["drops 30 %",0,"That's linear in speed. Dynamic pressure goes with V_t², so 0.7² ≈ 0.49."],
  ["stays the same",0,"Tail force is q_t S_t |C_Lt|, and q_t falls with the local speed."]]}});

/* 3 · Rule in words → formula, Fill "more lift than". */
rc98("aero-stability-control-4",3,{p:[
 {t:"p",x:"With the tail pushing down, the wing must make [[more lift than]] the weight:"},
 {t:"eq",eq:"L_w = W + F_t",cap:"steady level flight, tail force downward"},
 {t:"p",x:"More wing lift means a higher $C_L$, closer to $C_{L,max}$. Balanced in pitch doesn't mean far from stall."}]});

/* 4 · Worked example, no interaction. q_t = 0.5·1·20² = 200 Pa; F_t = 200·0.5·1 = 100 N; M_t = 100·2 = 200 N·m. */
rc98("aero-stability-control-4",4,{p:[
 {t:"giv",lab:"Tail at maximum lift",rows:[["ρ","1","kg/m^3"],["V_t","20","m/s"],["S_t","0.5","m^2"],["|C_{Lt}|","1",""],["l_t","2","m"]]},
 {t:"step",f:"q_t = ½ × 1 × 20^2",v:"200",u:"Pa"},
 {t:"step",f:"F_t = 200 × 0.5 × 1",v:"100",u:"N"},
 {t:"step",f:"M_t = 100 × 2",v:"200",u:"N·m",fin:1}]});

/* ---------- aero-aerodynamics-5 · Supersonic flow and shocks (cards 1 and 3 are in v98.js) ---------- */
/* 0 · Legend → formula → value row, no interaction. 250/295 = 0.847. */
rc98("aero-aerodynamics-5",0,{p:[
 {t:"eq",lab:"Mach number",eq:"M = V / a",vars:[["V","flight speed"],["a","local speed of sound"]]},
 {t:"p",x:"For a typical wing, below about Mach 0.8 the flow stays subsonic everywhere around the aircraft. Above Mach 1, the aircraft is supersonic."},
 {t:"vt",l:"250 m/s in 217 K air",v:"M ≈ 0.85",u:""}]});

/* 2 · Formula → value rows, Guess. asin(1/1.2) = asin(0.8333) = 56.4°; asin(0.5) = 30°. */
rc98("aero-aerodynamics-5",2,{p:[
 {t:"p",x:"Above Mach 1, pressure waves can't run ahead of the aircraft. They pile up on a cone trailing behind it."},
 {t:"eq",lab:"Mach cone half-angle",eq:"μ = asin(1 / M)",cap:"M > 1, weak pressure waves"},
 {t:"vt",l:"M = 1.2",v:"μ ≈ 56",u:"°"},
 [{t:"vt",l:"M = 2",v:"μ = 30",u:"°"},{t:"rel",x:"Faster flight, narrower cone."}]],
 g:{at:3,q:"Speed up to Mach 2. The Mach cone gets…",o:[
  ["narrower",1,"1/M shrinks, so μ = asin(1/M) drops, from 56° at Mach 1.2 to 30° at Mach 2."],
  ["wider",0,"The aircraft outruns its waves by more, so they trail at a sharper angle: μ = asin(1/M) falls."]]}});

/* 4 · Plain text, Fill "weak". */
rc98("aero-aerodynamics-5",4,{p:[
 {t:"p",x:"The total-pressure loss across shocks shows up as **wave drag**."},
 {t:"p",x:"Thin wings, sharp leading edges and sweep keep the shocks [[weak]]."},
 {t:"take",x:"That's why supersonic jets look like darts."}]});

/* ---------- cool-roche-1 · The Roche limit ---------- */
/* 0 · Plain text, no interaction. */
rc98("cool-roche-1",0,{p:[
 {t:"p",x:"In plain English: bring a moon too close to its planet and the planet's tides pull it apart."},
 {t:"p",x:"The distance where that starts is the **Roche limit**."}]});

/* 1 · Plain text, Fill "harder". */
rc98("cool-roche-1",1,{p:[
 {t:"p",x:"The planet pulls [[harder]] on a moon's near side than on its far side."},
 {t:"p",x:"That difference, the **tidal force**, tries to stretch the moon."},
 {t:"take",x:"A moon held together only by its own gravity has a distance inside which the stretching wins: the Roche limit."}]});

/* 2 · Legend → formula, Fill "between". */
rc98("cool-roche-1",2,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["R","planet's radius"],["ρ_p","planet's density"],["ρ_m","moon's density"]]},
 {t:"eq",lab:"Fluid moon",eq:"d ≈ 2.44 R (ρ_p / ρ_m)^{1/3}",cap:"circular orbit, moon held together by gravity alone"},
 [{t:"eq",lab:"Rigid moon",eq:"d ≈ 1.26 R (ρ_p / ρ_m)^{1/3}"},
  {t:"p",x:"A rigid moon holds on closer. Real moons fall [[between]] the two."}]]});

/* 3 · Scaling table, Guess. d ∝ ρ_m^(−1/3): 2× → 2^(−1/3) = 0.794 (−21 %); 8× → ÷2; ½× → 2^(1/3) = 1.26. */
rc98("cool-roche-1",3,{p:[
 {t:"p",x:"The moon's size cancels out: only the density ratio matters. Same planet, change the moon's density:"},
 {t:"tbl",head:["Moon density","Roche limit"],rows:[["2×","× 0.79"],["8×","÷ 2"],["½×","× 1.26"]],hi:[0,1]},
 {t:"p",x:"Only as a cube root: a denser moon can orbit closer, and a fluffy, icy one breaks up farther out."}],
 g:{at:1,q:"Make the moon twice as dense. Its Roche limit…",o:[
  ["halves",0,"That treats d as 1/ρ_m. It goes as the cube root: 2^(−1/3) ≈ 0.79."],
  ["shrinks about 21 %",1,"d ∝ (ρ_p/ρ_m)^(1/3), and 2^(−1/3) ≈ 0.79."],
  ["doubles",0,"A denser moon holds itself together better, so it can come closer, not stay farther out."]]}});

/* 4 · Worked example, no interaction. 5,514/3,344 = 1.6489; cube root 1.1814; 2.44 × 6,371 = 15,545; × 1.1814 = 18,365 km.
   384,400/18,365 = 20.9. */
rc98("cool-roche-1",4,{p:[
 {t:"giv",lab:"Earth and the Moon · fluid limit",rows:[["R","6,371","km"],["ρ_p","5,514","kg/m^3"],["ρ_m","3,344","kg/m^3"]]},
 {t:"step",f:"(5,514 / 3,344)^{1/3}",v:"1.181",u:""},
 {t:"step",f:"d = 2.44 R × 1.181",v:"≈ 18,400",u:"km",fin:1},
 {t:"p",x:"The Moon orbits at 384,400 km, about 21 times farther out. Saturn's bright rings sit near or inside its Roche limit, where loose ice can't gather into a moon."}]});

/* 5 · Plain text, true/false Guess. ISS r = 6,371 + 400 = 6,771 km vs 18,400 km limit (≈ 12,000 km up). */
rc98("cool-roche-1",5,{p:[
 {t:"p",x:"The ISS orbits about 400 km up: about 6,800 km from Earth's center."},
 {t:"take",x:"That's deep inside Earth's 18,400 km Roche limit. Bolts and metal hold it together, not its own gravity, and the tidal stretch is tiny next to its strength."}],
 g:{at:1,q:"True or false: the ISS orbits inside Earth's Roche limit.",o:[
  ["True",1,"The limit is 18,400 km from Earth's center; the ISS is about 6,800 km from it."],
  ["False",0,"The limit is measured from Earth's center: 18,400 km, about 12,000 km above the surface. The ISS is far inside it."]]}});

/* 6 · Plain text, no interaction. */
rc98("cool-roche-1",6,{p:[
 {t:"p",x:"How it sounds at work:"},
 {t:"p",x:"“It's inside the Roche limit, so it'll never clump into a moon.”"},
 {t:"p",x:"“The comet got torn apart on its close pass.”"}]});

try{NEWS.unshift({d:"2026-11-25",t:["Aerospace cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b113",k:"rc113a",t:"Reveal cards: Aerospace",c:"All 64 cards in the 16 aerospace lessons (61 new). Try the lift-vs-speed Guess in Four forces, the stall-in-a-bank table in Stall during maneuvers, and the Roche limit cube root.",go:["lesson","aero1"]})}catch(e){}

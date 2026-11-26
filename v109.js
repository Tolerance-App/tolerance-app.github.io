/* ===== v109 (2026-11-25): reveal cards for Electrical =====
   1. All 68 remaining cards of the 20 Electrical lessons (elec1–4, elec-sensors-1…4, elec-circuits-1…4, elec-mcu-1…4,
      elec-motors-drives-1…4) as reveal cards (rc98, format in v98.js; style catalogue in docs/LEARNING_DESIGN.md).
      elec-sensors-4 cards 1 and 2 are b98 test cards (v98.js) and are skipped. Cards only: `cards`, `qs`, lesson ids
      and question order are unchanged.
      Cards with an LFIG17 figure (elec-sensors-1·1, elec-sensors-2·1, elec-sensors-3·1, elec-mcu-2·0) stay short and
      leave out blocks the figure already draws. */
try{FB.ver="b109"}catch(e){}

/* ---------- elec1 · Symbols and diodes ---------- */
/* 0 · Terms → compare pair, Fill "one way". Silicon diode forward drop ≈ 0.6–0.7 V. */
rc98("elec1",0,{p:[
 {t:"p",x:"A **resistor** limits current: for a given voltage, more resistance means less current."},
 {t:"p",x:"A **diode** lets current flow [[one way]] only, from anode (the triangle side) to cathode (the bar)."},
 [{t:"pc",l:"Forward",c:"anode more positive than cathode",v:"conducts"},
  {t:"pc",l:"Reverse",c:"cathode more positive than anode",v:"blocks",warn:1}],
 {t:"p",x:"A conducting silicon diode drops about 0.7 V."}]});

/* 1 · Process chain, no interaction. */
rc98("elec1",1,{p:[
 {t:"p",x:"A schematic shows how parts connect, not where they sit on the board. Learn the symbols first, and it reads like a sentence."},
 {t:"chain",items:["3.3 V supply","resistor","LED","ground"],hl:2},
 {t:"p",x:"Read it as: current leaves the supply, passes through the resistor, then the LED, and returns to ground."}]});

/* ---------- elec2 · Series, parallel, floating pins ---------- */
/* 0 · Two formulas → Guess → value rows. Series 1 + 4 = 5 kΩ. Parallel 1·4/(1+4) = 0.8 kΩ = 800 Ω. */
rc98("elec2",0,{p:[
 {t:"eq",lab:"Series",eq:"R = R_1 + R_2",cap:"same current through both"},
 {t:"eq",lab:"Parallel",eq:"1/R = 1/R_1 + 1/R_2",cap:"same voltage across both"},
 [{t:"vt",l:"1 kΩ and 4 kΩ in series",v:"R = 5",u:"kΩ"},{t:"vt",l:"1 kΩ and 4 kΩ in parallel",v:"R = 800",u:"Ω"},
  {t:"rel",x:"In parallel, the total comes out below the smaller resistor."}]],
 g:{at:2,q:"Put 1 kΩ in parallel with 4 kΩ. The total is…",o:[
  ["800 Ω",1,"1/R = 1/1 + 1/4 = 1.25 per kΩ, so R = 0.8 kΩ."],
  ["5 kΩ",0,"That's the series total. In parallel the reciprocals add, not the resistances."],
  ["2.5 kΩ",0,"That's the average. A second path lets more current through, so the total falls below 1 kΩ."]]}});

/* 1 · Plain text → compare pair, Fill "default". */
rc98("elec2",1,{p:[
 {t:"p",x:"A digital input with nothing driving it **floats**: it picks up stray charge and reads random 1s and 0s."},
 {t:"p",x:"A pull-up or pull-down resistor gives it a [[default]] state."},
 [{t:"pc",l:"Pull-up",c:"resistor to the supply",v:"reads 1"},
  {t:"pc",l:"Pull-down",c:"resistor to ground",v:"reads 0"}],
 {t:"p",x:"A button or another chip can still drive the pin the other way when it needs to."}]});

/* ---------- elec3 · LEDs and filters ---------- */
/* 0 · Formula → worked step → Guess on rounding. (5 − 1.8)/0.020 = 160 Ω. E12 neighbours 150 and 180.
   180 Ω: 3.2/180 = 17.8 mA (under 20). 150 Ω: 3.2/150 = 21.3 mA (over). */
rc98("elec3",0,{p:[
 {t:"eq",lab:"LED series resistor",eq:"R = (V_s − V_f) / I",cap:"resistor in series with the LED",vars:[["V_s","supply voltage"],["V_f","LED forward voltage"],["I","LED current you want"]]},
 [{t:"p",x:"Red LED, $V_f$ = 1.8 V, on 5 V, at most 20 mA:"},
  {t:"step",f:"R = (5 − 1.8) / 0.020",v:"160",u:"Ω"}],
 [{t:"p",x:"Standard values near 160 Ω are 150 and 180 Ω. Round up:"},
  {t:"step",f:"I = 3.2 / 180",v:"17.8",u:"mA",fin:1}]],
 g:{at:2,q:"160 Ω isn't a standard value. Pick…",o:[
  ["150 Ω",0,"Rounding down raises the current: 3.2 / 150 = 21.3 mA, over the 20 mA limit."],
  ["180 Ω",1,"Rounding up keeps the current under the limit: 3.2 / 180 = 17.8 mA."]]}});

/* 1 · Formula → compare pair → Guess → value rows. |H| = 1/√(1 + (f/f_c)²): f_c 0.707, 10 f_c 0.0995, 100 f_c 0.0100. */
rc98("elec3",1,{p:[
 {t:"eq",lab:"RC low-pass cutoff",eq:"f_c = 1 / (2πRC)",cap:"first-order RC, nothing loading the output"},
 [{t:"pc",l:"Well below $f_c$",c:"C has time to charge and follow",v:"passes"},
  {t:"pc",l:"Well above $f_c$",c:"input flips faster than C charges through R",v:"blocked",warn:1}],
 [{t:"vt",l:"At $f_c$",v:"out ≈ 0.71 × in",u:""},{t:"vt",l:"At 10 $f_c$",v:"out ≈ 0.1 × in",u:""},{t:"vt",l:"At 100 $f_c$",v:"out ≈ 0.01 × in",u:""},
  {t:"rel",x:"Above $f_c$, each 10× rise in frequency cuts the output about 10×."}]],
 g:{at:2,q:"Well above the cutoff, raise the frequency 10×. The output…",o:[
  ["drops about 10×",1,"Above f_c a single RC's output falls as 1/f: 10× the frequency, a tenth the output."],
  ["drops about 100×",0,"That's a second-order filter (two RC stages). One RC falls as 1/f."],
  ["halves",0,"Well above f_c, halving takes only a 2× frequency step. A 10× step cuts a single RC's output about 10×."]]}});

/* ---------- elec4 · Op-amps and MOSFETs ---------- */
/* 0 · Two formulas → Guess → value rows. Rf/Rin = 10/1 = 10: inverting −10, non-inverting 1 + 10 = 11. */
rc98("elec4",0,{p:[
 {t:"eq",lab:"Inverting amplifier",eq:"G = −R_f / R_{in}",vars:[["R_f","feedback resistor, output to − input"],["R_{in}","input resistor"]]},
 {t:"eq",lab:"Non-inverting amplifier",eq:"G = 1 + R_f / R_{in}",cap:"ideal op-amp with negative feedback, output inside the supply rails"},
 [{t:"vt",l:"Inverting, 10 kΩ / 1 kΩ",v:"G = −10",u:""},{t:"vt",l:"Non-inverting, 10 kΩ / 1 kΩ",v:"G = 11",u:""},
  {t:"rel",x:"Same resistors, gain 11 instead of 10, and the sign doesn't flip."}]],
 g:{at:2,q:"$R_f$ = 10 kΩ, $R_{in}$ = 1 kΩ. The non-inverting gain is…",o:[
  ["10",0,"That's the size of the inverting gain. Non-inverting adds 1: G = 1 + 10."],
  ["11",1,"G = 1 + R_f / R_{in} = 1 + 10 = 11."],
  ["−10",0,"That's the inverting gain. A non-inverting stage keeps the sign."]]}});

/* 1 · Plain text → compare pair, Fill "much higher". P = I²R: 10² × 0.01 = 1 W; 10² × 1 = 100 W. */
rc98("elec4",1,{p:[
 {t:"p",x:"Used as a switch, a MOSFET should be **fully on**, so it acts like a tiny resistor, $R_{DS(on)}$."},
 {t:"p",x:"Only partly on, its resistance is [[much higher]], and it heats up: power lost $P = I^2 R$."},
 [{t:"pc",l:"Fully on, 10 A",c:"R = 10 mΩ",v:"1 W"},
  {t:"pc",l:"Partly on, 10 A",c:"R = 1 Ω",v:"100 W",warn:1}],
 {t:"take",x:"Check $R_{DS(on)}$ at the gate voltage you actually drive, not $V_{GS(th)}$, where it only barely starts to conduct."}]});

/* ---------- elec-sensors-1 · Measurement error and repeatability ---------- */
/* 0 · Process chain, no interaction. */
rc98("elec-sensors-1",0,{p:[
 {t:"p",x:"A **sensor** converts a physical quantity into a usable signal."},
 {t:"chain",items:["temperature","sensor","voltage","reading"],hl:1},
 {t:"p",x:"**Calibration** compares its readings with reference values to find the relationship between input and output."}]});

/* 1 · Terms, no interaction. The LFIG17 figure draws the cluster at 22 °C and the reference at 20 °C; its caption
   gives e = xmeas − xref, so no formula box. */
rc98("elec-sensors-1",1,{p:[
 {t:"p",x:"Measurement error is measured minus reference: $e = x_{meas} − x_{ref}$."},
 {t:"p",x:"**Bias**: a consistent offset, the same size and sign every time."},
 {t:"p",x:"**Repeatability**: how closely repeated readings group together."}]});

/* 2 · Worked example → Guess (repeatable ≠ accurate). e = 22 − 20 = +2 °C. */
rc98("elec-sensors-1",2,{p:[
 {t:"giv",lab:"Thermometer in a stable bath",rows:[["x_{ref}","20","°C"],["x_{meas}","22","°C"]]},
 {t:"step",f:"e = 22 − 20",v:"+2",u:"°C",fin:1},
 {t:"take",x:"Good repeatability doesn't show agreement with the reference. Calibration finds the +2 °C bias so it can be corrected."}],
 g:{at:2,q:"Its readings repeat within 0.1 °C. So it's accurate…",o:[
  ["true",0,"Tight grouping is repeatability. Every reading can still sit 2 °C off the reference."],
  ["false",1,"Repeatable readings can share the same bias: these all read about 2 °C high."]]}});

/* ---------- elec-sensors-2 · Linear sensor calibration ---------- */
/* 0 · Legend → formula, no interaction. */
rc98("elec-sensors-2",0,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["V","output voltage"],["x","the physical quantity measured"],["s","sensitivity, volts per unit of x"],["b","offset: the output at x = 0"]]},
 {t:"eq",lab:"Linear sensor model",eq:"V = s x + b",cap:"inside the sensor's rated range"},
 {t:"p",x:"The model keeps sensitivity (the slope) apart from offset (where the line starts), so each can be calibrated."}]});

/* 1 · Two formulas → inverse, no interaction. The LFIG17 figure draws the line through (0, 1 V) and (200, 5 V). */
rc98("elec-sensors-2",1,{p:[
 [{t:"eq",lab:"From two reference points",eq:"s = (V_2 − V_1) / (x_2 − x_1)"},{t:"eq",eq:"b = V_1 − s x_1"}],
 {t:"eq",lab:"Reading back to input",eq:"x = (V − b) / s"}]});

/* 2 · Worked example → Guess. s = (5 − 1)/(200 − 0) = 0.02 V/kPa; b = 1 − 0.02·0 = 1 V; x = (3 − 1)/0.02 = 100 kPa.
   Wrong: 3/0.02 = 150 (offset ignored); 3/5 × 200 = 120 (ratio of full scale, offset ignored). */
rc98("elec-sensors-2",2,{p:[
 {t:"giv",lab:"Pressure sensor, two reference points",rows:[["x_1","0","kPa"],["V_1","1","V"],["x_2","200","kPa"],["V_2","5","V"]]},
 [{t:"step",f:"s = (5 − 1) / (200 − 0)",v:"0.02",u:"V/kPa"},{t:"step",f:"b = 1 − 0.02 × 0",v:"1",u:"V"}],
 {t:"step",f:"x = (3 − 1) / 0.02",v:"100",u:"kPa",fin:1}],
 g:{at:2,q:"The sensor reads 3 V. The pressure is…",o:[
  ["100 kPa",1,"Take off the 1 V offset first: (3 − 1) / 0.02 = 100 kPa."],
  ["150 kPa",0,"3 / 0.02 forgets the offset: 1 V of the reading is there even at 0 kPa."],
  ["120 kPa",0,"3/5 of 200 kPa assumes the line starts at 0 V. It starts at 1 V."]]}});

/* ---------- elec-sensors-3 · Uncertainty and shared errors ---------- */
/* 0 · Rule in words → formula → value row, Fill "partly cancel". √(0.3² + 0.4²) = √0.25 = 0.5 K. */
rc98("elec-sensors-3",0,{p:[
 {t:"p",x:"**Standard uncertainty** $u$ is the typical size of a measurement's error: one standard deviation."},
 {t:"p",x:"Independent errors [[partly cancel]]: two are rarely both at their worst at once."},
 {t:"eq",lab:"Root-sum-square",eq:"u = √{u_1^2 + u_2^2}",cap:"independent (uncorrelated) errors"},
 [{t:"vt",l:"0.3 K and 0.4 K",v:"u = 0.5",u:"K"},
  {t:"rel",x:"Not 0.7 K. Errors that move together (correlated) don't follow this rule."}]]});

/* 1 · Formula → relation, no interaction (the LFIG17 averaging figure leaves no room for a Guess). u/√4 = u/2; u/√100 = u/10. */
rc98("elec-sensors-3",1,{p:[
 {t:"p",x:"For independent $a$ and $b$, the difference $d = a − b$ still adds uncertainty: $u_d = √{u_a^2 + u_b^2}$."},
 [{t:"eq",lab:"Averaging N readings",eq:"u_{avg} = u / √{N}",cap:"independent random errors"},
  {t:"rel",x:"4 readings halve it; 100 cut it 10×."}]]});

/* 2 · Plain text → Guess → compare pair. Shared offset c: (a + c) − (b + c) = a − b; average keeps c. */
rc98("elec-sensors-3",2,{p:[
 {t:"p",x:"A **shared additive offset** shifts every reading by the same amount, for example one calibration error in both."},
 [{t:"pc",l:"Difference $a − b$",c:"shared offset",v:"cancels"},
  {t:"pc",l:"Average",c:"shared offset",v:"stays",warn:1}],
 {t:"take",x:"Repeating can't average away a fixed calibration bias. Keep repeatability uncertainty apart from calibration uncertainty."}],
 g:{at:1,q:"Two readings share a +0.5 K calibration offset. In their difference, it…",o:[
  ["cancels",1,"(a + 0.5) − (b + 0.5) = a − b: the shared part drops out."],
  ["doubles",0,"Subtracting removes the shared offset; it would only add up in a sum."],
  ["adds as root-sum-square",0,"RSS is for independent errors. A shared offset is fully correlated."]]}});

/* ---------- elec-sensors-4 · Sampling and aliasing ---------- */
/* 0 · Plain text, Fill "the same". cos(2π·900·n/1000) = cos(2πn − 2π·100·n/1000) = cos(2π·100·n/1000). */
rc98("elec-sensors-4",0,{p:[
 {t:"p",x:"**Sampling** records a continuous signal at discrete times."},
 {t:"p",x:"**Aliasing**: different input frequencies can give exactly [[the same]] samples."},
 {t:"p",x:"At $f_s$ = 1 kHz, a 900 Hz cosine gives the same samples as a 100 Hz cosine."},
 {t:"take",x:"Once signals overlap in the samples, no digital filter can tell them apart. Filter before sampling."}]});
/* cards 1 and 2: b98 test cards in v98.js */

/* ---------- elec-circuits-1 · Series and parallel ---------- */
/* 0 · Rule → formula, Fill "the same". 1 + 2.2 = 3.2 kΩ. */
rc98("elec-circuits-1",0,{p:[
 {t:"p",x:"In series, [[the same]] current flows through every part."},
 {t:"eq",lab:"Series",eq:"R = R_1 + R_2",cap:"one path, same current through each"},
 {t:"vt",l:"1 kΩ + 2.2 kΩ",v:"R = 3.2",u:"kΩ"}]});

/* 1 · Two formulas → value row, no interaction. 2·3/(2+3) = 1.2 kΩ. */
rc98("elec-circuits-1",1,{p:[
 {t:"p",x:"In parallel, every branch sees the same voltage, and **conductances** $1/R$ add."},
 {t:"eq",lab:"Parallel",eq:"1/R = 1/R_1 + 1/R_2",cap:"same voltage across each branch"},
 [{t:"eq",lab:"Two resistors",eq:"R = R_1 R_2 / (R_1 + R_2)"},
  {t:"vt",l:"2 kΩ ∥ 3 kΩ",v:"R = 1.2",u:"kΩ"}]]});

/* 2 · Guess → value row. 100·10,000/10,100 = 99.01 Ω. */
rc98("elec-circuits-1",2,{p:[
 {t:"p",x:"Each parallel branch is another path for current, so adding one lets more current through at the same voltage."},
 [{t:"vt",l:"100 Ω ∥ 10 kΩ",v:"R ≈ 99.0",u:"Ω"},
  {t:"rel",x:"However many branches, the total falls below the smallest one."}]],
 g:{at:1,q:"Put 100 Ω in parallel with 10 kΩ. The total is…",o:[
  ["a bit under 100 Ω",1,"The 10 kΩ path adds a little current, so the total drops just below the smaller branch: 99.0 Ω."],
  ["about 5 kΩ",0,"That's roughly the average. Parallel totals fall below the smallest branch."],
  ["a bit over 10 kΩ",0,"That treats it like series. A second path lowers the total."]]}});

/* 3 · Rule → worked step, Fill "half". 1·1/(1+1) = 0.5 kΩ. n equal R in parallel: R/n. */
rc98("elec-circuits-1",3,{p:[
 {t:"p",x:"Two equal resistors in parallel give [[half]] the value of one."},
 {t:"step",f:"R = (1 × 1) / (1 + 1) kΩ",v:"500",u:"Ω",fin:1},
 {t:"p",x:"In general, $n$ equal resistors $R$ in parallel give $R/n$."}]});

/* ---------- elec-circuits-2 · Dividers and Kirchhoff’s laws ---------- */
/* 0 · Terms → Guess → takeaway. KCL: 2 + 3 = 5 A out. */
rc98("elec-circuits-2",0,{p:[
 {t:"term",s:"ΣI",x:"**Current law (KCL)**: currents into a node sum to zero. What flows in flows out."},
 {t:"term",s:"ΣV",x:"**Voltage law (KVL)**: voltages around any closed loop sum to zero."},
 {t:"take",x:"Charge doesn't pile up at a node: 2 A + 3 A in means 5 A out on the third wire."}],
 g:{at:2,q:"Three wires meet at a node. 2 A and 3 A flow in. The third wire carries…",o:[
  ["5 A out",1,"Currents into the node sum to zero: 2 + 3 − 5 = 0."],
  ["1 A out",0,"That subtracts the two inflows. Both flow in, so their sum must leave."],
  ["5 A in",0,"Then 10 A would flow in and nothing out. Charge can't pile up at a node."]]}});

/* 1 · Legend → formula → value row, no interaction. 5 × 2/(1 + 2) = 3.33 V. */
rc98("elec-circuits-2",1,{p:[
 {t:"eq",lab:"Voltage divider",eq:"V_{out} = V_{in} R_2 / (R_1 + R_2)",cap:"nothing drawing current from V_{out}",vars:[["R_1","top resistor, to V_{in}"],["R_2","bottom resistor, to ground"]]},
 {t:"vt",l:"5 V, 1 kΩ over 2 kΩ",v:"V_{out} ≈ 3.33",u:"V"},
 {t:"p",x:"Many sensors (a sensing resistor plus a fixed one) and simple level shifters work this way."}]});

/* 2 · Plain text → compare pair, Fill "sags". 12 V, 10 k/5 k: unloaded 4 V. RL 50 k: 5∥50 = 4.545 k, 12·4.545/14.545 = 3.75 V
   (−6.25 %). RL 5 k: 2.5 k, 12·2.5/12.5 = 2.4 V. */
rc98("elec-circuits-2",2,{p:[
 {t:"p",x:"A load in parallel with $R_2$ lowers the bottom resistance, so $V_{out}$ [[sags]]."},
 [{t:"p",x:"12 V divider, 10 kΩ over 5 kΩ, unloaded 4 V:"},
  {t:"pc",l:"50 kΩ load",c:"10 × R₂",v:"3.75 V"},
  {t:"pc",l:"5 kΩ load",c:"equal to R₂",v:"2.4 V",warn:1}],
 {t:"take",x:"Keep the load at least 10× $R_2$: here that holds the sag to about 6 %."}]});

/* 3 · Worked example, no interaction. 12 × 5/(10 + 5) = 4 V. */
rc98("elec-circuits-2",3,{p:[
 {t:"giv",lab:"Unloaded divider",rows:[["V_{in}","12","V"],["R_1","10","kΩ"],["R_2","5","kΩ"]]},
 {t:"step",f:"V_{out} = 12 × 5 / (10 + 5)",v:"4",u:"V",fin:1},
 {t:"p",x:"$R_2$ is a third of the total, so $V_{out}$ is a third of 12 V."}]});

/* ---------- elec-circuits-3 · Power and wire sizing ---------- */
/* 0 · Legend → formula → Guess → value row. 10²/100 = 1 W = 4 × ¼ W. */
rc98("elec-circuits-3",0,{p:[
 {t:"eq",lab:"Power in a resistor",eq:"P = V I = I^2 R = V^2 / R",cap:"V across the part, I through it; P leaves as heat",vars:[["P","power, W"],["V","voltage, V"],["I","current, A"],["R","resistance, Ω"]]},
 {t:"p",x:"A resistor's **power rating**, such as ¼ W, is how much heat it can shed without overheating, at its rated ambient temperature."},
 [{t:"vt",l:"100 Ω across 10 V",v:"P = 1",u:"W"},
  {t:"rel",x:"Four times a ¼ W rating: pick at least 1 W; about 2 W leaves margin."}]],
 g:{at:2,q:"A 100 Ω resistor sits across 10 V. Is a ¼ W part fine?",o:[
  ["yes",0,"P = V²/R = 100/100 = 1 W, four times the rating."],
  ["no",1,"P = V²/R = 100/100 = 1 W, four times the ¼ W rating."]]}});

/* 1 · Rule → scaling table, Fill "quadruples". Same wire: R fixed, P ∝ I². */
rc98("elec-circuits-3",1,{p:[
 {t:"p",x:"Wires have resistance too. In the same wire, doubling the current [[quadruples]] the heat."},
 {t:"eq",lab:"Wire loss",eq:"P = I^2 R",cap:"R of the wire, fixed"},
 {t:"tbl",head:["Current","Heat in the wire"],rows:[["×1","×1"],["×2","×4"],["×3","×9"]],hi:[1,1]}]});

/* 2 · Scaling table, Guess. P = VI fixed: I ∝ 1/V; loss I²R ∝ 1/V². ×10 V → ÷10 I → ÷100 loss. */
rc98("elec-circuits-3",2,{p:[
 {t:"p",x:"Send the same power $P = VI$ down the same wires. Raising $V$ lowers $I$, and wire loss is $I^2 R$."},
 [{t:"tbl",head:["Voltage","Current","Wire loss"],rows:[["×1","×1","×1"],["×10","÷10","÷100"]],hi:[1,2]},
  {t:"rel",x:"Wire loss ∝ $1/V^2$ at fixed power: that's why grids transmit at high voltage."}]],
 g:{at:1,q:"Same power, same wires, 10× the voltage. Wire loss…",o:[
  ["÷10",0,"Current falls 10×, but loss goes as I², so it falls 100×."],
  ["÷100",1,"I falls 10× and loss = I²R, so 10² = 100× less."],
  ["×10",0,"V²/R needs the voltage across the wire, not the line voltage. The drop along the wire falls with I."]]}});

/* 3 · Rule → reason → value row, Fill "half". ¼ W × 0.5 = 0.125 W. */
rc98("elec-circuits-3",3,{p:[
 {t:"p",x:"**Derate**: run parts at about [[half]] their rating."},
 {t:"p",x:"Heat ages parts. A part well under its rating runs cooler and lasts longer."},
 {t:"vt",l:"¼ W resistor, derated",v:"P ≤ 0.125",u:"W"}]});

/* ---------- elec-circuits-4 · Thévenin and max power ---------- */
/* 0 · Plain text → formula, no interaction. */
rc98("elec-circuits-4",0,{p:[
 {t:"p",x:"Seen from its two terminals, any linear circuit acts like one voltage source in series with one resistor."},
 {t:"eq",lab:"Thévenin equivalent",eq:"V = V_{th} − I R_{th}",cap:"linear circuit, I the current drawn from the terminals",vars:[["V_{th}","Thévenin voltage"],["R_{th}","Thévenin resistance"]]},
 {t:"p",x:"Every part inside, however many, collapses into those two numbers."}]});

/* 1 · Worked example → Guess. Vth = 12·5/15 = 4 V. Rth = 10∥5 = 50/15 = 3.33 kΩ. */
rc98("elec-circuits-4",1,{p:[
 {t:"p",x:"$V_{th}$: the open-circuit voltage at the terminals. $R_{th}$: zero the sources (short voltage sources, open current sources), then look back in."},
 [{t:"p",x:"12 V divider, 10 kΩ over 5 kΩ, output across the 5 kΩ:"},
  {t:"step",f:"V_{th} = 12 × 5 / 15",v:"4",u:"V"}],
 {t:"step",f:"R_{th} = 10 ∥ 5 = 10 × 5 / 15",v:"3.33",u:"kΩ",fin:1}],
 g:{at:2,q:"Short the 12 V source and look back in. $R_{th}$ is…",o:[
  ["15 kΩ",0,"With the source shorted, both resistors run from the output to ground: they're in parallel, not series."],
  ["3.33 kΩ",1,"Both resistors go to ground once the source is shorted, so 10 ∥ 5 = 3.33 kΩ."],
  ["5 kΩ",0,"The 10 kΩ also connects the output to ground once the source is shorted. It's in parallel with the 5 kΩ."]]}});

/* 2 · Plain text → worked step, no interaction. 9 − 0.5·2 = 8 V. */
rc98("elec-circuits-4",2,{p:[
 {t:"p",x:"Thévenin turns loading questions into one line: $V = V_{th} − I R_{th}$."},
 {t:"p",x:"A battery sagging under load, a sensor's output impedance and a divider's loading are all $R_{th}$ problems."},
 [{t:"p",x:"9 V battery with $R_{th}$ = 2 Ω, drawing 0.5 A:"},
  {t:"step",f:"V = 9 − 0.5 × 2",v:"8",u:"V",fin:1}]]});

/* 3 · Formula → Guess → compare pair. P_L = Vth² RL/(Rth + RL)², max at RL = Rth: Vth²/(4 Rth), efficiency RL/(Rth + RL) = 50 %. */
rc98("elec-circuits-4",3,{p:[
 {t:"p",x:"Load power: $P_L = V_{th}² R_L / (R_{th} + R_L)²$."},
 {t:"eq",lab:"Maximum load power",eq:"P_{max} = V_{th}² / (4 R_{th})",cap:"at R_L = R_{th}; if R_{th} is a real source resistance, half the power heats it"},
 [{t:"pc",l:"Matched",c:"R_L = R_{th}, as in RF and antennas",v:"50 %",warn:1},
  {t:"pc",l:"Power systems",c:"R_L much larger than R_{th}",v:"near 100 %"}]],
 g:{at:1,q:"Load power peaks when $R_L$ is…",o:[
  ["as small as possible",0,"Current is largest then, but the voltage across the load goes to zero, and so does its power."],
  ["equal to $R_{th}$",1,"Too small and V_L collapses, too big and I collapses. P_L peaks at R_L = R_{th}."],
  ["much larger than $R_{th}$",0,"That's the efficient choice, but the current gets small, so load power falls."]]}});

/* ---------- elec-mcu-1 · GPIO and pull resistors ---------- */
/* 0 · Compare pair, no interaction. */
rc98("elec-mcu-1",0,{p:[
 {t:"p",x:"General-purpose I/O (**GPIO**) pins are set in code as outputs or inputs."},
 [{t:"pc",l:"Output",c:"drives the pin",v:"high or low"},
  {t:"pc",l:"Input",c:"reads the pin's voltage",v:"1 or 0"}],
 {t:"p",x:"An input reads 1 above its high threshold and 0 below its low threshold (both in the datasheet)."}]});

/* 1 · Process chain → Guess → takeaway. Active-low button. */
rc98("elec-mcu-1",1,{p:[
 {t:"p",x:"An unconnected input floats and reads noise. A **pull-up** resistor ties it to the supply."},
 {t:"chain",items:["3.3 V","pull-up","input pin","button","ground"],hl:2},
 {t:"take",x:"Released, the pull-up holds the pin at 1. Pressed, the button pulls it to ground: 0."}],
 g:{at:2,q:"Pull-up to 3.3 V, button to ground. Pressed, the pin reads…",o:[
  ["1",0,"That's the released state. Pressing connects the pin straight to ground."],
  ["0",1,"The button shorts the pin to ground; the pull-up only lets a small current flow."]]}});

/* 2 · Worked step → compare pair, no interaction. 3.3/10k = 0.33 mA; 3.3/1k = 3.3 mA; 3.3/1M = 3.3 µA. */
rc98("elec-mcu-1",2,{p:[
 [{t:"p",x:"With the button pressed, the pull-up carries current from 3.3 V to ground:"},
  {t:"step",f:"I = 3.3 V / 10 kΩ",v:"0.33",u:"mA",fin:1}],
 [{t:"pc",l:"1 kΩ",c:"current when pressed",v:"3.3 mA",warn:1},
  {t:"pc",l:"1 MΩ",c:"current when pressed",v:"3.3 µA"}],
 {t:"p",x:"1 kΩ wastes 10× the current. 1 MΩ wastes almost none but holds the line so weakly that noise and leakage can flip it. 10 kΩ sits between."}]});

/* 3 · Plain text → Guess → chain. Typical pin limits: a few mA to about 20 mA. */
rc98("elec-mcu-1",3,{p:[
 {t:"p",x:"An output pin can source or sink only a few mA to tens of mA; the datasheet gives the limit."},
 [{t:"p",x:"Switch big loads with a transistor:"},
  {t:"chain",items:["pin","gate resistor","MOSFET","motor"],hl:2}],
 {t:"take",x:"Use a logic-level MOSFET (rated $R_{DS(on)}$ at your pin voltage) and a diode across the motor to catch its inductive spike."}],
 g:{at:1,q:"A small motor draws 500 mA. Drive it straight from a pin?",o:[
  ["yes, at 3.3 V",0,"The voltage doesn't fix it: 500 mA is many times a pin's limit."],
  ["no, use a transistor",1,"500 mA is far over a pin's few-to-tens of mA. The pin switches a transistor, and the transistor carries the motor current."]]}});

/* ---------- elec-mcu-2 · PWM and duty cycle ---------- */
/* 0 · Terms, no interaction. LFIG17 figure draws a 30 % PWM wave and its average. */
rc98("elec-mcu-2",0,{p:[
 {t:"p",x:"**Pulse-width modulation (PWM)** switches a pin fully on and fully off, quickly."},
 {t:"p",x:"The **duty cycle** $D$ is the fraction of each period the pin is on."}]});

/* 1 · Formula → Guess → value row. 0.25 × 12 = 3 V. */
rc98("elec-mcu-2",1,{p:[
 {t:"p",x:"A load that responds slowly, like a motor, a heater or an LED seen by the eye, behaves as if it got the average."},
 {t:"eq",lab:"Average voltage",eq:"V_{avg} = D × V_{supply}",cap:"load much slower than one PWM period"},
 {t:"vt",l:"25 % duty on 12 V",v:"V_{avg} = 3",u:"V"}],
 g:{at:2,q:"25 % duty on a 12 V supply. The motor acts as if it got…",o:[
  ["3 V",1,"V_{avg} = 0.25 × 12 = 3 V."],
  ["9 V",0,"That's the off fraction. Duty cycle is the fraction of time on."],
  ["6 V",0,"That's 50 % duty. At 25 % the pin is on a quarter of the time."]]}});

/* 2 · Plain text → compare pair, Fill "almost no". Resistor dropping 6 V at 1 A: 6 W. */
rc98("elec-mcu-2",2,{p:[
 {t:"p",x:"A switch is either fully on (no voltage across it) or fully off (no current), so it wastes [[almost no]] power."},
 [{t:"pc",l:"PWM switch",c:"fully on or fully off",v:"≈ 0 W"},
  {t:"pc",l:"Series resistor",c:"dropping 6 V at 1 A",v:"6 W",warn:1}],
 {t:"p",x:"Not quite zero: a little is lost in the switch's on-resistance and during each transition."}]});

/* 3 · Rule → formula → value row, no interaction. 2^10 = 1,024; 1/1,024 = 0.098 %. */
rc98("elec-mcu-2",3,{p:[
 {t:"p",x:"The timer's resolution sets how finely the duty cycle can be set."},
 {t:"eq",lab:"Duty levels",eq:"levels = 2^n",cap:"n-bit timer counting its full range"},
 [{t:"vt",l:"10-bit timer",v:"1,024",u:"levels"},
  {t:"rel",x:"Each step is about 0.1 % duty."}]]});

/* ---------- elec-mcu-3 · ADC resolution and scaling ---------- */
/* 0 · Formula → Guess → scaling table. n + 1 bits: 2× codes, step ÷2; n + 2: ÷4. */
rc98("elec-mcu-3",0,{p:[
 {t:"p",x:"An analog-to-digital converter maps 0 to $V_{ref}$ onto whole-number codes. An $n$-bit ADC has $2^n$ codes."},
 {t:"eq",lab:"Step size",eq:"step = V_{ref} / 2^n",cap:"ideal ADC, input between 0 and V_{ref}"},
 {t:"tbl",head:["Bits","Codes","Step"],rows:[["n","×1","×1"],["n + 1","×2","÷2"],["n + 2","×4","÷4"]],hi:[2,2]}],
 g:{at:2,q:"Add 2 bits to an ADC. The step size…",o:[
  ["halves",0,"That's one extra bit. Each bit doubles the codes, so two bits make 4× as many."],
  ["drops to a quarter",1,"2 more bits give 2² = 4× the codes over the same range, so each step is a quarter."]]}});

/* 1 · Worked example, no interaction. 3.3/4,096 = 0.806 mV; 2,048 × 3.3/4,096 = 1.65 V. */
rc98("elec-mcu-3",1,{p:[
 {t:"eq",lab:"Code back to volts",eq:"V = code × V_{ref} / 2^n",cap:"some datasheets divide by 2ⁿ − 1; the difference is under one step"},
 [{t:"p",x:"12-bit ADC, $V_{ref}$ = 3.3 V, reading code 2,048:"},
  {t:"step",f:"step = 3.3 / 4,096",v:"0.806",u:"mV"}],
 {t:"step",f:"V = 2,048 × 3.3 / 4,096",v:"1.65",u:"V",fin:1}]});

/* 2 · Plain text → value row, Fill "under a third". 1/3.3 = 30.3 %: 0.303 × 4,096 = 1,241 codes. ×3 → 3/3.3 = 90.9 %. */
rc98("elec-mcu-3",2,{p:[
 {t:"p",x:"A 0–1 V sensor on a 0–3.3 V ADC uses [[under a third]] of the codes, wasting resolution."},
 {t:"vt",l:"12-bit, 0–1 V signal",v:"≈ 1,241 of 4,096",u:"codes"},
 {t:"p",x:"Amplify it 3× first (0–3 V) and it uses about 91 % of the codes."}]});

/* 3 · Plain text → worked step, no interaction. 10 × 10/(22 + 10) = 3.125 V, 5.3 % under 3.3 V; 5 % resistors could reach ≈ 3.34 V. */
rc98("elec-mcu-3",3,{p:[
 {t:"p",x:"Inputs above $V_{ref}$ clip: they all read the top code (4,095 at 12 bits)."},
 {t:"p",x:"Inputs above the supply can damage the pin. Scale them down first with a divider or an op-amp."},
 [{t:"p",x:"0–10 V signal, divider 22 kΩ over 10 kΩ:"},
  {t:"step",f:"10 × 10 / (22 + 10)",v:"≈ 3.1",u:"V",fin:1}],
 {t:"p",x:"Only 5 % under 3.3 V: use 1 % resistors so tolerance can't push it over."}]});

/* ---------- elec-mcu-4 · Serial links and timing ---------- */
/* 0 · Process chain → Guess → takeaway. 1 + 8 + 1 = 10 bits (8N1). */
rc98("elec-mcu-4",0,{p:[
 {t:"p",x:"**UART** sends each byte as a framed burst of bits."},
 {t:"chain",items:["start bit","8 data bits","stop bit"],hl:1},
 {t:"take",x:"1 + 8 + 1 = 10 bits on the wire per byte, with the usual one stop bit."}],
 g:{at:2,q:"How many bits go on the wire for each byte?",o:[
  ["8",0,"That's only the data. The start and stop bits frame every byte."],
  ["10",1,"1 start + 8 data + 1 stop = 10."],
  ["9",0,"There's a start bit and a stop bit, so 2 extra bits."]]}});

/* 1 · Formula → worked steps, no interaction. 115,200/10 = 11,520 B/s; 1,000/11,520 = 0.0868 s = 86.8 ms. */
rc98("elec-mcu-4",1,{p:[
 {t:"eq",lab:"UART throughput",eq:"bytes/s = baud / 10",cap:"1 start, 8 data, 1 stop bit; no gaps between bytes"},
 {t:"step",f:"115,200 / 10",v:"11,520",u:"bytes/s"},
 {t:"step",f:"1,000 bytes: 1,000 / 11,520",v:"86.8",u:"ms",fin:1}]});

/* 2 · Plain text → Guess → value row. Stop bit sampled ~9.5 bit times after the start edge; 0.5/9.5 = 5.3 % is the
   ideal limit, edge and sampling uncertainty bring the practical combined limit to about 2–3 %. */
rc98("elec-mcu-4",2,{p:[
 {t:"p",x:"There's no shared clock: each side times bits from its own clock, starting at the start bit's edge."},
 {t:"p",x:"The receiver samples each bit near its middle. A clock error adds up bit by bit."},
 [{t:"vt",l:"Combined clock mismatch",v:"under ≈ 2–3",u:"%"},
  {t:"rel",x:"A design rule with margin: near 5 %, the sample point drifts out of the last bits."}]],
 g:{at:2,q:"A small clock mismatch causes errors first at…",o:[
  ["the start of the frame",0,"Timing restarts at each start edge, so the first bits are still close to centre."],
  ["the end of the frame",1,"The error grows with every bit, so the last bits drift furthest from centre."]]}});

/* 3 · Plain text → compare pair, Fill "much less". I²C 100 kHz–1 MHz typical; SPI often 10 MHz or more. */
rc98("elec-mcu-4",3,{p:[
 {t:"p",x:"SPI and I²C send a clock line with the data, so timing tolerance matters [[much less]]."},
 [{t:"pc",l:"SPI",c:"clock, two data lines, chip select",v:"usually faster"},
  {t:"pc",l:"I²C",c:"clock and data, shared by many chips",v:"only 2 wires"}],
 {t:"p",x:"SPI often runs at 10 MHz or more; I²C usually at 100 kHz to 1 MHz."}]});

/* ---------- elec-motors-drives-1 · Current produces torque ---------- */
/* 0 · Process chain, no interaction. */
rc98("elec-motors-drives-1",0,{p:[
 {t:"p",x:"A permanent-magnet DC motor converts electrical input into rotation."},
 {t:"chain",items:["voltage","current","torque","rotation"],hl:2},
 {t:"p",x:"In a simple linear model, the winding current is what produces the electromagnetic torque."}]});

/* 1 · Rule → formula, Fill "proportional". */
rc98("elec-motors-drives-1",1,{p:[
 {t:"p",x:"Electromagnetic torque is [[proportional]] to winding current."},
 {t:"eq",lab:"Torque",eq:"τ = k_t I",cap:"linear motor model, fixed magnet field",vars:[["τ","torque, N·m"],["k_t","torque constant, N·m/A"],["I","winding current, A"]]},
 {t:"p",x:"Torque is a turning effect. Mechanical power also needs speed: $P = τω$."}]});

/* 2 · Plain text → Guess → takeaway. */
rc98("elec-motors-drives-1",2,{p:[
 {t:"p",x:"The turning effect comes from magnetic forces on the current-carrying conductors in the winding."},
 {t:"take",x:"Reverse the current and the torque reverses, as long as the magnet field keeps its direction: $τ = k_t I$ with $I$ negative."}],
 g:{at:1,q:"Reverse the winding current, same permanent magnets. The torque…",o:[
  ["reverses",1,"Force on a conductor flips with the current direction when the field stays the same."],
  ["keeps its direction",0,"The force depends on the current's direction. Only flipping both current and field would keep it."],
  ["drops to zero",0,"Torque depends on the size of the current, which is unchanged. Only its sign flips."]]}});

/* 3 · Worked example, no interaction. 0.1 × 2 = 0.2 N·m. */
rc98("elec-motors-drives-1",3,{p:[
 {t:"giv",lab:"DC motor",rows:[["k_t","0.1","N·m/A"],["I","2","A"]]},
 {t:"step",f:"τ = 0.1 × 2",v:"0.2",u:"N·m",fin:1},
 {t:"p",x:"That's the electromagnetic torque. Friction and other losses take some, so the load gets a little less."}]});

/* ---------- elec-motors-drives-2 · Back voltage and speed ---------- */
/* 0 · Plain text + change tiles, Fill "less". */
rc98("elec-motors-drives-2",0,{p:[
 {t:"p",x:"A spinning motor generates a **back voltage** that opposes the applied voltage while it's motoring."},
 {t:"giv",lab:"Spinning up, same applied voltage",rows:[["","↑","speed","up"],["","↑","back voltage","up"],["","↓","current","dn"]]},
 {t:"p",x:"Faster rotation leaves [[less]] voltage to push current through the winding resistance."}]});

/* 1 · Legend → formula → rearranged, no interaction. */
rc98("elec-motors-drives-2",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["V","terminal voltage"],["I","winding current"],["R","winding resistance"],["k_e","back-voltage constant, V·s/rad"],["ω","speed, rad/s"]]},
 {t:"eq",lab:"Motor voltage",eq:"V = I R + k_e ω",cap:"steady current, winding inductance ignored"},
 [{t:"p",x:"The terminal voltage splits into a resistive drop and the back voltage. Solved for speed:"},
  {t:"eq",eq:"ω = (V − I R) / k_e"}]]});

/* 2 · Formulas → Guess → change tiles. */
rc98("elec-motors-drives-2",2,{p:[
 [{t:"p",x:"To estimate loaded speed, combine"},{t:"eq",eq:"I = τ / k_t"},{t:"eq",eq:"ω = (V − I R) / k_e",cap:"fixed terminal voltage, steady state"}],
 {t:"giv",lab:"More load torque",rows:[["","↑","current","up"],["","↑","I R drop","up"],["","↓","speed","dn"]]}],
 g:{at:1,q:"Load torque rises, same supply voltage. The speed…",o:[
  ["drops",1,"More torque needs more current, the IR drop grows, and less voltage is left for back voltage, so ω falls."],
  ["rises",0,"More load needs more current, which takes voltage away from the back voltage. Speed falls."],
  ["stays the same",0,"Only with R = 0. The IR drop grows with current and leaves less for k_e ω."]]}});

/* 3 · Worked example, no interaction. I = 0.2/0.1 = 2 A; ω = (12 − 2·2)/0.1 = 80 rad/s; 80·60/(2π) = 763.9 rpm. */
rc98("elec-motors-drives-2",3,{p:[
 {t:"giv",lab:"DC motor",rows:[["V","12","V"],["R","2","Ω"],["k_e = k_t","0.1","SI"],["τ","0.2","N·m"]]},
 {t:"step",f:"I = 0.2 / 0.1",v:"2",u:"A"},
 {t:"step",f:"ω = (12 − 2 × 2) / 0.1",v:"80",u:"rad/s",fin:1},
 {t:"p",x:"About 764 rpm."}]});

/* ---------- elec-motors-drives-3 · Acceleration and current limits ---------- */
/* 0 · Plain text, no interaction. */
rc98("elec-motors-drives-3",0,{p:[
 {t:"p",x:"Motor torque first has to supply the opposing load torque. Only what's left over accelerates the rotating inertia."},
 {t:"p",x:"A drive's current limit caps the motor torque ($τ = k_t I$)."},
 {t:"take",x:"So the current limit also sets an acceleration limit."}]});

/* 1 · Legend → formula → Guess → relation. */
rc98("elec-motors-drives-3",1,{p:[
 {t:"eq",lab:"Angular acceleration",eq:"α = (k_t I − τ_{load}) / J",cap:"rigid drive, J referred to the motor shaft",vars:[["α","angular acceleration, rad/s²"],["J","total inertia at the motor shaft, kg·m²"],["τ_{load}","opposing load torque"]]},
 {t:"p",x:"The top of the fraction is the net torque: motor torque minus load torque."},
 {t:"rel",x:"Same net torque, twice the inertia: half the acceleration. $α ∝ 1/J$"}],
 g:{at:2,q:"Double $J$, same current and load. The acceleration…",o:[
  ["halves",1,"α = net torque / J, so twice J gives half α."],
  ["doubles",0,"Inertia resists acceleration: J sits on the bottom of the fraction."],
  ["stays the same",0,"Net torque is the same, but it now has twice the inertia to speed up."]]}});

/* 2 · Rule → formula, Fill "changes in". */
rc98("elec-motors-drives-3",2,{p:[
 {t:"p",x:"Inertia resists [[changes in]] speed, not steady speed itself."},
 {t:"eq",lab:"Speed change",eq:"Δω = α t",cap:"constant net torque over time t"},
 {t:"p",x:"At steady speed, the motor only needs torque for the load and friction."}]});

/* 3 · Plain text → formula → value row, no interaction. (12 − 4·2)/0.1 = 40 rad/s. */
rc98("elec-motors-drives-3",3,{p:[
 {t:"p",x:"At low speed the drive can hold its current limit $I_{max}$. As speed rises, the back voltage $k_e ω$ grows until the drive runs out of voltage."},
 {t:"eq",lab:"Where the current limit ends",eq:"ω ≈ (V_{max} − I_{max} R) / k_e",cap:"steady current, winding inductance ignored"},
 [{t:"vt",l:"12 V, 2 Ω, $I_{max}$ = 4 A, $k_e$ = 0.1",v:"ω ≈ 40",u:"rad/s"},
  {t:"rel",x:"Faster than that, current and torque fall."}]]});

/* 4 · Worked example, no interaction. 0.1·4 = 0.4 N·m; (0.4 − 0.1)/0.01 = 30 rad/s². */
rc98("elec-motors-drives-3",4,{p:[
 {t:"giv",lab:"Motor at its current limit",rows:[["k_t","0.1","N·m/A"],["I","4","A"],["τ_{load}","0.1","N·m"],["J","0.01","kg·m²"]]},
 {t:"step",f:"k_t I = 0.1 × 4",v:"0.4",u:"N·m"},
 {t:"step",f:"α = (0.4 − 0.1) / 0.01",v:"30",u:"rad/s²",fin:1}]});

/* ---------- elec-motors-drives-4 · Regeneration and power flow ---------- */
/* 0 · Plain text, Fill "generate". */
rc98("elec-motors-drives-4",0,{p:[
 {t:"p",x:"Driven by outside motion, a motor can [[generate]] electrical power."},
 {t:"p",x:"With speed positive, negative electromagnetic torque opposes the rotation."},
 {t:"take",x:"That braking torque turns mechanical power into electrical power."}]});

/* 1 · Formula → value rows, no interaction. */
rc98("elec-motors-drives-4",1,{p:[
 {t:"eq",lab:"Motor voltage",eq:"V = I R + k_e ω",cap:"current I counted positive into the motor"},
 [{t:"vt",l:"Electrical power in",v:"P_{elec} = V I",u:""},
  {t:"vt",l:"Electromagnetic power out, friction ignored",v:"P_{mech} = k_t I ω",u:""}],
 {t:"p",x:"Either one turns negative when power flows the other way."}]});

/* 2 · Formula → Guess → takeaway. VI = I²R + k_e ω I, and k_e = k_t: P_elec = P_mech + I²R. */
rc98("elec-motors-drives-4",2,{p:[
 {t:"p",x:"Multiply $V = I R + k_e ω$ by $I$, with $k_e = k_t$ in SI units:"},
 {t:"eq",lab:"Power balance",eq:"P_{elec} = P_{mech} + I^2 R"},
 {t:"take",x:"$I^2$ is positive either way: the winding heats even while power flows back."}],
 g:{at:2,q:"Regenerating, the current is negative. Winding heat $I^2 R$ is…",o:[
  ["still positive",1,"Squaring removes the sign: (−1)² × 2 = +2 W."],
  ["negative",0,"I² can't be negative. Electrical and mechanical power reverse; the heat doesn't."]]}});

/* 3 · Worked example, no interaction. k_e ω = 0.1·140 = 14 V; I = (12 − 14)/2 = −1 A; P_elec = 12·(−1) = −12 W;
   I²R = 1·2 = 2 W; P_mech = 0.1·(−1)·140 = −14 W, so 14 W in from the shaft = 12 W returned + 2 W heat. */
rc98("elec-motors-drives-4",3,{p:[
 {t:"giv",lab:"Motor driven faster by its load",rows:[["V","12","V"],["R","2","Ω"],["k_e = k_t","0.1","SI"],["ω","140","rad/s"]]},
 [{t:"step",f:"k_e ω = 0.1 × 140",v:"14",u:"V"},{t:"step",f:"I = (12 − 14) / 2",v:"−1",u:"A"}],
 [{t:"step",f:"P_{elec} = 12 × (−1)",v:"−12",u:"W"},{t:"step",f:"I^2 R = 1 × 2",v:"2",u:"W",fin:1}],
 {t:"p",x:"The shaft puts in 14 W: 12 W goes back to the supply and 2 W heats the winding."}]});

/* 4 · Process chain, Fill "rises". */
rc98("elec-motors-drives-4",4,{p:[
 {t:"p",x:"Regeneration only works if the drive and supply can accept the returned energy."},
 {t:"chain",items:["motor","drive","DC bus","battery or brake resistor"],hl:2},
 {t:"p",x:"If nothing takes it, the bus voltage [[rises]], so it needs another path, such as a braking resistor circuit."}]});

try{NEWS.unshift({d:"2026-11-25",t:["Electrical cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b109",k:"rc109a",t:"Reveal cards: Electrical",c:"All 68 remaining cards in the 20 electrical lessons, from diodes and dividers to motor regeneration.",go:["lesson","elec1"]})}catch(e){}

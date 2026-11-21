/* ===== v73 (2026-11-21): content fixes from Seth's b71 flags =====
   Same question indices and lesson ids, so progress, mistakes and stats keys are unchanged. Patched on LS after
   build() (covers BASE and BUNDLE lessons), each guarded by the current text so a later rewrite isn't clobbered.
   - req-lang-1 #5: the "order the steps of a sentence" question is now strongest → weakest word; talk card explained.
   - cad-modeling-3 #2 reworded, #4 ranks DOF left (most first). cad-modeling-4 #4: 8 lengths × 5 options, no sizes.
   - cad-sketch-constraints-3: driven/driving named alongside reference. cad-sketch-constraints-4 #0 gives h.
   - elec-sensors-4 #0 gives k, #1/#2 shorter. elec-sensors-3: root-sum-square explained, #1 one step, #2 plainer.
   - elec3 #0 only standard E12 values; RC card says why low passes and high fades. elec4 MOSFET card explains heat.
   - calc1-limits-1 #3 easier (linear inside the log), composition card gets an example. */
try{FB.ver="b73"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Clearer questions in CAD constraints and assemblies, sensors (aliasing, uncertainty), electronics and requirements language.","SolidWorks terms: driven and driving dimensions."]})}catch(e){}

function fix73(){
 const L=id=>LS.find(l=>l.id==id);
 const q=(id,i,start,patch,eqs)=>{try{const l=L(id),x=l&&l.qs[i];if(x&&String(x.q||"").startsWith(start)){Object.assign(x,patch);if(eqs)QD30[id+"#"+i]=[QH30(x.q),eqs]}}catch(e){}};
 const c=(id,i,start,text)=>{try{const l=L(id);if(l&&typeof l.cards[i]=="string"&&l.cards[i].startsWith(start))l.cards[i]=text}catch(e){}};

 q("req-lang-1",5,"Fix “The pump shall deliver",{q:"Order these words from the strongest commitment to the weakest.",items:["Shall","Should","May"],
  why:"“Shall” is a promise that gets verified. “Should” is a goal the team aims for but can miss without breaking the contract. “May” only gives permission and commits nobody to anything."});
 c("req-lang-1",5,"How it sounds at work:","How it sounds at work: “Is that a shall or a should?” asks whether something is promised or only hoped for. “That’s a will statement” means the line describes a fact, so nobody has to test it. “Two shalls in one sentence” means split the sentence so each promise can be checked on its own.");

 q("cad-modeling-3",2,"A shaft is concentric with a bore",{q:"A shaft sits in a bore (concentric mate), and its shoulder rests against the housing face (coincident mate). What can the shaft still do?",
  ans:"Spin about its own axis",wrong:["Slide in and out along its axis","Nothing: it is fully fixed","Tip over the edge of the shoulder"],
  why:"Concentric leaves only spin and slide along the axis. The shoulder against the face stops the slide, so only the spin is left. “Fully fixed” forgets that neither mate stops rotation; tipping was already removed by the concentric mate."});
 q("cad-modeling-3",4,"Rank these mates by degrees of freedom removed",{q:"A free part has 6 DOF. Rank these single mates by the DOF the part has left, most first.",
  items:["Distance between two points","Coincident, face to face","Concentric, axis to axis","Fixed"],
  why:"They remove 1, 3, 4 and 6 DOF, leaving 5, 3, 2 and 0. A distance mate only sets one gap; fixed locks everything."});
 q("cad-modeling-4",4,"A configuration table has lengths",{q:"A bracket comes in 8 lengths, and every length comes in 5 hole-pattern options. How many configurations does the table need?",a:40,
  why:"Every length pairs with every hole pattern: 8 × 5 = 40. Adding them (13) counts the options, not the combinations."},["Nc = n1·n2"]);

 c("cad-sketch-constraints-3",2,"A reference dimension reports","A reference dimension reports a size without controlling it; SolidWorks calls it a driven dimension. The dimensions that do control the sketch are driving dimensions. A driven dimension lets you read a derived size without adding another equation to the sketch solver.");
 q("cad-sketch-constraints-3",2,"AB and BC are driving dimensions",{ans:"A reference (driven) dimension",wrong:["A third driving dimension","A fixed relation on all three points","An equality constraint between AB and BC"],
  why:"A reference (driven) dimension reports AC and follows AB and BC. Making AC a third driving dimension repeats what AB + BC already sets, which is redundant at best and conflicting after an edit. Fixing the points stops all edits; making AB = BC adds a rule nobody asked for."});
 q("cad-sketch-constraints-4",0,"An isosceles sketch has equal sides L = 50 mm and base b = 80 mm.",{q:"An isosceles sketch has equal sides L = 50 mm and base b = 80 mm, so the apex height is h = √(50² − 40²) = 30 mm. For the upper solution, what is |dh/db| = b/(4h)?",
  why:"|dh/db| = 80/(4 × 30) = 0.6667: each extra mm of base lowers the apex by about 0.67 mm. Using h = 40 (half the base) instead of the height gives 0.5."},["dh = b/(4·h)","h = √(L^2 − (b/2)^2)"]);

 c("elec-sensors-4",1,"For a signal limited to bandwidth B","For a signal limited to bandwidth B, sample at fs > 2B. A sine at f shows up at fa = |f − k·fs|, where k·fs is the multiple of fs nearest to f. Example: fs = 1000 Hz and f = 900 Hz: the nearest multiple is 1000 (k = 1), so it appears at 100 Hz.");
 q("elec-sensors-4",0,"A vibration sensor samples at fs = 1000 Hz.",{q:"A sensor samples at fs = 1000 Hz. Interference at f = 900 Hz is not filtered out. Using fa = |f − k·fs| with k = 1 (1000 Hz is the multiple of fs nearest 900 Hz), at what frequency fa does it show up, in Hz?",
  why:"fa = |900 − 1 × 1000| = 100 Hz. Using k = 0 gives back 900 Hz, which is above fs/2 = 500 Hz and so cannot appear in the sampled data."},["fa = abs(f − k·fs)","fs > 2B"]);
 q("elec-sensors-4",1,"A system must preserve real 100 Hz vibration",{q:"You want real 100 Hz vibration. Interference at 900 Hz, sampled at 1000 Hz, also shows up at 100 Hz. Why can’t a digital filter at 100 Hz fix it?",
  ans:"It would remove the wanted 100 Hz vibration too",wrong:["A digital filter moves the interference back to 900 Hz","900 Hz cannot alias because it is below fs","Recording more samples separates the two"],
  why:"After sampling, the alias and the real signal are both at 100 Hz, so any filter that removes one removes the other. Digital filters can’t move a signal back to 900 Hz; anything above fs/2 (500 Hz) aliases, not only signals above fs; and more samples of the same mix are still mixed."});
 q("elec-sensors-4",2,"A sensor must preserve frequencies through B = 200 Hz.",{q:"You need signals up to 200 Hz. The analog filter only blocks noise well from 350 Hz up, so half the sample rate must be above 350 Hz. Which sample rate works?",
  why:"fs/2 must exceed 350 Hz, so fs > 700 Hz: 800 Hz works. 400 Hz is just 2 × 200 Hz and ignores the filter; 500 Hz gives fs/2 = 250 Hz; 700 Hz puts fs/2 exactly at 350 Hz, not above it."});

 c("elec-sensors-3",0,"Standard uncertainty describes","Standard uncertainty is the typical size of a measurement’s error (one standard deviation). Independent errors combine by root-sum-square: square each, add them, take the square root. They partly cancel because two independent errors are rarely both at their worst, so 0.3 K and 0.4 K combine to 0.5 K, not 0.7 K. Errors that move together (correlated) don’t follow this rule.");
 q("elec-sensors-3",1,"A sensor’s independent random uncertainty is 2 K",{q:"The mean of 16 readings has a random uncertainty of 0.5 K (2 K/√16) and a separate, independent calibration uncertainty of 1.2 K. What is their combined standard uncertainty, in K?",
  why:"Root-sum-square: √(0.5² + 1.2²) = √1.69 = 1.3 K. Adding them directly (1.7 K) treats independent errors as if they always line up."},["u = √(ua² + ub²)"]);
 q("elec-sensors-3",2,"The same thermometer measures Ta and Tb",{q:"One thermometer reads every temperature 0.5 K too high, the same offset b in both readings. You measure Ta and Tb and subtract. What happens to b in Ta − Tb?",
  ans:"It cancels out",wrong:["It adds √2 × its uncertainty","It doubles, because there are two readings","It only goes away after averaging many readings"],
  why:"(Ta + b) − (Tb + b) = Ta − Tb, so b drops out. √2 treats the two offsets as independent errors, but they are the same error. Doubling would need them to add. Averaging never removes a fixed offset; subtracting does."});

 q("elec3",0,"5 V supply, LED drops 2 V.",{q:"5 V supply, LED drops 2 V. Which standard E12 resistor gives the most current without going over 10 mA?",
  ans:"330 Ω",wrong:["270 Ω","220 Ω","390 Ω"],
  why:"R = (5 − 2)/0.010 = 300 Ω, which isn’t an E12 value, so round up. 330 Ω gives 9.1 mA. 270 Ω (11.1 mA) and 220 Ω (13.6 mA) go over the limit; 390 Ω (7.7 mA) is safe but dimmer than it needs to be."},["R = (Vs − Vf) / I"]);
 c("elec3",1,"An RC low-pass has cutoff","An RC low-pass has cutoff f = 1/(2πRC). Well below f the input changes slowly, so the capacitor has time to charge and follow it: the signal passes. Well above f the input flips faster than the capacitor can charge through R, so the output barely moves: each 10× rise in frequency cuts it about 10×. At f itself the output is about 0.71 of the input.");
 c("elec4",1,"A MOSFET must be fully on to run cool.","A MOSFET used as a switch should be fully on, so it acts like a tiny resistor, RDS(on). Only partly on, its resistance is much higher and it heats up, because power lost = I² × R. Check RDS(on) at the gate voltage you actually drive, not just Vgs(th), the voltage where it barely starts to conduct.");

 q("calc1-limits-1",3,"Let f(u) = ln u and g(x) = x² − 4.",{q:"Let f(u) = ln u and g(x) = x + 2. What is the domain of f(g(x)) over the real numbers?",ans:"x > −2",wrong:["x ≥ −2","x > 2","x > 0"],
  why:"ln needs a positive input: x + 2 > 0, so x > −2. x ≥ −2 lets in ln 0, which is undefined. x > 2 flips the sign of the shift. x > 0 checks x instead of g(x) = x + 2."});
 c("calc1-limits-1",5,"Why it works this way: the ranges never have to match.","The ranges never have to match. Example: f(u) = √u and g(x) = x − 4. g can give negative outputs, and √ can’t take those, but that doesn’t stop you composing them: you just keep the x values where x − 4 ≥ 0, so x ≥ 4.");
}
try{const _bu73=build;build=function(){const r=_bu73.apply(this,arguments);try{fix73()}catch(e){}return r}}catch(e){}

try{[
 {b:"b73",k:"rl73",t:"Requirements word order",c:"Order question is now Shall → Should → May.",go:["q","req-lang-1",5]},
 {b:"b73",k:"cm73",t:"DOF left ranking",c:"Rank by DOF left, most first: distance, coincident, concentric, fixed.",go:["q","cad-modeling-3",4]},
 {b:"b73",k:"cf73",t:"8 × 5 configurations",c:"No sizes, answer 40; calculator gets n1 and n2.",go:["q","cad-modeling-4",4]},
 {b:"b73",k:"dv73",t:"Driven/driving dimensions",c:"Answer reads “A reference (driven) dimension”.",go:["q","cad-sketch-constraints-3",2]},
 {b:"b73",k:"hh73",t:"h given",c:"Question states h = 30 mm and the formula.",go:["q","cad-sketch-constraints-4",0]},
 {b:"b73",k:"al73",t:"Aliasing k given",c:"k = 1 is given with the reason.",go:["q","elec-sensors-4",0]},
 {b:"b73",k:"un73",t:"Uncertainty one step",c:"Random 0.5 K and calibration 1.2 K given; answer 1.3.",go:["q","elec-sensors-3",1]},
 {b:"b73",k:"r73",t:"E12 options only",c:"Options 330, 270, 220, 390 Ω.",go:["q","elec3",0]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

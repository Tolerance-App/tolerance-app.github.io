/* ===== v65 (2026-11-18): easier wording on flagged questions and cards =====
   Seth: "Work on any flag calling out unclear wording, too hard of an answer. Anything that would deter the user.
   Just quick fixes, nothing crazy, make it easier, fix the wording."
   Question order and ids are unchanged (keys stay "<lesson>#<index>"); only text, givens and hints change.
   1. mech-beams-2 cards: intuition first, one worked example (card 4) kept as the only number-heavy card.
   2. mech-beams-2 #0, #1, #3: I is given, so the question is one step, not "calculate I, then...".
   3. mech4 #3: the "rotate the section" question gives the 4× change in I and asks only for the new deflection.
   4. mech-machine-4 #4: the question states bolt swing = C × load swing.
   5. ctrl-exam-1 cards 1–2: "plant", the characteristic equation and the Routh column explained in plain words;
      #1 gets a hint. Old artifact-era flags (claude.ai Tolerance beta / web app) were checked: their wording and
      difficulty items were already fixed in v32. */
try{FB.ver="b65"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Beam lessons explain the idea before the numbers, and their questions give you I instead of making you work it out first.","Clearer wording in Routh and gain limits, and in a few bolt and cantilever questions."]})}catch(e){}

(function(){
 const L=id=>(typeof bq32=="function"?bq32(id):null);
 const P=(id,i,starts,o,eqs)=>{const q=patchQ32(id,i,starts,o);if(q&&eqs)eqFor32(id+"#"+i,q,eqs);return q};

 /* 1. mech-beams-2 cards (flag: "way too full of numbers... one card can have a worked problem, not all") */
 /* In BUNDLE the "In plain English" card is l.plain, so l.cards[i] here is card i+1 on screen. */
 try{const l=L("mech-beams-2");if(l&&l.cards&&l.cards.length==7&&/^For this cantilever/.test(l.cards[0])){
  l.plain="A beam bends less when its material sits far from the middle. Making it taller helps far more than making it wider.";
  l.cards[0]="Deflection of a cantilever with a tip load: δ = PL³/(3EI). More load or a longer beam bends it more, and length counts cubed. A stiffer material (bigger E) or a deeper section (bigger I) bends it less. Assumes a slender, linear-elastic beam and small deflection.";
  l.cards[1]="I says how far the material sits from the bending axis. For a rectangle I = bh³/12: width counts once, height counts cubed. A tube puts its material far out, so it gets a big I for little area.";
  l.cards[2]="Stress: the wall carries the biggest moment, M = PL, and the outer edge works hardest: σ = Mc/I, where c is the distance from the middle to that edge. E isn’t in it: a stiffer material bends less but carries the same stress at the same load.";
  l.cards[4]="Same load, length and material: make the beam twice as tall and it bends 8× less, with 4× less stress. Make it twice as wide and both halve. That’s why floor joists stand on edge.";
  l.cards[5]="Same material, same amount of it: a tube 25 mm across with a 15 mm hole is about 2× stiffer than a 20 mm solid rod, because its material sits farther from the middle.";
 }}catch(e){}

 /* 2. mech-beams-2 questions: give I (flags: "you can't have them calculating I", "too hard") */
 P("mech-beams-2",0,"A uniform slender cantilever remains",{t:"fill",
  q:"A slender steel cantilever (E = 200 GPa) is 0.500 m long and carries a 100 N tip load. Its section has I = 133,333 mm⁴. Using δ = PL³/(3EI), what is the tip deflection in mm?",
  a:0.15625,tol:.005,unit:"mm",
  hint:"Work in N and mm: L = 500 mm and E = 200,000 N/mm².",
  why:"δ = 100 × 500³ / (3 × 200,000 × 133,333) = 0.156 mm. Using E = 200 mixes GPa with N/mm² and gives an answer 1000× too big. Leaving L in metres while I is in mm⁴ mixes units. Dropping the 3 gives 3× too much."},
  ["δ = PL³ / (3EI)"]);
 P("mech-beams-2",1,"A uniform slender rectangular cantilever",{t:"fill",
  q:"A cantilever 500 mm long carries a 100 N tip load. Its section is 40 mm tall with I = 106,667 mm⁴, so the outer edge is c = 20 mm from the middle. Using σ = Mc/I with M = PL, what is the bending stress at the wall, in MPa?",
  a:9.375,tol:.005,unit:"MPa",
  hint:"M = 100 N × 500 mm = 50,000 N·mm. N/mm² is the same as MPa.",
  why:"M = 100 × 500 = 50,000 N·mm, so σ = 50,000 × 20 / 106,667 = 9.375 MPa. Using c = 40 mm (the full height) doubles it. P divided by the section area is a direct stress, not bending. E isn’t needed: the stress comes from the load and the shape."},
  ["σ = Mc / I","Mmax = PL"]);
 P("mech-beams-2",3,"A uniform slender concentric tube",{t:"mc",
  q:"A steel tube cantilever, OD 25 mm and ID 15 mm, is 500 mm long with a 100 N tip load. E = 200,000 N/mm² and the tube’s I = 16,690 mm⁴. Using δ = PL³/(3EI) and σ = PL(OD/2)/I, which pair is right?",
  ans:"δ ≈ 1.248 mm and σ ≈ 37.45 MPa",
  wrong:["δ ≈ 2.653 mm and σ ≈ 63.66 MPa","δ ≈ 1.248 mm and σ ≈ 74.90 MPa","δ ≈ 0.6241 mm and σ ≈ 18.72 MPa"],
  hint:"c is the outer radius: 25/2 = 12.5 mm.",
  why:"δ = 100 × 500³ / (3 × 200,000 × 16,690) = 1.248 mm and σ = 100 × 500 × 12.5 / 16,690 = 37.45 MPa. 2.653 / 63.66 is the solid 20 mm rod with the same area. 74.90 MPa uses the full diameter instead of the radius. 0.6241 / 18.72 uses J = 2I, which is for twisting, not bending."},
  ["δ = PL³ / (3EI)","σ = Mc / I"]);

 /* 3. mech4 #3 (flag: "really hard, lots of work, bump it down") */
 P("mech4",3,"A small-deflection elastic cantilever has b",{t:"mc",
  q:"A cantilever bar is 40 mm wide and 20 mm tall, and its tip deflects 0.7813 mm. Turn the same bar on edge: 20 mm wide, 40 mm tall. That makes I four times bigger. Same load, length and material. What is the new tip deflection?",
  ans:"About 0.195 mm",
  wrong:["0.781 mm: same bar, same area, same deflection","About 0.098 mm: height is cubed, so 8× less","About 3.13 mm: bigger I, bigger deflection"],
  hint:"δ = PL³/(3EI): I is on the bottom.",
  why:"Deflection goes as 1/I, so 4× the I gives a quarter of the deflection: 0.7813 / 4 = 0.195 mm. Same area doesn’t mean same I. The height is cubed, but the width also halves, so I grows 8 × ½ = 4×, not 8×. Bigger I means a stiffer beam, so the deflection shrinks."},
  ["δ = PL³ / (3EI)","I = bh³ / 12"]);

 /* 4. mech-machine-4 #4 (flags: "too hard", "maybe include the rewritten equation") */
 try{const l=L("mech-machine-4"),q=l&&l.qs[4];if(q&&/^For a 10 kN load swing/.test(q.q)){
  q.q="The bolt carries C × the external load, so a 10 kN load swing moves the bolt by C × 10 kN. Rank these joints by bolt load swing, largest first.";
  q.why="Bolt swing = C × 10 kN: 0.6 → 6 kN, 0.4 → 4 kN, 0.25 → 2.5 kN, 0.1 → 1 kN. Bigger C, bigger share for the bolt.";
  eqFor32("mech-machine-4#4",q,["Fb = Fi + C·P"]);FIX32.push("ok mech-machine-4#4")}}catch(e){}

 /* 5. ctrl-exam-1 (flag: "Plant, eqn, next words... don't seem clear at all") */
 try{const l=L("ctrl-exam-1");if(l&&l.cards&&/^For unity negative feedback/.test(l.cards[0]||"")){
  l.cards[0]="The setup: a controller with gain K drives the plant (the thing being controlled, like a motor), here G(s) = K/[s(s+1)(s+5)]. The output is measured and subtracted from the command: that’s unity negative feedback. s is the Laplace variable; 1 and 5 s⁻¹ are the plant’s rates.";
  l.cards[1]="Closing the loop gives the characteristic equation s³ + 6s² + 5s + K = 0; its roots decide whether the response dies out. The Routh table turns those coefficients into one column: 1, 6, (30 − K)/6, K. If every entry is positive, the loop is stable.";
 }}catch(e){}
 try{const l=L("ctrl-exam-1"),q=l&&l.qs[1];if(q&&/^A unity-negative-feedback plant/.test(q.q)&&!q.hint){
  q.hint="Expand s(s+2)(s+6) into s³ + as² + bs. The loop is stable while K < a·b.";FIX32.push("ok ctrl-exam-1#1")}}catch(e){}
})();

try{TF48.unshift(
 {b:"b65",k:"beams65",t:"Beam cards: idea first",c:"Beam calculations: cards explain bending in words; only card 5 is a worked example. Then Q1 and Q2 give I, one step each.",go:["lesson","mech-beams-2"]},
 {b:"b65",k:"beamq65",t:"Beam stress: I given",c:"Gives I = 106,667 mm⁴ and c = 20 mm; answer 9.375 MPa.",go:["q","mech-beams-2",1]},
 {b:"b65",k:"rot65",t:"Turned-on-edge question",c:"Says I gets 4× bigger; asks only the new deflection (0.195 mm).",go:["q","mech4",3]},
 {b:"b65",k:"bolt65",t:"Bolt swing ranking",c:"Question now states bolt swing = C × load swing.",go:["q","mech-machine-4",4]},
 {b:"b65",k:"routh65",t:"Routh cards in plain words",c:"Cards 2–3 explain plant, feedback and the Routh column; Q2 has a Poke hint.",go:["lesson","ctrl-exam-1"]}
)}catch(e){}

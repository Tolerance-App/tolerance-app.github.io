/* Physics 1 · Motion in a line (unit "1d"). Lesson data only; format in docs/PHYSICS.md and codex/tasks/physics.md.
   p1-1d-3 is Claude's reference lesson for the physics courses (cards, figures, questions). */
PH.unit({course:"p1",section:"Describing motion",branch:"Motion in a line",ready:false,
 eqb:{"p1-kin":["Motion in a line",[
 ["Average velocity","v = (x − x0)/t","v average velocity (m/s), x final position (m), x0 start position (m), t time taken (s)"],
 ["Average acceleration","a = (v − v0)/t","a average acceleration (m/s²), v final velocity (m/s), v0 initial velocity (m/s), t time taken (s)"],
 ["Velocity, constant a","v = v0 + a·t","v velocity (m/s), v0 initial velocity (m/s), a constant acceleration (m/s²), t time (s)"],
 ["Position, constant a","x = x0 + v0·t + ½·a·t²","x position (m), x0 start position (m), v0 initial velocity (m/s), a constant acceleration (m/s²), t time (s)"],
 ["No time, constant a","v = √(v0² + 2·a·(x − x0))","v speed (m/s, the positive root), v0 initial velocity (m/s), a constant acceleration (m/s²), x position (m), x0 start position (m)"]]]}},[
{id:"p1-1d-3",lv:2,title:"Acceleration and velocity–time graphs",demo:"ph-acc",eqs:["p1-kin"],
 rc:[
  /* 0 · hook · no interaction */
  {p:[{t:"p",x:"Your speedometer shows **velocity**. **Acceleration** is how fast that reading changes."},
      {t:"p",x:"It's what you feel. Cruising at a steady 100 km/h on a smooth road feels like sitting still; braking pushes you forward."}]},
  /* 1 · Legend → formula · Fill "twice the". 30/10 = 3.0 m/s² */
  {p:[{t:"vars",lab:"First, the symbols",vars:[["a","average acceleration, in m/s²"],["Δv","change in velocity: final minus initial, in m/s"],["Δt","time the change takes, in s"]]},
      {t:"eq",eq:"a = Δv / Δt",cap:"average over Δt; motion along one straight line"},
      {t:"p",x:"The same $Δv$ in half the time means [[twice the]] acceleration."},
      {t:"vt",l:"0 → 30 m/s in 10 s",v:"a = 3.0",u:"m/s²"}]},
  /* 2 · sign of a · Guess. Δv = −5 − (−2) = −3 m/s */
  {p:[{t:"p",x:"Acceleration has a sign, like velocity. Take right as positive."},
      {t:"step",f:"Δv = −5 − (−2)",v:"−3",u:"m/s"},
      {t:"take",x:"Same signs for $v$ and $a$: speeding up. Opposite signs: slowing down."}],
   g:{at:1,q:"A cart moving left speeds up: $v$ goes from −2 to −5 m/s. What sign is $a$?",o:[
    ["Negative",1,"Δv = −5 − (−2) = −3 m/s, so a is negative even though the cart speeds up."],
    ["Positive",0,"Speeding up doesn't make a positive. The sign of a is the direction the velocity changes: here, to the left."]]}},
  /* 3 · slope · worked steps, figure. (10 − 2)/4.0 = 2.0 m/s² */
  {p:[{t:"p",x:"On a velocity–time graph, the **slope** is the acceleration: rise $Δv$ over run $Δt$."},
      {t:"step",f:"Δv = 10 − 2",v:"8.0",u:"m/s"},
      {t:"step",f:"a = 8.0 / 4.0",v:"2.0",u:"m/s²",fin:1},
      {t:"take",x:"Flat line: zero acceleration. Steeper line: larger acceleration."}]},
  /* 4 · area · Guess, figure. 2.0×4.0 = 8.0; ½×4.0×8.0 = 16; total 24 m (check: average v 6.0 × 4.0 = 24) */
  {p:[{t:"p",x:"The **area** between the line and the time axis is the **displacement**: velocity × time, added up."},
      {t:"step",f:"rectangle  2.0 × 4.0",v:"8.0",u:"m"},
      {t:"step",f:"triangle  ½ × 4.0 × 8.0",v:"16",u:"m"},
      {t:"step",f:"Δx = 8.0 + 16",v:"24",u:"m",fin:1}],
   g:{at:1,q:"How far does the cart go in these 4.0 s?",o:[
    ["24 m",1,"A 2 m/s rectangle (8 m) plus the triangle on top (16 m)."],
    ["40 m",0,"That's 10 m/s for all 4 s, but the cart only reaches 10 m/s at the very end."],
    ["8 m",0,"8 m/s is the change in velocity, not the area."]]}},
  /* 5 · area below the axis · Fill "subtracts from". ½×2×4 = 4 m above, 4 m below */
  {p:[{t:"p",x:"Below the time axis $v$ is negative: the cart is moving backward."},
      {t:"p",x:"Area below the axis [[subtracts from]] the displacement."},
      [{t:"pc",l:"Displacement",c:"areas with their signs",v:"4 − 4 = 0 m"},{t:"pc",l:"Distance",c:"every area counted positive",v:"4 + 4 = 8 m"}]]}
 ],
 figs:{
  3:{cap:"A cart's velocity rises from 2 m/s to 10 m/s in 4.0 s.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[0,12],xs:1,ys:2,h:150,
     lines:[{pts:[[0,2],[4,10]]}],vl:[4],pts:[{at:[0,2],l:"2 m/s",dx:7,dy:4},{at:[4,10],l:"10 m/s",a:"end",dx:-8,dy:-6}]}},
  4:{cap:"Same cart. The shaded area, split into a rectangle and a triangle, is how far it went.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[0,12],xs:1,ys:2,h:150,
     lines:[{pts:[[0,2],[4,10]]},{pts:[[0,2],[4,2]],c:"mu",dash:true}],area:{line:0,from:0,to:4},vl:[4]}},
  5:{cap:"v falls from +4 m/s to −4 m/s in 4.0 s.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[-6,6],xs:1,ys:2,h:150,
     lines:[{pts:[[0,4],[4,-4]]}],area:{line:0,from:0,to:4}}}},
 qs:[
  {t:"mc",q:"A cart's velocity goes from 3.0 m/s to 9.0 m/s in 2.0 s along a straight track. What is its average acceleration?",ans:"3.0 m/s²",
   wrong:["6.0 m/s²","4.5 m/s²","12 m/s²"],
   why:"a = Δv/Δt = (9.0 − 3.0)/2.0 = 3.0 m/s². 6.0 is Δv not divided by the time; 4.5 divides the final velocity by the time instead of the change; 12 multiplies Δv by Δt."},
  {t:"fill",q:"A cyclist slows from 12.0 m/s to 4.0 m/s in 5.0 s, riding in the positive direction. What is the average acceleration?",a:-1.6,tol:0.02,unit:"m/s²",
   why:"a = (4.0 − 12.0)/5.0 = −8.0/5.0 = −1.6 m/s². It's negative because the velocity got smaller in the positive direction. +1.6 drops the sign; −8.0 forgets to divide by the time."},
  {t:"mc",q:"Take right as positive. Which cart is slowing down?",ans:"v = +3 m/s, a = −1 m/s²",
   wrong:["v = −3 m/s, a = −1 m/s²","v = +3 m/s, a = +1 m/s²","v = −3 m/s, a = 0"],
   why:"Slowing down means v and a point opposite ways: +3 and −1. With −3 and −1 both point left, so that cart speeds up to the left. +3 and +1 speed up to the right. a = 0 means the speed doesn't change."},
  {t:"fill",q:"The graph shows a cart's velocity on a straight track. What is its acceleration?",a:-2,tol:0.02,unit:"m/s²",
   fig:{cap:"Velocity of a cart, from 8 m/s down to 0 in 4.0 s.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[0,10],xs:1,ys:2,h:150,lines:[{pts:[[0,8],[4,0]]}]}},
   why:"Slope = Δv/Δt = (0 − 8)/4.0 = −2.0 m/s². The line falls, so the slope is negative. 2.0 drops the sign; −8 is Δv without dividing by the 4.0 s."},
  {t:"fill",q:"Same cart as the graph: velocity falls steadily from 8 m/s to 0 in 4.0 s. How far does it travel in those 4.0 s?",a:16,tol:0.02,unit:"m",
   fig:{cap:"Velocity of a cart, from 8 m/s down to 0 in 4.0 s.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[0,10],xs:1,ys:2,h:150,lines:[{pts:[[0,8],[4,0]]}]}},
   why:"Distance is the area under the v–t line: a triangle, ½ × 4.0 × 8 = 16 m. 32 m uses 8 m/s for the whole 4 s (a rectangle), but the cart is slowing the whole time."},
  {t:"order",q:"Rank these straight-track motions by acceleration, most negative first.",
   items:["Velocity drops 6 m/s in 2.0 s","Velocity drops 2 m/s in 4.0 s","Velocity stays at 5 m/s","Velocity rises 9 m/s in 3.0 s"],
   why:"a = Δv/Δt: −6/2.0 = −3.0, −2/4.0 = −0.50, 0, and +9/3.0 = +3.0 m/s². A big drop over a long time can be a gentler acceleration than a smaller drop over a short time."},
  {t:"match",q:"Match each velocity–time graph to the motion it shows.",
   pairs:[["Flat line above the time axis","Moving forward at constant speed"],["Line on the time axis","At rest"],["Straight line rising from zero","Speeding up from rest at a steady rate"],["Straight line falling to zero from above","Slowing to a stop while moving forward"]],
   why:"Height is velocity and slope is acceleration. Flat means a = 0; on the axis means v = 0; rising from zero is speeding up from rest; falling toward zero from above is slowing down while still moving forward."},
  {t:"spot",q:"A student's solution: a car speeds up steadily from rest to 12 m/s in 4.0 s. Which line has the mistake?",
   lines:["The v–t graph is a straight line from (0, 0) to (4.0 s, 12 m/s).","Acceleration: a = 12 / 4.0 = 3.0 m/s².","Displacement: area = 12 × 4.0 = 48 m.","So the car covers 48 m in the 4.0 s."],bad:2,
   why:"The area under a line from 0 to 12 m/s is a triangle: ½ × 4.0 × 12 = 24 m. 12 × 4.0 is the rectangle the car would cover at 12 m/s the whole time. The last line only repeats that wrong number."},
  {t:"mc",q:"The graph shows a cart's velocity: +6 m/s falling steadily to −2 m/s over 4.0 s. What is its displacement over the 4.0 s?",ans:"8 m",
   wrong:["10 m","9 m","12 m"],
   fig:{cap:"v(t) crosses zero at t = 3.0 s.",plot:{x:"t (s)",y:"v (m/s)",xr:[0,5],yr:[-4,8],xs:1,ys:2,h:150,lines:[{pts:[[0,6],[4,-2]]}],area:{line:0,from:0,to:4}}},
   why:"The line crosses zero at 3.0 s. Above: ½ × 3.0 × 6 = 9 m forward. Below: ½ × 1.0 × 2 = 1 m backward. Displacement = 9 − 1 = 8 m. 10 m adds the backward part (that's the distance); 9 m stops at the axis; 12 m is a triangle that ignores the crossing."}
 ]}
]);

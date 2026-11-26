/* ===== Calculus III reveal cards (against b114) =====
   All 96 cards of 24 lessons as reveal cards (rc98, format in v98.js).
   Guess/Fill counts are recorded in calc3.md. */

/* ---------- calc3-geometry-1 · Vector components and norms ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-1",0,{p:[
 {"t":"p","x":"A **vector** describes a displacement or another quantity with direction and size."},
 {"t":"p","x":"Its **components** are the signed amounts along the chosen axes. Its **norm** is its length."}]});
/* 1 · Legend → formula, Fill “perpendicular”. Square and sum the legs by Pythagoras. */
rc98("calc3-geometry-1",1,{p:[
 {"t":"p","x":"A **basis** is a set of directions used to build every vector. An **orthonormal** basis uses unit directions that are mutually [[perpendicular]]."},
 {"t":"eq","eq":"‖v‖ = √{x^2 + y^2 + z^2}","cap":"x, y and z are the components of v along perpendicular unit axes."}]});
/* 2 · Rule → formula, no interaction. ‖v/‖v‖‖ = ‖v‖/‖v‖ = 1 for v ≠ 0. */
rc98("calc3-geometry-1",2,{p:[
 {"t":"p","x":"A **unit vector** has length one. To find the unit vector $u$ pointing along a nonzero vector $v$, divide all its components by the same length."},
 {"t":"eq","eq":"u = v / ‖v‖","cap":"v must have nonzero length."}]});
/* 3 · Worked example, Guess (5). 3² + 4² = 25; √25 = 5. */
rc98("calc3-geometry-1",3,{p:[
 {"t":"p","x":"Walk $3$ units east, then $4$ units north."},
 {"t":"step","f":"√{3^2 + 4^2}","v":"5","u":"","fin":1},
 {"t":"p","x":"The straight-line distance is $5$ units. The two legs meet at a right angle."}],
 g:{at:1,q:"How far are you from the start?",o:[
  ["5 units",1,"The two perpendicular legs are squared and added before taking the root."],
  ["7 units",0,"Adding the legs gives the distance walked around the corner."],
  ["25 units",0,"That is the squared distance. Take its square root."]]}});

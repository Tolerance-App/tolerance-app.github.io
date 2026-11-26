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

/* ---------- calc3-geometry-2 · Dot products and projections ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-2",0,{p:[
 {"t":"p","x":"A **dot product** combines two vectors into one number that measures alignment."},
 {"t":"p","x":"A **projection** extracts the part of a vector along a chosen direction. The scalar projection gives the signed length of that part."}]});
/* 1 · Legend → formula, Fill “perpendicular”. The dot is zero at a right angle. */
rc98("calc3-geometry-2",1,{p:[
 {"t":"vars","vars":[["a,b","vectors in perpendicular unit axes"],["a_x,b_x","their components along x"]]},
 {"t":"p","x":"If two nonzero vectors have a zero dot product, they are [[perpendicular]]."},
 {"t":"eq","eq":"a·b = a_x b_x + a_y b_y","cap":"In the plane, sum products along the same axis. Add a z term in space."},
 {"t":"p","x":"At a right angle the component along the other vector vanishes."}]});
/* 2 · Rule → formulas, no interaction */
rc98("calc3-geometry-2",2,{p:[
 {"t":"p","x":"Project $a$ onto direction $b$. First form the unit vector $u$ by dividing the nonzero $b$ by its length."},
 {"t":"eq","eq":"u = b / ‖b‖","cap":"b specifies the direction."},
 {"t":"eq","eq":"a·u","cap":"Signed scalar projection. Multiply by u for the projected vector."}]});
/* 3 · Compare, Guess (unchanged) */
rc98("calc3-geometry-2",3,{p:[
 {"t":"p","x":"A cart moves east and north. You measure the eastward part of its displacement."},
 {"t":"take","x":"Adding a purely northward displacement leaves the eastward projection unchanged."},
 {"t":"p","x":"Only the component parallel to the chosen direction enters the dot product."}],
 g:{at:1,q:"Add another displacement due north. What happens to the eastward projection?",o:[
  ["It increases",0,"The overall displacement can grow without adding any eastward component."],
  ["It stays the same",1,"North is perpendicular to east, so its eastward component is zero."]]}});

/* ---------- calc3-geometry-3 · Cross products, lines, and planes ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-3",0,{p:[
 {"t":"p","x":"A **plane** is a flat surface that extends without bound."},
 {"t":"p","x":"Its **normal** is any nonzero vector perpendicular to the surface. It tells you the plane’s orientation."}]});
/* 1 · Rule → geometry, Guess (reverses) */
rc98("calc3-geometry-3",1,{p:[
 {"t":"p","x":"In space, $a × b$ is the **cross product** of vectors $a$ and $b$. Point your right-hand fingers along $a$ and curl toward $b$. Your thumb gives the direction."},
 {"t":"take","x":"Swapping the inputs reverses the cross product."},
 {"t":"p","x":"It is perpendicular to both inputs. Its length is their parallelogram area, so parallel inputs give the zero vector."}],
 g:{at:1,q:"For nonparallel inputs, what does swapping the order do?",o:[
  ["Keeps the direction",0,"The area stays the same, but the right-hand curl reverses."],
  ["Reverses the direction",1,"Curling from the second vector to the first reverses your thumb."]]}});
/* 2 · Compare, Fill “along” */
rc98("calc3-geometry-3",2,{p:[
 {"t":"p","x":"A line needs a point and a nonzero vector pointing [[along]] the line."},
 {"t":"p","x":"Starting from the given point, move any signed multiple of the direction vector."},
 {"t":"p","x":"A plane also needs a point. Its nonzero normal sticks straight out of it."}]});
/* 3 · Legend → formula, no interaction */
rc98("calc3-geometry-3",3,{p:[
 {"t":"p","x":"Let $p$ be a point in the plane, $r$ a candidate point and $n$ its nonzero normal."},
 {"t":"eq","eq":"n·(r − p) = 0","cap":"The displacement r − p must be perpendicular to n."},
 {"t":"p","x":"The dot product turns the geometric test into an equation linear in the coordinates of $r$."}]});

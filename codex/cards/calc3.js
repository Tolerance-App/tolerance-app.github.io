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

/* ---------- calc3-geometry-4 · Space curves, curvature, and motion ---------- */
/* 0 · Compare, no interaction */
rc98("calc3-geometry-4",0,{p:[
 {"t":"p","x":"**Velocity** describes how fast and in what direction a point moves."},
 {"t":"p","x":"**Speed** is just the length of the velocity. A point can turn while keeping the same speed."}]});
/* 1 · Legend → formulas, Fill “with respect to time” */
rc98("calc3-geometry-4",1,{p:[
 {"t":"p","x":"A **space curve** uses a vector $r(t)$ to give position at each time $t$. Velocity is the change in position [[with respect to time]]."},
 {"t":"eq","eq":"v = dr/dt","cap":"For differentiable position r and time t."},
 {"t":"eq","eq":"speed = ‖v‖","cap":"Use the length of the velocity vector v."}]});
/* 2 · Definition → formula, no interaction. A circle turns 2π rad over arc length 2πR, giving 1/R. */
rc98("calc3-geometry-4",2,{p:[
 {"t":"p","x":"**Arc length** is distance measured along the curve. **Curvature** $κ$ measures how quickly the tangent direction turns per unit of that distance."},
 {"t":"eq","eq":"κ = 1/R","cap":"For a circle of radius R, at any point."}]});
/* 3 · Reason, Guess (nonzero). Uniform circular motion has inward acceleration of magnitude speed²/R. */
rc98("calc3-geometry-4",3,{p:[
 {"t":"p","x":"**Acceleration** is the rate of change of velocity. A point travels around a circle at constant nonzero speed."},
 {"t":"take","x":"Acceleration is nonzero because the velocity keeps turning."},
 {"t":"p","x":"For steady circular motion, that acceleration points inward."}],
 g:{at:1,q:"Is the acceleration zero?",o:[
  ["Yes, it is zero",0,"Constant speed fixes the length of velocity. Its direction still changes."],
  ["No, it is nonzero",1,"A change of direction is a change in velocity."]]}});

/* ---------- calc3-partials-1 · Multivariable limits and continuity ---------- */
/* 0 · Definition */
rc98("calc3-partials-1",0,{p:[
 {"t":"p","x":"A **limit** is the value the output approaches as the inputs approach a point."},
 {"t":"p","x":"Test approaches through the **domain**, the set of allowed inputs. The value at the point plays no role."}]});
/* 1 · Rule, Fill */
rc98("calc3-partials-1",1,{p:[
 {"t":"p","x":"If the outputs approach [[different]] values on two paths, the limit fails to exist."},
 {"t":"take","x":"A limit must have one value that works for every approach."}]});
/* 2 · Example, Guess. Along y=x² the quotient is x⁴/(2x⁴)=1/2; along the axes it is zero. */
rc98("calc3-partials-1",2,{p:[
 {"t":"p","x":"Near the origin, divide $x^2y$ by $x^4+y^2$. The result is zero on both axes away from the origin."},
 {"t":"p","x":"On the curve $y=x^2$, the numerator is $x^4$ and the denominator is $2x^4$. This gives $1/2$."},
 {"t":"p","x":"**Continuity** requires the limit to exist and equal the value at the point."}],
 g:{at:1,q:"Do these axis tests prove the limit is zero?",o:[
  ["They leave it open",1,"A curved approach may behave differently."],
  ["They prove it",0,"The axes cover only two approaches."]]}});
/* 3 · Reason */
rc98("calc3-partials-1",3,{p:[
 {"t":"p","x":"Infinitely many straight and curved paths can approach the same point."},
 {"t":"p","x":"To prove a limit, control the output error for every nearby input using its distance from the point."}]});

/* ---------- calc3-partials-2 · Partial derivatives and the gradient ---------- */
/* 0 · Definition */
rc98("calc3-partials-2",0,{p:[
 {"t":"p","x":"A **sensitivity** is a rate of output change as an input varies."},
 {"t":"p","x":"For a scalar function, which gives one number, each input can have its own sensitivity."}]});
/* 1 · Rule → formula, Fill */
rc98("calc3-partials-2",1,{p:[
 {"t":"p","x":"A **partial derivative** varies one input while holding the others [[fixed]]."},
 {"t":"eq","eq":"∇f = (f_x, f_y)","cap":"For f(x,y), f_x varies x alone and f_y varies y alone."},
 {"t":"p","x":"The **gradient** collects those first derivatives in a vector."}]});
/* 2 · Definition → rule */
rc98("calc3-partials-2",2,{p:[
 {"t":"p","x":"For a differentiable function, a nonzero gradient points toward the steepest local increase per unit distance."},
 {"t":"p","x":"A **level set** contains inputs with the same output. The gradient is perpendicular to the tangent of a level curve wherever that tangent exists."}]});
/* 3 · Rule → formula, Guess. The dot product with the zero vector is zero. */
rc98("calc3-partials-2",3,{p:[
 {"t":"p","x":"A **directional derivative** measures the rate per unit distance in a direction given by a unit vector $u$."},
 {"t":"eq","eq":"D_u f = ∇f·u","cap":"For differentiable f at the point."},
 {"t":"p","x":"The zero gradient gives no first-order change. For a nonzero gradient the rate is greatest when $u$ points along it."}],
 g:{at:1,q:"If the gradient is zero, what is the rate along a unit direction?",o:[
  ["Zero in every direction",1,"The dot product with the zero vector is zero."],
  ["Positive in some direction",0,"An increase here must come from changes beyond first order."]]}});

/* ---------- calc3-partials-3 · Directional derivatives and tangent planes ---------- */
/* 0 · Definition */
rc98("calc3-partials-3",0,{p:[
 {"t":"p","x":"A **local linear model** predicts how much a function changes for a small move from a base input."},
 {"t":"p","x":"A first-order model keeps the part that scales linearly with the move, including changes in all coordinates."}]});
/* 1 · Rule → formula, Guess. ∇f·(2u)=2∇f·u. */
rc98("calc3-partials-3",1,{p:[
 {"t":"p","x":"For differentiable $f$, the gradient $∇f$ collects the coordinate slopes. The directional derivative along a unit vector $u$ is the rate per unit distance."},
 {"t":"eq","eq":"D_u f = ∇f·u","cap":"For a unit vector u."},
 {"t":"p","x":"With twice the direction vector, the rate per parameter step doubles."}],
 g:{at:1,q:"Double the direction vector for the same parameter step. What happens to the rate per parameter step?",o:[
  ["It doubles",1,"The step now covers twice the distance."],
  ["It stays the same",0,"That is the rate per unit distance."]]}});
/* 2 · Legend → formula */
rc98("calc3-partials-3",2,{p:[
 {"t":"p","x":"Let $a$ be the base input and $h$ the displacement. Evaluate the gradient at $a$."},
 {"t":"eq","eq":"f(a+h) ≈ f(a)+∇f(a)·h","cap":"For f differentiable at a and small h."},
 {"t":"p","x":"With two inputs, the graph of this approximation is the **tangent plane**."}]});
/* 3 · Rule, Fill */
rc98("calc3-partials-3",3,{p:[
 {"t":"p","x":"**Differentiability** means the linear model’s error goes to zero [[faster]] than the displacement length."},
 {"t":"eq","eq":"error / ‖h‖ → 0","cap":"As nonzero displacement h tends to zero from any direction."},
 {"t":"p","x":"Partial derivatives alone describe the coordinate directions and cannot guarantee this error test."}]});

/* ---------- calc3-partials-4 · Multivariable chain rule and Jacobians ---------- */
/* 0 · Definition */
rc98("calc3-partials-4",0,{p:[
 {"t":"p","x":"Some outputs depend on intermediate variables, which in turn depend on the original inputs."},
 {"t":"p","x":"The **chain rule** uses those dependencies to find how changes in the original inputs reach the outputs."}]});
/* 1 · Definition, Fill */
rc98("calc3-partials-4",1,{p:[
 {"t":"p","x":"A **Jacobian** is a matrix of first partial derivatives. Its rows correspond to [[outputs]]."},
 {"t":"p","x":"For a row, pick one output and write its derivative with respect to each input. Each column corresponds to one input."}]});
/* 2 · Legend → formula, Guess */
rc98("calc3-partials-4",2,{p:[
 {"t":"p","x":"In $F∘G$, apply $G$ and then send its output into $F$. Write $J_F$ and $J_G$ for their Jacobians."},
 {"t":"eq","eq":"J_{F∘G} = J_F J_G","cap":"For differentiable maps. Evaluate J_F at the output of G."},
 {"t":"p","x":"Each product entry adds the contributions along the intermediate paths."}],
 g:{at:1,q:"Which Jacobian goes on the left of the product?",o:[
  ["The Jacobian of F",1,"The input change passes through G first, then F."],
  ["The Jacobian of G",0,"That order acts on the original input change with F first."]]}});
/* 3 · Rule → formula */
rc98("calc3-partials-4",3,{p:[
 {"t":"p","x":"A **mixed partial derivative** differentiates with respect to one input and then another."},
 {"t":"p","x":"Write $f_{xy}$ for the y derivative of $f_x$ and $f_{yx}$ for the other order."},
 {"t":"eq","eq":"f_{xy} = f_{yx}","cap":"If both mixed second partials exist and are continuous near the point."}]});

/* ---------- calc3-optimization-1 · Critical points and Hessians ---------- */
/* 0 · Definition */
rc98("calc3-optimization-1",0,{p:[
 {"t":"p","x":"A **stationary point** is a point where the gradient, the vector of first derivatives, is zero."},
 {"t":"p","x":"It is a candidate for a local maximum or minimum. A **saddle** has nearby points with higher and lower values."}]});
/* 1 · Definition → rule */
rc98("calc3-optimization-1",1,{p:[
 {"t":"p","x":"A differentiable objective has zero gradient at an unconstrained interior optimum."},
 {"t":"p","x":"The **Hessian** $H$ is the matrix of second partial derivatives. Diagonal entries differentiate twice in one coordinate. Off-diagonal entries mix coordinates."}]});
/* 2 · Compare, Fill */
rc98("calc3-optimization-1",2,{p:[
 {"t":"p","x":"At a stationary point of a twice continuously differentiable function, a Hessian with positive curvature in every direction is **positive definite**. The point is a strict local [[minimum]]."},
 {"t":"p","x":"Negative curvature in every direction means **negative definite**, giving a strict local maximum. Mixed signs mean **indefinite**, giving a saddle."}]});
/* 3 · Rule → formula, Guess. A negative determinant means opposite signs of the two Hessian eigenvalues. */
rc98("calc3-optimization-1",3,{p:[
 {"t":"p","x":"For two inputs, let $D$ be the Hessian determinant. It is the product of the diagonal entries minus the product of the off-diagonal entries."},
 {"t":"eq","eq":"D = f_{xx} f_{yy} − f_{xy}^2","cap":"Continuous second derivatives make the two mixed entries equal."},
 {"t":"p","x":"If $D>0$, the sign of $f_{xx}$ distinguishes a minimum (positive) from a maximum (negative). If $D=0$, the quadratic test is inconclusive."}],
 g:{at:1,q:"At a stationary point, what does a negative D imply?",o:[
  ["A saddle",1,"The Hessian has curvature of both signs."],
  ["A local minimum",0,"A minimum by this test requires positive curvature in every direction."]]}});

/* ---------- calc3-optimization-2 · Lagrange multipliers ---------- */
/* 0 · Definition */
rc98("calc3-optimization-2",0,{p:[
 {"t":"p","x":"The **objective** is the function you want to maximize or minimize. An **equality constraint** limits the inputs to those satisfying an equation."},
 {"t":"p","x":"At a constrained optimum, a small allowed move cannot improve the objective to first order."}]});
/* 1 · Legend → formula, Fill */
rc98("calc3-optimization-2",1,{p:[
 {"t":"p","x":"Write $f$ for the objective and $g=c$ for the constraint. At a smooth constrained optimum with nonzero $∇g$, the gradients are [[parallel]] in the sense that one is a scalar multiple of the other."},
 {"t":"eq","eq":"∇f = λ ∇g","cap":"At a stationary candidate on g = c with nonzero ∇g."},
 {"t":"p","x":"The number $λ$ is a **Lagrange multiplier**. Solve the gradient equation and the constraint together, then compare candidates to find the best value."}]});
/* 2 · Rule, Guess */
rc98("calc3-optimization-2",2,{p:[
 {"t":"p","x":"Suppose the optimum stays on a smooth branch as you vary the right-hand side $c$, using the sign convention above."},
 {"t":"eq","eq":"Δf ≈ λ Δc","cap":"For a small change Δc along the regular optimum branch."},
 {"t":"p","x":"The multiplier estimates how much changing the constraint level changes the best objective value."}],
 g:{at:1,q:"What does the multiplier estimate?",o:[
  ["How the best value changes",1,"It gives the slope of the optimal value with respect to c."],
  ["How c itself changes",0,"The change in c is the input, so λ converts it to an estimated objective change."]]}});
/* 3 · Reason */
rc98("calc3-optimization-2",3,{p:[
 {"t":"p","x":"A **tangent direction** follows the constraint surface locally. Along it, $g$ stays fixed to first order, so its direction is perpendicular to $∇g$."},
 {"t":"p","x":"The objective also has zero slope along every tangent direction at a constrained optimum. Its gradient therefore lies along the constraint normal, the direction perpendicular to the tangent space."}]});

/* ---------- calc3-optimization-3 · Boundaries and inequality constraints ---------- */
/* 0 · Definition */
rc98("calc3-optimization-3",0,{p:[
 {"t":"p","x":"A point is **feasible** if it satisfies every constraint."},
 {"t":"p","x":"The best feasible value may occur inside the region, along an edge, or where edges meet. Check corners and intersections as well as smooth edges."}]});
/* 1 · Rule, Fill */
rc98("calc3-optimization-3",1,{p:[
 {"t":"p","x":"Write an inequality as $g≤0$. It is **active** when the bound holds at equality. An inactive constraint has [[positive]] slack."},
 {"t":"eq","eq":"slack = −g","cap":"At a feasible input with g ≤ 0."},
 {"t":"p","x":"At an active bound the slack is zero. Otherwise you can loosen the slack without changing the point."}]});
/* 2 · Rule → formula, Guess. If slack > 0 and λ·slack = 0 then λ = 0. */
rc98("calc3-optimization-3",2,{p:[
 {"t":"p","x":"For minimizing smooth $f$ with $g≤0$, the **KKT conditions** are first-order tests at a local optimum under suitable constraint regularity."},
 {"t":"eq","eq":"∇f + λ ∇g = 0","cap":"Stationarity: the objective and weighted constraint slopes balance."},
 {"t":"p","x":"Feasibility requires $g≤0$ and the multiplier sign is $λ≥0$. **Complementary slackness** requires multiplier times slack to be zero."}],
 g:{at:1,q:"Can a constraint with positive slack have a positive KKT multiplier?",o:[
  ["No, its multiplier is zero",1,"Their product must be zero."],
  ["Yes, its multiplier can be positive",0,"A positive multiplier can occur only at a tight bound."]]}});
/* 3 · Reason */
rc98("calc3-optimization-3",3,{p:[
 {"t":"p","x":"A boundary can block the direction in which the objective improves most quickly."},
 {"t":"take","x":"The best allowed point may therefore have a nonzero objective gradient."}]});

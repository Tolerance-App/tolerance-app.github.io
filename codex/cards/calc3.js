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

/* ---------- calc3-optimization-4 · Second-order models and sensitivity ---------- */
/* 0 · Definition */
rc98("calc3-optimization-4",0,{p:[
 {"t":"p","x":"A **second-order model** approximates a function near a chosen input using slope and curvature."},
 {"t":"p","x":"It captures more local behavior than a linear model. Its prediction can degrade as you move farther from the base input."}]});
/* 1 · Legend → formula. The quadratic coefficient is 1/2 from the one-variable Taylor term 1/2! along the displacement. */
rc98("calc3-optimization-4",1,{p:[
 {"t":"p","x":"Let $h$ be the input displacement. Let $H$ be the Hessian (matrix of second derivatives) at the base input. The superscript $T$ turns the displacement column into a row."},
 {"t":"eq","eq":"½ h^T H h","cap":"The quadratic correction for a twice continuously differentiable function."},
 {"t":"p","x":"Add this correction to the base value plus the gradient dotted with $h$. This is the **second-order Taylor model**."}]});
/* 2 · Rule, Fill */
rc98("calc3-optimization-4",2,{p:[
 {"t":"p","x":"**Conditioning** describes how sensitive a computed answer is to small changes in its inputs. Optimization can become poorly conditioned when coordinates have very [[different]] scales."},
 {"t":"p","x":"It can also happen along a **flat direction**, where the objective curves only weakly."},
 {"t":"p","x":"Check the proposed input against the original objective after optimizing the model."}]});
/* 3 · Reason, Guess. For a one-dimensional quadratic with slope s and curvature k>0, h=−s/k and Δh=−Δs/k. */
rc98("calc3-optimization-4",3,{p:[
 {"t":"p","x":"Consider a local quadratic along one direction. Its initial slope is uncertain and its curvature is small but positive."},
 {"t":"eq","eq":"h = −s/k","cap":"Offset h to the quadratic minimum for initial slope s and curvature k > 0."},
 {"t":"p","x":"A small slope error shifts the predicted minimum farther when the direction is flatter."}],
 g:{at:1,q:"How does smaller curvature affect the predicted minimizer’s sensitivity to a slope error?",o:[
  ["It magnifies the shift",1,"The slope changes slowly along the flatter curve, so the point where it reaches zero moves farther."],
  ["It shrinks the shift",0,"A flatter curve needs a longer move to cancel the same slope error."]]}});

/* ---------- calc3-multiple-integrals-1 · Double integrals and integration order ---------- */
/* 0 · Definition */
rc98("calc3-multiple-integrals-1",0,{p:[
 {"t":"p","x":"A **double integral** adds up contributions from tiny areas of a flat region."},
 {"t":"p","x":"One way to add them is to slice the region along one coordinate direction and then add the slice totals."}]});
/* 1 · Rule, existing figure */
rc98("calc3-multiple-integrals-1",1,{p:[
 {"t":"p","x":"An **iterated integral** is an integral inside another integral. On each slice, integrate over the inside variable while the outside variable stays fixed."},
 {"t":"p","x":"**Fubini’s theorem** permits this for continuous functions on rectangles. For a bounded region with slice bounds, the same method applies when the integrand extended by zero outside the region is integrable."}]});
/* 2 · Process, Fill */
rc98("calc3-multiple-integrals-1",2,{p:[
 {"t":"p","x":"To swap the order, describe the [[same]] region using slices in the other direction."},
 {"t":"p","x":"Find the new outside range, then the new inside limits for each outside value."},
 {"t":"p","x":"Split the region wherever one bound formula cannot describe all the new slices."}]});
/* 3 · Reason → transfer, Guess. A narrow polar sector has area r × angular width × radial thickness to first order. */
rc98("calc3-multiple-integrals-1",3,{p:[
 {"t":"p","x":"Coordinate slices can look different while adding the same area. In polar coordinates, an angular slice opens outward from the origin."},
 {"t":"eq","eq":"dA = r dr dθ","cap":"r is radius, dr its radial increment, and dθ the angle increment in radians."},
 {"t":"p","x":"Farther-out arcs are longer, so the polar area element grows with radius."}],
 g:{at:1,q:"For equal small angle and radial increments, how does patch area change farther out?",o:[
  ["It grows",1,"The same angle sweeps a longer arc at larger radius."],
  ["It stays fixed",0,"Equal angle increments do not give equal arc lengths."]]}});

/* ---------- calc3-multiple-integrals-2 · Polar double integrals and Jacobian factors ---------- */
/* 0 · Definition */
rc98("calc3-multiple-integrals-2",0,{p:[
 {"t":"p","x":"**Polar coordinates** locate a point by a radius $r$ from the origin and an angle $θ$ from the positive horizontal axis."},
 {"t":"p","x":"A tiny rectangle in the radius and angle coordinates maps to a narrow sector in the plane."}]});
/* 1 · Rule → formula, Fill */
rc98("calc3-multiple-integrals-2",1,{p:[
 {"t":"p","x":"For equal increments of radius and angle, the area per increment pair is [[proportional]] to radius."},
 {"t":"eq","eq":"dA = r dr dθ","cap":"r ≥ 0, dr is the radial increment, and dθ is measured in radians."},
 {"t":"p","x":"The extra factor of $r$ converts the coordinate increments to physical area."}]});
/* 2 · Rule, Guess */
rc98("calc3-multiple-integrals-2",2,{p:[
 {"t":"p","x":"For a smooth, invertible coordinate change with smooth inverse, the **Jacobian determinant** describes local area scaling and orientation."},
 {"t":"take","x":"Use the absolute value of the Jacobian determinant to scale area. A negative sign indicates reversed orientation."}],
 g:{at:1,q:"If that determinant is negative, which factor scales area?",o:[
  ["Its absolute value",1,"Area is positive even when orientation reverses."],
  ["Its signed value",0,"The sign records orientation, which scalar area does not carry."]]}});
/* 3 · Reason. Arc length is r times the angle in radians. */
rc98("calc3-multiple-integrals-2",3,{p:[
 {"t":"p","x":"An angle increment $dθ$ sweeps out an arc of length $r dθ$."},
 {"t":"p","x":"Multiply that length by the radial thickness $dr$ for the tiny area. At a greater radius the same angle sweeps a longer arc."}]});

/* ---------- calc3-multiple-integrals-3 · Triple integrals and cylindrical coordinates ---------- */
/* 0 · Definition */
rc98("calc3-multiple-integrals-3",0,{p:[
 {"t":"p","x":"A **triple integral** adds up a scalar, a single number at each point, throughout a solid."},
 {"t":"p","x":"You can group the tiny volumes into slices and add the slice totals."}]});
/* 1 · Process */
rc98("calc3-multiple-integrals-3",1,{p:[
 {"t":"p","x":"The bounds describe the entire solid. In nested integrals, an inner bound can depend on variables integrated later."},
 {"t":"p","x":"For example, fix the horizontal location and sweep vertically from the bottom to the top of the solid. Then integrate over the allowed horizontal locations."}]});
/* 2 · Legend → formula, Fill */
rc98("calc3-multiple-integrals-3",2,{p:[
 {"t":"p","x":"**Cylindrical coordinates** use radius $r$ and angle $θ$ in the horizontal plane. They leave the height $z$ [[unchanged]]."},
 {"t":"eq","eq":"dV = r dr dθ dz","cap":"r ≥ 0 and θ is measured in radians. dz is the vertical thickness."},
 {"t":"p","x":"Only the horizontal increments need polar area scaling."}]});
/* 3 · Reason, Guess. Doubling dz alone doubles dV. */
rc98("calc3-multiple-integrals-3",3,{p:[
 {"t":"p","x":"A horizontal patch is a small sector. Its area grows with radius because its angular side gets longer."},
 {"t":"take","x":"Volume is sector area times thickness. Doubling the thickness alone doubles the volume."}],
 g:{at:1,q:"Keep the same horizontal patch and double the vertical increment. What happens to the tiny volume?",o:[
  ["It doubles",1,"The sector area is unchanged and the thickness doubles."],
  ["It quadruples",0,"That would require another factor of two from the horizontal patch."]]}});

/* ---------- calc3-multiple-integrals-4 · Spherical coordinates and general transformations ---------- */
/* 0 · Definition */
rc98("calc3-multiple-integrals-4",0,{p:[
 {"t":"p","x":"A coordinate change alters the amount of physical volume covered by equal increments of the new coordinates."},
 {"t":"p","x":"In spherical coordinates the two angle directions can stretch by different amounts, depending on where you are."}]});
/* 1 · Legend → formula */
rc98("calc3-multiple-integrals-4",1,{p:[
 {"t":"p","x":"**Spherical coordinates** use distance $ρ$ from the origin, azimuth $θ$ around the vertical axis, and polar angle $φ$ down from positive $z$."},
 {"t":"eq","eq":"dV = ρ^2 sinφ dρ dφ dθ","cap":"ρ ≥ 0. Use radians and measure φ down from positive z."},
 {"t":"p","x":"Each differential is a small increment of its coordinate."}]});
/* 2 · Rule, Fill */
rc98("calc3-multiple-integrals-4",2,{p:[
 {"t":"p","x":"Angle conventions vary. Define which angle is measured from the pole before setting bounds."},
 {"t":"p","x":"In a smooth coordinate substitution, take the [[absolute value]] of the Jacobian determinant, which measures signed volume scaling."},
 {"t":"p","x":"Choose bounds or split the integral so that almost every physical point is counted once. Angular seams of zero volume do not add volume."}]});
/* 3 · Reason, Guess. Azimuth arc radius is ρ sinφ; it tends to zero at φ=0. */
rc98("calc3-multiple-integrals-4",3,{p:[
 {"t":"p","x":"Hold $ρ$ fixed and compare how far the same small change in azimuth moves you near the north pole and near the equator."},
 {"t":"p","x":"Near the pole the azimuth arc is shorter. Its length per radian is $ρ sinφ$, the distance to the vertical axis."},
 {"t":"p","x":"The other angular arc has length per radian $ρ$. Multiplying both by radial thickness gives the volume factor."}],
 g:{at:1,q:"Where is the azimuth step shorter?",o:[
  ["Near the pole",1,"The circle around the vertical axis shrinks as you approach the pole."],
  ["Near the equator",0,"The horizontal circle has its largest radius at the equator."]]}});

/* ---------- calc3-line-integrals-1 · Scalar and vector line integrals ---------- */
/* 0 · Definition */
rc98("calc3-line-integrals-1",0,{p:[
 {"t":"p","x":"A **line integral** adds contributions along a curve. A scalar line integral weights each little length of the curve by a number."},
 {"t":"p","x":"A vector **work integral** counts the part of a vector field, such as force, pointing along the motion."}]});
/* 1 · Rule, existing figure */
rc98("calc3-line-integrals-1",1,{p:[
 {"t":"p","x":"Write the position on the path as $r(t)$, where $t$ is a parameter increasing as you travel. For a piecewise smooth path, its derivative gives the directed motion per unit parameter."},
 {"t":"p","x":"For a scalar integrand, weight it by the length of that derivative. For work, take the dot product of the field with the derivative."}]});
/* 2 · Compare, Guess */
rc98("calc3-line-integrals-1",2,{p:[
 {"t":"p","x":"Traverse the same path backward through the same scalar and vector fields."},
 {"t":"take","x":"Reversing the path reverses the sign of work. The scalar integral against arc length is unchanged."}],
 g:{at:1,q:"What happens to the work integral?",o:[
  ["It changes sign",1,"Each little directed displacement reverses."],
  ["It stays the same",0,"That is true for the scalar integral against length."]]}});
/* 3 · Reason, Fill */
rc98("calc3-line-integrals-1",3,{p:[
 {"t":"p","x":"A small step has the same length both ways, but its displacement points in the [[opposite]] direction on the return trip."},
 {"t":"p","x":"The length weight stays the same. The dot product with the directed step changes sign."}]});

/* ---------- calc3-line-integrals-2 · Conservative fields and potentials ---------- */
/* 0 · Definition */
rc98("calc3-line-integrals-2",0,{p:[
 {"t":"p","x":"An **endpoint** is the start or finish of a path. Work is **path independent** on a domain when all paths there with the same ordered endpoints have the same work."},
 {"t":"p","x":"A function of position can store all the information you need to calculate that work."}]});
/* 1 · Legend → formula, Fill */
rc98("calc3-line-integrals-2",1,{p:[
 {"t":"p","x":"A **conservative field** $F$ is the gradient of a scalar **potential** $φ$. Its work from $A$ to $B$ depends [[only on the endpoints]]."},
 {"t":"eq","eq":"work = φ(B) − φ(A)","cap":"For a piecewise smooth path inside the domain of the potential."},
 {"t":"p","x":"Compute the final potential minus the initial potential."}]});
/* 2 · Compare, Guess. For B=A, φ(A)−φ(A)=0. */
rc98("calc3-line-integrals-2",2,{p:[
 {"t":"p","x":"A **closed path** returns to its starting point. **Circulation** is work around such a path."},
 {"t":"take","x":"Closed paths in the domain have zero circulation because both endpoints are the same point."},
 {"t":"p","x":"Check that the potential is defined everywhere on the path."}],
 g:{at:1,q:"What circulation can a conservative field give on a closed path in its domain?",o:[
  ["Zero",1,"The two endpoint potential values cancel."],
  ["A nonzero value",0,"That could happen only if the field does not have a single potential on the path’s domain."]]}});
/* 3 · Reason → formula */
rc98("calc3-line-integrals-2",3,{p:[
 {"t":"p","x":"Along the path $r(t)$, the potential becomes a function of the path parameter $t$."},
 {"t":"eq","eq":"dφ/dt = ∇φ·r′(t)","cap":"By the chain rule, evaluated at r(t) on each smooth part."},
 {"t":"p","x":"Integrate this ordinary derivative over the path parameter to get the potential change."}]});

/* ---------- calc3-line-integrals-3 · Green’s theorem ---------- */
/* 0 · Definition */
rc98("calc3-line-integrals-3",0,{p:[
 {"t":"p","x":"**Circulation** measures how much a vector field pushes along an oriented closed curve. Orientation is the direction you travel."},
 {"t":"p","x":"**Green’s theorem** moves the calculation from a plane region’s boundary to its interior."}]});
/* 1 · Legend → formula, existing figure */
rc98("calc3-line-integrals-3",1,{p:[
 {"t":"p","x":"Write the horizontal and vertical components of the field as $P$ and $Q$. **Scalar curl** measures local counterclockwise circulation per unit area."},
 {"t":"eq","eq":"curl = Q_x − P_y","cap":"Q_x differentiates Q along x. P_y differentiates P along y."},
 {"t":"p","x":"Green’s circulation form integrates this curl over the region to get its boundary circulation. The region stays to your left as you follow the boundary."}]});
/* 2 · Rule, Fill */
rc98("calc3-line-integrals-3",2,{p:[
 {"t":"p","x":"Require continuous first partial derivatives throughout an open neighborhood of the region and its piecewise smooth boundary."},
 {"t":"p","x":"A positive boundary keeps the region on your left, so its inner and outer loops go in [[opposite]] senses."},
 {"t":"p","x":"Travel counterclockwise around the outside and clockwise around holes."}]});
/* 3 · Reason, Guess */
rc98("calc3-line-integrals-3",3,{p:[
 {"t":"p","x":"Imagine splitting the region into adjacent patches and adding their boundary circulations."},
 {"t":"take","x":"Shared edges cancel because the patches traverse them in opposite directions. Only the region’s boundary remains."}],
 g:{at:1,q:"What happens to contributions on a shared edge?",o:[
  ["They cancel",1,"The edge is traversed in opposite directions by its two patches."],
  ["They add in the same direction",0,"That would count the shared edge twice with the same orientation."]]}});

/* ---------- calc3-line-integrals-4 · Curl-free fields and domain holes ---------- */
/* 0 · Definition */
rc98("calc3-line-integrals-4",0,{p:[
 {"t":"p","x":"A field’s **curl** measures local circulation. Zero curl rules out a local spin detected by first derivatives."},
 {"t":"p","x":"**Path independence** is a global statement: every pair of paths with the same endpoints gives the same work."}]});
/* 1 · Rule, Fill */
rc98("calc3-line-integrals-4",1,{p:[
 {"t":"p","x":"A smooth **conservative** field is a gradient, so it has zero curl. The converse holds for continuously differentiable fields on a simply connected open domain."},
 {"t":"p","x":"**Simply connected** means the domain is path-connected and each closed loop can be shrunk to a point [[within]] it."},
 {"t":"p","x":"The contraction must stay in the domain throughout. A loop around a missing point can fail that test."}]});
/* 2 · Compare, Guess */
rc98("calc3-line-integrals-4",2,{p:[
 {"t":"p","x":"Consider a curl-free field on the plane with the origin removed. A closed path winds around that missing point."},
 {"t":"take","x":"A hole can allow nonzero circulation even when curl vanishes everywhere the field is defined."}],
 g:{at:1,q:"Can this path have nonzero circulation?",o:[
  ["Yes, it can",1,"The missing point blocks contraction, so local zero curl need not imply zero work around the loop."],
  ["No, it cannot",0,"Zero curl gives the global conclusion only with additional domain conditions."]]}});
/* 3 · Reason */
rc98("calc3-line-integrals-4",3,{p:[
 {"t":"p","x":"For a loop around a hole, filling its interior can require points where the field is undefined."},
 {"t":"p","x":"A local derivative test never measures what happens at those missing points. Check the domain before inferring a potential."}]});

/* ---------- calc3-surface-theorems-1 · Surface parameterization and flux ---------- */
/* 0 · Definition */
rc98("calc3-surface-theorems-1",0,{p:[
 {"t":"p","x":"**Flux** measures how strongly a field passes through a surface."},
 {"t":"p","x":"An **oriented** surface has a chosen normal direction, perpendicular to its tangent plane. Flow along that normal contributes positive flux."}]});
/* 1 · Rule, existing figure */
rc98("calc3-surface-theorems-1",1,{p:[
 {"t":"p","x":"A **parameterization** gives each surface point as a position vector depending on two parameters."},
 {"t":"p","x":"Vary one parameter at a time to get two tangent vectors. At a regular patch they are independent, so their cross product gives a nonzero oriented area vector."}]});
/* 2 · Compare, Fill */
rc98("calc3-surface-theorems-1",2,{p:[
 {"t":"p","x":"For scalar area, use the [[length]] of the area vector. This discards its sign convention."},
 {"t":"p","x":"For flux, dot the field with the oriented area vector instead. Reversing the normal changes the sign of that dot product."}]});
/* 3 · Reason, Guess */
rc98("calc3-surface-theorems-1",3,{p:[
 {"t":"p","x":"Imagine a sheet in a moving fluid. The fluid velocity at the sheet lies entirely in the local tangent plane."},
 {"t":"take","x":"Only the normal part of the field passes through the surface. A tangent field contributes zero flux."}],
 g:{at:1,q:"What is the local flux through the sheet?",o:[
  ["Zero",1,"The flow runs along the sheet and its normal component is zero."],
  ["Nonzero",0,"Motion along the sheet does not pass through it."]]}});

/* ---------- calc3-surface-theorems-2 · Divergence theorem ---------- */
/* 0 · Definition */
rc98("calc3-surface-theorems-2",0,{p:[
 {"t":"p","x":"A **closed surface** bounds a solid without an open edge. The outward normal points away from that solid."},
 {"t":"p","x":"**Divergence** measures local net outflow per unit volume, positive for a net source and negative for a net sink."}]});
/* 1 · Rule, Fill */
rc98("calc3-surface-theorems-2",1,{p:[
 {"t":"p","x":"The **divergence theorem** equates the net outward flux of a field through a closed boundary to divergence integrated over the [[interior]]."},
 {"t":"p","x":"Use the theorem for a piecewise smooth closed boundary with a field whose first partial derivatives are continuous on a neighborhood of the solid."},
 {"t":"p","x":"The volume integral sums the source and sink contributions throughout the solid."}]});
/* 2 · Legend → formula, Guess */
rc98("calc3-surface-theorems-2",2,{p:[
 {"t":"p","x":"Let $P$, $Q$ and $R$ be the field components along $x$, $y$ and $z$. The subscripts denote partial derivatives."},
 {"t":"eq","eq":"div F = P_x + Q_y + R_z","cap":"Each derivative varies its indicated coordinate alone."},
 {"t":"p","x":"For an open surface, compute flux directly or close it and subtract the flux through the added pieces."}],
 g:{at:1,q:"Which derivative belongs to the x component in the divergence sum?",o:[
  ["Differentiate it along x",1,"Divergence compares flow through the pair of faces normal to the component’s axis."],
  ["Differentiate it along y",0,"That is a sideways change and does not give the net flow through the x faces."]]}});
/* 3 · Reason */
rc98("calc3-surface-theorems-2",3,{p:[
 {"t":"p","x":"Divide the solid into little volumes. Each shared face has opposite outward normals for its two neighbors."},
 {"t":"p","x":"Their flux contributions cancel. Only flux through the outer boundary survives the sum."}]});

/* ---------- calc3-surface-theorems-3 · Stokes’ theorem ---------- */
/* 0 · Definition */
rc98("calc3-surface-theorems-3",0,{p:[
 {"t":"p","x":"**Circulation** is the work of a field along an oriented closed curve. **Curl** is the vector that measures local circulation about different axes."},
 {"t":"p","x":"Surface flux of curl counts the part of that local rotation along the surface normal."}]});
/* 1 · Rule, existing figure */
rc98("calc3-surface-theorems-3",1,{p:[
 {"t":"p","x":"**Stokes’ theorem** equates circulation around a surface boundary with the flux of curl through the surface."},
 {"t":"p","x":"Use an oriented piecewise smooth surface and a continuously differentiable field on a neighborhood of it. Curl your right-hand fingers with the boundary direction so your thumb points along the corresponding normal."}]});
/* 2 · Compare, Guess */
rc98("calc3-surface-theorems-3",2,{p:[
 {"t":"p","x":"Two suitable surfaces span the same boundary curve. A continuously differentiable field is defined near each surface. Both surfaces induce the same travel direction around the curve."},
 {"t":"take","x":"With the same oriented boundary, both surfaces give the same flux of curl."}],
 g:{at:1,q:"How do their flux integrals of curl compare?",o:[
  ["They agree",1,"Both equal the circulation along the same oriented boundary."],
  ["They can differ",0,"The surfaces can have different areas, but Stokes makes the boundary circulation determine this integral."]]}});
/* 3 · Reason, Fill */
rc98("calc3-surface-theorems-3",3,{p:[
 {"t":"p","x":"When adding the circulations of neighboring patches, a shared edge is traversed in [[opposite]] directions."},
 {"t":"p","x":"The interior edges cancel in pairs. Only circulation around the surface boundary remains."}]});

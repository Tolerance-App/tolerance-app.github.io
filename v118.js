/* ===== v118 (2026-11-27): Codex content: Calculus III, Differential equations, Linear algebra, Mechanical =====
   Staged by Codex (codex/README.md), self-checked by Codex (no separate review pass yet), spot-checked and shipped by Claude with tools/ship_codex.py.
   Cards only add rc98 entries; fixes edit questions in place (ids and question order unchanged).
   Reports: origin/codex-cards-calc3:codex/cards/calc3.md; origin/codex-cards-diffeq:codex/cards/diffeq.md; origin/codex-cards-linalg:codex/cards/linalg.md; origin/codex-cards-mech:codex/cards/mech.md */
try{FB.ver="b118"}catch(e){}

/* ======== cards · calc3 (from origin/codex-cards-calc3, e889c6c) ======== */
/* ===== Calculus III reveal cards (against b114) =====
   All 96 cards of 24 lessons as reveal cards (rc98, format in v98.js).
   Guess on 24 cards, Fill on 24, 48 with neither. See calc3.md for card indexes. */

/* ---------- calc3-geometry-1 · Vector components and norms ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-1",0,{p:[
 {t:"p",x:"A **vector** describes a displacement or another quantity with direction and size."},
 {t:"p",x:"Its **components** are the signed amounts along the chosen axes. Its **norm** is its length."}]});
/* 1 · Legend → formula, Fill “perpendicular”. Square and sum the legs by Pythagoras. */
rc98("calc3-geometry-1",1,{p:[
 {t:"p",x:"A **basis** is a set of directions used to build every vector. An **orthonormal** basis uses unit directions that are mutually [[perpendicular]]."},
 {t:"eq",eq:"‖v‖ = √{x^2 + y^2 + z^2}",cap:"x, y and z are the components of v along perpendicular unit axes."}]});
/* 2 · Rule → formula, no interaction. ‖v/‖v‖‖ = ‖v‖/‖v‖ = 1 for v ≠ 0. */
rc98("calc3-geometry-1",2,{p:[
 {t:"p",x:"A **unit vector** has length one. To find the unit vector $u$ pointing along a nonzero vector $v$, divide all its components by the same length."},
 {t:"eq",eq:"u = v / ‖v‖",cap:"v must have nonzero length."}]});
/* 3 · Worked example, Guess (5). 3² + 4² = 25; √25 = 5. */
rc98("calc3-geometry-1",3,{p:[
 {t:"p",x:"Walk $3$ units east, then $4$ units north."},
 {t:"step",f:"√{3^2 + 4^2}",v:"5",u:"",fin:1},
 {t:"p",x:"The straight-line distance is $5$ units. The two legs meet at a right angle."}],
 g:{at:1,q:"How far are you from the start?",o:[
  ["5 units",1,"The two perpendicular legs are squared and added before taking the root."],
  ["7 units",0,"Adding the legs gives the distance walked around the corner."],
  ["25 units",0,"That is the squared distance. Take its square root."]]}});

/* ---------- calc3-geometry-2 · Dot products and projections ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-2",0,{p:[
 {t:"p",x:"A **dot product** combines two vectors into one number that measures alignment."},
 {t:"p",x:"A **projection** extracts the part of a vector along a chosen direction. The scalar projection gives the signed length of that part."}]});
/* 1 · Legend → formula, Fill “perpendicular”. The dot is zero at a right angle. */
rc98("calc3-geometry-2",1,{p:[
 {t:"vars",vars:[["a,b","vectors in perpendicular unit axes"],["a_x,b_x","their components along x"],["a_y,b_y","their components along y"]]},
 {t:"p",x:"Nonzero vectors with zero dot product are [[perpendicular]]."},
 {t:"eq",eq:"a·b = a_x b_x + a_y b_y",cap:"In the plane, use the components along x and y. Add the matching z product in space."},
 {t:"p",x:"**Orthogonal** means perpendicular in this dot product."}]});
/* 2 · Rule → formulas, no interaction */
rc98("calc3-geometry-2",2,{p:[
 {t:"p",x:"Project $a$ onto direction $b$. First form the unit vector $u$ by dividing the nonzero $b$ by its length."},
 {t:"eq",eq:"u = b / ‖b‖",cap:"b specifies the direction."},
 {t:"eq",eq:"a·u",cap:"Signed scalar projection. Multiply by u for the projected vector."}]});
/* 3 · Compare, Guess (unchanged) */
rc98("calc3-geometry-2",3,{p:[
 {t:"p",x:"A cart moves east and north. You measure the eastward part of its displacement."},
 {t:"take",x:"Adding a purely northward displacement leaves the eastward projection unchanged."},
 {t:"p",x:"Only the component parallel to the chosen direction enters the dot product."}],
 g:{at:1,q:"Add another displacement due north. What happens to the eastward projection?",o:[
  ["It increases",0,"The overall displacement can grow without adding any eastward component."],
  ["It stays the same",1,"North is perpendicular to east, so its eastward component is zero."]]}});

/* ---------- calc3-geometry-3 · Cross products, lines, and planes ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-geometry-3",0,{p:[
 {t:"p",x:"A **plane** is a flat surface that extends without bound."},
 {t:"p",x:"Its **normal** is a nonzero vector perpendicular to the surface. It tells you the plane’s orientation."},
 {t:"p",x:"Given three points that don’t lie on one line, form two displacements from the same point. Their cross product, introduced next, gives a normal."}]});
/* 1 · Rule → geometry, existing figure, no interaction. Swapping cross-product inputs negates the result. */
rc98("calc3-geometry-3",1,{p:[
 {t:"p",x:"The **cross product** has length equal to the parallelogram area. Parallel inputs give zero. Swapping the inputs reverses the vector."},
 {t:"eq",eq:"(a × b)_z = a_x b_y − a_y b_x",cap:"In right-handed axes, subscripts pick components."}]});
/* 2 · Compare, Fill “along” */
rc98("calc3-geometry-3",2,{p:[
 {t:"p",x:"A line needs a point and a nonzero vector pointing [[along]] the line."},
 {t:"p",x:"Starting from the given point, move any signed multiple of the direction vector."},
 {t:"p",x:"A plane also needs a point. Its nonzero normal sticks straight out of it."}]});
/* 3 · Legend → formula, Guess. Moving by n adds n·n = ‖n‖² > 0 to the dot product. */
rc98("calc3-geometry-3",3,{p:[
 {t:"p",x:"Let $p$ be a point in the plane, $r$ a candidate point and $n$ its nonzero normal."},
 {t:"take",x:"A move by $n$ leaves the plane because it adds a displacement perpendicular to the plane."},
 {t:"eq",eq:"n·(r − p) = 0",cap:"Only points r in the plane pass this test."}],
 g:{at:1,q:"Starting at p, move by the vector n. Where do you land?",o:[
  ["Off the plane",1,"A nonzero normal displacement adds a positive term to the normal dot product."],
  ["In the plane",0,"To stay in the plane, the displacement must be perpendicular to the normal."]]}});

/* ---------- calc3-geometry-4 · Space curves, curvature, and motion ---------- */
/* 0 · Compare, no interaction */
rc98("calc3-geometry-4",0,{p:[
 {t:"p",x:"**Velocity** describes how fast and in what direction a point moves."},
 {t:"p",x:"**Speed** is just the length of the velocity. A point can turn while keeping the same speed."}]});
/* 1 · Legend → formulas, Fill “with respect to time” */
rc98("calc3-geometry-4",1,{p:[
 {t:"p",x:"A **space curve** gives position $r(t)$. Velocity is its rate of change [[with respect to time]]."},
 {t:"eq",eq:"v = dr/dt",cap:"For differentiable position r and time t. Speed is the length of v."}]});
/* 2 · Definition → formula, no interaction. A circle turns 2π rad over arc length 2πR, giving 1/R. */
rc98("calc3-geometry-4",2,{p:[
 {t:"p",x:"**Arc length** is distance measured along the curve. **Curvature** $κ$ measures how quickly the tangent direction turns per unit of that distance."},
 {t:"eq",eq:"κ = 1/R",cap:"For a circle of radius R, at any point."}]});
/* 3 · Reason, Guess (nonzero). Uniform circular motion has inward acceleration of magnitude speed²/R. */
rc98("calc3-geometry-4",3,{p:[
 {t:"p",x:"**Acceleration** is the rate of change of velocity. A point travels around a circle at constant nonzero speed."},
 {t:"take",x:"Acceleration is nonzero because the velocity keeps turning."},
 {t:"p",x:"For steady circular motion, the acceleration points inward. This is **normal acceleration**: the component perpendicular to velocity that changes its direction."}],
 g:{at:1,q:"Is the acceleration zero?",o:[
  ["Yes, it is zero",0,"Constant speed fixes the length of velocity. Its direction still changes."],
  ["No, it is nonzero",1,"A change of direction is a change in velocity."]]}});

/* ---------- calc3-partials-1 · Multivariable limits and continuity ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-partials-1",0,{p:[
 {t:"p",x:"A **limit** is the value the output approaches as the inputs approach a point."},
 {t:"p",x:"Test approaches through the **domain**, the set of allowed inputs. The value at the point plays no role."}]});
/* 1 · Rule, Fill */
rc98("calc3-partials-1",1,{p:[
 {t:"p",x:"If the outputs approach [[different]] values on two paths, the limit fails to exist."},
 {t:"take",x:"A limit must have one value that works for every approach."}]});
/* 2 · Example, Guess. Along y=x² the quotient is x⁴/(2x⁴)=1/2; along the axes it is zero. */
rc98("calc3-partials-1",2,{p:[
 {t:"p",x:"Near the origin, divide $x^2y$ by $x^4+y^2$. The result is zero on both axes away from the origin."},
 {t:"p",x:"On the curve $y=x^2$, the numerator is $x^4$ and the denominator is $2x^4$. This gives $1/2$."},
 {t:"p",x:"These two approaches give different values, so the limit fails to exist. **Continuity** requires a limit equal to the value at the point."}],
 g:{at:1,q:"What value do you get along y = x² away from the origin?",o:[
  ["1/2",1,"Substitution makes the denominator twice the numerator."],
  ["0",0,"Zero applies on the axes. Here both coordinates are nonzero."],
  ["1",0,"The denominator has two equal x⁴ terms."]]}});
/* 3 · Reason, no interaction */
rc98("calc3-partials-1",3,{p:[
 {t:"p",x:"Infinitely many straight and curved paths can approach the same point."},
 {t:"p",x:"To prove a limit, control the output error for every nearby input using its distance from the point."}]});

/* ---------- calc3-partials-2 · Partial derivatives and the gradient ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-partials-2",0,{p:[
 {t:"p",x:"A **sensitivity** is a rate of output change as an input varies."},
 {t:"p",x:"For a scalar function, which gives one number, each input can have its own sensitivity."}]});
/* 1 · Rule → formula, Fill */
rc98("calc3-partials-2",1,{p:[
 {t:"p",x:"A **partial derivative** varies one input while holding the others [[fixed]]."},
 {t:"eq",eq:"∇f = (f_x, f_y)",cap:"For f(x,y), f_x varies x alone and f_y varies y alone."},
 {t:"p",x:"The **gradient** collects those first derivatives in a vector."}]});
/* 2 · Definition → rule, no interaction */
rc98("calc3-partials-2",2,{p:[
 {t:"p",x:"For a differentiable function, a nonzero gradient points toward the steepest local increase per unit distance."},
 {t:"p",x:"A **level set** contains inputs with the same output. The gradient is perpendicular to the tangent of a level curve wherever that tangent exists."}]});
/* 3 · Rule → formula, Guess. The dot product with the zero vector is zero. */
rc98("calc3-partials-2",3,{p:[
 {t:"p",x:"A **directional derivative** measures the rate per unit distance in a direction given by a unit vector $u$."},
 {t:"eq",eq:"D_u f = ∇f·u",cap:"For differentiable f at the point."},
 {t:"p",x:"The zero gradient gives no first-order change. For a nonzero gradient the rate is greatest when $u$ points along it."}],
 g:{at:1,q:"If the gradient is zero, what is the rate along a unit direction?",o:[
  ["Zero in every direction",1,"The dot product with the zero vector is zero."],
  ["Positive in some direction",0,"An increase here must come from changes beyond first order."]]}});

/* ---------- calc3-partials-3 · Directional derivatives and tangent planes ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-partials-3",0,{p:[
 {t:"p",x:"A **local linear model** predicts how much a function changes for a small move from a base input."},
 {t:"p",x:"A first-order model keeps the part that scales linearly with the move, including changes in all coordinates."}]});
/* 1 · Rule → formula, Guess. ∇f·(2u)=2∇f·u. */
rc98("calc3-partials-3",1,{p:[
 {t:"p",x:"For differentiable $f$, the gradient $∇f$ collects the coordinate slopes. The directional derivative along a unit vector $u$ is the rate per unit distance."},
 {t:"eq",eq:"D_u f = ∇f·u",cap:"For a unit vector u."},
 {t:"p",x:"For a nonunit direction, the dot product gives a rate per parameter step. Doubling the direction vector doubles that rate."}],
 g:{at:1,q:"Double the direction vector for the same parameter step. What happens to the rate per parameter step?",o:[
  ["It doubles",1,"The step now covers twice the distance."],
  ["It stays the same",0,"That is the rate per unit distance."]]}});
/* 2 · Legend → formula, no interaction */
rc98("calc3-partials-3",2,{p:[
 {t:"p",x:"Let $a$ be the base input and $h$ the displacement. Evaluate the gradient at $a$."},
 {t:"eq",eq:"f(a+h) ≈ f(a)+∇f(a)·h",cap:"For f differentiable at a and small h."},
 {t:"p",x:"With two inputs, the graph of this approximation is the **tangent plane**."}]});
/* 3 · Rule, Fill */
rc98("calc3-partials-3",3,{p:[
 {t:"p",x:"**Differentiability** means the linear model’s error goes to zero [[faster]] than the displacement length."},
 {t:"eq",eq:"error / ‖h‖ → 0",cap:"As nonzero displacement h tends to zero from any direction."},
 {t:"p",x:"Partial derivatives alone describe the coordinate directions and cannot guarantee this error test."}]});

/* ---------- calc3-partials-4 · Multivariable chain rule and Jacobians ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-partials-4",0,{p:[
 {t:"p",x:"Some outputs depend on intermediate variables, which in turn depend on the original inputs."},
 {t:"p",x:"The **chain rule** uses those dependencies to find how changes in the original inputs reach the outputs."}]});
/* 1 · Definition, Fill */
rc98("calc3-partials-4",1,{p:[
 {t:"p",x:"A **Jacobian** is a matrix of first partial derivatives. Its rows correspond to [[outputs]]."},
 {t:"p",x:"For a row, pick one output and write its derivative with respect to each input. Each column corresponds to one input."}]});
/* 2 · Legend → formula, Guess */
rc98("calc3-partials-4",2,{p:[
 {t:"p",x:"In $F∘G$, apply $G$ and then send its output into $F$. Write $J_F$ and $J_G$ for their Jacobians."},
 {t:"eq",eq:"J_{F∘G} = J_F J_G",cap:"For differentiable maps. Evaluate J_F at the output of G."},
 {t:"p",x:"Each product entry adds the contributions along the intermediate paths."}],
 g:{at:1,q:"Which Jacobian goes on the left of the product?",o:[
  ["The Jacobian of F",1,"The input change passes through G first, then F."],
  ["The Jacobian of G",0,"That order acts on the original input change with F first."]]}});
/* 3 · Rule → formula, no interaction */
rc98("calc3-partials-4",3,{p:[
 {t:"p",x:"A **mixed partial derivative** differentiates with respect to one input and then another."},
 {t:"p",x:"Write $f_{xy}$ for the y derivative of $f_x$ and $f_{yx}$ for the other order."},
 {t:"eq",eq:"f_{xy} = f_{yx}",cap:"If both mixed second partials exist and are continuous near the point."}]});

/* ---------- calc3-optimization-1 · Critical points and Hessians ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-optimization-1",0,{p:[
 {t:"p",x:"A **stationary point** is a point where the gradient, the vector of first derivatives, is zero."},
 {t:"p",x:"It is a candidate for a local maximum or minimum. A **saddle** has nearby points with higher and lower values."}]});
/* 1 · Definition → rule, no interaction */
rc98("calc3-optimization-1",1,{p:[
 {t:"p",x:"A differentiable objective has zero gradient at an unconstrained interior optimum."},
 {t:"p",x:"The **Hessian** $H$ is the matrix of second partial derivatives. Diagonal entries differentiate twice in one coordinate. Off-diagonal entries mix coordinates."}]});
/* 2 · Compare, Fill */
rc98("calc3-optimization-1",2,{p:[
 {t:"p",x:"At a stationary point of a twice continuously differentiable function, a Hessian with positive curvature in every direction is **positive definite**. The point is a strict local [[minimum]]."},
 {t:"p",x:"Negative curvature in every direction means **negative definite**, giving a strict local maximum. Mixed signs mean **indefinite**, giving a saddle."}]});
/* 3 · Rule → formula, Guess. A negative determinant means opposite signs of the two Hessian eigenvalues. */
rc98("calc3-optimization-1",3,{p:[
 {t:"p",x:"For two inputs, let $D$ be the Hessian determinant. It is the product of the diagonal entries minus the product of the off-diagonal entries."},
 {t:"eq",eq:"D = f_{xx} f_{yy} − f_{xy}^2",cap:"Continuous second derivatives make the two mixed entries equal."},
 {t:"p",x:"If $D<0$, the point is a saddle. For $D>0$, positive $f_{xx}$ gives a minimum and negative gives a maximum. At $D=0$ the test is inconclusive."}],
 g:{at:1,q:"At a stationary point, what does a negative D imply?",o:[
  ["A saddle",1,"The Hessian has curvature of both signs."],
  ["A local minimum",0,"A minimum by this test requires positive curvature in every direction."]]}});

/* ---------- calc3-optimization-2 · Lagrange multipliers ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-optimization-2",0,{p:[
 {t:"p",x:"The **objective** is the function you want to maximize or minimize. An **equality constraint** limits the inputs to those satisfying an equation."},
 {t:"p",x:"At a constrained optimum, a small allowed move cannot improve the objective to first order."}]});
/* 1 · Legend → formula, Fill */
rc98("calc3-optimization-2",1,{p:[
 {t:"p",x:"Write $f$ for the objective and $g=c$ for the constraint. At a smooth constrained optimum with nonzero $∇g$, the gradients are [[parallel]] in the sense that one is a scalar multiple of the other."},
 {t:"eq",eq:"∇f = λ ∇g",cap:"At a stationary candidate on g = c with nonzero ∇g."},
 {t:"p",x:"The number $λ$ is a **Lagrange multiplier**. Solve the gradient equation and the constraint together, then compare candidates to find the best value."}]});
/* 2 · Rule, Guess */
rc98("calc3-optimization-2",2,{p:[
 {t:"p",x:"Suppose the optimum stays on a smooth branch as you vary the right-hand side $c$, using the sign convention above."},
 {t:"eq",eq:"Δf ≈ λ Δc",cap:"For a small change Δc along the regular optimum branch."},
 {t:"p",x:"The multiplier estimates how much changing the constraint level changes the best objective value."}],
 g:{at:1,q:"What does the multiplier estimate?",o:[
  ["How the best value changes",1,"It gives the slope of the optimal value with respect to c."],
  ["How c itself changes",0,"The change in c is the input, so λ converts it to an estimated objective change."]]}});
/* 3 · Reason, no interaction */
rc98("calc3-optimization-2",3,{p:[
 {t:"p",x:"A **tangent direction** follows the constraint surface locally. Along it, $g$ stays fixed to first order, so its direction is perpendicular to $∇g$."},
 {t:"p",x:"The objective also has zero slope along every tangent direction at a constrained optimum. Its gradient therefore lies along the constraint normal, the direction perpendicular to the tangent space."}]});

/* ---------- calc3-optimization-3 · Boundaries and inequality constraints ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-optimization-3",0,{p:[
 {t:"p",x:"A point is **feasible** if it satisfies every constraint."},
 {t:"p",x:"The best feasible value may occur inside the region, along an edge, or where edges meet. Check corners and intersections as well as smooth edges. Compare objective values across all feasible candidates."}]});
/* 1 · Rule, Fill */
rc98("calc3-optimization-3",1,{p:[
 {t:"p",x:"Write an inequality as $g≤0$. It is **active** when the bound holds at equality. An inactive constraint has [[positive]] slack."},
 {t:"eq",eq:"slack = −g",cap:"At a feasible input with g ≤ 0."},
 {t:"p",x:"Slack is how far you can tighten the bound before the current point reaches it. An active bound has zero slack."}]});
/* 2 · Rule → formula, Guess. If slack > 0 and λ·slack = 0 then λ = 0. */
rc98("calc3-optimization-3",2,{p:[
 {t:"p",x:"To minimize smooth $f$ subject to $g≤0$, give the bound a weight $λ$, its **multiplier**. The **KKT conditions** are first-order tests at a local optimum under suitable constraint regularity."},
 {t:"eq",eq:"∇f + λ ∇g = 0",cap:"Stationarity: the objective and weighted constraint slopes balance."},
 {t:"p",x:"Feasibility requires $g≤0$ and the multiplier sign is $λ≥0$. **Complementary slackness** requires multiplier times slack to be zero. Positive slack therefore forces a zero multiplier."}],
 g:{at:1,q:"Can a constraint with positive slack have a positive KKT multiplier?",o:[
  ["No, its multiplier is zero",1,"Their product must be zero."],
  ["Yes, its multiplier can be positive",0,"A positive multiplier can occur only at a tight bound."]]}});
/* 3 · Reason, no interaction */
rc98("calc3-optimization-3",3,{p:[
 {t:"p",x:"A boundary can block the direction in which the objective improves most quickly."},
 {t:"take",x:"The best allowed point may therefore have a nonzero objective gradient."}]});

/* ---------- calc3-optimization-4 · Second-order models and sensitivity ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-optimization-4",0,{p:[
 {t:"p",x:"A **second-order model** approximates a function near a chosen input using slope and curvature."},
 {t:"p",x:"It captures more local behavior than a linear model. Its prediction can degrade as you move farther from the base input."}]});
/* 1 · Legend → formula, no interaction. The quadratic coefficient is 1/2 from the one-variable Taylor term 1/2! along the displacement. */
rc98("calc3-optimization-4",1,{p:[
 {t:"p",x:"Let $h$ be the input displacement. Let $H$ be the Hessian (matrix of second derivatives) at the base input. The superscript $T$ turns the displacement column into a row."},
 {t:"eq",eq:"½ h^T H h",cap:"The quadratic correction for a twice continuously differentiable function."},
 {t:"p",x:"Add this correction to the base value plus the gradient dotted with $h$. This is the **second-order Taylor model**."}]});
/* 2 · Rule, Fill */
rc98("calc3-optimization-4",2,{p:[
 {t:"p",x:"**Conditioning** describes how sensitive a computed answer is to small changes in its inputs. Optimization can become poorly conditioned when coordinates have very [[different]] scales."},
 {t:"p",x:"It can also happen along a **flat direction**, where the objective curves only weakly."},
 {t:"p",x:"Check the proposed input against the original objective after optimizing the model."}]});
/* 3 · Reason, Guess. For a one-dimensional quadratic with slope s and curvature k>0, h=−s/k and Δh=−Δs/k. */
rc98("calc3-optimization-4",3,{p:[
 {t:"p",x:"Consider a local quadratic along one direction. Its initial slope is uncertain and its curvature is small but positive."},
 {t:"eq",eq:"h = −s/k",cap:"Offset h to the quadratic minimum for initial slope s and curvature k > 0."},
 {t:"p",x:"A small slope error shifts the predicted minimum farther when the direction is flatter."}],
 g:{at:1,q:"How does smaller curvature affect the predicted minimizer’s sensitivity to a slope error?",o:[
  ["It magnifies the shift",1,"The slope changes slowly along the flatter curve, so the point where it reaches zero moves farther."],
  ["It shrinks the shift",0,"A flatter curve needs a longer move to cancel the same slope error."]]}});

/* ---------- calc3-multiple-integrals-1 · Double integrals and integration order ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-multiple-integrals-1",0,{p:[
 {t:"p",x:"A **double integral** adds up contributions from tiny areas of a flat region."},
 {t:"p",x:"One way to add them is to slice the region along one coordinate direction and then add the slice totals."}]});
/* 1 · Rule, existing figure, no interaction */
rc98("calc3-multiple-integrals-1",1,{p:[
 {t:"p",x:"An **iterated integral** is an integral inside another integral. On each slice, integrate over the inside variable while the outside variable stays fixed."},
 {t:"p",x:"**Fubini’s theorem** permits this for continuous functions on rectangles."}]});
/* 2 · Process, Fill */
rc98("calc3-multiple-integrals-1",2,{p:[
 {t:"p",x:"To swap the order, describe the [[same]] region using slices in the other direction."},
 {t:"p",x:"Find the new outside range, then the new inside limits for each outside value."},
 {t:"p",x:"Split the region wherever one bound formula cannot describe all slices. This slicing is valid if the integrand extended by zero outside the bounded region is integrable."}]});
/* 3 · Reason → transfer, Guess. A narrow polar sector has area r × angular width × radial thickness to first order. */
rc98("calc3-multiple-integrals-1",3,{p:[
 {t:"p",x:"Coordinate slices can look different while adding the same area. In polar coordinates, an angular slice opens outward from the origin."},
 {t:"eq",eq:"dA = r dr dθ",cap:"r is radius, dr its radial increment, and dθ the angle increment in radians."},
 {t:"p",x:"Farther-out arcs are longer, so the polar area element grows with radius."}],
 g:{at:1,q:"For equal small angle and radial increments, how does patch area change farther out?",o:[
  ["It grows",1,"The same angle sweeps a longer arc at larger radius."],
  ["It stays fixed",0,"Equal angle increments do not give equal arc lengths."]]}});

/* ---------- calc3-multiple-integrals-2 · Polar double integrals and Jacobian factors ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-multiple-integrals-2",0,{p:[
 {t:"p",x:"**Polar coordinates** locate a point by a radius $r$ from the origin and an angle $θ$ from the positive horizontal axis."},
 {t:"p",x:"A tiny rectangle in the radius and angle coordinates maps to a narrow sector in the plane."}]});
/* 1 · Rule → formula, Fill */
rc98("calc3-multiple-integrals-2",1,{p:[
 {t:"p",x:"For equal increments of radius and angle, the area per increment pair is [[proportional]] to radius."},
 {t:"eq",eq:"dA = r dr dθ",cap:"r ≥ 0, dr is the radial increment, and dθ is measured in radians."},
 {t:"p",x:"The extra factor of $r$ converts the coordinate increments to physical area."}]});
/* 2 · Rule, Guess */
rc98("calc3-multiple-integrals-2",2,{p:[
 {t:"p",x:"For a smooth, invertible coordinate change with smooth inverse, the **Jacobian determinant** describes local area scaling and orientation."},
 {t:"take",x:"Use the absolute value of the Jacobian determinant to scale area. A negative sign indicates reversed orientation."}],
 g:{at:1,q:"If that determinant is negative, which factor scales area?",o:[
  ["Its absolute value",1,"Area is positive even when orientation reverses."],
  ["Its signed value",0,"The sign records orientation, which scalar area does not carry."]]}});
/* 3 · Reason, no interaction. Arc length is r times the angle in radians. */
rc98("calc3-multiple-integrals-2",3,{p:[
 {t:"p",x:"An angle increment $dθ$ sweeps out an arc of length $r dθ$."},
 {t:"p",x:"Multiply that length by the radial thickness $dr$ for the tiny area. At a greater radius the same angle sweeps a longer arc."}]});

/* ---------- calc3-multiple-integrals-3 · Triple integrals and cylindrical coordinates ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-multiple-integrals-3",0,{p:[
 {t:"p",x:"A **triple integral** adds up a scalar, a single number at each point, throughout a solid."},
 {t:"p",x:"You can group the tiny volumes into slices and add the slice totals."}]});
/* 1 · Process, no interaction */
rc98("calc3-multiple-integrals-3",1,{p:[
 {t:"p",x:"The bounds describe the entire solid. In nested integrals, an inner bound can depend on variables integrated later."},
 {t:"p",x:"For example, fix the horizontal location and sweep vertically from the bottom to the top of the solid. Then integrate over the allowed horizontal locations."}]});
/* 2 · Legend → formula, Fill */
rc98("calc3-multiple-integrals-3",2,{p:[
 {t:"p",x:"**Cylindrical coordinates** use radius $r$ and angle $θ$ in the horizontal plane. They leave the height $z$ [[unchanged]]."},
 {t:"eq",eq:"dV = r dr dθ dz",cap:"r ≥ 0 and θ is measured in radians. dz is the vertical thickness."},
 {t:"p",x:"Only the horizontal increments need polar area scaling."}]});
/* 3 · Reason, Guess. Doubling dz alone doubles dV. */
rc98("calc3-multiple-integrals-3",3,{p:[
 {t:"p",x:"A horizontal patch is a small sector. Its area grows with radius because its angular side gets longer."},
 {t:"take",x:"Volume is sector area times thickness. Doubling the thickness alone doubles the volume."}],
 g:{at:1,q:"Keep the same horizontal patch and double the vertical increment. What happens to the tiny volume?",o:[
  ["It doubles",1,"The sector area is unchanged and the thickness doubles."],
  ["It quadruples",0,"That would require another factor of two from the horizontal patch."]]}});

/* ---------- calc3-multiple-integrals-4 · Spherical coordinates and general transformations ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-multiple-integrals-4",0,{p:[
 {t:"p",x:"A coordinate change alters the amount of physical volume covered by equal increments of the new coordinates."},
 {t:"p",x:"In spherical coordinates the two angle directions can stretch by different amounts, depending on where you are."}]});
/* 1 · Legend → formula, no interaction */
rc98("calc3-multiple-integrals-4",1,{p:[
 {t:"p",x:"**Spherical coordinates** use distance $ρ$ from the origin, azimuth $θ$ around the vertical axis, and polar angle $φ$ down from positive $z$."},
 {t:"eq",eq:"dV = ρ^2 sinφ dρ dφ dθ",cap:"ρ ≥ 0. Use radians and measure φ down from positive z."},
 {t:"p",x:"Each differential is a small increment of its coordinate."}]});
/* 2 · Rule, Fill */
rc98("calc3-multiple-integrals-4",2,{p:[
 {t:"p",x:"Angle conventions vary. Define which angle is measured from the pole before setting bounds."},
 {t:"p",x:"In a smooth coordinate substitution, take the [[absolute value]] of the Jacobian determinant, which measures signed volume scaling."},
 {t:"p",x:"Choose bounds or split the integral so that almost every physical point is counted once. A nonzero determinant only gives local invertibility. For example, azimuths a full turn apart can describe the same points."}]});
/* 3 · Reason, Guess. Azimuth arc radius is ρ sinφ; it tends to zero at φ=0. */
rc98("calc3-multiple-integrals-4",3,{p:[
 {t:"p",x:"Hold $ρ$ fixed and compare how far the same small change in azimuth moves you near the north pole and near the equator."},
 {t:"p",x:"Near the pole the azimuth arc is shorter. Its length per radian is $ρ sinφ$, the distance to the vertical axis."},
 {t:"p",x:"The other angular arc has length per radian $ρ$. Multiplying both by radial thickness gives the volume factor."}],
 g:{at:1,q:"Where is the azimuth step shorter?",o:[
  ["Near the pole",1,"The circle around the vertical axis shrinks as you approach the pole."],
  ["Near the equator",0,"The horizontal circle has its largest radius at the equator."]]}});

/* ---------- calc3-line-integrals-1 · Scalar and vector line integrals ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-line-integrals-1",0,{p:[
 {t:"p",x:"A **line integral** adds contributions along a curve. A scalar line integral weights each little length of the curve by a number."},
 {t:"p",x:"A vector **work integral** counts the part of a vector field, such as force, pointing along the motion."}]});
/* 1 · Rule, existing figure, no interaction */
rc98("calc3-line-integrals-1",1,{p:[
 {t:"p",x:"For a piecewise smooth path $r(t)$, the derivative gives the directed motion per unit increase in the path parameter $t$."},
 {t:"p",x:"For a scalar integrand, weight it by the length of that derivative. For work, take the dot product of the field with the derivative."}]});
/* 2 · Compare, Guess */
rc98("calc3-line-integrals-1",2,{p:[
 {t:"p",x:"Traverse the same path backward through the same scalar and vector fields."},
 {t:"take",x:"Reversing the path reverses the sign of work. The scalar integral against arc length is unchanged."}],
 g:{at:1,q:"What happens to the work integral?",o:[
  ["It changes sign",1,"Each little directed displacement reverses."],
  ["It stays the same",0,"That is true for the scalar integral against length."]]}});
/* 3 · Reason, Fill */
rc98("calc3-line-integrals-1",3,{p:[
 {t:"p",x:"A small step has the same length both ways, but its displacement points in the [[opposite]] direction on the return trip."},
 {t:"p",x:"The length weight stays the same. The dot product with the directed step changes sign."}]});

/* ---------- calc3-line-integrals-2 · Conservative fields and potentials ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-line-integrals-2",0,{p:[
 {t:"p",x:"An **endpoint** is the start or finish of a path. Work is **path independent** on a domain when all paths there with the same ordered endpoints have the same work."},
 {t:"p",x:"A function of position can store all the information you need to calculate that work."}]});
/* 1 · Legend → formula, Fill */
rc98("calc3-line-integrals-2",1,{p:[
 {t:"p",x:"A **conservative field** $F$ is the gradient of a scalar **potential** $φ$. Its work from $A$ to $B$ depends [[only on the endpoints]]."},
 {t:"eq",eq:"work = φ(B) − φ(A)",cap:"For a piecewise smooth path inside the domain of the potential."},
 {t:"p",x:"Compute the final potential minus the initial potential."}]});
/* 2 · Compare, Guess. For B=A, φ(A)−φ(A)=0. */
rc98("calc3-line-integrals-2",2,{p:[
 {t:"p",x:"A **closed path** returns to its starting point. **Circulation** is work around such a path."},
 {t:"take",x:"Closed paths in the domain have zero circulation because both endpoints are the same point."},
 {t:"p",x:"Check that the potential is defined everywhere on the path."}],
 g:{at:1,q:"What circulation can a conservative field give on a closed path in its domain?",o:[
  ["Zero",1,"The two endpoint potential values cancel."],
  ["A nonzero value",0,"That could happen only if the field does not have a single potential on the path’s domain."]]}});
/* 3 · Reason → formula, no interaction */
rc98("calc3-line-integrals-2",3,{p:[
 {t:"p",x:"Along the path $r(t)$, the potential becomes a function of the path parameter $t$."},
 {t:"eq",eq:"dφ/dt = ∇φ·r′(t)",cap:"By the chain rule, evaluated at r(t) on each smooth part."},
 {t:"p",x:"Integrate this ordinary derivative over the path parameter to get the potential change."}]});

/* ---------- calc3-line-integrals-3 · Green’s theorem ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-line-integrals-3",0,{p:[
 {t:"p",x:"**Circulation** measures how much a vector field pushes along an oriented closed curve. Orientation is the direction you travel."},
 {t:"p",x:"**Green’s theorem** moves the calculation from a plane region’s boundary to its interior."},
 {t:"p",x:"Write the field’s horizontal and vertical components as $P$ and $Q$. **Scalar curl** measures local counterclockwise circulation per unit area."},
 {t:"eq",eq:"curl = Q_x − P_y",cap:"Q_x differentiates Q along x. P_y differentiates P along y."}]});
/* 1 · Legend → formula, existing figure, no interaction */
rc98("calc3-line-integrals-3",1,{p:[
 {t:"p",x:"Add the scalar curl over the plane region."},
 {t:"take",x:"The result is the circulation along the oriented boundary shown."}]});
/* 2 · Rule, Fill */
rc98("calc3-line-integrals-3",2,{p:[
 {t:"p",x:"Require continuous first partial derivatives throughout an open neighborhood of the region and its piecewise smooth boundary."},
 {t:"p",x:"A positive boundary keeps the region on your left, so its inner and outer loops go in [[opposite]] senses."},
 {t:"p",x:"Travel counterclockwise around the outside and clockwise around holes."}]});
/* 3 · Reason, Guess */
rc98("calc3-line-integrals-3",3,{p:[
 {t:"p",x:"Imagine splitting the region into adjacent patches and adding their boundary circulations."},
 {t:"take",x:"Shared edges cancel because the patches traverse them in opposite directions. Only the region’s boundary remains."}],
 g:{at:1,q:"What happens to contributions on a shared edge?",o:[
  ["They cancel",1,"The edge is traversed in opposite directions by its two patches."],
  ["They add in the same direction",0,"That would count the shared edge twice with the same orientation."]]}});

/* ---------- calc3-line-integrals-4 · Curl-free fields and domain holes ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-line-integrals-4",0,{p:[
 {t:"p",x:"A field’s **curl** measures local circulation. Zero curl rules out a local spin detected by first derivatives."},
 {t:"p",x:"**Path independence** is a global statement: every pair of paths with the same endpoints gives the same work."}]});
/* 1 · Rule, Fill */
rc98("calc3-line-integrals-4",1,{p:[
 {t:"p",x:"A smooth **conservative** field is a gradient, so it has zero curl."},
 {t:"p",x:"**Simply connected** means the domain is path-connected and each closed loop can be shrunk to a point [[within]] it."},
 {t:"p",x:"On a simply connected open domain, the converse holds: a continuously differentiable field with zero curl is conservative."}]});
/* 2 · Compare, Guess */
rc98("calc3-line-integrals-4",2,{p:[
 {t:"p",x:"Consider a curl-free field on the plane with the origin removed. A closed path winds around that missing point."},
 {t:"take",x:"A hole can allow nonzero circulation even when curl vanishes everywhere the field is defined."}],
 g:{at:1,q:"Can this path have nonzero circulation?",o:[
  ["Yes, it can",1,"The missing point blocks contraction, so local zero curl need not imply zero work around the loop."],
  ["No, it cannot",0,"Zero curl gives the global conclusion only with additional domain conditions."]]}});
/* 3 · Reason, no interaction */
rc98("calc3-line-integrals-4",3,{p:[
 {t:"p",x:"For a loop around a hole, filling its interior can require points where the field is undefined."},
 {t:"p",x:"A local derivative test never measures what happens at those missing points. Check the domain before inferring a potential."}]});

/* ---------- calc3-surface-theorems-1 · Surface parameterization and flux ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-surface-theorems-1",0,{p:[
 {t:"p",x:"**Flux** measures how strongly a field passes through a surface."},
 {t:"p",x:"An **oriented** surface has a chosen normal direction, perpendicular to its tangent plane. Flow along that normal contributes positive flux."}]});
/* 1 · Rule, existing figure, no interaction */
rc98("calc3-surface-theorems-1",1,{p:[
 {t:"p",x:"A **parameterization** gives each surface point as a position vector depending on two parameters."},
 {t:"p",x:"Vary one parameter at a time to get two tangent vectors. At a regular patch they are independent, so their cross product gives a nonzero oriented area vector."}]});
/* 2 · Compare, Fill */
rc98("calc3-surface-theorems-1",2,{p:[
 {t:"p",x:"For scalar area, use the [[length]] of the area vector. The length is independent of the chosen normal."},
 {t:"p",x:"For flux, dot the field with the oriented area vector instead. Reversing the normal changes the sign of that dot product."}]});
/* 3 · Reason, Guess */
rc98("calc3-surface-theorems-1",3,{p:[
 {t:"p",x:"Imagine a sheet in a moving fluid. The fluid velocity at the sheet lies entirely in the local tangent plane."},
 {t:"take",x:"Only the normal part of the field passes through the surface. A tangent field contributes zero flux."}],
 g:{at:1,q:"What is the local flux through the sheet?",o:[
  ["Zero",1,"The flow runs along the sheet and its normal component is zero."],
  ["Nonzero",0,"Motion along the sheet does not pass through it."]]}});

/* ---------- calc3-surface-theorems-2 · Divergence theorem ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-surface-theorems-2",0,{p:[
 {t:"p",x:"A **closed surface** bounds a solid without an open edge. The outward normal points away from that solid."},
 {t:"p",x:"**Divergence** measures local net outflow per unit volume, positive for a net source and negative for a net sink."}]});
/* 1 · Rule, Fill */
rc98("calc3-surface-theorems-2",1,{p:[
 {t:"p",x:"The **divergence theorem** equates the net outward flux of a field through a closed boundary to divergence integrated over the [[interior]]."},
 {t:"p",x:"Use the theorem for a piecewise smooth closed boundary with a field whose first partial derivatives are continuous on a neighborhood of the solid."},
 {t:"p",x:"The volume integral sums the source and sink contributions throughout the solid."}]});
/* 2 · Legend → formula, Guess */
rc98("calc3-surface-theorems-2",2,{p:[
 {t:"p",x:"Let $P$, $Q$ and $R$ be the field components along $x$, $y$ and $z$. The subscripts denote partial derivatives."},
 {t:"eq",eq:"div F = P_x + Q_y + R_z",cap:"Each derivative varies its indicated coordinate alone."},
 {t:"p",x:"For an open surface, compute flux directly or close it with extra pieces. Subtract their flux using the outward orientation, then match the requested normal."}],
 g:{at:1,q:"Which derivative belongs to the x component in the divergence sum?",o:[
  ["Differentiate it along x",1,"Divergence compares flow through the pair of faces normal to the component’s axis."],
  ["Differentiate it along y",0,"That is a sideways change and does not give the net flow through the x faces."]]}});
/* 3 · Reason, no interaction */
rc98("calc3-surface-theorems-2",3,{p:[
 {t:"p",x:"Divide the solid into little volumes. Each shared face has opposite outward normals for its two neighbors."},
 {t:"p",x:"Their flux contributions cancel. Only flux through the outer boundary survives the sum."}]});

/* ---------- calc3-surface-theorems-3 · Stokes’ theorem ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-surface-theorems-3",0,{p:[
 {t:"p",x:"**Circulation** is the work of a field along an oriented closed curve. **Curl** is the vector that measures local circulation about different axes."},
 {t:"p",x:"Surface flux of curl counts the part of that local rotation along the surface normal."}]});
/* 1 · Rule, existing figure, no interaction */
rc98("calc3-surface-theorems-3",1,{p:[
 {t:"p",x:"**Stokes’ theorem** equates circulation around a surface boundary with the flux of curl through the surface."},
 {t:"p",x:"Use an oriented piecewise smooth surface and a field with continuous first derivatives near it. Match the boundary to the normal by the right-hand rule."}]});
/* 2 · Compare, Guess */
rc98("calc3-surface-theorems-3",2,{p:[
 {t:"p",x:"A **spanning surface** has the given curve as its boundary. Two suitable surfaces span the same oriented curve. Their curl fluxes are equal and nonzero. Now reverse the normal on just one surface."},
 {t:"take",x:"Reversing just one normal negates that surface’s curl flux. The fluxes now have opposite signs."}],
 g:{at:1,q:"How do their curl fluxes compare now?",o:[
  ["They have opposite signs",1,"Reversing a normal negates its flux and reverses its boundary direction."],
  ["They still agree",0,"They agreed when both surfaces induced the same boundary direction."]]}});
/* 3 · Reason, Fill */
rc98("calc3-surface-theorems-3",3,{p:[
 {t:"p",x:"When adding the circulations of neighboring patches, a shared edge is traversed in [[opposite]] directions."},
 {t:"p",x:"The interior edges cancel in pairs. Only circulation around the surface boundary remains."}]});

/* ---------- calc3-surface-theorems-4 · Choosing an integral theorem ---------- */
/* 0 · Definition, no interaction */
rc98("calc3-surface-theorems-4",0,{p:[
 {t:"p",x:"Identify the object you are integrating over and how it is oriented before selecting a theorem."},
 {t:"p",x:"A closed curve may bound a plane region or a surface in space. A closed surface can bound a volume."}]});
/* 1 · Compare, Fill */
rc98("calc3-surface-theorems-4",1,{p:[
 {t:"p",x:"For **Green’s theorem**, use a plane region and its positively oriented boundary. For **Stokes’ theorem**, match an oriented surface to its boundary curve."},
 {t:"p",x:"For the **divergence theorem**, use a [[closed]] surface with outward normals and the volume that it encloses."},
 {t:"p",x:"In each case check that the field has continuous first derivatives on the region or surface required by the theorem."}]});
/* 2 · Compare, Guess */
rc98("calc3-surface-theorems-4",2,{p:[
 {t:"p",x:"Suppose a vector field is the gradient of a continuously differentiable scalar **potential**. The path is piecewise smooth, lies in the domain of that potential, and may be open."},
 {t:"take",x:"Use the final potential minus the initial potential. The path can be open."}],
 g:{at:1,q:"How can you find the work without integrating along the path?",o:[
  ["Subtract endpoint potentials",1,"The derivative of the potential along the path is the work integrand."],
  ["Use the curl across a spanning surface",0,"Stokes relates a surface to its full boundary. An open path alone is not that boundary."]]}});
/* 3 · Rule → formula, no interaction */
rc98("calc3-surface-theorems-4",3,{p:[
 {t:"p",x:"Each boundary theorem trades a boundary integral for an integral one dimension higher. The geometry and the orientations determine the direction of the trade."},
 {t:"p",x:"For volume source accumulation, form divergence from the field components $P$, $Q$ and $R$. A subscript indicates the coordinate that varies."},
 {t:"eq",eq:"div F = P_x + Q_y + R_z",cap:"For F with components along x, y and z."}]});

/* ======== cards · diffeq (from origin/codex-cards-diffeq, 6ee65c2) ======== */
/* ===== Differential equations reveal cards · staged against b114 =====
   1. All 96 cards of the 24 Differential equations lessons as reveal cards (rc98, format in v98.js).
      Guess on 29 cards (first-order-1·1, first-order-2·0, first-order-2·3, first-order-3·1, first-order-4·0,
        second-order-1·2, second-order-1·3, second-order-2·2, second-order-3·3, second-order-4·3,
        laplace-1·2, laplace-2·3, laplace-3·1, laplace-4·2,
        systems-1·2, systems-2·2, systems-2·3, systems-3·2, systems-4·1,
        numerical-series-1·2, numerical-series-1·3, numerical-series-2·0, numerical-series-3·2, numerical-series-4·1,
        pde-1·3, pde-2·0, pde-3·2, pde-4·1, pde-4·3).
      Fill on 30 cards (first-order-1·0, first-order-2·1, first-order-3·0, first-order-3·2, first-order-4·2,
        second-order-1·0, second-order-2·1, second-order-2·3, second-order-3·1, second-order-4·1,
        laplace-1·0, laplace-2·0, laplace-2·2, laplace-3·0, laplace-4·0,
        systems-1·1, systems-2·1, systems-3·0, systems-3·3, systems-4·2,
        numerical-series-1·0, numerical-series-2·1, numerical-series-2·2, numerical-series-3·0, numerical-series-4·0,
        pde-1·0, pde-2·1, pde-2·3, pde-3·1, pde-4·2), 37 with neither.
      The Fourier projection card (pde-1·1) keeps its existing figure and omits duplicate visual blocks. */

/* ---------- diffeq-first-order-1 · Models, order, and initial conditions ---------- */
/* 0 · Terms → takeaway, Fill "rate of change". */
rc98("diffeq-first-order-1",0,{p:[
 {t:"term",s:"y",x:"The unknown function gives the value of a quantity at each input $t$. Time is one possible input."},
 {t:"term",s:"y′",x:"The derivative gives the instantaneous [[rate of change]] of $y$ with respect to $t$."},
 {t:"take",x:"A differential equation relates derivatives to other quantities. It might say the rate is proportional to the current value."}]});

/* 1 · Compare properties, Guess (second order). y″ differentiates y twice; squaring y does not differentiate it. */
rc98("diffeq-first-order-1",1,{p:[
 {t:"p",x:"In $y″ = y^2$, the double prime means differentiate $y$ twice with respect to the input. The power means multiply $y$ by itself."},
 {t:"take",x:"The equation is **second order**. Order counts how many times the highest derivative differentiates $y$."},
 {t:"p",x:"An **initial condition** specifies the value of $y$ or a derivative at one input value. An **initial-value problem** combines the equation with such data."}],
 g:{at:1,q:"What is the order of $y″ = y^2$?",o:[
  ["First order",0,"There is one derivative term, but that term differentiates twice."],
  ["Second order",1,"The highest derivative is the second derivative, $y″$."],
  ["Fourth order",0,"The exponent on $y$ is a power. It adds no derivatives."]]}});

/* 2 · Formula → compare, no interaction. The product yy′ and the power y² each have degree two in the unknown and its derivatives. */
rc98("diffeq-first-order-1",2,{p:[
 {t:"p",x:"In a **linear** differential equation, $y$ and its derivatives can be multiplied by coefficients and added. The coefficients may depend on the input $t$."},
 {t:"eq",eq:"y′ + t y = g(t)",lab:"A linear equation",cap:"g is a given function of t"},
 {t:"take",x:"A power such as $y^2$, or a product such as $y y′$, makes an equation nonlinear."}]});

/* 3 · Worked solution check, no interaction. y′=2y gives C exp(2t); at t=0, exp(0)=1 and C=3; exp(2 ln 2)=2²=4; 3·4=12. */
rc98("diffeq-first-order-1",3,{p:[
 {t:"p",x:"For the dimensionless equation $y′ = 2y$, the family is $y = C exp(2t)$. Here $C$ is any constant and $exp$ is the exponential function."},
 {t:"p",x:"The derivative is $2C exp(2t)$, so the family satisfies the equation for all real $t$. Since $exp(0) = 1$, imposing $y(0) = 3$ gives $C = 3$."},
 {t:"p",x:"Evaluate at $t = ln(2)$, where $ln$ is the natural logarithm, the inverse of $exp$."},
 {t:"step",f:"3 exp(2 ln 2) = 3 × 4",v:"12",u:"",fin:1},
 {t:"take",x:"Initial data select one trajectory when the problem has a unique solution."}]});

/* ---------- diffeq-first-order-2 · Separation, equilibria, and logistic growth ---------- */
/* 0 · Rule in words → formula, Guess (t on the input side). Dividing by 1+y when nonzero gives dy/(1+y)=t dt. */
rc98("diffeq-first-order-2",0,{p:[
 {t:"p",x:"A **separable** equation writes the rate as an input factor times an output factor. Here $t$ is the input, $y$ is the output, and $dy/dt$ (or $y′$) is its rate."},
 {t:"p",x:"In $dy/dt = t(1+y)$, keep $t$ with $dt$. Divide by $1+y$ to put the $y$ factor with $dy$."},
 {t:"eq",eq:"dy / (1+y) = t dt",cap:"where 1+y is nonzero"}],
 g:{at:1,q:"In $dy/dt = t(1+y)$, which factor stays with $dt$ after separation?",o:[
  ["$1+y$",0,"That factor depends on the output $y$, so it belongs with $dy$."],
  ["$t$",1,"The factor $t$ depends only on the input and stays with $dt$."]]}});

/* 1 · Process chain, Fill "separately". */
rc98("diffeq-first-order-2",1,{p:[
 {t:"p",x:"Check zeros of the output factor before dividing. Then integrate each side [[separately]]."},
 {t:"chain",items:["Check zeros","Separate","Integrate"],hl:1},
 {t:"p",x:"On an interval where the divided factor is nonzero, integrate the output side with respect to $y$ and the input side with respect to $t$. Include a constant of integration."}]});

/* 2 · Formula → worked rate, no interaction. y(1−y/10)=0 iff y=0 or y=10; at y=2, 2/10=0.2, 1−0.2=0.8 and 2·0.8=1.6. */
rc98("diffeq-first-order-2",2,{p:[
 {t:"p",x:"An **equilibrium** is a constant solution with zero rate. In logistic growth, the rate includes a factor that falls as $y$ approaches its **carrying capacity**, the nonzero saturation level."},
 {t:"eq",lab:"Example logistic rate",eq:"y′ = y(1−y/10)",cap:"dimensionless example with carrying capacity 10"},
 {t:"p",x:"At $y = 0$ the first factor vanishes. At $y = 10$ the second vanishes. Both constant functions solve the original equation."},
 {t:"step",f:"y′ at y = 2: 2 × 0.8",v:"1.60",u:"",fin:1}]});

/* 3 · Compare cases, Guess (flat only at that instant). At t=0, ty=0. For constant y=1, ty=t, which does not vanish on any open interval. */
rc98("diffeq-first-order-2",3,{p:[
 {t:"p",x:"Try $y′ = ty$ with $y(0) = 1$. Plugging in $t = 0$ gives a zero rate at the starting point."},
 {t:"take",x:"The solution is flat at the starting point. A constant $y = 1$ would also need zero rate at nearby times, but the right side would be $t$."},
 {t:"p",x:"Dividing by an output factor can hide a constant solution. Check each zero of that factor in the original equation for a whole interval."}],
 g:{at:1,q:"Does the zero rate at the start make $y = 1$ an equilibrium?",o:[
  ["Yes, it stays at 1.",0,"The rate must stay zero throughout an interval. Zero rate at a single point is insufficient."],
  ["No, only the starting slope is zero.",1,"At other times the rate evaluated at $y = 1$ is $t$, so $y$ cannot stay at 1."]]}});

/* ---------- diffeq-first-order-3 · Linear equations and integrating factors ---------- */
/* 0 · Plain text, Fill "a product". */
rc98("diffeq-first-order-3",0,{p:[
 {t:"p",x:"A first-order linear equation can have both a derivative term and a term proportional to the unknown."},
 {t:"p",x:"A carefully chosen multiplier turns their sum into the derivative of [[a product]]."},
 {t:"take",x:"That multiplier is the **integrating factor**. Once the left side is a single derivative, integrate to recover the product."}]});

/* 1 · Terms → normalization, Guess (negative p). Dividing 2y′−4y=6 by 2 gives y′−2y=3; −4/2=−2 and 6/2=3. */
rc98("diffeq-first-order-3",1,{p:[
 {t:"p",x:"Here $t$ is the input and $y′$ means $dy/dt$. To **normalize**, divide every term by the coefficient of $y′$ where that coefficient is nonzero."},
 {t:"eq",eq:"y′ + p(t)y = q(t)",cap:"normalized form for dimensionless variables",vars:[["p(t)","coefficient of y"],["q(t)","forcing, a given input independent of y"]]},
 {t:"p",x:"Dividing $2y′ − 4y = 6$ by $2$ gives $y′ − 2y = 3$. The coefficient $p(t)$ is $−2$."}],
 g:{at:2,q:"After normalizing $2y′ − 4y = 6$, what is $p(t)$?",o:[
  ["$−4$",0,"That is the coefficient before dividing the whole equation by 2."],
  ["$+2$",0,"Division by positive 2 keeps the negative sign."],
  ["$−2$",1,"Dividing the $y$ coefficient by 2 gives $−4/2 = −2$."]]}});

/* 2 · Rule in words → formulas, Fill "every term". μ′=p μ, so (μy)′=μy′+μ′y=μ(y′+py)=μq. */
rc98("diffeq-first-order-3",2,{p:[
 {t:"p",x:"On an interval where the normalized coefficient $p(t)$ is continuous, build the integrating factor $μ$ by exponentiating an antiderivative of $p$."},
 {t:"eq",eq:"μ = exp(∫ p(t) dt)",cap:"choose any one antiderivative of p"},
 {t:"p",x:"Multiply [[every term]] of $y′ + p(t)y = q(t)$ by $μ$. Since $μ′ = p(t)μ$, the product rule combines the two terms on the left."},
 {t:"eq",eq:"(μy)′ = μq(t)",cap:"after multiplying both sides"}]});

/* 3 · Worked example, no interaction. μ=exp(2t); ∫6exp(2t)dt=3exp(2t); 1=3+C gives C=−2; at t=ln(2)/2, exp(−2t)=1/2 and y=3−1=2. */
rc98("diffeq-first-order-3",3,{p:[
 {t:"p",x:"Solve $y′ + 2y = 6$ with $y(0) = 1$. The integrating factor is $μ = exp(2t)$ because an antiderivative of $2$ is $2t$."},
 {t:"p",x:"Multiply by $μ$ to get $(μy)′ = 6μ$. Integration gives $μy = 3μ + C$, where $C$ is a constant."},
 {t:"p",x:"At $t = 0$, $μ = 1$ and $y = 1$, so $C = −2$. Divide by $μ$ to get $y = 3 − 2 exp(−2t)$."},
 {t:"step",f:"y at t = ln(2)/2",v:"3 − 2/2 = 2",u:"",fin:1}]});

/* ---------- diffeq-first-order-4 · Exact equations, substitutions, and uniqueness ---------- */
/* 0 · Compare recovery of signs, Guess (both). For t>0, y=√t and y=−√t both square to t. */
rc98("diffeq-first-order-4",0,{p:[
 {t:"p",x:"A **substitution** changes the variables or the way an equation is written. Here $t$ is the input and $y$ is the unknown. Can you recover $y$ from the new expression?"},
 {t:"p",x:"Both a positive and a negative value square to the same positive number. Squaring can lose information about the sign."},
 {t:"take",x:"Inspect what a transformation preserves before using it to solve the equation."}],
 g:{at:1,q:"If $y^2 = t$ for $t > 0$, which signs of $y$ are possible?",o:[
  ["Only positive",0,"The positive square root is one candidate. Its negative also squares to $t$."],
  ["Only negative",0,"The negative root is one candidate. The positive root also squares to $t$."],
  ["Positive or negative",1,"Squaring either sign of the square root gives the same $t$."]]}});

/* 1 · Rule in words → worked example, no interaction. d(x²+y²)=2x dx+2y dy; 3²+4²=9+16=25. */
rc98("diffeq-first-order-4",1,{p:[
 {t:"p",x:"An **exact** equation has the form $dF = 0$. The differential $dF$ is the total change to first order in the **potential**, a single function $F$ of the variables."},
 {t:"p",x:"Along a solution the potential stays constant, $F = C$. In the dimensionless example $2x dx + 2y dy = 0$, the potential is $F = x^2 + y^2$. Differentiate with respect to each coordinate while holding the other fixed to get $2x$ and $2y$."},
 {t:"step",f:"C = 3^2 + 4^2",v:"25",u:"",fin:1},
 {t:"p",x:"The point $x = 3$, $y = 4$ fixes which constant-potential curve the solution follows."}]});

/* 2 · Legend → formulas, Fill "linear". Differentiating u=y^{1−n} gives u′=(1−n)y^{−n}y′; multiplying the original equation by (1−n)y^{−n} yields u′+(1−n)pu=(1−n)q. */
rc98("diffeq-first-order-4",2,{p:[
 {t:"eq",lab:"Bernoulli equation",eq:"y′ + py = q y^n",cap:"p and q depend only on the input; n is a constant other than 0 or 1"},
 {t:"p",x:"On an interval where the powers and their derivatives are defined and $y ≠ 0$, use the new unknown $u = y^{1−n}$."},
 {t:"p",x:"The transformed equation is [[linear]]. The chain rule gives $u′ = (1−n)y^{−n}y′$."},
 {t:"eq",eq:"u′ + (1−n)pu = (1−n)q",cap:"on the interval where the substitution is valid"}]});

/* 3 · Terms → takeaway, no interaction. For y′=2√|y|, y(0)=0, y≡0 and y=t² for t≥0 (zero for t≤0) both satisfy the equation; d(t²)/dt=2t=2√(t²) for t≥0. */
rc98("diffeq-first-order-4",3,{p:[
 {t:"p",x:"If a substitution divides by $y$ or uses a power undefined at zero, test $y = 0$ in the original equation."},
 {t:"p",x:"For $y′ = f(t,y)$, continuity of the right side $f$ near the starting point ensures local **existence**. A solution passes through that point on a short input interval."},
 {t:"p",x:"For local **uniqueness**, a standard sufficient extra condition is that $f$ is locally Lipschitz in $y$. Near the initial point, differences in $f$ at the same $t$ are bounded by a fixed multiple of differences in $y$."},
 {t:"take",x:"With these conditions there is exactly one solution near the starting point. Continuity alone can allow several."}]});

/* ---------- diffeq-second-order-1 · Characteristic roots and homogeneous solutions ---------- */
/* 0 · Terms, Fill "zero". With no input, the right-hand side is identically zero. */
rc98("diffeq-second-order-1",0,{p:[
 {t:"p",x:"A linear second-order equation adds terms in the unknown $y$, its first derivative $y′$ and its second derivative $y″$. Primes mean derivatives with respect to time $t$."},
 {t:"p",x:"The equation is **homogeneous** when the forcing, the input on the right, is [[zero]]."},
 {t:"p",x:"For constant coefficients $a$, $b$ and $c$, with $a ≠ 0$, it has this form:"},
 {t:"eq",eq:"ay″ + by′ + cy = 0",cap:"fixed coefficients, no external input"}]});

/* 1 · Legend → formula → worked factorization, no interaction. (r−1)(r−2) = r²−(1+2)r+1·2; roots 1 and 2. */
rc98("diffeq-second-order-1",1,{p:[
 {t:"p",x:"Try $y = exp(rt)$, where $r$ is the trial rate. Differentiating once multiplies by $r$. Differentiating twice multiplies by $r^2$."},
 {t:"eq",lab:"Characteristic polynomial",eq:"ar^2 + br + c = 0",cap:"after dividing out the nonzero exponential"},
 {t:"p",x:"A **characteristic root** is a rate $r$ that makes this polynomial zero. For $y″ − 3y′ + 2y = 0$, factor it like this:"},
 {t:"eq",eq:"(r − 1)(r − 2) = 0",cap:"roots are 1 and 2 in this dimensionless example"}]});

/* 2 · Compare cases, Guess (time factor). For repeated r, the operator (d/dt−r)² takes t exp(rt) to exp(rt) then to 0. */
rc98("diffeq-second-order-1",2,{p:[
 {t:"p",x:"Two distinct real roots give two **independent** exponentials. Neither is a constant multiple of the other."},
 {t:"p",x:"A **repeated** root occurs more than once. With a repeated real root $r$, the independent pair is $exp(rt)$ and $t exp(rt)$."},
 {t:"p",x:"Complex roots come in a conjugate pair: same real part $α$, opposite imaginary parts $±β$. Use a common envelope $exp(αt)$."},
 {t:"p",x:"Multiply that envelope by $cos(βt)$ and $sin(βt)$ to get the two real solutions."}],
 g:{at:1,q:"A real root $r$ repeats. Which function gives a second direction alongside $exp(rt)$?",o:[
  ["$2 exp(rt)$",0,"A fixed multiplier just rescales the same function."],
  ["$t exp(rt)$",1,"The ratio to the first exponential is t, so it varies with time."]]}});

/* 3 · Process chain, Guess (one remaining weight). C₁ exp(rt) + C₂ exp(rt) = (C₁ + C₂) exp(rt). */
rc98("diffeq-second-order-1",3,{p:[
 {t:"p",x:"Suppose you give two copies of the same exponential separate constant weights."},
 {t:"p",x:"Those weights appear only as their sum. There is just one freely adjustable coefficient."},
 {t:"chain",items:["form polynomial","find roots","build the pair","fit initial data"],hl:2},
 {t:"take",x:"Use an independent pair so both starting values, $y(0)$ and $y′(0)$, can be fitted."}],
 g:{at:1,q:"How many independent weights do the two copies actually give you?",o:[
  ["One weight",1,"Only the sum of the weights changes the resulting exponential."],
  ["Two weights",0,"Changing one weight and undoing that change in the other leaves the result identical."]]}});

/* ---------- diffeq-second-order-2 · Particular solutions and superposition ---------- */
/* 0 · Terms, no interaction. Linearity lets one forced solution be shifted by any solution with zero forcing. */
rc98("diffeq-second-order-2",0,{p:[
 {t:"p",x:"A **particular solution** is any one function that solves the equation with its given input, also called forcing."},
 {t:"p",x:"The **homogeneous family** is all the solutions obtained with the input set to zero."},
 {t:"take",x:"Keep the same forcing and vary the freely adjustable part to match the starting values."}]});

/* 1 · Rule → worked value, Fill "add". A constant makes y″=0; 4y=8 leaves y=8/4=2. */
rc98("diffeq-second-order-2",1,{p:[
 {t:"p",x:"For a linear equation, [[add]] one particular solution to the homogeneous family to obtain the full family. This is **superposition**."},
 {t:"eq",eq:"y = y_h + y_p",cap:"linear equation with fixed forcing",vars:[["y_h","any homogeneous solution"],["y_p","one particular solution"]]},
 {t:"p",x:"For the dimensionless equation $y″ + 4y = 8$, try a constant. Its second derivative $y″$ is zero."},
 {t:"step",f:"y_p = 8 / 4",v:"2",fin:1}]});

/* 2 · Rule → example, Guess (multiply by time). For characteristic polynomial P with simple root 1, P(D)exp(t)=0 and P(D)[t exp(t)]=P′(1)exp(t)≠0. */
rc98("diffeq-second-order-2",2,{p:[
 {t:"p",x:"**Undetermined coefficients** tries a form like the forcing, then solves for its unknown weights. Use it with constant coefficients and inputs such as polynomials, exponentials or sinusoids."},
 {t:"p",x:"If the trial overlaps a homogeneous mode, multiply the trial by a power of time. The power equals the multiplicity of the overlapping root."},
 {t:"take",x:"For a simple root (one copy), one factor of $t$ moves the trial outside the homogeneous family."}],
 g:{at:1,q:"The forcing is $exp(t)$ and its rate is a simple root. Which trial can work? $A$ is a weight to fit.",o:[
  ["$A exp(t)$",0,"The differential equation sends that homogeneous mode to zero for any A."],
  ["$A t exp(t)$",1,"The extra factor of t makes differentiation produce a term proportional to the input."]]}});

/* 3 · Rule → difference, Fill "subtract". Applying the same linear equation to the difference gives forcing minus itself, hence zero. */
rc98("diffeq-second-order-2",3,{p:[
 {t:"p",x:"Take two particular solutions of the same linear equation with the same input. To find how they differ, [[subtract]] one from the other."},
 {t:"p",x:"The two copies of the input cancel. Their difference satisfies the zero-input equation."},
 {t:"take",x:"Each choice of particular solution gives the same full family once all homogeneous solutions are included."}]});

/* ---------- diffeq-second-order-3 · Damping, resonance, and transient response ---------- */
/* 0 · Terms → analysis chain, no interaction. The initial conditions apply to the sum of the free and forced contributions. */
rc98("diffeq-second-order-3",0,{p:[
 {t:"p",x:"A **transient** is the part of the motion that adjusts to the initial conditions. The **steady forced response** is the part sustained by a continuing input."},
 {t:"p",x:"For a linear model, find the free motion with zero input and one particular response to the input."},
 {t:"chain",items:["free motion","forced solution","fit their sum","separate the parts"],hl:2},
 {t:"p",x:"Match the initial position and velocity to the sum, then separate the decaying and persistent parts if the system is stable."}]});

/* 1 · Rule → energy change, Fill "decays". Positive viscous damping c removes mechanical energy at rate c(y′)². */
rc98("diffeq-second-order-3",1,{p:[
 {t:"p",x:"**Damping** takes mechanical energy out of the oscillation. A viscous damper pushes against the velocity."},
 {t:"p",x:"With stable damped motion, the transient [[decays]] after startup."},
 {t:"take",x:"The free part tends to zero. If a sinusoidal input keeps driving the system, its steady oscillation remains."}]});

/* 2 · Legend → formula → worked value, no interaction. ω₀ > 0, ω₀²=4, so ω₀=√4=2. At undamped resonance the response contains t sin(ω₀t). */
rc98("diffeq-second-order-3",2,{p:[
 {t:"p",x:"The **angular natural frequency** $ω_0$ is the oscillation rate with no damping and no forcing. Time is $t$ and $y″$ is the second time derivative of $y$."},
 {t:"eq",eq:"y″ + ω_0^2 y = 0",cap:"undamped free motion"},
 [{t:"p",x:"If the coefficient of $y$ is $4$ in a dimensionless equation, match it to $ω_0^2$."},
  {t:"step",f:"ω_0 = √{4}",v:"2",fin:1}],
 {t:"p",x:"Drive an undamped system at its natural frequency and the amplitude can grow with time. A growing factor multiplying an oscillation is a **secular term**."}]});

/* 3 · Energy comparison, Guess (bounded amplitude). At fixed nonzero drive ω and positive damping c, the response denominator has nonzero cω. */
rc98("diffeq-second-order-3",3,{p:[
 {t:"p",x:"Resonant forcing can add energy cycle after cycle when its push is in step with the velocity."},
 {t:"p",x:"With positive damping, amplitude approaches a finite steady value under constant-amplitude sinusoidal forcing. The damper dissipates the energy added over each steady cycle."},
 {t:"take",x:"A damped linear oscillator can still have a resonance peak. Its steady amplitude stays finite."}],
 g:{at:1,q:"Add positive damping to a linear oscillator driven at its undamped natural frequency. What happens to the amplitude over time?",o:[
  ["It grows without bound.",0,"That needs the undamped case. Energy loss grows as the motion grows."],
  ["It settles to a finite value.",1,"Dissipation balances the input energy over each steady cycle."]]}});

/* ---------- diffeq-second-order-4 · Variation of parameters and independence ---------- */
/* 0 · Terms → preparation, no interaction. Two independent zero-input solutions span the homogeneous family for a regular second-order equation. */
rc98("diffeq-second-order-4",0,{p:[
 {t:"p",x:"Two **fundamental solutions** $y_1$ and $y_2$ solve the zero-input equation. They are independent, so constant weights can combine them to make any homogeneous solution."},
 {t:"p",x:"First **normalize** the forced equation: divide by the coefficient of the highest derivative so that coefficient becomes one."},
 {t:"take",x:"Work on a **regular interval**, where that division is valid and the resulting coefficients and input are continuous."}]});

/* 1 · Rule → formula, Fill "vary with time". Set u₁′y₁+u₂′y₂=0 so yₚ′=u₁y₁′+u₂y₂′; substituting leaves u₁′y₁′+u₂′y₂′=f. */
rc98("diffeq-second-order-4",1,{p:[
 {t:"p",x:"**Variation of parameters** lets the weights $u_1$ and $u_2$ in a homogeneous combination [[vary with time]]."},
 {t:"eq",eq:"y_p = u_1 y_1 + u_2 y_2",cap:"normalized linear equation with forcing",vars:[["y_p","particular solution"]]},
 {t:"p",x:"Primes are time derivatives. Solve for the weight derivatives using input $f(t)$, then integrate the weights."},
 {t:"eq",eq:"u_1′y_1 + u_2′y_2 = 0"},
 {t:"eq",eq:"u_1′y_1′ + u_2′y_2′ = f(t)"}]});

/* 2 · Legend → formula → worked value, no interaction. At t=0, exp(t)=exp(2t)=1; derivatives 1 and 2 give W=1·2−1·1=1. */
rc98("diffeq-second-order-4",2,{p:[
 {t:"p",x:"The **Wronskian** $W$ is a determinant that compares the function values and slopes of the pair. A prime is a time derivative."},
 {t:"eq",eq:"W = y_1 y_2′ − y_1′ y_2",cap:"two solutions of the same regular homogeneous equation"},
 {t:"p",x:"To test the pair, try $y_1 = exp(t)$ and $y_2 = exp(2t)$ at $t = 0$."},
 {t:"step",f:"W(0) = 1 × 2 − 1 × 1",v:"1",fin:1}]});

/* 3 · Terms → implication, Guess (any regular point). For continuous p, Abel's identity W(t)=W(t₀)exp(−∫p) preserves a nonzero W. */
rc98("diffeq-second-order-4",3,{p:[
 {t:"p",x:"A regular interval may contain points where an individual solution crosses zero. The method needs the pair to supply two independent directions for matching the forcing."},
 {t:"p",x:"You can start at any point in that interval if the pair has a nonzero Wronskian at one point. The determinant stays nonzero throughout."},
 {t:"take",x:"This guarantee uses two solutions of the same regular linear homogeneous equation. A zero determinant at a point can occur for arbitrary independent functions."}],
 g:{at:1,q:"Your fundamental pair has a nonzero Wronskian at one point. Where can you start matching the forcing?",o:[
  ["Only at the checked point.",0,"For this equation the determinant stays nonzero as you move along the interval."],
  ["Anywhere in that regular interval.",1,"Regular linear evolution preserves the pair's independence throughout that interval."]]}});

/* ---------- diffeq-laplace-1 · Laplace transforms and initial values ---------- */
/* 0 · Process chain, Fill "algebraically". */
rc98("diffeq-laplace-1",0,{p:[
 {t:"p",x:"An initial-value problem gives a differential equation and starting values. The **Laplace transform** replaces each time function with an integral representation."},
 {t:"p",x:"For a linear equation with constant coefficients, solve [[algebraically]] for the transform."},
 {t:"chain",items:["transform with starting values","solve for the transform","invert to recover time"],hl:1},
 {t:"p",x:"To **invert** is to recover the original function of time from its transform."}]});

/* 1 · Legend → formula. The constant 1 gives [−exp(−st)/s]₀^∞ = 1/s for real s > 0; s = 2 gives 0.500. */
rc98("diffeq-laplace-1",1,{p:[
 {t:"p",x:"**Unilateral** means the integral uses only nonnegative time. For real positive $s$, the exponential weight decays."},
 {t:"vars",vars:[["t","time"],["y(t)","function being transformed"],["s","transform variable, replacing time"],["Y(s)","resulting transform"]]},
 {t:"eq",lab:"Laplace transform",eq:"Y(s) = ∫_0^{∞} y(t)e^{−st} dt",cap:"where the integral converges"},
 {t:"p",x:"For $y(t) = 1$ and real $s > 0$, the integral gives $Y(s) = 1/s$. In dimensionless time, $s = 2$ gives $0.500$."}]});

/* 2 · Legend → formula, Guess (subtract the start value). Integration by parts gives [ye^(−st)]₀^∞ + sY; the lower endpoint contributes −y(0). */
rc98("diffeq-laplace-1",2,{p:[
 {t:"p",x:"To transform the first derivative $y′(t)$, take $Y(s)$ times $s$ and include a term from the starting value $y(0)$. The symbol $ℒ$ means take the transform."},
 {t:"eq",lab:"Derivative rule",eq:"ℒ{y′} = sY(s) − y(0)",cap:"both transforms converge and the upper endpoint term vanishes"},
 {t:"p",x:"The starting value appears with a minus sign."}],
 g:{at:1,q:"The upper endpoint contributes zero. How does the starting value enter the derivative transform?",o:[
  ["It is added.",0,"The endpoint at the start is the lower endpoint, so it is subtracted."],
  ["It is subtracted.",1,"An endpoint difference is upper minus lower. At the start the exponential weight is one."]]}});

/* 3 · Process chain, no interaction. d(e^(−st))/dt = −se^(−st); by parts gives +sY and the lower value −y(0)·1. */
rc98("diffeq-laplace-1",3,{p:[
 {t:"p",x:"Integration by parts moves the derivative from $y(t)$ to the exponential weight $e^{−st}$, also called the **kernel**."},
 {t:"p",x:"The derivative of the weight brings down $−s$. The minus sign in integration by parts changes this to the $+sY(s)$ term."},
 {t:"take",x:"The **initial boundary term** comes from subtracting the lower endpoint. The weight there is one, so the term is $−y(0)$."}]});

/* ---------- diffeq-laplace-2 · Steps, shifts, and piecewise forcing ---------- */
/* 0 · Plain text, Fill "piece by piece". */
rc98("diffeq-laplace-2",0,{p:[
 {t:"p",x:"A forcing is an input to a differential equation. If the input changes rule when a switch flips, describe it [[piece by piece]]."},
 {t:"p",x:"**Piecewise forcing** uses a different formula on each time interval. Before a delayed input starts, its contribution is zero."},
 {t:"take",x:"When the delayed input starts, read its waveform by elapsed time since activation."}]});

/* 1 · Legend → compare pair, no interaction. For t<a, t−a<0 and the step is 0; for t>a it is 1. */
rc98("diffeq-laplace-2",1,{p:[
 {t:"p",x:"The **unit step** $u$ is zero before its argument reaches zero and one after. Use $u(t−a)$ to place the switch at delay $a$ on the time axis $t$."},
 [{t:"pc",l:"Before activation",c:"time is below the delay",v:"u(t−a) = 0"},
  {t:"pc",l:"After activation",c:"time is above the delay",v:"u(t−a) = 1"}],
 {t:"p",x:"For an original waveform $f$, multiply $f(t−a)$ by the step to turn it off before activation."}]});

/* 2 · Legend → formula, Fill "multiplies". Substituting elapsed time τ = t−a factors e^(−as) out of e^(−st). */
rc98("diffeq-laplace-2",2,{p:[
 {t:"p",x:"At transform variable $s$, let $F(s)$ represent the original $f(t)$ and $G(s)$ the waveform after delay $a$."},
 {t:"p",x:"In transform space, a delay [[multiplies]] the original transform by an exponential factor."},
 {t:"eq",lab:"Time-delay rule",eq:"G(s) = e^{−as} F(s)",cap:"for a nonnegative delay $a$ and a convergent transform"},
 {t:"p",x:"The step starts the input at $t = a$. The argument $t−a$ starts the waveform's clock there."}]});

/* 3 · Worked example, Guess (false shift jumps). At t=2⁺, t²→4 and (t−2)²→0; at t=5, (5−2)²=9. */
rc98("diffeq-laplace-2",3,{p:[
 {t:"p",x:"Consider a dimensionless quadratic input $g(t)$ meant to start from zero when $t = 2$. Someone writes $u(t−2)t^2$."},
 {t:"p",x:"The unshifted square makes the input jump to $4$ as the step switches on. Shift the clock inside the square too."},
 {t:"eq",lab:"Delayed quadratic",eq:"g(t) = u(t−2)(t−2)^2",cap:"zero before the switch, elapsed time inside the square"},
 {t:"step",f:"g(5) = (5−2)^2",v:"9",fin:1}],
 g:{at:1,q:"Just after the switch, what value does the expression with the unshifted square approach?",o:[
  ["0",0,"The value would approach zero if the square used elapsed time. Here the square still uses clock time."],
  ["4",1,"The step is one just after it activates, and clock time tends to two."]]}});

/* ---------- diffeq-laplace-3 · Impulses and convolution ---------- */
/* 0 · Terms, Fill "added together". */
rc98("diffeq-laplace-3",0,{p:[
 {t:"p",x:"The **initial state** is the set of starting values needed to predict the system's motion. A **zero-state response** starts with all of them at zero."},
 {t:"p",x:"An **impulse response** is the zero-state response to a unit impulse, an input concentrated at an instant with area one."},
 {t:"take",x:"For a linear system, responses to separate input contributions can be [[added together]]."},
 {t:"p",x:"Add two inputs and you get the sum of their individual responses."}]});

/* 1 · Rule in words → formula, Guess (peak doubles). Unit area = height × width; 1/(w/2) = 2/w. */
rc98("diffeq-laplace-3",1,{p:[
 {t:"p",x:"Approximate the impulse by a short rectangular pulse. Keep its area at one while making its width $w$ smaller."},
 {t:"eq",lab:"Pulse height",eq:"height = 1/w",cap:"rectangular pulse with unit area"},
 {t:"p",x:"Halving the width doubles the height. In the zero-width limit the ideal impulse is a **distribution**, an object defined through integrals rather than a finite height at one point."}],
 g:{at:1,q:"Keeping area fixed, what happens to the pulse height if you halve its width?",o:[
  ["It halves.",0,"Height and width multiply to give area. Halving both would shrink the area."],
  ["It doubles.",1,"Height must double to offset the width being cut in half."]]}});

/* 2 · Legend → formula, no interaction. */
rc98("diffeq-laplace-3",2,{p:[
 {t:"p",x:"**Causal** means no response before the input. **Time-invariant** means delaying an input delays its response by the same amount."},
 {t:"vars",vars:[["τ","input time"],["x(τ)","input at that time"],["h(t−τ)","impulse response after elapsed time $t−τ$"],["y(t)","output at time $t$"]]},
 {t:"eq",lab:"Convolution",eq:"y(t) = ∫_0^t x(τ)h(t−τ) dτ",cap:"causal, linear, time-invariant system starting at rest"},
 {t:"p",x:"**Convolution** adds up responses weighted by past inputs."}]});

/* 3 · Worked example, no interaction. For h(t)=exp(−t), ∫₀ᵗexp(−(t−τ))dτ=1−exp(−t); exp(−ln 2)=1/2, so y=0.500. */
rc98("diffeq-laplace-3",3,{p:[
 {t:"p",x:"Time invariance lets you shift the same response to every input time. Linearity lets you scale and add all those responses. That sum is called **superposition**."},
 {t:"giv",lab:"Dimensionless example from rest",rows:[["x(t)","1","after the step"],["h(t)","e^{−t}","impulse response"]]},
 {t:"p",x:"With a unit step, every past contribution has weight one. Integrating the shifted exponential gives $y(t) = 1−e^{−t}$."},
 {t:"step",f:"y(ln 2) = 1 − 1/2",v:"0.500",fin:1}]});

/* ---------- diffeq-laplace-4 · Transfer functions, poles, and cancellation ---------- */
/* 0 · Plain text, Fill "algebraically". */
rc98("diffeq-laplace-4",0,{p:[
 {t:"p",x:"A model maps an input to an output. The **transform domain** describes both using their Laplace transforms."},
 {t:"p",x:"For a linear, time-invariant model starting at rest, the input and output transforms are connected [[algebraically]]."},
 {t:"take",x:"Multiply the input transform by a function of the transform variable to get the output transform."}]});

/* 1 · Legend → formula + worked step. For H=2/(s+4), substitution at s=0 gives 2/4=0.500. */
rc98("diffeq-laplace-4",1,{p:[
 {t:"vars",vars:[["s","transform variable"],["Y(s)","output transform"],["U(s)","input transform"],["H(s)","transfer function for this input and output"]]},
 {t:"eq",lab:"Transfer function",eq:"H(s) = Y(s) / U(s)",cap:"linear and time-invariant, zero initial state, $U(s) ≠ 0$ for the ratio"},
 {t:"p",x:"The **zero-frequency gain** is $H(0)$ when it is finite. Take the dimensionless example $H(s) = 2/(s+4)$."},
 {t:"step",f:"H(0) = 2/4",v:"0.500",fin:1}]});

/* 2 · Terms + Guess (only the uncanceled root remains). After reduction (s−1)/[(s−1)(s+2)] = 1/(s+2), so s=−2 is the lone pole. */
rc98("diffeq-laplace-4",2,{p:[
 {t:"p",x:"A **pole** is a point where a transfer function grows without bound nearby. To locate poles of a ratio of polynomials, check its denominator roots."},
 {t:"p",x:"In a dimensionless example, the numerator is $s−1$ and the denominator is $(s−1)(s+2)$. They share a factor."},
 {t:"p",x:"Cancel the shared factor first. Only the remaining denominator root is a pole of this input-output transfer."},
 {t:"eq",lab:"Reduced transfer function",eq:"H(s) = 1/(s+2)",cap:"the remaining pole is at $s = −2$"}],
 g:{at:2,q:"Which denominator root survives as a pole of this transfer?",o:[
  ["$s = 1$",0,"The numerator shares the factor that vanishes here, so it cancels."],
  ["$s = −2$",1,"The factor that vanishes here has no matching numerator factor."]]}});

/* 3 · Terms → takeaway, no interaction. */
rc98("diffeq-laplace-4",3,{p:[
 {t:"p",x:"An **internal mode** is a natural pattern of growth, decay or oscillation in the system's state."},
 {t:"p",x:"A mode is **uncontrollable** from an input if that input cannot excite it. It is **unobservable** from an output if its motion never shows in that output."},
 {t:"p",x:"Either condition can hide a mode from the transfer. A hidden mode can still grow from an initial disturbance in the state."},
 {t:"take",x:"Check the state dynamics for internal stability: do all natural responses to small initial disturbances stay small?"}]});

/* ---------- diffeq-systems-1 · First-order state systems ---------- */
/* 0 · Process chain, no interaction. */
rc98("diffeq-systems-1",0,{p:[
 {t:"p",x:"The **order** of a differential equation is the highest derivative it contains. A first-order equation uses only first derivatives and undifferentiated quantities."},
 {t:"chain",items:["solve for highest derivative","name the lower derivatives","write their rates"],hl:2},
 {t:"p",x:"Each rate now has a first-order equation. The equations are **coupled** when one rate depends on another state component, a coordinate of the state."}]});

/* 1 · Terms → rule in words, Fill "predict". */
rc98("diffeq-systems-1",1,{p:[
 {t:"p",x:"A **state** is the set of quantities you need to [[predict]] what happens next, given the model and the input."},
 {t:"p",x:"Take the original function and its successive derivatives up to, but excluding, the highest one. Each becomes a **state component**, one coordinate of the state."},
 {t:"take",x:"A **state equation** gives a component's rate of change from the current state, time and any input."}]});

/* 2 · Terms + Guess (one measured output can come from a larger state). A scalar second-order model needs y and y′ as independent initial data. */
rc98("diffeq-systems-1",2,{p:[
 {t:"p",x:"**State dimension** counts independent state coordinates. A **measured output** is a quantity you observe, such as the position of a cart."},
 {t:"take",x:"Measuring only position can leave velocity unobserved. A second-order model uses both position and velocity, giving two first-order equations."}],
 g:{at:1,q:"A moving cart has one position sensor. Can its state have more coordinates than its measured output?",o:[
  ["Yes, the state can be larger.",1,"The sensor reports position. Velocity can still be needed to predict motion."],
  ["No, the dimensions must match.",0,"The number of sensor readings doesn't determine how many quantities the model needs."]]}});

/* 3 · Worked example, no interaction. Dimensionless: y″=−3y′−2y; at (y,y′)=(1,2), y″=−3·2−2·1=−8 and y′=2. */
rc98("diffeq-systems-1",3,{p:[
 {t:"p",x:"Let $y$ be a dimensionless position, $x_1=y$ and $x_2=y′$. A prime means a derivative with respect to time."},
 {t:"eq",lab:"Original law",eq:"y″ + 3y′ + 2y = 0",cap:"dimensionless model, no input"},
 {t:"eq",lab:"State equations",eq:"x_1′ = x_2",cap:"the second rate is $x_2′ = −3x_2 − 2x_1$"},
 {t:"giv",lab:"Current state",rows:[["x_1","1","position"],["x_2","2","velocity"]]},
 {t:"step",f:"x_2′ = −3(2) − 2(1)",v:"−8",u:"",fin:1}]});

/* ---------- diffeq-systems-2 · Eigenmodes and linear stability ---------- */
/* 0 · Terms, no interaction. */
rc98("diffeq-systems-2",0,{p:[
 {t:"p",x:"A **mode** is a natural pattern of motion. In a linear system without input, adding solutions gives another solution."},
 {t:"eq",lab:"Free linear system",eq:"x′ = Ax",cap:"constant coefficients, no input",vars:[["x","state vector, the list of state coordinates"],["x′","rates of those coordinates"],["A","matrix of rate coefficients"]]},
 {t:"take",x:"If you can build any initial state by adding scaled modes, evolve those modes separately and add their results."}]});

/* 1 · Legend → formula, Fill "exponentially". Substitution gives x′=λ exp(λt)v=exp(λt)Av. */
rc98("diffeq-systems-2",1,{p:[
 {t:"p",x:"An **eigenvector** $v$ is a nonzero vector that $A$ scales by a single number, its **eigenvalue** $λ$."},
 {t:"eq",lab:"Eigenvector relation",eq:"Av = λv",cap:"for an eigenvector of the constant state matrix"},
 {t:"p",x:"An **eigenmode** starting at $v$ evolves by scaling that vector [[exponentially]]."},
 {t:"eq",lab:"Mode in time",eq:"x(t) = exp(λt)v",cap:"time $t$ measured from the start, with no input"}]});

/* 2 · Definition + Guess (all negative real parts imply decay). Polynomial factors from repeated modes still tend to zero times a decaying exponential. */
rc98("diffeq-systems-2",2,{p:[
 {t:"p",x:"The **real part** of a complex number is its component without the imaginary unit $i$, where $i^2=−1$. For a real number, it is the whole number."},
 {t:"p",x:"An equilibrium is a state that stays fixed. It is **asymptotically stable** if nearby starts stay close and converge to it."},
 {t:"take",x:"When every eigenvalue has a negative real part, the zero state is asymptotically stable. Any positive real part gives instability."},
 {t:"p",x:"If no real parts are positive but one is zero, not every nearby start decays to zero. Check whether motion persists or grows."}],
 g:{at:2,q:"A constant-matrix system has no input. Every eigenvalue has negative real part. What happens near zero?",o:[
  ["The state converges to zero.",1,"Every mode decays. Oscillations or polynomial factors from repeated roots do not prevent eventual decay."],
  ["The state keeps moving away.",0,"This confuses negative real parts with positive ones. Negative real parts make the exponential envelope shrink."]]}});

/* 3 · Compare pair → formula + Guess. Time constants 1/2=0.500 and 1/5=0.200, where the exponential reaches exp(−1) of its start. */
rc98("diffeq-systems-2",3,{p:[
 {t:"p",x:"The real part of a mode's eigenvalue sets its exponential growth or decay. The imaginary part gives the rate of oscillation, if present."},
 {t:"p",x:"A decaying mode's **time constant** $τ$ is how long its exponential envelope takes to fall to $exp(−1)$ of its starting amplitude."},
 [{t:"pc",l:"Slower decay",c:"real eigenvalue −2",v:"τ = 0.500"},
  {t:"pc",l:"Faster decay",c:"real eigenvalue −5",v:"τ = 0.200"}],
 {t:"eq",lab:"Time constant",eq:"τ = −1 / λ",cap:"real eigenvalue $λ<0$; time and rate dimensionless here"}],
 g:{at:2,q:"For two modes with real eigenvalues −2 and −5, which takes longer to reach the same fraction of its starting amplitude?",o:[
  ["The −2 mode",1,"The decay rate has smaller magnitude, so the time constant is larger."],
  ["The −5 mode",0,"The more negative rate makes the exponential fall faster."]]}});

/* ---------- diffeq-systems-3 · Nonlinear equilibria and linearization ---------- */
/* 0 · Plain text, Fill "nearby". */
rc98("diffeq-systems-3",0,{p:[
 {t:"p",x:"A **nonlinear** state equation can have rates that curve with the state, so one constant matrix cannot describe the whole system."},
 {t:"p",x:"An **equilibrium** is a state where every rate is zero. A linear model there describes the motion of [[nearby]] states."},
 {t:"take",x:"This approximation uses the slopes at that equilibrium. Farther away, the slopes can change enough to give different motion."}]});

/* 1 · Worked example, no interaction. y−y²=y(1−y), so y=1 is fixed. The derivative with respect to y is 1−2y, giving −1 at y=1. */
rc98("diffeq-systems-3",1,{p:[
 {t:"p",x:"The **vector field** gives the rate at each state. Its **Jacobian** is the matrix of slopes of each rate with respect to each state coordinate."},
 {t:"p",x:"Evaluating those slopes at an equilibrium gives the **linearization**, a first-order model for a small displacement from that equilibrium."},
 {t:"eq",lab:"Example rate",eq:"F(y) = y − y^2",cap:"one dimensionless state $y$ with rate $y′=F(y)$; $F(1)=0$"},
 {t:"step",f:"F′(1) = 1 − 2(1)",v:"−1",u:"",fin:1},
 {t:"p",x:"Here $F′$ is the slope with respect to $y$. The negative slope makes a small displacement decay."}]});

/* 2 · Stability rule + Guess (one growing direction suffices). */
rc98("diffeq-systems-3",2,{p:[
 {t:"p",x:"For smooth rates, examine the eigenvalues of the Jacobian at the equilibrium. The equilibrium is **hyperbolic** if none has zero real part."},
 {t:"take",x:"One positive real part makes the equilibrium unstable. Decay in other directions cannot remove the growing direction."},
 {t:"p",x:"If all real parts are negative, small displacements decay back to the equilibrium: it is locally asymptotically stable."}],
 g:{at:1,q:"Near an equilibrium, one linear mode grows exponentially and the others decay. Is the nonlinear equilibrium stable?",o:[
  ["It is stable.",0,"Decay in most directions is insufficient. A growing direction lets some nearby states leave."],
  ["It is unstable.",1,"The growing mode dominates small displacements along that direction."]]}});

/* 3 · Rule in words → compare pair, Fill "inconclusive". At y=0, ±y³=0 and d(±y³)/dy=±3y²=0; −y³ points toward zero on both sides and +y³ away. */
rc98("diffeq-systems-3",3,{p:[
 {t:"p",x:"A **neutral direction** has zero eigenvalue real part, so its linear mode gives no exponential growth or decay."},
 {t:"p",x:"With a neutral direction and no positive real parts, the linearized stability test is [[inconclusive]]."},
 {t:"p",x:"Both rates below have zero slope at the equilibrium $y=0$, but the higher powers of $y$ drive opposite motion."},
 [{t:"pc",l:"Points toward zero",c:"small positive or negative displacement",v:"y′ = −y^3"},
  {t:"pc",l:"Points away from zero",c:"small positive or negative displacement",v:"y′ = y^3",warn:1}]]});

/* ---------- diffeq-systems-4 · Matrix exponentials and forced systems ---------- */
/* 0 · Legend → formula, no interaction. At t=0, exp(A·0)=I, so x(0)=x₀. */
rc98("diffeq-systems-4",0,{p:[
 {t:"p",x:"The **matrix exponential** maps the whole initial state through time when the state matrix is constant and there is no input."},
 {t:"vars",lab:"First, the symbols",vars:[["x_0","initial state"],["x(t)","state at time $t$"],["A","constant square matrix of rate coefficients"]]},
 {t:"eq",lab:"State transition",eq:"x(t) = exp(At)x_0",cap:"starts at time zero, with $x′=Ax$"},
 {t:"take",x:"The **state transition** is the map $exp(At)$ that propagates the initial state."}]});

/* 1 · Rule in words → formula + Guess. In exp(B)=Σ Bⁿ/n!, the zeroth term is I, the first B, the second B²/2, with B=At. */
rc98("diffeq-systems-4",1,{p:[
 {t:"p",x:"The scalar exponential has a **power series**, an infinite sum built from successive powers. A square matrix $B$ can take the scalar's place, even with nonzero entries off its main diagonal."},
 {t:"take",x:"Build powers by **matrix multiplication**. Exponentiating entries separately skips the coupling between coordinates."},
 {t:"eq",lab:"First terms",eq:"exp(B)=I+B+B^2/2+⋯",cap:"$B=At$; $I$ is the identity matrix, which leaves a vector unchanged"},
 {t:"p",x:"Each positive power is divided by the factorial of its exponent: multiply the positive integers up to that exponent."}],
 g:{at:1,q:"How should you build the matrix powers in that series?",o:[
  ["Power each entry separately.",0,"That loses the products between entries that describe how coordinates are coupled."],
  ["Multiply the matrix by itself.",1,"Each higher power is the previous matrix power times the original matrix."]]}});

/* 2 · Rule in words → formula, Fill "adding". Each u(s) propagates for time t−s; integration sums the contributions from 0 to t. */
rc98("diffeq-systems-4",2,{p:[
 {t:"p",x:"A **forced** system has rate $Ax+u(t)$, with constant $A$. Input $u(s)$ at time $s$ propagates for $t−s$."},
 {t:"p",x:"Find the state by [[adding]] the input response to the propagated initial state."},
 {t:"eq",eq:"g(s) = exp(A(t−s))u(s)"},
 {t:"p",x:"Integrate $g(s)$ from $0$ to $t$ to get the input response $r(t)$."},
 {t:"eq",eq:"x(t) = exp(At)x_0 + r(t)",cap:"$x_0$ is the state at time zero"}]});

/* 3 · Rule in words → worked value, no interaction. d(I+At+A²t²/2+⋯)/dt=A+A²t+⋯=A exp(At). exp(−ln 2)=1/2=0.500. */
rc98("diffeq-systems-4",3,{p:[
 {t:"p",x:"Differentiate $exp(At)$ term by term. Each time power drops by one, leaving a factor of $A$ times the original series."},
 {t:"eq",lab:"Transition rate",eq:"d exp(At)/dt = A exp(At)",cap:"constant state matrix $A$"},
 {t:"p",x:"For a **diagonal matrix**, all entries off the main diagonal are zero. Exponentiate the diagonal entries individually and keep the other entries zero."},
 {t:"p",x:"For dimensionless diagonal rates $−1$ and $−2$ at $t=ln(2)$, the first entry is:"},
 {t:"step",f:"exp(−ln(2))",v:"0.500",u:"",fin:1}]});

/* ---------- diffeq-numerical-series-1 · Euler and Runge–Kutta stepping ---------- */
/* 0 · Plain text → takeaway, Fill "estimate". */
rc98("diffeq-numerical-series-1",0,{p:[
 {t:"p",x:"A differential equation can give you a rate of change even when you don't have a formula for the state."},
 {t:"p",x:"A numerical solver samples that rate to [[estimate]] the state at the next time."},
 {t:"take",x:"Use the new state to start the next step. The steps build an approximate solution."}]});

/* 1 · Formula → worked example, no interaction. For y′ = y, f = 1 at y = 1 and one step of size 0.1 gives 1 + 0.1 × 1 = 1.1. */
rc98("diffeq-numerical-series-1",1,{p:[
 {t:"p",x:"**Forward Euler** uses the rate $f(t,y)$ at the current time $t$ and state $y$. Let $h$ be the step size."},
 {t:"eq",lab:"One Euler step",eq:"y_{new} = y + h f(t,y)",cap:"use the rate at the start of the step"},
 {t:"p",x:"Try the dimensionless equation $y′ = y$, starting at $y = 1$ with $h = 0.1$."},
 {t:"step",f:"y_{new} = 1 + 0.1 × 1",v:"1.1",u:"",fin:1},
 {t:"p",x:"**Global error** is the gap from the exact solution after many steps. Euler is first order: for a smooth problem on a fixed interval, small enough steps give error that scales with $h$."}]});

/* 2 · Definition → comparison, Guess (RK4 error falls faster). The classical stages sample at t, t+h/2, t+h/2 and t+h. After halving h in the asymptotic regime, h/2 over h is 1/2 and (h/2)^4 over h^4 is 1/16. */
rc98("diffeq-numerical-series-1",2,{p:[
 {t:"p",x:"Multistage **Runge–Kutta** methods combine rate samples from several stages within a step. Classical **RK4** uses four stages."},
 {t:"p",x:"For a smooth problem on the same time interval, RK4's global error falls faster as the step shrinks."},
 {t:"p",x:"Euler's global error scales with $h$ and RK4's with $h^4$ when steps are sufficiently small and rounding is negligible."}],
 g:{at:1,q:"As you halve already small steps, which method's global error shrinks by a larger factor?",o:[
  ["Euler",0,"Euler samples the initial rate only. For small steps its global error scales with the first power of the step size."],
  ["RK4",1,"The fourth power of the step size shrinks faster than the first power."]]}});

/* 3 · Plain text, Guess (constant initial rate underestimates the change when the true rate increases). */
rc98("diffeq-numerical-series-1",3,{p:[
 {t:"p",x:"Suppose the true rate of a state keeps rising during a forward time step. Euler carries the starting rate across the entire step."},
 {t:"p",x:"The starting rate is below all later rates, so Euler predicts a smaller change than the true one."},
 {t:"take",x:"More samples can capture how the rate changes within a step. With Euler you can shorten the step so its single rate stays representative."}],
 g:{at:1,q:"How does this one Euler step compare with the true change?",o:[
  ["It underestimates the change",1,"The initial rate is below the average rate over the step."],
  ["It overestimates the change",0,"That would happen if the starting rate were above the average, as with a rate that keeps falling."]]}});

/* ---------- diffeq-numerical-series-2 · Adaptive steps and stiffness ---------- */
/* 0 · Plain text, Guess (fast modes can still constrain the explicit step). */
rc98("diffeq-numerical-series-2",0,{p:[
 {t:"p",x:"One solution can have both a slow trend and a **fast mode**, a component that decays much faster than the rest."},
 {t:"p",x:"Even after the fast mode nearly disappears, an **explicit method** can still need short steps to keep errors in that mode from growing. Explicit methods use rates from values already known."},
 {t:"take",x:"**Stability** here means a decaying component also decays in the numerical update."}],
 g:{at:1,q:"Only the slow trend is visible now. Can the fast component still place a limit on the step?",o:[
  ["Yes, it can still limit steps",1,"A small error can put some of that fast component back into the computed solution."],
  ["No, the limit disappears",0,"The fast rate remains in the differential equation even after its contribution to the true solution is tiny."]]}});

/* 1 · Terms → process, Fill "grows with". */
rc98("diffeq-numerical-series-2",1,{p:[
 {t:"p",x:"An **adaptive solver** estimates the error made in one proposed step. That estimate is the **local error**."},
 {t:"p",x:"The **absolute tolerance** sets an error scale near zero. The contribution from **relative tolerance** [[grows with]] the magnitude of the state."},
 {t:"p",x:"For a larger state, the same allowed fraction gives a larger allowed error."},
 {t:"take",x:"If the estimated error is too large for the combined allowance, the solver retries with a smaller step."}]});

/* 2 · Compare pair → takeaway, Fill "larger". */
rc98("diffeq-numerical-series-2",2,{p:[
 {t:"p",x:"An equation is **stiff** when fast decay forces an explicit method to use much smaller steps for stability than the slow trend needs for accuracy."},
 {t:"p",x:"Many implicit methods allow [[larger]] stable steps on stiff problems."},
 [{t:"pc",l:"Explicit update",c:"evaluate rates using values already known",v:"direct"},
  {t:"pc",l:"Implicit update",c:"solve for a new state that also enters the rate",v:"coupled"}],
 {t:"take",x:"A suitable implicit update can damp the fast mode even at a step size that makes an explicit update unstable. Check the accuracy separately."}]});

/* 3 · Worked example, no interaction. Euler gives y_new = (1 − 10h)y, so h = 0.150 gives 1 − 1.50 = −0.500 and |−0.500| < 1. */
rc98("diffeq-numerical-series-2",3,{p:[
 {t:"p",x:"For the dimensionless decay law $y′ = −10y$, each Euler step multiplies the current state $y$ by a fixed factor."},
 {t:"eq",lab:"Euler multiplier",eq:"m = 1 − 10h",cap:"forward Euler for this decay law",vars:[["m","factor per step"],["h","step size"]]},
 {t:"step",f:"m = 1 − 10(0.150)",v:"−0.500",u:"",fin:1},
 {t:"p",x:"This step flips the sign and halves the magnitude. If $|m| > 1$, the step would instead amplify a mode the equation damps."},
 {t:"take",x:"A stable step can still distort the solution. Here the exact decay stays the same sign."}]});

/* ---------- diffeq-numerical-series-3 · Power-series solutions and Frobenius ---------- */
/* 0 · Plain text → takeaway, Fill "near". */
rc98("diffeq-numerical-series-3",0,{p:[
 {t:"p",x:"Some differential equations have no solution formula in elementary functions such as polynomials, exponentials or sines."},
 {t:"p",x:"A **power series** adds terms that are successive powers of the distance from a chosen point, each multiplied by a coefficient."},
 {t:"p",x:"When the series converges, it can describe the solution [[near]] that point."},
 {t:"take",x:"The distance from the chosen point matters. The series can stop converging farther away."}]});

/* 1 · Rule → process, no interaction. */
rc98("diffeq-numerical-series-3",1,{p:[
 {t:"p",x:"For a linear equation, first divide by the coefficient of the highest derivative. This is the **normalized** equation."},
 {t:"p",x:"At an **ordinary point**, the normalized coefficients have convergent power series there. Try a power series for the solution as well."},
 {t:"chain",items:["differentiate","substitute","align powers"],hl:2},
 {t:"take",x:"The resulting rule relating series coefficients is a **recurrence**. Use the initial data to set the starting coefficients."}]});

/* 2 · Definition → formula, Guess (a leading power can be fractional). For normalized y″ + P y′ + Q y = 0, multiply by x² to get analytic coefficients xP and x²Q next to xy′ and y. A Frobenius trial has x^r S(x) near x = 0; r follows from the lowest-power balance. */
rc98("diffeq-numerical-series-3",2,{p:[
 {t:"p",x:"At a **regular singular point**, some normalized coefficients fail to have a power series there. For a second-order equation at the origin, multiplying the coefficient of $y′$ by $x$ and the coefficient of $y$ by $x^2$ restores power series for both."},
 {t:"eq",lab:"Frobenius trial",eq:"y = x^r S(x)",cap:"near a regular singular point at the origin, on the positive side",vars:[["x","distance from the origin"],["r","leading exponent"],["S(x)","ordinary power series"]]},
 {t:"p",x:"The lowest power in the substituted equation gives the **indicial equation** for $r$. It can allow fractional exponents."}],
 g:{at:2,q:"What can the equation for the leading exponent allow?",o:[
  ["Only whole-number exponents",0,"The ordinary series has whole-number powers, but the separate leading power is set by the differential equation."],
  ["Fractional exponents too",1,"The lowest-power balance can give a fractional root. The series multiplying that power still uses whole-number powers."]]}});

/* 3 · Worked example, no interaction. Shift the derivative index to match x^n: (n + 1)a_(n+1) = a_n. Starting at 1 gives 1/1, 1/2, 1/6. */
rc98("diffeq-numerical-series-3",3,{p:[
 {t:"p",x:"For dimensionless $y′ = y$ with $y(0) = 1$, let $a_n$ be the coefficient of $x^n$ in $y$."},
 {t:"p",x:"Differentiation lowers each power by one. Shift the derivative's index so both sides use $x^n$, then match its coefficients."},
 {t:"eq",lab:"Coefficient recurrence",eq:"a_{n+1} = a_n / (n + 1)",cap:"$n$ is a nonnegative whole number. $a_0 = 1$ gives $a_1 = 1$."},
 {t:"step",f:"a_2 = a_1 / 2",v:"1/2",u:""},
 {t:"step",f:"a_3 = (1/2) / 3",v:"1/6",u:"",fin:1}]});

/* ---------- diffeq-numerical-series-4 · Boundary-value problems and shooting ---------- */
/* 0 · Terms → takeaway, Fill "different locations". */
rc98("diffeq-numerical-series-4",0,{p:[
 {t:"p",x:"An **initial-value problem** gives the needed conditions at one starting location."},
 {t:"p",x:"A **boundary-value problem** gives conditions at [[different locations]] in the independent variable."},
 {t:"p",x:"You might know a beam's displacement at both ends while its slope at the first end is unknown."}]});

/* 1 · Plain text, Guess (solutions need not be unique). */
rc98("diffeq-numerical-series-4",1,{p:[
 {t:"p",x:"A boundary condition at the far end tests which starting slopes give a solution that meets both ends."},
 {t:"p",x:"There may be no suitable starting slope, exactly one, or several. The equation and the boundary data determine which case you have."}],
 g:{at:1,q:"Can several starting slopes satisfy the same boundary conditions?",o:[
  ["Yes, they can",1,"Different solution curves starting at the same value can reach the same target."],
  ["No, a target fixes one slope",0,"A unique solution for each full set of starting data does not guarantee a unique slope that hits a target."]]}});

/* 2 · Process chain, no interaction. */
rc98("diffeq-numerical-series-4",2,{p:[
 {t:"p",x:"In **shooting**, the **shooting parameter** is the missing starting value you guess, such as the initial slope."},
 {t:"chain",items:["guess the slope","integrate","compare","adjust"],hl:2},
 {t:"p",x:"Integrate the equation as an initial-value problem for that guess. Subtract the required far-end value from the value you reach."},
 {t:"take",x:"That difference is the **boundary residual**. Use it to adjust the guess until the residual is near zero."}]});

/* 3 · Worked example, no interaction. y″ = 0 gives constant slope s and y = 1 + sx. The residual 1 + 2s − 5 = 0 gives s = (5 − 1)/(2 − 0) = 2. */
rc98("diffeq-numerical-series-4",3,{p:[
 {t:"giv",lab:"Dimensionless problem",rows:[["y″","0","second derivative"],["y(0)","1","start"],["y(2)","5","target"]]},
 {t:"p",x:"Zero second derivative gives a constant slope $s$. Over the distance from $0$ to $2$, the solution ends at $1 + 2s$."},
 {t:"step",f:"s = (5 − 1) / (2 − 0)",v:"2",u:"",fin:1},
 {t:"take",x:"Shooting can be **ill-conditioned** on other equations. A tiny error in the starting value can grow into a large error at the far end."}]});

/* ---------- diffeq-pde-1 · Fourier series and orthogonality ---------- */
/* 0 · Terms → rule in words, Fill "whole-number multiples". Harmonic frequency n·f₀ follows from n cycles in the fundamental period. */
rc98("diffeq-pde-1",0,{p:[
 {t:"p",x:"A **periodic** signal repeats after a fixed time or distance, called its period. Its fundamental frequency is one cycle per period."},
 {t:"p",x:"A **Fourier series** builds the signal from a constant and sine and cosine patterns called harmonics."},
 {t:"p",x:"Their frequencies are [[whole-number multiples]] of the fundamental."},
 {t:"take",x:"The first harmonic completes one cycle per period. The next completes two, then three, and so on."}]});

/* 1 · Plain text, no interaction. LFIG17 supplies the square-wave plot and convergence caption. */
rc98("diffeq-pde-1",1,{p:[
 {t:"p",x:"A **Fourier coefficient** is the weight of one mode."},
 {t:"take",x:"To isolate it, project onto that mode over a full period."}]});

/* 2 · Terms → takeaway, no interaction. For one-sided levels 2 and 6, their mean is (2 + 6)/2 = 4. */
rc98("diffeq-pde-1",2,{p:[
 {t:"p",x:"A **one-sided limit** is the level approached from one side. Suppose a piecewise smooth signal approaches 2 from the left and 6 from the right."},
 {t:"p",x:"The series approaches **4** at the jump, whatever value the signal is assigned at that point."},
 {t:"take",x:"Adding harmonics squeezes the ripples closer to the jump. Their peak overshoot need not shrink to zero. This is the Gibbs phenomenon."}]});

/* 3 · Worked projection with Guess (cosine squared norm). On [0,2π], cos²(x) averages 1/2, so its integral is (1/2)·2π=π. The sine cross-term integrates to zero, so c=(3π+2·0)/π=3. */
rc98("diffeq-pde-1",3,{p:[
 {t:"p",x:"To project $3cos(x)+2sin(2x)$ onto $cos(x)$, multiply by $cos(x)$ and integrate over $0$ to $2π$. Here $x$ is the dimensionless phase."},
 {t:"p",x:"An **inner product** here is the integral of a product. These modes are **orthogonal**: their cross-product integrates to zero."},
 {t:"p",x:"The integral against cosine is $3π$. Divide by the cosine’s **squared norm**, its integral against itself."},
 {t:"p",x:"Cosine squared averages one half over a period of $2π$, so its integral is $π$."},
 {t:"step",f:"3π / π",v:"3",u:"",fin:1}],
 g:{at:3,q:"What is the integral of $cos^2(x)$ over one period?",o:[
  ["$2π$",0,"That is the period length. The integrand averages one half across it."],
  ["$π$",1,"Cosine squared averages one half, so its integral is half the period."],
  ["$0$",0,"Cosine integrates to zero over a period. Squaring makes every contribution nonnegative."]]}});

/* ---------- diffeq-pde-2 · Separation of variables and eigenvalue boundaries ---------- */
/* 0 · Terms → Guess (zero displacement at each endpoint). At a pin u=0, while the adjacent shape can have nonzero slope. */
rc98("diffeq-pde-2",0,{p:[
 {t:"p",x:"A **boundary condition** specifies what the solution does at an edge. Consider a string held by pins at both ends. A pin keeps that endpoint from moving."},
 {t:"take",x:"The **displacement** must be zero at both ends. The string can still leave a pin at an angle, so its slope can be nonzero there."}],
 g:{at:1,q:"Which quantity must be zero at both pins?",o:[
  ["displacement",1,"Each pin holds the endpoint at its original position."],
  ["slope",0,"A pin can hold one point fixed while the string leaves it at an angle."]]}});

/* 1 · Rule in words → formula, Fill "multiplied together". Product substitution makes each separated expression depend on one variable. */
rc98("diffeq-pde-2",1,{p:[
 {t:"p",x:"For a solution $u(x,t)$ that depends on position $x$ and time $t$, try a spatial factor $X$ and a time factor $T$."},
 {t:"p",x:"In **separation of variables**, the factors are [[multiplied together]]."},
 {t:"eq",lab:"Trial form",eq:"u(x,t) = X(x) T(t)",cap:"when the equation allows product separation"},
 {t:"p",x:"Substitute and divide by the product where it is nonzero. The aim is to put all position dependence on one side and all time dependence on the other."}]});

/* 2 · Rule in words → formula, no interaction. For λ>0, X(0)=0 leaves sin(√λ x); X(π)=0 implies √λπ=nπ; λ=n² and n=1 gives λ=1. */
rc98("diffeq-pde-2",2,{p:[
 {t:"p",x:"**Homogeneous** means zero boundary data. Try $X″+λX=0$ with $X(0)=X(π)=0$."},
 {t:"p",x:"For positive $λ$, the first endpoint leaves a sine shape. The second requires $sin(√{λ}π)=0$."},
 {t:"eq",lab:"Allowed values and shapes",eq:"λ = n^2,   X ∝ sin(nx)",cap:"dimensionless x, n a positive integer"},
 {t:"p",x:"An allowed $λ$ is an **eigenvalue**. Its nonzero shape is an **eigenfunction**. The smallest $λ$ is 1."},
 {t:"p",x:"In a **Sturm–Liouville** spatial problem, modes with different eigenvalues have zero weighted product integral. The equation sets the weight."}]});

/* 3 · Plain text → takeaway, Fill "unchanged". Fixing t fixes the common value while x varies, then fixing x does the same for t. */
rc98("diffeq-pde-2",3,{p:[
 {t:"p",x:"After separating, suppose an expression in position alone equals an expression in time alone throughout the interval and time range."},
 {t:"p",x:"Hold time fixed and vary position. The time expression is fixed, so the position expression must stay [[unchanged]]."},
 {t:"p",x:"Each position gives the same value at that fixed time. Holding position fixed gives the same argument for time."},
 {t:"take",x:"Both expressions equal a shared **separation constant**. The spatial boundaries can restrict its allowed values."}]});

/* ---------- diffeq-pde-3 · Heat equation and diffusion modes ---------- */
/* 0 · Terms → takeaway, no interaction. Positive diffusivity smooths temperature differences in unforced diffusion. */
rc98("diffeq-pde-3",0,{p:[
 {t:"p",x:"**Diffusion** is the smoothing of a spatial difference, such as a warmer patch in a rod spreading heat into cooler surroundings."},
 {t:"p",x:"A **spatial mode** is a fixed shape with a changing strength, called its amplitude. A wavy temperature pattern can be built by adding modes."},
 {t:"take",x:"With no heat source, diffusion damps short-wavelength modes faster than broad ones."}]});

/* 1 · Rule in words → formula, Fill "proportional". Constant α>0 gives u_t=αu_xx in a homogeneous rod without sources. */
rc98("diffeq-pde-3",1,{p:[
 {t:"p",x:"In a uniform rod with no heat source, the time rate of temperature change is [[proportional]] to the spatial curvature."},
 {t:"eq",lab:"Heat equation",eq:"u_t = α u_{xx}",cap:"one spatial dimension, constant α > 0",vars:[["u","temperature"],["u_t","time derivative"],["u_{xx}","second derivative along the rod"],["α","thermal diffusivity, setting the rate of smoothing"]]},
 {t:"take",x:"At a rounded temperature peak, the curvature is negative, so that spot cools."}]});

/* 2 · Rule in words → Guess (quadruples). Differentiating sin(kx) twice gives −k²sin(kx); α(2k)²=4αk². */
rc98("diffeq-pde-3",2,{p:[
 {t:"p",x:"For a sine mode $sin(kx)$, the wave number $k$ sets how tightly the waves fit along position $x$. Consider two allowed modes in the same rod."},
 {t:"take",x:"The decay rate is $αk^2$, so doubling $k$ quadruples it."},
 {t:"eq",lab:"Mode amplitude",eq:"a(t) = a_0 exp(−αk^2t)",cap:"constant diffusivity α, zero-temperature endpoints",vars:[["a(t)","amplitude at time t"],["a_0","initial amplitude"]]},
 {t:"p",x:"Find the modes that fit the boundaries, find their rates, then expand the starting temperature in those modes to get their initial amplitudes."}],
 g:{at:1,q:"At the same diffusivity, doubling the wave number changes the decay rate by what factor?",o:[
  ["2×",0,"This counts only one spatial derivative. Curvature brings in the wave number twice."],
  ["4×",1,"The rate scales with wave number squared, so doubling gives a factor of four."]]}});

/* 3 · Worked example, no interaction. (sin 3x)″=−9sin 3x; with α=1, a₀=1 and t=ln 2/9, the exponent is −ln 2 and a=1/2. */
rc98("diffeq-pde-3",3,{p:[
 {t:"p",x:"Two spatial derivatives of $sin(3x)$ give $−9sin(3x)$. That large negative curvature factor gives a fast decay rate."},
 {t:"giv",lab:"Dimensionless sine mode",rows:[["α","1","diffusivity"],["a_0","1","initial amplitude"],["t","ln(2)/9","time"]]},
 {t:"step",f:"−9 × ln(2)/9",v:"−ln(2)",u:""},
 {t:"step",f:"a = exp(−ln(2))",v:"0.5",u:"",fin:1}]});

/* ---------- diffeq-pde-4 · Wave and Laplace equations ---------- */
/* 0 · Definition → comparison, no interaction. Wave equation evolves a state; Laplace’s equation sets a spatial balance. */
rc98("diffeq-pde-4",0,{p:[
 {t:"p",x:"A **partial differential equation** relates derivatives of a field, a quantity that depends on several variables."},
 [{t:"pc",l:"Wave equation",c:"A disturbed string moves in time",v:"evolution"},
  {t:"pc",l:"Laplace’s equation",c:"A source-free plate has reached a steady temperature",v:"equilibrium"}],
 {t:"take",x:"First decide whether the field is evolving or already in balance. That tells you what kinds of data to specify."}]});

/* 1 · Legend → formula with Guess (initial velocity). Integrating a second-order time equation requires initial displacement and its time derivative. */
rc98("diffeq-pde-4",1,{p:[
 {t:"p",x:"A stretched string has displacement $u$ at position $x$ and time $t$. Its curvature sets its acceleration in the ideal small-motion model."},
 {t:"eq",lab:"Wave equation",eq:"u_{tt} = c^2 u_{xx}",cap:"uniform string, no damping or forcing",vars:[["u_{tt}","acceleration"],["u_{xx}","spatial curvature"],["c","wave speed"]]},
 {t:"take",x:"Give the starting displacement and velocity as well as the string’s boundary conditions."},
 {t:"p",x:"A pulse can travel along the string. Opposing waves can form a standing pattern."}],
 g:{at:2,q:"Alongside starting displacement, which starting rate must you specify?",o:[
  ["velocity",1,"A second-order time equation needs both displacement and its time derivative."],
  ["acceleration",0,"The equation already gives acceleration from the starting shape’s curvature."]]}});

/* 2 · Rule in words → formula, Fill "sum". In two dimensions ∇²u=u_xx+u_yy; Laplace sets this expression to zero. */
rc98("diffeq-pde-4",2,{p:[
 {t:"p",x:"The **Laplacian** is the [[sum]] of the second derivatives along the individual spatial axes."},
 {t:"eq",lab:"Laplace’s equation",eq:"∇^2u = u_{xx}+u_{yy} = 0",cap:"two spatial dimensions, steady and source-free",vars:[["u","field value, for example temperature"],["u_{xx}, u_{yy}","curvatures along x and y"]]},
 {t:"p",x:"A field with zero Laplacian is **harmonic**. To find the field in a region, prescribe suitable boundary data, such as its value all along the edge."}]});

/* 3 · Guess → worked example. d²x²/dx²=2 and d²(−y²)/dy²=−2, hence 2+(−2)=0; matching the signs incorrectly gives −4 or 4. */
rc98("diffeq-pde-4",3,{p:[
 {t:"p",x:"In a wave, inertia allows energy to pass between motion and deformation. Laplace’s equation has no time term. It balances spatial curvatures."},
 {t:"p",x:"Test that balance for the dimensionless field $u=x^2−y^2$."},
 {t:"step",f:"u_{xx}+u_{yy} = 2−2",v:"0",u:"",fin:1},
 {t:"take",x:"The field is harmonic even though it varies with position. The two curvatures cancel."}],
 g:{at:2,q:"For this field, what is the sum of the two curvatures?",o:[
  ["−4",0,"That treats both terms as negative. The x² curvature is positive."],
  ["0",1,"The +2 and −2 curvatures cancel."],
  ["4",0,"That treats both terms as positive. The −y² curvature is negative."]]}});

/* ======== cards · linalg (from origin/codex-cards-linalg, d47e28c) ======== */
/* ===== Linear algebra reveal cards, staged against b114 =====
   All 96 cards of the 24 Linear Algebra lessons. Original cards, questions, ids and question order are unchanged.
   Guess on 29 cards, Fill on 24, and neither on 43. See linalg.md for indices. */

/* ---------- linalg-matrices-1 · Matrix shapes and linear maps ---------- */
/* 0 · Plain text, Guess (one column). Selecting one input coordinate means its weight is one and all other weights are zero. */
rc98("linalg-matrices-1",0,{p:[
 {t:"p",x:"A matrix lists the numbers used by a **linear map**. Such a map preserves addition and scaling."},
 {t:"p",x:"Each **column** gives the output from selecting its input coordinate alone and setting the others to zero."}],
 g:{at:1,q:"Which part gives the output when just one input coordinate is set to one?",o:[
  ["One column",1,"A single input coordinate weights one full column."],
  ["One row",0,"A row produces a single output coordinate."]]}});

/* 1 · Plain text, Fill "as many". */
rc98("linalg-matrices-1",1,{p:[
 {t:"p",x:"A matrix with $m$ rows and $n$ columns acts on an input with [[as many]] components as there are columns."},
 {t:"p",x:"The input has $n$ components. The output has $m$, one for each row."}]});

/* 2 · Plain text, Guess (add them). */
rc98("linalg-matrices-1",2,{p:[
 {t:"p",x:"To find one output, multiply each row entry by the matching input entry."},
 {t:"p",x:"Add the pairwise products to get the **dot product** of the row and the input."}],
 g:{at:1,q:"How do you combine the resulting products to get a dot product?",o:[
  ["Multiply them",0,"The entries were already multiplied in pairs, and those contributions must be summed."],
  ["Add them",1,"Each matched pair contributes additively to this output."]]}});

/* 3 · Plain text, no interaction. A coordinate basis vector has one unit entry and zeros elsewhere by definition. */
rc98("linalg-matrices-1",3,{p:[
 {t:"p",x:"A **coordinate basis vector** has a single entry equal to one, with the rest zero."},
 {t:"p",x:"The **image** of a vector is its output. Weight each basis vector's image by its input coordinate, then add the results."}]});

/* ---------- linalg-matrices-2 · Elimination and row operations ---------- */
/* 0 · Plain text, Guess (you can lose a constraint). */
rc98("linalg-matrices-2",0,{p:[
 {t:"p",x:"In **elimination**, simplify the equations while keeping the same solutions. A **pivot** is the leading coefficient used to clear entries below it."},
 {t:"p",x:"Scaling by zero can erase a constraint. A valid row operation can be undone."}],
 g:{at:1,q:"What happens if you multiply one row by zero?",o:[
  ["You can lose a constraint",1,"The old row cannot be recovered from a row of zeros."],
  ["All constraints are preserved",0,"Scaling preserves an equation only when the scale is nonzero."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-matrices-2",1,{p:[
 {t:"p",x:"Swap two rows, multiply a row by a nonzero number, or add a multiple of one row to another."},
 {t:"p",x:"To undo these steps, swap back, divide by the multiplier, or subtract the same multiple."}]});

/* 2 · Plain text, Fill "along with". */
rc98("linalg-matrices-2",2,{p:[
 {t:"p",x:"The right-hand side changes [[along with]] the coefficients during an operation."},
 {t:"p",x:"An **augmented matrix** stores that right-hand side as an extra column, so apply the row operation to the whole row."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-2",3,{p:[
 {t:"p",x:"Equations can be replaced by reversible combinations of one another."},
 {t:"p",x:"Every old solution satisfies the new equations. Reversing the operations shows that every new solution satisfies the old ones."}]});

/* ---------- linalg-matrices-3 · Consistency, pivots, and free variables ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-matrices-3",0,{p:[
 {t:"p",x:"A system is **consistent** if it has at least one solution. Row reduction makes that easier to check."},
 {t:"p",x:"A **pivot** is the leading nonzero coefficient in a nonzero row of the reduced coefficient matrix."}]});

/* 1 · Plain text, Guess (none). */
rc98("linalg-matrices-3",1,{p:[
 {t:"p",x:"Suppose a reduced equation has zero for every coefficient but a nonzero right-hand side."},
 {t:"p",x:"That row is a contradiction. The system is **inconsistent**, meaning there is no common solution."}],
 g:{at:1,q:"How many solutions satisfy that equation?",o:[
  ["None",1,"The left side is zero for every input."],
  ["Exactly one",0,"No choice of a variable can change a left side with all-zero coefficients."],
  ["Infinitely many",0,"A row of zeros permits all inputs only when the right side is also zero."]]}});

/* 2 · Plain text, Fill "freely". */
rc98("linalg-matrices-3",2,{p:[
 {t:"p",x:"In a consistent system, a variable without a pivot can vary [[freely]]."},
 {t:"p",x:"Choose those free variables first. The pivot equations then determine the pivot variables."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-3",3,{p:[
 {t:"p",x:"**Rank** counts the coefficient pivots. Subtract it from the number of variables to count free variables."},
 {t:"p",x:"Each free choice is an unconstrained **degree of freedom**. A consistent system is unique when there are no free choices."}]});

/* ---------- linalg-matrices-4 · Matrix products and composition ---------- */
/* 0 · Plain text, Guess (rightmost map). */
rc98("linalg-matrices-4",0,{p:[
 {t:"p",x:"**Composition** means applying maps in succession. The product $AB$ acts on a column vector. The letters $A$ and $B$ name the two maps."},
 {t:"p",x:"The rightmost map $B$ acts first. Map $A$ takes its output as input."}],
 g:{at:1,q:"Which map acts first?",o:[
  ["Rightmost map",1,"The vector is multiplied by B before A acts on the result."],
  ["Leftmost map",0,"A is written first but acts on the intermediate result."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-matrices-4",1,{p:[
 {t:"p",x:"**Associative** means you can regroup three compatible factors without changing their order or the result."},
 {t:"p",x:"**Commutative** would mean you could swap factors. Matrix products generally change when you swap them."}]});

/* 2 · Plain text, Fill "equal". */
rc98("linalg-matrices-4",2,{p:[
 {t:"p",x:"The inner dimensions must be [[equal]]."},
 {t:"p",x:"The column count of the left matrix must match the row count of the right matrix. The outer counts give the product shape."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-4",3,{p:[
 {t:"p",x:"To find one product entry, pick a row from the left matrix and a column from the right."},
 {t:"p",x:"Take their dot product. Its paired entries run over the intermediate coordinates."}]});

/* ---------- linalg-spaces-1 · Span, independence, and bases ---------- */
/* 0 · Plain text, Guess (it stays the same). */
rc98("linalg-spaces-1",0,{p:[
 {t:"p",x:"A vector's **linear combination** with other vectors is a sum of those vectors with chosen weights. Their **span** is the set of all such sums."},
 {t:"p",x:"The span stays the same. The new vector's weight just changes the weights on the old vectors."}],
 g:{at:1,q:"If you add a vector already in the span, what happens to that span?",o:[
  ["It grows",0,"Adding a vector expands the span only when it lies outside the old span."],
  ["It stays the same",1,"The added vector can be replaced by a combination of the old ones."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-spaces-1",1,{p:[
 {t:"p",x:"Vectors are **independent** if the only weighted sum that gives zero uses all-zero weights."},
 {t:"p",x:"If some nonzero choice of weights gives zero, the vectors are **dependent**. One can be written as a combination of the others."}]});

/* 2 · Plain text, Fill "both". */
rc98("linalg-spaces-1",2,{p:[
 {t:"p",x:"A basis must be [[both]] independent and spanning."},
 {t:"p",x:"Its vectors cover the space with no redundant directions. The number of basis vectors is the **dimension**."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-1",3,{p:[
 {t:"p",x:"To extract a basis from a list, put the vectors into columns and find pivots by row reduction."},
 {t:"p",x:"Keep the corresponding columns from the original matrix. They span the same space as the original list and are independent."}]});

/* ---------- linalg-spaces-2 · Null space and solution families ---------- */
/* 0 · Plain text, Guess (it stays fixed). */
rc98("linalg-spaces-2",0,{p:[
 {t:"p",x:"The **null space** consists of inputs that the map sends to zero. The map adds outputs when you add inputs."},
 {t:"p",x:"The output stays fixed. The added direction contributes nothing to it."}],
 g:{at:1,q:"If you add a null-space vector to an input, what happens to its output?",o:[
  ["It stays fixed",1,"The added input contributes zero to the output."],
  ["It becomes zero",0,"Only the added direction is known to have zero output."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-spaces-2",1,{p:[
 {t:"p",x:"The null space solves the **homogeneous system**, whose right-hand side is zero."},
 {t:"p",x:"It is a **subspace** of the input space: it contains zero and stays closed under addition and scaling."}]});

/* 2 · Plain text, Fill "within". */
rc98("linalg-spaces-2",2,{p:[
 {t:"p",x:"A **particular solution** is any one input with the requested output. You can move [[within]] the null space to find other solutions."},
 {t:"p",x:"Add any null-space vector to that particular solution. The output remains the requested one."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-2",3,{p:[
 {t:"p",x:"Two solutions with the same output have a difference that maps to zero."},
 {t:"p",x:"This is why particular solution plus null-space vector describes every solution of a consistent system."}]});

/* ---------- linalg-spaces-3 · Rank-nullity and fundamental spaces ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-spaces-3",0,{p:[
 {t:"p",x:"The **column space** is the span of the columns. It contains all reachable outputs."},
 {t:"p",x:"Its dimension is the **rank**. The **nullity** is the dimension of the space of inputs that map to zero."}]});

/* 1 · Plain text, Guess (column count). */
rc98("linalg-spaces-3",1,{p:[
 {t:"p",x:"Rank counts pivot variables. Nullity counts free variables in the zero-output system."},
 {t:"p",x:"Rank plus nullity equals the column count, the number of input coordinates."}],
 g:{at:1,q:"Which matrix count equals rank plus nullity?",o:[
  ["Row count",0,"Rows index output coordinates, not the full list of input variables."],
  ["Column count",1,"Every column represents either a pivot variable or a free variable."]]}});

/* 2 · Plain text, Fill "perpendicular". */
rc98("linalg-spaces-3",2,{p:[
 {t:"p",x:"The **row space** contains combinations of rows. It is [[perpendicular]] to the null space under the ordinary dot product."},
 {t:"p",x:"A null vector has zero dot product with each row, so it also has zero dot product with any row combination."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-3",3,{p:[
 {t:"p",x:"The **left null space** contains output-space vectors sent to zero by the transpose, which swaps rows and columns."},
 {t:"p",x:"Each such vector is perpendicular to every column, and therefore to the whole column space."}]});

/* ---------- linalg-spaces-4 · Coordinates and change of basis ---------- */
/* 0 · Plain text, Guess (the coordinate list). */
rc98("linalg-spaces-4",0,{p:[
 {t:"p",x:"A coordinate list gives weights on the vectors of a chosen basis."},
 {t:"p",x:"The coordinate list can change even though the geometric vector stays fixed."}],
 g:{at:1,q:"When you change bases while keeping the same vector, what can change?",o:[
  ["The coordinate list",1,"The same vector can be built from different weights on different basis vectors."],
  ["The geometric vector",0,"Changing the basis describes the same vector using a different list."]]}});

/* 1 · Plain text, Fill "combine". */
rc98("linalg-spaces-4",1,{p:[
 {t:"p",x:"Basis coordinates are weights used to [[combine]] the basis vectors."},
 {t:"p",x:"For a **change of basis**, convert between lists for the same vector. Stack the new basis vectors as columns. Multiplying by this basis matrix yields the vector in standard coordinates."}]});

/* 2 · Plain text, Guess (solve for them). */
rc98("linalg-spaces-4",2,{p:[
 {t:"p",x:"Start with a vector in standard coordinates. You know the columns of the new basis matrix."},
 {t:"p",x:"Solve the system with the basis matrix as the coefficient matrix. The unknowns are the new weights."}],
 g:{at:1,q:"How do you find the weights for this new basis?",o:[
  ["Multiply by the basis matrix",0,"Multiplication by the basis matrix goes from basis weights to standard coordinates."],
  ["Solve for them",1,"The weights must reproduce the supplied vector as a combination of the columns."]]}});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-4",3,{p:[
 {t:"p",x:"An **orthonormal** basis uses mutually perpendicular unit vectors."},
 {t:"p",x:"For an orthonormal basis matrix, swapping rows and columns gives its inverse. A general basis needs a solve."}]});

/* ---------- linalg-determinants-1 · Determinants and volume scaling ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-determinants-1",0,{p:[
 {t:"p",x:"A determinant is a single signed number for a square matrix."},
 {t:"p",x:"Its absolute value measures the factor by which the map scales full-dimensional volume."}]});

/* 1 · Plain text, Guess (reverses it). */
rc98("linalg-determinants-1",1,{p:[
 {t:"p",x:"Volume scaling ignores sign. **Orientation** describes the handedness of an ordered set of axes."},
 {t:"p",x:"A negative determinant reverses orientation. A positive one preserves it."}],
 g:{at:1,q:"What does a negative determinant do to orientation?",o:[
  ["Reverses it",1,"A negative sign means the transformed axes have opposite handedness."],
  ["Preserves it",0,"Preserved orientation corresponds to a positive sign."]]}});

/* 2 · Plain text, Fill "collapses". */
rc98("linalg-determinants-1",2,{p:[
 {t:"p",x:"A zero determinant means the map [[collapses]] full-dimensional volume."},
 {t:"p",x:"The columns are dependent and their span has fewer dimensions than the input space. The square map is **singular**, meaning it has no inverse."}]});

/* 3 · Rule in words → formula, no interaction. The signed area is ad − bc: the main product ad less the opposite product bc. */
rc98("linalg-determinants-1",3,{p:[
 {t:"p",x:"For a square matrix with top row $a,b$ and bottom row $c,d$, $D$ denotes its determinant."},
 {t:"eq",lab:"Two-by-two determinant",eq:"D = ad − bc",cap:"square matrix with two rows"},
 {t:"p",x:"Multiply down each diagonal. Subtract the opposite-diagonal product from the main-diagonal product."}]});

/* ---------- linalg-determinants-2 · Inverse maps and solving systems ---------- */
/* 0 · Plain text, Guess (exactly one). */
rc98("linalg-determinants-2",0,{p:[
 {t:"p",x:"A square map has **full rank** when it reaches every output direction."},
 {t:"p",x:"For every output there is exactly one input. The inverse takes that output back to the input."}],
 g:{at:1,q:"How many inputs give a specified output for a square full-rank map?",o:[
  ["None",0,"Full rank means every output is reachable."],
  ["Infinitely many",0,"Multiple inputs would require a nonzero null-space direction."],
  ["Exactly one",1,"Full rank in a square matrix leaves no null-space freedom."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-2",1,{p:[
 {t:"p",x:"A square matrix with an inverse is **nonsingular**. Multiplying the matrix and its inverse in either order gives the identity map."},
 {t:"p",x:"A diagonal matrix with nonzero diagonal entries is undone by reciprocating those entries. That shortcut does not apply entry by entry to a general matrix."}]});

/* 2 · Plain text, Fill "reuse". */
rc98("linalg-determinants-2",2,{p:[
 {t:"p",x:"A **factorization** writes a matrix as a product of simpler matrices that are easy to solve with."},
 {t:"p",x:"For several right-hand sides, [[reuse]] the same factors."},
 {t:"p",x:"Each right-hand side needs new solves with the factors. The coefficient matrix and its factors stay the same."}]});

/* 3 · Plain text, Guess (at the last equation). */
rc98("linalg-determinants-2",3,{p:[
 {t:"p",x:"Elimination yields triangular systems. An upper-triangular system has zeros below its diagonal."},
 {t:"p",x:"Start with the last equation and work upward, substituting each known value. This is **back substitution**."}],
 g:{at:1,q:"Where do you start solving an upper-triangular system?",o:[
  ["At the last equation",1,"The last equation has only the last unknown left."],
  ["At the first equation",0,"Earlier equations can still contain unknowns from later columns."]]}});

/* ---------- linalg-determinants-3 · LU factorization and pivoting ---------- */
/* 0 · Plain text, Guess (largest absolute value). */
rc98("linalg-determinants-3",0,{p:[
 {t:"p",x:"A **pivot** is the entry used as a divisor to compute an elimination multiplier. Partial pivoting can swap in a different row."},
 {t:"p",x:"Choose an entry of largest absolute value among the remaining rows in the active column."}],
 g:{at:1,q:"Which candidate does partial pivoting use in the current column?",o:[
  ["Smallest absolute value",0,"A tiny divisor can make the multiplier unnecessarily large."],
  ["Largest absolute value",1,"This avoids dividing by a smaller available entry."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-3",1,{p:[
 {t:"p",x:"In **LU factorization**, the lower-triangular factor $L$ stores elimination multipliers. The upper-triangular factor $U$ stores the resulting coefficients."},
 {t:"p",x:"A lower-triangular matrix has zeros above the diagonal. An upper-triangular one has zeros below it."}]});

/* 2 · Plain text, Fill "in the same order". */
rc98("linalg-determinants-3",2,{p:[
 {t:"p",x:"A **permutation matrix** records the swaps. Apply them to the right-hand side [[in the same order]] as to the coefficient rows."},
 {t:"p",x:"Then solve with the lower factor, followed by the upper factor."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-determinants-3",3,{p:[
 {t:"p",x:"To clear an entry, divide it by the pivot and subtract that multiple of the pivot row."},
 {t:"p",x:"Small pivots can produce large multipliers, magnifying rounding errors. Pivoting helps with elimination but cannot undo the map's inherent sensitivity."}]});

/* ---------- linalg-determinants-4 · Condition numbers and residuals ---------- */
/* 0 · Plain text, Guess (yes). */
rc98("linalg-determinants-4",0,{p:[
 {t:"p",x:"Imagine a square map that almost flattens one direction. Moving far along that direction hardly changes the output."},
 {t:"p",x:"A small output mismatch can hide a large input error when the map nearly flattens a direction."}],
 g:{at:1,q:"Can a small output mismatch coexist with a large input error?",o:[
  ["Yes",1,"An input error in the nearly flattened direction barely shows in the output."],
  ["No",0,"That would require the map to preserve lengths well in every direction."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-4",1,{p:[
 {t:"p",x:"The **residual** is the observed right-hand side minus the output predicted by the computed solution."},
 {t:"p",x:"**Forward error** compares the computed solution with the exact one. **Backward error** asks how little the data must change to make the computed solution exact."}]});

/* 2 · Rule in words → formula, no interaction. */
rc98("linalg-determinants-4",2,{p:[
 {t:"p",x:"For an invertible matrix in Euclidean geometry, $κ$ is its condition number. The quantities $σ_{max}$ and $σ_{min}$ are its largest and smallest stretches of unit vectors."},
 {t:"eq",lab:"Euclidean condition number",eq:"κ = σ_{max} / σ_{min}",cap:"invertible matrix"},
 {t:"p",x:"A large ratio permits large relative solution changes from small relative changes to the right-hand side."}]});

/* 3 · Plain text, Fill "weakly stretched". */
rc98("linalg-determinants-4",3,{p:[
 {t:"p",x:"The output barely responds to inputs along a [[weakly stretched]] direction."},
 {t:"p",x:"A substantially wrong input in that direction can still fit the equations closely. Report the residual together with conditioning information."}]});

/* ---------- linalg-eigenvalues-1 · Eigenpairs and invariant directions ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-eigenvalues-1",0,{p:[
 {t:"p",x:"A square map can mix coordinates. Some nonzero vectors map to multiples of themselves."},
 {t:"p",x:"That line is an **invariant subspace**. Every point on it maps back to the line, possibly to zero."}]});

/* 1 · Rule in words → formula, no interaction. */
rc98("linalg-eigenvalues-1",1,{p:[
 {t:"p",x:"For square matrix $A$, a nonzero vector $v$ with this property is an **eigenvector**. The multiplier $λ$ is its **eigenvalue**."},
 {t:"eq",lab:"Eigenpair condition",eq:"Av = λv",cap:"square map, nonzero vector"},
 {t:"p",x:"Compute the image and verify the same multiplier works in every component."}]});

/* 2 · Plain text, Guess (in the opposite direction). */
rc98("linalg-eigenvalues-1",2,{p:[
 {t:"p",x:"An eigenvalue can be positive, negative, or zero. Over complex coordinates it can also be complex."},
 {t:"p",x:"A negative eigenvalue reverses the direction of a real eigenvector while keeping its line invariant."}],
 g:{at:1,q:"For a real eigenvector with a negative eigenvalue, where does its image point?",o:[
  ["In the original direction",0,"A positive multiplier would preserve the arrow's direction."],
  ["In the opposite direction",1,"Multiplying by a negative real number reverses the arrow."]]}});

/* 3 · Plain text, Fill "not invertible". */
rc98("linalg-eigenvalues-1",3,{p:[
 {t:"p",x:"A zero eigenvalue sends a nonzero vector to zero, so the map is [[not invertible]]."},
 {t:"p",x:"The zero input has zero output too. An inverse could not distinguish the two inputs."}]});

/* ---------- linalg-eigenvalues-2 · Diagonalization and matrix powers ---------- */
/* 0 · Plain text, Guess (no). */
rc98("linalg-eigenvalues-2",0,{p:[
 {t:"p",x:"An **eigenbasis** is a full basis made from eigenvectors."},
 {t:"p",x:"In an eigenbasis each coordinate is scaled on its own. The axes do not mix."}],
 g:{at:1,q:"In this basis, can one coordinate feed into a different coordinate when the map acts?",o:[
  ["No",1,"An eigenvector maps to a multiple of itself, with no component in any other basis direction."],
  ["Yes",0,"Mixing between coordinates is possible in a general basis, not in an eigenbasis."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-eigenvalues-2",1,{p:[
 {t:"p",x:"A matrix is **diagonalizable** if it has an eigenbasis. The matrix of eigenvectors as columns maps eigenbasis coordinates to original coordinates."},
 {t:"p",x:"The diagonal matrix of eigenvalues acts on eigenbasis coordinates, also called **modal coordinates**."}]});

/* 2 · Plain text, Fill "compatible". */
rc98("linalg-eigenvalues-2",2,{p:[
 {t:"p",x:"Repeated eigenvalues are [[compatible]] with diagonalization."},
 {t:"p",x:"**Algebraic multiplicity** counts repeats as a root of the polynomial used to find eigenvalues. **Geometric multiplicity** is the dimension of the **eigenspace**, made of the associated eigenvectors and zero."}]});

/* 3 · Plain text, Guess (they multiply). */
rc98("linalg-eigenvalues-2",3,{p:[
 {t:"p",x:"A positive integer matrix power repeats the same map. In an eigenbasis each application multiplies a coordinate by its own eigenvalue."},
 {t:"p",x:"The factors multiply. Raise each eigenvalue to the desired power, then convert back to original coordinates."}],
 g:{at:1,q:"How do the successive scale factors combine?",o:[
  ["They add",0,"No separate outputs are being summed. The same coordinate is scaled repeatedly."],
  ["They multiply",1,"Each application scales the result of the preceding application."]]}});

/* ---------- linalg-eigenvalues-3 · Complex modes and defective matrices ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-eigenvalues-3",0,{p:[
 {t:"p",x:"For a real matrix, a nonreal eigenvalue comes with its **complex conjugate**, obtained by flipping the sign of its imaginary part."},
 {t:"p",x:"Conjugating the corresponding eigenvector gives an eigenvector for that partner."}]});

/* 1 · Plain text, Guess (it decays). Repeated magnitude scales by its successive powers, which decay for a positive factor below one. */
rc98("linalg-eigenvalues-3",1,{p:[
 {t:"p",x:"A conjugate pair can describe rotation in a real plane. The eigenvalue magnitude scales the mode amplitude each step in modal coordinates."},
 {t:"p",x:"The mode decays because each step shrinks it, even while the direction rotates."}],
 g:{at:1,q:"If that magnitude is below one, what happens to the mode under repeated steps?",o:[
  ["It decays",1,"Every step multiplies its size by the same factor below one."],
  ["It grows",0,"Growth requires a magnitude above one."],
  ["It keeps its size",0,"An unchanged size requires unit magnitude."]]}});

/* 2 · Plain text, Fill "too few". */
rc98("linalg-eigenvalues-3",2,{p:[
 {t:"p",x:"A **defective** matrix has [[too few]] independent eigenvectors to form a basis in the field being used."},
 {t:"p",x:"To step down an eigenvector chain, take the image of a vector and subtract the eigenvalue times that vector."},
 {t:"p",x:"A **generalized eigenvector** reaches an ordinary eigenvector after repeating this step."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-eigenvalues-3",3,{p:[
 {t:"p",x:"**Algebraic multiplicity** counts how many times a root repeats. Compare it with the number of independent eigenvectors for that root."},
 {t:"p",x:"The **eigenspace** contains those eigenvectors and zero. A **Jordan block** places the eigenvalue on the diagonal and links chain members just above it."},
 {t:"p",x:"For a nonzero eigenvalue, repeated action can multiply its powers by a polynomial in the step count. A block with eigenvalue zero eventually gives zero."}]});

/* ---------- linalg-eigenvalues-4 · Symmetric spectra and quadratic forms ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-eigenvalues-4",0,{p:[
 {t:"p",x:"A **symmetric** real matrix equals its transpose, so swapping its rows and columns leaves it unchanged."},
 {t:"p",x:"Its eigenvalues are real. It has a basis of unit eigenvectors that are mutually perpendicular."}]});

/* 1 · Rule in words → formula, no interaction. */
rc98("linalg-eigenvalues-4",1,{p:[
 {t:"p",x:"A **quadratic form** is a scalar built from a vector $x$ and a matrix $Q$. The superscript $T$ turns a column into a row."},
 {t:"eq",lab:"Real quadratic form",eq:"x^T Qx",cap:"real symmetric matrix"},
 {t:"p",x:"For the symmetric form here, each eigenvalue gives its weight along one eigenvector. These weights can represent curvature or energy in a model."}]});

/* 2 · Plain text, Guess (semidefinite only). */
rc98("linalg-eigenvalues-4",2,{p:[
 {t:"p",x:"A **positive definite** form is positive for every nonzero input. A **positive semidefinite** form is nonnegative for every input."},
 {t:"p",x:"The form is semidefinite only. The zero-eigenvalue direction prevents strict positivity."},
 {t:"p",x:"Positive semidefiniteness needs all eigenvalues to be nonnegative. Positive definiteness needs them all to be positive."}],
 g:{at:1,q:"If every eigenvalue is nonnegative but one is zero, which describes the form?",o:[
  ["Strictly positive definite",0,"Strict positivity excludes zero along any nonzero direction."],
  ["Semidefinite only",1,"The zero-eigenvalue direction gives a zero value even for a nonzero vector."]]}});

/* 3 · Plain text, Fill "separate". */
rc98("linalg-eigenvalues-4",3,{p:[
 {t:"p",x:"In orthonormal eigenvector coordinates, the quadratic form splits into a sum of [[separate]] contributions."},
 {t:"p",x:"Square each coordinate and multiply by its eigenvalue. Then add the weighted squares, with no cross terms."}]});

/* ---------- linalg-orthogonality-1 · Inner products and orthogonal projection ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-orthogonality-1",0,{p:[
 {t:"p",x:"An **inner product** is a rule for computing lengths and angles. In ordinary Euclidean geometry it is the dot product."},
 {t:"p",x:"The **orthogonal projection** is the closest point in the target subspace by Euclidean distance."}]});

/* 1 · Rule in words → formula, no interaction. Set u·(b − cu) = 0 and solve for c; nonzero u ensures u·u > 0. */
rc98("linalg-orthogonality-1",1,{p:[
 {t:"p",x:"To project vector $b$ onto the line through nonzero vector $u$, let $c$ denote the weight on $u$. A dot denotes dot product."},
 {t:"eq",lab:"Euclidean line projection",eq:"c = (u·b) / (u·u)",cap:"nonzero line direction"},
 {t:"p",x:"The projected vector is $cu$. Subtract it from $b$ to get the residual."}]});

/* 2 · Plain text, Guess (perpendicular). */
rc98("linalg-orthogonality-1",2,{p:[
 {t:"p",x:"The target is a subspace, so you can move along any of its directions from the projected point."},
 {t:"p",x:"The residual is perpendicular to every direction in the subspace. It lies in the **orthogonal complement**."}],
 g:{at:1,q:"At the closest point, how is the residual oriented relative to the subspace?",o:[
  ["Perpendicular",1,"A component in the subspace could still be removed by moving toward the input."],
  ["Parallel",0,"A parallel residual would let you keep moving toward the input along the subspace."]]}});

/* 3 · Plain text, Fill "smaller". */
rc98("linalg-orthogonality-1",3,{p:[
 {t:"p",x:"If a residual still has a component in the target subspace, following that component makes the distance [[smaller]]."},
 {t:"p",x:"Moving within the subspace cannot remove a perpendicular component. Any extra in-subspace displacement adds squared distance."}]});

/* ---------- linalg-orthogonality-2 · Gram–Schmidt and QR ---------- */
/* 0 · Plain text, Guess (subtract its projection). */
rc98("linalg-orthogonality-2",0,{p:[
 {t:"p",x:"To make an **orthonormal** list, aim for mutually perpendicular vectors of unit length."},
 {t:"p",x:"Subtract the projection onto the earlier direction. Resizing alone cannot remove it."}],
 g:{at:1,q:"Which action removes the component along an earlier unit direction?",o:[
  ["Divide by its length",0,"That changes the length while keeping the same direction."],
  ["Subtract its projection",1,"This removes exactly the component in the earlier direction."]]}});

/* 1 · Plain text, Fill "before". */
rc98("linalg-orthogonality-2",1,{p:[
 {t:"p",x:"In **Gram–Schmidt**, remove projections onto all earlier orthonormal directions [[before]] normalizing."},
 {t:"p",x:"The remainder is perpendicular to the earlier vectors. Divide it by its own length to make a unit vector."}]});

/* 2 · Plain text, no interaction. */
rc98("linalg-orthogonality-2",2,{p:[
 {t:"p",x:"For a matrix with independent columns, **QR factorization** writes it as $QR$. The columns of $Q$ are orthonormal. The factor $R$ is upper triangular, with zeros below its diagonal."},
 {t:"p",x:"A **Householder transformation** reflects vectors across a plane. Numerical QR often uses these reflections to zero entries while limiting rounding error."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-orthogonality-2",3,{p:[
 {t:"p",x:"Rescale the unit vector to recover the original remainder. Add back the projections to recover the original column."},
 {t:"p",x:"So the new and old lists span the same space at each step. Independent inputs ensure a nonzero remainder."}]});

/* ---------- linalg-orthogonality-3 · Least squares and normal equations ---------- */
/* 0 · Plain text, Guess (the sum of squared mismatches). */
rc98("linalg-orthogonality-3",0,{p:[
 {t:"p",x:"An inconsistent system has no exact solution. Candidate predictions can miss the data above or below."},
 {t:"p",x:"**Least squares** minimizes the sum of squared mismatches, also called the squared residual norm."}],
 g:{at:1,q:"Which score prevents opposite mismatches from canceling?",o:[
  ["The sum of squared mismatches",1,"Squaring counts mismatches of either sign and penalizes larger ones."],
  ["The signed sum of mismatches",0,"Positive and negative mismatches can cancel without a close fit."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-orthogonality-3",1,{p:[
 {t:"p",x:"The **residual** is the data minus the prediction. Each model column is the output pattern for one coefficient. The columns span all achievable predictions."},
 {t:"p",x:"At a minimizer the prediction is the orthogonal projection of the data onto this column space."}]});

/* 2 · Rule in words → formula, no interaction. */
rc98("linalg-orthogonality-3",2,{p:[
 {t:"p",x:"Let $A$ be the model matrix and $r$ the residual. Transposing $A$ makes each column into a row."},
 {t:"eq",lab:"Normal-equation condition",eq:"A^T r = 0",cap:"ordinary least squares, at a minimizer"},
 {t:"p",x:"Every model column has zero dot product with the residual."}]});

/* 3 · Plain text, Fill "within". */
rc98("linalg-orthogonality-3",3,{p:[
 {t:"p",x:"Changing coefficients only moves the prediction [[within]] the column space."},
 {t:"p",x:"The perpendicular residual cannot be reduced that way. QR and SVD can solve the fit without forming $A^T A$, which squares the Euclidean condition number for a full-column-rank matrix."}]});

/* ---------- linalg-orthogonality-4 · Weighted fits and model sensitivity ---------- */
/* 0 · Plain text, Guess (the lower-variance sensor). */
rc98("linalg-orthogonality-4",0,{p:[
 {t:"p",x:"Two independent sensors measure the same quantity but have different known **variances**, the expected squared spreads of their errors."},
 {t:"p",x:"The lower-variance sensor gets the larger weight. For unbiased sensors, smaller spread means higher precision."}],
 g:{at:1,q:"With inverse-variance weighting, which sensor gets the larger weight?",o:[
  ["The higher-variance sensor",0,"A larger variance means more spread and gets a smaller reciprocal weight."],
  ["The lower-variance sensor",1,"A smaller variance gives a larger reciprocal weight."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-orthogonality-4",1,{p:[
 {t:"p",x:"Weighted least squares multiplies each squared mismatch by a weight before summing."},
 {t:"p",x:"For independent errors with known positive variances, use the reciprocal of each variance. Variance is the square of standard deviation."}]});

/* 2 · Plain text, Fill "separately". */
rc98("linalg-orthogonality-4",2,{p:[
 {t:"p",x:"If measurement errors are correlated, their mismatches cannot be weighted [[separately]] using only their own variances."},
 {t:"p",x:"Use the inverse of the error covariance matrix when it is invertible. Covariance measures how errors vary together."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-orthogonality-4",3,{p:[
 {t:"p",x:"Under the assumed error model, poorly measured directions receive smaller penalties."},
 {t:"p",x:"A small fitting residual says the predictions match the measured data closely in that metric. It does not establish that the assumed physics is right."}]});

/* ---------- linalg-svd-1 · Singular values and principal stretches ---------- */
/* 0 · Plain text, Guess (no). */
rc98("linalg-svd-1",0,{p:[
 {t:"p",x:"A matrix can send some input directions to zero. **Singular values** measure the stretch magnitudes of chosen unit input directions."},
 {t:"p",x:"Singular values are nonnegative. A zero singular value represents a direction that collapses."}],
 g:{at:1,q:"Can a stretch magnitude be negative?",o:[
  ["No",1,"A stretch magnitude is an output length and may be zero."],
  ["Yes",0,"A direction reversal changes orientation, but does not give a negative length."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-svd-1",1,{p:[
 {t:"p",x:"**Right singular vectors** are orthonormal input directions. **Left singular vectors** are orthonormal output directions."},
 {t:"p",x:"The **singular value decomposition**, or **SVD**, pairs each right direction that has positive stretch with a left direction. The image points along that left direction."}]});

/* 2 · Rule in words → formula, no interaction. For a unit eigenvector v, v^T A^T Av = λv^T v = λ, so its output norm is √λ. */
rc98("linalg-svd-1",2,{p:[
 {t:"p",x:"For real matrix $A$, $λ$ is an eigenvalue of $A^T A$, where $T$ swaps rows and columns. The associated stretch is $σ$."},
 {t:"eq",lab:"Singular stretch",eq:"σ = √{λ}",cap:"real matrix and Euclidean length"},
 {t:"p",x:"The product $A^T A$ is square even when $A$ is rectangular."}]});

/* 3 · Plain text, Fill "square". */
rc98("linalg-svd-1",3,{p:[
 {t:"p",x:"Along a unit eigenvector of $A^T A$, the eigenvalue is the [[square]] of the output length."},
 {t:"p",x:"Taking its nonnegative square root converts squared output length to stretch."}]});

/* ---------- linalg-svd-2 · Pseudoinverse and minimum-norm solutions ---------- */
/* 0 · Plain text, Guess (set it to zero). */
rc98("linalg-svd-2",0,{p:[
 {t:"p",x:"Multiple inputs can give the same best fit when the map has **null directions**, which have zero output."},
 {t:"p",x:"Set the null component to zero. The remaining perpendicular components keep the same fit."}],
 g:{at:1,q:"Which change to a null component can reduce the input length while keeping the fit?",o:[
  ["Make it larger",0,"That increases input length without affecting the output."],
  ["Set it to zero",1,"The fit is unchanged, and removing a perpendicular null component reduces the length."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-svd-2",1,{p:[
 {t:"p",x:"The **Moore–Penrose pseudoinverse** returns the least-squares solution with smallest Euclidean norm."},
 {t:"p",x:"It works for rectangular matrices. It also works when the matrix is **rank-deficient**, meaning its rank is smaller than both its row count and its column count."}]});

/* 2 · Plain text, Fill "left out". */
rc98("linalg-svd-2",2,{p:[
 {t:"p",x:"In singular-vector coordinates, divide by a nonzero singular stretch to undo it. Zero-stretch directions are [[left out]]."},
 {t:"p",x:"A **rank threshold** is the cutoff below which software treats stretches as zero. State it, since it changes which directions are kept."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-svd-2",3,{p:[
 {t:"p",x:"The **null space** is perpendicular to the input directions with nonzero stretch."},
 {t:"p",x:"Changing the null part cannot improve the fit. It adds a nonnegative squared length to the solution, so setting it to zero gives the minimum norm."}]});

/* ---------- linalg-svd-3 · Low-rank approximation and PCA ---------- */
/* 0 · Plain text, Guess (the largest). */
rc98("linalg-svd-3",0,{p:[
 {t:"p",x:"A **rank limit** caps the number of independent directions the approximation can keep."},
 {t:"p",x:"Keep the largest singular values and their paired directions. This is **truncated SVD**."}],
 g:{at:1,q:"Which singular stretches should an optimal truncated SVD keep?",o:[
  ["The largest",1,"Keeping the largest avoids throwing away the strongest contributions."],
  ["The smallest",0,"That leaves the strongest contributions in the error."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-svd-3",1,{p:[
 {t:"p",x:"The **spectral norm** measures the largest stretch of a matrix. The spectral error of truncation is the largest discarded stretch, or zero if none are lost."},
 {t:"p",x:"The **Frobenius norm** is the root of the sum of squared entries. Squared Frobenius truncation error sums the squares of discarded stretches."}]});

/* 2 · Plain text, Fill "before". */
rc98("linalg-svd-3",2,{p:[
 {t:"p",x:"In standard covariance **principal component analysis** (PCA), center each feature [[before]] finding variance directions."},
 {t:"p",x:"Subtract each feature mean. With observations as rows, the centered matrix's right singular vectors give the **principal components**, ordered by decreasing variance."}]});

/* 3 · Plain text, Guess (yes). */
rc98("linalg-svd-3",3,{p:[
 {t:"p",x:"PCA orders directions by variance. Features such as length and mass can have very different scales."},
 {t:"p",x:"A change in feature scale can change which PCA directions dominate. Pick scales that make variance meaningful."}],
 g:{at:1,q:"Can changing one feature's scale change which direction PCA ranks first?",o:[
  ["No",0,"Centering removes offsets but does not undo rescaling."],
  ["Yes",1,"Rescaling changes that feature's variance relative to the others."]]}});

/* ---------- linalg-svd-4 · Regularization and ill-posed inverses ---------- */
/* 0 · Plain text, Guess (amplifies it). */
rc98("linalg-svd-4",0,{p:[
 {t:"p",x:"Suppose a map barely responds to a direction, but the measurements along its output direction contain noise."},
 {t:"p",x:"Dividing by a tiny stretch amplifies noise. An inverse can therefore be very sensitive to data errors."}],
 g:{at:1,q:"What does dividing by the tiny singular value do to that noise?",o:[
  ["Amplifies it",1,"Division by a small positive stretch makes the inferred noise component larger."],
  ["Suppresses it",0,"Suppression would require damping the inverse instead of fully dividing by the stretch."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-svd-4",1,{p:[
 {t:"p",x:"**Tikhonov regularization** here adds a penalty proportional to squared solution length to the squared residual error."},
 {t:"p",x:"The **residual** is data minus prediction. Adding a penalty for solution length can favor a smaller solution with a larger residual."}]});

/* 2 · Plain text, Fill "smaller". */
rc98("linalg-svd-4",2,{p:[
 {t:"p",x:"A stronger penalty favors [[smaller]] coefficients in weakly observed directions."},
 {t:"p",x:"The solution becomes less sensitive to noisy measurements but can be pulled away from the true value even for clean data. That systematic shift is **bias**."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-svd-4",3,{p:[
 {t:"p",x:"An **ill-posed** inverse may fail to have a unique solution or may change sharply under tiny data changes."},
 {t:"p",x:"Regularization can stabilize the estimate by favoring some inputs. It cannot restore data about a direction that was never measured."}]});

/* ======== cards · mech (from origin/codex-cards-mech, 509f38c) ======== */
/* ===== Mechanical reveal cards · staged against b114 =====
   1. 135 cards in 31 lessons (rc98, format in v98.js; style catalogue in docs/LEARNING_DESIGN.md).
      Guess on 42 cards, Fill on 44 cards, 49 with neither.
      The three b98 entries stay in v98.js: mech-beams-2 cards 4 and 5, mech-thermodynamics-1 card 1.
      See mech.md for the per-lesson interaction list. */

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

/* 1 · Terms → design change (no Guess: the b117 figure caption already gives the answer, and the Guess overflowed under it). */
rc98("mech3",1,{p:[
 {t:"p",x:"**Fatigue** cracks start at a **stress concentration**, where local stress rises at a sharp corner. A **fillet** rounds the step where the shaft diameter changes."},
 {t:"take",x:"A larger fillet radius lowers the local stress rise under the same load."}]});

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
 {t:"eq",lab:"Bernoulli’s equation",eq:"p + ½ρV^2 + ρgz = C",cap:"C is constant along a streamline in steady, incompressible flow with negligible friction and no shaft work."}]});

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

/* ---------- mech-machine-1 · Bolt torque and preload ---------- */
/* 0 · Plain text, no interaction. The existing figure shows the bolt, torque and clamp force. */
rc98("mech-machine-1",0,{p:[
 {t:"p",x:"Tightening the nut stretches the bolt elastically, like a stiff spring."},
 {t:"take",x:"The stretched bolt pulls the parts together. Its initial tension is the **preload**."}]});

/* 1 · Legend → formula, Fill "in proportion". K ≈ 0.20 dry and 0.15 or less lubricated are representative estimates; 0.20·20,000·0.010 = 40.0 N·m. */
rc98("mech-machine-1",1,{p:[
 {t:"vars",vars:[["T","tightening torque"],["F","preload"],["d","nominal bolt diameter"],["K","nut factor, an estimate of the effect of friction"]]},
 {t:"p",x:"For the same bolt and nut factor, torque rises [[in proportion]] to preload."},
 {t:"eq",eq:"T ≈ K F d",cap:"Empirical estimate for a given thread and contact condition"},
 {t:"p",x:"Typical $K$ is about 0.20 dry and 0.15 or less lubricated. A 10 mm dry bolt at 20 kN needs about 40 N·m by this estimate."}]});

/* 2 · Cause → comparison, Guess. At fixed T and d, F_lub/F_dry = 0.20/0.15 = 1.333, a 33.3% rise. */
rc98("mech-machine-1",2,{p:[
 {t:"p",x:"Most tightening torque overcomes friction at the threads and under the turning nut or bolt head."},
 {t:"take",x:"Lubrication lowers $K$. At the same torque, that raises preload."},
 {t:"p",x:"Changing $K$ from 0.20 to 0.15 raises the estimated preload by about 33%."},
 {t:"p",x:"If the stretch can be measured, it tracks tension in the elastic range without relying on a friction estimate."}],
 g:{at:1,q:"Lubricate the threads but keep the torque and bolt size fixed. How does preload change?",o:[
  ["It falls",0,"Less friction leaves more of the applied torque available to stretch the bolt."],
  ["It rises",1,"The lower nut factor gives more preload for the same torque."],
  ["It stays the same",0,"Torque alone does not fix preload. The nut factor changes too."]]}});

/* 3 · Rule in words → value row, Fill "below". 0.75 F_proof leaves 0.25 F_proof to the proof load before service effects and scatter; target is a design convention. */
rc98("mech-machine-1",3,{p:[
 {t:"p",x:"The **proof load** is a specified test load the bolt must withstand without permanent stretch."},
 {t:"p",x:"For a reusable joint, a common preload target is [[below]] the proof load."},
 {t:"vt",l:"Typical preload target",v:"≈ 75%",u:"of proof load"},
 {t:"p",x:"Preload helps keep the parts clamped in service. Verify clamp force and bolt tension under service loads and allow for tightening scatter."}]});

/* ---------- mech-machine-2 · Shafts in torsion ---------- */
/* 0 · Legend → formula, Guess. For equal power at a 10:1 ideal reduction, T_out/T_in = ω_in/ω_out = 10. */
rc98("mech-machine-2",0,{p:[
 {t:"vars",vars:[["P","power transmitted"],["T","torque, or twisting moment"],["ω","angular speed in rad/s"]]},
 {t:"take",x:"At equal power, the slower shaft carries more torque."},
 {t:"eq",eq:"P = Tω",cap:"Steady rotation"},
 {t:"p",x:"An ideal 10:1 reducer has one tenth the input speed at its output and ten times the torque. With other design limits equal, that favors a thicker output shaft."}],
 g:{at:1,q:"A lossless speed reducer passes the same power through both shafts. Which carries more torque?",o:[
  ["Fast input shaft",0,"It turns faster. Less torque is needed there to transmit the same power."],
  ["Slow output shaft",1,"Equal power at lower angular speed requires more torque."]]}});

/* 1 · Legend → formula, no interaction. τ = Tr/J; at r = d/2 and J = πd⁴/32 this is 16T/(πd³). */
rc98("mech-machine-2",1,{p:[
 {t:"vars",vars:[["T","applied torque"],["d","solid shaft diameter"],["τ_{max}","largest shear stress, at the rim"]]},
 {t:"eq",eq:"τ_{max} = 16T/(πd^3)",cap:"Solid round shaft in elastic torsion"},
 {t:"p",x:"**Shear stress** measures force per area acting along a surface. In a shaft it grows from zero at the center to its peak at the rim."},
 {t:"p",x:"At distance $r$ from the center, $τ = Tr/J$. The **polar moment** $J$ measures how far the section area lies from the axis."}]});

/* 2 · Rule in words → scaling, Fill "inversely". (1.259921)³ = 2; (2)³ = 8. */
rc98("mech-machine-2",2,{p:[
 {t:"p",x:"Hold torque fixed on a solid round shaft. Its surface stress scales [[inversely]] with the cube of the diameter."},
 {t:"eq",eq:"τ_{max} ∝ 1/d^3",cap:"Same torque, elastic torsion"},
 {t:"vt",l:"Diameter about 26% larger",v:"τ_{max} ÷ 2",u:""},
 {t:"vt",l:"Twice the diameter",v:"τ_{max} ÷ 8",u:""}]});

/* 3 · Compare pair, Guess. At bore/outside diameter = 0.60, area fraction = 1 − 0.60² = 0.64; torque to reach the same outer stress scales with J, whose fraction is 1 − 0.60⁴ = 0.8704. */
rc98("mech-machine-2",3,{p:[
 {t:"p",x:"Bore a hole through the middle of an elastic round shaft. Keep its outer diameter, material and allowed surface stress fixed."},
 {t:"take",x:"The bore removes a larger share of the mass than of the torque capacity. The missing material was near the low-stress center."},
 [{t:"vt",l:"Mass per length retained",v:"64%",u:""},{t:"vt",l:"Torque capacity retained",v:"87%",u:""}],
 {t:"rel",x:"Example: bore diameter is 60% of the outside diameter."}],
 g:{at:1,q:"Which loses a larger fraction of its original value when the shaft is bored?",o:[
  ["Mass per length",1,"Removing the low-stress core saves mass with a smaller loss of torque capacity."],
  ["Torque capacity",0,"That would favor the core. Material farther from the axis makes the larger contribution to torsion."]]}});

/* ---------- mech-machine-3 · Bearing life ---------- */
/* 0 · Definition → meaning, Fill "at least". The 10th-percentile fatigue life leaves a nominal 100% − 10% = 90% survival fraction. */
rc98("mech-machine-3",0,{p:[
 {t:"p",x:"Repeated rolling contact can cause **surface fatigue**. Small pits form on the rolling elements or the tracks they run on."},
 {t:"p",x:"Under the same operating conditions, 90% of comparable bearings are expected to last [[at least]] $L_{10}$ revolutions."},
 {t:"take",x:"That makes $L_{10}$ the **basic rating life**. About 10% of the group is expected to fail from fatigue sooner."}]});

/* 1 · Legend → formula, no interaction. ISO 281 rating exponents are 3 for balls and 10/3 for rollers (model coefficients). */
rc98("mech-machine-3",1,{p:[
 {t:"vars",vars:[["L_{10}","basic rating life in millions of turns"],["C","dynamic load rating listed by the maker"],["P","equivalent steady load for bearing life"]]},
 {t:"eq",eq:"L_{10} = (C/P)^p",cap:"Basic fatigue rating at constant equivalent load"},
 {t:"p",x:"Use the same force units for $C$ and $P$. The exponent $p$ is 3 for ball bearings and 10/3 for roller bearings."}]});

/* 2 · Scaling, Guess. 1.26³ = 2.0004 and 2³ = 8. */
rc98("mech-machine-3",2,{p:[
 {t:"p",x:"Keep the same ball bearing and increase its equivalent load $P$. The life calculation uses the cube of the load ratio."},
 {t:"take",x:"About 26% more load halves the rating life of a ball bearing."},
 {t:"p",x:"Doubling the load leaves only one eighth of the life, because the load ratio is cubed."}],
 g:{at:1,q:"Equivalent load rises by about 26%. What happens to the rating life?",o:[
  ["It drops by about a quarter",0,"That treats the change as nearly linear. The load ratio enters cubed."],
  ["It drops by about half",1,"Cubing the factor 1.26 gives about 2, and load is in the denominator."]]}});

/* 3 · Worked example, no interaction. 60 min/h × 1,000 rev/min = 60,000 rev/h; 10⁹/60,000 = 16,666.7 h. 20,000–40,000 h is a representative full-shift industrial target, set by application. */
rc98("mech-machine-3",3,{p:[
 {t:"p",x:"Hours of rating life come from dividing the rated number of turns by turns per hour at constant speed."},
 {t:"giv",rows:[["L_{10}","1,000","million turns"],["n","1,000","rev/min"]]},
 {t:"step",f:"60 n",v:"60,000",u:"rev/h"},
 {t:"step",f:"10^9 / 60,000",v:"16,700",u:"h",fin:1},
 {t:"p",x:"For full-shift industrial service, a design may target 20,000–40,000 h. Choose the target for the machine's duty and maintenance plan."}]});

/* ---------- mech-machine-4 · Bolted joint stiffness ---------- */
/* 0 · Legend → formula, no interaction. Force balance gives P = rise in bolt force + loss of clamp force; equal incremental displacement gives C = k_b/(k_b + k_m). */
rc98("mech-machine-4",0,{p:[
 {t:"vars",vars:[["P","outside force pulling the joint apart"],["k_b","bolt stiffness"],["k_m","stiffness of the parts being clamped"],["C","fraction of added load seen by the bolt"]]},
 {t:"eq",eq:"C = k_b/(k_b + k_m)",cap:"Linear elastic joint, parts still in contact"},
 {t:"p",x:"The bolt gains $CP$ in tension. The parts lose $(1 − C)P$ of their initial clamp force."}]});

/* 1 · Compare conditions, Guess. At k_m/k_b = 4, C = 1/5 = 0.20; at k_m/k_b = 7/3, C = 0.30. The range is illustrative. */
rc98("mech-machine-4",1,{p:[
 {t:"p",x:"A **gasket** is a layer between parts that fills gaps to seal a joint. Consider adding a soft gasket while keeping the bolt stiffness fixed."},
 {t:"take",x:"A soft gasket makes the clamped stack easier to compress. The bolt then takes a larger share of each added load."},
 {t:"p",x:"In joints with clamped parts several times stiffer than the bolt, $C$ may be around 0.20–0.30."}],
 g:{at:1,q:"What does the soft layer do to the bolt's share of an added load before the joint opens?",o:[
  ["It raises the share",1,"The clamped parts are less stiff, which reduces the denominator of the stiffness fraction."],
  ["It lowers the share",0,"That would require stiffer clamped parts. A softer stack raises the bolt's share."]]}});

/* 2 · Rule in words → formula, Fill "proportional". If C = 0.20, a 10 kN swing produces 0.20·10 = 2.00 kN of bolt swing. */
rc98("mech-machine-4",2,{p:[
 {t:"p",x:"**Fatigue** is damage from repeated loading. For a joint that stays closed, the bolt's force swing is [[proportional]] to the outside force swing."},
 {t:"eq",eq:"ΔF_b = C ΔP",cap:"Δ means change in force, with joint stiffnesses fixed"},
 {t:"p",x:"With $C = 0.20$, a 10 kN outside swing gives a 2.00 kN bolt swing."},
 {t:"take",x:"Stiffer clamped parts or a more flexible bolt can reduce the bolt's force swing."}]});

/* 3 · Legend → formula → worked result, no interaction. 20/(1 − 0.20) = 25.0 kN. */
rc98("mech-machine-4",3,{p:[
 {t:"p",x:"The joint starts to separate when the loss of clamp force consumes the initial clamp force $F_i$."},
 {t:"eq",eq:"P_{sep} = F_i/(1 − C)",cap:"Outside force at first separation, with constant C until opening"},
 {t:"p",x:"Take a preload of 20.0 kN and a bolt share $C = 0.20$."},
 {t:"step",f:"20.0 / (1 − 0.20)",v:"25.0",u:"kN",fin:1},
 {t:"p",x:"Once the parts separate, the closed-joint load split no longer applies."}]});

/* ---------- mech-vibration-resonance-1 · Natural frequency and forcing frequency ---------- */
/* 0 · Plain text, Fill "can differ" */
rc98("mech-vibration-resonance-1",0,{p:[
 {t:"p",x:"Tap a machine bracket and let it vibrate freely. Its own preferred rate of shaking is its **natural frequency**."},
 {t:"p",x:"That rate [[can differ]] from the rate at which the motor shakes it."},
 {t:"take",x:"One rate belongs to the bracket. The other comes from whatever is driving it."}]});

/* 1 · Terms, Guess (two masses can have more modes). One mass on one spring has one independent displacement. */
rc98("mech-vibration-resonance-1",1,{p:[
 {t:"p",x:"A **mode** is a particular pattern of vibration, with its own natural frequency."},
 {t:"p",x:"A mass that can only slide back and forth on one spring has one vibration mode."},
 {t:"p",x:"With two linked masses, they can move together or against each other. Different patterns can have different natural frequencies."}],
 g:{at:2,q:"If a second linked mass can move independently, how many modes can the system have?",o:[
  ["Still only one",0,"That would be true if the masses had to move together."],
  ["More than one",1,"The two masses can move in different patterns, each with its own frequency."]]}});

/* 2 · Legend → formula → worked step, no interaction. √(18,000/2.00)/(2π) = 15.0988 Hz ≈ 15.10 Hz. */
rc98("mech-vibration-resonance-1",2,{p:[
 {t:"vars",vars:[["f_n","undamped natural frequency (Hz)"],["k","spring stiffness (N/m)"],["m","moving mass (kg)"]]},
 {t:"eq",eq:"f_n = √{k/m}/(2π)",cap:"One mass, a linear spring, and no damping"},
 {t:"p",x:"Use $k = 18,000$ N/m and $m = 2.00$ kg. The square root gives radians per second, so divide by $2π$ radians per cycle."},
 {t:"step",f:"√{18000/2.00}/(2π)",v:"15.10",u:"Hz",fin:1}]});

/* 3 · Definition → worked step, no interaction. 1200 rev/min ÷ 60 s/min × 1 cycle/rev = 20.0 Hz. */
rc98("mech-vibration-resonance-1",3,{p:[
 {t:"p",x:"**Forcing frequency** is how often a load repeats. Measure it in hertz (cycles per second)."},
 {t:"p",x:"A once-per-revolution load repeats one time per turn. For a shaft turning at 1200 rpm, divide by 60 seconds per minute."},
 {t:"step",f:"1200 ÷ 60",v:"20.0",u:"Hz",fin:1}]});

/* 4 · Cause → effect, Fill "more efficiently" */
rc98("mech-vibration-resonance-1",4,{p:[
 {t:"p",x:"**Resonance** is the large response that can occur when forcing is near a natural frequency."},
 {t:"p",x:"A repeated force transfers energy [[more efficiently]] to the mode near resonance."},
 {t:"p",x:"**Damping** removes vibration energy. It limits the steady shaking even when the force keeps adding energy."},
 {t:"take",x:"Natural frequency tells you where to look for resonance. The forcing and damping also set how much the part moves."}]});

/* 5 · Scaling table, Guess (quadruple stiffness → twice the frequency). √4 = 2; √(1/4) = 1/2. */
rc98("mech-vibration-resonance-1",5,{p:[
 {t:"p",x:"Consider the same linear mass–spring model. Change just the spring or just the mass."},
 {t:"tbl",head:["Change","Natural frequency"],rows:[["Stiffness × 4","× 2"],["Mass × 4","÷ 2"]],hi:[0,1]},
 {t:"take",x:"Name the mode and the repeated load before proposing a fix. Check whether the change moves their frequencies farther apart."}],
 g:{at:1,q:"With mass fixed, what happens to natural frequency if stiffness quadruples?",o:[
  ["Quadruples",0,"That uses a linear rule. Frequency follows the square root of stiffness."],
  ["Doubles",1,"With the mass fixed, frequency scales by the square root of four."],
  ["Halves",0,"That is what happens when mass quadruples with stiffness fixed."]]}});

/* ---------- mech-vibration-resonance-2 · Estimate damping from ring-down ---------- */
/* 0 · Plain text, no interaction */
rc98("mech-vibration-resonance-2",0,{p:[
 {t:"p",x:"Give a flexible part a push and let go. Watch how quickly its swings get smaller."},
 {t:"take",x:"Decay tells you how strongly **damping** drains the energy of the vibration."}]});

/* 1 · Terms → boundary, Fill "between". 0 is undamped; 1 is the critical damping ratio. */
rc98("mech-vibration-resonance-2",1,{p:[
 {t:"p",x:"A **ring-down** is the free motion after the driving force stops."},
 {t:"term",s:"ζ",x:"The **damping ratio** is damping divided by the critical amount at which free oscillations stop. It has no units."},
 {t:"p",x:"A linear mode still rings while it decays if the ratio is [[between]] zero and one. That is **underdamped** motion."},
 {t:"eq",eq:"0 < ζ < 1",cap:"Underdamped motion"}]});

/* 2 · Cause → effect, Guess (same ratio). In a single viscous mode the envelope is exponential, so equal cycle lengths give equal amplitude ratios. */
rc98("mech-vibration-resonance-2",2,{p:[
 {t:"p",x:"A **viscous damper** pushes against motion with a force proportional to speed. It turns mechanical energy into heat."},
 {t:"p",x:"Compare successive peaks on the same side of the rest position. That measures one full cycle each time."},
 {t:"take",x:"With one linear mode and viscous damping, each peak is the same fraction of the peak one cycle before it."}],
 g:{at:2,q:"How does each peak compare with the preceding peak on the same side?",o:[
  ["Same fraction each time",1,"A single mode has an exponentially decaying envelope."],
  ["Same drop each time",0,"A fixed drop would make the envelope a straight line. Viscous free decay gives a fixed fraction."]]}});

/* 3 · Definition → formula, no interaction. The existing figure illustrates counting periods, so no duplicate block. */
rc98("mech-vibration-resonance-2",3,{p:[
 {t:"p",x:"**Logarithmic decrement** $δ$ measures the decay per cycle. Use heights $x_a$ and $x_b$ from an earlier and a later peak on the same side of rest."},
 {t:"eq",eq:"δ = ln(x_a/x_b)/n",cap:"One linear viscous mode. Use matching height units. n counts full cycles. ln is natural log."}]});

/* 4 · Formula → worked example, no interaction. ln(0.00800/0.00200)/5 = 0.2772589; δ/√(4π² + δ²) = 0.0440842. */
rc98("mech-vibration-resonance-2",4,{p:[
 {t:"eq",lab:"From decrement to damping ratio",eq:"ζ = δ/√{4π^2 + δ^2}",cap:"Underdamped linear mode with viscous damping"},
 {t:"giv",rows:[["x_a","8.00","mm"],["x_b","2.00","mm"],["n","5","cycles"]]},
 {t:"step",f:"δ = ln(8.00/2.00)/5",v:"0.2773",u:""},
 {t:"step",f:"ζ from unrounded δ",v:"0.04408",u:"",fin:1},
 {t:"p",x:"Count the intervals between peaks. Both results are unitless. Keep extra digits until the final step."}]});

/* 5 · Measurement checks, Guess (beating can make peaks grow). The decay model requires one mode. */
rc98("mech-vibration-resonance-2",5,{p:[
 {t:"p",x:"Two nearby modes can sometimes add and sometimes cancel. The resulting rise and fall is called **beating**."},
 {t:"take",x:"Reject peaks that grow again during free decay. Their changing heights can reflect beating."},
 {t:"p",x:"Also reject peaks while forcing continues, when the recorder cuts off the tops (**clipping**), or when the signal is as small as the noise."}],
 g:{at:1,q:"Some peaks grow again after forcing stops. For a one-mode damping estimate, do you…",o:[
  ["Keep the interval",0,"That treats peaks from different patterns as though they all belong to one freely decaying mode."],
  ["Reject the interval",1,"The peak ratio can reflect beating instead of damping."]]}});

/* ---------- mech-vibration-resonance-3 · Select isolation mounts ---------- */
/* 0 · Plain text, Fill "amplify" */
rc98("mech-vibration-resonance-3",0,{p:[
 {t:"p",x:"A soft mount can keep a vibrating base from shaking the machine it supports. That reduction in motion is **isolation**."},
 {t:"p",x:"At some speeds, the same mount can [[amplify]] the motion."},
 {t:"p",x:"Near a natural frequency, a small motion of the base can make the machine move farther than the base."}]});

/* 1 · Definition → comparisons, no interaction. Equal amplitudes give TR = 1; one fifth of the base motion gives 1/5 = 0.200. */
rc98("mech-vibration-resonance-3",1,{p:[
 {t:"p",x:"For a sinusoidally moving base, **transmissibility** $TR$ compares the size of the machine's motion with the size of the base motion."},
 {t:"eq",eq:"TR = X/Y",vars:[["X","machine amplitude from a fixed reference"],["Y","base amplitude from the same reference"]],cap:"Use the same units for both amplitudes"},
 {t:"p",x:"$TR < 1$ means isolation. $TR > 1$ means amplification. At $TR = 1$, the amplitudes match."},
 {t:"p",x:"If the machine moves a fifth as far as the base, $TR = 0.200$."}]});

/* 2 · Legend → formula, Fill "higher than". Hz cancels in f/f_n; r > 1 iff f > f_n for positive f_n. */
rc98("mech-vibration-resonance-3",2,{p:[
 {t:"p",x:"The **frequency ratio** $r$ is greater than one when the excitation frequency is [[higher than]] the natural frequency."},
 {t:"vars",vars:[["f","excitation frequency (Hz)"],["f_n","natural frequency without damping (Hz)"],["ζ","damping ratio, a fraction of critical damping"]]},
 {t:"eq",eq:"r = f/f_n",cap:"The hertz cancel, so r is unitless."}]});

/* 3 · Legend → formula, no interaction. Squaring 2ζr gives the damping term in both N and D. */
rc98("mech-vibration-resonance-3",3,{p:[
 {t:"p",x:"Use one linear mass–spring–damper mode with steady sinusoidal base motion. A viscous damper resists motion in proportion to relative speed."},
 {t:"eq",lab:"Shared damping term",eq:"d = 2ζr"},
 {t:"eq",lab:"Numerator and denominator",eq:"N = 1 + d^2"},
 {t:"eq",eq:"D = (1 − r^2)^2 + d^2"},
 {t:"eq",lab:"Displacement transmissibility",eq:"TR = √{N/D}"}]});

/* 4 · Threshold + Guess (natural frequency falls when stiffness drops). N < D iff 1 < (1 − r²)², so r > √2 ≈ 1.414 for r ≥ 0. f_n ∝ √k at fixed mass. */
rc98("mech-vibration-resonance-3",4,{p:[
 {t:"p",x:"The machine moves less than its base when $r > √{2}$. Inertia, the resistance of the mass to a change in motion, keeps it from following the base closely."},
 {t:"take",x:"Softer mounts lower the natural frequency, so $r$ rises at the same forcing frequency."},
 {t:"p",x:"Allow more travel under the load. A softer spring compresses farther under the same weight."}],
 g:{at:1,q:"Keep the machine mass fixed and choose softer mounts. What happens to its natural frequency?",o:[
  ["It falls",1,"A softer spring restores the mass less strongly, so it oscillates more slowly."],
  ["It rises",0,"The frequency ratio can rise because the natural frequency in the denominator falls."]]}});

/* 5 · Trade-off, Guess (TR rises above √2). At fixed r with (1 − r²)² > 1, adding the same positive d² to N and D drives N/D up toward one. */
rc98("mech-vibration-resonance-3",5,{p:[
 {t:"p",x:"More damping lowers the steady response peak near resonance. During startup, forcing may pass through that region."},
 {t:"take",x:"At fixed $r > √{2}$, more damping transmits more motion because the damper couples the machine to the base."},
 {t:"p",x:"Check startup travel and look for stiff bypasses such as pipes or cables that carry vibration around the mounts. Verify the installed motion."}],
 g:{at:1,q:"Hold $r$ fixed above $√{2}$. With more damping, what happens to transmissibility?",o:[
  ["It rises",1,"The damper transmits more of the base motion to the isolated mass."],
  ["It falls",0,"That extends the resonance benefit into the isolation region, where the effect reverses."]]}});

/* ---------- mech-vibration-resonance-4 · Critical shaft speed and support stiffness ---------- */
/* 0 · Terms, no interaction. */
rc98("mech-vibration-resonance-4",0,{p:[
 {t:"p",x:"A rotating shaft can bend and vibrate sideways. This sideways motion is called **lateral** vibration."},
 {t:"p",x:"A **bending mode** is a characteristic shape in which the shaft and its supports vibrate together."},
 {t:"take",x:"Rotation can excite a bending mode and make the shaft shake."}]});

/* 1 · Rule in words, Fill "matches". */
rc98("mech-vibration-resonance-4",1,{p:[
 {t:"p",x:"A bending mode has a **natural frequency**: the rate at which it oscillates freely."},
 {t:"p",x:"At a **lateral critical speed**, a repeating force excites resonance as its frequency [[matches]] a sideways mode’s frequency."},
 {t:"p",x:"Uneven mass around the axis produces a force once per turn. Other sources can repeat a different number of times per turn, called their **excitation order**."}]});

/* 2 · Legend → formula, no interaction. The Campbell diagram draws the crossing. One cycle/turn × 60 s/min converts Hz to rpm. */
rc98("mech-vibration-resonance-4",2,{p:[
 {t:"p",x:"Use the lateral natural frequency $f_n$ in Hz to estimate the critical speed $N_c$ in rpm."},
 {t:"eq",eq:"N_c = 60f_n",cap:"One force cycle per turn, no gyroscopic effects"}]});

/* 3 · Cause and effect, Fill "smaller". */
rc98("mech-vibration-resonance-4",3,{p:[
 {t:"p",x:"Uneven mass applies a rotating sideways force that repeatedly drives the shaft and supports."},
 {t:"p",x:"If the forcing frequency is near a natural frequency, successive pushes can build a large response."},
 {t:"p",x:"Damping dissipates vibration energy. Near resonance, more damping gives a [[smaller]] response for the same forcing."}]});

/* 4 · Compare supports → worked result, Guess (lower). √(200,000/5.00) = 200 rad/s; 200/(2π) = 31.83 Hz; 60·31.83 = 1.910×10³ rpm. */
rc98("mech-vibration-resonance-4",4,{p:[
 {t:"p",x:"The installed rotor rests on bearings and pedestals. A pedestal is the base that supports a bearing."},
 {t:"p",x:"Support **compliance** is how easily the support deflects under load. Added compliance can lower the first bending frequency and its critical speed."},
 {t:"p",x:"For one mode with negligible gyroscopic effects, use stiffness $k$ of 200 kN/m and effective mass $m$ of 5.00 kg."},
 [{t:"step",f:"f_n = √{k/m}/(2π)",v:"31.83",u:"Hz"},{t:"step",f:"N_c = 60f_n",v:"1.910 × 10^3",u:"rpm",fin:1}],
 {t:"p",x:"Use bearing properties at operating temperature and account for gyroscopic effects from shaft spin in the installed model."}],
 g:{at:1,q:"In a simple rotor model, if the pedestals get more flexible at the same effective mass, how does the first critical speed tend to change?",o:[
  ["It falls",1,"Softer supports reduce the restoring stiffness for sideways motion."],
  ["It rises",0,"That is the trend for stiffer supports at the same effective mass."]]}});

/* 5 · Operating range → verification, Guess (check startup). (2400 − 1800)/1800 = 1/3 ≈ 0.3333. */
rc98("mech-vibration-resonance-4",5,{p:[
 {t:"p",x:"Compare predicted crossings and their uncertainty with the full running speed range. State the denominator for any separation ratio."},
 {t:"p",x:"For a critical at 2400 rpm and a running maximum of 1800 rpm, the gap is 0.3333 times that maximum."},
 {t:"p",x:"Running above a critical is **supercritical**. Running below it is **subcritical**."},
 {t:"take",x:"A startup crossing needs a verified transient response (motion while speed changes) and an approved operating procedure."}],
 g:{at:3,q:"The rotor starts from rest and runs supercritically. When must you verify the crossing response?",o:[
  ["During startup",1,"Speed passes through the critical on the way to the running range."],
  ["Only at steady speed",0,"A steady test above the critical misses the crossing on the way up."]]}});

/* ---------- mech-vibration-resonance-5 · Unbalance vectors and correction planes ---------- */
/* 0 · Plain text, Fill "reduce". */
rc98("mech-vibration-resonance-5",0,{p:[
 {t:"p",x:"If the rotor’s mass is offset from the shaft axis, rotation can tug on the bearings."},
 {t:"p",x:"Balancing adjusts the distribution of mass to [[reduce]] those rotating loads."},
 {t:"take",x:"Where you add or remove material matters, both around the shaft and along it."}]});

/* 1 · Legend → formula → value, Fill "more". (0.0120 kg)(0.0400 m) = 4.80×10⁻⁴ kg·m. */
rc98("mech-vibration-resonance-5",1,{p:[
 {t:"vars",vars:[["m","offset mass (kg)"],["e","distance from the shaft axis (m)"],["U","unbalance magnitude (kg·m)"]]},
 {t:"p",x:"The same mass gives [[more]] unbalance farther from the axis."},
 {t:"eq",eq:"U = me",cap:"Magnitude for one offset mass. For the vector, also record its angle around the shaft."},
 {t:"vt",l:"12.0 g at 40.0 mm",v:"4.80 × 10^{-4}",u:"kg·m"}]});

/* 2 · Legend → formula → value, Guess (force quadruples). (2ω)²/ω² = 4; 2π·3000/60 = 314.159 rad/s; (4.80×10⁻⁴)(314.159)² = 47.37 N. */
rc98("mech-vibration-resonance-5",2,{p:[
 {t:"vars",vars:[["F_u","amplitude of rotating force (N)"],["U","unbalance magnitude (kg·m)"],["ω","angular speed (rad/s)"]]},
 {t:"eq",eq:"F_u = Uω^2",cap:"Fixed unbalance, steady rotation"},
 {t:"p",x:"Doubling speed gives four times the force. At 3000 rpm, 50.0 turns/s times $2π$ rad per turn gives about 314 rad/s."},
 {t:"vt",l:"At that speed, from the unbalance above",v:"F_u = 47.37",u:"N"}],
 g:{at:1,q:"If you double angular speed and keep the same unbalance, what happens to the rotating force?",o:[
  ["It quadruples",1,"Speed enters as a square, so doubling it multiplies force by four."],
  ["It doubles",0,"That would follow from a linear relation. Each speed factor doubles in the square."]]}});

/* 3 · Cause and effect, Guess (the measured phase also depends on the machine response). */
rc98("mech-vibration-resonance-5",3,{p:[
 {t:"p",x:"Keeping off-axis mass on a circle requires inward acceleration. The rotor exerts a matching rotating force on its supports."},
 {t:"p",x:"**Phase** marks where a vibration cycle is relative to a reference mark on the rotor. The bearings and supports can shift that phase."},
 {t:"take",x:"Use a measured or validated response to relate the vibration phase to the unbalance angle."}],
 g:{at:1,q:"Can you identify the heavy spot from the measured vibration’s timing alone?",o:[
  ["Yes, directly",0,"That assumes the sensor motion follows the force with no phase shift."],
  ["No, you need the response",1,"The machine changes the motion’s magnitude and timing relative to the force."]]}});

/* 4 · Worked example, no interaction. (4.80×10⁻⁴ kg·m)/(0.0600 m) = 8.00×10⁻³ kg = 8.00 g. */
rc98("mech-vibration-resonance-5",4,{p:[
 {t:"p",x:"A **correction plane** is a slice along the shaft where a weight can be fitted. Here one plane suffices and the unbalance vector is known."},
 {t:"vars",vars:[["U","unbalance magnitude (kg·m)"],["r_c","available correction radius (m)"],["m_c","added correction mass (kg)"]]},
 {t:"eq",eq:"m_c = U/r_c",cap:"Add the mass opposite the known unbalance angle"},
 {t:"p",x:"Use 60.0 mm radius and the unbalance from earlier. Verify vibration after fitting the correction."},
 {t:"step",f:"m_c = U/r_c",v:"8.00",u:"g",fin:1}]});

/* 5 · Compare planes, no interaction. LFIG17 shows force cancellation and the remaining couple. */
rc98("mech-vibration-resonance-5",5,{p:[
 {t:"p",x:"Equal, opposite forces in separate planes form a **couple**: they rock the rotor end to end with no net push."},
 {t:"take",x:"Use two planes when correcting both net unbalance and a couple."}]});

/* ---------- mech-vibration-resonance-6 · Two-plane influence balancing and acceptance ---------- */
/* 0 · Process overview, no interaction. */
rc98("mech-vibration-resonance-6",0,{p:[
 {t:"p",x:"A **correction plane** is a location along the shaft where you can add balance weight."},
 {t:"p",x:"For a trial, add a known mass at a known radius and angle in one plane."},
 {t:"take",x:"Measure how the trial changes the vibration at each end of the rotor."}]});

/* 1 · Definitions → worked example, Fill "divided by". B=0 ⇒ x=−2y; A=−3y=−3.00 µm ⇒ y=1.00 g, x=−2.00 g. */
rc98("mech-vibration-resonance-6",1,{p:[
 {t:"p",x:"A complex vibration vector stores **amplitude** (size) and **phase** (angle from a shaft mark)."},
 {t:"p",x:"At fixed speed and sensor setup, an **influence coefficient** is the vibration change [[divided by]] the trial unbalance."},
 {t:"p",x:"At fixed radii, the coefficients below are 1 or 2 µm/g. Use signed masses $x$ and $y$ in grams for changes $A = −3.00$ µm and $B = 0$ µm."},
 [{t:"step",f:"B = x + 2y = 0",v:"x = −2y",u:""},{t:"step",f:"A = 2x + y = −3y",v:"y = 1.00",u:"g"}],
 {t:"step",f:"x = −2y",v:"−2.00",u:"g",fin:1}]});

/* 2 · Plain text, no interaction. LFIG17 draws how both planes influence both bearings. */
rc98("mech-vibration-resonance-6",2,{p:[
 {t:"p",x:"Either plane can change both bearing readings. This is **cross-coupling**."},
 {t:"take",x:"Solve both responses together and keep their phase as well as their amplitude."}]});

/* 3 · Process chain, Guess (remove the first trial before measuring the second against the original baseline). */
rc98("mech-vibration-resonance-6",3,{p:[
 {t:"p",x:"The **baseline** is the original reading at each bearing. Record amplitude and phase before adding a trial."},
 {t:"p",x:"For a common baseline, measure each trial by itself. Remove the first before the second unless the calculation accounts for it."},
 {t:"take",x:"Remove trial weights before installing the computed correction, or include their effect in the final correction."}],
 g:{at:1,q:"Both trials will be compared with the original baseline. What should you do with the first trial weight before measuring the second?",o:[
  ["Remove it",1,"That isolates the vibration change due to the second plane."],
  ["Leave it",0,"Without accounting for it, the second reading would include both trials."]]}});

/* 4 · Cause and effect, Guess (small measurement errors can shift the correction). */
rc98("mech-vibration-resonance-6",4,{p:[
 {t:"p",x:"An **influence column** is one plane’s set of coefficients across the sensors. Two columns are nearly dependent if one looks like a scaled and phase-shifted copy of the other."},
 {t:"p",x:"Similar response patterns make the planes hard to distinguish. Small measurement errors can then produce large changes in the calculated weights."},
 {t:"take",x:"Check trial signal size, phase repeatability, sensor placement and correction-plane choice before trusting a large result."}],
 g:{at:1,q:"If the planes produce nearly the same pattern at the sensors, how do small measurement errors affect the calculated correction?",o:[
  ["They can have a large effect",1,"The calculation can trade one plane’s correction against the other."],
  ["They have little effect",0,"Similar response patterns make the planes harder to tell apart, which magnifies error."]]}});

/* 5 · Conditions → formula → value, Fill "same". For a sine wave, average sin²=1/2; 4.00/√2=2.828 mm/s. */
rc98("mech-vibration-resonance-6",5,{p:[
 {t:"p",x:"Record each required sensor location and direction, speed and load. Match the limit’s units and use the [[same]] amplitude convention."},
 {t:"p",x:"**Peak** is the largest magnitude. **RMS** is the square root of the mean square. A peak displacement is a different quantity from RMS velocity."},
 {t:"eq",eq:"v_{RMS} = v_{peak}/√{2}",cap:"Velocity for pure sinusoidal vibration only"},
 {t:"vt",l:"Peak velocity 4.00 mm/s",v:"2.828",u:"mm/s"},
 {t:"p",x:"A low-speed balance alone cannot establish how a flexible rotor responds at operating speed."}]});

/* ---------- mech-shear-1 · Pins and bolts in shear ---------- */
/* 0 · Plain text, no interaction. Symmetric load sharing on a pin gives F/2 on each of two cuts. */
rc98("mech-shear-1",0,{p:[
 {t:"p",x:"Pull two joined plates sideways in opposite directions. They push on the pin where they meet."},
 {t:"p",x:"The pin can fail across that cut. A joint can spread the same force over two cuts through the pin instead of one."}]});

/* 1 · Rule in words → formula, Fill "parallel". A circle of radius d/2 has A = π(d/2)² = πd²/4. */
rc98("mech-shear-1",1,{p:[
 {t:"p",x:"The force creating **shear stress** acts [[parallel]] to the surface it acts on."},
 {t:"eq",eq:"τ_{avg} = V/A",cap:"Average across one shear plane",vars:[["τ_{avg}","average shear stress"],["V","sideways force across that cut"],["A","area resisting the force"]]},
 {t:"p",x:"If a cut crosses a round pin of diameter $d$, the area is $πd^2/4$."}]});

/* 2 · Compare joints, Guess. Symmetry puts F/2 on each double-shear plane, so τ_avg = F/(2A). */
rc98("mech-shear-1",2,{p:[
 {t:"p",x:"A **lap joint** overlaps two plates, so the pin takes the total force $F$ across one cut. This is single shear."},
 {t:"p",x:"A **clevis** is a fork with a plate between its ears. A centered load puts half of $F$ across each cut. This is double shear."},
 {t:"eq",eq:"τ_{avg} = F/(2A)",cap:"Symmetric double shear, with area A per cut"}],
 g:{at:1,q:"If both ears of a symmetric clevis share the load evenly, how much force crosses each cut through its pin?",o:[
  ["Half the total force",1,"The two cuts carry equal shares, which add to the total force."],
  ["One third of the total force",0,"There are three plates, but the load crosses two cuts through the pin."],
  ["All of the total force",0,"That is the single-shear result. Two equal load paths each carry only half."]]}});

/* 3 · Worked comparison, no interaction. π·10²/4 = 78.54 mm²; 8,000/78.54 = 101.9 MPa; 4,000/78.54 = 50.93 MPa. */
rc98("mech-shear-1",3,{p:[
 {t:"p",x:"Compare a 10.0 mm pin carrying 8.00 kN in single shear and symmetric double shear."},
 {t:"step",f:"A = πd^2/4",v:"78.54",u:"mm^2"},
 {t:"step",f:"F/A",v:"101.9",u:"MPa"},
 {t:"step",f:"F/(2A)",v:"50.93",u:"MPa",fin:1},
 {t:"p",x:"With the same pin and load, double shear halves the average stress. That's why a forked joint is useful on a heavily loaded pivot."}]});

/* 4 · Definition → application, Fill "average". In round-section beam theory the center stress is 4/3 of V/A; bearing's projected area for diameter d and plate thickness t is d·t. */
rc98("mech-shear-1",4,{p:[
 {t:"p",x:"The stress from $V/A$ is an [[average]] across the cut."},
 {t:"p",x:"The local stress can be higher. In the ideal round beam model it peaks at mid-depth, away from the outside faces."},
 {t:"p",x:"Also check **bearing**, the contact pressure on a hole wall. Average bearing stress uses the contact force divided by pin diameter times plate thickness."}]});

/* 5 · Shop language → takeaway, Guess. At fixed load split, doubling d and t gives A_shear ∝ d² → 4A_shear and A_bearing ∝ d·t → 4A_bearing. Both average stresses become one quarter. */
rc98("mech-shear-1",5,{p:[
 {t:"p",x:"“The pin passes the double-shear check. Check bearing on the clevis holes too.”"},
 {t:"take",x:"Both averages fall to a quarter of their original values. The pin area grows with $d^2$ and the projected hole area with diameter times thickness."},
 {t:"p",x:"Check both failure modes. A pin can pass a shear check while pressure at a hole deforms its plate."}],
 g:{at:1,q:"Double the pin diameter and plate thickness. Keep the force and load split fixed. Which average stress falls by a larger fraction?",o:[
  ["Hole bearing stress",0,"Bearing area quadruples, but the pin's cross-section quadruples too."],
  ["Pin shear stress",0,"The pin's cross-section quadruples. The projected bearing area also quadruples because both dimensions double."],
  ["They fall by the same fraction",1,"Both resisting areas quadruple under the same force."]]}});

/* ---------- mech-shear-2 · Transverse shear in beams ---------- */
/* 0 · Plain text, no interaction. */
rc98("mech-shear-2",0,{p:[
 {t:"p",x:"Load a beam sideways and imagine it as a stack of thin layers. The load makes the layers try to slide past each other."},
 {t:"take",x:"That sliding action creates **transverse shear stress**. In a rectangular section it is strongest at mid-depth."}]});

/* 1 · Legend → formula, Fill "inversely". */
rc98("mech-shear-2",1,{p:[
 {t:"vars",vars:[["V","shear force through the section"],["I","whole section's second area moment about the neutral axis"],["b","width where you check the stress"]]},
 {t:"p",x:"The **neutral axis** is where bending produces no lengthwise stretch. $Q$ is the area beyond the cut times its center's distance from that axis."},
 {t:"p",x:"Hold $V$, $Q$ and $I$ fixed. Shear stress then varies [[inversely]] with the width at the cut."},
 {t:"eq",eq:"τ = VQ/(Ib)",cap:"Elastic beam theory, away from concentrated loads"}]});

/* 2 · Compare levels, Guess. For a rectangle Q = b(h²/8 − y²/2); at y = ±h/2 it is zero, at y = 0 it is largest. */
rc98("mech-shear-2",2,{p:[
 {t:"p",x:"In a rectangular beam the width is constant. To find $Q$ at any height, take the area above that cut and multiply by its center's distance from the neutral axis."},
 {t:"take",x:"At the top face there is no area above the cut. $Q$ and the shear stress are zero there."},
 {t:"p",x:"At the bottom, the entire section's area balances about the neutral axis, so $Q$ is zero again. The largest $Q$ is at the neutral axis."}],
 g:{at:1,q:"At the free top face of a rectangular beam, how large is the transverse shear stress?",o:[
  ["Zero",1,"No area lies above that cut, and a free face has no applied sliding force."],
  ["Greater than zero",0,"That assumes some load transfers across the free face. The layers above the cut have vanished."]]}});

/* 3 · Formula → worked value, no interaction. Rectangle: (bh²/8)/(bh³/12·b) = 1.5/A. Circle: (2r³/3)/(πr⁴/4·2r) = 4/(3A). 50·100 = 5,000 mm²; 1.50·10,000/5,000 = 3.00 MPa. */
rc98("mech-shear-2",3,{p:[
 {t:"p",x:"With cross-sectional area $A$, the average shear stress is $V/A$. For these solid sections, elastic beam theory gives a larger peak at mid-depth."},
 {t:"vt",l:"Rectangle (parabolic profile)",v:"1.50 V/A",u:""},
 {t:"vt",l:"Solid round",v:"4V/(3A)",u:""},
 {t:"p",x:"A 50.0 mm by 100 mm rectangle has area 5,000 mm². With 10.0 kN of shear force, its average is 2.00 MPa and its peak is 3.00 MPa."}]});

/* 4 · Shape → load path, Guess. For a thin web with near-uniform shear, V ≈ τ A_web. */
rc98("mech-shear-2",4,{p:[
 {t:"p",x:"The **web** is the thin upright plate in an I-beam. The **flanges** are its wide top and bottom plates."},
 {t:"take",x:"The web carries most of the vertical shear. The flanges carry most of the bending through tension and compression."},
 {t:"p",x:"For a thin web, its small width makes $VQ/(Ib)$ large there. A first estimate of peak shear is $V$ divided by the web area."}],
 g:{at:1,q:"In a typical I-beam, which part carries most of the vertical shear force?",o:[
  ["The web",1,"Shear stress stays comparatively high along the tall, narrow web."],
  ["The flanges",0,"The flanges sit far from the neutral axis, which helps them resist bending. Vertical shear is concentrated in the web."]]}});

/* 5 · Shop language → comparison, Fill "greater than". Thin round tube at neutral axis: Q ≈ 2r²t, I ≈ πr³t, b ≈ 2t, A ≈ 2πrt, so τ_max ≈ V/(πrt) ≈ 2V/A. */
rc98("mech-shear-2",5,{p:[
 {t:"p",x:"“The web carries the shear” identifies the main shear path in an I-beam. The peak stress still depends on the section's shape."},
 {t:"p",x:"For transverse shear on a thin-walled round tube, the peak is [[greater than]] the average $V/A$."},
 {t:"vt",l:"Thin round tube peak",v:"≈ 2V/A",u:""},
 {t:"rel",x:"Use the factor for the shape you're checking. A solid rectangle peaks at $1.50 V/A$."}]});

/* ---------- mech-mohr-1 · Mohr’s circle ---------- */
/* 0 · Terms, Fill "change with" */
rc98("mech-mohr-1",0,{p:[
 {t:"p",x:"Imagine a tiny square around a point in a loaded part. This **stress element** shows what acts across its faces."},
 {t:"p",x:"**Normal stress** acts perpendicular to a face. Call it $σ_x$ on the x face and $σ_y$ on the y face."},
 {t:"p",x:"**Shear stress** acts along the face. Let $τ_{xy}$ be shear in the y direction on the x face."},
 {t:"take",x:"The stress components [[change with]] the square's orientation. You're looking at the same load on differently angled faces."}]});

/* 1 · Coordinates → geometry, no interaction. X and Y have equal and opposite offsets about their midpoint. */
rc98("mech-mohr-1",1,{p:[
 {t:"p",x:"**Mohr's circle** collects the normal and shear stress pairs for every orientation in the x–y plane. Normal stress is horizontal and shear is vertical."},
 {t:"eq",lab:"x face",eq:"X = (σ_x, τ_{xy})"},
 {t:"eq",eq:"Y = (σ_y, −τ_{xy})"},
 {t:"take",x:"Draw the line from $X$ to $Y$. It is a **diameter**, a straight line across the circle through its center."}]});

/* 2 · Geometry → formula, no interaction. C is the midpoint. R is the hypotenuse with legs half the normal-stress difference and the shear stress. */
rc98("mech-mohr-1",2,{p:[
 {t:"p",x:"The center $C$ is the average normal stress. The signed gap $d$ from the center to point $X$ is half the normal-stress difference. Here $τ$ is the x-face shear."},
 {t:"eq",lab:"Center",eq:"C = (σ_x + σ_y)/2"},
 {t:"eq",lab:"Horizontal gap",eq:"d = (σ_x − σ_y)/2"},
 {t:"eq",lab:"Radius from center to X",eq:"R = √{d^2 + τ^2}",cap:"Use the same stress units on both axes."}]});

/* 3 · Geometry → formulas, Guess (zero shear). σ runs C − R to C + R; the vertical coordinate spans −R to +R. */
rc98("mech-mohr-1",3,{p:[
 {t:"p",x:"For a circle with nonzero radius, follow it to the left and right ends, where it meets the horizontal axis."},
 {t:"p",x:"Shear is zero at both crossings. The normal stresses there are the **principal stresses**, $σ_1$ on the right and $σ_2$ on the left."},
 {t:"eq",eq:"σ_1 = C + R"},
 {t:"eq",eq:"σ_2 = C − R"},
 {t:"p",x:"The largest in-plane shear magnitude is $R$. The top and bottom have signed shear $+R$ and $−R$."}],
 g:{at:1,q:"What is the shear stress where the circle crosses the horizontal axis?",o:[
  ["Zero",1,"Shear is the vertical coordinate. The horizontal axis has no vertical offset."],
  ["The radius",0,"The radius is the shear magnitude at the top and bottom of the circle."]]}});

/* 4 · Rule → angle, Fill "twice". 2 × 30° = 60°. Half of atan2(2τ_xy, σ_x − σ_y) keeps the correct quadrant. */
rc98("mech-mohr-1",4,{p:[
 {t:"p",x:"Rotate the x face by an angle $θ$. On Mohr's circle the angle swept from $X$ is [[twice]] that angle in magnitude."},
 {t:"eq",lab:"Angle magnitudes",eq:"30° → 60°"},
 {t:"p",x:"The direction $θ_p$ of $σ_1$ is measured from the x axis. With the shear convention on these cards, use **atan2**, the arctangent that uses both signs to pick the direction."},
 {t:"eq",eq:"2θ_p = atan2(τ_{xy}, d)",cap:"d is the signed gap defined earlier. For R = 0, every orientation is principal."}]});

/* ---------- mech-fluids-re-1 · Reynolds number: laminar or turbulent ---------- */
/* 0 · Plain text, no interaction. */
rc98("mech-fluids-re-1",0,{p:[
 {t:"p",x:"Watch a dye streak in flowing water. It may stretch into a smooth thread or break up into swirling patches."},
 {t:"take",x:"The Reynolds number helps predict which kind of motion to expect."}]});

/* 1 · Legend → formula, no interaction. ρVD/μ reduces to VD/ν since ν = μ/ρ; both VD and ν have units m²/s. */
rc98("mech-fluids-re-1",1,{p:[
 {t:"p",x:"**Inertia** is a fluid's tendency to keep moving. **Viscosity** measures how strongly neighboring layers resist sliding past each other."},
 {t:"vars",vars:[["ρ","density (kg/m^3)"],["V","mean speed (m/s)"],["D","pipe diameter (m)"],["μ","dynamic viscosity (Pa·s)"],["ν","kinematic viscosity, μ/ρ (m^2/s)"]]},
 {t:"eq",lab:"Reynolds number",eq:"Re = ρVD/μ = VD/ν",cap:"round pipe; inertia relative to viscosity; no units"}]});

/* 2 · Regime comparison, Fill “between”. Approximate empirical boundaries of Re = 2,300 and Re = 4,000 for smooth round pipes. */
rc98("mech-fluids-re-1",2,{p:[
 {t:"p",x:"In a straight, smooth, round pipe away from the entrance, the transitional band lies [[between]] the smooth and turbulent regimes."},
 [{t:"pc",l:"Laminar",c:"fluid slips in smooth layers",v:"Re ≲ 2,300"},
  {t:"pc",l:"Turbulent",c:"fluctuating, swirling eddies",v:"Re ≳ 4,000"}],
 {t:"p",x:"Transitional flow can switch between the two. Disturbances can trigger turbulence sooner, and quiet flows can remain laminar longer."}]});

/* 3 · Cause → effect, Guess (turbulent spreads dye faster). Laminar wall stress τ = 8μV/D gives Darcy f = 8τ/(ρV²) = 64/Re. */
rc98("mech-fluids-re-1",3,{p:[
 {t:"p",x:"Imagine injecting a narrow streak of dye into a pipe. In both regimes, moving fluid carries it downstream."},
 {t:"take",x:"Turbulent eddies carry dye across the flow faster. They also mix heat across the pipe faster."},
 {t:"p",x:"The Darcy friction factor $f$ describes resistance to pipe flow. In fully developed laminar flow in a round pipe, $f = 64/Re$."},
 {t:"p",x:"Turbulent friction depends on $Re$ and wall roughness, and is higher at the same $Re$ where the regimes overlap. In transition, friction is hard to predict."}],
 g:{at:1,q:"Which regime typically spreads the dye sideways faster?",o:[
  ["Laminar",0,"Smooth layers leave molecular diffusion to do most of the sideways mixing."],
  ["Turbulent",1,"Swirling eddies carry dye across the pipe as well as down it."]]}});

/* 4 · Worked example, no interaction. Water at 20 °C has ν ≈ 1.00×10⁻⁶ m²/s; D = 20 mm = 0.0200 m; Re = 1.00·0.0200/10⁻⁶ = 20,000. */
rc98("mech-fluids-re-1",4,{p:[
 {t:"giv",lab:"Water at 20 °C in a round pipe",rows:[["V","1.00","m/s"],["D","20.0","mm"],["ν","1.00×10^{-6}","m^2/s"]]},
 {t:"p",x:"Convert the diameter to metres: $D = 0.0200$ m."},
 {t:"step",f:"Re = VD/ν",v:"20,000",u:"",fin:1},
 {t:"take",x:"Well above the transitional band, this flow is turbulent. The same regime is common in everyday water and air flows."}]});

/* 5 · Scaling, Guess (halves). V = 4Q/(πD²) from Q = AV and A = πD²/4. Re = 4ρQ/(πμD); doubling D quarters V, so VD halves. */
rc98("mech-fluids-re-1",5,{p:[
 {t:"p",x:"Send the same volume per second $Q$ of the same fluid through a round pipe of a different diameter."},
 {t:"take",x:"A pipe with twice the diameter has half the Reynolds number."},
 {t:"eq",eq:"V = 4Q/(πD^2)",cap:"speed is flow rate divided by circular area"},
 {t:"eq",eq:"Re = 4ρQ/(πμD)",cap:"at fixed flow rate and fluid properties"},
 {t:"p",x:"Other shapes have their own regime limits and reference length. Use the flowwise length of a plate or the chord from a wing's front to back edge."}],
 g:{at:1,q:"If the inner diameter doubles at the same flow rate, how does Reynolds number change?",o:[
  ["It doubles",0,"That tracks the change in diameter but assumes the mean speed stays fixed."],
  ["It halves",1,"Speed falls to one quarter in the larger area. Diameter doubles, so their product halves."],
  ["It drops to one quarter",0,"That tracks speed alone. The doubled diameter also multiplies Reynolds number."]]}});

try{NEWS.unshift({d:"2026-11-27",t:["Calculus III and Differential equations and Linear algebra and Mechanical cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b118",k:"cx118",t:"Codex: Calculus III, Differential equations, Linear algebra, Mechanical",c:"Calculus III and Differential equations and Linear algebra and Mechanical cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word.",go:["lesson","calc3-geometry-1"]})}catch(e){}

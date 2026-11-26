/* ===== Numerical Methods reveal cards (staged against b107) =====
   1. All 30 cards of numm-opt-1 … numm-opt-4 and numm-reg-1 as reveal cards (rc98, format in v98.js).
      Guess on 9 cards (opt1·0, opt1·3, opt2·2, opt2·5, opt3·2, opt3·4, opt4·0, reg1·0, reg1·5).
      Fill on 9 (opt1·1, opt1·2, opt2·0, opt3·1, opt3·5, opt4·1, opt4·3, reg1·3, reg1·4), 12 with neither. */

/* ---------- numm-opt-1 · Backtracking and Armijo ---------- */
/* 0 · Process chain, Guess (shorten the step). */
rc98("numm-opt-1",0,{p:[
 {t:"p",x:"You have a direction to move in and a trial step along it. The trial does not improve the objective enough."},
 {t:"take",x:"Backtracking shortens the step along the same direction and tries again."},
 {t:"p",x:"Accept the first trial that improves the objective enough."}],
 g:{at:1,q:"What does backtracking try next?",o:[
  ["A shorter step",1,"Moving less far can keep the trial in the region where the direction helps."],
  ["A longer step",0,"Moving farther can overshoot. Backtracking reduces the step along the chosen direction."]]}});

/* 1 · Legend → formula, Fill "negative". ∇fᵀ(−∇f) = −‖∇f‖² < 0 for ∇f ≠ 0. */
rc98("numm-opt-1",1,{p:[
 {t:"vars",lab:"At the current point",vars:[["f","smooth, dimensionless objective"],["x","fixed current point"],["∇f","gradient of f at x"],["p","trial direction"]]},
 {t:"p",x:"Along the negative gradient, the directional slope is [[negative]] whenever the gradient is nonzero."},
 {t:"eq",lab:"Steepest descent",eq:"p = −∇f"},
 {t:"eq",lab:"Directional slope",eq:"∇f^T p = −‖∇f‖^2",cap:"Zero only when the gradient vanishes."}]});

/* 2 · Rule in words → formula, Fill "sufficiently". The requested drop is μ₁ times the linear prediction, with 0 < μ₁ < 1. */
rc98("numm-opt-1",2,{p:[
 {t:"p",x:"Armijo accepts a step only when the objective drops [[sufficiently]] compared with the drop predicted by the local slope."},
 {t:"vars",vars:[["f","objective"],["x, p","fixed base point and descent direction"],["α","positive trial step size"],["μ_1","required fraction of the predicted drop"],["∇f","gradient at the base point"]]},
 {t:"eq",eq:"f(x + αp) ≤ f(x) + μ_1 α ∇f^T p",cap:"All quantities are dimensionless. 0 < μ₁ < 1."}]});

/* 3 · Rule in words → formula, Guess (eventually accepted). ρ^k α tends to 0 for 0 < ρ < 1. Local drop divided by predicted drop tends to 1 > μ₁. */
rc98("numm-opt-1",3,{p:[
 {t:"p",x:"Start with a smooth objective and a direction with negative slope. Keep the base point and direction fixed."},
 {t:"eq",lab:"After a rejection",eq:"α ← ρ α",cap:"α is the trial step and 0 < ρ < 1 is a fixed shrink factor."},
 {t:"take",x:"A small enough step passes Armijo. Close to the base point, the actual drop approaches the drop predicted by the slope."}],
 g:{at:2,q:"If we keep shrinking the step, will a trial pass?",o:[
  ["Yes, eventually",1,"Near the base point the drop approaches the linear prediction. Armijo asks for only a fraction of it."],
  ["It may never pass",0,"That can happen without a descent direction. A negative slope guarantees sufficient decrease for small positive steps."]]}});

/* 4 · Worked example. f(1,2)=2+4=6, ∇f=(4,4), slope=−32. Trial (−3,−2) gives 18+4=22. Bound=6−0.0032=5.9968. */
rc98("numm-opt-1",4,{p:[
 {t:"p",x:"Use $f(x)=2x_1^2+x_2^2$ with coordinates $x_1,x_2$ and start at $(1,2)$. All values are dimensionless."},
 {t:"p",x:"The starting value is $6$. The negative gradient gives direction $p=(−4,−4)$ and slope $−32$."},
 {t:"step",f:"f((1,2) + 1 · p)",v:"22",u:""},
 {t:"step",f:"6 + 0.0001 · 1 · (−32)",v:"5.9968",u:""},
 {t:"take",x:"Reject step size $1$. The trial exceeds the Armijo bound for decrease fraction $0.0001$."}]});

/* 5 · Worked example. α=1·0.5=0.5, trial (−1,0) gives 2, bound=6−0.0016=5.9984. Exact α=8/24=1/3. */
rc98("numm-opt-1",5,{p:[
 {t:"p",x:"Keep the same quadratic, base point and direction. The base value stays $6$ and the slope stays $−32$."},
 {t:"p",x:"Use shrink factor $0.5$ to halve the rejected step size from $1$ to $0.5$."},
 {t:"step",f:"f((1,2) + 0.5 · p)",v:"2",u:""},
 {t:"step",f:"6 + 0.0001 · 0.5 · (−32)",v:"5.9984",u:""},
 {t:"take",x:"Accept. The trial is below the bound. Backtracking only needs sufficient decrease."}]});

/* ---------- numm-opt-2 · Gradient descent, Newton and Adam ---------- */
/* 0 · Plain text + compare, Fill "rescales". */
rc98("numm-opt-2",0,{p:[
 {t:"p",x:"The gradient tells you how the objective changes near your current point."},
 {t:"p",x:"Gradient descent scales the negative gradient as a whole. Newton uses curvature to choose its step."},
 {t:"take",x:"Adam [[rescales]] the move separately in each coordinate."},
 {t:"p",x:"Adam divides each coordinate's gradient average by a scale built from that coordinate's squared gradients."}]});

/* 1 · Legend → formula, no interaction. ∂f/∂x₁=2ax₁, ∂f/∂x₂=2x₂, H=diag(2a,2). */
rc98("numm-opt-2",1,{p:[
 {t:"eq",lab:"Fixed quadratic",eq:"f(x) = ax_1^2 + x_2^2",cap:"a > 0 sets curvature along coordinate x₁."},
 {t:"vars",vars:[["x","current coordinate vector"],["g","gradient of f at x"],["H","Hessian, the matrix of second derivatives"],["α","positive step size"],["x_{new}","next point"]]},
 {t:"eq",lab:"Gradient descent",eq:"x_{new} = x − αg",cap:"All quantities are dimensionless."}]});

/* 2 · Rule in words → formula, Guess (one step). For f=xᵀHx/2, g=Hx, so p=−x and x+p=0. */
rc98("numm-opt-2",2,{p:[
 {t:"p",x:"For this positive-definite quadratic, the local quadratic model is the whole objective."},
 {t:"eq",lab:"Full Newton step",eq:"Hp = −g",cap:"H is the Hessian, g is the gradient and p is the step."},
 {t:"take",x:"Add $p$ to the current point. The full Newton step reaches the unique minimum in one move."}],
 g:{at:2,q:"Where does that full step land?",o:[
  ["At the minimum",1,"The quadratic model is exact, and solving the Newton system minimizes it."],
  ["Partway there",0,"A shortened step could stop partway. A full step minimizes the exact quadratic."]]}});

/* 3 · Worked example. g=(4,4). GD: (1,2)−0.1(4,4)=(0.6,1.6). H diagonal=(4,2), so p=(−4/4,−4/2)=(−1,−2). */
rc98("numm-opt-2",3,{p:[
 {t:"p",x:"Set $a=2$ in the fixed quadratic and start at $x=(1,2)$. The gradient $g$ is $(4,4)$."},
 {t:"step",f:"x − 0.1g",v:"(0.6, 1.6)",u:""},
 {t:"p",x:"The Hessian is diagonal with entries $4$ and $2$. Divide the negative gradient by those entries to get Newton's step $p=(−1,−2)$."},
 {t:"step",f:"x + p",v:"(0, 0)",u:"",fin:1},
 {t:"p",x:"Newton lands exactly because the model is quadratic and the Hessian is nonsingular."}]});

/* 4 · Legend → formula → worked step. First bias correction gives v̂=(4,4), ŝ=(16,16). Each update is −0.3·4/√16=−0.3. */
rc98("numm-opt-2",4,{p:[
 {t:"vars",vars:[["x, x_{new}","current and next points"],["α_A","Adam step size"],["v̂","bias-corrected gradient average"],["ŝ","bias-corrected squared-gradient average"],["ε","positive denominator stabilizer"]]},
 {t:"eq",lab:"Adam, per coordinate",eq:"x_{new} = x − α_A v̂ / (√{ŝ} + ε)",cap:"All quantities are dimensionless."},
 {t:"p",x:"Start with zero moments at $(1,2)$, where the gradient is $(4,4)$. After bias correction, each numerator is $4$ and each squared-gradient average is $16$."},
 {t:"step",f:"(1,2) − 0.3 (1,1)",v:"(0.7, 1.7)",u:"",fin:1},
 {t:"p",x:"This example neglects $ε$ because it is small beside $√{16}$."}]});

/* 5 · Rule in words → formula, Guess (directions can differ). Factors 1−2aα and 1−2α must have magnitude <1; a≥1 gives 0<α<1/a. */
rc98("numm-opt-2",5,{p:[
 {t:"p",x:"For $f(x)=ax_1^2+x_2^2$ with fixed $a ≥ 1$, gradient descent converges from every start within this step-size range."},
 {t:"eq",lab:"Gradient descent",eq:"0 < α < 1/a",cap:"α is the fixed step size. Each coordinate must contract."},
 {t:"p",x:"Adam can point in a different direction. With zero initial moments and negligible stabilizer, each nonzero gradient component becomes its sign in the first step."},
 {t:"take",x:"The directions agree when all nonzero gradient components have the same magnitude."}],
 g:{at:2,q:"Must Adam's first step point along the negative gradient?",o:[
  ["Yes",0,"A shared scale would preserve direction. Adam divides each coordinate by its own scale."],
  ["No",1,"Separate scales can change the ratio between components and turn the direction."]]}});

/* ---------- numm-opt-3 · KKT conditions ---------- */
/* 0 · Plain text, no interaction. */
rc98("numm-opt-3",0,{p:[
 {t:"p",x:"A constrained optimum has to be feasible. Your best move in the unconstrained problem might point outside the allowed region."},
 {t:"take",x:"At a boundary optimum, there is no feasible direction that improves the objective to first order."}]});

/* 1 · Terms → formula, Fill "active". At the boundary x₁=c, so g=c−c=0. */
rc98("numm-opt-3",1,{p:[
 {t:"p",x:"Minimize $f=(x_1+1)^2+x_2^2$ for coordinates $x_1,x_2$. A fixed upper bound $c$ limits $x_1$."},
 {t:"p",x:"The constraint is [[active]] where the point touches that bound."},
 {t:"eq",lab:"Feasible points",eq:"g = x_1 − c ≤ 0",cap:"g measures the signed offset from the boundary. All quantities are dimensionless."},
 {t:"p",x:"Inside the feasible region, $g<0$. On the boundary, $g=0$."}]});

/* 2 · Legend → conditions, Guess (inactive means zero multiplier). A nonzero g forces σ=0 in σg=0. */
rc98("numm-opt-3",2,{p:[
 {t:"vars",vars:[["f, g","differentiable objective and upper-bound constraint"],["∇f, ∇g","their gradients"],["σ","dimensionless multiplier for g"]]},
 {t:"eq",lab:"Stationarity",eq:"∇f + σ ∇g = 0"},
 {t:"eq",lab:"Feasibility and sign",eq:"g ≤ 0,   σ ≥ 0"},
 [{t:"eq",lab:"Complementary slackness",eq:"σg = 0"},
  {t:"p",x:"An inactive constraint has $g<0$, so its multiplier must be zero."}]],
 g:{at:3,q:"Interior point. What must the multiplier be at a KKT point?",o:[
  ["Zero",1,"The constraint has slack, so only a zero multiplier makes the product zero."],
  ["Positive",0,"A positive multiplier can occur at an active constraint. In the interior it would make the product nonzero."]]}});

/* 3 · Worked compare. c=1: ∂f/∂x₁ at x₁=1 is 2(1+1)=4, so σ=−4. At x₁=−1, ∇f=0 and g=−1−1=−2. */
rc98("numm-opt-3",3,{p:[
 {t:"p",x:"Fix the upper bound at $c=1$. Compare the boundary point $(1,0)$ with the unconstrained minimum $(−1,0)$."},
 {t:"pc",l:"Boundary point",c:"Stationarity requires 4 + σ = 0.",v:"σ = −4",warn:1},
 {t:"pc",l:"Interior point",c:"Zero objective gradient and g = −2.",v:"σ = 0"},
 {t:"take",x:"The boundary point fails the multiplier sign test. The interior point satisfies all four conditions."}]});

/* 4 · Plain text + Guess (inward helps). At (1,0), the inward direction (−1,0) has slope −4. */
rc98("numm-opt-3",4,{p:[
 {t:"p",x:"A candidate lies on the upper bound for $x_1$. The stationary multiplier comes out negative."},
 {t:"take",x:"Move inward by lowering $x_1$. The objective falls locally, so the boundary point cannot be optimal."},
 {t:"p",x:"The multiplier's sign tells you whether the boundary blocks improvement or leaves a feasible way to improve."}],
 g:{at:1,q:"What happens to the objective if you move a little inward?",o:[
  ["It falls",1,"The slope in the outward direction is positive, so reversing direction gives descent."],
  ["It rises",0,"That would require a negative outward slope and a positive multiplier. Here the sign is the other way around."]]}});

/* 5 · Rule in words → formula, Fill "zero". x₁*=min(c,−1), x₂*=0. At c=−1, x₁*+1=0, so σ=0 even with g=0. */
rc98("numm-opt-3",5,{p:[
 {t:"p",x:"The objective is convex and the constraint is affine, so a point satisfying KKT is optimal."},
 {t:"p",x:"At $c=−1$ the bound just touches the unconstrained minimum. The constraint is active with a [[zero]] multiplier."},
 {t:"eq",lab:"Optimum at fixed bound c",eq:"x_1^* = min(c, −1),   x_2^* = 0",cap:"The starred coordinates give the constrained minimum."},
 {t:"p",x:"At the touching point the objective gradient vanishes, so stationarity needs no boundary correction."}]});

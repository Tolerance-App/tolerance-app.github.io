/* ===== v108 (2026-11-25): reveal cards for Numerical methods (made by Codex) =====
   1. All 30 cards of numm-opt-1 … numm-opt-4 and numm-reg-1 as reveal cards (rc98, format in v98.js). First course
      converted by Codex (codex/README.md), staged against b107 on branch codex-cards-numm, reviewed and shipped here.
      Guess on 9 cards (opt1·0, opt1·3, opt2·2, opt2·5, opt3·2, opt3·4, opt4·0, reg1·0, reg1·5).
      Fill on 9 (opt1·1, opt1·2, opt2·0, opt3·1, opt3·5, opt4·1, opt4·3, reg1·3, reg1·4), 12 with neither.
      Cards only: `cards`, ids and question order unchanged.
   2. Two question fixes Codex found (edited in place):
      numm-opt-3#4: the order question had two valid orders (feasibility/sign and complementary slackness can be
        checked either way round). The three tests are now one step, so only one order is defensible.
      numm-opt-2#3: "from every starting point", since gradient descent can also land in one step from a start on
        an eigendirection with step 1/curvature. */
try{FB.ver="b108"}catch(e){}

/* 2 · question fixes */
{const l=bq32("numm-opt-3"),q=l&&l.qs[4];if(q&&q.t=="order"&&/candidate-check workflow/.test(q.q)){
 q.q="For a differentiable convex objective and affine inequality g≤0, order this candidate-check workflow.";
 q.items=["Evaluate the objective gradient, constraint gradient and constraint value at the candidate.",
  "Use stationarity to solve for the candidate multiplier.",
  "Check feasibility g≤0, the sign condition σ≥0 and complementary slackness σg=0.",
  "Accept the KKT certificate only if every condition holds."];
 q.why="Stationarity ∇f+σ∇g=0 gives σ, so it comes before the tests that use σ: feasibility g≤0, dual feasibility σ≥0 and complementary slackness σg=0. Accepting comes last because it needs every test. Convexity and an affine constraint make the conditions sufficient.";
 FIX32.push("ok numm-opt-3#4")}}
{const l=bq32("numm-opt-2"),q=l&&l.qs[3];if(q&&/reaches its minimum in one full step/.test(q.q)){
 q.q="For a dimensionless strictly convex quadratic with unequal positive curvatures, which method reaches its minimum in one full step from every starting point, and why?";
 FIX32.push("ok numm-opt-2#3")}}

/* 1 · reveal cards (Codex) */
/* ---------- numm-opt-1 · Backtracking and Armijo ---------- */
/* 0 · Plain text, Guess (shorten the step). */
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
 {t:"p",x:"Along the negative gradient, the directional slope $∇f^T p$ is [[negative]] whenever the gradient is nonzero."},
 {t:"eq",lab:"Steepest descent",eq:"p = −∇f"},
 {t:"eq",lab:"Directional slope",eq:"∇f^T p = −‖∇f‖^2",cap:"Zero only when the gradient vanishes."}]});

/* 2 · Rule in words → formula, Fill "sufficiently". The requested drop is μ₁ times the linear prediction, with 0 < μ₁ < 1. */
rc98("numm-opt-1",2,{p:[
 {t:"p",x:"Armijo accepts a step only when the objective drops [[sufficiently]] compared with the drop predicted by the local slope."},
 {t:"vars",vars:[["f","objective"],["x, p","fixed base point and descent direction"],["α","positive trial step size"],["μ_1","required fraction of the predicted drop"],["∇f","gradient at the base point"]]},
 {t:"eq",eq:"f(x+αp) ≤ f(x)+μ_1 α∇f^T p",cap:"All quantities are dimensionless. 0 < μ₁ < 1."}]});

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
 {t:"step",f:"6 + 0.0001 · 1 · (−32)",v:"≈ 5.997",u:""},
 {t:"take",x:"Reject step size $1$. The trial exceeds the Armijo bound for decrease fraction $0.0001$."}]});

/* 5 · Worked example. α=1·0.5=0.5, trial (−1,0) gives 2, bound=6−0.0016=5.9984. Exact α=8/24=1/3. */
rc98("numm-opt-1",5,{p:[
 {t:"p",x:"Keep the same quadratic, base point and direction. The base value stays $6$ and the slope stays $−32$."},
 {t:"p",x:"Use shrink factor $0.5$ to halve the rejected step size from $1$ to $0.5$."},
 {t:"step",f:"f((1,2) + 0.5 · p)",v:"2",u:""},
 {t:"step",f:"6 + 0.0001 · 0.5 · (−32)",v:"≈ 5.998",u:""},
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
 {t:"vars",vars:[["x, x_{new}","current and next points"],["α_A","step size"],["v̂, ŝ","bias-corrected averages of gradients and squared gradients"],["ε","small positive stabilizer"]]},
 {t:"eq",lab:"Adam, per coordinate",eq:"x_{new} = x − α_A v̂/(√{ŝ}+ε)",cap:"All quantities are dimensionless."},
 {t:"p",x:"Take $a=2$ and start at $(1,2)$, so $g=(4,4)$. With zero initial moments, each first corrected average is $4$ and each squared average is $16$. Use $α_A=0.3$; $ε$ is negligible beside $√{16}$."},
 {t:"step",f:"(1,2) − 0.3 · 4/√{16} each",v:"(0.7, 1.7)",u:"",fin:1}]});

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
 {t:"eq",lab:"Complementary slackness",eq:"σg = 0"},
 {t:"p",x:"An inactive constraint has $g<0$, so its multiplier must be zero."}],
 g:{at:4,q:"Interior point. What must the multiplier be at a KKT point?",o:[
  ["Zero",1,"The constraint has slack, so only a zero multiplier makes the product zero."],
  ["Positive",0,"A positive multiplier can occur at an active constraint. In the interior it would make the product nonzero."]]}});

/* 3 · Worked compare. c=1: ∂f/∂x₁ at x₁=1 is 2(1+1)=4, so σ=−4. At x₁=−1, ∇f=0 and g=−1−1=−2. */
rc98("numm-opt-3",3,{p:[
 {t:"p",x:"Fix the upper bound at $c=1$. Compare the boundary point $(1,0)$ with the unconstrained minimum $(−1,0)$."},
 {t:"pc",l:"Boundary point",c:"Stationarity requires 4 + σ = 0.",v:"σ = −4",warn:1},
 {t:"pc",l:"Interior point",c:"Zero gradient and $g=−2$.",v:"σ = 0"},
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
 {t:"eq",lab:"Optimum at fixed bound c",eq:"x_1^{*}=min(c,−1),  x_2^{*}=0",cap:"The starred coordinates give the constrained minimum."},
 {t:"p",x:"At the touching point the objective gradient vanishes, so stationarity needs no boundary correction."}]});

/* ---------- numm-opt-4 · Penalty and augmented Lagrangian ---------- */
/* 0 · Terms, Guess (a finite penalty can leave a violation). */
rc98("numm-opt-4",0,{p:[
 {t:"p",x:"A penalty adds a cost when a trial point breaks a constraint. The optimizer minimizes the objective plus that cost."},
 {t:"p",x:"Some violation can remain if it saves more in the original objective than it costs in penalty."},
 {t:"take",x:"A multiplier estimate adds a correction that can balance the objective's slope at the boundary."}],
 g:{at:1,q:"Can the minimum of the penalized objective still violate the constraint?",o:[
  ["Yes",1,"A small violation can cost less than the objective improvement it buys."],
  ["No",0,"That would require enforcing a hard bound. A finite quadratic penalty charges for crossing it."]]}});

/* 1 · Rule in words → formula, Fill "extra". On g≤0, max(0,g)=0. On g>0, the extra cost is μg²/2. */
rc98("numm-opt-4",1,{p:[
 {t:"p",x:"Minimize $f=(x+1)^2$ over scalar $x$ subject to $g=x+2≤0$. All values are dimensionless."},
 {t:"p",x:"The exterior penalty charges [[extra]] for infeasible points and leaves feasible points at their original cost."},
 {t:"eq",lab:"Penalized objective",eq:"f̂ = f + (μ/2) max(0,g)^2",cap:"Hold the positive penalty weight μ fixed."}]});

/* 2 · Worked example. For x>−2, f̂′=2(x+1)+(x+2)=3x+4=0 → x=−4/3 and g=2/3. Strict convexity makes this the minimum. */
rc98("numm-opt-4",2,{p:[
 {t:"p",x:"Set penalty weight $μ=1$ for the fixed quadratic. On the violating side, $x>−2$, both the objective and penalty contribute to the slope."},
 {t:"step",f:"2(x+1) + (x+2) = 0",v:"x ≈ −1.333",u:""},
 {t:"step",f:"g = x + 2",v:"g ≈ 0.6667",u:"",fin:1},
 {t:"take",x:"The finite penalty leaves a violation. The objective improves enough to pay for it."}]});

/* 3 · Legend → formula, Fill "linearly". Completing the square in ḡ centers the correction at −λ̄/μ; the slope there is zero. */
rc98("numm-opt-4",3,{p:[
 {t:"p",x:"The augmented objective adds a term that varies [[linearly]] with the clipped constraint, alongside the quadratic penalty."},
 {t:"vars",vars:[["f, f̂","original and augmented objectives"],["g","signed constraint value"],["λ̄","fixed nonnegative multiplier estimate"],["μ","fixed positive penalty weight"]]},
 {t:"eq",lab:"Clipped constraint",eq:"ḡ = max(g, −λ̄/μ)"},
 {t:"eq",lab:"Augmented objective",eq:"f̂ = f + λ̄ḡ + (μ/2)ḡ^2"}]});

/* 4 · Worked update. μ=1, λ̄=0 gives x=−4/3, |−4/3−(−2)|=2/3; λ̄_new=max(0,0+1·2/3)=2/3. */
rc98("numm-opt-4",4,{p:[
 {t:"p",x:"With weight $μ=1$ and multiplier estimate $λ̄=0$, the augmented objective reduces to the exterior penalty."},
 {t:"p",x:"Its minimizer violates the bound by about $0.6667$. That is also its distance from the true optimum $x^{*}=−2$."},
 {t:"eq",lab:"Update after minimizing",eq:"λ̄_{new} = max(0, λ̄ + μg)",cap:"Use the constraint value g at the current minimizer."},
 {t:"step",f:"max(0, 0 + 1 · g)",v:"≈ 0.6667",u:"",fin:1}]});

/* 5 · Process chain. At x=−2, g=0 and f′=2(−2+1)=−2. λ̄=2 cancels that slope for any μ>0. The objective is strictly convex. */
rc98("numm-opt-4",5,{p:[
 {t:"p",x:"At the true optimum $x=−2$, the objective slope is $−2$. A multiplier estimate $λ̄=2$ supplies the opposite slope."},
 {t:"p",x:"For this convex model, that puts the augmented minimum exactly at the bound for any fixed penalty weight $μ>0$."},
 {t:"chain",items:["Minimize","Update λ̄","Check"],hl:1},
 {t:"p",x:"Minimize with estimates fixed, project the updated multiplier onto nonnegative values, then check feasibility and stationarity."}]});

/* ---------- numm-reg-1 · Linear fits and r² ---------- */
/* 0 · Plain text + Guess (held-out data measure prediction). */
rc98("numm-reg-1",0,{p:[
 {t:"p",x:"A fitted line summarizes how the observed response varies with the input."},
 {t:"take",x:"To assess prediction, test it on observations that were held out of the fit."},
 {t:"p",x:"The training fit tells you how much variation the line explains in the observations it already saw."}],
 g:{at:1,q:"Which data better test how the fitted line predicts new observations?",o:[
  ["Held-out data",1,"These observations had no influence on the fitted coefficients, so they test prediction."],
  ["Fitting data",0,"The coefficients were chosen to fit those data. Their error can understate new prediction error."]]}});

/* 1 · Legend → formula → demo values. For 8 points at x=1…8: Σx=36, Σy=25.6, Σx²=204, Σxy=140.34.
   a₁=(8·140.34−36·25.6)/(8·204−36²)=0.5985714; a₀=(25.6−36a₁)/8=0.5064286. */
rc98("numm-reg-1",1,{p:[
 {t:"p",x:"For eight fixed, dimensionless observations, ordinary least squares minimizes $S_r$, the sum of squared differences between observed and fitted responses."},
 {t:"vars",vars:[["x","input"],["ŷ","fitted response"],["a_0","intercept"],["a_1","slope"]]},
 {t:"eq",lab:"Fitted line",eq:"ŷ = a_0 + a_1 x"},
 [{t:"vt",l:"Demo intercept",v:"0.5064",u:""},
  {t:"vt",l:"Demo slope",v:"0.5986",u:""}]]});

/* 2 · Legend → formula → worked value. ȳ=25.6/8=3.2. Σ(yᵢ−ȳ)²=15.5052, Σ(yᵢ−ŷᵢ)²=0.4571143.
   1−0.4571143/15.5052=0.9705186. */
rc98("numm-reg-1",2,{p:[
 {t:"vars",vars:[["S_r","sum of squared residuals from the fit"],["S_t","sum of squared deviations from the observed mean"],["r^2","fraction of observed variation explained by the fitted line"]]},
 {t:"eq",lab:"Goodness of fit",eq:"r^2 = 1 − S_r/S_t",cap:"For this fixed dataset and a fit with an intercept. Requires Sₜ > 0."},
 {t:"p",x:"The demo gives $S_r≈0.4571$ and $S_t≈15.51$."},
 {t:"step",f:"1 − S_r/S_t",v:"0.9705",u:"",fin:1},
 {t:"p",x:"Use the unrounded sums to compute the ratio."}]});

/* 3 · Legend → formula, Fill "increasing". From degree 0 through m there are m+1 columns. */
rc98("numm-reg-1",3,{p:[
 {t:"p",x:"In a polynomial fit, each observed input $x_i$ gives one row of design matrix $Z$. For fixed degree $m$, its powers appear in [[increasing]] order."},
 {t:"eq",lab:"Design row i",eq:"[1, x_i, …, x_i^m]",cap:"For dimensionless inputs."},
 {t:"eq",lab:"Normal equations",eq:"Z^T Z a = Z^T y",cap:"a holds the coefficients. y holds the observed responses."},
 {t:"p",x:"If the columns of $Z$ are linearly independent, the least-squares coefficients are unique."}]});

/* 4 · Rule in words → formula, Fill "held out". RMSE squared is the residual sum per observation. */
rc98("numm-reg-1",4,{p:[
 {t:"p",x:"Training RMSE uses the observations used for fitting. Test RMSE uses observations [[held out]] from fitting."},
 {t:"vars",vars:[["S_r","sum of squared residuals on the set being scored"],["n","number of observations in that set"]]},
 {t:"eq",lab:"Root-mean-square error",eq:"RMSE = √{S_r/n}",cap:"Use fixed predictions and a nonempty set."},
 {t:"p",x:"RMSE has the same units as the response. Here it is dimensionless."}]});

/* 5 · Compare pair, Guess (test error can rise). Larger nested model can reproduce the smaller fit with extra coefficients zero. */
rc98("numm-reg-1",5,{p:[
 {t:"p",x:"Fit nested polynomial models by exact, unregularized least squares on the same training data. The larger model can reproduce the smaller fit, so training error cannot rise."},
 {t:"p",x:"Held-out error can rise. The extra terms may follow noise that will not repeat in new observations."},
 {t:"take",x:"Compare models on held-out data when prediction matters."}],
 g:{at:1,q:"Can test error rise as you add polynomial terms?",o:[
  ["Yes",1,"The extra terms can fit training noise and give worse predictions on unseen observations."],
  ["No",0,"The smaller fit is available to the larger model, but the fit minimizes training error. Test error has no such guarantee."]]}});

try{NEWS.unshift({d:"2026-11-25",t:["Numerical methods cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b108",k:"rc108a",t:"Reveal cards: Numerical methods",c:"All 30 cards in the 5 numerical methods lessons (made by Codex). Also: the KKT order question now has one valid order, and the Newton one-step question says 'from every starting point'.",go:["lesson","numm-opt-1"]})}catch(e){}

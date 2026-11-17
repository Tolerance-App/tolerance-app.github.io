/* ===== v40 (2026-11-17): exam lessons for the b39 models =====
   Nine v8-format lessons from exam-lessons-b36.json, pasted as-is below and added to BUNDLE before build():
   - new course "Numerical methods" (sub numm, field Mathematics): Optimization (line search and descent,
     constrained optimization) and Regression, 5 lessons;
   - existing "Controls" course (sub ctrl): Stability, Spacecraft and quadrotors, Design specifications,
     4 lessons.
   Each lesson names its b39 model in "demo", so the model shows inside the lesson and on the lesson's row
   in the Lab. The Lab's two model sets from v39 stay as they are.
   Every numeric answer was re-derived; ids are new, so no existing progress or question keys move. */
try{FB.ver="b40"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["New course: Numerical methods, with lessons on backtracking, gradient descent/Newton/Adam, KKT, penalty and augmented Lagrangian, and least squares.","Controls: four new lessons on Routh stability, spacecraft PD, quadrotor altitude and pole-region specs.","Each one opens with its interactive model."]})}catch(e){}

const XL40=[
  {
    "id": "numm-opt-1",
    "sub": "numm",
    "subName": "Numerical methods",
    "field": "Mathematics",
    "section": "Optimization",
    "branch": "Line search and descent",
    "lv": 3,
    "title": "Backtracking and Armijo",
    "req": [],
    "plain": "Shorten a proposed move until it improves the result enough.",
    "cards": [
      "For a smooth dimensionless objective f at fixed point x, the gradient ∇f gives local slopes. The direction p = -∇f descends because ∇fᵀp is negative unless the gradient vanishes.",
      "For fixed x and descent direction p, accept step α when f(x+αp) ≤ f(x)+μ₁α∇fᵀp. Here α is step size and 0<μ₁<1 sets sufficient decrease; all quantities are dimensionless.",
      "Why it happens: a smooth objective initially follows its directional slope. Holding x and p fixed, repeated α ← ρα with contraction factor 0<ρ<1 eventually satisfies Armijo for a genuine descent direction.",
      "With dimensionless f=2x₁²+x₂² fixed, x=(1,2) gives p=(-4,-4). At α=1 and μ₁=0.0001, the trial objective is 22; threshold 5.9968 rejects it.",
      "For that fixed quadratic and start, halve α using ρ=0.5: α=0.5 gives objective 2 and threshold 5.9984, so accept. Backtracking seeks sufficient decrease, not the exact minimum along the direction."
    ],
    "eqs": [],
    "demo": "cmArmijo",
    "qs": [
      {
        "t": "fill",
        "q": "For dimensionless f(x₁,x₂)=3x₁²+2x₂² at x=(2,-1), form p=-∇f. What is p₁?",
        "a": -12.0,
        "tol": 0.002,
        "why": "Differentiate before substituting: ∇f=(6x₁,4x₂)=(12,-4). Negating gives p=(-12,4), so p₁=-12.00. Using -6 drops x₁; using +12 forgets the descent sign."
      },
      {
        "t": "fill",
        "q": "For dimensionless f(x₁,x₂)=3x₁²+2x₂² at x=(2,-1), use p=-∇f, α=0.08 and μ₁=0.02. Calculate the Armijo threshold f(x)+μ₁α∇fᵀp.",
        "a": 13.74,
        "tol": 0.002,
        "why": "First f=3(2²)+2(-1)²=14 and ∇f=(12,-4). Then p=(-12,4), so ∇fᵀp=-144-16=-160. Threshold=14+0.02(0.08)(-160)=13.744, or 13.74. The dot product uses both coordinates and is negative."
      },
      {
        "t": "fill",
        "q": "A dimensionless calibration objective is f(q)=4(q-3)². At q=1, hold p=-f′(1) fixed; start α=0.8, use ρ=0.4 and μ₁=0.05. What is the first accepted α?",
        "a": 0.128,
        "tol": 0.002,
        "why": "f=16, f′=-16 and p=16, so the threshold is 16-12.8α. At α=0.8, f(13.8)=466.56>5.76; at α=0.32, f(6.12)=38.9376>11.904. At α=0.128, f(3.048)=0.009216≤14.3616. Accept 0.1280; keep the original point and direction fixed during rejection."
      },
      {
        "t": "mc",
        "q": "In MATLAB, `g` and `p` are real column vectors, and `p=-g`. Which expression gives the scalar Armijo directional slope, and why?",
        "ans": "`g'*p`: inner product gives the directional slope.",
        "wrong": [
          "`g.*p`: coordinate products give the directional slope.",
          "`g*p'`: the outer product gives the directional slope.",
          "`sum(g)*sum(p)`: separate sums give the directional slope."
        ],
        "why": "The derivative of f(x+αp) at α=0 is gᵀp, coded `g'*p`. Elementwise-product mistake: `g.*p` is a vector, not its sum. Outer-product mistake: `g*p'` is a matrix. Product-of-sums mistake: `sum(g)*sum(p)` adds cross terms absent from the dot product."
      },
      {
        "t": "order",
        "q": "Order backtracking for a differentiable objective and a nonzero gradient. Reject trials without moving the base point.",
        "items": [
          "Evaluate the base objective and gradient; choose a descent direction.",
          "Set the initial step and form the trial point.",
          "Compare the trial objective with the Armijo threshold.",
          "If rejected, shrink the step and repeat the trial test from the same base.",
          "When accepted, move to the accepted trial point."
        ],
        "why": "The base gradient defines the directional derivative used in every rejection test. Trial evaluation precedes comparison; rejection changes the step, not the base point. Acceptance ends the loop. Recomputing the direction after every rejection would be a different procedure."
      },
      {
        "t": "decode",
        "q": "“The objective decreased, but I still rejected the step.” What does the analyst mean?",
        "ans": "The reduction failed the Armijo sufficient-decrease test.",
        "wrong": [
          "The reduction proved that the direction was not descending.",
          "The reduction passed Armijo but missed the exact line minimum.",
          "The reduction required a new base gradient before comparison."
        ],
        "why": "Armijo requires a specified amount of decrease, so a small reduction can still fail. Direction-confusion mistake: a rejected trial does not prove a non-descent direction. Exact-search mistake: Armijo does not require the line minimum. Moving-base mistake: the base gradient stays fixed during backtracking.",
        "who": "Optimization analyst"
      }
    ]
  },
  {
    "id": "numm-opt-2",
    "sub": "numm",
    "subName": "Numerical methods",
    "field": "Mathematics",
    "section": "Optimization",
    "branch": "Line search and descent",
    "lv": 4,
    "title": "Gradient descent, Newton and Adam",
    "req": [
      "numm-opt-1"
    ],
    "plain": "Different optimization methods turn the same local information into different moves.",
    "cards": [
      "For dimensionless quadratic f=ax₁²+x₂², fixed a>0 controls curvature. Let g=∇f and H be its Hessian. Gradient descent uses x_new=x-αg, with dimensionless step α.",
      "For this fixed positive-definite quadratic, full-step Newton solves Hp=-g for step p, then moves x_new=x+p. Why it happens: its quadratic approximation is exact, so one step reaches the unique minimum.",
      "At fixed a=2 and x=(1,2), gradient descent with α=0.1 reaches (0.6,1.6); full-step Newton reaches (0,0). This exact Newton result depends on the quadratic model and nonsingular Hessian.",
      "Adam uses x_new=x-α_Av̂/(√ŝ+ε) coordinatewise, with bias-corrected mean v̂ and mean-square ŝ. Starting with zero moments, neglect stabilizer ε: step α_A=0.3 from the fixed demo point reaches (0.7,1.7); all quantities are dimensionless.",
      "With fixed a≥1, gradient descent converges from every start only for 0<α<1/a. Adam normalizes coordinates separately, so its first direction matches gradient descent only for special gradient components."
    ],
    "eqs": [],
    "demo": "cmPaths",
    "qs": [
      {
        "t": "fill",
        "q": "For dimensionless f=4x₁²+3x₂² at x=(1.5,-2), take one gradient-descent step with α=0.06. Derive the x₁ shrink factor, then report the new x₁.",
        "a": 0.78,
        "tol": 0.002,
        "why": "∇f=(8x₁,6x₂)=(12,-12). Thus x_new=(1.5,-2)-0.06(12,-12)=(0.78,-1.28), so x₁,new=0.7800. The x₁ factor is 1-8(0.06)=0.52, so 0.52×1.5=0.78. The factor 2 in differentiating each squared term is essential."
      },
      {
        "t": "fill",
        "q": "For dimensionless f=5(x₁-2)²+2(x₂+3)², start at x=(-1,1). Solve Hp=-∇f for a full Newton step. What is p₂?",
        "a": -4.0,
        "tol": 0.002,
        "why": "∇f=(10(x₁-2),4(x₂+3))=(-30,16), and H=diag(10,4). Hence p=-H⁻¹∇f=(3,-4), so p₂=-4.000. This is the displacement; the updated second coordinate is -3, not -4."
      },
      {
        "t": "fill",
        "q": "For a dimensionless calibration problem, Adam starts with zero moments at x=(2.5,-1.5), and its first gradient is g=(6,-9). With bias correction, α_A=0.2 and ε neglected, what is the new x₂?",
        "a": -1.3,
        "tol": 0.002,
        "why": "At the first iteration, v̂=g and ŝ=g²=(36,81), regardless of admissible moment decay factors. The second-coordinate step is -0.2(-9)/√81=+0.2; x₂,new=-1.5+0.2=-1.300. Using -α_Ag₂ without normalization would instead take an erroneous +1.8 step."
      },
      {
        "t": "mc",
        "q": "For a dimensionless strictly convex quadratic with unequal positive curvatures, which method reaches its minimum in one full step, and why?",
        "ans": "Newton, because its local quadratic model is exact.",
        "wrong": [
          "Gradient descent, because every negative gradient points directly to the minimum.",
          "Adam, because bias correction replaces its normalization with the inverse Hessian.",
          "All three, because positive curvature makes every full step optimal."
        ],
        "why": "Newton solves Hp=-g, exactly cancelling the quadratic gradient at the new point. Gradient-direction mistake: unequal curvature generally prevents the negative gradient from aiming at the minimizer. Moment/Hessian mistake: bias correction is not an inverse Hessian. Convexity/step-size mistake: convexity does not make arbitrary full steps optimal."
      },
      {
        "t": "order",
        "q": "Order one fixed-step gradient-descent stability audit for f=ax₁²+x₂² with dimensionless a≥1 and positive α.",
        "items": [
          "Differentiate to obtain gradient (2ax₁,2x₂).",
          "Substitute into the update to obtain factors 1-2aα and 1-2α.",
          "Require both factor magnitudes to be strictly below one.",
          "Intersect the inequalities to obtain 0<α<1/a.",
          "Check the chosen step, including equality boundaries."
        ],
        "why": "Each coordinate repeats multiplication by its factor. For positive a and α, |1-2aα|<1 gives α<1/a and |1-2α|<1 gives α<1; a≥1 makes the first bound decisive. Equality can leave a nondecaying alternating component. Positive definiteness alone does not guarantee fixed-step convergence."
      },
      {
        "t": "spot",
        "q": "MATLAB: `x`, `g`, `vhat`, and `shat` are equal-length real column vectors with at least two entries. `alpha` and positive `epsilon` are scalars. Which line breaks coordinatewise Adam?",
        "lines": [
          "`g = grad_f(x);`",
          "`v = beta_v*v + (1-beta_v)*g;`",
          "`shat = (beta_s*s + (1-beta_s)*(g.^2))/(1-beta_s^(iter+1));`",
          "`vhat = v/(1-beta_v^(iter+1));`",
          "`x = x - alpha*(vhat / (epsilon + sqrt(shat)));`"
        ],
        "bad": 4,
        "why": "Line index 4 uses matrix right-division between column vectors, producing a matrix rather than coordinatewise scaling. Replace it with `x = x - alpha*(vhat ./ (epsilon + sqrt(shat)));`. The gradient squares correctly use `.^2`; divisions by scalar bias-correction denominators in the other lines are valid. Assume old `s` is supplied and iteration counting starts at zero."
      }
    ]
  },
  {
    "id": "numm-opt-3",
    "sub": "numm",
    "subName": "Numerical methods",
    "field": "Mathematics",
    "section": "Optimization",
    "branch": "Constrained optimization",
    "lv": 4,
    "title": "KKT conditions",
    "req": [
      "numm-opt-1"
    ],
    "plain": "A valid constrained optimum must balance improvement against the direction the boundary blocks.",
    "cards": [
      "For dimensionless objective f=(x₁+1)²+x₂², fix boundary c and constraint g=x₁-c≤0. A feasible point obeys the bound; an active point touches it, meaning g=0.",
      "For this differentiable problem, multiplier σ is dimensionless. KKT requires stationarity ∇f+σ∇g=0, feasibility g≤0, σ≥0, and complementary slackness σg=0. An inactive constraint forces σ=0.",
      "At fixed c=1, boundary candidate (1,0) needs σ=-4 by stationarity, violating σ≥0. Interior candidate (-1,0) has g=-2 and σ=0, satisfying all four conditions.",
      "Why it happens: a negative multiplier at this upper boundary means moving inward reduces the objective. The boundary cannot be optimal when feasible descent remains.",
      "For this convex quadratic with affine constraint, KKT is sufficient. Holding c fixed, x₁*=min(c,-1) and x₂*=0. At c=-1, the constraint is active even though its multiplier is zero."
    ],
    "eqs": [],
    "demo": "cmKKT",
    "qs": [
      {
        "t": "fill",
        "q": "Minimize dimensionless f=(x₁+2)²+3x₂² with g=x₁+4≤0. At candidate (-4,0), calculate σ from stationarity ∇f+σ∇g=0.",
        "a": 4.0,
        "tol": 0.002,
        "why": "∇f=(2(x₁+2),6x₂)=(-4,0), and ∇g=(1,0). Stationarity gives -4+σ=0, so σ=4.000. Feasibility holds with g=0; σ≥0 and complementary slackness σg=0 also hold. Convexity makes this a constrained minimum."
      },
      {
        "t": "fill",
        "q": "For dimensionless f=(x₁-3)²+2x₂² subject to g=x₁-4≤0, find the constrained optimum first. What is g there?",
        "a": -1.0,
        "tol": 0.002,
        "why": "The unconstrained minimum solves ∇f=0, giving (3,0), which is feasible. At that point g=3-4=-1.000. Stationarity holds with σ=0; feasibility, σ≥0 and complementary slackness all hold. Forcing x₁=4 would mistake a feasible bound for a required equality."
      },
      {
        "t": "fill",
        "q": "Minimize dimensionless f=2(x₁-1)²+x₂² with g=x₁+2≤0. Use stationarity, feasibility, σ≥0 and complementary slackness to identify the optimum. What is f*?",
        "a": 18.0,
        "tol": 0.002,
        "why": "The unconstrained x₁=1 violates x₁≤-2. The optimum is (-2,0): ∇f=(-12,0), so stationarity requires σ=12≥0; g=0 gives feasibility and complementary slackness. Therefore f*=2(-2-1)²=18.00. Evaluating at the infeasible unconstrained minimum would incorrectly give zero."
      },
      {
        "t": "mc",
        "q": "MATLAB: all quantities are dimensionless real columns. At a candidate for one inequality, `gf=[-6;0]`, `gg=[2;0]`, and `gval=0`. Which stationarity calculation and KKT conclusion are correct?",
        "ans": "`sigma=-(gg'*gf)/(gg'*gg);` gives 3; all KKT conditions hold.",
        "wrong": [
          "`sigma=(gg'*gf)/(gg'*gg);` gives -3; stationarity alone certifies the minimum.",
          "`sigma=-(gg.*gf)./(gg.*gg);` gives component ratios; each is a valid multiplier.",
          "`sigma=-(gg'*gf);` gives 12; an active constraint removes the stationarity check."
        ],
        "why": "The scalar calculation gives -(-12)/4=3 and the full residual gf+3gg=(0,0). Stationarity, feasibility gval=0, σ≥0 and complementary slackness all hold. Missing-minus mistake: the first alternative gives the wrong multiplier. Elementwise-division mistake: the second makes 0/0 in one coordinate and cannot produce one scalar σ. Missing-normalization mistake: the third omits ggᵀgg and leaves a nonzero stationarity residual; activity does not waive stationarity."
      },
      {
        "t": "order",
        "q": "For a differentiable convex objective and affine inequality g≤0, order this candidate-check workflow. The four KKT tests remain distinct.",
        "items": [
          "Evaluate the objective gradient, constraint gradient and constraint value at the candidate.",
          "Use stationarity to solve for the candidate multiplier.",
          "Check feasibility and the sign condition σ≥0.",
          "Check complementary slackness σg=0.",
          "Accept the KKT certificate only if every condition holds."
        ],
        "why": "Stationarity is ∇f+σ∇g=0; feasibility is g≤0; dual feasibility is σ≥0; complementary slackness is σg=0. The chosen workflow obtains σ before tests that use it. Feasibility could also be checked earlier; that does not change the required conditions. Convexity and an affine constraint justify the sufficiency claim."
      },
      {
        "t": "decode",
        "q": "“The bound is active, but its multiplier is zero.” Which interpretation is justified?",
        "ans": "The point touches the bound; zero multiplier is allowed.",
        "wrong": [
          "The point lies strictly inside; zero multiplier proves inactivity.",
          "The point violates stationarity; every active multiplier must be positive.",
          "The point violates feasibility; a boundary value must be negative."
        ],
        "why": "Active means g=0, whereas σ≥0 permits σ=0. Zero-multiplier mistake: complementary slackness does not make the converse inference from σ=0 to g<0. Strict-positivity mistake: active constraints need not have σ>0. Strict-feasibility mistake: g≤0 includes equality. Stationarity must still be checked separately.",
        "who": "Optimization reviewer"
      }
    ]
  },
  {
    "id": "numm-opt-4",
    "sub": "numm",
    "subName": "Numerical methods",
    "field": "Mathematics",
    "section": "Optimization",
    "branch": "Constrained optimization",
    "lv": 5,
    "title": "Penalty and augmented Lagrangian",
    "req": [
      "numm-opt-3"
    ],
    "plain": "A penalty discourages constraint violations; a multiplier learns the correction needed at the boundary.",
    "cards": [
      "For dimensionless f=(x+1)² and g=x+2≤0, fix positive penalty μ. Exterior penalty minimizes f̂=f+(μ/2)max(0,g)². Violations cost extra; feasible points receive no penalty.",
      "With this fixed quadratic, μ=1 gives minimizer x=-1.333 and g=0.6667. Why it happens: a finite quadratic penalty trades objective improvement against some remaining constraint violation.",
      "For the same inequality, fix dimensionless multiplier estimate λ̄≥0 and μ>0. Define clipped constraint ḡ=max(g,-λ̄/μ). Augmented objective f̂=f+λ̄ḡ+(μ/2)ḡ² adds a linear correction.",
      "With μ=1 and initial λ̄=0, the augmented model matches the penalty: distance to true optimum x*=-2 is 0.6667. Updating λ̄_new=max(0,λ̄+μg) gives 0.6667.",
      "For this convex model and fixed μ>0, λ̄=2 places the augmented minimum exactly at x=-2. Each outer iteration minimizes at fixed estimates, updates the projected multiplier, then checks constraint and stationarity residuals."
    ],
    "eqs": [],
    "demo": "cmAugLag",
    "qs": [
      {
        "t": "fill",
        "q": "For dimensionless f=(x-1)², g=x+3≤0 and μ=6, minimize f̂=f+(μ/2)max(0,g)². What is the minimizer x?",
        "a": -2.0,
        "tol": 0.002,
        "why": "In the violating branch, f̂′=2(x-1)+6(x+3)=8x+16, so x=-2.000. Its g=1>0 confirms that branch. The convex objective has this unique minimum; the finite penalty leaves violation instead of forcing the true constrained optimum x=-3."
      },
      {
        "t": "fill",
        "q": "For dimensionless f=(x-1)² and g=x+3≤0, minimize the clipped augmented objective with μ=4 and λ̄=6, then calculate λ̄_new=max(0,λ̄+μg).",
        "a": 7.333,
        "tol": 0.002,
        "why": "In the active clipped branch, stationarity is 2(x-1)+6+4(x+3)=6x+16=0, so x=-8/3 and g=1/3. This satisfies g≥-λ̄/μ=-1.5. Thus λ̄_new=6+4/3=22/3=7.333. Updating before minimizing would use the wrong constraint residual."
      },
      {
        "t": "fill",
        "q": "A dimensionless constrained calibration has f=3(x-2)² and g=x+1≤0. What multiplier estimate λ̄ makes the exact constrained optimum stationary for the augmented model for any μ>0?",
        "a": 18.0,
        "tol": 0.002,
        "why": "The constrained optimum is x*=-1. There g=0 and f′=6(x-2)=-18. Augmented stationarity at the active boundary requires -18+λ̄=0, giving λ̄=18.00. The μg term vanishes at the boundary, so this result is independent of positive μ; convexity makes stationarity sufficient."
      },
      {
        "t": "mc",
        "q": "With exact inner solves for a smooth convex problem whose inequality optimum has positive multiplier, why can an augmented Lagrangian enforce the active bound at finite μ?",
        "ans": "The correct multiplier supplies the missing boundary gradient.",
        "wrong": [
          "The squared penalty alone supplies a nonzero gradient at zero violation.",
          "The multiplier update removes the objective gradient from every inner solve.",
          "Any positive multiplier makes the inner objective ignore constraint violations."
        ],
        "why": "At an active optimum, ∇f+λ̄∇g=0 can hold at finite μ when λ̄ matches the KKT multiplier. Penalty-gradient mistake: a squared violation has zero gradient at zero violation and cannot balance a nonzero objective gradient there. Dropped-objective mistake: the inner solve still includes ∇f. Arbitrary-multiplier mistake: the estimate must converge to the appropriate value, not merely be positive."
      },
      {
        "t": "order",
        "q": "Order an inequality augmented-Lagrangian outer iteration with positive penalty and nonnegative multiplier estimate.",
        "items": [
          "Freeze the current penalty and multiplier estimate for the inner solve.",
          "Minimize the clipped augmented objective to the chosen inner tolerance.",
          "Evaluate the original constraint at the returned point.",
          "Update the multiplier with max(0, current multiplier + penalty × constraint).",
          "Check KKT residuals; if needed, adjust the penalty and repeat."
        ],
        "why": "For g≤0, ḡ=max(g,-λ̄/μ) implies λ̄+μḡ=max(0,λ̄+μg). Projection preserves nonnegative multipliers. Inner minimization must use fixed current estimates; the returned point supplies the update residual. Feasibility alone is not convergence: stationarity and complementary slackness also matter. Increasing μ is a policy choice, not a substitute for the multiplier update."
      },
      {
        "t": "spot",
        "q": "MATLAB extension to two inequalities: `g(x)` and fixed `lambda` are real 2-by-1 columns, `lambda>=0`, and `mu>0` is scalar. The augmented objective must be scalar, using the sum of squared clipped constraints. Which line is wrong?",
        "lines": [
          "`gbar = @(x) max(g(x), -lambda/mu);`",
          "`fhat = @(x) f(x) + lambda' * gbar(x) + (mu/2)*sum(gbar(x)^2);`",
          "`xstar = inner_minimize(fhat);`",
          "`lambda_new = max(0, lambda + mu*g(xstar));`"
        ],
        "bad": 1,
        "why": "Line index 1 needs `sum(gbar(x).^2)`. Matrix-power mistake: a 2-by-1 column cannot be squared with `^2`; `.^2` squares each clipped constraint before summing. The transpose product supplies a scalar multiplier term, componentwise max gives the specified clipping, and the last line projects each updated multiplier to remain nonnegative."
      }
    ]
  },
  {
    "id": "numm-reg-1",
    "sub": "numm",
    "subName": "Numerical methods",
    "field": "Mathematics",
    "section": "Regression",
    "branch": "Least-squares regression",
    "lv": 3,
    "title": "Linear fits and r²",
    "req": [],
    "plain": "Fit the observations, then check whether the model explains variation and predicts new data.",
    "cards": [
      "For eight fixed dimensionless observations, ordinary least squares minimizes Sᵣ, summed squared residuals. The demo gives intercept a₀=0.5064 and slope a₁=0.5986 in prediction ŷ=a₀+a₁x, with input x.",
      "For that fixed dataset, Sₜ is summed squared deviation from the observed mean. With Sₜ>0, r²=1-Sᵣ/Sₜ. Demo values Sᵣ=0.4571 and Sₜ=15.51 give r²=0.9705 using unrounded sums.",
      "For dimensionless polynomial inputs xᵢ and fixed degree m, design-matrix row i is [1,xᵢ,…,xᵢᵐ]. With full column rank, solve ZᵀZ a=Zᵀy for coefficient vector a and observation vector y.",
      "For fixed predictions and n observations, RMSE=√(Sᵣ/n), the root-mean-square error. Training RMSE measures fitted-data error; test RMSE uses held-out observations. With dimensionless observations, RMSE is dimensionless too.",
      "Why it happens: added polynomial terms can fit noise as well as signal. On fixed data, nested unregularized exact fits cannot increase training error; test error can rise. Prefer held-out evidence over training improvement."
    ],
    "eqs": [],
    "demo": "cmR2",
    "qs": [
      {
        "t": "fill",
        "q": "Fit the dimensionless model ŷ=a₀+a₁x by ordinary least squares with an intercept. For n=5, Σx=15, Σx²=55, Σy=27 and Σxy=91, calculate a₁.",
        "a": 1.0,
        "tol": 0.002,
        "why": "The normal equations give a₁=[nΣxy-(Σx)(Σy)]/[nΣx²-(Σx)²]=(5×91-15×27)/(5×55-15²)=50/50=1.000. Then a₀=(27-1×15)/5=2.4. Omitting the mean-correction terms would force the wrong through-origin model."
      },
      {
        "t": "fill",
        "q": "For an intercept-containing least-squares fit of dimensionless observations, residual sum Sᵣ=3.6 and total sum about the observed mean Sₜ=24. Calculate r².",
        "a": 0.85,
        "tol": 0.002,
        "why": "r²=(Sₜ-Sᵣ)/Sₜ=(24-3.6)/24=20.4/24=0.8500. Dividing Sᵣ by Sₜ gives the unexplained fraction 0.15; taking its square root confuses r² with a correlation magnitude. Positive Sₜ makes this ratio defined."
      },
      {
        "t": "fill",
        "q": "A fixed dimensionless polynomial has coefficient vector a=[1;2;0.5]. On held-out inputs x=[0;2], use rows [1,x,x²]; observations are y=[2;6]. Compute test RMSE.",
        "a": 1.0,
        "tol": 0.002,
        "why": "Construct Z_test=[[1,0,0],[1,2,4]]. Predictions Z_test a=[1;7]; residuals prediction minus observation are [-1;1]. Test Sᵣ=1+1=2 and n=2, so RMSE=√(2/2)=1.000. This uses the fixed training coefficients, not a refit to test observations; dividing by n-3 would confuse RMSE with a degrees-of-freedom estimate."
      },
      {
        "t": "mc",
        "q": "For exact unregularized nested polynomial fits on the same dimensionless training data, a cubic has higher training r² and lower training RMSE but higher held-out RMSE than a line. Which conclusion and reason are supported?",
        "ans": "The cubic may overfit because its added terms capture training noise.",
        "wrong": [
          "The cubic generalizes better because lower training RMSE guarantees lower population error.",
          "The line is invalid because polynomial models must improve both reported errors.",
          "The cubic is underfit because higher held-out RMSE proves insufficient polynomial degree."
        ],
        "why": "With fixed nonzero Sₜ, a lower Sᵣ raises r²=1-Sᵣ/Sₜ and lowers training RMSE. The held-out increase nevertheless suggests possible overfitting. Training/test-confusion mistake: training improvement does not guarantee generalization. Nested-model mistake: only the exact unregularized training optimum is guaranteed not to worsen. Bias/variance mistake: higher test error alone does not prove too little capacity; here increasing capacity worsened it."
      },
      {
        "t": "order",
        "q": "Order polynomial least squares followed by an honest test-set evaluation. Keep the test observations out of the fitting solve.",
        "items": [
          "Choose the degree and construct training rows [1,x,…,x^m].",
          "Check full column rank and form the training normal equations.",
          "Solve for the training coefficient vector.",
          "Construct held-out rows using the same powers and predict without refitting.",
          "Compute held-out residuals, square and average them, then take the square root."
        ],
        "why": "The intercept column is the zeroth power. For full rank, ZᵀZ a=Zᵀy defines the least-squares coefficients; MATLAB can use `(Z' * Z) \\ (Z' * y)`, though QR-based `Z\\y` is generally preferable numerically. Test RMSE uses fixed fitted coefficients. Refitting on held-out data causes leakage and no longer measures unseen-data prediction."
      },
      {
        "t": "spot",
        "q": "MATLAB polynomial design matrix: `x` and `y` are real n-by-1 columns with n>1; degree m≥1. Which line prevents correct construction?",
        "lines": [
          "`Z = zeros(n,m+1);`",
          "`for j = 0:m`",
          "`    Z(:,j+1) = x^j;`",
          "`end`",
          "`a = (Z' * Z) \\ (Z' * y);`"
        ],
        "bad": 2,
        "why": "Line index 2 needs `x.^j`, not `x^j`: each sample is raised to the power separately, while matrix powers require a square matrix. MATLAB column j+1 correctly accommodates power j=0 as the all-ones intercept column. Starting columns at zero would instead violate MATLAB indexing; omitting j=0 would drop the intercept."
      }
    ]
  },
  {
    "id": "ctrl-exam-1",
    "sub": "ctrl",
    "subName": "Controls",
    "field": "Across disciplines",
    "section": "Feedback basics",
    "branch": "Stability",
    "lv": 3,
    "title": "Routh and gain limits",
    "req": [],
    "plain": "A small table shows when increasing feedback gain makes oscillations grow.",
    "cards": [
      "For unity negative feedback, plant G(s)=K/[s(s+1)(s+5)] fixes rates 1 and 5 s⁻¹. Here s is the Laplace variable (s⁻¹), and positive gain K has units s⁻³.",
      "For this fixed plant, the closed-loop characteristic polynomial is s³+6s²+5s+K. Its Routh first column is 1, 6, (30-K)/6, K, with corresponding coefficient units retained.",
      "Why it happens: without special zero entries, first-column sign changes count right-half-plane poles. Positive entries imply decaying modes; a zero row requires separate analysis rather than an automatic stable verdict.",
      "At fixed K=10 s⁻³, the s¹ entry is 3.333 s⁻², and every first-column entry is positive. With zero initial state and a unit-step command, the output settles to one.",
      "At K=30 s⁻³ for this plant, the polynomial factors as (s+6)(s²+5). Oscillation frequency is √5=2.236 rad/s; imaginary-axis poles prevent settling. Asymptotic stability requires 0<K<30 s⁻³."
    ],
    "eqs": [],
    "demo": "ctRouth",
    "qs": [
      {
        "t": "fill",
        "q": "With time in seconds, a closed-loop characteristic polynomial is s³+7s²+10s+28; coefficients carry their corresponding SI units. Calculate its Routh s¹ first-column entry.",
        "a": 6.0,
        "tol": 0.002,
        "why": "For a cubic s³+as²+bs+c, the s¹ entry is (ab-c)/a. With a=7 s⁻¹, b=10 s⁻² and c=28 s⁻³, it is (70-28)/7=6.000 s⁻². Simply copying b=10 omits the coupling to the constant term. First-column entries 1,7,6,28 are positive.",
        "unit": "s⁻²"
      },
      {
        "t": "fill",
        "q": "A unity-negative-feedback plant is G(s)=K/[s(s+2)(s+6)], with rates 2 and 6 s⁻¹ and positive K in s⁻³. Find the upper gain boundary for asymptotic stability; equality is excluded.",
        "a": 96.0,
        "tol": 0.002,
        "why": "Expand the denominator: s(s+2)(s+6)=s³+8s²+12s. Feedback adds K, so the Routh entry is (8×12-K)/8. Requiring it positive gives K<96 s⁻³, together with K>0. The requested upper boundary is 96.00 s⁻³, not an included stable gain.",
        "unit": "s⁻³"
      },
      {
        "t": "fill",
        "q": "For unity feedback around K/[s(s+3)(s+7)] with rates 3 and 7 s⁻¹, first find the positive marginal gain, then the sustained oscillation frequency.",
        "a": 4.583,
        "tol": 0.002,
        "why": "The characteristic polynomial is s³+10s²+21s+K. Routh gives K_crit=10×21=210 s⁻³. At that gain it factors as (s+10)(s²+21), so the imaginary poles are ±j√21 and ω=4.583 rad/s. The frequency is not the real pole magnitude 10 or the gain 210.",
        "unit": "rad/s"
      },
      {
        "t": "mc",
        "q": "A unity-feedback loop has characteristic polynomial s³+8s²+12s+120, with time in seconds. Which verdict and reason are correct?",
        "ans": "Unstable: two first-column sign changes imply two unstable poles.",
        "wrong": [
          "Stable: positive polynomial coefficients guarantee all poles lie in the left half-plane.",
          "Stable: an open-loop integrator guarantees zero error and therefore closed-loop stability.",
          "Marginal: one negative Routh entry means exactly one imaginary-axis pole pair."
        ],
        "why": "First column: 1,8,(96-120)/8=-3,120. Its signs +,+,-,+ change twice, proving two right-half-plane poles. Positive-coefficients mistake: that condition is necessary, not sufficient here. Final-value mistake: integral action does not establish stability. Sign/zero-row mistake: a negative entry is not the marginal zero-row case."
      },
      {
        "t": "order",
        "q": "Order a Routh audit for the cubic characteristic polynomial s³+as²+bs+c, with positive real coefficients and no missing powers.",
        "items": [
          "Place coefficients in descending powers and form rows [1,b] and [a,c].",
          "Calculate the next first-column entry (ab-c)/a and final entry c.",
          "Check for zero first entries or an all-zero row before counting signs.",
          "For a regular array, count first-column sign changes.",
          "State the stable gain interval, excluding marginal endpoints."
        ],
        "why": "The alternating-coefficient rows generate the cubic first column [1,a,(ab-c)/a,c]. With positive a and c, strict stability requires ab>c. A zero pivot needs a limiting treatment; an all-zero row needs an auxiliary polynomial. Counting signs without handling these special cases can give a false stability claim."
      },
      {
        "t": "decode",
        "q": "“At the gain limit I get (s+8)(s²+12), so the step never settles.” What does the reviewer mean?",
        "ans": "A nondecaying imaginary-axis pair prevents asymptotic settling.",
        "wrong": [
          "A positive real pole makes the response diverge without oscillation.",
          "A stable repeated real pole makes the response settle without overshoot.",
          "A zero steady-state error proves the imaginary-axis pair is harmless."
        ],
        "why": "The roots are -8 and ±j√12=±j3.464 s⁻¹. The pair produces sustained oscillation, so a finite steady-state limit is unavailable for an excited pair. Root-sign mistake: there is no positive real pole. Factorization mistake: s²+12 has imaginary, not repeated real, roots. Final-value mistake: a formal DC gain cannot override failure of the final-value theorem conditions.",
        "who": "Controls reviewer"
      }
    ]
  },
  {
    "id": "ctrl-exam-2",
    "sub": "ctrl",
    "subName": "Controls",
    "field": "Across disciplines",
    "section": "Control design",
    "branch": "Spacecraft and quadrotors",
    "lv": 3,
    "title": "Spacecraft attitude with PD",
    "req": [],
    "plain": "Position feedback turns the spacecraft toward its target, and rate feedback stops it from swinging past.",
    "cards": [
      "For an ideal rigid axis, fix inertia J=10 kg·m². Angle θ is radians; actuator torque u is N·m. With no natural damping or disturbances, Jθ̈=u, starting from rest.",
      "For fixed J and command θ_ref, PD uses u=Kp(θ_ref-θ)-Kdθ̇. Kp (N·m/rad) supplies restoring torque; Kd (N·m·s/rad) supplies damping. Why it happens: rate feedback opposes angular motion.",
      "For this linear unsaturated model, natural frequency ωₙ=√(Kp/J) in rad/s and dimensionless damping ratio ζ=Kd/(2√(KpJ)). Fixed Kp=10, Kd=14 and J=10 give ωₙ=1.000 and ζ=0.700.",
      "For its zero-initial-state unit step and 0<ζ<1, percent overshoot is 100exp(-ζπ/√(1-ζ²)). With fixed demo gains, it is 4.60%. With Kd=0, undamped oscillations persist.",
      "For this underdamped second-order model, 2% settling time tₛ≈4/(ζωₙ), in seconds. Fixed demo gains give 5.71 s. This estimate does not certify overdamped settling; inspect the slow pole instead."
    ],
    "eqs": [],
    "demo": "ctAttitude",
    "qs": [
      {
        "t": "fill",
        "q": "An ideal undamped spacecraft axis has J=8 kg·m², Kp=32 N·m/rad and rate gain Kd=16 N·m·s/rad. Derive its PD characteristic polynomial, then calculate ζ.",
        "a": 0.5,
        "tol": 0.002,
        "why": "The closed-loop equation is 8θ̈+16θ̇+32θ=32θ_ref. Dividing by 8 gives s²+2s+4, so ωₙ=√4=2 rad/s and 2ζωₙ=2. Thus ζ=2/(2×2)=0.5000. Omitting normalization by inertia gives incorrect coefficient matching."
      },
      {
        "t": "fill",
        "q": "For a rigid axis with J=6 kg·m², Kp=24 N·m/rad and Kd=12 N·m·s/rad, starting at rest, calculate percent overshoot to a constant angle step. Assume ideal linear PD and no extra poles.",
        "a": 16.3,
        "tol": 0.002,
        "why": "First ωₙ=√(24/6)=2 rad/s and ζ=12/(2√(24×6))=0.5. Then percent overshoot=100exp[-0.5π/√(1-0.5²)]=16.30335%, rounded to 16.30%. Reporting 0.1630 would confuse overshoot fraction with percent.",
        "unit": "%"
      },
      {
        "t": "fill",
        "q": "A rigid-axis PD model has J=7.5 kg·m², Kp=30 N·m/rad and Kd=12 N·m·s/rad. Check that it is underdamped, then estimate its 2% settling time.",
        "a": 5.0,
        "tol": 0.002,
        "why": "ωₙ=√(30/7.5)=2 rad/s and ζ=12/(2√225)=0.4, which lies between zero and one. Hence tₛ≈4/(0.4×2)=5.000 s. Using 4/ωₙ ignores damping; this is an approximate 2% criterion, not an exact settling time.",
        "unit": "s"
      },
      {
        "t": "mc",
        "q": "For a rigid axis with fixed J=7 kg·m² and Kp=28 N·m/rad, which change removes undamped oscillation, and why? Assume ideal rate feedback.",
        "ans": "Raise Kd from zero to 18 N·m·s/rad; rate feedback adds damping.",
        "wrong": [
          "Raise Kp while keeping Kd zero; restoring torque alone supplies dissipative damping.",
          "Lower J while keeping Kd zero; faster motion makes the undamped system dissipate energy.",
          "Raise the fixed command while keeping Kd zero; a larger target increases the damping ratio."
        ],
        "why": "Positive Kd introduces a θ̇ term: with Kd=18, ζ=18/(2√(28×7))=18/28=0.6429 and the poles have negative real parts. Stiffness/damping mistake: Kp changes restoring stiffness, not dissipation. Inertia/damping mistake: changing J alone leaves ζ=0. Command/dynamics mistake: changing a constant reference does not change the linear characteristic polynomial."
      },
      {
        "t": "order",
        "q": "Order the underdamped settling-time calculation for an ideal rigid axis with positive inertia and PD gains.",
        "items": [
          "Write the characteristic polynomial Js²+Kd s+Kp.",
          "Divide through by J and match s²+2ζωₙs+ωₙ².",
          "Calculate ωₙ and ζ from the matched coefficients.",
          "Check that 0<ζ<1 before using the underdamped estimate.",
          "Calculate the approximate 2% settling time 4/(ζωₙ)."
        ],
        "why": "Normalizing first preserves the correct units: ωₙ²=Kp/J and 2ζωₙ=Kd/J. Their product gives ζωₙ=Kd/(2J), so the estimate is also 8J/Kd when its underdamped assumptions hold. At zero damping the response does not settle; for overdamping the slow real pole requires separate attention."
      },
      {
        "t": "decode",
        "q": "“My rigid-axis gains give poles -0.5 and -4.5 s⁻¹, so I should not trust the underdamped settling formula.” What is the reviewer flagging?",
        "ans": "The slow real pole controls an overdamped settling tail.",
        "wrong": [
          "The faster real pole alone controls the final settling tail.",
          "The negative poles imply instability because no oscillation frequency is present.",
          "The underdamped estimate becomes exact whenever both poles are real."
        ],
        "why": "For example, J=4 kg·m², Kp=9 N·m/rad and Kd=20 N·m·s/rad give 4s²+20s+9=4(s+0.5)(s+4.5). Here ωₙ=1.5 rad/s and ζ=5/3>1; the slow -0.5 pole governs late decay. Fast-pole mistake: the -4.5 mode vanishes sooner. Stability-sign mistake: both negative real poles are stable. Formula-range mistake: 4/(ζωₙ)=1.6 s is not a reliable overdamped settling estimate.",
        "who": "Attitude-control engineer"
      }
    ]
  },
  {
    "id": "ctrl-exam-3",
    "sub": "ctrl",
    "subName": "Controls",
    "field": "Across disciplines",
    "section": "Control design",
    "branch": "Spacecraft and quadrotors",
    "lv": 4,
    "title": "Gravity and steady-state error",
    "req": [
      "ctrl-exam-1",
      "ctrl-exam-2"
    ],
    "plain": "A hovering vehicle needs thrust even after it stops moving, so feedback must account for its weight.",
    "cards": [
      "For ideal vertical motion, fix mass m=1.2 kg and gravity g=9.81 m/s². Altitude z is metres; thrust T is newtons. Without drag or saturation, mz̈=T-mg.",
      "For fixed reference z_ref, define error e=z_ref-z. PD uses T=Kp e-Kdż, with Kp in N/m and Kd in N·s/m. Why it happens: at rest, nonzero error supplies weight-supporting thrust.",
      "With fixed demo Kp=40 N/m, Kd=10 N·s/m and z_ref=1 m, stable PD equilibrium gives e_ss=mg/Kp=0.2943 m and final altitude 0.7057 m.",
      "For this unsaturated model, exact gravity feedforward adds mg; PID instead adds Ki∫e dt, with Ki in N/(m·s). Either removes constant-gravity offset when its closed-loop output is asymptotically stable.",
      "With positive m,Kp,Kd, PID requires Ki>0 and KdKp>mKi for asymptotic stability. Demo Ki=40 gives 400>48, so error tends to zero. At Ki=0, it reduces to PD and retains offset."
    ],
    "eqs": [],
    "demo": "ctQuadAlt",
    "qs": [
      {
        "t": "fill",
        "q": "An ideal vertical vehicle has mass m=1.8 kg and g=9.81 m/s². Its stable PD thrust is T=Kp(z_ref-z)-Kdż, with Kp=45 N/m, Kd=12 N·s/m and z_ref=1.6 m. Find steady-state error.",
        "a": 0.3924,
        "tol": 0.002,
        "why": "At equilibrium ż=z̈=0, so T=mg=1.8×9.81=17.658 N. PD then requires Kp e_ss=17.658, giving e_ss=17.658/45=0.3924 m. The corresponding altitude is 1.6-0.3924=1.2076 m. Derivative gain cannot supply static weight support because velocity is zero.",
        "unit": "m"
      },
      {
        "t": "fill",
        "q": "A stable PD altitude loop uses Kp=50 N/m and gravity feedforward m_hat g. Actual mass is 2.0 kg, estimated mass m_hat=1.7 kg, and g=9.81 m/s². With no saturation or other disturbances, find steady-state error.",
        "a": 0.05886,
        "tol": 0.002,
        "why": "At rest, Kp e_ss+m_hat g=mg. The uncancelled force is (2.0-1.7)×9.81=2.943 N, so e_ss=2.943/50=0.05886 m. Using full mg/Kp ignores feedforward; assuming zero error ignores the mass-estimation mismatch.",
        "unit": "m"
      },
      {
        "t": "fill",
        "q": "A vertical PID loop has m=1.5 kg, Kp=36 N/m and Kd=7.5 N·s/m. Find the upper Ki boundary for asymptotic stability, in N/(m·s); equality is excluded.",
        "a": 180.0,
        "tol": 0.002,
        "why": "The characteristic polynomial is 1.5s³+7.5s²+36s+Ki. With all gains positive, Routh requires 7.5×36>1.5Ki, so Ki<270/1.5=180.0 N/(m·s), and Ki>0. The boundary gives an imaginary pair; it is not an included stable setting.",
        "unit": "N/(m·s)"
      },
      {
        "t": "mc",
        "q": "In an ideal unsaturated altitude loop with accurate mass and stable dynamics, which controller removes gravity offset without integrating error, and why?",
        "ans": "PD plus gravity feedforward, because added weight thrust cancels the disturbance.",
        "wrong": [
          "PD with larger derivative gain, because damping produces constant thrust at rest.",
          "PD with finite larger proportional gain, because any increased stiffness makes static error zero.",
          "PID with zero integral gain, because its stored integral still produces adjustable thrust."
        ],
        "why": "Accurate feedforward adds mg, leaving Kp e_ss=0 and hence e_ss=0. Derivative-at-rest mistake: the damping term vanishes at zero velocity. Finite-gain mistake: finite Kp reduces mg/Kp but does not make it zero for nonzero weight. Zero-integral-gain mistake: multiplying the integral by Ki=0 removes its thrust contribution."
      },
      {
        "t": "order",
        "q": "Order an altitude steady-state error analysis for a constant reference and gravity disturbance.",
        "items": [
          "Write the vertical force balance and the actual controller, including feedforward or integral terms.",
          "Derive the closed-loop characteristic polynomial and check output stability.",
          "If the output settles, set vertical velocity and acceleration to zero.",
          "For active stable integral control, also enforce zero error from the integral-state equilibrium.",
          "Solve the remaining force balance for error and final altitude."
        ],
        "why": "The force equation is mz̈=T-mg. Stable PD gives Kp e_ss=mg minus feedforward thrust. Stable PID with Ki>0 also needs the integral-state derivative e to vanish, so the integral supplies the remaining weight thrust. An unstable or marginal loop has no general steady-state limit; applying equilibrium algebra alone does not prove that it is reached."
      },
      {
        "t": "decode",
        "q": "“The PID eliminates gravity error on paper, but Routh gives two sign changes.” What should the reviewer conclude?",
        "ans": "The unstable response invalidates the claimed steady-state tracking result.",
        "wrong": [
          "The integrator guarantees the claimed zero error despite the unstable response.",
          "The constant gravity force changes the Routh sign count after the transient.",
          "The formal zero-error equilibrium makes both unstable modes disappear automatically."
        ],
        "why": "Zero steady-state error requires a reached stable equilibrium or valid final-value-theorem conditions. Integrator-guarantee mistake: integral action can destabilize the loop. Disturbance/pole mistake: constant gravity is a forcing term in this ideal linear model, not a change in characteristic coefficients. Equilibrium/stability mistake: an existing equilibrium does not eliminate growing modes.",
        "who": "Flight-controls reviewer"
      }
    ]
  },
  {
    "id": "ctrl-exam-4",
    "sub": "ctrl",
    "subName": "Controls",
    "field": "Across disciplines",
    "section": "Control design",
    "branch": "Design specifications",
    "lv": 4,
    "title": "Specs to pole locations",
    "req": [
      "ctrl-exam-2"
    ],
    "plain": "Translate response limits into a region where the system’s poles are allowed to sit.",
    "cards": [
      "For a standard zero-free second-order system, poles are σ±jωd: σ is decay rate (s⁻¹), ωd is damped frequency (rad/s), and j²=-1. Stable oscillatory poles have σ<0 and ωd>0.",
      "For its zero-initial-state step, let M be allowed overshoot fraction, 0<M<1. Minimum damping ratio ζ_min=-ln(M)/√(π²+ln²(M)) defines a wedge. Fixed demo M=0.10 gives ζ_min=0.5912.",
      "For this underdamped model, the approximate 2% settling time tₛ=4/|σ| seconds. Fixed demo limit tₛ≤2 s requires σ≤-2 s⁻¹, in addition to the overshoot wedge.",
      "At fixed demo poles -3±3j s⁻¹, ζ=|σ|/√(σ²+ωd²)=0.7071. For the standard step model, overshoot is 4.32% and tₛ≈1.333 s, meeting both limits.",
      "Why it happens: farther-left poles make transients decay faster, while larger damping suppresses overshoot. Both tests matter. Zeros or additional slow poles can invalidate predictions from a selected pole pair alone."
    ],
    "eqs": [],
    "demo": "ctSpecRegion",
    "qs": [
      {
        "t": "fill",
        "q": "For a standard zero-free second-order step response, maximum overshoot is 15%. Convert it to fraction M and calculate ζ_min=-ln(M)/√(π²+ln²(M)).",
        "a": 0.5169,
        "tol": 0.002,
        "why": "Convert 15% to M=0.15. Then -ln(M)=1.897119985 and ζ_min=1.897119985/√(π²+1.897119985²)=0.5169309, rounded to 0.5169. Inserting 15 instead of 0.15 reverses the logarithm sign and cannot represent a positive damping requirement."
      },
      {
        "t": "fill",
        "q": "A standard underdamped second-order design requires approximate 2% settling time no greater than 1.6 s. Using tₛ≈4/|σ|, find the limiting real part σ; more-negative values are allowed.",
        "a": -2.5,
        "tol": 0.002,
        "why": "From 4/|σ|≤1.6, obtain |σ|≥2.5 s⁻¹. Stability selects the negative side, so σ≤-2.500 s⁻¹. The requested boundary is -2.500, not +2.500. Reversing the inequality would admit slower poles close to the imaginary axis.",
        "unit": "s⁻¹"
      },
      {
        "t": "fill",
        "q": "For a zero-free standard second-order system with poles -4±2j s⁻¹ and zero initial conditions, calculate the unit-step overshoot percentage. Derive ζ before evaluating the overshoot formula.",
        "a": 0.1867,
        "tol": 0.002,
        "why": "ωₙ=√(4²+2²)=√20=4.472136 rad/s and ζ=4/√20=0.8944272. Since √(1-ζ²)=2/√20, percent overshoot=100exp[-π(4/2)]=100exp(-2π)=0.1867443%, or 0.1867%. Using ωₙ instead of ωd in the simplified exponent gives the wrong damping dependence.",
        "unit": "%"
      },
      {
        "t": "mc",
        "q": "A standard zero-free second-order loop has poles -1.5±1j s⁻¹. Limits are at most 8% overshoot and approximate 2% settling within 2.4 s. Which verdict and reason are correct?",
        "ans": "Fails settling only: overshoot passes, but the decay is too slow.",
        "wrong": [
          "Passes both: settling uses the full pole magnitude instead of its real part.",
          "Fails overshoot only: settling passes because the damping ratio is high.",
          "Passes both: negative real parts alone guarantee both numerical response limits."
        ],
        "why": "Overshoot=100exp[-π(1.5/1)]=0.8983291%, below 8%. Settling tₛ≈4/1.5=2.666667 s exceeds 2.4 s. Pole-magnitude mistake: 4/√(1.5²+1²)=2.2188 s is not the decay-based estimate. Damping/settling mistake: high damping alone does not enforce the time bound. Stability/specification mistake: stability is weaker than meeting both response limits."
      },
      {
        "t": "order",
        "q": "Order pole-region design for a standard zero-free second-order system with specified maximum overshoot and approximate 2% settling time.",
        "items": [
          "Convert the overshoot percentage to a fraction between zero and one.",
          "Calculate the minimum damping ratio and its left-half-plane wedge.",
          "Convert the settling-time limit to a maximum allowed real part.",
          "Intersect the wedge with the region left of the real-part boundary.",
          "Check the candidate pair against both bounds and confirm the second-order model applies."
        ],
        "why": "The damping bound comes from ζ_min=-ln(M)/√(π²+ln²(M)). The decay bound is σ≤-4/tₛ,max. Their intersection, not their union, enforces both requirements. Negative real parts alone establish only stability; added zeros or significant extra modes require a fuller response calculation."
      },
      {
        "t": "decode",
        "q": "“The pair -6±8j s⁻¹ meets our 12% and 1.5 s limits, but an uncancelled pole at -0.25 s⁻¹ remains.” What does that warning mean? Assume that slow mode has appreciable output amplitude.",
        "ans": "The extra slow mode can dominate settling despite the selected pair.",
        "wrong": [
          "The selected pair guarantees settling regardless of other excited system modes.",
          "The extra pole cancels itself because its real part is negative.",
          "The extra stable pole necessarily makes the full system unstable."
        ],
        "why": "For the selected pair, ζ=6/10=0.6, overshoot=100exp(-0.75π)=9.478022%, and tₛ≈4/6=0.6666667 s, so the pair passes. But the -0.25 mode decays on a 4 s time scale and may control settling when appreciably excited. Selected-pair mistake: pair predictions are not a full-system certificate. Cancellation mistake: cancellation requires a matching zero, not just a negative pole. Stability/performance mistake: a slow stable pole harms speed without itself causing instability.",
        "who": "Control-design reviewer"
      }
    ]
  }
];
/* spot questions number their lines from 1 on screen; the JSON's "why" says "Line index n" (0-based) */
try{XL40.forEach(l=>l.qs.forEach(q=>{if(q.t=="spot"&&typeof q.why=="string")q.why=q.why.replace(/\bLine index (\d+)/g,(m,n)=>"Line "+(+n+1))}))}catch(e){}
try{XL40.forEach(l=>{if(!bq32(l.id))BUNDLE.push(l)})}catch(e){}

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

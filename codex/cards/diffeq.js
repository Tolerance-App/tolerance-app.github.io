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

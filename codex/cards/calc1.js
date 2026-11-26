/* ===== Calculus I reveal cards (against b107) =====
   All 108 cards in 25 lessons. Guess on 28, Fill on 34, 46 with neither.
   Staged with tools/check.py --extra. */

/* ---------- calc1-functions-1 · Functions: inputs and outputs ---------- */
/* 0 · Definition · Fill "exactly one" */
rc98("calc1-functions-1",0,{p:[
 {t:"p",x:"A **function** assigns an output to each allowed input."},
 {t:"p",x:"Each input has [[exactly one]] output."},
 {t:"p",x:"Two different inputs can share an output."}]});

/* 1 · Worked example. Double 3 to get 6, then add 1 to get 7 · no interaction */
rc98("calc1-functions-1",1,{p:[
 {t:"p",x:"In $f(x)=2x+1$, $x$ is the input. Double it, then add one."},
 {t:"giv",lab:"Input",rows:[["x","3",""]]},
 {t:"step",f:"2·3",v:"6",u:""},
 {t:"step",f:"6+1",v:"f(3)=7",u:"",fin:1}]});

/* 2 · Notation. The 5 is a given input · Guess */
rc98("calc1-functions-1",2,{p:[
 {t:"p",x:"Read $f(x)$ as “$f$ of $x$.” The parentheses tell you which input to use."},
 {t:"take",x:"Replace every $x$ in the rule with $5$, then calculate."}],
 g:{at:1,q:"What does $f(5)$ ask you to do?",o:[
  ["Use 5 as the input",1,"Replace every x by 5."],
  ["Multiply f by 5",0,"The parentheses indicate evaluation."]]}});

/* 3 · Examples · no interaction */
rc98("calc1-functions-1",3,{p:[
 {t:"p",x:"A beam model can give deflection as an output for a specified load."},
 {t:"p",x:"A heating model can give temperature as an output for a specified time."}]});

/* 4 · Graph reading · Fill "input" */
rc98("calc1-functions-1",4,{p:[
 {t:"p",x:"Find the [[input]] on the horizontal axis."},
 {t:"p",x:"Follow a vertical line to the curve."},
 {t:"p",x:"Read the output from the vertical axis."}]});

/* 5 · One-output rule · Guess */
rc98("calc1-functions-1",5,{p:[
 {t:"p",x:"Consider a model where two allowed inputs give the same output."},
 {t:"take",x:"Yes. Multiple inputs may share an output. Each input still gets just one output."}],
 g:{at:1,q:"Can this rule still be a function?",o:[
  ["Yes",1,"Each input still has one output."],
  ["No",0,"Outputs may repeat across different inputs."]]}});

/* ---------- calc1-limits-1 · Domains and composition ---------- */
/* 0 · Domain check · Fill "allowed input" */
rc98("calc1-limits-1",0,{p:[
 {t:"p",x:"Before calculating, ask which inputs the formula accepts."},
 {t:"p",x:"In a chain of formulas, every intermediate output must also be an [[allowed input]] for the next rule."}]});

/* 1 · Terms · no interaction */
rc98("calc1-limits-1",1,{p:[
 {t:"p",x:"The **domain** is the set of inputs the function accepts."},
 {t:"p",x:"The **range** is the set of outputs those inputs actually produce."}]});

/* 2 · Domain comparisons. √0=0 since 0²=0. exp(u) stays positive for every real u · Guess */
rc98("calc1-limits-1",2,{p:[
 {t:"p",x:"For real-valued formulas, check denominators, square roots and logarithms."},
 {t:"p",x:"A denominator must be nonzero. A square-root input may be zero or positive. A logarithm needs a positive input."}],
 g:{at:1,q:"Which expression is defined at zero?",o:[
  ["1 divided by zero",0,"Division requires a nonzero denominator."],
  ["Square root",1,"The real square root accepts zero."],
  ["Natural logarithm",0,"The real logarithm requires a positive input."]]}});

/* 3 · Composition · Fill "inside out" */
rc98("calc1-limits-1",3,{p:[
 {t:"p",x:"In $f(g(x))$, $x$ enters the inner function $g$."},
 {t:"p",x:"Evaluate from the [[inside out]]."},
 {t:"p",x:"Feed the output $g(x)$ into the outer function $f$."}]});

/* 4 · Worked domain. Adding 3 to x−3>0 gives x>3 · no interaction */
rc98("calc1-limits-1",4,{p:[
 {t:"p",x:"Let the inner rule be $g(x)=x−3$ and the outer rule be $f(u)=ln(u)$, where $u$ is its input."},
 {t:"p",x:"The logarithm accepts only positive inputs, so $x−3>0$."},
 {t:"eq",eq:"x>3"}]});

/* 5 · Worked domain. Adding 4 to x−4≥0 gives x≥4 · Guess */
rc98("calc1-limits-1",5,{p:[
 {t:"p",x:"Take $g(x)=x−4$ and $f(u)=√{u}$, where $u$ is the outer input."},
 {t:"p",x:"Keep only inputs with $x−4≥0$, so the composite domain is $x≥4$."}],
 g:{at:1,q:"Does g need to produce only allowed inputs to f everywhere?",o:[
  ["Yes",0,"Composition can restrict which x it accepts."],
  ["No",1,"Use the x values where the output of g is allowed by f."]]}});

/* ---------- calc1-limits-2 · Limits and removable holes ---------- */
/* 0 · Nearby values · Fill "missing" */
rc98("calc1-limits-2",0,{p:[
 {t:"p",x:"A limit describes the output a function approaches near a point."},
 {t:"p",x:"The formula can approach a value even if the exact point is [[missing]]."}]});

/* 1 · Limit notation · no interaction */
rc98("calc1-limits-2",1,{p:[
 {t:"p",x:"Let $a$ be the input approached and $L$ the proposed output limit."},
 {t:"p",x:"As $x$ gets sufficiently close to $a$ with $x≠a$, $f(x)$ must get as close to $L$ as requested."},
 {t:"eq",eq:"lim_{x→a} f(x) = L"}]});

/* 2 · Undefined quotient. Direct substitution gives a numerator and denominator of zero · Guess */
rc98("calc1-limits-2",2,{p:[
 {t:"p",x:"Direct substitution into a quotient can make both numerator and denominator zero."},
 {t:"take",x:"An indeterminate form calls for another step, such as factoring."}],
 g:{at:1,q:"Does $0/0$ determine the limit?",o:[
  ["Yes",0,"The expression is undefined and gives no limit value by itself."],
  ["No",1,"Look at nearby inputs, often after simplifying."]]}});

/* 3 · Worked example. Difference of squares factors; evaluating x+1 at x=1 gives 2 · no interaction */
rc98("calc1-limits-2",3,{p:[
 {t:"p",x:"Consider $(x^2−1)/(x−1)$ near $x=1$."},
 {t:"p",x:"Factor the numerator as $(x−1)(x+1)$."},
 {t:"p",x:"Cancel the common factor for $x≠1$."},
 {t:"step",f:"lim_{x→1} (x+1)",v:"2",u:"",fin:1}]});

/* 4 · Removable hole. The missing height is 1+1=2 · Fill "removable" */
rc98("calc1-limits-2",4,{p:[
 {t:"p",x:"The original quotient still excludes $x=1$."},
 {t:"p",x:"The missing point is at $(1,2)$."},
 {t:"p",x:"The discontinuity is [[removable]] because defining that value would join the nearby line."}]});

/* 5 · Agreement near a point · Guess */
rc98("calc1-limits-2",5,{p:[
 {t:"p",x:"Two formulas agree near $a$ on both sides, with a possible exception at $a$."},
 {t:"take",x:"Agreement on nearby inputs gives the same limit."}],
 g:{at:1,q:"If one has a limit at a, what about the other?",o:[
  ["Same limit",1,"They agree for the nearby inputs used by the limit."],
  ["Possibly different",0,"The value at a is excluded from the limit."]]}});

/* ---------- calc1-limits-3 · One-sided and infinite limits ---------- */
/* 0 · One-sided behavior · no interaction */
rc98("calc1-limits-3",0,{p:[
 {t:"p",x:"You can approach a point from either side."},
 {t:"p",x:"The outputs can approach different values or grow without bound."}]});

/* 1 · Two-sided criterion · Fill "agree" */
rc98("calc1-limits-3",1,{p:[
 {t:"p",x:"Near the target input $a$, the left limit uses $x<a$ and the right limit uses $x>a$."},
 {t:"p",x:"A finite two-sided limit needs both one-sided limits to [[agree]]."},
 {t:"p",x:"Their shared value is the two-sided limit."}]});

/* 2 · Piecewise procedure · Guess */
rc98("calc1-limits-3",2,{p:[
 {t:"p",x:"To compute a one-sided limit, use the branch for nearby inputs on that side."},
 {t:"take",x:"A value assigned at the target affects neither approach."}],
 g:{at:1,q:"If you change only the value at the target, do the side limits change?",o:[
  ["Yes",0,"Neither side uses the exact target input."],
  ["No",1,"The nearby branch values stay the same."]]}});

/* 3 · Vertical asymptote · Fill "without bound" */
rc98("calc1-limits-3",3,{p:[
 {t:"p",x:"Suppose a quotient has numerator approaching a nonzero value and denominator approaching zero."},
 {t:"p",x:"The magnitude grows [[without bound]]."},
 {t:"p",x:"If the denominator keeps its sign on one side, the quotient tends to $+∞$ or $−∞$ there. This gives a vertical asymptote."}]});

/* 4 · Sign comparison. x−2 changes sign at 2; its square is positive for x≠2 · no interaction */
rc98("calc1-limits-3",4,{p:[
 {t:"p",x:"For $1/(x−2)$, the denominator is negative on the left of $2$ and positive on the right."},
 {t:"p",x:"The limits are $−∞$ on the left and $+∞$ on the right."},
 {t:"p",x:"Squaring the denominator gives $1/(x−2)^2$, which tends to $+∞$ on both sides."}]});

/* 5 · Indeterminate versus unbounded. The denominator tending to zero drives the nonzero numerator case · Guess */
rc98("calc1-limits-3",5,{p:[
 {t:"p",x:"When both parts approach zero, simplification may reveal a hole or different behavior."},
 {t:"take",x:"The magnitude grows without bound, so there is no finite limit."}],
 g:{at:1,q:"When the numerator approaches a nonzero value and the denominator approaches zero, can the quotient have a finite limit?",o:[
  ["Yes",0,"Its magnitude grows beyond any finite bound."],
  ["No",1,"A nonvanishing numerator over a vanishing denominator grows unbounded in magnitude."]]}});

/* ---------- calc1-limits-4 · Squeeze theorem and precise limits ---------- */
/* 0 · Squeeze setup · no interaction */
rc98("calc1-limits-4",0,{p:[
 {t:"p",x:"A hard expression can be bounded above and below near a target input."},
 {t:"p",x:"Matching limits of those bounds tell you what the expression approaches."}]});

/* 1 · Squeeze theorem. Figure: abs(sin(1/x))≤1 gives bounds ±x², both tending to zero · no interaction */
rc98("calc1-limits-4",1,{p:[
 {t:"p",x:"Use lower and upper bounds that hold near the target input."},
 {t:"p",x:"If the two bounds approach the same value, the trapped function has that limit too."}]});

/* 2 · Terms · no interaction */
rc98("calc1-limits-4",2,{p:[
 {t:"p",x:"A positive $ε$ is the allowed output error from the proposed limit."},
 {t:"p",x:"A positive $δ$ is an input distance from the target. Exclude the target itself."},
 {t:"p",x:"Both distances are dimensionless in this setting."}]});

/* 3 · Reason · Fill "both bounds" */
rc98("calc1-limits-4",3,{p:[
 {t:"p",x:"Given an output tolerance, each bound eventually stays inside it."},
 {t:"p",x:"Choose an input distance small enough for [[both bounds]]."},
 {t:"p",x:"All trapped values are then within that same output tolerance."}]});

/* ---------- calc1-continuity-1 · Continuity at a point ---------- */
/* 0 · Definition · Fill "actual value" */
rc98("calc1-continuity-1",0,{p:[
 {t:"p",x:"A function is continuous at an input when its nearby outputs approach the [[actual value]]."},
 {t:"p",x:"The nearby prediction and the point value must agree."}]});

/* 1 · Continuity test · no interaction */
rc98("calc1-continuity-1",1,{p:[
 {t:"p",x:"At the target input, the function must have a defined value."},
 {t:"p",x:"Its two-sided limit must exist and be finite."},
 {t:"p",x:"That limit must equal the function value."}]});

/* 2 · Compare discontinuities · no interaction */
rc98("calc1-continuity-1",2,{p:[
 {t:"p",x:"A **jump** has different finite left and right limits."},
 {t:"p",x:"A **removable discontinuity** has a finite limit and a missing or mismatched value."}]});

/* 3 · Repair at a point · Guess */
rc98("calc1-continuity-1",3,{p:[
 {t:"p",x:"Suppose both sides approach the same finite value but the point is missing."},
 {t:"take",x:"Filling a hole is possible. Changing one value cannot repair a jump."}],
 g:{at:1,q:"Can you fix continuity by filling that point?",o:[
  ["Yes",1,"Assign the common limit at the missing point."],
  ["No",0,"The nearby values already agree on the needed value."]]}});

/* ---------- calc1-continuity-2 · Intermediate value theorem ---------- */
/* 0 · Intermediate values · Fill "intermediate value" */
rc98("calc1-continuity-2",0,{p:[
 {t:"p",x:"Imagine a continuous output changing between two endpoint values."},
 {t:"p",x:"Every [[intermediate value]] is attained somewhere between the endpoints."}]});

/* 1 · Theorem · no interaction */
rc98("calc1-continuity-2",1,{p:[
 {t:"p",x:"Take a continuous function on a closed interval."},
 {t:"p",x:"The **intermediate value theorem** guarantees an input for every output between its endpoint outputs."}]});

/* 2 · Root guarantee · Guess */
rc98("calc1-continuity-2",2,{p:[
 {t:"p",x:"A continuous function has opposite signs at two endpoints."},
 {t:"take",x:"There is at least one zero in between. Uniqueness needs more information."}],
 g:{at:1,q:"How many interior zeros are guaranteed?",o:[
  ["At least one",1,"Zero lies between the endpoint outputs."],
  ["Exactly one",0,"Continuity allows more than one crossing."]]}});

/* 3 · Continuity matters · Fill "jump" */
rc98("calc1-continuity-2",3,{p:[
 {t:"p",x:"A continuous move from negative to positive must pass through zero."},
 {t:"p",x:"A [[jump]] can skip zero, so opposite signs alone can fail to locate a root."}]});

/* ---------- calc1-continuity-3 · Extreme value theorem ---------- */
/* 0 · Attained extrema · Fill "attained" */
rc98("calc1-continuity-3",0,{p:[
 {t:"p",x:"Take a continuous real-valued function on a closed, bounded interval."},
 {t:"p",x:"Its highest and lowest values are both [[attained]] somewhere on the interval."}]});

/* 1 · Theorem · no interaction */
rc98("calc1-continuity-3",1,{p:[
 {t:"p",x:"The **extreme value theorem** gives an absolute maximum and an absolute minimum under those conditions."},
 {t:"p",x:"Either can occur inside the interval or at an included endpoint."}]});

/* 2 · Lost guarantee · Guess */
rc98("calc1-continuity-3",2,{p:[
 {t:"p",x:"Suppose outputs approach an upper bound near an excluded endpoint."},
 {t:"p",x:"A **supremum** is the least upper bound and can go unattained. Open endpoints, unbounded domains or discontinuities can remove the guarantee."}],
 g:{at:1,q:"Must the function attain that bound?",o:[
  ["Yes",0,"The excluded endpoint is unavailable, and no other point need reach it."],
  ["No",1,"A supremum is a least upper bound and need not be attained."]]}});

/* 3 · Reason · no interaction */
rc98("calc1-continuity-3",3,{p:[
 {t:"p",x:"Choose input points with values approaching the least upper bound."},
 {t:"p",x:"Compactness gives a subsequence that converges to an input in the interval."},
 {t:"p",x:"Continuity makes the function value at that input equal to the bound. Apply the same argument to the lower bound."}]});

/* ---------- calc1-continuity-4 · Uniform continuity ---------- */
/* 0 · Shared tolerance · no interaction */
rc98("calc1-continuity-4",0,{p:[
 {t:"p",x:"Ask for a fixed output accuracy everywhere on the domain."},
 {t:"p",x:"Uniform continuity calls for one input tolerance shared across all locations."}]});

/* 1 · Compare definitions · Fill "common tolerance" */
rc98("calc1-continuity-4",1,{p:[
 {t:"p",x:"Pointwise continuity lets the input tolerance depend on the location."},
 {t:"p",x:"Uniform continuity needs a [[common tolerance]] for any two inputs close enough together."}]});

/* 2 · Compactness theorem · Guess */
rc98("calc1-continuity-4",2,{p:[
 {t:"p",x:"A continuous function on a closed, bounded interval is uniformly continuous."},
 {t:"take",x:"On an unbounded interval, continuity alone gives no global tolerance guarantee."}],
 g:{at:1,q:"Does continuity alone guarantee the same on an unbounded interval?",o:[
  ["Yes",0,"An unbounded interval can have increasingly sensitive regions."],
  ["No",1,"One input tolerance may fail far from the origin."]]}});

/* 3 · Reason · Fill "smaller steps" */
rc98("calc1-continuity-4",3,{p:[
 {t:"p",x:"If sensitivity grows without bound, a given input step can have larger effects farther along the domain."},
 {t:"p",x:"Some functions then need progressively [[smaller steps]] to keep the same output accuracy."}]});

/* ---------- calc1-derivative-rules-1 · Derivative from a limit ---------- */
/* 0 · Local rate · Fill "instantaneous" */
rc98("calc1-derivative-rules-1",0,{p:[
 {t:"p",x:"Change the input of a function by a small amount."},
 {t:"p",x:"Its derivative measures the [[instantaneous]] output change per unit of input."}]});

/* 1 · Difference quotient · no interaction */
rc98("calc1-derivative-rules-1",1,{p:[
 {t:"p",x:"Let $x$ be the input and $h$ a nonzero increment. The output change is $Δf=f(x+h)−f(x)$."},
 {t:"p",x:"The average rate is the output change divided by $h$. Call it $Q(h)=Δf/h$."},
 {t:"eq",eq:"f′(x) = lim_{h→0} Q(h)",cap:"when this limit exists"}]});

/* 2 · Worked example. (x+h)²−x²=2xh+h²; divide by h≠0; h→0 leaves 2x · no interaction */
rc98("calc1-derivative-rules-1",2,{p:[
 {t:"p",x:"Take $f(x)=x^2$, with dimensionless input $x$ and nonzero increment $h$."},
 {t:"step",f:"[f(x+h)−f(x)]/h",v:"(2xh+h^2)/h",u:""},
 {t:"step",f:"2x+h as h→0",v:"2x",u:"",fin:1}]});

/* 3 · Finite-step correction · Guess */
rc98("calc1-derivative-rules-1",3,{p:[
 {t:"p",x:"For the square function, $h$ is the extra term in the average rate over a step."},
 {t:"take",x:"The derivative keeps the coefficient of the leading local change."}],
 g:{at:1,q:"As the step tends to zero, what happens to this correction?",o:[
  ["It vanishes",1,"It is the input increment itself."],
  ["It remains fixed",0,"The correction shrinks with the input step."]]}});

/* ---------- calc1-derivative-rules-2 · Product and quotient rules ---------- */
/* 0 · Product setup · Fill "each factor" */
rc98("calc1-derivative-rules-2",0,{p:[
 {t:"p",x:"Both factors of a product can vary with the input."},
 {t:"p",x:"The total change contains a contribution from [[each factor]]."}]});

/* 1 · Product rule · no interaction */
rc98("calc1-derivative-rules-2",1,{p:[
 {t:"p",x:"Let $u$ and $v$ be differentiable functions of the same input. Primes denote derivatives with respect to that input."},
 {t:"eq",eq:"(uv)′ = u′v + uv′"}]});

/* 2 · Quotient rule. Differentiating v·(u/v)=u and isolating the quotient derivative gives denominator v² · no interaction */
rc98("calc1-derivative-rules-2",2,{p:[
 {t:"p",x:"Let the numerator $u$ and denominator $v$ be differentiable, with $v≠0$. Primes denote derivatives."},
 {t:"eq",eq:"(u/v)′ = (u′v−uv′)/v^2"}]});

/* 3 · First-order terms · Guess */
rc98("calc1-derivative-rules-2",3,{p:[
 {t:"p",x:"When both factors change, each change acts against the current value of the other factor."},
 {t:"take",x:"Add the two first-order contributions. The product of both small changes is of higher order."}],
 g:{at:1,q:"Does multiplying the two derivatives give the product derivative?",o:[
  ["Yes",0,"That misses the terms involving each factor's current value."],
  ["No",1,"First-order change comes from changing either factor while holding the other at its current value."]]}});

/* ---------- calc1-derivative-rules-3 · Chain rule and elementary functions ---------- */
/* 0 · Nested response · Fill "multiply" */
rc98("calc1-derivative-rules-3",0,{p:[
 {t:"p",x:"In a nested rule, the inner output becomes the outer input."},
 {t:"p",x:"The local sensitivities [[multiply]]."}]});

/* 1 · Chain rule · no interaction */
rc98("calc1-derivative-rules-3",1,{p:[
 {t:"p",x:"Let $g$ be the inner function and $f$ the outer function. Both must be differentiable at the inputs they receive."},
 {t:"p",x:"Evaluate the outer derivative at the inner output $g(x)$."},
 {t:"eq",eq:"(f(g(x)))′ = f′(g(x))g′(x)",cap:"prime denotes the derivative of each function with respect to its own input"}]});

/* 2 · Elementary rules. The exponential has unit slope at zero; invert it for ln. Sine addition and the radian limits give cos · no interaction */
rc98("calc1-derivative-rules-3",2,{p:[
 {t:"p",x:"Let $x$ be dimensionless. For sine, measure the angle in radians."},
 {t:"eq",eq:"d(exp(x))/dx = exp(x)"},
 {t:"eq",eq:"d(ln(x))/dx = 1/x",cap:"x > 0"},
 {t:"eq",eq:"d(sin(x))/dx = cos(x)"}]});

/* 3 · Local conversion · Guess */
rc98("calc1-derivative-rules-3",3,{p:[
 {t:"p",x:"A small change in $x$ changes the inner output, and that change drives the outer output."},
 {t:"take",x:"Multiply the inner rate by the outer rate evaluated at the inner output."}],
 g:{at:1,q:"How do the two local conversion factors combine?",o:[
  ["Add",0,"They act in sequence on different stages of the change."],
  ["Multiply",1,"Each factor scales the change passed to it."]]}});

/* ---------- calc1-derivative-rules-4 · Higher derivatives and smoothness ---------- */
/* 0 · Smoothness setup · Fill "single local rate" */
rc98("calc1-derivative-rules-4",0,{p:[
 {t:"p",x:"At a point, nearby values may agree with the actual value."},
 {t:"p",x:"That point can still lack a [[single local rate]]."}]});

/* 1 · Higher derivatives · no interaction */
rc98("calc1-derivative-rules-4",1,{p:[
 {t:"p",x:"The second derivative is the derivative of the first. Repeat the operation wherever the needed derivatives exist."},
 {t:"p",x:"Differentiability implies continuity at the point. A continuous function can still have a corner."}]});

/* 2 · Absolute value. For h<0, abs(h)/h=−1; for h>0, abs(h)/h=+1 · no interaction */
rc98("calc1-derivative-rules-4",2,{p:[
 {t:"p",x:"Take $f(x)=∣x∣$ with dimensionless input $x$. Its graph meets at the origin."},
 {t:"p",x:"The left-side difference quotient at zero is $−1$. The right-side quotient is $+1$."},
 {t:"p",x:"The mismatch rules out a derivative there."}]});

/* 3 · Corner · Guess */
rc98("calc1-derivative-rules-4",3,{p:[
 {t:"p",x:"At a corner, the output values meet, but the local rate from the left differs from the rate from the right."},
 {t:"take",x:"Both approaches must give the same local rate for the derivative to exist."}],
 g:{at:1,q:"Can a single derivative describe both sides?",o:[
  ["No",1,"A derivative needs matching limits of the difference quotient."],
  ["Yes",0,"The agreement of function values establishes continuity only."]]}});

/* ---------- calc1-implicit-1 · Implicit differentiation ---------- */
/* 0 · Constraint · Fill "constraint" */
rc98("calc1-implicit-1",0,{p:[
 {t:"p",x:"An equation can link two variables without isolating either one."},
 {t:"p",x:"You can find how one responds to the other by differentiating the [[constraint]]."}]});

/* 1 · Implicit setup · no interaction */
rc98("calc1-implicit-1",1,{p:[
 {t:"p",x:"An **implicit equation** relates $x$ and $y$ without writing an explicit output rule."},
 {t:"p",x:"On a differentiable branch, treat $y$ as a function of $x$ and differentiate both sides."}]});

/* 2 · Worked example. d(x²)/dx=2x; chain rule gives 2y·dy/dx; d(25)/dx=0 · no interaction */
rc98("calc1-implicit-1",2,{p:[
 {t:"p",x:"Let dimensionless $x$ and $y$ satisfy $x^2+y^2=25$."},
 {t:"p",x:"Write $y′$ for $dy/dx$."},
 {t:"eq",eq:"2x + 2y y′ = 0"}]});

/* 3 · Chain-rule factor · Guess */
rc98("calc1-implicit-1",3,{p:[
 {t:"p",x:"The expression $y^2$ depends on $x$ through $y$."},
 {t:"take",x:"Include the factor $dy/dx$ when differentiating a changing expression in $y$."}],
 g:{at:1,q:"When differentiating with respect to x, does the y term include the rate of y?",o:[
  ["Yes",1,"The chain rule multiplies by the derivative of the inner function y."],
  ["No",0,"The derivative of the outer square alone misses how y responds to x."]]}});

/* ---------- calc1-implicit-2 · Inverse-function derivatives ---------- */
/* 0 · Inverse relationship · Fill "reciprocal" */
rc98("calc1-implicit-2",0,{p:[
 {t:"p",x:"A one-to-one relation lets you swap the roles of input and output."},
 {t:"p",x:"The reverse local conversion factor is the [[reciprocal]] when the original rate is nonzero."}]});

/* 1 · Inverse derivative · no interaction */
rc98("calc1-implicit-2",1,{p:[
 {t:"p",x:"Let $f$ have a differentiable local inverse near $y=f(x)$, with $f′(x)≠0$. Primes denote derivatives."},
 {t:"eq",eq:"(f^{-1})′(y) = 1/f′(x)",cap:"evaluate the original rate at the matching input"}]});

/* 2 · Worked inverse. d(tan θ)/dθ=sec² θ=1+tan² θ=1+x²; invert · no interaction */
rc98("calc1-implicit-2",2,{p:[
 {t:"p",x:"Restrict tangent to angles between $−π/2$ and $π/2$ to get a single-valued inverse."},
 {t:"p",x:"With dimensionless input $x$ and angles in radians, its inverse has slope"},
 {t:"eq",eq:"d(arctan(x))/dx = 1/(1+x^2)"}]});

/* 3 · Identity · Guess */
rc98("calc1-implicit-2",3,{p:[
 {t:"p",x:"Applying a function and then its inverse gives the starting input. Assume both are differentiable at the matching points."},
 {t:"take",x:"The chain rule makes the two rates multiply to one."}],
 g:{at:1,q:"What is the product of their local derivatives at the paired points?",o:[
  ["One",1,"The composite is the identity, which has slope one."],
  ["Zero",0,"The composite changes by the same amount as the input."]]}});

/* ---------- calc1-implicit-3 · Logarithmic differentiation ---------- */
/* 0 · Log transform · Fill "sums" */
rc98("calc1-implicit-3",0,{p:[
 {t:"p",x:"A product or a variable power can be awkward to differentiate directly."},
 {t:"p",x:"For positive expressions, logs turn products into [[sums]] and bring exponents down as factors."}]});

/* 1 · Logarithmic differentiation · no interaction */
rc98("calc1-implicit-3",1,{p:[
 {t:"p",x:"For differentiable $y>0$, take the natural log of both sides of its defining expression."},
 {t:"p",x:"Differentiate the transformed equation. On the left the chain rule gives $y′/y$, with $y′$ the rate of $y$."}]});

/* 2 · Worked example. d(x ln x)/dx=ln x+x·(1/x)=ln x+1 · no interaction */
rc98("calc1-implicit-3",2,{p:[
 {t:"p",x:"Take $y=x^x$ for dimensionless $x>0$. Write $y′$ for $dy/dx$."},
 {t:"eq",eq:"ln(y) = x ln(x)"},
 {t:"eq",eq:"y′/y = ln(x)+1"}]});

/* 3 · Both dependencies · Guess */
rc98("calc1-implicit-3",3,{p:[
 {t:"p",x:"In $x^x$, the same input appears in the base and the exponent."},
 {t:"take",x:"Differentiate both factors of $x ln(x)$ after taking the log."}],
 g:{at:1,q:"Can a constant-exponent power rule alone account for both changes?",o:[
  ["Yes",0,"It treats the exponent as fixed and misses its change."],
  ["No",1,"Taking the logarithm gives a product whose two factors both depend on the input."]]}});

/* ---------- calc1-implicit-4 · Related rates ---------- */
/* 0 · Shared constraint · Fill "rates" */
rc98("calc1-implicit-4",0,{p:[
 {t:"p",x:"A geometric equation can hold throughout a motion."},
 {t:"p",x:"Differentiate it to connect the [[rates]] of the linked quantities."}]});

/* 1 · Snapshot procedure · no interaction */
rc98("calc1-implicit-4",1,{p:[
 {t:"p",x:"Write the constraint using variables that depend on the same independent variable, often time."},
 {t:"p",x:"Differentiate with respect to that variable, then substitute the values at the instant of interest."}]});

/* 2 · Circle. d(πr²)/dt=π·2r·dr/dt · no interaction */
rc98("calc1-implicit-4",2,{p:[
 {t:"p",x:"Let $A$ be circle area and $r$ radius, each dimensionless and depending on dimensionless time $t$."},
 {t:"eq",eq:"A(t) = πr(t)^2"},
 {t:"eq",eq:"dA/dt = 2πr · dr/dt"}]});

/* 3 · Snapshot pitfall · Guess */
rc98("calc1-implicit-4",3,{p:[
 {t:"p",x:"A changing radius has a known value at one instant."},
 {t:"take",x:"Keep the varying geometry through the differentiation step."}],
 g:{at:1,q:"When should you substitute that fixed value for the radius?",o:[
  ["Before differentiating",0,"Treating it as a constant erases its variation in time."],
  ["After differentiating",1,"First preserve the dependency, then evaluate at the instant."]]}});

/* ---------- calc1-applications-1 · Mean value theorem ---------- */
/* 0 · Mean value setup · Fill "attained" */
rc98("calc1-applications-1",0,{p:[
 {t:"p",x:"Over an interval, compare the overall average rate with the instantaneous rate inside."},
 {t:"p",x:"With the right smoothness, the average rate is [[attained]] somewhere in the interior."}]});

/* 1 · Mean value theorem · no interaction */
rc98("calc1-applications-1",1,{p:[
 {t:"p",x:"Let $f$ be continuous on $[a,b]$ with $a<b$, and differentiable on $(a,b)$."},
 {t:"p",x:"At some interior input $c$, the instantaneous rate equals the endpoint average rate."},
 {t:"eq",eq:"f′(c) = (f(b)−f(a))/(b−a)"}]});

/* 2 · Rolle special case. Equal endpoint values give a zero numerator and b−a>0 · Guess */
rc98("calc1-applications-1",2,{p:[
 {t:"p",x:"Suppose the mean value theorem applies and the endpoints have equal outputs."},
 {t:"take",x:"Rolle’s theorem guarantees at least one interior point with derivative zero."}],
 g:{at:1,q:"What interior rate is guaranteed?",o:[
  ["Zero",1,"The endpoint rise is zero, so the secant slope is zero."],
  ["Positive",0,"The guaranteed rate equals the endpoint secant slope."]]}});

/* 3 · Proof idea · no interaction */
rc98("calc1-applications-1",3,{p:[
 {t:"p",x:"Subtract the line through the endpoint values from the function."},
 {t:"p",x:"The remainder has equal endpoint values. If it is constant, its rate is zero throughout."},
 {t:"p",x:"Otherwise an interior extremum has zero derivative. There the original slope equals the slope of the line."}]});

/* ---------- calc1-applications-2 · Extrema, concavity, and inflection ---------- */
/* 0 · Two rates · Fill "rate changes" */
rc98("calc1-applications-2",0,{p:[
 {t:"p",x:"The first derivative tells how the function changes."},
 {t:"p",x:"The second derivative tells how that [[rate changes]]."}]});

/* 1 · Critical candidates. Figure: for x³−3x, f′=3x²−3 vanishes at ±1, and f″=6x changes sign at zero · no interaction */
rc98("calc1-applications-2",1,{p:[
 {t:"p",x:"At an interior **critical point**, the first derivative is zero or undefined."},
 {t:"p",x:"For an absolute extremum, compare candidate values with values at included endpoints."}]});

/* 2 · Concavity · Guess */
rc98("calc1-applications-2",2,{p:[
 {t:"p",x:"Over an interval, a positive second derivative gives upward concavity, and a negative one gives downward concavity."},
 {t:"take",x:"A change of concavity is what marks an inflection."}],
 g:{at:1,q:"At an isolated zero of the second derivative, is inflection guaranteed?",o:[
  ["Yes",0,"The concavity can stay the same on both sides."],
  ["No",1,"Check whether the concavity changes across the point."]]}});

/* 3 · Stationary point · Fill "no change" */
rc98("calc1-applications-2",3,{p:[
 {t:"p",x:"The sign of the first derivative indicates increasing or decreasing behavior on intervals where that sign holds."},
 {t:"p",x:"A stationary point can occur with [[no change]] in that behavior, so test before calling it an extremum."}]});

/* ---------- calc1-applications-3 · Optimization and linearization ---------- */
/* 0 · Two uses · no interaction */
rc98("calc1-applications-3",0,{p:[
 {t:"p",x:"A derivative can identify candidates for a best feasible choice."},
 {t:"p",x:"It can also predict the output change from a small input adjustment."}]});

/* 1 · Optimization · no interaction */
rc98("calc1-applications-3",1,{p:[
 {t:"p",x:"Define the objective and the feasible inputs first."},
 {t:"p",x:"A zero derivative supplies an interior candidate. Check points with undefined derivative and any included endpoints too."},
 {t:"take",x:"Compare feasible candidates to establish the best value."}]});

/* 2 · Linearization · Fill "local" */
rc98("calc1-applications-3",2,{p:[
 {t:"p",x:"Near reference input $a$, let $Δx$ be a small input change. Use the local slope $f′(a)$."},
 {t:"eq",eq:"f(a+Δx) ≈ f(a)+f′(a)Δx",cap:"differentiable at the reference input"},
 {t:"p",x:"The approximation is [[local]], and accuracy can degrade away from $a$."}]});

/* 3 · Error · Guess */
rc98("calc1-applications-3",3,{p:[
 {t:"p",x:"Differentiability makes the linearization error small compared with the input step as the step tends to zero."},
 {t:"take",x:"A tangent approximation has a local error guarantee."}],
 g:{at:1,q:"Does this guarantee equally good accuracy far from the reference?",o:[
  ["No",1,"Curvature can make the tangent a poor model farther away."],
  ["Yes",0,"The derivative controls the leading behavior only near the reference."]]}});

/* ---------- calc1-applications-4 · L’Hôpital and Newton iterations ---------- */
/* 0 · Two derivative uses · no interaction */
rc98("calc1-applications-4",0,{p:[
 {t:"p",x:"A quotient limit and a root-finding iteration ask different questions."},
 {t:"p",x:"The limit asks what values approach. The iteration asks where the function is zero."}]});

/* 1 · L’Hôpital rule. Zero-over-zero and infinity-over-infinity are eligible forms only under the rule’s hypotheses · Guess */
rc98("calc1-applications-4",1,{p:[
 {t:"p",x:"For an eligible $0/0$ or $∞/∞$ limit, check differentiability near the target, a nonzero denominator derivative and a limit of the derivative ratio."},
 {t:"take",x:"Take the limit of the ratio of the separate derivatives when the hypotheses hold."}],
 g:{at:1,q:"Which derivative expression does the rule use?",o:[
  ["Ratio of derivatives",1,"Differentiate numerator and denominator separately."],
  ["Derivative of the original quotient",0,"That answers a different question under the quotient rule."]]}});

/* 2 · Newton update · no interaction */
rc98("calc1-applications-4",2,{p:[
 {t:"p",x:"Let $x$ be the current root estimate for $f$, with derivative $f′(x)≠0$."},
 {t:"eq",eq:"x_{next} = x−f(x)/f′(x)"},
 {t:"p",x:"Convergence depends on the function and the starting point."}]});

/* 3 · Tangent interpretation · Fill "tangent line" */
rc98("calc1-applications-4",3,{p:[
 {t:"p",x:"Newton’s next estimate is the zero of the [[tangent line]]."},
 {t:"p",x:"A poor tangent model or tiny nonzero derivative can send the next estimate far away."}]});

/* ---------- calc1-integrals-1 · Riemann sums and signed accumulation ---------- */
/* 0 · Signed accumulation · Fill "sign" */
rc98("calc1-integrals-1",0,{p:[
 {t:"p",x:"A definite integral combines many small contributions."},
 {t:"p",x:"Each contribution retains its [[sign]]."}]});

/* 1 · Riemann sum. Figure: for sin x on [0,2π], the exact integral is −cos(2π)+cos(0)=−1+1=0 · no interaction */
rc98("calc1-integrals-1",1,{p:[
 {t:"p",x:"Give each subinterval a representative input and multiply the function value there by the subinterval width."},
 {t:"p",x:"Add the contributions. A common limit as the widest subinterval shrinks defines the definite integral."}]});

/* 2 · Area comparison · Guess */
rc98("calc1-integrals-1",2,{p:[
 {t:"p",x:"A function has both positive and negative regions over the integration interval."},
 {t:"take",x:"Integrate the absolute value for geometric area."}],
 g:{at:1,q:"What should you integrate to find total geometric area?",o:[
  ["The function itself",0,"This subtracts contributions from below the axis."],
  ["Its absolute value",1,"This counts both positive and negative regions as positive area."]]}});

/* 3 · Cancellation · Fill "cancellation" */
rc98("calc1-integrals-1",3,{p:[
 {t:"p",x:"Contributions below the axis subtract from those above it in signed accumulation."},
 {t:"p",x:"Taking absolute values removes the [[cancellation]]."}]});

/* ---------- calc1-integrals-2 · Antiderivatives and initial conditions ---------- */
/* 0 · Undoing a derivative · Fill "arbitrary offset" */
rc98("calc1-integrals-2",0,{p:[
 {t:"p",x:"Recover a function whose derivative is given."},
 {t:"p",x:"The result still has an [[arbitrary offset]]."}]});

/* 1 · Antiderivative · no interaction */
rc98("calc1-integrals-2",1,{p:[
 {t:"p",x:"An antiderivative $F$ of $f$ satisfies $F′(x)=f(x)$, with prime denoting the derivative."},
 {t:"p",x:"On an interval, any two antiderivatives differ by a constant, since their difference has derivative zero."}]});

/* 2 · Choosing the constant · Guess */
rc98("calc1-integrals-2",2,{p:[
 {t:"p",x:"An indefinite integral describes a family of vertical shifts of an antiderivative."},
 {t:"take",x:"Use the initial value to determine the additive constant."}],
 g:{at:1,q:"Can one known function value select a single member on the interval?",o:[
  ["Yes",1,"The known value fixes the required vertical offset."],
  ["No",0,"All the members have the same slope, but their values differ by a constant."]]}});

/* 3 · Reason · Fill "vertical offset" */
rc98("calc1-integrals-2",3,{p:[
 {t:"p",x:"Differentiation removes an additive constant."},
 {t:"p",x:"The derivative alone leaves the original [[vertical offset]] undetermined."}]});

/* ---------- calc1-integrals-3 · Fundamental theorem of calculus ---------- */
/* 0 · Two operations · no interaction */
rc98("calc1-integrals-3",0,{p:[
 {t:"p",x:"Accumulation sums values over an interval. Differentiation extracts a local rate."},
 {t:"p",x:"Under continuity, the rate of the accumulating total recovers the original integrand."}]});

/* 1 · Variable upper bound · no interaction */
rc98("calc1-integrals-3",1,{p:[
 {t:"p",x:"Let $f$ be continuous, $a$ a fixed lower bound and $x$ the moving upper bound. The symbol $t$ runs through the integration inputs."},
 {t:"eq",eq:"d/dx ∫_{a}^{x} f(t) dt = f(x)"}]});

/* 2 · Endpoint evaluation · Guess */
rc98("calc1-integrals-3",2,{p:[
 {t:"p",x:"Let $F$ be an antiderivative of a continuous integrand $f$ on the interval between $a$ and $b$."},
 {t:"eq",eq:"∫_{a}^{b} f(x) dx = F(b)−F(a)"},
 {t:"p",x:"Swapping the bounds negates the integral."}],
 g:{at:1,q:"If the integral is positive, what happens when you swap the bounds?",o:[
  ["It stays the same",0,"Swapping bounds reverses the order of subtraction."],
  ["It is negated",1,"The endpoint difference is reversed."]]}});

/* 3 · Thin contribution · Fill "local integrand" */
rc98("calc1-integrals-3",3,{p:[
 {t:"p",x:"A small increase in the upper bound adds a thin slice whose width is the input increase."},
 {t:"p",x:"By continuity, its height approaches the [[local integrand]]."},
 {t:"p",x:"Divide the added accumulation by the width to recover the derivative."}]});

/* ---------- calc1-integrals-4 · Substitution and average value ---------- */
/* 0 · Hidden chain rule · no interaction */
rc98("calc1-integrals-4",0,{p:[
 {t:"p",x:"Look for an inside expression and a differential that matches its rate of change."},
 {t:"p",x:"Substitution gives the inside expression its own variable."}]});

/* 1 · Substitution procedure · Fill "new variable" */
rc98("calc1-integrals-4",1,{p:[
 {t:"p",x:"Set $u$ equal to the inside expression $g(x)$, with $g$ differentiable, so $du=g′(x)dx$."},
 {t:"p",x:"Rewrite the integrand and differential in $u$. In a definite integral, also evaluate the bounds in the [[new variable]]."}]});

/* 2 · Average value · Guess */
rc98("calc1-integrals-4",2,{p:[
 {t:"p",x:"Let $f$ be integrable on $[a,b]$ with $b>a$. Let $I$ be its definite integral, the signed accumulation."},
 {t:"eq",eq:"average = I/(b−a)"}],
 g:{at:1,q:"What do you divide by to get the average value?",o:[
  ["Number of subintervals",0,"That number depends on the partition used to approximate the integral."],
  ["Interval length",1,"The length normalizes the total accumulation over the input span."]]}});

/* 3 · Two purposes · no interaction */
rc98("calc1-integrals-4",3,{p:[
 {t:"p",x:"Substitution reverses the chain rule by transforming the differential along with the input."},
 {t:"p",x:"Averaging divides total accumulation by the span over which it accumulated."}]});

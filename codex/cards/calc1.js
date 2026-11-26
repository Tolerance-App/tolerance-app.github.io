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

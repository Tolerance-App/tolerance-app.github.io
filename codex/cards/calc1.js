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

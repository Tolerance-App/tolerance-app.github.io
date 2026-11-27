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

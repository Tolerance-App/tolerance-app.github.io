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

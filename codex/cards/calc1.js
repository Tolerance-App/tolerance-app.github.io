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

/* ===== Linear algebra reveal cards, staged against b114 =====
   All 96 cards of the 24 Linear Algebra lessons. Original cards, questions, ids and question order are unchanged.
   Guess on 29 cards, Fill on 24, and neither on 43. See linalg.md for indices. */

/* ---------- linalg-matrices-1 · Matrix shapes and linear maps ---------- */
/* 0 · Plain text, Guess (one column). Selecting one input coordinate means its weight is one and all other weights are zero. */
rc98("linalg-matrices-1",0,{p:[
 {t:"p",x:"A matrix stores the coefficients of a linear map, a rule that combines input coordinates into output coordinates."},
 {t:"p",x:"Each **column** gives the output from selecting its input coordinate alone and setting the others to zero."}],
 g:{at:1,q:"Which part of the matrix specifies all the output coordinates produced by a single input coordinate?",o:[
  ["One column",1,"A single input coordinate weights one full column."],
  ["One row",0,"A row produces a single output coordinate."]]}});

/* 1 · Plain text, Fill "as many". */
rc98("linalg-matrices-1",1,{p:[
 {t:"p",x:"A matrix with $m$ rows and $n$ columns acts on an input with [[as many]] components as there are columns."},
 {t:"p",x:"The input has $n$ components. The output has $m$, one for each row."}]});

/* 2 · Plain text, Guess (add them). */
rc98("linalg-matrices-1",2,{p:[
 {t:"p",x:"To find one output, multiply each row entry by the matching input entry."},
 {t:"p",x:"Add the pairwise products to get the **dot product** of the row and the input."}],
 g:{at:1,q:"How do you combine the resulting products to get a dot product?",o:[
  ["Multiply them",0,"The entries were already multiplied in pairs, and those contributions must be summed."],
  ["Add them",1,"Each matched pair contributes additively to this output."]]}});

/* 3 · Plain text, no interaction. A coordinate basis vector has one unit entry and zeros elsewhere by definition. */
rc98("linalg-matrices-1",3,{p:[
 {t:"p",x:"A **coordinate basis vector** has a single entry equal to one, with the rest zero."},
 {t:"p",x:"The input coordinates weight the images of these basis vectors. Add the weighted images to get the output."}]});

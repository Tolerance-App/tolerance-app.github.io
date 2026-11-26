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

/* ---------- linalg-matrices-2 · Elimination and row operations ---------- */
/* 0 · Plain text, Guess (you can lose a constraint). */
rc98("linalg-matrices-2",0,{p:[
 {t:"p",x:"In **elimination**, simplify the equations while keeping the same solutions. A **pivot** is the leading coefficient used to clear entries below it."},
 {t:"p",x:"Scaling by zero can erase a constraint. A valid row operation can be undone."}],
 g:{at:1,q:"What happens if you multiply one row by zero?",o:[
  ["You can lose a constraint",1,"The old row cannot be recovered from a row of zeros."],
  ["All constraints are preserved",0,"Scaling preserves an equation only when the scale is nonzero."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-matrices-2",1,{p:[
 {t:"p",x:"Swap two rows, multiply a row by a nonzero number, or add a multiple of one row to another."},
 {t:"p",x:"To undo these steps, swap back, divide by the multiplier, or subtract the same multiple."}]});

/* 2 · Plain text, Fill "along with". */
rc98("linalg-matrices-2",2,{p:[
 {t:"p",x:"The right-hand side changes [[along with]] the coefficients during an operation."},
 {t:"p",x:"An **augmented matrix** stores that right-hand side as an extra column, so apply the row operation to the whole row."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-2",3,{p:[
 {t:"p",x:"Equations can be replaced by reversible combinations of one another."},
 {t:"p",x:"Every old solution satisfies the new equations. Reversing the operations shows that every new solution satisfies the old ones."}]});

/* ---------- linalg-matrices-3 · Consistency, pivots, and free variables ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-matrices-3",0,{p:[
 {t:"p",x:"A system is **consistent** if it has at least one solution. Row reduction makes that easier to check."},
 {t:"p",x:"A **pivot** is the leading nonzero coefficient in a nonzero row of the reduced coefficient matrix."}]});

/* 1 · Plain text, Guess (none). */
rc98("linalg-matrices-3",1,{p:[
 {t:"p",x:"Suppose a reduced equation has zero for every coefficient but a nonzero right-hand side."},
 {t:"p",x:"That row is a contradiction. The system is **inconsistent**, meaning there is no common solution."}],
 g:{at:1,q:"How many solutions satisfy that equation?",o:[
  ["None",1,"The left side is zero for every input."],
  ["Exactly one",0,"No choice of a variable can change a left side with all-zero coefficients."],
  ["Infinitely many",0,"A row of zeros permits all inputs only when the right side is also zero."]]}});

/* 2 · Plain text, Fill "freely". */
rc98("linalg-matrices-3",2,{p:[
 {t:"p",x:"In a consistent system, a variable without a pivot can vary [[freely]]."},
 {t:"p",x:"Choose those free variables first. The pivot equations then determine the pivot variables."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-3",3,{p:[
 {t:"p",x:"**Rank** counts the coefficient pivots. Subtract it from the number of variables to count free variables."},
 {t:"p",x:"Each free choice is an unconstrained **degree of freedom**. A consistent system is unique when there are no free choices."}]});

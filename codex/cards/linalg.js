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

/* ---------- linalg-matrices-4 · Matrix products and composition ---------- */
/* 0 · Plain text, Guess (rightmost map). */
rc98("linalg-matrices-4",0,{p:[
 {t:"p",x:"**Composition** means applying maps in succession. The product $AB$ acts on a column vector. The letters $A$ and $B$ name the two maps."},
 {t:"p",x:"The rightmost map $B$ acts first. Map $A$ takes its output as input."}],
 g:{at:1,q:"Which map acts first?",o:[
  ["Rightmost map",1,"The vector is multiplied by B before A acts on the result."],
  ["Leftmost map",0,"A is written first but acts on the intermediate result."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-matrices-4",1,{p:[
 {t:"p",x:"**Associative** means you can regroup three compatible factors without changing their order or the result."},
 {t:"p",x:"**Commutative** would mean you could swap factors. Matrix products generally change when you swap them."}]});

/* 2 · Plain text, Fill "equal". */
rc98("linalg-matrices-4",2,{p:[
 {t:"p",x:"The inner dimensions must be [[equal]]."},
 {t:"p",x:"The column count of the left matrix must match the row count of the right matrix. The outer counts give the product shape."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-matrices-4",3,{p:[
 {t:"p",x:"To find one product entry, pick a row from the left matrix and a column from the right."},
 {t:"p",x:"Take their dot product. Its paired entries run over the intermediate coordinates."}]});

/* ---------- linalg-spaces-1 · Span, independence, and bases ---------- */
/* 0 · Plain text, Guess (it stays the same). */
rc98("linalg-spaces-1",0,{p:[
 {t:"p",x:"A vector's **linear combination** with other vectors is a sum of those vectors with chosen weights. Their **span** is the set of all such sums."},
 {t:"p",x:"The span stays the same. The new vector's weight just changes the weights on the old vectors."}],
 g:{at:1,q:"If you add a vector already in the span, what happens to that span?",o:[
  ["It grows",0,"Adding a vector expands the span only when it lies outside the old span."],
  ["It stays the same",1,"The added vector can be replaced by a combination of the old ones."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-spaces-1",1,{p:[
 {t:"p",x:"Vectors are **independent** if the only weighted sum that gives zero uses all-zero weights."},
 {t:"p",x:"If some nonzero choice of weights gives zero, the vectors are **dependent**. One can be written as a combination of the others."}]});

/* 2 · Plain text, Fill "both". */
rc98("linalg-spaces-1",2,{p:[
 {t:"p",x:"A basis must be [[both]] independent and spanning."},
 {t:"p",x:"Its vectors cover the space with no redundant directions. The number of basis vectors is the **dimension**."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-1",3,{p:[
 {t:"p",x:"To extract a basis from a list, put the vectors into columns and find pivots by row reduction."},
 {t:"p",x:"Keep the corresponding columns from the original matrix. They span the same space as the original list and are independent."}]});

/* ---------- linalg-spaces-2 · Null space and solution families ---------- */
/* 0 · Plain text, Guess (it stays fixed). */
rc98("linalg-spaces-2",0,{p:[
 {t:"p",x:"The **null space** consists of inputs that the map sends to zero. The map adds outputs when you add inputs."},
 {t:"p",x:"The output stays fixed. The added direction contributes nothing to it."}],
 g:{at:1,q:"If you add a null-space vector to an input, what happens to its output?",o:[
  ["It stays fixed",1,"The added input contributes zero to the output."],
  ["It becomes zero",0,"Only the added direction is known to have zero output."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-spaces-2",1,{p:[
 {t:"p",x:"The null space solves the **homogeneous system**, whose right-hand side is zero."},
 {t:"p",x:"It is a **subspace** of the input space: it contains zero and stays closed under addition and scaling."}]});

/* 2 · Plain text, Fill "within". */
rc98("linalg-spaces-2",2,{p:[
 {t:"p",x:"A **particular solution** is any one input with the requested output. You can move [[within]] the null space to find other solutions."},
 {t:"p",x:"Add any null-space vector to that particular solution. The output remains the requested one."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-2",3,{p:[
 {t:"p",x:"Two solutions with the same output have a difference that maps to zero."},
 {t:"p",x:"This is why particular solution plus null-space vector describes every solution of a consistent system."}]});

/* ---------- linalg-spaces-3 · Rank-nullity and fundamental spaces ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-spaces-3",0,{p:[
 {t:"p",x:"The **column space** is the span of the columns. It contains all reachable outputs."},
 {t:"p",x:"Its dimension is the **rank**. The **nullity** is the dimension of the space of inputs that map to zero."}]});

/* 1 · Plain text, Guess (column count). */
rc98("linalg-spaces-3",1,{p:[
 {t:"p",x:"Rank counts pivot variables. Nullity counts free variables in the zero-output system."},
 {t:"p",x:"Rank plus nullity equals the column count, the number of input coordinates."}],
 g:{at:1,q:"Which matrix count equals rank plus nullity?",o:[
  ["Row count",0,"Rows index output coordinates, not the full list of input variables."],
  ["Column count",1,"Every column represents either a pivot variable or a free variable."]]}});

/* 2 · Plain text, Fill "perpendicular". */
rc98("linalg-spaces-3",2,{p:[
 {t:"p",x:"The **row space** contains combinations of rows. It is [[perpendicular]] to the null space under the ordinary dot product."},
 {t:"p",x:"A null vector has zero dot product with each row, so it also has zero dot product with any row combination."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-3",3,{p:[
 {t:"p",x:"The **left null space** contains output-space vectors sent to zero by the transpose, which swaps rows and columns."},
 {t:"p",x:"Each such vector is perpendicular to every column, and therefore to the whole column space."}]});

/* ---------- linalg-spaces-4 · Coordinates and change of basis ---------- */
/* 0 · Plain text, Guess (the coordinate list). */
rc98("linalg-spaces-4",0,{p:[
 {t:"p",x:"A coordinate list gives weights on the vectors of a chosen basis."},
 {t:"p",x:"The coordinate list can change even though the geometric vector stays fixed."}],
 g:{at:1,q:"When you change bases while keeping the same vector, what can change?",o:[
  ["The coordinate list",1,"The same vector can be built from different weights on different basis vectors."],
  ["The geometric vector",0,"Changing the basis describes the same vector using a different list."]]}});

/* 1 · Plain text, Fill "combine". */
rc98("linalg-spaces-4",1,{p:[
 {t:"p",x:"Basis coordinates are weights used to [[combine]] the basis vectors."},
 {t:"p",x:"For a **change of basis**, convert between lists for the same vector. Stack the new basis vectors as columns. Multiplying by this basis matrix yields the vector in standard coordinates."}]});

/* 2 · Plain text, Guess (solve for them). */
rc98("linalg-spaces-4",2,{p:[
 {t:"p",x:"Start with a vector in standard coordinates. You know the columns of the new basis matrix."},
 {t:"p",x:"Solve the system with the basis matrix as the coefficient matrix. The unknowns are the new weights."}],
 g:{at:1,q:"How do you find the weights for this new basis?",o:[
  ["Multiply by the basis matrix",0,"Multiplication by the basis matrix goes from basis weights to standard coordinates."],
  ["Solve for them",1,"The weights must reproduce the supplied vector as a combination of the columns."]]}});

/* 3 · Plain text, no interaction. */
rc98("linalg-spaces-4",3,{p:[
 {t:"p",x:"An **orthonormal** basis uses mutually perpendicular unit vectors."},
 {t:"p",x:"For an orthonormal basis matrix, swapping rows and columns gives its inverse. A general basis needs a solve."}]});

/* ---------- linalg-determinants-1 · Determinants and volume scaling ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-determinants-1",0,{p:[
 {t:"p",x:"A determinant is a single signed number for a square matrix."},
 {t:"p",x:"Its absolute value measures the factor by which the map scales full-dimensional volume."}]});

/* 1 · Plain text, Guess (reverses it). */
rc98("linalg-determinants-1",1,{p:[
 {t:"p",x:"Volume scaling ignores sign. **Orientation** describes the handedness of an ordered set of axes."},
 {t:"p",x:"A negative determinant reverses orientation. A positive one preserves it."}],
 g:{at:1,q:"What does a negative determinant do to orientation?",o:[
  ["Reverses it",1,"A negative sign means the transformed axes have opposite handedness."],
  ["Preserves it",0,"Preserved orientation corresponds to a positive sign."]]}});

/* 2 · Plain text, Fill "collapses". */
rc98("linalg-determinants-1",2,{p:[
 {t:"p",x:"A zero determinant means the map [[collapses]] full-dimensional volume."},
 {t:"p",x:"The columns are dependent and their span has fewer dimensions than the input space. The square map is **singular**, meaning it has no inverse."}]});

/* 3 · Rule in words → formula, no interaction. The signed area is ad − bc: the main product ad less the opposite product bc. */
rc98("linalg-determinants-1",3,{p:[
 {t:"p",x:"For a square matrix with top row $a,b$ and bottom row $c,d$, $D$ denotes its determinant."},
 {t:"eq",lab:"Two-by-two determinant",eq:"D = ad − bc"},
 {t:"p",x:"Multiply down each diagonal. Subtract the opposite-diagonal product from the main-diagonal product."}]});

/* ---------- linalg-determinants-2 · Inverse maps and solving systems ---------- */
/* 0 · Plain text, Guess (exactly one). */
rc98("linalg-determinants-2",0,{p:[
 {t:"p",x:"A square map has **full rank** when it reaches every output direction."},
 {t:"p",x:"For every output there is exactly one input. The inverse takes that output back to the input."}],
 g:{at:1,q:"How many inputs give a specified output for a square full-rank map?",o:[
  ["None",0,"Full rank means every output is reachable."],
  ["Infinitely many",0,"Multiple inputs would require a nonzero null-space direction."],
  ["Exactly one",1,"Full rank in a square matrix leaves no null-space freedom."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-2",1,{p:[
 {t:"p",x:"A square matrix with an inverse is **nonsingular**. Multiplying the matrix and its inverse in either order gives the identity map."},
 {t:"p",x:"A diagonal matrix with nonzero diagonal entries is undone by reciprocating those entries. That shortcut does not apply entry by entry to a general matrix."}]});

/* 2 · Plain text, Fill "reuse". */
rc98("linalg-determinants-2",2,{p:[
 {t:"p",x:"A **factorization** writes a matrix as a product of simpler matrices that are easy to solve with."},
 {t:"p",x:"For several right-hand sides, [[reuse]] the same factors."},
 {t:"p",x:"Each right-hand side needs new solves with the factors. The coefficient matrix and its factors stay the same."}]});

/* 3 · Plain text, Guess (at the last equation). */
rc98("linalg-determinants-2",3,{p:[
 {t:"p",x:"Elimination yields triangular systems. An upper-triangular system has zeros below its diagonal."},
 {t:"p",x:"Start with the last equation and work upward, substituting each known value. This is **back substitution**."}],
 g:{at:1,q:"Where do you start solving an upper-triangular system?",o:[
  ["At the last equation",1,"The last equation has only the last unknown left."],
  ["At the first equation",0,"Earlier equations can still contain unknowns from later columns."]]}});

/* ---------- linalg-determinants-3 · LU factorization and pivoting ---------- */
/* 0 · Plain text, Guess (largest absolute value). */
rc98("linalg-determinants-3",0,{p:[
 {t:"p",x:"A **pivot** is the entry used as a divisor to compute an elimination multiplier. Partial pivoting can swap in a different row."},
 {t:"p",x:"Choose an entry of largest absolute value among the remaining rows in the active column."}],
 g:{at:1,q:"Which candidate does partial pivoting use in the current column?",o:[
  ["Smallest absolute value",0,"A tiny divisor can make the multiplier unnecessarily large."],
  ["Largest absolute value",1,"This avoids dividing by a smaller available entry."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-3",1,{p:[
 {t:"p",x:"In **LU factorization**, the lower-triangular factor $L$ stores elimination multipliers. The upper-triangular factor $U$ stores the resulting coefficients."},
 {t:"p",x:"A lower-triangular matrix has zeros above the diagonal. An upper-triangular one has zeros below it."}]});

/* 2 · Plain text, Fill "in the same order". */
rc98("linalg-determinants-3",2,{p:[
 {t:"p",x:"A **permutation matrix** records the swaps. Apply them to the right-hand side [[in the same order]] as to the coefficient rows."},
 {t:"p",x:"Then solve with the lower factor, followed by the upper factor."}]});

/* 3 · Plain text, no interaction. */
rc98("linalg-determinants-3",3,{p:[
 {t:"p",x:"To clear an entry, divide it by the pivot and subtract that multiple of the pivot row."},
 {t:"p",x:"Small pivots can produce large multipliers, magnifying rounding errors. Pivoting helps with elimination but cannot undo the map's inherent sensitivity."}]});

/* ---------- linalg-determinants-4 · Condition numbers and residuals ---------- */
/* 0 · Plain text, Guess (yes). */
rc98("linalg-determinants-4",0,{p:[
 {t:"p",x:"Imagine a square map that almost flattens one direction. Moving far along that direction hardly changes the output."},
 {t:"p",x:"A small output mismatch can hide a large input error when the map nearly flattens a direction."}],
 g:{at:1,q:"Can a small output mismatch coexist with a large input error?",o:[
  ["Yes",1,"An input error in the nearly flattened direction barely shows in the output."],
  ["No",0,"That would require the map to preserve lengths well in every direction."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-determinants-4",1,{p:[
 {t:"p",x:"The **residual** is the observed right-hand side minus the output predicted by the computed solution."},
 {t:"p",x:"**Forward error** compares the computed solution to the exact one directly."}]});

/* 2 · Rule in words → formula, no interaction. */
rc98("linalg-determinants-4",2,{p:[
 {t:"p",x:"For an invertible matrix in Euclidean geometry, $κ$ is its condition number. The quantities $σ_{max}$ and $σ_{min}$ are its largest and smallest stretches of unit vectors."},
 {t:"eq",lab:"Euclidean condition number",eq:"κ = σ_{max} / σ_{min}"},
 {t:"p",x:"A large ratio permits large relative solution changes from small relative changes to the right-hand side."}]});

/* 3 · Plain text, Fill "weakly stretched". */
rc98("linalg-determinants-4",3,{p:[
 {t:"p",x:"The output barely responds to inputs along a [[weakly stretched]] direction."},
 {t:"p",x:"A substantially wrong input in that direction can still fit the equations closely. Report the residual together with conditioning information."}]});

/* ---------- linalg-eigenvalues-1 · Eigenpairs and invariant directions ---------- */
/* 0 · Plain text, no interaction. */
rc98("linalg-eigenvalues-1",0,{p:[
 {t:"p",x:"A square map mixes coordinates. Some nonzero vectors map to a multiple of themselves."},
 {t:"p",x:"The line is an **invariant subspace**: every point on it maps back onto that line, possibly to zero."}]});

/* 1 · Rule in words → formula, no interaction. */
rc98("linalg-eigenvalues-1",1,{p:[
 {t:"p",x:"For square matrix $A$, a nonzero vector $v$ with this property is an **eigenvector**. The multiplier $λ$ is its **eigenvalue**."},
 {t:"eq",lab:"Eigenpair condition",eq:"Av = λv"},
 {t:"p",x:"Compute the image and verify the same multiplier works in every component."}]});

/* 2 · Plain text, Guess (in the opposite direction). */
rc98("linalg-eigenvalues-1",2,{p:[
 {t:"p",x:"An eigenvalue can be positive, negative, or zero. Over complex coordinates it can also be complex."},
 {t:"p",x:"A negative eigenvalue reverses the direction of a real eigenvector while keeping its line invariant."}],
 g:{at:1,q:"For a real eigenvector with a negative eigenvalue, where does its image point?",o:[
  ["In the original direction",0,"A positive multiplier would preserve the arrow's direction."],
  ["In the opposite direction",1,"Multiplying by a negative real number reverses the arrow."]]}});

/* 3 · Plain text, Fill "not invertible". */
rc98("linalg-eigenvalues-1",3,{p:[
 {t:"p",x:"A zero eigenvalue sends a nonzero vector to zero, so the map is [[not invertible]]."},
 {t:"p",x:"The zero input has zero output too. An inverse could not distinguish the two inputs."}]});

/* ---------- linalg-eigenvalues-2 · Diagonalization and matrix powers ---------- */
/* 0 · Plain text, Guess (no). */
rc98("linalg-eigenvalues-2",0,{p:[
 {t:"p",x:"An **eigenbasis** is a full basis made from eigenvectors."},
 {t:"p",x:"In an eigenbasis each coordinate is scaled on its own. The axes do not mix."}],
 g:{at:1,q:"In this basis, can one coordinate feed into a different coordinate when the map acts?",o:[
  ["No",1,"An eigenvector maps to a multiple of itself, with no component in any other basis direction."],
  ["Yes",0,"Mixing between coordinates is possible in a general basis, not in an eigenbasis."]]}});

/* 1 · Plain text, no interaction. */
rc98("linalg-eigenvalues-2",1,{p:[
 {t:"p",x:"A matrix is **diagonalizable** if it has an eigenbasis. The matrix of eigenvectors as columns maps eigenbasis coordinates to original coordinates."},
 {t:"p",x:"The diagonal matrix of eigenvalues acts on eigenbasis coordinates, also called **modal coordinates**."}]});

/* 2 · Plain text, Fill "compatible". */
rc98("linalg-eigenvalues-2",2,{p:[
 {t:"p",x:"Repeated eigenvalues are [[compatible]] with diagonalization."},
 {t:"p",x:"**Algebraic multiplicity** counts how often the eigenvalue repeats as a root of the characteristic polynomial. **Geometric multiplicity** counts independent eigenvectors for that value."}]});

/* 3 · Plain text, Guess (they multiply). */
rc98("linalg-eigenvalues-2",3,{p:[
 {t:"p",x:"A positive integer matrix power repeats the same map. In an eigenbasis each application multiplies a coordinate by its own eigenvalue."},
 {t:"p",x:"The factors multiply. Raise each eigenvalue to the desired power, then convert back to original coordinates."}],
 g:{at:1,q:"How do the successive scale factors combine?",o:[
  ["They add",0,"No separate outputs are being summed. The same coordinate is scaled repeatedly."],
  ["They multiply",1,"Each application scales the result of the preceding application."]]}});

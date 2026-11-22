/* ===== v94 (2026-11-22): definitions for the remaining courses =====
   Drawings and GD&T, CAD, CAM, Shop vocab, Design review, Engineer translated, Civil and structures, Engineering
   math and Numerical methods (which already share v91's math list). With this build every course has definitions.
   Same style rules as v89. Display only. */
try{FB.ver="b94"}catch(e){}
try{NEWS.unshift({d:"2026-11-22",t:["Every course now has tap-to-define words. This build adds GD&T, CAD, CAM, Shop vocab, Design review, Civil and the rest."]})}catch(e){}

gl89("_",[
 ["fillets?","A rounded inside corner where two faces meet.","The rounded inside corners of a metal baking pan: easier to clean and less likely to crack."],
 ["chamfers?","An angled cut that bevels off a sharp edge.","The slanted edge on a cheap wooden table top."]
]);

const TOL94=["tolerances?","How far a size may be off from its target and still be acceptable.","A recipe that says bake 25–30 minutes: anywhere in that range is fine."];
const DOF94=["degrees? of freedom|DOF","An independent way a part can move. A loose part has six: three slides and three spins.","A drawer has one: in and out."];

gl89("gdt",[
 TOL94,DOF94,
 ["datums?","A reference feature on the part that measurements are taken from.","Measuring every shelf height from the floor, instead of from the shelf below."],
 ["datum features?","The real surface or hole that sets up a datum.",""],
 ["feature control frames?","The small boxed callout on a drawing that says which shape rule applies, how tight it is, and which datums it’s measured from.",""],
 ["tolerance zones?","The space a feature must stay inside to pass.",""],
 ["primary|secondary|tertiary","The first, second and third datums, in the order the part is set against them.","",{only:["gdt-datums-1"]}],
 ["position(?: tolerance)?","How far a feature’s center may be from where it should be.","",{only:["gdt-datums-2","gdt-datums-3"]}],
 ["true position","The exact spot a feature is supposed to be.",""],
 ["basic dimensions?|boxed(?: dimensions)?","Exact, boxed values on a drawing with no tolerance of their own; the tolerance comes from a shape callout.",""],
 ["MMC|maximum material condition","The size with the most metal: the smallest hole or the biggest shaft.","",{cs:1}],
 ["bonus tolerance","Extra position tolerance you earn as a hole grows past its smallest allowed size.",""],
 ["mating(?: pin| parts?)?","The part that fits against or into this one.",""],
 ["virtual condition","The worst-case boundary a mating part must always fit through.",""],
 ["stack-ups?","Adding up tolerances along a chain of dimensions to find the worst possible gap.","Stacking books: small differences in each add up to a big difference in the pile."],
 ["worst case","Every part at its limit in the worst direction at once.",""],
 ["RSS","Root-sum-square: a realistic estimate that assumes parts rarely all hit their limits at once.","",{cs:1}],
 ["functional features","The surfaces that actually matter for how the part works.",""],
 ["form controls?","Rules on a feature’s shape alone, like flatness, with no datum.",""],
 ["flatness","How close a surface is to a perfect plane.","Whether a table rocks on a flat floor."],
 ["straightness","How close a line or axis is to perfectly straight.",""],
 ["circularity","How close a cross-section is to a perfect circle.","A slightly oval ring."],
 ["cylindricity","How close a whole round surface is to a perfect cylinder.",""],
 ["Rule #1","For a size feature, perfect shape is required at its most-metal size, so the size limits also cap the shape error.","",{cs:1}],
 ["orientation controls?","Rules holding a feature at a set angle to a datum.",""],
 ["perpendicularity","How close a feature is to exactly 90° from a datum.","Whether a door frame is truly square."],
 ["parallelism","How close a feature stays to exactly parallel with a datum.","Railway tracks."],
 ["angularity","Holding a feature at a set angle other than 0° or 90°.",""],
 ["profile(?: of a surface| tolerance| callout)?","A zone of even width wrapped around the ideal shape of a surface.","",{only:["gdt-form-3"]}],
 ["CMM","Coordinate measuring machine: a precise probe that touches points on a part and compares them with the CAD model.","",{cs:1}],
 ["freeform","A shape without simple flat or round surfaces.","A car fender."],
 ["equally disposed","Split evenly on both sides of the ideal surface.",""],
 ["circular runout","How much a round surface wobbles at one cross-section while the part spins.","A dial gauge needle twitching as a bike wheel spins."],
 ["total runout","Runout swept along the whole surface at once.",""],
 ["runout","How much a round surface wobbles as the part spins on its datum axis.","A dial gauge needle twitching as a bike wheel spins."],
 ["(?:dial )?indicators?","A gauge with a needle that shows tiny movements of a probe.",""],
 ["full indicator movement","The total swing of the indicator needle.",""],
 ["journal","The part of a shaft that sits in a bearing.",""],
 ["unbalance","A heavy spot off the spin axis, so the part wobbles as it turns.","A ceiling fan wobbling because one blade is heavier."],
 ["rotors?","The spinning part of a machine.",""]
]);

const CM94=["cad-modeling-1","cad-modeling-2"];
gl89("cad",[
 DOF94,
 ["sketch(?:es)?","A 2D drawing of a profile that features turn into 3D shapes.",""],
 ["features?","One modeling step that adds or removes material, like an extrude or a hole.","",{only:CM94}],
 ["geometric constraints?|constraints?","A rule like horizontal, parallel or tangent that shapes a sketch without a number.",""],
 ["fully defin(?:e|ed)|fully constrained","Every size and position is pinned down, so nothing can move unexpectedly.","A tent with every guy line staked down."],
 ["under-defined","Still has loose freedoms, so it can shift when you edit something else.",""],
 ["extrudes?","Pushing a 2D sketch straight out into a 3D solid.","Squeezing play-dough through a shaped nozzle."],
 ["revolves?","Spinning a 2D sketch around an axis to make a round solid.","Shaping a vase on a potter’s wheel."],
 ["patterns?","Copies of a feature repeated in a row or circle.","The bolt holes on a car wheel."],
 ["parent-child|parents?|childs?|children","A feature built on another one, so changing the parent can move or break the child.","",{only:["cad-modeling-2"]}],
 ["design intent","Building the model so it changes the way the real design should when you edit it.",""],
 ["(?:feature )?tree","The ordered list of steps that builds the model.","",{only:["cad-modeling-2"]}],
 ["assembl(?:y|ies)","A model made of several parts fitted together.",""],
 ["mates?","Rules in an assembly that fix how parts touch or line up, removing their freedom to move.","Snapping LEGO bricks together."],
 ["coincident","Touching, or lying in the same place.",""],
 ["concentric","Sharing the same center axis.","The rings of a dartboard."],
 ["interference","Two parts trying to occupy the same space.","",{only:["cad-modeling-3"]}],
 ["planar linkages?","Bars joined by pins, all moving in one flat plane.",""],
 ["Gruebler(?:’|')s equation","A count that tells how many independent ways a linkage can move.","",{cs:1}],
 ["mobility","How many independent inputs it takes to move a mechanism.",""],
 ["four-bar","A loop of four bars joined by pins. With one bar fixed, it moves only one way.","A car’s windshield-wiper linkage."],
 ["ground","The fixed link of a mechanism.","",{only:["cad-modeling-3"]}],
 ["(?:named )?parameters","Named numbers that drive dimensions, so one change updates everything.","",{only:["cad-modeling-4"]}],
 ["rebuild(?: failures?)?","The model recalculating after an edit.",""],
 ["configurations?","Variants of one model, like different lengths, kept in a single file.","One recipe written for small, medium and large."],
 ["model-based definition","Putting dimensions and tolerances on the 3D model itself instead of a separate drawing.",""],
 ["symmetr(?:y|ic)","Mirrored evenly about a line.",""],
 ["equal constraints?","Keeps two items the same size without separate dimensions.",""],
 ["redundant(?: constraints?)?","Repeats something the sketch already knows.",""],
 ["conflicting(?: constraints?)?|conflict","Demands something impossible with the rules already there.",""],
 ["collinear","Lying on the same straight line.",""],
 ["reference dimensions?|driven(?: dimensions?)?","A dimension that only reports a size; it doesn’t control it.",""],
 ["driving(?: dimensions?)?","A dimension that controls the size.",""],
 ["solver","The software that works out the sketch’s shape from all its rules.",""],
 ["isosceles","A triangle with two equal sides.",""],
 TOL94
]);

gl89("cam",[
 ["cutting speed","How fast the cutting edge moves through the material, in m/min.","How fast the teeth of a saw blade race past the wood."],
 ["spindle(?: speed)?","The spinning shaft that holds the tool. Its speed is in rpm.",""],
 ["end mills?","A cutting tool like a drill bit that can also cut sideways.",""],
 ["carbide","A very hard tool material made from tungsten carbide.",""],
 ["chip load|feed per tooth","How thick a slice each cutting tooth takes.","How big a bite you take with each chomp."],
 ["flutes?","The spiral grooves on a cutter. Each cutting edge is one tooth.","The grooves on a drill bit."],
 ["feed rate","How fast the cutter moves through the material.",""],
 ["material removal rate|removal rate","How much material is cut away each minute.",""],
 ["axial depth","How deep the cutter goes along its own axis.",""],
 ["radial (?:width|engagement)","How far the cutter steps sideways into the material.",""],
 ["specific cutting energy","How much energy it takes to cut away each cubic millimetre of a material.",""],
 ["chatters?","A loud vibration during cutting that leaves a wavy finish.","A fingernail screeching down a chalkboard."],
 ["(?:radial )?chip thinning","A light side cut makes chips thinner than the programmed chip load.",""],
 ["flank wear","Wear on the side of the cutting edge from rubbing.",""],
 ["stickout","How far the tool hangs out of its holder.","Holding a pencil near the tip versus at the very end when writing."],
 ["holder","The part that grips the tool in the machine.",""],
 ["peripheral milling","Cutting with the side of the tool.",""],
 ["cantilever","A beam fixed at one end and free at the other.","A diving board."],
 ["chip evacuation","Clearing chips out of the cut so they aren’t cut again.",""],
 ["tool life","How long a cutting tool lasts before it’s too worn to use.",""]
]);

const RQ94=["req-lang-1","req-lang-2","req-lang-3","req-lang-4","req-lang-5","req-lang-6","review-language"];
const TALK94=[
 TOL94,
 ["shall","Marks a binding requirement that must be verified.","",{only:RQ94}],
 ["should","Marks a goal, not a promise.","",{only:["req-lang-1","review-language"]}],
 ["requirements?","A statement the product must satisfy.","",{only:["review-language","req-lang-1"]}],
 ["verification(?: method)?|verified","How you prove a requirement is met: inspection, analysis, demonstration or test.",""],
 ["rationale","One line saying why a requirement’s number exists.",""],
 ["flow-down","Splitting a system requirement into smaller requirements for each part.","A family budget split into groceries, rent and fun money."],
 ["derived requirements?","A requirement created by a design choice, not by the customer.",""],
 ["traceability","Linking every small requirement back to the bigger one it serves.",""],
 ["gold plating","Adding extras nobody asked for, which costs time and money.",""],
 ["TBD","To be determined: nobody knows the value yet.","",{cs:1}],
 ["TBR","To be resolved: a value is proposed but not confirmed.","",{cs:1}],
 ["statement of work|SOW","The document saying what work the supplier will do.",""],
 ["specifications?|spec","The written list of what the product must do or be.",""],
 ["order-of-precedence|order of precedence","A clause ranking which document wins when two disagree.",""],
 ["furnish","Supply the item.",""],
 ["install","Put the item in place.","",{only:["req-lang-4"]}],
 ["deviations?","Permission, before building, to depart from a requirement for a set number of units or time.",""],
 ["waive(?:r|rs)?","Accepting items already built that don’t match the requirement.",""],
 ["variance","One term some programs use for both deviations and waivers.","",{only:["req-lang-5"]}],
 ["engineering change","A formal change to the requirement or drawing itself.",""],
 ["material review board|MRB","The group that decides what to do with parts that don’t match the drawing.","",{cs:1}],
 ["nonconform(?:ing|ance)","Doesn’t match the drawing or requirement.",""],
 ["rework","Bringing a part fully back to the drawing.",""],
 ["repair","Making a part usable even though it still doesn’t fully match the drawing.","",{only:["req-lang-5"]}],
 ["disposition(?:ed)?","The decision on what to do with a part.",""],
 ["full scale","The top of a sensor’s measuring range.",""],
 ["passive voice","A sentence that hides who does the action: “the data shall be archived”.",""],
 ["factor of safety|safety factor","Capability divided by demand: how many times stronger it is than it needs to be.","An elevator rated for 8 people that could really hold far more."],
 ["margin of safety","What’s left over after the required safety factor. Zero is just enough; negative fails.",""],
 ["margin","The spare room between what’s needed and what the design can take.","",{only:["talk-margin","translated-words"]}],
 ["derat(?:e|ing)","Using a part well below its rating to keep it cool and long-lived.","Not driving your car at the redline all day."],
 ["thou|mil","One thousandth of an inch, about 25 µm.","About a third of the width of a human hair."],
 ["tenths?","In a machine shop: a tenth of a thou, 0.0001 inch.","",{only:["talk-numbers"]}],
 ["microns?","A micrometre: a thousandth of a millimetre.","A human hair is about 70 microns across."],
 ["PCB","Printed circuit board: the green board electronics are built on.","",{cs:1}]
];
["vocab","design","plain"].forEach(s=>gl89(s,TALK94));

gl89("vocab",[
 ["bushings?","A sleeve that wears so the housing it sits in doesn’t.","A replaceable liner in a door hinge."],
 ["fit codes?|tolerance class(?:es)?","Short codes like H7/g6 that say how tight a hole and shaft fit.",""],
 ["backlash","The small gap between mating gear teeth, so the output lags when you reverse.","The slack in an old car’s steering wheel."],
 ["datums?","The reference feature every other measurement starts from.","Measuring every shelf height from the floor, instead of from the shelf below."],
 ["poka-yoke","Mistake-proofing: designing a part so it only fits the right way.","A plug with one wide prong that only goes in one way."],
 ["MMC","Maximum material condition: the size with the most metal, the smallest hole or the biggest shaft.","",{cs:1}],
 ["torque","A twisting force: how hard something is being turned.","Why a longer wrench frees a stuck bolt."]
]);

gl89("design",[
 ["design reviews?","A meeting where other engineers hunt for problems in your design before it’s built.","Having a friend proofread your essay."],
 ["PDR|preliminary design review","An early review asking: is this the right approach?","",{cs:1}],
 ["CDR|critical design review","A later review asking: is the design finished enough to build?","",{cs:1}],
 ["TRR|test readiness review","A review before testing: are we ready, and do we know what passing looks like?","",{cs:1}],
 ["action items?","A task that comes out of a review, with an owner and a due date.",""],
 ["traces","The copper lines on a circuit board that carry current.",""],
 ["stress raisers?|stress riser","A spot where stress piles up, at a hole, scratch or sharp corner.","Why snack bags have a little notch: the tear starts right there."],
 ["load cells?","A force sensor built from strain gauges.","What’s inside a digital bathroom scale."],
 ["excitation","The steady voltage powering a bridge sensor.",""],
 ["LSB","The smallest voltage step an ADC can tell apart.","",{cs:1}],
 ["sigma-delta","An ADC that samples crudely but very fast, then averages digitally for high precision.",""],
 ["ratiometric","Measuring relative to the excitation, so drift in the supply cancels out.",""],
 ["ADC","A chip that measures a voltage and turns it into a number.","",{cs:1}],
 ["interrupts?","A signal that makes the processor drop what it’s doing and run a short, urgent task.","A phone call interrupting your reading."],
 ["buffer","Temporary storage that holds data until it can be handled.","A waiting room."],
 ["latency","The delay before something happens.","The lag on a video call."],
 ["atomic","Happens all at once, so nothing can interrupt it halfway.",""],
 ["overruns?","Data arriving faster than it can be stored, so some is lost.",""],
 ["worst case","The slowest, biggest or most extreme case, not the average.",""]
]);

gl89("plain",[
 ["firmware","Code that lives inside a device and talks straight to its hardware.","The software inside a washing machine."],
 ["interfaces?","The agreed connection between two parts or two teams.",""],
 ["bring-up","Powering up a new circuit board for the first time and getting each part working.",""],
 ["vendors?","A company that supplies parts.",""],
 ["(?:in|out of) spec","Within (or outside) the written requirements.",""],
 ["revs?|revision","A numbered version of a design. Rev A is the first.",""],
 ["root cause","The real underlying reason something failed, not just the symptom.","A flat tire’s root cause might be a nail in the driveway."]
]);

gl89("civil",[
 ["dead loads?","The structure’s own weight.","The weight of the bookshelf itself."],
 ["live loads?","Loads that come and go: people, furniture, vehicles.","The books you put on the shelf."],
 ["environmental loads","Loads from nature: wind, snow and earthquakes.",""],
 ["load path","The chain of parts that carries load down to the ground.","Rain running from roof to gutter to downpipe to drain."],
 ["slabs?","A flat concrete floor or roof plate.",""],
 ["girders?","A big beam that holds up other beams.",""],
 ["footings?","The wide base under a column that spreads its load into the soil.","Snowshoes spreading your weight on snow."],
 ["tributary area","The patch of floor whose load goes to one beam: halfway to each neighbor.",""],
 ["psf","Pounds per square foot.","",{cs:1}],
 ["truss(?:es)?","A frame of straight bars joined at pins in triangles.","The triangle frames holding up a house roof."],
 ["members?","One straight bar in a truss or frame.",""],
 ["method of joints","Solving a truss by balancing the forces at each pin, one pin at a time.",""],
 ["racks","Leans over into a parallelogram.","A wobbly bookcase leaning sideways."],
 ["determinate","Can be solved from the balance equations alone.",""],
 ["Euler(?:’|')s critical load","The load at which a slender column suddenly bows sideways.","",{cs:1}],
 ["effective length","The length a column acts like, depending on how its ends are held.",""],
 ["weak axis","The direction a section bends most easily.","A ruler bends easily flat, but hardly at all on edge."],
 ["bracing","Extra members that stop a part from bowing or leaning.",""],
 ["limit state design","Designing with loads scaled up and strengths scaled down for safety.",""],
 ["resistance factors?","A number below 1 that scales a strength down to cover variation in materials and building.",""],
 ["combinations?","Sets of loads checked together, like dead plus live plus wind.","",{only:["civil-struct-4"]}],
 ["governs","Is the worst case, so it sets the design.",""],
 ["uplift","Wind pulling a roof upward.","A gust flipping an umbrella inside out."],
 ["buckl(?:ing|es|ed)","When a long, thin part being squeezed suddenly bows out sideways.","Press down on the ends of a plastic ruler until it snaps into a curve."],
 ["slender","Long and thin compared with its depth.",""],
 ["compression","Being pushed and squeezed.","The legs of a chair you’re sitting on."]
]);

gl89("math",[
 ["dimensionally consistent","Both sides of the equation end up in the same units.","You can’t add metres to seconds."],
 ["base units","The basic units everything else is built from: mass, length and time.",""],
 ["prefixes","Letters in front of a unit that scale it, like k for 1000 or m for one thousandth.",""],
 ["joules?","The unit of energy: one newton pushing through one metre.",""],
 ["atan2","A version of arctangent that uses both signs to get the right direction all the way around the circle.","",{cs:1}],
 ["quadrants?","One of the four quarters of the x-y plane.",""],
 ["vectors?","A quantity with both size and direction.","A wind forecast: 20 km/h from the northwest."],
 ["cross products?","A way to multiply two vectors that gives a vector at right angles to both.",""],
 ["moments?","The turning effect of a force about a point.","Why a light kid far out on a seesaw can lift a heavy one near the middle."],
 ["counterclockwise","Turning the opposite way to a clock’s hands.",""]
]);

gl89("numm",[
 ["gradients?","An arrow pointing the way a function climbs fastest, with length equal to how steep it is.","On a hillside, the exact opposite of the way water would run."],
 ["descent direction|descends","A direction that goes downhill on the objective.",""],
 ["step size","How far each step moves.",""],
 ["Armijo|sufficient decrease","Accept a step only if it lowers the objective by at least a fair share of what the slope promised.","",{cs:1}],
 ["backtracking","Start with a big step and keep shrinking it until it’s acceptable.","Easing a car forward bit by bit until it’s in the parking spot."],
 ["contraction factor","How much the step shrinks each time it’s rejected.",""],
 ["quadratic","Built from squares, so its graph is a bowl or a U shape.",""],
 ["(?:full-step )?Newton","A method that jumps straight to the bottom of a local bowl-shaped model of the objective.","",{cs:1}],
 ["Adam","An optimizer that adapts each coordinate’s step size using running averages of past gradients.","",{cs:1}],
 ["gradient descent","Lowering the objective by repeatedly taking a small step downhill.","Walking down a foggy hill by always stepping the way that feels steepest down."],
 ["KKT","The checklist a best point must pass when some limits are inequalities.","",{cs:1}],
 ["multipliers?","A number that says how much the best value would change if a constraint loosened a little.",""],
 ["complementary slackness","Either a constraint is active or its multiplier is zero.",""],
 ["active","Right up against its limit.","",{only:["numm-opt-3"]}],
 ["inactive","Not touching its limit.",""],
 ["convex","Bowl-shaped everywhere, so any low point is the lowest point.","A salad bowl."],
 ["affine","A straight-line relationship plus a constant.",""],
 ["(?:exterior )?penalty","An extra cost added for breaking a constraint.","A late fee."],
 ["augmented(?: objective| model)?","A penalty method with a learned correction term, so it can land exactly on the boundary.",""],
 ["residuals?","What’s left over: how far the fit misses each data point.",""],
 ["ordinary least squares|least squares","Finding the line that misses the data by the smallest total of squared errors.","Drawing the best straight line through scattered dots on a graph."],
 ["intercept","Where the line crosses the vertical axis.",""],
 ["r²","How much of the data’s variation the fit explains: 1 is perfect, 0 is none.","",{cs:1}],
 ["design-matrix|design matrix","A table with one row per data point, holding the inputs the fit uses.",""],
 ["RMSE|root-mean-square error","A typical size of the fit’s misses, in the data’s units.","",{cs:1}],
 ["held-out","Kept aside and never used for fitting, so it can test the model fairly.",""],
 ["unregularized|regulariz(?:ed|ation)","With (or without) a penalty for extreme answers that keeps a fit sensible.",""]
]);

try{TF48.unshift(
 {b:"b94",k:"defs94a",t:"Definitions: GD&T and CAD",c:"Tap runout (bike wheel and dial gauge), stack-up (pile of books) or extrude (play-dough).",go:["les","gdt-form-4"]},
 {b:"b94",k:"defs94b",t:"Definitions: Civil and CAM",c:"Tap truss (roof triangles), dead load and live load (bookshelf), or chatter (chalkboard).",go:["les","civil-struct-1"]},
 {b:"b94",k:"defs94c",t:"Definitions: requirements language",c:"Shop talk and requirements lessons: tap shall, TBD, deviation or thou.",go:["les","req-lang-1"]}
)}catch(e){}

/* The shared "calibration" (sensor sense) reads wrong in the optimization lessons; drop it in math courses. */
try{const C94=new Set(ALL89.map((g,i)=>/^Comparing readings with known references/.test(g.d)?i:-1).filter(i=>i>=0)),_l94=list89;
 list89=function(lid){const r=_l94(lid);return MS91.includes(sub89(lid))?r.filter(i=>!C94.has(i)):r}}catch(e){}

# Physics courses: design, syllabus and workflow

Started 2026-11-27 (b120). Seth: build physics courses for his brother, algebra and calculus versions, Physics 1 first,
Physics 2 later; Codex writes what it can, Claude does the visuals; build it cleaner than the rest of the app so the
rest can follow. His brother is in **college intro physics** and has **no calculus yet**, so the algebra track is the
one in use now. The calculus track is built on the same skeleton and fills in as we go.

## Structure (decided)

**Two courses per level, one shared path skeleton.**

| Course | sub | Holds |
|---|---|---|
| Physics 1 (algebra) | `phys1a` | every core lesson |
| Physics 1 (calculus) | `phys1c` | the same core lessons (listed, not copied) + calculus-only lessons |
| Physics 2 (algebra / calculus) | `phys2a` / `phys2c` | later, same scheme |

- Both courses have the same sections and unit (branch) names, so a core lesson sits in the same unit in both.
- A core lesson has **one id and one home** (the algebra course) and is listed in the calculus course through the
  app's `also` mechanism: finishing it once counts in both. If his brother takes calculus later and switches, he
  keeps everything and only meets the calculus lessons.
- Why not one course with a track toggle: question keys (`<id>#<n>`) must stay fixed, so a lesson can't change its
  questions by setting; and a path with locked calculus lessons in it would block an algebra student.
- Why not two full copies: twice the content to write and check, and progress wouldn't carry over.
- Why calculus-only lessons, not calculus versions of every lesson: everything in the algebra course is also true and
  used in calculus physics (constant-acceleration equations, FBDs, energy bar charts). Calculus adds tools on top:
  derivatives for rates, integrals for variable forces, differential equations for oscillations.
- Thermodynamics units are algebra-only for now (`tracks:["a"]`): college algebra Physics 1 usually covers heat and
  thermo, calculus Physics 1 usually doesn't. Revisit when Physics 2 is planned.

**Demos are shared between tracks.** One demo factory per physical system (track, projectile, block on incline…),
registered as variants by id (different presets, graphs and hints per lesson). The track changes the labels, not the
physics: `PH.mode()` is "c" on a calculus course, so the same demo says "slope = v" / "area = Δx" in the algebra
course and "dx/dt = v" / "∫v dt = Δx" in the calculus one. Calculus-only lessons get extra variants (secant → tangent,
Riemann strips, variable force) where the idea needs them.

## The module (cleaner than the rest, on purpose)

The rest of the app is stacked `vNN.js` layers that wrap each other. Physics is a module that later builds **edit in
place**. Files:

| File | What it is | Who writes it |
|---|---|---|
| `phys/kit.js` | courses, lesson loader, figures, demo helpers (`PH`) | Claude |
| `phys/demos-<system>.js` | demo factories and their variants | Claude |
| `phys/p1-<unit>.js` | lesson data for one unit, `PH.unit(meta, lessons)` | Codex drafts in `codex/phys/`, Claude ships |
| `vNN.js` | still one per build, for `FB.ver`, version, NEWS | Claude |

What the loader fixes compared with older content (see the comment at the top of `phys/kit.js`):
- **Born as reveal cards.** `rc` is an array (one spec per card); plain `cards` text is derived from it. No `plain`
  field (the app would prepend it as an extra card and shift every rc index); card 0 is the hook.
- **rc goes on the lesson before `build()`**, so the copy shown in the other course has it. (rc98 adds rc after build;
  `also` copies never get it.)
- **Figures live in the lesson** (`figs` per card, `fig` per question): graphs as data (`plot`), demo frames, or a
  `need` placeholder for Claude. No separate LFIG/QFIG tables to keep in sync.
- **Hidden until ready.** `ready:false` units load only on a dev host (127.0.0.1 / localhost, what `tools/check.py`
  serves). Content can be merged and checked without testers seeing half a course. A unit with open `need` figures
  or missing demos is not ready.
- **Equation banks come with the unit** (`meta.eqb`), are parsed for the solver on load, and an unparseable formula
  is reported in `PH.errs` instead of silently missing.
- `PH.errs` lists loader problems (bad id, duplicate, no cards, bad equation); `PH.needs` lists open figure requests.
  Both must be empty before a unit is marked ready.

If this works well, the same loader can carry other new courses (it only needs a course table entry).

## Lesson ids (permanent)

- `p1-<unit>-<n>`: core lesson. Home `phys1a`, listed in `phys1c`.
- `p1c-<unit>-<n>`: calculus-only. `p1a-<unit>-<n>`: algebra-only (rare).
- `<unit>` is the short code in the syllabus below. `<n>` counts from 1 within the unit; gaps are fine.
- Never reuse or renumber an id once it has shipped. New lessons get new numbers at the end of their unit and their
  place in the path comes from `lv` (and `req` if needed).
- A calculus-only lesson without `req` automatically follows the unit's core lesson at or below its `lv`.

## Lesson format (what goes in `PH.unit`)

```js
PH.unit({course:"p1", section:"Describing motion", branch:"Motion in a line", ready:false,
  tracks?:["a"],                          // unit-level: keep a core unit out of the calculus course
  eqb?:{"p1-kin":["Motion in a line",[[name, "x = x0 + v0·t + ½·a·t²", legend], …]]}}, [
 {id:"p1-1d-3", lv:2, title:"…", demo:"ph-acc", eqs:["p1-kin"], req?:[…],
  rc:[ {p:[…], g?:{…}}, … ],              // one spec per card, card 0 = hook; format: lesson-cards skill
  figs?:{3:{cap, plot:{…}}, 5:{cap, need:"…"}},
  qs:[ {t:"fill", q, a, tol, unit, why, fig?:{cap, plot}} , … ]}
]);
```

Solver formulas must have one variable alone on the left (`v = √(v0² + 2·a·(x − x0))`, not `v² = …`), plain
names (`x0`, `v0`, no Δ). The kit reports any it can't parse.

`plot` (drawn by `PH.plot`): `{x:"t (s)", y:"v (m/s)", xr:[0,5], yr:[0,12], xs?:1, ys?:2, h?:150,
lines:[{pts:[[0,2],[4,10]], c?:"blue"|"orange"|"mu", dash?:true, l?:"label"} | {fn:"9.8*x", from, to}],
area?:{line, from, to}, vl?:[x…], pts?:[{at:[x,y], l?, dx?, dy?, a?}], labels?:[{at, l}], note?}`.
Area below the axis shades orange automatically. A figure must never give away a Guess on the same card.

Reference lesson: **`p1-1d-3`** in `phys/p1-1d.js` (cards, Guess/Fill use, figures, and the question mix).

## Teaching rules for physics (on top of LEARNING_DESIGN.md)

From physics education research (Hake 1998 interactive engagement; Force Concept Inventory misconceptions; ranking
tasks; multiple representations) and Seth's rules:
1. **Picture before equation.** Every quantity gets a physical meaning, a unit and an everyday example before its
   formula. Every formula says what it assumes (constant a, no air resistance, frictionless, rigid body…).
2. **Name the misconception and break it.** Each lesson targets one or two known wrong ideas (listed per lesson
   below). The best place is a Guess before the piece that settles it, and a question later that tests it again.
3. **Multiple representations.** Words ↔ motion diagram ↔ graph ↔ equation ↔ free-body diagram ↔ energy bar chart.
   Questions ask students to move between them, not only to plug numbers.
4. **One worked example per numeric lesson**, in the problem-solving routine the whole course uses:
   picture → knowns and unknown → principle → solve in symbols → numbers → check (units, sign, does it make sense).
5. **Question mix per lesson (8–10):** ≥ 3 conceptual `mc`, ≥ 2 numeric `fill`, 1 graph question with a `plot`
   figure where the topic has graphs, 1 `spot` (a student solution with one wrong line), 1 `order` (ranking task),
   1 `match`. No `say`/`decode` (they're workplace talk), no classmate/professor framing.
6. **Numbers:** SI, 3 significant figures, g = 9.8 m/s² (stated), no air resistance unless the lesson is about it.
   `tol` 0.02 for most fills. Re-derive every number with Python.
7. **Calculus-only lessons** assume a student taking Calc I alongside: say what each derivative or integral means
   physically (slope, rate, area, adding up tiny pieces) before using it, and connect back to the algebra result
   (the integral of a constant a gives the familiar v = v₀ + at).
8. Context a first-year student has felt: cars, bikes, phones, elevators, sports, roller coasters, planes, rockets.

## Syllabus: Physics 1

`lv` gives order within a unit. Track: C = core (both courses), K = calculus only, A = algebra only.
Demo: the id Claude builds (✓ = built). A lesson whose demo isn't built yet still names it; it shows once built.

### Section "Describing motion"

**Unit `vec` · "Units, estimates and vectors"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-vec-1 | 1 | C | Units and significant figures | SI base units, prefixes, unit conversion as multiplying by 1, sig figs as honesty about precision | "more digits = more accurate"; converting area/volume units with the linear factor | ph-ruler |
| p1-vec-2 | 1 | C | Estimates and unit checks | order of magnitude, Fermi estimates, dimensional analysis to check a formula | a formula with the right number but wrong units | ph-ruler |
| p1-vec-3 | 2 | C | Vectors and components | magnitude and direction, components with sin/cos, angle conventions | using sin for the adjacent side; negative components | ph-vec |
| p1-vec-4 | 2 | C | Adding vectors | tip to tail, add by components, magnitude and angle of the sum | adding magnitudes directly (3 + 4 = 7) | ph-vecadd |
| p1c-vec-1 | 3 | K | Dot and cross products | dot = projection (work later), cross = perpendicular, right-hand rule (torque later) | order matters for cross product | ph-vecprod |

**Unit `1d` · "Motion in a line"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-1d-1 | 1 | C | Position, displacement and distance | origin and sign, displacement vs distance, motion diagrams | distance = displacement | ph-pos ✓ |
| p1-1d-2 | 1 | C | Velocity and x–t graphs | average velocity vs speed, slope of x–t, instantaneous velocity as the tangent | steeper = higher position; speed and velocity the same | ph-vel ✓ |
| p1-1d-3 | 2 | C | Acceleration and velocity–time graphs | **written (reference lesson)** | negative a = slowing down | ph-acc ✓ |
| p1-1d-4 | 2 | C | Constant-acceleration equations | the equations from the v–t graph, choosing the one without the unknown you don't need, a stopping-distance example | using them when a isn't constant | ph-suvat ✓ |
| p1-1d-5 | 3 | C | Free fall | a = g downward the whole flight, symmetry, time up = time down from same height | a = 0 at the top; heavier falls faster | ph-fall ✓ |
| p1c-1d-1 | 3 | K | Velocity and acceleration as derivatives | v = dx/dt as the limit of the secant, a = dv/dt, power rule on x(t) | average and instantaneous the same | ph-secant |
| p1c-1d-2 | 4 | K | Displacement as an integral | Δx = ∫v dt as many thin strips, recovering the constant-a equations, a non-constant a(t) example | area under v–t only works for straight lines | ph-strips |

**Unit `2d` · "Motion in two dimensions"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-2d-1 | 1 | C | Motion in a plane | position and velocity vectors, x and y independent | a sideways push changes the fall time | ph-shadows |
| p1-2d-2 | 2 | C | Projectiles from level ground | components of launch velocity, time of flight, max height, range, 45° for max range on level ground | horizontal velocity changes; v = 0 at the top | ph-proj |
| p1-2d-3 | 3 | C | Launched horizontally or from a height | dropped vs thrown ball land together; solving with the quadratic for t | horizontal speed affects fall time | ph-proj-h |
| p1-2d-4 | 3 | C | Relative velocity | velocities add as vectors; river crossing, plane in wind | adding speeds as numbers | ph-river |
| p1c-2d-1 | 4 | K | Projectile path with calculus | r(t), v = dr/dt, a = dv/dt; eliminate t to get the parabola; max range angle by setting a derivative to zero | — | ph-proj |

### Section "Forces"

**Unit `nl` · "Newton's laws"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-nl-1 | 1 | C | Force and the first law | force as a push or pull, inertia, constant velocity needs no net force | motion needs a force to keep going | ph-puck |
| p1-nl-2 | 1 | C | Second law: F = ma | net force, mass as resistance to acceleration, newton defined | force gives velocity, not acceleration | ph-push |
| p1-nl-3 | 2 | C | Free-body diagrams | weight, normal, tension, applied; one object, forces only on it; sum by components | normal force always = mg; "force of motion" arrows | ph-fbd |
| p1-nl-4 | 2 | C | Third-law pairs | equal and opposite on different objects, never on the same FBD | the bigger/faster object pushes harder | ph-pair |
| p1-nl-5 | 3 | C | Apparent weight and elevators | scale reads N, N = m(g + a) | the scale reads less whenever you move down (only while accelerating down) | ph-elevator |

**Unit `app` · "Friction, inclines and pulleys"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-app-1 | 1 | C | Static and kinetic friction | f_s ≤ μ_s N (only as much as needed), f_k = μ_k N, μ_s > μ_k | static friction always equals μ_s N | ph-friction |
| p1-app-2 | 2 | C | Inclines | tilted axes, mg sinθ along and mg cosθ into the slope, angle of repose | normal force = mg on a slope | ph-incline |
| p1-app-3 | 3 | C | Connected objects and pulleys | same acceleration through a taut string, Atwood machine, system vs single-object FBDs | tension = weight of the hanging mass while accelerating | ph-atwood |
| p1-app-4 | 3 | C | Springs and drag | Hooke's law F = −kx, drag grows with speed, terminal speed when drag = weight | terminal speed means no force acts | ph-drag |
| p1c-app-1 | 4 | K | Terminal velocity with a differential equation | m dv/dt = mg − bv, v(t) = v_t(1 − e^(−t/τ)), time constant | — | ph-drag |

**Unit `circ` · "Circular motion and gravity"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-circ-1 | 1 | C | Uniform circular motion | velocity changes direction, a = v²/r toward the center, period | constant speed means no acceleration; centrifugal force outward | ph-circle |
| p1-circ-2 | 2 | C | What makes things turn | centripetal force is a role (friction, tension, normal, gravity), flat and banked curves | centripetal force is an extra force on the FBD | ph-curve |
| p1-circ-3 | 3 | C | Vertical circles | loop top and bottom, minimum speed at the top, apparent weight on a coaster | normal force is largest at the top | ph-loop |
| p1-circ-4 | 2 | C | Universal gravitation | F = Gm₁m₂/r², inverse square, g at altitude, why astronauts float (free fall) | no gravity in orbit | ph-gravity |
| p1-circ-5 | 3 | C | Orbits | circular orbit speed and period, Kepler's third law, geostationary orbit | heavier satellites need more speed | ph-orbit |
| p1c-circ-1 | 4 | K | Centripetal acceleration by differentiation | r(t) = R(cos ωt, sin ωt), differentiate twice, a = −ω²r | — | ph-circle |

### Section "Energy and momentum"

**Unit `en` · "Work and energy"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-en-1 | 1 | C | Work | W = Fd cosθ, sign of work, no work by a perpendicular force | holding something heavy does work on it | ph-work |
| p1-en-2 | 2 | C | Kinetic energy and the work–energy theorem | KE = ½mv², W_net = ΔKE, stopping distance ∝ v² | doubling speed doubles stopping distance | ph-brake |
| p1-en-3 | 2 | C | Potential energy and conservation | mgh, ½kx², energy bar charts, path independence | a steeper slide gives a faster bottom speed | ph-skate |
| p1-en-4 | 3 | C | Friction and lost energy | thermal energy, W_nc = ΔE, energy bar charts with friction | energy is destroyed | ph-skate |
| p1-en-5 | 3 | C | Power | P = W/t = Fv, watts and horsepower, climbing stairs | power and energy the same | ph-power |
| p1c-en-1 | 4 | K | Work by a variable force | W = ∫F dx as area under F–x, spring work ½kx² derived | — | ph-fx |
| p1c-en-2 | 4 | K | Force from potential energy | F = −dU/dx, energy diagrams, turning points, stable and unstable equilibrium | — | ph-well |

**Unit `mom` · "Momentum and collisions"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-mom-1 | 1 | C | Momentum and impulse | p = mv, J = FΔt = Δp, airbags and bending knees | momentum and kinetic energy the same | ph-impulse |
| p1-mom-2 | 2 | C | Conservation of momentum | isolated system, recoil and explosions | momentum conserved for each object | ph-carts |
| p1-mom-3 | 2 | C | Inelastic collisions | stick together, KE lost, find the speed after | energy is conserved in every collision | ph-carts |
| p1-mom-4 | 3 | C | Elastic collisions | KE and p conserved; equal masses swap velocities; light hits heavy bounces back | — | ph-carts |
| p1-mom-5 | 3 | C | Center of mass and 2D collisions | center of mass formula, it moves at constant velocity with no outside force, glancing collisions by components | — | ph-com |
| p1c-mom-1 | 4 | K | Impulse as an integral | J = ∫F dt as area under a force–time curve | — | ph-ft |
| p1c-mom-2 | 4 | K | Center of mass by integration | x_cm = ∫x dm / M, rod with varying density | — | ph-rod |
| p1c-mom-3 | 5 | K | The rocket equation | variable mass, Δv = v_e ln(m₀/m_f) derived from momentum | — | ph-rocket |

### Section "Rotation"

**Unit `rot` · "Rotational motion"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-rot-1 | 1 | C | Angular position and speed | radians, ω, v = rω, every point has the same ω | outer points have larger ω | ph-wheel |
| p1-rot-2 | 2 | C | Constant angular acceleration | the rotational kinematic equations, tangential vs centripetal acceleration | — | ph-wheel |
| p1-rot-3 | 2 | C | Moment of inertia and rotational KE | I depends on where the mass is, KE = ½Iω² | I depends only on mass | ph-inertia |
| p1-rot-4 | 3 | C | Rolling | v = Rω without slipping, energy split, the ramp race (sphere, disk, hoop) | heavier things roll down faster | ph-race |
| p1c-rot-1 | 4 | K | Moment of inertia by integration | I = ∫r² dm for a rod and a disk, parallel-axis theorem | — | ph-inertia |

**Unit `tq` · "Torque and angular momentum"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-tq-1 | 1 | C | Torque | τ = rF sinθ, lever arm, wrenches and doors | the force alone decides the turning effect | ph-wrench |
| p1-tq-2 | 2 | C | Static equilibrium | ΣF = 0 and Στ = 0, choosing the pivot, seesaw, beam on supports, ladder | the pivot must be at the support | ph-seesaw |
| p1-tq-3 | 3 | C | τ = Iα | rotational second law, pulley with mass, falling yo-yo | — | ph-pulley |
| p1-tq-4 | 3 | C | Angular momentum | L = Iω, conservation: skater, diver, collapsing star | spinning faster needs a torque | ph-skater |
| p1c-tq-1 | 5 | K | Torque and angular momentum as vectors | τ = r × F, τ = dL/dt, gyroscope precession | — | ph-gyro |

### Section "Oscillations and waves"

**Unit `osc` · "Oscillations"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-osc-1 | 1 | C | Simple harmonic motion | restoring force ∝ displacement, amplitude, period, frequency, x–t is a sine | period depends on amplitude | ph-spring |
| p1-osc-2 | 2 | C | Mass on a spring | T = 2π√(m/k), energy sloshing between KE and PE, max speed at the middle | — | ph-spring |
| p1-osc-3 | 2 | C | The pendulum | T = 2π√(L/g) for small angles, mass doesn't matter, clocks | heavier pendulum swings slower | ph-pendulum |
| p1-osc-4 | 3 | C | Damping and resonance | amplitude decays, driven oscillator, resonance at the natural frequency (swings, bridges) | — | ph-resonance |
| p1c-osc-1 | 4 | K | SHM from its differential equation | m x'' = −kx, x = A cos(ωt + φ) checked by differentiating, ω = √(k/m) | — | ph-spring |
| p1c-osc-2 | 4 | K | Physical pendulum | τ = −mgd sinθ, small-angle approximation, T = 2π√(I/mgd) | — | ph-pendulum |

**Unit `wav` · "Waves and sound"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-wav-1 | 1 | C | What a wave is | energy moves, the medium doesn't travel; transverse and longitudinal; v = fλ | the material travels with the wave | ph-wave |
| p1-wav-2 | 2 | C | Wave speed and superposition | v = √(T/μ) on a string, interference, beats | a higher frequency travels faster | ph-superpose |
| p1-wav-3 | 2 | C | Standing waves | nodes and antinodes, harmonics on a string, open and closed pipes, instruments | — | ph-standing |
| p1-wav-4 | 3 | C | Sound intensity and decibels | intensity ∝ 1/r², β = 10 log(I/I₀), +10 dB = ×10 intensity | twice as far = half the intensity | ph-db |
| p1-wav-5 | 3 | C | The Doppler effect | moving source and observer, sirens, radar guns | the pitch rises as it gets closer (it's constant while approaching) | ph-doppler |
| p1c-wav-1 | 4 | K | The wave function | y(x,t) = A sin(kx − ωt), k and ω, transverse velocity ∂y/∂t, the wave equation | wave speed and particle speed the same | ph-wave |

### Section "Fluids and heat"

**Unit `fl` · "Fluids"**

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-fl-1 | 1 | C | Density and pressure | ρ, p = F/A, p = p₀ + ρgh, gauge vs absolute, the shape of the container doesn't matter | a wider tank has more pressure at the bottom | ph-tank |
| p1-fl-2 | 2 | C | Buoyancy | Archimedes, floating fraction = ρ_obj/ρ_fluid, ships, hot-air balloons | heavy things sink, light things float | ph-buoy |
| p1-fl-3 | 2 | C | Flow and continuity | volume flow rate, A₁v₁ = A₂v₂, garden hose | — | ph-pipe |
| p1-fl-4 | 3 | C | Bernoulli's equation | p + ½ρv² + ρgh constant along a streamline, faster flow lower pressure, draining tank | faster flow means higher pressure | ph-pipe |
| p1c-fl-1 | 4 | K | Force on a dam | dp/dy = ρg, F = ∫p dA on a vertical wall | — | ph-dam |

**Unit `th` · "Temperature and heat"** (algebra only: `tracks:["a"]`)

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-th-1 | 1 | C | Temperature and expansion | Celsius and kelvin, ΔL = αL₀ΔT, expansion gaps | heat and temperature the same | ph-expand |
| p1-th-2 | 2 | C | The ideal gas | pV = nRT, kinetic picture: temperature as average molecular KE | — | ph-gas |
| p1-th-3 | 2 | C | Specific heat and calorimetry | Q = mcΔT, water's high c, mixing to equilibrium | metal feels colder because it is colder | ph-calor |
| p1-th-4 | 3 | C | Phase changes | latent heat, flat heating curve during melting/boiling | adding heat always raises temperature | ph-phase |
| p1-th-5 | 3 | C | Heat transfer | conduction, convection, radiation, insulation | cold flows in | ph-conduct |

**Unit `td` · "Thermodynamics"** (algebra only: `tracks:["a"]`)

| id | lv | T | Title | Teach | Misconception / pitfall | Demo |
|---|---|---|---|---|---|---|
| p1-td-1 | 1 | C | The first law | ΔU = Q − W (sign convention stated), heat and work as transfers | a body contains heat | ph-piston |
| p1-td-2 | 2 | C | Processes on a pV diagram | isobaric, isochoric, isothermal, adiabatic; work = area under the curve | — | ph-pv |
| p1-td-3 | 3 | C | Heat engines | efficiency = W/Q_h, Carnot limit 1 − T_c/T_h, refrigerators | an engine can turn all heat into work | ph-engine |
| p1-td-4 | 3 | C | Entropy and the second law | heat flows hot to cold on its own, entropy rises, why 100% efficiency is impossible | — | ph-engine |

Totals: 67 core lessons, 17 calculus-only. Physics 1 (algebra) = 67 lessons; Physics 1 (calculus) = 58 core (all but
the 9 thermo) + 17 = 75.

## Workflow

1. **Codex makes a unit** (`codex/tasks/physics.md`): writes `codex/phys/p1-<unit>.js` on branch `codex-phys-<unit>`,
   runs the checks, pushes the branch.
2. **Codex reviews it** (same task file, review mode, new chat): fixes on the same branch, pushes.
3. **Claude ships it** ("ship physics <unit> …"): moves the file to `phys/`, adds its script tag (after the other
   `phys/` tags, before the newest vNN), builds any demos and `need` figures the unit names, runs the checks, and
   ships with `ready:false`. When a unit's demos and figures are all in and Seth has looked, flip `ready:true` in a
   build (that's when testers see it, with a NEWS line).
4. Unit order: vec, 1d, 2d, nl, app, circ, en, mom, rot, tq, osc, wav, fl, th, td. Claude builds the demos for each
   unit as its content lands (or ahead of it).

### For Claude: shipping a physics unit
1. Worktree from origin/main; `git fetch origin codex-phys-<unit>`; copy `codex/phys/p1-<unit>.js` from that branch
   to `phys/p1-<unit>.js` (merge with an existing file for the unit if there is one: one `PH.unit` per file).
2. Script tag `<script src="phys/p1-<unit>.js">` after the last `phys/` tag. New build file for FB.ver + version.json.
3. Build the unit's missing demos (`phys/demos-*.js`) and `need` figures; `PH.needs` must be empty for the unit.
4. Checks: `eval "PH.errs"` (empty), `lessons <ids>`, `cards <ids>`, `demolessons <ids>`, cardshots of figure cards
   and every Guess, a demoshot per demo. Content numbers: `content-checker` on anything the review section flags.
5. Commit `bNN: physics <unit> (hidden)` or `bNN: physics <unit> live` when flipping ready.

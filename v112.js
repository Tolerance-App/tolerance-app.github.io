/* ===== v112 (2026-11-25): reveal cards for Controls =====
   1. All 56 cards of the 12 Controls lessons (ctrl-feedback-1…4, ctrl-pid-1…4, ctrl-exam-1…4) as reveal cards (rc98,
      format in v98.js; style catalogue in docs/LEARNING_DESIGN.md). Cards only: `cards`, `qs`, lesson ids and question
      order are unchanged.
      Guess on 17 cards, Fill on 15, 24 with neither (list in the TF48 entry and docs/CARD_CONVERSION.md report).
      Two cards have LFIG17 figures: ctrl-feedback-1 card 1 (the loop block diagram) and ctrl-pid-2 card 2 (noisy signal,
      raw and filtered derivative). Those cards leave out the blocks the figure already draws and carry no interaction. */
try{FB.ver="b112"}catch(e){}

/* ---------- ctrl-feedback-1 · Open and closed loop ---------- */
/* 0 · Compare in words + Guess (a thermostat is closed loop: it measures the temperature it controls). */
rc98("ctrl-feedback-1",0,{p:[
 {t:"p",x:"An **open-loop** system acts without checking the result: a toaster runs its timer whether the bread is pale or burnt."},
 {t:"p",x:"A **closed-loop** system measures the output and corrects: cruise control reads the speed and adjusts the throttle."},
 {t:"take",x:"A thermostat is closed loop: it switches the heater by the room temperature it is controlling."}],
 g:{at:2,q:"A thermostat switches a heater on and off by the room temperature. It is…",o:[
  ["open loop",0,"It does check the result: the room temperature it measures is the output it controls."],
  ["closed loop",1,"It measures the output (room temperature) and corrects the heater from it."]]}});

/* 1 · Legend → formula, no interaction. LFIG17 figure draws the loop (sum, controller, plant, sensor), so no chain. */
rc98("ctrl-feedback-1",1,{p:[
 {t:"eq",lab:"Error",eq:"e = r − y",vars:[["r","setpoint, the value you want"],["y","output, as the sensor measures it"]]},
 {t:"p",x:"The controller turns $e$ into a command $u$ that drives the **plant**: the thing being controlled."}]});

/* 2 · Plain text, Fill "slow down". */
rc98("ctrl-feedback-1",2,{p:[
 {t:"p",x:"Feedback corrects for what open loop can't see: **disturbances** and **model errors**."},
 {t:"p",x:"On a hill, a fixed throttle lets the car [[slow down]]. Cruise control sees the speed drop and opens the throttle."},
 {t:"p",x:"With a weaker motor than planned, the loop simply pushes harder until the measured speed matches."},
 {t:"take",x:"Feedback works from the measurement, so it doesn't need a perfect model."}]});

/* 3 · Plain text, no interaction. */
rc98("ctrl-feedback-1",3,{p:[
 {t:"p",x:"Feedback isn't free. It costs three things."},
 {t:"p",x:"**A sensor**: extra parts, cost, and one more thing that can fail."},
 {t:"p",x:"**Noise**: the loop acts on what the sensor reports, so sensor noise reaches the actuator."},
 {t:"p",x:"**Instability**: badly tuned gains can make a plant that is stable on its own oscillate."}]});

/* ---------- ctrl-feedback-2 · First-order response ---------- */
/* 0 · Plain text, no interaction. */
rc98("ctrl-feedback-2",0,{p:[
 {t:"p",x:"A **step** input jumps to a new value and stays there, like switching a heater on."},
 {t:"p",x:"Many systems answer a step as a **first-order lag**: a heater, an RC circuit, a motor's speed."},
 {t:"p",x:"The output rises fastest at the start, then levels off at a new steady value."}]});

/* 1 · Legend → formula + Guess. y(τ) = K(1 − e^-1) = 0.632 K. */
rc98("ctrl-feedback-2",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["y","change in output"],["K","steady-state gain: final change per unit of input"],["τ","time constant, s"],["t","time since the step, s"]]},
 {t:"eq",lab:"First-order step response",eq:"y(t) = K (1 − e^{−t/τ})",cap:"unit step at t = 0, starting at rest"},
 {t:"p",x:"At $t = τ$: $y = K(1 − e^{−1}) = 0.632 K$, so the output has made **63 %** of its final change."}],
 g:{at:2,q:"At t = τ, how far has the output got toward its final value?",o:[
  ["about half",0,"Half is reached a bit earlier, at t ≈ 0.69 τ. At t = τ it is further along."],
  ["about two-thirds",1,"1 − e^−1 = 0.632: about 63 % of the final change."],
  ["all the way",0,"An exponential never quite arrives; after one τ about 37 % of the gap is still left."]]}});

/* 2 · Value rows, Fill "same factor". e^-1 = 0.368, e^-2 = 0.135, e^-3 = 0.0498, e^-4 = 0.0183. */
rc98("ctrl-feedback-2",2,{p:[
 {t:"p",x:"In every time constant, the gap left to the final value shrinks by the [[same factor]]."},
 [{t:"vt",l:"After τ",v:"37",u:"% left"},{t:"vt",l:"After 2τ",v:"13.5",u:"% left"},{t:"vt",l:"After 3τ",v:"5.0",u:"% left"},{t:"vt",l:"After 4τ",v:"1.8",u:"% left"},
  {t:"rel",x:"Each row is $e^{−1}$ ≈ 0.37 times the one before."}],
 {t:"take",x:"Under 2 % is left after 4τ, a common definition of **settling time**: $t_s ≈ 4τ$."}]});

/* 3 · Worked example, no interaction. 30 × (1 − e^-1) = 30 × 0.6321 = 18.96 ≈ 19.0 °C. t_s = 4 × 60 = 240 s. */
rc98("ctrl-feedback-2",3,{p:[
 {t:"giv",lab:"Heater, first-order lag",rows:[["τ","60","s"],["K","30","°C final rise"],["t","60","s"]]},
 {t:"step",f:"ΔT = 30 (1 − e^{−1})",v:"19.0",u:"°C"},
 {t:"step",f:"t_s ≈ 4τ = 4 × 60",v:"240",u:"s",fin:1},
 {t:"p",x:"About 19 °C up after one minute, and within 2 % of the final 30 °C after about four minutes."}]});

/* ---------- ctrl-feedback-3 · Proportional control and offset ---------- */
/* 0 · Legend → formula, no interaction. */
rc98("ctrl-feedback-3",0,{p:[
 {t:"eq",lab:"Proportional control",eq:"u = K_p e",vars:[["u","command"],["K_p","proportional gain"],["e","error"]]},
 {t:"p",x:"More error, more push. Zero error, zero push."},
 {t:"p",x:"Simple, but against a constant setpoint it leaves a steady error, called the **offset**."}]});

/* 1 · Formula → value rows + Guess. r = 1: K_pK = 9 → 1/10 = 10 %; K_pK = 99 → 1/100 = 1 %. */
rc98("ctrl-feedback-3",1,{p:[
 {t:"eq",lab:"Offset after a step",eq:"e_{ss} = r / (1 + K_p K)",cap:"plant steady-state gain K, step setpoint r, stable loop",vars:[["e_{ss}","steady-state error"],["K_p K","the loop gain"]]},
 {t:"vt",l:"Loop gain 9",v:"10",u:"% of r"},
 [{t:"vt",l:"Loop gain 99",v:"1",u:"% of r"},{t:"rel",x:"Offset ∝ 1/(1 + loop gain): it shrinks, but reaches zero only at infinite gain."}]],
 g:{at:2,q:"Raise the loop gain from 9 to 99. The offset…",o:[
  ["drops to about 1 %",1,"1/(1 + 99) = 1 %: about ten times smaller, but not zero."],
  ["drops to zero",0,"r/(1 + K_pK) is zero only for infinite gain; finite gain always leaves some offset."]]}});

/* 2 · Rule in words, Fill "nonzero". */
rc98("ctrl-feedback-3",2,{p:[
 {t:"p",x:"P control pushes with $u = K_p e$: with zero error, it pushes with zero."},
 {t:"p",x:"Holding a room above outdoor temperature takes steady heater power, so P control needs a [[nonzero]] error to supply it."},
 {t:"take",x:"The loop settles where the error is just big enough to make the power needed."}]});

/* 3 · Legend → formula + Guess (integral removes offset, constant setpoint, stable loop). */
rc98("ctrl-feedback-3",3,{p:[
 {t:"eq",lab:"Proportional + integral",eq:"u = K_p e + K_i ∫e dt",vars:[["K_i","integral gain"],["∫e dt","the error added up over time"]]},
 {t:"p",x:"That running total keeps growing while any error remains."},
 {t:"take",x:"The integral can hold a steady output with zero error, so the offset goes to zero (constant setpoint, stable loop)."}],
 g:{at:2,q:"With integral action, the steady error to a constant setpoint ends up…",o:[
  ["smaller, but not zero",0,"That's P control with more gain. The integral keeps growing until the error is exactly zero."],
  ["zero",1,"The total stops changing only when the error is zero, and it then holds the output needed."]]}});

/* ---------- ctrl-feedback-4 · Damping and overshoot ---------- */
/* 0 · Terms, no interaction. */
rc98("ctrl-feedback-4",0,{p:[
 {t:"p",x:"Many closed loops behave like a mass, spring and damper. Two numbers describe their step response."},
 [{t:"term",s:"ζ",x:"**Damping ratio**: how fast oscillation dies out. At 1 and above, there's no overshoot."},
  {t:"term",s:"ωₙ",x:"**Natural frequency**: how fast it would oscillate with no damping, in rad/s."}],
 {t:"take",x:"Higher ζ, less overshoot. Higher ω_n, faster response."}]});

/* 1 · Formula → value rows + Guess. ζ = 0.5: 0.5π/√0.75 = 1.814, e^-1.814 = 0.163 → 16.3 %.
   ζ = 0.7: 0.7π/√0.51 = 3.079, e^-3.079 = 0.0460 → 4.60 %. */
rc98("ctrl-feedback-4",1,{p:[
 {t:"eq",lab:"Percent overshoot",eq:"100 exp(−ζπ / √{1 − ζ^2})",cap:"standard second-order loop, no zeros, step input, ζ < 1"},
 {t:"vt",l:"ζ = 0.5",v:"16.3",u:"% overshoot"},
 [{t:"vt",l:"ζ = 0.7",v:"4.6",u:"% overshoot"},{t:"rel",x:"A little more damping cuts overshoot sharply: it falls off steeply as ζ rises."}]],
 g:{at:2,q:"Raise ζ from 0.5 to 0.7. Overshoot falls to about…",o:[
  ["12 %",0,"That scales overshoot down in step with ζ. The formula is exponential, so it drops much faster."],
  ["5 %",1,"exp(−0.7π/√0.51) = 0.046: about 4.6 %."]]}});

/* 2 · Rule → formula → value row, Fill "slow". t_s = 4/(0.7 × 2) = 2.857 s. */
rc98("ctrl-feedback-4",2,{p:[
 {t:"p",x:"Low ζ overshoots and rings. High ζ doesn't overshoot, but is [[slow]] to rise."},
 {t:"p",x:"$ζ ≈ 0.7$ is a common compromise: a quick rise and about 5 % overshoot."},
 {t:"eq",lab:"2 % settling time",eq:"t_s ≈ 4 / (ζ ω_n)",cap:"underdamped second-order loop, ζ < 1"},
 {t:"vt",l:"ζ = 0.7, ω_n = 2 rad/s",v:"t_s ≈ 2.9",u:"s"}]});

/* 3 · Change table + Guess. Mass-spring-damper analogy: ζ = c/(2√(km)); K_p acts as k (ζ ∝ 1/√K_p), K_d as c (ζ ∝ K_d). */
rc98("ctrl-feedback-4",3,{p:[
 {t:"p",x:"**Derivative** action reacts to how fast the error changes. It acts like the damper, so it adds damping."},
 {t:"p",x:"**Proportional** gain acts like the spring. On a mass-like plant with PD, raising it alone makes the loop stiffer."},
 {t:"tbl",head:["Raise","$ζ$","Overshoot"],rows:[["$K_d$","↑","↓"],["$K_p$","↓","↑"]],hi:[1,2]}],
 g:{at:2,q:"Raise K_p alone. Overshoot…",o:[
  ["grows",1,"A stiffer spring with the same damper means lower ζ, so more overshoot."],
  ["shrinks",0,"That's what more D gain does. More P gain lowers the damping ratio."]]}});

/* ---------- ctrl-pid-1 · Integral action and windup ---------- */
/* 0 · Plain text, Fill "growing". */
rc98("ctrl-pid-1",0,{p:[
 {t:"p",x:"Integral action adds up the error over time: $∫e dt$."},
 {t:"p",x:"While any steady error remains, the total keeps [[growing]] and pushes harder, until the error is zero."},
 {t:"take",x:"It removes the offset that P control alone leaves."}]});

/* 1 · Plain text + Guess (too much K_i overshoots). */
rc98("ctrl-pid-1",1,{p:[
 {t:"p",x:"The integral grows while the error is positive, so it is at its largest just as the error reaches zero."},
 {t:"p",x:"So it keeps pushing after the error crosses zero. The output overshoots, and the integral must unwind through negative error."},
 {t:"take",x:"Too much $K_i$: more overshoot and oscillation."}],
 g:{at:1,q:"Raise the integral gain K_i a lot. The step response…",o:[
  ["overshoots more",1,"The large integral keeps pushing after the error crosses zero."],
  ["settles faster",0,"The integral is at its peak when the error hits zero, so a bigger K_i pushes further past."]]}});

/* 2 · Process chain, no interaction. */
rc98("ctrl-pid-1",2,{p:[
 {t:"p",x:"**Windup** starts when the actuator saturates: it is already at its limit, like a heater at 100 %."},
 {t:"chain",items:["heater at 100 %","error stays","integral keeps growing","error flips","slow unwind"],hl:2},
 {t:"p",x:"When the error finally flips sign, the oversized integral takes a long time to unwind, and the output overshoots far."}]});

/* 3 · Plain text, no interaction. */
rc98("ctrl-pid-1",3,{p:[
 {t:"p",x:"**Anti-windup** limits the integral while the actuator is saturated. Two common ways:"},
 [{t:"p",x:"**Clamping**: hold the integral at a set limit."},
  {t:"p",x:"**Conditional integration**: stop integrating while the output is saturated."}],
 {t:"take",x:"The integral stays small, ready to act as soon as the actuator comes off its limit."}]});

/* ---------- ctrl-pid-2 · Derivative action and noise ---------- */
/* 0 · Legend → formula, Fill "brakes". Approaching the setpoint from below: e > 0 falling, de/dt < 0, so the D term is negative. */
rc98("ctrl-pid-2",0,{p:[
 {t:"eq",lab:"Derivative action",eq:"u_D = K_d de/dt",vars:[["K_d","derivative gain"],["de/dt","how fast the error changes"]]},
 {t:"p",x:"As the error falls fast toward zero, $de/dt$ is negative, so the D term pushes back."},
 {t:"p",x:"It [[brakes]] the output before the error reaches zero: that is the added damping."}]});

/* 1 · Formula → value rows + Guess. Signal 1 rad/s, amplitude 1; noise 100 rad/s, amplitude 0.01.
   Derivatives: 1 × 1 = 1 and 100 × 0.01 = 1, so the noise becomes as big as the signal. */
rc98("ctrl-pid-2",1,{p:[
 {t:"p",x:"Derivative action amplifies **noise**."},
 {t:"eq",lab:"Derivative of a sine",eq:"d/dt sin(ωt) = ω cos(ωt)",cap:"ω in rad/s: the derivative is ω times larger"},
 [{t:"vt",l:"Signal, 1 rad/s",v:"× 1",u:""},{t:"vt",l:"Noise, 100 rad/s",v:"× 100",u:""},
  {t:"rel",x:"Noise 1/100 of the signal becomes as big as the signal: high frequencies are boosted most."}]],
 g:{at:2,q:"Noise at 100 rad/s is 1/100 the size of a 1 rad/s signal. After differentiating, the noise is…",o:[
  ["still 1/100 of the signal",0,"Differentiating multiplies each sine by its own ω, so fast noise grows 100× more than the slow signal."],
  ["about as big as the signal",1,"Signal × 1, noise × 100: 0.01 × 100 = 1."]]}});

/* 2 · LFIG17 figure (signal, raw derivative, filtered derivative). Short, no interaction. */
rc98("ctrl-pid-2",2,{p:[
 {t:"p",x:"Real D terms pass the derivative through a **low-pass filter**."},
 {t:"p",x:"Its corner is often 5–10 × the loop bandwidth: high enough to keep the braking, low enough to cut most noise."}]});

/* 3 · Formula + Guess. Constant r: de/dt = −dy/dt, so the damping is the same between setpoint jumps. */
rc98("ctrl-pid-2",3,{p:[
 {t:"p",x:"When the setpoint jumps, the error jumps, and $de/dt$ spikes for an instant: a **derivative kick** to the actuator."},
 {t:"eq",lab:"Derivative on measurement",eq:"u_D = −K_d dy/dt",cap:"y is the measured output; it can't jump, so no kick"},
 {t:"take",x:"Between setpoint changes $de/dt = −dy/dt$, so the damping is the same, without the kick."}],
 g:{at:2,q:"Use −dy/dt instead of de/dt. Between setpoint jumps, the damping is…",o:[
  ["the same",1,"With r constant, de/dt = −dy/dt exactly."],
  ["weaker",0,"y and e change at the same rate when r is constant, so the D term is identical there."]]}});

/* ---------- ctrl-pid-3 · Gain and phase margin ---------- */
/* 0 · Plain text, Fill "reinforces". */
rc98("ctrl-pid-3",0,{p:[
 {t:"p",x:"Around the loop, a signal comes back scaled by the **open-loop gain** and shifted by its **phase**."},
 {t:"p",x:"At −180°, the subtraction at the summing point flips sign: the returning signal [[reinforces]] the input."},
 {t:"p",x:"If the gain there is also 1 (0 dB), the oscillation sustains itself: the loop is at the edge of instability."}]});

/* 1 · Compare pair, no interaction. 10 dB → 10^(10/20) = 3.16×. */
rc98("ctrl-pid-3",1,{p:[
 {t:"p",x:"Two margins say how far the loop is from that edge."},
 [{t:"pc",l:"Gain margin",c:"extra gain allowed, where phase = −180°",v:"e.g. 10 dB"},
  {t:"pc",l:"Phase margin",c:"extra lag allowed, where gain = 0 dB",v:"e.g. 50°"}],
 {t:"take",x:"A 10 dB gain margin means the gain could rise about 3.2× before the loop oscillates."}]});

/* 2 · Change table + Guess. Standard second-order loop ω_n²/[s(s + 2ζω_n)]:
   PM = atan(2ζ/√(√(1 + 4ζ⁴) − 2ζ²)). ζ = 0.27 → 30.1°, 0.42 → 45.0°, 0.61 → 59.8°.
   PO: ζ 0.27 → 41.4 %, 0.42 → 23.4 %, 0.61 → 8.9 %. */
rc98("ctrl-pid-3",2,{p:[
 {t:"p",x:"For a standard second-order loop, phase margin sets the damping, and so the overshoot."},
 {t:"tbl",head:["Phase margin","$ζ$","Overshoot"],rows:[["30°","≈ 0.27","≈ 40 %"],["45°","≈ 0.42","≈ 23 %"],["60°","≈ 0.61","≈ 9 %"]],hi:[0,2]},
 {t:"take",x:"45–60° is the usual target. Below about 30° the step response rings; more margin is calmer but slower."}],
 g:{at:1,q:"Phase margin drops from 60° to 30°. Step overshoot goes from about 9 % to…",o:[
  ["about 18 %",0,"That doubles overshoot as the margin halves. Overshoot grows much faster than that as damping falls."],
  ["about 40 %",1,"30° of margin means ζ ≈ 0.27, and that overshoots about 40 %."]]}});

/* 3 · Rule → formula → value rows, Fill "in proportion to". T = 0.1 s: ω = 2 → 0.2 rad = 11.5°; ω = 10 → 1 rad = 57.3°. */
rc98("ctrl-pid-3",3,{p:[
 {t:"p",x:"A time delay adds phase lag that grows [[in proportion to]] frequency, and leaves the gain unchanged."},
 {t:"eq",lab:"Lag from a delay",eq:"φ = ω T",cap:"pure delay T in s, ω in rad/s, φ in radians",vars:[["T","time delay, here 0.1 s"]]},
 [{t:"vt",l:"Crossover 2 rad/s",v:"11.5",u:"° lost"},{t:"vt",l:"Crossover 10 rad/s",v:"57.3",u:"° lost"}],
 {t:"take",x:"So a delay eats phase margin, and limits how fast (how high a bandwidth) the loop can be."}]});

/* ---------- ctrl-pid-4 · Digital control and sampling ---------- */
/* 0 · Process chain, no interaction. ZOH average delay T_s/2. */
rc98("ctrl-pid-4",0,{p:[
 {t:"p",x:"A digital controller runs the same cycle every sample period $T_s$."},
 {t:"chain",items:["sample y","compute u","update output","hold"],hl:3},
 {t:"p",x:"A **zero-order hold** keeps $u$ constant until the next update. On average the output is half a period late, so the hold acts like a delay of about $T_s/2$."}]});

/* 1 · Formula → value rows + Guess. Sampling N× the bandwidth: T_s = 2π/(N ω_b), φ = ω_b T_s/2 = π/N rad = 180°/N.
   N = 20 → 9°, N = 5 → 36°. */
rc98("ctrl-pid-4",1,{p:[
 {t:"p",x:"Rule of thumb: sample 10–30 times faster than the closed-loop bandwidth $ω_b$."},
 {t:"eq",lab:"Phase lost to the hold",eq:"φ ≈ ω T_s / 2",cap:"hold modelled as a delay of T_s/2; φ in radians"},
 {t:"vt",l:"20 × bandwidth",v:"≈ 9",u:"° lost"},
 [{t:"vt",l:"5 × bandwidth",v:"≈ 36",u:"° lost"},{t:"rel",x:"Lost phase ≈ 180°/N when sampling N × the bandwidth: slower sampling eats phase margin."}]],
 g:{at:3,q:"Sample at only 5 × the bandwidth instead of 20 ×. The phase lost at ω_b…",o:[
  ["stays about 9°",0,"The hold's delay is T_s/2, and T_s is 4× longer, so the lag at the same ω is 4× more."],
  ["grows to about 36°",1,"4× the sample period, 4× the delay, 4× the phase lag: 36°."]]}});

/* 2 · Rule + value row, Fill "before". 90 Hz sampled at 100 Hz aliases to |90 − 100| = 10 Hz. */
rc98("ctrl-pid-4",2,{p:[
 {t:"p",x:"After sampling, noise faster than half the sample rate looks exactly like a slower wobble, and the loop reacts to it."},
 {t:"p",x:"Example: sampled at 100 Hz, a 90 Hz ripple shows up as a 10 Hz wobble."},
 {t:"p",x:"No filter after sampling can tell the two apart, so the anti-alias filter goes [[before]] the sampler."}]});

/* 3 · Two formulas, no interaction. */
rc98("ctrl-pid-4",3,{p:[
 {t:"p",x:"In code, the integral becomes a running sum and the derivative a difference."},
 {t:"eq",lab:"Integral",eq:"I_k = I_{k−1} + e_k Δt",vars:[["e_k","error at sample k"],["Δt","sample period"]]},
 {t:"eq",lab:"Derivative",eq:"D_k = (e_k − e_{k−1}) / Δt"},
 {t:"take",x:"Both assume a steady, known $Δt$. If the timing jitters, I and D are wrong."}]});

/* ---------- ctrl-exam-1 · Routh and gain limits ---------- */
/* 0 · Plain text, no interaction. */
rc98("ctrl-exam-1",0,{p:[
 {t:"p",x:"The **Routh table** is a small table that shows, without solving for the roots, when raising the feedback gain makes oscillations grow."},
 {t:"p",x:"The question here: how high can the gain $K$ go before the loop goes unstable?"}]});

/* 1 · Legend → formula, no interaction. */
rc98("ctrl-exam-1",1,{p:[
 {t:"p",x:"A controller with gain $K$ drives the **plant**: the thing being controlled, like a motor."},
 {t:"eq",lab:"Controller and plant, $G(s)$",eq:"K / [s(s + 1)(s + 5)]",vars:[["s","Laplace variable"],["1, 5","the plant's rates, s^{−1}"]]},
 {t:"p",x:"The output is measured and subtracted from the command: **unity negative feedback**."}]});

/* 2 · Formula → table + Guess. 1 + G = 0 → s(s + 1)(s + 5) + K = s³ + 6s² + 5s + K = 0.
   Routh: s³: 1, 5; s²: 6, K; s¹: (6·5 − 1·K)/6 = (30 − K)/6; s⁰: K. All positive → 0 < K < 30. */
rc98("ctrl-exam-1",2,{p:[
 {t:"eq",lab:"Closed-loop equation",eq:"s^3 + 6s^2 + 5s + K = 0",cap:"from 1 + G(s) = 0; its roots decide if the response dies out"},
 {t:"tbl",head:["Row","Column 1","Column 2"],rows:[["$s^3$","1","5"],["$s^2$","6","K"],["$s^1$","(30−K)/6",""],["$s^0$","K",""]],hi:[2,1]},
 {t:"take",x:"First column all positive needs $K > 0$ and $30 − K > 0$: stable for $0 < K < 30$."}],
 g:{at:2,q:"Stable means every first-column entry is positive. So K must be…",o:[
  ["0 < K < 30",1,"K > 0 from the s⁰ row, and (30 − K)/6 > 0 from the s¹ row."],
  ["K > 30",0,"Above 30 the s¹ entry goes negative: two sign changes, two unstable poles."],
  ["0 < K < 5",0,"5 is a coefficient in the table, not the limit. The s¹ entry stays positive up to K = 30."]]}});

/* 3 · Rule in words, Fill "unstable". */
rc98("ctrl-exam-1",3,{p:[
 {t:"p",x:"Read down the first column and count the sign changes."},
 {t:"p",x:"Each change, + to − or − to +, is one [[unstable]] pole: a root in the right half-plane, a mode that grows."},
 {t:"p",x:"No changes, all positive: stable. A zero in the column needs a special step, so don't call that stable."}]});

/* 4 · Worked example, no interaction. (30 − 10)/6 = 3.333. Type-1 loop: closed loop K/(s³ + 6s² + 5s + K), gain at s = 0 is K/K = 1. */
rc98("ctrl-exam-1",4,{p:[
 {t:"giv",lab:"Fixed gain",rows:[["K","10","s^{−3}"]]},
 {t:"step",f:"s^1 entry: (30 − 10) / 6",v:"3.333",u:"s^{−2}"},
 {t:"p",x:"First column: 1, 6, 3.333, 10. All positive, so the loop is stable."},
 {t:"p",x:"Starting at rest with a unit-step command, the output settles to exactly 1: the closed-loop gain at $s = 0$ is $K/K = 1$."}]});

/* 5 · Formula + Guess. s³ + 6s² + 5s + 30 = (s + 6)(s² + 5); poles −6, ±j√5 = ±j2.236 rad/s. */
rc98("ctrl-exam-1",5,{p:[
 {t:"p",x:"At $K = 30$, the $s^1$ entry is zero: the edge."},
 [{t:"eq",lab:"Characteristic equation at K = 30",eq:"(s + 6)(s^2 + 5) = 0"},
  {t:"vt",l:"Poles",v:"−6, ±j2.236",u:"s^{−1}"}],
 {t:"take",x:"Poles on the imaginary axis: an oscillation at √5 = 2.236 rad/s that never dies out. Settling needs $0 < K < 30$."}],
 g:{at:2,q:"Poles at −6 and ±j2.236. The step response…",o:[
  ["oscillates forever",1,"Imaginary-axis poles have zero decay rate: the oscillation neither grows nor dies."],
  ["settles slowly",0,"Settling needs every pole in the left half-plane. These two have zero real part."],
  ["grows without bound",0,"That needs a right-half-plane pole. At exactly K = 30 they sit on the axis."]]}});

/* ---------- ctrl-exam-2 · Spacecraft attitude with PD ---------- */
/* 0 · Plain text, Fill "swinging past". */
rc98("ctrl-exam-2",0,{p:[
 {t:"p",x:"Angle feedback turns the spacecraft toward its target."},
 {t:"p",x:"Rate feedback stops it from [[swinging past]]."}]});

/* 1 · Legend → formula, no interaction. */
rc98("ctrl-exam-2",1,{p:[
 {t:"eq",lab:"Rigid axis",eq:"J d^2θ/dt^2 = u",cap:"no natural damping or disturbance torques, starts at rest",vars:[["J","inertia, 10 kg·m^2"],["θ","angle, rad"],["u","actuator torque, N·m"]]},
 {t:"p",x:"With no damping of its own, any torque keeps the spacecraft turning until another torque stops it."}]});

/* 2 · Legend → formula, Fill "spring". */
rc98("ctrl-exam-2",2,{p:[
 {t:"eq",lab:"PD control",eq:"u = K_p (θ_{ref} − θ) − K_d ω",vars:[["ω","rotation rate dθ/dt, rad/s"],["K_p","N·m/rad"],["K_d","N·m·s/rad"]]},
 {t:"p",x:"The $K_p$ term acts like a [[spring]] pulling toward the target."},
 {t:"p",x:"The $K_d$ term acts like a damper: it opposes the rotation rate."}]});

/* 3 · Worked example, no interaction. ω_n = √(10/10) = 1.000 rad/s; ζ = 14/(2√(10 × 10)) = 14/20 = 0.700. */
rc98("ctrl-exam-2",3,{p:[
 [{t:"eq",lab:"Natural frequency",eq:"ω_n = √{K_p / J}"},{t:"eq",lab:"Damping ratio",eq:"ζ = K_d / (2√{K_p J})",cap:"linear, unsaturated model"}],
 {t:"giv",rows:[["K_p","10","N·m/rad"],["K_d","14","N·m·s/rad"],["J","10","kg·m^2"]]},
 [{t:"step",f:"ω_n = √{10 / 10}",v:"1.000",u:"rad/s"},
  {t:"step",f:"ζ = 14 / (2√{100})",v:"0.700",u:"",fin:1}]]});

/* 4 · Worked value + Guess. ζ = 0.7: PO = 100 exp(−0.7π/√0.51) = 4.60 %. K_d = 0 → ζ = 0, undamped. */
rc98("ctrl-exam-2",4,{p:[
 {t:"eq",lab:"Percent overshoot",eq:"100 exp(−ζπ / √{1 − ζ^2})",cap:"unit step from rest, 0 < ζ < 1"},
 {t:"step",f:"ζ = 0.700",v:"4.60",u:"%",fin:1},
 {t:"take",x:"With $K_d$ = 0, ζ = 0: no damping at all, so it swings back and forth forever."}],
 g:{at:2,q:"Now set K_d = 0. The response…",o:[
  ["oscillates forever",1,"ζ = K_d/(2√(K_pJ)) = 0, and the rigid axis has no damping of its own."],
  ["settles after a while",0,"Settling needs some damping. With K_d = 0 there is none anywhere in the loop."]]}});

/* 5 · Worked example, no interaction. 4/(0.7 × 1) = 5.714 s. */
rc98("ctrl-exam-2",5,{p:[
 {t:"eq",lab:"2 % settling time",eq:"t_s ≈ 4 / (ζ ω_n)",cap:"underdamped second-order model"},
 {t:"step",f:"4 / (0.700 × 1.000)",v:"5.71",u:"s",fin:1},
 {t:"p",x:"This estimate holds for underdamped loops only. For an overdamped one ($ζ > 1$), check the slow pole instead."}]});

/* ---------- ctrl-exam-3 · Gravity and steady-state error ---------- */
/* 0 · Plain text, no interaction. */
rc98("ctrl-exam-3",0,{p:[
 {t:"p",x:"A hovering vehicle needs thrust even when it isn't moving, just to hold up its weight."},
 {t:"p",x:"So the controller must supply that thrust somehow, and how it does decides the steady error."}]});

/* 1 · Legend → formula + value, no interaction. mg = 1.2 × 9.81 = 11.77 N. */
rc98("ctrl-exam-3",1,{p:[
 {t:"eq",lab:"Vertical motion",eq:"m z̈ = T − m g",cap:"no drag, thrust not saturated",vars:[["z","altitude, m"],["T","thrust, N"],["m","mass, 1.2 kg"],["g","9.81 m/s^2"]]},
 {t:"vt",l:"Weight $mg$",v:"11.77",u:"N"}]});

/* 2 · Legend → formula + Guess. At rest ż = 0, T = K_p e = mg ≠ 0. */
rc98("ctrl-exam-3",2,{p:[
 {t:"eq",lab:"PD control",eq:"T = K_p e − K_d ż",vars:[["e","z_{ref} − z, the altitude error"],["K_p","N/m"],["K_d","N·s/m"]]},
 {t:"p",x:"At rest $ż = 0$, so the thrust is just $K_p e$."},
 {t:"take",x:"To hold up the weight, $K_p e = mg$: a steady nonzero error remains."}],
 g:{at:2,q:"Hovering at rest under PD, the altitude error is…",o:[
  ["zero",0,"With e = 0 and ż = 0, PD gives zero thrust, and the vehicle would fall."],
  ["a steady offset",1,"Only the K_p e term is left at rest, so e must stay nonzero to make thrust mg."]]}});

/* 3 · Worked example, no interaction. 11.772/40 = 0.2943 m; 1 − 0.2943 = 0.7057 m. */
rc98("ctrl-exam-3",3,{p:[
 {t:"giv",lab:"Demo gains",rows:[["K_p","40","N/m"],["K_d","10","N·s/m"],["z_{ref}","1","m"]]},
 [{t:"p",x:"At rest, $K_p e = m g$:"},{t:"step",f:"e_{ss} = 11.77 / 40",v:"0.2943",u:"m"}],
 {t:"step",f:"z = 1 − 0.2943",v:"0.7057",u:"m",fin:1},
 {t:"p",x:"It hovers about 29 cm below the target."}]});

/* 4 · Two formulas, Fill "exactly". */
rc98("ctrl-exam-3",4,{p:[
 [{t:"p",x:"Two ways to remove the offset, each adding to the PD thrust $T_{PD}$:"},{t:"eq",lab:"Gravity feedforward",eq:"T = T_{PD} + m g"}],
 {t:"eq",lab:"PID",eq:"T = T_{PD} + K_i ∫e dt",cap:"K_i in N/(m·s)"},
 {t:"p",x:"Either removes a constant-gravity offset, if the closed loop is asymptotically stable."},
 {t:"p",x:"Feedforward works only if $m g$ is known [[exactly]]. The integral finds the needed thrust on its own."}]});

/* 5 · Condition + worked check, no interaction. m z⃛ + K_d z̈ + K_p ż + K_i z = K_i z_ref → m s³ + K_d s² + K_p s + K_i;
   Routh: K_i > 0 and K_d K_p > m K_i. 10 × 40 = 400 > 1.2 × 40 = 48. */
rc98("ctrl-exam-3",5,{p:[
 {t:"eq",lab:"PID stability",eq:"K_i > 0  and  K_d K_p > m K_i",cap:"positive m, K_p, K_d; linear, unsaturated"},
 [{t:"step",f:"K_d K_p = 10 × 40",v:"400",u:""},{t:"step",f:"m K_i = 1.2 × 40",v:"48",u:""}],
 {t:"p",x:"400 > 48, so with $K_i$ = 40 the error tends to zero. At $K_i$ = 0 it is PD again, and the offset returns."}]});

/* ---------- ctrl-exam-4 · Specs to pole locations ---------- */
/* 0 · Plain text, no interaction. */
rc98("ctrl-exam-4",0,{p:[
 {t:"p",x:"Response limits, such as maximum overshoot and settling time, can be turned into a region of the complex plane."},
 {t:"p",x:"Put the system's poles inside it and the response meets the limits."}]});

/* 1 · Legend, Fill "left half". */
rc98("ctrl-exam-4",1,{p:[
 {t:"p",x:"A standard second-order system with no zeros has its poles at $σ ± jω_d$."},
 {t:"vars",vars:[["σ","real part, s^{−1}"],["ω_d","damped frequency, rad/s"],["j","j^2 = −1"]]},
 {t:"p",x:"Stable poles sit in the [[left half]] of the plane, $σ < 0$. Oscillating ones also have $ω_d > 0$."}]});

/* 2 · Formula → value rows + Guess. M = 0.10: ln 0.1 = −2.3026, √(π² + 5.3019) = 3.8951, ζ = 0.5912.
   M = 0.05: ln = −2.9957, √(9.8696 + 8.9744) = 4.3410, ζ = 0.6901. Wedge half-angle acos(0.5912) = 53.8°. */
rc98("ctrl-exam-4",2,{p:[
 {t:"eq",lab:"Minimum damping $ζ_{min}$",eq:"−ln M / √{π^2 + ln^2 M}",cap:"step from rest; M = allowed overshoot fraction, 0 < M < 1"},
 [{t:"vt",l:"M = 0.10",v:"ζ_{min} = 0.591",u:""},{t:"p",x:"$ζ ≥ ζ_{min}$ is a wedge from the origin, opening to the left."}],
 [{t:"vt",l:"M = 0.05",v:"ζ_{min} = 0.690",u:""},{t:"rel",x:"Less overshoot allowed, higher $ζ_{min}$: a narrower wedge."}]],
 g:{at:2,q:"Allow only 5 % overshoot instead of 10 %. The wedge…",o:[
  ["narrows",1,"Less overshoot needs more damping, so ζ_min rises and the allowed angle shrinks."],
  ["widens",0,"A tighter limit can't allow more poles. ζ_min rises, which narrows the wedge."]]}});

/* 3 · Formula + region, Fill "to the left". t_s ≤ 2 → 4/|σ| ≤ 2 → |σ| ≥ 2 → σ ≤ −2 s⁻¹. */
rc98("ctrl-exam-4",3,{p:[
 {t:"eq",lab:"2 % settling time",eq:"t_s ≈ 4 / |σ|",cap:"underdamped model"},
 {t:"vt",l:"Limit t_s ≤ 2 s",v:"σ ≤ −2",u:"s^{−1}"},
 {t:"p",x:"That's a vertical line: poles must sit [[to the left]] of it, as well as inside the overshoot wedge."}]});

/* 4 · Worked example, no interaction. ζ = 3/√18 = 0.7071; PO = 100 exp(−π · 0.7071/0.7071) = 100 e^{−π} = 4.32 %;
   t_s = 4/3 = 1.333 s. */
rc98("ctrl-exam-4",4,{p:[
 {t:"giv",lab:"Demo poles",rows:[["σ","−3","s^{−1}"],["ω_d","3","rad/s"]]},
 {t:"step",f:"ζ = |σ| / √{σ^2 + ω_d^2}",v:"0.7071",u:""},
 [{t:"step",f:"PO = 100 e^{−π}",v:"4.32",u:"%"},{t:"step",f:"t_s ≈ 4 / 3",v:"1.333",u:"s",fin:1}],
 {t:"p",x:"Both limits met: 4.32 % < 10 % and 1.333 s ≤ 2 s."}]});

/* 5 · Plain text + Guess. Extra real pole at −0.5 s⁻¹: its mode decays as e^{−0.5t}, 2 % at 4/0.5 = 8 s. */
rc98("ctrl-exam-4",5,{p:[
 {t:"p",x:"Farther-left poles make transients die out faster; more damping keeps overshoot down. Both tests matter."},
 {t:"p",x:"But the region only describes one pole pair. Add a slow pole at −0.5 s^{−1} to the pair at −3 ± 3j:"},
 {t:"take",x:"Unless a nearby zero cancels it, the slow pole now sets settling: about $4/0.5$ = 8 s. Zeros and extra slow poles can break predictions from one pair."}],
 g:{at:2,q:"With that slow pole added, the 2 % settling time is set by…",o:[
  ["the pair, 1.3 s",0,"The pair's transient is gone by 1.3 s, but the slow pole's mode is still decaying."],
  ["the slow pole, 8 s",1,"Its mode decays as e^−0.5t, which takes about 4/0.5 = 8 s to fall under 2 %."]]}});

try{NEWS.unshift({d:"2026-11-25",t:["Controls cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word."]})}catch(e){}
try{TF48.unshift({b:"b112",k:"rc112a",t:"Reveal cards: Controls",c:"All 56 cards in the 12 controls lessons. Guesses on 17 cards (thermostat, 63 %, offset, integral, overshoot, windup, D noise, margins, sampling, Routh, PD, hover, pole wedge, slow pole); Fills on 15.",go:["lesson","ctrl-feedback-1"]})}catch(e){}

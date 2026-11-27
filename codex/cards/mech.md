# Mechanical reveal cards

Converted 135 cards across all 31 Mechanical lessons against b114. The course has 138 reveal cards with the three existing b98 entries included. Those entries are `mech-beams-2` indices 4 and 5 and `mech-thermodynamics-1` index 1.

Of the new cards, 42 use Guess, 44 use Fill, and 49 use neither. Indices below start at zero.

| Lesson | New cards | Guess indices | Fill indices |
| --- | ---: | --- | --- |
| `mech1` | 3 | 0 | 1 |
| `mech2` | 2 | 1 | 0 |
| `mech3` | 2 | 1 | — |
| `mech4` | 8 | 1, 4 | 0, 3, 7 |
| `mech-beams-2` | 6 | 1 | 2, 7 |
| `mech-thermodynamics-1` | 2 | — | 0 |
| `mech-thermodynamics-2` | 3 | 2 | 0 |
| `mech-thermodynamics-3` | 3 | 2 | 0 |
| `mech-thermodynamics-4` | 3 | 2 | 0 |
| `mech-heat-transfer-1` | 3 | 0 | 2 |
| `mech-heat-transfer-2` | 3 | 1 | 0 |
| `mech-heat-transfer-3` | 3 | 2 | 0 |
| `mech-heat-transfer-4` | 3 | 2 | 1 |
| `mech-fluids-1` | 4 | 0 | 2, 3 |
| `mech-fluids-2` | 4 | 2 | 0, 3 |
| `mech-fluids-3` | 4 | 1 | 2 |
| `mech-fluids-4` | 4 | 0, 2 | 1 |
| `mech-machine-1` | 4 | 2 | 1, 3 |
| `mech-machine-2` | 4 | 0, 3 | 2 |
| `mech-machine-3` | 4 | 2 | 0 |
| `mech-machine-4` | 4 | 1 | 2 |
| `mech-vibration-resonance-1` | 6 | 1, 5 | 0, 4 |
| `mech-vibration-resonance-2` | 6 | 2, 5 | 1 |
| `mech-vibration-resonance-3` | 6 | 4, 5 | 0, 2 |
| `mech-vibration-resonance-4` | 6 | 4, 5 | 1, 3 |
| `mech-vibration-resonance-5` | 6 | 2, 3 | 0, 1 |
| `mech-vibration-resonance-6` | 6 | 3, 4 | 1, 5 |
| `mech-shear-1` | 6 | 2, 5 | 1, 4 |
| `mech-shear-2` | 6 | 2, 4 | 1, 5 |
| `mech-mohr-1` | 5 | 3 | 0, 4 |
| `mech-fluids-re-1` | 6 | 3, 5 | 2 |

## Content and layout notes

- Figure cards use shorter pieces to leave room for the existing artwork. The critical-speed and two-plane arithmetic appears on other cards in those same lessons so the diagrams have room.
- The beam examples use unrounded second moments in the calculations. The 20 × 40 mm rectangle has an exact modeled tip deflection of 0.1953125 mm under the stated conditions. The equal-area tube has 2.125 times the second moment of the solid rod.
- The thermal cards keep the figures’ equations and state the model conditions in the reveal pieces. The existing transient-temperature caption displays its exponential as plain text.
- The ring-down card uses generic symbols for two selected peaks. The existing diagram labels the second selected peak x₂ and the caption calls it x₆ when counting all six peaks.
- The existing continuity figure clips part of its rightmost velocity label at 375 px. The reveal pieces carry the area and velocity comparison.

## Questions for the review pass

- `mech1#2` depends on the recess geometry. Specify a countersink or compare heads using their usual specified recesses. A socket head cap screw can also sit flush in a deep enough counterbore.
- `mech2#0` describes a particular shaft and hole. To establish the fit class, state that the minimum shaft diameter exceeds the maximum hole diameter.
- `mech-thermodynamics-3#3` gives 20 kW. Specify steady flow and negligible elevation change so the work input follows from the enthalpy increase and equal speeds.
- `mech-fluids-1#3` compares pressures at equal depth. Give the fluids equal surface pressure or ask for gauge pressure relative to each surface.
- `mech-fluids-3#2` asks where static pressure is lowest in a Venturi. Specify equal elevation and negligible losses.
- `mech-fluids-4#2` uses a 32-fold drop. Specify equal pipe lengths and approximately equal Darcy friction factors.
- `mech-fluids-4#4` compares unspecified oil with water. Give both kinematic viscosities or state that the oil has the higher value.
- `mech-machine-2#2` needs solid circular shafts or geometrically similar round shafts for the one-eighth scaling.
- `mech-machine-2#3` infers shaft diameter from torque. Specify solid circular shafts sized only for elastic torsional stress with the same allowable, or ask which shaft carries more torque.
- `mech-machine-4#3` has a defensible distractor about relative stiffness. Replace it with “It increases the bolt's own stiffness.”
- `mech-machine-4#4` uses “moves the bolt by” for a force change. Use “changes the bolt force by.”
- `mech-shear-2#1` should distinguish the first area moment, which peaks at the neutral axis for a rectangle, from the raw area above the cut.
- `mech-vibration-resonance-2#2` can name the two amplitudes as the first and last selected peaks to match the figure and the new card.
- `mech-mohr-1#3` should ask for the largest in-plane shear magnitude and use `|τ| = R`. The two points have opposite signed shear values.

## Checks

- `python3 tools/check.py cards course mech --extra codex/cards/mech.js` reported **138 reveal cards in 31 lessons checked, 0 with issues**.
- `python3 tools/check.py course mech --extra codex/cards/mech.js` reported **31 lessons run, 0 with issues**.
- The runtime coverage check found 31 Mechanical lessons with entries for every card index. The staged file contains 135 unique calls, all for previously plain cards.
- Visually reviewed 138 finished cards and 44 answered Guesses at 375 × 812 with mock Firebase and headless Chromium. Recaptured and reviewed the changed states after the layout and notation edits.

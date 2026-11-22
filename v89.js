/* ===== v89 (2026-11-22): definitions app-wide, per course, with an everyday link =====
   Seth, after two rated rounds of sample definitions: plain words, no formulas, say what it is (not what the lesson
   teaches), and an everyday link most of the time, best when it's something you've felt or seen. Test: someone who has
   never heard the word can learn it from the definition alone. Underline any word a smart non-engineer wouldn't know.
   How: replaces v67's lesson whitelist (WL67) and single list (GL67). Definitions now live per course in GL89[sub],
   plus GL89._ for words that mean the same thing in every course. A course's own entry wins over the shared one.
   Later builds add courses with gl89("sub",[...]). Row: [pattern, definition, link or "", {only:[lessonIds], cs:1}].
   v67's marking rules are kept: cards, prompts and explanations only; never answer choices; a prompt skips words in its
   own choices; at most 4 per block. The popup gains a quieter second line for the link.
   Display only: nothing is saved, no progress or Firestore paths are touched. */
try{FB.ver="b89"}catch(e){}
try{NEWS.unshift({d:"2026-11-22",t:["Definitions now work outside Mechanical units 1–3: tap an underlined word to see what it means, often with an everyday example. All of Mechanical is done; other courses follow."]})}catch(e){}

const ALL89=[],IDX89={};
function gl89(sub,rows){(IDX89[sub]=IDX89[sub]||[]);rows.forEach(([p,d,l,o])=>{o=o||{};
 ALL89.push({re:new RegExp("(^|[^\\p{L}\\p{N}_-])("+p+")(?![\\p{L}\\p{N}_-])",o.cs?"u":"iu"),d,l:l||"",only:o.only&&new Set(o.only)});
 IDX89[sub].push(ALL89.length-1)})}

/* ---- Shared: same meaning in every course ---- */
gl89("_",[
 ["torques?","A twisting force: how hard something is being turned, in N·m.","Why a longer wrench frees a stuck bolt with the same push."],
 ["stress(?:es)?","How concentrated a load is inside a material: the force spread over the area carrying it, in MPa.","Why a stiletto heel dents a wood floor and a sneaker doesn’t."],
 ["strains?","How much something stretches compared with its original length.",""],
 ["Young(?:’|')s modulus","A material’s stiffness: how hard it resists being stretched. Steel is about three times stiffer than aluminium.","A steel ruler versus a plastic one of the same size."],
 ["cross[- ]sections?","The shape you’d see if you sliced straight across a part.","The end of a sawn-off log, or a carrot cut in half."],
 ["fatigue","Failure from many repeated loads, each well below what would break the part in one go.","Bending a paperclip back and forth until it snaps."],
 ["stress concentrations?","A spot where stress piles up, at a sharp corner, notch or hole.","Why snack bags have a little notch: the tear starts right there."],
 ["resonance|resonant","When something is pushed at its own natural rhythm, so small pushes build into big motion.","Pushing someone on a swing at just the right moment each time."],
 ["damping|damped","Anything that soaks up motion so vibrations die out.","A car’s shock absorbers: hit a bump and it settles after one bounce."],
 ["natural frequenc(?:y|ies)","The rate something shakes at on its own when you hit it and let go.","A guitar string rings at the same note however you pluck it."],
 ["amplitudes?","How big a swing or wave is: how far it goes from the middle.","How high a swing goes, not how often."],
 ["viscosity|viscous","How thick a fluid is: how much it resists flowing.","Honey versus water."],
 ["laminar","Smooth flow in neat layers that slide past each other without mixing.","A tap opened just a little: the stream looks like clear glass."],
 ["turbulent|turbulence","Churning flow full of swirls that mix it up.","A tap opened all the way, splashing and white."],
 ["inertia","An object’s tendency to keep doing what it’s doing: stay still, or keep moving.","Lurching forward when a bus brakes hard."],
 ["kinetic energy","Energy something has because it’s moving.","Why a fast ball stings more to catch than a slow one."],
 ["centroids?","The center of a shape’s area: where it would balance on a pin if you cut it out of card.",""],
 ["neutral axis","The line through a bent beam that is neither stretched nor squeezed.","Bend a pool noodle: the outside stretches, the inside bunches up, and the middle stays the same length."],
 ["second moments?(?: of area)?","A number for how far a cross-section’s area sits from the bending axis. The farther out the material, the less the beam bends.","Why a plank is far harder to bend on edge than lying flat."],
 ["polar moment(?: of (?:inertia|area))?","The twisting version of the second moment: how well a round cross-section resists twisting.","A thick broom handle is much harder to twist than a thin dowel."],
 ["shear stress(?:es)?","Stress from forces that try to slide one layer of material past the next.","Pushing the top of a deck of cards sideways so the cards slide over each other."],
 ["cantilevers?","A beam fixed at one end and free at the other.","A diving board, or a shelf bracket sticking out of a wall."],
 ["I-beams?","A beam shaped like a capital I: two wide plates joined by a thin upright one.","The steel beams in building frames and bridges."],
 ["distributed loads?","A load spread along a length instead of pushing at one point.","Snow lying all along a roof beam, versus one person standing on it."],
 ["buckl(?:ing|es|ed)","When a long, thin part being squeezed suddenly bows out sideways.","Press down on the ends of a plastic ruler until it snaps into a curve."],
 ["tension","Being pulled and stretched.","A rope in tug of war."],
 ["sinusoidal(?:ly)?","Rising and falling smoothly and evenly, the shape of a sine wave.","The back-and-forth of a swinging pendulum."],
 ["transients?","A short-lived response, like a start-up or a sudden bump, before things settle.",""],
 ["steady[- ]state","After start-up effects have died away, when the motion or values repeat the same way.",""],
 ["rpm","Revolutions (turns) per minute.","What a car’s rev counter shows.",{cs:1}],
 ["MPa","Megapascal: a million pascals, the same as one newton on each square millimetre. A unit of stress and pressure.","",{cs:1}],
 ["kPa","Kilopascal: a thousand pascals. Air pressure at sea level is about 101 kPa.","",{cs:1}]
]);

/* ---- Mechanical ---- */
const H89=["mech-heat-transfer-2","mech-heat-transfer-4"],T89=["mech-thermodynamics-1","mech-thermodynamics-2","mech-thermodynamics-3","mech-thermodynamics-4"];
gl89("mech",[
 /* mechanical meanings (other courses use these words differently) */
 ["stiffness","How hard something is to bend or stretch. A stiffer part moves less under the same load.","Push down on a diving board, then on a kitchen counter: same push, very different give."],
 ["deflections?","How far something moves or sags under load.","How far a bookshelf sags in the middle when it’s full."],
 /* fasteners, fits, gears */
 ["shanks?","The long body of a bolt below its head.",""],
 ["carriage bolts?","A bolt with a smooth domed head and a square neck that stops it turning.","The round-headed bolts on wooden playground sets and fences."],
 ["lag screws?","A heavy wood screw with a hex head and a pointed tip.",""],
 ["socket head cap screws?","A screw with a tall round head and a hex socket for an Allen key.","The screws in bike parts and flat-pack furniture."],
 ["Allen keys?","An L-shaped hex wrench.","The little tool that comes with flat-pack furniture."],
 ["counterbored?|counterbores","A stepped, flat-bottomed hole that lets a screw head sit below the surface.",""],
 ["countersinks?|countersunk","A cone-shaped hole that lets a flat screw head sit flush with the surface.","The screws on a door hinge, flush with the metal."],
 ["button heads?","A screw with a low, rounded head.",""],
 ["nyloc(?: nuts?)?","A nut with a nylon ring inside that grips the thread so it won’t shake loose.","The nuts with a blue or white ring inside, on bikes and lawnmowers."],
 ["jam nuts?","A thin second nut tightened against the first so neither can turn.",""],
 ["flange nuts?","A nut with a built-in washer around its base.",""],
 ["keyways?","The slot in a shaft and in the part on it that a key sits in.",""],
 ["key","A small metal bar that sits in slots in both a shaft and the part on it, so the two turn together.","",{only:["mech1"]}],
 ["hubs?","The center of a gear, wheel or pulley, where it fits on the shaft.","The middle of a bike wheel."],
 ["shoulders?","A step where a shaft changes diameter.","",{only:["mech1","mech3"]}],
 ["fit","How tightly a shaft sits in its hole.","",{only:["mech2"]}],
 ["interference(?: fits?)?","The shaft is slightly bigger than the hole, so it has to be pressed in and friction holds it.","A cork pushed into a wine bottle.",{only:["mech2"]}],
 ["clearance(?: fits?)?","The shaft is always smaller than the hole, so it slides in.","A key sliding into a lock.",{only:["mech2"]}],
 ["transition fits?","Could end up slightly loose or slightly tight, depending on where each part lands within its allowed size range.",""],
 ["tolerance","How far a size may be off from its target and still be acceptable.","A recipe that says bake 25–30 minutes: anywhere in that range is fine."],
 ["gear ratios?","How many turns the input gear makes for one turn of the output gear.","Low gear on a bike: you pedal more turns, but the wheel turns slower and pushes harder."],
 ["pinions?","The smaller of two meshing gears.",""],
 /* bolts and joints */
 ["preload(?:ed)?","The tension put into a bolt by tightening it, which clamps the parts together.","A stretched rubber band holding a stack of cards tight."],
 ["clamp(?:ing)? force","How hard a bolt squeezes the parts together.",""],
 ["notch[- ]sensitive","Loses a lot of strength at sharp corners and scratches.",""],
 ["nut factor","One number that lumps together all the friction in a bolt’s threads and under its head.",""],
 ["proof load","The highest load a bolt can take without stretching for good.",""],
 ["joint constant","The share of an outside load that goes into the bolt. The clamped parts take the rest.",""],
 ["(?:clamped )?members","The parts squeezed together by the bolt.","",{only:["mech-machine-4"]}],
 ["separat(?:es|ion)","The outside load pulls hard enough that the clamped parts start to gap apart.","",{only:["mech-machine-4"]}],
 ["gaskets?","A soft layer squeezed between two parts to seal the gap.","The rubber ring inside a jar lid."],
 /* beams */
 ["yield strength|yield(?:ing|s|ed)?","Yielding: bending or stretching for good, once the stress passes the material’s yield strength.","A coat hanger springs back from a small bend, but stays bent if you bend it far."],
 ["linear[- ]elastic|elastic(?:ally)?","Springs fully back when the load comes off, and stretches in step with the load.","A gently stretched rubber band."],
 ["small[- ]deflection","The part moves only a little compared with its size, so its shape barely changes.",""],
 ["slender","Long and thin compared with its depth.",""],
 ["transverse","Crosswise: at right angles to the part’s length.",""],
 ["boundary conditions","How the ends of a part are held: fixed, pinned, on a roller, or free.","A shelf screwed tight into a wall versus one just resting on two brackets."],
 ["pin[- ]and[- ]roller|simply supported","Held by a pin at one end and a roller at the other, so both ends can rotate.","A plank laid across two bricks."],
 ["centroidal axis","An axis through the centroid, the center of the cross-section’s area.",""],
 ["bending stress","Stress from bending: stretching on one face, squeezing on the other, biggest at the outer edge.",""],
 ["moments?","The turning effect of a force: the force times its distance from the pivot.","Why a light kid far out on a seesaw can lift a heavy one near the middle."],
 ["floor joists","The beams that hold up a floor, set on edge.",""],
 ["local buckling","A thin wall of a part wrinkling or crumpling in one spot.","A soda can crumpling when you stand on it."],
 ["allowables?","The highest stress a design is allowed to reach, set below the material’s strength for a safety margin.","",{only:["mech-beams-2"]}],
 ["compression","Being pushed and squeezed.","The legs of a chair you’re sitting on."],
 /* thermodynamics */
 ["closed system","A fixed amount of stuff with a boundary that energy can cross but matter can’t.","A pot with its lid clamped on: heat gets in, steam can’t get out."],
 ["internal energy","Energy stored in the jiggling of a material’s molecules.","A hot cup of coffee holds more of it than a cold one."],
 ["heat","Energy moving from something hotter to something colder.","",{only:["mech-thermodynamics-1"]}],
 ["work","Energy moved by a force pushing something along, like a gas pushing a piston or a motor turning a shaft.","",{only:T89}],
 ["pistons?","A plug that slides in a cylinder, pushed by a gas or pushing on it.","The plunger in a bike pump."],
 ["adiabatic","No heat crosses the boundary. The temperature can still change.","Pumping up a bike tire fast: the pump gets hot even though nothing heated it."],
 ["specific heat","How much energy it takes to warm 1 kg of a material by 1 degree.","Why a pool stays cool on a hot day while the concrete around it burns your feet."],
 ["ideal gas","A simple model of a gas whose molecules don’t pull on each other. Air at everyday conditions fits it well.",""],
 ["boundary work","Work done when a gas pushes its boundary outward, like a piston moving.",""],
 ["shaft work","Work done by a spinning shaft.","A blender’s blades stirring a smoothie and warming it."],
 ["rigid tank","A container whose volume can’t change.",""],
 ["control volume","A region of space you watch while fluid flows in and out of it.","Watching one stretch of river from a bridge."],
 ["(?:specific )?enthalpy","The energy a flowing fluid carries: its internal energy plus the energy it took to push it along.",""],
 ["flow work","The energy it takes to push fluid into or out of a region against its pressure.",""],
 ["nozzles?","A narrowing that speeds a flow up.","The nozzle on a garden hose."],
 ["turbines?","A machine that takes energy out of a flowing fluid by letting it spin blades.","A pinwheel spinning in the wind."],
 ["compressors?","A machine that squeezes a gas to a higher pressure.","The air pump at a gas station that fills tires."],
 ["mass flow(?: rate)?","How many kilograms of fluid pass a point each second.",""],
 ["steady(?= flow| adiabatic)","Nothing at any given spot changes over time, even though fluid keeps moving through.","A river that looks the same from one minute to the next."],
 ["heat engines?","A machine that turns heat into work by running in a cycle.","A car engine."],
 ["reservoirs?","Something so big its temperature doesn’t change when heat flows in or out.","The ocean, or the outside air.",{only:["mech-thermodynamics-4"]}],
 ["thermal efficiency","The fraction of the heat put in that comes out as work.",""],
 ["absolute temperatures?|kelvin","Temperature measured from absolute zero, in kelvin. Add 273.15 to °C.",""],
 ["reversible","An ideal process that could run backward and leave no trace, wasting nothing. Real ones only get close.",""],
 ["entropy generation","The extra entropy made by real-world losses like friction and mixing. It can be zero in theory, never negative.",""],
 ["entropy","A measure of how spread out energy is. Real processes always increase it overall.","Ice melts in a drink on its own; the drink never refreezes on its own."],
 ["irreversib(?:le|ility)","Losses like friction or mixing that can’t be undone.","Stirring milk into coffee: there’s no un-stirring it."],
 /* heat transfer */
 ["conduction","Heat passing through a material from its hot side to its cold side, without the material moving.","A metal spoon getting hot in a bowl of soup."],
 ["convection","Heat carried off a surface by a moving fluid.","Blowing on hot food to cool it."],
 ["radiation","Heat carried by light, mostly infrared, which can cross empty space.","Feeling a campfire on your face from across the fire."],
 ["thermal conductivity|conductivity","How easily heat flows through a material.","Why a metal bench feels colder than a wooden one at the same temperature."],
 ["slabs?","A flat layer of material, like a wall or a plate.",""],
 ["thermal resistances?","How much a layer holds back heat: the temperature drop for each watt passing through.","A thick winter coat has a high thermal resistance."],
 ["convection coefficient","How well a moving fluid carries heat off a surface. Faster flow raises it.","Why a cold wind feels colder than still air at the same temperature."],
 ["series","One after another, so all the heat passes through each in turn.","Layers of clothing.",{only:H89}],
 ["parallel","Side by side, so the heat splits between the paths.","Several open windows letting heat out at once.",{only:H89}],
 ["lumped","Treating an object as one uniform temperature all the way through.",""],
 ["Biot number|Bi","Compares how fast heat leaves the surface with how fast it moves through the inside. Small means the inside keeps up.","A thin steak cooks evenly; a thick roast stays raw in the middle.",{cs:1}],
 ["time constants?","How long something cooling or warming takes to close about two-thirds of the gap to its surroundings.","A cup of tea cooling on your desk."],
 ["ambient","The surrounding air or environment.",""],
 ["contact resistance|shared contact","Extra resistance to heat flow where two surfaces touch, because they only meet at tiny high spots.","Why computers put thermal paste between the chip and its heat sink."],
 /* fluids */
 ["hydrostatic(?: pressure)?","Pressure in a fluid that is sitting still, from the weight of the fluid above.","Your ears hurting at the bottom of a deep pool."],
 ["gauge pressure","Pressure above the surrounding air. A flat tire reads zero, though air at atmospheric pressure is still inside.",""],
 ["absolute pressure","Pressure measured from a perfect vacuum: gauge pressure plus the atmosphere’s.",""],
 ["density","How heavy a material is for its size: mass per volume.","Why a brick sinks and a log floats."],
 ["volume flow(?: rate)?","How much fluid passes a point each second, by volume.","How fast a hose fills a bucket."],
 ["incompressible","Can’t be squeezed into a smaller volume. Water nearly can’t; air can.","Squeeze a capped bottle full of water, then a capped empty one."],
 ["continuity","What goes in must come out: in a pipe, the same flow passes every section.",""],
 ["streamlines?","The path a tiny bit of fluid follows through a flow.","The path a leaf takes floating down a stream."],
 ["Bernoulli(?:’s|'s)?(?: equation| principle)?","In smooth flow, where a fluid speeds up its pressure drops.","Hold two sheets of paper close together and blow between them: they pull in toward each other.",{cs:1}],
 ["Venturi(?: tubes?)?","A tube that narrows to a throat and widens again. The flow is fastest and the pressure lowest at the throat.","",{cs:1}],
 ["throat","The narrowest part of a pipe or nozzle.","",{only:["mech-fluids-3"]}],
 ["head[- ]loss","Pressure lost to friction as fluid flows through pipes and fittings.","Why a very long garden hose only dribbles at the end."],
 ["(?:Darcy )?friction factor","A number for how much a pipe’s walls drag on the flow.",""],
 ["Reynolds number","One number that says whether a flow will be smooth or churning, from its speed, size and thickness.","Honey pours in a smooth ribbon; water poured the same way splashes.",{cs:1}],
 ["Darcy–Weisbach|Darcy-Weisbach","The standard equation for pressure lost to friction in a pipe.","",{cs:1}],
 ["transitional","Between smooth and churning flow, flipping unpredictably between the two.",""],
 ["eddies|eddy","A small swirl in a flow.","The little whirlpools behind a rock in a stream."],
 ["dynamic viscosity","How thick a fluid is, in Pa·s.",""],
 ["kinematic viscosity","A fluid’s thickness divided by its density, in m²/s.",""],
 ["characteristic length","The size a calculation uses for a shape, like a pipe’s diameter or a wing’s width from front to back.",""],
 ["chords?","The straight distance from a wing’s front edge to its back edge.","",{only:["mech-fluids-re-1"]}],
 /* shafts and bearings */
 ["angular speed","How fast something spins, in radians per second. One turn is about 6.28 radians.",""],
 ["reducers?","A gearbox that slows the output and raises its torque.",""],
 ["rolling bearings?|ball bearings?|roller bearings?","A bearing that carries load on balls or rollers running between two rings.","What lets a skateboard wheel spin freely."],
 ["races","The hardened rings a bearing’s balls or rollers run on.",""],
 ["rolling elements","The balls or rollers inside a bearing.",""],
 ["surface fatigue|pits","Tiny pits that flake out of a surface after millions of rolling contacts.","",{only:["mech-machine-3"]}],
 ["L10(?: life)?","The life that 90% of identical bearings reach or beat. 10% fail sooner.","",{cs:1}],
 ["dynamic load rating","The load a bearing can carry for a million turns with 90% of them surviving. It’s listed in the maker’s catalogue.",""],
 ["equivalent load","One steady load that wears a bearing the same as the real mix of loads on it.",""],
 ["median life","The life that half the bearings beat.",""],
 /* vibration */
 ["modes?","One particular way a structure likes to shake, with its own shape and its own rate.","A jump rope swung as one big loop, or as two loops with a still point in the middle."],
 ["forcing(?: frequency)?","How often a repeating push acts on something, in cycles per second.",""],
 ["once[- ]per[- ](?:rev|revolution)","Happening once every turn, like the wobble from a heavy spot on a wheel.","The thump-thump of a car tire with a bulge."],
 ["excitation","The repeating push or shake that drives a vibration.",""],
 ["ring[- ]downs?","The shaking that dies away after you stop pushing.","A bell fading after you strike it."],
 ["underdamped","Damped lightly enough that it still swings back and forth while dying away.","A screen door that bounces a few times before it settles."],
 ["damping ratio","How much damping something has, on a scale where 0 is none and 1 is just enough to stop it swinging.",""],
 ["logarithmic decrement","A measure of how fast the swings shrink, from the ratio of one peak to the next.",""],
 ["beating","A slow, throbbing rise and fall in strength when two close frequencies mix.","Two guitar strings slightly out of tune going wah-wah-wah."],
 ["clipping","A signal bigger than the sensor or recorder can handle, so its peaks get cut off flat.",""],
 ["noise floor","The level of background noise that hides anything smaller.","A whisper lost under the hum of a fridge."],
 ["isolators?|isolation mounts?","Soft mounts that stop vibration passing between a machine and what it sits on.","The rubber feet under a washing machine."],
 ["transmissibility","How much of a support’s shaking reaches the machine on it. Below 1 means the mount is helping.",""],
 ["frequency ratio","The forcing frequency divided by the natural frequency.",""],
 ["base (?:motion|excitation)","Shaking that comes in through the support, not from the machine itself.","A car body shaken by a bumpy road."],
 ["critical speeds?|(?:first )?critical","A shaft speed where the spinning sets off one of the shaft’s bending modes, so it shakes hard.","A washing machine that shakes hard while spinning up, then calms down at full speed.",{only:["mech-vibration-resonance-4"]}],
 ["critical speeds?","A shaft speed where the spinning sets off one of the shaft’s bending modes, so it shakes hard.","A washing machine that shakes hard while spinning up, then calms down at full speed."],
 ["lateral","Sideways: at right angles to the shaft.",""],
 ["rotors?","The spinning part of a machine.","The blades and hub of a ceiling fan."],
 ["gyroscopic","The effect that makes a spinning object resist being tilted.","A spinning bike wheel held by its axle fights you when you try to tip it."],
 ["unbalance","A heavy spot off the spin axis, so the part wobbles as it turns.","A ceiling fan wobbling because one blade is heavier."],
 ["eccentric","Off-center from the spin axis.",""],
 ["centripetal","Pointing toward the center of the turn. A spinning mass has to be pulled inward to stay on its circle.","Swinging a bucket on a rope: the rope pulls it inward."],
 ["correction planes?","A slice along the rotor where balance weights can be added.",""],
 ["couples?","Two equal heavy spots on opposite sides at different ends of a rotor. No net push, but it rocks end to end.","",{only:["mech-vibration-resonance-5","mech-vibration-resonance-6"]}],
 ["static check|static balanc(?:e|ing)","Balance checked with the rotor sitting still. It finds a heavy spot but can’t see a couple.",""],
 ["two-plane balancing","Adding balance weights at two places along a rotor, to fix both the heavy spot and the end-to-end rocking.",""],
 ["influence coefficients?|influence columns?","How much the vibration at a sensor changes for a given trial weight at a given spot.",""],
 ["trial weights?|trial unbalance|trial mass(?:es)?","A known test weight added to see how the vibration changes.","Clipping a small weight on a fan blade to see if the wobble gets better or worse."],
 ["phase","Where in its cycle something is, given as an angle.","Two swings side by side going at the same speed, one at the top while the other’s at the bottom."],
 ["baseline","The measurement taken before any changes, to compare against.",""],
 ["ill[- ]conditioned|nearly dependent","Two measurements say almost the same thing, so a tiny error in either throws the answer way off.",""],
 ["RMS","Root mean square: a kind of average size for a signal that swings both ways.","",{cs:1}],
 ["flexible[- ]rotor","A rotor that bends noticeably at its running speed.",""],
 ["supercritical|subcritical","Running above (super) or below (sub) a critical speed.",""],
 ["pedestals?","The stand that holds a bearing up.",""],
 ["compliance","Springiness: the opposite of stiffness.",""],
 /* shear and Mohr */
 ["single shear","One plane cuts through the pin, so that one cross-section carries the whole load.",""],
 ["double shear","Two planes cut through the pin, so each carries half the load.",""],
 ["transverse shear","Shear inside a beam from the sideways force, as its layers try to slide past each other.",""],
 ["shear force","The internal force trying to slide one slice of a beam past the next, in N.",""],
 ["bearing stress","The crushing pressure between a pin and the wall of its hole.",""],
 ["bearing","Here: the crushing pressure between a pin and the wall of its hole.","",{only:["mech-shear-1"]}],
 ["lap joint","Two plates overlapped and fastened through the overlap.",""],
 ["clevis(?:es)?","A U-shaped fork with a pin through both arms; the part in between hangs on the pin.","The pin-and-fork hitch that connects a trailer to a truck."],
 ["yokes","Fork-shaped parts that hold a pin at both ends, like a clevis.",""],
 ["pivots","Pins or joints that a part turns about.",""],
 ["first moment(?: of (?:the )?area)?","A measure of how much area sits beyond the level you’re checking and how far out it is. It sets where shear peaks.",""],
 ["parabola","A U-shaped curve.","The path of a thrown ball."],
 ["flanges","The wide top and bottom plates of an I-beam. They carry most of the bending.",""],
 ["web","The thin upright plate joining an I-beam’s flanges.","",{only:["mech-shear-2"]}],
 ["thin-walled","A tube whose wall is thin compared with its diameter.","A soda can."],
 ["normal stress(?:es)?","Stress that stretches or squeezes straight across a surface, rather than sliding along it.",""],
 ["principal stress(?:es)?","The biggest and smallest stretch-or-squeeze at a point, found by turning the little square until there’s no shear on it.",""],
 ["Mohr(?:’|')s circle","A drawing that shows how the stresses at a point change as you turn your view of it.","",{cs:1}],
 ["stress element|element","A tiny imaginary square around a point, drawn to show the stresses on it.","",{only:["mech-mohr-1"]}],
 ["pure shear","Only sliding stress, with no stretching or squeezing on the faces.",""]
]);

/* ---- Engine: replaces v67's scan/mark/show (globals, so v67's listeners call these) ---- */
const SUB89={};
function sub89(lid){if(SUB89[lid]===undefined){const l=(LS||[]).find(z=>z.id==lid);SUB89[lid]=l?l.sub:null}return SUB89[lid]}
function list89(lid){const s=sub89(lid);return[...(IDX89[s]||[]),...IDX89._].filter(i=>!ALL89[i].only||ALL89[i].only.has(lid))}

mark67=function(el,lid,x){
 let o=null;try{const [a,b]=(x&&x.key||"").split("#"),l=LS.find(z=>z.id==a);o=l&&l.qs[+b]}catch(e){}
 const skip=el.matches(".prompt")&&x&&(x.who||x.t=="say"||x.t=="decode"||o&&(o.t=="say"||o.t=="decode"));if(skip)return;
 const ans=el.matches(".prompt")&&x?JSON.stringify(Object.assign({},x,{q:"",why:"",key:""})):"";
 const cand=list89(lid),used=new Set();let n=0;
 const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:t=>t.parentElement.closest(".katex,button,a,code,sup,sub,svg,.who,.df67")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const ts=[];while(tw.nextNode())ts.push(tw.currentNode);
 for(const t of ts){if(n>=4)break;const s=t.nodeValue,hits=[];
  cand.forEach((gi,rank)=>{if(used.has(gi))return;const g=ALL89[gi],m=g.re.exec(s);if(!m)return;
   const w=m[2];if(ans&&new RegExp("(^|[^\\p{L}])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![\\p{L}])","iu").test(ans))return;
   hits.push({a:m.index+m[1].length,b:m.index+m[1].length+w.length,gi,rank})});
  /* earliest first; at the same start the longer phrase, then the course's own entry */
  hits.sort((p,q)=>p.a-q.a||(q.b-q.a)-(p.b-p.a)||p.rank-q.rank);
  const keep=[];for(const h of hits){if(n>=4)break;if(keep.some(k=>h.a<k.b&&h.b>k.a)||used.has(h.gi))continue;
   if([...used].some(u=>ALL89[u].d==ALL89[h.gi].d))continue;keep.push(h);used.add(h.gi);n++}
  if(!keep.length)continue;
  const f=document.createDocumentFragment();let p=0;
  for(const h of keep.sort((p,q)=>p.a-q.a)){f.append(s.slice(p,h.a));const sp=document.createElement("span");
   sp.className="df67";sp.textContent=s.slice(h.a,h.b);sp.dataset.g89=h.gi;sp.setAttribute("role","button");sp.tabIndex=0;
   sp.setAttribute("aria-label",sp.textContent+": show definition");f.append(sp);p=h.b}
  f.append(s.slice(p));t.replaceWith(f)}};

scan67=function(){const lid=lid67();if(!lid||!list89(lid).length)return;const x=SS.qs&&SS.qs[SS.i];
 document.querySelectorAll(".lesson .idea:not([data-g67]),.prompt:not([data-g67]),.why:not([data-g67])").forEach(el=>{
  el.setAttribute("data-g67","1");if(el.matches(".idea")&&SS.qs)return;try{mark67(el,lid,el.matches(".idea")?null:x)}catch(e){}})};

show67=function(sp){const g=ALL89[+sp.dataset.g89];if(!g)return;const was=sp.classList.contains("on67");hide67();if(was)return;
 sp.classList.add("on67");const d=document.createElement("div");d.className="pop67";d.setAttribute("role","tooltip");
 d.innerHTML=`<b>${esc(sp.textContent)}</b><span>${esc(g.d)}</span>${g.l?`<i class="l89">${esc(g.l)}</i>`:""}`;document.body.appendChild(d);pop67=d;
 const r=sp.getBoundingClientRect(),W=Math.min(300,innerWidth-32);d.style.width=W+"px";
 const left=Math.max(16,Math.min(innerWidth-16-W,r.left+r.width/2-W/2));
 const below=r.bottom+8+d.offsetHeight<innerHeight-12;d.style.left=left+"px";d.style.top=(below?r.bottom+8:Math.max(8,r.top-8-d.offsetHeight))+"px"};

document.head.insertAdjacentHTML("beforeend",`<style>
.pop67 span{display:block}
.pop67 .l89{display:block;font-style:normal;margin-top:6px;padding-top:6px;border-top:1px solid var(--line);color:var(--mu);font-size:13px}
</style>`);

try{TF48.unshift(
 {b:"b89",k:"defs89a",t:"Definitions across Mechanical",c:"Thermodynamics: words like adiabatic and enthalpy are underlined. Tap adiabatic: the card has the definition and, under a thin line, the bike-pump example.",go:["les","mech-thermodynamics-1"]},
 {b:"b89",k:"defs89b",t:"Shared definitions in other courses",c:"A non-Mechanical lesson that says torque, stress or resonance underlines them too (e.g. Controls or Aerospace). Words like yield or density stay plain outside Mechanical.",go:["les","mech-vibration-resonance-4"]},
 {b:"b89",k:"defs89c",t:"Definitions still don't give answers away",c:"This question's choices name the shear types: \"double shear\" must not be underlined in the prompt.",go:["q","mech-shear-1",2]}
)}catch(e){}

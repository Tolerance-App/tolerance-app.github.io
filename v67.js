/* ===== v67 (2026-11-19): tap-to-define words, trial in Mechanical units 1–3 =====
   Seth: "adding definitions to hard words in the middle of lessons ... only for Units 1,2,3 of Mechanical ...
   any words with a definition have a line underneath them. Nothing obnoxious."
   Scope: the 11 lessons in Machine elements, Structures and Shear (WL67). Nothing else changes.
   How: a MutationObserver marks words in lesson cards (.idea), question prompts (.prompt) and explanations
   (.why) while a lesson, review or practice question from those lessons is on screen. Only text nodes are
   touched, so fmt() markup, KaTeX and buttons are left alone. Answer choices are never marked, and a prompt
   doesn't mark a word that appears in its own answer choices (or any word in say/decode questions), so a
   definition never gives an answer away. Each word is marked once per block, at most 4 per block.
   Tap a marked word: a small card under it gives the definition. Tap anywhere or scroll to close.
   Display only: nothing is saved, no progress or Firestore paths are touched. */
try{FB.ver="b67"}catch(e){}
try{NEWS.unshift({d:"2026-11-19",t:["Trying out definitions in Mechanical units 1–3: tap an underlined word in a lesson to see what it means."]})}catch(e){}

const WL67=new Set(["mech1","mech2","mech-machine-1","mech3","mech-machine-2","mech-machine-3","mech-machine-4","mech4","mech-beams-2","mech-shear-1","mech-shear-2"]);
/* [pattern (regex source, case-insensitive, whole words), definition, optional lesson ids it's limited to].
   Longer phrases come first so "bearing stress" wins over "bearing". */
const GL67=[
 ["second moments?(?: of area)?","How far a cross-section’s area sits from the bending axis, written I (mm⁴). Bigger I means the beam bends less."],
 ["first moment(?: of (?:the )?area)?","Q in τ = VQ/(Ib): the area beyond the level you’re checking, times how far its centre sits from the neutral axis."],
 ["polar moment","J: how well a round section resists twisting. For a solid shaft J = πd⁴/32."],
 ["dynamic load rating","C: the load a bearing can carry for an L10 life of one million revolutions. Found in the maker’s catalogue."],
 ["equivalent load","P: one steady load that wears a bearing the same as the real mix of loads on it."],
 ["L10(?: life)?","The life that 90% of identical bearings reach or pass. 10% fail sooner."],
 ["rolling bearings?","A bearing that carries load on balls or rollers running between two hardened rings."],
 ["races","The hardened rings that a bearing’s balls or rollers run on."],
 ["bearing stress","Contact pressure between a pin and the wall of its hole, about F/(d·t). Thin plates can crush here first."],
 ["bearing","Here: the crushing contact pressure between a pin and the wall of its hole, about F/(d·t).",["mech-shear-1"]],
 ["single shear","One plane cuts through the pin, so that one cross-section carries the whole load."],
 ["double shear","Two planes cut through the pin, so each carries half the load and the stress halves."],
 ["transverse shear","Shear stress inside a beam from the sideways (shear) force, as layers try to slide past each other."],
 ["shear stress","Stress from forces that try to slide one layer of material over the next, written τ (MPa)."],
 ["shear force","V: the internal force that tries to slide one slice of a beam past the next, in N."],
 ["neutral axis","The line through a bent beam that is neither stretched nor squeezed. It passes through the centroid."],
 ["free surfaces?","An outside face with nothing pushing on it, so the shear stress there is zero."],
 ["I-beams?","A beam shaped like the letter I: two wide flanges joined by a thin web."],
 ["webs?","The thin vertical plate in the middle of an I-beam. It carries most of the shear.",["mech-shear-2"]],
 ["flanges","The wide top and bottom plates of an I-beam. They carry most of the bending."],
 ["thin-walled","A tube whose wall is much thinner than its diameter."],
 ["parabola","A U-shaped curve, like y = x²."],
 ["lap joint","Two plates overlapped and fastened through the overlap."],
 ["clevis(?:es)?","A U-shaped fork with a pin through both arms. The part between them hangs on the pin."],
 ["yokes","Fork-shaped parts that hold a pin at both ends, like a clevis."],
 ["pivots","Pins or joints that a part turns about."],
 ["cantilevers?","A beam fixed at one end and free at the other, like a diving board or a shelf bracket."],
 ["tip deflections?|deflections?","How far the beam moves sideways under load, δ (mm)."],
 ["Young(?:’|')s modulus","E: a material’s stiffness, stress per unit stretch while it still springs back. Steel ≈ 200 GPa, aluminium ≈ 70 GPa."],
 ["cross-sections?","The shape you’d see if you cut straight across the beam or pin."],
 ["centroidal axis","An axis through the centroid, the centre of the cross-section’s area."],
 ["linear-elastic","The material springs fully back when unloaded, and stress is proportional to stretch."],
 ["small[- ]deflection","The beam moves only a little compared with its length, so its shape barely changes. The simple formulas assume this."],
 ["slender","Long compared with its depth."],
 ["transverse","At right angles to the beam’s length."],
 ["boundary conditions","How the ends are held: fixed, pinned, on a roller, or free."],
 ["distributed load","A load spread along a length (N/m) instead of acting at one point."],
 ["pin-and-roller","A beam held by a pin at one end and a roller at the other (simply supported), so it can rotate at both ends."],
 ["bending stress","Stress from bending: tension on one face, compression on the other, largest at the outer edge."],
 ["yield strength|yield(?:ing)?","Yielding: the material bends or stretches permanently once stress passes its yield strength."],
 ["allowables?","The highest stress a design rule permits for a material, with a safety margin built in."],
 ["local buckling","A thin wall wrinkling or folding inward under compression."],
 ["buckling","Sudden sideways collapse of a thin part when it is squeezed."],
 ["joists","Horizontal beams that hold up a floor."],
 ["concentric","Sharing the same centre."],
 ["fasteners?","A part that holds others together: a bolt, screw, rivet or pin."],
 ["keyway","A slot cut in the shaft and in the hub that the key sits in."],
 ["keys?","A small metal block that sits in slots in both the shaft and the hub so they turn together.",["mech1"]],
 ["hubs?","The centre part of a gear, pulley or wheel that fits onto a shaft."],
 ["shanks?","The long body of a bolt, between the head and the tip."],
 ["carriage bolts?","A bolt with a smooth domed head and a square neck that stops it turning in wood."],
 ["lag screws?","A heavy wood screw with a hex head and a pointed, tapered tip."],
 ["shoulders?","A step up in a shaft’s diameter that a part can sit against, to locate it along the shaft."],
 ["thrust","A load pushing along the shaft’s axis."],
 ["interference(?: fit)?","The shaft is bigger than the hole, so it must be pressed or heated in. It grips without fasteners."],
 ["clearance(?: fit)?","The shaft is smaller than the hole, so it slides in with a small gap."],
 ["transition fits?","Within its tolerances the fit can come out as a small gap or a slight press."],
 ["tolerance","How far a size may vary from its stated value and still be acceptable."],
 ["pinion","The smaller of two gears that mesh."],
 ["rpm","Revolutions per minute. ω (rad/s) = 2π × rpm / 60."],
 ["torque","A twisting load: force times its distance from the axis, in N·m."],
 ["preload(?:ed)?","The tension put into a bolt by tightening it. It clamps the parts together."],
 ["nut factor","K in T = KFd: lumps thread and head friction into one number, about 0.2 dry and 0.15 or less lubricated."],
 ["nominal diameter","The size a bolt is called by: 10 mm for an M10."],
 ["proof load","The highest tension a bolt can carry without stretching permanently."],
 ["fatigue","Cracking from many repeated load cycles, at stresses well below what would break the part in one pull."],
 ["stress concentrations?|concentrates","A spot where stress rises locally, at a sharp corner, notch or hole."],
 ["notch-sensitive","Losing a lot of fatigue strength at notches and sharp corners."],
 ["notch(?:es)?","A sharp groove or cut. Stress piles up at its root."],
 ["stepped shaft","A shaft whose diameter changes in steps along its length."],
 ["reducer|gearbox(?:es)?","A set of gears that lowers speed and raises torque by the same ratio."],
 ["joint constant","C = kb/(kb + km): the share of an outside load that the bolt carries."],
 ["clamped (?:parts|members|plates)|members","The parts squeezed together by the bolt.",["mech-machine-4","mech3"]],
 ["stiffness|stiff","How much force it takes to stretch or bend something by one unit (kN/mm). Stiffer means it moves less."],
 ["gasket","A soft layer between two parts that seals the joint."],
 ["separates","The parts start to lift apart because the outside load has used up all the clamp force.",["mech-machine-4"]],
 ["median","The middle value: half last longer, half shorter."]
].map(([p,d,only])=>({re:new RegExp("(^|[^\\p{L}\\p{N}_-])("+p+")(?![\\p{L}\\p{N}_-])","iu"),d,only:only&&new Set(only)}));

function lid67(){try{if(!SS||view!="lesson")return null;const x=SS.qs&&SS.qs[SS.i];return x&&x.key?x.key.split("#")[0]:SS.l&&SS.l.id}catch(e){return null}}

function mark67(el,lid,x){
 /* Sessions turn say/decode into mc, so read the type from the lesson itself */
 let o=null;try{const [a,b]=(x&&x.key||"").split("#"),l=LS.find(z=>z.id==a);o=l&&l.qs[+b]}catch(e){}
 const skip=el.matches(".prompt")&&x&&(x.who||x.t=="say"||x.t=="decode"||o&&(o.t=="say"||o.t=="decode"));if(skip)return;
 const ans=el.matches(".prompt")&&x?JSON.stringify(Object.assign({},x,{q:"",why:"",key:""})):"";
 const used=new Set();let n=0;
 const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:t=>t.parentElement.closest(".katex,button,a,code,sup,sub,svg,.who,.df67")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const ts=[];while(tw.nextNode())ts.push(tw.currentNode);
 for(const t of ts){if(n>=4)break;let s=t.nodeValue,hits=[];
  GL67.forEach((g,gi)=>{if(used.has(gi)||g.only&&!g.only.has(lid))return;const m=g.re.exec(s);if(!m)return;
   const w=m[2];if(ans&&new RegExp("(^|[^\\p{L}])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![\\p{L}])","iu").test(ans))return;
   hits.push({a:m.index+m[1].length,b:m.index+m[1].length+w.length,gi})});
  hits.sort((p,q)=>p.a-q.a||(q.b-q.a)-(p.b-p.a));
  const keep=[];for(const h of hits){if(n>=4)break;if(keep.some(k=>h.a<k.b&&h.b>k.a)||used.has(h.gi))continue;
   if(keep.some(k=>GL67[k.gi].d==GL67[h.gi].d))continue;keep.push(h);used.add(h.gi);n++}
  if(!keep.length)continue;
  const f=document.createDocumentFragment();let p=0;
  for(const h of keep.sort((p,q)=>p.a-q.a)){f.append(s.slice(p,h.a));const sp=document.createElement("span");
   sp.className="df67";sp.textContent=s.slice(h.a,h.b);sp.dataset.g=h.gi;sp.setAttribute("role","button");sp.tabIndex=0;
   sp.setAttribute("aria-label",sp.textContent+": show definition");f.append(sp);p=h.b}
  f.append(s.slice(p));t.replaceWith(f)}}

function scan67(){const lid=lid67();if(!lid||!WL67.has(lid))return;const x=SS.qs&&SS.qs[SS.i];
 document.querySelectorAll(".lesson .idea:not([data-g67]),.prompt:not([data-g67]),.why:not([data-g67])").forEach(el=>{
  el.setAttribute("data-g67","1");if(el.matches(".idea")&&SS.qs)return;try{mark67(el,lid,el.matches(".idea")?null:x)}catch(e){}})}

let pop67=null;
function hide67(){if(pop67){pop67.remove();pop67=null}document.querySelectorAll(".df67.on67").forEach(e=>e.classList.remove("on67"))}
function show67(sp){const g=GL67[+sp.dataset.g];if(!g)return;const was=sp.classList.contains("on67");hide67();if(was)return;
 sp.classList.add("on67");const d=document.createElement("div");d.className="pop67";d.setAttribute("role","tooltip");
 d.innerHTML=`<b>${esc(sp.textContent)}</b><span>${esc(g.d)}</span>`;document.body.appendChild(d);pop67=d;
 const r=sp.getBoundingClientRect(),W=Math.min(300,innerWidth-32),h=d.offsetHeight;d.style.width=W+"px";
 const left=Math.max(16,Math.min(innerWidth-16-W,r.left+r.width/2-W/2));
 const below=r.bottom+8+d.offsetHeight<innerHeight-12;d.style.left=left+"px";d.style.top=(below?r.bottom+8:Math.max(8,r.top-8-d.offsetHeight))+"px"}

document.addEventListener("click",e=>{const sp=e.target.closest&&e.target.closest(".df67");
 if(sp){e.preventDefault();e.stopPropagation();show67(sp);return}if(pop67)hide67()},true);
document.addEventListener("keydown",e=>{const sp=e.target.closest&&e.target.closest(".df67");if(sp&&(e.key=="Enter"||e.key==" ")){e.preventDefault();show67(sp)}else if(e.key=="Escape")hide67()});
addEventListener("scroll",hide67,true);addEventListener("resize",hide67);
let q67=0;new MutationObserver(()=>{if(pop67&&!document.body.contains(document.querySelector(".df67.on67")))hide67();
 if(!q67)q67=setTimeout(()=>{q67=0;scan67()},0)}).observe(document.body,{childList:true,subtree:true});

document.head.insertAdjacentHTML("beforeend",`<style>
.df67{--c67:color-mix(in srgb,var(--blue,#3B8BFF) 55%,var(--tx));--u67:color-mix(in srgb,var(--c67) 65%,transparent);color:var(--c67);background:linear-gradient(var(--u67),var(--u67)) 50% 100%/calc(100% - 4px) 2px no-repeat;padding-bottom:1px;-webkit-box-decoration-break:clone;box-decoration-break:clone;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:3px}
.df67.on67{--u67:var(--blue,#3B8BFF);background-color:color-mix(in srgb,var(--blue,#3B8BFF) 14%,transparent)}
/* Seth: the Correct / Not quite panel had square top corners. .foot never had a radius in any layer; match
   the bottom sheets (22px since v-line 740) on the answered states only, not the plain Check bar. */
.foot.ok,.foot.bad,.foot.neutral{border-radius:22px 22px 0 0}
.pop67{position:fixed;z-index:9999;box-sizing:border-box;padding:10px 12px;border-radius:12px;background:var(--s2);border:1px solid var(--line);color:var(--tx);box-shadow:0 8px 24px rgba(0,0,0,.28);font-size:14px;line-height:1.4}
.pop67 b{display:block;font-size:12px;font-weight:700;color:var(--blue,#3B8BFF);margin-bottom:2px}
</style>`);

try{TF48.unshift(
 {b:"b67",k:"foot67",t:"Rounded answer panel",c:"Answer a question right and wrong: the green Correct and red Not quite panels have rounded top corners. The plain Check bar stays square.",go:["q","mech-shear-2",1]},
 {b:"b67",k:"defs67",t:"Tap-to-define words (Mechanical units 1–3)",c:"Cards, questions and explanations: hard words have a faint underline. Tap one: a small card says what it means; tap anywhere to close. Answer choices are never underlined.",go:["les","mech-machine-4"]},
 {b:"b67",k:"defs67q",t:"Definitions don't give answers away",c:"This question's choices name the shear types: \"double shear\" must not be underlined in the prompt.",go:["q","mech-shear-1",2]}
)}catch(e){}

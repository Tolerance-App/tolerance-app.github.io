/* ===== v48 (2026-11-17): "Test recent fixes" for Seth =====
   A Settings row, shown only on Seth's devices, that opens a checklist of lesson, model and question fixes
   from tester flags. Each item jumps straight to the lesson, the exact question (by question key, so
   shuffling doesn't matter) or the Lab model, and has a tick that is remembered on that device.
   - Who sees it: the admin IDs from isAdmin() in firestore.rules (FB.uid), or any device that has opened
     the site once with #fixes in the address (remembered in localStorage "tol_tf48on"). This is a
     shortcut only: it opens content anyone can already reach and reads no one's data.
   - Test sessions opened from here don't write lesson stats (SS.logged34 is set), so ev/ stays clean.
     Finishing one still counts as a normal finish for that device's progress.
   - To keep fixes from getting lost: every later build that fixes a lesson, question or model adds an
     entry to TF48 (newest first). */
try{FB.ver="b48"}catch(e){}

const ADM48=["WHBKG7KuQRSLpzV30OufPId1VRb2","2XLhCOa10YY7DrCgB9CyG3a6Awn2","P2jBBhX9biR9oE6z9bZtLtGGnUf2","u0izSBG81pVQ2pqO1EGF8RDzB3m2"];
try{if(/(^|[#&])fixes\b/.test(location.hash)){localStorage.setItem("tol_tf48on","1");history.replaceState(null,"",location.pathname+location.search)}}catch(e){}
const tfOn48=()=>{try{return ADM48.includes(FB.uid)||localStorage.getItem("tol_tf48on")=="1"}catch(e){return false}};

/* go: ["les", lessonId] | ["q", lessonId, questionIndex, openCalc] | ["lab", lessonId or model id] | ["intro"] */
const TF48=[
 {b:"b47",k:"re-lesson",t:"Reynolds number lesson (new)",c:"5 cards, model, 7 questions. The calculator offers Re = ρVD/μ on the number questions.",go:["les","mech-fluids-re-1"]},
 {b:"b47",k:"re-model",t:"Reynolds model",c:"Defaults: Re 12,500, laminar limit 0.092 m/s, status above 2300.",go:["lab","mech-fluids-re-1"]},
 {b:"b47",k:"bolt",t:"Bolted joint picture model",c:"Plates, bolt, bars and graph. Push P past 25 kN (defaults): plates open, bolt takes all of P.",go:["lab","mech-machine-4"]},
 {b:"b47",k:"chip",t:"Chip thinning cards rewritten",c:"6 cards: terms first, then thinning, the formula, why it matters, stickout.",go:["les","cam-feeds-4"]},
 {b:"b47",k:"auglag",t:"Penalty / augmented Lagrangian model",c:"Red infeasible side, λ̄ dimmed in penalty mode, scale stays readable at μ = 50, \"λ̄ after 3 updates\".",go:["lab","cmAugLag"]},
 {b:"b47",k:"shapes",t:"Gradient descent on four landscapes (new)",c:"Bowl, valley (zigzags; blows up at α ≥ 0.1), banana, two basins.",go:["lab","cmShapes"]},
 {b:"b47",k:"realsize",t:"Intro bending lab: real size",c:"Tap through to the bar, then \"See it at real size\". Hold a ruler to the screen.",go:["intro"]},
 {b:"b46",k:"autocalc",t:"Calculator opens the question's equation",c:"Open the calculator: the hours equation is ready in the solver. Close it, reopen: stays closed.",go:["q","mech-machine-3",1,1]},
 {b:"b45",k:"eq-numm",t:"Numerical methods equations",c:"Armijo question: solver opens with the directional slope; Armijo threshold is listed too.",go:["q","numm-opt-1",1,1]},
 {b:"b45",k:"eq-ctrl",t:"Controls equations",c:"Settling-time question: 2% settling, damping ratio and natural frequency.",go:["q","ctrl-exam-2",2,1]},
 {b:"b45",k:"order-alt",t:"Backtracking order: either branch first",c:"Put \"when accepted\" before \"if rejected\": it should be marked right.",go:["q","numm-opt-1",4]},
 {b:"b45",k:"resonance",t:"Natural frequency answers reworded",c:"Shorter, varied choices on the 30 Hz bracket question.",go:["q","mech-vibration-resonance-1",0]},
 {b:"b44",k:"bearing",t:"Bearing life card 1 and hours question",c:"Card 1 reads smoothly; question 2 gives C, P and L10 itself.",go:["les","mech-machine-3"]},
 {b:"b44",k:"kkt",t:"KKT model labels",c:"∇f/4 above the arrow, ∇g/4 below.",go:["lab","cmKKT"]},
 {b:"b44",k:"adam",t:"Adam's first step in paths mode",c:"Orange \"Adam step 1\" arrow from the shared start (1, 2).",go:["lab","cmPaths"]}];

const tfDone48=()=>{try{return JSON.parse(localStorage.getItem("tol_tf48")||"{}")||{}}catch(e){return{}}};
function tfTick48(k,el){try{const d=tfDone48();if(d[k])delete d[k];else d[k]=Date.now();localStorage.setItem("tol_tf48",JSON.stringify(d));
 const ok=!!d[k],row=el&&el.closest(".tf48");if(row){row.classList.toggle("ok48",ok);el.innerHTML=ok?IC.check:"";el.setAttribute("aria-pressed",ok)}
 const left=TF48.filter(x=>!d[x.k]).length,c=$("#tf48left");if(c)c.textContent=left?left+" of "+TF48.length+" still to check.":"All checked."}catch(e){}}
function tfGo48(i){const it=TF48[i];if(!it)return;try{closeSheet(true)}catch(e){}SS=null;
 try{const [kind,id,qi,calc]=it.go;
  if(kind=="intro")return wlReplay();
  if(kind=="lab"){if(XD39.some(z=>z.id==id))return labX39(id);return labOpen(id)}
  startId(id);if(SS)SS.logged34=1;
  if(kind=="q"){let n=0;while(SS&&!SS.qs&&n++<40)nextCard();if(!SS||!SS.qs)return;
   const key=id+"#"+qi,j=SS.qs.findIndex(q=>q.key==key);if(j<0){toast48("That question isn't in this lesson any more");return}
   SS.i=j;SS.logged34=1;showQ();if(calc)setTimeout(()=>tools(),60)}
 }catch(e){toast48("Couldn't open that one")}}
function toast48(s){try{const d=document.createElement("div");d.className="rsnote";d.setAttribute("role","status");d.textContent=s;document.body.appendChild(d);setTimeout(()=>d.remove(),2400)}catch(e){}}
function tfSheet48(){const d=tfDone48(),left=TF48.filter(x=>!d[x.k]).length;let h="",lastB="";
 TF48.forEach((it,i)=>{if(it.b!==lastB){h+=`${lastB?"</div>":""}<p class="gl">${esc(it.b)}</p><div class="group">`;lastB=it.b}
  const ok=!!d[it.k];
  h+=`<div class="row tf48${ok?" ok48":""}"><button class="tk48" onclick="tfTick48('${it.k}',this)" aria-pressed="${ok}" aria-label="${ok?"Mark not checked":"Mark checked"}: ${esc(it.t)}">${ok?IC.check:""}</button><span class="grow"><b>${esc(it.t)}</b><small>${esc(it.c)}</small></span><button class="op48" onclick="tfGo48(${i})">Open</button></div>`});
 const html=`<p class="kick blue">Only on your devices</p><h2 class="sht">Test recent fixes</h2><p class="body"><span id="tf48left">${left?left+" of "+TF48.length+" still to check.":"All checked."}</span> Ticks are saved on this device.</p>${h}</div>`;
 sheet(html,"var(--blue)")}
try{const s=document.createElement("style");s.id="v48css";s.textContent=
 `.tf48{display:flex;align-items:center;gap:12px;padding:12px 14px}.tf48 .grow{flex:1;min-width:0}.tf48 b{display:block;font-size:15px}.tf48 small{display:block;color:var(--mu);font-size:12.5px;line-height:1.35;margin-top:2px}
.tk48{flex:none;width:26px;height:26px;border-radius:8px;border:1.5px solid var(--line);display:grid;place-items:center;color:var(--ok);background:transparent}.tk48 svg{width:16px;height:16px}
.ok48 .tk48{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 15%,transparent)}.ok48 b{color:var(--mu)}
.op48{flex:none;padding:7px 12px;border-radius:10px;background:var(--s2);border:1px solid var(--line);color:var(--blue);font-weight:700;font-size:13.5px}`;
 document.head.appendChild(s)}catch(e){}
const _set48=settings;settings=function(){_set48.apply(this,arguments);try{
 if(!tfOn48()||$("#tf48row"))return;const h=$(".pad .h1");if(!h)return;const d=tfDone48(),left=TF48.filter(x=>!d[x.k]).length;
 h.insertAdjacentHTML("afterend",`<div class="group" id="tf48row"><button class="row" onclick="tfSheet48()"><span><b>Test recent fixes</b><small>${left?left+" lesson and model fixes to check":"All checked"} · only on your devices</small></span>${IC.chevR}</button></div>`)}catch(e){}};

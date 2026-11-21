/* ===== v72 (2026-11-21): Learn path and calculator bugs from Seth's b71 flags =====
   1. Learn: finishing the last lesson of a unit (only the unit review left) jumped the path to the next section,
      because secIndex only looked for open lessons. A pending unit review now keeps its section current.
   2. A locked lesson's sheet names what to finish first, and now has a button per missing lesson that takes you
      to it on the path (switching section, and course if it's one of yours) and opens it.
   3. Calculator auto-open: questions with no mapped equation (most multiple-choice) now open the same equation
      the Eqns tab names as the best match, when there is exactly one best match and the question has numbers.
      Explicit equations for elec3 #0/#1, elec4 #0 and mech2 #1 (that one opened the torque equation first).
   4. Graph: a question that states a function, f(x) = …, opens Graph with that function drawn. */
try{FB.ver="b72"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Finishing a unit's last lesson keeps you on that unit so the review is right there.","A locked lesson has a button that takes you to the lesson you need first.","Multiple-choice questions open their equation in the calculator, and f(x) questions open Graph with f drawn."]})}catch(e){}

/* ---- 1. pending review keeps its section ---- */
try{const _si72=secIndex;secIndex=function(T,sid){try{const k=T.findIndex(s=>s.name==st.sec[sid]);if(k>=0)return k;
 const a=T.findIndex(s=>s.units.some(u=>u.ls.some(l=>!isDone(l)&&isOpen(l))||(u.complete&&!u.revDone)));if(a>=0)return a}catch(e){}
 return _si72.apply(this,arguments)}}catch(e){}

/* ---- 2. locked lesson: go to the missing lesson ---- */
function goL72(id){try{const l=LS.find(x=>x.id==id);if(!l)return;closeSheet(true);
 if(!(st.subj||[]).includes(l.sub)){if(isOpen(l))startId(id);return}
 st.cur=l.sub;const T=tree(l.sub),i=T.findIndex(s=>s.units.some(u=>u.ls.some(x=>x.id==id)));if(i>=0)st.sec[l.sub]=T[i].name;save();learn(false);
 setTimeout(()=>{const ix=NODES.findIndex(n=>n.k=="l"&&n.l.id==id),b=document.querySelector(`.node[data-ix="${ix}"]`);
  if(b){b.scrollIntoView({block:"center"});openNode(ix)}},120)}catch(e){}}
try{const _on72=openNode;openNode=function(ix){const r=_on72.apply(this,arguments);try{const n=NODES[ix];if(n&&n.k=="l"&&!isOpen(n.l)){
 const miss=n.l.req.filter(r=>st.done[r]===undefined).map(r=>LS.find(x=>x.id==r)).filter(Boolean),box=document.querySelector("#scrim .locked");
 if(box&&miss.length)box.insertAdjacentHTML("afterend",miss.map(x=>{const u=x.sub!=n.l.sub||x.br!=n.l.br?` <small>(${esc(x.br)})</small>`:"";
  return `<button class="btn ghost go72" onclick="goL72('${x.id}')">Go to “${esc(x.title)}”${u}</button>`}).join(""))}}catch(e){}return r}}catch(e){}

/* ---- 3. equations for multiple-choice questions ---- */
try{[["mech2#1","A 20-tooth gear turning at 1200 rpm drives a 60-tooth gear. Ideal output?",["ωout = ωin · Nin / Nout","Tout = Tin · Nout / Nin"]],
 ["elec3#0","5 V supply, LED drops 2 V. Which standard E12 resistor keeps current at or below 10 mA?",["R = (Vs − Vf) / I"]],
 ["elec3#1","A 10 kΩ and 100 nF RC low-pass has a cutoff near…",["fc = 1 / (2πRC)"]],
 ["elec4#0","Inverting op-amp amplifier: Rin = 10 kΩ, Rf = 100 kΩ. Gain?",["G = −Rf / Rin"]]
].forEach(([k,q,e])=>{if(!QD30[k])eqFor32(k,{q},e)})}catch(e){}
function best72(x){try{if(!x||!/[0-9]/.test(String(x.q||""))||qNums(x.q).length<1)return null;const top=eqTopic30(srcLesson());if(!top||!top.length)return null;
 const b=eqBest25(srcLesson(),x,top);return b.length==1&&EQX[b[0][2]]?b[0][2]:null}catch(e){return null}}
try{const _tools72=tools;tools=function(tab){const r=_tools72.apply(this,arguments);try{
 if(tab&&tab!="calc")return r;const x=SS&&SS.qs&&SS.qs[SS.i];if(!x||SS.kind=="place"||CALC.sv||view!="lesson")return r;
 if((mapped30(x)||[]).some(f=>EQX[f]))return r;const k=SS.i+"|"+(x.key||"")+"|72";if(AUTO46===k)return r;AUTO46=k;
 const f=best72(x);if(f)svOpen(f)}catch(e){}return r}}catch(e){}

/* ---- 4. Graph opens with the question's f(x) ---- */
function fx72(q){try{const m=String(q||"").match(/\b(?:[fgh]\s*\(\s*x\s*\)|y)\s*=\s*([^,;?]+?)(?=\s*(?:[,;?]|\.\s|\.$|$|\bfor\b|\band\b|\bover\b|\bat\b))/);if(!m)return null;
 let e=m[1].trim().replace(/[−–]/g,"-").replace(/[·×]/g,"*").replace(/²/g,"^2").replace(/³/g,"^3").replace(/√\s*\(/g,"sqrt(").replace(/√\s*([a-z0-9]+)/g,"sqrt($1)").replace(/\bln\b/g,"log")
  .replace(/(\d)\s*([a-z(])/g,"$1*$2").replace(/\)\s*\(/g,")*(").replace(/\s+/g,"");
 if(/[^0-9x+\-*/^().a-z]/.test(e))return null;let ok=0;for(const v of [-3,-1.5,0.5,2.5,4,7]){try{const y=miniEval(e,{x:v});if(isFinite(y))ok++}catch(er){}}return ok>=2?e:null}catch(e){return null}}
try{const _gp72=gPrefill57;gPrefill57=function(){_gp72.apply(this,arguments);try{const graph=TT=="graph"||(TT=="calc"&&CALC.mode=="graph");if(!graph)return;
 const x=SS&&SS.qs&&SS.qs[SS.i]&&view=="lesson"?SS.qs[SS.i]:null;if(!x||(mapped30(x)||[]).some(f=>EQX[f]))return;const k=SS.i+"|"+(x.key||"")+"|fx";if(CALC.gq72===k)return;CALC.gq72=k;
 const e=fx72(x.q);if(!e)return;CALC.g=e;CALC.gx=[-5,10];CALC.g0=CALC.gx.slice();CALC.gy=null;CALC.gm=undefined;CALC.deg=false;CALC.glab={y:"f(x)",x:"x"};
 const g=$("#gexp");if(g)g.value=e}catch(e){}}}catch(e){}

/* ---- test list for Seth ---- */
try{[
 {b:"b72",k:"sec72",t:"Unit review stays in view",c:"Finish the last lesson of a unit: the path stays on that unit with the review marked, not the next section.",go:["learn"]},
 {b:"b72",k:"go72",t:"Locked lesson: Go to button",c:"Tap a locked lesson (e.g. the next case study): a Go to “…” button opens the lesson you need first.",go:["learn"]},
 {b:"b72",k:"mc72",t:"MC equation in the calculator",c:"Open Tools on this multiple-choice question: the RC cutoff equation opens ready to solve.",go:["q","elec3",1]},
 {b:"b72",k:"gr72",t:"Gear question equation",c:"Tools opens ωout = ωin · Nin / Nout first (not the torque one).",go:["q","mech2",1]},
 {b:"b72",k:"fx72",t:"f(x) drawn in Graph",c:"Open Tools → Graph: f(x) = 1/(x − 2) is drawn.",go:["q","calc1-limits-1",0]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

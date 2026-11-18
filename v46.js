/* ===== v46 (2026-11-17): third batch of tester flags =====
   0. Re-key the equations of mech-machine-3#1 (its b44 rewording broke the QD30 match).
   1. Calculator: opening the tools on a question that has mapped equations (QD30) opens the first one in
      the solver, once per question. Closing it, or picking another equation, sticks until the next
      question. Not when the tools are opened straight to another tab (graph, equations, help).
   2. Lab model screen: ‹ › arrows at the top right step through the models in the Lab's order (the course
      the Lab is showing, its units in path order, as labRender lists them; or the model set for b39
      models). Arrows grey out at the ends. Stepping into another unit shows a small "Next topic: …" note. */
try{FB.ver="b46"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["Calculator: on a question with a known equation, the tools open with that equation ready to solve. Close it to pick another.","Lab: arrows at the top of a model step to the previous or next model."]})}catch(e){}

/* 0. b44 reworded mech-machine-3#1, and QD30 entries are keyed to a hash of the question text, so its
      equations stopped matching. Re-key it to the current text. */
try{const l=bq32("mech-machine-3"),q=l&&l.qs[1];if(q)eqFor32("mech-machine-3#1",q,["Lh = L10·1000000/(60·n)","L10 = (C/P)^3"])}catch(e){}

/* 1. auto-open the question's equation */
let AUTO46=null;
const _tools46=tools;tools=function(tab){const r=_tools46.apply(this,arguments);try{
 if(tab&&tab!="calc")return r;
 const x=SS&&SS.qs&&SS.qs[SS.i];if(!x||SS.kind=="place"||CALC.sv)return r;
 const k=SS.i+"|"+(x.key||"");if(AUTO46===k)return r;AUTO46=k;
 const f=(mapped30(x)||[]).find(f=>EQX[f]);if(f)svOpen(f);
}catch(e){}return r};

/* 2. lab seek arrows */
function seekList46(){try{
 const cur=LABX39?{x:1,id:LABX39}:(LAB25?{x:0,id:LAB25}:null);if(!cur)return{L:[],i:-1};
 const c=labCur();
 if(cur.x){const d=XD39.find(z=>z.id==cur.id),set=XS39.find(s=>s.id==c)||XS39.find(s=>d&&s.course==d.course);
  const L=set?xItems39(set.id,"").map(z=>({x:1,id:z.id,br:z.course})):[];return{L,i:L.findIndex(z=>z.id==cur.id)}}
 const build=subs=>{const L=[];subs.forEach(s=>{const units=tree(s.id).flatMap(u=>u.units),by={};
   LS.forEach(l=>{if(l.sub==s.id&&lessonDemo(l))(by[l.br]=by[l.br]||[]).push(l)});
   const order=units.map(u=>u.br).filter(br=>by[br]);Object.keys(by).forEach(br=>{if(order.indexOf(br)<0)order.push(br)});
   order.forEach(br=>by[br].forEach(l=>L.push({x:0,id:l.id,br})))});return L};
 let L=build(String(c).startsWith("x:")?[]:(c=="all"?SUB.filter(s=>LS.some(l=>l.sub==s.id)):SUB.filter(s=>s.id==c)));
 let i=L.findIndex(z=>!z.x&&z.id==cur.id);
 if(i<0){const l=LS.find(z=>z.id==cur.id);L=l?build(SUB.filter(s=>s.id==l.sub)):[];i=L.findIndex(z=>z.id==cur.id)}
 return{L,i}}catch(e){return{L:[],i:-1}}}
function seek46(d){try{const {L,i}=seekList46(),j=i+d,n=L[j];if(i<0||!n)return;
 const crossed=L[i].br!==n.br;
 if(n.x)labX39(n.id);else labOpen(n.id);window.scrollTo(0,0);
 if(crossed){const t=document.createElement("div");t.className="rsnote";t.setAttribute("role","status");t.textContent=(d>0?"Next topic: ":"Previous topic: ")+n.br;document.body.appendChild(t);setTimeout(()=>t.remove(),2400)}
}catch(e){}}
function seekBar46(){try{if(view!="labdemo"||$("#seek46"))return;const b=$(".pad > .back");if(!b)return;
 const {L,i}=seekList46();if(i<0||L.length<2)return;
 const btn=(d,lbl,ic)=>{const off=!L[i+d];return `<button class="sk46" onclick="seek46(${d})" aria-label="${lbl}" ${off?"disabled":""}>${ic}</button>`};
 const w=document.createElement("div");w.id="seek46";w.className="seek46";b.parentNode.insertBefore(w,b);w.appendChild(b);
 w.insertAdjacentHTML("beforeend",`<span class="sk46n mono">${i+1} / ${L.length}</span>`+btn(-1,"Previous model",`<span class="flip46">${IC.chevR}</span>`)+btn(1,"Next model",IC.chevR));
}catch(e){}}
try{const s=document.createElement("style");s.id="v46css";s.textContent=
 `.seek46{display:flex;align-items:center;gap:6px}.seek46 .back{flex:1}
.sk46{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:var(--s2);border:1px solid var(--line);color:var(--tx);margin-top:8px}
.sk46:disabled{opacity:.35}.sk46 svg{width:18px;height:18px}.flip46{display:grid;transform:scaleX(-1)}
.sk46n{color:var(--fa);font-size:12px;margin:8px 4px 0 0}`;
 document.head.appendChild(s)}catch(e){}
const _lo46=labOpen;labOpen=function(){const r=_lo46.apply(this,arguments);seekBar46();return r};
const _lx46=labX39;labX39=function(){const r=_lx46.apply(this,arguments);seekBar46();return r};

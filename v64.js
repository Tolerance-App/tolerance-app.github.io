/* ===== v64 (2026-11-18): Field calculator tab; Settings moves to a gear; one streak flame =====
   Seth: "Let's build a field calculator. Tabs: Learn, Field Calculator, Lab, Practice. Settings becomes a small
   gear in the top right next to the flag. Instead of a green circle and a flame, the flame is unfilled until
   today's streak is done; keep some orange, make it feel like you want to complete it."
   1. Bottom tabs: Learn · Field calc · Lab · Practice (nav() rebuilt from the original; the Practice mistakes
      badge stays). The Settings screen is unchanged; it opens from a gear on the Learn top bar, between XP and
      the flag.
   2. Field calculator (view "field"): Calculator, Equations, Graph, an equation search and your recent
      equations. Each opens the same tools sheet as lessons, with no lesson attached (srcLesson() is null on this
      screen, so no question bar, no Lesson tab, the full grouped equation list). Recent equations are whatever
      went into the solver, kept on this device in localStorage "tol_fc64" (not in progress data).
   3. Streak: the daily-goal ring is gone from the top bar (the goal is still in the streak sheet). The flame is
      an orange outline until today's streak is done, then filled; a little bigger.
   4. The field screen counts as calm for v42's update reload. */
try{FB.ver="b64"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["New Field calc tab: every equation in the app, ready to solve, with the calculator and graph. Your recent equations stay on this device.","Settings moved to the gear at the top of Learn.","The streak flame fills in once today’s streak is done."]})}catch(e){}

/* ---- 1. bottom tabs ---- */
nav=function(){const m=Object.keys(st.miss).filter(k=>QX[k]).length,on=k=>view==k||(k=="learn"&&(view=="sections"||view=="guide"))||(k=="lab"&&(view=="labdemo"||view=="explore"));
 return `<nav class="nav" aria-label="Main"><div class="nav-in"><div class="brand">${LOGO}<span>Tolerance</span></div>`+[["learn","Learn",IC.path],["field","Field calc",IC.calc],["lab","Lab",IC.flask],["practice","Practice",IC.loop]].map(([k,t,i])=>`<button class="tab ${on(k)?"on":""}" onclick="${k}()" ${on(k)?'aria-current="page"':""}>${i}<span>${t}</span>${k=="practice"&&m?`<span class="badge">${m}</span>`:""}</button>`).join("")+`</div></nav>`};

/* ---- 3. top bar: one flame, and the gear ---- */
goalRing=function(){return ""};
const _sh64=shell;shell=function(h){const r=_sh64.apply(this,arguments);try{const tb=$(".topbar");if(tb){
  const s=tb.querySelector(".stat.fire,.stat.off");if(s){s.classList.add("flame64");s.classList.toggle("done64",st.last==today())}
  if(!tb.querySelector(".gear64")){const g=`<button class="gear64" onclick="settings()" aria-label="Settings">${IC.gear}</button>`,f=tb.querySelector(".fbflag");if(f)f.insertAdjacentHTML("beforebegin",g);else tb.insertAdjacentHTML("beforeend",g)}}}catch(e){}return r};

/* ---- 2. field calculator ---- */
const FC64K="tol_fc64";
function fcRecent64(){try{const a=JSON.parse(localStorage.getItem(FC64K)||"[]");return Array.isArray(a)?a.filter(f=>EQX[f]):[]}catch(e){return[]}}
function fcRemember64(f){try{if(!EQX[f])return;const a=[f].concat(fcRecent64().filter(x=>x!==f)).slice(0,8);localStorage.setItem(FC64K,JSON.stringify(a))}catch(e){}}
/* while the field screen opens the tools, v46's "open the question's equation" must not fire, even if a lesson
   session object is still around */
let FCOPEN64=false;
const _svo64=svOpen;svOpen=function(f){if(view=="field"&&FCOPEN64)return;try{fcRemember64(f)}catch(e){}return _svo64.apply(this,arguments)};
const _src64=srcLesson;srcLesson=function(){if(view=="field")return null;return _src64.apply(this,arguments)};
function fcTool64(tab){CALC.mode=null;FCOPEN64=true;try{tools(tab)}finally{FCOPEN64=false}}
function fcSearch64(){fcTool64("eq");setTimeout(()=>{const i=$("#eqq63");if(i)try{i.focus({preventScroll:true})}catch(e){}},80)}
function fcOpen64(i){const f=fcRecent64()[i];if(!f)return;if(!$("#scrim .sheet"))fcTool64("calc");svOpen(f)}
const fcName64=f=>{try{for(const k in EQB){const e=EQB[k].e.find(x=>x[1]==f);if(e)return e[0]}}catch(e){}return EQX[f]&&EQX[f].n||f};
function field(){view="field";const rec=fcRecent64();
 /* back in a lesson, even on the same question, v43 clears what the field calculator left in the solver and v46
    loads the question's own equation again */
 try{QK43=null}catch(e){}try{AUTO46=null}catch(e){}
 shell(`<div class="pad fc64"><h1 class="h1">Field calculator</h1><p class="sub">Every equation in the app, ready to solve. Pick one, fill in what you know, leave one box empty.</p>
 <button class="fcs64" onclick="fcSearch64()">${IC.search||""}<span>Search equations, symbols, topics</span></button>
 <div class="fcg64">
  <button class="fcb64" onclick="fcTool64('eq')">${IC.sigma}<b>Equations</b><small>Browse by subject</small></button>
  <button class="fcb64" onclick="fcTool64('calc')">${IC.calc}<b>Calculator</b><small>Units and matrices</small></button>
  <button class="fcb64" onclick="fcTool64('graph')">${IC.graph}<b>Graph</b><small>Plot any function</small></button>
 </div>
 <p class="kick" style="margin-top:22px">Recent equations</p>
 ${rec.length?`<div class="group">${rec.map((f,i)=>`<button class="row" onclick="fcOpen64(${i})"><span><b>${esc(fcName64(f))}</b><small class="mono">${esc(f)}</small></span>${IC.chevR}</button>`).join("")}</div>`:`<p class="sub">Equations you use in the solver show up here, on this device.</p>`}
 </div>`);window.scrollTo(0,0)}
try{if(typeof SAFE42!="undefined"&&SAFE42.indexOf("field")<0)SAFE42.push("field")}catch(e){}

document.head.insertAdjacentHTML("beforeend",`<style>
.topbar .stat.flame64{color:var(--orange);padding:4px 6px}
.topbar .stat.flame64 .i{width:26px;height:26px}
.topbar .stat.flame64 .i path{fill:none;stroke:var(--orange);stroke-width:1.7;stroke-linejoin:round}
.topbar .stat.flame64.done64 .i path{fill:var(--orange);stroke:var(--orange)}
.topbar .stat.flame64:not(.done64) span{color:var(--mu)}
.topbar .gear64{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;color:var(--mu);margin-left:2px}
.topbar .gear64 .i{width:22px;height:22px}
.topbar .gear64:hover{background:var(--s2)}
.fc64 .fcs64{display:flex;align-items:center;gap:10px;width:100%;margin:14px 0 12px;padding:13px 14px;border-radius:14px;border:1px solid var(--line);background:var(--s2);color:var(--mu);font-size:15px;text-align:left}
.fc64 .fcs64 .i{width:20px;height:20px;flex:none}
.fc64 .fcg64{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.fc64 .fcb64{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:14px 12px;border-radius:16px;border:1px solid var(--line);background:var(--s1);color:var(--tx);text-align:left;min-width:0}
.fc64 .fcb64 .i{width:24px;height:24px;color:var(--blue);margin-bottom:4px}
.fc64 .fcb64 b{font-size:15px}
.fc64 .fcb64 small{font-size:12px;color:var(--mu);line-height:1.3}
.fc64 .row small.mono{font-family:"JetBrains Mono",monospace;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
.fc64 .row>span{min-width:0}
</style>`);

try{TF48.unshift(
 {b:"b64",k:"nav64",t:"New tabs and gear",c:"Bottom: Learn, Field calc, Lab, Practice. Learn's top bar: flame (outline until today's lesson), XP, gear (opens Settings), flag. No green ring.",go:["settings"]},
 {b:"b64",k:"field64",t:"Field calculator",c:"Field calc tab: Equations, Calculator, Graph and search open the tools with no lesson attached. Use an equation in the solver, come back: it's under Recent.",go:["field"]}
)}catch(e){}
try{const _tg64=tfGo48;tfGo48=function(i){const it=TF48[i];if(it&&it.go&&it.go[0]=="field"){try{closeSheet(true)}catch(e){}SS=null;field();return}return _tg64.apply(this,arguments)}}catch(e){}

/* ===== v34 (2026-11-16): anonymous lesson stats =====
   One small record per finished or quit lesson / unit review / practice session, written to
   Firestore "ev/{uid}_{id}". Nothing is read back by the app. Seth reads them on stats.html.
   Record: u device id, k kind, id lesson id (or unit review key / practice mode), t title,
   sub, br branch, lv level, n questions, sc score, pass, sec seconds, ok / miss question keys
   (first answer only), end "done"|"quit", at question index when quit, v build, d day, ts time.
   Uses only the app's own storage interface (NET.db.doc().set), so it moves with the app.
   If the backup isn't connected yet, records wait in localStorage ("tol_ev", max 50). */
try{FB.ver="b34"}catch(e){}
const EV34={q:[],busy:false};
try{const s=JSON.parse(localStorage.getItem("tol_ev")||"[]");if(Array.isArray(s))EV34.q=s.slice(-50)}catch(e){}
function evSave34(){try{localStorage.setItem("tol_ev",JSON.stringify(EV34.q.slice(-50)))}catch(e){}}
async function evFlush34(){if(EV34.busy||!EV34.q.length||!NET.db||!NET.uid)return;EV34.busy=true;
 try{while(EV34.q.length){const o=Object.assign({},EV34.q[0],{u:NET.uid});
  const id=NET.uid+"_"+(+o.ts||Date.now()).toString(36)+Math.random().toString(36).slice(2,6);
  try{await NET.db.doc("ev/"+id).set(o)}catch(e){if(e&&/permission|invalid/i.test(e.code||e.message||""))EV34.q.shift();evSave34();break}
  EV34.q.shift();evSave34()}}finally{EV34.busy=false}}
function evLog34(end){try{
 if(!SS||SS.kind=="place"||SS.logged34)return;SS.logged34=1;
 const e=SS.ev34||{},ks=Object.keys(e),n=SS.qs?SS.qs.length:0,sc=+SS.score||0,k=SS.kind;
 const o={k,n,sc,sec:Math.round((Date.now()-(SS.t0||Date.now()))/1000),end,v:"b34",ts:Date.now()};
 try{o.d=dayKey()}catch(x){}
 if(k=="lesson"&&SS.l){o.id=SS.l.id;o.t=SS.l.title;o.sub=SS.l.sub;o.br=SS.l.branch;o.lv=SS.l.lv;if(end=="done")o.pass=sc>=passNeed(SS.l,n)}
 else if(k=="review"){o.id=SS.rk||(SS.u&&SS.u.key);o.t=SS.u?"Unit review "+(SS.u.n||""):"Unit review";if(end=="done")o.pass=sc>=Math.ceil(n*.8)}
 else o.id="practice:"+(SS.mode||"");
 o.ok=ks.filter(x=>e[x]).slice(0,40);o.miss=ks.filter(x=>!e[x]).slice(0,40);
 if(end=="quit")o.at=+SS.i||0;
 /* Firestore refuses undefined values; clean and clip */
 Object.keys(o).forEach(x=>{if(o[x]===undefined||o[x]===null||(typeof o[x]=="number"&&!isFinite(o[x])))delete o[x];else if(typeof o[x]=="string")o[x]=o[x].slice(0,120)});
 EV34.q.push(o);evSave34();evFlush34()}catch(x){}}

/* first answer to each question */
const _fb34=feedback;feedback=function(good){try{if(SS&&SS.kind!="place"&&SS.qs){const x=SS.qs[SS.i],key=x&&x.key;
 SS.ev34=SS.ev34||{};if(key&&!(key in SS.ev34))SS.ev34[key]=good?1:0}}catch(e){}return _fb34.apply(this,arguments)};
/* a new run of questions (also "Try again") starts clean */
const _rq34=runQs;runQs=function(){try{if(SS){SS.ev34={};SS.logged34=0}}catch(e){}return _rq34.apply(this,arguments)};
const _fin34=finishSession;finishSession=function(){const s=SS;try{evLog34("done")}catch(e){}EV34.quitSS=null;
 try{if(s)s.logged34=1}catch(e){}return _fin34.apply(this,arguments)};
/* Quit button: the sheet's Quit sets SS=null and calls home() */
const _quit34=quit;quit=function(){EV34.quitSS=SS;return _quit34.apply(this,arguments)};
const _home34=home;home=function(){try{if(EV34.quitSS&&!SS){const keep=SS;SS=EV34.quitSS;EV34.quitSS=null;if(SS.qs)evLog34("quit");SS=keep}}catch(e){}
 return _home34.apply(this,arguments)};
setTimeout(evFlush34,8000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)evFlush34()});

/* one line in Settings → Progress saying what's collected */
const _set34=settings;settings=function(){_set34.apply(this,arguments);try{const s=$("#syn28");if(s&&!$("#ev34"))
 s.insertAdjacentHTML("afterend",`<small id="ev34" style="display:block;opacity:.75;margin-top:4px">Anonymous lesson stats (score, time, which questions were missed) are saved to help improve lessons. No name or email.</small>`)}catch(e){}};

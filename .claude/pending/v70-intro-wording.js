/* ===== v70 (2026-11-19): intro wording and a smoother reveal =====
   Seth: US spelling ("meter"), relate 100 N and 20×20 mm to something people know, and the answer reveal felt
   choppy. The choppiness came from the page re-centring when the controls appeared (justify-content switched
   from center to flex-start) and everything popping in at once. Now the lab is top-aligned from the start,
   the other guesses fade, and the verdict, controls and Next ease in one after another. */
try{FB.ver="b70"}catch(e){}

const _wp70=wlPage;wlPage=function(){
 if(WL.p==0){view="welcome";bare(`<button class="wl wl-intro screen" onclick="wlGo(1)" aria-label="Start"><span class="wl-l1">A steel bar, one meter long and 20&nbsp;mm square, about as thick as your thumb.</span><span class="wl-l2">Hang 100&nbsp;N off the end: the weight of a 10&nbsp;kg bag of rice. How far does the tip drop?</span><span class="wl-tap">Tap anywhere</span></button>`);return}
 const r=_wp70.apply(this,arguments);
 try{const v=$("#wlverdict");if(v)v.innerHTML=v.innerHTML.replace(/metre/g,"meter");const a=$(".wl-ask69");if(a&&a.textContent)a.textContent="Your guess: 100 N (a 10 kg bag) on the thumb-thick bar:"}catch(e){}
 return r};

wlGuess69=function(i){if(WL.g!=null)return;WL.g=i;WL.F=100;WL.s="sq";
 document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{b.disabled=true;b.classList.add(j==i?"pick":"dim70")});
 const ask=$(".wl-ask69");if(ask)ask.classList.add("gone70");
 drop69(()=>{const ok=G69[i][1];
  document.querySelectorAll(".wl-g69 button").forEach((b,j)=>{if(G69[j][1]){b.classList.remove("dim70");b.classList.add("ok")}else if(j==i)b.classList.add("no")});
  try{if(!ok&&typeof buzz=="function")buzz()}catch(e){}
  const v=$("#wlverdict");if(v){v.innerHTML=ok?`<b>Spot on: 12.5 mm.</b> Solid steel, and it still visibly sags over a meter.`:`<b>It drops 12.5 mm.</b> You said ${G69[i][0]}. Solid steel, and it still visibly sags over a meter.`;v.hidden=false}
  const r=$("#wlrest");if(r){r.hidden=false;wlDemoDraw()}
  const f=$(".wl-foot");if(f)f.innerHTML=`<button class="btn in70" onclick="wlGo(2)">Next</button>`})};

document.head.insertAdjacentHTML("beforeend",`<style>
.wl-body:has(.wl69){justify-content:flex-start;gap:10px;padding-top:8px}
.wl-g69 button{transition:opacity .35s,border-color .35s,background .35s}
.wl-g69 button.dim70{opacity:.4}
.wl-ask69{transition:opacity .3s,max-height .4s,margin .4s;max-height:40px;overflow:hidden}.wl-ask69.gone70{opacity:0;max-height:0;margin:0!important}
@keyframes in70{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#wlverdict:not([hidden]){animation:in70 .45s ease-out both}
#wlrest:not([hidden]){animation:in70 .5s .25s ease-out both}
.wl-foot .in70{animation:in70 .4s .5s ease-out both}
@media (prefers-reduced-motion:reduce){#wlverdict,#wlrest,.wl-foot .in70{animation:none!important}}
</style>`);

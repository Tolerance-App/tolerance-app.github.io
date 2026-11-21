/* ===== v80 (2026-11-21): small Lab flags =====
   - Open and closed loop demo (cruise51): starts with cruise control Off, and the car runs about 1.5× faster
     (Seth: "Start this demo with the cruise off", "Increase the speed of the car again").
   - Lab: the "Model sets" block (Computational Methods, Dynamics and Control) moves from the top of the list to
     just past the middle, so the course's own lessons come first (Seth, 2026-11-18, for after 11/19). */
try{FB.ver="b80"}catch(e){}
try{const C=DEMOS.cruise51,ui0=C.ui,run0=C.run;
 C.ui=()=>pickc("cc","Cruise control",[["1","On"],["0","Off"]],"0")+slider("dd","Hill: speed lost with pedal held",0,20,.5,10)+slider("L","Loop gain Kp·K",0,50,.5,9);
 C.run=function(){const r=run0.apply(this,arguments);try{const D=String(14/1.5);r.svg=r.svg.split(`dur="${D}s"`).join(`dur="${(14/2.25).toFixed(3)}s"`)}catch(e){}return r}}catch(e){}
try{const _lr80=labRender;labRender=function(){const r=_lr80.apply(this,arguments);try{const res=document.getElementById("labres");if(!res||(typeof LABQ=="string"&&LABQ.trim()))return r;
 const g=[...res.querySelectorAll(":scope > .labu")],ms=g.find(x=>{const h=x.querySelector(".labuh");return h&&h.textContent.trim()=="Model sets"});
 if(ms&&g.length>3&&g[0]==ms){const rest=g.filter(x=>x!=ms),at=rest[Math.ceil(rest.length*0.55)-1];if(at)at.after(ms)}}catch(e){}return r}}catch(e){}
try{[{b:"b80",k:"cr80",t:"Cruise demo starts off, faster car",c:"Open the demo: cruise Off is selected and the car slows on the hill; the car moves faster than before.",go:["lab","ctrl-feedback-1"]},
 {b:"b80",k:"ms80",t:"Model sets lower in the Lab",c:"Lab → Mechanical: Model sets sits about halfway down, not at the top.",go:["learn"]}].forEach(e=>TF48.unshift(e))}catch(e){}

/* ===== v88 (2026-11-21): small flag fixes =====
   1. Order questions: when the whole order is right, every slot turns gently green (Seth, b29/b30: "make all boxes
      correct light up green for these types of problems").
   2. mech2 #1 reworded so gear 1 clearly drives gear 2 (Seth, b17). Same answer and index; the calculator mapping
      (QD30, keyed by the question text's hash) is re-linked to the new text.
   3. mfg-injection-molding-2 card 4 figure: the sink mark is cut into the show face as a dent toward the thick rib,
      instead of a red line floating over the face that read as upside down (Seth, b25). */
try{FB.ver="b88"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Order questions: get the whole order right and every slot lights up green."]})}catch(e){}

try{document.head.insertAdjacentHTML("beforeend",`<style>#ordbox.allok88 .oslot{border-color:var(--ok)!important;background:color-mix(in srgb,var(--ok) 14%,transparent)!important}</style>`)}catch(e){}
try{const _fb88=feedback;feedback=function(good){const r=_fb88.apply(this,arguments);try{const x=SS&&SS.qs&&SS.qs[SS.i],ob=document.getElementById("ordbox");if(ob&&x&&x.t=="order")ob.classList.toggle("allok88",!!good)}catch(e){}return r}}catch(e){}

function fix88(){
 try{const l=LS.find(x=>x.id=="mech2"),x=l&&l.qs[1];if(x&&/^A 20-tooth gear turning at 1200 rpm drives a 60-tooth gear/.test(x.q||"")){const old=QD30["mech2#1"];
  x.q="Gear 1 has 20 teeth and turns at 1200 rpm. It drives gear 2, which has 60 teeth. Ideally, what are gear 2’s speed and torque?";
  if(old&&old[1])QD30["mech2#1"]=[QH30(x.q),old[1]]}}catch(e){}}
try{const _bu88=build;build=function(){const r=_bu88.apply(this,arguments);try{fix88()}catch(e){}return r}}catch(e){}

try{const f=LFIG17["mfg-injection-molding-2"];if(f&&f.spec&&f.spec.layers&&!f.s88){const L=f.spec.layers,i=L.findIndex(o=>o.t=="poly"&&o.c=="fa"&&o.pts&&o.pts[0][0]==6.5);
 if(i>=0){f.s88=1;f._svg=null;const dent=[];for(let k=0;k<=10;k++){const t=Math.PI*k/10;dent.push([8.5+k*.1,1+.18*Math.sin(t)])}
  L[i]={...L[i],pts:[[6.5,1],[8.5,1],...dent.slice(1,-1),[9.5,1],[11.5,1],[11.5,2],[9.5,2],[9.5,5],[8.5,5],[8.5,2],[6.5,2]]};
  const j=L.findIndex(o=>o.t=="param"&&o.c=="bad");if(j>=0)L[j]={...L[j],x:"9+0.5*cos(t)",y:"1+0.18*sin(t)",t0:"0",t1:"3.1416"}}}}catch(e){}

try{[
 {b:"b88",k:"og88",t:"Order: all slots green",c:"Shafts in torsion #5: put the speeds in the right order and check: all four slots turn green.",go:["q","mech-machine-2",4]},
 {b:"b88",k:"gr88",t:"Gear question reworded",c:"Fits and gears #2: gear 1 drives gear 2; Tools still opens the gear-ratio equations.",go:["q","mech2",1]},
 {b:"b88",k:"sk88",t:"Sink mark as a dent",c:"Walls, ribs and cooling, card 4: the face dips in under the thick rib.",go:["lesson","mfg-injection-molding-2"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

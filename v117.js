/* ===== v117 (2026-11-27): mech3 (Joints and fatigue) setup figures =====
   Old-app flag, left open on 2026-11-27: "more setup figures for Joints and fatigue (mech3)".
   1. Card 0 figure (LFIG17): the outside load P was drawn as sideways arrows on the plates, which reads as shear.
      The card is about a separating load, so P now pulls the top plate up and the bottom plate down at the plate
      ends. Clamp arrows, bolt, preload unchanged; plates widened a little so "clamp" sits clear of the P arrows.
   2. Card 1 figure (LFIG84): the same stepped shaft twice, sharp shoulder vs fillet, hot spot at the corner.
      Peterson's fit for a stepped round bar in bending, D/d = 1.5: Kt ≈ 0.938·(r/d)^−0.258.
      r/d = 0.02 → 0.938·2.74 = 2.57 ≈ 2.6. Drawn fillet r = 0.4 on d = 1.6 → r/d = 0.25 → 0.938·1.43 = 1.34 ≈ 1.3.
   3. Question figures (QFIG17): mech3#0 shows the preloaded joint with P pulling the plates apart (same picture as
      card 0, setup caption, no hint of the split). mech3#1 shows the stepped shaft with its sharp shoulder and middle
      labelled, so the four options have something to point at. */
try{FB.ver="b117"}catch(e){}

/* ---------- 1. card 0: separating load ---------- */
var BOLT117={view:[0,10,0,7],eq:true,axes:false,h:200,layers:[
 {t:"poly",pts:[[1.2,3.6],[8.8,3.6],[8.8,5],[1.2,5]],fill:true,c:"fa",op:.25},{t:"poly",pts:[[1.2,2],[8.8,2],[8.8,3.4],[1.2,3.4]],fill:true,c:"fa",op:.25},
 {t:"poly",pts:[[4.6,1],[5.4,1],[5.4,6],[4.6,6]],fill:true,c:"orange",op:.35},{t:"poly",pts:[[3.8,5],[6.2,5],[6.2,5.8],[3.8,5.8]],fill:true,c:"orange",op:.5},{t:"poly",pts:[[3.9,1.2],[6.1,1.2],[6.1,2],[3.9,2]],fill:true,c:"orange",op:.5},
 A17(3,5.3,3,4.6,"","ok",2),A17(3,1.7,3,2.4,"","ok",2),A17(6.8,5.3,6.8,4.6,"","ok",2),A17(6.8,1.7,6.8,2.4,"","ok",2),Tx(7.05,5.45,"clamp"),
 A17(5,6.1,5,6.9,"","orange",2),Tx(5.3,6.6,"preload"),
 A17(1.5,5,1.5,6.3,"","bad",2),A17(8.5,5,8.5,6.3,"","bad",2),A17(1.5,2,1.5,.7,"","bad",2),A17(8.5,2,8.5,.7,"","bad",2),Tx(1.8,6.1,"P"),Tx(1.8,.8,"P")]};
try{const f=LFIG17.mech3;if(f){f._svg=null;f.spec=BOLT117;
 f.cap="Tightening stretches the bolt (tension, orange) and squeezes the plates together (clamp, green). An outside load P that pulls the plates apart mostly eats into that clamp before it adds much bolt tension."}}catch(e){}

/* ---------- 2. card 1: sharp shoulder vs fillet ---------- */
const shaft117=(c,r)=>{const top=[[.6,c+1.2],[5,c+1.2]];
 if(r){for(let i=1;i<=12;i++){const t=Math.PI/2*i/12;top.push([5+r-r*Math.cos(t),c+1.2-r*Math.sin(t)])}}else top.push([5,c+.8]);
 top.push([9.4,c+.8]);const bot=top.map(([x,y])=>[x,2*c-y]).reverse();
 return [{t:"poly",pts:top.concat(bot),fill:true,c:"fa",op:.25},Ln(.4,c,9.6,c,"mu",1,"4 3")]};
try{LFIG84.mech3=Object.assign(LFIG84.mech3||{},{1:{cap:"The same stepped shaft in bending (D/d = 1.5). At a sharp shoulder the local stress is about 2.6× the nominal stress, and that's where the crack starts. A fillet with r/d = 0.25 brings it down to about 1.3×.",
 spec:{view:[0,10,0,8],eq:true,axes:false,h:220,layers:[
  ...shaft117(5.8,0),{t:"circle",cx:5,cy:6.6,r:.38,fill:true,c:"orange",op:.45},Ln(5,6.6,5.3,6.2,"bad",2),
  Tx(5.6,7.1,"sharp: Kt ≈ 2.6"),
  ...shaft117(1.9,.4),{t:"circle",cx:5.15,cy:2.85,r:.25,fill:true,c:"orange",op:.18},
  Tx(5.6,3.2,"fillet r: Kt ≈ 1.3")]}}})}catch(e){}

/* ---------- 3. question figures ---------- */
try{qfig17("mech3#0","The bolt was tightened first, so it is stretched and the plates are squeezed together. Then P pulls the plates apart.",BOLT117)}catch(e){}
try{qfig17("mech3#1","A stepped shaft in bending. The diameter steps down at the shoulder, which here has a sharp inside corner.",
 {view:[0,10,0,4.2],eq:true,axes:false,h:130,layers:[...shaft117(2,0),Tx(5.6,3.2,"shoulder"),Ln(5.55,3.05,5.08,2.85,"mu",1),Tx(2.8,3.45,"middle","middle")]})}catch(e){}

/* ---------- test entries ---------- */
try{TF48.unshift(
 {b:"b117",k:"jf117",t:"Joints and fatigue pictures",c:"Card 1: P now pulls the plates apart. Card 2: sharp shoulder vs fillet. Both questions have a setup picture.",go:["lesson","mech3"]})}catch(e){}
try{NEWS.unshift({d:"2026-11-27",t:["Joints and fatigue has new pictures: the bolted joint under a separating load, and a sharp shoulder next to a rounded one."]})}catch(e){}

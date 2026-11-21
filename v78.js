/* ===== v78 (2026-11-21): picture demos for three CAD lessons =====
   Seth: "These CAD topics need better demos" (the bar charts didn't show anything you could picture).
   1. cad-sketch-constraints-3: points A, B, C on a line with AB and BC dimensioned. AC can be Driving or Driven
      (reference). Driving AC that matches is redundant; one that doesn't is a conflict, drawn as C pulled two ways.
      Same sliders and mismatch readout as before.
   2. cad-sketch-constraints-4: the isosceles triangle itself (L = 50 mm), apex Up or Down, the other branch dashed.
      Same base slider and readouts, plus how far the apex moves for 1 mm of base.
   3. cad-modeling-3: Mates mode shows a pin and a block, which of the 6 motions each mate leaves free, and arrows
      for them. Linkage mode keeps the Gruebler count M = 3(n − 1) − 2j − h with the same sliders. */
try{FB.ver="b78"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["New CAD demos you can see: conflicting dimensions on a sketch, the two-way triangle, and which motions each assembly mate leaves free."]})}catch(e){}

const tc78=(ok)=>ok?"var(--ok)":"var(--bad)";
function dimH78(x1,x2,y,txt,col,up){const a=4,ty=up?y-6:y+14;return`<path d="M${x1} ${y}H${x2}M${x1} ${y-a}V${y+a}M${x2} ${y-a}V${y+a}" stroke="${col}" stroke-width="1.3" fill="none"/>`+`<text x="${(x1+x2)/2}" y="${ty}" text-anchor="middle" style="fill:${col}">${txt}</text>`}

const DM78={
 "x:cad-sketch-constraints-3":{t:"Driving, driven and conflicting dimensions",hint:"AB and BC are driving dimensions: they set where B and C go, so AC = AB + BC is already decided. Show AC as a driven (reference) dimension and it just reports that. Make it driving and it either repeats what is known (redundant) or asks for something else (conflict).",
  ui:()=>slider("ab","Length AB",10,50,1,30)+slider("bc","Length BC",10,50,1,20)+slider("requested","Requested AC",20,100,1,50)+pickc("m","AC is",[[0,"Driven (reference)"],[1,"Driving"]],1),
  ro:()=>rof([["AC from AB + BC","a"],["Absolute mismatch","b"],["Sketch","c"]]),
  run(v){const ab=+v.ab,bc=+v.bc,rq=+v.requested,drv=+v.m==1,ac=ab+bc,mis=Math.abs(rq-ac),s=2.6,x0=24,y=92;
   const xA=x0,xB=x0+ab*s,xC=x0+ac*s,xR=x0+rq*s;let g="";
   g+=`<path d="M${xA} ${y}H${Math.max(xC,drv?xR:xC)+8}" stroke="var(--fa)" stroke-width="1" stroke-dasharray="4 4" fill="none"/><path d="M${xA} ${y}H${xC}" stroke="var(--tx)" stroke-width="2.2" fill="none"/>`;
   g+=dimH78(xA,xB,y-30,"AB = "+ab,"var(--blue)",true)+dimH78(xB,xC,y-30,"BC = "+bc,"var(--blue)",true);
   let st;
   if(!drv){g+=dimH78(xA,xC,y+34,"AC = ("+ac+")","var(--fa)",false);st="Driven: AC follows AB + BC"}
   else if(mis<0.5){g+=dimH78(xA,xC,y+34,"AC = "+rq,"var(--orange)",false);st="Redundant: it repeats AB + BC"}
   else{g+=dimH78(xA,xR,y+34,"AC = "+rq,tc78(false),false);g+=`<circle cx="${xR}" cy="${y}" r="5" fill="none" stroke="${tc78(false)}" stroke-width="1.6" stroke-dasharray="2 2"/><path d="M${xC} ${y-12}L${xR} ${y-12}" stroke="${tc78(false)}" stroke-width="1.2" marker-end="url(#ar78)" fill="none"/>`;st="Conflict: C can’t be in two places"}
   [[xA,"A"],[xB,"B"],[xC,"C"]].forEach(([x,n])=>{g+=`<circle cx="${x}" cy="${y}" r="4.5" fill="var(--tx)" stroke="none"/>`+T(x,y+18,n,"middle")});
   const defs=`<defs><marker id="ar78" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="${tc78(false)}" stroke="none"/></marker></defs>`;
   return{svg:`<svg viewBox="0 0 320 150">${defs}${g}</svg>`,lab:{ab:ab+" mm",bc:bc+" mm",requested:rq+" mm"},out:{a:ac+" mm",b:drv?mis.toFixed(0)+" mm":"none (driven)",c:st}}}},

 "x:cad-sketch-constraints-4":{t:"Two solutions approach a singular shape",hint:"Equal sides L = 50 mm and a base b fix the triangle’s shape but not which side of the base the apex sits on: up and down both satisfy the dimensions. As b approaches 2L = 100 mm the triangle flattens and a tiny base change swings the apex a long way. The slider stops short of flat.",
  ui:()=>slider("base","Base b",10,99,1,60)+pickc("side","Apex",[[1,"Up"],[-1,"Down"]],1),
  ro:()=>rof([["Upper height","a"],["Sensitivity magnitude","b"],["Apex moves per 1 mm of base","c"]]),
  run(v){const b=+v.base,sd=+v.side||1,L=50,h=Math.sqrt(L*L-b*b/4),sens=b/(4*h),s=2.1,cx=160,cy=128;
   const xl=cx-b/2*s,xr=cx+b/2*s,yu=cy-h*s,yd=cy+h*s,ya=sd>0?yu:yd,yo=sd>0?yd:yu;let g="";
   g+=`<path d="M${xl} ${cy}L${cx} ${yo.toFixed(1)}L${xr} ${cy}" stroke="var(--fa)" stroke-width="1.2" stroke-dasharray="4 4" fill="none"/>`;
   g+=`<path d="M${xl} ${cy}L${cx} ${ya.toFixed(1)}L${xr} ${cy}Z" stroke="var(--blue)" stroke-width="2" fill="color-mix(in srgb,var(--blue) 14%,transparent)"/>`;
   g+=`<path d="M${cx} ${cy}V${ya.toFixed(1)}" stroke="var(--orange)" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>`;
   g+=T(cx+6,(cy+ya)/2+4,"h = "+h.toFixed(1),"start");
   const mx=(xl+cx)/2,my=(cy+ya)/2;g+=T(mx-8,my+(sd>0?0:8),"L = 50","end");
   g+=T(cx,sd>0?cy+16:cy-8,"b = "+b,"middle");
   g+=T(cx,sd>0?Math.min(250,yo+16):Math.max(12,yo-8),"other solution","middle");
   [[xl,cy],[xr,cy],[cx,ya]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y.toFixed(1)}" r="3.5" fill="var(--tx)" stroke="none"/>`);
   return{svg:`<svg viewBox="0 0 320 258">${g}</svg>`,lab:{base:b+" mm"},out:{a:h.toFixed(2)+" mm",b:sens.toFixed(4),c:sens.toFixed(2)+" mm"+(sens>2?" (touchy)":"")}}}},

 "x:cad-modeling-3":{t:"What each mate leaves free",hint:"A free part has 6 degrees of freedom: slide along x, y, z and spin about x, y, z. Each mate removes some. Leave the motion the real mechanism has, so you can drag it and check clearance. Linkage mode counts planar mobility with Gruebler: each moving link adds 3, each pin or slider removes 2, each cam or gear contact removes 1.",
  ui:()=>pickc("mode","Show",[[0,"Mates"],[1,"Linkage"]],0)+pickc("mate","Mate (Mates mode)",[[0,"None"],[1,"Distance"],[2,"Face to face"],[3,"Concentric"],[4,"Concentric + face"],[5,"Fixed"]],3)+slider("n","Links, including ground (Linkage)",2,8,1,4)+slider("j","Pin or slider joints, −2 each (Linkage)",1,10,1,4)+slider("hj","Cam or gear contacts, −1 each (Linkage)",0,4,1,0),
  ro:()=>rof([["Free motions","a"],["Removed","b"],["Result","c"]]),
  run(v){const mode=+v.mode,n=+v.n,j=+v.j,hj=+v.hj;
   if(mode==1){const M=3*(n-1)-2*j-hj;let g=T(160,40,"M = 3(n − 1) − 2j − h","middle")+T(160,72,`= 3(${n} − 1) − 2·${j} − ${hj}`,"middle");
    g+=`<text x="160" y="118" text-anchor="middle" style="font:700 30px 'JetBrains Mono',monospace;fill:${M>0?tc78(true):tc78(false)}">M = ${M}</text>`;
    g+=T(160,146,M>0?(M==1?"Mechanism: one input drives it":"Mechanism: needs "+M+" inputs"):"Structure: no motion","middle");
    return{svg:`<svg viewBox="0 0 320 160">${g}</svg>`,lab:{n:String(n),j:String(j),hj:String(hj)},out:{a:String(Math.max(0,M)),b:String(2*j+hj),c:M>0?"Mechanism":"Structure"}}}
   const mate=+v.mate,F=[[1,1,1,1,1,1],[1,1,1,1,1,1],[1,0,1,0,1,0],[0,1,0,0,1,0],[0,0,0,0,1,0],[0,0,0,0,0,0]][mate];
   if(mate==1)F[0]=0;/* distance: one gap set */
   const nm=["Slide x","Slide y","Slide z","Spin x","Spin y","Spin z"],free=F.reduce((a,b)=>a+b,0);
   const names=["None: the part floats","Distance: one gap set","Face to face: stays flat on the face","Concentric: on the axis","Concentric + face: seated pin","Fixed: locked"];
   let g="";/* block with a vertical hole, pin above or in it; y is the pin axis */
   const bx=70,by=96,bw=180,bh=44,hx=160,hw=24,pl=50,pinY=[20,20,46,60,96,96][mate];
   g+=`<g stroke="none"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="color-mix(in srgb,var(--fa) 22%,transparent)"/><rect x="${hx-hw/2}" y="${by}" width="${hw}" height="${bh}" fill="var(--s1)"/></g>`;
   g+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="none" stroke="var(--fa)"/><path d="M${hx-hw/2} ${by}V${by+bh}M${hx+hw/2} ${by}V${by+bh}" stroke="var(--fa)" stroke-dasharray="3 3" fill="none"/>`;
   const px=mate==2?hx+46:hx,pw=hw-4;
   g+=`<g stroke="none"><rect x="${px-pw/2-8}" y="${pinY-10}" width="${pw+16}" height="10" rx="2" fill="var(--blue)" opacity=".85"/><rect x="${px-pw/2}" y="${pinY}" width="${pw}" height="${pl}" rx="2" fill="var(--blue)" opacity=".55"/></g>`;
   if(mate==2)g+=`<path d="M${bx} ${by}H${bx+bw}" stroke="var(--orange)" stroke-width="2.2"/>`;
   const ar=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="var(--orange)" stroke-width="1.8" marker-end="url(#am78)" marker-start="url(#am78s)" fill="none"/>`;
   const cy=pinY+28;if(F[0])g+=ar(px-46,cy,px-22,cy);if(F[1])g+=ar(px+30,pinY-16,px+30,pinY+14);if(F[4])g+=`<path d="M${px-16} ${pinY-18}A16 5 0 1 0 ${px+16} ${pinY-18}" stroke="var(--orange)" stroke-width="1.8" fill="none" marker-end="url(#am78)"/>`;
   const defs=`<defs><marker id="am78" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--orange)" stroke="none"/></marker><marker id="am78s" viewBox="0 0 8 8" refX="1" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M8 0L0 4L8 8z" fill="var(--orange)" stroke="none"/></marker></defs>`;
   const chips=nm.map((t,i)=>{const x=10+(i%3)*102,y=150+Math.floor(i/3)*26;return`<rect x="${x}" y="${y}" width="96" height="20" rx="10" fill="${F[i]?"color-mix(in srgb,var(--orange) 22%,transparent)":"none"}" stroke="${F[i]?"var(--orange)":"var(--line)"}"/>`+`<text x="${x+48}" y="${y+14}" text-anchor="middle" style="fill:${F[i]?"var(--tx)":"var(--fa)"}">${t}${F[i]?"":" ✕"}</text>`}).join("");
   return{svg:`<svg viewBox="0 0 320 206">${defs}${g}${chips}</svg>`,lab:{n:String(n),j:String(j),hj:String(hj)},out:{a:free+" of 6",b:String(6-free),c:names[mate]}}}}
};
function inst78(){try{Object.entries(DM78).forEach(([k,d])=>{DEMOS[k]=d})}catch(e){}}
inst78();
try{const _bu78=build;build=function(){const r=_bu78.apply(this,arguments);inst78();return r}}catch(e){}

try{[
 {b:"b78",k:"cs78",t:"Driven/driving demo",c:"AC Driving at 55 with AB 30, BC 20: C drawn pulled two ways, Conflict. Switch to Driven: AC = (50).",go:["lab","cad-sketch-constraints-3"]},
 {b:"b78",k:"tr78",t:"Triangle branches demo",c:"Real triangle; Apex Up/Down; push b toward 99 and watch the apex swing.",go:["lab","cad-sketch-constraints-4"]},
 {b:"b78",k:"mt78",t:"Mates demo",c:"Pick each mate: the free-motion chips and arrows change (concentric leaves slide y + spin y). Linkage mode: four-bar M = 1.",go:["lab","cad-modeling-3"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

/* ===== v110 (2026-11-25): three backlog visuals: array vs list memory, spindle power/torque margin, shaft stress cross-section =====
   From the REFERENCE.md backlog (flags moved there 2026-11-21): "better cs-data-structures-1 demo", "spindle power-margin
   visual", "shaft stress gradient cross-section". Each is a new registered demo mapped to its lesson through DEMO_OVR, so
   the old demos (arrlist, x:cam-feeds-speeds-4, shaftx) stay untouched underneath. The old ideas are kept.
   1. cs-data-structures-1 -> arr110. Old arrlist: counts only (n up to 1000), list nodes drawn in a neat row.
      Now n is small enough to draw every item: the array as touching slots with indices, the list as nodes scattered
      in memory with head, next links and null. Pills pick Read item i or Insert at i. Read lights the one slot found by
      address arithmetic, or the i links walked. Insert shows the shifted later items, or the two rewired links.
      Two readouts still scale it to n = 1,000,000 (the old "array 1 step vs list i hops" idea).
   2. cam-feeds-speeds-4 -> spin110. Same feed and spindle-speed sliders and fixed cut (ae 5, ap 2, u 2 J/mm³), plus a
      spindle rated power. The plot adds the spindle's available torque (flat to a 600 rev/min base speed, then
      constant power) under the cut's required torque, and two margin bars: power used of rated, torque used of what
      the spindle gives at this speed. Slowing the spindle keeps power at 40% while torque runs out (card 1's point).
      Default numbers: Q = 5·2·600/60 = 100 mm³/s, P = 2·100 = 200 W (40% of 0.5 kW); ω = 2π·300/60 = 31.42 rad/s,
      T = 200/31.42 = 6.366 N·m; available below base: 500/(2π·600/60) = 500/62.83 = 7.958 N·m (80% used).
      At 200 rev/min: T = 200/20.94 = 9.549 N·m > 7.958 -> torque-limited while power is still 40%.
   3. mech-machine-2 -> shaft110. Same sliders as shaftx (P, n, d, bore %, allowable). The cross-section is now
      banded by stress with a colour key (0 -> allowable), tangential arrows along one radius, the bore cut out, and
      the τ–r line beside it with labels kept clear of each other (shaftx clipped "allowable" at the right edge).
      Adds "torque carried by the inner half of r" = (0.5⁴ − k⁴)/(1 − k⁴): 6.25% for a solid shaft.
      Default: T = 15000/(2π·1450/60) = 15000/151.8 = 98.79 N·m; τmax = 16T/(πd³) = 16·98.79/(π·0.025³) = 32.2 MPa. */
try{FB.ver="b110"}catch(e){}
try{NEWS.unshift({d:"2026-11-25",t:["New pictures for arrays and linked lists, spindle power and torque limits, and stress across a twisted shaft."]})}catch(e){}

const tx110=(x,y,s,a,c,fs)=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${a||"middle"}" style="${c?`fill:${c};`:""}${fs?`font-size:${fs}px`:""}">${s}</text>`; /* .demo svg text sets 11px, so size goes in style */
const box110=(x,y,w,h,c,op,sw,d)=>`<rect x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" width="${Math.max(0,w).toFixed(1)}" height="${Math.max(0,h).toFixed(1)}" rx="2" fill="color-mix(in srgb,${c} ${Math.round(op*100)}%,transparent)" stroke="${c}" stroke-width="${sw||1.2}"${d?` stroke-dasharray="${d}"`:""}/>`;

/* ---------- 1. arrays and linked nodes ---------- */
DEMOS.arr110={t:"Array or linked list, in memory",hint:"An array finds item i with one address sum. A list walks i links from the head. Inserting flips it: the array shifts every later item, while the list rewires two links once it reaches the spot.",
ui:()=>pickc("op","Operation",[[0,"Read item i"],[1,"Insert at i"]],0)+slider("n","Items n",3,8,1,6)+slider("i","Position i",0,8,1,3),
ro:()=>rof([["Array","a"],["List","b"],["Array, n = 10⁶, i = n/2","c"],["List, n = 10⁶, i = n/2","d"]]),
run(v){const ins=+v.op==1,n=Math.round(+v.n),i=Math.max(0,Math.min(Math.round(+v.i),ins?n:n-1)),V=[12,7,31,4,25,9,18,3],NEW=50;
 const B="var(--blue)",O="var(--orange)",G="var(--ok)",M="var(--mu)",pl=(k,w)=>k+" "+w+(k==1?"":"s");
 let s=`<g stroke="none">`;
 /* array: touching slots */
 s+=tx110(6,13,"Array: slots side by side in memory","start",B);
 const cnt=ins?n+1:n,w=Math.min(34,288/cnt),x0=(300-cnt*w)/2;
 for(let k=0;k<cnt;k++){const x=x0+k*w;let val=V[k],c=B,op=.1;
  if(ins){if(k==i){val=NEW;c=O;op=.38}else if(k>i){val=V[k-1];c=O;op=.1}}else if(k==i){c=O;op=.38}
  s+=box110(x,22,w,24,c,op,1.2)+tx110(x+w/2,38,String(val),"middle","var(--tx)")+tx110(x+w/2,58,String(k),"middle",M)}
 if(ins){const sh=n-i;if(sh>0)s+=arr16(x0+(i+1)*w+3,64,x0+cnt*w-3,64,O,1.4);
  s+=tx110(150,80,sh>0?"insert "+NEW+" at "+i+": shift "+pl(sh,"later item")+" right":"insert "+NEW+" at the end: nothing to shift","middle",O)}
 else s+=tx110(150,80,"address = start + "+i+" × 4 bytes: 1 step","middle",O);
 /* list: scattered nodes */
 s+=tx110(6,101,"List: nodes anywhere, joined by links","start",G);
 const zig=[0,14,4,13,1,12,5,14],NW=26,xl=40,sp=n>1?Math.min(38,(300-xl-NW-4)/(n-1)):0,X=k=>xl+k*sp,Y=k=>110+zig[k];
 const hot=k=>!ins&&k==i,linkHot=k=>!ins&&k<i;
 /* head */
 s+=tx110(31,Y(0)+13,"head","end",!ins||i==0?O:G);
 if(ins&&i==0)s+=ln16(32,Y(0)+9,X(0)-1,Y(0)+9,M,1.2,"3 3");else s+=arr16(32,Y(0)+9,X(0)-1,Y(0)+9,!ins?O:G,1.4);
 for(let k=0;k<n;k++){const x=X(k),y=Y(k),c=hot(k)?O:G;
  s+=box110(x,y,18,18,c,hot(k)?.38:.12,1.2)+box110(x+18,y,8,18,c,.04,1.2)+`<circle cx="${(x+22).toFixed(1)}" cy="${(y+9).toFixed(1)}" r="1.8" fill="${c}"/>`+tx110(x+9,y+13,String(V[k]),"middle","var(--tx)",9);
  if(k<n-1){const cut=ins&&k==i-1;s+=cut?ln16(x+24,y+9,X(k+1)-1,Y(k+1)+9,M,1.2,"3 3"):arr16(x+24,y+9,X(k+1)-1,Y(k+1)+9,linkHot(k)?O:G,linkHot(k)?1.8:1.3)}}
 if(!(ins&&i==n))s+=tx110(X(n-1)+22,Y(n-1)+30,"null","middle",M,9);
 if(ins){const xN=Math.min(240,i==0?X(0):i==n?X(n-1):(X(i-1)+X(i))/2),yN=150;
  s+=box110(xN,yN,18,18,O,.38,1.2)+box110(xN+18,yN,8,18,O,.04,1.2)+`<circle cx="${(xN+22).toFixed(1)}" cy="${(yN+9).toFixed(1)}" r="1.8" fill="${O}"/>`+tx110(xN+9,yN+13,String(NEW),"middle","var(--tx)",9);
  if(i==0)s+=arr16(20,Y(0)+17,xN-1,yN+7,O,1.6);else s+=arr16(X(i-1)+22,Y(i-1)+19,xN+9,yN-1,O,1.6);
  if(i<n)s+=arr16(xN+24,yN+5,X(i)+9,Y(i)+19,O,1.6);else s+=tx110(xN+31,yN+13,"null","start",M,9)}
 s+=tx110(150,186,ins?(i>1?"walk "+pl(i-1,"link")+" to item "+(i-1)+", rewire 2 links":"rewire 2 links: nothing shifts"):(i?"follow "+pl(i,"link")+" from the head: "+pl(i,"hop"):"the head points at item 0: 0 hops"),"middle",ins?O:O);
 s+=`</g>`;
 const out=ins?{a:pl(n-i,"shift"),b:pl(Math.max(i-1,0),"hop")+", relink",c:"500,000 shifts",d:"499,999 hops"}:{a:"1 step",b:pl(i,"hop"),c:"1 step",d:"500,000 hops"};
 return {svg:`<svg viewBox="0 0 300 194">${s}</svg>`,lab:{n:String(n),i:String(i)},out}}};

/* ---------- 2. spindle power and torque margin ---------- */
DEMOS.spin110={t:"Spindle power vs torque",hint:"Simplified spindle: full torque up to a 600 rev/min base speed, then full rated power. Fixed cut: ae 5 mm, ap 2 mm, u 2 J/mm³. Slow the spindle at the same feed: the power needed stays put, but the torque needed climbs past what the motor gives.",
ui:()=>slider("feed","Feed vf",100,1200,100,600)+slider("rpm","Spindle speed n",100,1000,50,300)+slider("Pm","Spindle rated power",.2,1.5,.1,.5),
ro:()=>rof([["Removal rate","a"],["Cutting power","b"],["Cutting torque","c"],["Spindle torque at n","e"],["Status","d"]]),
run(v){const f=+v.feed,n=+v.rpm,Pm=+v.Pm*1000,nb=600,P=2*5*2*f/60,w=x=>2*Math.PI*x/60,Tr=x=>P/w(x),Ta=x=>Pm/w(Math.max(x,nb)),T0=Tr(n),A0=Ta(n),Tmax=Pm/w(nb);
 const nice=y=>{const st=y<=10?2:y<=20?5:y<=50?10:20;return Math.ceil(y/st)*st},yt=nice(Math.max(T0,Tmax)*1.3);
 const L=36,R=290,Tp=22,Bt=118,X=x=>L+(x-100)/900*(R-L),Y=t=>Bt-t/yt*(Bt-Tp),g=gid16(),ok=b=>b?"var(--ok)":"var(--bad)",G="var(--ok)",Bl="var(--blue)",M="var(--mu)";
 let s=`<defs><clipPath id="${g}"><rect x="${L}" y="${Tp}" width="${R-L}" height="${Bt-Tp}"/></clipPath></defs><g stroke="none">`;
 /* key strip */
 s+=`<rect x="${L}" y="5" width="9" height="6" fill="${G}"/>`+tx110(L+13,11,"spindle can give","start",M,9)+`<rect x="${L+124}" y="5" width="9" height="6" fill="${Bl}"/>`+tx110(L+137,11,"cut needs (N·m)","start",M,9);
 /* axes */
 s+=ln16(L,Bt,R,Bt,"var(--line)",1)+ln16(L,Tp,L,Bt,"var(--line)",1)+ln16(L,Tp,R,Tp,"var(--line)",.6,"2 4");
 [0,yt/2,yt].forEach(t=>s+=tx110(L-4,Y(t)+3.5,sig(t,3),"end",M,9));
 s+=ln16(X(nb),Tp,X(nb),Bt,G,1,"3 3");
 [[100,"100","start"],[nb,"600","middle"],[1000,"1000","end"]].forEach(([x,t,a])=>s+=tx110(X(x),Bt+12,t,a,M,9));
 s+=tx110((L+R)/2,Bt+25,"spindle speed n (rev/min) · base speed 600","middle",M,9);
 /* curves */
 const xs=[];for(let x=100;x<=1000;x+=10)xs.push(x);
 const env=xs.map(x=>[X(x),Y(Ta(x))]);
 s+=`<g clip-path="url(#${g})"><path d="M${X(100)} ${Bt}L${env.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}L${X(1000)} ${Bt}Z" fill="color-mix(in srgb,${G} 16%,transparent)" stroke="none"/>`;
 s+=pl16(env,G,2)+pl16(xs.map(x=>[X(x),Math.max(Y(Tr(x)),Tp-20)]),Bl,2.2)+`</g>`;
 s+=ln16(X(n),Y(A0),X(n),Y(T0),T0>A0?"var(--bad)":M,1,"2 2");
 s+=`<circle cx="${X(n).toFixed(1)}" cy="${Y(T0).toFixed(1)}" r="4" fill="${ok(T0<=A0)}"/>`;
 /* margin bars */
 const bar=(y,lab,fr)=>{const x0=6,len=234,fl=Math.min(fr,1.1)*len;return tx110(x0,y,lab,"start","var(--tx)",9.5)+`<rect x="${x0}" y="${y+5}" width="${len}" height="9" rx="2" fill="color-mix(in srgb,var(--mu) 18%,transparent)"/>`+
  `<rect x="${x0}" y="${y+5}" width="${fl.toFixed(1)}" height="9" rx="2" fill="${ok(fr<=1)}"/>`+ln16(x0+len,y+3,x0+len,y+16,"var(--tx)",1.2)+tx110(298,y+13,Math.round(fr*100)+"%","end",ok(fr<=1),9.5)};
 s+=bar(160,"Power: needs "+sig(P,3)+" of "+sig(Pm,3)+" W rated",P/Pm)+bar(190,"Torque: needs "+sig(T0,3)+" of "+sig(A0,3)+" N·m here",T0/A0);
 s+=`</g>`;
 const st=P>Pm?"Over power":T0>A0?"Torque short":"Fits both";
 return {svg:`<svg viewBox="0 0 300 212">${s}</svg>`,lab:{feed:f+" mm/min",rpm:n+" rev/min",Pm:sig(+v.Pm,2)+" kW"},
  out:{a:sig(P/2,4)+" mm³/s",b:sig(P,4)+" W",c:sig(T0,4)+" N·m",e:sig(A0,4)+" N·m",d:st}}}};

/* ---------- 3. shaft stress across the cross-section ---------- */
DEMOS.shaft110={t:"Stress across a twisted shaft",hint:"Shear stress grows in a straight line from zero at the center to its maximum at the surface (τ = T·r/J). The inner half of the radius carries only about 6% of the torque, so boring it out saves a lot of weight for a small loss of strength.",
ui:()=>slider("P","Power P (kW)",.5,100,.5,15)+slider("n","Speed n (rpm)",50,3600,50,1450)+slider("d","Outer diameter d (mm)",10,100,1,25)+slider("q","Bore, % of d",0,90,5,0)+slider("ta","Allowable shear (MPa)",20,200,5,60),
ro:()=>rof([["Torque T = P/ω","a"],["Max shear τmax","b"],["Weight vs solid","c"],["Strength vs solid","e"],["Torque in r < d/4","f"],["Status","d"]]),
run(v){const Tq=v.P*1000/(2*Math.PI*v.n/60),d=+v.d,k=v.q/100,di=d*k,J=Math.PI*(d**4-di**4)/32,tm=Tq*1000*(d/2)/J,ti=tm*k,ta=+v.ta,M="var(--mu)";
 const cx=74,cy=92,R=62,ri=R*k,top=Math.max(tm,ta)*1.15,tk=Math.max(tm,ta/.75),col=f=>C16(tm*f/tk),NB=10;
 let s=`<g stroke="none">`;
 /* banded cross-section: outer band first, smaller circles on top */
 for(let j=NB;j>=1;j--){const f=j/NB;if(f<=k+1e-9)break;s+=`<circle cx="${cx}" cy="${cy}" r="${(R*f).toFixed(1)}" fill="${col(f-.5/NB)}"/>`}
 s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="var(--tx)" stroke-width="1.4"/>`;
 if(ri>0)s+=`<circle cx="${cx}" cy="${cy}" r="${ri.toFixed(1)}" fill="var(--s1)" stroke="var(--tx)" stroke-width="1.2"/>`;
 [.25,.5,.75,.95].forEach(f=>{if(f<k+.06)return;const L=40*(tm*f)/top;s+=arr16(cx+L/2,cy-R*f,cx-L/2,cy-R*f,"#10161f",1.7)});
 s+=`<circle cx="${cx}" cy="${cy}" r="2.2" fill="var(--tx)"/>`+tx110(cx,cy+R+14,"Cross-section, arrows: τ","middle",M,9);
 /* τ–r profile */
 const O=160,X=t=>O+t/top*126,Yr=f=>cy-R*f;
 s+=ln16(O,cy,O,cy-R-4,"var(--line)",1)+ln16(O,cy,290,cy,"var(--line)",1)+tx110(155,cy-R/2+3,"r","end",M)+tx110(O,cy+12,"0","middle",M,9)+tx110(290,cy+12,"τ (MPa)","end",M,9);
 s+=ln16(cx+24,cy-R,O,cy-R,"var(--line)",1,"2 3")+ln16(cx,cy,O-1,cy,"var(--line)",1,"2 3");
 s+=`<path d="M${X(0)} ${Yr(k).toFixed(1)}L${X(ti).toFixed(1)} ${Yr(k).toFixed(1)}L${X(tm).toFixed(1)} ${Yr(1)}L${X(0)} ${Yr(1)}Z" fill="color-mix(in srgb,var(--blue) 14%,transparent)"/>`;
 if(k>0)s+=ln16(X(0),cy,X(ti),Yr(k),M,1,"3 3")+ln16(X(0),Yr(k),X(ti),Yr(k),"var(--line)",1,"3 3");
 s+=pl16([[X(ti),Yr(k)],[X(tm),Yr(1)]],"var(--blue)",2.6);
 s+=ln16(X(ta),cy+4,X(ta),cy-R,"var(--orange)",1.4,"5 4")+tx110(Math.max(188,Math.min(262,X(ta))),cy+26,"allowable "+sig(ta,3),"middle","var(--orange)",9);
 s+=`<circle cx="${X(tm).toFixed(1)}" cy="${Yr(1)}" r="4" fill="${tm>ta?"var(--bad)":"var(--blue)"}"/>`+tx110(Math.max(190,Math.min(262,X(tm))),Yr(1)-8,sig(tm,3)+" MPa","middle","var(--tx)",9.5);
 if(k>=.3)s+=tx110(X(ti)+6,Yr(k)+13,sig(ti,3),"start",M,9);
 /* colour key: C16 runs over τ = 0 -> tk = max(τmax, 1.33 × allowable), so the allowable tick sits at 75% or lower and an overstressed section still shows its gradient */
 const gk=gid16();s+=`<defs><linearGradient id="${gk}">${[0,.25,.5,.75,1].map(o=>`<stop offset="${o}" stop-color="${C16(o)}"/>`).join("")}</linearGradient></defs>`;
 s+=tx110(56,183,"τ = 0","end",M,9)+`<rect x="60" y="176" width="140" height="8" rx="2" fill="url(#${gk})"/>`+ln16(60+140*ta/tk,173,60+140*ta/tk,187,"var(--tx)",1.4)+tx110(Math.max(92,Math.min(190,60+140*ta/tk)),196,"allowable","middle",M,9)+tx110(204,183,sig(tk,3)+" MPa","start",M,9);
 s+=`</g>`;
 const inner=k<.5?(.0625-k**4)/(1-k**4):0;
 return {svg:`<svg viewBox="0 0 300 200">${s}</svg>`,lab:{P:v.P+" kW",n:v.n+" rpm",d:v.d+" mm",q:v.q+"%",ta:v.ta+" MPa"},
  out:{a:sig(Tq,3)+" N·m",b:sig(tm,3)+" MPa",c:Math.round(100*(1-k*k))+"%",e:Math.round(100*(1-k**4))+"%",f:(inner*100).toFixed(1)+"%",d:tm<=ta?"Within allowable":"Over allowable"}}}};

const OVR110={"cs-data-structures-1":"arr110","cam-feeds-speeds-4":"spin110","mech-machine-2":"shaft110"};
try{Object.assign(DEMO_OVR,OVR110)}catch(e){}
try{const _bu110=build;build=function(){const r=_bu110.apply(this,arguments);try{Object.assign(DEMO_OVR,OVR110)}catch(e){}return r}}catch(e){}
try{[
 {b:"b110",k:"arr110",t:"Array vs list picture",c:"Arrays and linked nodes: pick Read or Insert. The array lights one slot or shifts the later ones; the list walks links or rewires two.",go:["lab","cs-data-structures-1"]},
 {b:"b110",k:"spin110",t:"Spindle power and torque margin",c:"Power and torque constraints: slide the speed down to 200 rev/min. Power stays at 40% but the torque bar turns red.",go:["lab","cam-feeds-speeds-4"]},
 {b:"b110",k:"shaft110",t:"Shaft stress cross-section",c:"Shafts in torsion: the section is coloured by stress with a key. Raise the bore: the hole cuts out the low-stress blue core.",go:["lab","mech-machine-2"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

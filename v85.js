/* ===== v85 (2026-11-21): bar-chart demos become pictures (1 of 3) =====
   Seth: "Really really hard to understand these weird bar demos" / "Bar demos are really bad right now. Want visuals
   on all new demos." 31 demos drew only a bar chart (barsSVG). This build redraws 13 of them as pictures of the
   thing itself. Same sliders, same keys, same readouts and the same idea; only the picture changes. Two-state
   sliders become Off/On-style pills (cad-sketch-constraints-1, mat-basics-3), keeping the same keys and values.
   H85 holds the small SVG helpers; pic85 installs a picture over a lesson's inline spec demo (DEMOS["x:"+id], which
   lessonDemo uses before building its own), wrap85 over a registered spec demo. Reinstalled after build(). */
try{FB.ver="b85"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["13 demos that were only bar charts now show the real thing: plates and holes, sketches, datums, tolerance zones, stretched bars, floor beams and circuits."]})}catch(e){}

const H85={
 r:(x,y,w,h,c,op,sw)=>`<rect x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" width="${Math.max(0,w).toFixed(1)}" height="${Math.max(0,h).toFixed(1)}" rx="2" fill="color-mix(in srgb,${c} ${Math.round((op==null?.18:op)*100)}%,transparent)" stroke="${c}" stroke-width="${sw==null?1.4:sw}"/>`,
 l:(x1,y1,x2,y2,c,w,d)=>`<path d="M${(+x1).toFixed(1)} ${(+y1).toFixed(1)}L${(+x2).toFixed(1)} ${(+y2).toFixed(1)}" stroke="${c||"var(--tx)"}" stroke-width="${w||1.4}" fill="none"${d?` stroke-dasharray="${d}"`:""}/>`,
 p:(pts,c,w,fill,op,d)=>`<path d="M${pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}${fill?"Z":""}" stroke="${c}" stroke-width="${w||1.6}" fill="${fill?`color-mix(in srgb,${c} ${Math.round((op||.18)*100)}%,transparent)`:"none"}"${d?` stroke-dasharray="${d}"`:""}/>`,
 c:(x,y,r,c,fill,w,d)=>`<circle cx="${(+x).toFixed(1)}" cy="${(+y).toFixed(1)}" r="${Math.max(0,r).toFixed(1)}" fill="${fill||"none"}" stroke="${c}" stroke-width="${w||1.5}"${d?` stroke-dasharray="${d}"`:""}/>`,
 t:(x,y,s,a,c,fs)=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${a||"middle"}"${c?` style="fill:${c}"`:""}${fs?` font-size="${fs}"`:""}>${s}</text>`,
 a:(x1,y1,x2,y2,c,w)=>{c=c||"var(--tx)";const g=Math.atan2(y2-y1,x2-x1),h=6,q=(s)=>[x2-h*Math.cos(g+s),y2-h*Math.sin(g+s)];const A=q(-.45),B=q(.45);
  return H85.l(x1,y1,x2-2*Math.cos(g),y2-2*Math.sin(g),c,w||1.6)+`<path d="M${x2.toFixed(1)} ${y2.toFixed(1)}L${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}Z" fill="${c}" stroke="none"/>`},
 dim:(x1,x2,y,s,c,below)=>{c=c||"var(--mu)";if(x2<x1)[x1,x2]=[x2,x1];return `<path d="M${x1.toFixed(1)} ${y}H${x2.toFixed(1)}M${x1.toFixed(1)} ${y-4}V${y+4}M${x2.toFixed(1)} ${y-4}V${y+4}" stroke="${c}" stroke-width="1.1" fill="none"/>`+H85.t((x1+x2)/2,below?y+13:y-5,s,"middle",c)},
 svg:(h,g)=>`<svg viewBox="0 0 320 ${h}">${g}</svg>`,
 ok:(b)=>b?"var(--ok)":"var(--bad)",
 n:(x,d)=>{x=+x;if(!isFinite(x))return"—";const r=Math.round(x*Math.pow(10,d||0))/Math.pow(10,d||0);return String(r).replace("-","−")}
};
var PIC85={},WRAP85={};
function pic85(id,pic,mod){PIC85[id]={pic,mod}}
function wrap85(k,pic){WRAP85[k]=pic}
function inst85(){
 Object.entries(PIC85).forEach(([id,o])=>{try{const l=LS.find(x=>x.id==id);if(!l||!l.demo||typeof l.demo!="object"||(DEMO_OVR&&DEMO_OVR[id]&&DEMOS[DEMO_OVR[id]]))return;
  const k="x:"+id;if(DEMOS[k]&&DEMOS[k].pic85)return;const raw=o.mod?o.mod(JSON.parse(JSON.stringify(l.demo))):l.demo,D=mkSpec(raw),run=D.run;
  D.run=function(v){const r=run.call(D,v);try{const s=o.pic(v);if(s)r.svg=s}catch(e){}return r};D.pic85=1;DEMOS[k]=D}catch(e){}});
 Object.entries(WRAP85).forEach(([k,pic])=>{try{const D=DEMOS[k];if(!D||D.pic85)return;const run=D.run;D.run=function(v){const r=run.call(D,v);try{const s=pic(v);if(s)r.svg=s}catch(e){}return r};D.pic85=1}catch(e){}})}
const pills85=(keys,labels)=>sp=>{sp.choices=sp.choices||[];sp.sliders=(sp.sliders||[]).filter(s=>{const i=keys.indexOf(s.k);if(i<0)return true;sp.choices.push({k:s.k,label:s.label,options:labels[i],value:s.value});return false});return sp};

/* ---------- CAD ---------- */
pic85("cad-modeling-4",v=>{const {r,c,t,dim,svg}=H85,W=+v.W,e=+v.ed,n=Math.round(+v.n),s=1.3,x0=(320-W*s)/2,p=(W-2*e)/(n-1);let g=r(x0,40,W*s,70,"var(--blue)",.12);
 for(let k=0;k<n;k++)g+=c(x0+(e+k*p)*s,75,7,"var(--orange)","color-mix(in srgb,var(--orange) 25%,transparent)",1.6);
 g+=dim(x0,x0+W*s,26,"W = "+W)+dim(x0,x0+e*s,128,"e = "+e,"var(--mu)",true)+dim(x0+e*s,x0+(e+p)*s,124,"pitch "+H85.n(p,1),"var(--orange)");
 return svg(150,g)});
pic85("cad-modeling-1",v=>{const {l,c,t,svg}=H85,n=Math.round(+v.n),cc=Math.round(+v.c),h=Math.round(+v.h),dm=Math.round(+v.dm),w=280/n,P=i=>[20+i*w,i%2?44:92];let g="";
 for(let i=0;i<n;i++){const A=P(i),B=P(i+1),mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;g+=l(A[0],A[1],B[0],B[1],i<dm?"var(--orange)":"var(--blue)",2.2);
  if(i<h)g+=t(mx,my-8,"H/V","middle","var(--ok)",9);if(i<dm)g+=t(mx,my+16,"d","middle","var(--orange)",10)}
 for(let i=0;i<=n;i++){const A=P(i),join=i>0&&i<n&&i<=cc;g+=c(A[0],A[1],join?4:3.5,join?"var(--tx)":"var(--mu)",join?"var(--tx)":"var(--s1)",1.5)}
 const left=4*n-2*cc-h-dm,col=left==0?"var(--ok)":left<0?"var(--bad)":"var(--mu)";
 g+=t(160,128,`${4*n} from ${n} line${n>1?"s":""} − ${2*cc} coincident − ${h} H/V − ${dm} dims`,"middle","var(--mu)")+t(160,148,left==0?"0 left: fully defined":left<0?`${-left} too many: over-defined`:`${left} left: still free`,"middle",col);
 if(cc>n-1)g+=t(300,22,`+${cc-(n-1)} more coincident`,"end","var(--mu)",9);
 return svg(160,g)});
pic85("cad-sketch-constraints-1",v=>{const {c,a,t,l,dim,svg}=H85,cf=+v.centerFixed>0,sf=+v.sizeFixed>0,X=160,Y=78,R=42;let g=c(X,Y,R,"var(--blue)","color-mix(in srgb,var(--blue) 10%,transparent)",2);
 if(cf){g+=l(20,128,X,128,"var(--fa)",1,"3 3")+l(20,128,20,20,"var(--fa)",1)+l(X,Y,X,128,"var(--fa)",1,"3 3")+c(X,Y,3.5,"var(--tx)","var(--tx)")+t(26,122,"center located","start","var(--ok)",10)}
 else g+=a(X,Y,X+30,Y,"var(--orange)")+a(X,Y,X-30,Y,"var(--orange)")+a(X,Y,X,Y-30,"var(--orange)")+a(X,Y,X,Y+30,"var(--orange)")+t(X+8,Y+22,"x, y free","start","var(--orange)",10);
 if(sf)g+=dim(X-R,X+R,Y-R-10,"Ø set","var(--ok)");else g+=a(X+R*.7,Y-R*.7,X+R*.7+22,Y-R*.7-22,"var(--orange)")+t(X+R*.7+26,Y-R*.7-26,"size free","start","var(--orange)",10);
 const left=3-2*cf-sf;g+=t(160,152,left?`${left} freedom${left>1?"s":""} left`:"fully defined: 3 numbers fix a circle","middle",left?"var(--mu)":"var(--ok)");return svg(160,g)},
 pills85(["centerFixed","sizeFixed"],[[[0,"Free"],[1,"Fixed"]],[[0,"Free"],[1,"Fixed"]]]));
pic85("cad-sketch-constraints-2",v=>{const {r,c,l,dim,svg}=H85,W=+v.width,S=+v.spacing,s=1.7,x0=(320-W*s)/2,cx=160,e=(W-S)/2;let g=r(x0,36,W*s,64,"var(--blue)",.12);
 g+=l(cx,30,cx,106,"var(--fa)",1,"6 3 2 3")+c(cx-S/2*s,68,7,"var(--orange)","color-mix(in srgb,var(--orange) 25%,transparent)",1.6)+c(cx+S/2*s,68,7,"var(--orange)","color-mix(in srgb,var(--orange) 25%,transparent)",1.6);
 g+=dim(x0,x0+W*s,24,"width "+W)+dim(cx-S/2*s,cx+S/2*s,116,"spacing "+S,"var(--orange)",true)+dim(x0,cx-S/2*s,140,H85.n(e,1),"var(--mu)",true)+dim(cx+S/2*s,x0+W*s,140,H85.n(e,1),"var(--mu)",true);
 return svg(165,g)});

/* ---------- GD&T ---------- */
pic85("gdt-datums-1",v=>{const {r,p,c,t,l,svg}=H85,n=Math.round(+v.n),on=k=>n>=k;let g="";
 const F=[[95,60],[215,60],[215,112],[95,112]],T=[[95,60],[120,40],[240,40],[215,60]],S=[[215,60],[240,40],[240,92],[215,112]];
 g+=p(F,"var(--blue)",1.4,true,.12)+p(T,"var(--blue)",1.4,true,.06)+p(S,"var(--blue)",1.4,true,.2);
 g+=l(60,118,260,118,on(1)?"var(--ok)":"var(--fa)",2)+t(52,122,"A","end",on(1)?"var(--ok)":"var(--mu)");
 [[120,118],[160,118],[200,118]].forEach(q=>g+=c(q[0],q[1],4,on(1)?"var(--ok)":"var(--fa)",on(1)?"var(--ok)":"var(--s1)"));
 g+=l(86,54,86,116,on(2)?"var(--orange)":"var(--fa)",2)+t(80,50,"B","end",on(2)?"var(--orange)":"var(--mu)");
 [[86,72],[86,100]].forEach(q=>g+=c(q[0],q[1],4,on(2)?"var(--orange)":"var(--fa)",on(2)?"var(--orange)":"var(--s1)"));
 g+=l(250,34,250,96,on(3)?"var(--blue)":"var(--fa)",2)+t(256,30,"C","start",on(3)?"var(--blue)":"var(--mu)")+c(250,66,4,on(3)?"var(--blue)":"var(--fa)",on(3)?"var(--blue)":"var(--s1)");
 const M=[["move z",1],["tilt x",1],["tilt y",1],["move y",2],["spin z",2],["move x",3]];
 M.forEach(([s,k],i)=>{const x=10+i*50,gone=n>=k;g+=r(x,138,46,18,gone?"var(--fa)":"var(--orange)",gone?.06:.2,1)+t(x+23,151,s,"middle",gone?"var(--fa)":"var(--tx)",9.5)});
 g+=t(160,176,`${6-M.filter(m=>n>=m[1]).length} of 6 motions left`,"middle","var(--mu)");return svg(184,g)});
pic85("gdt-datums-2",v=>{const {c,l,t,svg}=H85,dx=+v.dx,dy=+v.dy,tol=+v.tol,s=380,X=160,Y=94,rr=Math.hypot(dx,dy),ok=2*rr<=tol+1e-12,col=H85.ok(ok);let g="";
 g+=l(X-90,Y,X+90,Y,"var(--fa)",1)+l(X,Y-82,X,Y+82,"var(--fa)",1)+c(X,Y,tol/2*s,col,`color-mix(in srgb,${col} 12%,transparent)`,1.6,"4 3");
 g+=c(X,Y,rr*s,"var(--orange)","none",1,"2 3")+l(X,Y,X+dx*s,Y-dy*s,"var(--orange)",1.2)+c(X+dx*s,Y-dy*s,4,"var(--orange)","var(--orange)");
 g+=t(8,186,"zone Ø "+H85.n(tol,2),"start",col)+t(312,186,"actual Ø "+H85.n(2*rr,3),"end","var(--orange)")+t(160,14,ok?"inside the zone: accept":"outside the zone: reject","middle",col);
 return svg(192,g)});
pic85("gdt-form-1",v=>{const {l,p,r,t,svg}=H85,hi=+v.hi,lo=+v.lo,tol=+v.tol,s=500,Y=88,yh=Y-hi*s,yl=Y-lo*s,fl=hi-lo,ok=fl<=tol+1e-12,col=H85.ok(ok);
 const K=[[40,0],[105,lo],[155,.35*hi+.2*lo],[205,hi],[280,.25*lo]],pts=[];for(let i=0;i<K.length-1;i++){const [x0,a]=K[i],[x1,b]=K[i+1];for(let j=0;j<=12;j++){const u=j/12;pts.push([x0+(x1-x0)*u,Y-(a+(b-a)*(1-Math.cos(Math.PI*u))/2)*s])}}
 let g=r(40,yl-tol*s,240,tol*s,col,.14,0)+l(40,yl-tol*s,280,yl-tol*s,col,1,"4 3")+l(40,yh,280,yh,"var(--orange)",1,"3 3")+l(40,yl,280,yl,"var(--orange)",1,"3 3");
 g+=`<g stroke="none">${p(pts.concat([[280,150],[40,150]]),"var(--fa)",0,true,.25).replace(/stroke="[^"]*"/,'stroke="none"')}</g>`+p(pts,"var(--tx)",1.8);
 g+=t(280,Math.max(12,yh-5),"flatness "+H85.n(fl,3),"end","var(--orange)",10)+t(40,Math.max(14,yl-tol*s-6),"zone "+H85.n(tol,3),"start",col,10)+t(160,170,ok?"fits the zone":"too wavy for the zone","middle",col);
 return svg(178,g)});
pic85("gdt-form-3",v=>{const {p,c,t,svg}=H85,z=+v.z,dev=+v.dev,s=60,Y=110,f=x=>Y-48*Math.sin(Math.PI*(x-40)/240),N=[],U=[],D=[];for(let x=40;x<=280;x+=8){N.push([x,f(x)]);U.push([x,f(x)-z/2*s]);D.push([x,f(x)+z/2*s])}
 const ok=Math.abs(dev)<=z/2+1e-12,col=H85.ok(ok),px=205,py=f(px)-dev*s;let g=p(U.concat(D.slice().reverse()),col,0,true,.15).replace(/stroke-width="0"/,'stroke-width="0" stroke="none"')+p(U,col,1,false,0,"4 3")+p(D,col,1,false,0,"4 3")+p(N,"var(--fa)",1.4,false,0,"6 3");
 g+=c(px,py,4.5,"var(--orange)","var(--orange)")+t(px+8,py-6,"measured "+H85.n(dev,2),"start","var(--orange)",10)+t(40,148,"zone "+H85.n(z,2)+" wide, ±"+H85.n(z/2,3)+" each side","start",col,10)+t(160,168,ok?"inside the profile zone":"outside the profile zone","middle",col);
 return svg(176,g)});

/* ---------- materials ---------- */
pic85("mat-basics-1",v=>{const {r,l,t,svg}=H85,F=+v.F,A=+v.A,L=+v.L,M=[["Steel",200000],["Titanium",110000],["Aluminum",70000]];let g=l(30,22,290,22,"var(--mu)",2);
 M.forEach(([nm,E],i)=>{const x=80+i*80,d=F*1000*L/(A*E),px=40*70000/E;g+=l(x-14,72,x+14,72,"var(--fa)",1,"3 3")+r(x-7,22,14,50+px,"var(--blue)",.2)+r(x-14,72+px,28,16,"var(--mu)",.25,1)+t(x,72+px+12,"F","middle","var(--tx)",9);
  g+=t(x,150,nm,"middle")+t(x,165,H85.n(d,3)+" mm","middle","var(--orange)")});
 g+=t(160,14,"same stress σ = "+H85.n(F*1000/A,1)+" MPa, so the stiffer metal stretches less","middle","var(--mu)",9.5);
 return svg(172,g)});
pic85("mat-basics-3",v=>{const {r,t,svg}=H85,m=+v.m>0,M=[["Steel",200,7.85],["Titanium",110,4.43],["Aluminum",70,2.7],["Magnesium",45,1.74],["CFRP",140,1.6]],k=([,E,rho])=>m?Math.sqrt(E)/rho:E/rho,ks=k(M[0]);let g="";
 M.forEach((q,i)=>{const mass=ks/k(q),side=52*Math.sqrt(mass),x=36+i*62;g+=r(x-side/2,92-side,side,side,i==0?"var(--mu)":"var(--blue)",.25)+t(x,110,q[0],"middle","var(--tx)",9.5)+t(x,124,H85.n(mass,2)+" kg","middle","var(--orange)",10)});
 g+=t(160,16,m?"Mass for the same bending stiffness (√E/ρ)":"Mass for the same pulling stiffness (E/ρ)","middle","var(--mu)",10)+t(160,146,"per 1 kg of steel doing the same job","middle","var(--mu)",9.5);
 return svg(154,g)},pills85(["m"],[[[0,"Pulling (E/ρ)"],[1,"Bending (√E/ρ)"]]]));

/* ---------- civil ---------- */
pic85("civil-struct-1",v=>{const {r,l,a,t,dim,p,svg}=H85,q=+v.q,s=+v.s,L=+v.L,kL=15,ks=5,x0=(320-L*kL)/2,x1=x0+L*kL,ym=40;let g="";
 g+=r(x0,ym-s*ks,L*kL,s*ks*2,"var(--fa)",.06,1)+r(x0,ym-s*ks/2,L*kL,s*ks,"var(--orange)",.22,0);[-1,0,1].forEach(j=>g+=l(x0,ym+j*s*ks,x1,ym+j*s*ks,j?"var(--mu)":"var(--orange)",j?1.4:2.4));
 g+=t(x1+6,ym+4,"s = "+s+" m","start","var(--mu)",9.5)+t(x0-4,ym+4,"plan","end","var(--fa)",9);
 const yb=134,w=q*s,al=Math.min(34,6+w);g+=l(x0,yb,x1,yb,"var(--tx)",3)+p([[x0,yb],[x0-6,yb+10],[x0+6,yb+10]],"var(--mu)",1.2,true,.3)+p([[x1,yb],[x1-6,yb+10],[x1+6,yb+10]],"var(--mu)",1.2,true,.3);
 for(let i=0;i<=8;i++){const x=x0+(x1-x0)*i/8;g+=a(x,yb-al-2,x,yb-2,"var(--orange)",1.3)}g+=l(x0,yb-al-2,x1,yb-al-2,"var(--orange)",1.3);
 g+=t(160,yb-al-8,"w = q·s = "+H85.n(w,1)+" kN/m","middle","var(--orange)")+dim(x0,x1,yb+24,"L = "+L+" m","var(--mu)",true)+t(160,192,"each end carries "+H85.n(w*L/2,1)+" kN","middle","var(--mu)");
 return svg(198,g)});
pic85("civil-struct-4",v=>{const {r,l,t,svg}=H85,D=+v.D,Lv=+v.Lv,C=[["1.4D",1.4,0],["1.2D+1.6L",1.2,1.6],["1.2D+0.5L",1.2,.5],["0.9D",.9,0]],tot=C.map(c=>c[1]*D+c[2]*Lv),mx=Math.max(...tot),gi=tot.indexOf(Math.max(...tot.slice(0,2))),sc=100/Math.max(1,mx);let g="";
 C.forEach((c,i)=>{const x=20+i*76,hd=c[1]*D*sc,hl=c[2]*Lv*sc,y0=130,gov=i==gi;g+=r(x+8,y0-hd,52,hd,"var(--mu)",.3,1)+(hl>0?r(x+8,y0-hd-hl,52,hl,"var(--orange)",.3,1):"")+l(x,y0,x+68,y0,gov?"var(--orange)":"var(--tx)",gov?3:2);
  g+=t(x+34,146,c[0],"middle",gov?"var(--orange)":"var(--tx)",9.5)+t(x+34,y0-hd-hl-5,H85.n(tot[i],1),"middle",gov?"var(--orange)":"var(--mu)",9.5)});
 g+=r(20,6,10,8,"var(--mu)",.3,1)+t(34,14,"dead","start","var(--mu)",9)+r(76,6,10,8,"var(--orange)",.3,1)+t(90,14,"live","start","var(--mu)",9)+t(300,14,"governs: "+C[gi][0],"end","var(--orange)",9.5);
 return svg(156,g)});

/* ---------- circuits ---------- */
pic85("elec-circuits-1",v=>{const {l,t,svg}=H85,R1=+v.R1,R2=+v.R2,zz=(x,y,len,vert)=>{const n=6,a=5,pts=[[x,y]];for(let i=0;i<n;i++){const u=(i+.5)/n*len;pts.push(vert?[x+(i%2?-a:a),y+u]:[x+u,y+(i%2?-a:a)])}pts.push(vert?[x,y+len]:[x+len,y]);return H85.p(pts,"var(--blue)",1.6)};
 let g=l(14,60,34,60)+zz(34,60,40)+l(74,60,86,60)+zz(86,60,40)+l(126,60,146,60)+t(54,48,R1+" Ω","middle","var(--tx)",9.5)+t(106,48,R2+" Ω","middle","var(--tx)",9.5)+t(80,100,"series","middle","var(--mu)")+t(80,118,"= "+H85.n(R1+R2,0)+" Ω","middle","var(--orange)");
 g+=l(176,60,196,60)+l(196,30,196,90)+l(196,30,216,30)+zz(216,30,40)+l(256,30,276,30)+l(196,90,216,90)+zz(216,90,40)+l(256,90,276,90)+l(276,30,276,90)+l(276,60,300,60)+t(236,18,R1+" Ω","middle","var(--tx)",9.5)+t(236,112,R2+" Ω","middle","var(--tx)",9.5)+t(236,132,"parallel","middle","var(--mu)")+t(236,150,"= "+H85.n(R1*R2/(R1+R2),1)+" Ω","middle","var(--orange)");
 return svg(158,g)});

inst85();
try{const _bu85=build;build=function(){const r=_bu85.apply(this,arguments);try{inst85()}catch(e){}return r}}catch(e){}
try{[
 {b:"b85",k:"bd85",t:"Bar demos → pictures (13)",c:"Parametric holes, sketch DOF, circle freedoms, symmetric holes, 3-2-1 datums, position, flatness, profile, stretched bars, stiffness per kg, tributary load, load combos, series/parallel.",go:["lab","cad-modeling-4"]},
 {b:"b85",k:"dt85",t:"Datums picture",c:"Slide datums 0→3: contact points light up and the six motions grey out.",go:["lab","gdt-datums-1"]},
 {b:"b85",k:"ps85",t:"Position zone picture",c:"Push dx up: the hole centre leaves the green zone and it turns red, reject.",go:["lab","gdt-datums-2"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

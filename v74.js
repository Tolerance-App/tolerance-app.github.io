/* ===== v74 (2026-11-21): demo rebuilds from Seth's b71 flags =====
   1. design1 "Stress concentration at a fillet" (kt) rebuilt: a stepped bar drawn to its real D/d = 1.2 with the
      actual fillet arc, coloured by stress (blue low → red high, fixed 0–500 MPa scale with a key), and the
      original Kt-vs-r/d curve kept as an inset with its marker. Same sliders, same Kt fit 1 + 0.2/√(r/d), same
      readouts. A sharp radius shows a small, hot red spot; a generous one spreads it out and cools it.
   2. case-bracket (obracket): the radius was drawn as a small circle off the corner, and the non-square view made
      it an ellipse. Now the L-bracket's inside corner has a real fillet arc, the same stress colouring, and the
      r label sits beside it. Same Kt = 1 + 2√(d/r), same fatigue readouts.
   3. calc1-functions-1: two more rules to try, f(x) = 3 sin(2x) and f(x) = |x| − 2. */
try{FB.ver="b74"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Rebuilt fillet demos: the corner is drawn properly and coloured by stress, so you can watch the hot spot grow as the radius shrinks.","Functions demo: try a sine wave and a V shape."]})}catch(e){}

/* stress colour: 0 → blue, 0.5 → yellow-green, 1 → red */
function sc74(t){t=Math.max(0,Math.min(1,t));const S=[[0,[59,139,255]],[.35,[46,196,160]],[.6,[236,206,60]],[.8,[255,138,31]],[1,[232,59,59]]];
 for(let i=1;i<S.length;i++)if(t<=S[i][0]){const[a,ca]=S[i-1],[b,cb]=S[i],f=(t-a)/(b-a);return`rgb(${ca.map((c,j)=>Math.round(c+(cb[j]-c)*f)).join(",")})`}return"rgb(232,59,59)"}
function key74(x,y,w,smax){let g=`<defs><linearGradient id="k74" x1="0" x2="1">${[0,.25,.5,.75,1].map(t=>`<stop offset="${t}" stop-color="${sc74(t)}"/>`).join("")}</linearGradient></defs>`;
 return g+`<g stroke="none"><rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="url(#k74)"/></g>`+T(x,y+18,"0","start")+T(x+w,y+18,smax+" MPa","end")+T(x+w/2,y+18,"stress","middle")}
/* hot spot: radial gradient from the peak colour to the nominal colour, clipped to the part */
function hot74(id,cx,cy,R,pk,nom,smax,clip){return`<defs><radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${R}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${sc74(pk/smax)}"/><stop offset=".45" stop-color="${sc74((pk*.55+nom*.45)/smax)}"/><stop offset="1" stop-color="${sc74(nom/smax)}" stop-opacity="0"/></radialGradient></defs><g stroke="none" clip-path="url(#${clip})"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${id})"/></g>`}
const f74=(n,d)=>{const a=Math.abs(n);return a>=100?n.toFixed(0):a>=10?n.toFixed(1):n.toFixed(d==null?2:d)};

/* ---- 1. kt ---- */
try{const D0=DEMOS.kt;DEMOS.kt={t:"Stress concentration at a fillet",hint:D0&&D0.hint||"",
 ui:()=>slider("r","Fillet radius r",0.2,8,0.1,1)+slider("d","Small diameter d",10,60,1,25)+slider("Sn","Nominal stress",20,300,5,100),
 ro:()=>rof([["r/d","a"],["Kt","b"],["Peak stress","c"]]),
 run(v){const r=+v.r,d=+v.d,Sn=+v.Sn,rd=r/d,Kt=1+0.2/Math.sqrt(rd),pk=Sn*Kt,SM=500;
  /* side view of a stepped bar, D = 1.2 d; small section 100 px tall */
  const y0=118,hd=50,hD=60,xs=120,X0=12,X1=308,rp=Math.max(1.2,Math.min(rd*100,40));
  const cyT=y0-hd-rp,cxT=xs+rp,yT0=y0-hD,dyT=cyT-yT0,xT=dyT>=0?xs:cxT-Math.sqrt(rp*rp-dyT*dyT);
  const cyB=y0+hd+rp,yB0=y0+hD,xB=dyT>=0?xs:xT;
  const top=dyT>=0?`L${xs},${yT0} L${xs},${cyT.toFixed(1)} A${rp} ${rp} 0 0 0 ${cxT.toFixed(1)},${y0-hd}`:`L${xT.toFixed(1)},${yT0} A${rp} ${rp} 0 0 0 ${cxT.toFixed(1)},${y0-hd}`;
  const bot=dyT>=0?`L${cxT.toFixed(1)},${y0+hd} A${rp} ${rp} 0 0 0 ${xs},${cyB.toFixed(1)} L${xs},${yB0}`:`L${cxT.toFixed(1)},${y0+hd} A${rp} ${rp} 0 0 0 ${xB.toFixed(1)},${yB0}`;
  const path=`M${X0},${yT0} ${top} L${X1},${y0-hd} L${X1},${y0+hd} ${bot} L${X0},${yB0} Z`;
  const nomS=Sn,nomL=Sn/Math.pow(1.2,3),R=Math.max(14,rp*2.2+10),a=Math.PI/4;
  const hx=cxT-rp*Math.cos(a),hyT=cyT+rp*Math.sin(a),hyB=cyB-rp*Math.sin(a);
  let g=`<defs><clipPath id="c74"><path d="${path}"/></clipPath><linearGradient id="b74" x1="0" x2="1"><stop offset="0" stop-color="${sc74(nomL/SM)}"/><stop offset="${(xs-X0)/(X1-X0)}" stop-color="${sc74(nomL/SM)}"/><stop offset="${Math.min(1,(xs+30-X0)/(X1-X0))}" stop-color="${sc74(nomS/SM)}"/><stop offset="1" stop-color="${sc74(nomS/SM)}"/></linearGradient></defs>`;
  g+=`<g stroke="none" opacity=".85"><path d="${path}" fill="url(#b74)"/></g>`;
  /* bending: highest at the top and bottom surfaces, zero on the centreline */
  g+=`<defs><linearGradient id="n74" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--s1)" stop-opacity="0"/><stop offset=".5" stop-color="var(--s1)" stop-opacity=".75"/><stop offset="1" stop-color="var(--s1)" stop-opacity="0"/></linearGradient></defs><g stroke="none" clip-path="url(#c74)"><rect x="${X0}" y="${yT0}" width="${X1-X0}" height="${2*hD}" fill="url(#n74)"/></g>`;
  g+=hot74("h74a",hx,hyT,R,pk,nomS,SM,"c74")+hot74("h74b",hx,hyB,R,pk,nomS,SM,"c74");
  g+=`<path d="${path}" fill="none" stroke="var(--tx)" stroke-width="1.4" opacity=".8"/><path d="M${X0} ${y0}H${X1}" stroke="var(--fa)" stroke-width=".8" stroke-dasharray="5 4" fill="none"/>`;
  g+=T(X0+40,y0-12,"D = 1.2d","middle")+T(X1-44,y0-12,"d = "+d+" mm","middle");
  g+=T(Math.min(X1-4,cxT+8),y0-hd-8,"r = "+r.toFixed(1)+" mm","start");
  /* inset: Kt against r/d, the original curve and marker */
  const ix=200,iy=186,iw=104,ih=30,xr=[0.01,0.3],kt=x=>1+0.2/Math.sqrt(x),ky=k=>iy+ih-(k-1)/(3-1)*ih,kx=x=>ix+(x-xr[0])/(xr[1]-xr[0])*iw;
  let pl="";for(let i=0;i<=40;i++){const x=xr[0]+(xr[1]-xr[0])*i/40;pl+=(i?"L":"M")+kx(x).toFixed(1)+","+Math.max(iy,ky(kt(x))).toFixed(1)}
  const mx=kx(Math.max(xr[0],Math.min(xr[1],rd))),my=Math.max(iy,Math.min(iy+ih,ky(Kt)));
  g+=`<path d="M${ix},${iy}V${iy+ih}H${ix+iw}" fill="none" stroke="var(--line)"/><path d="${pl}" fill="none" stroke="var(--blue)" stroke-width="1.6"/><circle cx="${mx}" cy="${my}" r="3.5" fill="var(--orange)" stroke="none"/>`;
  g+=T(ix-4,iy+8,"Kt","end")+T(ix+iw,iy+ih+13,"r/d","end");
  g+=key74(16,198,150,SM);
  return{svg:`<svg viewBox="0 0 320 236">${g}</svg>`,lab:{r:r.toFixed(1)+" mm",d:d+" mm",Sn:Sn+" MPa"},out:{a:rd.toFixed(3),b:Kt.toFixed(2),c:f74(pk)+" MPa"}}}}}catch(e){}

/* ---- 2. obracket ---- */
try{const D0=DEMOS.obracket;DEMOS.obracket={t:"A sharp corner multiplies stress",hint:D0&&D0.hint||"",
 ui:()=>slider("r","Corner radius r",0.1,5,0.05,0.3)+slider("d","Notch depth d",1,10,0.5,4)+slider("sn","Nominal alternating stress",10,80,1,40),
 ro:()=>rof([["Kt","a"],["Peak alternating stress","b"],["6061-T6 fatigue strength (5×10⁸ cycles)","c"],["Fatigue","e"]]),
 run(v){const r=+v.r,d=+v.d,sn=+v.sn,Kt=1+2*Math.sqrt(d/r),pk=Kt*sn,SM=200,lim=96;
  const xc=200,yc=120,rp=Math.max(1.5,r*11),L=16,R=304,T0=14,B=176;
  const path=`M${L},${B} L${R},${B} L${R},${T0} L${xc},${T0} L${xc},${(yc-rp).toFixed(1)} A${rp} ${rp} 0 0 1 ${(xc-rp).toFixed(1)},${yc} L${L},${yc} Z`;
  const a=Math.PI/4,hx=xc-rp+rp*Math.cos(a),hy=yc-rp+rp*Math.sin(a),Rh=Math.max(16,rp*2+14);
  let g=`<defs><clipPath id="c74b"><path d="${path}"/></clipPath></defs><g stroke="none" opacity=".85"><path d="${path}" fill="${sc74(sn/SM)}"/></g>`;
  g+=hot74("h74c",hx,hy,Rh,pk,sn,SM,"c74b");
  g+=`<path d="${path}" fill="none" stroke="var(--tx)" stroke-width="1.4" opacity=".8"/>`;
  /* r label up and left of the fillet, with a short leader to the arc */
  const lx=xc-rp-28,ly=Math.max(72,yc-rp-26);g+=`<path d="M${(lx+6).toFixed(1)} ${(ly+4).toFixed(1)}L${(hx-2).toFixed(1)} ${(hy-2).toFixed(1)}" stroke="var(--fa)" stroke-width="1" fill="none"/>`+T(lx+4,ly,"r = "+r.toFixed(2)+" mm","end");
  g+=T(24,36,"Kt ≈ "+Kt.toFixed(2),"start")+T(24,56,"peak ≈ "+f74(pk)+" MPa","start");
  g+=key74(16,192,150,SM);
  const ok=pk<=lim;
  return{svg:`<svg viewBox="0 0 320 222">${g}</svg>`,lab:{r:r.toFixed(2)+" mm",d:d+" mm",sn:sn+" MPa"},out:{a:Kt.toFixed(2),b:f74(pk)+" MPa",c:"96 MPa",e:ok?"below the limit":"above: expect cracking"}}}}}catch(e){}

/* ---- 3. functions demo: two more rules ---- */
try{reg17("c1func",{lessons:["calc1-functions-1"],title:"Input in, output out",hint:"Slide the input. Find x on the horizontal axis, go to the curve, and read its height: that is f(x). Every input gets exactly one output, even for a wave or a V.",
 choices:[{k:"c",label:"Rule",opts:[[0,"2x + 1"],[1,"x² − 4"],[2,"3 sin(2x)"],[3,"|x| − 2"]],value:0}],sliders:[sl17("a","Input x",-3,3,.1,1)],view:[-3.5,3.5,-5,8],xl:"x",
 defs:[["w0","max(0,1-abs(c))"],["w1","max(0,1-abs(c-1))"],["w2","max(0,1-abs(c-2))"],["w3","max(0,1-abs(c-3))"]],
 layers:[{t:"fn",f:"w0*(2*x+1)+w1*(x^2-4)+w2*3*sin(2*x)+w3*(abs(x)-2)"},{t:"vline",x:"a",c:"fa",w:1,dash:true},{t:"pt",x:"a",y:"w0*(2*a+1)+w1*(a^2-4)+w2*3*sin(2*a)+w3*(abs(a)-2)",c:"orange",l:"f(x)"}],
 readouts:[ro17("Input x","a"),ro17("Output f(x)","w0*(2*a+1)+w1*(a^2-4)+w2*3*sin(2*a)+w3*(abs(a)-2)")]})}catch(e){}

try{[
 {b:"b74",k:"kt74",t:"Fillet stress demo rebuilt",c:"Shrink r: the red spot at the fillet gets smaller and hotter. Grow r: it spreads out and cools. Inset curve marker moves.",go:["lab","design1"]},
 {b:"b74",k:"ob74",t:"Cracked bracket corner",c:"Real fillet arc in the inside corner (round, not an ellipse), r label beside it, colour by stress.",go:["lab","case-bracket"]},
 {b:"b74",k:"fn74",t:"Functions demo rules",c:"Rule pills include 3 sin(2x) and |x| − 2.",go:["lab","calc1-functions-1"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

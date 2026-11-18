/* ===== v54 (2026-11-18): rocket landing, the fuel-optimal landing burn =====
   New model in the Computational Methods set (no lesson yet): "cmLand54".
   A booster falls toward its pad. Decision: when to light the engine and how hard to throttle. Objective: burn
   the least propellant. Constraints: throttle 40–100% (at 40% thrust is still 1.2× its weight, so it cannot
   hover), touch down at 0 m/s, 3,200 kg of propellant on board, and the engine can't be lit before the start.
   Three modes:
     You fly    – both sliders are yours; you see crash / stopped in mid-air / landed.
     Solver     – bisection finds the ignition altitude that lands at exactly 0 m/s for your throttle
                  (the constraint); its probes are drawn on the search-space map.
     Optimizer  – golden-section search over throttle, each try calling the solver; then the end points are
                  checked. It ends on the boundary: 100% throttle, lit as late as possible.
   Pictures: the pad with the rocket falling and burning (animated, 2× speed), altitude vs falling speed
   (free-fall curve, braking curve, the flight), and the search-space map: throttle × ignition altitude, split
   by the soft-landing curve into "crash" and "stops in mid-air", the curve dashed where it needs more
   propellant than is on board.
   Model: 1D vertical, flat Earth, g = 9.80665 m/s², no drag, constant thrust once lit. Dry mass 25,000 kg,
   propellant 3,200 kg, 845 kN at 100%, Isp 282 s (sea level). With constant thrust from full mass the flight
   has a closed form: v(t) = vᵢ + c·ln(m₀/m) − g·t and h(t) = hᵢ + vᵢt − gt²/2 + c·(t + (m/ṁ)·ln(m/m₀)),
   c = Isp·g₀, m = m₀ − ṁt. Checked against a 0.01 s numerical integration (scratch prototype). */
try{FB.ver="b54"}catch(e){}
const RL54={g:9.80665,T:845e3,c:282*9.80665,dry:25000,prop:3200,h0:1500,umin:40};
const n54=x=>Math.round(x).toLocaleString("en-US");

/* One flight: coast from h0 falling at v0, light at altitude hi with throttle u (0–1), burn until stopped,
   touched down or out of propellant (prop = Infinity ignores the tank). */
function land54(u,hi,v0,prop){const {g,T,c,dry,h0}=RL54,m0=dry+RL54.prop,md=u*T/c,P=prop==null?RL54.prop:prop;hi=Math.max(0,Math.min(h0,hi));
 const vi=-Math.sqrt(v0*v0+2*g*(h0-hi)),tc=(-vi-v0)/g,tb=Math.min(P/md,.9*m0/md);
 const V=t=>vi+c*Math.log(m0/(m0-md*t))-g*t,H=t=>{const M=m0-md*t;return hi+vi*t-g*t*t/2+c*(t+M/md*Math.log(M/m0))};
 const bis=(f,a,b)=>{for(let k=0;k<50;k++){const m=(a+b)/2;if(f(m)<0)a=m;else b=m}return (a+b)/2};
 const stops=V(tb)>=0,ts=stops?bis(V,0,tb):tb;let r;
 if(H(ts)<=0){const th=bis(t=>-H(t),0,ts);r={kind:"hit",te:th,vtd:-V(th),hs:0}}
 else if(stops)r={kind:"stop",te:ts,vtd:0,hs:H(ts)};
 else{const vb=-V(tb),hb=H(tb),vf=Math.sqrt(vb*vb+2*g*hb);r={kind:"dry",te:tb,vtd:vf,hs:0,tf:(vf-vb)/g,vb,hb}}
 r.fuel=md*r.te;r.tc=tc;r.hi=hi;r.vi=-vi;r.u=u;r.ok=(r.kind=="hit"&&r.vtd<=2)||(r.kind=="stop"&&r.hs<=1);
 /* state at time t from the start: [altitude, falling speed] */
 r.at=t=>{if(t<=tc)return [h0-v0*t-g*t*t/2,v0+g*t];const s=t-tc;
  if(s<=r.te)return [Math.max(0,H(s)),Math.max(0,-V(s))];
  if(r.kind=="dry"){const q=Math.min(s-r.te,r.tf);return [Math.max(0,r.hb-r.vb*q-g*q*q/2),r.vb+g*q]}
  return r.kind=="stop"?[r.hs,0]:[0,r.vtd]};
 r.tot=tc+r.te+(r.kind=="dry"?r.tf:0);return r}
/* the constraint: how far above (+, stops in the air) or below (−, crash speed) a soft landing is */
const miss54=(u,hi,v0)=>{const r=land54(u,hi,v0,Infinity);return r.kind=="stop"?r.hs:-r.vtd};
/* bisection on the ignition altitude; returns the probes too. null if even lighting at the start crashes */
function solve54(u,v0,keep){const P=[];if(miss54(u,RL54.h0,v0)<0)return null;let a=0,b=RL54.h0;
 for(let k=0;k<40;k++){const m=(a+b)/2,f=miss54(u,m,v0);if(keep&&k<12)P.push([m,f]);if(f<0)a=m;else b=m}return {h:b,probes:P}}
/* the soft-landing curve over throttle 40–100%, for one start speed (cached) */
const CV54={};
function curve54(v0){const k=String(v0);if(CV54[k])return CV54[k];const out=[];
 for(let p=RL54.umin;p<=100;p++){const s=solve54(p/100,v0);out.push({p,h:s?s.h:null,fuel:s?land54(p/100,s.h,v0,Infinity).fuel:null})}
 return CV54[k]=out}
/* outer loop: golden-section search on throttle; each evaluation runs the bisection solver */
function opt54(v0){const C=curve54(v0),F=C.filter(z=>z.h!=null);if(!F.length)return null;
 const f=p=>{const s=solve54(p/100,v0);return s?land54(p/100,s.h,v0,Infinity).fuel:Infinity},tries=[];
 let a=F[0].p,b=100;const q=(Math.sqrt(5)-1)/2;let x1=b-q*(b-a),x2=a+q*(b-a),f1=f(x1),f2=f(x2);tries.push([x1,f1],[x2,f2]);
 for(let k=0;k<8;k++){if(f1<=f2){b=x2;x2=x1;f2=f1;x1=b-q*(b-a);f1=f(x1);tries.push([x1,f1])}else{a=x1;x1=x2;f1=f2;x2=a+q*(b-a);f2=f(x2);tries.push([x2,f2])}}
 [F[0].p,100].forEach(p=>tries.push([p,f(p)]));/* the minimum can sit on a bound: check the end points */
 const best=tries.reduce((m,z)=>z[1]<m[1]?z:m);return {p:best[0],fuel:best[1],tries:tries.slice(0,-2).map(([p])=>[p,solve54(p/100,v0).h])}}

try{const T54=(x,y,s,a="start",c="var(--mu)",w=600,fs=8.5)=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${a}" style="fill:${c};font-size:${fs}px;font-weight:${w}">${s}</text>`;
 const ln=(x1,y1,x2,y2,c,w=1,da)=>`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${c}" stroke-width="${w}" fill="none"${da?` stroke-dasharray="${da}"`:""}/>`;
 const pl=(pts,c,w,da,op)=>pts.length<2?"":`<path d="${pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join("")}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linejoin="round"${da?` stroke-dasharray="${da}"`:""}${op?` opacity="${op}"`:""}/>`;
 DEMOS.cmLand54={t:"Rocket landing: the fuel-optimal burn",
 hint:"Minimize the propellant burned. You choose when to light the engine and how hard to throttle. Constraints: throttle between 40% and 100% (even at 40% the thrust is 1.2× the weight, so it can't hover and wait), touch down at 0 m/s, and only 3,200 kg of propellant on board. Fly it by hand, let a bisection solver find the ignition altitude that lands at exactly 0 m/s for your throttle, or let an optimizer pick the throttle too: a golden-section search where every try runs the solver (the solver ignores your ignition slider; the optimizer ignores both). The answer sits on a bound: full throttle, lit as late as possible. Each second of burning costs 9.81 m/s of speed just holding up against gravity, so the shortest burn wastes the least. Real guidance keeps some throttle in reserve to correct errors. Model: 1D vertical, no drag, 25 t booster, 845 kN, Isp 282 s.",
 ui:()=>pickc("k","Who decides",[["0","You fly"],["1","Solver"],["2","Optimizer"]],"0")+slider("u","Throttle during the burn (%)",40,100,1,70)+slider("hi","Light the engine at (m)",0,1500,5,1150)+slider("v0","Falling speed at 1,500 m (m/s)",80,220,5,150),
 ro:()=>rof([["Touchdown","a"],["Propellant used","b"],["Burn time","c"],["Engine lit at","d"]]),
 run(v){const {g,T,dry,prop,h0}=RL54,m0=dry+prop,mode=["fly","solve","opt"][+v.k|0]||"fly",v0=+v.v0;let u=+v.u/100,hi=+v.hi,head="",sub="",hc="var(--tx)";
  const C=curve54(v0),O=mode=="opt"?opt54(v0):null,S=mode=="solve"?solve54(u,v0,true):null;
  if(mode=="opt"&&O){u=O.p/100;hi=solve54(u,v0).h}else if(mode=="solve"&&S)hi=S.h;else if(mode!="fly")hi=h0;
  const R=land54(u,hi,v0),need=mode!="fly"&&(mode=="opt"?O:S)?land54(u,hi,v0,Infinity).fuel:null;
  /* headline */
  const out=R.ok?`Landed at ${R.kind=="stop"?"0.0":R.vtd.toFixed(1)} m/s with ${n54(R.fuel)} kg`:R.kind=="hit"?`Crashed at ${n54(R.vtd)} m/s: lit too late`:R.kind=="stop"?`Stopped ${n54(R.hs)} m up: lit too early`:`Out of propellant ${n54(R.hb)} m up: crashed`;
  if(mode=="fly"){head=out;hc=R.ok?"var(--ok)":R.kind=="stop"?"var(--orange)":"var(--bad)";sub=`Thrust is ${(u*T/(m0*g)).toFixed(1)}× its weight: it can't hover, so time it exactly`}
  else if(mode=="solve"){if(!S){head=`No ignition altitude works at ${n54(u*100)}%`;hc="var(--bad)";sub="Too little thrust to stop within 1,500 m"}
   else if(need>prop+.5){head=`Needs ${n54(need)} kg: only ${n54(prop)} kg on board`;hc="var(--bad)";sub="Bisection found the altitude, but the tank can't do it"}
   else{head=`Solver: light at ${n54(hi)} m, uses ${n54(R.fuel)} kg`;hc="var(--ok)";sub="Bisection: each try crashes or stops high; halve the gap"}}
  else{if(!O){head="No plan lands: too fast to stop in 1,500 m";hc="var(--bad)";sub="The feasible set is empty"}
   else if(need>prop+.5){head=`No plan lands: the best needs ${n54(need)} kg`;hc="var(--bad)";sub=`Only ${n54(prop)} kg on board: the feasible set is empty`}
   else{head=`Optimum: ${n54(O.p)}% throttle, light at ${n54(hi)} m`;hc="var(--ok)";sub=`Least propellant: ${n54(R.fuel)} kg. Golden section, then check the ends`}}
  let g0=T54(6,11,head,"start",hc,700,10)+T54(6,23,sub,"start","var(--mu)",500,8.5);
  /* --- scene: pad and rocket --- */
  const Yh=h=>166-h/h0*124;
  g0+=`<rect x="4" y="30" width="86" height="146" rx="8" fill="var(--s2)"/><rect x="4" y="166" width="86" height="10" fill="var(--s3)"/><rect x="33" y="164.5" width="30" height="2.5" rx="1" fill="var(--fa)"/>`;
  const yi=Yh(hi);if(R.tc>=0&&hi>0)g0+=ln(8,yi,86,yi,"var(--orange)",1.2,"4 3")+T54(86,yi-3,"light "+n54(hi)+" m","end","var(--orange)",600,8);
  const mo=!RM50(),N=90,tot=Math.max(R.tot,.1),Dp=tot/2,D=Dp+1.8,f=Dp/D,kt=[...Array(N+1)].map((_,i)=>(f*i/N).toFixed(4)).concat(["1"]);
  const st=[...Array(N+1)].map((_,i)=>R.at(tot*i/N)),hEnd=st[N][0],y0=Yh(h0),y1=Yh(hEnd);
  const flame=`<path d="M-2.6 0L0 ${(5+13*u).toFixed(1)}L2.6 0Z" fill="var(--orange)"/>`;
  const ign=Math.min(1,R.tc/tot)*f,off=Math.min(1,(R.tc+R.te)/tot)*f;
  const flameA=mo?(ign<=0?`<g opacity="1"><animate attributeName="opacity" values="1;0" keyTimes="0;${off.toFixed(4)}" calcMode="discrete" dur="${D}s" repeatCount="indefinite"/>${flame}</g>`
    :`<g opacity="0"><animate attributeName="opacity" values="0;1;0" keyTimes="0;${ign.toFixed(4)};${Math.max(off,ign+1e-4).toFixed(4)}" calcMode="discrete" dur="${D}s" repeatCount="indefinite"/>${flame}</g>`):"";
  const rocket=`<path d="M-3.5 -24H3.5V-2H-3.5Z" fill="var(--tx)"/><path d="M-3.5 -24L0 -30L3.5 -24Z" fill="var(--tx)"/><path d="M-3.5 -5L-7.5 0M3.5 -5L7.5 0" stroke="var(--tx)" stroke-width="1.3"/>`+flameA;
  if(mo&&y1-y0>.5){const kp=st.map(s=>((h0-s[0])/(h0-hEnd)).toFixed(4));kp.push(kp[N]);
   g0+=`<g>${rocket}<animateMotion path="M48 ${y0.toFixed(1)}L48 ${y1.toFixed(1)}" keyPoints="${kp.join(";")}" keyTimes="${kt.join(";")}" calcMode="linear" dur="${D}s" repeatCount="indefinite"/></g>`}
  else g0+=`<g transform="translate(48 ${y1.toFixed(1)})">${rocket}</g>`;
  if(!R.ok&&R.kind!="stop"){const burst=`<circle cx="48" cy="164" r="9" fill="var(--bad)" opacity=".55"/><circle cx="48" cy="164" r="5" fill="var(--orange)"/>`;
   g0+=mo?`<g opacity="0"><animate attributeName="opacity" values="0;1" keyTimes="0;${f.toFixed(4)}" calcMode="discrete" dur="${D}s" repeatCount="indefinite"/>${burst}</g>`:burst}
  /* --- altitude vs falling speed --- */
  const Xv=s=>120+Math.min(300,s)/300*172;
  g0+=T54(116,36,"altitude (m)","end");
  [0,500,1000,1500].forEach(h=>{g0+=ln(120,Yh(h),292,Yh(h),"var(--line)",1)+T54(116,Yh(h)+3,n54(h),"end")});
  [100,200,300].forEach(s=>g0+=ln(Xv(s),42,Xv(s),166,"var(--line)",1));
  g0+=ln(120,42,120,166,"var(--line)",1);
  [0,100,200,300].forEach(s=>g0+=T54(Xv(s),176,s,s==300?"end":"middle"));
  g0+=T54(292,187,"falling speed (m/s)","end");
  const vff=Math.sqrt(v0*v0+2*g*h0),ff=[];for(let i=0;i<=40;i++){const s=v0+(vff-v0)*i/40;ff.push([Xv(s),Yh(h0-(s*s-v0*v0)/(2*g))])}
  g0+=pl(ff,"var(--fa)",1.3,"4 3");
  /* braking curve: every (speed, altitude) from which a burn at this throttle, lit with full tanks, stops exactly at 0 m */
  const md=u*T/RL54.c,c=RL54.c,bc=[],bx=[];for(let i=0;i<=120;i++){const tau=i*.25,mf=m0-md*tau;if(mf<dry)break;const vi=g*tau-c*Math.log(m0/mf),hh=-vi*tau+g*tau*tau/2-c*(tau+mf/md*Math.log(mf/m0));
   if(hh>h0||-vi>300)break;(md*tau<=prop?bc:bx).push([Xv(-vi),Yh(hh)])}
  if(bx.length&&bc.length)bx.unshift(bc[bc.length-1]);
  g0+=pl(bc,"var(--blue)",1.8)+pl(bx,"var(--blue)",1.4,"2 3",.7);
  const coast=[],burn=[];st.forEach((s,i)=>{const t=tot*i/N,p=[Xv(s[1]),Yh(s[0])];if(t<=R.tc)coast.push(p);else{if(!burn.length&&coast.length)burn.push(coast[coast.length-1]);burn.push(p)}});
  g0+=pl(coast,"var(--tx)",2.2)+pl(burn,"var(--orange)",2.6);
  if(mo){const P=st.map(s=>[Xv(s[1]),Yh(s[0])]),L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));const Lt=L[L.length-1]||1,kp=L.map(x=>(x/Lt).toFixed(4));kp.push(kp[N]);
   g0+=`<circle r="3.6" fill="var(--tx)" stroke="var(--s1)" stroke-width="1.5"><animateMotion path="${P.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join("")}" keyPoints="${kp.join(";")}" keyTimes="${kt.join(";")}" calcMode="linear" dur="${D}s" repeatCount="indefinite"/></circle>`}
  /* legend */
  g0+=ln(6,198,18,198,"var(--fa)",1.3,"4 3")+T54(21,201,"free fall")+ln(66,198,78,198,"var(--blue)",1.8)+T54(81,201,`braking at ${n54(u*100)}%`)+ln(158,198,164,198,"var(--tx)",2.2)+ln(164,198,170,198,"var(--orange)",2.6)+T54(173,201,"flight (orange: burning)");
  /* --- search space: throttle × ignition altitude --- */
  const Yt=232,Yb=318,Xu=p=>44+(p-40)/60*248,Yl=h=>Yb-h/h0*(Yb-Yt);
  g0+=T54(6,216,"Search space: every throttle and ignition altitude","start","var(--tx)",700,9);
  g0+=`<rect x="44" y="${Yt}" width="248" height="${Yb-Yt}" fill="var(--bad)" fill-opacity=".12"/>`;
  const F=C.filter(z=>z.h!=null);
  if(F.length){const top=[[Xu(F[0].p),Yl(h0)],[Xu(100),Yl(h0)]],cur=F.slice().reverse().map(z=>[Xu(z.p),Yl(z.h)]);
   g0+=`<path d="M${top.concat(cur).map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}Z" fill="var(--s1)"/><path d="M${top.concat(cur).map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")}Z" fill="var(--fa)" fill-opacity=".16"/>`;
   const okP=F.filter(z=>z.fuel<=prop).map(z=>[Xu(z.p),Yl(z.h)]),bad=F.filter(z=>z.fuel>prop).map(z=>[Xu(z.p),Yl(z.h)]);
   if(bad.length&&okP.length)bad.push(okP[0]);
   g0+=pl(bad,"var(--bad)",1.6,"3 3")+pl(okP,"var(--blue)",2.2);
   /* region names at the right, where both regions are widest */
   const hR=z=>(C.find(q=>q.p==z)||{}).h;if(hR(75)!=null&&Yl(hR(75))>Yt+16)g0+=T54(Xu(100)-4,Yt+10,"stops in mid-air","end","var(--mu)",600,8);
   if(Yl(hR(100))<Yb-18)g0+=T54(Xu(100)-4,Yb-5,"crash","end","var(--bad)",700,8)}
  else g0+=T54(168,(Yt+Yb)/2+3,"crash, whatever you choose","middle","var(--bad)",700,8.5);
  g0+=ln(44,Yt,44,Yb,"var(--line)",1)+ln(44,Yb,292,Yb,"var(--line)",1);
  g0+=T54(40,Yb+3,"0","end")+T54(40,Yt+3,"1,500","end")+T54(48,Yt-4,"light at (m)","start");
  [40,70,100].forEach(p=>g0+=T54(Xu(p),Yb+10,p,p==100?"end":"middle"));g0+=T54(292,Yb+21,"throttle (%)","end");
  if(mode=="solve"&&S)S.probes.forEach(([h,fm],i)=>g0+=`<circle cx="${Xu(u*100).toFixed(1)}" cy="${Yl(h).toFixed(1)}" r="${(2.8-i*.12).toFixed(2)}" fill="${fm<0?"var(--bad)":"var(--fa)"}" stroke="var(--s1)" stroke-width=".8"/>`);
  if(mode=="opt"&&O)O.tries.forEach(([p,h],i)=>g0+=`<circle cx="${Xu(p).toFixed(1)}" cy="${Yl(h).toFixed(1)}" r="2.6" fill="var(--orange)" opacity="${(.35+.65*i/O.tries.length).toFixed(2)}"/>`);
  const px=Xu(Math.max(40,Math.min(100,u*100))),py=Yl(hi);
  g0+=mode=="opt"&&O?`<path d="${[...Array(10)].map((_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?2.8:6.5;return (i?"L":"M")+(px+r*Math.cos(a)).toFixed(1)+" "+(py+r*Math.sin(a)).toFixed(1)}).join("")}Z" fill="var(--ok)" stroke="var(--s1)" stroke-width="1"/>`
   :`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="var(--tx)" stroke="var(--s1)" stroke-width="1.5"/>`;
  const td=R.ok?"0 m/s, landed":R.kind=="stop"?`stopped ${n54(R.hs)} m up`:`${n54(R.vtd)} m/s, crash`;
  return {svg:`<svg viewBox="0 0 300 342" role="img" aria-label="A booster falling to its pad, its altitude against falling speed, and the map of throttle and ignition altitude"><g stroke="none">${g0}</g></svg>`,
   lab:{u:n54(+v.u)+"%",hi:n54(+v.hi)+" m",v0:n54(v0)+" m/s"},
   out:{a:td,b:`${n54(R.fuel)} kg`,c:R.te.toFixed(1)+" s",d:n54(hi)+" m"}}}};
 XD39.push({id:"cmLand54",course:"Computational Methods",suggestedLesson:"Rocket landing: the fuel-optimal burn",spec:{title:"Solver and optimizer for a landing burn"}});
}catch(e){}

try{NEWS.unshift({d:"2026-11-18",t:["New model in Computational Methods: rocket landing. Fly the landing burn yourself, then watch a solver and an optimizer find the burn that uses the least propellant."]})}catch(e){}
try{TF48.unshift({b:"b54",k:"land54",t:"Rocket landing model",c:"Lab → Computational Methods → Rocket landing. You fly: crash, land, stop in mid-air. Solver: bisection dots close in on the curve. Optimizer: star at 100%.",go:["lab","cmLand54"]})}catch(e){}

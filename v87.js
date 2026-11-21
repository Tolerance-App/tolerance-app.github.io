/* ===== v87 (2026-11-21): last bar-chart demos become pictures, PI controller with windup =====
   1. Bar demos (3 of 3): first law (system box with heat and work arrows), constant-pressure piston (cylinder plus
      the p–V work rectangle), transmission vs propagation (sender/receiver timeline), retries with and without
      idempotency keys (two request timelines). Same sliders, readouts and ideas.
   2. ctrl-pid-1 (Seth: "showing a PID controller doing something is a better demo. Show the saturation and the
      windup. Then give us options to play around with"): a room heater under PI control. Temperature vs time, the
      setpoint, and the heater command along the bottom, red while it sits at its limit. Anti-windup is an Off/On
      pill. Same idea as before: the longer the heater is saturated, the more the integral stores, the bigger the
      overshoot; clamping the integral stops the build-up. Plant: τ dT/dt = −(T − 20 °C) + 60 °C·u, τ = 10 s,
      u from 0 to the heater limit; PI with Kp = 0.08 per °C, Euler steps of 0.05 s over 80 s. */
try{FB.ver="b87"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Integral windup demo: a heater you can watch overshoot, with anti-windup On/Off.","Every demo that was only a bar chart is now a picture."]})}catch(e){}

/* ---------- 1. last bar demos ---------- */
wrap85("firstlaw",v=>{const {r,a,t,svg}=H85,Q=+v.Q,W=+v.W,dU=Q-W,ql=8+Math.abs(Q)*.5,wl=8+Math.abs(W)*.4,col=dU>=0?"var(--orange)":"var(--blue)";let g=r(110,50,100,70,col,Math.min(.5,.12+Math.abs(dU)/400),1.6);
 g+=t(160,82,"gas","middle","var(--mu)",9.5)+t(160,100,"ΔU = "+H85.n(dU,0)+" J","middle",col);
 if(Q>=0)g+=a(108-ql,85,108,85,"var(--orange)",2.2);else g+=a(108,85,108-ql,85,"var(--orange)",2.2);g+=t(100-Math.min(ql,60)/2,74,(Q>=0?"heat in ":"heat out ")+H85.n(Math.abs(Q),0)+" J","end","var(--orange)",9.5);
 if(W>=0)g+=a(160,48,160,48-wl,"var(--blue)",2.2);else g+=a(160,48-wl,160,48,"var(--blue)",2.2);g+=t(168,Math.max(12,48-wl/2),(W>=0?"work out ":"work in ")+H85.n(Math.abs(W),0)+" J","start","var(--blue)",9.5);
 g+=t(160,146,"ΔU = Q − W: energy in, minus energy out as work","middle","var(--mu)",9.5);return svg(154,g)});
wrap85("piston",v=>{const {r,l,a,t,svg}=H85,p=+v.p,V1=+v.V1,V2=+v.V2,Q=+v.Q,W=p*(V2-V1),dU=Q-W,X=V=>20+V*1500,x1=X(V1),x2=X(V2);let g="";
 g+=l(20,30,180,30,"var(--mu)",2)+l(20,90,180,90,"var(--mu)",2)+l(20,30,20,90,"var(--mu)",2)+r(20,31,x2-20,58,"var(--orange)",.15,0)+l(x1,32,x1,88,"var(--fa)",1.4,"3 3")+r(x2,32,10,56,"var(--tx)",.5,1)+a(x2+40,60,x2+12,60,"var(--blue)",1.8)+t(x2+42,56,"p = "+p+" kPa","start","var(--blue)",9);
 g+=a(70,118,70,94,"var(--orange)",1.8)+t(76,116,"Q = "+H85.n(Q,1)+" kJ","start","var(--orange)",9.5)+t(x1,24,"V₁","middle","var(--mu)",9)+t(x2+5,24,"V₂","middle","var(--tx)",9);
 const px0=236,py0=110,sx=700,sy=.12;g+=l(px0,py0,310,py0,"var(--mu)",1)+l(px0,py0,px0,40,"var(--mu)",1)+t(312,py0+12,"V","end","var(--mu)",9)+t(px0-4,46,"p","end","var(--mu)",9);
 const ax=px0+Math.min(V1,V2)*sx,bx=px0+Math.max(V1,V2)*sx,py=py0-p*sy;g+=r(ax,py,bx-ax,py0-py,W>=0?"var(--blue)":"var(--bad)",.25,1.2)+t(272,py-6,"W = p·ΔV = "+H85.n(W,2)+" kJ","middle","var(--blue)",9.5);
 g+=t(160,146,"ΔU = Q − W = "+H85.n(dU,2)+" kJ","middle",dU>=0?"var(--orange)":"var(--blue)");return svg(154,g)});
wrap85("delay",v=>{const {l,p,t,dim,svg}=H85,Lb=+v.Lb,R=+v.R,d=+v.d,tx=Lb*8/(R*1000),tp=d/200,tot=tx+tp,y0=30,H=110,s=H/tot,xs=60,xr=236;let g="";
 g+=l(xs,y0-6,xs,y0+H+8,"var(--tx)",1.6)+l(xr,y0-6,xr,y0+H+8,"var(--tx)",1.6)+t(xs,18,"sender","middle","var(--mu)",9.5)+t(xr,18,"receiver","middle","var(--mu)",9.5);
 g+=p([[xs,y0],[xr,y0+tp*s],[xr,y0+tot*s],[xs,y0+tx*s]],"var(--blue)",1.2,true,.25);
 g+=`<path d="M${xs-8} ${y0}V${(y0+tx*s).toFixed(1)}" stroke="var(--orange)" stroke-width="2" fill="none"/>`+t(xs-12,y0+tx*s/2+4,"L/R "+H85.n(tx,2)+" ms","end","var(--orange)",9).replace(/x="[^"]*"/,`x="${xs-12}"`);
 g+=`<path d="M${xr+8} ${y0}V${(y0+tp*s).toFixed(1)}" stroke="var(--ok)" stroke-width="2" fill="none"/>`+t(xr+12,y0+tp*s/2+4,"d/v "+H85.n(tp,2)+" ms","start","var(--ok)",9);
 g+=t(160,y0+H+26,"last bit lands at "+H85.n(tot,3)+" ms · time runs down","middle","var(--mu)",9.5);return svg(y0+H+34,g)});
wrap85("retry",v=>{const {a,l,t,r,svg}=H85,N=+v.N,pp=+v.p,dup=N*pp/100;let g="";
 const lane=(y,keys)=>{let s=t(10,y-14,keys?"with an idempotency key":"no key","start",keys?"var(--ok)":"var(--bad)",9.5)+l(40,y,40,y+64,"var(--mu)",1.2)+l(200,y,200,y+64,"var(--mu)",1.2)+t(40,y+76,"client","middle","var(--mu)",8.5)+t(200,y+76,"server","middle","var(--mu)",8.5);
  s+=a(40,y+4,198,y+14,"var(--blue)",1.3)+t(208,y+17,"charge","start","var(--tx)",9)+l(198,y+20,120,y+30,"var(--fa)",1.2,"3 3")+t(120,y+28,"×","middle","var(--bad)",13)+t(80,y+40,"reply lost","middle","var(--mu)",8.5);
  s+=a(40,y+44,198,y+54,"var(--blue)",1.3)+t(208,y+57,keys?"key seen: same reply":"charged again",keys?"start":"start",keys?"var(--ok)":"var(--bad)",9);return s};
 g+=lane(26,false)+lane(130,true)+t(160,232,H85.n(N,0)+" requests, "+H85.n(dup,0)+" retried","middle","var(--mu)",9.5)+t(160,248,"double charges: "+H85.n(dup,0)+" without keys, 0 with keys","middle","var(--mu)",9.5);
 return svg(256,g)});

/* ---------- 2. PI heater with windup ---------- */
const PID87={t:"Integral windup on a heater",
 hint:"A PI controller heats a room toward the setpoint. When the heater hits its limit, the error stays large and the integral keeps adding it up. By the time the room arrives, that stored-up integral keeps the heater on too long: overshoot. Turn anti-windup On and the integral stops growing while the heater is maxed out.",
 ui:()=>slider("r","Setpoint rise",5,35,1,30)+slider("um","Heater limit",40,100,5,80)+slider("ki","Integral gain Ki",0.005,0.1,0.005,0.05)+pickc("aw","Anti-windup",[[0,"Off"],[1,"On"]],0),
 ro:()=>rof([["Overshoot","a"],["Time at the limit","b"],["Settles within 1 °C after","c"]]),
 sim(r,um,ki,aw){const Kp=.08,tau=10,K=60,dt=.05,Tend=80,pts=[];let T=0,I=0,sat=0,peak=-1e9,settle=0;
  for(let k=0;k<=Tend/dt;k++){const tt=k*dt,e=r-T;let u=Kp*e+I,us=Math.max(0,Math.min(um,u));const s=us!==u;if(!(aw&&s&&Math.sign(e)==Math.sign(u-us)))I+=ki*e*dt;
   if(s&&us==um)sat+=dt;T+=dt*(-T+K*us)/tau;peak=Math.max(peak,T);if(Math.abs(r-T)>1)settle=tt;if(k%10==0)pts.push([tt,T,us,s&&us==um])}
  return {pts,os:Math.max(0,peak-r),sat,settle}},
 run(v){const {l,t,p,svg}=H85,r=+v.r,um=+v.um/100,ki=+v.ki,aw=+v.aw>0,S=PID87.sim(r,um,ki,aw),x0=30,x1=310,y0=18,y1=128,Tm=Math.max(r*1.3,(r+S.os)*1.12,20),X=tt=>x0+tt/80*(x1-x0),Y=T=>y1-T/Tm*(y1-y0);let g="";
  g+=l(x0,y1,x1,y1,"var(--mu)",1)+l(x0,y0,x0,y1,"var(--mu)",1)+t(x0-4,Y(r)+4,"+"+r,"end","var(--mu)",9)+t(x1,y1-4,"80 s","end","var(--mu)",9)+t(x0+4,y0+2,"room temperature rise, °C","start","var(--mu)",9);
  g+=l(x0,Y(r),x1,Y(r),"var(--ok)",1.2,"5 4")+p(S.pts.map(q=>[X(q[0]),Y(q[1])]),"var(--blue)",2.2);
  const hb=162,hh=20;g+=t(x0,hb-hh-4,"heater command (red = at its limit "+Math.round(um*100)+"%)","start","var(--mu)",9);
  S.pts.forEach((q,i)=>{if(i==0)return;const a=S.pts[i-1];g+=`<path d="M${X(a[0]).toFixed(1)} ${hb}V${(hb-a[2]*hh).toFixed(1)}" stroke="${q[3]?"var(--bad)":"var(--orange)"}" stroke-width="2.2" fill="none" opacity=".75"/>`});
  return {svg:svg(170,g),lab:{r:"+"+r+" °C",um:Math.round(um*100)+" %",ki:H85.n(ki,3)+" /s"},out:{a:H85.n(S.os,1)+" °C",b:H85.n(S.sat,1)+" s",c:S.settle>=79.9?"not within 80 s":H85.n(S.settle,1)+" s"}}}};
function inst87(){try{if(LS.find(l=>l.id=="ctrl-pid-1"))DEMOS["x:ctrl-pid-1"]=PID87}catch(e){}}
inst85();inst87();
try{const _bu87=build;build=function(){const r=_bu87.apply(this,arguments);try{inst85();inst87()}catch(e){}return r}}catch(e){}
try{[
 {b:"b87",k:"pid87",t:"Heater windup demo",c:"Integral action and windup: with anti-windup Off the room overshoots after the red (saturated) stretch; turn it On and the overshoot drops.",go:["lab","ctrl-pid-1"]},
 {b:"b87",k:"bd87",t:"Last bar demos → pictures",c:"First law, piston, transmission vs propagation, retries with/without keys.",go:["lab","mech-thermodynamics-1"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

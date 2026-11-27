/* ===== Physics demos: motion in a line (b120) =====
   Two factories, registered as variants (one id per lesson focus; the physics is the same):
   1. track(): a cart on a straight track, constant acceleration a from initial velocity v₀ (and start x₀).
      x(t) = x₀ + v₀t + ½at², v(t) = v₀ + at. Strobe dots every 0.5 s show the spacing (equal gaps = constant
      velocity, growing gaps = speeding up). Graph below, x–t / v–t / a–t, drawn up to the time slider:
        x–t: tangent at t, its slope is v          v–t: shaded area 0→t is Δx (below the axis counts negative)
        a–t: shaded area 0→t is Δv
      Labels follow the track (PH.mode): algebra says "slope", "area", calculus says "dx/dt", "∫v dt".
   2. fall(): a ball thrown straight up from height h₀ (or dropped), y = h₀ + v₀t − ½gt², v = v₀ − gt, until it
      lands at t = (v₀ + √(v₀² + 2gh₀))/g. Rising dots on the left, falling dots on the right, so equal heights
      show equal speeds. Earth g = 9.8 m/s², Moon 1.62 m/s². Air resistance ignored.
   Play runs in real time (fall() speeds up flights longer than 8 s and says so). */
(function(){
const {T,Ln,Ar,f1,step,num,frame,ctl}=PH;
let CLIP=0;
const niceR=(lo,hi,minSpan)=>{if(Math.abs(lo)<1e-9)lo=0;if(Math.abs(hi)<1e-9)hi=0;const sp=hi-lo;if(hi)hi+=sp*.06;if(lo)lo-=sp*.06;/* headroom, except at a zero edge */if(hi-lo<minSpan){const m=(hi+lo)/2;lo=m-minSpan/2;hi=m+minSpan/2}const s=step(hi-lo,4);return [Math.floor(lo/s-1e-9)*s,Math.ceil(hi/s+1e-9)*s,s]};
const fx=(x,d)=>f1(x,d==null?1:d).replace("-","−");

/* ---------- 1. cart on a track ---------- */
function track(cfg){
 const TT=cfg.T||6,G=["x","v","a"];
 return {t:cfg.title,hint:cfg.hint,
  ui:()=>(cfg.graphs&&cfg.graphs.length>1?pickc("g","Graph",cfg.graphs.map(i=>[i,G[i]+"–t"]),cfg.g||0):`<input type="hidden" id="${CUR_P}g" data-k="g" value="${cfg.g||0}">`)
   +(cfg.x0!=null?slider("x0","Start position x₀",-10,10,1,cfg.x0):"")
   +slider("v0","Initial velocity v₀",-6,6,.5,cfg.v0)+slider("a","Acceleration a",-3,3,.25,cfg.a)
   +slider("t","Time t",0,TT,.02,cfg.t0==null?TT:cfg.t0)+ctl(),
  ro:()=>rof(cfg.ro.map(k=>[{t:"Time t",x:"Position x",dx:"Displacement Δx",d:"Distance travelled",v:"Velocity v",a:"Acceleration a",sp:"Speed |v|"}[k],k])),
  run(v){const x0=v.x0||0,v0=v.v0,a=v.a,t=v.t,g=+v.g||0,c=PH.mode()=="c";
   const X=s=>x0+v0*s+a*s*s/2,V=s=>v0+a*s;
   /* distance: split at the turnaround, if there is one before t */
   const ts=a?-v0/a:-1,dist=ts>0&&ts<t?Math.abs(X(ts)-x0)+Math.abs(X(t)-X(ts)):Math.abs(X(t)-x0);
   /* --- scene: track range from the whole run 0..T, so the track doesn't jump while playing --- */
   let lo=Math.min(x0,X(TT)),hi=Math.max(x0,X(TT));if(ts>0&&ts<TT){lo=Math.min(lo,X(ts));hi=Math.max(hi,X(ts))}
   lo=Math.min(lo,0);hi=Math.max(hi,0);const [s0,s1,ss]=niceR(lo,hi,10),SX=x=>24+(x-s0)/(s1-s0)*252,TY=58;
   let sc=T(4,12,"Track",{a:"start",fs:10,c:"var(--mu)",w:700})+T(296,12,c?"x(t) = x₀ + v₀t + ½at²":"position x in m",{a:"end",fs:10,c:"var(--mu)"});
   sc+=Ln(14,TY,286,TY,"var(--mu)",2);
   for(let k=Math.ceil(s0/ss-1e-9)*ss;k<=s1+1e-9;k+=ss){sc+=Ln(SX(k),TY,SX(k),TY+4,"var(--mu)",1.2)+T(SX(k),TY+15,num(k),{fs:9.5,mono:1,c:Math.abs(k)<1e-9?"currentColor":"var(--mu)",w:Math.abs(k)<1e-9?700:400})}
   for(let s=0;s<t-1e-9;s+=.5)sc+=`<circle cx="${f1(SX(X(s)))}" cy="${TY-12}" r="2.4" style="fill:var(--mu);opacity:.55;stroke:none"/>`;
   const cx=SX(X(t));
   sc+=`<g stroke="none"><rect x="${f1(cx-11)}" y="${TY-19}" width="22" height="11" rx="3" style="fill:var(--blue)"/><circle cx="${f1(cx-6)}" cy="${TY-4.5}" r="3.2" style="fill:currentColor"/><circle cx="${f1(cx+6)}" cy="${TY-4.5}" r="3.2" style="fill:currentColor"/></g>`;
   /* velocity and acceleration arrows from the cart; the letter goes past the tip, or behind the tail near an edge */
   const arrow=(len,y,c,s)=>{if(Math.abs(len)<=3)return "";const tip=Math.max(8,Math.min(292,cx+len)),d=tip>cx?1:-1,room=d>0?296-tip:tip-4;
    return Ar(cx,y,tip,y,c)+(room>=12?T(tip+d*5,y+3.5,s,{a:d>0?"start":"end",c,w:700}):T(cx-d*6,y+3.5,s,{a:d>0?"end":"start",c,w:700}))};
   sc+=arrow(V(t)*7,TY-27,"var(--blue)","v")+arrow(a*14,TY-39,"var(--orange)","a");
   /* --- graph --- */
   const F=[X,V,()=>a][g],N=60,P=[];for(let i=0;i<=N;i++){const s=TT*i/N;P.push([s,F(s)])}
   let ylo=Math.min(...P.map(p=>p[1]),0),yhi=Math.max(...P.map(p=>p[1]),0);const [y0,y1]=niceR(ylo,yhi,g==2?4:g==1?4:8);
   const nm=["x (m)","v (m/s)","a (m/s²)"][g];
   let note;if(g==0){const sl=V(t);note=(c?"dx/dt = v = ":"slope = v = ")+fx(sl)+" m/s"}
   else if(g==1){note=(c?"∫v dt = Δx = ":"area = Δx = ")+fx(X(t)-x0)+" m"}else{note=(c?"∫a dt = Δv = ":"area = Δv = ")+fx(a*t)+" m/s"}
   const Fr=frame({x:"t (s)",y:nm,xr:[0,TT],yr:[y0,y1],xs:1,h:178,Tp:24,note}),Xg=Fr.X,Yg=Fr.Y,id="phc"+(++CLIP);
   let gb=`<defs><clipPath id="${id}"><rect x="${Fr.L}" y="${Fr.Tp}" width="${Fr.R-Fr.L}" height="${Fr.B-Fr.Tp}"/></clipPath></defs>`;
   const path=Q=>Q.map((p,k)=>(k?"L":"M")+f1(Xg(p[0]))+" "+f1(Yg(p[1]))).join("");
   const done=P.filter(p=>p[0]<=t+1e-9).concat([[t,F(t)]]);
   if(g>0&&t>0){/* signed area 0..t, split where the curve crosses zero */
    const A=[];const n=40;for(let i=0;i<=n;i++){const s=t*i/n;A.push([s,F(s)])}
    let seg=[],cur=[A[0]];for(let i=1;i<A.length;i++){const p=A[i],q=A[i-1];if(q[1]*p[1]<0){const z=[q[0]+q[1]/(q[1]-p[1])*(p[0]-q[0]),0];cur.push(z);seg.push(cur);cur=[z]}cur.push(p)}seg.push(cur);
    seg.forEach(S=>{const up=S.reduce((s,p)=>s+p[1],0)>=0;gb+=`<path d="M${f1(Xg(S[0][0]))} ${f1(Yg(0))}${S.map(p=>`L${f1(Xg(p[0]))} ${f1(Yg(p[1]))}`).join("")}L${f1(Xg(S[S.length-1][0]))} ${f1(Yg(0))}Z" style="fill:${up?"var(--blue)":"var(--orange)"};fill-opacity:.22;stroke:none"/>`})}
   gb+=`<path d="${path(P)}" style="stroke:var(--mu);stroke-width:1.6;fill:none;opacity:.6" stroke-dasharray="4 4"/>`;
   gb+=`<path d="${path(done)}" style="stroke:var(--blue);stroke-width:2.6;fill:none"/>`;
   if(g==0){const m=V(t),d=TT*.2;gb+=`<g clip-path="url(#${id})"><path d="M${f1(Xg(t-d))} ${f1(Yg(X(t)-m*d))}L${f1(Xg(t+d))} ${f1(Yg(X(t)+m*d))}" style="stroke:var(--orange);stroke-width:2"/></g>`}
   gb+=`<circle cx="${f1(Xg(t))}" cy="${f1(Yg(F(t)))}" r="4" style="fill:var(--blue);stroke:var(--s1);stroke-width:1.6"/>`;
   const svg=`<svg viewBox="0 0 300 262">${sc}<g transform="translate(0,82)">${Fr.g}${gb}${Fr.ax}</g></svg>`;
   const out={t:fx(t,2)+" s",x:fx(X(t))+" m",dx:fx(X(t)-x0)+" m",d:fx(dist)+" m",v:fx(V(t))+" m/s",a:fx(a,2)+" m/s²",sp:fx(Math.abs(V(t)))+" m/s"};
   return {svg,lab:{x0:fx(x0,0)+" m",v0:fx(v0)+" m/s",a:fx(a,2)+" m/s²",t:fx(t,2)+" s"},out}}}}

/* ---------- 2. thrown straight up ---------- */
function fall(cfg){
 const tHit=v=>{const g=v.gg;return (v.v0+Math.sqrt(v.v0*v.v0+2*g*v.h0))/g};
 return {t:cfg.title,hint:cfg.hint,
  ui:()=>pickc("gr","Graph",[[0,"y–t"],[1,"v–t"]],cfg.gr||0)+pickc("gg","Gravity",[[9.8,"Earth 9.8"],[1.62,"Moon 1.62"]],9.8)
   +slider("v0","Launch speed up v₀",0,20,.5,cfg.v0)+slider("h0","Start height h₀",0,30,1,cfg.h0)
   +slider("t","Time t",0,1,.002,1)+ctl(),
  ro:()=>rof([["Time t","t"],["Height y","y"],["Velocity v","v"],["Lands at","th"]]),
  rate:v=>{const th=tHit(v);return 1/Math.max(th,1e-6)*(th>8?th/8:1)},
  run(v){const g=v.gg,v0=v.v0,h0=v.h0,th=tHit(v),t=v.t*th,c=PH.mode()=="c";
   const Y=s=>h0+v0*s-g*s*s/2,V=s=>v0-g*s,tp=v0/g,ym=v0>0?Y(tp):h0;
   /* scene column 0..96: height ruler, rising dots left, falling dots right */
   const [,ytop,ys]=niceR(0,Math.max(ym,5),5),SY=y=>236-y/ytop*206,BX=34;
   let sc=T(4,12,"Height",{a:"start",fs:10,c:"var(--mu)",w:700});
   sc+=Ln(6,236,96,236,"var(--mu)",2)+Ln(BX-14,SY(0),BX-14,SY(ytop),"var(--mu)",1.2);
   for(let k=0;k<=ytop+1e-9;k+=ys)sc+=Ln(BX-18,SY(k),BX-14,SY(k),"var(--mu)",1.2)+T(BX-21,SY(k)+3.5,num(k),{a:"end",fs:9.5,mono:1,c:"var(--mu)"});
   const dt=th/Math.max(6,Math.min(16,Math.round(th/.25)));
   for(let s=0;s<t-1e-9;s+=dt){const up=V(s)>0;sc+=`<circle cx="${up?BX:BX+18}" cy="${f1(SY(Y(s)))}" r="3" style="fill:var(--mu);opacity:.5;stroke:none"/>`}
   const bx=V(t)>0?BX:BX+18,by=SY(Y(t));
   sc+=`<circle cx="${bx}" cy="${f1(by)}" r="6" style="fill:var(--orange);stroke:none"/>`;
   const vl=-V(t)*2.2;if(Math.abs(vl)>3&&t<th-1e-6){sc+=Ar(bx+14,by,bx+14,by+vl,"var(--blue)");sc+=T(bx+18,by+vl+(vl<0?8:0),"v",{a:"start",c:"var(--blue)",w:700})}
   /* graph */
   const gr=+v.gr||0,F=gr?V:Y,N=60,P=[];for(let i=0;i<=N;i++){const s=th*i/N;P.push([s,F(s)])}
   const [x0,x1,xs]=niceR(0,th,2),[y0,y1]=niceR(Math.min(0,...P.map(p=>p[1])),Math.max(0,...P.map(p=>p[1])),gr?8:6);
   const note=gr?(c?"dv/dt = −g = ":"slope = −g = ")+"−"+num(g)+" m/s²":(t<=tp?"rising":"falling")+", v = "+fx(V(t))+" m/s";
   const Fr=frame({x:"t (s)",y:gr?"v (m/s)":"y (m)",xr:[0,x1],yr:[y0,y1],xs,h:262,L:136,R:292,Tp:30,note}),Xg=Fr.X,Yg=Fr.Y;
   const path=Q=>Q.map((p,k)=>(k?"L":"M")+f1(Xg(p[0]))+" "+f1(Yg(p[1]))).join("");
   let gb=`<path d="${path(P)}" style="stroke:var(--mu);stroke-width:1.6;fill:none;opacity:.6" stroke-dasharray="4 4"/>`+`<path d="${path(P.filter(p=>p[0]<=t+1e-9).concat([[t,F(t)]]))}" style="stroke:var(--blue);stroke-width:2.6;fill:none"/>`;
   if(v0>0&&!gr)gb+=Ln(Xg(tp),Yg(ym),Xg(tp),Yg(Math.max(y0,0)),"var(--mu)",1.1,"3 3");
   gb+=`<circle cx="${f1(Xg(t))}" cy="${f1(Yg(F(t)))}" r="4" style="fill:var(--blue);stroke:var(--s1);stroke-width:1.6"/>`;
   const svg=`<svg viewBox="0 0 300 262">${sc}${Fr.g}${gb}${Fr.ax}</svg>`;
   return {svg,lab:{v0:fx(v0)+" m/s",h0:fx(h0,0)+" m",t:fx(t,2)+" s"+(th>8?" (sped up)":"")},
    out:{t:fx(t,2)+" s",y:fx(Math.max(0,Y(t)))+" m",v:fx(t>=th-1e-6?V(th):V(t))+" m/s",th:fx(th,2)+" s"}}}}}

/* ---------- variants (lesson ids are in docs/PHYSICS.md) ---------- */
Object.assign(DEMOS,{
 "ph-pos":track({title:"Where is the cart?",T:6,x0:-6,v0:4,a:-1.5,g:0,graphs:[0,1],ro:["x","dx","d","v"],
  hint:"The cart starts at x₀ = −6 m, rolls right, turns around and comes back. Displacement only cares where it ends up; distance counts every metre, both ways. Slide the time and watch the two split apart after the turnaround."}),
 "ph-vel":track({title:"Velocity is the slope",T:6,v0:-2,a:1,g:0,graphs:[0,1],ro:["x","v"],
  hint:"Play it. Where the x–t curve is steep the dots spread out and the cart is fast; where the curve is flat (the bottom of the dip) the cart stops for an instant. The orange tangent's slope is the velocity at that moment."}),
 "ph-acc":track({title:"Acceleration on a v–t graph",T:6,v0:1,a:1.5,g:1,graphs:[1,2],ro:["v","dx"],
  hint:"On the v–t graph the slope is the acceleration and the shaded area is the displacement. Make a negative: the line tilts down, and once it crosses zero the new area is orange: the cart is going backward."}),
 "ph-suvat":track({title:"Constant acceleration, three graphs",T:6,v0:-3,a:1.5,g:0,graphs:[0,1,2],ro:["x","v"],
  hint:"Same motion, three graphs. Flip between them at one time: the slope of x–t is the height of v–t, and the slope of v–t is the height of a–t. Constant a means a flat a–t line, a straight v–t line and a parabola on x–t."}),
 "ph-fall":fall({title:"Thrown straight up",v0:12,h0:0,gr:0,
  hint:"Play it. Rising dots are on the left, falling dots on the right: at every height the ball is as fast going down as going up. At the top v = 0 for an instant, but the acceleration is still g, downward. Try the Moon."})
});
})();

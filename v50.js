/* ===== v50 (2026-11-18): picture models for bearings and two control lessons =====
   1. Bearing life (mech-machine-3): new picture model "bear50". A front view of a ball bearing with the
      shaft and cage turning (shown 100x slower, cage at about 0.4x shaft speed) and an rpm arrow that wraps
      around it; the load zone on the outer race glows with load. A side view shows radial load Fr pushing
      down on the shaft and thrust Fa pushing along it. P = X*Fr + Y*Fa (deep-groove ball bearing, typical
      e = 0.3, X = 0.56, Y = 1.5). The original life-vs-load graph sits underneath, marked at that P.
   2. Open and closed loop (ctrl-feedback-1): "cruise50". Two cars climb the same hill: fixed throttle
      (open loop) and cruise control (closed loop), each with its speed. A live loop diagram (r, e,
      controller, car, hill, y, speed sensor) and the original two error bars sit underneath.
   3. Damping and overshoot (ctrl-feedback-4): "osc50". A positioning stage (motor, lead screw, carriage)
      moves to the setpoint in real time, synced with a cursor sweeping the step-response graph. A ghost
      shows the peak overshoot, and "within 2%" appears when the response settles. Replays on every change.
   Motion is skipped when the phone asks for reduced motion. */
try{FB.ver="b50"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Bearing life lab: a picture of the bearing turning, with radial load, thrust and rpm, above the life graph.","Open and closed loop: cruise control versus a fixed throttle on a hill, with the feedback loop drawn live.","Damping and overshoot: a positioning stage moves to its setpoint in step with the graph."]})}catch(e){}
try{TF48.unshift(
 {b:"b50",k:"osc50",t:"Damping: moving stage",c:"Carriage moves in step with the graph cursor. ζ 0.2: big overshoot ghost; ζ 0.7: small bump, \"within 2%\" soon.",go:["lab","ctrl-feedback-4"]},
 {b:"b50",k:"cruise50",t:"Open vs closed loop: cruise control",c:"Two cars on a hill. Loop gain 0: both lose the same; gain 9: cruise loses a tenth.",go:["lab","ctrl-feedback-1"]},
 {b:"b50",k:"bear50",t:"Bearing picture model",c:"Bearing turns (100× slower), rpm arrow wraps it. Add thrust Fa past 0.3·Fr: P jumps and L10 drops.",go:["lab","mech-machine-3"]})}catch(e){}

const RM50=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
/* text with inline style (the .demo svg text rule sets font, so size and weight go in style) */
const T50=(x,y,s,a="middle",c="var(--mu)",w=600,fs=10)=>`<text x="${x}" y="${y}" text-anchor="${a}" style="fill:${c};font-size:${fs}px;font-weight:${w}">${s}</text>`;
const AR50=(x1,y1,x2,y2,c="var(--tx)",w=2)=>{const a=Math.atan2(y2-y1,x2-x1),h=6,s=.45;
 return `<line x1="${x1}" y1="${y1}" x2="${(x2-Math.cos(a)*h*.8).toFixed(1)}" y2="${(y2-Math.sin(a)*h*.8).toFixed(1)}" stroke="${c}" stroke-width="${w}"/>`+
  `<path d="M${x2} ${y2}L${(x2-h*Math.cos(a-s)).toFixed(1)} ${(y2-h*Math.sin(a-s)).toFixed(1)}L${(x2-h*Math.cos(a+s)).toFixed(1)} ${(y2-h*Math.sin(a+s)).toFixed(1)}Z" fill="${c}"/>`};
/* place a 300x200 plot (from plotSVG) at y; extra goes inside it, in its own coordinates */
const NEST50=(svg,y,extra="")=>svg.replace(/^<svg viewBox="0 0 300 200">/,`<svg x="0" y="${y}" width="300" height="200" viewBox="0 0 300 200">`).replace(/<\/svg>$/,extra+"</svg>");
const LES50=id=>(typeof BUNDLE!="undefined"&&BUNDLE.find(l=>l.id==id))||null;

/* 1. bearing */
try{(function(){const L=LES50("mech-machine-3");if(!L||!L.demo||typeof L.demo!="object")return;
 const sp=normSpec(L.demo);sp.s=(sp.s||[]).filter(a=>a[0]!="P");
 DEMOS.bear50={t:"Bearing loads and life",
  hint:"Life falls with the cube of P. Thrust counts extra: once Fa/Fr passes e, P = 0.56·Fr + 1.5·Fa, so a little thrust costs a lot of life. X, Y and e here are typical for a deep-groove ball bearing; the catalogue gives the real Y, which depends on Fa/C0. Radial load sits on the lower balls (the glowing load zone); thrust spreads over all of them. The cage turns at about 0.4× shaft speed.",
  ui:()=>slider("C","Dynamic rating C",5,100,1,20)+slider("Fr","Radial load Fr",.5,30,.5,2)+slider("Fa","Thrust Fa",0,15,.5,0)+slider("n","Shaft speed",100,6000,100,1000),
  ro:()=>rof([["Equivalent load P","p"],["Ball L10","h"],["Status","fl"]]),
  run(v){const e=.3,th=v.Fa/v.Fr>e,P=th?.56*v.Fr+1.5*v.Fa:v.Fr,Lh=Math.pow(v.C/P,3)*1e6/(60*v.n),ok=Lh>=2e4,mo=!RM50();
   let g="";const cx=58,cy=64,Z=9,now=performance.now()/1000;
   const pt=(r,f)=>[(cx+r*Math.cos(f)).toFixed(1),(cy+r*Math.sin(f)).toFixed(1)];
   const spin=(T)=>mo?`<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${T.toFixed(2)}s" begin="${(-(now%T)).toFixed(2)}s" repeatCount="indefinite"/>`:"";
   /* front view: outer ring, load zone, balls (cage), inner ring + shaft */
   g+=`<circle cx="${cx}" cy="${cy}" r="38" fill="var(--s3)" stroke="var(--line)"/><circle cx="${cx}" cy="${cy}" r="31" fill="var(--s1)" stroke="var(--line)"/>`;
   for(let k=0;k<36;k++){const th0=k*Math.PI/18,c=Math.cos(th0),q=5*v.Fr/Z*Math.pow(Math.max(0,c),1.5)+3.9*v.Fa/Z,I=Math.min(1,q/(5*15/Z));
    const f1=Math.PI/2+th0-Math.PI/36,f2=f1+Math.PI/18,[a1,b1]=pt(32.5,f1),[a2,b2]=pt(32.5,f2);
    g+=`<path d="M${a1} ${b1}A32.5 32.5 0 0 1 ${a2} ${b2}" stroke="var(--orange)" stroke-width="3" fill="none" opacity="${(.06+.94*I).toFixed(2)}"/>`}
   let balls="";for(let k=0;k<Z;k++){const[a,b]=pt(25,k*2*Math.PI/Z);balls+=`<circle cx="${a}" cy="${b}" r="5.6" fill="var(--s2)" stroke="var(--tx)" stroke-width="1.2"/>`}
   const Ts=6000/v.n;g+=`<g>${balls}${spin(Ts/.4)}</g>`;
   g+=`<g><circle cx="${cx}" cy="${cy}" r="19" fill="var(--s3)" stroke="var(--line)"/><circle cx="${cx}" cy="${cy}" r="12" fill="color-mix(in srgb,var(--blue) 30%,var(--s2))" stroke="var(--blue)" stroke-width="1.2"/>`+
    `<path d="M${cx} ${cy-12}V${cy-3}" stroke="var(--tx)" stroke-width="2" stroke-linecap="round"/>${spin(Ts)}</g>`;
   /* rpm arrow wrapping around, clockwise */
   const R=45,f0=150*Math.PI/180,f1=390*Math.PI/180,[sx,sy]=pt(R,f0),[ex,ey]=pt(R,f1),dx=-Math.sin(f1),dy=Math.cos(f1);
   g+=`<path d="M${sx} ${sy}A${R} ${R} 0 1 1 ${ex} ${ey}" fill="none" stroke="var(--blue)" stroke-width="2"/>`+
    `<path d="M${(+ex+dx*7).toFixed(1)} ${(+ey+dy*7).toFixed(1)}L${(+ex-dy*4.5).toFixed(1)} ${(+ey+dx*4.5).toFixed(1)}L${(+ex+dy*4.5).toFixed(1)} ${(+ey-dx*4.5).toFixed(1)}Z" fill="var(--blue)"/>`;
   g+=T50(98,15,v.n+" rpm","start","var(--blue)",700,10.5);
   g+=T50(cx,123,mo?"shown 100× slower":"front view","middle","var(--mu)",500,9);
   /* side view: shaft along x, bearing section above and below, Fr down, Fa along the shaft */
   const bx=160,bw=26,mid=bx+bw/2,sh=(y,h,f,s="var(--line)")=>`<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="1.5" fill="${f}" stroke="${s}"/>`;
   const ql=q=>Math.min(1,q/(5*15/Z)),qb=ql(5*v.Fr/Z+3.9*v.Fa/Z),qt=ql(3.9*v.Fa/Z);
   g+=`<rect x="${bx-4}" y="9" width="${bw+8}" height="9" fill="var(--s2)" stroke="var(--line)"/><rect x="${bx-4}" y="110" width="${bw+8}" height="9" fill="var(--s2)" stroke="var(--line)"/>`;
   g+=sh(18,10,"var(--s3)")+sh(100,10,"var(--s3)")+sh(42,10,"var(--s3)")+sh(76,10,"var(--s3)");
   const bc=q=>`color-mix(in srgb,var(--orange) ${Math.round(8+80*q)}%,var(--s2))`;
   g+=`<circle cx="${mid}" cy="35" r="6.4" fill="${bc(qt)}" stroke="var(--tx)" stroke-width="1.2"/><circle cx="${mid}" cy="93" r="6.4" fill="${bc(qb)}" stroke="var(--tx)" stroke-width="1.2"/>`;
   g+=`<rect x="140" y="52" width="76" height="24" rx="2" fill="color-mix(in srgb,var(--blue) 30%,var(--s2))" stroke="var(--blue)" stroke-width="1.2"/>`+
    `<path d="M136 64H220" stroke="var(--fa)" stroke-dasharray="6 3 1.5 3" stroke-width="1"/>`;
   const lr=10+30*v.Fr/30;g+=AR50(204,52-lr,204,51,"var(--orange)",2.4)+T50(209,Math.max(16,52-lr+9),"Fr","start","var(--orange)",700,10);
   if(v.Fa>0){const la=8+20*v.Fa/15;g+=AR50(139-la,64,139,64,"var(--orange)",2.4)+T50(139-la/2,58,"Fa","middle","var(--orange)",700,10)}
   g+=T50(178,130,"side view","middle","var(--mu)",500,9);
   /* numbers */
   const tx=226;g+=T50(tx,20,"Equivalent load","start","var(--mu)",500,9)+T50(tx,35,"P "+sig(P)+" kN","start","var(--tx)",700,12);
   g+=th?T50(tx,48,"Fa/Fr > 0.3:","start","var(--mu)",500,9)+T50(tx,59,"0.56·Fr+1.5·Fa","start","var(--mu)",500,9)
        :T50(tx,48,"Fa/Fr ≤ 0.3,","start","var(--mu)",500,9)+T50(tx,59,"so P = Fr","start","var(--mu)",500,9);
   g+=T50(tx,82,"L10 life","start","var(--mu)",500,9)+T50(tx,97,sig(Lh)+" h","start",ok?"var(--ok)":"var(--bad)",700,12)+T50(tx,109,"goal 20,000 h","start","var(--mu)",500,9);
   const plot=plotSVG(sp,{...v,P});
   return {svg:`<svg viewBox="0 0 300 336" role="img" aria-label="Ball bearing turning under radial load and thrust, above the life-versus-load graph"><g stroke="none">${g}</g>${NEST50(plot,136)}</svg>`,
    lab:{C:sig(v.C)+" kN",Fr:sig(v.Fr)+" kN",Fa:sig(v.Fa)+" kN",n:sig(v.n)+" rpm"},
    out:{p:sig(P)+" kN",h:sig(Lh)+" h",fl:ok?"Meets 20,000 h":"Below 20,000 h"}}}};
 DEMO_OVR["mech-machine-3"]="bear50"})()}catch(e){}

/* 2. cruise control on a hill */
try{DEMOS.cruise50={t:"Cruise control on a hill",
 hint:"Both cars start at 100 km/h. With a fixed throttle (open loop) the car loses the full amount on the hill. Cruise control measures speed and pushes back, so the loss is divided by (1 + loop gain): a gain of 9 leaves a tenth. Steady state, proportional control only, so a small error always remains.",
 ui:()=>slider("dd","Hill: speed lost at fixed throttle",0,20,.5,10)+slider("L","Loop gain Kp·K",0,50,.5,9),
 ro:()=>rof([["Cruise speed","s"],["Error reduced by","r"]]),
 run(v){const eo=v.dd,ec=v.dd/(1+v.L),so=100-eo,sc=100-ec;let g="";
  const tn=.16*v.dd/20,a=Math.atan(tn)*180/Math.PI,yr=x=>92-x*tn;
  g+=`<path d="M0 ${yr(0)}L300 ${yr(300).toFixed(1)}L300 98L0 98Z" fill="var(--s3)"/><path d="M0 ${yr(0)}L300 ${yr(300).toFixed(1)}" stroke="var(--fa)" stroke-width="1.5"/>`;
  const car=(x,col,lab,spd)=>{const y=yr(x);return `<g transform="translate(${x} ${y.toFixed(1)}) rotate(${(-a).toFixed(2)})">`+
    `<path d="M-22 -6V-12Q-22 -14 -19 -14H-10L-5 -21H8L14 -14H20Q22 -14 22 -12V-6Z" fill="${col}"/><path d="M-3 -19.5H6.5L11 -14H-3Z" fill="var(--s1)" opacity=".75"/>`+
    `<circle cx="-12" cy="-5" r="4.3" fill="var(--tx)"/><circle cx="12" cy="-5" r="4.3" fill="var(--tx)"/></g>`+
    T50(x,y-36,spd.toFixed(1)+" km/h","middle",col,700,11.5)+T50(x,y-48,lab,"middle","var(--mu)",500,9)};
  g+=car(78,"var(--orange)","fixed throttle",so)+car(214,"var(--blue)","cruise control",sc)+T50(4,12,"set 100 km/h","start","var(--mu)",500,9);
  /* loop diagram */
  const y=128,box=(x,w,t)=>`<rect x="${x}" y="${y-10}" width="${w}" height="20" rx="4" fill="var(--s2)" stroke="var(--line)"/>`+T50(x+w/2,y+3.5,t,"middle","var(--tx)",600,9.5);
  g+=T50(4,y+3.5,"r 100","start","var(--tx)",700,9.5)+AR50(32,y,53,y,"var(--fa)",1.4);
  g+=`<circle cx="60" cy="${y}" r="7" fill="none" stroke="var(--fa)" stroke-width="1.4"/>`+T50(50,y-6,"+","middle","var(--mu)",700,9)+T50(53,y+16,"−","middle","var(--mu)",700,10);
  g+=AR50(67,y,92,y,"var(--fa)",1.4)+T50(80,y-6,"e "+sig(ec,2),"middle","var(--blue)",700,9)+box(92,52,"controller")+AR50(144,y,160,y,"var(--fa)",1.4)+box(160,34,"car")+AR50(194,y,213,y,"var(--fa)",1.4);
  g+=`<circle cx="220" cy="${y}" r="7" fill="none" stroke="var(--fa)" stroke-width="1.4"/>`+AR50(220,y-24,220,y-7,"var(--orange)",1.4)+T50(226,y-17,"hill −"+sig(v.dd,3),"start","var(--orange)",600,9);
  g+=AR50(227,y,250,y,"var(--fa)",1.4)+T50(253,y+3.5,"y "+sc.toFixed(1),"start","var(--tx)",700,9.5);
  g+=`<path d="M238 ${y}V${y+24}H60V${y+7.5}" fill="none" stroke="var(--fa)" stroke-width="1.4"/><path d="M60 ${y+7.5}l-3.5 6h7z" fill="var(--fa)"/>`+T50(149,y+21,"speed sensor","middle","var(--mu)",500,9);
  /* error bars */
  const bar=(yy,lab,val,col)=>T50(4,yy,lab,"start","var(--mu)",500,9.5)+T50(296,yy,sig(val,3)+" km/h","end",col,700,9.5)+
   `<rect x="4" y="${yy+4}" width="292" height="8" rx="4" fill="var(--s3)"/><rect x="4" y="${yy+4}" width="${(292*Math.min(1,val/20)).toFixed(1)}" height="8" rx="4" fill="${col}"/>`;
  g+=bar(178,"Speed lost, fixed throttle (open loop)",eo,"var(--orange)")+bar(204,"Speed lost, cruise control (closed loop)",ec,"var(--blue)");
  return {svg:`<svg viewBox="0 0 300 220" role="img" aria-label="Two cars on a hill, a feedback loop diagram and speed-loss bars"><g stroke="none">${g}</g></svg>`,
   lab:{dd:sig(v.dd)+" km/h",L:sig(v.L)},out:{s:sc.toFixed(1)+" km/h",r:sig(1+v.L)+"×"}}}};
 DEMO_OVR["ctrl-feedback-1"]="cruise50"}catch(e){}

/* 3. positioning stage with the step response */
try{(function(){const L=LES50("ctrl-feedback-4");if(!L||!L.demo||typeof L.demo!="object")return;
 const base=mkSpec(L.demo);
 DEMOS.osc50={...base,t:"Positioning stage step response",
  hint:"The stage is told to move one step. Watch it coast past the setpoint by the overshoot and ring back in, in step with the graph. Low damping rings; ζ near 0.7 is quick with a small bump. ωn only stretches the time axis. Model: an ideal second-order loop and a unit step.",
  run(v){const r=base.run(v),z=v.z,w=v.wn,wd=w*Math.sqrt(1-z*z),ph=Math.acos(z),y=t=>1-Math.exp(-z*w*t)/Math.sqrt(1-z*z)*Math.sin(wd*t+ph);
   const Mp=Math.exp(-z*Math.PI/Math.sqrt(1-z*z)),S=100,x0=52,x1=x0+S,mo=!RM50(),D=7.5,f=.8,N=120;
   let ts=null;for(let k=1200;k>=0;k--){const t=6*k/1200;if(Math.abs(y(t)-1)>.02){ts=k<1200?6*(k+1)/1200:null;break}}
   let g="";
   g+=`<rect x="4" y="50" width="22" height="22" rx="3" fill="var(--s3)" stroke="var(--line)"/>`+T50(15,84,"motor","middle","var(--mu)",500,8.5);
   g+=`<rect x="26" y="74" width="270" height="4" rx="2" fill="var(--s3)"/><path d="M26 61H296" stroke="var(--fa)" stroke-width="2" stroke-dasharray="2 2"/>`;
   g+=`<path d="M${x0} 30V82" stroke="var(--fa)" stroke-dasharray="3 3"/>`+T50(x0,26,"start","middle","var(--mu)",500,9);
   g+=`<path d="M${x1} 30V82" stroke="var(--blue)" stroke-width="1.4" stroke-dasharray="3 3"/>`+T50(x1,26,"setpoint","middle","var(--blue)",700,9);
   const px=x1+Mp*S;if(Mp>.005)g+=`<rect x="${(px-16).toFixed(1)}" y="48" width="32" height="22" rx="3" fill="none" stroke="var(--orange)" stroke-dasharray="3 2"/>`+T50(Math.max(px-16,x1+5),42,"peak +"+sig(100*Mp,2)+"%","start","var(--orange)",700,9);
   const cart=`<rect x="-16" y="48" width="32" height="22" rx="3" fill="color-mix(in srgb,var(--blue) 35%,var(--s2))" stroke="var(--blue)" stroke-width="1.5"/><path d="M0 70V82" stroke="var(--orange)" stroke-width="2"/>`;
   if(mo){const vals=[],kt=[];for(let k=0;k<=N;k++){vals.push((x0+S*y(6*k/N)).toFixed(1)+" 0");kt.push((f*k/N).toFixed(4))}vals.push(vals[N]);kt.push("1");
    g+=`<g transform="translate(${x0} 0)">${cart}<animateTransform attributeName="transform" type="translate" values="${vals.join(";")}" keyTimes="${kt.join(";")}" dur="${D}s" repeatCount="indefinite"/></g>`;
    if(ts!=null)g+=`<g opacity="0">${T50(296,12,"within 2%","end","var(--ok)",700,9.5)}<animate attributeName="opacity" values="0;1" keyTimes="0;${(f*ts/6).toFixed(4)}" calcMode="discrete" dur="${D}s" repeatCount="indefinite"/></g>`}
   else{g+=`<g transform="translate(${x1} 0)">${cart}</g>`;if(ts!=null)g+=T50(296,12,"within 2% at "+sig(ts,2)+" s","end","var(--ok)",700,9.5)}
   const X=t=>(44+t/6*246).toFixed(1);
   const cur=mo?`<line x1="44" y1="14" x2="44" y2="170" stroke="var(--orange)" stroke-width="1.2"><animate attributeName="x1" values="${X(0)};${X(6)};${X(6)}" keyTimes="0;${f};1" dur="${D}s" repeatCount="indefinite"/><animate attributeName="x2" values="${X(0)};${X(6)};${X(6)}" keyTimes="0;${f};1" dur="${D}s" repeatCount="indefinite"/></line>`:"";
   r.svg=`<svg viewBox="0 0 300 296" role="img" aria-label="Positioning stage moving to its setpoint, above the step-response graph"><g stroke="none">${g}</g>${NEST50(r.svg,94,cur)}</svg>`;
   return r}};
 DEMO_OVR["ctrl-feedback-4"]="osc50"})()}catch(e){}

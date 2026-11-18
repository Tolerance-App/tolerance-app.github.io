/* ===== v51 (2026-11-18): feedback basics picture models =====
   1. Open and closed loop (ctrl-feedback-1): "cruise51" replaces b50's two-car picture, which read as two
      cars that both had throttle. Now one car drives onto a hill, animated in time like the damping stage.
      A Cruise control On/Off switch: Off, the pedal is held still and the hill takes the full speed loss;
      On, the pedal follows the speed error. Speed dial and throttle bar move with the car. Below: speed vs
      time and throttle vs time for both cases, with a synced cursor.
      Model: first-order car (τ = 3 s), 1% throttle ≈ 1 km/h, proportional control, hill ramps in at 2–3 s.
   2. First-order response (ctrl-feedback-2): "fo51". A pot on a hot plate, a thermometer with start, 63% and
      final marks, and "gap left" bars for 0–4 τ plus now. τ, 2τ, 3τ, 4τ lines on the graph.
   3. Proportional control and offset (ctrl-feedback-3): "pt51". A draining tank with a P-controlled inflow
      valve: the level sits below the setpoint so the valve stays open. A P / P + I switch shows the integral
      holding the valve open with zero error. */
try{FB.ver="b51"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Open and closed loop: new cruise control lab. One car, one hill: switch cruise control on and off and watch speed and throttle.","First-order response: a pot heating up, a thermometer and the gap left after each time constant.","Proportional control: a draining tank shows why P control leaves an offset, and how integral action removes it."]})}catch(e){}
try{TF48.unshift(
 {b:"b51",k:"pt51",t:"P-control offset: tank",c:"Loop gain 9: level sits 9.1% under setpoint, valve open. Switch to P + I: level on setpoint, error 0.",go:["lab","ctrl-feedback-3"]},
 {b:"b51",k:"fo51",t:"First-order response: heating pot",c:"Drag time to τ: thermometer at the 63% mark, gap left 37%.",go:["lab","ctrl-feedback-2"]},
 {b:"b51",k:"cruise51",t:"Cruise control remade",c:"One car drives onto the hill. Off: pedal flat, loses 10 km/h. On: pedal rises, loses 1 km/h.",go:["lab","ctrl-feedback-1"]})}catch(e){}

/* 1. cruise control: one car, on or off */
function cr51(L,dd){const tau=3,dt=.01,out=[];let v=100,x=0;
 for(let i=0;i<=1200;i++){const t=i*dt,d=dd*Math.min(1,Math.max(0,t-2)),u=L*(100-v);if(i%10==0)out.push({t,v,u:40+u,x});x+=v*dt;v+=dt/tau*(100+u-d-v)}return out}
try{DEMOS.cruise51={t:"Cruise control on a hill",
 hint:"One car, one hill. Cruise off: nobody moves the pedal, so the hill takes the full speed loss. Cruise on: a sensor reads the speed and the controller presses the pedal harder the more speed is lost (throttle = Kp × error). That extra throttle cancels most of the hill, so the loss is divided by (1 + loop gain). A little error always remains: with no error, a P controller adds no throttle. Model: first-order car, 1% throttle ≈ 1 km/h.",
 ui:()=>pickc("cc","Cruise control",[["1","On"],["0","Off"]],"1")+slider("dd","Hill: speed lost with pedal held",0,20,.5,10)+slider("L","Loop gain Kp·K",0,50,.5,9),
 ro:()=>rof([["Hill speed, pedal held","o"],["Hill speed, cruise on","c"],["Loss cut by","r"]]),
 run(v){const on=+v.cc==1,O=cr51(0,v.dd),C=cr51(v.L,v.dd),S=on?C:O,mo=!RM50(),D=14/1.5,f=12/14,N=S.length-1;let g="";
  const tn=.16*v.dd/20,road=`M24 96L66 96Q80 96 94 ${(96-14*tn).toFixed(1)}L296 ${(96-216*tn).toFixed(1)}`;
  g+=`<path d="${road}L296 104L24 104Z" fill="var(--s3)"/><path d="${road}" fill="none" stroke="var(--fa)" stroke-width="1.5"/>`;
  const col=on?"var(--blue)":"var(--orange)";
  const car=`<path d="M-22 -6V-12Q-22 -14 -19 -14H-10L-5 -21H8L14 -14H20Q22 -14 22 -12V-6Z" fill="${col}"/><path d="M-3 -19.5H6.5L11 -14H-3Z" fill="var(--s1)" opacity=".75"/><circle cx="-12" cy="-5" r="4.3" fill="var(--tx)"/><circle cx="12" cy="-5" r="4.3" fill="var(--tx)"/>`;
  const kp=S.map(s=>Math.min(1,s.x/1200).toFixed(4)),kt=S.map((s,i)=>(f*i/N).toFixed(4));kp.push(kp[N]);kt.push("1");
  const ang=s=>180+Math.max(0,Math.min(30,s.v-75))/30*180,th=s=>Math.max(0,Math.min(100,s.u))/100*42;
  if(mo)g+=`<g>${car}<animateMotion path="${road}" keyPoints="${kp.join(";")}" keyTimes="${kt.join(";")}" calcMode="linear" rotate="auto" dur="${D}s" repeatCount="indefinite"/></g>`;
  else g+=`<g>${car}<animateMotion path="${road}" keyPoints="${kp[N]};${kp[N]}" keyTimes="0;1" calcMode="linear" rotate="auto" dur="1s" fill="freeze"/></g>`;
  /* speed dial */
  const cx=40,cy=50;g+=`<path d="M12 50A28 28 0 0 1 68 50" fill="none" stroke="var(--line)" stroke-width="5"/>`;
  [80,90,100].forEach(s=>{const a=(180+(s-75)/30*180)*Math.PI/180;g+=`<path d="M${(cx+23*Math.cos(a)).toFixed(1)} ${(cy+23*Math.sin(a)).toFixed(1)}L${(cx+31*Math.cos(a)).toFixed(1)} ${(cy+31*Math.sin(a)).toFixed(1)}" stroke="${s==100?"var(--blue)":"var(--fa)"}" stroke-width="1.5"/>`+T50((cx+38*Math.cos(a)).toFixed(1),(cy+38*Math.sin(a)+3).toFixed(1),s,"middle",s==100?"var(--blue)":"var(--mu)",600,8)});
  const nd=`<line x1="0" y1="0" x2="25" y2="0" stroke="var(--tx)" stroke-width="2" stroke-linecap="round"/>`;
  g+=`<g transform="translate(${cx} ${cy})">`+(mo?`<g>${nd}<animateTransform attributeName="transform" type="rotate" values="${S.map(s=>ang(s).toFixed(1)).concat([ang(S[N]).toFixed(1)]).join(";")}" keyTimes="${kt.join(";")}" dur="${D}s" repeatCount="indefinite"/></g>`:`<g transform="rotate(${ang(S[N]).toFixed(1)})">${nd}</g>`)+`<circle r="3" fill="var(--tx)"/></g>`;
  g+=T50(cx,64,"speed, km/h","middle","var(--mu)",500,8.5);
  /* throttle bar */
  g+=`<rect x="84" y="14" width="12" height="42" rx="2" fill="var(--s2)" stroke="var(--line)"/>`;
  const thv=S.map(s=>th(s)),thy=thv.map(h=>(56-h).toFixed(1));thv.push(thv[N]);thy.push(thy[N]);
  g+=mo?`<rect x="85" y="${thy[0]}" width="10" height="${thv[0].toFixed(1)}" fill="${col}"><animate attributeName="height" values="${thv.map(h=>h.toFixed(1)).join(";")}" keyTimes="${kt.join(";")}" dur="${D}s" repeatCount="indefinite"/><animate attributeName="y" values="${thy.join(";")}" keyTimes="${kt.join(";")}" dur="${D}s" repeatCount="indefinite"/></rect>`
   :`<rect x="85" y="${thy[N]}" width="10" height="${thv[N].toFixed(1)}" fill="${col}"/>`;
  g+=T50(90,64,"throttle","middle","var(--mu)",500,8.5);
  g+=on?T50(296,12,"Cruise ON: a sensor reads speed,","end","var(--blue)",700,9)+T50(296,23,"the pedal follows the error","end","var(--blue)",500,9)
       :T50(296,12,"Cruise OFF: the pedal is held still","end","var(--orange)",700,9);
  /* speed vs time */
  const x0=34,x1=292,X=t=>(x0+t/12*(x1-x0)).toFixed(1),gy0=116,gy1=196,Y=s=>(gy1-(Math.max(78,Math.min(102,s))-78)/24*(gy1-gy0)).toFixed(1);
  g+=`<rect x="${X(2)}" y="${gy0}" width="${(x1-X(2)).toFixed(1)}" height="${gy1-gy0}" fill="var(--s2)"/>`+T50(+X(2)+4,180,"on the hill","start","var(--mu)",500,8.5);
  [80,90,100].forEach(s=>g+=`<path d="M${x0} ${Y(s)}H${x1}" stroke="var(--line)"/>`+T50(x0-4,+Y(s)+3,s,"end","var(--mu)",500,8.5));
  [0,4,8,12].forEach(t=>g+=T50(X(t),gy1+10,t,"middle","var(--mu)",500,8.5));
  g+=T50(x0,gy0-4,"speed (km/h)","start","var(--mu)",500,8.5)+T50(x1,gy0-4,"setpoint 100","end","var(--blue)",600,8.5);
  const pl=(A,k,yf,c,w,op)=>`<path d="${A.map((s,i)=>(i?"L":"M")+X(s.t)+" "+yf(s[k])).join("")}" fill="none" stroke="${c}" stroke-width="${w}" opacity="${op}"/>`;
  g+=pl(O,"v",Y,"var(--orange)",on?1.6:2.6,on?.6:1)+pl(C,"v",Y,"var(--blue)",on?2.6:1.6,on?1:.6);
  /* legend */
  g+=`<rect x="${x0}" y="214" width="10" height="3" rx="1.5" fill="var(--orange)"/>`+T50(x0+14,218,"pedal held (open loop)","start","var(--mu)",500,8.5)+
   `<rect x="170" y="214" width="10" height="3" rx="1.5" fill="var(--blue)"/>`+T50(184,218,"cruise on (closed loop)","start","var(--mu)",500,8.5);
  /* throttle vs time */
  const ty0=236,ty1=282,Yt=u=>(ty1-(Math.max(30,Math.min(70,u))-30)/40*(ty1-ty0)).toFixed(1);
  [40,60].forEach(u=>g+=`<path d="M${x0} ${Yt(u)}H${x1}" stroke="var(--line)"/>`+T50(x0-4,+Yt(u)+3,u,"end","var(--mu)",500,8.5));
  g+=T50(x0,ty0-3,"throttle (%)","start","var(--mu)",500,8.5)+pl(O,"u",Yt,"var(--orange)",on?1.6:2.6,on?.6:1)+pl(C,"u",Yt,"var(--blue)",on?2.6:1.6,on?1:.6);
  g+=T50(x1,296,"time (s)","end","var(--mu)",500,8.5);
  if(mo)[[gy0,gy1],[ty0,ty1]].forEach(([a,b])=>g+=`<line x1="${x0}" y1="${a}" x2="${x0}" y2="${b}" stroke="var(--tx)" stroke-width="1" opacity=".55"><animate attributeName="x1" values="${X(0)};${X(12)};${X(12)}" keyTimes="0;${f.toFixed(4)};1" dur="${D}s" repeatCount="indefinite"/><animate attributeName="x2" values="${X(0)};${X(12)};${X(12)}" keyTimes="0;${f.toFixed(4)};1" dur="${D}s" repeatCount="indefinite"/></line>`);
  const so=100-v.dd,sc=100-v.dd/(1+v.L);
  return {svg:`<svg viewBox="0 0 300 300" role="img" aria-label="A car drives onto a hill with cruise control ${on?"on":"off"}, with speed and throttle over time"><g stroke="none">${g}</g></svg>`,
   lab:{dd:sig(v.dd)+" km/h",L:sig(v.L)},out:{o:so.toFixed(1)+" km/h",c:sc.toFixed(1)+" km/h",r:sig(1+v.L)+"×"}}}};
 DEMO_OVR["ctrl-feedback-1"]="cruise51"}catch(e){}

/* 2. first-order response: heating pot */
try{(function(){const L=LES50("ctrl-feedback-2");if(!L||!L.demo||typeof L.demo!="object")return;
 const base=mkSpec(L.demo);
 DEMOS.fo51={...base,t:"Heating up: first-order response",
  hint:"The hot plate switches on at t = 0. The pot heats fast at first, then slower, because heat flows in at a rate set by the gap left to the final temperature. Each time constant τ closes 63% of whatever gap is left, so 37%, 14%, 5% and 2% remain after 1–4 τ. Drag time to τ and the thermometer always sits on the 63% mark. Model: one lumped temperature, starting at 20 °C.",
  run(v){const r=base.run(v),fr=1-Math.exp(-v.t/v.tau),n=v.t/v.tau,Tn=20+v.K*fr;let g="";
   g+=T50(4,12,"t = "+sig(v.t)+" s = "+n.toFixed(2)+" τ","start","var(--tx)",700,10)+T50(4,24,sig(Tn,3)+" °C","start","var(--orange)",700,10);
   /* hot plate and pot */
   g+=`<rect x="12" y="98" width="80" height="7" rx="2" fill="var(--orange)" opacity=".85"/><rect x="18" y="105" width="68" height="3" fill="var(--s3)"/>`;
   g+=`<rect x="10" y="60" width="8" height="5" rx="1.5" fill="var(--s3)"/><rect x="86" y="60" width="8" height="5" rx="1.5" fill="var(--s3)"/>`;
   g+=`<rect x="18" y="52" width="68" height="46" rx="3" fill="var(--s2)" stroke="var(--fa)" stroke-width="1.5"/>`;
   g+=`<rect x="20.5" y="60" width="63" height="35.5" rx="2" fill="color-mix(in srgb,var(--orange) ${Math.round(fr*100)}%,var(--blue))" opacity=".8"/>`;
   for(let k=0;k<3;k++){const op=Math.max(0,(fr-.25-k*.2)/.4);if(op>0){const x=36+k*16;g+=`<path d="M${x} 46q-5 -6 0 -12q5 -6 0 -12" fill="none" stroke="var(--mu)" stroke-width="1.5" stroke-linecap="round" opacity="${Math.min(1,op).toFixed(2)}"/>`}}
   /* thermometer: fixed marks at start, 63% and final */
   const ty=q=>94-q*70;
   g+=`<rect x="106" y="16" width="10" height="82" rx="5" fill="var(--s2)" stroke="var(--line)"/><circle cx="111" cy="101" r="7.5" fill="var(--orange)"/>`;
   g+=`<rect x="108.5" y="${ty(fr).toFixed(1)}" width="5" height="${(101-ty(fr)).toFixed(1)}" rx="2.5" fill="var(--orange)"/>`;
   [[1,sig(20+v.K)+" °C final","var(--tx)"],[.632,"63%: "+sig(20+.632*v.K)+" °C","var(--blue)"],[0,"start 20 °C","var(--mu)"]].forEach(([q,s,c])=>g+=`<path d="M103 ${ty(q).toFixed(1)}H119" stroke="${c}" stroke-width="1.3"/>`+T50(123,ty(q)+3,s,"start",c,600,9));
   /* gap left after each time constant */
   g+=T50(198,12,"gap left to final","start","var(--mu)",500,9);
   const bw=50,row=(y,lab,q,c,bold)=>T50(198,y+7,lab,"start",bold?"var(--tx)":"var(--mu)",bold?700:500,9)+T50(242,y+7,(q>=.1?Math.round(100*q):q>=.001?(100*q).toFixed(1):"~0")+"%","end",bold?"var(--tx)":"var(--mu)",bold?700:500,9)+
    `<rect x="246" y="${y}" width="${bw}" height="8" rx="4" fill="var(--s3)"/><rect x="246" y="${y}" width="${(bw*q).toFixed(1)}" height="8" rx="4" fill="${c}"/>`;
   ["0","τ","2τ","3τ","4τ"].forEach((lab,k)=>g+=row(20+k*15,lab,Math.exp(-k),"var(--fa)",Math.abs(n-k)<.03));
   g+=row(97,"now",1-fr,"var(--orange)",true);
   let ov="";for(let k=1;k<=4;k++){const t=k*v.tau;if(t>480)break;const x=(44+t/480*246).toFixed(1);ov+=`<path d="M${x} 14V170" stroke="var(--fa)" stroke-dasharray="2 3"/>`+(x>60?`<text x="${(x>272?x-3:+x+3).toFixed(1)}" y="24" text-anchor="${x>272?"end":"start"}" class="m h52">${k>1?k:""}τ</text>`:"")}
   r.svg=`<svg viewBox="0 0 300 318" role="img" aria-label="A pot heating on a hot plate, a thermometer and the gap left after each time constant, above the step-response graph"><g stroke="none">${g}</g>${NEST50(r.svg,116,ov)}</svg>`;
   return r}};
 DEMO_OVR["ctrl-feedback-2"]="fo51"})()}catch(e){}

/* 3. proportional control and offset: draining tank */
try{(function(){const L=LES50("ctrl-feedback-3");if(!L||!L.demo||typeof L.demo!="object")return;
 const base=mkSpec(L.demo);
 DEMOS.pt51={...base,t:"Why P control leaves an offset",
  hint:"Water drains out the bottom all the time, so the valve has to stay open to hold any level. A P controller opens the valve in proportion to the error (u = Kp·e), so the level must sit below the setpoint to keep it open: error = r / (1 + loop gain). Switch to P + I: the integral term holds the valve open with zero error. Model: steady state, drain flow proportional to level.",
  ui:()=>base.ui()+pickc("md","Controller",[["0","P only"],["1","P + I"]],"0"),
  run(v){const r=base.run(v),pi=+v.md==1,h=pi?100:100*v.L/(1+v.L),e=100-h,mo=!RM50();let g="";
   const lv=q=>120-q*.8,yw=lv(h);
   /* inflow pipe and valve */
   g+=`<rect x="8" y="10" width="122" height="8" fill="var(--s3)"/><rect x="122" y="10" width="8" height="16" fill="var(--s3)"/>`;
   g+=`<path d="M44 7L60 21V7L44 21Z" fill="color-mix(in srgb,var(--blue) ${Math.round(20+70*h/100)}%,var(--s2))" stroke="var(--tx)" stroke-width="1.2"/>`;
   g+=T50(47,30,"valve","end","var(--tx)",600,9)+T50(47,40,sig(h,2)+"% open","end","var(--tx)",600,9);
   /* tank, water, setpoint */
   g+=`<rect x="105" y="${yw.toFixed(1)}" width="78" height="${(119-yw).toFixed(1)}" fill="color-mix(in srgb,var(--blue) 40%,transparent)"/>`;
   g+=`<path d="M104 24V120H184V24" fill="none" stroke="var(--fa)" stroke-width="2"/>`;
   g+=`<path d="M98 ${lv(100)}H190" stroke="var(--blue)" stroke-width="1.4" stroke-dasharray="4 3"/>`+T50(192,lv(100)-2,"setpoint","start","var(--blue)",700,9);
   g+=T50(192,h<15?lv(15):yw+12,"level "+sig(h,3)+"%","start","var(--tx)",700,9);
   if(e>.5){g+=`<path d="M176 ${lv(100)}V${yw.toFixed(1)}" stroke="var(--orange)" stroke-width="2"/><path d="M172 ${lv(100)}H180M172 ${yw.toFixed(1)}H180" stroke="var(--orange)" stroke-width="1.5"/>`;
    g+=e>=14?T50(192,(lv(100)+yw)/2+3,"error "+sig(e,3)+"%","start","var(--orange)",700,9):T50(192,yw+23,"error "+sig(e,2)+"%","start","var(--orange)",700,9)}
   else g+=T50(192,yw+23,"error 0","start","var(--ok)",700,9);
   /* streams: inflow = outflow = level */
   const w=1+5*h/100,st=(d,len)=>h<.5?"":`<path d="${d}" stroke="var(--blue)" stroke-width="${w.toFixed(1)}" stroke-dasharray="5 3" fill="none">${mo?`<animate attributeName="stroke-dashoffset" values="16;0" dur="${(.25+.6*(1-h/100)).toFixed(2)}s" repeatCount="indefinite"/>`:""}</path>`;
   g+=st(`M126 26V${yw.toFixed(1)}`);
   g+=`<rect x="184" y="112" width="38" height="7" fill="var(--s3)"/>`+st("M218 119V140")+T50(226,134,"drain","start","var(--mu)",500,9);
   g+=T50(104,140,"steady: inflow = outflow","start","var(--mu)",500,9);
   /* level sensor and controller */
   g+=`<rect x="8" y="50" width="86" height="30" rx="4" fill="var(--s2)" stroke="var(--line)"/>`+T50(51,63,pi?"u = Kp·e + Ki∫e":"u = Kp·e","middle","var(--tx)",700,9)+T50(51,74,"controller","middle","var(--mu)",500,8.5);
   g+=`<path d="M104 ${yw.toFixed(1)}L94 70" stroke="var(--fa)" stroke-dasharray="3 2"/><circle cx="104" cy="${yw.toFixed(1)}" r="2.5" fill="var(--fa)"/>`;
   g+=`<path d="M52 50V22" stroke="var(--fa)" stroke-dasharray="3 2"/>`;
   g+=pi?T50(8,96,"The integral holds the","start","var(--ok)",600,9)+T50(8,107,"valve open at zero error.","start","var(--ok)",600,9)
        :T50(8,96,"The valve only opens","start","var(--orange)",600,9)+T50(8,107,"while there is error.","start","var(--orange)",600,9);
   if(pi){r.out.r0="0 %";r.out.r1="100 % of setpoint"}
   const ov=pi?`<text x="290" y="40" text-anchor="end" class="h52" style="fill:var(--ok)">P + I: no offset at any gain</text>`:"";
   r.svg=`<svg viewBox="0 0 300 350" role="img" aria-label="A draining tank with a controlled inflow valve, above the offset-versus-loop-gain graph"><g stroke="none">${g}</g>${NEST50(r.svg,150,ov)}</svg>`;
   return r}};
 DEMO_OVR["ctrl-feedback-3"]="pt51"})()}catch(e){}

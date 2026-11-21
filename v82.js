/* ===== v82 (2026-11-21): card pictures, fasteners, two's complement, warm-up variety =====
   1. Card figures: design3 card 1 (load along 3D-print layers vs across them), ctrl-feedback-1 card 2 (the loop:
      r → e → controller → u → plant → y, fed back), ctrl-pid-2 card 3 (noisy signal, raw derivative, filtered).
   2. mech1 (Fasteners and keys): a card on screw heads and nuts, and three questions added at the end (socket,
      button and flat heads; nyloc, jam and flange nuts). Existing questions keep their indices.
   3. Two's complement range equations in the Computer science bank, mapped to cs2 #0, so they open in the solver.
   4. Quick warm-up rotates: questions from your last three warm-ups are skipped while enough others exist, and it
      picks from the 30 easiest candidates instead of always the same 5. Kept per device in tol3 (st.warm82). */
try{FB.ver="b82"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["New pictures on cards in Process limits, Open and closed loop, and Derivative action.","Fasteners: screw heads and nut types.","Quick warm-up mixes in different questions each time."]})}catch(e){}

/* 1. figures */
try{if(!LFIG17.design3)fig17("design3",0,"A print is weakest between layers. Load it along the layers (left) and every layer carries the force; pull across them (right) and only the bond between layers holds.",{view:[0,12,0,6],eq:true,axes:false,h:170,layers:[
 {t:"poly",pts:[[1,1.6],[5,1.6],[5,4.4],[1,4.4]],fill:true,c:"blue",op:.18},{t:"poly",pts:[[7.6,.9],[10.4,.9],[10.4,5.1],[7.6,5.1]],fill:true,c:"bad",op:.14},
 ...[2.16,2.72,3.28,3.84].map(y=>Ln(1,y,5,y,"fa",.8)),...[1.74,2.58,3.42,4.26].map(y=>Ln(7.6,y,10.4,y,"fa",.8)),
 Ln(5.1,3,5.9,3,"orange",2),Ln(.9,3,.1,3,"orange",2),Ln(9,5.2,9,5.9,"orange",2),Ln(9,.8,9,.1,"orange",2),
 Tx(3,1.05,"strong","middle"),Tx(11.2,3.1,"weak","middle")]})}catch(e){}
try{if(!LFIG17["ctrl-feedback-1"])fig17("ctrl-feedback-1",1,"The loop: the error e = r − y goes to the controller, which sends command u to the plant. The sensor feeds the output y back to be subtracted again.",{view:[0,12,0,6],eq:true,axes:false,h:170,layers:[
 {t:"circle",cx:2.2,cy:4,r:.45,c:"tx",w:1.4},Tx(2.2,4.15,"−","middle"),
 {t:"poly",pts:[[3.6,3.4],[6,3.4],[6,4.6],[3.6,4.6]],fill:true,c:"blue",op:.2},{t:"poly",pts:[[7.4,3.4],[9.8,3.4],[9.8,4.6],[7.4,4.6]],fill:true,c:"orange",op:.2},
 Tx(4.8,3.85,"controller","middle"),Tx(8.6,3.85,"plant","middle"),
 Ln(.3,4,1.75,4,"tx",1.3),Ln(2.65,4,3.6,4,"tx",1.3),Ln(6,4,7.4,4,"tx",1.3),Ln(9.8,4,11.7,4,"tx",1.3),
 Ln(10.8,4,10.8,1.6,"fa",1.2),Ln(10.8,1.6,2.2,1.6,"fa",1.2),Ln(2.2,1.6,2.2,3.55,"fa",1.2),
 Tx(.4,4.5,"r",""),Tx(2.8,4.5,"e",""),Tx(6.4,4.5,"u",""),Tx(11.1,4.5,"y",""),Tx(6.5,1.05,"measured output y","middle")]})}catch(e){}
try{if(!LFIG17["ctrl-pid-2"])fig17("ctrl-pid-2",2,"A slow signal with a little fast noise (top). Its raw derivative is mostly noise, because a wobble of frequency ω is multiplied by ω. A low-pass filter on the D term keeps the slow trend.",{view:[0,6.3,-3.6,5.9],axes:false,h:230,layers:[
 {t:"fn",f:"4.5+0.6*sin(x)+0.04*sin(40*x)",c:"tx",n:600},{t:"fn",f:"0.9+0.6*cos(x)+1.6*cos(40*x)",c:"bad",n:900},{t:"fn",f:"0.6*cos(x)+0.16*cos(40*x)-2.7",c:"blue",n:900},
 Tx(.05,5.45,"signal",""),Tx(.05,3.38,"raw derivative",""),Tx(.05,-1.5,"filtered derivative","")]})}catch(e){}

/* 2–3. content, after build() */
function fix82(){const L=id=>LS.find(l=>l.id==id);
 try{const l=L("mech1");if(l&&l.qs.length==2&&!l.cards.some(c=>/Socket head/.test(c))){
  l.cards.push("Screw heads: a socket head cap screw takes an Allen key and sits in a counterbore; a button head is low and rounded; a flat head is countersunk to sit flush. Nuts: a nyloc nut has a nylon ring that grips the thread so it resists loosening, a jam nut is a thin second nut tightened against the first, and a flange nut has a built-in washer that spreads the load.");
  l.qs.push({t:"mc",q:"A screw head has to sit flush with the surface. Which head do you pick?",ans:"Flat (countersunk) head",wrong:["Button head","Socket head cap screw","Hex head"],why:"A flat head is cone-shaped and sits in a countersink, flush with the surface. A button head is low but still stands proud; a socket head cap screw sits flush only in a counterbore; a hex head always sticks out."},
   {t:"mc",q:"A nut must not shake loose on a vibrating machine, and you only have room for one nut. Which one?",ans:"Nyloc nut",wrong:["Jam nut","Flange nut","Wing nut"],why:"The nyloc’s nylon ring grips the thread and resists loosening. A jam nut needs a second nut locked against it; a flange nut spreads load but doesn’t lock; a wing nut is made to be loosened by hand."},
   {t:"match",q:"Match each fastener to what sets it apart.",pairs:[["Socket head cap screw","Allen key, sits in a counterbore"],["Button head","Low, rounded head"],["Flat head","Countersunk, sits flush"],["Flange nut","Built-in washer spreads the load"]],why:"Head shape decides the tool and how far it stands proud; a flange nut’s washer is part of the nut."});
  l.qs.forEach((q,j)=>{try{const k="mech1#"+j;if(!QX[k])QX[k]={q,l}}catch(e){}})}}catch(e){}
 try{const l=L("cs2"),x=l&&l.qs[0];if(x&&/two’s complement/.test(x.q)&&EQX["Nmax = 2^(n − 1) − 1"])QD30["cs2#0"]=[QH30(x.q),["Nmax = 2^(n − 1) − 1","Nmin = −2^(n − 1)"]]}catch(e){}}
try{if(EQB.cs){EQB.cs.e.push(["Two’s complement largest value","Nmax = 2^(n − 1) − 1","Nmax largest value, n bits"],["Two’s complement smallest value","Nmin = −2^(n − 1)","Nmin smallest value, n bits"]);
 ["Nmax = 2^(n − 1) − 1","Nmin = −2^(n − 1)"].forEach((f,i)=>{if(!EQX[f]){const e=EQB.cs.e.find(z=>z[1]==f),q=eqParse25(e[0],e[1],e[2]);if(q)EQX[f]=q}})}}catch(e){}
try{const _bu82=build;build=function(){const r=_bu82.apply(this,arguments);try{fix82()}catch(e){}return r}}catch(e){}

/* 4. warm-up rotation */
try{const _wk82=warmKeys;warmKeys=function(){try{const now=Date.now(),ok=k=>!!(QX[k]&&!st.miss[k]&&st.subj.includes(QX[k].l.sub)),pool=[];const add=k=>{if(ok(k)&&!pool.includes(k))pool.push(k)};
 (st.seen||[]).filter(s=>s.ok&&now-s.t<WARM_DAYS*864e5).map(s=>s.k).reverse().forEach(add);
 Object.keys(st.doneAt||{}).sort((a,b)=>st.doneAt[b]-st.doneAt[a]).forEach(id=>{const l=LS.find(x=>x.id==id);if(l)l.qs.forEach((q,j)=>add(id+"#"+j))});
 if(pool.length<60)mixKeys().sort((a,b)=>warmEase(a)-warmEase(b)).forEach(add);
 const recent=new Set(st.warm82||[]),cand=pool.slice(0,90).sort((a,b)=>warmEase(a)-warmEase(b)).slice(0,30),fresh=cand.filter(k=>!recent.has(k));
 const use=fresh.length>=WARM_N?fresh:cand;return shuf(use.slice()).slice(0,WARM_N).sort((a,b)=>warmEase(a)-warmEase(b))}catch(e){return _wk82.apply(this,arguments)}}}catch(e){}
try{const _sw82=startWarm;startWarm=function(){const r=_sw82.apply(this,arguments);try{if(SS&&SS.mode=="warm"&&SS.qs){st.warm82=(st.warm82||[]).concat(SS.qs.map(q=>q.key)).slice(-15);save()}}catch(e){}return r}}catch(e){}

try{[
 {b:"b82",k:"fg82",t:"New card pictures",c:"Layer loading (Process limits card 1), the feedback loop (Open and closed loop card 2), noisy derivative (Derivative action card 3).",go:["lesson","design3"]},
 {b:"b82",k:"ft82",t:"Fastener heads and nuts",c:"Fasteners and keys: new last card and three new questions at the end.",go:["q","mech1",2]},
 {b:"b82",k:"tc82",t:"Two's complement in the solver",c:"Open Tools on this question: Nmax = 2^(n − 1) − 1 opens.",go:["q","cs2",0,1]},
 {b:"b82",k:"wu82",t:"Warm-up rotates",c:"Run Quick warm-up twice: the second set is different.",go:["learn"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

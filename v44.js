/* ===== v44 (2026-11-17): new logo; a batch of tester flags =====
   0. Logo: refined ± (white +, orange −, thicker strokes) on the blue tile. The LOGO const and the two
      embedded icons live in index.html (one-line edits there); icon-180.png / icon-192.png redrawn.
   1. Bearing life (mech-machine-3): card 1 reworded; question #1 no longer leans on "that bearing" from
      the question before it (practice and review show it on its own).
   2. A lesson left open is dropped after 1 h instead of 12 h: on reopen, and when the app comes back to
      the foreground after an hour or more in the background, you land on Learn.
   3. Feedback box (and other text boxes): the blue focus border plus the global focus outline drew two
      rings. Keep the border only.
   4. Settings: the "Calculator keyboard" on/off row is gone. Turning it off broke the tools calculator.
      Anyone who had it off is switched back on, including copies that arrive through sync.
   5. KKT lab (cmKKT): the ∇f/4 and ∇g/4 labels sat on top of each other. ∇f/4 now goes above its arrow
      tip, ∇g/4 below.
   6. Gradient descent, Newton and Adam lab (cmPaths): in "paths" mode Adam wasn't drawn at all, so it
      looked like it started somewhere else. All three start at (1, 2); Adam's first step is now drawn from
      there too. */
try{FB.ver="b44"}catch(e){}
try{NEWS.unshift({d:"2026-11-17",t:["New app logo.","Lessons left open for more than an hour now go back to Learn.","Bearing life: clearer first card and a self-contained hours question.","KKT and gradient-path labs: labels no longer overlap, and Adam's first step shows in paths mode.","The calculator keyboard is always on (turning it off broke the tools calculator)."]})}catch(e){}

/* 1. bearing life content */
try{const l=BUNDLE.find(x=>x.id=="mech-machine-3");if(l){
 l.cards[0]="Rolling bearings wear out by surface fatigue: after enough load cycles, small pits form on the races and rolling elements. The L10 life is the number of revolutions that 90% of a batch of identical bearings reaches or exceeds.";
 const q=l.qs[1];if(q&&/^That bearing/.test(q.q))q.q="A ball bearing with C = 20 kN carries P = 2 kN, so L10 = 1000 million revolutions. It runs at 1000 rpm. What is its L10 life in hours?";
}}catch(e){}

/* 2. resume timeout: 1 h */
const RS44_MS=36e5;
const _rsTry44=rsTry;rsTry=function(){try{const r=st.resume;if(r&&Date.now()-(r.ts||0)>RS44_MS)rsClear()}catch(e){}return _rsTry44.apply(this,arguments)};
let HID44=0;
document.addEventListener("visibilitychange",()=>{try{
 if(document.hidden){HID44=Date.now();return}
 const away=HID44?Date.now()-HID44:0;HID44=0;
 if(away>RS44_MS&&SS&&/^(lesson|review|practice)$/.test(SS.kind)){SS=null;rsClear();try{closeSheet()}catch(e){}home()}
}catch(e){}});

/* 3. one focus ring on text boxes */
try{const s=document.createElement("style");s.id="v44css";s.textContent=
 `textarea:focus-visible{outline:none;border-color:var(--blue)!important}`;
 document.head.appendChild(s)}catch(e){}

/* 4. calculator keyboard always on */
try{if(st.ownkb===false){st.ownkb=true;save()}}catch(e){}
const _mp44=mergeP28;mergeP28=function(){const r=_mp44.apply(this,arguments);try{if(r&&r.ownkb===false)r.ownkb=true}catch(e){}return r};
const _set44=settings;settings=function(){_set44.apply(this,arguments);try{
 const b=document.querySelector('.pad button.row[onclick*="ownkb"]');if(b)b.remove()}catch(e){}};

/* 5 + 6. lab label overlap and Adam's first step */
try{const re44=(id,fix)=>{const d=XD39.find(z=>z.id==id);if(!d)return;fix(d.spec);delete DEMOS[id];reg17(id,d.spec)};
 re44("cmKKT",S=>{const L=S.layers,f=L.find(o=>o.t=="vec"&&o.l=="∇f/4"),g=L.find(o=>o.t=="vec"&&o.l=="∇g/4");if(!f||!g)return;
  delete f.l;delete g.l;
  L.push({t:"text",x:"cc+0.5*(cc+1)",y:0.45,s:"∇f/4",anc:"middle"},{t:"text",x:"cc+0.25",y:-0.6,s:"∇g/4",anc:"middle"})});
 re44("cmPaths",S=>{const L=S.layers;if(L.some(o=>o.l=="Adam step 1"))return;
  const i=L.findIndex(o=>o.t=="pt"&&o.x=="bx");
  L.splice(i<0?L.length:i,0,{t:"vec",x0:1,y0:2,dx:"-0.3",dy:"-0.3",c:"orange",l:"Adam step 1",when:"1-md"})});
}catch(e){}

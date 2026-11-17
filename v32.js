/* ===== v32 web (2026-11-16): progress that survives new builds, friends by code, tester feedback =====
   WHY PROGRESS RESET: each new build can open with empty on-device storage. Only accounts that could write to the
   app's database kept a cloud copy, and the database rules only let Contributors and up write, so public-link
   testers (Viewers) never had one. Seth's own copy survived, but the merge treated the blank new-build copy as
   "newer", so tips, skill checks and review history were dropped.
   claude.ai never lets Viewers write data (a public link gives view only), so testers must be shared by name as
   Contributors to get a cloud copy; the existing rules (data/users/{self} at interact) already allow that.
   FIX: (1) testers are added as Contributors (owner action); (2) a blank copy at start-up never counts as newer than the cloud copy; (3) the app waits briefly for the cloud copy
   before showing a first-run screen; (4) keys missing from one copy are kept from the other; (5) a banner tells
   signed-out viewers their progress is only on this device. */
try{FB.ver="b32"}catch(e){}
try{NEWS.unshift({d:"2026-11-16",t:["New versions no longer wipe progress for testers who can save to their account, and a blank start-up copy can no longer overwrite your saved one. If your progress is only on this device, a banner on Learn says so and offers a backup code.","Friends: Settings or the Learn card → Friends. Share your friend code, add a friend’s code, and see each other’s streaks. Only people you add show up.","New lessons: Mohr’s circle (Mechanical → Mechanics of materials) and Supersonic flow (Aerospace → Aerodynamics), each with a lab.","Ordering questions turn all green when you get them right. Torsion questions use matching units and give J. Clearer molding and 3D-printing questions and demos."]})}catch(e){}

/* ---------- 1. progress: a blank start-up copy never wins ---------- */
const FRESH32=(()=>{try{return !st.placed&&!Object.keys(st.done||{}).length&&!(+st.xp>0)}catch(e){return false}})();
let FR32=FRESH32;
const INF32=(()=>{try{return /claudeusercontent\.com$/.test(location.hostname)}catch(e){return false}})();
const _mg32=mergeP28;
mergeP28=function(a,b){a=a||{};b=b||{};let A=a;if(FR32&&a===st)A=Object.assign({},a,{ts:0});
 const m=_mg32(A,b);
 try{const nb=(b.ts||0)>(A.ts||0),od=nb?A:b;Object.keys(od).forEach(k=>{if(m[k]===undefined&&k!="resume")m[k]=od[k]});
  m.tips=Object.assign({},A.tips||{},b.tips||{});
  const fa=Array.isArray(a.friends)?a.friends:[],fb=Array.isArray(b.friends)?b.friends:[],rm=new Set([...(a.unfriend||[]),...(b.unfriend||[])]);
  m.friends=[...new Set([...fa,...fb])].filter(x=>!rm.has(x));m.unfriend=[...rm].slice(-50);
  if(!m.nick)m.nick=a.nick||b.nick||""}catch(e){}
 if(NET.cg32)FR32=false;return m};
const _cg32=cloudGet28;cloudGet28=async function(){const r=await _cg32.apply(this,arguments);NET.cg32=1;if(!r)FR32=false;return r};

/* push: same as b28, but records whether the save worked */
pushProgress=async function(){if(!NET.db)return;try{let c=null;try{c=await cloudGet28()}catch(e){}
 if(c){const m=mergeP28(st,c.st);if(sig28(m)!=sig28(st))applyLocal28(m);
  if(NET.bakK!=dayKey()){NET.bakK=dayKey();try{const bd=NET.db.doc("data/users/"+NET.uid+"/progress_bak"),bs=await bd.get();if(!bs.exists||(bs.data()||{}).day!=dayKey())await bd.set({st:c.raw.st,ts:c.raw.ts||0,day:dayKey()})}catch(e){}}}
 await NET.db.doc("data/users/"+NET.uid+"/progress").set({st:JSON.stringify({...st,custom:(st.custom||[]).length>40?[]:st.custom}),ts:st.ts||Date.now()});
 NET.saveOK=Date.now();NET.saveErr="";if(NET.canWrite===false)NET.canWrite=true}
 catch(e){NET.saveErr=(e&&e.code)||"error"}banner32()};

/* friend card: written for everyone signed in (rules allow your own card), with your chosen name */
pushPeople=async function(){if(!NET.db||!NET.uid)return;const body={streak:streakNow(),last:st.last?dayKey(st.last):"",today:dailyDone()?dayKey():"",title:dailyDone()&&st.daily&&st.daily.t?st.daily.t:"",xp:st.xp||0,nick:String(st.nick||"").slice(0,30)};
 const sig=JSON.stringify(body);if(sig==NET.lastPush)return;NET.lastPush=sig;try{await NET.db.doc("people/"+NET.uid).set(body)}catch(e){NET.lastPush=""}};

const _ni32=netInit;netInit=async function(){try{await _ni32.apply(this,arguments)}finally{NET.done32=1;try{if(NET.db&&NET.uid){pushProgress();pushPeople()}}catch(e){}banner32()}};

/* first screen: on a blank copy inside claude.ai, wait up to 6 s for the cloud copy before onboarding */
let BOOT32=FRESH32&&INF32&&!!(window.claude&&claude.use);
const _home32=home;home=function(){if(BOOT32){BOOT32=false;view="boot32";
 bare(`<div class="screen onb" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;text-align:center"><div class="spin32"></div><p class="kick blue" style="margin-top:18px">Loading your progress…</p></div>`);
 const t0=Date.now(),go=()=>{if(view!="boot32")return;if(NET.done32||Date.now()-t0>6000){try{build()}catch(e){}view="";_home32()}else setTimeout(go,120)};setTimeout(go,120);return}
 return _home32.apply(this,arguments)};

/* ---------- 2. banner when progress only lives on this device ---------- */
function banner32(){try{const b=$("#bn32");const bad=INF32&&NET.done32&&(!NET.uid||(NET.saveErr&&!NET.saveOK));
 if(!bad){if(b)b.remove();return}if(view!="learn"||b)return;const anc=$(".daily")||$("#app .screen");if(!anc)return;
 const msg=!NET.uid?"You’re not signed in to claude.ai, so your progress is only on this device and a new version of the app can erase it. Sign in to keep it.":(NET.canWrite===false||/perm|denied|invalid|not_granted|forbidden/i.test(NET.saveErr||"")?"You can view this app but not save to it, so your progress is only on this device and a new version can erase it. Ask the app’s owner to add you as a tester (Contributor).":"Your progress couldn’t be saved to your account just now, so it’s only on this device. It will retry.");
 anc.insertAdjacentHTML(anc.classList.contains("daily")?"beforebegin":"afterbegin",`<div class="bn32" id="bn32" role="status"><b>Progress not backed up</b><span>${msg}</span><button class="btn ghost sm" onclick="codeSheet28()">Copy a backup code</button></div>`)}catch(e){}}
const _learn32=learn;learn=function(){const r=_learn32.apply(this,arguments);banner32();return r};
const _set32=settings;settings=function(){_set32.apply(this,arguments);try{const s=$("#syn28");if(s)s.textContent=NET.saveOK?"Saved on this device and in your claude.ai account. New versions of the app keep it.":NET.uid?(NET.saveErr?"Couldn’t reach your account yet; saved on this device for now.":"Saved on this device; syncing to your account…"):"Only on this device. Sign in to claude.ai to keep it when the app updates.";
 const fr=[...document.querySelectorAll('.pad .row')].find(r=>/Friends and sync/.test(r.textContent));if(fr){const sm=fr.querySelector("small");if(sm)sm.textContent=NET.uid?`${(st.friends||[]).length} friend${(st.friends||[]).length==1?"":"s"} · add a friend with their code`:"Sign in to claude.ai to add friends"}}catch(e){}};

/* ---------- 3. friends by code: only people you add are shown ---------- */
try{let ALL32=Array.isArray(NET.people)?NET.people:[];Object.defineProperty(NET,"people",{configurable:true,enumerable:true,
 get(){const f=new Set(st.friends||[]);return ALL32.filter(p=>p.id==NET.uid||f.has(p.id))},
 set(v){ALL32=Array.isArray(v)?v:[];ALL32.forEach(p=>{if(p.nick&&!NET.pn32?.[p.id])NET.names[p.id]=p.nick})}})}catch(e){}
const _rn32=resolveNames;resolveNames=async function(){await _rn32.apply(this,arguments);try{NET.pn32=NET.pn32||{};Object.keys(NET.names).forEach(k=>NET.pn32[k]=1)}catch(e){}};
const okCode32=c=>/^u_[A-Za-z0-9_-]{6,64}$/.test(c);
function friendsSheet(){const k=dayKey(),me=NET.uid;
 if(!NET.db||!me){sheet(`<p class="kick">Friends</p><h2 class="sht">Sign in to add friends</h2><p class="body">Friends and streaks use your claude.ai account. Open this app while signed in to claude.ai, then come back here.</p><button class="btn ghost" onclick="closeSheet()">Close</button>`,"var(--blue)");return}
 const byId={};NET.people.forEach(p=>byId[p.id]=p);
 const rows=(st.friends||[]).map(id=>byId[id]||{id,missing:1}).concat([{id:me,streak:streakNow(),last:st.last?dayKey(st.last):"",today:dailyDone()?k:"",title:dailyDone()&&st.daily?st.daily.t:"",me:1}])
  .sort((a,b)=>(b.streak||0)-(a.streak||0));
 const nm=p=>p.me?"You":(NET.names[p.id]||p.nick||"Friend");
 const list=rows.map((p,i)=>{const live=p.last==k||p.last==dayKey(Date.now()-864e5),s=live?p.streak||0:0;
  return `<div class="brow ${p.me?"me":""}"><span class="mono rk">${i+1}</span><span class="pp ${p.today==k?"on":""}"><i>${esc(initials(p.me?(st.nick||NET.names[me]||"You"):nm(p)))}</i></span><span class="grow"><b>${esc(nm(p))}</b><small>${p.missing?"Hasn’t opened Tolerance with this code yet":p.today==k?"Did today’s lesson"+(p.title?": "+esc(p.title):""):"Not yet today"}</small></span><span class="mono st8">${s}<small>day${s==1?"":"s"}</small></span>${p.me?"":`<button class="fx32" aria-label="Remove ${esc(nm(p))}" onclick="unfriend32('${esc(p.id)}')">×</button>`}</div>`}).join("");
 sheet(`<p class="kick">Friends</p><h2 class="sht">Daily streaks</h2><div class="board">${list}</div>${(st.friends||[]).length?"":`<p class="body">No friends yet. Send someone your code, and add theirs below.</p>`}
 <p class="gl">Your friend code</p><div class="fc32"><code id="myc32">${esc(me)}</code><button class="btn ghost sm" onclick="copy32('${esc(me)}',this)">Copy</button></div>
 <p class="gl">Add a friend</p><div class="fc32"><input id="adc32" placeholder="Paste their code" autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Friend code"><button class="btn sm" onclick="addFriend32()">Add</button></div><p class="body" id="fm32" role="status" style="min-height:20px;margin:6px 0 0"></p>
 <p class="gl">Your name for friends</p><div class="fc32"><input id="nk32" maxlength="30" value="${esc(st.nick||"")}" placeholder="First name or nickname" aria-label="Name friends see"><button class="btn ghost sm" onclick="nick32()">Save</button></div>
 <p class="fine">Friends see your name, streak, XP and whether you did today’s lesson. Nobody else is listed. Adding works one way: they see you once they add your code too.</p><button class="btn ghost" onclick="closeSheet()">Close</button>`,"var(--blue)")}
async function copy32(t,b){try{await navigator.clipboard.writeText(t);b.textContent="Copied"}catch(e){const c=$("#myc32");if(c){const r=document.createRange();r.selectNodeContents(c);const s=getSelection();s.removeAllRanges();s.addRange(r)}b.textContent="Selected"}}
function addFriend32(){const i=$("#adc32"),m=$("#fm32");const c=((i&&i.value)||"").trim().replace(/^["'`]+|["'`]+$/g,"");
 if(!okCode32(c)){if(m){m.style.color="var(--bad)";m.textContent="That doesn’t look like a friend code. It starts with u_."}return}
 if(c==NET.uid){if(m){m.style.color="var(--bad)";m.textContent="That’s your own code."}return}
 st.friends=[...new Set([...(st.friends||[]),c])];st.unfriend=(st.unfriend||[]).filter(x=>x!=c);save();friendsSheet();try{if(view=="learn")refreshDaily()}catch(e){}}
function unfriend32(id){st.friends=(st.friends||[]).filter(x=>x!=id);st.unfriend=[...new Set([...(st.unfriend||[]),id])].slice(-50);save();friendsSheet();try{if(view=="learn")refreshDaily()}catch(e){}}
function nick32(){const i=$("#nk32");st.nick=((i&&i.value)||"").trim().slice(0,30);save();NET.lastPush="";pushPeople();friendsSheet()}

/* ---------- 4. ordering: every slot turns green when the order is right (mwirggebf58qn, mwjjzqkadsc7e).
   Since b25 the ordering list uses #otray, so the old right/wrong colouring (#tray .chip) found nothing. Wrong answers now mark each slot too. ---------- */
const _fb32=feedback;feedback=function(good){const r=_fb32.apply(this,arguments);try{const x=SS&&SS.qs&&SS.qs[SS.i];if(x&&x.it&&Array.isArray(SS.ord))document.querySelectorAll("#ordbox .oslot").forEach((s,i)=>{const c=SS.ord[i];if(good)s.classList.add("ok32");else if(c!==undefined)s.classList.add(x.it[c].k==i?"ok32":"bad32")})}catch(e){}return r};

/* ---------- 5. content fixes from tester feedback ---------- */
const FIX32=[];
function bq32(id){return (typeof BUNDLE!="undefined"?BUNDLE:[]).find(l=>l.id==id)}
function patchQ32(id,i,starts,obj){try{const l=bq32(id),q=l&&l.qs[i];if(!q||!String(q.q).startsWith(starts)){FIX32.push("miss "+id+"#"+i);return null}Object.keys(q).forEach(k=>{if(!(k in obj))delete q[k]});Object.assign(q,obj);FIX32.push("ok "+id+"#"+i);return q}catch(e){FIX32.push("err "+id+"#"+i);return null}}
function eqFor32(key,q,eqs){try{QD30[key]=[QH30(q.q),eqs]}catch(e){}}
/* torsion: matching units, J given (mwjjtl5exiajf, mwjjv5ohbj0ha, mwjjvwvauo5ti, mwjjx26kpt5qj, mwirb4t4x8sly) */
{const q=patchQ32("mech-machine-2",0,"A motor delivers 15 kW",{t:"fill",q:"A motor delivers 15 kW at a shaft speed of 150 rad/s. What is the shaft torque, in N·m?",a:100,tol:.01,unit:"N·m",hint:"Power = torque × angular speed, with P in watts and ω in rad/s.",why:"P = T·ω, so T = P/ω = 15,000 W ÷ 150 rad/s = 100 N·m. (150 rad/s is about 1430 rpm. Given rpm, convert first: ω = 2πn/60.)"});if(q)eqFor32("mech-machine-2#0",q,["P = Tω","ω = 2πn / 60"])}
{const q=patchQ32("mech-machine-2",1,"A solid 25 mm shaft",{t:"fill",q:"A solid 25 mm shaft carries 100 N·m. Its polar moment is J = πd⁴/32 = 38,350 mm⁴. What is the maximum shear stress, in MPa?",a:32.6,tol:.01,unit:"MPa",hint:"τ = T·r/J. Work in N·mm and mm so the answer comes out in N/mm², which is MPa.",why:"T = 100 N·m = 100,000 N·mm and r = 12.5 mm. τ = T·r/J = 100,000 × 12.5 / 38,350 ≈ 32.6 MPa."});if(q)eqFor32("mech-machine-2#1",q,["τ = Tr / J","J = πd⁴ / 32"])}
{const l=bq32("mech-machine-2"),q=l&&l.qs[2];if(q&&/diameter is doubled/.test(q.q)){q.hint="τ = T·r/J. J grows with d⁴ while r grows with d.";q.why="τ = T·r/J with r = d/2 and J = πd⁴/32, so τ = 16T/(πd³) ∝ 1/d³. Doubling d divides τ by 2³ = 8.";eqFor32("mech-machine-2#2",q,["τ = Tr / J","J = πd⁴ / 32"]);FIX32.push("ok mech-machine-2#2")}}
/* molding (mwioi81729g64, mwiow6rwskt5l, mwioyrvg0clce) */
patchQ32("mfg-injection-molding-2",1,"A part with 2 mm walls",{t:"mc",q:"A part has 2 mm walls. A stiffening rib on the back is 3 mm thick. What is most likely to show on the front face, right opposite the rib?",ans:"A sink mark along the rib line",wrong:["A weld line running along the rib","A short shot at the tip of the rib","The whole panel warping into a bow"],why:"Where the 3 mm rib meets the 2 mm wall the plastic is thickest, so it stays molten after the front skin has frozen. As that core shrinks it pulls the surface in: a sink mark. Rule of thumb: ribs about 50–60% of the wall."});
patchQ32("mfg-injection-molding-3",4,"Rank these parts by the clamp force",{t:"order",q:"Rank these parts by the clamp force they need, largest first.",items:["200 cm² at 40 MPa","100 cm² at 60 MPa","300 cm² at 10 MPa"],why:"F = p × A, and cm² × MPa ÷ 10 = kN: 200 × 40 ÷ 10 = 800 kN, 100 × 60 ÷ 10 = 600 kN, 300 × 10 ÷ 10 = 300 kN. The biggest part needs the least."});
{const l=bq32("mfg-injection-molding-4"),q=l&&l.qs[0];if(q&&/thin far corner/.test(q.q)){q.why="A thin, distant section loses heat fastest and freezes off before the melt arrives. Too little injection pressure or speed is one reason it gets there too late, so raising pressure or speed is a fix, along with warmer melt or mold or a thicker flow path. The cause the part shows is the freeze-off.";FIX32.push("ok mfg-injection-molding-4#0")}}
/* additive (mwip3df7mq8oq: SLS is right, explanation expanded; mwip4dzv1he19 overhang card) */
{const l=bq32("mfg-additive-1"),q=l&&l.qs[2];if(q&&/loose powder/.test(q.q)){q.why="In selective laser sintering (SLS) the unfused powder surrounds and supports the part, so overhangs print freely. HP Multi Jet Fusion works the same way. FDM and SLA both need supports for steep overhangs; directed energy deposition is mostly for metal.";FIX32.push("ok mfg-additive-1#2")}}
{const l=bq32("mfg-additive-2");if(l&&/^FDM can usually print overhangs/.test(l.cards[0]||"")){l.cards[0]="FDM can print overhangs up to about 45° from vertical without support on almost any printer, because each new layer still rests partly on the one below. A well-tuned printer with strong part cooling can often hold 60–75°.";FIX32.push("ok mfg-additive-2 card")}}

/* ---------- 6. demos ---------- */
const T32=(x,y,s,a="middle",c="currentColor",w=600,fs=11)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" font-weight="${w}" style="fill:${c}">${s}</text>`;
/* bits: the value slider only goes one lap past the register's top, and says how it wrapped (mwjj43v6whahe) */
try{const D=DEMOS.bits;if(D&&!D.v32){D.v32=1;const run=D.run;D.hint="An n-bit register holds 2ⁿ patterns: 0 to 2ⁿ − 1. 4 bits top out at 15. Store 16 or more and it wraps back to zero, like a car odometer. The slider goes one lap past the top so you can watch it happen.";
 D.run=function(v){const M=2**v.n,inp=document.querySelector('.demo[data-id="bits"] input[data-k="v"]');if(inp){const mx=Math.max(31,2*M-1);if(+inp.max!==mx){inp.max=mx;inp.step=1}if(+inp.value>mx){inp.value=mx;v={...v,v:mx}}}
  const o=run.call(this,v);try{const u=v.v%M;o.svg+=`<p class="bw32">${v.v<M?`${v.v} fits: the top is ${M-1}.`:`${v.v} doesn’t fit in ${v.n} bits (top is ${M-1}), so it wraps: ${v.v} − ${M*Math.floor(v.v/M)} = ${u}.`}</p>`}catch(e){}return o}}}catch(e){}
/* overhang: a side view of the layers, with the part hanging in air in red (mwip5aichavoa) */
DEMOS.am32over={t:"Overhang: what each layer sits on",hint:"Each layer steps out by layer height × tan θ. The blue part of a layer sits on the layer below; the red part hangs in air. Once more than half the layer hangs, plan on support. A tuned printer with strong cooling can push this further.",
 ui:()=>slider("th","Wall angle from vertical (°)",0,80,1,45)+slider("lh","Layer height (mm)",.08,.32,.02,.2)+pickc("ew","Line width",[[.4,"0.4 mm"],[.6,"0.6 mm"]],.4),
 ro:()=>rof([["Step out per layer","a"],["Layer resting on the one below","b"],["Verdict","c"]]),
 run(v){const st=v.lh*Math.tan(v.th*Math.PI/180),sup=Math.max(0,Math.min(1,1-st/v.ew)),K=110,N=7,h=v.lh*K,w=v.ew*K,dx=st*K,x0=40,yb=176;let g=`<path d="M10 ${yb}H290" stroke="var(--line)" stroke-width="2"/>`;
  for(let i=0;i<N;i++){const x=x0+i*dx,y=yb-(i+1)*h;if(x+w>292)break;const s=i==0?w:Math.max(0,Math.min(w,(x0+(i-1)*dx+w)-x));
   g+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${(h-1.5).toFixed(1)}" rx="3" fill="var(--blue)" stroke="none"/>`;
   if(s<w)g+=`<rect x="${(x+s).toFixed(1)}" y="${y.toFixed(1)}" width="${(w-s).toFixed(1)}" height="${(h-1.5).toFixed(1)}" rx="3" fill="var(--bad)" stroke="none" opacity=".85"/>`}
  const yt=yb-N*h;g+=`<path d="M${x0} ${yb}L${x0} ${Math.max(10,yt)}" stroke="var(--fa)" stroke-dasharray="3 3" stroke-width="1"/>`+T32(x0+4,Math.max(20,yt+10),"vertical","start","var(--mu)",600,10);
  g+=T32(150,16,`θ = ${v.th}° · step ${st.toFixed(3)} mm per layer`,"middle","currentColor",700)+T32(290,194,"layers drawn 110× size","end","var(--mu)",600,10);
  const vd=sup>=.5-1e-9?"Prints fine":sup>=.3?"Borderline: may sag":"Needs support";
  return {svg:`<svg viewBox="0 0 300 200">${g}</svg>`,lab:{th:v.th+"°",lh:v.lh.toFixed(2)+" mm"},out:{a:st.toFixed(3)+" mm",b:Math.round(sup*100)+"%",c:vd}}}};
DEMO_OVR["mfg-additive-2"]="am32over";
/* molding: melt flowing down a channel, freezing from the walls in (mwioxq78jil6z) */
DEMOS.mold32flow={t:"Flow and freeze in a thin wall",hint:"Hot melt enters at the gate and loses heat to the mold walls. A frozen skin grows from both walls; where the skins meet, flow stops. Thinner walls, colder melt or mold, and slower injection all make it stop sooner: a short shot. Numbers are illustrative.",
 ui:()=>slider("s","Wall thickness (mm)",.8,4,.1,1.5)+slider("Tm","Melt temperature (°C)",200,300,5,240)+slider("Tw","Mold temperature (°C)",20,90,5,50)+slider("u","Injection speed (%)",20,100,5,60)+slider("Lf","Distance to the far corner (mm)",50,300,10,100),
 ro:()=>rof([["Flow length before it freezes","a"],["Distance needed","b"],["Result","c"]]),
 run(v){const kT=Math.max(.2,(v.Tm-v.Tw)/190),reach=Math.max(10,95*v.s*kT*(.55+.45*v.u/100)*Math.sqrt(v.s/1.5)),L=Math.min(reach,v.Lf),ok=reach>=v.Lf;
  const X0=20,X1=280,Lmax=320,Xs=x=>X0+(X1-X0)*x/Lmax,yc=70,hh=12+v.s*7;let g="";
  g+=`<rect x="${X0}" y="${yc-hh-6}" width="${Xs(v.Lf)-X0}" height="${2*hh+12}" rx="6" fill="var(--s3)" stroke="var(--line)"/>`;
  const n=40;for(let i=0;i<n;i++){const x=L*i/n,x2=L*(i+1)/n,f=x/reach,sk=Math.min(1,Math.pow(f,1.3))*hh,col=tc25(Math.max(0,1-f*.9));
   g+=`<rect x="${Xs(x).toFixed(1)}" y="${(yc-hh+sk).toFixed(1)}" width="${(Xs(x2)-Xs(x)+1).toFixed(1)}" height="${Math.max(0,2*(hh-sk)).toFixed(1)}" fill="${col}" stroke="none"/>`;
   g+=`<rect x="${Xs(x).toFixed(1)}" y="${(yc-hh).toFixed(1)}" width="${(Xs(x2)-Xs(x)+.6).toFixed(1)}" height="${sk.toFixed(1)}" fill="${tc25(.12)}" stroke="none" opacity=".9"/><rect x="${Xs(x).toFixed(1)}" y="${(yc+hh-sk).toFixed(1)}" width="${(Xs(x2)-Xs(x)+.6).toFixed(1)}" height="${sk.toFixed(1)}" fill="${tc25(.12)}" stroke="none" opacity=".9"/>`}
  if(!ok)g+=`<rect x="${Xs(L)}" y="${yc-hh}" width="${Xs(v.Lf)-Xs(L)}" height="${2*hh}" fill="var(--bad)" stroke="none" opacity=".18"/>`+T32((Xs(L)+Xs(v.Lf))/2,yc+4,"empty","middle","var(--bad)",800);
  g+=`<path d="M${X0-12} ${yc}H${X0+2}" stroke="var(--orange)" stroke-width="5"/>`+T32(X0,yc-hh-12,"gate","start","var(--orange)",700)+T32(Xs(v.Lf),yc-hh-12,"far corner","end","var(--mu)",700);
  g+=T32(X0,134,"■ hot melt","start",tc25(1),700,10.5)+T32(X0+70,134,"■ frozen skin, growing from both walls","start",tc25(.12),700,10.5);
  return {svg:`<svg viewBox="0 0 300 140">${g}</svg>`,lab:{s:v.s.toFixed(1)+" mm",Tm:v.Tm+" °C",Tw:v.Tw+" °C",u:v.u+"%",Lf:v.Lf+" mm"},out:{a:Math.round(reach)+" mm",b:v.Lf+" mm",c:ok?"Fills":"Short shot"}}}};
DEMO_OVR["mfg-injection-molding-4"]="mold32flow";
/* Mohr's circle */
DEMOS.mohr32={t:"Mohr’s circle",hint:"X is the x face (σx, τxy) and Y the y face (σy, −τxy). The line between them is a diameter. Where the circle crosses the σ axis there is no shear: those are the principal stresses. The top of the circle is the largest in-plane shear. Angles on the circle are twice the angles on the part.",
 ui:()=>slider("sx","σx (MPa)",-100,150,5,80)+slider("sy","σy (MPa)",-100,150,5,20)+slider("txy","τxy (MPa)",-80,80,5,40),
 ro:()=>rof([["Center C","c"],["Radius R = τmax","r"],["σ1 / σ2","p"],["Principal angle θp","a"]]),
 run(v){const C=(v.sx+v.sy)/2,R=Math.hypot((v.sx-v.sy)/2,v.txy),s1=C+R,s2=C-R,tp=.5*Math.atan2(2*v.txy,v.sx-v.sy)*180/Math.PI;
  const lo=Math.min(-20,s2-15),hi=Math.max(40,s1+15),span=hi-lo,S=Math.min(250/span,160/(2*R+30)),ox=25-lo*S,oy=100,X=s=>ox+s*S,Y=t=>oy-t*S;
  let g=`<path d="M20 ${oy}H290" stroke="var(--fa)" stroke-width="1"/>`+(ox>20&&ox<290?`<path d="M${ox} 12V188" stroke="var(--fa)" stroke-width="1"/>`:"")+T32(290,oy-5,"σ","end","var(--mu)",700)+(ox>20&&ox<290?T32(ox+5,20,"τ","start","var(--mu)",700):"");
  g+=`<circle cx="${X(C)}" cy="${oy}" r="${R*S}" stroke="var(--blue)" stroke-width="2.2" fill="color-mix(in srgb,var(--blue) 8%,transparent)"/>`;
  g+=`<path d="M${X(v.sx)} ${Y(v.txy)}L${X(v.sy)} ${Y(-v.txy)}" stroke="var(--orange)" stroke-width="1.8"/>`;
  const dot=(x,y,c,l,a,dy)=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${c}" stroke="none"/>`+T32(x+(a=="end"?-7:a=="start"?7:0),y+(dy||-8),l,a||"middle",c,700,10.5);
  g+=dot(X(v.sx),Y(v.txy),"var(--orange)","X","start")+dot(X(v.sy),Y(-v.txy),"var(--orange)","Y","end");
  g+=dot(X(s1),oy,"var(--ok)","σ1","start",14)+dot(X(s2),oy,"var(--ok)","σ2","end",14)+dot(X(C),Y(R),"var(--gold)","τmax","middle",-8)+`<circle cx="${X(C)}" cy="${oy}" r="2.5" fill="currentColor" stroke="none"/>`;
  return {svg:`<svg viewBox="0 0 300 200">${g}</svg>`,lab:{sx:v.sx+" MPa",sy:v.sy+" MPa",txy:v.txy+" MPa"},out:{c:sig(C)+" MPa",r:sig(R)+" MPa",p:sig(s1)+" / "+sig(s2)+" MPa",a:sig(tp,3)+"° from x"}}}};
/* Mach cone */
DEMOS.mach32={t:"Mach cone",hint:"Each circle is a sound wave sent out earlier; it spreads at the speed of sound while the aircraft moves on at V. Above Mach 1 the aircraft outruns its own waves and they pile up on a cone of half-angle μ = asin(1/M). Faster means a narrower cone.",
 ui:()=>slider("M","Mach number",.6,4,.05,2)+slider("T","Air temperature (K)",210,300,1,217),
 ro:()=>rof([["Speed of sound a","a"],["Flight speed V","b"],["Cone half-angle μ","c"]]),
 run(v){const a=Math.sqrt(1.4*287*v.T),Vf=v.M*a,px=250,py=95,n=6,dt=1,sc=200/(Math.max(1,v.M)*n*dt);let g="";
  for(let i=n;i>=1;i--){const x=px-v.M*i*dt*sc,r=i*dt*sc;g+=`<circle cx="${x.toFixed(1)}" cy="${py}" r="${r.toFixed(1)}" stroke="var(--blue)" stroke-width="1.3" opacity="${(.35+.65*(1-i/n/1.2)).toFixed(2)}"/>`}
  if(v.M>1){const mu=Math.asin(1/v.M),L=260;g+=`<path d="M${px} ${py}L${(px-L*Math.cos(mu)).toFixed(1)} ${(py-L*Math.sin(mu)).toFixed(1)}M${px} ${py}L${(px-L*Math.cos(mu)).toFixed(1)} ${(py+L*Math.sin(mu)).toFixed(1)}" stroke="var(--orange)" stroke-width="2.2"/>`}
  g+=`<path d="M${px-10} ${py}L${px+8} ${py}M${px-3} ${py-6}L${px+1} ${py}L${px-3} ${py+6}" stroke="currentColor" stroke-width="2.5"/>`+T32(150,192,v.M>1?"supersonic: waves pile up on the cone":v.M>.99?"Mach 1: waves pile up in front":"subsonic: waves run ahead of the aircraft","middle","var(--mu)",700);
  return {svg:`<svg viewBox="0 0 300 200">${g}</svg>`,lab:{M:v.M.toFixed(2),T:v.T+" K"},out:{a:sig(a)+" m/s",b:sig(Vf)+" m/s",c:v.M>1?sig(Math.asin(1/v.M)*180/Math.PI,3)+"°":"no cone below Mach 1"}}}};

/* ---------- 7. new lessons: Mohr's circle (mwjivo4efibzs) and Supersonic flow (mwji9868zq21t) ---------- */
try{EQB.mohr={t:"Mohr’s circle",e:[["Circle center","C = (σx + σy)/2","C center (MPa), σx normal stress on the x face (MPa), σy normal stress on the y face (MPa)"],["Circle radius","R = √(((σx − σy)/2)² + τxy²)","R radius (MPa), σx normal stress on the x face (MPa), σy normal stress on the y face (MPa), τxy shear stress (MPa)"],["Largest principal stress","σ1 = C + R","σ1 largest principal stress (MPa), C center (MPa), R radius (MPa)"],["Smallest principal stress","σ2 = C − R","σ2 smallest principal stress (MPa), C center (MPa), R radius (MPa)"],["Maximum in-plane shear","τmax = R","τmax maximum in-plane shear (MPa), R radius (MPa)"],["Principal angle","θp = ½·atan(2·τxy/(σx − σy))·180/π","θp angle from x to the σ1 direction (deg), τxy shear stress (MPa), σx normal stress on the x face (MPa), σy normal stress on the y face (MPa)"]]};
 EQB.supersonic={t:"Supersonic flow",e:[["Mach number","M = V/a","M Mach number, V flight speed (m/s), a speed of sound (m/s)"],["Speed of sound","a = √(γ·R·T)","a speed of sound (m/s), γ heat capacity ratio (1.4 for air), R gas constant (287 J/(kg·K) for air), T temperature (K)"],["Mach cone half-angle","μ = asin(1/M)·180/π","μ half-angle (deg), M Mach number"],["Stagnation temperature","T0 = T·(1 + (γ − 1)/2·M²)","T0 stagnation temperature (K), T static temperature (K), γ heat capacity ratio, M Mach number"]]};
 ["mohr","supersonic"].forEach(k=>EQB[k].e.forEach(([n,f,d])=>{if(!EQX[f]){const q=eqParse25(n,f,d);if(q)EQX[f]=q}}));
 Object.keys(EQB).forEach(k=>EQB[k].e.forEach(en=>{if(!EQIDX30[en[1]]){EQIDX30[en[1]]=en;EQBK30[en[1]]=k}}));
 BANK_OF["Combined stress"]=["mohr","stress"]}catch(e){}
try{if(typeof BUNDLE!="undefined"&&!bq32("mech-mohr-1"))BUNDLE.push({id:"mech-mohr-1",sub:"mech",subName:"Mechanical",field:"Mechanical",section:"Mechanics of materials",branch:"Combined stress",lv:4,title:"Mohr’s circle",req:["mech-shear-2"],eqs:["mohr","stress"],
 cards:["A point inside a loaded part has normal stresses σx and σy and a shear τxy on a tiny x–y square. Turn that square and the three numbers change, even though the load didn’t.","Mohr’s circle draws every turned square at once. Plot X = (σx, τxy) for the x face and Y = (σy, −τxy) for the y face. The line between them is a diameter.","Center C = (σx + σy)/2, the average normal stress. Radius R = √(((σx − σy)/2)² + τxy²).","Where the circle crosses the σ axis the shear is zero. Those are the principal stresses: σ1 = C + R and σ2 = C − R. The top of the circle is the largest in-plane shear, τmax = R.","Turning the part by θ moves you 2θ around the circle. The σ1 direction is θp = ½·atan(2τxy/(σx − σy)) from the x axis."],
 qs:[{t:"fill",q:"σx = 80 MPa, σy = 20 MPa, τxy = 40 MPa. Where is the center of Mohr’s circle, in MPa?",a:50,tol:.01,unit:"MPa",why:"C = (80 + 20)/2 = 50 MPa."},
  {t:"fill",q:"Same element: σx = 80, σy = 20, τxy = 40 MPa. What is the radius of the circle, in MPa?",a:50,tol:.01,unit:"MPa",why:"R = √(30² + 40²) = √2500 = 50 MPa. (σx − σy)/2 = 30."},
  {t:"fill",q:"With C = 50 MPa and R = 50 MPa, what is the largest principal stress σ1, in MPa?",a:100,tol:.01,unit:"MPa",why:"σ1 = C + R = 100 MPa, and σ2 = C − R = 0."},
  {t:"mc",q:"Where on Mohr’s circle is the largest in-plane shear stress?",ans:"At the top and bottom of the circle, where τ = R",wrong:["Where the circle crosses the σ axis","At the center of the circle","At point X, the x face"],why:"Shear is the vertical coordinate, so it peaks at the top and bottom, equal to the radius. The σ-axis crossings have zero shear."},
  {t:"mc",q:"You turn the stress element 30° on the drawing. How far around Mohr’s circle do you move?",ans:"60°",wrong:["30°","15°","90°"],why:"Angles on the circle are double the angles on the part."},
  {t:"fill",q:"Pure shear: σx = σy = 0 and τxy = 30 MPa. What is σ1, in MPa?",a:30,tol:.01,unit:"MPa",why:"C = 0 and R = 30, so σ1 = +30 MPa and σ2 = −30 MPa: pure shear is equal tension and compression on planes at 45°."},
  {t:"match",q:"Match each part of Mohr’s circle to what it means.",pairs:[["Center C","Average normal stress"],["Radius R","Largest in-plane shear"],["σ-axis crossing","A principal stress, zero shear"],["2θ on the circle","θ on the part"]],why:"Those four facts are enough to read any Mohr’s circle."}]})}catch(e){}
try{if(typeof BUNDLE!="undefined"&&!bq32("aero-aerodynamics-5"))BUNDLE.push({id:"aero-aerodynamics-5",sub:"aero",subName:"Aerospace",section:"Flight",branch:"Aerodynamics",lv:5,title:"Supersonic flow and shocks",req:[],eqs:["supersonic","aero"],
 cards:["Mach number M = V/a compares flight speed with the local speed of sound. Below about Mach 0.8 the flow stays subsonic everywhere; above Mach 1 the aircraft is supersonic.","The speed of sound depends only on temperature: a = √(γRT). For air γ = 1.4 and R = 287 J/(kg·K), so a ≈ 340 m/s at 288 K and about 295 m/s at airliner cruise altitude (217 K).","Above Mach 1, pressure waves can’t run ahead of the aircraft. They pile up on a Mach cone with half-angle μ = asin(1/M).","Turning or slowing supersonic flow sharply makes a shock: a sudden jump in pressure, temperature and density, with a loss of total pressure. Behind a normal shock the flow is subsonic.","That loss shows up as wave drag. Thin wings, sharp leading edges and sweep keep shocks weak, which is why supersonic jets look like darts."],
 qs:[{t:"fill",q:"At 217 K the speed of sound is 295 m/s. An airliner cruises at 250 m/s. What is its Mach number?",a:.847,tol:.02,why:"M = V/a = 250/295 ≈ 0.85."},
  {t:"fill",q:"For air at 288 K, a = √(1.4 × 287 × 288). What is the speed of sound, in m/s?",a:340.2,tol:.01,unit:"m/s",why:"1.4 × 287 × 288 = 115,718, and √115,718 ≈ 340 m/s."},
  {t:"fill",q:"A jet flies at Mach 2. What is the half-angle of its Mach cone, in degrees?",a:30,tol:.02,unit:"°",why:"μ = asin(1/M) = asin(0.5) = 30°."},
  {t:"mc",q:"What happens to the flow just behind a normal shock?",ans:"It becomes subsonic, with higher pressure and temperature",wrong:["It speeds up to a higher Mach number","Its total pressure goes up","Its temperature drops below the oncoming air"],why:"A normal shock slows supersonic flow to subsonic and compresses and heats it. Total pressure drops across it; that loss is the cost of the shock."},
  {t:"mc",q:"Why do supersonic aircraft use thin, sharp, swept wings?",ans:"To keep the shocks weak and cut wave drag",wrong:["To raise lift at low speed","To make the Mach cone wider","To lower the speed of sound around the wing"],why:"Weaker shocks lose less total pressure, so there is less wave drag. Thin sharp wings are worse at low speed, which is the trade-off."},
  {t:"order",q:"Rank these by Mach cone half-angle, widest first.",items:["Mach 1.2","Mach 1.5","Mach 2","Mach 3"],why:"μ = asin(1/M): about 56°, 42°, 30° and 19°. Faster means a narrower cone."}]})}catch(e){}
try{DEMO_OVR["mech-mohr-1"]="mohr32";DEMO_OVR["aero-aerodynamics-5"]="mach32";
 const qd=(id,i,eqs)=>{const l=bq32(id);if(l&&l.qs[i])QD30[id+"#"+i]=[QH30(l.qs[i].q),eqs]};
 qd("mech-mohr-1",0,["C = (σx + σy)/2"]);qd("mech-mohr-1",1,["R = √(((σx − σy)/2)² + τxy²)"]);qd("mech-mohr-1",2,["σ1 = C + R","σ2 = C − R"]);qd("mech-mohr-1",5,["R = √(((σx − σy)/2)² + τxy²)","σ1 = C + R"]);
 qd("aero-aerodynamics-5",0,["M = V/a","a = √(γ·R·T)"]);qd("aero-aerodynamics-5",1,["a = √(γ·R·T)","M = V/a"]);qd("aero-aerodynamics-5",2,["μ = asin(1/M)·180/π","M = V/a"]);
 LB30["mech-mohr-1"]=["mohr","stress"];LB30["aero-aerodynamics-5"]=["supersonic","aero"]}catch(e){}

/* ---------- 8. price question: no "Not now", re-asks after a day until answered (mwiq4tk3t1fqb) ---------- */
const _pq32=pqAsk;pqAsk=function(){const r=_pq32.apply(this,arguments);try{st.pq.last=Date.now()-(PQ_DAYS-1)*864e5;save();
 [...document.querySelectorAll("#scrim .sheet .btn.ghost")].forEach(b=>{if(b.id!="pqexp"&&/Not now/.test(b.textContent))b.remove()});
 const ex=$("#pqexp");if(ex)ex.setAttribute("onclick","st.pq.last=Date.now()-(PQ_DAYS-1)*864e5;save();closeSheet()")}catch(e){}return r};
const _pqd32=pqDone;pqDone=function(){try{if(st.pq){st.pq.last=Date.now();st.pq.ans=(st.pq.ans||0)+1;save()}}catch(e){}return _pqd32.apply(this,arguments)};

document.head.insertAdjacentHTML("beforeend",`<style>
.spin32{width:34px;height:34px;border-radius:50%;border:3px solid var(--line);border-top-color:var(--blue);animation:spin32 .8s linear infinite}
@keyframes spin32{to{transform:rotate(360deg)}}
.bn32{display:grid;gap:6px;margin:0 0 14px;padding:12px 14px;border-radius:14px;border:1.5px solid var(--gold);background:color-mix(in srgb,var(--gold) 10%,var(--s1));font-size:14px;line-height:1.45}
.bn32 b{color:var(--gold);font-size:13px}
.bn32 .btn{justify-self:start;margin:2px 0 0}
#ordbox .oslot.ok32{border-style:solid;border-color:var(--ok);background:color-mix(in srgb,var(--ok) 14%,transparent)}
#ordbox .oslot.ok32 .chip{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 18%,var(--s1))}
#ordbox .oslot.bad32{border-style:solid;border-color:var(--bad);background:color-mix(in srgb,var(--bad) 10%,transparent)}
#ordbox .oslot.bad32 .chip{border-color:var(--bad)}
.fc32{display:flex;gap:8px;align-items:center}
.fc32 code{flex:1 1 0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:10px 12px;border-radius:10px;background:var(--bg);border:1px solid var(--line);font:500 14px "JetBrains Mono",monospace}
.fc32 input{flex:1 1 0;min-width:0;padding:10px 12px;border-radius:10px;border:1.5px solid var(--line);background:var(--bg);color:var(--tx);font:500 16px Inter,system-ui,sans-serif}
.fc32 .btn{flex:none;width:auto;margin:0}
.fx32{flex:none;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);background:var(--s2);color:var(--mu);font-size:18px;line-height:1;cursor:pointer}
.bw32{margin:8px 0 0;font-size:13.5px;color:var(--mu)}
</style>`);

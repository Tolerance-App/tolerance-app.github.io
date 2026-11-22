/* ===== v96 (2026-11-22): mistakes survive a reinstall; fewer definitions =====
   1. WHY MISTAKES WERE LOST: mergeP28 adds up done/xp/days, but took st.miss whole from whichever copy saved last.
      A re-added Home Screen app saves during onboarding, so its blank copy was "newer" and its empty mistake list
      replaced the cloud one when Google sign-in (or the backup sync) merged them. Lessons and XP survived; mistakes didn't.
      FIX: mistakes merge key by key. st.miss[key] now holds the time it was missed (old entries hold 1), and a fix is
      remembered in st.missOff[key] = time fixed. A key stays if it was missed after it was last fixed, on either copy.
      The cloud progress doc (which Google sign-in follows) already carries st, so missOff syncs with it.
      Skill-check markers (st.sec) also keep subjects that only the other copy has.
   2. One-time recovery per account and device: the daily progress_bak copy's mistakes are added back (only keys this
      copy never fixed). Runs before the first push of the session, so today's backup isn't overwritten first.
   3. Definitions, trimmed after Seth's review: everyday words dropped (fit, heat, screw…); an entry with no everyday
      link is skipped where its own sentence already explains it; a word is underlined once per lesson; at most 2 per block. */
try{FB.ver="b96"}catch(e){}
try{NEWS.unshift({d:"2026-11-22",t:["Your mistakes now carry over when you sign in with Google on a new phone or re-add the Home Screen app. If some went missing after re-adding the app for the new icon, this version tries to bring them back from yesterday’s backup.","Fewer underlined words: each word is underlined once per lesson, and words the sentence already explains aren’t underlined."]})}catch(e){}

/* ---------- 1. mistakes: merge key by key ---------- */
const OFFMAX96=800;
function missMerge96(a,b){const off={},ms={};
 [a&&a.missOff,b&&b.missOff].forEach(o=>{if(o&&typeof o=="object")for(const k in o){const t=+o[k]||0;if(t>(off[k]||0))off[k]=t}});
 [a&&a.miss,b&&b.miss].forEach(o=>{if(o&&typeof o=="object")for(const k in o){if(!o[k])continue;const t=+o[k]||1;if(t>(ms[k]||0))ms[k]=t}});
 const miss={};for(const k in ms)if(ms[k]>(off[k]||0))miss[k]=ms[k];
 const ks=Object.keys(off);if(ks.length>OFFMAX96)ks.sort((x,y)=>off[x]-off[y]).slice(0,ks.length-OFFMAX96).forEach(k=>delete off[k]);
 return {miss,off}}
const _mp96=mergeP28;mergeP28=function(a,b){const m=_mp96.apply(this,arguments);try{
 const r=missMerge96(a||{},b||{});m.miss=r.miss;m.missOff=r.off;
 m.sec=Object.assign({},(a&&a.sec)||{},(b&&b.sec)||{},m.sec||{})}catch(e){}return m};

/* record when a question was missed or fixed (placement doesn't touch mistakes) */
const _fb96=feedback;feedback=function(good){let k=null,had=false;
 try{const x=SS&&SS.kind!="place"&&SS.qs&&SS.qs[SS.i];k=x&&x.key;had=!!(k&&st.miss&&st.miss[k])}catch(e){}
 const r=_fb96.apply(this,arguments);
 try{if(k){if(good){if(had){(st.missOff=st.missOff||{})[k]=Date.now()}}else{st.miss=st.miss||{};st.miss[k]=Date.now()}save()}}catch(e){}
 return r};

/* a restored progress code adds mistakes; drop the ones this copy fixed later */
const _rm96=restoreMerge27;restoreMerge27=function(){const r=_rm96.apply(this,arguments);try{
 const off=st.missOff||{};Object.keys(st.miss||{}).forEach(k=>{if((off[k]||0)>=(+st.miss[k]||1))delete st.miss[k]});save()}catch(e){}return r};
const _ct96=codeText28;codeText28=function(){try{const c=JSON.parse(_ct96.apply(this,arguments));if(st.missOff)c.missOff=st.missOff;return JSON.stringify(c)}catch(e){return _ct96.apply(this,arguments)}};

/* ---------- 2. one-time recovery from the daily backup ---------- */
const MR96={};
function missRecover96(){if(!NET.db||!NET.uid)return Promise.resolve();const f="tol_mr96_"+NET.uid;
 try{if(localStorage.getItem(f))return Promise.resolve()}catch(e){return Promise.resolve()}
 return MR96[NET.uid]=MR96[NET.uid]||(async()=>{try{
  const sn=await NET.db.doc("data/users/"+NET.uid+"/progress_bak").get();
  try{localStorage.setItem(f,"1")}catch(e){}
  if(!sn.exists)return;const raw=sn.data()||{};let o=raw.st;if(typeof o=="string")o=JSON.parse(o);
  const bm=o&&o.miss;if(!bm||typeof bm!="object")return;
  st.miss=st.miss||{};const off=st.missOff||{};let n=0;
  for(const k in bm)if(bm[k]&&!st.miss[k]&&!off[k]&&QX[k]){st.miss[k]=1;n++}
  if(n){save();try{if(view=="learn"||view=="practice")rerender()}catch(e){}}
  FB.mr96=n}catch(e){FB.mr96="err "+((e&&e.code)||"")}})()}
const _pp96=pushProgress;pushProgress=async function(){try{await missRecover96()}catch(e){}return _pp96.apply(this,arguments)};

/* ---------- 3. definitions: fewer ---------- */
const DROPW96=["fit","heat","tension","clamp","screw","washers","pistons","turbines","nozzles","plastic","resin","ceramics",
 "brittle","corrosion","filament","hopper","pellets","momentum","velocity","orbit","install","repair","rework","furnish",
 "vendors","holder","console","bytes","center","girders","footings","bracing","joules","microns","sequences"];
const DROP96=new Set();
try{ALL89.forEach((g,i)=>{if(DROPW96.some(w=>{g.re.lastIndex=0;const m=g.re.exec(" "+w);return m&&m[2].toLowerCase()==w}))DROP96.add(i)})}catch(e){}
const _l96=list89;list89=function(lid){return _l96(lid).filter(i=>!DROP96.has(i))};

const STOP96=new Set("a an the of to in on at by for and or is are be it its that this with as from how what when which into than more less much very can one two so not no your you their they there same any each".split(" "));
const wd96=s=>(String(s).toLowerCase().match(/[a-z][a-z'-]{2,}/g)||[]).filter(w=>!STOP96.has(w)).map(w=>w.replace(/(ing|ed|es|s)$/,""));
/* does the sentence around s[a,b) already say what the word means? */
function explained96(s,a,b,d){
 let sa=s.lastIndexOf(". ",a);sa=sa<0?0:sa+2;let sb=s.indexOf(". ",b);sb=sb<0?s.length:sb+1;
 const before=s.slice(sa,a),after=s.slice(b,b+24),term=s.slice(a,b);
 const sw=new Set(wd96(s.slice(sa,sb).replace(term," "))),dw=wd96(d),hit=dw.filter(w=>sw.has(w)).length,ov=dw.length?hit/dw.length:0;
 if(/^\s*(?:(?:a|an|the)\s+)?$/i.test(before)&&/^\s+(is|are|means|refers to|measures|describes)\s+(?!\w+ed\b)/i.test(after))return true;
 if(/(called|known as|named|termed)\s*$/i.test(before))return true;
 if(/^\s*(\(|—|–|,\s*(which|i\.e\.|meaning|or)\b)/i.test(after)&&ov>=.25)return true;
 return ov>=.4&&hit>=2}
const PER96=2;
mark67=function(el,lid,x){
 let o=null;try{const [a,b]=(x&&x.key||"").split("#"),l=LS.find(z=>z.id==a);o=l&&l.qs[+b]}catch(e){}
 const skip=el.matches(".prompt")&&x&&(x.who||x.t=="say"||x.t=="decode"||o&&(o.t=="say"||o.t=="decode"));if(skip)return;
 const ans=el.matches(".prompt")&&x?JSON.stringify(Object.assign({},x,{q:"",why:"",key:""})):"";
 /* once per lesson: words already underlined earlier in this session are left plain */
 const ses=SS||{};if(!ses.df96||ses.df96l!=lid){ses.df96=new Set();ses.df96l=lid}const seen=ses.df96;
 const cand=list89(lid),used=new Set();let n=0;
 const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:t=>t.parentElement.closest(".katex,button,a,code,sup,sub,svg,.who,.df67")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const ts=[];while(tw.nextNode())ts.push(tw.currentNode);
 for(const t of ts){if(n>=PER96)break;const s=t.nodeValue,hits=[];
  cand.forEach((gi,rank)=>{if(used.has(gi)||seen.has(gi))return;const g=ALL89[gi],m=g.re.exec(s);if(!m)return;
   const w=m[2];if(ans&&new RegExp("(^|[^\\p{L}])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![\\p{L}])","iu").test(ans))return;
   const a=m.index+m[1].length;if(!g.l&&explained96(s,a,a+w.length,g.d))return;
   hits.push({a,b:a+w.length,gi,rank})});
  hits.sort((p,q)=>p.a-q.a||(q.b-q.a)-(p.b-p.a)||p.rank-q.rank);
  const keep=[];for(const h of hits){if(n>=PER96)break;if(keep.some(k=>h.a<k.b&&h.b>k.a)||used.has(h.gi))continue;
   if([...used,...seen].some(u=>ALL89[u].d==ALL89[h.gi].d))continue;keep.push(h);used.add(h.gi);n++}
  if(!keep.length)continue;
  const f=document.createDocumentFragment();let p=0;
  for(const h of keep.sort((p,q)=>p.a-q.a)){f.append(s.slice(p,h.a));const sp=document.createElement("span");
   sp.className="df67";sp.textContent=s.slice(h.a,h.b);sp.dataset.g89=h.gi;sp.setAttribute("role","button");sp.tabIndex=0;
   sp.setAttribute("aria-label",sp.textContent+": show definition");f.append(sp);p=h.b}
  f.append(s.slice(p));t.replaceWith(f)}
 used.forEach(g=>seen.add(g))};

try{TF48.unshift({b:"b96",k:"df96",t:"Fewer underlined words",c:"Open any lesson: each word is underlined once, at most 2 per card, no underline on “fit”, and none where the sentence already explains the word.",go:["les","mech-beams-2"]})}catch(e){}
try{TF48.unshift({b:"b96",k:"miss96",t:"Mistakes carry over",c:"Practice → Fix mistakes should list your old mistakes again (recovered once from the cloud backup). Getting one right removes it on every device.",go:["practice"]})}catch(e){}
try{const _tg96=tfGo48;tfGo48=function(i){const it=TF48[i];if(it&&it.go&&it.go[0]=="practice"){try{closeSheet(true)}catch(e){}SS=null;practice();return}return _tg96.apply(this,arguments)}}catch(e){}

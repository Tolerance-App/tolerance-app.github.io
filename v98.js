/* ===== v98 (2026-11-25): reveal cards (Guess + Fill), first 9 cards =====
   Design: docs/LEARNING_DESIGN.md (decisions, card style catalogue). Mockup: claude.ai artifact ThHBR9dqoRG7JHeXxi6eVy.
   1. DATA. rc98(lessonId, cardIndex, spec) registers a reveal card; a build() wrapper copies it onto the lesson as
      l.rc = {cardIndex: spec}. `cards`, `qs`, lesson ids and question positions never change, and a card with no rc
      entry renders exactly as before. spec = {p:[piece…], g?:{at, q, o:[[text, ok, why]…]}}.
      A piece is one block or an array of blocks. Block types (t), one per catalogue style:
        p {x}  sentence            eq {eq, lab?, cap?, vars?}  formula box     vars {vars, lab?}  symbol legend box
        giv {rows:[[sym,val,unit,"up"|"dn"]], lab?}  givens grid / change tiles
        step {f, v, u, fin?}  worked step (fin = final result in blue)
        tbl {head, rows, hi:[r,c]}  change table (first column = label, the rest math; hi = the guessed cell)
        term {s, x}  symbol tile + sentence    vt {l, v, u}  value row    pc {l, c, v, warn?}  compare panel
        chain {items, hl}    rel {x}  relation line    take {x}  bold takeaway
      Text markup: $…$ math chip, **…** bold, [[word]] the one Fill word. In any field, _x / _{xy} subscript,
      ^x / ^{xy} superscript, √{…} radical with a bar. Math fields (eq, v, u, f, s, vars symbols, tbl cells) are serif.
      Guess g.at = index of the piece it comes before (never 0). Guesses never touch SS.score, XP or pass/fail and
      are not logged (no ev fields, no rules change).
   2. RENDERER. cardScreen wrapper (after v84, so figures are already in): fills .cardbox .idea with every piece at
      once and shows them by class, so a tap never re-renders (blank pop plays once; tap-to-define marks once).
      Tap anywhere on the lesson for the next piece; a tap first fills any hidden word; an open Guess must be
      answered (tapping elsewhere shakes it) and disappears once you move on; earlier pieces dim until the card is
      finished; Continue (#go) is hidden and disabled until then; progress dots; "Tap anywhere…" on the first piece.
      While a Guess is open, earlier pieces fold into one bar (tap to look back).
      Going back to a card already finished in this session shows it whole, without its Guess.
   3. MATH FONT. STIX Two Text (upright) from Google Fonts, the same CDN the app already uses for Inter; sw.js caches
      it in tol-lib-v1. It is requested at boot so it's cached before the first reveal card. Offline on a first
      visit the token --math98 falls back to Cambria Math / Cambria / Times New Roman / Georgia (upright serif).
   4. The 9 mockup cards, with the mockup's reworded text. */
try{FB.ver="b98"}catch(e){}

/* ---------- 3. font ---------- */
try{if(!document.querySelector('link[href*="STIX+Two+Text"]')){const k=document.createElement("link");k.rel="stylesheet";
 k.href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:wght@400;500;600&display=swap";document.head.appendChild(k)}}catch(e){}

/* ---------- styles ---------- */
try{const s=document.createElement("style");s.id="rc98css";s.textContent=`
:root{--math98:"STIX Two Text","Cambria Math",Cambria,"Times New Roman",Georgia,serif}
.lesson[data-rv98]{-webkit-tap-highlight-color:transparent}
.cardbox.rv98{padding:14px 16px 12px;display:flex;flex-direction:column;gap:10px}
.cardbox.rv98 .idea{font-size:17px;line-height:1.55;font-weight:400;display:flex;flex-direction:column;gap:10px}
.rv98 .idea p{margin:0}
.it98{display:flex;flex-direction:column;gap:8px;transition:opacity .25s}
.it98.hid,.it98.gone{display:none}
.it98.old{opacity:.6}
.rv98.done98 .it98.old{opacity:1}
.it98.new{animation:in98 .32s ease-out}
@keyframes in98{from{opacity:0;transform:translateY(8px)}}
.dots98{display:flex;gap:5px;justify-content:center;padding-top:2px}
.dots98 i{width:6px;height:6px;border-radius:50%;background:var(--s3)}
.dots98 i.on{background:var(--blue)}
.dots98 i.dq{border-radius:2px}
.hint98{margin:10px 0 0;font-size:12.5px;color:var(--fa);text-align:center}
.lesson .foot.wait98{display:none}
.lesson .foot.in98{animation:in98 .25s ease-out}
.f98{font-family:var(--math98);font-size:1.04em;background:var(--s2);border:1px solid var(--line);border-radius:6px;padding:0 5px;white-space:nowrap}
.rv98 sub,.rv98 sup{line-height:0}
.f98 sub,.f98 sup,.step98 sub,.step98 sup,.vt98 b sub,.vt98 b sup,.gv98 sub,.gv98 sup,.tbl98 sub,.tbl98 sup{font-size:.78em}
.rv98 p sub,.rv98 p sup,.eqn98 sub,.eqn98 sup,.vars98 dd sub,.vars98 dd sup,.vt98 span sub,.qq98 sub,.qq98 sup,.fb98 sub,.fb98 sup,.step98 small sup,.vt98 small sup{font-size:.85em}
.f98 sub,.f98 sup{font-size:.78em}
.rad98{white-space:nowrap}
.rad98>span{border-top:1.5px solid currentColor;padding:0 2px 0 1px;margin-left:1px}
.eqb98{background:var(--s2);border:1px solid var(--line);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.eqlab98{font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mu)}
.eq98{font-family:var(--math98);font-size:25px;line-height:1.35;text-align:center;white-space:nowrap;overflow-x:auto}
.eq98 sub,.eq98 sup{font-size:.68em}
.eqn98{font-size:13.5px;color:var(--mu);text-align:center;margin-top:-2px}
.eqn98 sub{font-size:.9em}
.vars98{display:grid;grid-template-columns:auto 1fr;gap:2px 12px;margin:0;font-size:14.5px;color:var(--mu)}
.vars98 dt{font-family:var(--math98);font-size:18px;color:var(--tx);text-align:right}
.vars98 dt sub{font-size:.76em}
.vars98 dd{margin:0;align-self:center}
.giv98{display:grid;grid-template-columns:repeat(var(--n98,4),minmax(0,1fr));gap:6px}
.gv98{background:var(--s2);border:1px solid var(--line);border-radius:8px;padding:6px 2px;text-align:center;display:flex;flex-direction:column;min-width:0}
.gv98 i{font-family:var(--math98);font-style:normal;font-size:18px;color:var(--mu)}
.gv98 b{font-family:var(--math98);font-weight:500;font-size:17px}
.gv98 small{font-size:11.5px;line-height:1.3;letter-spacing:-.01em;color:var(--mu)}
.gv98.up b{color:var(--orange)} .gv98.dn b{color:var(--blue)}
.step98{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-family:var(--math98);font-size:18px;background:var(--s2);border:1px solid var(--line);border-radius:8px;padding:7px 10px}
.step98 .fin98{color:var(--blue);font-weight:600}
.step98 small,.vt98 small{font-size:14px;color:var(--mu);font-weight:400}
.pc98{background:var(--s2);border:1px solid var(--line);border-radius:10px;padding:10px 12px;display:grid;grid-template-columns:1fr auto;gap:0 10px;font-size:14px;line-height:1.4;color:var(--mu);align-items:center}
.pc98 b{grid-row:span 2;grid-column:2;grid-row-start:1;font-family:var(--math98);font-size:21px;color:var(--tx);font-weight:500}
.pc98.warn b{color:var(--orange)}
.pc98 span:first-child{color:var(--tx);font-weight:600;font-size:15px}
.tbl98{display:grid;grid-template-columns:repeat(var(--n98,3),1fr);border:1px solid var(--line);border-radius:10px;overflow:hidden;font-size:15px;text-align:center}
.tbl98>*{padding:6px 8px;border-top:1px solid var(--line)}
.tbl98>.th{border-top:0;background:var(--s2);font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--mu)}
.tbl98 .m{font-family:var(--math98);font-size:18px}
.tbl98 .hi{color:var(--blue);font-weight:600}
.tbl98 .h{text-align:left;color:var(--mu)}
.term98{display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:start}
.term98 .sym{font-family:var(--math98);font-size:26px;width:40px;height:40px;border-radius:10px;background:var(--s2);border:1px solid var(--line);display:grid;place-items:center}
.take98{font-weight:600}
.vt98{display:flex;justify-content:space-between;align-items:baseline;gap:10px;background:var(--s2);border:1px solid var(--line);border-radius:8px;padding:8px 12px;font-size:15px}
.vt98>span{color:var(--mu)}
.vt98 b{font-family:var(--math98);font-weight:500;font-size:18px;white-space:nowrap}
.rel98{font-size:15px;color:var(--mu);text-align:center}
.rel98 .f98{color:var(--tx)}
.chain98{display:flex;flex-wrap:wrap;align-items:center;gap:6px 4px;font-size:14.5px;font-weight:600}
.chain98 span{background:var(--s2);border:1px solid var(--line);border-radius:8px;padding:5px 9px}
.chain98 span.hl{border-color:var(--blue);color:var(--blue)}
.chain98 i{font-style:normal;color:var(--fa)}
.bl98{font:inherit;color:transparent;background:var(--s3);border:0;border-bottom:2px dashed var(--blue);border-radius:4px;padding:0 4px;margin:0;cursor:pointer;line-height:inherit;-webkit-tap-highlight-color:transparent}
.bl98.open{color:inherit;background:color-mix(in srgb,var(--blue) 14%,transparent);border-bottom-style:solid;cursor:default}
.bl98.pop{animation:pop98 .25s ease-out}
@keyframes pop98{from{transform:scale(.9)}}
.q98{border:1px solid color-mix(in srgb,var(--blue) 40%,var(--line));border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:9px;background:color-mix(in srgb,var(--blue) 6%,var(--s1))}
.qk98{font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--blue)}
.qq98{font-size:16px;line-height:1.45;font-weight:600;margin:0}
.opts98{display:flex;flex-direction:column;gap:6px}
.opts98.two{flex-direction:row}.opts98.two .o98{flex:1;text-align:center}
.o98{font:500 15.5px/1.35 inherit;font-family:inherit;text-align:left;border:1px solid var(--line);border-bottom-width:3px;background:var(--s1);color:var(--tx);border-radius:10px;padding:9px 12px;cursor:pointer}
.o98:disabled{cursor:default;opacity:1}
.o98.ok{border-color:var(--ok);background:var(--okBg)}
.o98.bad{border-color:var(--bad);background:var(--badBg)}
.o98.drop{display:none}
.fb98{font-size:14.5px;line-height:1.45}
.fb98 b{color:var(--ok)}
.fb98.no b{color:var(--bad)}
.fold98{font:600 13px inherit;font-family:inherit;text-align:left;color:var(--mu);background:var(--s2);border:1px dashed var(--line);border-radius:8px;padding:8px 10px;cursor:pointer}
@media (prefers-reduced-motion:reduce){.it98.new,.bl98.pop,.lesson .foot.in98{animation:none}.it98{transition:none}}
`;document.head.appendChild(s)}catch(e){}

/* ---------- 1. data ---------- */
const RC98={};
function rc98(id,ci,spec){(RC98[id]=RC98[id]||{})[ci]=spec}
try{const _bu98=build;build=function(){const r=_bu98.apply(this,arguments);try{(LS||[]).forEach(l=>{const m=RC98[l.id];if(m)l.rc=Object.assign(l.rc||{},m)})}catch(e){}return r}}catch(e){}

/* ---------- 2. renderer ---------- */
const esc98=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
/* sub/sup and radicals on already-escaped text */
function ss98(h){
 h=h.replace(/√\{([^{}]*)\}/g,(m,x)=>`<span class="rad98">√<span>${x}</span></span>`);
 h=h.replace(/_\{([^{}]*)\}/g,"<sub>$1</sub>").replace(/\^\{([^{}]*)\}/g,"<sup>$1</sup>");
 h=h.replace(/_(\d+|[A-Za-zα-ωΑ-Ω])/g,"<sub>$1</sub>").replace(/\^(\d+|[A-Za-zα-ωΑ-Ω])/g,"<sup>$1</sup>");
 return h}
const m98=s=>ss98(esc98(s));
/* prose: $math$, **bold**, [[blank]] (blank ids are numbered per card through ctx.b) */
function x98(s,ctx){let h=esc98(s).replace(/(\d) (?=(?:[kMGmµnc]?(?:Hz|Pa|N|m|s|K|J|W|V|A|g)\b|mm|MPa|GPa|kHz|°))/g,"$1\u00a0");
 h=h.replace(/\[\[([^\[\]]+)\]\]/g,(m,w)=>{const id=ctx?ctx.b++:0;return `\u0001${id}\u0002${w}\u0003`});
 h=h.replace(/\$([^$]+)\$/g,(m,x)=>`<span class="f98">${x}</span>`);
 h=h.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>");
 h=ss98(h);
 return h.replace(/\u0001(\d+)\u0002([^\u0003]*)\u0003/g,(m,id,w)=>`<button type="button" class="bl98" data-b98="${id}" aria-label="Hidden word. Tap to show.">${w}</button>`)}
function vars98(v){return `<dl class="vars98">${(v||[]).map(([s,d])=>`<dt>${m98(s)}</dt><dd>${x98(d)}</dd>`).join("")}</dl>`}
function blk98(b,ctx){const t=b&&b.t;
 if(t=="p")return `<p>${x98(b.x,ctx)}</p>`;
 if(t=="eq")return `<div class="eqb98">${b.lab?`<div class="eqlab98">${x98(b.lab)}</div>`:""}<div class="eq98">${m98(b.eq)}</div>${b.cap?`<div class="eqn98">${x98(b.cap)}</div>`:""}${b.vars?vars98(b.vars):""}</div>`;
 if(t=="vars")return `<div class="eqb98">${b.lab?`<div class="eqlab98">${x98(b.lab)}</div>`:""}${vars98(b.vars)}</div>`;
 if(t=="giv")return `${b.lab?`<div class="eqlab98">${x98(b.lab)}</div>`:""}<div class="giv98" style="--n98:${Math.min(4,(b.rows||[]).length)||1}">${(b.rows||[]).map(([s,v,u,c])=>`<div class="gv98 ${c||""}">${s?`<i>${m98(s)}</i>`:""}<b>${m98(v)}</b><small>${m98(u)}</small></div>`).join("")}</div>`;
 if(t=="step")return `<div class="step98"><span>${m98(b.f)}</span><span${b.fin?' class="fin98"':""}>${m98(b.v)}${b.u?` <small>${m98(b.u)}</small>`:""}</span></div>`;
 if(t=="tbl"){const n=(b.head||[]).length,hi=b.hi||[];return `<div class="tbl98" style="--n98:${n}">${b.head.map((h,j)=>`<span class="th${j==0?" h":""}">${x98(h)}</span>`).join("")}${(b.rows||[]).map((r,i)=>r.map((c,j)=>j==0?`<span class="h">${x98(c)}</span>`:`<span class="m${hi[0]==i&&hi[1]==j?" hi":""}">${m98(c)}</span>`).join("")).join("")}</div>`}
 if(t=="term")return `<div class="term98"><span class="sym">${m98(b.s)}</span><p>${x98(b.x,ctx)}</p></div>`;
 if(t=="vt")return `<div class="vt98"><span>${x98(b.l)}</span><b>${m98(b.v)}${b.u?` <small>${m98(b.u)}</small>`:""}</b></div>`;
 if(t=="pc")return `<div class="pc98${b.warn?" warn":""}"><span>${x98(b.l)}</span><b>${m98(b.v)}</b><span>${x98(b.c)}</span></div>`;
 if(t=="chain")return `<div class="chain98">${(b.items||[]).map((s,i)=>`<span${i==b.hl?' class="hl"':""}>${x98(s)}</span>`).join("<i>→</i>")}</div>`;
 if(t=="rel")return `<div class="rel98">${x98(b.x,ctx)}</div>`;
 if(t=="take")return `<p class="take98">${x98(b.x,ctx)}</p>`;
 return ""}
/* items in reveal order: pieces, with the Guess inserted before piece g.at */
function seq98(sp){const out=[];(sp.p||[]).forEach((_,i)=>{if(sp.g&&sp.g.at===i)out.push({q:1});out.push({i})});return out}

const RS98=new WeakMap();   // per session: {done:Set of "lid#ci"}
let RV98=null;              // the reveal card on screen
function sess98(){let s=RS98.get(SS);if(!s){s={done:new Set()};RS98.set(SS,s)}return s}
function spec98(){try{if(!SS||!SS.l||SS.qs||view!="lesson")return null;const l=SS.l;if(SS.ci>=l.cards.length)return null;return l.rc&&l.rc[SS.ci]||null}catch(e){return null}}

function rv98(){RV98=null;const sp=spec98();if(!sp)return;
 const box=$(".lesson .cardbox"),idea=box&&box.querySelector(".idea");if(!idea)return;
 const items=seq98(sp),ctx={b:0},key=SS.l.id+"#"+SS.ci,whole=sess98().done.has(key);
 idea.innerHTML=items.map((it,k)=>{if(it.q){const g=sp.g;return `<div class="it98 gq hid" data-k="${k}"><div class="q98"><div class="qk98">Predict</div><p class="qq98">${x98(g.q)}</p><div class="opts98${g.o.length==2?" two":""}">${g.o.map((o,j)=>`<button type="button" class="o98" data-o98="${j}">${x98(o[0])}</button>`).join("")}</div></div></div>`}
  const p=sp.p[it.i],bl=Array.isArray(p)?p:[p];return `<div class="it98 hid" data-k="${k}">${bl.map(b=>blk98(b,ctx)).join("")}</div>`}).join("");
 idea.insertAdjacentHTML("beforebegin",`<button type="button" class="fold98" hidden></button>`);
 box.insertAdjacentHTML("beforeend",`<div class="dots98">${items.map(it=>`<i${it.q?' class="dq"':""}></i>`).join("")}</div>`);
 box.insertAdjacentHTML("afterend",`<p class="hint98" hidden>Tap anywhere for the next piece</p>`);
 box.classList.add("rv98");
 const L=box.closest(".lesson");if(L&&!L.dataset.rv98){L.dataset.rv98="1";L.addEventListener("click",tap98)}
 RV98={sp,items,box,key,pos:1,ans:null,open:new Set(),nb:ctx.b,all:whole,peek:false,fresh:false};
 upd98()}

function shown98(R){return Math.min(R.pos,R.items.length)}
function blocked98(R){const n=shown98(R);return !R.all&&R.items[n-1].q&&R.ans==null}
function closed98(R){if(R.all)return [];const n=shown98(R),ids=[];
 R.box.querySelectorAll(".it98").forEach((el,k)=>{if(k<n)el.querySelectorAll(".bl98:not(.open)").forEach(b=>ids.push(b))});return ids}
function fin98(R){return R.all||(R.pos>=R.items.length&&!blocked98(R)&&!closed98(R).length)}

function upd98(){const R=RV98;if(!R||!document.body.contains(R.box))return;
 if(R.all)R.pos=R.items.length;
 const n=shown98(R),lastQ=!R.all&&!!R.items[n-1].q,done=fin98(R),fold=lastQ&&n>1&&!R.peek;
 R.box.querySelectorAll(".it98").forEach((el,k)=>{const it=R.items[k];
  el.classList.toggle("hid",k>=n);
  el.classList.toggle("gone",(!!it.q&&(R.all||k<n-1))||(fold&&k<n-1));
  el.classList.toggle("old",k<n-1);
  if(k==n-1&&R.fresh){el.classList.add("new");el.addEventListener("animationend",()=>el.classList.remove("new"),{once:true})}});
 if(R.all)R.box.querySelectorAll(".bl98").forEach(b=>{b.classList.add("open");b.removeAttribute("aria-label")});
 const fb=R.box.querySelector(".fold98");
 if(fb){fb.hidden=!(lastQ&&n>1);fb.textContent=R.peek?"▾ Hide the card so far":`▸ The card so far · ${n-1} piece${n>2?"s":""} · tap to look back`;}
 R.box.querySelectorAll(".dots98 i").forEach((d,k)=>d.classList.toggle("on",k<n));
 R.box.classList.toggle("done98",done);
 const h=R.box.parentElement.querySelector(".hint98");if(h)h.hidden=!(n==1&&!R.all&&R.items.length>1);
 const g=$("#go"),f=g&&g.closest(".foot");
 if(g){g.disabled=!done;if(f){const was=f.classList.contains("wait98");f.classList.toggle("wait98",!done);
  if(was&&done){f.classList.add("in98");f.addEventListener("animationend",()=>f.classList.remove("in98"),{once:true})}}}
 if(done)sess98().done.add(R.key);
 R.fresh=false;
 const its=R.box.querySelectorAll(".it98:not(.hid):not(.gone)"),last=its[its.length-1];
 if(last&&!R.all)try{last.scrollIntoView({block:"nearest"})}catch(e){}}

function shake98(el){try{el&&el.animate&&el.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:250})}catch(e){}}
function openBl98(b){b.classList.add("open","pop");b.removeAttribute("aria-label");b.addEventListener("animationend",()=>b.classList.remove("pop"),{once:true})}
function adv98(){const R=RV98;if(!R)return;
 if(blocked98(R)){shake98(R.box.querySelector(".it98.gq:not(.hid) .q98"));return}
 const cl=closed98(R);if(cl.length){cl.forEach(openBl98);upd98();return}
 if(R.pos<R.items.length){R.pos++;R.fresh=true;R.peek=false;upd98();return}
 const g=$("#go");if(g&&!g.disabled)g.click()}
function pick98(j){const R=RV98;if(!R||R.ans!=null)return;const g=R.sp.g,o=g.o[j];if(!o)return;R.ans=j;
 const q=R.box.querySelector(".it98.gq .q98");if(q){
  q.querySelectorAll(".o98").forEach((b,k)=>{b.disabled=true;if(g.o[k][1])b.classList.add("ok");else if(k==j)b.classList.add("bad");else b.classList.add("drop")});
  q.insertAdjacentHTML("beforeend",`<div class="fb98${o[1]?"":" no"}"><b>${o[1]?"Right.":"Not quite."}</b> ${x98(o[2])}</div>`)}
 upd98()}

let pop98=false;
addEventListener("pointerdown",()=>{pop98=!!document.querySelector(".pop67")},true);
/* attached to the .lesson element itself (rv98), not document: iOS Safari doesn't reliably send taps on plain,
   non-clickable areas up to a document listener */
function tap98(e){try{const R=RV98;if(!R||!document.body.contains(R.box)||view!="lesson"||!SS||SS.qs)return;
 if($("#scrim"))return;
 const t=e.target;if(!t||!t.closest||!t.closest(".lesson"))return;
 let b;
 if(b=t.closest(".o98")){pick98(+b.dataset.o98);return}
 if(b=t.closest(".bl98")){if(!b.classList.contains("open")){openBl98(b);upd98()}return}
 if(t.closest(".fold98")){R.peek=!R.peek;upd98();return}
 if(t.closest(".lhead,button,a,input,select,textarea,label,summary,figure,.fig,.fig17,#demo,svg,.df67,.pop67,[onclick]"))return;
 if(pop98){pop98=false;return}   // that tap only closed a definition
 adv98()}catch(x){}}
document.addEventListener("keydown",e=>{try{const R=RV98;if(!R||!document.body.contains(R.box)||view!="lesson"||!SS||SS.qs||$("#scrim"))return;
 const tag=(e.target.tagName||"").toLowerCase();if(tag=="input"||tag=="textarea"||tag=="button"||(e.target.closest&&e.target.closest(".df67")))return;
 if(e.key=="Enter"||e.key==" "||e.key=="ArrowRight"){if(fin98(R)&&e.key=="Enter")return;  // the app's own Enter handler clicks #go
  e.preventDefault();adv98()}}catch(x){}},true);

/* tap-to-define stays off labels and math on reveal cards (the walker in mark67 only skips sub/sup/button/code…).
   An underline that lands there is undone and the word is freed for later in the lesson. */
const NOMARK98=".eqlab98,.eq98,.f98,.vars98 dt,.step98,.gv98,.tbl98 .m,.tbl98 .th,.term98 .sym,.vt98 b,.pc98 b,.qk98";
try{const _mk98=mark67;mark67=function(el,lid,x){const r=_mk98.apply(this,arguments);
 try{if(el&&el.closest&&el.closest(".rv98")){const bad=[...el.querySelectorAll(".df67")].filter(s=>s.closest(NOMARK98));
  if(bad.length){const seen=SS&&SS.df96,M=seen&&seen.m97,k="c|"+el.textContent.replace(/\s+/g," ").trim();
   bad.forEach(s=>{const g=+s.dataset.g89;s.replaceWith(document.createTextNode(s.textContent));if(seen)seen.delete(g);if(M&&M[k])M[k]=M[k].filter(z=>z!=g)})}}}catch(e){}
 return r}}catch(e){}

try{const _cs98=cardScreen;cardScreen=function(){const r=_cs98.apply(this,arguments);try{rv98()}catch(e){try{console.warn("rv98",e)}catch(x){}}return r}}catch(e){}

/* ---------- 4. the 9 test cards (mockup wording; numbers re-derived) ---------- */
/* Orbits and rockets · Legend → formula, Fill */
rc98("aero2",1,{p:[
 {t:"vars",lab:"First, the symbols",vars:[["v_e","exhaust speed"],["m_0","mass at ignition"],["m_f","mass at burnout"]]},
 {t:"eq",lab:"Rocket equation",eq:"Δv = v_e ln(m_0/m_f)",cap:"constant v_e, no gravity or drag losses"},
 {t:"p",x:"Flip it, and the mass ratio you need grows [[exponentially]] with Δv:"},
 {t:"eq",eq:"m_0/m_f = exp(Δv / v_e)"},
 {t:"p",x:"Staging drops empty tanks so the next burn starts lighter. Dropping hardware adds no Δv by itself."}]});
/* Beam calculations · Worked example. I = 20·40³/12 = 106,667 mm⁴; M = 100·500 = 50,000 N·mm; σ = 50,000·20/106,667 = 9.375 MPa */
rc98("mech-beams-2",4,{p:[
 {t:"giv",lab:"Tip-loaded cantilever · elastic",rows:[["P","100","N"],["L","500","mm"],["b","20","mm"],["h","40","mm"]]},
 [{t:"step",f:"I = bh^3/12",v:"106,667",u:"mm^4"},{t:"step",f:"c = h/2",v:"20",u:"mm"}],
 {t:"step",f:"M = PL",v:"50,000",u:"N·mm"},
 {t:"step",f:"σ = Mc/I",v:"9.375",u:"MPa",fin:1},
 {t:"p",x:"E doesn't appear. With the force given, stress depends only on the load and the section; E sets how far the beam bends."}]});
/* Deeper or wider · Scaling table, Guess. δ ∝ 1/(bh³), σ ∝ 1/(bh²) */
rc98("mech-beams-2",5,{p:[
 {t:"p",x:"Elastic cantilever. Keep P, L and E fixed and change only the cross-section."},
 {t:"tbl",head:["Change","Deflection","Stress"],rows:[["2× depth h","÷ 8","÷ 4"],["2× width b","÷ 2","÷ 2"],["2× both","÷ 16","÷ 8"]],hi:[0,1]},
 {t:"p",x:"Depth pays off most: $δ ∝ 1/(bh^3)$ and $σ ∝ 1/(bh^2)$."}],
 g:{at:1,q:"Make the beam twice as deep. The tip deflection…",o:[
  ["halves",0,"That treats deflection as 1/h. δ = PL³/(3EI) and I = bh³/12, so δ goes as 1/h³."],
  ["drops to a quarter",0,"That's the stress, which goes as 1/h². Deflection goes through I, which grows with h³."],
  ["drops to an eighth",1,"I = bh³/12 grows 2³ = 8 times, and δ = PL³/(3EI) falls by the same factor."]]}});
/* Sampling and aliasing · Rule in words → formula, Fill. |900 − 1·1000| = 100 Hz */
rc98("elec-sensors-4",1,{p:[
 {t:"p",x:"To sample a signal limited to bandwidth B, the sampling rate must be [[more than twice]] B."},
 {t:"eq",eq:"f_s > 2B"},
 [{t:"p",x:"A tone above f_s/2 still shows up in the samples, at a false frequency:"},
  {t:"eq",eq:"f_a = |f − k f_s|",vars:[["k","the whole number that puts f_a between 0 and f_s/2"]]}],
 {t:"vt",l:"900 Hz tone, f_s = 1 kHz",v:"f_a = 100",u:"Hz"}]});
/* Anti-alias filter · Process chain. This card already has a figure (fig17 in index.html) drawing the same sensor → filter →
   ADC → processing chain with the roll-off, so the chain block is left out: with both it ran under Continue. */
rc98("elec-sensors-4",2,{p:[
 {t:"p",x:"An analog anti-alias filter cuts unwanted frequencies before the signal is sampled."},
 {t:"p",x:"A real filter can't cut off instantly, so sample with margin above 2B to leave room for its roll-off."},
 {t:"vt",l:"CD audio: B = 20 kHz",v:"f_s = 44.1",u:"kHz"}]});
/* Hash collisions · Definition → compare pair */
rc98("cs-data-structures-3",1,{p:[
 {t:"eq",lab:"Load factor",eq:"α = n / m",vars:[["n","entries"],["m","buckets"]]},
 {t:"pc",l:"Expected lookup",v:"O(1 + α)",c:"chaining, keys spread evenly"},
 {t:"pc",l:"Worst case",v:"O(n)",c:"every key in one bucket",warn:1}]});
/* Heat, work, and energy · Terms, true/false Guess */
rc98("mech-thermodynamics-1",1,{p:[
 {t:"term",s:"Q",x:"**Heat** transfers energy because of a temperature difference."},
 {t:"term",s:"W",x:"**Work** transfers energy through a mechanism, such as a moving piston or a rotating shaft."},
 {t:"take",x:"Heat and work describe transfers, not stored contents. A hot coffee holds internal energy U, not heat."}],
 g:{at:2,q:"True or false: a hot cup of coffee contains heat.",o:[
  ["True",0,"That's the everyday meaning. The coffee holds internal energy; heat only names energy crossing a boundary because of a temperature difference."],
  ["False",1,"Heat only exists while energy crosses a boundary. What sits in the coffee is internal energy."]]}});
/* Speed of sound · Formula → value rows, Guess. √(1.4·287·288) = 340.2; √(1.4·287·217) = 295.3; √(217/288) = 0.868 */
rc98("aero-aerodynamics-5",1,{p:[
 [{t:"p",x:"For an ideal gas, the speed of sound depends only on temperature:"},
  {t:"eq",eq:"a = √{γRT}",vars:[["γ","heat-capacity ratio, 1.4 for air"],["R","gas constant, 287 J/(kg·K) for air"],["T","absolute temperature, K"]]}],
 {t:"vt",l:"Sea level · 288 K",v:"a ≈ 340",u:"m/s"},
 [{t:"vt",l:"Airliner cruise · 217 K",v:"a ≈ 295",u:"m/s"},
  {t:"rel",x:"Colder air, slower sound: $a ∝ √{T}$"}]],
 g:{at:2,q:"Air at cruise altitude is about 217 K. Sound travels there…",o:[
  ["slower",1,"a grows with √T, and √(217/288) = 0.87, so about 340 × 0.87 ≈ 295 m/s."],
  ["faster",0,"Thinner air doesn't speed sound up. For an ideal gas only temperature enters a = √(γRT), and it's colder up there."],
  ["at the same speed",0,"Pressure and density drop out of a = √(γRT), but temperature doesn't."]]}});
/* Shock waves · Plain text + change tiles, Fill */
rc98("aero-aerodynamics-5",3,{p:[
 {t:"p",x:"Turning or slowing supersonic flow sharply makes a shock: a very thin front where the flow properties jump."},
 {t:"giv",lab:"Across the shock",rows:[["","↑","pressure","up"],["","↑","temperature","up"],["","↑","density","up"],["","↓","total pressure","dn"]]},
 {t:"p",x:"Behind a normal shock the flow is [[subsonic]]."}]});

try{NEWS.unshift({d:"2026-11-25",t:["A new kind of lesson card on a few test cards: it builds up one piece at a time as you tap, sometimes with a quick guess or a hidden word to fill in. Guesses never cost XP. Try Speed of sound in Supersonic flow and shocks."]})}catch(e){}
try{[
 {b:"b98",k:"rc98a",t:"Reveal card: speed of sound (Guess)",c:"Supersonic flow and shocks, card 2: tap to reveal, answer the Predict question, Continue only at the end.",go:["lesson","aero-aerodynamics-5"]},
 {b:"b98",k:"rc98b",t:"Reveal card: rocket equation (Fill)",c:"Orbits and rockets, card 2: tap anywhere fills “exponentially” first.",go:["lesson","aero2"]},
 {b:"b98",k:"rc98c",t:"Reveal card: beam worked example",c:"Beam calculations, cards 5 and 6: worked steps, then the deeper-or-wider Guess. Go back a card: it shows whole.",go:["lesson","mech-beams-2"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

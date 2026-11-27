/* ===== Physics courses: module kit (b120, 2026-11-27) =====
   The physics section is a small module, not stacked layers. Later builds edit these files in place (the stacked
   vNN.js rule stays for the rest of the app). Full design, syllabus and id rules: docs/PHYSICS.md.
     phys/kit.js        this file: courses, lesson loader, figures, demo helpers (play/scrub, mode, plot).
     phys/demos-*.js    demo factories, one per physical system; each registers its variants by id.
     phys/p1-<unit>.js  lesson data only, one unit per file: PH.unit({...}, [lessons]).
   Courses: every physics course comes in two tracks that share one path skeleton (same sections and units):
     algebra   phys1a "Physics 1 (algebra)",   phys2a later
     calculus  phys1c "Physics 1 (calculus)",  phys2c later
   Lesson ids say where a lesson lives, and the id is permanent (progress keys):
     p1-<unit>-<n>   core lesson: home in the algebra course, also listed in the calculus course (same id, so
                     finishing it once counts in both; a student who moves to calculus keeps everything)
     p1c-<unit>-<n>  calculus-only lesson (home in the calculus course)
     p1a-<unit>-<n>  algebra-only lesson (rare: something the calculus track does with calculus instead)
   A unit (or a lesson) can narrow its tracks: {tracks:["a"]} keeps a core unit out of the calculus course.
   What the loader does differently from older content, on purpose:
   - Lessons are born as reveal cards: `rc` is an array, one spec per card (format: lesson-cards skill / v98.js).
     `cards` (plain text, used by search, export and old code paths) is derived from rc when not given.
     There's no `plain` field: the app would prepend it as an extra card and shift every rc index; the hook is
     simply card 0.
   - rc is put on the lesson object before build(), so the copy shown in the other course (`also`) has it too.
     (rc98 adds rc after build, which the `also` copies never see.)
   - Figures live in the lesson: `figs:{<cardIndex>:fig}` and `q.fig` on a question. A fig is
       {cap, plot:{…}}  a graph drawn by PH.plot from data (Codex may write these)
       {cap, demo:"<id>", v:{…}}  a frame of a registered demo (Claude)
       {cap, need:"<what to draw>"}  a request for Claude. Shows as a dashed placeholder on a dev server and as
                     nothing on the live site; a unit with open needs must not be marked ready.
   - Units start hidden: {ready:false} units load only on a dev host (localhost, 127.0.0.1 — what tools/check.py
     serves), so content can be merged and checked before testers see it. Flip to ready:true to ship a unit.
   - The demo track mode: PH.mode() is "c" on a calculus course, "a" otherwise. Shared demos use it to switch labels
     (Δx/Δt ↔ dx/dt, "area" ↔ ∫v dt) so one demo serves both tracks. */

var PH=(function(){
const H=location.hostname,DEV=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(H)||/\.(localhost|test)$/.test(H);
const COURSE={p1:{a:{sub:"phys1a",n:"Physics 1 (algebra)"},c:{sub:"phys1c",n:"Physics 1 (calculus)"}},
              p2:{a:{sub:"phys2a",n:"Physics 2 (algebra)"},c:{sub:"phys2c",n:"Physics 2 (calculus)"}}};
const FIELD="Physics",errs=[],needs=[],units=[],CORE={};
const err=s=>{errs.push(s);if(DEV)console.warn("PH: "+s)};

/* plain text of a reveal-card spec (for `cards`, search and export) */
const strip=s=>String(s==null?"":s).replace(/\[\[(.*?)\]\]/g,"$1").replace(/\*\*(.*?)\*\*/g,"$1").replace(/\$/g,"").replace(/√\{(.*?)\}/g,"√($1)").replace(/[_^]\{(.*?)\}/g,"$1").replace(/\s+/g," ").trim();
function txt(spec){const out=[];(spec&&spec.p||[]).forEach(pc=>(Array.isArray(pc)?pc:[pc]).forEach(b=>{if(!b)return;switch(b.t){
 case "p":case "rel":case "take":out.push(b.x);break;
 case "eq":out.push(b.eq+(b.cap?" ("+b.cap+")":""));break;
 case "vars":(b.vars||[]).forEach(v=>out.push(v[0]+": "+v[1]+(v[2]?" ("+v[2]+")":"")));break;
 case "giv":(b.rows||[]).forEach(r=>out.push([r[0],r[1],r[2]].filter(Boolean).join(" ")));break;
 case "step":out.push(b.f+" = "+b.v+(b.u?" "+b.u:""));break;
 case "vt":out.push(b.l+": "+b.v+(b.u?" "+b.u:""));break;
 case "pc":out.push(b.l+", "+b.c+": "+b.v);break;
 case "term":out.push(b.s+": "+b.x);break;
 case "chain":out.push((b.items||[]).join(" → "));break;
 case "tbl":out.push((b.rows||[]).map(r=>r.join(" ")).join("; "));break}}));
 return out.map(strip).filter(Boolean).join(" ")}

/* figures: plot and placeholder figures register as tiny DEMOS entries so figSVG17 (cards, v84) and the question
   picture code (v17) draw them, and tools/check.py demos checks their labels like any demo */
function figSpec(lid,key,f){if(!f)return null;
 if(f.demo)return {demo:f.demo,v:f.v||{}};
 const id="phf:"+lid+":"+key;let draw;
 if(f.plot)draw=()=>PH.plot(f.plot);
 else if(f.need){needs.push(lid+" "+key+": "+f.need);if(!DEV)return null;draw=()=>needSVG(f.need)}
 else return null;
 DEMOS[id]={t:"Figure",hint:f.cap||"",ui:()=>"",ro:()=>"",run:()=>({svg:draw()}),phfig:1};return {demo:id,v:{}}}
function needSVG(s){const w=String(s).split(/\s+/),ln=[];let c="";w.forEach(x=>{if((c+" "+x).trim().length>40){ln.push(c);c=x}else c=(c+" "+x).trim()});if(c)ln.push(c);
 return `<svg viewBox="0 0 300 ${40+ln.length*15}"><rect x="4" y="4" width="292" height="${32+ln.length*15}" rx="10" stroke-dasharray="5 4" style="stroke:var(--orange)"/><text x="150" y="24" text-anchor="middle" style="fill:var(--orange)">Figure needed (Claude)</text>${ln.map((l,i)=>`<text class="m" x="150" y="${44+i*15}" text-anchor="middle">${esc(l)}</text>`).join("")}</svg>`}

/* ---------- loader ---------- */
function unit(meta,ls){meta=meta||{};const C=COURSE[meta.course];
 if(!C){err("unit "+meta.branch+": unknown course "+meta.course);return}
 units.push({...meta,n:(ls||[]).length});
 if(meta.ready===false&&!DEV)return;
 Object.entries(meta.eqb||{}).forEach(([k,b])=>eqb(k,b[0],b[1]));
 const core=CORE[meta.course+"|"+meta.branch]=CORE[meta.course+"|"+meta.branch]||[];
 (ls||[]).forEach(L=>{try{
  const m=/^(p\d)([ac]?)-[a-z0-9]+-\d+$/.exec(L.id||"");
  if(!m||m[1]!=meta.course){err(L.id+": id doesn't match p1-<unit>-<n> / p1c-… / p1a-… for course "+meta.course);return}
  if(BUNDLE.some(b=>b.id==L.id)){err(L.id+": duplicate id");return}
  const tr=m[2]?[m[2]]:(L.tracks||meta.tracks||["a","c"]),home=tr[0],rc=Array.isArray(L.rc)?L.rc:[];
  const cards=Array.isArray(L.cards)&&L.cards.length?L.cards:rc.map(txt);
  if(!cards.length)err(L.id+": no cards");
  const o={id:L.id,sub:C[home].sub,subName:C[home].n,field:FIELD,section:meta.section,branch:meta.branch,lv:L.lv||1,title:L.title,
   req:(L.req||[]).slice(),cards,eqs:L.eqs||[],qs:L.qs||[],ph:{course:meta.course,tracks:tr}};
  if(rc.length){o.rc={};rc.forEach((s,i)=>{if(s)o.rc[i]=s})}
  if(L.demo)o.demo=L.demo;
  o.also=tr.slice(1).map(t=>({sub:C[t].sub,subName:C[t].n,branch:meta.branch,section:meta.section}));
  /* a calculus-only lesson follows the unit's core lesson at or below its level (the auto chain only links
     lessons with the same home course). Core lessons of the unit from earlier files count too, so a unit's
     calculus lessons should load after its core lessons. */
  if(!m[2]&&tr.includes("a"))core.push(o);
  else if(m[2]=="c"&&!(L.req||[]).length){const p=core.filter(c=>c.lv<=o.lv).sort((a,b)=>b.lv-a.lv)[0];if(p)o.req.push(p.id)}
  Object.entries(L.figs||{}).forEach(([ci,f])=>{const s=figSpec(L.id,"c"+ci,f);if(s)(LFIG84[L.id]=LFIG84[L.id]||{})[ci]={cap:f.cap||"",spec:s}});
  o.qs.forEach((q,j)=>{if(q&&q.fig){const s=figSpec(L.id,"q"+j,q.fig);if(s)QFIG17[L.id+"#"+j]={cap:q.fig.cap||"",spec:s}}});
  BUNDLE.push(o)}catch(e){err((L&&L.id)+": "+e.message)}})}

/* equation banks for the Eqns tab and solver, from a unit's meta: eqb:{"p1-kin":["Motion in a line",[[name, formula, legend], …]]}
   (registered only when the unit loads, so a hidden unit's equations stay hidden too) */
function eqb(key,t,e){try{EQB[key]={t,e};e.forEach(([n,f,d])=>{if(!EQX[f]){const q=eqParse25(n,f,d);if(q)EQX[f]=q;else err("eqb "+key+": solver can't parse "+f)}});const g=EQG62.find(g=>g[0]=="Physics")||(EQG62.splice(0,0,["Physics",[]]),EQG62[0]);if(!g[1].includes(key))g[1].push(key)}catch(x){err("eqb "+key+": "+x.message)}}

/* ---------- demo helpers ---------- */
/* which track the learner is in right now: the course on screen (st.cur) */
function mode(){try{const s=(SS&&SS.l&&view=="lesson"&&st.cur)||st.cur||"";return /^phys\dc$/.test(s)?"c":"a"}catch(e){return "a"}}

/* play/scrub: a demo with a time slider k:"t" gets Play and Reset buttons; Play moves the slider in real time */
const RUN={};let raf=0,last=0;
function loop(ts){raf=0;const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;let any=false;
 Object.keys(RUN).forEach(p=>{const r=RUN[p],i=document.getElementById(p+"t");
  if(!i||!i.isConnected||document.hidden){delete RUN[p];return}
  const box=document.querySelector(`.demo[data-p="${p}"]`),D=box&&DEMOS[box.dataset.id],rate=D&&D.rate?D.rate(demoVals(p)):(r.speed||1);
  const mx=+i.max,v=Math.min(mx,+i.value+dt*rate);i.value=v;try{demoU(p)}catch(e){}
  if(v>=mx){delete RUN[p];btn(p,false)}else any=true});
 if(any)raf=requestAnimationFrame(loop);else last=0}
function btn(p,on){const b=document.getElementById(p+"play");if(b){b.textContent=on?"Pause":"Play";b.classList.toggle("on",on)}}
function play(p,speed){const i=document.getElementById(p+"t");if(!i)return;
 if(RUN[p]){delete RUN[p];btn(p,false);return}
 if(+i.value>=+i.max-1e-9){i.value=i.min;demoU(p)}
 RUN[p]={speed:speed||1};btn(p,true);if(!raf){last=0;raf=requestAnimationFrame(loop)}}
function reset(p){delete RUN[p];btn(p,false);const i=document.getElementById(p+"t");if(i){i.value=i.min;demoU(p)}}
/* the control row; call inside a demo's ui() (CUR_P is the demo's prefix while ui() runs) */
const ctl=(speed)=>`<div class="ph-ctl"><button class="pill ph-play" id="${CUR_P}play" onclick="PH.play('${CUR_P}',${speed||1})">Play</button><button class="pill" onclick="PH.reset('${CUR_P}')">Reset</button></div>`;

/* ---------- small SVG helpers (theme colours only; text sizes go in style, see v50) ---------- */
const f1=(x,d)=>{const v=(+x).toFixed(d==null?1:d);return v=="-0.0"||v=="-0"||/^-0\.0+$/.test(v)?v.slice(1):v};
const T=(x,y,s,o={})=>`<text x="${f1(x)}" y="${f1(y)}" text-anchor="${o.a||"middle"}"${o.cls?` class="${o.cls}"`:""} style="${o.c?`fill:${o.c};`:""}${o.fs?`font-size:${o.fs}px;`:""}${o.mono?"font-family:'JetBrains Mono',monospace;":""}${o.w?`font-weight:${o.w};`:""}">${s}</text>`;
const Ln=(x1,y1,x2,y2,c,w,dash)=>`<path d="M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}" style="stroke:${c||"currentColor"};stroke-width:${w||1.5}"${dash?` stroke-dasharray="${dash}"`:""}/>`;
/* arrow from (x1,y1) to (x2,y2), head drawn as a filled triangle */
function Ar(x1,y1,x2,y2,c,w){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<2)return "";const ux=dx/L,uy=dy/L,h=Math.min(8,L*.6),bx=x2-ux*h,by=y2-uy*h;
 return `<path d="M${f1(x1)} ${f1(y1)}L${f1(bx)} ${f1(by)}" style="stroke:${c};stroke-width:${w||2.2}"/><path d="M${f1(x2)} ${f1(y2)}L${f1(bx-uy*h*.5)} ${f1(by+ux*h*.5)}L${f1(bx+uy*h*.5)} ${f1(by-ux*h*.5)}Z" style="fill:${c};stroke:none"/>`}
/* nice tick step for a range */
function step(r,n){const raw=r/(n||5),p=Math.pow(10,Math.floor(Math.log10(raw))),m=raw/p;return (m<1.5?1:m<3?2:m<7?5:10)*p}
const num=x=>{const a=Math.abs(x);return (a>=100||Number.isInteger(+(+x).toFixed(6))?String(+(+x).toFixed(0)):String(+(+x).toFixed(a<1?2:1))).replace("-","−")}; /* true minus sign */

/* ---------- PH.plot: graphs from data ----------
   {x:"t (s)", y:"v (m/s)", xr:[0,4], yr:[0,10], xs?, ys? (tick steps), h? (default 170),
    lines:[ {pts:[[x,y],…], c?:"blue"|"orange"|"mu", dash?:true, l?:"label", lat?:[x,y]} ],
    area:{line:0, from, to}?   shade between a line and the x axis (above blue, below orange),
    pts:[{at:[x,y], l?:"A", c?}]?, labels:[{at:[x,y], l:"8.0 m"}]? text only, vl:[x…]? dashed verticals,
    note?:"top-right text (≤ 36 chars)"}
   A line given as {fn:"x*x", from, to} is sampled instead of pts (math.js-free: JS expression in x). */
const COL={blue:"var(--blue)",orange:"var(--orange)",mu:"var(--mu)",ok:"var(--ok)",bad:"var(--bad)",tx:"currentColor"};
function frame(o){/* returns mapping and the axes svg */
 const W=o.W||300,Hh=o.h||170,L=o.L||40,R=o.R||W-8,Tp=o.Tp||22,B=Hh-20,[x0,x1]=o.xr,[y0,y1]=o.yr;
 const X=x=>L+(x-x0)/(x1-x0)*(R-L),Y=y=>B-(y-y0)/(y1-y0)*(B-Tp);
 const xs=o.xs||step(x1-x0,5),ys=o.ys||step(y1-y0,4);let g="";
 for(let v=Math.ceil(x0/xs-1e-9)*xs;v<=x1+1e-9;v+=xs){g+=Ln(X(v),Tp,X(v),B,"var(--line)",1);if(X(v)<R-30)g+=T(X(v),B+13,num(v),{c:"var(--mu)",fs:10,mono:1})} /* the axis name sits at the right end of the tick row */
 for(let v=Math.ceil(y0/ys-1e-9)*ys;v<=y1+1e-9;v+=ys){g+=Ln(L,Y(v),R,Y(v),"var(--line)",1);g+=T(L-5,Y(v)+3.5,num(v),{a:"end",c:"var(--mu)",fs:10,mono:1})}
 const ya=y0<=0&&y1>=0?Y(0):B,xa=x0<=0&&x1>=0?X(0):L;
 g+=Ln(L,ya,R,ya,"var(--mu)",1.4)+Ln(xa,Tp,xa,B,"var(--mu)",1.4);
 const ax=T(Math.max(4,L-30),Tp-10,o.y||"",{a:"start",fs:11,w:700})+(o.note?T(R,Tp-10,o.note,{a:"end",c:"var(--blue)",fs:11,w:700}):"")+T(R,Hh-3,o.x||"",{a:"end",c:"var(--mu)",fs:10});
 return {W,Hh,L,R,Tp,B,X,Y,g,ax}}
function sample(l){if(l.pts)return l.pts;const f=new Function("x","return "+l.fn),n=l.n||60,out=[];for(let i=0;i<=n;i++){const x=l.from+(l.to-l.from)*i/n;out.push([x,f(x)])}return out}
function plot(o){const F=frame(o),{X,Y}=F;let body="";
 const lines=(o.lines||[]).map(sample);
 if(o.area){const P=lines[o.area.line||0]||[],a=o.area.from,b=o.area.to,pts=P.filter(p=>p[0]>=a-1e-9&&p[0]<=b+1e-9);
  /* split at zero crossings so the part below the axis gets its own colour */
  const seg=[];let cur=[];for(let i=0;i<pts.length;i++){const p=pts[i];if(i&&Math.sign(p[1])!=Math.sign(pts[i-1][1])&&p[1]!=0&&pts[i-1][1]!=0){const q=pts[i-1],t=q[1]/(q[1]-p[1]),z=[q[0]+t*(p[0]-q[0]),0];cur.push(z);seg.push(cur);cur=[z]}cur.push(p)}seg.push(cur);
  seg.forEach(s=>{if(s.length<2)return;const up=s.reduce((a,p)=>a+p[1],0)>=0;body+=`<path d="M${f1(X(s[0][0]))} ${f1(Y(0))}${s.map(p=>`L${f1(X(p[0]))} ${f1(Y(p[1]))}`).join("")}L${f1(X(s[s.length-1][0]))} ${f1(Y(0))}Z" style="fill:${up?"var(--blue)":"var(--orange)"};fill-opacity:.2;stroke:none"/>`})}
 (o.vl||[]).forEach(x=>body+=Ln(X(x),F.Tp,X(x),F.B,"var(--mu)",1.2,"4 4"));
 lines.forEach((P,i)=>{const l=o.lines[i],c=COL[l.c||"blue"]||l.c;body+=`<path d="${P.map((p,k)=>(k?"L":"M")+f1(X(p[0]))+" "+f1(Y(p[1]))).join("")}" style="stroke:${c};stroke-width:2.4;fill:none"${l.dash?` stroke-dasharray="6 5"`:""}/>`;
  if(l.l){const at=l.lat||P[P.length-1];body+=T(X(at[0])+(l.la=="end"?-6:6),Y(at[1])-6,l.l,{a:l.la||"start",c,cls:"h52"})}});
 (o.pts||[]).forEach(p=>{const c=COL[p.c||"tx"]||p.c;body+=`<circle cx="${f1(X(p.at[0]))}" cy="${f1(Y(p.at[1]))}" r="3.6" style="fill:${c};stroke:var(--s1);stroke-width:1.5"/>`;if(p.l)body+=T(X(p.at[0])+(p.dx==null?7:p.dx),Y(p.at[1])+(p.dy==null?-7:p.dy),p.l,{a:p.a||"start",cls:"h52",w:700})});
 (o.labels||[]).forEach(t=>body+=T(X(t.at[0]),Y(t.at[1])+4,t.l,{a:t.a||"middle",c:COL[t.c||"tx"]||t.c,cls:"h52",w:700,mono:t.mono}));
 return `<svg viewBox="0 0 ${F.W} ${F.Hh}">${F.g}${body}${F.ax}</svg>`}

return {unit,eqb,mode,play,reset,ctl,plot,frame,txt,T,Ln,Ar,f1,step,num,COL,DEV,COURSE,errs,needs,units};
})();

/* field, colours, course picker order */
try{if(!FIELD_ORDER.includes("Physics"))FIELD_ORDER.splice(Math.max(0,FIELD_ORDER.indexOf("Math")),0,"Physics")}catch(e){}
try{Object.assign(SC,{phys1a:"#22D3EE",phys1c:"#A78BFA",phys2a:"#2DD4BF",phys2c:"#FB7185"})}catch(e){}
try{document.head.insertAdjacentHTML("beforeend",`<style>
.ph-ctl{display:flex;gap:8px;margin-top:2px}.ph-ctl .pill{color:var(--tx)}.ph-ctl .ph-play{min-width:78px}.ph-ctl .ph-play.on{background:var(--blue);border-color:var(--blue);color:#fff}
</style>`)}catch(e){}

/* "Also lives in <unit>" says which course for physics lessons (both tracks use the same unit names) */
try{const _al118=alsoIn;alsoIn=function(l){const h=l&&(l.home||l);if(!h||!h.ph)return _al118.apply(this,arguments);
 const here=l.sub,all=[{sub:h.sub,br:h.br}].concat((h.also||[]).map(a=>({sub:a.sub,br:a.branch}))).filter(a=>a.sub!=here);
 if(!all.length)return "";const nm=s=>{const x=SUB.find(z=>z.id==s);return x?x.n:s};
 return `<p class="alsoin">Also in ${all.map(a=>esc(nm(a.sub))).join(" and ")}. Finish it once and it counts in both.</p>`}}catch(e){}

/* a course that only has `also` lessons so far (the calculus track early on) still belongs to the Physics field */
try{const _bu118=build;build=function(){const r=_bu118.apply(this,arguments);try{SUB.forEach(s=>{if(/^phys\d[ac]$/.test(s.id))s.field="Physics"})}catch(e){}return r}}catch(e){}

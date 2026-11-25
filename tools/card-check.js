/* Reveal-card check (dev tool, not loaded by the app). Run through tools/check.py at 375 × 812:
     python tools/check.py cards aero2 mech-beams-2      // lessons by id
     python tools/check.py cards course Aerospace        // every reveal card in a course
     python tools/check.py cards all                     // every reveal card
   Static checks on each l.rc[ci] spec (format: v98.js header, the lesson-cards skill):
     unknown block types, 2–5 pieces, more than one Fill, Guess and Fill on the same card, a blank on a number or
     symbol or inside math, dangling [[ ]] / $ / ** / { } markers, a Guess that isn't 2–3 options with exactly one
     correct, an option missing its why, a Guess on the first piece or with nothing after it, an rc index past the
     lesson's cards.
   Layout: opens the card, steps through every reveal state (each tap; an open Guess; the Guess answered with each
   option; blanks filled) and, with Continue forced visible, reports any state where the page scrolls past 812 px
   tall or anything is wider than the screen. Returns [{id:"lesson#cN", issues:[...]}] plus a summary line. */
(function(){
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TYPES={p:["x"],eq:["eq"],vars:["vars"],giv:["rows"],step:["f","v"],tbl:["head","rows"],term:["s","x"],vt:["l","v"],pc:["l","v","c"],chain:["items"],rel:["x"],take:["x"]};
const MATHF=["eq","v","u","f","s"];
function strs(o,path,out){if(typeof o=="string")out.push([path,o]);else if(Array.isArray(o))o.forEach((v,i)=>strs(v,path+"["+i+"]",out));else if(o&&typeof o=="object")for(const k in o)strs(o[k],path+"."+k,out);return out}
function staticIssues(l,ci,sp){const iss=[];
 if(!(ci>=0&&ci<l.cards.length))iss.push("rc index "+ci+" is past the lesson's "+l.cards.length+" cards");
 const P=sp.p;if(!Array.isArray(P)||!P.length){iss.push("no pieces");return iss}
 if(P.length<2||P.length>5)iss.push(P.length+" pieces (want 2–5)");
 P.forEach((pc,i)=>{const bl=Array.isArray(pc)?pc:[pc];if(!bl.length)iss.push("piece "+i+" is empty");
  bl.forEach(b=>{const t=b&&b.t;if(!TYPES[t]){iss.push("piece "+i+": unknown block type "+JSON.stringify(t));return}
   TYPES[t].forEach(f=>{if(b[f]==null||b[f]==="")iss.push("piece "+i+" ("+t+"): missing "+f)})})});
 const all=strs(sp,"",[]);let fills=0;
 all.forEach(([path,s])=>{
  const opens=(s.match(/\[\[/g)||[]).length,closes=(s.match(/\]\]/g)||[]).length,ok=(s.match(/\[\[[^\[\]]+\]\]/g)||[]);
  if(opens!=closes||opens!=ok.length)iss.push("dangling Fill marker in "+path+": "+s.slice(0,60));
  fills+=ok.length;
  ok.forEach(m=>{const w=m.slice(2,-2);
   if(/[0-9=+×÷∝√^_<>\/|·°%]/.test(w)||/^\s*\S\s*$/.test(w)||/[α-ωΑ-Ω]/.test(w))iss.push("blank on a number or symbol: "+m);
   if(MATHF.includes(path.split(".").pop().replace(/\[\d+\]$/,"")))iss.push("blank inside a math field "+path+": "+m);
   if(/^\.g\./.test(path))iss.push("blank inside the Guess ("+path+")")});
  const noBl=s.replace(/\[\[[^\[\]]+\]\]/g,"");
  if(((noBl.match(/\$/g)||[]).length)%2)iss.push("unpaired $ in "+path);
  if(((noBl.match(/\*\*/g)||[]).length)%2)iss.push("unpaired ** in "+path);
  if((noBl.match(/\{/g)||[]).length!=(noBl.match(/\}/g)||[]).length)iss.push("unbalanced { } in "+path);
  (noBl.match(/\$[^$]*\$/g)||[]).forEach(m=>{if(/\[\[/.test(m))iss.push("blank inside $math$ in "+path)})});
 all.forEach(([path,s])=>{(s.match(/\$[^$]*\[\[[^\]]*\]\][^$]*\$/g)||[]).forEach(m=>iss.push("blank inside $math$: "+m))});
 if(fills>1)iss.push(fills+" Fill words on one card (max 1)");
 const g=sp.g;
 if(g!=null){
  if(Array.isArray(g)){iss.push("more than one Guess (g is a list)")}
  else{
   if(fills)iss.push("Guess and Fill on the same card (max one interaction)");
   if(!g.q)iss.push("Guess has no question");
   const o=g.o||[];if(o.length<2||o.length>3)iss.push("Guess has "+o.length+" options (want 2 or 3)");
   const nOk=o.filter(x=>x&&x[1]).length;if(nOk!=1)iss.push("Guess has "+nOk+" correct options (want exactly 1)");
   o.forEach((x,i)=>{if(!x||!x[0])iss.push("Guess option "+i+" has no text");if(!x||!x[2]||!String(x[2]).trim())iss.push("Guess option "+i+" ("+(x&&x[0])+") is missing its why")});
   if(!(Number.isInteger(g.at)))iss.push("Guess has no piece index (at)");
   else if(g.at<=0)iss.push("Guess on the first piece (at must be ≥ 1)");
   else if(g.at>=P.length)iss.push("Guess has no piece after it to state the answer (at "+g.at+" of "+P.length+" pieces)")}}
 return iss}

function measure(label){const iss=[],H=812,W=375;
 const f=document.querySelector(".lesson .foot");if(f)f.classList.remove("wait98");   // Continue showing
 const se=document.scrollingElement||document.documentElement;se.scrollTop=0;
 /* everything on the card (and the hint under it) must end above the Continue bar, with the page at the top */
 const els=[...document.querySelectorAll(".lesson .lbody > *")].filter(e=>e.offsetParent);
 const bottom=Math.max(0,...els.map(e=>e.getBoundingClientRect().bottom)),footTop=f?f.getBoundingClientRect().top:H;
 const lim=Math.min(footTop,H);
 if(bottom>lim+1)iss.push(label+": card runs "+Math.round(bottom-lim)+" px under the Continue bar (375 × 812)");
 if(se.scrollWidth>W+1)iss.push(label+": page is "+se.scrollWidth+" px wide");
 document.querySelectorAll(".cardbox.rv98 .it98:not(.hid):not(.gone) *").forEach(el=>{
  if(el.scrollWidth>el.clientWidth+1&&getComputedStyle(el).overflowX!="visible")iss.push(label+": "+(el.className||el.tagName)+" scrolls sideways ("+el.scrollWidth+" > "+el.clientWidth+")");
  const r=el.getBoundingClientRect();if(r.width&&r.right>W+1)iss.push(label+": "+(el.className||el.tagName)+" runs past the right edge")});
 /* text spilling out of a tile, panel, row or chip */
 document.querySelectorAll(".cardbox.rv98 .it98:not(.hid):not(.gone) :is(.gv98,.pc98,.vt98,.step98,.tbl98>*,.chain98 span,.term98 .sym,.o98,.eqb98)").forEach(el=>{
  if(el.scrollWidth>el.clientWidth+1)iss.push(label+": text spills out of "+el.className.split(" ")[0]+" (“"+el.textContent.trim().slice(0,30)+"”)")});
 if(f&&RV98&&!fin98(RV98))f.classList.add("wait98");
 return iss}

async function layoutIssues(l,ci){const iss=[];
 startId(l.id);if(SS)SS.logged34=1;await sleep(30);SS.ci=ci;cardScreen();await sleep(60);
 if(!RV98){iss.push("reveal card did not render");return iss}
 const R0=RV98,nG=R0.sp.g?R0.sp.g.o.length:0;
 /* pass 0: plain taps (and the first option); passes 1..n-1: answer the Guess with each other option */
 for(let pass=0;pass<Math.max(1,nG);pass++){
  if(pass){SS.ci=ci;cardScreen();await sleep(30)}
  const R=RV98;let guard=0,state=0;
  while(guard++<40){
   const n=shown98(R),it=R.items[n-1],cl=closed98(R).length;
   const label="state "+(state++)+(it.q?(R.ans==null?" (Guess open)":" (Guess answered: "+R.sp.g.o[R.ans][0]+")"):cl?" (blank hidden)":"");
   if(pass==0||it.q)iss.push(...measure(label));
   if(blocked98(R)){pick98(pass);await sleep(10);continue}
   if(fin98(R))break;
   adv98();await sleep(10)}
  if(!fin98(R))iss.push("pass "+pass+": card never finished");
  const g=document.querySelector("#go");if(g&&(g.disabled||g.closest(".foot.wait98")))iss.push("Continue still hidden at the end")}
 /* coming back shows it whole */
 SS.ci=ci;cardScreen();await sleep(30);if(RV98&&!fin98(RV98))iss.push("revisited card is not shown whole");
 else iss.push(...measure("revisit (whole card)"));
 return [...new Set(iss)]}

window.cardCheck=async function(ids,opt={}){
 const keep=localStorage.getItem("tol3"),stKeep=JSON.stringify(st),out=[];
 let list=LS.filter(l=>l.rc&&Object.keys(l.rc).length);
 if(ids){const miss=ids.filter(i=>!LS.some(l=>l.id==i));miss.forEach(i=>out.push({id:i,issues:["no such lesson id"]}));
  ids.filter(i=>LS.some(l=>l.id==i&&!l.rc)).forEach(i=>out.push({id:i,issues:["no reveal cards in this lesson"]}));
  list=list.filter(l=>ids.includes(l.id))}
 /* a course by name or code; older BASE lessons carry the code as subName, so match on the code */
 if(opt.sub){const code=(LS.find(l=>l.subName==opt.sub)||{}).sub||opt.sub;list=list.filter(l=>l.sub==code)}
 if(!st.subj||!st.subj.length){st.subj=[...new Set(LS.map(l=>l.sub))];st.placed=1}
 const errs=[];const oe=e=>errs.push(String(e.message||e.reason||e));window.addEventListener("error",oe);window.addEventListener("unhandledrejection",oe);
 let n=0;
 for(const l of list)for(const k of Object.keys(l.rc)){const ci=+k,sp=l.rc[k];n++;errs.length=0;let iss=[];
  try{iss=staticIssues(l,ci,sp);iss.push(...await layoutIssues(l,ci))}catch(e){iss.push("threw: "+(e&&e.stack||e).toString().split("\n").slice(0,2).join(" | "))}
  errs.forEach(e=>iss.push("error: "+e.slice(0,200)));
  if(iss.length)out.push({id:l.id+"#c"+ci,issues:iss})}
 window.removeEventListener("error",oe);window.removeEventListener("unhandledrejection",oe);
 SS=null;Object.assign(st,JSON.parse(stKeep));if(keep!=null)localStorage.setItem("tol3",keep);else localStorage.removeItem("tol3");
 try{home()}catch(e){}
 out.summary=n+" reveal cards in "+list.length+" lessons checked, "+out.length+" with issues";return out};
})();

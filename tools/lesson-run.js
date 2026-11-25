/* Lesson smoke test (dev tool, not loaded by the app).
   Load into a running local copy (python tools/serve.py, 390 px wide), then:
     await lessonRun(["mech-beams-1"])          // some lesson ids
     await lessonRun(null,{sub:"Mechanical"})   // every lesson in a course (subName or sub)
     await lessonRun(null,{limit:50})           // first 50 lessons
   For each lesson: opens it, steps every card (and its demo), answers every question (alternating right/wrong,
   so both feedback paths run), then finishes. Reports thrown errors, console errors, cards that render empty,
   and questions with missing parts. Returns [{id, issues:[...]}] for lessons with issues, plus a summary line.
   Progress is restored afterwards (tol3 and st are put back), and lesson stats are skipped (SS.logged34). */
(function(){
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function qProblems(x){const p=[];if(!x)return["question missing"];const t=x.t||x.type;
 if(!x.q&&!x.lines)p.push("no question text");if(!x.why)p.push("no why");
 if(["mc","say","decode"].includes(t)){if(x.ans==null)p.push(t+": no ans");if(x.wrong&&x.wrong.length!=3)p.push(t+" has "+x.wrong.length+" wrong options (want 3)")}
 if(t=="spot"&&x.lines&&!(x.bad>=0&&x.bad<x.lines.length))p.push("spot: bad index out of range");
 if(t=="match"){const n=(x.pairs||[]).length;if(n&&(n<3||n>5))p.push("match has "+n+" pairs (want 3-5)")}
 return p}
window.lessonRun=async function(ids,opt={}){
 const keep=localStorage.getItem("tol3"),stKeep=JSON.stringify(st),out=[];
 let list=ids?LS.filter(l=>ids.includes(l.id)):LS.filter(l=>!opt.sub||l.sub==opt.sub||l.subName==opt.sub);
 if(ids){const miss=ids.filter(i=>!LS.some(l=>l.id==i));miss.forEach(i=>out.push({id:i,issues:["no such lesson id"]}))}
 if(opt.limit)list=list.slice(0,opt.limit);
 if(!st.subj||!st.subj.length){st.subj=[...new Set(LS.map(l=>l.sub))];st.placed=1}
 const errs=[];const oe=e=>errs.push(String(e.message||e.reason||e));window.addEventListener("error",oe);window.addEventListener("unhandledrejection",oe);
 const ce=console.error;console.error=function(){errs.push([...arguments].map(String).join(" "));return ce.apply(this,arguments)};
 for(const l of list){const iss=[];errs.length=0;
  (l.qs||[]).forEach((x,i)=>qProblems(x).forEach(p=>iss.push("q"+i+": "+p)));  // every question, not just the ones a session serves
  (l.cards||[]).forEach((c,i)=>{if(c==null||c==="")iss.push("card "+i+" is empty")});
  try{startId(l.id);if(SS)SS.logged34=1;await sleep(30);
   let guard=0;while(SS&&!SS.qs&&guard++<60){const app=document.querySelector("#app")||document.body;
    if(!(app.innerText||"").trim())iss.push("card "+SS.ci+" renders empty");nextCard();if(SS)SS.logged34=1;await sleep(20)}
   if(!SS)iss.push("session ended during cards");else if(!SS.qs)iss.push("never reached questions");
   else for(let i=0;SS&&SS.qs&&SS.i<SS.qs.length&&i<80;i++){  // finishSession may clear SSconst x=SS.qs[SS.i];qProblems(x).forEach(p=>iss.push("q"+SS.i+": "+p));
    feedback(i%2==0,"",2);await sleep(10);nextQ();await sleep(15)}  // served questions run live; static checks above cover all
  }catch(e){iss.push("threw: "+(e&&e.stack||e).toString().split("\n").slice(0,2).join(" | "))}
  errs.forEach(e=>iss.push("error: "+e.slice(0,200)));
  if(iss.length)out.push({id:l.id,issues:[...new Set(iss)]})}
 window.removeEventListener("error",oe);window.removeEventListener("unhandledrejection",oe);console.error=ce;
 Object.assign(st,JSON.parse(stKeep));if(keep!=null)localStorage.setItem("tol3",keep);else localStorage.removeItem("tol3");
 try{home()}catch(e){}
 out.summary=list.length+" lessons run, "+out.length+" with issues";return out};
})();

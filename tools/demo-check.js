/* Demo layout check (dev tool, not loaded by the app).
   Load it into a running copy of the app (local server, phone-width viewport, 375 px), then:
     await demoCheck()                    // every demo
     await demoCheck(["bear50","fo51"])   // some demo ids
     await demoCheck(null,{lessons:["ctrl-feedback-2"]})  // demos by lesson id
   Each demo is mounted off screen at 375 px wide and checked at its default slider values and at every
   slider's min and max (others at default), and every pill option. It reports:
     text-text   two labels overlap
     text-line   a label sits on a straight line (grid, marker, dashed guide, axis); labels with the
                 h52 halo (v52) are skipped, since the line breaks around them
     clipped     a label runs past the edge of the picture
   Labels hidden by opacity 0 are skipped. Returns [{id, title, issues:[...]}] for demos with issues. */
(function(){
const OV=(a,b,pad=0)=>{const w=Math.min(a.right,b.right)-Math.max(a.left,b.left)-pad,h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)-pad;return w>0&&h>0?w*h:0};
const shrink=(r,d)=>({left:r.left+d,right:r.right-d,top:r.top+d,bottom:r.bottom-d,width:r.width-2*d,height:r.height-2*d});
function hidden(el,root){for(let e=el;e&&e!==root;e=e.parentNode){if(!e.getAttribute)continue;const cs=getComputedStyle(e);if(cs.display=="none"||cs.visibility=="hidden"||+cs.opacity===0)return true}return false}
function straight(el){if(el.tagName=="line")return true;if(el.tagName!="path")return false;const d=el.getAttribute("d")||"";
 return /^\s*M[\d.\s-]+([HVL][\d.\s-]+)+\s*$/i.test(d)&&!/Z/i.test(d)}
function scan(svg,tag){const out=[],root=svg,R=svg.getBoundingClientRect();
 const T=[...svg.querySelectorAll("text")].filter(t=>!hidden(t,root)&&t.textContent.trim()).map(t=>({s:t.textContent.trim(),halo:t.classList.contains("h52"),r:shrink(t.getBoundingClientRect(),.8)})).filter(t=>t.r.width>0);
 const Ls=[...svg.querySelectorAll("line,path")].filter(l=>straight(l)&&!hidden(l,root)&&getComputedStyle(l).stroke!="none").map(l=>({r:l.getBoundingClientRect(),dash:l.getAttribute("stroke-dasharray")})).filter(l=>(l.r.width<3||l.r.height<3));
 for(let i=0;i<T.length;i++){const a=T[i];
  for(let j=i+1;j<T.length;j++){const b=T[j],o=OV(a.r,b.r);if(o>3)out.push(`${tag} text-text: "${a.s}" / "${b.s}"`)}
  if(!a.halo)for(const l of Ls){const lr={left:l.r.left-.6,right:l.r.right+.6,top:l.r.top-.6,bottom:l.r.bottom+.6};if(OV(shrink(a.r,1),lr)>0){out.push(`${tag} text-line: "${a.s}" on a ${l.r.width<3?"vertical":"horizontal"}${l.dash?" dashed":""} line`);break}}
  if(a.r.left<R.left-1||a.r.right>R.right+1||a.r.top<R.top-1||a.r.bottom>R.bottom+1)out.push(`${tag} clipped: "${a.s}"`)}
 return out}
window.demoCheck=async function(ids,opt={}){
 try{LS.forEach(l=>lessonDemo(l))}catch(e){}
 if(opt.lessons)ids=opt.lessons.map(id=>lessonDemo(LS.find(l=>l.id==id))).filter(Boolean);
 ids=ids||Object.keys(DEMOS);
 const host=document.createElement("div");host.style.cssText="position:fixed;left:-2000px;top:0;width:375px;pointer-events:none";document.body.appendChild(host);
 const rep=[];
 for(const id of ids){const issues=new Set();try{
  mountDemo(host,id);const box=host.querySelector(".demo"),p=box.dataset.p,svg=()=>host.querySelector(".dsvg svg");
  const run=tag=>{demoU(p);const s=svg();if(s)scan(s,tag).forEach(x=>issues.add(x))};
  run("default");
  const ins=[...host.querySelectorAll('input[type=range][data-k]')];
  for(const i of ins){const v0=i.value;for(const v of [i.min,i.max]){i.value=v;run(`${i.dataset.k}=${v}`)}i.value=v0}
  for(const h of host.querySelectorAll('input[type=hidden][data-k]')){const v0=h.value,opts=[...h.parentNode.querySelectorAll(".pill")].map(b=>(b.getAttribute("onclick")||"").match(/'([^']*)'\)$/)).filter(Boolean).map(m=>m[1]);
   for(const v of opts){if(v==v0)continue;h.value=v;run(`${h.dataset.k}=${v}`)}h.value=v0}
 }catch(e){issues.add("error: "+e.message)}
 if(issues.size)rep.push({id,title:(DEMOS[id]||{}).t,issues:[...issues]})}
 host.remove();return rep};
})();

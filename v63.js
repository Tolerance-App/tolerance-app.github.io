/* ===== v63 (2026-11-18): Solve sits in the equation's corner; search the equation list =====
   Kept to the solver box and the Eqns tab.
   1. The Solve button had its own row under the equation. It now sits in the bottom-right corner of the equation
      area, giving that row back to the equation. The equation is left-aligned and the button just says "Solve"
      (the unknown is the dashed box; the full "Solve for X" stays as its aria-label), so the corner is usually free. The equation scrolls sideways inside its own box; the button sits
      outside that scroller (wrapper .eqw63), so it stays put. If the typeset equation would run under the button,
      the area gets extra bottom padding instead of covering anything. Only when the typeset view is on (sv60);
      the fallback box grid is unchanged.
   2. Eqns gets a search box at the top. Every word typed must match the equation's name, formula, variable
      descriptions or topic; best matches first (name, then formula, then the rest), up to 40. Results are normal
      cards (Use in calculator, Graph it, Play with it). Clearing the box brings the usual view back. Typing
      updates only the results, so the keyboard stays up. */
try{FB.ver="b63"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["The Solve button sits in the corner of the equation, so the equation gets more room.","Search the equation list by name, symbol, variable or topic."]})}catch(e){}

/* ---- 1. Solve in the corner ---- */
function solve63(){const box=$(".sv");if(!box||!box.classList.contains("sv60"))return;const eq=box.querySelector(".eq60"),bt=box.querySelector(".svg2 .btn")||box.querySelector(".eqw63 .btn");if(!eq||!bt)return;
 let w=eq.parentElement;if(!w.classList.contains("eqw63")){w=document.createElement("div");w.className="eqw63";eq.before(w);w.appendChild(eq)}
 if(bt.parentElement!==w){bt.classList.add("solve63");w.appendChild(bt)}
 /* short label: the unknown is already the dashed box; the full text stays for screen readers */
 if(/^Solve/.test(bt.textContent)){bt.setAttribute("aria-label",bt.textContent.trim());bt.textContent="Solve"}
 eq.style.paddingBottom="";const parts=[...eq.querySelectorAll(".katex-html > .base")];if(!parts.length)return;const b=bt.getBoundingClientRect();
 /* the display box is full width, so test the typeset pieces themselves */
 if(parts.some(p=>{const a=p.getBoundingClientRect();return a.right>b.left-4&&a.bottom>b.top-2&&a.left<b.right&&a.top<b.bottom}))eq.style.paddingBottom=(b.height+10)+"px"}
const _svd63=svDraw;svDraw=function(){const r=_svd63.apply(this,arguments);try{solve63()}catch(e){}return r};

/* ---- 2. search ---- */
let EQIX63=null,EQQ63="";
function eqIndex63(){if(EQIX63)return EQIX63;const seen=new Set(),L=[];
 Object.keys(EQB).forEach(k=>(EQB[k].e||[]).forEach(([n,f,v])=>{if(seen.has(f))return;seen.add(f);
  L.push({n,f,v:v||"",t:EQB[k].t,ln:String(n).toLowerCase(),lf:String(f).toLowerCase(),lv:String(v||"").toLowerCase(),lt:String(EQB[k].t).toLowerCase()})}));
 return EQIX63=L}
function eqFind63(q){const W=q.toLowerCase().split(/\s+/).filter(Boolean);if(!W.length)return[];
 return eqIndex63().map(e=>{let s=0;for(const w of W){const a=e.ln.includes(w),b=e.lf.includes(w),c=e.lv.includes(w),d=e.lt.includes(w);if(!(a||b||c||d))return null;s+=(a?(e.ln.startsWith(w)?4:3):0)+(b?2:0)+(c?1:0)+(d?1:0)}return [s,e]})
  .filter(Boolean).sort((x,y)=>y[0]-x[0]).slice(0,40).map(x=>x[1])}
function eqSearchShow63(){const b=$("#tbody"),res=$("#eqr63");if(!b||!res)return;const q=EQQ63.trim();b.classList.toggle("srch63",!!q);
 if(!q){res.innerHTML="";return}
 const hits=eqFind63(q);
 res.innerHTML=hits.length?`<p class="sub eqcnt63">${hits.length==40?"Top 40 matches":hits.length+" match"+(hits.length==1?"":"es")}</p>`+hits.map(e=>{let h=eqItem25(e.n,e.f,e.v);return h.replace("</b>",`</b><span class="eqtop63">${esc(e.t)}</span>`)}).join("")
  :`<p class="sub eqcnt63">Nothing matches “${esc(q)}”. Try a symbol (ρ, V), a word (stress, drag) or a topic.</p>`}
function eqSearch63(v){EQQ63=v;eqSearchShow63();const x=$("#eqx63");if(x)x.hidden=!v}
function eqClear63(){EQQ63="";const i=$("#eqq63");if(i){i.value="";i.focus({preventScroll:true})}eqSearchShow63();const x=$("#eqx63");if(x)x.hidden=true}
const _er63=eqRender25;eqRender25=function(){const r=_er63.apply(this,arguments);try{const b=$("#tbody");if(b&&TT=="eq"&&!$("#eqq63")){
  b.insertAdjacentHTML("afterbegin",`<div class="eqs63"><input id="eqq63" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search equations, symbols, topics" aria-label="Search equations" value="${esc(EQQ63)}" oninput="eqSearch63(this.value)"><button type="button" id="eqx63" class="x63" aria-label="Clear search" onclick="eqClear63()"${EQQ63?"":" hidden"}>×</button></div><div id="eqr63"></div>`);
  eqSearchShow63()}}catch(e){}return r};
/* leaving the Eqns tab keeps the search for when you come back; the tbody class is reset by toolsBody */

document.head.insertAdjacentHTML("beforeend",`<style>
.sv .eqw63{position:relative;margin:2px 0 6px}
.sv .eqw63 .eq60{margin:0}
.sv .eqw63 .eq60 .katex-display>.katex{text-align:left;padding-left:6px}
.sv .eqw63 .solve63{position:absolute;right:6px;bottom:6px;left:auto;width:auto;max-width:none;display:inline-block;margin:0;padding:6px 12px;min-height:0;height:auto;font-size:13px;line-height:1.2;border-radius:99px;z-index:2}
.sv.sv60 .svg2{margin:0;gap:0}
.eqs63{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:6px;margin:0 0 10px;padding:4px 0 6px;background:var(--s1)}
.eqs63 input{flex:1;min-width:0;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--s2);color:var(--tx);font-size:16px}
.eqs63 input:focus{outline:none;border-color:var(--blue)}
.eqs63 .x63{flex:none;width:36px;height:36px;border-radius:99px;border:1px solid var(--line);background:transparent;color:var(--mu);font-size:20px;line-height:1}
#tbody.srch63>*:not(.eqs63):not(#eqr63){display:none!important}
.eqcnt63{margin:0 0 8px;color:var(--mu)}
.eqtop63{display:block;margin:2px 0 0;font-size:11.5px;font-weight:700;color:var(--mu)}
</style>`);

try{TF48.unshift(
 {b:"b63",k:"solve63",t:"Solve in the equation's corner",c:"Calc: the Solve button sits bottom-right inside the equation box; no separate row under it. Fill kb and km, tap Solve.",go:["q","mech-machine-4",0,1]},
 {b:"b63",k:"search63",t:"Search the equation list",c:"Eqns: type \"drag\", then \"ρ V\", then \"stress\". Results are full cards; Use in calculator works. Clear (×) brings the list back.",go:["q","mech-machine-4",0,1]}
)}catch(e){}

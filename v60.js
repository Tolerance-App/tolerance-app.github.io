/* ===== v60 (2026-11-18): the solver shows the equation as written, with the boxes in place =====
   Seth: the point of the equation in the calculator is reading where each variable sits (numerator,
   denominator, under a root, in an exponent) like a book. The old solver showed the formula as one line of
   text above a grid of boxes, so values were pasted in without seeing their place.
   - Each solver equation is parsed into a math tree (math60Parse: + − × ÷ ^, unary minus, functions, implicit
     multiplication) and typeset with KaTeX. Every variable is a tappable slot at its own position, every time
     it appears (V twice in Bernoulli gets two slots). Empty slots show the symbol; filled ones show the value
     with the symbol small underneath; the unknown is dashed; the selected one is blue.
   - The tree is checked against miniEval on load for the equation being shown (math60Same); if they disagree,
     or KaTeX can't load (offline), the old box grid stays. Nothing about solving changes: the hidden inputs
     are the same #svN boxes, so the app keypad, paste chips (b59) and Solve work as before.
   - KaTeX 0.16.9 comes from cdnjs on first use, like mathjs. Symbol names become TeX by rule (θ0 → θ₀,
     CL → C_L, Vstall → V_stall, Re → Re upright); TEXS60 overrides any name.
   The tree and TeX writer are general (fractions, nested roots, powers, exp, ln/log, trig, abs, min/max, mod),
   so new equations need no layout work. */
try{FB.ver="b60"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["The calculator’s equation solver now shows the equation as it’s written: fractions, roots and powers, with each value box sitting where its variable goes. Tap a variable to fill it."]})}catch(e){}

/* ---------- parser ---------- */
const FN60=new Set(["sqrt","cbrt","exp","log","ln","log10","log2","sin","cos","tan","asin","acos","atan","sinh","cosh","tanh","abs","min","max","pow","floor","ceil","round","mod","sign"]);
function math60Tok(s){const t=[];let i=0;s=String(s).replace(/\s+/g,"");
 while(i<s.length){const c=s[i];
  if(/[0-9.]/.test(c)){const m=/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(s.slice(i));t.push({t:"n",v:m[0]});i+=m[0].length;continue}
  if(/[A-Za-z_α-ωΑ-Ω]/.test(c)){const m=/^[A-Za-z_α-ωΑ-Ω][A-Za-z0-9_α-ωΑ-Ω]*/.exec(s.slice(i));t.push({t:"i",v:m[0]});i+=m[0].length;continue}
  if("+-*/^(),".includes(c)){t.push({t:"o",v:c});i++;continue}
  throw Error("bad char "+c)}
 return t}
function math60Parse(src){const T=math60Tok(src);let p=0;const pk=()=>T[p],is=v=>T[p]&&T[p].t=="o"&&T[p].v==v,eat=v=>{if(is(v)){p++;return true}return false};
 const startsPrim=()=>{const k=pk();return k&&(k.t=="n"||k.t=="i"||(k.t=="o"&&k.v=="("))};
 function expr(){let a=term();while(is("+")||is("-")){const op=T[p++].v;a={k:"bin",op,a,b:term()}}return a}
 function term(){let a=unary();for(;;){if(is("*")||is("/")){const op=T[p++].v;a={k:"bin",op,a,b:unary()}}else if(startsPrim()){a={k:"bin",op:"*",a,b:unary()}}else break}return a}
 function unary(){if(eat("-"))return {k:"neg",a:unary()};if(eat("+"))return unary();return power()}
 function power(){const b=prim();if(eat("^"))return {k:"bin",op:"^",a:b,b:unary()};return b}
 function prim(){const k=T[p++];if(!k)throw Error("end");
  if(k.t=="n")return {k:"num",v:k.v};
  if(k.t=="o"&&k.v=="("){const e=expr();if(!eat(")"))throw Error(")");return {k:"grp",a:e}}
  if(k.t=="i"){if(FN60.has(k.v)&&is("(")){p++;const args=[];if(!is(")")){args.push(expr());while(eat(","))args.push(expr())}if(!eat(")"))throw Error(")");return {k:"fn",f:k.v,args}}
   if(k.v=="pi")return {k:"const",v:"pi"};return {k:"sym",v:k.v}}
  throw Error("unexpected "+k.v)}
 const r=expr();if(p<T.length)throw Error("trailing");return r}
/* evaluate the tree (used to check the parse against miniEval) */
function math60Eval(n,sc){const E=x=>math60Eval(x,sc);switch(n.k){
 case "num":return parseFloat(n.v);case "const":return Math.PI;case "grp":return E(n.a);case "neg":return -E(n.a);
 case "sym":{if(n.v in sc)return sc[n.v];if(n.v=="e")return Math.E;throw Error("sym "+n.v)}
 case "bin":{const a=E(n.a),b=E(n.b);return n.op=="+"?a+b:n.op=="-"?a-b:n.op=="*"?a*b:n.op=="/"?a/b:Math.pow(a,b)}
 case "fn":{const a=n.args.map(E),M={sqrt:Math.sqrt,cbrt:Math.cbrt,exp:Math.exp,log:Math.log,ln:Math.log,log10:Math.log10,log2:Math.log2,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,abs:Math.abs,min:Math.min,max:Math.max,pow:Math.pow,floor:Math.floor,ceil:Math.ceil,round:Math.round,sign:Math.sign,mod:(x,y)=>((x%y)+y)%y};return M[n.f].apply(null,a)}}
 throw Error("node")}
function math60Same(q,tree){let ok=0;for(let tr=0;tr<5;tr++){const sc={};q.rk.forEach((k,j)=>sc[k]=.4+((j*7+tr*3)%11)/4);
  let a,b;try{a=miniEval(q.e,sc,true)}catch(e){a=NaN}try{b=math60Eval(tree,sc)}catch(e){return false}
  if(!isFinite(a)&&!isFinite(b))continue;if(!isFinite(a)||!isFinite(b))return false;if(Math.abs(a-b)>1e-9*Math.max(1,Math.abs(a)))return false;ok++}
 return ok>0}

/* ---------- symbol names to TeX ---------- */
const TEXS60={};
const GTX60={"α":"\\alpha","β":"\\beta","γ":"\\gamma","δ":"\\delta","ε":"\\varepsilon","ζ":"\\zeta","η":"\\eta","θ":"\\theta","ι":"\\iota","κ":"\\kappa","λ":"\\lambda","μ":"\\mu","ν":"\\nu","ξ":"\\xi","π":"\\pi","ρ":"\\rho","σ":"\\sigma","τ":"\\tau","υ":"\\upsilon","φ":"\\varphi","χ":"\\chi","ψ":"\\psi","ω":"\\omega","Γ":"\\Gamma","Δ":"\\Delta","Θ":"\\Theta","Λ":"\\Lambda","Ξ":"\\Xi","Π":"\\Pi","Σ":"\\Sigma","Φ":"\\Phi","Ψ":"\\Psi","Ω":"\\Omega"};
const DIML60=new Set(["Re","Pr","Nu","Ma","Bi","Fo","Gr","St","Sh","Sc","Pe","Ra","We","Fr","Kn","Ri","Ec"]);
const tch60=c=>GTX60[c]||c;
function texSym60(nm){if(TEXS60[nm])return TEXS60[nm];const s=String(nm);
 if(s.length==1)return tch60(s);
 if(DIML60.has(s))return "\\mathrm{"+s+"}";
 if(/^[A-Za-z]{3,}$/.test(s)&&(s==s.toLowerCase()||s==s.toUpperCase()))return "\\mathrm{"+s+"}";
 const h=tch60(s[0]),r=s.slice(1);
 let m;
 if(/^\d+$/.test(r))return h+"_{"+r+"}";
 if(r.length==1)return h+"_{"+tch60(r)+"}";
 if((m=/^(.)(max|min)$/.exec(r)))return h+"_{"+tch60(m[1])+",\\"+m[2]+"}";
 if(/^(max|min)$/.test(r))return h+"_{\\"+r+"}";
 if(/^[A-Za-z]\d+$/.test(r))return h+"_{"+r[0]+r.slice(1)+"}";
 return h+"_{\\mathrm{"+[...r].map(c=>GTX60[c]?"}"+GTX60[c]+"\\mathrm{":c).join("")+"}}"}

/* ---------- tree to TeX ---------- */
const PR60={sum:1,prod:2,neg:3,pow:4,atom:5};
function prec60(n){if(n.k=="grp")return prec60(n.a);if(n.k=="bin"){if(n.op=="+"||n.op=="-")return 1;if(n.op=="*")return 2;if(n.op=="/")return 5;if(n.op=="^")return 4}if(n.k=="neg")return 3;return 5}
const un60=n=>n.k=="grp"?un60(n.a):n;
function math60Tex(n,slot,depth){depth=depth||0;const T=(x,d)=>math60Tex(x,slot,d===undefined?depth:d),P=s=>"\\left("+s+"\\right)";
 switch(n.k){
 case "grp":return T(n.a);
 case "num":{const v=n.v;let m;if((m=/^1(0{4,})$/.exec(v)))return "10^{"+m[1].length+"}";if((m=/^([\d.]+)e([+-]?\d+)$/i.exec(v)))return m[1]+"\\times10^{"+(+m[2])+"}";return v}
 case "const":return "\\pi";
 case "sym":return slot?slot(n.v):texSym60(n.v);
 case "neg":{const a=un60(n.a);return "-"+(prec60(a)<=2?P(T(a)):T(a))}
 case "bin":{const a=un60(n.a),b=un60(n.b);
  if(n.op=="/"){const f=depth<1?"\\dfrac":"\\frac";return f+"{"+T(a,depth+1)+"}{"+T(b,depth+1)+"}"}
  if(n.op=="+"||n.op=="-"){const rb=T(b);return T(a)+(n.op=="+"?"+":"-")+((n.op=="-"&&prec60(b)<=1)||b.k=="neg"?P(rb):rb)}
  if(n.op=="*"){const L=prec60(a)<2?P(T(a)):T(a),R=prec60(b)<2||b.k=="neg"?P(T(b)):T(b);return L+"\\cdot "+R}
  if(n.op=="^"){if(a.k=="sym"&&a.v=="e")return "e^{"+T(b,depth+1)+"}";
   const nb=un60(b);if(nb.k=="bin"&&nb.op=="/"&&un60(nb.a).k=="num"&&un60(nb.a).v=="1"&&un60(nb.b).k=="num"){const k=un60(nb.b).v;return (k=="2"?"\\sqrt{":"\\sqrt["+k+"]{")+T(a)+"}"}
   const base=(a.k=="sym"||a.k=="num"&&!/e/i.test(a.v)&&parseFloat(a.v)>=0||a.k=="const")?T(a):P(T(a));
   const ex=nb.k=="bin"&&nb.op=="/"?un60(nb.a).k!="bin"&&un60(nb.b).k!="bin"?T(nb.a)+"/"+T(nb.b):T(nb,depth+1):T(nb,depth+1);
   return "{"+base+"}^{"+ex+"}"}}
  break;
 case "fn":{const A=n.args.map(x=>T(x)),f=n.f;
  if(f=="sqrt")return "\\sqrt{"+A[0]+"}";
  if(f=="cbrt")return "\\sqrt[3]{"+A[0]+"}";
  if(f=="exp")return "e^{"+math60Tex(n.args[0],slot,depth+1)+"}";
  if(f=="abs")return "\\left|"+A[0]+"\\right|";
  if(f=="pow")return math60Tex({k:"bin",op:"^",a:n.args[0],b:n.args[1]},slot,depth);
  if(f=="log"||f=="ln")return "\\ln"+P(A[0]);
  if(f=="log10")return "\\log_{10}"+P(A[0]);
  if(f=="log2")return "\\log_{2}"+P(A[0]);
  if(f=="mod")return P(A[0])+"\\bmod "+P(A[1]);
  if(f=="floor")return "\\left\\lfloor "+A[0]+"\\right\\rfloor";
  if(f=="ceil")return "\\left\\lceil "+A[0]+"\\right\\rceil";
  if(["sin","cos","tan","sinh","cosh","tanh","min","max"].includes(f))return "\\"+f+P(A.join(",\\,"));
  if(["asin","acos","atan"].includes(f))return "\\"+({asin:"arcsin",acos:"arccos",atan:"arctan"})[f]+P(A[0]);
  return "\\operatorname{"+f+"}"+P(A.join(",\\,"))}}
 throw Error("tex")}

/* ---------- KaTeX on demand ---------- */
let KX60=null,KXP60=null;
function loadKatex60(){if(window.katex)return Promise.resolve(KX60=window.katex);if(KXP60)return KXP60;
 KXP60=new Promise(res=>{const l=document.createElement("link");l.rel="stylesheet";l.href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";document.head.appendChild(l);
  const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";s.async=true;
  s.onload=()=>{KX60=window.katex||null;res(KX60)};s.onerror=()=>{KXP60=null;res(null)};document.head.appendChild(s)});return KXP60}

/* ---------- the solver view ---------- */
const TREE60={};
function tree60(f){if(f in TREE60)return TREE60[f];const q=EQX[f];let t=null;try{t=math60Parse(q.e);if(!math60Same(q,t))t=null}catch(e){t=null}return TREE60[f]=t}
const valTex60=v=>{const s=String(v).trim().replace(/,/g,"");let m;if((m=/^(-?[\d.]+)e([+-]?\d+)$/i.exec(s)))return m[1]+"\\times10^{"+(+m[2])+"}";return s.replace(/[^0-9.\-]/g,"")||"?"};
function sv60Tex(q,t){const sv=CALC.sv,syms=svSyms(q),empty=syms.filter(s=>!(sv.vals[s]||"").trim()),want=empty.length==1?empty[0]:null,sel=/^sv\d+$/.test(KB.t||"")?+KB.t.slice(2):-1;
 const keyToSym={};q.rk.forEach((k,i)=>keyToSym[k]=q.r[i]);keyToSym[q.lk]=q.l;
 const slot=key=>{const s=keyToSym[key]||key,i=syms.indexOf(s);if(i<0)return texSym60(s);const v=(sv.vals[s]||"").trim(),st=texSym60(s);
  const cls="s60 s60-"+i+(i==sel?" s60sel":"")+(s==want?" s60w":"")+(v?" s60f":"");
  return "\\htmlClass{"+cls+"}{"+(v?"\\underset{\\scriptscriptstyle "+st+"}{"+valTex60(v)+"}":st)+"}"};
 return slot(q.lk)+"="+math60Tex(t,slot)}
function sv60Paint(){const sv=CALC.sv,box=$(".sv");if(!sv||!box||TT!="calc")return;const q=EQX[sv.f];if(!q)return;
 const t=tree60(sv.f);if(!t){box.classList.remove("sv60");return}
 if(!KX60){loadKatex60().then(k=>{if(k&&CALC.sv&&TT=="calc")svDraw()});box.classList.remove("sv60");return}
 let html;try{html=KX60.renderToString(sv60Tex(q,t),{displayMode:true,throwOnError:true,strict:false,trust:c=>c.command=="\\htmlClass"})}catch(e){box.classList.remove("sv60");return}
 let d=box.querySelector(".eq60");if(!d){d=document.createElement("div");d.className="eq60";d.setAttribute("role","group");d.setAttribute("aria-label","Equation. Tap a variable to fill it in.");
  const g=box.querySelector(".svg2");if(g)g.before(d);else box.appendChild(d)}
 d.innerHTML=html;box.classList.add("sv60");
 d.querySelectorAll(".s60").forEach(el=>{const m=/s60-(\d+)/.exec(el.className);if(!m)return;el.setAttribute("role","button");el.tabIndex=-1;
  el.onclick=e=>{e.preventDefault();sv60Pick(+m[1])}})}
function sv60Pick(k){const i=$("#sv"+k);if(!i)return;try{i.focus({preventScroll:true})}catch(e){}svFocus(k);
 document.querySelectorAll(".eq60 .s60").forEach(el=>el.classList.toggle("s60sel",new RegExp("s60-"+k+"\\b").test(el.className)))}
const _svd60=svDraw;svDraw=function(){const r=_svd60.apply(this,arguments);try{sv60Paint()}catch(e){}return r};
const _svf60=svFocus;svFocus=function(k){const r=_svf60.apply(this,arguments);try{document.querySelectorAll(".eq60 .s60").forEach(el=>el.classList.toggle("s60sel",new RegExp("s60-"+k+"\\b").test(el.className)))}catch(e){}return r};
/* start the download when the tools open, so the first equation doesn't wait */
const _tl60=tools;tools=function(){const r=_tl60.apply(this,arguments);try{loadKatex60()}catch(e){}return r};

document.head.insertAdjacentHTML("beforeend",`<style>
.sv .eq60{overflow-x:auto;overflow-y:hidden;margin:2px 0 6px;padding:2px 2px 4px;border-radius:10px;background:var(--s1);touch-action:pan-x;-webkit-overflow-scrolling:touch}
.sv .eq60 .katex-display{margin:6px 0}
.sv .eq60 .katex{font-size:1.28em;color:var(--tx)}
.sv .eq60 .s60{display:inline-block;padding:1px 3px;margin:0 1px;border-radius:5px;border:1px solid var(--line);background:var(--s2);cursor:pointer}
.sv .eq60 .s60f{border-color:color-mix(in srgb,var(--blue) 35%,var(--line))}
.sv .eq60 .s60w{border:1.5px dashed var(--orange);background:color-mix(in srgb,var(--orange) 10%,var(--s2))}
.sv .eq60 .s60sel{border:1.5px solid var(--blue);background:color-mix(in srgb,var(--blue) 18%,var(--s2))}
.sv.sv60 .svf{display:none}
.sv.sv60 .svg2 .slot{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;margin:0!important;padding:0!important}
.sv.sv60 .svg2{min-height:0}
</style>`);

try{TF48.unshift(
 {b:"b60",k:"eqv60",t:"Solver shows the written equation",c:"Calc opens with the stall-speed equation typeset: √ over a fraction, n·W on top, ρ·S·CLmax below. Tap a variable, then a chip: the value appears in its spot.",go:["q","aero-aerodynamics-3",0,1]},
 {b:"b60",k:"eqv60b",t:"Fraction and power in place",c:"I = b·h³/12: h sits under the cube. Fill b and h, Solve: I fills in.",go:["q","mech4",2,1]}
)}catch(e){}

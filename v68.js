/* ===== v68 (2026-11-19): fixes for flags that would put people off =====
   From Seth's flags (flags.html, device ke1WMzstu…), the ones that still reproduce on b67:
   1. Long lesson names push the page sideways (demo screens of mech-beams-2, cs-data-structures-1). Cause: the
      .crumb breadcrumb has auto side margins inside the column-flex .lesson, so it sizes to its nowrap text
      (432 px on a 393 px phone) and its ellipsis never kicks in. Fix: give it the full width, capped at 560.
   2. Friends sheet: the "Your friend code" / "Add a friend" / "Your name for friends" labels slide under the
      boxes. .gl carries margin-bottom:-10px meant for .group lists; .fc32 rows need the room back.
   3. First-run beam: "F = … N" runs into "section 20×20 mm" at 100–125 N, and in "See it at real size" the
      "rest" and "loaded" labels sit on top of each other when the bar moves less than ~2 mm. Labels are
      nudged apart after each redraw, only when they actually overlap.
   4. Calculator: a number written against a name now binds first, so 1/2π = 1/(2π), 2pi works offline, and
      2π² stays 2·π². math.js on its own reads 1/2π as (1/2)·π (the TI-84 order Seth flagged), and the offline
      evaluator rejected "2π" outright.
   5. Order questions: a downward swipe that starts on a choice in the bank scrolls the page instead of picking
      the chip up (chips are touch-action:none, so the page couldn't scroll on a long list). Dragging up into the
      slots, and dragging inside the slots, are unchanged. drag() is re-implemented here with the b25 logic kept.
   6. Content: cs2 never taught two's complement before asking about it; it gets a card and a clearer question
      (same index, so keys don't move). Stack card 1 says which item pop takes. Two b67 definitions corrected
      from Seth's flags (deflection isn't always sideways; linear-elastic means no permanent set). */
try{FB.ver="b68"}catch(e){}
try{NEWS.unshift({d:"2026-11-19",t:["No more sideways scrolling on lessons with long names, and the friends sheet labels no longer hide behind the boxes.","The calculator reads 2π as one number, so 1/2π is 1/(2π).","Lesson pictures no longer open a blown-up copy when tapped.","On long ordering questions you can swipe down on the choices to scroll back up.","Bits and overflow now teaches two’s complement before asking about it."]})}catch(e){}

/* 1, 2: layout */
document.head.insertAdjacentHTML("beforeend",`<style>
.crumb{width:100%;max-width:560px;box-sizing:border-box}
.gl+.fc32{margin-top:16px}
.fig::after{display:none}.fig{cursor:auto}.zoom{display:none!important}
</style>`);
/* 7. Figure enlarge removed (Seth: "remove the expand buttons ... when you expand all the text is extremely
   large ... doesn't feel like a feature a mobile app needs"). The old document click handler copies the figure
   into a .zoom overlay whose CSS strokes every shape at width 3, letters included. Hide the corner icon and drop
   the overlay as soon as it is added (MutationObserver runs before the next paint). */
try{new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.classList&&n.classList.contains("zoom"))n.remove()}).observe(document.body,{childList:true})}catch(e){}

/* 3: first-run beam labels */
function ovl68(a,b,pad){return a.x<b.x+b.width+pad&&b.x<a.x+a.width+pad&&a.y<b.y+b.height+pad&&b.y<a.y+a.height+pad}
function tidyWl68(){try{
 const ts=[...document.querySelectorAll("#wlbeam svg text")],by=s=>ts.find(t=>t.textContent.startsWith(s));
 const sec=by("section"),f=by("F =");
 if(sec&&f&&ovl68(sec.getBBox(),f.getBBox(),2)){const sb=sec.getBBox(),fb=f.getBBox(),y=+f.getAttribute("y");
  f.setAttribute("y",(y+(sb.y+sb.height+3-fb.y)).toFixed(1))}
 const rest=by("rest"),ld=by("loaded");
 if(rest&&ld){const rb=rest.getBBox(),lb=ld.getBBox(),need=rb.y+rb.height+2-lb.y;
  if(need>0){const ry=+rest.getAttribute("y"),ly=+ld.getAttribute("y"),up=Math.min(need/2,rb.y-1);
   rest.setAttribute("y",(ry-up).toFixed(1));ld.setAttribute("y",(ly+need-up).toFixed(1));
   const sv=ld.ownerSVGElement,h=+sv.getAttribute("height"),lo=ld.getBBox();if(lo.y+lo.height+2>h){const H=Math.ceil(lo.y+lo.height+3);
    sv.setAttribute("height",H);const vb=sv.getAttribute("viewBox").split(" ");vb[3]=H;sv.setAttribute("viewBox",vb.join(" "))}}}
}catch(e){}}
try{const _wd68=wlDemoDraw;wlDemoDraw=function(){const r=_wd68.apply(this,arguments);tidyWl68();return r}}catch(e){}

/* 4: implicit multiplication. A number against a plain name binds first: "2pi" → "(2*pi)", so 1/2π = 1/(2π).
   A number against a name that is raised to a power or called, or against "(", gets an ordinary "*":
   2π² → 2*π² (= 2·π²), 2sin(x) → 2*sin(x), 2(3) → 2*(3), so the normal order applies there. Digits glued to a
   name on their left (x2) and exponents (2e3) are left alone. Runs before the app's own norm(). */
function imp68(s){return String(s).replace(/(^|[^\w.])((?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)\s*(π|[A-Za-z_]\w*|(?=[(√]))/g,(m,a,n,v,i,all)=>{
 if(/^e[+-]?\d/i.test(v))return m;
 if(!v)return a+n+"*";
 const rest=all.slice(i+m.length);
 return /^\s*[(^!²³]/.test(rest)?a+n+"*"+v:a+"("+n+"*"+v+")"})}
try{const _ce68=calcEval;calcEval=function(src){return _ce68.call(this,imp68(src))}}catch(e){}

/* 5: order chips. Same as the b25 drag, plus: a chip still in the bank whose first clear movement is downward
   scrolls the page with the finger (nothing in the bank is ever dragged down). */
drag=function(e,c){if(SS.busy)return;e.preventDefault();const el=e.currentTarget,r=el.getBoundingClientRect(),sx=e.clientX,sy=e.clientY;
 const inBank=!SS.ord.includes(c),sc=document.scrollingElement||document.documentElement;let moved=0,g,scroll=0,ly=sy;
 const mv=v=>{
  if(!moved&&!scroll&&Math.hypot(v.clientX-sx,v.clientY-sy)>8){
   if(inBank&&v.clientY-sy>Math.abs(v.clientX-sx))scroll=1;
   else{moved=1;g=el.cloneNode(true);g.classList.add("ghost");g.style.cssText=`position:fixed;z-index:90;pointer-events:none;margin:0;width:${r.width}px;left:${r.left}px;top:${r.top}px`;document.body.appendChild(g)}}
  if(scroll){sc.scrollTop-=v.clientY-ly;ly=v.clientY;return}
  ly=v.clientY;if(moved){g.style.left=r.left+v.clientX-sx+"px";g.style.top=r.top+v.clientY-sy+"px"}};
 const up=v=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);if(g)g.remove();
  if(scroll)return;
  if(!moved){SS.ord.includes(c)?SS.ord=SS.ord.filter(k=>k!=c):SS.ord.push(c)}
  else{const t=$("#otray").getBoundingClientRect();SS.ord=SS.ord.filter(k=>k!=c);if(v.clientY>=t.top-24&&v.clientY<=t.bottom+24){let i=[...document.querySelectorAll("#otray .oslot")].findIndex(s=>{const b=s.getBoundingClientRect();return v.clientY<b.top+b.height/2});if(i<0)i=SS.ord.length;SS.ord.splice(Math.min(i,SS.ord.length),0,c)}}
  renderOrder()};addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up)};

/* 6: content. Lessons are patched in place after build(), so QX (which holds the same objects) sees it too. */
function fix68(){try{
 const L=id=>LS.find(l=>l.id==id);
 const b=L("cs2");if(b&&!b.f68){b.f68=1;
  b.cards.splice(1,0,"Signed integers use two’s complement: the top bit counts as −128 instead of +128. So 8 bits hold −128 to 127: still 256 values, and zero takes one of the non-negative ones, leaving one more negative value than positive.");
  const q=b.qs[0];if(q&&/two’s complement/.test(q.q)){q.q="In two’s complement, what range of values can a signed 8-bit integer hold?";
   q.why="8 bits give 2⁸ = 256 values. Zero uses one of the non-negative slots, so there is one more negative value: −128 to 127. −127 to 128 puts the extra value on the wrong side; 0 to 255 is the unsigned range; −255 to 255 would need 511 values (9 bits)."}}
 const s=L("cs-data-structures-2");if(s&&!s.f68){s.f68=1;const i=s.cards.findIndex(t=>/^A stack removes/.test(t));
  if(i>=0)s.cards[i]="A stack removes the most recently added item first. Push puts a new item on top; pop takes the top item (the one added most recently) off and hands it back. Stacks suit nested operations that must finish in reverse order."}
}catch(e){}}
try{const _bu68=build;build=function(){const r=_bu68.apply(this,arguments);fix68();return r}}catch(e){}
try{if(Array.isArray(LS)&&LS.length)fix68()}catch(e){}
try{GL67.forEach(g=>{
 if(/deflection/.test(g.re.source))g.d="How far a point on the beam moves under load, at right angles to the beam’s length (usually downward), δ (mm).";
 if(/linear-elastic/.test(g.re.source))g.d="The material springs fully back when unloaded, with no permanent bend, and stress is proportional to stretch."})}catch(e){}

try{TF48.unshift(
 {b:"b68",k:"crumb68",t:"No sideways scroll on long lesson names",c:"Beam calculations and design checks: on the demo screen, the page doesn't move sideways; the breadcrumb ends in … if it's too long.",go:["les","mech-beams-2"]},
 {b:"b68",k:"order68",t:"Swipe down on ordering choices scrolls",c:"Go to the last question, scroll down, then swipe down starting on a choice at the bottom: the page scrolls up. Dragging a choice up into a slot still works.",go:["q","mech4",4]},
 {b:"b68",k:"calc68",t:"Calculator reads 2π as one number",c:"Calculator: 1/2π gives 0.159, 2π² gives 19.74, 2(3) gives 6.",go:["q","mech-machine-4",1,1]},
 {b:"b68",k:"wl68",t:"First-run beam labels",c:"Replay intro: drag the load to about 110 N: F label sits below the section label. See it at real size, small load: rest and loaded don't overlap.",go:["intro"]},
 {b:"b68",k:"fr68",t:"Friends sheet labels",c:"Settings → Friends: the three small labels sit above their boxes, not under them.",go:["settings"]},
 {b:"b68",k:"zoom68",t:"No more figure enlarge",c:"Stacks and queues, card 3: no expand icon in the figure's corner, and tapping the figure does nothing.",go:["les","cs-data-structures-2"]},
 {b:"b68",k:"cs268",t:"Two's complement taught first",c:"Bits and overflow: card 2 explains two's complement; question 1 reads clearly.",go:["les","cs2"]}
)}catch(e){}

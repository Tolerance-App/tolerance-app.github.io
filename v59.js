/* ===== v59 (2026-11-18): paste chips and the equation solver (flags from b57/b58) =====
   1. Chips pasted into the calculator box even with a solver box selected. Since b57 a chip pastes on click,
      and on iPhone the solver box has lost focus by then, so v11's qIns (which checks document.activeElement)
      fell through to #cin. qIns now uses KB.t, the box the app keyboard is typing into (svFocus sets it to
      "svN"; focusing the calculator or graph boxes sets it back), and refocuses that box.
   2. The screen jumped down and back when pasting into, or typing in, a solver box: svSet redraws the solver
      and refocuses the box, and iOS scrolled it into view. Refocusing now uses preventScroll.
   3. The chip row could be dragged up and down: overflow-x:auto made the row scrollable vertically too.
      It now only scrolls sideways (overflow-y hidden, touch-action pan-x). */
try{FB.ver="b59"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Tapping a number chip pastes into the solver box you picked, not the calculator.","No more screen jump when pasting into the solver.","The number chip row only scrolls sideways."]})}catch(e){}

function svRefocus59(id){const n=id&&$("#"+id);if(!n)return;try{n.focus({preventScroll:true})}catch(e){try{n.focus()}catch(x){}}try{n.setSelectionRange(n.value.length,n.value.length)}catch(e){}}
svSet=function(s,v){if(!CALC.sv)return;CALC.sv.vals[s]=v;CALC.sv.msg="";const a=document.activeElement,id=a&&a.id;svDraw();if(id)svRefocus59(id)};
const _qi59=qIns;qIns=function(v){try{const id=KB.t,el=id&&/^sv\d+$/.test(id)&&$("#"+id);
 if(el&&el.classList.contains("svin")){const s=el.selectionStart??el.value.length,t=el.selectionEnd??el.value.length;
  el.value=el.value.slice(0,s)+v+el.value.slice(t);el.dispatchEvent(new Event("input",{bubbles:true}));svRefocus59(id);return}}catch(e){}
 return _qi59.apply(this,arguments)};

document.head.insertAdjacentHTML("beforeend",`<style>
#tray{overflow-x:auto;overflow-y:hidden;touch-action:pan-x;overscroll-behavior:contain}
#tray .qchip{touch-action:pan-x}
</style>`);

try{TF48.unshift(
 {b:"b59",k:"paste59",t:"Chips paste into the solver box",c:"Tap the I box in the solver, then a number chip: it lands in that box, not the calculator. No screen jump.",go:["q","mech4",2,1]},
 {b:"b59",k:"tray59",t:"Chip row scrolls sideways only",c:"Drag the number chip row up and down: it shouldn't move. Sideways still scrolls.",go:["q","mech-machine-4",1,1]}
)}catch(e){}

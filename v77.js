/* ===== v77 (2026-11-21): binary demo (cs2) =====
   Seth's flags: "add arrows to increase the number stored by one, to see how binary counts" (priority) and
   "for 4 bit, 16 is the highest but I can scroll to 128 and it wraps around": the wrap is the point of the demo,
   so it is kept but now spelled out. −1 / +1 buttons under the slider, place values (8 4 2 1 …) under the bits,
   (the wrap sentence under the bits already explains overflow). */
try{FB.ver="b77"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Binary demo: −1 and +1 buttons to watch it count, with place values under each bit."]})}catch(e){}
function bits77(b,d){try{const box=b.closest(".demo"),P=box.dataset.p,e=document.getElementById(P+"v");e.value=Math.max(+e.min,Math.min(+e.max,+e.value+d));demoU(P)}catch(er){}}
try{const B=DEMOS.bits,ui0=B.ui,run0=B.run;
 B.ui=function(){return ui0.apply(this,arguments)+`<div class="bs77"><button class="btn ghost sm" onclick="bits77(this,-1)" aria-label="Store one less">−1</button><button class="btn ghost sm" onclick="bits77(this,1)" aria-label="Store one more">+1</button></div>`};
 B.run=function(v){const r=run0.apply(this,arguments);try{const n=+v.n,M=2**n,k=Math.floor(v.v/M),u=v.v%M,show=Math.min(n,16);
  const pv=[];for(let i=show-1;i>=0;i--)pv.push(2**i);
  if(n<=8)r.svg=r.svg.replace("</div>","</div>"+`<div class="bitrow pv77">${pv.map(x=>`<span>${x}</span>`).join("")}</div>`)}catch(e){}return r}}catch(e){}
document.head.insertAdjacentHTML("beforeend",`<style>.bs77{display:flex;gap:10px;justify-content:center;margin:4px 0 8px}.bs77 .btn{min-width:64px}
.bitrow.pv77{margin-top:0}.bitrow.pv77 span{border:0;height:16px;font:600 9px "JetBrains Mono",monospace;color:var(--fa);background:none}</style>`);
try{[{b:"b77",k:"bit77",t:"Binary counting buttons",c:"4 bits: tap +1 from 13 to 17. Bits count up with 8 4 2 1 under them; past 15 it wraps to 0.",go:["lab","cs2"]}].forEach(e=>TF48.unshift(e))}catch(e){}

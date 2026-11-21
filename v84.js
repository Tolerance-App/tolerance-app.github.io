/* ===== v84 (2026-11-21): card pictures from open flags =====
   1. cs-data-structures-4 card 2 (heap vs search tree): nodes are solid discs, so the tree lines no longer run
      through the numbers ("make the circle solid and the numbers sit on top").
   2. A second card picture per lesson (LFIG84[id][card]); LFIG17 still allows one. Same markup and class (fig17).
      - cs-data-structures-2 card 2 (queue): the kinds of queue: plain FIFO, priority queue, deque.
      - cs-data-structures-1 card 1 (arrays): zero-based index under each slot, first = [0], fourth = [3].
   3. ctrl-feedback-3 #2: a hint pointing at what the lesson taught (the integral term keeps growing while error
      remains). Same index, same answer. */
try{FB.ver="b84"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["New pictures: the kinds of queue, and array slots numbered from 0.","Heap and search-tree picture: the numbers sit on solid circles."]})}catch(e){}

/* 1. solid tree nodes: each filled node circle becomes a solid disc in the card colour plus its tint */
try{const f=LFIG17["cs-data-structures-4"];if(f&&f.spec&&f.spec.layers&&!f.s84){f.s84=1;f._svg=null;
 f.spec.layers=f.spec.layers.flatMap(L=>L&&L.t=="circle"&&L.fill&&L.r==.42?[{...L,c:"var(--s3)",op:1},{...L,op:.35,edge:true}]:[L])}}catch(e){}

/* 2. second card picture */
var LFIG84={};
try{
 const rowQ=(y,vals,hi,c)=>vals.map((v,i)=>Bx(3.2+i*1.2,y,1.1,.9,v,c,i===hi?.45:.15));
 LFIG84["cs-data-structures-2"]={1:{cap:"Kinds of queue. A plain queue serves whoever waited longest. A priority queue serves the smallest key first, whenever it arrived. A deque adds and removes at both ends. (The circular queue on the next card is a plain queue stored in a ring.)",
  spec:{view:[0,12,0,7.2],eq:true,axes:false,h:220,layers:[
   Tx(.3,6.45,"queue: in at the back, out at the front",""),...rowQ(5.2,["D","E","F","G"],0,"ok"),A17(3.1,5.65,1.3,5.65,"","tx",1.4),A17(10.2,5.65,8.1,5.65,"","tx",1.4),
   Tx(.3,4.25,"priority queue: smallest key out first",""),...rowQ(3.0,["5","2","8","6"],1,"orange"),Tx(8.3,3.35,"next out: 2",""),
   Tx(.3,2.05,"deque: in and out at both ends",""),...rowQ(.8,["H","J","K","L"],-1,"blue"),
   A17(3.1,1.45,1.6,1.45,"","tx",1.3),A17(1.6,1.05,3.1,1.05,"","tx",1.3),A17(8.1,1.45,9.6,1.45,"","tx",1.3),A17(9.6,1.05,8.1,1.05,"","tx",1.3)]}}};
 LFIG84["cs-data-structures-1"]={0:{cap:"The index counts steps from the start. [0] is the first element (zero steps in) and [3] is the fourth. An array of n slots runs from [0] to [n − 1].",
  spec:{view:[0,12,0,4],eq:true,axes:false,h:130,layers:[
   ...[0,1,2,3,4].map(i=>Bx(.6+i*2.2,1.5,2,1.1,["7","3","9","4","1"][i],i==0||i==3?"orange":"blue",i==0||i==3?.4:.15)),
   ...[0,1,2,3,4].map(i=>Tx(1.6+i*2.2,.9,"["+i+"]","middle","m")),Tx(1.6,3.05,"first","middle"),Tx(8.2,3.05,"fourth","middle")]}}};
}catch(e){}
try{const _cs84=cardScreen;cardScreen=function(){const r=_cs84.apply(this,arguments);try{const l=SS&&SS.l,m=l&&LFIG84[l.id],f=m&&m[SS.ci];
 if(f&&!$(".fig17")){const box=$(".lesson .cardbox"),svg=figSVG17(f);if(box&&svg)box.insertAdjacentHTML("beforebegin",`<figure class="fig fig17">${svg}<figcaption>${esc(f.cap)}</figcaption></figure>`)}}catch(e){}return r}}catch(e){}

/* 3. content, after build() */
function fix84(){try{const l=LS.find(x=>x.id=="ctrl-feedback-3"),q=l&&l.qs[2];if(q&&/^A P-controlled heater/.test(q.q||"")&&!q.hint)q.hint="Look back at the last card: the integral term adds up the error over time, so it keeps growing as long as any error is left."}catch(e){}}
try{const _bu84=build;build=function(){const r=_bu84.apply(this,arguments);try{fix84()}catch(e){}return r}}catch(e){}

try{[
 {b:"b84",k:"tr84",t:"Solid tree nodes",c:"Ordered structure tradeoffs, card 2: numbers sit on solid circles, no lines through them.",go:["lesson","cs-data-structures-4"]},
 {b:"b84",k:"qk84",t:"Kinds of queue picture",c:"Stacks and queues, card 2: plain queue, priority queue, deque.",go:["lesson","cs-data-structures-2"]},
 {b:"b84",k:"ix84",t:"Array index picture",c:"Arrays and linked nodes, card 1: slots numbered [0]–[4].",go:["lesson","cs-data-structures-1"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

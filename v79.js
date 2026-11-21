/* ===== v79 (2026-11-21): card pictures =====
   - cad-modeling-4 / cad-sketch-constraints-2 hole-spacing figure: the p and W labels sat on the dash-dot centre
     line ("P and w overlap"). The centre line now stays inside the plate and "x = 0" sits beside it.
   - design1 card 2: picture of the 2d edge-distance rule, one hole at 2d and one too close.
   - cad-sketch-constraints-3 card 2 and cad-modeling-3 card 2: pictures drawn by the b78 demos (AC = AB + BC as a
     driven dimension; a seated pin with only spin left). Only added where the lesson had no card figure. */
try{FB.ver="b79"}catch(e){}

try{const fix=id=>{const f=LFIG17[id];if(!f||!f.spec||!f.spec.layers)return;f._svg=null;
 f.spec.layers.forEach(l=>{if(l.t=="seg"&&l.dash=="6 3 1 3"&&l.x0==6){l.y0=1.5;l.y1=4.5}if(l.t=="text"&&l.s=="x = 0"){l.x=6.15;l.y=1.85;l.anc="start"}})};
 fix("cad-sketch-constraints-2");fix("cad-modeling-4")}catch(e){}

try{if(!LFIG17.design1)fig17("design1",1,"Keep a hole’s centre about two diameters (2d) from the edge. Closer than that, the thin strip of material beside it can tear out under load.",{view:[0,12,0,6],eq:true,axes:false,h:170,layers:[
 {t:"poly",pts:[[1,1.2],[11,1.2],[11,4.8],[1,4.8]],fill:true,c:"fa",op:.15},
 {t:"circle",cx:3,cy:3,r:.5,c:"tx",w:1.6},{t:"circle",cx:10.35,cy:3,r:.5,c:"bad",w:1.6},
 ...Dm(1,5.4,3,"2d"),...Dm(2.5,.6,3.5,"d"),Tx(3,2,"OK","middle"),Tx(9.9,2,"too close","end")]})}catch(e){}
try{if(!LFIG17["cad-sketch-constraints-3"])fig17("cad-sketch-constraints-3",1,"AB and BC are driving, so C’s position is already set. AC shown in brackets is a driven (reference) dimension: it reports 50, it doesn’t control anything.",{demo:"x:cad-sketch-constraints-3",v:{ab:30,bc:20,requested:50,m:0}})}catch(e){}
try{if(!LFIG17["cad-modeling-3"])fig17("cad-modeling-3",1,"A pin concentric in a hole and seated on the face: concentric leaves slide and spin along the axis, the face stops the slide, so only spin is left.",{demo:"x:cad-modeling-3",v:{mode:0,mate:4,n:4,j:4,hj:0}})}catch(e){}

try{[
 {b:"b79",k:"pw79",t:"p and W off the centre line",c:"Card 1 picture: p and W labels clear of the dash-dot line.",go:["lesson","cad-modeling-4"]},
 {b:"b79",k:"ed79",t:"2d edge-distance picture",c:"Card 2: hole at 2d marked OK, one too close in red.",go:["lesson","design1"]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

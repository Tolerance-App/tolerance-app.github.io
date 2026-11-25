/* ===== v104 (2026-11-25): springback figure label =====
   1. mfg-sheet-3 card 1 figure (Springback and flange limits): the "springback" label was left-anchored at x = 8.6 in a
      view 10 wide, so it ran off the right edge ("springbac"). It's now right-aligned at the edge, just below the end of
      the dotted springback line (Seth: "Fix the spring back issue"). */
try{FB.ver="b104"}catch(e){}

try{const f=LFIG17["mfg-sheet-3"];if(f&&f.spec&&f.spec.layers&&!f.s104){const L=f.spec.layers,i=L.findIndex(o=>o.t=="text"&&o.s=="springback");
 if(i>=0){f.s104=1;f._svg=null;L[i]={...L[i],x:9.9,y:2.0,anc:"end"}}}}catch(e){}

try{TF48.unshift({b:"b104",k:"sb104",t:"Springback label fits",c:"Springback and flange limits, card 1: the figure's \"springback\" label is no longer cut off at the right edge.",go:["lesson","mfg-sheet-3"]})}catch(e){}

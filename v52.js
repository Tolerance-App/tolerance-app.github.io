/* ===== v52 (2026-11-18): demo label clean-up =====
   1. Graph labels from the shared plot engine (plotSVG: axis numbers, legends, reference-line labels) get
      a halo in the card colour (class h52), so gridlines and markers passing behind a label break around
      it instead of running through the letters. Applies to every graph demo.
   2. v50/v51 picture models: labels moved off lines (τ marks, peak label, valve label, level label), the
      "gap left" column widened so "now" and its percent no longer touch, and the cruise car plays 1.5× faster.
   tools/demo-check.js finds overlapping or clipped labels in any demo (see CLAUDE.md, Testing). */
try{FB.ver="b52"}catch(e){}
try{document.head.insertAdjacentHTML("beforeend",`<style>.demo svg text.h52{paint-order:stroke;stroke:var(--s1);stroke-width:3px;stroke-linejoin:round}</style>`)}catch(e){}
try{const _pl52=plotSVG;plotSVG=function(){const s=_pl52.apply(this,arguments);try{return s.replace(/<text class="m"/g,'<text class="m h52"').replace(/<text (?!class=)/g,'<text class="h52" ')}catch(e){return s}}}catch(e){}
try{TF48.unshift(
 {b:"b52",k:"lbl52",t:"Graph labels clear of lines",c:"Bearing graph: the P marker no longer runs through the legend. τ, 2τ… sit beside their lines.",go:["lab","mech-machine-3"]},
 {b:"b52",k:"fo52",t:"Gap-left column",c:"\"now\" and its percent no longer touch, even at t = 480 s.",go:["lab","ctrl-feedback-2"]},
 {b:"b52",k:"car52",t:"Cruise car 1.5× faster",c:"One run takes about 9 s instead of 14 s.",go:["lab","ctrl-feedback-1"]})}catch(e){}

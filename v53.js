/* ===== v53 (2026-11-18): demo labels clear of lines and edges =====
   tools/demo-check.js (b52) found 93 of 312 demos with labels that overlap, sit on a line or run off the picture.
   1. 2D model engine (mk2D, v17; also the v39 model sets): the colour key ("blue: … · orange: …") and the y-axis
      name moved out of the plot into a strip above it, so they no longer run across the axes and gridlines.
      A long key wraps at its " · " breaks. Same for the hand-drawn keys of euler, tangent and taylor; linmap's
      bottom key wraps onto a second row.
   2. Graph engine (plotSVG): an x-axis number at either end ("1,000") slides inward instead of being cut off, and
      axis numbers get their muted colour back (b52's halo wrapper had given them a second class attribute).
   3. Every demo, after each redraw (TIDY53, wraps demoU): a label that overlaps another label, sits on a straight
      line, or runs past the picture or the plot frame it is clipped to, moves the smallest distance that clears
      it (a few px, or across to the other side of its line). A label just outside its plot frame (within
      16 px, so hidden by the clip) counts as cut off and moves in; one further out labels something off screen. Only if nothing nearby is clear does it stay put
      with the card-colour halo (h52): in practice labels crossing a gridline. A label lying on a curve moves up
      to 14 px if that clears it, else stays. Labels in rotated groups are left alone. Mean cost ≈ 0.5 ms a redraw.
   4. Hand fixes where the automatic move would read badly: rc, shaftx, lalu, c1ladder, mold32flow, lagram, omargin.
   tools/demo-check.js now ignores the parts of lines (and labels) hidden by a clip-path. */
try{FB.ver="b53"}catch(e){}

/* ---- text measuring (same font as `.demo svg text`) ---- */
const MC53=(()=>{let c;return s=>{try{c=c||document.createElement("canvas").getContext("2d");c.font="600 11px Inter, sans-serif";return c.measureText(String(s).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'")).width}catch(e){return String(s).length*6.2}}})();

/* ---- 1. mk2D: key and y-axis name in a strip above the plot ---- */
/* strip53(svg, note, yl): pull the key text (regex `note`) and the y-axis name (regex `yl`) out of the plot and set
   them in rows above it; the rest of the picture moves down by the strip's height. */
const strip53=(svg,noteRx,ylRx)=>{try{const m=svg.match(/^<svg viewBox="0 0 (\d+) (\d+)">([\s\S]*)<\/svg>$/);if(!m)return svg;const W=+m[1],H=+m[2];let g=m[3],note=null,yl=null;
  if(noteRx)g=g.replace(noteRx,(z,s)=>{note=s;return ""});
  if(ylRx)g=g.replace(ylRx,(z,s)=>{yl=s;return ""});
  if(note==null&&yl==null)return svg;
  const rows=[],maxW=W-12,wy=yl!=null?MC53(yl):0;let cur=yl!=null?{l:yl,r:""}:null;
  if(note!=null){const parts=note.split(" · ");let line="";
   const push=s=>{if(cur&&!cur.r&&(cur.l==null||wy+MC53(s)+14<=maxW)){cur.r=s;rows.push(cur);cur=null}else{if(cur)rows.push(cur);cur=null;rows.push({r:s})}};
   parts.forEach(p=>{const t=line?line+" · "+p:p;if(MC53(t)<=maxW||!line)line=t;else{push(line);line=p}});if(line)push(line)}
  if(cur)rows.push(cur);
  const hh=rows.length*13+3;let top="";
  rows.forEach((r,i)=>{const y=11+i*13;if(r.l!=null)top+=`<text x="6" y="${y}" class="m">${r.l}</text>`;if(r.r)top+=`<text x="${W-6}" y="${y}" text-anchor="end" class="m">${r.r}</text>`});
  return `<svg viewBox="0 0 ${W} ${H+hh}">${top}<g transform="translate(0 ${hh})">${g}</g></svg>`}catch(e){return svg}};
/* post53(id, f): pass demo id's picture through f(svg, values) after every run */
const post53=(id,f)=>{try{const D=DEMOS[id];if(!D||D.post53===f)return;const _r=D.run;D.run=function(v){const r=_r.apply(this,arguments);try{if(r&&r.svg)r.svg=f(r.svg,v||{})}catch(e){}return r};D.post53=f}catch(e){}};
try{const ref53=mk2D({}).run.toString(),N17=/<text x="294" y="18" text-anchor="end" class="m">([^<]*)<\/text>$/,Y17=/<text x="42" y="18"  class="m">([^<]*)<\/text>/,f17=s=>strip53(s,N17,Y17);
 Object.keys(DEMOS).forEach(id=>{const D=DEMOS[id];if(D&&typeof D.run=="function"&&D.run.toString()===ref53)post53(id,f17)});
 const _reg53=reg17;reg17=function(id){const r=_reg53.apply(this,arguments);post53(id,f17);return r};
 /* the same key, drawn top right by hand, in three v16 graphs */
 const N16=/<text x="292" y="22" text-anchor="end" class="m">([^<]*)<\/text>/;["euler","tangent","taylor"].forEach(id=>post53(id,s=>strip53(s,N16)));
}catch(e){}
/* foot53(svg): a left-aligned key on the bottom line that is wider than the picture wraps at " · " onto extra rows */
const foot53=svg=>{const m=svg.match(/^<svg viewBox="0 0 (\d+) (\d+)">/);if(!m)return svg;const W=+m[1],H=+m[2];let add=0;
 svg=svg.replace(/<text x="([\d.]+)" y="([\d.]+)"  class="m">([^<]*)<\/text>/g,(z,x,y,t)=>{if(+y<H-8||MC53(t)<=W-2*x)return z;const rows=[];let line="";
  t.split(" · ").forEach(p=>{const q=line?line+" · "+p:p;if(MC53(q)<=W-2*x||!line)line=q;else{rows.push(line);line=p}});rows.push(line);add=Math.max(add,(rows.length-1)*13);
  return rows.map((r,i)=>`<text x="${x}" y="${+y+i*13}"  class="m">${r}</text>`).join("")});
 return add?svg.replace(/^<svg viewBox="0 0 (\d+) (\d+)">/,`<svg viewBox="0 0 ${W} ${H+add}">`):svg};
post53("linmap",foot53);

/* ---- 2. plotSVG: end x-axis numbers stay inside the picture. Also repairs b52: its halo wrapper gave tagged
   labels a second class attribute (class="h52" … class="m"), and the browser keeps only the first, so axis
   numbers lost their muted colour. The two are merged back into one attribute. ---- */
try{const _pl53=plotSVG;plotSVG=function(){const s=_pl53.apply(this,arguments);try{return s.replace(/<text class="h52"([^>]*?) class="([^"]*)"/g,'<text$1 class="$2 h52"').replace(/<text x="([\d.]+)" y="183" text-anchor="middle" class="([^"]*)">([^<]*)<\/text>/g,(z,x,c,t)=>{const w=MC53(t)/2+1;let nx=+x;if(nx+w>299)nx=299-w;if(nx-w<1)nx=1+w;return `<text x="${nx.toFixed(1)}" y="183" text-anchor="middle" class="${c}">${t}</text>`})}catch(e){return s}}}catch(e){}

/* ---- 3. after each redraw: move labels off lines, other labels and edges ---- */
const TIDY53=(()=>{
 const clipBox=(el,svg)=>{for(let e=el.parentNode;e&&e!==svg;e=e.parentNode){const cp=e.getAttribute&&e.getAttribute("clip-path"),m=cp&&cp.match(/url\(#([^)]+)\)/);if(!m)continue;const c=svg.querySelector('[id="'+m[1]+'"] rect'),M=e.getScreenCTM();if(!c||!M)return null;
 const x=+c.getAttribute("x")||0,y=+c.getAttribute("y")||0,w=+c.getAttribute("width"),h=+c.getAttribute("height"),P=[[x,y],[x+w,y+h]].map(([a,b])=>[M.a*a+M.c*b+M.e,M.b*a+M.d*b+M.f]);
 return {left:Math.min(P[0][0],P[1][0]),right:Math.max(P[0][0],P[1][0]),top:Math.min(P[0][1],P[1][1]),bottom:Math.max(P[0][1],P[1][1])}}return null};
const clipR=(el,svg,r)=>{const b=clipBox(el,svg);if(!b)return r;const k={left:Math.max(r.left,b.left),right:Math.min(r.right,b.right),top:Math.max(r.top,b.top),bottom:Math.min(r.bottom,b.bottom)};
 return k.right>=k.left&&k.bottom>=k.top?{...k,width:k.right-k.left,height:k.bottom-k.top}:null};
 const OV=(a,b)=>{const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);return w>0&&h>0?w*h:0};
 const box=(r,d)=>({left:r.left+d,right:r.right-d,top:r.top+d,bottom:r.bottom-d});
 const mv=(r,dx,dy)=>({left:r.left+dx,right:r.right+dx,top:r.top+dy,bottom:r.bottom+dy});
 const hid=(el,root)=>{for(let e=el;e&&e!==root;e=e.parentNode){if(!e.getAttribute)continue;const cs=getComputedStyle(e);if(cs.display=="none"||cs.visibility=="hidden"||+cs.opacity===0)return true}return false};
 const straight=el=>{if(el.tagName=="line")return true;if(el.tagName!="path")return false;const d=el.getAttribute("d")||"";return /^\s*M[\d.\s-]+([HVL][\d.\s-]+)+\s*$/i.test(d)&&!/Z/i.test(d)};
 const C=[];for(const dy of [0,3,-3,5,-5,7,-7,9,-9,12,-12,15,-15])for(const dx of [0,4,-4,8,-8,12,-12,18,-18,26,-26])C.push([dx,dy]);C.sort((a,b)=>Math.hypot(a[0],a[1]*1.15)-Math.hypot(b[0],b[1]*1.15));
 /* curves: straight-segment polylines (M/L/H/V/Z) of stroked paths, in screen px, with the clip box they draw in */
 const segsOf=svg=>{const out=[];svg.querySelectorAll("path,line,polyline").forEach(p=>{if(hid(p,svg))return;if(straight(p)){const b=p.getBoundingClientRect();if(b.width<3||b.height<3)return}const cs=getComputedStyle(p);if(cs.stroke=="none"||+cs.strokeOpacity===0)return;const M=p.getScreenCTM();if(!M)return;const cb=clipBox(p,svg);let pl=[];
  if(p.tagName=="line")pl=[[[+p.getAttribute("x1"),+p.getAttribute("y1")],[+p.getAttribute("x2"),+p.getAttribute("y2")]]];
  else if(p.tagName=="polyline"){const n=(p.getAttribute("points")||"").match(/-?[\d.]+(?:e-?\d+)?/g)||[],c=[];for(let i=0;i+1<n.length;i+=2)c.push([+n[i],+n[i+1]]);pl=[c]}
  else{const d=p.getAttribute("d")||"";if(/[^MLHVZmlhvz\d.,\s\-e]/.test(d)||/[mlhv]/.test(d))return;const re=/([MLHVZ])([^MLHVZ]*)/g;let m,cx=0,cy=0,sx=0,sy=0,c=null;
   while(m=re.exec(d)){const k=m[1],n=(m[2].match(/-?[\d.]+(?:e-?\d+)?/g)||[]).map(Number);
    if(k=="M"){if(c&&c.length>1)pl.push(c);c=[];for(let i=0;i+1<n.length;i+=2){cx=n[i];cy=n[i+1];c.push([cx,cy])}sx=c[0]?c[0][0]:cx;sy=c[0]?c[0][1]:cy}
    else if(!c)return;else if(k=="L"){for(let i=0;i+1<n.length;i+=2){cx=n[i];cy=n[i+1];c.push([cx,cy])}}else if(k=="H")n.forEach(v=>{cx=v;c.push([cx,cy])});else if(k=="V")n.forEach(v=>{cy=v;c.push([cx,cy])});else c.push([sx,sy])}
   if(c&&c.length>1)pl.push(c)}
  /* consecutive points closer than 3 px are merged, so a finely sampled curve costs a few hundred segments, not thousands */
  pl.forEach(c=>{let x1=null,y1=null;for(let i=0;i<c.length;i++){const b=c[i],x2=M.a*b[0]+M.c*b[1]+M.e,y2=M.b*b[0]+M.d*b[1]+M.f;if(!isFinite(x2+y2))continue;
   if(x1===null){x1=x2;y1=y2;continue}if(Math.hypot(x2-x1,y2-y1)<3&&i<c.length-1)continue;out.push([x1,y1,x2,y2,cb]);x1=x2;y1=y2}})});return out};
 const hitSeg=(r,S)=>{for(const [x1,y1,x2,y2,cb] of S){let q=r;if(cb){q={left:Math.max(r.left,cb.left),right:Math.min(r.right,cb.right),top:Math.max(r.top,cb.top),bottom:Math.min(r.bottom,cb.bottom)};if(q.left>=q.right||q.top>=q.bottom)continue}
  if(Math.max(x1,x2)<q.left||Math.min(x1,x2)>q.right||Math.max(y1,y2)<q.top||Math.min(y1,y2)>q.bottom)continue;
  let t0=0,t1=1,ok=true;const dx=x2-x1,dy=y2-y1,P=[-dx,dx,-dy,dy],Q=[x1-q.left,q.right-x1,y1-q.top,q.bottom-y1];
  for(let k=0;k<4&&ok;k++){if(P[k]==0){if(Q[k]<0)ok=false}else{const t=Q[k]/P[k];if(P[k]<0){if(t>t1)ok=false;else if(t>t0)t0=t}else{if(t<t0)ok=false;else if(t<t1)t1=t}}}if(ok)return true}return false};
 return function(svg){try{const R=svg.getBoundingClientRect();if(!R.width)return;let SG=null;
  const T=[...svg.querySelectorAll("text")].filter(t=>t.textContent.trim()&&!hid(t,svg)).map(t=>{const r=box(t.getBoundingClientRect(),.8),cb=clipBox(t,svg);return {el:t,r,B:cb?{left:Math.max(R.left,cb.left),right:Math.min(R.right,cb.right),top:Math.max(R.top,cb.top),bottom:Math.min(R.bottom,cb.bottom)}:R}}).filter(t=>t.r.right>t.r.left&&OV(t.r,box(t.B,-16))>0);
  if(!T.length)return;
  const L=[...svg.querySelectorAll("line,path")].filter(l=>straight(l)&&!hid(l,svg)&&getComputedStyle(l).stroke!="none").map(l=>{const r=clipR(l,svg,l.getBoundingClientRect());if(!r)return null;return {left:r.left-1.6,right:r.right+1.6,top:r.top-1.6,bottom:r.bottom+1.6,w:r.width,h:r.height}}).filter(l=>l&&(l.w<3||l.h<3));
  let NS=null;const near=r=>{SG=SG||segsOf(svg);const e=box(r,-40);NS=SG.filter(([x1,y1,x2,y2])=>!(Math.max(x1,x2)<e.left||Math.min(x1,x2)>e.right||Math.max(y1,y2)<e.top||Math.min(y1,y2)>e.bottom))};
  const bad=(r,i,halo,cv)=>{const R=T[i].B;if(r.left<R.left+.5||r.right>R.right-.5||r.top<R.top+.5||r.bottom>R.bottom-.5)return 3;
   for(let j=0;j<T.length;j++)if(j!==i&&OV(r,box(T[j].r,-1.2))>0)return 2;
   if(!halo){const s=box(r,1);for(const l of L)if(OV(s,l)>0)return 1}
   if(cv&&hitSeg({left:r.left+1,right:r.right-1,top:r.top+1.5,bottom:r.bottom-1.5},NS))return .5;return 0};
  T.forEach((t,i)=>{const el=t.el,halo=el.classList.contains("h52");near(t.r);const b0=bad(t.r,i,halo,true);if(!b0)return;
   const P=el.parentNode&&el.parentNode.getScreenCTM&&el.parentNode.getScreenCTM();if(!P||Math.abs(P.b)>1e-6||Math.abs(P.c)>1e-6||!P.a||!P.d)return;
   let best=null;
   /* only crossing a curve: a short move if one clears it, otherwise leave it */
   if(b0==.5){for(const [dx,dy] of C){if(Math.hypot(dx,dy)>14)break;if(!bad(mv(t.r,dx,dy),i,halo,true)){best=[dx,dy];break}}if(!best)return}
   else{
   /* clipped: first slide inward just enough */
   let fx=0;if(t.r.right>t.B.right-1)fx=t.B.right-1-t.r.right;if(t.r.left<t.B.left+1)fx=t.B.left+1-t.r.left;let fy=0;if(t.r.bottom>t.B.bottom-1)fy=t.B.bottom-1-t.r.bottom;if(t.r.top<t.B.top+1)fy=t.B.top+1-t.r.top;
   for(const cv of [true,false]){for(const [dx,dy] of C){const r=mv(t.r,dx+fx,dy+fy);if(!bad(r,i,halo,cv)){best=[dx+fx,dy+fy];break}}if(best)break}
   /* nothing close: flip to the other side of where it is anchored (a label left of its line moves right of it) */
   if(!best){const w=t.r.right-t.r.left+8;for(const dy of [0,3,-3,6,-6,10,-10]){for(const dx of [-w,w]){if(!bad(mv(t.r,dx,dy),i,halo)){best=[dx,dy];break}}if(best)break}}
   if(!best&&(fx||fy)&&bad(mv(t.r,fx,fy),i,halo)<3)best=[fx,fy]}
   if(best){const ox=+el.dataset.t53x||0,oy=+el.dataset.t53y||0;el.dataset.t53x=ox+best[0]/P.a;el.dataset.t53y=oy+best[1]/P.d;
    const tr=(el.getAttribute("transform")||"").replace(/^translate\([^)]*\)\s*/,"");el.setAttribute("transform",`translate(${(+el.dataset.t53x).toFixed(1)} ${(+el.dataset.t53y).toFixed(1)})${tr?" "+tr:""}`);
    t.r=mv(t.r,best[0],best[1]);if(bad(t.r,i,halo)==1){el.classList.add("h52");el.dataset.h53=1}}
   else if(b0==1){el.classList.add("h52");el.dataset.h53=1}})}catch(e){}}})();
try{const _du53=demoU;demoU=function(p){const r=_du53.apply(this,arguments);try{const s=document.getElementById(p+"svg"),v=s&&s.querySelector("svg");if(v)TIDY53(v)}catch(e){}return r}}catch(e){}

/* ---- 4. hand fixes ---- */
/* rc: the "fc, −3 dB" label sat on the top gridline and ran into "gain (dB)" at low cutoffs. It now sits in the
   strip above the plot, over its dashed line, and clear of "gain (dB)". */
post53("rc",s=>s.replace(/<text x="([\d.]+)" y="[\d.-]+"\s*>fc, −3 dB<\/text>/,(z,x)=>`<text x="${Math.max(+x-2,100)}" y="11">fc, −3 dB</text>`));
/* shaftx: "r" (the radius axis) moved from the top of the axis, where the stress and "allowable" labels share its row,
   to the left of the axis at mid-height. */
post53("shaftx",s=>s.replace(/<text x="166" y="30"\s+class="m">r<\/text>/,`<text x="157" y="73" text-anchor="end" class="m">r</text>`));
/* lalu: "no pivoting" and "pivoted" rode on their dots; at ε = 1 both dots meet and the labels piled up. They now
   name the two lines at their left ends, above each line. */
post53("lalu",s=>s.replace(/<text x="[\d.-]+" y="[\d.-]+"\s*>no pivoting<\/text>/,`<text x="54" y="20">no pivoting</text>`).replace(/<text x="[\d.-]+" y="[\d.-]+"\s*>pivoted<\/text>/,`<text x="54" y="157">pivoted</text>`));
/* c1ladder: "y = …" moved left of the wall (it lay on the ladder when the ladder is nearly flat), "x = …" a little
   lower so it clears the floor line. */
post53("c1ladder",s=>{const w=s.match(/clip-path="[^"]*"><path d="M([\d.-]+) /);if(!w)return s;const x0=+w[1];
 return s.replace(/<text x="[\d.-]+" y="([\d.-]+)"\s+class="m">(y = [^<]*)<\/text>/,(z,y,t)=>`<text x="${(x0-6).toFixed(1)}" y="${y}" text-anchor="end" class="m">${t}</text>`)
  .replace(/<text x="([\d.-]+)" y="([\d.-]+)" text-anchor="middle" class="m">(x = [^<]*)<\/text>/,(z,x,y,t)=>`<text x="${x}" y="${(+y+5).toFixed(1)}" text-anchor="middle" class="m">${t}</text>`)});
/* mold32flow: on a short part "far corner" ran into "gate"; it now sits just past the far end, level with the part. */
post53("mold32flow",(s,v)=>s.replace(/<text x="([\d.-]+)" y="[\d.-]+" text-anchor="end"([^>]*)>far corner<\/text>/,(z,x,a)=>+x-20<MC53("gate")+MC53("far corner")+10?`<text x="${+x+6}" y="74" text-anchor="start"${a}>far corner</text>`:z));
/* lagram: a₁, the shadow and q₁ all point the same way, so their tip labels (all above-right) piled up and q₁ sat
   on the red shadow arrow. a₁ keeps its place; "shadow" goes below-right of its tip and q₁ below-left of its tip. */
post53("lagram",s=>s.replace(/<text x="([\d.-]+)" y="([\d.-]+)"\s*>shadow<\/text>/,(z,x,y)=>`<text x="${x}" y="${(+y+20).toFixed(1)}">shadow</text>`)
 .replace(/<text x="([\d.-]+)" y="([\d.-]+)"\s*>q₁<\/text>/,(z,x,y)=>`<text x="${(+x-10).toFixed(1)}" y="${(+y+20).toFixed(1)}" text-anchor="end">q₁</text>`));

/* omargin: when demand × FoS runs off the top of the picture its label was clipped away with the bar's top. The
   label now stays at the top edge, inside the bar. */
post53("omargin",s=>s.replace(/<text x="([\d.-]+)" y="([\d.-]+)" text-anchor="middle" class="m">(demand × FoS|demand|capability)<\/text>/g,(z,x,y,t)=>`<text x="${x}" y="${Math.max(+y,22).toFixed(1)}" text-anchor="middle" class="m">${t}</text>`));
try{NEWS.unshift({d:"2026-11-18",t:["Lab pictures: labels no longer overlap each other, sit on lines or get cut off at the edge. Colour keys moved above the graphs."]})}catch(e){}
try{TF48.unshift(
 {b:"b53",k:"lbl53",t:"Lab labels clear of lines and edges",c:"Colour key now above the graph, not across it. Drag the sliders to the ends: no label should overlap another, sit on a line or be cut off. Try LU pivoting at ε = 1 and Gram–Schmidt.",go:["lab","calc1-limits-4"]})}catch(e){}

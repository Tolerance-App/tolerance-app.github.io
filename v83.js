/* ===== v83 (2026-11-21): hash demo rebuilt, first "cool extras" lesson (Roche limit) =====
   1. cs-data-structures-3 "hash" demo: Seth: "both sliders change the same value about the same". Now a picture of
      the table: m buckets drawn as columns, each key a dot stacked in its bucket (separate chaining). Entries add
      dots; buckets add columns and spread them out; Hash Good/Bad shows the all-in-one-bucket worst case (O(n)).
      Same ideas kept: α = n/m and expected probes 1 + α/2 (found) / 1 + α (missing) as readouts.
   2. New lesson cool-roche-1 "The Roche limit" (Aerospace › Space › Cool extras), from Seth's idea flag for a home
      for cool, random topics. Equations in a new "Roche limit" bank (solver + Eqns), demo by density ratio.
      Numbers re-derived: Earth–Moon fluid limit 2.44 × 6371 × (5514/3344)^(1/3) = 18 364 km. */
try{FB.ver="b83"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["New: The Roche limit, the first of the cool extras (Aerospace → Space).","Hash table demo rebuilt: see the keys pile into buckets."]})}catch(e){}

/* 1. hash demo */
try{DEMOS.hash={t:"Keys in buckets",hint:"Each key goes to bucket h(key) mod m and joins that bucket’s chain. The load factor α = n/m is the average chain length: a lookup checks about 1 + α/2 entries when the key is there and 1 + α when it isn’t. More buckets spread the same keys thinner, which is why tables grow as they fill. A bad hash piles every key into one chain, and lookups slow to O(n).",
 ui:()=>slider("n","Entries n",0,60,1,18)+slider("m","Buckets m",2,16,1,6)+pickc("q","Hash",[[0,"Good"],[1,"Bad: all collide"]],0),
 ro:()=>rof([["Load factor α","a"],["Longest chain","b"],["Probes when found","c"],["Probes when missing","d"]]),
 run(v){const n=+v.n,m=+v.m,bad=+v.q==1,ch=Array.from({length:m},()=>[]);
  for(let k=0;k<n;k++){const b=bad?0:((Math.imul(k+7,2654435761)>>>0)%1000003)%m;ch[b].push(k)}
  const W=300,x0=10,cw=(W-x0*2)/m,top=14,base=196,dot=Math.min(11,cw*0.62),gap=Math.min(dot+2,(base-top-8)/Math.max(1,Math.max(...ch.map(c=>c.length))));
  const L=Math.max(...ch.map(c=>c.length)),a=n/m;let g="";
  ch.forEach((c,i)=>{const cx=x0+cw*(i+.5);g+=`<rect x="${(cx-cw*.42).toFixed(1)}" y="${base}" width="${(cw*.84).toFixed(1)}" height="12" rx="3" fill="var(--s3)" stroke="var(--line)"/>`;
   if(m<=12||i%2==0)g+=`<text x="${cx.toFixed(1)}" y="${base+26}" text-anchor="middle">${i}</text>`;
   c.forEach((k,j)=>{g+=`<circle cx="${cx.toFixed(1)}" cy="${(base-6-j*gap).toFixed(1)}" r="${(dot/2).toFixed(1)}" fill="${c.length==L&&L>1?"var(--orange)":"var(--blue)"}" stroke="none" opacity=".85"/>`})});
  const ay=base-6-(a-1)*gap-dot/2;if(n>0&&a<=L)g+=`<path d="M${x0} ${ay.toFixed(1)}H${W-x0}" stroke="var(--fa)" stroke-dasharray="4 4" fill="none"/>`;
  return{svg:`<svg viewBox="0 0 300 228">${g}</svg>`,lab:{n:String(n),m:String(m)},out:{a:a.toFixed(2),b:String(L)+(L>1?" (orange)":""),c:bad?(1+(n-1)/2).toFixed(1):(1+a/2).toFixed(2),d:bad?String(1+n):(1+a).toFixed(2)}}}}}catch(e){}

/* 2. Roche limit lesson */
try{if(!BUNDLE.some(l=>l&&l.id=="cool-roche-1"))BUNDLE.push({id:"cool-roche-1",sub:"aero",subName:"Aerospace",field:"Aerospace",section:"Space",branch:"Cool extras",lv:2,title:"The Roche limit",req:[],
 plain:"Bring a moon too close to its planet and the planet’s tides pull it apart.",
 cards:["The planet pulls harder on a moon’s near side than on its far side. That difference, the tidal force, tries to stretch the moon. A moon held together only by its own gravity has a distance inside which the stretching wins: the Roche limit.",
  "For a fluid-like moon, d ≈ 2.44·R·(ρp/ρm)^(1/3), with R the planet’s radius and ρp, ρm the planet’s and moon’s densities. A rigid moon holds on closer, about 1.26·R·(ρp/ρm)^(1/3); real moons fall between. Assumes a circular orbit and a moon held together by gravity alone.",
  "The moon’s size cancels out: only the density ratio matters, and only as a cube root. A denser moon can orbit closer; a fluffy, icy one breaks up farther out.",
  "Example: Earth (R = 6371 km, ρ = 5514 kg/m³) and the Moon (ρ = 3344 kg/m³) give a fluid limit of about 18 400 km. The Moon orbits at 384 400 km, about 21 times farther out. Saturn’s bright rings sit close to or inside its Roche limit, where loose ice can’t gather into a moon.",
  "Why spacecraft don’t care: the ISS orbits about 400 km up, deep inside Earth’s Roche limit, but bolts and metal hold it together, not its own gravity. The tidal stretch on it is tiny compared with its strength."],
 talk:["“It’s inside the Roche limit, so it’ll never clump into a moon.”","“The comet got torn apart on its close pass.”"],
 qs:[{t:"fill",q:"Earth has R = 6371 km and density 5514 kg/m³; the Moon’s density is 3344 kg/m³. Using d = 2.44·R·(ρp/ρm)^(1/3), what is the fluid Roche limit, in km?",a:18360,tol:0.02,unit:"km",why:"5514/3344 = 1.649, cube root 1.181, so d = 2.44 × 6371 × 1.181 ≈ 18 360 km. Forgetting the cube root gives about 25 600 km; using 1.26 instead of 2.44 gives the rigid limit, about 9 480 km."},
  {t:"mc",q:"A small moon held together only by its own gravity drifts inside its planet’s Roche limit. What happens?",ans:"Tides pull it apart into a ring of debris",wrong:["It falls straight into the planet","It speeds up and escapes its orbit","Nothing: its own gravity holds it together"],why:"Inside the limit the planet’s pull on the near side exceeds the far side by more than the moon’s gravity can resist, so it breaks up and spreads along its orbit. Breaking up doesn’t change the orbit itself, so it neither falls in nor escapes; self-gravity is exactly what loses."},
  {t:"mc",q:"Two moons orbit the same planet. One is twice as dense as the other. Whose Roche limit is closer to the planet?",ans:"The denser moon’s",wrong:["The less dense moon’s","They are the same, since the planet is the same","The larger moon’s, whatever its density"],why:"d ∝ (ρp/ρm)^(1/3): a denser moon lowers the ratio, so it can orbit closer before breaking up. The planet being the same doesn’t make the limits equal, and the moon’s size cancels out of the formula."},
  {t:"fill",q:"A moon’s density is 8 times lower than another’s, around the same planet. By what factor is its Roche limit farther out?",a:2,tol:0.02,why:"d ∝ (ρp/ρm)^(1/3), so the factor is 8^(1/3) = 2. Answering 8 forgets the cube root."},
  {t:"mc",q:"Why can the ISS orbit far inside Earth’s Roche limit without breaking apart?",ans:"Its structure, not its own gravity, holds it together",wrong:["It orbits too fast for tides to act","The Roche limit applies only to the Moon","It is denser than Earth"],why:"The Roche limit is for bodies held together by self-gravity. The ISS is held by bolts and metal, which are far stronger than the tiny tidal stretch. Speed doesn’t switch tides off, the limit applies to any self-gravitating body, and the ISS is much less dense than Earth."}],
 demo:{title:"Roche limit and density",hint:"The fluid limit is 2.44·R·(ρp/ρm)^(1/3); a rigid moon’s is 1.26·R·(ρp/ρm)^(1/3). Slide the moon’s density: denser moons can orbit closer, but only as a cube root.",
  sliders:[{k:"R",label:"Planet radius",min:1000,max:70000,step:100,value:6371,unit:"km"},{k:"P",label:"Planet density",min:500,max:8000,step:10,value:5514,unit:"kg/m³"},{k:"M",label:"Moon density",min:500,max:8000,step:10,value:3344,unit:"kg/m³"}],
  x:{label:"moon density (kg/m³)",min:500,max:8000},curves:[{label:"fluid limit (km)",f:"2.44*R*(P/x)^(1/3)"},{label:"rigid limit (km)",f:"1.26*R*(P/x)^(1/3)"}],mark:"M",
  readouts:[{label:"Fluid Roche limit",f:"2.44*R*(P/M)^(1/3)",unit:"km"},{label:"Rigid Roche limit",f:"1.26*R*(P/M)^(1/3)",unit:"km"},{label:"In planet radii (fluid)",f:"2.44*(P/M)^(1/3)"}]}})}catch(e){}
try{EQB.roche={t:"Roche limit",e:[["Roche limit, fluid moon","d = 2.44·R·(ρp/ρm)^(1/3)","d Roche distance (km), R planet radius (km), ρp planet density (kg/m³), ρm moon density (kg/m³)"],
 ["Roche limit, rigid moon","d = 1.26·R·(ρp/ρm)^(1/3)","d Roche distance (km), R planet radius (km), ρp planet density (kg/m³), ρm moon density (kg/m³)"]]};
 EQB.roche.e.forEach(([n,f,d])=>{if(!EQX[f]){const q=eqParse25(n,f,d);if(q)EQX[f]=q;else EQBAD30.push(f)}});
 LB30["cool-roche-1"]=["roche"];try{const g=EQG62.find(x=>x[0]=="Aerospace");if(g&&!g[1].includes("roche"))g[1].push("roche")}catch(e){}
 const q0="Earth has R = 6371 km and density 5514 kg/m³; the Moon’s density is 3344 kg/m³. Using d = 2.44·R·(ρp/ρm)^(1/3), what is the fluid Roche limit, in km?";
 QD30["cool-roche-1#0"]=[QH30(q0),["d = 2.44·R·(ρp/ρm)^(1/3)"]]}catch(e){}

try{[{b:"b83",k:"rc83",t:"Roche limit lesson",c:"Aerospace → Space → Cool extras: 5 cards, 5 questions, density demo; Tools opens the Roche equation on question 1 (18 360 km).",go:["q","cool-roche-1",0,1]},
 {b:"b83",k:"hs83",t:"Hash demo rebuilt",c:"Entries add dots, buckets add columns; Hash Bad piles them all in bucket 0.",go:["lab","cs-data-structures-3"]}].forEach(e=>TF48.unshift(e))}catch(e){}

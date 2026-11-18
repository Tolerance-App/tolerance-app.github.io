/* ===== v56 (2026-11-18): see and force updates from Settings =====
   Seth: the Home Screen app didn't seem to pick up new builds, while Chrome did. v42's check works in a browser
   (tested), but on an iPhone there was no way to see which build is running versus what's live.
   1. Settings → Beta gets an "Updates" row under What's new: "Running bNN · latest bMM". Tapping it checks
      version.json again (no-store) and, if a newer build is out, reloads at a URL never used before
      (./?b=bNN&t=…), so no cache can hand back the old index.html. It also clears v42's 10-minute loop guard.
   2. If v42 already tried to update and the old build came back anyway, the row says so ("Tried bNN at 14:05,
      old build loaded"). That means iOS served a cached copy, which tells us where the fault is.
   3. The daily screen (first open each day) counts as calm, so v42 can update there instead of waiting
      for Learn. */
try{FB.ver="b56"}catch(e){}
try{NEWS.unshift({d:"2026-11-18",t:["Settings → Updates shows which build you’re running and the latest one. Tap it to update right away."]})}catch(e){}
try{if(SAFE42.indexOf("daily")<0)SAFE42.push("daily")}catch(e){}

const UP56={latest:null,at:0,busy:false,msg:""};
const hhmm56=t=>{const d=new Date(t);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
/* v42 tried to load a newer build within the last day, but this page is still older than it */
function stale56(){try{const o=JSON.parse(localStorage.getItem("tol_upd42")||"{}");
 if(o.v&&bnum42(o.v)>bnum42(FB.ver)&&Date.now()-o.at<864e5)return o}catch(e){}return null}
function upRow56(){const L=UP56.latest,newer=L&&bnum42(L)>bnum42(FB.ver),s=stale56();
 let sm=UP56.msg||(UP56.busy?"Checking…":L?(newer?"A newer build is out. Tap to update now.":"Up to date"+(UP56.at?" · checked "+hhmm56(UP56.at):"")):"Tap to check");
 if(s&&!UP56.msg)sm=`Tried ${s.v} at ${hhmm56(s.at)}, but the old build loaded. Tap to try again.`;
 return `<span><b>Updates</b><small id="upsm56">${esc(sm)}</small></span><span class="val mono">${esc(FB.ver)}${L&&newer?" → "+esc(L):""}</span>${IC.chevR}`}
function upPaint56(){const r=$("#uprow56");if(r)r.innerHTML=upRow56()}
async function upFetch56(){UP56.busy=true;UP56.msg="";upPaint56();
 try{const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)throw Error(r.status);const j=await r.json();UP56.latest=j.v;UP56.at=Date.now()}
 catch(e){UP56.msg="Couldn't reach the site. Check your connection."}
 UP56.busy=false;upPaint56();return UP56.latest}
async function upTap56(){if(UP56.busy)return;const v=await upFetch56();if(!v)return;
 if(bnum42(v)>bnum42(FB.ver)||stale56()){const to=bnum42(v)>bnum42(FB.ver)?v:stale56().v;
  UP56.msg="Updating to "+to+"…";upPaint56();
  try{save()}catch(e){}
  try{localStorage.setItem("tol_upd42",JSON.stringify({v:to,at:Date.now()}))}catch(e){}
  setTimeout(()=>location.replace(location.pathname+"?b="+encodeURIComponent(to)+"&t="+Date.now()+location.hash),300)}}
const _set56=settings;settings=function(){const r=_set56.apply(this,arguments);try{
 if(!$("#uprow56")){const n=document.querySelector('.pad button.row[onclick="newsSheet()"]');
  if(n){n.insertAdjacentHTML("afterend",`<button class="row" id="uprow56" onclick="upTap56()">${upRow56()}</button>`);
   if(!UP56.busy&&Date.now()-UP56.at>3e4)upFetch56()}}}catch(e){}return r};
/* v42 strips ?b=… after a reload; also strip the &t=… this build adds */
try{if(/[?&]t=/.test(location.search))history.replaceState(null,"",location.pathname+location.hash)}catch(e){}

try{TF48.unshift(
 {b:"b56",k:"upd56",t:"Updates row in Settings",c:"Settings → Beta → Updates shows \"b56\" and \"Up to date\". After the next build ships, it should show → bNN; tap it and the app reloads on the new build.",go:["settings"]}
)}catch(e){}
/* TF48 jump kind "settings": close the checklist and show Settings */
try{const _tg56=tfGo48;tfGo48=function(i){const it=TF48[i];if(it&&it.go&&it.go[0]=="settings"){try{closeSheet(true)}catch(e){}settings();return}return _tg56.apply(this,arguments)}}catch(e){}

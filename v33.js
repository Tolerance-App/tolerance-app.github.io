/* ===== v33 site (2026-11-16): Tolerance on its own site, saving to Firebase =====
   The app is the same build as the claude.ai version (b32). What changes here:
   - Storage: fbnet.js gives every device a private anonymous account the first time it opens the app.
     Progress, friend cards and feedback save there. Nothing to sign up for, and publishing a new
     version of the site never touches it.
   - #import=... in the address carries progress over from the old claude.ai link (the "moved" card there
     builds that link). It merges, so it can only add.
   - Status lines and the "not backed up" banner talk about the online backup instead of claude.ai. */
try{FB.ver="b33"}catch(e){}
try{NEWS.unshift({d:"2026-11-16 evening",t:["Tolerance has its own home now. Your progress is backed up to a private account made for this device automatically, with no sign-up, and new versions never erase it.","Moving to a new phone: Settings → Progress → Copy progress code, then Restore progress on the new phone."]})}catch(e){}

/* ---------- 1. progress carried over from the old claude.ai link ---------- */
const IMP33=(function(){
 try{
  const m=/[#&]import=([A-Za-z0-9_\-]+)/.exec(location.hash||"");if(!m)return null;
  let b=m[1].replace(/-/g,"+").replace(/_/g,"/");b+="===".slice((b.length+3)%4);
  const bytes=Uint8Array.from(atob(b),c=>c.charCodeAt(0));
  const p=JSON.parse(new TextDecoder().decode(bytes));
  try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}
  if(!p||p.tolerance!=="move"||!p.st||typeof p.st!="object")return {ok:false,why:"not a move code"};
  const before={xp:+st.xp||0,n:Object.keys(st.done||{}).length};
  const keep={theme:st.theme,amb:st.amb,ambT:st.ambT,ownkb:st.ownkb};
  const m2=mergeP28(st,p.st);
  st=Object.assign({},m2,p.st.theme?{}:keep);
  ["done","blind","miss","sec","tips","days"].forEach(k=>{if(!st[k]||typeof st[k]!="object")st[k]={}});
  if(!Array.isArray(st.custom))st.custom=[];
  st.welcomed=WLLOC;st.moved33=Date.now();
  try{FR32=false}catch(e){}
  save();
  return {ok:true,xp:st.xp,lessons:Object.keys(st.done||{}).length,addedXp:(+st.xp||0)-before.xp,addedLessons:Object.keys(st.done||{}).length-before.n};
 }catch(e){try{history.replaceState(null,"",location.pathname+location.search)}catch(x){}return {ok:false,why:(e&&e.message)||"unreadable"}}
})();
function moved33(){if(!IMP33)return;const r=IMP33;
 setTimeout(()=>{try{
  if(r.ok)sheet(`<p class="kick blue">Welcome to the new home</p><h2 class="sht">Your progress came with you</h2><p class="body">${r.lessons} lesson${r.lessons==1?"":"s"} and ${r.xp} XP are here. From now on it’s backed up automatically, and new versions won’t erase it.</p><p class="body">Tip: add this page to your home screen so it opens like an app (Share → Add to Home Screen).</p><button class="btn" onclick="closeSheet()">Keep learning</button>`,"var(--blue)");
  else sheet(`<h2 class="sht">Couldn’t bring your progress over</h2><p class="body">The link was cut off (${esc(r.why)}). Go back to the old app and tap the button again, or use Settings → Progress → Copy progress code there and Restore progress here.</p><button class="btn" onclick="closeSheet()">OK</button>`)
 }catch(e){}},700)}
const _home33=home;home=function(){const r=_home33.apply(this,arguments);if(IMP33&&!IMP33.shown){IMP33.shown=1;moved33()}return r};

/* ---------- 2. status wording: online backup, not claude.ai ---------- */
banner32=function(){try{const b=$("#bn32");const bad=NET.done32&&(!NET.uid||(NET.saveErr&&!NET.saveOK));
 if(!bad){if(b)b.remove();return}if(view!="learn"||b)return;const anc=$(".daily")||$("#app .screen");if(!anc)return;
 const why=(window.TOLFB&&TOLFB.err)||NET.saveErr||"";
 anc.insertAdjacentHTML(anc.classList.contains("daily")?"beforebegin":"afterbegin",`<div class="bn32" id="bn32" role="status"><b>Progress not backed up</b><span>The online backup couldn’t connect${why?` (${esc(why)})`:""}, so right now your progress is only on this device. It will keep trying.</span><button class="btn ghost sm" onclick="codeSheet28()">Copy a backup code</button></div>`)}catch(e){}};
const _set33=settings;settings=function(){_set33.apply(this,arguments);try{
 const s=$("#syn28");if(s)s.textContent=NET.saveOK?"Saved on this device and backed up online. New versions of the app keep it.":NET.uid?(NET.saveErr?"Couldn’t reach the backup yet; saved on this device for now.":"Saved on this device; backing up…"):"Only on this device right now: the online backup hasn’t connected.";
 const fr=[...document.querySelectorAll('.pad .row')].find(r=>/Friends and sync/.test(r.textContent));if(fr){const sm=fr.querySelector("small");if(sm)sm.textContent=NET.uid?`${(st.friends||[]).length} friend${(st.friends||[]).length==1?"":"s"} · add a friend with their code`:"Friends need the online backup"}
 const cp=$("#cprow28");if(cp){const sm=cp.querySelector("small");if(sm)sm.textContent="Move your progress to a new phone or browser"}
}catch(e){}};
const _fs33=friendsSheet;friendsSheet=function(){if(NET.db&&NET.uid)return _fs33.apply(this,arguments);
 sheet(`<p class="kick">Friends</p><h2 class="sht">Friends aren’t available right now</h2><p class="body">Friends use the online backup, which hasn’t connected on this device yet. Check your connection and reopen the app.</p><button class="btn ghost" onclick="closeSheet()">Close</button>`,"var(--blue)")};

/* ===== v70 (2026-11-19): friend codes from Firebase accounts =====
   Seth: "The friend button isn't working ... saying something about expecting it to start with a u_."
   okCode32 (v32) only accepted claude.ai artifact IDs ("u_…"). Since the move to Firebase every friend code is a
   Firebase uid: 28 letters and digits, no prefix (e.g. ke1WMzWdqOV1J1fRo3wGLK85Osf1), so every code was refused.
   addFriend32 is replaced (okCode32 is a const and can't be rewrapped). It now accepts Firebase uids and old u_
   codes, trims spaces and stray quotes, and keeps the same "own code" check and save path. */
try{FB.ver="b70"}catch(e){}
try{NEWS.unshift({d:"2026-11-19",t:["Adding a friend by code works again. Codes no longer need to start with u_."]})}catch(e){}

const okCode70=c=>/^[A-Za-z0-9]{20,40}$/.test(c)||/^u_[A-Za-z0-9_-]{6,64}$/.test(c);
addFriend32=function(){const i=$("#adc32"),m=$("#fm32");const c=((i&&i.value)||"").replace(/\s+/g,"").replace(/^["'`]+|["'`]+$/g,"");
 if(!okCode70(c)){if(m){m.style.color="var(--bad)";m.textContent="That doesn’t look like a friend code. Copy it from your friend’s Settings → Friends."}return}
 if(c==NET.uid){if(m){m.style.color="var(--bad)";m.textContent="That’s your own code."}return}
 st.friends=[...new Set([...(st.friends||[]),c])];st.unfriend=(st.unfriend||[]).filter(x=>x!=c);save();friendsSheet();try{if(view=="learn")refreshDaily()}catch(e){}};

try{TF48.unshift({b:"b70",k:"fr70",t:"Add a friend by code",c:"Settings → Friends: paste a friend's code (28 letters and digits) and tap Add. They appear on the board; once they've opened the app, their streak shows.",go:["settings"]})}catch(e){}

/* ===== v107 (2026-11-25): app icon back to b95 =====
   Seth: "Don't change the icon please. I think it looks good right now. Restore the last one." b106's icon (shifted
   face, royal blue) is reverted: icon-180/192/512.png, tools/icon.svg and the two copies in index.html are b95's
   again. b106's "What's new" line about the icon is removed. b106's card fixes (radical bar, header case) stay. */
try{FB.ver="b107"}catch(e){}
try{const i=NEWS.findIndex(n=>n&&n.t&&/app icon's bottom edge/.test(n.t.join(" ")));if(i>=0)NEWS.splice(i,1)}catch(e){}

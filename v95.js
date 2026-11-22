/* ===== v95 (2026-11-22): new app icon =====
   The ± drawn as two of the app's own buttons (flat face on a darker ledge) sitting on one big blue button.
   Source: tools/icon.svg (1024 px). Exported icon-180/192/512.png are full squares; iOS and Android apply their
   own corner mask, so the big button's ledge runs straight across the bottom of the PNG.
   The data: icons in index.html <head> were swapped in place. iPhone Home Screen copies keep the old icon until
   re-added (iOS never refreshes it); Android picks it up from the manifest on its own. */
try{FB.ver="b95"}catch(e){}
try{NEWS.unshift({d:"2026-11-22",t:["New app icon: the ± as one of Tolerance's own buttons."]})}catch(e){}

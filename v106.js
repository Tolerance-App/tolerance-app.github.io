/* ===== v106 (2026-11-25): app icon ledge fix in royal blue; two reveal-card renderer fixes =====
   1. App icon. Seth on b95: "The underline looks weird." The b95 face was the tile squashed vertically, so the dark
      ledge climbed both sides. The face is now the tile shifted up (like the in-app buttons' edge), so the ledge only
      shows along the bottom, at 60 of 1024 (option J2). Blue: Seth asked for "a couple steps closer to navy or royal
      blue" → option M2, face #2961DE → #1A48C0, ledge #15368F → #0E2872. The ± is unchanged (H1b).
      Files: icon-180/192/512.png, tools/icon.svg, and the two copies inside index.html. iPhones keep their saved icon
      until the app is re-added; Android picks it up from the manifest.
   2. Radical bar over superscripts (course chats reported √{4^2 + 3^2}: the bar ran through the exponents). v98 sets
      sup line-height:0, so the radicand box didn't grow to hold them. Inside a radical the radicand is now an
      inline-block whose box includes its superscripts, so the bar sits above them.
   3. Table headers are uppercased, which turned ρ into "P". Math written as $…$ inside a header (or a formula
      label) keeps its case. */
try{FB.ver="b106"}catch(e){}

try{document.head.insertAdjacentHTML("beforeend",`<style>
.rad98>span{display:inline-block;line-height:1.15;padding-top:.12em;vertical-align:baseline}
.rad98 sup{line-height:1;vertical-align:.42em}
.tbl98>.th .f98,.eqlab98 .f98,.qk98 .f98{text-transform:none;letter-spacing:0;background:none;border:0;padding:0;font-size:1.2em}
</style>`)}catch(e){}

try{TF48.unshift({b:"b106",k:"rad106",t:"Square-root bar clears exponents",c:"Speed of sound card: the bar over √γRT sits cleanly above the letters. Course cards with a square root over a power no longer overlap.",go:["lesson","aero-aerodynamics-5"]})}catch(e){}
try{NEWS.unshift({d:"2026-11-25",t:["The app icon's bottom edge now runs only along the bottom, in a deeper royal blue."]})}catch(e){}

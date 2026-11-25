/* ===== v101 (2026-11-25): two Engineering math reveal cards redone =====
   Seth: "Do what you think is best for the apps future." Replaces two b99 cards (rc98 later wins; `cards`, `qs`, ids and
   question order untouched):
   1. math-found-1 card 0: b99 blanked "cancel", a verb, while LEARNING_DESIGN keeps Fill for relation words. Now no
      blank; worked rows show units multiplying, dividing and cancelling.
   2. math-found-1 card 3: b99 put five prefix tiles in a four-column grid, so micro sat alone on a second row. Now a
      row of three bigger prefixes and a row of two smaller ones, plus "case matters" (m vs M). */
try{FB.ver="b101"}catch(e){}

/* 1. Plain text + worked rows. 3 × 2 = 6 m²; 10 / 2 = 5 m/s; 2 min × 60 s/min = 120 s (min cancels) */
rc98("math-found-1",0,{p:[
 {t:"p",x:"Every physical quantity is a number times a unit: 250 N means 250 times one newton."},
 [{t:"p",x:"Treat units like algebra. They multiply and divide:"},
  {t:"step",f:"3 m × 2 m",v:"6",u:"m^2"},
  {t:"step",f:"10 m ÷ 2 s",v:"5",u:"m/s"}],
 [{t:"p",x:"And they cancel, top against bottom:"},
  {t:"step",f:"2 min × 60 s/min",v:"120",u:"s"}]]});
/* 2. Prefix tiles → worked steps. 1 MPa = 10⁶ N/m²; 1 m² = 10⁶ mm²; 10⁶ N / 10⁶ mm² = 1 N/mm² */
rc98("math-found-1",3,{p:[
 {t:"giv",lab:"Prefixes · bigger",rows:[["k","10^3","kilo"],["M","10^6","mega"],["G","10^9","giga"]]},
 [{t:"giv",lab:"Prefixes · smaller",rows:[["m","10^{−3}","milli"],["µ","10^{−6}","micro"]]},
  {t:"p",x:"Case matters: m is milli, M is mega."}],
 [{t:"step",f:"1 MPa",v:"10^6",u:"N/m^2"},
  {t:"step",f:"1 m^2",v:"10^6",u:"mm^2"}],
 [{t:"step",f:"1 MPa = 10^6 N / 10^6 mm^2",v:"1",u:"N/mm^2",fin:1},
  {t:"p",x:"Drawings give sizes in mm, so a stress in MPa is simply newtons per square millimetre."}]]});

try{TF48.unshift({b:"b101",k:"rc101m",t:"Units cards: no orphan prefix tile",c:"Units and conversions, cards 1 and 4: card 1 has no blank now; card 4 shows prefixes in two rows (bigger, smaller).",go:["lesson","math-found-1"]})}catch(e){}

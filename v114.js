/* ===== v114 (2026-11-25): Codex pipeline v2 (no change testers can see) =====
   1. qfix(id, qIndex, guard, edit): one way to fix a question in any lesson, old BASE rows included (bq32 only
      reaches BUNDLE lessons). Fixes queue up and run right after build(), on LS. guard is a RegExp that must match the
      question's current q text, so a fix can't land on the wrong question; edit(q) changes it in place. Logs to FIX32
      ("ok id#i" / "miss id#i"), which tools/ship_codex.py checks. Codex audit fix files (codex/fixes/<code>.js) use it.
   2. tools/ship_codex.py, codex/tasks/review.md: see codex/README.md. */
try{FB.ver="b114"}catch(e){}
const QFX114=[];
function qfix(id,i,guard,edit){QFX114.push([id,i,guard,edit])}
try{const _bu114=build;build=function(){const r=_bu114.apply(this,arguments);
 QFX114.forEach(([id,i,g,ed])=>{try{const l=(LS||[]).find(x=>x.id==id),q=l&&l.qs&&l.qs[i];
  if(!q||!(g instanceof RegExp?g.test(String(q.q)):String(q.q).startsWith(g))){FIX32.push("miss "+id+"#"+i);return}
  ed(q);FIX32.push("ok "+id+"#"+i)}catch(e){FIX32.push("err "+id+"#"+i)}});return r}}catch(e){}

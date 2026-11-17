/* ===== v41 (2026-11-17): model sets open their lessons =====
   b39's model-set view (labX39) was written before any lesson used these models, so it has no
   "Open the lesson" button. b40 added a lesson for each model. Now, when a lesson's model is the one
   being opened, the model-set row opens the lesson's own Lab view (labOpen), which has the button.
   Models with no lesson still open the bare model view as before. */
try{FB.ver="b41"}catch(e){}
function xLesson41(did){try{return LS.find(l=>{try{return lessonDemo(l)==did}catch(e){return false}})||null}catch(e){return null}}
const _lx41=labX39;labX39=function(id){const l=xLesson41(id);if(l)return labOpen(l.id);return _lx41.apply(this,arguments)};

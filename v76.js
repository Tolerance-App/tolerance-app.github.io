/* ===== v76 (2026-11-21): content fixes, CS data structures, Routh lesson, growth rates =====
   Same indices and ids, patched on LS after build() and guarded by current text (see fix73).
   - cs-data-structures-2 #0–#3 plainer (same answers), queue card ends with an everyday example.
   - cs-data-structures-3: "amortized" defined on the growth card. cs-data-structures-4 #0 gets a real poke, #3 plainer.
   - ctrl-exam-1: the Routh card writes out the actual table rows; the sign-change card is plain; #3 gives the
     first column, #4 is four plain steps, #5 is plainer.
   - cs1: what a scan is, and why a loop inside a loop is n². */
try{FB.ver="b76"}catch(e){}
try{NEWS.unshift({d:"2026-11-21",t:["Plainer questions in Stacks and queues and the Routh lesson, which now shows the full Routh table."]})}catch(e){}

function fix76(){
 const L=id=>LS.find(l=>l.id==id);
 const q=(id,i,start,patch,eqs)=>{try{const l=L(id),x=l&&l.qs[i];if(x&&String(x.q||"").startsWith(start)){Object.assign(x,patch);if(eqs)QD30[id+"#"+i]=[QH30(x.q),eqs]}}catch(e){}};
 const c=(id,i,start,text)=>{try{const l=L(id);if(l&&typeof l.cards[i]=="string"&&l.cards[i].startsWith(start))l.cards[i]=text}catch(e){}};

 q("cs-data-structures-2",0,"A stack starts with values [3, 8]",{q:"A stack holds 3, then 8 on top. You push 5, then pop twice. What does the second pop return?",
  why:"Push puts 5 on top: 3, 8, 5. The first pop takes 5, the second takes 8. Answering 5 stops after one pop; answering 3 takes from the bottom, like a queue."},[]);
 q("cs-data-structures-2",1,"A queue starts as [4, 7]",{q:"A queue holds 4 at the front, then 7. You enqueue 9, then dequeue twice. What does the second dequeue return?",
  why:"Enqueue adds 9 at the back: 4, 7, 9. Dequeue takes from the front: first 4, then 7. Answering 9 takes from the back, like a stack."},[]);
 q("cs-data-structures-2",2,"A circular queue has capacity C = 8, head = 6",{q:"A circular queue has 8 slots, numbered 0–7. The front item is in slot 7 (head = 7) and it holds 2 items. Which slot does the next item go in? next = (head + count) mod 8",
  why:"(7 + 2) mod 8 = 9 mod 8 = 1: the queue wraps past slot 7 back to the start. Answering 9 forgets the wrap; there is no slot 9."},["tail = (head + count) mod C","i = h mod m"]);
 q("cs-data-structures-2",3,"A parser reads an opening parenthesis",{q:"You check the brackets in “( [ ] )”. Each closing bracket must match the most recent opener that is still unmatched. Which structure hands you that opener?",
  ans:"A stack",wrong:["A queue","A counter of how many openers you’ve seen","A list of which opener types appeared"],
  why:"A stack returns the newest item first, which is exactly the most recent unmatched opener. A queue returns the oldest one; a counter or a list of types loses the order."});
 c("cs-data-structures-2",1,"A queue removes the earliest remaining item first.","A queue removes the item that has waited longest. Enqueue adds at the back; dequeue removes and returns the front. Use a queue when work should be handled first come, first served, like print jobs or messages waiting to send.");

 c("cs-data-structures-3",2,"Growing a table requires redistributing","Growing a table means moving every entry, because its bucket index (h mod m) changes with m. One resize costs O(n). Doubling the capacity each time keeps resizes rare, so the cost is amortized O(1) per insertion. Amortized means averaged over a long run: most insertions are cheap, the occasional resize is expensive, and the average per insertion stays constant.");
 q("cs-data-structures-4",0,"A service stores n distinct numeric keys.",{hint:"List what each cycle needs: insert a key, delete one specific key, and report the keys between two values in order. Which structure keeps keys sorted and still updates in O(log n)?"});
 q("cs-data-structures-4",3,"An online system processes n values",{q:"You keep the k largest of n values in a min-heap of size k. Each new value costs at most O(log k). What is the total for all n values?",
  why:"n values × O(log k) each = O(n log k). O(n log n) assumes all n values are stored; O(nk) assumes each update scans the whole heap; O(log k) is the cost of one value, not all n."});

 c("ctrl-exam-1",2,"Closing the loop gives the characteristic equation","Closing the loop gives s³ + 6s² + 5s + K = 0; its roots decide whether the response dies out. The Routh table: row s³: 1, 5. Row s²: 6, K. Row s¹: (6 × 5 − K)/6. Row s⁰: K. Read down the first column: 1, 6, (30 − K)/6, K. If every entry is positive, the loop is stable, so 0 < K < 30.");
 c("ctrl-exam-1",3,"Why it happens: without special zero entries","How to read it: go down the first column and count sign changes. Each change from + to − or − to + is one pole in the right half-plane, an unstable mode that grows. No changes (all positive) means stable. A zero in the column needs a special step, so don’t call that stable.");
 q("ctrl-exam-1",3,"A unity-feedback loop has characteristic polynomial s³+8s²+12s+120",{q:"A loop’s characteristic polynomial is s³ + 8s² + 12s + 120. Its Routh first column is 1, 8, −3, 120. Which verdict is correct?",
  ans:"Unstable: the signs change twice, so two poles are unstable",wrong:["Stable: every polynomial coefficient is positive","Stable: only one entry is negative","Marginal: a negative entry means the loop sits on the edge"],
  why:"Signs +, +, −, + change twice (8 to −3, then −3 to 120): two right-half-plane poles. Positive coefficients are necessary but not enough. One negative entry still causes two sign changes. Marginal stability shows up as a zero row, not a negative entry."});
 q("ctrl-exam-1",4,"Order a Routh audit",{q:"Order the steps of a Routh check for s³ + as² + bs + c.",items:["Write the rows [1, b] and [a, c]","Compute the s¹ entry, (ab − c)/a","Read down the first column: 1, a, (ab − c)/a, c","Call it stable only if every entry is positive"],
  why:"The two coefficient rows come first, because the s¹ entry is built from them. Then read the whole column, and only then judge: all positive means stable."});
 q("ctrl-exam-1",5,"“At the gain limit I get (s+8)(s²+12)",{ans:"At that gain the output oscillates forever instead of settling",wrong:["The output grows without bound in one direction","The output settles with no overshoot","The steady-state error is zero, so it’s fine"],
  why:"s² + 12 = 0 gives s = ±j3.46: a pure oscillation at 3.46 rad/s that never dies out (the −8 root does die out). Growth in one direction needs a positive real root; settling needs every root in the left half-plane; a zero error can’t help if the output never settles."});

 c("cs1",1,"Binary search on sorted data is O(log n).","Binary search on sorted data is O(log n): each step halves what’s left. A scan, checking every item once from start to end, is O(n). A loop inside a loop is O(n²): for each of the n items, the inner loop goes through all n again, like comparing every item with every other.");
}
try{const _bu76=build;build=function(){const r=_bu76.apply(this,arguments);try{fix76()}catch(e){}return r}}catch(e){}

try{[
 {b:"b76",k:"st76",t:"Stacks and queues plainer",c:"Same answers (8, 7, 1, A stack), shorter wording.",go:["q","cs-data-structures-2",0]},
 {b:"b76",k:"rt76",t:"Routh table on the card",c:"Card 3 shows rows s³ … s⁰; question 4 gives the first column.",go:["q","ctrl-exam-1",3]},
 {b:"b76",k:"am76",t:"Amortized defined",c:"Growth card defines amortized.",go:["q","cs-data-structures-3",3]}
].reverse().forEach(e=>TF48.unshift(e))}catch(e){}

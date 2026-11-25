/* Mock window.FBSDK for local tests (served in place of fbsdk.js by tools/serve.py). In-page store: window.MOCKSTORE. */
(function(){const store={};const U={uid:"mockuid123",isAnonymous:true,providerData:[]};const A={currentUser:null,authStateReady:async()=>{}};
window.FBSDK={initializeApp:()=>({}),getAuth:()=>A,signInAnonymously:async()=>{A.currentUser=U;return{user:U}},onAuthStateChanged:()=>()=>{},
setPersistence:async()=>{},browserLocalPersistence:{},indexedDBLocalPersistence:{},getFirestore:()=>({}),
doc:(fs,...p)=>p.join("/"),getDoc:async r=>({exists:()=>r in store,data:()=>store[r]}),setDoc:async(r,o)=>{store[r]=o},deleteDoc:async r=>{delete store[r]},
onSnapshot:(r,cb)=>{setTimeout(()=>cb({exists:()=>r in store,data:()=>store[r]}),0);return()=>{}}};window.MOCKSTORE=store})();

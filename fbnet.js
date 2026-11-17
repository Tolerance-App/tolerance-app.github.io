/* ===== Firebase backend for Tolerance (2026-11-16) =====
   The app already talks to a tiny storage interface: claude.use("db"/"user"),
   db.doc(p).get()/.set(), db.collection("people").onSnapshot(), user.id()/can()/profiles().
   This file provides exactly that interface, backed by Firebase, and defines it BEFORE the
   app boots. Nothing else in the app has to change.

   Why this fixes the resets: every visitor gets an anonymous Firebase account on first open,
   so everyone has a cloud copy of their progress - not just people with special access.
   Redeploying the site never touches it. */
(function () {
  "use strict";
  var CFG = {
    apiKey: "AIzaSyAWUOQLmKE26fCbYYNNuc1VffDaWgqrpCE",
    authDomain: "tolerance-fe244.firebaseapp.com",
    projectId: "tolerance-fe244",
    storageBucket: "tolerance-fe244.firebasestorage.app",
    messagingSenderId: "1009554687061",
    appId: "1:1009554687061:web:d2caeebf8155b19a0540dc"
  };
  var SDK = "https://www.gstatic.com/firebasejs/13.4.0/";

  var FB = { ready: null, uid: null, err: "", db: null, auth: null, fs: null };
  window.TOLFB = FB;

  function friendIds() {
    try { return (st.friends || []).filter(function (x) { return typeof x == "string" }).slice(0, 200) }
    catch (e) { return [] }
  }

  async function boot() {
    /* fbsdk.js (bundled alongside this file) defines window.FBSDK. Falling back to the
       CDN only helps where that file is missing; some sandboxes block the CDN. */
    var S = window.FBSDK;
    if (!S) {
      var a = await import(SDK + "firebase-app.js"), b = await import(SDK + "firebase-auth.js"), c = await import(SDK + "firebase-firestore.js");
      S = Object.assign({}, a, b, c);
    }
    var appMod = S, authMod = S, fsMod = S;
    var app = appMod.initializeApp(CFG);
    var auth = authMod.getAuth(app);
    var fs = fsMod.getFirestore(app);
    FB.auth = authMod; FB.fs = fsMod;

    /* Wait until Firebase has finished restoring any account already saved on this device.
       Only if there is none do we create one. (Racing this would create a second, empty
       account and strand the first one's progress.) Default persistence is IndexedDB,
       falling back to localStorage: it survives reloads and every new version of the site. */
    try { if (auth.authStateReady) await auth.authStateReady() } catch (e) {}
    var user = auth.currentUser;
    if (!user) user = (await authMod.signInAnonymously(auth)).user;
    FB.uid = user.uid;

    var docRef = function (p) { return fsMod.doc.apply(null, [fs].concat(String(p).split("/"))) };

    var db = {
      doc: function (p) {
        var r = docRef(p);
        return {
          get: async function () {
            var s = await fsMod.getDoc(r);
            return { exists: s.exists(), data: function () { return s.data() } };
          },
          set: function (o) { return fsMod.setDoc(r, o) },
          delete: function () { return fsMod.deleteDoc(r) }
        };
      },
      collection: function (p) {
        return {
          /* The app asks for the whole "people" collection and filters to friends itself.
             Here we watch only the friends' own documents plus this device's, so nobody
             reads strangers' rows and the read count stays tiny. */
          onSnapshot: function (cb, errCb) {
            if (p !== "people") { if (errCb) errCb({ code: "unsupported" }); return function () {} }
            var offs = [], cache = {}, key = "";
            var emit = function () {
              cb({ docs: Object.keys(cache).map(function (id) {
                return { id: id, data: function () { return cache[id] } };
              }) });
            };
            var wire = function () {
              var ids = friendIds().concat([FB.uid]).filter(function (v, i, a) { return a.indexOf(v) === i });
              var k = ids.join(",");
              if (k === key) return;
              key = k;
              offs.forEach(function (f) { try { f() } catch (e) {} });
              offs = []; cache = {};
              ids.forEach(function (id) {
                try {
                  offs.push(fsMod.onSnapshot(docRef("people/" + id), function (s) {
                    if (s.exists()) cache[id] = s.data(); else delete cache[id];
                    emit();
                  }, function (e) { if (errCb) errCb({ code: (e && e.code) || "error" }) }));
                } catch (e) {}
              });
              emit();
            };
            wire();
            var t = setInterval(wire, 4000);
            document.addEventListener("visibilitychange", function () { if (!document.hidden) wire() });
            return function () { clearInterval(t); offs.forEach(function (f) { try { f() } catch (e) {} }) };
          }
        };
      }
    };

    var userApi = {
      id: async function () { return FB.uid },
      me: async function () { return { id: FB.uid } },
      can: async function () { return true },
      isOwner: function () { return false },
      canEdit: function () { return false },
      /* No Google profiles here on purpose: friends show the name they chose in the app. */
      profiles: async function () { return {} }
    };

    FB.db = db;
    return { db: db, user: userApi };
  }

  /* The app asks for storage through use("db") / use("user").
     On the standalone site nothing else defines window.claude, so we provide it.
     Inside a claude.ai artifact the platform owns window.claude and would replace this,
     so the app is pointed at TOLFB.use instead. Both call the same code. */
  FB.use = function (name) {
    if (!FB.ready) FB.ready = boot().catch(function (e) {
      FB.err = (e && (e.code || e.message)) || "error";
      console.warn("[tolerance] cloud save unavailable:", FB.err);
      return null;
    });
    return FB.ready.then(function (r) { return r ? r[name] || null : null });
  };
  try {
    if (!window.claude || typeof window.claude.use != "function") {
      window.claude = window.claude || {};
      window.claude.use = FB.use;
    }
  } catch (e) {}
})();

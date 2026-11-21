/* Tolerance offline cache (b75).
   Network first for the app's own files, so online users always get the newest build exactly as before; the
   cache is only a fallback when the network fails or a page load stalls past 6 s with a cached copy ready.
   Font and library CDNs (KaTeX, mathjs, Google Fonts) are cached on first use. Firebase/Google API traffic and
   version.json are never touched. To retire this: deploy a sw.js that calls self.registration.unregister(). */
const C = "tol-v1", LIB = "tol-lib-v1";
const CDN = /^https:\/\/(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    try {
      const c = await caches.open(C), r = await fetch("./", { cache: "no-store" });
      if (r.ok) {
        const html = await r.clone().text();
        await c.put("./", r);
        const srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !/^https?:/.test(s));
        await Promise.all(srcs.concat(["manifest.webmanifest", "icon-180.png", "icon-192.png"]).map(s =>
          fetch(s, { cache: "no-store" }).then(x => x.ok && c.put(s, x)).catch(() => {})));
      }
    } catch (err) {}
    self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== C && k !== LIB) await caches.delete(k);
    await self.clients.claim();
  })());
});

function timeout(ms) { return new Promise(res => setTimeout(() => res(null), ms)) }

self.addEventListener("fetch", e => {
  const q = e.request;
  if (q.method !== "GET") return;
  const u = new URL(q.url);
  if (CDN.test(q.url)) {
    e.respondWith(caches.open(LIB).then(async c => {
      const hit = await c.match(q);
      if (hit) return hit;
      const r = await fetch(q);
      if (r.ok || r.type === "opaque") c.put(q, r.clone());
      return r;
    }));
    return;
  }
  if (u.origin !== location.origin || /version\.json$/.test(u.pathname)) return;
  const nav = q.mode === "navigate";
  /* every navigation (./, ./?b=b75, #import=…) shares one cached page */
  const base = u.pathname.replace(/^.*\//, ""), key = (base === "" || base === "index.html") ? "./" : base;
  e.respondWith((async () => {
    const c = await caches.open(C);
    const net = fetch(q).then(r => { if (r.ok && r.type === "basic") c.put(key, r.clone()); return r });
    net.catch(() => {});
    const cached = await c.match(key);
    if (!cached) return net;
    try {
      const r = await Promise.race([net, timeout(nav ? 6000 : 8000)]);
      if (r) return r;
    } catch (err) {}
    return cached;
  })());
});

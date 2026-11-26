# Local test server (dev tool). Serves the repo and swaps fbsdk.js for tools/mockfb.js, so nothing reaches Firebase.
# Usage: python tools/serve.py [port]   (default 8766) -> http://127.0.0.1:8766/
#        python tools/serve.py 8766 0.0.0.0   -> also reachable from a phone on the same Wi-Fi (http://<PC IP>:8766/)
# Env TOL_EXTRA="codex/cards/calc1.js,other.js" adds those scripts to index.html right before the boot line, so a staged
# file (e.g. Codex output, not yet a vNN.js build) is tested exactly as if it were the newest layer.
import http.server, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
MOCK = os.path.join(HERE, "mockfb.js")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def end_headers(s):
        s.send_header("Cache-Control", "no-store"); super().end_headers()
    def do_GET(s):
        p = s.path.split("?")[0]
        if p == "/fbsdk.js":
            b = open(MOCK, "rb").read(); s.send_response(200); s.send_header("Content-Type", "text/javascript")
            s.send_header("Content-Length", str(len(b))); s.end_headers(); s.wfile.write(b); return
        if p == "/sw.js":  # no service worker locally: it would cache stale builds between edits
            b = b"self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',()=>self.registration.unregister());"
            s.send_response(200); s.send_header("Content-Type", "text/javascript"); s.send_header("Content-Length", str(len(b)))
            s.end_headers(); s.wfile.write(b); return
        if p in ("/", "/index.html") and os.environ.get("TOL_EXTRA"):
            tags = "".join(f'<script src="{x.strip().replace(chr(92), "/")}"></script>\n' for x in os.environ["TOL_EXTRA"].split(",") if x.strip())
            h = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
            boot = "<script>applyTheme();build();"
            assert boot in h, "boot line not found in index.html"
            b = h.replace(boot, tags + boot, 1).encode("utf-8")
            s.send_response(200); s.send_header("Content-Type", "text/html; charset=utf-8"); s.send_header("Content-Length", str(len(b)))
            s.end_headers(); s.wfile.write(b); return
        return super().do_GET()
    def log_message(s, *a): pass
HOST = sys.argv[2] if len(sys.argv) > 2 else "127.0.0.1"
http.server.ThreadingHTTPServer((HOST, PORT), H).serve_forever()

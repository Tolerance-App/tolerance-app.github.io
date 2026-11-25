# Local test server (dev tool). Serves the repo and swaps fbsdk.js for tools/mockfb.js, so nothing reaches Firebase.
# Usage: python tools/serve.py [port]   (default 8766) -> http://127.0.0.1:8766/
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
        return super().do_GET()
    def log_message(s, *a): pass
http.server.ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()

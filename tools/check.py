# One-command local check (dev tool). Starts tools/serve.py (mock Firebase), opens the app at phone width in headless
# Chrome, loads the dev checkers and runs one expression, then prints the result as JSON.
#   python tools/check.py lessons mech-beams-1 mech-beams-2   -> lessonRun([...])
#   python tools/check.py course Mechanical                    -> lessonRun(null,{sub:"Mechanical"})
#   python tools/check.py all                                  -> every lesson, issues grouped by kind
#   python tools/check.py demos bear50 fo51                    -> demoCheck([...])   (375 px)
#   python tools/check.py demolessons ctrl-feedback-2          -> demoCheck(null,{lessons:[...]})
#   python tools/check.py eval "LS.length"                     -> any expression
#   python tools/check.py shot mech-beams-1 out.png            -> screenshot of a lesson's first card (2x)
# Exit code 1 if anything is reported, so it works as a pass/fail gate. Needs: pip install playwright (already here).
import json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
PORT = 8790
mode, args = sys.argv[1], sys.argv[2:]
srv = subprocess.Popen([sys.executable, os.path.join(HERE, "serve.py"), str(PORT)])
time.sleep(0.8)
code = 0
try:
    with sync_playwright() as p:
        try: b = p.chromium.launch()
        except Exception: b = p.chromium.launch(channel="chrome")
        w = 375 if mode.startswith("demo") else 390
        pg = b.new_page(viewport={"width": w, "height": 844}, device_scale_factor=2 if mode == "shot" else 1)
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"http://127.0.0.1:{PORT}/?b=test", wait_until="load")
        pg.wait_for_function("typeof LS!=='undefined'&&LS.length>0", timeout=30000)
        pg.wait_for_timeout(2500)  # boot-time screens (welcome, resume, sync) can clear SS in the first seconds
        pg.evaluate("()=>{st.subj=st.subj&&st.subj.length?st.subj:[...new Set(LS.map(l=>l.sub))];st.placed=1;st.welcomed=1;save()}")
        for f in ("lesson-run.js", "demo-check.js"):
            pg.add_script_tag(path=os.path.join(HERE, f))
        j = json.dumps
        expr = {
            "lessons": lambda: f"lessonRun({j(args)})",
            "course": lambda: f"lessonRun(null,{{sub:{j(args[0])}}})",
            "demos": lambda: f"demoCheck({j(args)})",
            "demolessons": lambda: f"demoCheck(null,{{lessons:{j(args)}}})",
            "eval": lambda: args[0],
            "all": lambda: r"lessonRun().then(r=>{const c={};r.forEach(x=>x.issues.forEach(i=>{const k=i.replace(/^q\d+: /,'').replace(/\d+/g,'N').slice(0,70);(c[k]=c[k]||[]).push(x.id)}));return {summary:r.summary,kinds:Object.fromEntries(Object.entries(c).map(([k,v])=>[k,{n:v.length,ids:v.slice(0,8)}])),issues:r.length?1:0}})",
        }
        if mode == "shot":
            pg.evaluate(f"startId({j(args[0])})"); pg.wait_for_timeout(500)
            pg.screenshot(path=args[1] if len(args) > 1 else "shot.png"); print("saved", args[1] if len(args) > 1 else "shot.png")
        else:
            r = pg.evaluate(f"async()=>{{const r=await ({expr[mode]()});return Array.isArray(r)&&r.summary?{{summary:r.summary,issues:[...r]}}:r}}")
            print(json.dumps(r, indent=1, ensure_ascii=False)[:20000])
            if isinstance(r, dict) and r.get("issues"): code = 1
            if isinstance(r, list) and r: code = 1
        if errs: print("page errors:", errs[:10]); code = 1
        b.close()
finally:
    srv.terminate()
sys.exit(code)

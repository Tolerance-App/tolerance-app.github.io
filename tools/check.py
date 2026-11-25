# One-command local check (dev tool). Starts tools/serve.py (mock Firebase), opens the app at phone width in headless
# Chrome, loads the dev checkers and runs one expression, then prints the result as JSON.
#   python tools/check.py lessons mech-beams-1 mech-beams-2   -> lessonRun([...])
#   python tools/check.py course Mechanical                    -> lessonRun(null,{sub:"Mechanical"})
#   python tools/check.py all                                  -> every lesson, issues grouped by kind
#   python tools/check.py demos bear50 fo51                    -> demoCheck([...])   (375 px)
#   python tools/check.py demolessons ctrl-feedback-2          -> demoCheck(null,{lessons:[...]})
#   python tools/check.py eval "LS.length"                     -> any expression
#   python tools/check.py shot mech-beams-1 out.png            -> screenshot of a lesson's first card (2x)
#   python tools/check.py cards aero2 | cards course Aerospace | cards all   -> cardCheck (reveal cards, 375 x 812)
#   python tools/check.py cardshot aero2 1 3 out.png [light]   -> reveal card 1 after 3 taps (2x, 375 x 812);
#        taps: a number, "end" (finished), or "g0"/"g1"… (tap to the Guess and answer that option)
# Exit code 1 if anything is reported, so it works as a pass/fail gate. Needs: pip install playwright (already here).
import json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def _free_port():  # a free port each run, so checks from parallel chats don't collide
    import socket
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p
PORT = _free_port()
mode, args = sys.argv[1], sys.argv[2:]
srv = subprocess.Popen([sys.executable, os.path.join(HERE, "serve.py"), str(PORT)])
time.sleep(0.8)
code = 0
try:
    with sync_playwright() as p:
        try: b = p.chromium.launch()
        except Exception: b = p.chromium.launch(channel="chrome")
        cardm = mode in ("cards", "cardshot")
        w = 375 if mode.startswith("demo") or cardm else 390
        pg = b.new_page(viewport={"width": w, "height": 812 if cardm else 844}, device_scale_factor=2 if mode in ("shot", "cardshot") else 1)
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"http://127.0.0.1:{PORT}/?b=test", wait_until="load")
        pg.wait_for_function("typeof LS!=='undefined'&&LS.length>0", timeout=30000)
        pg.wait_for_timeout(2500)  # boot-time screens (welcome, resume, sync) can clear SS in the first seconds
        pg.evaluate("()=>{st.subj=st.subj&&st.subj.length?st.subj:[...new Set(LS.map(l=>l.sub))];st.placed=1;st.welcomed=1;save()}")
        for f in ("lesson-run.js", "demo-check.js", "card-check.js"):
            pg.add_script_tag(path=os.path.join(HERE, f))
        j = json.dumps
        expr = {
            "lessons": lambda: f"lessonRun({j(args)})",
            "course": lambda: f"lessonRun(null,{{sub:{j(args[0])}}})",
            "demos": lambda: f"demoCheck({j(args)})",
            "demolessons": lambda: f"demoCheck(null,{{lessons:{j(args)}}})",
            "eval": lambda: args[0],
            "cards": lambda: "cardCheck(null)" if args[:1] == ["all"] else (f"cardCheck(null,{{sub:{j(' '.join(args[1:]))}}})" if args[:1] == ["course"] else f"cardCheck({j(args)})"),
            "all": lambda: r"lessonRun().then(r=>{const c={};r.forEach(x=>x.issues.forEach(i=>{const k=i.replace(/^q\d+: /,'').replace(/\d+/g,'N').slice(0,70);(c[k]=c[k]||[]).push(x.id)}));return {summary:r.summary,kinds:Object.fromEntries(Object.entries(c).map(([k,v])=>[k,{n:v.length,ids:v.slice(0,8)}])),issues:r.length?1:0}})",
        }
        if mode == "cardshot":
            lid, ci, taps, out = args[0], int(args[1]), args[2], args[3]
            if len(args) > 4 and args[4] == "light": pg.evaluate("()=>{document.documentElement.dataset.theme='light'}")
            pg.evaluate(f"startId({j(lid)})"); pg.wait_for_timeout(300)
            pg.evaluate(f"()=>{{SS.ci={ci};cardScreen()}}"); pg.wait_for_timeout(300)
            pg.evaluate("t=>{const R=RV98;if(!R)throw new Error('not a reveal card');"
                        "if(t=='end'){for(let i=0;i<40&&!fin98(R);i++){if(blocked98(R))pick98(R.sp.g.o.findIndex(o=>o[1]));else adv98()}return}"
                        "if(/^g[0-9]$/.test(t)){for(let i=0;i<40&&!blocked98(R);i++)adv98();pick98(+t.slice(1));return}"
                        "for(let i=0;i<+t;i++)adv98()}", taps)
            pg.wait_for_timeout(600); pg.screenshot(path=out); print("saved", out)
        elif mode == "shot":
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

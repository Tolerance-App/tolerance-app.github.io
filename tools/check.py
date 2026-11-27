# One-command local check (dev tool). Starts tools/serve.py (mock Firebase), opens the app at phone width in headless
# Chrome, loads the dev checkers and runs one expression, then prints the result as JSON.
#   python tools/check.py lessons mech-beams-1 mech-beams-2   -> lessonRun([...])
#   python tools/check.py course Mechanical                    -> lessonRun(null,{sub:"Mechanical"})
#   python tools/check.py all                                  -> every lesson, issues grouped by kind
#   python tools/check.py demos bear50 fo51                    -> demoCheck([...])   (375 px)
#   python tools/check.py demolessons ctrl-feedback-2          -> demoCheck(null,{lessons:[...]})
#   python tools/check.py eval "LS.length"                     -> any expression
#   python tools/check.py export                             -> rewrite content-export/ from the built app (run after each build)
#   python tools/check.py shot mech1 out.png [1x]                -> screenshot of a lesson's first card (2x; 1x = cheap)
#   python tools/check.py demoshot mech1 out.png [1x] [0=3 …]    -> screenshot of a lesson's demo card (optional: slider index=value)
#   python tools/check.py look mech1 [cardIndex]              -> text view: visible text + overflow/clipping (no image)
#   python tools/check.py cards aero2 | cards course Aerospace | cards all   -> cardCheck (reveal cards, 375 x 812)
#   python tools/check.py cardshot aero2 1 3 out.png [light]   -> reveal card 1 after 3 taps (2x, 375 x 812);
#        taps: a number, "end" (finished), or "g0"/"g1"… (tap to the Guess and answer that option)
#   Any mode: --extra codex/cards/calc1.js[,more.js] loads staged scripts as the newest layer (before build()).
# Exit code 1 if anything is reported, so it works as a pass/fail gate. Needs: pip install playwright (already here).
import json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def _free_port():  # a free port each run, so checks from parallel chats don't collide
    import socket
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p
PORT = _free_port()
mode, args = sys.argv[1], sys.argv[2:]
lo = "1x" in args  # 1x screenshot (~440 tokens vs ~1,500 at 2x): for shots only Claude looks at
args = [a for a in args if a != "1x"]
env = dict(os.environ)
if "--extra" in args:
    i = args.index("--extra"); env["TOL_EXTRA"] = args[i + 1]; del args[i:i + 2]
srv = subprocess.Popen([sys.executable, os.path.join(HERE, "serve.py"), str(PORT)], env=env)
time.sleep(0.8)
code = 0
try:
    with sync_playwright() as p:
        try: b = p.chromium.launch()
        except Exception: b = p.chromium.launch(channel="chrome")
        cardm = mode in ("cards", "cardshot")
        w = 375 if mode.startswith("demo") or cardm else 390
        pg = b.new_page(viewport={"width": w, "height": 812 if cardm else 844}, device_scale_factor=2 if mode in ("shot", "cardshot", "demoshot") and not lo else 1)
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
        elif mode == "look":  # text view of a card: visible text, overflow, offscreen/clipped elements (no image)
            pg.evaluate(f"startId({j(args[0])})"); pg.wait_for_timeout(300)
            if len(args) > 1: pg.evaluate(f"()=>{{SS.ci={int(args[1])};cardScreen()}}"); pg.wait_for_timeout(300)
            r = pg.evaluate(r"""()=>{const W=innerWidth,H=innerHeight,d=document.scrollingElement,bad=[];
              const nm=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className=='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'');
              document.querySelectorAll('body *').forEach(e=>{const s=getComputedStyle(e);if(s.display=='none'||s.visibility=='hidden')return;
                const b=e.getBoundingClientRect();if(!b.width||!b.height)return;
                if(b.right>W+1||b.left<-1)bad.push(nm(e)+' x '+Math.round(b.left)+'..'+Math.round(b.right));
                if(e.scrollWidth>e.clientWidth+1&&s.overflowX!='visible'&&!/auto|scroll/.test(s.overflowX))bad.push(nm(e)+' clips text');});
              return {view:W+'x'+H,pageH:d.scrollHeight,hScroll:d.scrollWidth>W,text:document.body.innerText.replace(/\n{2,}/g,'\n').slice(0,2500),problems:[...new Set(bad)].slice(0,20)}}""")
            print(json.dumps(r, indent=1, ensure_ascii=False))
            if r["hScroll"] or r["problems"]: code = 1
        elif mode == "export":  # fresh content-export/ from the built app (LS after every layer, reveal cards included)
            r = pg.evaluate(r"""()=>{const ls=LS.map(l=>JSON.parse(JSON.stringify(l)));
              const subs=[...new Set(LS.map(l=>l.sub))];
              return {meta:{app:"Tolerance",build:FB.ver,exported:new Date().toISOString(),lessons:ls.length,
                questions:ls.reduce((a,l)=>a+(l.qs||[]).length,0),cards:ls.reduce((a,l)=>a+(l.cards||[]).length,0),
                revealCards:ls.reduce((a,l)=>a+(l.rc?Object.keys(l.rc).length:0),0),courses:subs,
                note:"Lessons as the app sees them after build() (LS): every later layer's patches applied. lv is 0-5 here (content files use 1-6). rc = reveal cards keyed by card index (format in v98.js). Question keys are '<id>#<index>' and permanent."},lessons:ls}}""")
            d = os.path.join(HERE, "..", "content-export")
            with open(os.path.join(d, "tolerance-lessons.json"), "w", encoding="utf-8", newline="\n") as f: json.dump(r, f, ensure_ascii=False)
            with open(os.path.join(d, "tolerance-lessons.jsonl"), "w", encoding="utf-8", newline="\n") as f:
                for l in r["lessons"]: f.write(json.dumps(l, ensure_ascii=False) + "\n")
            print(json.dumps({k: v for k, v in r["meta"].items() if k != "courses"}))
        elif mode == "demoshot":  # step a lesson's cards until its demo shows, then screenshot it
            pg.evaluate(f"startId({j(args[0])})"); pg.wait_for_timeout(300)
            pg.evaluate("()=>{for(let i=0;i<30&&!document.querySelector('.lesson .demo')&&!SS.qs;i++)nextCard()}")
            pg.wait_for_timeout(600)
            for kv in args[2:]:  # optional slider settings: nth=value, e.g. 0=3 sets the first slider to 3
                k, v = kv.split("=")
                pg.evaluate(f"()=>{{const i=document.querySelectorAll('.lesson .demo input[type=range]')[{int(k)}];if(i){{i.value={j(v)};i.dispatchEvent(new Event('input',{{bubbles:true}}))}}}}")
                pg.wait_for_timeout(200)
            pg.evaluate("()=>{const d=document.querySelector('.lesson .demo');if(d)d.scrollIntoView({block:'start'})}")
            pg.wait_for_timeout(300); pg.screenshot(path=args[1]); print("saved", args[1])
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

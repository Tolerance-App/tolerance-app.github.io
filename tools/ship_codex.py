# Ship Codex branches as one build (dev tool, run by Claude in a fresh worktree of origin/main).
#   python tools/ship_codex.py calc2 calc3          -> cards from origin/codex-cards-<code>
#   python tools/ship_codex.py fix:mech              -> fixes from origin/codex-audit-<code> (codex/fixes/<code>.js)
# Builds vNN.js (NN = highest + 1) from the staged files, adds the script tag, version.json, NEWS, TF48, tracker rows,
# CLAUDE.md "Current latest", then runs the checks and regenerates codemap + content-export. Doesn't commit.
# Prints each branch's report path and the check summaries. Exit 1 if any check reports issues.
import datetime, glob, json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
def sh(*a): return subprocess.run(a, capture_output=True, text=True, encoding="utf-8")
def write(p, s): open(p, "w", encoding="utf-8", newline="\n").write(s)
def read(p): return open(p, encoding="utf-8").read()
items = sys.argv[1:]
if not items: sys.exit(__doc__ or "usage: ship_codex.py <code> [fix:<code>] …")
sh("git", "fetch", "-q", "origin")
nn = max(int(re.findall(r"\d+", os.path.basename(f))[0]) for f in glob.glob("v[0-9]*.js")) + 1
today = datetime.date.today().isoformat()
names = json.loads(sh(sys.executable, "tools/check.py", "eval",
    "Object.fromEntries([...new Set(LS.map(l=>l.sub))].map(s=>[s,(LS.find(l=>l.sub==s&&l.subName&&l.subName!=s)||{}).subName||s]))").stdout)
parts, cards, fixes, reports = [], [], [], []
for it in items:
    kind, code = ("fix", it[4:]) if it.startswith("fix:") else ("cards", it)
    br = f"origin/codex-{'audit' if kind == 'fix' else 'cards'}-{code}"
    path = f"codex/{'fixes' if kind == 'fix' else 'cards'}/{code}.js"
    r = sh("git", "show", f"{br}:{path}")
    if r.returncode: sys.exit(f"missing {br}:{path}")
    if kind == "cards":
        rf = sh("git", "show", f"{br}:codex/fixes/{code}.js")
        if rf.returncode == 0: r.stdout += "\n/* question fixes from review */\n" + rf.stdout; fixes.append(code)
    parts.append(f"\n/* ======== {kind} · {code} (from {br}, {sh('git','rev-parse','--short',br).stdout.strip()}) ======== */\n" + r.stdout.strip() + "\n")
    (fixes if kind == "fix" else cards).append(code)
    reports.append(f"{br}:{path[:-3]}.md")
label = ", ".join([names.get(c, c) for c in cards] + [f"fixes for {names.get(c, c)}" for c in fixes])
head = (f"/* ===== v{nn} ({today}): Codex content: {label} =====\n"
        f"   Staged by Codex (codex/README.md), reviewed by a second Codex pass, shipped by Claude with tools/ship_codex.py.\n"
        f"   Cards only add rc98 entries; fixes edit questions in place (ids and question order unchanged).\n"
        f"   Reports: {'; '.join(reports)} */\ntry{{FB.ver=\"b{nn}\"}}catch(e){{}}\n")
news = []
if cards: news.append(f"{' and '.join(names.get(c, c) for c in cards)} cards now build up one piece at a time as you tap, with an occasional quick guess or hidden word.")
if fixes: news.append(f"Fixed answers and wording in {', '.join(names.get(c, c) for c in fixes)}.")
first = sh(sys.executable, "tools/check.py", "eval", f"LS.find(l=>l.sub=={json.dumps((cards or fixes)[0])}).id").stdout.strip().strip('"')
foot = (f"\ntry{{NEWS.unshift({{d:{json.dumps(today)},t:{json.dumps(news, ensure_ascii=False)}}})}}catch(e){{}}\n"
        f"try{{TF48.unshift({{b:\"b{nn}\",k:\"cx{nn}\",t:{json.dumps('Codex: ' + label, ensure_ascii=False)},"
        f"c:{json.dumps(' '.join(news), ensure_ascii=False)},go:[\"lesson\",{json.dumps(first)}]}})}}catch(e){{}}\n")
write(f"v{nn}.js", head + "".join(parts) + foot)
h = read("index.html"); last = f'<script src="v{nn-1}.js"></script>\n'
assert last in h, "previous script tag not found"
write("index.html", h.replace(last, last + f'<script src="v{nn}.js"></script>\n', 1))
write("version.json", json.dumps({"v": f"b{nn}"}))
c = read("CLAUDE.md"); write("CLAUDE.md", re.sub(r"Current latest: v\d+\.", f"Current latest: v{nn}.", c))
# tracker rows + total
t = read("docs/CARD_CONVERSION.md")
counts = json.loads(sh(sys.executable, "tools/check.py", "eval",
    "(()=>{const m={};LS.forEach(l=>{const r=m[l.sub]=m[l.sub]||[0,0];r[0]+=l.cards.length;r[1]+=l.rc?Object.keys(l.rc).length:0});return m})()").stdout)
for code in cards:
    t = re.sub(rf"^(\| [^|]+ \| {code} \| \d+ \| \d+ \| )\d+ \| [^|]+ \| ([^|]*)\|$",
               lambda m: f"{m.group(1)}{counts[code][1]} | {'done (Codex)' if counts[code][0]==counts[code][1] else 'partial (Codex)'} | {(m.group(2).strip()+', ' if m.group(2).strip() else '')}b{nn} |", t, flags=re.M)
tot = sum(v[1] for v in counts.values())
t = re.sub(r"(\| \*\*Total\*\* \| \| \*\*\d+\*\* \| \*\*[\d,]+\*\* \| \*\*)[\d,]+(\*\* \|)", rf"\g<1>{tot:,}\g<2>", t)
write("docs/CARD_CONVERSION.md", t)
# checks
bad = 0
def run(*a):
    global bad
    r = sh(sys.executable, "tools/check.py", *a); out = r.stdout.strip()
    m = re.search(r'"summary": "([^"]+)"', out); print(" ".join(a), "->", m.group(1) if m else out[:300])
    if r.returncode: bad = 1; print(out[:3000])
v = sh(sys.executable, "tools/check.py", "eval", "[FB.ver, FIX32.length]").stdout.split()
print("FB.ver:", " ".join(v))
for code in dict.fromkeys(cards + fixes):
    run("cards", "course", code); run("course", code)
    ids = json.loads(sh(sys.executable, "tools/check.py", "eval", f"LS.filter(l=>l.sub=={json.dumps(code)}).map(l=>l.id)").stdout)
    run("demolessons", *ids)
    miss = sh(sys.executable, "tools/check.py", "eval", f"LS.filter(l=>l.sub=={json.dumps(code)}).flatMap(l=>l.cards.map((c,i)=>l.rc&&l.rc[i]?null:l.id+'#'+i)).filter(Boolean)").stdout
    if code in cards and json.loads(miss): bad = 1; print("cards without rc:", miss[:500])
fx = sh(sys.executable, "tools/check.py", "eval", "FIX32.filter(x=>!x.startsWith('ok'))").stdout
if json.loads(fx): print("FIX32 misses (a fix didn't apply):", fx[:800]); bad = bad or bool(fixes)
sh(sys.executable, "tools/codemap.py"); print(sh(sys.executable, "tools/check.py", "export").stdout.strip()[:160])
print(f"\nv{nn}.js ready. Read the reports: " + " ".join(f"git show {r}" for r in reports))
sys.exit(bad)

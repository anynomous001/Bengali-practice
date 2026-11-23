"""Builds src/data/kitchen/content.ts from content-drafts/kitchen/content.md (the single source of truth for Kitchen Bengali).

Run from the repo root:  python3 content-drafts/build_kitchen.py
Nothing is typed by hand into the data: every Bengali word, romanization and English meaning is copied from content.md.
Two dialogue lines in content.md have no romanization or English (they repeat an earlier line); they are filled from that earlier
line, and the build prints a notice for each.
"""
import json, re, sys
from pathlib import Path

SRC = Path(__file__).parent / "kitchen" / "content.md"
OUT = Path(__file__).parent.parent / "src" / "data" / "kitchen" / "content.ts"

ITEM = re.compile(r"^(?:\*|\d+\.)\s+(?:(Shift lead|Team member):\s+)?(.+?)\s+\(([^()]*)\)\s+—\s+(.+)$")
BARE = re.compile(r"^\*\s+(Shift lead|Team member):\s+(.+)$")
BN = re.compile(r"[ঀ-৿]")

stages, goals = [], {}
listening_note = ""
listening, plain = [], {"pronunciation": [], "homework": [], "progress": [], "teacher": []}
known = {}          # Bengali text -> (roman, english), for lines that repeat an earlier one
notices = []
cur_stage = cur_sec = None
mode = None         # "stage" | "listening" | "plain:<key>" | "goals" | None

def new_sec(sid, title, kind="words"):
    return {"id": sid, "title": title, "kind": kind, "note": "", "items": []}

for raw in SRC.read_text(encoding="utf-8").split("\n"):
    line = raw.rstrip()
    if not line.strip() or line.startswith("# "):
        continue
    m = re.match(r"^## Stage (\d): (.+)$", line)
    if m:
        cur_stage = {"id": int(m.group(1)), "title": m.group(2), "goal": "", "note": "", "sections": []}
        stages.append(cur_stage); mode, cur_sec = "stage", None; continue
    if line == "## Listening practice": mode, cur_sec = "listening", None; continue
    if line == "## Pronunciation focus": mode = "plain:pronunciation"; continue
    if line.startswith("## Learning goals"): mode = "goals"; continue
    if line.startswith("## Homework ideas"): mode = "plain:homework"; continue
    if line.startswith("## Progress check"): mode = "plain:progress"; continue
    if line == "## Teacher notes": mode = "plain:teacher"; continue
    if line.startswith("## "): mode = None; continue            # the learner profile is not shown in the app

    m = re.match(r"^### (.+)$", line)
    if m and mode in ("stage", "listening"):
        title = m.group(1)
        sm = re.match(r"^(\d\.\d) (.+)$", title)
        if mode == "listening":
            lm = re.match(r"^Level (\d): (.+)$", title)
            cur_sec = new_sec(f"level-{lm.group(1)}", title)
            listening.append(cur_sec)
        elif sm:
            cur_sec = new_sec(sm.group(1), sm.group(2))
            cur_stage["sections"].append(cur_sec)
        else:  # "Scene A: Missing item"
            cur_sec = new_sec("scene-" + title[6].lower(), title, "dialogue")
            cur_stage["sections"].append(cur_sec)
        continue

    if mode == "goals":
        m = re.match(r"^Stage (\d): (.+)$", line)
        if m: goals[int(m.group(1))] = m.group(2)
        continue
    if mode and mode.startswith("plain:"):
        if line.startswith("* "): plain[mode[6:]].append(line[2:])
        continue

    if line == "Recipe card example:":
        cur_sec = new_sec("5.5-recipe", "Recipe card example", "recipe")
        cur_stage["sections"].append(cur_sec); continue

    bm = BARE.match(line)
    im = ITEM.match(line)
    if cur_sec is not None and (im or bm):
        if im:
            speaker, bn, ro, en = im.groups()
            item = {"bn": bn, "ro": ro, "en": en}
        else:
            speaker, bn = bm.groups()
            if bn not in known:
                sys.exit(f"cannot fill a line with no romanization: {bn}")
            ro, en = known[bn]
            item = {"bn": bn, "ro": ro, "en": en}
            notices.append(f"{cur_sec['id']}: '{bn}' has no romanization or English in content.md; copied from the earlier identical line")
        if speaker:
            item["who"] = speaker; cur_sec["kind"] = "dialogue"
        known.setdefault(item["bn"], (item["ro"], item["en"]))
        cur_sec["items"].append(item); continue

    # any other text under a heading is a note for that section (or stage)
    if cur_sec is not None: cur_sec["note"] = (cur_sec["note"] + " " + line).strip()
    elif mode == "listening": listening_note = (listening_note + " " + line).strip()
    elif cur_stage is not None: cur_stage["note"] = (cur_stage["note"] + " " + line).strip()

for s in stages: s["goal"] = goals.get(s["id"], "")

# --- checks
errors = []
for s in stages:
    for sec in s["sections"]:
        for it in sec["items"]:
            if not BN.search(it["bn"]): errors.append(f"{sec['id']}: no Bengali in {it}")
            if not it["ro"] or not it["en"]: errors.append(f"{sec['id']}: empty field in {it}")
if len(stages) != 5: errors.append(f"expected 5 stages, found {len(stages)}")
if len(listening) != 3: errors.append(f"expected 3 listening levels, found {len(listening)}")
if len(plain["progress"]) != 5: errors.append("expected 5 progress checks")
if errors: sys.exit("\n".join(errors))

data = {"stages": stages, "listening": listening, "listeningNote": listening_note, **plain}
body = json.dumps(data, ensure_ascii=False, indent=1)
OUT.write_text(
    "// Kitchen Bengali content. Generated by content-drafts/build_kitchen.py from content-drafts/kitchen/content.md: edit that file, not this one.\n"
    "// Only import this from server code (pages) so the text is not in the public JS bundle.\n"
    "export type KItem = { bn: string; ro: string; en: string; who?: \"Shift lead\" | \"Team member\" };\n"
    "export type KSection = { id: string; title: string; kind: \"words\" | \"dialogue\" | \"recipe\"; note: string; items: KItem[] };\n"
    "export type KStage = { id: number; title: string; goal: string; note: string; sections: KSection[] };\n"
    "export type KitchenContent = { stages: KStage[]; listening: KSection[]; listeningNote: string; pronunciation: string[]; homework: string[]; progress: string[]; teacher: string[] };\n\n"
    f"export const KITCHEN: KitchenContent = {body};\n",
    encoding="utf-8",
)
for n in notices: print("note:", n)
print(f"{len(stages)} stages, {sum(len(sec['items']) for s in stages for sec in s['sections'])} items, {len(listening)} listening levels -> {OUT}")

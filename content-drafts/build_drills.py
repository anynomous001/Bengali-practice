"""Builds src/data/translation-drills.ts: translation drills by tense and level.

Run from the repo root:  python3 content-drafts/build_drills.py
Every Bengali sentence is made by the verb tables in gram/ (so the verb forms are right), and the English is written beside it here.
Levels: easy (I, you, he or she; one clause), medium (every person, negatives and questions), hard (two clauses).
"""
import io, contextlib, json, random, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "gram"))
with contextlib.redirect_stdout(io.StringIO()):
    import lib
from lib import SENT

# subject key -> English subject, "be" form, "have" form, third person singular?
SUBJ = {
    "ami": ("I", "am", "have", False), "tumi": ("you", "are", "have", False), "apni": ("you (respectful)", "are", "have", False),
    "se": ("he/she", "is", "has", True), "tini": ("he/she (respectful)", "is", "has", True),
    "amra": ("we", "are", "have", False), "tara": ("they", "are", "have", False), "tomra": ("you (all)", "are", "have", False),
}
cap = lambda s: s[0].upper() + s[1:]

# action: verb key, Bengali object/place parts, English base, 3rd person, -ing, past participle, English object text
A = {
    "rice": ("khaoya", [("ভাত", "bhat")], "eat", "eats", "eating", "eaten", "rice"),
    "tea": ("khaoya", [("চা", "cha")], "drink", "drinks", "drinking", "drunk", "tea"),
    "book": ("pora", [("বই", "boi")], "read", "reads", "reading", "read", "a book"),
    "film": ("dekha", [("ছবি", "chhobi")], "watch", "watches", "watching", "watched", "a film"),
    "song": ("shona", [("গান", "gan")], "listen to", "listens to", "listening to", "listened to", "a song"),
    "letter": ("lekha", [("চিঠি", "chithi")], "write", "writes", "writing", "written", "a letter"),
    "bengali": ("bola", [("বাংলা", "bangla")], "speak", "speaks", "speaking", "spoken", "Bengali"),
    "market": ("jaoya", [("বাজারে", "bajare")], "go", "goes", "going", "gone", "to the market"),
    "work": ("kora", [("কাজ", "kaj")], "work", "works", "working", "worked", ""),
    "sleep": ("ghumano", [], "sleep", "sleeps", "sleeping", "slept", ""),
    "play": ("khela", [("মাঠে", "mathe")], "play", "plays", "playing", "played", "in the field"),
    "come": ("asha", [("এখানে", "ekhane")], "come", "comes", "coming", "come", "here"),
}

# time words: (Bengali, roman, English)
TIME = {
    "pres": [(("প্রতিদিন", "protidin"), "every day"), (("রোজ", "roj"), "every day"), (("সবসময়", "shobshomoy"), "always"), (("মাঝে মাঝে", "majhe majhe"), "sometimes")],
    "cont": [(("এখন", "ekhon"), "now"), (("এখন", "ekhon"), "right now")],
    "perf": [(("আজ", "aj"), "today"), (("আগেই", "agei"), "already")],
    "perfcont": [(("দুই বছর ধরে", "dui bochhor dhore"), "for two years"), (("ছয় মাস ধরে", "chhoy mash dhore"), "for six months"), (("তিন বছর ধরে", "tin bochhor dhore"), "for three years"), (("অনেকদিন ধরে", "onekdin dhore"), "for a long time"), (("এক ঘণ্টা ধরে", "ek ghonta dhore"), "for an hour")],
    "fut": [(("কাল", "kal"), "tomorrow"), (("আগামীকাল", "agamikal"), "tomorrow")],
    "futcont": [(("কাল এই সময়ে", "kal ei shomoye"), "at this time tomorrow")],
    "habit": [(("ছোটবেলায়", "chhotobelay"), "as a child")],
}
TENSES = [
    ("pres", "Simple present", "I drink tea every day."),
    ("cont", "Present continuous", "I am drinking tea now."),
    ("perf", "Present perfect", "I have drunk tea today."),
    ("perfcont", "Present perfect continuous", "I have been drinking tea for two years."),
    ("fut", "Simple future", "I will drink tea tomorrow."),
    ("futcont", "Future continuous", "I will be drinking tea at this time tomorrow."),
    ("habit", "Past habitual", "I used to drink tea as a child."),
]
ENGINE = {"perfcont": "cont"}  # "have been drinking for two years" is the present continuous with ধরে in Bengali


def english(tense, subj, act, time_en, neg=False, q=False):
    s, be, have, third = SUBJ[subj]
    _, _, v, v3, ing, pp, obj = A[act]
    tail = " ".join(x for x in [obj, time_en if tense not in ("habit",) else "", time_en if tense == "habit" else ""] if x)
    tail = (" " + tail) if tail else ""
    if tense == "habit":
        tail = (" " + obj if obj else "") + " " + time_en
        core = f"{'did not use to' if neg else 'used to'} {v}"
        if q: return f"Did {s} use to {v}{tail}?"
        return cap(f"{s} {core}{tail}.")
    if q:
        if tense == "pres": return f"{'Does' if third else 'Do'} {s} {v}{tail}?"
        if tense == "cont": return f"{cap(be)} {s} {ing}{tail}?"
        if tense == "perf": return f"{cap(have)} {s} {pp}{tail}?"
        if tense == "perfcont": return f"{cap(have)} {s} been {ing}{tail}?"
        if tense == "fut": return f"Will {s} {v}{tail}?"
        if tense == "futcont": return f"Will {s} be {ing}{tail}?"
    if neg:
        if tense == "pres": return cap(f"{s} {'does not' if third else 'do not'} {v}{tail}.")
        if tense == "cont": return cap(f"{s} {be} not {ing}{tail}.")
        if tense == "perf": return cap(f"{s} {have} not {pp}{tail}.")
        if tense == "fut": return cap(f"{s} will not {v}{tail}.")
        if tense == "futcont": return cap(f"{s} will not be {ing}{tail}.")
    if tense == "pres": return cap(f"{s} {v3 if third else v}{tail}.")
    if tense == "cont": return cap(f"{s} {be} {ing}{tail}.")
    if tense == "perf": return cap(f"{s} {have} {pp}{tail}.")
    if tense == "perfcont": return cap(f"{s} {have} been {ing}{tail}.")
    if tense == "fut": return cap(f"{s} will {v}{tail}.")
    if tense == "futcont": return cap(f"{s} will be {ing}{tail}.")
    raise ValueError(tense)


def make(tense, subj, act, time, neg=False, q=False):
    verb, parts, *_ = A[act]
    (tbn, tro), ten = time
    if neg and tense == "perf" and ten == "already":
        (tbn, tro), ten = ("এখনও", "ekhono"), "yet"
    eng_t = ENGINE.get(tense, tense)
    bn, ro, _ = SENT(subj, [(tbn, tro)] + list(parts), verb, eng_t, "x", neg=neg, q=False)
    if q:
        # a yes/no question: put কি after the subject
        b = bn.split(" ", 1); r = ro.split(" ", 1)
        bn = f"{b[0]} কি {b[1]}".rstrip("।") + "?"
        ro = f"{r[0]} ki {r[1]}".rstrip(".") + "?"
    return dict(bn=bn, ro=ro, en=english(tense, subj, act, ten, neg, q))


def join(a, b, conj, ro_conj, en_conj):
    """Two clauses in one sentence: a, conj b."""
    lo = lambda s: s if s.startswith("I ") or s.startswith("I'") else s[0].lower() + s[1:]
    return dict(bn=a["bn"].rstrip("।") + f", {conj} " + b["bn"], ro=a["ro"].rstrip(".") + f", {ro_conj} " + b["ro"], en=a["en"].rstrip(".") + f", {en_conj} " + lo(b["en"]))


def when_clause(a, b, ten):
    """When a, then b."""
    lo = lambda s: s if s.startswith("I ") else s[0].lower() + s[1:]
    return dict(bn="যখন " + a["bn"].rstrip("।") + ", তখন " + b["bn"], ro="jokhon " + a["ro"].rstrip(".") + ", tokhon " + b["ro"], en="When " + lo(a["en"]).rstrip(".") + ", " + lo(b["en"]))


ACTS = list(A)
PEOPLE_E = ["ami", "tumi", "se"]
PEOPLE_M = ["ami", "tumi", "apni", "se", "tini", "amra", "tara", "tomra"]


def pick_time(rng, tense, act):
    t = rng.choice(TIME[tense])
    return t


def easy(tense, n=10):
    rng = random.Random("easy" + tense); out = []; seen = set()
    acts = ACTS[:]
    tries = 0
    while len(out) < n and tries < 400:
        tries += 1
        act = rng.choice(acts); subj = PEOPLE_E[len(out) % 3]
        if tense == "perfcont" and act in ("sleep", "come"): continue
        d = make(tense, subj, act, pick_time(rng, tense, act))
        if d["bn"] in seen: continue
        seen.add(d["bn"]); out.append(d)
    return out


def medium(tense, n=10):
    rng = random.Random("medium" + tense); out = []; seen = set()
    tries = 0
    while len(out) < n and tries < 800:
        tries += 1
        act = rng.choice(ACTS); subj = rng.choice(PEOPLE_M)
        if tense == "perfcont" and act in ("sleep", "come"): continue
        kind = ["pos", "neg", "q"][len(out) % 3]
        if tense in ("perfcont",) and kind == "neg": kind = "pos"
        d = make(tense, subj, act, pick_time(rng, tense, act), neg=(kind == "neg"), q=(kind == "q"))
        if d["bn"] in seen: continue
        seen.add(d["bn"]); out.append(d)
    return out


def hard(tense, n=8):
    rng = random.Random("hard" + tense); out = []; seen = set()
    pairs = [("rice", "ami", "bengali", "se"), ("tea", "tumi", "book", "tini"), ("film", "amra", "song", "tara"), ("market", "se", "work", "ami"),
             ("letter", "apni", "sleep", "se"), ("play", "tara", "book", "tomra"), ("come", "tini", "rice", "ami"), ("bengali", "tumi", "film", "se"),
             ("tea", "ami", "work", "apni"), ("song", "se", "letter", "tumi"), ("market", "amra", "play", "tara"), ("rice", "tini", "sleep", "tumi")]
    for i, (a1, s1, a2, s2) in enumerate(pairs):
        if len(out) >= n: break
        if tense == "perfcont" and (a1 in ("sleep", "come") or a2 in ("sleep", "come")): continue
        t1 = pick_time(rng, tense, a1); t2 = pick_time(rng, tense, a2)
        d1 = make(tense, s1, a1, t1); d2 = make(tense, s2, a2, t2, neg=(tense in ("pres", "cont", "perf", "fut") and i % 2 == 1))
        if tense in ("pres", "cont") and i % 3 == 2:
            # when ... then ...: the first clause without its time word
            e1 = make(tense, s1, a1, ((("", ""), "")), )
            e1 = dict(bn=e1["bn"].replace("  ", " "), ro=e1["ro"].replace("  ", " "), en=english(tense, s1, a1, "").replace("  ", " ").replace(" .", "."))
            d = when_clause(e1, d2, tense)
        elif i % 3 == 0:
            d = join(d1, d2, "কিন্তু", "kintu", "but")
        else:
            d = join(d1, d2, "আর", "ar", "and")
        if d["bn"] in seen: continue
        seen.add(d["bn"]); out.append(d)
    return out


drills = {}
for tid, label, ex in TENSES:
    drills[f"{tid}:easy"] = easy(tid)
    drills[f"{tid}:medium"] = medium(tid)
    drills[f"{tid}:hard"] = hard(tid)

for k, v in drills.items():
    assert len(v) >= 6, (k, len(v))
    for d in v:
        assert d["bn"].strip() and d["ro"].strip() and d["en"].strip(), (k, d)
        assert "  " not in d["en"] and "  " not in d["bn"], (k, d)

root = Path(__file__).parent.parent
ts = f'''// Translation drills by tense and level. Generated by content-drafts/build_drills.py: edit that, not this file.
// Only import this from server code (pages/actions) so the sentences are never in the public JS bundle.
export type DrillItem = {{ bn: string; ro: string; en: string }};
export type DrillTense = "pres" | "cont" | "perf" | "perfcont" | "fut" | "futcont" | "habit";
export type DrillLevel = "easy" | "medium" | "hard";

/** The tenses a student can pick, with an example in English. */
export const DRILL_TENSES: {{ id: DrillTense; label: string; example: string }}[] = {json.dumps([dict(id=t, label=l, example=e) for t, l, e in TENSES], ensure_ascii=False, indent=1)};

export const DRILLS: Record<string, DrillItem[]> = {json.dumps(drills, ensure_ascii=False, indent=1)};
'''
(root / "src/data/translation-drills.ts").write_text(ts)
print({k: len(v) for k, v in drills.items()})
for k in ("pres:easy", "cont:medium", "perf:hard", "perfcont:medium", "fut:hard", "habit:medium", "futcont:easy"):
    print("\n" + k); [print("  ", d["en"], "|", d["bn"]) for d in drills[k][:5]]

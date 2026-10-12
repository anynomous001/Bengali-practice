# Generates src/data/tense-workout.ts (the Tense workout rounds). Run from the repo root.
# Verb forms come from build_grammar.py so the workout always agrees with the tense tables.
import io, json, sys, contextlib
sys.path.insert(0, "content-drafts")
with contextlib.redirect_stdout(io.StringIO()):
    import build_grammar as G

V = G.VERBS
TENSE_EN = {t[0]: t[3] for t in G.TENSES}
# pronouns: key -> (bn, roman, person index into the 5-person tables)
PRON = {
 "ami": ("আমি", "ami", 0), "amra": ("আমরা", "amra", 0), "tui": ("তুই", "tui", 1), "tumi": ("তুমি", "tumi", 2), "tomra": ("তোমরা", "tomra", 2),
 "apni": ("আপনি", "apni", 3), "tini": ("তিনি", "tini", 3), "uni": ("উনি", "uni", 3), "se": ("সে", "she", 4), "tara": ("তারা", "tara", 4),
}
def cell(bn, ro): return {"bn": bn, "ro": ro}
def sent(*parts):
    """parts are (bn, ro) tuples; returns one cell with a closing danda."""
    return cell(" ".join(p[0] for p in parts) + "।", " ".join(p[1] for p in parts) + ".")
def form(verb, tense, pron):
    f = V[verb]["f"][tense][PRON[pron][2]]
    return (f["bn"], f["ro"])
def pr(pron): return (PRON[pron][0], PRON[pron][1])

def choose(q, sentence, options, answer, why):
    assert len({o["bn"] for o in options}) == len(options), (q, [o["bn"] for o in options])
    return {"kind": "choose", "q": q, "sentence": sentence, "options": options, "answer": answer, "why": why}
def write(q, sentence, answer, also, why):
    return {"kind": "write", "q": q, "sentence": sentence, "answer": answer, "also": also, "why": why}

def tense_options(verb, pron, correct, others, mk):
    """correct option first, then distractors in other tenses for the same person; mk(form)->cell"""
    ids = [correct] + [t for t in others if t != correct][:3]
    return [mk(form(verb, t, pron)) for t in ids]

ORDER = ["pres", "cont", "perf", "past", "pastcont", "pastperf", "fut", "habit"]

# ---------------- Round 1: tense cues ----------------
r1 = []
base_go = sent(pr("ami"), ("বাজারে", "bajare"), form("jaoya", "pres", "ami"))
base_eat = sent(pr("ami"), ("ভাত", "bhat"), form("khaoya", "pres", "ami"))
cases = [
 ("jaoya", ("বাজারে", "bajare"), base_go, "I go to the market", [("se","past"),("tumi","fut"),("amra","cont"),("apni","past"),("tara","perf"),("tomra","pastcont")]),
 ("khaoya", ("ভাত", "bhat"), base_eat, "I eat rice", [("se","cont"),("tumi","past"),("amra","fut"),("apni","perf"),("tara","pastcont"),("uni","pres")]),
]
for verb, obj, base, en, cs in cases:
    for pron, tense in cs:
        mk = lambda f, pron=pron, obj=obj: sent(pr(pron), obj, f)
        opts = tense_options(verb, pron, tense, ORDER, mk)
        r1.append(choose(f"Change the sentence ({en}) for “{PRON[pron][0]}”, {TENSE_EN[tense].lower()}.", base, opts, 0,
                         f"{TENSE_EN[tense]} with {PRON[pron][0]}: {form(verb, tense, pron)[0]}."))

# ---------------- Round 2: time-word cues ----------------
OFF = ("অফিসে", "office-e"); KAJ = ("কাজ", "kaj")
def kaj(pron, tense, pre=None):
    f = form("kora", tense, pron)
    parts = [pr(pron)] + ([pre] if pre else []) + [OFF, KAJ, f]
    return sent(*parts)
base_work = sent(pr("ami"), OFF, KAJ, form("kora", "pres", "ami"))
r2 = []
def cue(pron, pre, tense, others, label, why, alt_note=None):
    opts = [kaj(pron, t, pre) for t in [tense] + [x for x in others if x != tense][:3]]
    r2.append(choose(f"Time cue: “{PRON[pron][0]}, {label}”. Change the sentence (I work at the office).", base_work, opts, 0, why))
cue("se", ("এখন","ekhon"), "cont", ["pres","past","fut","perf"], "ekhon (now)", "এখন (now) needs the present continuous: করছে.")
cue("tumi", ("গতকাল","gotokal"), "past", ["pres","cont","fut","perf"], "gotokal (yesterday)", "গতকাল (yesterday) needs the simple past: করলে. (করেছিলে is also possible when you stress it was long ago.)")
cue("amra", ("আগামীকাল","agamikal"), "fut", ["pres","cont","past","perf"], "agamikal (tomorrow)", "আগামীকাল (tomorrow) needs the future: করব.")
cue("apni", ("রোজ","roj"), "pres", ["cont","past","fut","perf"], "roj (every day)", "রোজ (every day) is a habit: the simple present করেন.")
cue("tara", ("আজ সকাল থেকে","aj shokal theke"), "cont", ["pres","past","fut","perf"], "aj shokal theke (since this morning)", "'Since this morning' is an action still going on: present continuous + থেকে.")
cue("uni", ("গত বছর","goto bochhor"), "pastperf", ["pres","cont","fut","perf"], "goto bochhor (last year)", "'Last year' is a finished time long ago: করেছিলেন. (For a regular habit then, use করতেন.)")

# ---------------- Round 3: negatives ----------------
def neg(pron, pre, kind, label, why):
    f = {"pres": lambda: (form("kora","pres",pron)[0] + " না", form("kora","pres",pron)[1] + " na"),
         "past": lambda: (form("kora","pres",pron)[0] + "নি", form("kora","pres",pron)[1] + "ni"),
         "fut":  lambda: (form("kora","fut",pron)[0] + " না", form("kora","fut",pron)[1] + " na"),
         "cont": lambda: (form("kora","cont",pron)[0] + " না", form("kora","cont",pron)[1] + " na")}
    def mk(k): return sent(*([pr(pron)] + ([pre] if pre else []) + [OFF, KAJ, f[k]()]))
    order = [kind] + [k for k in ["pres", "past", "fut", "cont"] if k != kind]
    return choose(f"Make it negative: “{PRON[pron][0]}, {label}”.", base_work, [mk(k) for k in order[:4]], 0, why)
r3 = [
 neg("ami", ("রোজ","roj"), "pres", "roj (every day)", "Present and habit: put না after the verb: করি না."),
 neg("se", ("গতকাল","gotokal"), "past", "gotokal (yesterday)", "Past: add -নি to the present form: করেনি."),
 neg("amra", ("আগামীকাল","agamikal"), "fut", "agamikal (tomorrow)", "Future: না after the verb: করব না."),
 neg("tumi", ("এখন","ekhon"), "cont", "ekhon (now)", "Present continuous: না after the verb: করছ না."),
 neg("apni", ("এখনও","ekhono"), "past", "ekhono (not yet)", "'Not yet' uses the -নি form: করেননি."),
 neg("tara", ("রোজ","roj"), "pres", "roj (every day)", "Habit: করে না."),
 neg("ami", ("গতকাল","gotokal"), "past", "gotokal (yesterday)", "Past: করিনি."),
 neg("tomra", ("আগামীকাল","agamikal"), "fut", "agamikal (tomorrow)", "Future: করবে না."),
]

# ---------------- Round 4: spot the mistake ----------------
def spot(bn, ro, ok, fix=None, wrong=None, why=""):
    s = cell(bn + "।", ro + ".")
    options = [cell("Thik! No mistake.", "Thik!")]
    if ok:
        for b, r in wrong: options.append(cell(b + "।", r + "."))
        return choose("Is the sentence correct? If not, pick the fixed sentence.", s, options, 0, why)
    options = [cell(fix[0] + "।", fix[1] + ".")] + [cell(b + "।", r + ".") for b, r in wrong] + [options[0]]
    return choose("Is the sentence correct? If not, pick the fixed sentence.", s, options, 0, why)
r4 = [
 spot("আমরা কাল সিনেমা দেখবে", "amra kal cinema dekhbe", False, ("আমরা কাল সিনেমা দেখব", "amra kal cinema dekhbo"), [("আমরা কাল সিনেমা দেখলাম","amra kal cinema dekhlam"),("আমরা কাল সিনেমা দেখছে","amra kal cinema dekhchhe")], "আমরা takes the আমি ending: দেখব."),
 spot("সে গতকাল স্কুলে যাবে", "she gotokal skule jabe", False, ("সে গতকাল স্কুলে গেল", "she gotokal skule gelo"), [("সে গতকাল স্কুলে যায়","she gotokal skule jay"),("সে গতকাল স্কুলে যাচ্ছে","she gotokal skule jachchhe")], "গতকাল (yesterday) needs a past verb: গেল (or গিয়েছিল)."),
 spot("আপনি কোথায় থাকো", "apni kothay thako", False, ("আপনি কোথায় থাকেন", "apni kothay thaken"), [("আপনি কোথায় থাকি","apni kothay thaki"),("আপনি কোথায় থাকিস","apni kothay thakis")], "আপনি takes -েন: থাকেন."),
 spot("তারা এখন মাঠে খেলছে", "tara ekhon mathe khelchhe", True, wrong=[("তারা এখন মাঠে খেলল","tara ekhon mathe khello"),("তারা এখন মাঠে খেলবে","tara ekhon mathe khelbe"),("তারা এখন মাঠে খেলেছে","tara ekhon mathe khelechhe")], why="এখন (now) with the present continuous খেলছে is right."),
 spot("আমি আগামীকাল দিল্লি গেলাম", "ami agamikal dilli gelam", False, ("আমি আগামীকাল দিল্লি যাব", "ami agamikal dilli jabo"), [("আমি আগামীকাল দিল্লি যাচ্ছিলাম","ami agamikal dilli jachchhilam"),("আমি আগামীকাল দিল্লি গিয়েছি","ami agamikal dilli giyechhi")], "আগামীকাল (tomorrow) needs the future: যাব."),
 spot("তুমি কী খাচ্ছেন", "tumi ki khachchhen", False, ("তুমি কী খাচ্ছ", "tumi ki khachchho"), [("তুমি কী খাচ্ছি","tumi ki khachchhi"),("তুমি কী খাচ্ছিস","tumi ki khachchhis")], "তুমি takes -ছ in the present continuous: খাচ্ছ. (খাচ্ছেন is for আপনি.)"),
 spot("উনি রোজ সকালে হাঁটে", "uni roj shokale hante", False, ("উনি রোজ সকালে হাঁটেন", "uni roj shokale hanten"), [("উনি রোজ সকালে হাঁটি","uni roj shokale hanti"),("উনি রোজ সকালে হাঁটো","uni roj shokale hanto")], "উনি is respectful, so the verb ends in -েন: হাঁটেন."),
 spot("আমি গতকাল ভাত খাই না", "ami gotokal bhat khai na", False, ("আমি গতকাল ভাত খাইনি", "ami gotokal bhat khaini"), [("আমি গতকাল ভাত খাব না","ami gotokal bhat khabo na"),("আমি গতকাল ভাত খাচ্ছি না","ami gotokal bhat khachchhi na")], "A past negative uses -নি: খাইনি."),
 spot("আমরা এখনও খাইনি", "amra ekhono khaini", True, wrong=[("আমরা এখনও খাই না","amra ekhono khai na"),("আমরা এখনও খাব না","amra ekhono khabo na"),("আমরা এখনও খাচ্ছি না","amra ekhono khachchhi na")], why="'Not yet' is এখনও … -নি: খাইনি is right."),
 spot("তোমরা কাল রাতে কী করছিলাম", "tomra kal rate ki korchhilam", False, ("তোমরা কাল রাতে কী করছিলে", "tomra kal rate ki korchhile"), [("তোমরা কাল রাতে কী করছিলেন","tomra kal rate ki korchhilen"),("তোমরা কাল রাতে কী করছিস","tomra kal rate ki korchhis")], "তোমরা takes the তুমি ending: করছিলে."),
]
for q in r4:
    if q["answer"] == 0 and q["options"][0]["bn"].startswith("Thik"): pass

# ---------------- Round 5: fill the blank (tenant and landlord) ----------------
def fill(pre, post, pre_ro, post_ro, options, why, q):
    cells = [cell(b, r) for b, r in options]
    s = cell(pre + " ___ " + post, pre_ro + " ___ " + post_ro)
    return choose(q, s, cells, 0, why)
r5 = [
 fill("আমি প্রতিদিন ভাড়া", "(দেওয়া)।", "ami protidin bhara", "(deoya).", [("দিই","dii"),("দিচ্ছি","dichchhi"),("দিয়েছি","diyechhi"),("দেব","debo")], "প্রতিদিন (every day) is a habit: simple present দিই.", "Fill the blank (simple present)."),
 fill("বাড়িওয়ালা এখন ভাড়া", "(নেওয়া)।", "bariwala ekhon bhara", "(neoya).", [("নিচ্ছে","nichchhe"),("নেয়","ney"),("নিয়েছে","niyechhe"),("নেবে","nebe")], "এখন (now) needs the present continuous: নিচ্ছে.", "Fill the blank (present continuous)."),
 fill("তুমি কি নতুন বাড়ি", "(দেখা)?", "tumi ki notun bari", "(dekha)?", [("দেখেছ","dekhechho"),("দেখছ","dekhchho"),("দেখলে","dekhle"),("দেখবে","dekhbe")], "'Have you seen' is the present perfect: দেখেছ.", "Fill the blank (present perfect)."),
 fill("আমি গতকাল প্রতিবেশীর সঙ্গে কথা", "(বলা)।", "ami gotokal protibeshir songe kotha", "(bola).", [("বললাম","bollam"),("বলছিলাম","bolchhilam"),("বলি","boli"),("বলব","bolbo")], "গতকাল with one finished action: simple past বললাম.", "Fill the blank (simple past)."),
 fill("আমি তিন বছর ধরে এই এলাকায়", "(থাকা)।", "ami tin bochhor dhore ei elakay", "(thaka).", [("থাকি","thaki"),("থাকব","thakbo"),("থাকলাম","thaklam"),("থাকতাম","thaktam")], "'For three years, still true' uses the present + ধরে: থাকি. (থাকছি also works.)", "Fill the blank (has been doing)."),
 fill("তুমি কাল বিকেলে কী", "(করা)?", "tumi kal bikele ki", "(kora)?", [("করছিলে","korchhile"),("করছ","korchho"),("করবে","korbe"),("করো","koro")], "'What were you doing' is the past continuous: করছিলে.", "Fill the blank (past continuous)."),
 fill("আমি আসার আগে বাড়িওয়ালা ঘর পরিষ্কার", "(করা)।", "ami asar age bariwala ghor porishkar", "(kora).", [("করেছিলেন","korechhilen"),("করছিলেন","korchhilen"),("করবেন","korben"),("করেন","koren")], "Done before another past event: past perfect করেছিলেন (respectful for the landlord).", "Fill the blank (past perfect)."),
]

# ---------------- Round 6: check the sentence ----------------
def check(bn, ro, ok, tense, fix=None, wrong=()):
    s = cell(bn + "।", ro + ".")
    right = cell("Correct as written.", "Thik achhe.")
    if ok:
        opts = [right] + [cell(b + "।", r + ".") for b, r in wrong]
        why = f"This is correct: {tense}."
    else:
        opts = [cell(fix[0] + "।", fix[1] + ".")] + [cell(b + "।", r + ".") for b, r in wrong] + [right]
        why = f"Fix: {fix[0]} ({tense})."
    return choose("Is this sentence right for the meaning in brackets?", s, opts, 0, why)
r6 = [
 check("তুমি প্রতিদিন বাংলা শেখো", "tumi protidin bangla shekho", True, "simple present, a habit", wrong=[("তুমি প্রতিদিন বাংলা শিখলে","tumi protidin bangla shikhle"),("তুমি প্রতিদিন বাংলা শিখছিলে","tumi protidin bangla shikhchhile")]),
 check("আমি এখন বই পড়ছি", "ami ekhon boi porchhi", True, "present continuous", wrong=[("আমি এখন বই পড়লাম","ami ekhon boi porlam"),("আমি এখন বই পড়ব","ami ekhon boi porbo")]),
 check("তিনি কি নাস্তা করছেন", "tini ki nasta korchhen", True, "present continuous, respectful", wrong=[("তিনি কি নাস্তা করছে","tini ki nasta korchhe"),("তিনি কি নাস্তা করেন","tini ki nasta koren")]),
 check("সে গতকাল আমাকে ফোন করেছিল", "she gotokal amake phone korechhilo", False, "simple past: she called me yesterday", fix=("সে গতকাল আমাকে ফোন করল", "she gotokal amake phone korlo"), wrong=[("সে গতকাল আমাকে ফোন করছে","she gotokal amake phone korchhe"),("সে গতকাল আমাকে ফোন করবে","she gotokal amake phone korbe")]),
 check("আপনি তিন ঘণ্টা ধরে গাড়ি চালাচ্ছেন", "apni tin ghonta dhore gari chalachchhen", True, "has been driving, with ধরে", wrong=[("আপনি তিন ঘণ্টা ধরে গাড়ি চালালেন","apni tin ghonta dhore gari chalalen"),("আপনি তিন ঘণ্টা ধরে গাড়ি চালাবেন","apni tin ghonta dhore gari chalaben")]),
 check("তুমি গতকাল রাতে কী খাচ্ছিলে", "tumi gotokal rate ki khachchhile", True, "past continuous: what were you eating", wrong=[("তুমি গতকাল রাতে কী খাচ্ছ","tumi gotokal rate ki khachchho"),("তুমি গতকাল রাতে কী খাবে","tumi gotokal rate ki khabe")]),
 check("তিনি বাড়ি পৌঁছানোর আগে রান্না করেছিলেন", "tini bari pouchhanor age ranna korechhilen", True, "past perfect, before another past event", wrong=[("তিনি বাড়ি পৌঁছানোর আগে রান্না করছেন","tini bari pouchhanor age ranna korchhen"),("তিনি বাড়ি পৌঁছানোর আগে রান্না করবেন","tini bari pouchhanor age ranna korben")]),
 check("আমি দুই বছর ধরে গান শিখছিলাম", "ami dui bochhor dhore gan shikhchhilam", True, "had been learning, before another past event", wrong=[("আমি দুই বছর ধরে গান শিখছি","ami dui bochhor dhore gan shikhchhi"),("আমি দুই বছর ধরে গান শিখব","ami dui bochhor dhore gan shikhbo")]),
]

# ---------------- Rounds 7-10: write, then check ----------------
r7 = [  # translate: tenant and landlord
 write("I am looking for a new house near the station. (present continuous)", None, cell("আমি স্টেশনের কাছে একটা নতুন বাড়ি খুঁজছি।", "ami stesoner kachhe ekta notun bari khujchhi."), "স্টেশনের পাশে (beside the station)", "Present continuous: খুঁজছি."),
 write("The landlord has already fixed the water problem. (present perfect)", None, cell("বাড়িওয়ালা ইতিমধ্যে জলের সমস্যা ঠিক করে দিয়েছেন।", "bariwala itimodhye joler somossha thik kore diyechhen."), "ঠিক করেছেন (also correct)", "Present perfect: ঠিক করে দিয়েছেন. 'Already' is ইতিমধ্যে."),
 write("Every month I pay the rent on the 5th. (simple present)", None, cell("প্রতি মাসে আমি পাঁচ তারিখে ভাড়া দিই।", "proti mashe ami panch tarikhe bhara dii."), "প্রতি মাসের পাঁচ তারিখে আমি ভাড়া দিই।", "A regular habit: simple present দিই."),
 write("I have been living in this area for two years. (has been doing)", None, cell("আমি দু বছর ধরে এই এলাকায় থাকি।", "ami du bochhor dhore ei elakay thaki."), "আমি দু বছর ধরে এই এলাকায় আছি।", "Bengali uses the present + ধরে for 'has been doing'."),
 write("Yesterday I met my new neighbour for the first time. (simple past)", None, cell("গতকাল আমি আমার নতুন প্রতিবেশীর সঙ্গে প্রথমবার দেখা করলাম।", "gotokal ami amar notun protibeshir songe prothombar dekha korlam."), None, "Simple past: দেখা করলাম."),
 write("I was talking to the landlord when the electricity went out. (past continuous)", None, cell("আমি যখন বাড়িওয়ালার সঙ্গে কথা বলছিলাম, তখন বিদ্যুৎ চলে গেল।", "ami jokhon bariwalar songe kotha bolchhilam, tokhon biddyut chole gelo."), "…তখন বিদ্যুৎ চলে গিয়েছিল।", "যখন … তখন …: past continuous for the long action, simple past for the sudden one."),
 write("By the time I moved in, the previous tenant had already left. (past perfect)", None, cell("আমি যখন ঢুকলাম, তখন আগের ভাড়াটে ইতিমধ্যেই চলে গিয়েছিল।", "ami jokhon dhuklam, tokhon ager bharate itimodhyei chole giyechhilo."), "আমি ঢোকার আগেই আগের ভাড়াটে চলে গিয়েছিল।", "Past perfect চলে গিয়েছিল for the earlier event."),
 write("I had been searching for a house for a month before I found this one. (had been doing)", None, cell("এই বাড়িটা পাওয়ার আগে আমি এক মাস ধরে একটা বাড়ি খুঁজছিলাম।", "ei barita paoyar age ami ek mash dhore ekta bari khujchhilam."), None, "Past continuous + ধরে for 'had been doing'. 'Find' is খুঁজে পাওয়া; 'found' is খুঁজে পেয়েছিলাম."),
]
r8 = [  # translate: complex situations
 write("By the time I called her, she had already left for the market.", None, cell("আমি যখন তাকে ফোন করলাম, তখন সে ইতিমধ্যেই বাজারে চলে গিয়েছিল।", "ami jokhon take phone korlam, tokhon she itimodhyei bajare chole giyechhilo."), None, "Past perfect for the earlier event: চলে গিয়েছিল."),
 write("I've been working on this project for three months, and I still haven't finished it.", None, cell("আমি তিন মাস ধরে এই প্রজেক্টে কাজ করছি, আর এখনও শেষ করতে পারিনি।", "ami tin mash dhore ei projekte kaj korchhi, ar ekhono shesh korte parini."), "…এখনও শেষ করিনি।", "Present continuous + ধরে, and এখনও … -নি for 'still not'."),
 write("He was cooking dinner when the electricity went out last night.", None, cell("গতকাল রাতে যখন বিদ্যুৎ চলে গেল, তখন সে রাতের খাবার রান্না করছিল।", "gotokal rate jokhon biddyut chole gelo, tokhon she rater khabar ranna korchhilo."), None, "Past continuous রান্না করছিল for the long action."),
 write("Every morning before going to work, she drinks a cup of tea.", None, cell("প্রতিদিন সকালে কাজে যাওয়ার আগে সে এক কাপ চা খায়।", "protidin shokale kaje jaoyar age she ek kap cha khay."), "…সে এক কাপ চা পান করে। (more formal)", "Habit: simple present. 'Before going' is যাওয়ার আগে."),
 write("We had been waiting for an hour before the train finally arrived.", None, cell("ট্রেনটা শেষ পর্যন্ত আসার আগে আমরা এক ঘণ্টা ধরে অপেক্ষা করছিলাম।", "trenta shesh porjonto asar age amra ek ghonta dhore opekkha korchhilam."), None, "Past continuous + ধরে."),
 write("I don't know if he has eaten yet. He was still asleep when I left.", None, cell("আমি জানি না ও এখনও খেয়েছে কিনা। আমি যখন বেরিয়ে এলাম, তখনও ও ঘুমিয়ে ছিল।", "ami jani na o ekhono kheyeche kina. ami jokhon beriye elam, tokhono o ghumiye chhilo."), None, "'If' as a question is কিনা. 'Was asleep' is ঘুমিয়ে ছিল."),
 write("She has been learning English for two years now, and she is getting better every day.", None, cell("সে দু বছর ধরে ইংরেজি শিখছে, আর প্রতিদিন আরও ভালো হচ্ছে।", "she du bochhor dhore ingreji shikhchhe, ar protidin aro bhalo hochchhe."), None, "Present continuous + ধরে. 'Getting better' is ভালো হচ্ছে."),
 write("By next month I will have been living in this city for five years.", None, cell("আগামী মাসে এই শহরে আমার পাঁচ বছর হয়ে যাবে।", "agami mashe ei shohore amar panch bochhor hoye jabe."), "আগামী মাসে আমি এই শহরে পাঁচ বছর পূর্ণ করব।", "Bengali has no 'will have been'. It says 'five years will be complete'."),
]
r9 = [  # tense transformation
 write("Rewrite in the present continuous.", cell("আমি ভাত খাই।", "ami bhat khai."), cell("আমি ভাত খাচ্ছি।", "ami bhat khachchhi."), None, "Root + -ছি."),
 write("Rewrite in the past continuous.", cell("তুমি অফিসে গিয়েছিলে।", "tumi office-e giyechhile."), cell("তুমি অফিসে যাচ্ছিলে।", "tumi office-e jachchhile."), None, "Root + -ছিলে."),
 write("Rewrite in the present perfect.", cell("সে গান শিখছে।", "she gan shikhchhe."), cell("সে গান শিখেছে।", "she gan shikhechhe."), None, "Root + -েছে."),
 write("Rewrite in the past perfect, and add an “আগে” clause.", cell("তিনি কাজ করছিলেন।", "tini kaj korchhilen."), cell("তিনি বাড়ি ফেরার আগে কাজ করেছিলেন।", "tini bari pherar age kaj korechhilen."), "তিনি আসার আগে কাজ করে ফেলেছিলেন।", "Past perfect -েছিলেন, with the earlier event marked by আগে."),
 write("Rewrite in the present perfect continuous, and add “কতক্ষণ ধরে”.", cell("আমি রান্না করছি।", "ami ranna korchhi."), cell("আমি এক ঘণ্টা ধরে রান্না করছি।", "ami ek ghonta dhore ranna korchhi."), None, "Bengali keeps the present continuous and adds ধরে."),
 write("Rewrite in the simple past.", cell("তুমি বই পড়েছ।", "tumi boi porechho."), cell("তুমি বই পড়লে।", "tumi boi porle."), None, "Root + -লে."),
 write("Rewrite in the present continuous.", cell("তিনি অফিস যাচ্ছিলেন।", "tini office jachchhilen."), cell("তিনি অফিস যাচ্ছেন।", "tini office jachchhen."), None, "Root + -ছেন."),
 write("Rewrite in the present perfect continuous.", cell("আমি দুই ঘণ্টা ধরে অপেক্ষা করছিলাম।", "ami dui ghonta dhore opekkha korchhilam."), cell("আমি দুই ঘণ্টা ধরে অপেক্ষা করছি।", "ami dui ghonta dhore opekkha korchhi."), None, "Present continuous + ধরে."),
]
r10 = [  # sentence combination
 write("Join: [She reached home] + [I had already cooked dinner]. Use the past perfect.", None, cell("সে বাড়ি পৌঁছানোর আগেই আমি রাতের খাবার রান্না করে ফেলেছিলাম।", "she bari pouchhanor agei ami rater khabar ranna kore phelechhilam."), "…আমি রান্না করে রেখেছিলাম।", "আগেই (already before) + past perfect."),
 write("Join: [He is studying] + [it has been two hours].", None, cell("সে দুই ঘণ্টা ধরে পড়ছে।", "she dui ghonta dhore porchhe."), None, "Present continuous + ধরে."),
 write("Join: [The phone rang] + [I was taking a bath].", None, cell("আমি যখন স্নান করছিলাম, তখন ফোন বাজল।", "ami jokhon snan korchhilam, tokhon phone bajlo."), None, "Past continuous for the long action, simple past for the sudden one."),
 write("Join: [I finish my work] + [I will rest]. (কাজ শেষ হলে …)", None, cell("কাজ শেষ হলে আমি বিশ্রাম নেব।", "kaj shesh hole ami bishram nebo."), None, "-লে means 'when / if': শেষ হলে."),
 write("Join: [She has been in Kolkata] + [five years].", None, cell("সে পাঁচ বছর ধরে কলকাতায় আছে।", "she panch bochhor dhore kolkatay achhe."), None, "Present + ধরে."),
 write("Join: [We reached the station] + [the train had already left].", None, cell("আমরা স্টেশনে পৌঁছানোর আগেই ট্রেন ছেড়ে চলে গিয়েছিল।", "amra stesone pouchhanor agei tren chhere chole giyechhilo."), None, "Past perfect for the earlier event."),
 write("Join: [He was sleeping] + [the guests arrived].", None, cell("সে যখন ঘুমাচ্ছিল, তখন অতিথিরা এল।", "she jokhon ghumachchhilo, tokhon atithira elo."), None, "যখন … তখন …: past continuous, then simple past."),
 write("Join: [I am learning Bengali] + [I moved here two years ago].", None, cell("আমি দুই বছর আগে এখানে এসেছি, তখন থেকে বাংলা শিখছি।", "ami dui bochhor age ekhane eshechhi, tokhon theke bangla shikhchhi."), "আমি দুই বছর ধরে বাংলা শিখছি।", "তখন থেকে (since then) + present continuous."),
]

ROUNDS = [
 dict(id="cues", title="Tense cues", mode="check", intro="Each sentence has a base form (the present). Change it for the person and tense in the cue. Pick the right sentence.", items=r1),
 dict(id="time-words", title="Time-word cues", mode="check", intro="Time words like এখন, গতকাল, আগামীকাল and রোজ decide the tense. Change the base sentence for the cue.", items=r2),
 dict(id="negatives", title="Negatives", mode="check", intro="Make the sentence negative. Remember: না after the verb for the present and future, -নি for the past.", items=r3),
 dict(id="spot", title="Spot the mistake", mode="check", intro="Read each sentence. If it is right, choose “Thik!”. If not, choose the fixed sentence. Some are correct.", items=r4),
 dict(id="fill", title="Fill the blank: tenant and landlord", mode="check", intro="Choose the correct form of the verb for the tense in brackets.", items=r5),
 dict(id="check", title="Check the sentence", mode="check", intro="Each sentence comes with its meaning. Decide if the tense and the verb ending are right. Most are, but not all.", items=r6),
 dict(id="translate", title="Translate: tenant and landlord", mode="write", intro="Translate into Bengali using the tense that fits the time clue. Write your answer on paper, then show the model answer and check yourself.", items=r7),
 dict(id="translate-hard", title="Translate: complex situations", mode="write", intro="These sentences pack in several time clues. Read carefully before choosing the tense. Write first, then check.", items=r8),
 dict(id="transform", title="Tense transformation", mode="write", intro="Rewrite each sentence in the tense named. Keep the meaning as close as you can.", items=r9),
 dict(id="combine", title="Sentence combination", mode="write", intro="Join the two actions into one sentence with the right connector (আগে, ধরে, যখন … তখন …) and tense.", items=r10),
]
for r in ROUNDS:
    assert r["items"], r["id"]
    for it in r["items"]:
        if it["kind"] == "choose": assert 0 <= it["answer"] < len(it["options"]) and len(it["options"]) >= 3, (r["id"], it["q"])
print("rounds:", len(ROUNDS), "| items:", sum(len(r["items"]) for r in ROUNDS))

hdr = '''// Tense workout. Generated by content-drafts/build_workout.py from the tense tables in build_grammar.py.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Cell } from "./grammar";

export type WorkItem =
  | { kind: "choose"; q: string; sentence: { bn: string; ro: string } | null; options: Cell[]; answer: number; why: string }
  | { kind: "write"; q: string; sentence: { bn: string; ro: string } | null; answer: { bn: string; ro: string }; also: string | null; why: string };
export type WorkRound = { id: string; title: string; mode: "check" | "write"; intro: string; items: WorkItem[] };

export const WORKOUT: WorkRound[] = '''
open("src/data/tense-workout.ts", "w").write(hdr + json.dumps(ROUNDS, ensure_ascii=False, indent=1) + ";\n")
json.dump(ROUNDS, open("content-drafts/tense-workout.json", "w"), ensure_ascii=False, indent=1)

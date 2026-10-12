"""Shared helpers for the grammar lessons: the verb engine, sentence builders, block and exercise constructors, checks.

Example sentences are assembled by SENT() from the verb engine, so verb forms always agree with the person and tense.
"""
import re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import io, contextlib
with contextlib.redirect_stdout(io.StringIO()):
    from lib_engine import *   # c, P, NOTE, TABLE, EX, Q, opts, PERSONS, ENDINGS, TENSES, regular, forms, fut_cont, VERBS, verb_table
from lib_engine import regular, forms, VERBS, TENSES, PERSONS, c, P, NOTE, TABLE, EX, opts, verb_table, ENDINGS

# ---------- more verbs ----------
def _v(bn, ro, en, root, inf, conj, cond, noun, f): return dict(bn=bn, ro=ro, en=en, root=root, inf=inf, conj=conj, cond=cond, noun=noun, f=f)
def _reg(bn, ro, en, stem, sro):
    return _v(bn, ro, en, (stem, sro), (stem + "তে", sro + "te"), (stem + "ে", sro + "e"), (stem + "লে", sro + "le"), (bn, ro), regular(stem, sro, stem + "তে", sro + "te"))
def _rows(stems):  # build the 8 irregular tenses from stem variants: (s_pres_i, s_pres_o, s_cont, s_perf, s_past, s_habit, s_fut) ...
    pass

VERBS["neoya"] = _v("নেওয়া", "neoya", "to take", ("নে", "ne"), ("নিতে", "nite"), ("নিয়ে", "niye"), ("নিলে", "nile"), ("নেওয়া", "neoya"), forms({
    "pres": [("নিই","nii"),("নিস","nis"),("নাও","nao"),("নেন","nen"),("নেয়","ney")],
    "cont": [("নিচ্ছি","nichchhi"),("নিচ্ছিস","nichchhis"),("নিচ্ছ","nichchho"),("নিচ্ছেন","nichchhen"),("নিচ্ছে","nichchhe")],
    "perf": [("নিয়েছি","niyechhi"),("নিয়েছিস","niyechhis"),("নিয়েছ","niyechho"),("নিয়েছেন","niyechhen"),("নিয়েছে","niyechhe")],
    "past": [("নিলাম","nilam"),("নিলি","nili"),("নিলে","nile"),("নিলেন","nilen"),("নিল","nilo")],
    "pastcont": [("নিচ্ছিলাম","nichchhilam"),("নিচ্ছিলি","nichchhili"),("নিচ্ছিলে","nichchhile"),("নিচ্ছিলেন","nichchhilen"),("নিচ্ছিল","nichchhilo")],
    "pastperf": [("নিয়েছিলাম","niyechhilam"),("নিয়েছিলি","niyechhili"),("নিয়েছিলে","niyechhile"),("নিয়েছিলেন","niyechhilen"),("নিয়েছিল","niyechhilo")],
    "habit": [("নিতাম","nitam"),("নিতিস","nitis"),("নিতে","nite"),("নিতেন","niten"),("নিত","nito")],
    "fut": [("নেব","nebo"),("নিবি","nibi"),("নেবে","nebe"),("নেবেন","neben"),("নেবে","nebe")],
}, "নিতে", "nite"))
VERBS["lekha"] = _v("লেখা", "lekha", "to write", ("লিখ", "likh"), ("লিখতে", "likhte"), ("লিখে", "likhe"), ("লিখলে", "likhle"), ("লেখা", "lekha"), forms({
    "pres": [("লিখি","likhi"),("লিখিস","likhis"),("লেখো","lekho"),("লেখেন","lekhen"),("লেখে","lekhe")],
    "cont": [("লিখছি","likhchhi"),("লিখছিস","likhchhis"),("লিখছ","likhchho"),("লিখছেন","likhchhen"),("লিখছে","likhchhe")],
    "perf": [("লিখেছি","likhechhi"),("লিখেছিস","likhechhis"),("লিখেছ","likhechho"),("লিখেছেন","likhechhen"),("লিখেছে","likhechhe")],
    "past": [("লিখলাম","likhlam"),("লিখলি","likhli"),("লিখলে","likhle"),("লিখলেন","likhlen"),("লিখল","likhlo")],
    "pastcont": [("লিখছিলাম","likhchhilam"),("লিখছিলি","likhchhili"),("লিখছিলে","likhchhile"),("লিখছিলেন","likhchhilen"),("লিখছিল","likhchhilo")],
    "pastperf": [("লিখেছিলাম","likhechhilam"),("লিখেছিলি","likhechhili"),("লিখেছিলে","likhechhile"),("লিখেছিলেন","likhechhilen"),("লিখেছিল","likhechhilo")],
    "habit": [("লিখতাম","likhtam"),("লিখতিস","likhtis"),("লিখতে","likhte"),("লিখতেন","likhten"),("লিখত","likhto")],
    "fut": [("লিখব","likhbo"),("লিখবি","likhbi"),("লিখবে","likhbe"),("লিখবেন","likhben"),("লিখবে","likhbe")],
}, "লিখতে", "likhte"))
VERBS["shona"] = _v("শোনা", "shona", "to hear / listen", ("শোন", "shon"), ("শুনতে", "shunte"), ("শুনে", "shune"), ("শুনলে", "shunle"), ("শোনা", "shona"), forms({
    "pres": [("শুনি","shuni"),("শুনিস","shunis"),("শোনো","shono"),("শোনেন","shonen"),("শোনে","shone")],
    "cont": [("শুনছি","shunchhi"),("শুনছিস","shunchhis"),("শুনছ","shunchho"),("শুনছেন","shunchhen"),("শুনছে","shunchhe")],
    "perf": [("শুনেছি","shunechhi"),("শুনেছিস","shunechhis"),("শুনেছ","shunechho"),("শুনেছেন","shunechhen"),("শুনেছে","shunechhe")],
    "past": [("শুনলাম","shunlam"),("শুনলি","shunli"),("শুনলে","shunle"),("শুনলেন","shunlen"),("শুনল","shunlo")],
    "pastcont": [("শুনছিলাম","shunchhilam"),("শুনছিলি","shunchhili"),("শুনছিলে","shunchhile"),("শুনছিলেন","shunchhilen"),("শুনছিল","shunchhilo")],
    "pastperf": [("শুনেছিলাম","shunechhilam"),("শুনেছিলি","shunechhili"),("শুনেছিলে","shunechhile"),("শুনেছিলেন","shunechhilen"),("শুনেছিল","shunechhilo")],
    "habit": [("শুনতাম","shuntam"),("শুনতিস","shuntis"),("শুনতে","shunte"),("শুনতেন","shunten"),("শুনত","shunto")],
    "fut": [("শুনব","shunbo"),("শুনবি","shunbi"),("শুনবে","shunbe"),("শুনবেন","shunben"),("শুনবে","shunbe")],
}, "শুনতে", "shunte"))
VERBS["ghumano"] = _v("ঘুমানো", "ghumano", "to sleep", ("ঘুমা", "ghuma"), ("ঘুমাতে", "ghumate"), ("ঘুমিয়ে", "ghumiye"), ("ঘুমালে", "ghumale"), ("ঘুমানো", "ghumano"), forms({
    "pres": [("ঘুমাই","ghumai"),("ঘুমাস","ghumas"),("ঘুমাও","ghumao"),("ঘুমান","ghuman"),("ঘুমায়","ghumay")],
    "cont": [("ঘুমাচ্ছি","ghumachchhi"),("ঘুমাচ্ছিস","ghumachchhis"),("ঘুমাচ্ছ","ghumachchho"),("ঘুমাচ্ছেন","ghumachchhen"),("ঘুমাচ্ছে","ghumachchhe")],
    "perf": [("ঘুমিয়েছি","ghumiyechhi"),("ঘুমিয়েছিস","ghumiyechhis"),("ঘুমিয়েছ","ghumiyechho"),("ঘুমিয়েছেন","ghumiyechhen"),("ঘুমিয়েছে","ghumiyechhe")],
    "past": [("ঘুমালাম","ghumalam"),("ঘুমালি","ghumali"),("ঘুমালে","ghumale"),("ঘুমালেন","ghumalen"),("ঘুমাল","ghumalo")],
    "pastcont": [("ঘুমাচ্ছিলাম","ghumachchhilam"),("ঘুমাচ্ছিলি","ghumachchhili"),("ঘুমাচ্ছিলে","ghumachchhile"),("ঘুমাচ্ছিলেন","ghumachchhilen"),("ঘুমাচ্ছিল","ghumachchhilo")],
    "pastperf": [("ঘুমিয়েছিলাম","ghumiyechhilam"),("ঘুমিয়েছিলি","ghumiyechhili"),("ঘুমিয়েছিলে","ghumiyechhile"),("ঘুমিয়েছিলেন","ghumiyechhilen"),("ঘুমিয়েছিল","ghumiyechhilo")],
    "habit": [("ঘুমাতাম","ghumatam"),("ঘুমাতিস","ghumatis"),("ঘুমাতে","ghumate"),("ঘুমাতেন","ghumaten"),("ঘুমাত","ghumato")],
    "fut": [("ঘুমাব","ghumabo"),("ঘুমাবি","ghumabi"),("ঘুমাবে","ghumabe"),("ঘুমাবেন","ghumaben"),("ঘুমাবে","ghumabe")],
}, "ঘুমাতে", "ghumate"))
for key, (bn, ro, en, stem, sro) in {
    "pora": ("পড়া", "pora", "to read / study", "পড়", "por"), "chola": ("চলা", "chola", "to move / go along", "চল", "chol"),
    "thaka": ("থাকা", "thaka", "to stay / live", "থাক", "thak"), "bosha": ("বসা", "bosha", "to sit", "বস", "bosh"),
    "khela": ("খেলা", "khela", "to play", "খেল", "khel"), "hata": ("হাঁটা", "hata", "to walk", "হাঁট", "hat"),
    "dhora": ("ধরা", "dhora", "to hold / catch", "ধর", "dhor"), "rakha": ("রাখা", "rakha", "to put / keep", "রাখ", "rakh"),
}.items():
    VERBS[key] = _reg(bn, ro, en, stem, sro)
# regular verbs must agree with the endings table
assert VERBS["pora"]["f"]["pres"][2]["bn"] == "পড়ো" and VERBS["hata"]["f"]["past"][0]["ro"] == "hatlam"

# ---------- pronouns, nouns and words ----------
PRON = {  # key -> (bn, roman, person index into the 5-person tables)
 "ami": ("আমি", "ami", 0), "amra": ("আমরা", "amra", 0), "tui": ("তুই", "tui", 1), "tora": ("তোরা", "tora", 1),
 "tumi": ("তুমি", "tumi", 2), "tomra": ("তোমরা", "tomra", 2), "apni": ("আপনি", "apni", 3), "apnara": ("আপনারা", "apnara", 3),
 "tini": ("তিনি", "tini", 3), "tanra": ("তাঁরা", "tanra", 3), "uni": ("উনি", "uni", 3), "se": ("সে", "she", 4), "tara": ("তারা", "tara", 4),
 "e": ("এ", "e", 4), "o": ("ও", "o", 4), "era": ("এরা", "era", 4), "ora": ("ওরা", "ora", 4), "ini": ("ইনি", "ini", 3),
}
# nouns as subjects: (bn, roman, person index); elders and respected people take the respectful verb (index 3)
MA = ("মা", "ma", 3); BABA = ("বাবা", "baba", 3); DADA = ("দাদা", "dada", 3); DIDI = ("দিদি", "didi", 3); BHAI = ("ভাই", "bhai", 4); BON = ("বোন", "bon", 4)
SHIKKHOK = ("শিক্ষক", "shikkhok", 3); DAKTAR = ("ডাক্তার", "daktar", 3); BONDHU = ("বন্ধু", "bondhu", 4); KUKUR = ("কুকুর", "kukur", 4)
BIRAL = ("বিড়াল", "biral", 4); PAKHI = ("পাখি", "pakhi", 4); SHISHU = ("শিশুটি", "shishuti", 4); CHHELEGULO = ("ছেলেরা", "chhelera", 4)
THAKUMA = ("ঠাকুমা", "thakuma", 3); DADU = ("দাদু", "dadu", 3); RAHUL = ("রাহুল", "rahul", 4); ANITA = ("অনিতা", "anita", 4); MAMA = ("মামা", "mama", 3)
CHHATRA = ("ছাত্ররা", "chhatrora", 4); GORU = ("গরু", "goru", 4)
# objects, places, time words: (bn, roman)
BHAT = ("ভাত", "bhat"); RUTI = ("রুটি", "ruti"); JOL = ("জল", "jol"); CHA = ("চা", "cha"); BOI = ("বই", "boi"); CHITHI = ("চিঠি", "chithi")
GAN = ("গান", "gan"); GOLPO = ("গল্প", "golpo"); CHHOBI = ("ছবি", "chhobi"); AM = ("আম", "am"); MACH = ("মাছ", "mach"); DUDH = ("দুধ", "dudh")
KHOBOR = ("খবর", "khobor"); KAJ = ("কাজ", "kaj"); BANGLA = ("বাংলা", "bangla"); GHAS = ("ঘাস", "ghas"); PHUL = ("ফুল", "phul"); MISHTI = ("মিষ্টি", "mishti")
BAJARE = ("বাজারে", "bajare"); SKULE = ("স্কুলে", "skule"); OFISE = ("অফিসে", "ofise"); BARITE = ("বাড়িতে", "barite"); PARKE = ("পার্কে", "parke")
KOLKATAY = ("কলকাতায়", "kolkatay"); BARI = ("বাড়ি", "bari"); KOLEJE = ("কলেজে", "koleje"); HASPATALE = ("হাসপাতালে", "haspatale"); MATHE = ("মাঠে", "mathe")
ROJ = ("রোজ", "roj"); EKHON = ("এখন", "ekhon"); AJ = ("আজ", "aj"); KAL = ("কাল", "kal"); GOTOKAL = ("গতকাল", "gotokal"); AGAMIKAL = ("আগামীকাল", "agamikal")
SHOKALE = ("সকালে", "shokale"); RATE = ("রাতে", "rate"); BIKELE = ("বিকেলে", "bikele"); PROTIDIN = ("প্রতিদিন", "protidin"); AGE = ("আগে", "age"); TOKHON = ("তখন", "tokhon")
KHUB = ("খুব", "khub"); ASTE = ("আস্তে", "aste"); TARATARI = ("তাড়াতাড়ি", "taratari"); EKTU = ("একটু", "ektu"); EIMATRO = ("এইমাত্র", "eimatro")
BHALO = ("ভালো", "bhalo"); SHOBSHOMOY = ("সবসময়", "shobshomoy"); MAJHEMAJHE = ("মাঝে মাঝে", "majhe majhe"); KOKHONO = ("কখনো", "kokhono")

_BN = re.compile(r"[ঀ-৿]")
_RO = re.compile(r"^[a-z-][a-z .?!',;:→…-]*$")

def subj(s): return PRON[s] if isinstance(s, str) else s
def vform(verb, tense, idx):
    f = VERBS[verb]["f"][tense][idx]; return f["bn"], f["ro"]
def nform(verb, tense, idx):
    """negative form: 'not' follows the verb; the past and perfect take -নি joined to the present form"""
    if tense == "pastperf": raise ValueError("no automatic negative for the past perfect")
    if tense in ("past", "perf"):
        b, r = vform(verb, "pres", idx); return b + "নি", r + "ni"
    b, r = vform(verb, tense, idx); return b + " না", r + " na"

def SENT(subject, parts, verb, tense, en, neg=False, q=False):
    """Build one example sentence (bn, roman, english). parts are (bn, roman) pairs placed between subject and verb."""
    s = subj(subject)
    vb, vr = (nform if neg else vform)(verb, tense, s[2])
    end_b, end_r = ("?", "?") if q else ("।", ".")
    bn = " ".join([s[0]] + [p[0] for p in parts] + [vb]) + end_b
    ro = " ".join([s[1]] + [p[1] for p in parts] + [vr]) + end_r
    return (bn, ro, en)

def check_item(it, where=""):
    bn, ro = it[0], it[1]
    assert _BN.search(bn), (where, it)
    assert _RO.match(ro), (where, "romanization", it)
    return it

# ---------- blocks ----------
def H(text): return {"t": "h", "text": text}
def LIST(items, ordered=False, title=None): return {"t": "list", "title": title, "ordered": ordered, "items": items}
def RULE(title, text, items=None): return {"t": "rule", "title": title, "text": text, "items": [check_item(i, title) for i in (items or [])]}
def MISTAKES(items, title="Common mistakes"):
    """items: (wrong (bn, ro), right (bn, ro), why)"""
    for w, r, _ in items: check_item(w, title); check_item(r, title)
    return {"t": "mistakes", "title": title, "items": [[w[0], w[1], r[0], r[1], why] for w, r, why in items]}
def EXS(items, title=None):
    for it in items: check_item(it, title or "ex")
    return {"t": "ex", "title": title, "items": [list(i[:3]) for i in items]}

# ---------- exercises ----------
def _ex(kind, inst, q, options, answer, why, sentence=None):
    assert 0 <= answer < len(options), (q, answer)
    txt = [o["bn"] if isinstance(o, dict) else o for o in options]
    assert len(set(txt)) == len(txt), ("duplicate options", q, txt)
    for o in options:
        if isinstance(o, dict): check_item((o["bn"], o["ro"]), q)
    return {"kind": kind, "inst": inst, "q": q, "sentence": sentence, "options": options, "answer": answer, "why": why}
def PICK(q, options, answer, why, inst="Read the question and choose the correct answer.", sentence=None):
    return _ex("pick", inst, q, options, answer, why, sentence)
def FILL(bn, ro, options, answer, why, inst="Choose the word that completes the sentence."):
    assert "___" in bn and "___" in ro, (bn, ro)
    return _ex("fill", inst, "Which word fills the blank?", options, answer, why, c(bn, ro))
def MEAN(en, options, answer, why, inst="Choose the Bengali sentence that means the same as the English sentence."):
    return _ex("meaning", inst, en, options, answer, why)
def SPOT(options, answer, why, inst="Only one sentence is correct. Choose it."):
    return _ex("spot", inst, "Which sentence is correct?", options, answer, why)
def TURN(bn, ro, options, answer, why, inst):
    return _ex("change", inst, "Change the sentence.", options, answer, why, c(bn, ro))

def O(*pairs): return [c(b, r) for b, r in pairs]
def OF(verb, tense_ids, idx):
    """options from verb forms: first is the correct one"""
    return [c(*vform(verb, t, idx)) for t in tense_ids]

def finish(topic):
    """validate a topic dict"""
    ids = [s["id"] for s in topic["sections"]]
    assert len(set(ids)) == len(ids), (topic["id"], "duplicate section ids")
    for s in topic["sections"]:
        for b in s["blocks"]:
            if b["t"] == "table":
                n = len(b["head"])
                for r in b["rows"]: assert len(r) == n, (topic["id"], s["id"], b.get("title"), len(r), n)
    return topic

# ---------- tense exercise helpers ----------
TENSE_EN = {t[0]: t[3] for t in TENSES}
TENSE_BN = {t[0]: (t[1], t[2]) for t in TENSES}
def blank_sentence(subject, parts, q=False):
    s = subj(subject)
    end_b, end_r = ("?", "?") if q else ("।", ".")
    return (" ".join([s[0]] + [p[0] for p in parts] + ["___"]) + end_b, " ".join([s[1]] + [p[1] for p in parts] + ["___"]) + end_r)
def TFILL(subject, parts, verb, tense, others, why, inst="Choose the verb form that fits the sentence.", q=False):
    """A fill-the-blank exercise whose options are the same verb in different tenses; the correct one is first."""
    s = subj(subject)
    ids = [tense] + [t for t in others if t != tense][:3]
    bn, ro = blank_sentence(subject, parts, q)
    return FILL(bn, ro, [c(*vform(verb, t, s[2])) for t in ids], 0, why, inst)
def TMEAN(subject, parts, verb, tense, en, wrong, why, neg=False, inst="Choose the Bengali sentence that means the same as the English sentence."):
    """meaning exercise: the correct sentence is built from the engine; wrong = list of (subject, parts, verb, tense) for distractors"""
    right = SENT(subject, parts, verb, tense, en, neg=neg)
    opts_ = [c(right[0], right[1])] + [c(*SENT(*w[:4], "x", neg=(w[4] if len(w) > 4 else False))[:2]) for w in wrong]
    return MEAN(en, opts_, 0, why, inst)

# more common words
KIQ = ("কি", "ki"); KI = ("কী", "ki"); AMAKE = ("আমাকে", "amake"); AGEI = ("আগেই", "agei"); EKBAR = ("একবার", "ekbar"); CHHOTO = ("ছোটবেলায়", "chhotobelay")

# Generates src/data/reading-lessons.ts from your vowel-sign table. Run from the repo root.
import json

def c(bn, ro): return {"bn": bn, "ro": ro}
def P(text): return {"t": "p", "text": text}
def NOTE(text): return {"t": "note", "text": text}
def TABLE(head, rows, title=None): return {"t": "table", "title": title, "head": head, "rows": rows}
def EX(items, title=None): return {"t": "ex", "title": title, "items": items}
def Q(q, options, answer, why, sentence=None): return {"q": q, "sentence": sentence, "options": options, "answer": answer, "why": why}
def opts(*pairs): return [c(b, r) for b, r in pairs]

# vowel letter, sign, kar name (bn, roman), roman sound used in the app, example word (bn, roman, meaning)
SIGNS = [
 ("অ", "",  None, None, "o",   ("কলম", "kolom", "pen")),
 ("আ", "া", ("আ-কার", "aa-kar"), None,                      "aa",  ("কাক", "kaak", "crow")),
 ("ই", "ি", ("ই-কার", "i-kar"), None,                       "i",   ("দিন", "din", "day")),
 ("ঈ", "ী", ("ঈ-কার", "ii-kar"), "দীর্ঘ ই-কার (dirgho i-kar)", "ii",  ("নদী", "nodi", "river")),
 ("উ", "ু", ("উ-কার", "u-kar"), None,                       "u",   ("ফুল", "phul", "flower")),
 ("ঊ", "ূ", ("ঊ-কার", "uu-kar"), "দীর্ঘ উ-কার (dirgho u-kar)", "uu",  ("ভূত", "bhut", "ghost")),
 ("ঋ", "ৃ", ("ঋ-কার", "ri-kar"), None,                      "ri",  ("কৃষ্ণ", "krishno", "Krishna")),
 ("এ", "ে", ("এ-কার", "e-kar"), None,                       "e",   ("দেশ", "desh", "country")),
 ("ঐ", "ৈ", ("ঐ-কার", "oi-kar"), None,                      "oi",  ("বৈষ্ণব", "boishnob", "Vaishnava")),
 ("ও", "ো", ("ও-কার", "o-kar"), None,                       "o",   ("গোবিন্দ", "gobindo", "Govinda")),
 ("ঔ", "ৌ", ("ঔ-কার", "ou-kar"), None,                      "ou",  ("নৌকা", "nouka", "boat")),
]
VOWEL_ROMAN = {"আ":"aa","ই":"i","ঈ":"ii","উ":"u","ঊ":"uu","ঋ":"ri","এ":"e","ঐ":"oi","ও":"o","ঔ":"ou","অ":"o"}

table_rows = []
for v, sign, kar, alt, sound, (w, wr, wm) in SIGNS:
    if sign == "":
        table_rows.append([c(v, "o"), "none (it is already there)", "—", c(w, wr), wm])
    else:
        name = kar[0] + (f" ({alt.split('(')[0].strip()})" if alt else "")
        table_rows.append([c(v, sound), c(sign, ""), c(kar[0], kar[1]), c(w, wr), wm])

# every sign on ক
on_ka = [[c(v, sound), c(("ক" + sign), "k" + (sound if sign else "o")), c(kar[0], kar[1]) if kar else "—"]
         for v, sign, kar, alt, sound, ex in SIGNS]
# fix romanization of ক + each sign for the app's scheme
ka_roman = {"": "ko", "া": "kaa", "ি": "ki", "ী": "kii", "ু": "ku", "ূ": "kuu", "ৃ": "kri", "ে": "ke", "ৈ": "koi", "ো": "ko", "ৌ": "kou"}
on_ka = [[c(v, sound), c("ক" + sign, ka_roman[sign]), (c(kar[0], kar[1]) if kar else "inherent: no sign")]
         for v, sign, kar, alt, sound, ex in SIGNS]

GRID_SIGNS = [("", "o", "অ (none)"), ("া", "aa", "া"), ("ি", "i", "ি"), ("ী", "ii", "ী"), ("ু", "u", "ু"), ("ূ", "uu", "ূ"), ("ে", "e", "ে"), ("ৈ", "oi", "ৈ"), ("ো", "o", "ো"), ("ৌ", "ou", "ৌ")]
GRID_LETTERS = [("ক","k"),("খ","kh"),("গ","g"),("চ","ch"),("ত","t"),("ন","n"),("প","p"),("ম","m")]
grid_rows = [[c(L, r)] + [c(L + s, r + sr) for s, sr, _ in GRID_SIGNS] for L, r in GRID_LETTERS]
grid_head = ["Letter"] + [h for _, _, h in GRID_SIGNS]

sections = [
 dict(id="what", title="What a vowel sign is", blocks=[
  P("Every Bengali consonant already carries a short vowel sound, the inherent অ (like the 'o' in 'cot'). So ক is not just 'k': it is 'ko'. When a word needs a different vowel, we attach a vowel sign to the consonant. Bengali calls these signs কার (kar), so আ-কার means 'the sign for আ'. For example, ক + া = কা (kaa)."),
  NOTE("People often say 'matra' for vowel signs, the way Hindi does. In Bengali the vowel signs are called কার (or স্বরচিহ্ন), and মাত্রা usually means the horizontal line on top of letters. Ask your teacher which word your class uses."),
  EX([("ক + া = কা","k + aa = kaa","ক with the আ-কার"),("ক + ি = কি","k + i = ki","ক with the ই-কার"),("ক + ো = কো","k + o = ko","ক with the ও-কার")], "Letter + sign = a new sound"),
 ]),
 dict(id="table", title="The 11 vowels and their signs", blocks=[
  P("There are 11 vowel letters. অ has no sign because it is already part of every consonant. The other ten each have a sign. The long ঈ and ঊ look different from ই and উ, but in modern Bengali they sound the same as the short ones."),
  TABLE(["Vowel", "Sign", "Called", "Example word", "Meaning"], table_rows),
  NOTE("The sign for ঋ (ৃ) is only used in words from Sanskrit, like কৃষ্ণ, কৃষক and মৃত. In modern Bengali its sound is 'ri'."),
 ]),
 dict(id="onka", title="Every sign on ক", blocks=[
  P("Here is the same consonant, ক, with each vowel. Read the consonant first, then add the vowel sound."),
  TABLE(["Vowel", "ক with the sign", "Sign called"], on_ka),
  NOTE("ও (the sign ো) is a closed 'o', like 'go'. The inherent অ is a rounder, shorter sound. Both are written 'o' in this app, but you will hear the difference in কলম (kolom) and গোরু (goru)."),
 ]),
 dict(id="where", title="Where the sign is written", blocks=[
  P("A vowel sign can sit before, after, below or around the consonant. Three signs are written to the left of the consonant, even though you say the consonant first: দিন is read d-i-n, not i-d-n."),
  TABLE(["Position", "Signs", "Example", "Read as"], [
    ["After (to the right)", c("া  ী","aa-kar, ii-kar"), c("কাক, নদী","kaak, nodi"), "consonant, then the vowel"],
    ["Below", c("ু  ূ  ৃ","u-kar, uu-kar, ri-kar"), c("ফুল, ভূত, কৃষক","phul, bhut, krishok"), "consonant, then the vowel"],
    ["Before (to the left)", c("ি  ে  ৈ","i-kar, e-kar, oi-kar"), c("দিন, দেশ, তৈরি","din, desh, toiri"), "the sign is written first, but read after the consonant"],
    ["Both sides", c("ো  ৌ","o-kar, ou-kar"), c("গোরু, নৌকা","goru, nouka"), "one part before and one part after the consonant"],
  ]),
  EX([("দিন","din","day: ি is written before দ but read after it"),("গোরু","goru","cow: ো wraps around গ"),("নৌকা","nouka","boat: ৌ wraps around ন, and া follows কা")]),
 ]),
 dict(id="chart", title="The sign chart", blocks=[
  P("This chart shows eight consonants with the inherent vowel and nine signs. Read across a row to hear one consonant with every vowel. Scroll sideways on a small screen."),
  TABLE(grid_head, grid_rows),
  NOTE("ঋ-কার is left out because it only appears in a few Sanskrit words."),
 ]),
 dict(id="full", title="Letter or sign?", blocks=[
  P("A vowel letter (আ, ই, উ…) is written in full at the start of a word, or after another vowel. After a consonant, the same vowel is written as a sign."),
  TABLE(["", "Vowel letter (full)", "Vowel sign (after a consonant)"], [
    ["আ", c("আম (mango)","aam"), c("কাক (crow)","kaak")],
    ["ই", c("ইলিশ (hilsa fish)","ilish"), c("দিন (day)","din")],
    ["উ", c("উট (camel)","ut"), c("ফুল (flower)","phul")],
    ["এ", c("এক (one)","ek"), c("দেশ (country)","desh")],
    ["ও", c("ওল (yam)","ol"), c("গোরু (cow)","goru")],
  ]),
 ]),
 dict(id="words", title="Words to read", blocks=[
  P("Read each word one letter at a time: the consonant, then its sign. The meaning is under the word."),
  EX([("মা","ma","mother (া)"),("ভাত","bhat","rice (া)"),("চিনি","chini","sugar (ি)"),("দিদি","didi","elder sister (ি)")], "Signs after and before the consonant"),
  EX([("দীপ","dip","lamp (ী)"),("চুল","chul","hair (ু)"),("দুধ","dudh","milk (ু)"),("দূর","dur","far (ূ)")], "Long signs and signs below"),
  EX([("তেল","tel","oil (ে)"),("ভেড়া","bhera","sheep (ে)"),("খৈ","khoi","puffed rice (ৈ)"),("বৈশাখ","boishakh","a Bengali month (ৈ)")], "Signs before the consonant"),
  EX([("ঘোড়া","ghora","horse (ো)"),("ঢোল","dhol","drum (ো)"),("মৌমাছি","moumachhi","bee (ৌ)"),("কৃষক","krishok","farmer (ৃ)")], "Signs around and below"),
 ]),
]

exercises = [
 Q("What vowel sound does every consonant carry by default?", opts(("অ","o"),("আ","aa"),("ই","i")), 0, "The inherent vowel is অ, so ক is 'ko'."),
 Q("Which sign is the ই-কার?", opts(("ি","i"),("ী","ii"),("ু","u")), 0, "ি is the sign for ই."),
 Q("Which sign is the আ-কার?", opts(("া","aa"),("ে","e"),("ো","o")), 0, "া is the sign for আ."),
 Q("Put the letter and the sign together.", opts(("কা","kaa"),("কি","ki"),("কু","ku")), 0, "ক + া = কা.", c("ক + া = ?","k + aa = ?")),
 Q("Put the letter and the sign together.", opts(("কি","ki"),("কে","ke"),("কো","ko")), 0, "ক + ি = কি.", c("ক + ি = ?","k + i = ?")),
 Q("Put the letter and the sign together.", opts(("কে","ke"),("কৈ","koi"),("কা","kaa")), 0, "ক + ে = কে.", c("ক + ে = ?","k + e = ?")),
 Q("Which sign is in ফুল?", opts(("ু","u"),("ূ","uu"),("ো","o")), 0, "ফুল has the short উ-কার ু below ফ.", c("ফুল","phul")),
 Q("Which sign is in নদী?", opts(("ী","ii"),("ি","i"),("া","aa")), 0, "নদী ends with the long ঈ-কার ী.", c("নদী","nodi")),
 Q("Which sign is in দেশ?", opts(("ে","e"),("ৈ","oi"),("ো","o")), 0, "দেশ has the এ-কার ে.", c("দেশ","desh")),
 Q("Which two signs are in নৌকা?", opts(("ৌ and া","ou-kar and aa-kar"),("ো and া","o-kar and aa-kar"),("ৈ and ি","oi-kar and i-kar")), 0, "ৌ wraps around ন and া follows কা.", c("নৌকা","nouka")),
 Q("Which sign is written to the left of the consonant?", opts(("ি","i"),("া","aa"),("ু","u")), 0, "ি, ে and ৈ are written before the consonant."),
 Q("Which sign is written on both sides of the consonant?", opts(("ো","o"),("ে","e"),("ী","ii")), 0, "ো (and ৌ) have one part before and one part after."),
 Q("How do you read the word?", opts(("din","din"),("idn","idn"),("dni","dni")), 0, "ি is written first but read after দ: d-i-n.", c("দিন","din")),
 Q("How do you read the word?", opts(("kaak","kaak"),("kuk","kuk"),("kik","kik")), 0, "কা + ক = kaak (crow).", c("কাক","kaak")),
 Q("Which word means 'country'?", opts(("দেশ","desh"),("দিন","din"),("দুধ","dudh")), 0, "দেশ (desh) means country."),
 Q("Which is written as a full letter, not a sign?", opts(("আম","aam"),("কাক","kaak"),("মা","ma")), 0, "At the start of a word the vowel is a full letter: আম."),
 Q("How do you read ভূত?", opts(("bhut","bhut"),("bhat","bhat"),("bhit","bhit")), 0, "ভূ has the long ঊ-কার, read 'bhu': bhut (ghost).", c("ভূত","bhut")),
 Q("Which sign is in গোরু at the start?", opts(("ো","o"),("ে","e"),("ৌ","ou")), 0, "গো has the ও-কার ো wrapping around গ.", c("গোরু","goru")),
]
for q in exercises:
    assert 0 <= q["answer"] < len(q["options"])
    txt = [o["bn"] for o in q["options"]]
    assert len(set(txt)) == len(txt), (q["q"], txt)
for s in sections:
    for b in s["blocks"]:
        if b["t"] == "table":
            n = len(b["head"])
            for r in b["rows"]: assert len(r) == n, (s["id"], len(r), n)

topic = dict(id="matras", title=("কার", "Kar", "Vowel signs (matras)"),
 blurb="The signs that change a consonant's vowel: what each looks like, where it is written, and how to read it.",
 sections=sections, exercises=exercises)

SIGN_CHARS = set("ািীুূৃেৈোৌ")
def with_base(x):
    """Show a vowel sign that stands alone on a dotted circle, the usual way to print it."""
    if isinstance(x, str):
        out = []
        for i, ch in enumerate(x):
            if ch in SIGN_CHARS and (i == 0 or x[i - 1] in " ,/(+"):
                out.append("\u25cc")
            out.append(ch)
        return "".join(out)
    if isinstance(x, list): return [with_base(v) for v in x]
    if isinstance(x, dict): return {k: with_base(v) for k, v in x.items()}
    return x
topic = with_base(topic)

hdr = '''// Reading lessons (same shape as the grammar topics). Generated by content-drafts/build_matras.py.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { GrammarTopic } from "./grammar";

export const READING_LESSONS: GrammarTopic[] = '''
open("src/data/reading-lessons.ts", "w").write(hdr + json.dumps([topic], ensure_ascii=False, indent=1) + ";\n")
json.dump([topic], open("content-drafts/matras.json", "w"), ensure_ascii=False, indent=1)
print("sections:", len(sections), "| questions:", len(exercises))

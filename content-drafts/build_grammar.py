# Generates src/data/grammar.ts (app data) and content-drafts/grammar.md (review copy) from one source.
import json, sys

def c(bn, ro): return {"bn": bn, "ro": ro}
def P(text): return {"t": "p", "text": text}
def NOTE(text): return {"t": "note", "text": text}
def TABLE(head, rows, title=None): return {"t": "table", "title": title, "head": head, "rows": rows}
def EX(items, title=None): return {"t": "ex", "title": title, "items": items}
def Q(q, options, answer, why, sentence=None): return {"q": q, "sentence": sentence, "options": options, "answer": answer, "why": why}
def opts(*pairs): return [c(b, r) for b, r in pairs]

# ---------------- verb engine: regular verbs are generated from endings ----------------
PERSONS = [("আমি","ami"),("তুই","tui"),("তুমি","tumi"),("আপনি / তিনি","apni / tini"),("সে","she")]
ENDINGS = {  # tense id -> 5 (bn, ro) endings in person order
 "pres":      [("ি","i"),("িস","is"),("ো","o"),("েন","en"),("ে","e")],
 "cont":      [("ছি","chhi"),("ছিস","chhis"),("ছ","chho"),("ছেন","chhen"),("ছে","chhe")],
 "perf":      [("েছি","echhi"),("েছিস","echhis"),("েছ","echho"),("েছেন","echhen"),("েছে","echhe")],
 "past":      [("লাম","lam"),("লি","li"),("লে","le"),("লেন","len"),("ল","lo")],
 "pastcont":  [("ছিলাম","chhilam"),("ছিলি","chhili"),("ছিলে","chhile"),("ছিলেন","chhilen"),("ছিল","chhilo")],
 "pastperf":  [("েছিলাম","echhilam"),("েছিলি","echhili"),("েছিলে","echhile"),("েছিলেন","echhilen"),("েছিল","echhilo")],
 "habit":     [("তাম","tam"),("তিস","tis"),("তে","te"),("তেন","ten"),("ত","to")],
 "fut":       [("ব","bo"),("বি","bi"),("বে","be"),("বেন","ben"),("বে","be")],
}
TENSES = [  # id, Bengali name, roman, English
 ("pres","সাধারণ বর্তমান","sadharon bortoman","Simple present"),
 ("cont","ঘটমান বর্তমান","ghotoman bortoman","Present continuous"),
 ("perf","পুরাঘটিত বর্তমান","puraghotito bortoman","Present perfect"),
 ("past","সাধারণ অতীত","sadharon otit","Simple past"),
 ("pastcont","ঘটমান অতীত","ghotoman otit","Past continuous"),
 ("pastperf","পুরাঘটিত অতীত","puraghotito otit","Past perfect"),
 ("habit","নিত্যবৃত্ত অতীত","nityobritto otit","Past habitual"),
 ("fut","সাধারণ ভবিষ্যৎ","sadharon bhobishyot","Simple future"),
 ("futcont","ঘটমান ভবিষ্যৎ","ghotoman bhobishyot","Future continuous"),
]
def regular(stem_bn, stem_ro, inf_bn, inf_ro):
    out = {}
    for t, ends in ENDINGS.items():
        out[t] = [c(stem_bn + b, stem_ro + r) for b, r in ends]
    out["futcont"] = fut_cont(inf_bn, inf_ro)
    return out
def fut_cont(inf_bn, inf_ro):
    return [c(inf_bn + " থাক" + b, inf_ro + " thak" + r) for b, r in ENDINGS["fut"]]
def forms(rows, inf_bn, inf_ro):  # hand-entered irregular verbs: dict tense -> list of (bn, ro)
    out = {t: [c(b, r) for b, r in v] for t, v in rows.items()}
    out["futcont"] = fut_cont(inf_bn, inf_ro)
    return out

VERBS = {
 "kora": dict(bn="করা", ro="kora", en="to do", root=("কর","kor"), inf=("করতে","korte"), conj=("করে","kore"), cond=("করলে","korle"), noun=("করা","kora"),
              f=regular("কর","kor","করতে","korte")),
 "bola": dict(bn="বলা", ro="bola", en="to say / tell", root=("বল","bol"), inf=("বলতে","bolte"), conj=("বলে","bole"), cond=("বললে","bolle"), noun=("বলা","bola"),
              f=regular("বল","bol","বলতে","bolte")),
 "dekha": dict(bn="দেখা", ro="dekha", en="to see / look", root=("দেখ","dekh"), inf=("দেখতে","dekhte"), conj=("দেখে","dekhe"), cond=("দেখলে","dekhle"), noun=("দেখা","dekha"),
              f=regular("দেখ","dekh","দেখতে","dekhte")),
 "khaoya": dict(bn="খাওয়া", ro="khaoya", en="to eat", root=("খা","kha"), inf=("খেতে","khete"), conj=("খেয়ে","kheye"), cond=("খেলে","khele"), noun=("খাওয়া","khaoya"),
   f=forms({
    "pres":[("খাই","khai"),("খাস","khas"),("খাও","khao"),("খান","khan"),("খায়","khay")],
    "cont":[("খাচ্ছি","khachchhi"),("খাচ্ছিস","khachchhis"),("খাচ্ছ","khachchho"),("খাচ্ছেন","khachchhen"),("খাচ্ছে","khachchhe")],
    "perf":[("খেয়েছি","kheyechhi"),("খেয়েছিস","kheyechhis"),("খেয়েছ","kheyechho"),("খেয়েছেন","kheyechhen"),("খেয়েছে","kheyechhe")],
    "past":[("খেলাম","khelam"),("খেলি","kheli"),("খেলে","khele"),("খেলেন","khelen"),("খেল","khelo")],
    "pastcont":[("খাচ্ছিলাম","khachchhilam"),("খাচ্ছিলি","khachchhili"),("খাচ্ছিলে","khachchhile"),("খাচ্ছিলেন","khachchhilen"),("খাচ্ছিল","khachchhilo")],
    "pastperf":[("খেয়েছিলাম","kheyechhilam"),("খেয়েছিলি","kheyechhili"),("খেয়েছিলে","kheyechhile"),("খেয়েছিলেন","kheyechhilen"),("খেয়েছিল","kheyechhilo")],
    "habit":[("খেতাম","khetam"),("খেতিস","khetis"),("খেতে","khete"),("খেতেন","kheten"),("খেত","kheto")],
    "fut":[("খাব","khabo"),("খাবি","khabi"),("খাবে","khabe"),("খাবেন","khaben"),("খাবে","khabe")],
   },"খেতে","khete")),
 "jaoya": dict(bn="যাওয়া", ro="jaoya", en="to go", root=("যা","ja"), inf=("যেতে","jete"), conj=("গিয়ে","giye"), cond=("গেলে","gele"), noun=("যাওয়া","jaoya"),
   f=forms({
    "pres":[("যাই","jai"),("যাস","jas"),("যাও","jao"),("যান","jan"),("যায়","jay")],
    "cont":[("যাচ্ছি","jachchhi"),("যাচ্ছিস","jachchhis"),("যাচ্ছ","jachchho"),("যাচ্ছেন","jachchhen"),("যাচ্ছে","jachchhe")],
    "perf":[("গিয়েছি","giyechhi"),("গিয়েছিস","giyechhis"),("গিয়েছ","giyechho"),("গিয়েছেন","giyechhen"),("গিয়েছে","giyechhe")],
    "past":[("গেলাম","gelam"),("গেলি","geli"),("গেলে","gele"),("গেলেন","gelen"),("গেল","gelo")],
    "pastcont":[("যাচ্ছিলাম","jachchhilam"),("যাচ্ছিলি","jachchhili"),("যাচ্ছিলে","jachchhile"),("যাচ্ছিলেন","jachchhilen"),("যাচ্ছিল","jachchhilo")],
    "pastperf":[("গিয়েছিলাম","giyechhilam"),("গিয়েছিলি","giyechhili"),("গিয়েছিলে","giyechhile"),("গিয়েছিলেন","giyechhilen"),("গিয়েছিল","giyechhilo")],
    "habit":[("যেতাম","jetam"),("যেতিস","jetis"),("যেতে","jete"),("যেতেন","jeten"),("যেত","jeto")],
    "fut":[("যাব","jabo"),("যাবি","jabi"),("যাবে","jabe"),("যাবেন","jaben"),("যাবে","jabe")],
   },"যেতে","jete")),
 "deoya": dict(bn="দেওয়া", ro="deoya", en="to give", root=("দে","de"), inf=("দিতে","dite"), conj=("দিয়ে","diye"), cond=("দিলে","dile"), noun=("দেওয়া","deoya"),
   f=forms({
    "pres":[("দিই","dii"),("দিস","dis"),("দাও","dao"),("দেন","den"),("দেয়","dey")],
    "cont":[("দিচ্ছি","dichchhi"),("দিচ্ছিস","dichchhis"),("দিচ্ছ","dichchho"),("দিচ্ছেন","dichchhen"),("দিচ্ছে","dichchhe")],
    "perf":[("দিয়েছি","diyechhi"),("দিয়েছিস","diyechhis"),("দিয়েছ","diyechho"),("দিয়েছেন","diyechhen"),("দিয়েছে","diyechhe")],
    "past":[("দিলাম","dilam"),("দিলি","dili"),("দিলে","dile"),("দিলেন","dilen"),("দিল","dilo")],
    "pastcont":[("দিচ্ছিলাম","dichchhilam"),("দিচ্ছিলি","dichchhili"),("দিচ্ছিলে","dichchhile"),("দিচ্ছিলেন","dichchhilen"),("দিচ্ছিল","dichchhilo")],
    "pastperf":[("দিয়েছিলাম","diyechhilam"),("দিয়েছিলি","diyechhili"),("দিয়েছিলে","diyechhile"),("দিয়েছিলেন","diyechhilen"),("দিয়েছিল","diyechhilo")],
    "habit":[("দিতাম","ditam"),("দিতিস","ditis"),("দিতে","dite"),("দিতেন","diten"),("দিত","dito")],
    "fut":[("দেব","debo"),("দিবি","dibi"),("দেবে","debe"),("দেবেন","deben"),("দেবে","debe")],
   },"দিতে","dite")),
 "asha": dict(bn="আসা", ro="asha", en="to come", root=("আস","as"), inf=("আসতে","aste"), conj=("এসে","eshe"), cond=("এলে","ele"), noun=("আসা","asha"),
   f=forms({
    "pres":[("আসি","ashi"),("আসিস","ashis"),("আসো","asho"),("আসেন","ashen"),("আসে","ashe")],
    "cont":[("আসছি","aschhi"),("আসছিস","aschhis"),("আসছ","aschho"),("আসছেন","aschhen"),("আসছে","aschhe")],
    "perf":[("এসেছি","eshechhi"),("এসেছিস","eshechhis"),("এসেছ","eshechho"),("এসেছেন","eshechhen"),("এসেছে","eshechhe")],
    "past":[("এলাম","elam"),("এলি","eli"),("এলে","ele"),("এলেন","elen"),("এল","elo")],
    "pastcont":[("আসছিলাম","aschhilam"),("আসছিলি","aschhili"),("আসছিলে","aschhile"),("আসছিলেন","aschhilen"),("আসছিল","aschhilo")],
    "pastperf":[("এসেছিলাম","eshechhilam"),("এসেছিলি","eshechhili"),("এসেছিলে","eshechhile"),("এসেছিলেন","eshechhilen"),("এসেছিল","eshechhilo")],
    "habit":[("আসতাম","astam"),("আসতিস","astis"),("আসতে","aste"),("আসতেন","asten"),("আসত","asto")],
    "fut":[("আসব","asbo"),("আসবি","asbi"),("আসবে","asbe"),("আসবেন","asben"),("আসবে","asbe")],
   },"আসতে","aste")),
}
# consistency check: the regular generator must agree with a few known forms
assert VERBS["kora"]["f"]["cont"][0]["bn"] == "করছি" and VERBS["kora"]["f"]["past"][4]["bn"] == "করল"
assert VERBS["bola"]["f"]["past"][0]["ro"] == "bollam" and VERBS["dekha"]["f"]["perf"][2]["bn"] == "দেখেছ"
assert VERBS["kora"]["f"]["habit"][1]["ro"] == "kortis" and VERBS["kora"]["f"]["pres"][2]["bn"] == "করো"

def verb_table(key):
    v = VERBS[key]
    rows = []
    for tid, bn, ro, en in TENSES:
        rows.append([c(bn, ro)] + v["f"][tid])
    head = ["Tense"] + [f"{b}" for b, r in PERSONS]
    return TABLE(head, rows, f"{v['bn']} ({v['ro']}), {v['en']}")

T = []
# =====================================================================================
T.append(dict(id="purush", title=("পুরুষ", "Purush", "Person & pronouns"),
 blurb="Who is speaking, who is spoken to, who is spoken about, and the three levels of 'you'.",
 sections=[
  dict(id="persons", title="The three persons", blocks=[
   P("পুরুষ (purush) tells us who a sentence is about: the speaker, the person spoken to, or someone else. Bengali pronouns and verbs both change with the person."),
   TABLE(["Person", "Meaning", "Singular", "Plural"], [
     [c("উত্তম পুরুষ","uttom purush"), "1st person: the speaker", c("আমি","ami"), c("আমরা","amra")],
     [c("মধ্যম পুরুষ","moddhom purush"), "2nd person: the person spoken to", c("তুই / তুমি / আপনি","tui / tumi / apni"), c("তোরা / তোমরা / আপনারা","tora / tomra / apnara")],
     [c("নাম পুরুষ","nam purush"), "3rd person: the person spoken about", c("সে / তিনি","she / tini"), c("তারা / তাঁরা","tara / tanra")],
   ]),
   NOTE("Some books call the third person প্রথম পুরুষ (the first, in the Sanskrit order). Ask your teacher which labels your class uses. Bengali has no grammatical gender: সে means both 'he' and 'she'."),
   EX([("আমি স্কুলে যাই।","ami skule jai.","I go to school."),("তুমি স্কুলে যাও।","tumi skule jao.","You go to school."),("সে স্কুলে যায়।","she skule jay.","He / she goes to school.")], "The verb changes with the person"),
  ]),
  dict(id="levels", title="Three levels of 'you'", blocks=[
   P("Bengali has three words for 'you', and the verb ending changes with each. Choosing the right level shows respect."),
   TABLE(["Pronoun", "Level", "Used for", "Example"], [
     [c("তুই","tui"), "Very familiar", "Close friends, small children, people younger than you. Rude if used wrongly.", c("তুই কোথায় যাচ্ছিস?","tui kothay jachchhis?")],
     [c("তুমি","tumi"), "Familiar", "Friends, peers, younger relatives, people you know well.", c("তুমি কোথায় যাচ্ছ?","tumi kothay jachchho?")],
     [c("আপনি","apni"), "Respectful", "Elders, teachers, strangers, officials, polite situations.", c("আপনি কোথায় যাচ্ছেন?","apni kothay jachchhen?")],
   ]),
   NOTE("When unsure, use আপনি. It is never wrong. Move to তুমি when the other person invites you to."),
  ]),
  dict(id="third", title="He, she, they", blocks=[
   P("The third person also has an ordinary and a respectful form. The respectful form takes the same verb ending as আপনি. Words for 'this person' and 'that person' show near and far."),
   TABLE(["", "Ordinary", "Respectful", "Example"], [
     ["He / she (the person spoken about)", c("সে","she"), c("তিনি","tini"), c("তিনি স্কুলে যান।","tini skule jan.")],
     ["This person (near)", c("এ","e"), c("ইনি","ini"), c("ইনি আমার শিক্ষক।","ini amar shikkhok.")],
     ["That person (far)", c("ও","o"), c("উনি","uni"), c("উনি আমার মা।","uni amar ma.")],
   ]),
   EX([("সে স্কুলে যায়।","she skule jay.","He / she goes to school. (ordinary)"),("তিনি স্কুলে যান।","tini skule jan.","He / she goes to school. (respectful)"),("ওরা স্কুলে যায়।","ora skule jay.","They go to school.")]),
  ]),
  dict(id="forms", title="Pronoun forms", blocks=[
   P("Pronouns change form for the object (who receives the action) and for possession. The possessive ends in -র; the object ends in -কে. In the plural, one form (-দের) does both jobs."),
   TABLE(["Pronoun", "Subject", "Object (-কে)", "Possessive (-র)"], [
     ["I", c("আমি","ami"), c("আমাকে","amake"), c("আমার","amar")],
     ["you (very familiar)", c("তুই","tui"), c("তোকে","toke"), c("তোর","tor")],
     ["you (familiar)", c("তুমি","tumi"), c("তোমাকে","tomake"), c("তোমার","tomar")],
     ["you (respectful)", c("আপনি","apni"), c("আপনাকে","apnake"), c("আপনার","apnar")],
     ["he / she", c("সে","she"), c("তাকে","take"), c("তার","tar")],
     ["he / she (respectful)", c("তিনি","tini"), c("তাঁকে","tanke"), c("তাঁর","tanr")],
     ["we", c("আমরা","amra"), c("আমাদের","amader"), c("আমাদের","amader")],
     ["you all (familiar)", c("তোমরা","tomra"), c("তোমাদের","tomader"), c("তোমাদের","tomader")],
     ["you all (respectful)", c("আপনারা","apnara"), c("আপনাদের","apnader"), c("আপনাদের","apnader")],
     ["they", c("তারা","tara"), c("তাদের","tader"), c("তাদের","tader")],
     ["they (respectful)", c("তাঁরা","tanra"), c("তাঁদের","tander"), c("তাঁদের","tander")],
   ]),
   EX([("সে আমাকে দেখল।","she amake dekhlo.","He / she saw me."),("এটা আমার বই।","eta amar boi.","This is my book."),("আমি তোমাকে ডাকলাম।","ami tomake daklam.","I called you."),("এটা তোমাদের ঘর।","eta tomader ghor.","This is your (pl.) room.")]),
  ]),
 ],
 exercises=[
  Q("Which word do you use to address your teacher respectfully?", opts(("তুই","tui"),("তুমি","tumi"),("আপনি","apni")), 2, "আপনি is the respectful 'you'."),
  Q("Choose the pronoun that fits the verb.", opts(("তুই","tui"),("তুমি","tumi"),("আপনি","apni")), 1, "যাচ্ছ is the তুমি form of the verb.", c("___ কোথায় যাচ্ছ?","___ kothay jachchho?")),
  Q("Choose the right verb.", opts(("যাচ্ছ","jachchho"),("যাচ্ছেন","jachchhen"),("যাচ্ছিস","jachchhis")), 1, "আপনি takes the -েন ending: যাচ্ছেন.", c("আপনি কোথায় ___?","apni kothay ___?")),
  Q("Which word means 'my'?", opts(("আমার","amar"),("আমাকে","amake"),("আমরা","amra")), 0, "-র marks possession: আমার = my.", c("এটা ___ বই।","eta ___ boi.")),
  Q("Choose the form for 'saw him / her'.", opts(("সে","she"),("তাকে","take"),("তার","tar")), 1, "The object form of সে is তাকে.", c("আমি ___ দেখলাম।","ami ___ dekhlam.")),
  Q("Which means 'your' (familiar)?", opts(("তোমার","tomar"),("তোমাকে","tomake"),("তুমি","tumi")), 0, "তোমার is the possessive of তুমি.", c("এটা ___ বই।","eta ___ boi.")),
  Q("Which is the respectful 'he / she'?", opts(("সে","she"),("তিনি","tini"),("তারা","tara")), 1, "তিনি is the respectful third person."),
  Q("What is the plural of তুমি?", opts(("তোমরা","tomra"),("আমরা","amra"),("তারা","tara")), 0, "তুমি becomes তোমরা."),
  Q("The pronoun সে can mean:", ["only 'he'", "only 'she'", "'he' or 'she'"], 2, "Bengali pronouns do not show gender."),
  Q("Choose the right verb.", opts(("যায়","jay"),("যান","jan"),("যাই","jai")), 1, "তিনি (respectful) takes the -েন ending: যান.", c("তিনি স্কুলে ___।","tini skule ___.")),
 ]))

# =====================================================================================
nonfinite = TABLE(["Verb", "Root (ধাতু)", "-ে / -য়ে (and then)", "-তে (to do)", "-লে (if)", "-া (verbal noun)"],
  [[c(v["bn"], v["ro"]) + {} if False else c(v["bn"]+" ("+v["en"]+")", v["ro"]), c(*v["root"]), c(*v["conj"]), c(*v["inf"]), c(*v["cond"]), c(*v["noun"])] for v in
   [VERBS[k] for k in ("kora","bola","dekha","khaoya","jaoya","deoya","asha")]])
roots_rows = [  # dictionary form, roman, root (bn), root (roman), meaning
 ("করা","kora","কর","kor","to do"),("খাওয়া","khaoya","খা","kha","to eat"),("যাওয়া","jaoya","যা","ja","to go"),("আসা","asha","আস","as","to come"),
 ("দেওয়া","deoya","দে","de","to give"),("নেওয়া","neoya","নে","ne","to take"),("বলা","bola","বল","bol","to say"),("দেখা","dekha","দেখ","dekh","to see"),
 ("শোনা","shona","শোন","shon","to hear / listen"),("পড়া","pora","পড়","por","to read / study"),("লেখা","lekha","লিখ","likh","to write"),("থাকা","thaka","থাক","thak","to stay"),
 ("বসা","bosha","বস","bosh","to sit"),("পাওয়া","paoya","পা","pa","to get"),("হওয়া","hooya","হ","ho","to be / become"),("ওঠা","otha","ওঠ","oth","to rise / get up"),
]
T.append(dict(id="kriya", title=("ক্রিয়া", "Kriya", "Verbs"),
 blurb="Roots, the three forms of a verb, 'to be' and 'to have', commands, and verbs made with করা.",
 sections=[
  dict(id="roots", title="Roots", blocks=[
   P("The action word of a sentence is the ক্রিয়া (kriya). Every verb is built from a root (ধাতু, dhatu). We add endings to the root to show the person and time. The dictionary form of a verb is the verbal noun, which ends in -া, like করা."),
   TABLE(["Verb (dictionary form)", "Root", "Meaning"], [[c(a, b), c(rb, rr), en] for (a, b, rb, rr, en) in roots_rows]),
   NOTE("Two roots change: লেখা has the root লিখ- (likh-) in লিখি, and আসা gives এসে, এলাম. Irregular verbs are marked in the tables later."),
  ]),
  dict(id="finite", title="Finite and non-finite", blocks=[
   P("A finite verb (সমাপিকা ক্রিয়া) ends a sentence and carries the person and time: আমি ভাত খাই। A non-finite verb (অসমাপিকা ক্রিয়া) cannot end a sentence by itself. It does not show the person or time, and it joins the main verb."),
   nonfinite,
   EX([("ভাত খেয়ে সে স্কুলে গেল।","bhat kheye she skule gelo.","Having eaten rice, he / she went to school. (-ে: and then)"),
       ("আমি স্কুলে যেতে চাই।","ami skule jete chai.","I want to go to school. (-তে: to do)"),
       ("তুমি গেলে আমি যাব।","tumi gele ami jabo.","If you go, I will go. (-লে: if)"),
       ("পড়া ভালো।","pora bhalo.","Reading is good. (-া: verbal noun)")], "How they are used"),
  ]),
  dict(id="tobe", title="'To be' and 'to have'", blocks=[
   P("In the present tense, Bengali leaves out 'is / am / are' between a noun and what it describes: আমি ছাত্র। (I am a student.) Use আছি… when you mean exist, be present or stay. To say 'have', Bengali says 'of-me there is': আমার একটা বই আছে।"),
   TABLE(["", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"], [
     ["Present (to be there)", c("আছি","achhi"), c("আছিস","achhis"), c("আছ","achho"), c("আছেন","achhen"), c("আছে","achhe")],
     ["Past (was there)", c("ছিলাম","chhilam"), c("ছিলি","chhili"), c("ছিলে","chhile"), c("ছিলেন","chhilen"), c("ছিল","chhilo")],
   ]),
   EX([("আমি ছাত্র।","ami chhatro.","I am a student."),("সে ভালো।","she bhalo.","He / she is good."),("আমি বাড়িতে আছি।","ami barite achhi.","I am at home."),("আমার একটা বই আছে।","amar ekta boi achhe.","I have a book."),("আমি তখন বাড়িতে ছিলাম।","ami tokhon barite chhilam.","I was at home then.")]),
  ]),
  dict(id="commands", title="Commands", blocks=[
   P("A command (আদেশ) also changes with the level of 'you'. The তুই form is just the root. তুমি adds -ও / -ো. আপনি adds -ুন."),
   TABLE(["Verb", "তুই", "তুমি", "আপনি"], [
     [c("করা (do)","kora"), c("কর","kor"), c("করো","koro"), c("করুন","korun")],
     [c("বলা (say)","bola"), c("বল","bol"), c("বলো","bolo"), c("বলুন","bolun")],
     [c("দেখা (see)","dekha"), c("দেখ","dekh"), c("দেখো","dekho"), c("দেখুন","dekhun")],
     [c("খাওয়া (eat)","khaoya"), c("খা","kha"), c("খাও","khao"), c("খান","khan")],
     [c("যাওয়া (go)","jaoya"), c("যা","ja"), c("যাও","jao"), c("যান","jan")],
     [c("দেওয়া (give)","deoya"), c("দে","de"), c("দাও","dao"), c("দিন","din")],
     [c("আসা (come)","asha"), c("আয়","ay"), c("এসো","esho"), c("আসুন","ashun")],
   ]),
   EX([("এখানে এসো।","ekhane esho.","Come here. (to a friend)"),("দরজা বন্ধ করুন।","dorja bondho korun.","Please close the door. (respectful)"),("আমাকে জল দাও।","amake jol dao.","Give me water. (to a friend)")]),
  ]),
  dict(id="compound", title="Noun + করা / হওয়া", blocks=[
   P("Many everyday verbs are made from a noun plus করা (do), হওয়া (become) or পাওয়া (get). The first word gives the meaning. Only the second word changes with the person and time."),
   TABLE(["Verb", "Meaning", "Example"], [
     [c("রান্না করা","ranna kora"), "to cook", c("আমি রান্না করি।","ami ranna kori.")],
     [c("কাজ করা","kaj kora"), "to work", c("সে কাজ করে।","she kaj kore.")],
     [c("শুরু করা","shuru kora"), "to start", c("আমরা কাজ শুরু করলাম।","amra kaj shuru korlam.")],
     [c("বন্ধ করা","bondho kora"), "to close, to stop", c("দরজা বন্ধ করো।","dorja bondho koro.")],
     [c("খুশি হওয়া","khushi hooya"), "to be happy", c("আমি খুশি হলাম।","ami khushi holam.")],
     [c("ভয় পাওয়া","bhoy paoya"), "to be afraid", c("সে ভয় পেল।","she bhoy pelo.")],
   ]),
  ],),
 ],
 exercises=[
  Q("What is the root of খাওয়া?", opts(("খা","kha"),("খাও","khao"),("খেয়ে","kheye")), 0, "Remove the endings: the root of খাওয়া is খা."),
  Q("In this sentence, which word is the non-finite verb?", opts(("খেয়ে","kheye"),("সে","she"),("গেল","gelo")), 0, "খেয়ে (-ে form) joins the main verb; গেল is the finite verb.", c("ভাত খেয়ে সে স্কুলে গেল।","bhat kheye she skule gelo.")),
  Q("Choose the 'and then' form (-ে) of যাওয়া.", opts(("গিয়ে","giye"),("যেতে","jete"),("গেলে","gele")), 0, "গিয়ে means having gone."),
  Q("Choose the right form.", opts(("যেতে","jete"),("গিয়ে","giye"),("গেলে","gele")), 0, "'Want to go' uses the -তে form: যেতে চাই.", c("আমি স্কুলে ___ চাই।","ami skule ___ chai.")),
  Q("Choose the right form ('if you go').", opts(("গেলে","gele"),("গিয়ে","giye"),("যেতে","jete")), 0, "The -লে form means 'if': গেলে.", c("তুমি ___ আমি যাব।","tumi ___ ami jabo.")),
  Q("Command to a friend (তুমি): 'Tell me!'", opts(("বলো","bolo"),("বলুন","bolun"),("বল","bol")), 0, "তুমি commands end in -ও / -ো.", c("আমাকে ___!","amake ___!")),
  Q("Respectful command: give.", opts(("দাও","dao"),("দিন","din"),("দে","de")), 1, "The আপনি command is দিন.", c("আমাকে জল ___।","amake jol ___.")),
  Q("What is the dictionary form of খায়?", opts(("খাওয়া","khaoya"),("খাই","khai"),("খান","khan")), 0, "The dictionary form is the -া form: খাওয়া."),
  Q("How do you say 'I have a book'?", opts(("আছে","achhe"),("আছি","achhi"),("আছেন","achhen")), 0, "'Have' is expressed as 'there is' with আছে.", c("আমার একটা বই ___।","amar ekta boi ___.")),
  Q("How do you say 'I am a student'?", opts(("আমি ছাত্র।","ami chhatro."),("আমি ছাত্র আছি।","ami chhatro achhi."),("আমি ছাত্র হয়।","ami chhatro hoy.")), 0, "No verb is used for 'am' between a noun and a noun."),
 ]))

# =====================================================================================
def ending_table(ids, title):
    rows = []
    for tid, bn, ro, en in TENSES:
        if tid in ids:
            rows.append([c(bn, ro)] + [c("-" + b, "-" + r) for b, r in (ENDINGS[tid] if tid != "futcont" else ENDINGS["fut"])])
    return TABLE(["Tense"] + [b for b, r in PERSONS], rows, title)
def tense_table(verb, ids, title):
    v = VERBS[verb]
    rows = []
    for tid, bn, ro, en in TENSES:
        if tid in ids: rows.append([c(bn, ro)] + v["f"][tid])
    return TABLE(["Tense"] + [b for b, r in PERSONS], rows, title)

overview = [  # sentence per tense with খাওয়া, 'ami'
 ("সাধারণ বর্তমান","Simple present",("আমি ভাত খাই।","ami bhat khai."),"I eat rice."),
 ("ঘটমান বর্তমান","Present continuous",("আমি ভাত খাচ্ছি।","ami bhat khachchhi."),"I am eating rice."),
 ("পুরাঘটিত বর্তমান","Present perfect",("আমি ভাত খেয়েছি।","ami bhat kheyechhi."),"I have eaten rice."),
 ("সাধারণ অতীত","Simple past",("আমি ভাত খেলাম।","ami bhat khelam."),"I ate rice."),
 ("ঘটমান অতীত","Past continuous",("আমি ভাত খাচ্ছিলাম।","ami bhat khachchhilam."),"I was eating rice."),
 ("পুরাঘটিত অতীত","Past perfect",("আমি ভাত খেয়েছিলাম।","ami bhat kheyechhilam."),"I had eaten rice."),
 ("নিত্যবৃত্ত অতীত","Past habitual",("আমি রোজ ভাত খেতাম।","ami roj bhat khetam."),"I used to eat rice every day."),
 ("সাধারণ ভবিষ্যৎ","Simple future",("আমি ভাত খাব।","ami bhat khabo."),"I will eat rice."),
 ("ঘটমান ভবিষ্যৎ","Future continuous",("আমি ভাত খেতে থাকব।","ami bhat khete thakbo."),"I will be eating rice."),
]
tense_sections = [
  dict(id="overview", title="The tenses", blocks=[
   P("কাল (kal) means tense. There are three times: বর্তমান (present), অতীত (past) and ভবিষ্যৎ (future). Each time has kinds: সাধারণ (simple), ঘটমান (continuing), পুরাঘটিত (completed), and for the past also নিত্যবৃত্ত (habitual)."),
   TABLE(["Tense", "English", "Example", "Meaning"], [[c(b, {t[1]: t[2] for t in TENSES}[b]), e, c(*s), m] for b, e, s, m in overview]),
   NOTE("The future continuous (খেতে থাকব) is a textbook form. In everyday speech people more often use the simple future or say 'I will be doing' with খাচ্ছি."),
  ]),
  dict(id="endings", title="Endings", blocks=[
   P("Take the root (করা → কর-) and add the ending for the tense and the person. The ending shows the person; the verb does not change for singular or plural (ছেলেটা যায়, ছেলেরা যায়)."),
   ending_table(["pres","cont","perf"], "Present endings"),
   ending_table(["past","pastcont","pastperf","habit"], "Past endings"),
   ending_table(["fut"], "Future endings"),
   NOTE("Spelling varies: you may see করছো or করছ, করেছো or করেছ for তুমি. The sounds are the same."),
  ]),
  dict(id="kora", title="করা in full", blocks=[
   P("করা (to do) is regular, so it shows the pattern clearly. Read across a row to see one tense for every person; আপনি and তিনি share the same ending."),
   tense_table("kora", ["pres","cont","perf"], "করা: present"),
   tense_table("kora", ["past","pastcont","pastperf","habit"], "করা: past"),
   tense_table("kora", ["fut","futcont"], "করা: future"),
  ]),
  dict(id="verbs", title="More verbs", blocks=[
   P("Most verbs follow the same endings. A few change the root: খাওয়া, যাওয়া, দেওয়া and আসা change in some tenses. Learn those as they come."),
   tense_table("bola", [t[0] for t in TENSES], "বলা (bola), to say"),
   tense_table("dekha", [t[0] for t in TENSES], "দেখা (dekha), to see"),
   tense_table("khaoya", [t[0] for t in TENSES], "খাওয়া (khaoya), to eat"),
   tense_table("jaoya", [t[0] for t in TENSES], "যাওয়া (jaoya), to go"),
   tense_table("deoya", [t[0] for t in TENSES], "দেওয়া (deoya), to give"),
   tense_table("asha", [t[0] for t in TENSES], "আসা (asha), to come"),
   NOTE("যাওয়া changes its root: যা- in the present and future, গি- / গে- for completed and simple past, যে- in the habitual past."),
  ]),
  dict(id="link", title="'Has been doing' and linking words", blocks=[
   P("English has tenses like 'I have been living here for two years' and 'I had been waiting for an hour'. Bengali has no separate form for these. It uses the ordinary present or past continuous and adds a time word: ধরে (for), থেকে (since), আগে (before), যখন … তখন (when … then)."),
   TABLE(["English idea", "Bengali pattern", "Example"], [
     ["has / have been doing (for a time)", "present (or present continuous) + ধরে", c("আমি দু বছর ধরে এখানে থাকি।","ami du bochhor dhore ekhane thaki.")],
     ["has / have been doing (since a time)", "present continuous + থেকে", c("সে সকাল থেকে কাজ করছে।","she shokal theke kaj korchhe.")],
     ["had been doing (for a time)", "past continuous + ধরে", c("আমি এক ঘণ্টা ধরে অপেক্ষা করছিলাম।","ami ek ghonta dhore opekkha korchhilam.")],
     ["before / after", "verbal noun (-া) + র + আগে / পরে", c("খাওয়ার আগে হাত ধোও।","khaoyar age hat dhoo.")],
     ["when … then …", "যখন … তখন …", c("আমি যখন এলাম, তখন সে ঘুমাচ্ছিল।","ami jokhon elam, tokhon she ghumachchhilo.")],
   ]),
   NOTE("'Not yet' is এখনও … নি: আমি এখনও খাইনি (I have not eaten yet). 'Already' is ইতিমধ্যে or আগেই: সে ইতিমধ্যে চলে গিয়েছে."),
  ]),
  dict(id="use", title="Choosing the tense", blocks=[
   P("Time words help you choose. রোজ (every day) and সাধারণত (usually) go with the simple present. এখন (now) goes with the continuous. ইতিমধ্যে (already) goes with the perfect. গতকাল (yesterday) goes with the simple past. আগামীকাল (tomorrow) goes with the future."),
   NOTE("কাল (kal) means both 'yesterday' and 'tomorrow'. The verb tells you which: কাল আমি গেলাম (yesterday) and কাল আমি যাব (tomorrow). To be clear, say গতকাল (yesterday) or আগামীকাল (tomorrow)."),
   EX([("আমি রোজ সকালে চা খাই।","ami roj shokale cha khai.","I drink tea every morning."),
       ("আমি এখন পড়ছি।","ami ekhon porchhi.","I am studying now."),
       ("আমি ইতিমধ্যে খেয়েছি।","ami itimodhye kheyechhi.","I have already eaten."),
       ("গতকাল আমি বাজারে গেলাম।","gotokal ami bajare gelam.","Yesterday I went to the market."),
       ("ছোটবেলায় আমি রোজ মাঠে খেলতাম।","chhotobelay ami roj mathe kheltam.","When I was little I used to play in the field every day."),
       ("আগামীকাল আমি স্কুলে যাব।","agamikal ami skule jabo.","Tomorrow I will go to school.")]),
  ]),
]
T.append(dict(id="kal", title=("কাল", "Kal", "Tenses"),
 blurb="Present, past and future, and how to build every tense with the right ending for each person.",
 sections=tense_sections,
 exercises=[
  Q("Choose the right form.", opts(("খাই","khai"),("খাচ্ছি","khachchhi"),("খেলাম","khelam")), 0, "A daily habit uses the simple present.", c("আমি রোজ ভাত ___।","ami roj bhat ___.")),
  Q("Choose the right form.", opts(("খাই","khai"),("খাচ্ছি","khachchhi"),("খেলাম","khelam")), 1, "এখন (now) needs the present continuous.", c("আমি এখন ভাত ___।","ami ekhon bhat ___.")),
  Q("Choose the right form.", opts(("খাব","khabo"),("খেলাম","khelam"),("খাচ্ছি","khachchhi")), 1, "গতকাল (yesterday) is the past: খেলাম.", c("আমি গতকাল ভাত ___।","ami gotokal bhat ___.")),
  Q("Choose the right form.", opts(("যাব","jabo"),("গেলাম","gelam"),("যাচ্ছি","jachchhi")), 0, "আগামীকাল (tomorrow) needs the future: যাব.", c("আমি আগামীকাল স্কুলে ___।","ami agamikal skule ___.")),
  Q("Choose the right form for তুমি.", opts(("করছ","korchho"),("করেছ","korechho"),("করবে","korbe")), 0, "এখন (now) with তুমি: করছ.", c("তুমি এখন কী ___?","tumi ekhon ki ___?")),
  Q("Choose the right form ('I have already eaten').", opts(("খেয়েছি","kheyechhi"),("খেলাম","khelam"),("খাব","khabo")), 0, "ইতিমধ্যে (already) goes with the present perfect.", c("আমি ইতিমধ্যে ভাত ___।","ami itimodhye bhat ___.")),
  Q("Choose the right form ('used to play').", opts(("খেলতাম","kheltam"),("খেললাম","khellam"),("খেলব","khelbo")), 0, "A past habit uses the -তাম form.", c("ছোটবেলায় আমি রোজ মাঠে ___।","chhotobelay ami roj mathe ___.")),
  Q("Which tense is আমি খাচ্ছিলাম?", ["সাধারণ অতীত (simple past)", "ঘটমান অতীত (past continuous)", "ঘটমান বর্তমান (present continuous)"], 1, "-ছিলাম marks the past continuous: I was eating."),
  Q("Choose the right verb for আপনি (tomorrow).", opts(("যাবেন","jaben"),("যাবে","jabe"),("যাব","jabo")), 0, "আপনি takes -বেন in the future.", c("আপনি আগামীকাল কোথায় ___?","apni agamikal kothay ___?")),
  Q("Choose the right verb for তুই (past).", opts(("করলি","korli"),("করলে","korle"),("করলাম","korlam")), 0, "তুই takes -লি in the simple past.", c("তুই কী ___?","tui ki ___?")),
  Q("In কাল আমি স্কুলে যাব, 'কাল' means:", ["yesterday", "tomorrow"], 1, "The future verb যাব shows that কাল means 'tomorrow'."),
  Q("Choose the right form ('I was at home').", opts(("ছিলাম","chhilam"),("আছি","achhi"),("থাকব","thakbo")), 0, "Past of 'to be there': ছিলাম.", c("আমি তখন বাড়িতে ___।","ami tokhon barite ___.")),
 ]))

# =====================================================================================
T.append(dict(id="karak", title=("কারক", "Karak", "Case roles"),
 blurb="The job each noun does for the verb: who acts, what is acted on, with what, for whom, from where, where.",
 sections=[
  dict(id="six", title="The six karak", blocks=[
   P("কারক (karak) is the relationship between a noun and the verb. To find a noun's karak, ask the verb a question: Who does it? What is done? With what? To whom? From where? Where or when?"),
   TABLE(["Karak", "Ask the verb", "Marker", "Example"], [
     [c("কর্তৃকারক","kortrikarok"), "Who does it? (কে?)", "no ending", c("রাম বই পড়ে।","ram boi pore.")],
     [c("কর্মকারক","kormokarok"), "What / whom? (কী / কাকে?)", "-কে or none", c("রাম বই পড়ে।","ram boi pore.")],
     [c("করণকারক","koronkarok"), "With what? (কী দিয়ে?)", "দিয়ে, দ্বারা", c("সে কলম দিয়ে লেখে।","she kolom diye lekhe.")],
     [c("সম্প্রদানকারক","sompradankarok"), "To whom is it given? (কাকে?)", "-কে, জন্য", c("গরিবকে ভাত দাও।","goribke bhat dao.")],
     [c("অপাদানকারক","opadankarok"), "From where? (কোথা থেকে?)", "থেকে", c("গাছ থেকে ফল পড়ে।","gachh theke phol pore.")],
     [c("অধিকরণকারক","odhikoronkarok"), "Where / when? (কোথায় / কখন?)", "-এ, -তে, -য়", c("পাখি গাছে বসে।","pakhi gachhe boshe.")],
   ]),
  ]),
  dict(id="examples", title="Each karak in a sentence", blocks=[
   EX([("রাম ভাত খায়।","ram bhat khay.","Ram eats rice. রাম = কর্তা (who eats?)"),
       ("মা ছেলেকে ডাকলেন।","ma chheleke daklen.","Mother called the boy. ছেলেকে = কর্ম (whom?)"),
       ("সে কলম দিয়ে লেখে।","she kolom diye lekhe.","He / she writes with a pen. কলম দিয়ে = করণ (with what?)"),
       ("গরিবকে ভাত দাও।","goribke bhat dao.","Give rice to the poor person. গরিবকে = সম্প্রদান (to whom?)"),
       ("গাছ থেকে ফল পড়ে।","gachh theke phol pore.","Fruit falls from the tree. গাছ থেকে = অপাদান (from where?)"),
       ("পাখি গাছে বসে।","pakhi gachhe boshe.","The bird sits on the tree. গাছে = অধিকরণ (where?)"),
       ("সকালে আমি স্কুলে যাই।","shokale ami skule jai.","In the morning I go to school. সকালে = অধিকরণ (when?)")], "Find the karak by the question"),
   NOTE("-কে is used for both the object (কর্ম) and the one who receives (সম্প্রদান). Meaning decides: ছেলেকে ডাকলেন (called the boy) has the boy as the thing acted on. গরিবকে ভাত দাও has the poor person as the recipient of something given."),
  ]),
  dict(id="whole", title="All together", blocks=[
   P("One sentence can carry several karak at once. Each noun answers a different question to the verb."),
   EX([("রাম ঘরে বসে কলম দিয়ে বন্ধুকে চিঠি লেখে।","ram ghore boshe kolom diye bondhuke chithi lekhe.","Ram, sitting at home, writes a letter to a friend with a pen."),
       ("সে কলকাতা থেকে এসেছে।","she kolkata theke eshechhe.","He / she has come from Kolkata.")]),
   TABLE(["Word", "Karak", "Question it answers"], [
     [c("রাম","ram"), c("কর্তা","korta"), "Who writes?"],
     [c("ঘরে","ghore"), c("অধিকরণ","odhikoron"), "Where?"],
     [c("কলম দিয়ে","kolom diye"), c("করণ","koron"), "With what?"],
     [c("বন্ধুকে","bondhuke"), c("সম্প্রদান","sompradan"), "To whom?"],
     [c("চিঠি","chithi"), c("কর্ম","kormo"), "What is written?"],
   ]),
  ]),
  dict(id="notkarak", title="Not a karak", blocks=[
   P("Two kinds of word are not counted as a karak because they are not directly linked to the verb."),
   TABLE(["Name", "Job", "Example"], [
     [c("সম্বন্ধ পদ","sombondho pod"), "Shows that something belongs to something or someone. It ends in -র / -এর.", c("এটা আমার বই।","eta amar boi.")],
     [c("সম্বোধন পদ","sombodhon pod"), "Calls someone. It often has ও, হে, ওগো.", c("ও রাম, এদিকে এসো।","o ram, edike esho.")],
   ]),
   NOTE("Some books count the genitive (সম্বন্ধ) as a sixth karak. Most Bengali school grammar treats it as a separate relationship."),
  ]),
 ],
 exercises=[
  Q("Which karak is রাম?", ["কর্তা (who does)", "কর্ম (what is done)", "অধিকরণ (where)"], 0, "রাম does the reading.", c("রাম বই পড়ে।","ram boi pore.")),
  Q("Which karak is বই?", ["কর্তা", "কর্ম", "করণ"], 1, "বই is what is read, so it is the object.", c("রাম বই পড়ে।","ram boi pore.")),
  Q("Which karak is কলম দিয়ে?", ["করণ (with what)", "অপাদান", "সম্প্রদান"], 0, "It tells with what he / she writes.", c("সে কলম দিয়ে লেখে।","she kolom diye lekhe.")),
  Q("Which karak is গাছ থেকে?", ["অপাদান (from where)", "অধিকরণ", "করণ"], 0, "থেকে shows the starting place.", c("গাছ থেকে ফল পড়ে।","gachh theke phol pore.")),
  Q("Which karak is গাছে?", ["অধিকরণ (where)", "অপাদান", "কর্ম"], 0, "গাছে shows the place.", c("পাখি গাছে বসে।","pakhi gachhe boshe.")),
  Q("Which karak is গরিবকে?", ["সম্প্রদান (to whom)", "কর্তা", "অধিকরণ"], 0, "The poor person receives the rice.", c("গরিবকে ভাত দাও।","goribke bhat dao.")),
  Q("Which karak is ছেলেকে?", ["কর্ম (whom)", "সম্প্রদান", "কর্তা"], 0, "The boy is the one acted on (called).", c("মা ছেলেকে ডাকলেন।","ma chheleke daklen.")),
  Q("What is আমার here?", ["সম্বন্ধ পদ (belonging)", "কর্তা", "কর্ম"], 0, "আমার shows belonging and is not a karak.", c("এটা আমার বই।","eta amar boi.")),
  Q("What is রাম here?", ["সম্বোধন পদ (calling)", "কর্তা", "করণ"], 0, "It is used to call someone.", c("ও রাম, শোনো।","o ram, shono.")),
  Q("Which karak is সকালে?", ["অধিকরণ (when)", "কর্তা", "অপাদান"], 0, "Time words ending in -এ are অধিকরণ (time).", c("সকালে আমি স্কুলে যাই।","shokale ami skule jai.")),
  Q("Which question finds the object (কর্ম)?", ["কী বা কাকে? (what / whom)", "কে? (who)", "কোথায়? (where)"], 0, "Ask 'what / whom is done?'."),
  Q("Which karak is কলকাতা থেকে?", ["অপাদান (from where)", "অধিকরণ", "কর্তা"], 0, "থেকে shows where it started.", c("সে কলকাতা থেকে এসেছে।","she kolkata theke eshechhe.")),
 ]))

# =====================================================================================
T.append(dict(id="bibhakti", title=("বিভক্তি", "Bibhokti", "Case endings"),
 blurb="The seven endings and little words that mark a noun, and how they change with the last sound of the noun.",
 sections=[
  dict(id="seven", title="The seven bibhakti", blocks=[
   P("বিভক্তি (bibhokti) is the ending or marker added to a noun to show its karak. Karak is the job; bibhakti is the mark. Traditional grammar counts seven bibhakti."),
   TABLE(["Bibhakti", "Marker", "Usually shows", "Example"], [
     [c("প্রথমা (1st)","prothoma"), "no ending", "কর্তা (subject)", c("ছেলে যায়।","chhele jay.")],
     [c("দ্বিতীয়া (2nd)","ditiyo"), "-কে", "কর্ম (object)", c("ছেলেকে ডাকো।","chheleke dako.")],
     [c("তৃতীয়া (3rd)","tritiyo"), "দিয়ে, দ্বারা", "করণ (with what)", c("কলম দিয়ে লেখো।","kolom diye lekho.")],
     [c("চতুর্থী (4th)","choturthi"), "-কে, জন্য", "সম্প্রদান (for whom)", c("তোমার জন্য এনেছি।","tomar jonyo enechhi.")],
     [c("পঞ্চমী (5th)","pocchomi"), "থেকে, হতে", "অপাদান (from)", c("বাড়ি থেকে এসেছি।","bari theke eshechhi.")],
     [c("ষষ্ঠী (6th)","shoshthi"), "-র, -এর", "সম্বন্ধ (of)", c("বাড়ির দরজা","barir dorja")],
     [c("সপ্তমী (7th)","soptomi"), "-এ, -তে, -য়", "অধিকরণ (in, at, on)", c("ঘরে আছি।","ghore achhi.")],
   ]),
   NOTE("The same marker can serve two bibhakti (-কে is both 2nd and 4th). Meaning decides which one you have. Calling a person (ও রাম, হে ঈশ্বর) is the সম্বোধন, listed outside the seven."),
  ]),
  dict(id="genitive", title="Belonging: -র and -এর", blocks=[
   P("To say 'of' or 'belonging to', add -র after a vowel sound and -এর after a consonant."),
   TABLE(["Noun", "Ends in", "Of the noun"], [
     [c("ছেলে (boy)","chhele"), "vowel", c("ছেলের","chheler")],
     [c("বাড়ি (house)","bari"), "vowel", c("বাড়ির","barir")],
     [c("নদী (river)","nodi"), "vowel", c("নদীর","nodir")],
     [c("বন্ধু (friend)","bondhu"), "vowel", c("বন্ধুর","bondhur")],
     [c("মা (mother)","ma"), "vowel -া", c("মায়ের (also মার)","mayer (also mar)")],
     [c("ঘর (room)","ghor"), "consonant", c("ঘরের","ghorer")],
     [c("গাছ (tree)","gachh"), "consonant", c("গাছের","gachher")],
     [c("স্কুল (school)","skul"), "consonant", c("স্কুলের","skuler")],
     [c("কলম (pen)","kolom"), "consonant", c("কলমের","kolomer")],
   ]),
   EX([("এটা ছেলের বই।","eta chheler boi.","This is the boy's book."),("এটা বাড়ির দরজা।","eta barir dorja.","This is the door of the house."),("এটা গাছের ডাল।","eta gachher dal.","This is a branch of the tree.")]),
  ]),
  dict(id="locative", title="Place: -এ, -তে, -য়", blocks=[
   P("To say 'in', 'at' or 'on' a place or time, add -এ after a consonant, -তে after the vowels -ি and -ী / -ু, and -য় after -া."),
   TABLE(["Noun", "Ends in", "In / at the noun"], [
     [c("ঘর (room)","ghor"), "consonant", c("ঘরে","ghore")],
     [c("স্কুল (school)","skul"), "consonant", c("স্কুলে","skule")],
     [c("বাজার (market)","bajar"), "consonant", c("বাজারে","bajare")],
     [c("মাঠ (field)","math"), "consonant", c("মাঠে","mathe")],
     [c("বাড়ি (house)","bari"), "vowel -ি", c("বাড়িতে","barite")],
     [c("নদী (river)","nodi"), "vowel -ী", c("নদীতে","nodite")],
     [c("ঢাকা (Dhaka)","dhaka"), "-া", c("ঢাকায়","dhakay")],
     [c("কলকাতা (Kolkata)","kolkata"), "-া", c("কলকাতায়","kolkatay")],
     [c("রাস্তা (road)","rasta"), "-া", c("রাস্তায়","rastay")],
   ]),
   EX([("আমি বাড়িতে আছি।","ami barite achhi.","I am at home."),("সে স্কুলে পড়ে।","she skule pore.","He / she studies at school."),("আমরা কলকাতায় থাকি।","amra kolkatay thaki.","We live in Kolkata.")]),
  ]),
  dict(id="object", title="Objects: -কে or nothing", blocks=[
   P("Add -কে to a noun that names a person or an animal when it is the object: মাকে, বন্ধুকে, কুকুরকে. A thing you do something to usually takes no ending: আমি বই পড়ি, আমি ভাত খাই."),
   EX([("আমি মাকে ডাকলাম।","ami make daklam.","I called mother."),("সে বন্ধুকে চিঠি লিখল।","she bondhuke chithi likhlo.","He / she wrote a letter to a friend."),("আমি বই পড়ি।","ami boi pori.","I read a book. (no ending on বই)")]),
  ]),
  dict(id="postpos", title="Little words after the noun", blocks=[
   P("Bengali often uses small words after a noun instead of an ending. They are called অনুসর্গ (onushorgo), postpositions. Words like জন্য, সঙ্গে, মধ্যে, কাছে usually follow the -র form of the noun. থেকে, দিয়ে and পর্যন্ত follow the plain noun."),
   TABLE(["Word", "Meaning", "Example"], [
     [c("জন্য","jonyo"), "for", c("তোমার জন্য","tomar jonyo")],
     [c("সঙ্গে","songe"), "with (a person)", c("বন্ধুর সঙ্গে","bondhur songe")],
     [c("মধ্যে","moddhe"), "inside, among", c("ঘরের মধ্যে","ghorer moddhe")],
     [c("কাছে","kachhe"), "near, with (someone)", c("আমার কাছে","amar kachhe")],
     [c("থেকে","theke"), "from, since", c("স্কুল থেকে","skul theke")],
     [c("দিয়ে","diye"), "with, by means of", c("কলম দিয়ে","kolom diye")],
     [c("পর্যন্ত","porjonto"), "up to, until", c("সকাল পর্যন্ত","shokal porjonto")],
   ]),
  ]),
 ],
 exercises=[
  Q("Choose 'of the room'.", opts(("ঘরের","ghorer"),("ঘরে","ghore"),("ঘরকে","ghorke")), 0, "-এর marks belonging after a consonant.", c("এটা ___ দরজা।","eta ___ dorja.")),
  Q("Choose 'of the house'.", opts(("বাড়ির","barir"),("বাড়িতে","barite"),("বাড়িকে","barike")), 0, "-র marks belonging after a vowel.", c("এটা ___ দরজা।","eta ___ dorja.")),
  Q("Choose 'of mother'.", opts(("মায়ের","mayer"),("মাকে","make"),("মাতে","mate")), 0, "মা takes -য়ের in the genitive.", c("এটা ___ শাড়ি।","eta ___ shari.")),
  Q("Choose 'in the room'.", opts(("ঘরে","ghore"),("ঘরের","ghorer"),("ঘরতে","ghorte")), 0, "-এ shows place after a consonant.", c("আমি ___ আছি।","ami ___ achhi.")),
  Q("Choose 'at home'.", opts(("বাড়িতে","barite"),("বাড়ির","barir"),("বাড়িয়","bariy")), 0, "After -ি, the place ending is -তে.", c("আমি ___ আছি।","ami ___ achhi.")),
  Q("Choose 'in Dhaka'.", opts(("ঢাকায়","dhakay"),("ঢাকাতে","dhakate"),("ঢাকার","dhakar")), 0, "After -া, use -য়: ঢাকায়.", c("আমি ___ থাকি।","ami ___ thaki.")),
  Q("Choose the right form.", opts(("মাকে","make"),("মা","ma"),("মায়ের","mayer")), 0, "A person who is the object takes -কে.", c("আমি ___ ডাকলাম।","ami ___ daklam.")),
  Q("Choose the natural form.", opts(("বই","boi"),("বইকে","boike"),("বইয়ের","boier")), 0, "A thing that is read usually takes no ending.", c("আমি ___ পড়ি।","ami ___ pori.")),
  Q("Choose the right form.", opts(("বন্ধুর","bondhur"),("বন্ধু","bondhu"),("বন্ধুকে","bondhuke")), 0, "সঙ্গে follows the -র form.", c("___ সঙ্গে যাব।","___ songe jabo.")),
  Q("Choose the right word.", opts(("থেকে","theke"),("জন্য","jonyo"),("দিয়ে","diye")), 0, "থেকে means 'from'.", c("স্কুল ___ এসেছি।","skul ___ eshechhi.")),
  Q("Choose the right word.", opts(("দিয়ে","diye"),("থেকে","theke"),("পর্যন্ত","porjonto")), 0, "দিয়ে means 'with, by means of'.", c("কলম ___ লিখি।","kolom ___ likhi.")),
  Q("-কে is the ending of which bibhakti (the object)?", ["দ্বিতীয়া (2nd)", "ষষ্ঠী (6th)", "সপ্তমী (7th)"], 0, "-কে marks the object, the second bibhakti."),
  Q("Which bibhakti shows belonging (-র / -এর)?", ["ষষ্ঠী (6th)", "প্রথমা (1st)", "পঞ্চমী (5th)"], 0, "Belonging is the sixth bibhakti."),
 ]))

# =====================================================================================
T.append(dict(id="bachan", title=("বচন", "Bochon", "Number & counting words"),
 blurb="One or many: plural endings, and the little words used when counting people and things.",
 sections=[
  dict(id="plural", title="One and many", blocks=[
   P("বচন (bochon) is number: একবচন (one) and বহুবচন (many). Bengali often leaves the plural out when the meaning is clear. The verb does not change for number: ছেলেটা স্কুলে যায়, ছেলেরা স্কুলে যায়।"),
   TABLE(["Ending", "Used for", "Example", "Plural"], [
     ["-রা", "people and living beings", c("ছেলে (boy)","chhele"), c("ছেলেরা","chhelera")],
     ["-রা", "people and living beings", c("মেয়ে (girl)","meye"), c("মেয়েরা","meyera")],
     ["-গুলো / -গুলি", "things, or particular animals", c("বই (book)","boi"), c("বইগুলো","boigulo")],
     ["-গুলো / -গুলি", "things, or particular animals", c("গাছ (tree)","gachh"), c("গাছগুলো","gachhgulo")],
     ["-দের", "object / belonging of people", c("ছেলে (boy)","chhele"), c("ছেলেদের","chheleder")],
   ]),
   NOTE("Words like সব (all), অনেক (many) and numbers already say 'many', so the noun stays plain: অনেক ছেলে, সব বই, দুটো বই."),
   EX([("ছেলেরা মাঠে খেলছে।","chhelera mathe khelchhe.","The boys are playing in the field."),("বইগুলো টেবিলে আছে।","boigulo tebile achhe.","The books are on the table."),("আমি ছেলেদের ডাকলাম।","ami chheleder daklam.","I called the boys.")]),
  ]),
  dict(id="classifiers", title="Counting words", blocks=[
   P("When you count, Bengali adds a small word after the number: -টা / -টি for things, -জন for people. The noun itself does not take a plural ending."),
   TABLE(["Number", "Things", "People"], [
     ["1", c("একটা","ekta"), c("একজন","ekjon")],
     ["2", c("দুটো","duto"), c("দুজন","dujon")],
     ["3", c("তিনটে","tinte"), c("তিনজন","tinjon")],
     ["4", c("চারটে","charte"), c("চারজন","charjon")],
     ["5", c("পাঁচটা","panchta"), c("পাঁচজন","panchjon")],
   ]),
   EX([("আমার দুটো বই আছে।","amar duto boi achhe.","I have two books."),("ক্লাসে পাঁচজন ছাত্র আছে।","klase panchjon chhatro achhe.","There are five students in the class."),("আমি একটা কলম কিনলাম।","ami ekta kolom kinlam.","I bought a pen.")]),
   NOTE("-টি is the more formal form of -টা: একটি বই. Do not add -গুলো after a number: say দুটো বই, not দুটো বইগুলো."),
  ]),
  dict(id="definite", title="'A' and 'the'", blocks=[
   P("Bengali has no word for 'a' or 'the'. Instead: a plain noun is general, a number + -টা means 'one', and the noun + -টা means 'the particular one'."),
   TABLE(["Form", "Meaning", "Example"], [
     [c("বই","boi"), "book, books (general)", c("আমি বই পড়ি।","ami boi pori.")],
     [c("একটা বই","ekta boi"), "a book, one book", c("আমি একটা বই কিনেছি।","ami ekta boi kinechhi.")],
     [c("বইটা","boita"), "the book (that one)", c("বইটা ভালো।","boita bhalo.")],
     [c("বইগুলো","boigulo"), "the books (those)", c("বইগুলো ভালো।","boigulo bhalo.")],
   ]),
  ]),
 ],
 exercises=[
  Q("What is the plural of ছেলে (people)?", opts(("ছেলেরা","chhelera"),("ছেলেগুলো","chhelegulo"),("ছেলেটা","chheleta")), 0, "People take -রা: ছেলেরা."),
  Q("Choose 'those books'.", opts(("বইগুলো","boigulo"),("বইরা","boira"),("বইটা","boita")), 0, "Things take -গুলো.", None),
  Q("How do you say 'three boys'?", opts(("তিনজন ছেলে","tinjon chhele"),("তিনটে ছেলে","tinte chhele"),("তিন ছেলেরা","tin chhelera")), 0, "Use -জন when counting people; no plural ending."),
  Q("How do you say 'two books'?", opts(("দুটো বই","duto boi"),("দুজন বই","dujon boi"),("দুটো বইগুলো","duto boigulo")), 0, "Use -টো (things) after two, and no plural ending."),
  Q("How do you say 'the book'?", opts(("বইটা","boita"),("বইরা","boira"),("একজন বই","ekjon boi")), 0, "Noun + -টা means 'the particular one'."),
  Q("Choose the right verb.", opts(("যায়","jay"),("যায়েন","jayen"),("যাই","jai")), 0, "The verb stays the same for one or many.", c("ছেলেটা স্কুলে যায়। ছেলেরা স্কুলে ___।","chheleta skule jay. chhelera skule ___.")),
  Q("Choose the right number word.", opts(("দুটো","duto"),("দুজন","dujon"),("দুগুলো","dugulo")), 0, "Pens are things: দুটো.", c("আমার ___ কলম আছে।","amar ___ kolom achhe.")),
  Q("Choose 'of the boys / the boys (object)'.", opts(("ছেলেদের","chheleder"),("ছেলেরা","chhelera"),("ছেলের","chheler")), 0, "-দের is the plural for object and belonging."),
  Q("How do you say 'five students'?", opts(("পাঁচজন ছাত্র","panchjon chhatro"),("পাঁচটা ছাত্র","panchta chhatro"),("পাঁচগুলো ছাত্র","panchgulo chhatro")), 0, "People: -জন."),
  Q("Which counting word is for people?", ["-টা", "-জন", "-গুলো"], 1, "-জন is for people."),
 ]))

# =====================================================================================
T.append(dict(id="nishedh", title=("নিষেধ ও প্রশ্ন", "Nishedh o Proshno", "Saying no, and asking"),
 blurb="Negative sentences, 'is not', 'there is none', and the question words you need every day.",
 sections=[
  dict(id="neg", title="Saying no", blocks=[
   P("To make a sentence negative, put না after the verb for the present and the future. For the past, add -নি to the verb."),
   TABLE(["", "Positive", "Negative"], [
     ["Present", c("আমি যাই।","ami jai."), c("আমি যাই না।","ami jai na.")],
     ["Present", c("সে ভাত খায়।","she bhat khay."), c("সে ভাত খায় না।","she bhat khay na.")],
     ["Future", c("আমি যাব।","ami jabo."), c("আমি যাব না।","ami jabo na.")],
     ["Past (-নি)", c("আমি গিয়েছি।","ami giyechhi."), c("আমি যাইনি।","ami jaini.")],
     ["Past (-নি)", c("সে খেয়েছে।","she kheyechhe."), c("সে খায়নি।","she khayni.")],
   ]),
   P("The -নি form is built on the present form of the verb for each person:"),
   TABLE(["Verb", "আমি", "তুমি", "আপনি"], [
     [c("করা","kora"), c("করিনি","korini"), c("করোনি","koroni"), c("করেননি","korenni")],
     [c("খাওয়া","khaoya"), c("খাইনি","khaini"), c("খাওনি","khaoni"), c("খাননি","khanni")],
     [c("যাওয়া","jaoya"), c("যাইনি","jaini"), c("যাওনি","jaoni"), c("যাননি","janni")],
   ]),
   NOTE("In a command, না comes after the verb too: যেও না (don't go), করো না (don't do)."),
  ]),
  dict(id="isnot", title="'Is not' and 'there is none'", blocks=[
   P("To say 'am / is / are not' between two nouns, use নই, নও, নন, নয়. To say something does not exist or you do not have it, use নেই."),
   TABLE(["", "আমি", "তুই / তুমি", "আপনি / তিনি", "সে"], [
     ["is not", c("নই","noi"), c("নস / নও","nos / nou"), c("নন","non"), c("নয়","noy")],
   ]),
   EX([("আমি ডাক্তার নই।","ami daktar noi.","I am not a doctor."),("তুমি ছাত্র নও।","tumi chhatro nou.","You are not a student."),("সে শিক্ষক নয়।","she shikkhok noy.","He / she is not a teacher."),("আমার কাছে টাকা নেই।","amar kachhe taka nei.","I have no money."),("বাড়িতে কেউ নেই।","barite keu nei.","There is nobody at home.")]),
  ]),
  dict(id="ask", title="Asking questions", blocks=[
   P("Question words usually come just before the verb. For a yes / no question, add কি (or কী) to the sentence, or just raise your voice at the end."),
   TABLE(["Question word", "Meaning", "Example"], [
     [c("কে","ke"), "who", c("ও কে?","o ke?")],
     [c("কী","ki"), "what", c("তুমি কী খাচ্ছ?","tumi ki khachchho?")],
     [c("কোথায়","kothay"), "where", c("তুমি কোথায় যাচ্ছ?","tumi kothay jachchho?")],
     [c("কখন","kokhon"), "when", c("তুমি কখন আসবে?","tumi kokhon asbe?")],
     [c("কেন","keno"), "why", c("তুমি কেন কাঁদছ?","tumi keno kadchho?")],
     [c("কীভাবে","kibhabe"), "how", c("এটা কীভাবে করব?","eta kibhabe korbo?")],
     [c("কত","koto"), "how much / how many", c("এটা কত টাকা?","eta koto taka?")],
     [c("কোন","kon"), "which", c("কোন বইটা?","kon boita?")],
     [c("কার","kar"), "whose", c("এটা কার বই?","eta kar boi?")],
     [c("কাকে","kake"), "whom", c("তুমি কাকে ডাকছ?","tumi kake dakchho?")],
   ]),
   EX([("তুমি কি যাবে?","tumi ki jabe?","Will you go? (yes / no)"),("আপনি কি বাংলা বলতে পারেন?","apni ki bangla bolte paren?","Can you speak Bengali?"),("তোমার নাম কী?","tomar nam ki?","What is your name?")]),
   NOTE("Word order is subject, object, verb (SOV): আমি ভাত খাই, 'I rice eat'. The verb comes last."),
  ]),
 ],
 exercises=[
  Q("Make this negative.", opts(("আমি ভাত খাই না।","ami bhat khai na."),("আমি ভাত না খাই।","ami bhat na khai."),("আমি না ভাত খাই।","ami na bhat khai.")), 0, "না comes after the verb: খাই না.", c("আমি ভাত খাই।","ami bhat khai.")),
  Q("Make this negative (past).", opts(("আমি যাইনি।","ami jaini."),("আমি যাই না।","ami jai na."),("আমি যাব না।","ami jabo na.")), 0, "The past negative adds -নি to the present form: যাইনি.", c("আমি গিয়েছি।","ami giyechhi.")),
  Q("Choose the right word.", opts(("নই","noi"),("নও","nou"),("নয়","noy")), 0, "'I am not' is আমি … নই.", c("আমি ছাত্র ___।","ami chhatro ___.")),
  Q("Choose the right word.", opts(("নও","nou"),("নই","noi"),("নন","non")), 0, "'You (তুমি) are not' is তুমি … নও.", c("তুমি ছাত্র ___।","tumi chhatro ___.")),
  Q("Choose the right word.", opts(("নয়","noy"),("নই","noi"),("নও","nou")), 0, "'He / she is not' is সে … নয়.", c("সে ডাক্তার ___।","she daktar ___.")),
  Q("Choose the right word ('I have no money').", opts(("নেই","nei"),("নয়","noy"),("না","na")), 0, "'There is none / do not have' is নেই.", c("আমার কাছে টাকা ___।","amar kachhe taka ___.")),
  Q("Choose the question word for 'where'.", opts(("কোথায়","kothay"),("কখন","kokhon"),("কেন","keno")), 0, "কোথায় means where.", c("তুমি ___ যাচ্ছ?","tumi ___ jachchho?")),
  Q("Choose the question word for 'why'.", opts(("কেন","keno"),("কত","koto"),("কে","ke")), 0, "কেন means why.", c("তুমি ___ কাঁদছ?","tumi ___ kadchho?")),
  Q("Choose the question word for 'how much'.", opts(("কত","koto"),("কোন","kon"),("কার","kar")), 0, "কত asks about amount or price.", c("এটা ___ টাকা?","eta ___ taka?")),
  Q("Which sentence has the right word order?", opts(("আমি ভাত খাই।","ami bhat khai."),("আমি খাই ভাত।","ami khai bhat."),("ভাত খাই আমি।","bhat khai ami.")), 0, "The verb comes at the end: subject, object, verb."),
 ]))

# ----------------------------------------------------------------------------------
# sanity checks
for t in T:
    assert len({s["id"] for s in t["sections"]}) == len(t["sections"]), t["id"]
    for q in t["exercises"]:
        assert 0 <= q["answer"] < len(q["options"]), (t["id"], q["q"])
        assert len(q["options"]) >= 2
        # no duplicate options
        txt = [o["bn"] if isinstance(o, dict) else o for o in q["options"]]
        assert len(set(txt)) == len(txt), (t["id"], q["q"], txt)
    for s in t["sections"]:
        for b in s["blocks"]:
            if b["t"] == "table":
                n = len(b["head"])
                for r in b["rows"]: assert len(r) == n, (t["id"], s["id"], b.get("title"), len(r), n, r[:1])

ts = '''// Grammar lessons and exercises. Generated from content-drafts/build_grammar.py.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
export type Cell = string | { bn: string; ro: string };
export type Block =
  | { t: "p"; text: string }
  | { t: "note"; text: string }
  | { t: "table"; title: string | null; head: string[]; rows: Cell[][] }
  | { t: "ex"; title: string | null; items: [string, string, string][] };
export type Exercise = { q: string; sentence: { bn: string; ro: string } | null; options: Cell[]; answer: number; why: string };
export type GrammarSection = { id: string; title: string; blocks: Block[] };
export type GrammarTopic = {
  id: string;
  title: [bn: string, roman: string, en: string];
  blurb: string;
  sections: GrammarSection[];
  exercises: Exercise[];
};

export const GRAMMAR: GrammarTopic[] = '''
open("src/data/grammar.ts", "w").write(ts + json.dumps(T, ensure_ascii=False, indent=1) + ";\n")
json.dump(T, open("content-drafts/grammar.json", "w"), ensure_ascii=False, indent=1)
print("topics:", len(T), "| sections:", sum(len(t["sections"]) for t in T), "| exercises:", sum(len(t["exercises"]) for t in T))

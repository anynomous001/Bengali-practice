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


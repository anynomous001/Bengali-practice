from lib import *

S = SENT
def verb_rows(keys, tense): return [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"])] + VERBS[k]["f"][tense] for k in keys]
HEAD = ["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"]
AGEI = ("আগেই", "agei"); EKBAR = ("একবার", "ekbar"); CHHOTO = ("ছোটবেলায়", "chhotobelay"); KI = ("কী", "ki"); KOTHAY_ = ("কোথায়", "kothay"); KIQ = ("কি", "ki"); AMAKE = ("আমাকে", "amake")
SIX = ("kora","bola","dekha","pora","khaoya","jaoya","asha","deoya","neoya","lekha","shona","thaka")

def table_section(sid, title, keys, blurb):
    return dict(id=sid, title=title, blocks=[P(blurb)] + [verb_table(k) for k in keys])

TABLES = finish(dict(id="tense-tables", title=("কাল-তালিকা", "Kal-talika", "Verb tables: every tense"),
 blurb="Full tables for nineteen common verbs: every tense, every person. Use them to check a form or to learn a verb thoroughly.",
 sections=[
  dict(id="how", title="How to use these tables", blocks=[
   P("Each table has the ten tenses in rows and the five person endings in columns: আমি, তুই, তুমি, আপনি / তিনি, সে. For the plural pronouns, use the same form as the singular: আমরা takes the আমি form, তোমরা the তুমি form, আপনারা the আপনি form, তারা the সে form."),
   LIST(["Look up the verb in the left-hand title.", "Find the tense in the first column.", "Read across to the person you need.", "Plural pronouns share the form of their singular pronoun."], ordered=True, title="Looking up a form"),
   NOTE("Regular verbs follow the pattern in the Tenses lesson, so you can build forms yourself. The irregular verbs খাওয়া, যাওয়া, দেওয়া, নেওয়া, আসা, লেখা, শোনা and ঘুমানো change their root in some tenses, so check them in the table."),
  ]),
  table_section("t1", "করা, বলা, দেখা, শোনা", ("kora","bola","dekha","shona"), "Four very common verbs."),
  table_section("t2", "পড়া, লেখা, থাকা, বসা", ("pora","lekha","thaka","bosha"), "Verbs for study and for staying."),
  table_section("t3", "খেলা, হাঁটা, ধরা, রাখা, চলা", ("khela","hata","dhora","rakha","chola"), "Regular verbs for movement and handling."),
  table_section("t4", "খাওয়া, যাওয়া, আসা", ("khaoya","jaoya","asha"), "Three irregular verbs you use all day."),
  table_section("t5", "দেওয়া, নেওয়া, ঘুমানো", ("deoya","neoya","ghumano"), "Giving, taking and sleeping."),
 ],
 exercises=[]))

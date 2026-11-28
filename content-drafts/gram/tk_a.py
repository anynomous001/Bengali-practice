from tk_c import *

S = SENT
ALLT = ["pres","cont","perf","past","pastcont","pastperf","habit","fut"]

def tbl_all_tenses(subject, parts, verb, ens, title):
    """one sentence in all nine tenses (table rows: tense | sentence | English)"""
    rows = []
    for (tid, bn, ro, en_t), en in zip(TENSES, ens):
        b, r, _ = S(subject, parts, verb, tid, en)
        rows.append([c(bn, ro), en_t, c(b, r), en])
    return TABLE(["Tense", "In English", "Example", "Meaning"], rows, title)

OVERVIEW = finish(dict(id="kal", title=("কাল", "Kal", "Tenses: the big picture"),
 blurb="What a tense is, how every Bengali tense is built, the time words that go with each, and how to choose the right one.",
 sections=[
  dict(id="what", title="What is a tense?", blocks=[
   P("কাল (kal) means 'time'. A tense tells us when an action happens: now, in the past, or in the future. Bengali has three times (বর্তমান, অতীত, ভবিষ্যৎ), and for each one it has kinds: simple (সাধারণ, a plain fact or habit), continuous (ঘটমান, still going on), and perfect (পুরাঘটিত, finished). The past also has a habitual kind (নিত্যবৃত্ত: 'used to'). That gives nine tenses."),
   tbl_all_tenses("ami",[BHAT],"khaoya",["I eat rice.","I am eating rice.","I have eaten rice.","I ate rice.","I was eating rice.","I had eaten rice.","I used to eat rice.","I will eat rice.","I will be eating rice.","I will have eaten rice."], "One sentence in all ten tenses"),
   LIST(["বর্তমান (bortoman) = present: now, and what is always true.", "অতীত (otit) = past: it has already happened.", "ভবিষ্যৎ (bhobishyot) = future: it has not happened yet.",
         "সাধারণ (sadharon) = simple: a plain action, a habit or a fact.", "ঘটমান (ghotoman) = continuous: the action is in progress.", "পুরাঘটিত (puraghotito) = perfect: the action is complete.", "নিত্যবৃত্ত (nityobritto) = habitual: it used to happen regularly."], title="Words you will meet"),
   NOTE("Teachers and books use slightly different labels for some tenses. Check the names against your class notes. The forms themselves do not change."),
  ]),

  dict(id="built", title="How a tense is built", blocks=[
   P("Every tense is built the same way: root + tense sign + person ending. The root carries the meaning. The tense sign tells you when. The person ending tells you who. Once you know the signs, you can build any tense of any regular verb."),
   TABLE(["Tense", "Tense sign", "Built from করা (kor-), for আমি", "Result"], [
     [c(TENSE_BN["pres"][0], TENSE_BN["pres"][1]), "none", "কর + ি", c("করি","kori")],
     [c(TENSE_BN["cont"][0], TENSE_BN["cont"][1]), "-ছ-", "কর + ছ + ি", c("করছি","korchhi")],
     [c(TENSE_BN["perf"][0], TENSE_BN["perf"][1]), "-েছ-", "কর + েছ + ি", c("করেছি","korechhi")],
     [c(TENSE_BN["past"][0], TENSE_BN["past"][1]), "-েছিল-", "কর + েছিলাম", c("করেছিলাম","korechhilam")],
     [c(TENSE_BN["pastcont"][0], TENSE_BN["pastcont"][1]), "-ছিল-", "কর + ছিলাম", c("করছিলাম","korchhilam")],
     [c(TENSE_BN["pastperf"][0], TENSE_BN["pastperf"][1]), "-েছিল-", "কর + েছিলাম", c("করেছিলাম","korechhilam")],
     [c(TENSE_BN["habit"][0], TENSE_BN["habit"][1]), "-ত-", "কর + তাম", c("করতাম","kortam")],
     [c(TENSE_BN["fut"][0], TENSE_BN["fut"][1]), "-ব-", "কর + ব", c("করব","korbo")],
     [c(TENSE_BN["futcont"][0], TENSE_BN["futcont"][1]), "-তে থাক-", "করতে + থাকব", c("করতে থাকব","korte thakbo")],
     [c(TENSE_BN["futperf"][0], TENSE_BN["futperf"][1]), "-এ থাক-", "করে + থাকব", c("করে থাকব","kore thakbo")],
   ], "The tense signs"),
   P("Notice the pattern. The continuous tenses use -ছ- (করছি) and the perfect tenses add an extra -ে (করেছি). Putting -ছিল- instead of -ছ- moves a tense into the past (করছি → করছিলাম; করেছি → করেছিলাম). The simple past uses the same -েছিল- sign as the past perfect: the word আগে or আগেই (before, already) is what shows the past perfect. The -ত- sign is the habitual past, and -ব- is the future. Two future tenses borrow থাকা (to stay): the future continuous is the -তে form + থাকব (করতে থাকব) and the future perfect is the -এ form + থাকব (করে থাকব)."),
   H("Endings for each person"),
   TABLE(["Tense", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"], [[c(TENSE_BN[t][0], TENSE_BN[t][1])] + [c(b, r) for b, r in ENDINGS[t]] for t in ALLT], "Person endings added to the root (before the sign shown above)"),
   NOTE("The endings in the table include the tense sign. For example the continuous endings are -ছি, -ছিস, -ছ, -ছেন, -ছে. Put them after the root and you have a full verb."),
   H("Seeing it work on three verbs"),
   TABLE(["Tense", "করা (do)", "বলা (say)", "পড়া (read)"], [[c(TENSE_BN[t][0], TENSE_BN[t][1])] + [VERBS[k]["f"][t][0] for k in ("kora","bola","pora")] for t, *_ in [(x,) for x in ALLT]], "The 'I' form of three regular verbs"),
  ]),

  dict(id="time", title="Time words and the tenses they go with", blocks=[
   P("Time words are the quickest clue to the tense. When you hear রোজ (every day) you expect a habit in the simple present. When you hear গতকাল (yesterday) you expect the simple past. Learn each time word together with its tense."),
   TABLE(["Time word", "Meaning", "Goes with"], [
     [c("রোজ / প্রতিদিন","roj / protidin"), "every day", "simple present, habitual past"], [c("সবসময়","shobshomoy"), "always", "simple present"], [c("মাঝে মাঝে","majhe majhe"), "sometimes", "simple present"], [c("সাধারণত","shadharonoto"), "usually", "simple present"],
     [c("এখন","ekhon"), "now", "present continuous"], [c("এইমাত্র","eimatro"), "just now", "present perfect"], [c("এখনও","ekhono"), "still, yet", "present perfect (with a negative)"], [c("ইতিমধ্যে","itimoddhe"), "already", "present perfect"],
     [c("গতকাল","gotokal"), "yesterday", "simple past"], [c("গত সপ্তাহে","goto shoptahe"), "last week", "simple past"], [c("আগে","age"), "before", "past, past perfect"], [c("তখন","tokhon"), "then, at that time", "past continuous"],
     [c("ছোটবেলায়","chhotobelay"), "in childhood", "habitual past"], [c("আগেই","agei"), "already, before that", "past perfect"],
     [c("কাল / আগামীকাল","kal / agamikal"), "tomorrow", "simple future"], [c("পরে","pore"), "later", "simple future"], [c("আগামী সপ্তাহে","agami shoptahe"), "next week", "simple future"],
   ]),
   NOTE("কাল (kal) means both 'yesterday' and 'tomorrow'. The tense of the verb tells you which: কাল গিয়েছিলাম (past) is 'yesterday I went'; কাল যাব (future) is 'tomorrow I will go'. To be clear you can say গতকাল (yesterday) or আগামীকাল (tomorrow)."),
   EXS([("আমি রোজ ভাত খাই।","ami roj bhat khai.","I eat rice every day."), ("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi.","I am eating rice now."), ("আমি এইমাত্র ভাত খেয়েছি।","ami eimatro bhat kheyechhi.","I have just eaten rice."),
        ("আমি গতকাল ভাত খেয়েছিলাম।","ami gotokal bhat kheyechhilam.","I ate rice yesterday."), ("আমি তখন ভাত খাচ্ছিলাম।","ami tokhon bhat khachchhilam.","I was eating rice at that time."), ("আমি আগেই ভাত খেয়েছিলাম।","ami agei bhat kheyechhilam.","I had already eaten rice."),
        ("আমি ছোটবেলায় রোজ ভাত খেতাম।","ami chhotobelay roj bhat khetam.","I used to eat rice every day in my childhood."), ("আমি কাল ভাত খাব।","ami kal bhat khabo.","I will eat rice tomorrow.")], "The same verb with its time word"),
  ]),

  dict(id="english", title="English tenses and Bengali tenses", blocks=[
   P("Bengali tenses do not match English tenses one for one. Here is how the common English forms are said in Bengali, so you do not translate word for word."),
   TABLE(["English", "Bengali tense", "Example"], [
     ["I eat / I usually eat", c("সাধারণ বর্তমান","sadharon bortoman"), c("আমি ভাত খাই।","ami bhat khai.")], ["I am eating", c("ঘটমান বর্তমান","ghotoman bortoman"), c("আমি ভাত খাচ্ছি।","ami bhat khachchhi.")],
     ["I have eaten", c("পুরাঘটিত বর্তমান","puraghotito bortoman"), c("আমি ভাত খেয়েছি।","ami bhat kheyechhi.")], ["I have been eating (for two hours)", c("ঘটমান বর্তমান","ghotoman bortoman"), c("আমি দুই ঘণ্টা ধরে খাচ্ছি।","ami dui ghonta dhore khachchhi.")],
     ["I ate / I did eat", c("সাধারণ অতীত","sadharon otit"), c("আমি গতকাল ভাত খেয়েছিলাম।","ami gotokal bhat kheyechhilam.")], ["I was eating", c("ঘটমান অতীত","ghotoman otit"), c("আমি ভাত খাচ্ছিলাম।","ami bhat khachchhilam.")],
     ["I had eaten (before something else)", c("পুরাঘটিত অতীত","puraghotito otit"), c("আমি আগেই ভাত খেয়েছিলাম।","ami agei bhat kheyechhilam.")], ["I used to eat / I would eat (as a habit)", c("নিত্যবৃত্ত অতীত","nityobritto otit"), c("আমি ভাত খেতাম।","ami bhat khetam.")],
     ["I will eat / I am going to eat", c("সাধারণ ভবিষ্যৎ","sadharon bhobishyot"), c("আমি ভাত খাব।","ami bhat khabo.")], ["I will keep eating", c("ঘটমান ভবিষ্যৎ","ghotoman bhobishyot"), c("আমি খেতে থাকব।","ami khete thakbo.")], ["I will have eaten (by then)", c("পুরাঘটিত ভবিষ্যৎ","puraghotito bhobishyot"), c("আমি খেয়ে থাকব।","ami kheye thakbo.")],
   ]),
   MISTAKES([
     (("আমি আছি ভাত খাচ্ছি।","ami achhi bhat khachchhi."), ("আমি ভাত খাচ্ছি।","ami bhat khachchhi."), "Do not add 'am' (আছি). The -ছি ending already means 'am eating'."),
     (("আমি ভাত খাব এখন।","ami bhat khabo ekhon."), ("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi."), "For something happening right now use the continuous tense, not the future."),
   ], title="Do not translate word for word"),
  ]),

  dict(id="neg", title="Negatives and questions in every tense", blocks=[
   P("Making a sentence negative follows one simple system. There are only TWO negative markers in Bengali tenses. The marker depends on the tense, so learn which tenses take which."),
   TABLE(["Marker", "How it is added", "Which tenses"], [
     [c("না","na"), "after the verb, as a separate word: খাই না", "simple present, present continuous, past continuous, habitual past, simple future, future continuous, future perfect"],
     [c("-নি","-ni"), "joined to the SIMPLE PRESENT form: খাইনি", "present perfect, simple past, past perfect"],
   ], "The two negative markers"),
   P("Here is every tense, with the negative of the same verb: খাওয়া (to eat), for আমি."),
   TABLE(["Tense", "Positive", "Negative", "Rule"], [[c(TENSE_BN[t][0], TENSE_BN[t][1]), c(*vform("khaoya", t, 0)), vcell("khaoya", t, 0, True, NEG_PREFIX.get(t)), ("simple present form + নি" if t in NI_TENSES else "verb + না")] for t in ALLT + ["futcont","futperf"]], "Negatives in every tense"),
   NOTE("The simple past, the past perfect and the present perfect all have the same negative: আমি খাইনি. It can mean 'I did not eat', 'I had not eaten' or 'I have not eaten'. The time word tells you which: গতকাল (yesterday), আগে (before) or এখনও (yet)."),
   H("Questions in every tense"),
   P("To ask a yes / no question, add কি (ki) or raise your voice. To ask for information, put a question word (কী what, কোথায় where, কখন when, কেন why, কে who) before the verb. The tense does not change for a question."),
   EXS([S("tumi",[BHAT],"khaoya","pres","Do you eat rice?",q=True), S("tumi",[EKHON,("কী","ki")],"kora","cont","What are you doing now?",q=True), S("apni",[("কি","ki"),BHAT],"khaoya","perf","Have you eaten?",q=True),
        S("tumi",[GOTOKAL,("কোথায়","kothay")],"jaoya","past","Where did you go yesterday?",q=True), S("apni",[("কখন","kokhon")],"asha","fut","When will you come?",q=True)], "Questions"),
  ]),
 ],
 exercises=[
  PICK("What does কাল mean in the word 'ক্রিয়ার কাল'?", ["place", "time (tense)", "person"], 1, "কাল means time: it is the grammar word for tense.", inst="Choose the meaning."),
  PICK("Which tense is আমি ভাত খাচ্ছি?", ["Simple present", "Present continuous", "Present perfect"], 1, "-ছি is the sign of the continuous tense.", inst="Name the tense of the sentence."),
  PICK("Which tense is আমি ভাত খেয়েছি?", ["Simple past", "Past continuous", "Present perfect"], 2, "-েছি is the sign of the present perfect.", inst="Name the tense of the sentence."),
  PICK("Which tense is আমি ভাত খেতাম?", ["Past habitual", "Simple past", "Future"], 0, "-তাম is the sign of the habitual past: 'used to eat'.", inst="Name the tense of the sentence."),
  PICK("Which tense is আমি ভাত খাব?", ["Simple present", "Simple future", "Present perfect"], 1, "-ব is the sign of the future.", inst="Name the tense of the sentence."),
  PICK("Which tense sign marks the continuous tenses?", ["-ছ-", "-ল-", "-ব-"], 0, "-ছ- (করছি).", inst="Choose the tense sign."),
  PICK("Which tense sign marks the simple past?", ["-ল-", "-ছ-", "-ব-"], 0, "-ল- (করলাম).", inst="Choose the tense sign."),
  PICK("Which time word goes with the simple past?", O(("গতকাল","gotokal"),("এখন","ekhon"),("আগামীকাল","agamikal")), 0, "গতকাল means yesterday.", inst="Choose the time word that goes with the tense."),
  PICK("Which time word goes with the present continuous?", O(("এখন","ekhon"),("গতকাল","gotokal"),("রোজ","roj")), 0, "এখন means now.", inst="Choose the time word that goes with the tense."),
  PICK("Which time word goes with the simple present (habit)?", O(("রোজ","roj"),("এখন","ekhon"),("কাল","kal")), 0, "রোজ means every day.", inst="Choose the time word that goes with the tense."),
  TFILL("ami",[EKHON,BHAT],"khaoya","cont",["pres","past","fut"],"এখন (now) goes with the continuous tense: খাচ্ছি.", inst="Choose the verb form that fits the time word."),
  TFILL("ami",[ROJ,BHAT],"khaoya","pres",["cont","past","fut"],"রোজ (every day) goes with the simple present: খাই.", inst="Choose the verb form that fits the time word."),
  TFILL("ami",[GOTOKAL,BAJARE],"jaoya","past",["pres","cont","fut"],"গতকাল (yesterday) goes with the simple past: গেলাম.", inst="Choose the verb form that fits the time word."),
  TFILL("tumi",[KAL,BAJARE],"jaoya","fut",["pres","past","cont"],"কাল with a future sign means tomorrow: যাবে.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[EIMATRO],"asha","perf",["pres","fut","habit"],"এইমাত্র (just now) goes with the present perfect: এসেছে.", inst="Choose the verb form that fits the time word."),
  TFILL("ami",[TOKHON,BHAT],"khaoya","pastcont",["past","pres","fut"],"তখন (at that time) with an action in progress: খাচ্ছিলাম.", inst="Choose the verb form that fits the sentence."),
  TMEAN("ami",[BHAT],"khaoya","perf","I have eaten rice.",[("ami",[BHAT],"khaoya","past"),("ami",[BHAT],"khaoya","cont"),("ami",[BHAT],"khaoya","fut")],"'Have eaten' is the present perfect: খেয়েছি."),
  TMEAN("tumi",[BAJARE],"jaoya","fut","You will go to the market.",[("tumi",[BAJARE],"jaoya","pres"),("tumi",[BAJARE],"jaoya","past"),("tumi",[BAJARE],"jaoya","cont")],"'Will go' is the future: যাবে."),
  TMEAN("ami",[BHAT],"khaoya","habit","I used to eat rice.",[("ami",[BHAT],"khaoya","past"),("ami",[BHAT],"khaoya","pres"),("ami",[BHAT],"khaoya","fut")],"'Used to' is the habitual past: খেতাম."),
  PICK("How do you say 'I did not go'?", O(("আমি যাইনি।","ami jaini."),("আমি যাই না।","ami jai na."),("আমি যাব না।","ami jabo na.")), 0, "The past negative adds -নি to the present form.", inst="Choose the Bengali sentence that matches the English."),
  PICK("What does কাল mean?", ["only 'yesterday'", "only 'tomorrow'", "'yesterday' or 'tomorrow', the verb tells you which"], 2, "কাল is used for both; the tense of the verb decides.", inst="Choose the true statement."),
  SPOT(O(("আমি ভাত খাচ্ছি।","ami bhat khachchhi."),("আমি আছি ভাত খাচ্ছি।","ami achhi bhat khachchhi."),("আমি খাচ্ছি আছি ভাত।","ami khachchhi achhi bhat.")), 0, "খাচ্ছি already means 'am eating'.", inst="Only one sentence is correct. Choose it."),
 ]))

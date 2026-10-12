from lib import *

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
   tbl_all_tenses("ami",[BHAT],"khaoya",["I eat rice.","I am eating rice.","I have eaten rice.","I ate rice.","I was eating rice.","I had eaten rice.","I used to eat rice.","I will eat rice.","I will be eating rice."], "One sentence in all nine tenses"),
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
     [c(TENSE_BN["past"][0], TENSE_BN["past"][1]), "-ল-", "কর + লাম", c("করলাম","korlam")],
     [c(TENSE_BN["pastcont"][0], TENSE_BN["pastcont"][1]), "-ছিল-", "কর + ছিলাম", c("করছিলাম","korchhilam")],
     [c(TENSE_BN["pastperf"][0], TENSE_BN["pastperf"][1]), "-েছিল-", "কর + েছিলাম", c("করেছিলাম","korechhilam")],
     [c(TENSE_BN["habit"][0], TENSE_BN["habit"][1]), "-ত-", "কর + তাম", c("করতাম","kortam")],
     [c(TENSE_BN["fut"][0], TENSE_BN["fut"][1]), "-ব-", "কর + ব", c("করব","korbo")],
   ], "The tense signs"),
   P("Notice the pattern. The continuous tenses use -ছ- (করছি) and the perfect tenses add an extra -ে (করেছি). Putting -ছিল- instead of -ছ- moves a tense into the past (করছি → করছিলাম; করেছি → করেছিলাম). The -ল- sign is the plain past, -ত- is the habitual past, and -ব- is the future."),
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
   NOTE("কাল (kal) means both 'yesterday' and 'tomorrow'. The tense of the verb tells you which: কাল গেলাম (past) is 'yesterday I went'; কাল যাব (future) is 'tomorrow I will go'. To be clear you can say গতকাল (yesterday) or আগামীকাল (tomorrow)."),
   EXS([("আমি রোজ ভাত খাই।","ami roj bhat khai.","I eat rice every day."), ("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi.","I am eating rice now."), ("আমি এইমাত্র ভাত খেয়েছি।","ami eimatro bhat kheyechhi.","I have just eaten rice."),
        ("আমি গতকাল ভাত খেলাম।","ami gotokal bhat khelam.","I ate rice yesterday."), ("আমি তখন ভাত খাচ্ছিলাম।","ami tokhon bhat khachchhilam.","I was eating rice at that time."), ("আমি আগেই ভাত খেয়েছিলাম।","ami agei bhat kheyechhilam.","I had already eaten rice."),
        ("আমি ছোটবেলায় রোজ ভাত খেতাম।","ami chhotobelay roj bhat khetam.","I used to eat rice every day in my childhood."), ("আমি কাল ভাত খাব।","ami kal bhat khabo.","I will eat rice tomorrow.")], "The same verb with its time word"),
  ]),

  dict(id="english", title="English tenses and Bengali tenses", blocks=[
   P("Bengali tenses do not match English tenses one for one. Here is how the common English forms are said in Bengali, so you do not translate word for word."),
   TABLE(["English", "Bengali tense", "Example"], [
     ["I eat / I usually eat", c("সাধারণ বর্তমান","sadharon bortoman"), c("আমি ভাত খাই।","ami bhat khai.")], ["I am eating", c("ঘটমান বর্তমান","ghotoman bortoman"), c("আমি ভাত খাচ্ছি।","ami bhat khachchhi.")],
     ["I have eaten", c("পুরাঘটিত বর্তমান","puraghotito bortoman"), c("আমি ভাত খেয়েছি।","ami bhat kheyechhi.")], ["I have been eating (for two hours)", c("ঘটমান বর্তমান","ghotoman bortoman"), c("আমি দুই ঘণ্টা ধরে খাচ্ছি।","ami dui ghonta dhore khachchhi.")],
     ["I ate / I did eat", c("সাধারণ অতীত","sadharon otit"), c("আমি ভাত খেলাম।","ami bhat khelam.")], ["I was eating", c("ঘটমান অতীত","ghotoman otit"), c("আমি ভাত খাচ্ছিলাম।","ami bhat khachchhilam.")],
     ["I had eaten", c("পুরাঘটিত অতীত","puraghotito otit"), c("আমি ভাত খেয়েছিলাম।","ami bhat kheyechhilam.")], ["I used to eat / I would eat (as a habit)", c("নিত্যবৃত্ত অতীত","nityobritto otit"), c("আমি ভাত খেতাম।","ami bhat khetam.")],
     ["I will eat / I am going to eat", c("সাধারণ ভবিষ্যৎ","sadharon bhobishyot"), c("আমি ভাত খাব।","ami bhat khabo.")],
   ]),
   MISTAKES([
     (("আমি আছি ভাত খাচ্ছি।","ami achhi bhat khachchhi."), ("আমি ভাত খাচ্ছি।","ami bhat khachchhi."), "Do not add 'am' (আছি). The -ছি ending already means 'am eating'."),
     (("আমি ভাত খাব এখন।","ami bhat khabo ekhon."), ("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi."), "For something happening right now use the continuous tense, not the future."),
   ], title="Do not translate word for word"),
  ]),

  dict(id="neg", title="Negatives and questions in every tense", blocks=[
   P("Making a sentence negative is easy. In most tenses you simply add না after the verb. The past and the present perfect take the ending -নি joined to the verb. Making a question is also easy: add কি, or use a question word, or just raise your voice."),
   TABLE(["Tense", "Negative", "Example"], [
     [c(TENSE_BN["pres"][0], TENSE_BN["pres"][1]), "verb + না", c("আমি ভাত খাই না।","ami bhat khai na.")], [c(TENSE_BN["cont"][0], TENSE_BN["cont"][1]), "verb + না", c("আমি ভাত খাচ্ছি না।","ami bhat khachchhi na.")],
     [c(TENSE_BN["perf"][0], TENSE_BN["perf"][1]), "present form + নি", c("আমি ভাত খাইনি।","ami bhat khaini.")], [c(TENSE_BN["past"][0], TENSE_BN["past"][1]), "present form + নি", c("আমি ভাত খাইনি।","ami bhat khaini.")],
     [c(TENSE_BN["pastcont"][0], TENSE_BN["pastcont"][1]), "verb + না", c("আমি ভাত খাচ্ছিলাম না।","ami bhat khachchhilam na.")], [c(TENSE_BN["habit"][0], TENSE_BN["habit"][1]), "verb + না", c("আমি ভাত খেতাম না।","ami bhat khetam na.")],
     [c(TENSE_BN["fut"][0], TENSE_BN["fut"][1]), "verb + না", c("আমি ভাত খাব না।","ami bhat khabo na.")],
   ], "Negatives"),
   NOTE("The simple past and the present perfect have the same negative: আমি যাইনি means both 'I did not go' and 'I have not gone'. The time word tells you which."),
   EXS([S("ami",[BHAT],"khaoya","pres","I do not eat rice.",neg=True), S("ami",[EKHON,BHAT],"khaoya","cont","I am not eating rice now.",neg=True), S("ami",[BHAT],"khaoya","perf","I have not eaten rice.",neg=True),
        S("tumi",[GOTOKAL,SKULE],"jaoya","past","You did not go to school yesterday.",neg=True), S("se",[BHAT],"khaoya","habit","He / she did not use to eat rice.",neg=True), S("amra",[KAL,BAJARE],"jaoya","fut","We will not go to the market tomorrow.",neg=True)], "Negative sentences"),
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

PRESENT = finish(dict(id="tense-present", title=("বর্তমান কাল", "Bortoman kal", "The present tenses"),
 blurb="The simple present, the present continuous and the present perfect: when to use each, how to build them, with many examples and the common mistakes.",
 sections=[
  dict(id="simple", title="Simple present: habits, facts and routines", blocks=[
   P("The simple present (সাধারণ বর্তমান) is the plainest tense. It is the root plus a person ending, with no tense sign. Use it for three things: habits and routines (what you do regularly), general facts (what is always true), and timetables or fixed arrangements."),
   TABLE(["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"], [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"])] + VERBS[k]["f"]["pres"] for k in ("kora","bola","dekha","pora","khaoya","jaoya","asha","deoya","neoya","lekha","shona","thaka")], "Simple present of twelve verbs"),
   H("Habits and routines"),
   EXS([S("ami",[ROJ,SHOKALE,CHA],"khaoya","pres","I drink tea every morning."), S("tumi",[PROTIDIN,SKULE],"jaoya","pres","You go to school every day."), S("se",[ROJ,BOI],"pora","pres","He / she reads a book every day."),
        S(MA,[SHOBSHOMOY,BHORE if False else ("ভোরে","bhore")],"otha" if False else "asha","pres","Mother always comes early."), S("amra",[PROTIDIN,PARKE],"hata","pres","We walk in the park every day."),
        S("ami",[ROJ,BANGLA],"bola","pres","I speak Bengali every day."), S("o",[ROJ,GAN],"shona","pres","He / she listens to a song every day."), S("tui",[ROJ,KI if False else ("কী","ki")],"kora","pres","What do you do every day?",q=True)], "Routines"),
   H("General facts"),
   EXS([("সূর্য পূর্ব দিকে ওঠে।","shurjo purbo dike othe.","The sun rises in the east."), ("গরু ঘাস খায়।","goru ghas khay.","Cows eat grass."), ("মাছ জলে থাকে।","mach jole thake.","Fish live in water."), ("পাখি আকাশে ওড়ে।","pakhi akashe ore.","Birds fly in the sky."),
        ("বরফ জলে ভাসে।","borof jole bhashe.","Ice floats on water."), ("বর্ষায় অনেক বৃষ্টি হয়।","borshay onek brishti hoy.","It rains a lot in the monsoon.")], "Things that are always true"),
   H("Timetables and arrangements"),
   EXS([("ট্রেন সকাল আটটায় ছাড়ে।","tren shokal atotay chhare.","The train leaves at eight in the morning."), ("স্কুল দশটায় শুরু হয়।","skul doshtay shuru hoy.","School starts at ten."), ("দোকান রাত নটায় বন্ধ হয়।","dokan rat notay bondho hoy.","The shop closes at nine at night.")], "Fixed times"),
   H("Negatives and questions"),
   EXS([S("ami",[BHAT],"khaoya","pres","I do not eat rice.",neg=True), S("se",[MACH],"khaoya","pres","He / she does not eat fish.",neg=True), S("tumi",[ROJ,SKULE],"jaoya","pres","Do you go to school every day?",q=True),
        S("apni",[KOTHAY if False else ("কোথায়","kothay")],"thaka","pres","Where do you live?",q=True), S("tumi",[("কি","ki"),CHA],"khaoya","pres","Do you drink tea?",q=True), S("amra",[BAJARE],"jaoya","pres","We do not go to the market.",neg=True)], "Not and ?"),
   MISTAKES([
     (("আমি রোজ ভাত খাচ্ছি।","ami roj bhat khachchhi."), ("আমি রোজ ভাত খাই।","ami roj bhat khai."), "A regular habit (রোজ) needs the simple present, not the continuous."),
     (("সে ভাত না খায়।","she bhat na khay."), ("সে ভাত খায় না।","she bhat khay na."), "না comes after the verb, not before it."),
   ], title="Habit or right now?"),
  ]),

  dict(id="continuous", title="Present continuous: happening now", blocks=[
   P("The present continuous (ঘটমান বর্তমান) is built with -ছ-: root + ছি / ছিস / ছ / ছেন / ছে. Use it for an action in progress right now, for something temporary around now, and, very commonly, for a plan that is settled for the near future."),
   TABLE(["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"], [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"])] + VERBS[k]["f"]["cont"] for k in ("kora","bola","dekha","pora","khaoya","jaoya","asha","deoya","neoya","lekha","shona","ghumano")], "Present continuous of twelve verbs"),
   H("Right now"),
   EXS([S("ami",[EKHON,BHAT],"khaoya","cont","I am eating rice now."), S("tumi",[EKHON,("কী","ki")],"kora","cont","What are you doing now?",q=True), S("se",[BOI],"pora","cont","He / she is reading a book."),
        S(MA,[],"kora","cont","Mother is working.") if False else S(MA,[("রান্না","ranna")],"kora","cont","Mother is cooking."), S("apni",[("কোথায়","kothay")],"jaoya","cont","Where are you going?",q=True), S("amra",[GAN],"shona","cont","We are listening to a song."),
        S("ora",[MATHE],"khela","cont","They are playing in the field."), S("se",[EKHON],"ghumano","cont","He / she is sleeping now."), ("বৃষ্টি পড়ছে।","brishti porchhe.","It is raining."), ("আমি বাংলা শিখছি।","ami bangla shikhchhi.","I am learning Bengali.")], "Now"),
   H("Temporary situations around now"),
   EXS([("এই সপ্তাহে আমি কলকাতায় থাকছি।","ei shoptahe ami kolkatay thakchhi.","This week I am staying in Kolkata."), ("সে আজকাল অনেক পড়ছে।","she ajkal onek porchhe.","He / she is studying a lot these days."), ("আমরা এখন নতুন বাড়িতে আছি।","amra ekhon notun barite achhi.","We are in a new house now.")], "These days"),
   H("A settled plan for the near future"),
   P("Bengali often uses the present continuous for something you have already decided to do soon. English does the same: 'I am going tomorrow'."),
   EXS([S("ami",[KAL,KOLKATAY],"jaoya","cont","I am going to Kolkata tomorrow."), S("amra",[AGAMIKAL,SKULE],"jaoya","cont","We are going to school tomorrow."), S("se",[KAL],"asha","cont","He / she is coming tomorrow."),
        ("আমি আজ রাতে ফোন করছি।","ami aj rate phon korchhi.","I am phoning tonight.")], "Plans"),
   H("Negatives and questions"),
   EXS([S("ami",[EKHON,BHAT],"khaoya","cont","I am not eating rice now.",neg=True), S("se",[BOI],"pora","cont","He / she is not reading a book.",neg=True), S("tumi",[("কেন","keno")],"kora","cont","Why are you doing it?",q=True),
        S("apni",[("কি","ki"),GAN],"shona","cont","Are you listening to a song?",q=True), ("তুমি কেন কাঁদছ?","tumi keno kandchho?","Why are you crying?")], "Not and ?"),
   MISTAKES([
     (("আমি এখন ভাত খাই।","ami ekhon bhat khai."), ("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi."), "খাই sounds like a habit ('I eat'). For an action happening right now, say খাচ্ছি."),
     (("তুমি কী করো এখন?","tumi ki koro ekhon?"), ("তুমি এখন কী করছ?","tumi ekhon ki korchho?"), "For something in progress now use -ছ: করছ. The question word goes before the verb."),
   ], title="Now needs -ছ"),
  ]),

  dict(id="perfect", title="Present perfect: finished, with a result now", blocks=[
   P("The present perfect (পুরাঘটিত বর্তমান) is built with -েছ-: root + েছি / েছিস / েছ / েছেন / েছে. It is used when an action is finished but is still connected to now: you have eaten (so you are not hungry), you have arrived (so you are here). It is also used for recent events, and for experience."),
   TABLE(["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"], [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"])] + VERBS[k]["f"]["perf"] for k in ("kora","bola","dekha","pora","khaoya","jaoya","asha","deoya","neoya","lekha","shona","ghumano")], "Present perfect of twelve verbs"),
   H("Done, and it matters now"),
   EXS([S("ami",[BHAT],"khaoya","perf","I have eaten rice."), S("tumi",[("কি","ki"),BHAT],"khaoya","perf","Have you eaten rice?",q=True), S("se",[CHITHI],"lekha","perf","He / she has written a letter."),
        S(BABA,[OFISE],"jaoya","perf","Father has gone to the office."), S("ami",[EIMATRO],"asha","perf","I have just come."), S(MA,[("রান্না","ranna")],"kora","perf","Mother has cooked."),
        S("amra",[("ছবিটা","chhobita")],"dekha","perf","We have seen the picture."), S("tumi",[BOI],"pora","perf","You have read the book."), S("se",[GAN],"shona","perf","He / she has listened to the song."), S("apni",[("কি","ki"),KOLKATAY],"asha","perf","Have you come to Kolkata?",q=True)], "Finished actions"),
   H("Experience: have you ever?"),
   EXS([S("apni",[("কি","ki"),KOKHONO,KOLKATAY],"asha","perf","Have you ever come to Kolkata?",q=True), S("tumi",[("কি","ki"),KOKHONO,("ইলিশ","ilish")],"khaoya","perf","Have you ever eaten hilsa?",q=True), S("ami",[KOKHONO,("সাপ","shap")],"dekha","perf","I have never seen a snake.",neg=True)], "Ever and never"),
   H("Not yet"),
   P("A negative present perfect uses the present form with -নি, and the word এখনও (yet / still) usually goes with it."),
   EXS([S("ami",[("এখনও","ekhono"),BHAT],"khaoya","perf","I have not eaten rice yet.",neg=True), S("se",[("এখনও","ekhono")],"asha","perf","He / she has not come yet.",neg=True), S("tumi",[("এখনও","ekhono"),BOI],"pora","perf","You have not read the book yet.",neg=True),
        S("amra",[("এখনও","ekhono"),CHITHI],"lekha","perf","We have not written the letter yet.",neg=True)], "Not yet"),
   NOTE("Bengali uses the present perfect more than English does for recent events. 'I came today' is আমি আজ এসেছি, with the perfect. Use the simple past only when the time is clearly over: আমি গতকাল এলাম."),

  ]),

  dict(id="compare", title="The three present tenses side by side", blocks=[
   P("The best way to feel the difference is to see one verb in all three present tenses, with the question each one answers."),
   TABLE(["Question it answers", "Tense", "Example", "Meaning"], [
     ["What do you usually do?", c("সাধারণ বর্তমান","sadharon bortoman"), c("আমি ভাত খাই।","ami bhat khai."), "I eat rice (as a habit)."],
     ["What are you doing right now?", c("ঘটমান বর্তমান","ghotoman bortoman"), c("আমি ভাত খাচ্ছি।","ami bhat khachchhi."), "I am eating rice (now)."],
     ["What have you already done?", c("পুরাঘটিত বর্তমান","puraghotito bortoman"), c("আমি ভাত খেয়েছি।","ami bhat kheyechhi."), "I have eaten rice (it is done)."],
   ]),
   EXS([S("ami",[ROJ,BOI],"pora","pres","I read a book every day."), S("ami",[EKHON,BOI],"pora","cont","I am reading a book now."), S("ami",[BOI],"pora","perf","I have read the book."),
        S("se",[ROJ,CHITHI],"lekha","pres","He / she writes a letter every day."), S("se",[EKHON,CHITHI],"lekha","cont","He / she is writing a letter now."), S("se",[CHITHI],"lekha","perf","He / she has written the letter."),
        S("tumi",[ROJ,GAN],"shona","pres","You listen to a song every day."), S("tumi",[EKHON,GAN],"shona","cont","You are listening to a song now."), S("tumi",[GAN],"shona","perf","You have listened to the song.")], "Same verb, three meanings"),
   H("What changes when the time word changes"),
   EXS([("আমি রোজ সকালে চা খাই। কিন্তু আজ খাইনি।","ami roj shokale cha khai. kintu aj khaini.","I drink tea every morning. But I have not had it today."), ("সে এখন বাড়িতে নেই। সে অফিসে গেছে।","she ekhon barite nei. she ofise gechhe.","He / she is not at home now. He / she has gone to the office."),
        ("তুমি কী করছ? আমি চিঠি লিখছি। লেখা শেষ হলে পাঠাব।","tumi ki korchho? ami chithi likhchhi. lekha shesh hole pathabo.","What are you doing? I am writing a letter. When I finish writing I will send it.")], "Short exchanges"),
  ]),
 ],
 exercises=[
  PICK("When do you use the simple present?", ["for habits, facts and routines", "for things finished long ago", "for things that will happen next year"], 0, "The simple present is for habits and facts.", inst="Choose the use of the tense."),
  PICK("When do you use the present continuous?", ["for an action in progress now", "for a habit", "for something finished yesterday"], 0, "-ছ- marks an action in progress.", inst="Choose the use of the tense."),
  PICK("When do you use the present perfect?", ["for an action finished that matters now", "for a habit", "for a plan"], 0, "-েছ- marks an action that is finished but has a result now.", inst="Choose the use of the tense."),
  TFILL("ami",[ROJ,CHA],"khaoya","pres",["cont","perf","past"],"রোজ → habit → simple present: খাই.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[EKHON,BOI],"pora","cont",["pres","perf","fut"],"এখন → in progress → present continuous: পড়ছ.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[EIMATRO],"asha","perf",["pres","cont","past"],"এইমাত্র → just done → present perfect: এসেছে.", inst="Choose the verb form that fits the sentence."),
  TFILL("apni",[KOTHAY if False else ("কোথায়","kothay")],"jaoya","cont",["pres","perf","past"],"আপনি + continuous: যাচ্ছেন.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("tumi",[("কি","ki"),BHAT],"khaoya","perf",["pres","cont","past"],"'Have you eaten?': খেয়েছ.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("amra",[PROTIDIN,PARKE],"hata","pres",["cont","perf","past"],"প্রতিদিন → habit → simple present: হাঁটি.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[CHITHI],"lekha","perf",["pres","cont","past"],"A finished letter: লিখেছে.", inst="Choose the verb form that fits the sentence."),
  TFILL("o",[GAN],"shona","pres",["cont","perf","past"],"ও + simple present: শোনে.", inst="Choose the verb form that fits the sentence."),
  TFILL("tui",[KAL if False else EKHON,("কী","ki")],"kora","cont",["pres","perf","past"],"তুই + continuous: করছিস.", inst="Choose the verb form that fits the sentence.", q=True),
  TMEAN("ami",[EKHON,BHAT],"khaoya","cont","I am eating rice now.",[("ami",[EKHON,BHAT],"khaoya","pres"),("ami",[EKHON,BHAT],"khaoya","perf"),("ami",[EKHON,BHAT],"khaoya","fut")],"'Am eating now': খাচ্ছি."),
  TMEAN("ami",[EKHONO if False else ("এখনও","ekhono"),BHAT],"khaoya","perf","I have not eaten rice yet.",[("ami",[("এখনও","ekhono"),BHAT],"khaoya","pres",True),("ami",[("এখনও","ekhono"),BHAT],"khaoya","cont",True),("ami",[("এখনও","ekhono"),BHAT],"khaoya","fut",True)],"'Have not … yet' uses the -নি form: খাইনি.", neg=True),
  TMEAN("se",[BOI],"pora","pres","He / she reads a book. (habit)",[("se",[BOI],"pora","cont"),("se",[BOI],"pora","perf"),("se",[BOI],"pora","past")],"A plain habit: পড়ে."),
  PICK("How do you say 'I do not eat fish'?", O(("আমি মাছ খাই না।","ami mach khai na."),("আমি না মাছ খাই।","ami na mach khai."),("আমি মাছ না খাই।","ami mach na khai.")), 0, "না comes after the verb.", inst="Choose the correct Bengali sentence."),
  PICK("How do you say 'I have not come yet'?", O(("আমি এখনও আসিনি।","ami ekhono ashini."),("আমি এখনও আসছি না।","ami ekhono aschhi na."),("আমি এখনও আসব না।","ami ekhono asbo na.")), 0, "'Not yet' = the -নি form with এখনও.", inst="Choose the correct Bengali sentence."),
  PICK("'আমি কাল কলকাতায় যাচ্ছি' uses the present continuous for:", ["a settled plan for tomorrow", "something happening yesterday", "a general fact"], 0, "The present continuous can express a settled near-future plan.", inst="Choose what the sentence means."),
  SPOT(O(("সে রোজ বই পড়ে।","she roj boi pore."),("সে রোজ বই পড়ছে।","she roj boi porchhe."),("সে রোজ বই পড়েছে।","she roj boi porechhe.")), 0, "রোজ (every day) goes with the simple present.", inst="Only one sentence uses the right tense for the time word. Choose it."),
  SPOT(O(("আমি এখন ভাত খাচ্ছি।","ami ekhon bhat khachchhi."),("আমি এখন ভাত খাই।","ami ekhon bhat khai."),("আমি এখন ভাত খাব।","ami ekhon bhat khabo.")), 0, "এখন (now) goes with the present continuous.", inst="Only one sentence uses the right tense for the time word. Choose it."),
 ]))

TOPICS = [OVERVIEW, PRESENT]

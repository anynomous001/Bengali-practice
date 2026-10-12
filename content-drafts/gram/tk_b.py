from lib import *

S = SENT
def verb_rows(keys, tense): return [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"])] + VERBS[k]["f"][tense] for k in keys]
HEAD = ["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"]
AGEI = ("আগেই", "agei"); EKBAR = ("একবার", "ekbar"); CHHOTO = ("ছোটবেলায়", "chhotobelay"); KI = ("কী", "ki"); KOTHAY_ = ("কোথায়", "kothay"); KIQ = ("কি", "ki"); AMAKE = ("আমাকে", "amake")
SIX = ("kora","bola","dekha","pora","khaoya","jaoya","asha","deoya","neoya","lekha","shona","thaka")

PAST = finish(dict(id="tense-past", title=("অতীত কাল", "Otit kal", "The past tenses"),
 blurb="The simple past, the past continuous, the past perfect and the habitual past: what each one says, how to build it, many examples, and how to tell a story in the past.",
 sections=[
  dict(id="simple", title="Simple past: it happened, and it is over", blocks=[
   P("The simple past (সাধারণ অতীত) is built with -ল-: root + লাম / লি / লে / লেন / ল. Use it for an action that is finished and sits clearly in the past, usually with a time word that is over: yesterday, last week, in 2010, then. Telling a story, you mostly use the simple past."),
   TABLE(HEAD, verb_rows(SIX, "past"), "Simple past of twelve verbs"),
   EXS([S("ami",[GOTOKAL,BAJARE],"jaoya","past","I went to the market yesterday."), S("tumi",[GOTOKAL,BOI],"pora","past","You read a book yesterday."), S("se",[AMAKE,CHITHI],"lekha","past","He / she wrote me a letter."),
        S(MA,[GOTOKAL,MACH,("রান্না","ranna")],"kora","past","Mother cooked fish yesterday."), S("amra",[("রবিবার","robibar"),("সিনেমা","sinema")],"dekha","past","We saw a film on Sunday."), S("se",[GAN],"shona","past","He / she listened to the song."),
        S("tara",[KOLKATAY],"asha","past","They came to Kolkata."), S(BABA,[AMAKE,("একটা বই","ekta boi")],"deoya","past","Father gave me a book."), S("ami",[GOTOKAL,("সারাদিন","sharadin")],"ghumano","past","I slept all day yesterday."), S("apni",[KI],"bola","past","What did you say?",q=True), S("tumi",[KI],"khaoya","past","What did you eat?",q=True)], "Finished actions"),
   H("Not in the past"),
   EXS([S("ami",[GOTOKAL,SKULE],"jaoya","past","I did not go to school yesterday.",neg=True), S("se",[AMAKE],"bola","past","He / she did not tell me.",neg=True), S("tumi",[BHAT],"khaoya","past","You did not eat rice.",neg=True),
        S("amra",[GOTOKAL],"asha","past","We did not come yesterday.",neg=True), S("apni",[KIQ,GOTOKAL,OFISE],"jaoya","past","Did you go to the office yesterday?",q=True)], "Negatives and questions"),
   MISTAKES([
     (("গতকাল আমি বাজারে যাব।","gotokal ami bajare jabo."), ("গতকাল আমি বাজারে গেলাম।","gotokal ami bajare gelam."), "গতকাল means yesterday, so the verb must be in the past: গেলাম."),
     (("আমি স্কুলে যাওয়া গেলাম।","ami skule jaoya gelam."), ("আমি স্কুলে গেলাম।","ami skule gelam."), "Use the verb form গেলাম, not the dictionary form যাওয়া."),
   ], title="Yesterday means past"),
  ]),

  dict(id="continuous", title="Past continuous: in progress at that time", blocks=[
   P("The past continuous (ঘটমান অতীত) is built with -ছিল-: root + ছিলাম / ছিলি / ছিলে / ছিলেন / ছিল. It describes an action that was in progress at a moment in the past, or two things going on together in the background, or an action that was interrupted by another."),
   TABLE(HEAD, verb_rows(SIX, "pastcont"), "Past continuous of twelve verbs"),
   H("In progress at that moment"),
   EXS([S("ami",[TOKHON,BHAT],"khaoya","pastcont","I was eating rice then."), S("se",[TOKHON,BOI],"pora","pastcont","He / she was reading a book then."), S("tumi",[TOKHON,KI],"kora","pastcont","What were you doing then?",q=True),
        S(MA,[TOKHON,("রান্না","ranna")],"kora","pastcont","Mother was cooking then."), S("amra",[TOKHON,GAN],"shona","pastcont","We were listening to a song then."), S("apni",[KOTHAY_],"jaoya","pastcont","Where were you going?",q=True),
        S("ora",[TOKHON,MATHE],"khela","pastcont","They were playing in the field then."), ("তখন বৃষ্টি পড়ছিল।","tokhon brishti porchhilo.","It was raining then."), S("ami",[TOKHON,("ফোনে","phone"),("কথা","kotha")],"bola","pastcont","I was talking on the phone then.")], "Then"),
   H("One action interrupted by another"),
   P("Use যখন … তখন … ('when … then …'). The long action takes the past continuous, and the short action that cut across it takes the simple past."),
   EXS([("আমি যখন বাড়ি এলাম তখন সে ঘুমাচ্ছিল।","ami jokhon bari elam tokhon she ghumachchhilo.","When I came home, he / she was sleeping."), ("আমি যখন খাচ্ছিলাম তখন ফোন বাজল।","ami jokhon khachchhilam tokhon phon bajlo.","When I was eating, the phone rang."),
        ("সে যখন পড়ছিল তখন আলো চলে গেল।","she jokhon porchhilo tokhon alo chole gelo.","While he / she was studying, the lights went out."), ("তুমি যখন এলে আমি রান্না করছিলাম।","tumi jokhon ele ami ranna korchhilam.","When you came, I was cooking.")], "While and when"),
   H("Not in progress"),
   EXS([S("ami",[TOKHON,BHAT],"khaoya","pastcont","I was not eating rice then.",neg=True), S("se",[TOKHON],"ghumano","pastcont","He / she was not sleeping then.",neg=True), S("tumi",[TOKHON,KIQ,BOI],"pora","pastcont","Were you reading a book then?",q=True)], "Negatives and questions"),
  ]),

  dict(id="perfect", title="Past perfect: it had already happened", blocks=[
   P("The past perfect (পুরাঘটিত অতীত) is built with -েছিল-: root + েছিলাম / েছিলি / েছিলে / েছিলেন / েছিল. It says that an action had already finished before another moment in the past. It is also the usual way to say that something happened once, a long time ago, and is not connected to now."),
   TABLE(HEAD, verb_rows(SIX, "pastperf"), "Past perfect of twelve verbs"),
   H("Before another past moment"),
   EXS([("আমি যখন পৌঁছলাম, সে তখন চলে গিয়েছিল।","ami jokhon pouchholam, she tokhon chole giyechhilo.","When I arrived, he / she had already left."), S("ami",[AGE,BHAT],"khaoya","pastperf","I had eaten rice before."), S("se",[AGEI,("বইটা","boita")],"pora","pastperf","He / she had already read the book."),
        S(MA,[AGEI,("রান্না","ranna")],"kora","pastperf","Mother had already cooked."), S("amra",[("ছবিটা","chhobita"),AGE],"dekha","pastperf","We had seen the picture before."), ("সে আমাকে বলেছিল যে সে আসবে।","she amake bolechhilo je she ashbe.","He / she had told me that he / she would come.")], "Earlier than another event"),
   H("Once, long ago"),
   EXS([S("ami",[EKBAR,KOLKATAY],"jaoya","pastperf","I went to Kolkata once."), S("tumi",[KIQ,AGE,KOLKATAY],"asha","pastperf","Had you come to Kolkata before?",q=True), S("apni",[KIQ,AGE,("এখানে","ekhane")],"asha","pastperf","Have you been here before?",q=True),
        S(THAKUMA,[("ছোটবেলায়","chhotobelay"),("এই বাড়িতে","ei barite")],"thaka","pastperf","Grandmother lived in this house in her childhood.")], "A past experience"),
   NOTE("Do not confuse the past perfect with the present perfect. আমি খেয়েছি (I have eaten) is about now: you are not hungry. আমি খেয়েছিলাম (I had eaten) is about before something else in the past."),
  ]),

  dict(id="habitual", title="Past habitual: what used to happen", blocks=[
   P("The past habitual (নিত্যবৃত্ত অতীত) is built with -ত-: root + তাম / তিস / তে / তেন / ত. It describes what used to happen again and again in the past, and what would happen every time. It is also used for polite or unreal ideas: 'I would say if I knew'."),
   TABLE(HEAD, verb_rows(SIX, "habit"), "Past habitual of twelve verbs"),
   EXS([S("ami",[CHHOTO,ROJ,MATHE],"khela","habit","I used to play in the field every day in my childhood."), S("tumi",[ROJ,KI],"khaoya","habit","What did you use to eat every day?",q=True), S("se",[PROTIDIN,BOI],"pora","habit","He / she used to read a book every day."),
        S(THAKUMA,[("আমাদের","amader"),GOLPO],"bola","habit","Grandmother used to tell us stories."), S("amra",[("প্রতি রবিবার","proti robibar"),BAJARE],"jaoya","habit","We used to go to the market every Sunday."), S(BABA,[ROJ,SHOKALE],"hata","habit","Father used to walk every morning."),
        S("ami",[TOKHON,PROTIDIN,CHA],"khaoya","habit","I did not use to drink tea every day then.",neg=True), S("apni",[KIQ,AGE,("এখানে","ekhane")],"asha","habit","Did you use to come here before?",q=True)], "Used to"),
   H("Would, if"),
   EXS([("আমি জানলে বলতাম।","ami janle bolotam.","If I had known, I would have said so."), ("তুমি এলে আমি খুশি হতাম।","tumi ele ami khushi hotam.","If you had come, I would have been happy."), ("টাকা থাকলে আমি কিনতাম।","taka thakle ami kintam.","If I had money, I would buy it.")], "Unreal ideas"),
  ]),

  dict(id="story", title="Telling a story: the past tenses together", blocks=[
   P("In a real story the past tenses work together. The simple past moves the story forward. The past continuous paints the background. The past perfect looks back to what had already happened. The habitual says what used to be true. Read the example, and notice which tense each sentence uses."),
   EXS([("গতকাল সকালে আমি ঘুম থেকে উঠলাম।","gotokal shokale ami ghum theke uthlam.","Yesterday morning I woke up.  (simple past: the story moves)"), ("মা তখন রান্না করছিলেন।","ma tokhon ranna korchhilen.","Mother was cooking then.  (past continuous: background)"),
        ("বাবা আগেই অফিসে চলে গিয়েছিলেন।","baba agei ofise chole giyechhilen.","Father had already gone to the office.  (past perfect: earlier)"), ("আমি মুখ ধুয়ে চা খেলাম।","ami mukh dhuye cha khelam.","I washed my face and drank tea.  (simple past)"),
        ("ছোটবেলায় আমি হেঁটে স্কুলে যেতাম।","chhotobelay ami hete skule jetam.","In my childhood I used to walk to school.  (habitual past)"), ("আজ আমি বাসে স্কুলে গেলাম।","aj ami base skule gelam.","Today I went to school by bus.  (simple past)")], "One morning"),
   H("The four past tenses side by side"),
   TABLE(["Tense", "It says", "Example"], [
     [c("সাধারণ অতীত","sadharon otit"), "It happened and is over", c("আমি ভাত খেলাম।","ami bhat khelam.")], [c("ঘটমান অতীত","ghotoman otit"), "It was in progress", c("আমি ভাত খাচ্ছিলাম।","ami bhat khachchhilam.")],
     [c("পুরাঘটিত অতীত","puraghotito otit"), "It had happened before", c("আমি ভাত খেয়েছিলাম।","ami bhat kheyechhilam.")], [c("নিত্যবৃত্ত অতীত","nityobritto otit"), "It used to happen", c("আমি ভাত খেতাম।","ami bhat khetam.")],
   ]),
  ]),
 ],
 exercises=[
  PICK("Which sign marks the simple past?", ["-ল-", "-ছিল-", "-ত-"], 0, "-ল- (গেলাম, করলাম).", inst="Choose the tense sign."),
  PICK("Which sign marks the past continuous?", ["-ছিল-", "-েছিল-", "-ল-"], 0, "-ছিল- (করছিলাম).", inst="Choose the tense sign."),
  PICK("Which sign marks the past perfect?", ["-েছিল-", "-ছিল-", "-ত-"], 0, "-েছিল- (করেছিলাম).", inst="Choose the tense sign."),
  PICK("Which sign marks the past habitual?", ["-ত-", "-ল-", "-ব-"], 0, "-ত- (করতাম).", inst="Choose the tense sign."),
  TFILL("ami",[GOTOKAL,BAJARE],"jaoya","past",["cont","pres","fut"],"গতকাল → finished → simple past: গেলাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[GOTOKAL,BOI],"pora","past",["pres","pastcont","fut"],"A finished action yesterday: পড়লে.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[TOKHON,BHAT],"khaoya","pastcont",["past","pres","fut"],"In progress then: খাচ্ছিল.", inst="Choose the verb form that fits the sentence."),
  TFILL("ami",[TOKHON,GAN],"shona","pastcont",["past","pastperf","fut"],"In progress then: শুনছিলাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("ami",[AGE,BHAT],"khaoya","pastperf",["past","pastcont","habit"],"Already finished before another event: খেয়েছিলাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[AGEI,("বইটা","boita")],"pora","pastperf",["past","pastcont","pres"],"'Had already read': পড়েছিল.", inst="Choose the verb form that fits the sentence."),
  TFILL("ami",[CHHOTO,ROJ,MATHE],"khela","habit",["past","pastcont","pres"],"ছোটবেলায় + every day → used to: খেলতাম.", inst="Choose the verb form that fits the sentence."),
  TFILL(THAKUMA,[("আমাদের","amader"),GOLPO],"bola","habit",["past","pastcont","pres"],"'Used to tell': বলতেন.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[ROJ,KI],"khaoya","habit",["past","pastcont","pres"],"'What did you use to eat every day?': খেতে.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("apni",[KI],"bola","past",["pres","cont","fut"],"A finished action: বললেন.", inst="Choose the verb form that fits the sentence.", q=True),
  TMEAN("ami",[GOTOKAL,SKULE],"jaoya","past","I went to school yesterday.",[("ami",[GOTOKAL,SKULE],"jaoya","pres"),("ami",[GOTOKAL,SKULE],"jaoya","cont"),("ami",[GOTOKAL,SKULE],"jaoya","fut")],"'Went' (finished): গেলাম."),
  TMEAN("ami",[TOKHON,BHAT],"khaoya","pastcont","I was eating rice then.",[("ami",[TOKHON,BHAT],"khaoya","past"),("ami",[TOKHON,BHAT],"khaoya","pastperf"),("ami",[TOKHON,BHAT],"khaoya","habit")],"'Was eating' (in progress): খাচ্ছিলাম."),
  TMEAN("ami",[CHHOTO,ROJ,MATHE],"khela","habit","I used to play in the field every day in my childhood.",[("ami",[CHHOTO,ROJ,MATHE],"khela","past"),("ami",[CHHOTO,ROJ,MATHE],"khela","pastcont"),("ami",[CHHOTO,ROJ,MATHE],"khela","pastperf")],"'Used to play': খেলতাম."),
  TMEAN("tumi",[GOTOKAL,BOI],"pora","past","You did not read the book yesterday.",[("tumi",[GOTOKAL,BOI],"pora","pres",True),("tumi",[GOTOKAL,BOI],"pora","cont",True),("tumi",[GOTOKAL,BOI],"pora","fut",True)],"Past negative: present form + নি: পড়োনি.", neg=True),
  PICK("'When I came, he was sleeping.' Which verb forms?", O(("এলাম … ঘুমাচ্ছিল","elam … ghumachchhilo"),("আসছিলাম … ঘুমাল","aschhilam … ghumalo"),("আসব … ঘুমাচ্ছে","asbo … ghumachchhe")), 0, "The short action takes the simple past (এলাম), the long action the past continuous (ঘুমাচ্ছিল).", inst="Choose the verbs that fit the English."),
  PICK("Which tense says 'it had already happened before another moment'?", ["Simple past", "Past perfect", "Past habitual"], 1, "The past perfect looks back: -েছিল-.", inst="Choose the tense."),
  PICK("Which tense says 'it used to happen again and again'?", ["Past habitual", "Simple past", "Past continuous"], 0, "The past habitual: -ত-.", inst="Choose the tense."),
  SPOT(O(("গতকাল আমি বাজারে গেলাম।","gotokal ami bajare gelam."),("গতকাল আমি বাজারে যাব।","gotokal ami bajare jabo."),("গতকাল আমি বাজারে যাই।","gotokal ami bajare jai.")), 0, "গতকাল (yesterday) needs the past.", inst="Only one sentence uses the right tense for the time word. Choose it."),
  SPOT(O(("সে আগেই চলে গিয়েছিল।","she agei chole giyechhilo."),("সে আগেই চলে যাচ্ছিল।","she agei chole jachchhilo."),("সে আগেই চলে যাব।","she agei chole jabo.")), 0, "'Had already left' is the past perfect.", inst="Only one sentence is correct. Choose it."),
 ]))

FUTURE = finish(dict(id="tense-future", title=("ভবিষ্যৎ কাল", "Bhobishyot kal", "The future tenses"),
 blurb="The simple future, the future continuous, other ways to talk about what comes next, 'if … then', and 'has been doing for'.",
 sections=[
  dict(id="simple", title="Simple future: what will happen", blocks=[
   P("The simple future (সাধারণ ভবিষ্যৎ) is built with -ব-: root + ব / বি / বে / বেন / বে. It is used for what will happen, for promises and decisions, for predictions, and for polite requests (with আপনি as a question)."),
   TABLE(HEAD, verb_rows(SIX, "fut"), "Simple future of twelve verbs"),
   H("Plans and promises"),
   EXS([S("ami",[KAL,BAJARE],"jaoya","fut","I will go to the market tomorrow."), S("tumi",[("কখন","kokhon")],"asha","fut","When will you come?",q=True), S("se",[KAL,("ফোন","phon")],"kora","fut","He / she will phone tomorrow."),
        S(MA,[("ভাত","bhat"),("রান্না","ranna")],"kora","fut","Mother will cook rice."), S("amra",[AGAMIKAL,("সিনেমা","sinema")],"dekha","fut","We will see a film tomorrow."), S("apni",[KI],"khaoya","fut","What will you eat?",q=True),
        S("ami",[("তোমাকে","tomake"),CHITHI],"lekha","fut","I will write you a letter."), ("কাল বৃষ্টি হবে।","kal brishti hobe.","It will rain tomorrow."), S("tumi",[KIQ,("আমাকে","amake"),("সাহায্য","shahajyo")],"kora","fut","Will you help me?",q=True)], "Will"),
   H("Not in the future"),
   EXS([S("ami",[KAL],"asha","fut","I will not come tomorrow.",neg=True), S("se",[BHAT],"khaoya","fut","He / she will not eat rice.",neg=True), S("tumi",[KIQ],"jaoya","fut","Will you go?",q=True), S("amra",[AGAMIKAL,SKULE],"jaoya","fut","We will not go to school tomorrow.",neg=True)], "Negatives and questions"),
   H("Polite requests with the future"),
   EXS([("একটু জল দেবেন?","ektu jol deben?","Will you give me a little water? (polite)"), ("আমাকে একটু সাহায্য করবেন?","amake ektu shahajyo korben?","Will you help me a little? (polite)"), ("এখানে একটু বসবেন?","ekhane ektu bosben?","Will you sit here a little? (polite)")], "Please"),
  ]),

  dict(id="continuous", title="Future continuous: will be doing", blocks=[
   P("The future continuous (ঘটমান ভবিষ্যৎ) says what will be in progress at a time in the future. It is built from the -তে form plus থাকব: root + তে থাকব / থাকবি / থাকবে / থাকবেন / থাকবে. It is found in textbooks and in careful writing. In everyday speech people more often use the simple future or say 'I will be doing' with a different word order."),
   EXS([S("ami",[KAL,("সকালে","shokale"),BOI],"pora","futcont","I will be reading a book tomorrow morning."), S("se",[("সন্ধ্যায়","shondhyay"),KAJ],"kora","futcont","He / she will be working in the evening."), S("amra",[("ওই সময়","oi shomoy"),BARITE],"thaka","futcont","We will be staying at home at that time."),
        S("tumi",[("তখন","tokhon")],"ghumano","futcont","You will be sleeping then.")], "Will be doing"),
   NOTE("Say 'কাল সকালে আমি বই পড়ব' (I will read a book tomorrow morning) in conversation. Use the continuous form when you want to stress that the action will still be going on."),
  ]),

  dict(id="other", title="Other ways to talk about the future", blocks=[
   P("Bengali has several everyday ways to speak about the future besides the simple future tense."),
   RULE("1. A settled plan: present continuous", "When a plan is already fixed, use the present continuous, as English does.", [S("ami",[KAL,KOLKATAY],"jaoya","cont","I am going to Kolkata tomorrow."), S("se",[AGAMIKAL],"asha","cont","He / she is coming tomorrow.")]),
   RULE("2. Wanting: -তে চাই", "To say what you want or intend to do, use the -তে form of the verb with চাই.", [("আমি বাংলা শিখতে চাই।","ami bangla shikhte chai.","I want to learn Bengali."), ("সে ডাক্তার হতে চায়।","she daktar hote chay.","He / she wants to be a doctor.")]),
   RULE("3. Thinking of doing: -ব ভাবছি", "To say you are thinking of doing something, use the future form followed by ভাবছি.", [("আমি কাল যাব ভাবছি।","ami kal jabo bhabchhi.","I am thinking of going tomorrow."), ("আমরা বাড়ি কিনব ভাবছি।","amra bari kinbo bhabchhi.","We are thinking of buying a house.")]),
   RULE("4. Being about to: -তে যাচ্ছি", "To say something is about to happen, use the -তে form with যাচ্ছি.", [("আমি এখন খেতে যাচ্ছি।","ami ekhon khete jachchhi.","I am about to eat now."), ("বৃষ্টি শুরু হতে যাচ্ছে।","brishti shuru hote jachchhe.","It is about to start raining.")]),
   RULE("5. Having to: -তে হবে", "To say you must or will have to, use the -তে form with হবে.", [("আমাকে কাল কাজ করতে হবে।","amake kal kaj korte hobe.","I will have to work tomorrow."), ("তোমাকে আসতে হবে।","tomake aste hobe.","You will have to come.")]),
  ]),

  dict(id="if", title="If … then", blocks=[
   P("For a possible event in the future, the 'if' part takes the -লে form and the 'then' part takes the future tense: যদি তুমি এসো আমি যাব, or simply তুমি এলে আমি যাব. The word যদি (if) may be added, and তাহলে (then) can start the second part."),
   EXS([("তুমি এলে আমি খুশি হব।","tumi ele ami khushi hobo.","If you come, I will be happy."), ("বৃষ্টি হলে আমরা যাব না।","brishti hole amra jabo na.","If it rains, we will not go."), ("যদি তুমি পড়ো তাহলে পাশ করবে।","jodi tumi poro tahole pash korbe.","If you study, then you will pass."),
        ("আপনি বললে আমি করে দেব।","apni bolle ami kore debo.","If you ask, I will do it for you."), ("টাকা পেলে আমি বাড়ি কিনব।","taka pele ami bari kinbo.","If I get money, I will buy a house."), ("ঠান্ডা লাগলে জামা পরো।","thanda lagle jama poro.","If you feel cold, put on a shirt."),
        ("সময় থাকলে আমি আসব।","shomoy thakle ami ashbo.","If I have time, I will come."), ("তুমি না এলে আমি যাব না।","tumi na ele ami jabo na.","If you do not come, I will not go.")], "Possible conditions"),
  ]),

  dict(id="since", title="'Has been doing': for and since", blocks=[
   P("English says 'I have been learning Bengali for two years'. Bengali does not use a special tense for this. It uses the present continuous with ধরে (for) or থেকে (since). The action is still going on, so the verb stays in the continuous."),
   TABLE(["Word", "Meaning", "Used with"], [[c("ধরে","dhore"), "for (a period)", "a length of time: দুই বছর ধরে"], [c("থেকে","theke"), "since", "a starting point: সকাল থেকে"]]),
   EXS([("আমি দুই বছর ধরে বাংলা শিখছি।","ami dui bochhor dhore bangla shikhchhi.","I have been learning Bengali for two years."), ("সে সকাল থেকে কাজ করছে।","she shokal theke kaj korchhe.","He / she has been working since morning."), ("আমরা এক ঘণ্টা ধরে অপেক্ষা করছি।","amra ek ghonta dhore opekkha korchhi.","We have been waiting for an hour."),
        ("তিন দিন ধরে বৃষ্টি পড়ছে।","tin din dhore brishti porchhe.","It has been raining for three days."), ("আমি পাঁচ বছর ধরে কলকাতায় আছি।","ami panch bochhor dhore kolkatay achhi.","I have been in Kolkata for five years."), ("তুমি কত দিন ধরে বাংলা শিখছ?","tumi koto din dhore bangla shikhchho?","How long have you been learning Bengali?"),
        ("আমি সকাল থেকে কিছু খাইনি।","ami shokal theke kichhu khaini.","I have not eaten anything since morning."), ("সে গতকাল থেকে আসেনি।","she gotokal theke asheni.","He / she has not come since yesterday."), ("আমি তখন দুই ঘণ্টা ধরে পড়ছিলাম।","ami tokhon dui ghonta dhore porchhilam.","I had been reading for two hours then.")], "For and since"),
   NOTE("The same pattern works in the past: add ছিলাম instead of ছি, as in the last example."),
  ]),
 ],
 exercises=[
  PICK("Which sign marks the future?", ["-ব-", "-ছ-", "-ল-"], 0, "-ব- (করব, যাব).", inst="Choose the tense sign."),
  TFILL("ami",[KAL,BAJARE],"jaoya","fut",["pres","past","cont"],"কাল + future: যাব.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[("কখন","kokhon")],"asha","fut",["pres","past","perf"],"A question about the future: আসবে.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("se",[KAL,("ফোন","phon")],"kora","fut",["pres","past","perf"],"কাল + future: করবে.", inst="Choose the verb form that fits the sentence."),
  TFILL("apni",[KI],"khaoya","fut",["pres","past","cont"],"A question about what you will eat: খাবেন.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("amra",[AGAMIKAL,("সিনেমা","sinema")],"dekha","fut",["pres","past","perf"],"আগামীকাল (tomorrow) + future: দেখব.", inst="Choose the verb form that fits the sentence."),
  TFILL("ami",[("তোমাকে","tomake"),CHITHI],"lekha","fut",["pres","past","perf"],"'Will write': লিখব.", inst="Choose the verb form that fits the sentence."),
  TMEAN("ami",[KAL,BAJARE],"jaoya","fut","I will go to the market tomorrow.",[("ami",[KAL,BAJARE],"jaoya","past"),("ami",[KAL,BAJARE],"jaoya","pres"),("ami",[KAL,BAJARE],"jaoya","perf")],"'Will go': যাব."),
  TMEAN("se",[KAL],"asha","fut","He / she will not come tomorrow.",[("se",[KAL],"asha","pres",True),("se",[KAL],"asha","past",True),("se",[KAL],"asha","cont",True)],"Future negative: আসবে না.", neg=True),
  PICK("How do you say 'I want to learn Bengali'?", O(("আমি বাংলা শিখতে চাই।","ami bangla shikhte chai."),("আমি বাংলা শিখি চাই।","ami bangla shikhi chai."),("আমি বাংলা শিখলে চাই।","ami bangla shikhle chai.")), 0, "Wanting uses the -তে form with চাই.", inst="Choose the correct Bengali sentence."),
  PICK("How do you say 'I will have to work tomorrow'?", O(("আমাকে কাল কাজ করতে হবে।","amake kal kaj korte hobe."),("আমি কাল কাজ করতে হবে।","ami kal kaj korte hobe."),("আমাকে কাল কাজ করে হবে।","amake kal kaj kore hobe.")), 0, "'Have to' is -তে হবে, and the person takes the object form: আমাকে.", inst="Choose the correct Bengali sentence."),
  PICK("How do you say 'I have been learning Bengali for two years'?", O(("আমি দুই বছর ধরে বাংলা শিখছি।","ami dui bochhor dhore bangla shikhchhi."),("আমি দুই বছর ধরে বাংলা শিখেছি।","ami dui bochhor dhore bangla shikhechhi."),("আমি দুই বছর থেকে বাংলা শিখব।","ami dui bochhor theke bangla shikhbo.")), 0, "'Has been doing' = present continuous with ধরে.", inst="Choose the correct Bengali sentence."),
  PICK("Which word means 'since'?", O(("থেকে","theke"),("ধরে","dhore"),("জন্য","jonyo")), 0, "থেকে marks a starting point: সকাল থেকে.", inst="Choose the Bengali word for the English word."),
  FILL("তুমি ___ আমি খুশি হব।","tumi ___ ami khushi hobo.", O(("এলে","ele"),("এসে","eshe"),("আসব","ashbo")), 0, "The 'if' part takes -লে: এলে.", inst="Choose the form that makes the 'if' part."),
  FILL("বৃষ্টি ___ আমরা যাব না।","brishti ___ amra jabo na.", O(("হলে","hole"),("হয়","hoy"),("হবে","hobe")), 0, "'If it rains': হলে.", inst="Choose the form that makes the 'if' part."),
  FILL("সে সকাল ___ কাজ করছে।","she shokal ___ kaj korchhe.", O(("থেকে","theke"),("ধরে","dhore"),("জন্য","jonyo")), 0, "'Since morning': সকাল থেকে.", inst="Choose the word that fits."),
  FILL("আমরা এক ঘণ্টা ___ অপেক্ষা করছি।","amra ek ghonta ___ opekkha korchhi.", O(("ধরে","dhore"),("থেকে","theke"),("জন্য","jonyo")), 0, "'For an hour': এক ঘণ্টা ধরে.", inst="Choose the word that fits."),
  SPOT(O(("কাল আমি আসব।","kal ami ashbo."),("কাল আমি এসেছি।","kal ami eshechhi."),("কাল আমি এলাম।","kal ami elam.")), 0, "For tomorrow, use the future.", inst="Only one sentence uses a tense that can mean tomorrow. Choose it."),
  SPOT(O(("আমি কাল কলকাতায় যাচ্ছি।","ami kal kolkatay jachchhi."),("আমি কাল কলকাতায় গেলাম।","ami kal kolkatay gelam."),("আমি কাল কলকাতায় গিয়েছিলাম।","ami kal kolkatay giyechhilam.")), 0, "A settled plan for tomorrow can use the present continuous.", inst="Only one sentence is about a plan for tomorrow. Choose it."),
 ]))

def table_section(sid, title, keys, blurb):
    return dict(id=sid, title=title, blocks=[P(blurb)] + [verb_table(k) for k in keys])

TABLES = finish(dict(id="tense-tables", title=("কাল-তালিকা", "Kal-talika", "Verb tables: every tense"),
 blurb="Full tables for nineteen common verbs: every tense, every person. Use them to check a form or to learn a verb thoroughly.",
 sections=[
  dict(id="how", title="How to use these tables", blocks=[
   P("Each table has the nine tenses in rows and the five person endings in columns: আমি, তুই, তুমি, আপনি / তিনি, সে. For the plural pronouns, use the same form as the singular: আমরা takes the আমি form, তোমরা the তুমি form, আপনারা the আপনি form, তারা the সে form."),
   LIST(["Look up the verb in the left-hand title.", "Find the tense in the first column.", "Read across to the person you need.", "Plural pronouns share the form of their singular pronoun."], ordered=True, title="Looking up a form"),
   NOTE("Regular verbs follow the pattern in the Tenses lesson, so you can build forms yourself. The irregular verbs খাওয়া, যাওয়া, দেওয়া, নেওয়া, আসা, লেখা, শোনা and ঘুমানো change their root in some tenses, so check them in the table."),
  ]),
  table_section("t1", "করা, বলা, দেখা, শোনা", ("kora","bola","dekha","shona"), "Four very common verbs."),
  table_section("t2", "পড়া, লেখা, থাকা, বসা", ("pora","lekha","thaka","bosha"), "Verbs for study and for staying."),
  table_section("t3", "খেলা, হাঁটা, ধরা, রাখা, চলা", ("khela","hata","dhora","rakha","chola"), "Regular verbs for movement and handling."),
  table_section("t4", "খাওয়া, যাওয়া, আসা", ("khaoya","jaoya","asha"), "Three irregular verbs you use all day."),
  table_section("t5", "দেওয়া, নেওয়া, ঘুমানো", ("deoya","neoya","ghumano"), "Giving, taking and sleeping."),
 ],
 exercises=[
  TFILL("ami",[GOTOKAL,BOI],"lekha","past",["pres","cont","fut"],"A finished action yesterday: লিখলাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[EKHON,("কী","ki")],"shona","cont",["pres","past","fut"],"Right now: শুনছ.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("apni",[KAL,KOLKATAY],"jaoya","fut",["pres","past","cont"],"Tomorrow: যাবেন.", inst="Choose the verb form that fits the sentence."),
  TFILL("se",[ROJ,SHOKALE,CHA],"khaoya","pres",["cont","past","fut"],"A daily habit: খায়.", inst="Choose the verb form that fits the sentence."),
  TFILL("tui",[BOI],"neoya","perf",["pres","cont","fut"],"Finished: নিয়েছিস.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[AMAKE,JOL],"deoya","past",["pres","cont","fut"],"A finished action: দিলে.", inst="Choose the verb form that fits the sentence."),
  TFILL("amra",[PROTIDIN,PARKE],"hata","habit",["pres","past","fut"],"Used to: হাঁটতাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("ami",[TOKHON],"ghumano","pastcont",["past","pres","fut"],"In progress then: ঘুমাচ্ছিলাম.", inst="Choose the verb form that fits the sentence."),
  TFILL("tara",[AGAMIKAL],"asha","fut",["pres","past","perf"],"Tomorrow: আসবে.", inst="Choose the verb form that fits the sentence."),
  TFILL(DADU,[GOLPO],"bola","cont",["pres","past","fut"],"Right now: বলছেন.", inst="Choose the verb form that fits the sentence."),
  TFILL("tui",[EKHON,("কোথায়","kothay")],"jaoya","cont",["pres","past","fut"],"Right now with তুই: যাচ্ছিস.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("se",[EIMATRO],"asha","perf",["pres","past","fut"],"Just now: এসেছে.", inst="Choose the verb form that fits the sentence."),
  TFILL("tumi",[AGE],"asha","pastperf",["past","pres","fut"],"Before that: এসেছিলে.", inst="Choose the verb form that fits the sentence."),
  TFILL("apni",[("কী","ki")],"kora","pres",["cont","past","fut"],"What do you do (usually): করেন.", inst="Choose the verb form that fits the sentence.", q=True),
  TFILL("ami",[CHITHI],"lekha","fut",["pres","past","cont"],"Will write: লিখব.", inst="Choose the verb form that fits the sentence."),
 ]))

TOPICS = [PAST, FUTURE, TABLES]

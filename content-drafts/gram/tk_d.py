"""Tense lessons, part 2: the past tenses (simple past = -েছিলাম, past continuous = -ছিলাম, past perfect = -েছিলাম with আগে / আগেই, habitual past = -তাম)."""
from tk_c import *

PAST_SIGNALS = [(("গতকাল / কাল", "gotokal / kal"), "yesterday"), (("গত সপ্তাহে", "goto shoptahe"), "last week"), (("গত মাসে", "goto mashe"), "last month"), (("গত বছর", "goto bochhor"), "last year"), (("সেদিন", "shedin"), "that day")]
PCONT_SIGNALS = [(("তখন", "tokhon"), "then, at that time"), (("সেই সময়", "shei shomoy"), "at that time"), (("যখন … তখন …", "jokhon … tokhon …"), "when … then …"), (("সারাদিন", "saradin"), "all day")]
PPERF_SIGNALS = [(("আগে", "age"), "before"), (("আগেই", "agei"), "already, before that"), (("…ার আগে", "…ar age"), "before doing …"), (("ততক্ষণে", "totokkhone"), "by then")]
AGEI = ("আগেই", "agei")

def past_topic():
    secs = []
    secs.append(dict(id="glance", title="The past tenses at a glance", blocks=[
        P("অতীত কাল (otit kal) is the past. Bengali has four past tenses. This lesson teaches the first three in detail, plus the habitual past (\"used to\"), and ends with a story that uses them together."),
        TABLE(["#", "Name", "In English", "The question it answers", "Sign"], [
            ["1", c("সাধারণ অতীত", "sadharon otit"), "Simple past", "What happened (and is over)?", "-েছিল-"],
            ["2", c("ঘটমান অতীত", "ghotoman otit"), "Past continuous", "What was in progress at that time?", "-ছিল-"],
            ["3", c("পুরাঘটিত অতীত", "puraghotito otit"), "Past perfect", "What had already happened before another past action?", "-েছিল- + আগে / আগেই"],
            ["4", c("নিত্যবৃত্ত অতীত", "nityobritto otit"), "Habitual past", "What used to happen again and again?", "-ত-"],
        ], "Four past tenses"),
        H("How the verb changes"),
        RULE("The formula", "root + tense sign + person ending", [("কর + েছিল + াম = করেছিলাম", "kor + echhil + am = korechhilam", "I did (simple past)"), ("কর + ছিল + াম = করছিলাম", "kor + chhil + am = korchhilam", "I was doing (past continuous)"), ("আগেই + করেছিলাম", "agei + korechhilam", "I had already done (past perfect)")]),
        H("The past person endings"),
        P("The endings are the same in every past tense: -লাম for আমি, -লি for তুই, -লে for তুমি, -লেন for আপনি / তিনি and -ল for সে. Plural pronouns share the ending of the singular one: আমি / আমরা, তুমি / তোমরা, সে / ও / ওরা, আপনি / আপনারা."),
        TABLE(["Person", "Simple past (-েছিল-)", "Past continuous (-ছিল-)", "Past perfect (-েছিল-)"], [[person_cell(i), ending_cell("past", i), ending_cell("pastcont", i), ending_cell("pastperf", i)] for i in range(5)], "The past endings"),
        NOTE("The simple past and the past perfect have exactly the same verb form: করেছিলাম. What is different is the meaning. With a past time word (গতকাল, গত সপ্তাহে) the verb is the simple past: 'I did'. With আগে or আগেই (before, already) the verb is the past perfect: 'I had done'."),
        H("The same sentence in all three"),
        EXS([S("ami", [GOTOKAL, BHAT], "khaoya", "past", "I ate rice yesterday. (simple past)"), S("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was eating rice then. (past continuous)"), S("ami", [AGEI, BHAT], "khaoya", "pastperf", "I had already eaten rice. (past perfect)")], "One verb, three meanings"),
        NOTE("Every past tense has a negative, taught in its own section. The simple past and the past perfect take -নি joined to the SIMPLE PRESENT form (খাইনি). The past continuous and the habitual past take না after the verb."),
    ]))
    # ---- simple past
    secs.append(dict(id="simple", title="Simple past: it happened, and it is over", blocks=[
        H("When do we use it?"),
        P("The simple past (সাধারণ অতীত, sadharon otit) tells what happened at a past time that is over. Use it for finished actions with a time word like yesterday, last week, last month or last year, and for telling what happened: trips, events, stories."),
        LIST(["A finished action in the past: আমি গতকাল ভাত খেয়েছিলাম। (I ate rice yesterday.)", "Telling what happened: গত মাসে আমরা কলকাতায় গিয়েছিলাম। (We went to Kolkata last month.)", "A question about the past: তুমি কি রসগোল্লা খেয়েছিলে? (Did you eat rasgulla?)"], title="Three uses"),
        H("How the verb changes"),
        RULE("The formula", "root + েছিল + person ending", [("কর + েছিল + াম = করেছিলাম", "kor + echhil + am = korechhilam", "I did"), ("দেখ + েছিল + ে = দেখেছিলে", "dekh + echhil + e = dekhechhile", "you (familiar) saw")]),
        person_table("past", title="Simple past of করা (kora, to do)"),
        NOTE("Roots change their vowel exactly as in the present perfect. খা → খেয়ে (খেয়েছিলাম), যা → গিয়ে (গিয়েছিলাম), আস → এস (এসেছিলাম), লেখ → লিখ (লিখেছিলাম), শোন → শুন (শুনেছিলাম), থাক → থেক (থেকেছিলাম). যাওয়া is the irregular one: its past stem is গিয়ে-."),
        H("Twelve verbs"),
        verbs_table("past", title="Simple past of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [GOTOKAL, MACH, ("ঝোল", "jhol")], "khaoya", "past", "I ate fish curry yesterday."), S("amra", [("কাল রাতে", "kal rate"), ("একটা বাংলা সিনেমা", "ekta bangla sinema")], "dekha", "past", "We watched a Bengali film last night."), S(MA, [AMAKE, ("একটা গল্প", "ekta golpo")], "bola", "past", "Mother told me a story."),
             S("tumi", [("কি", "ki"), ("রসগোল্লা", "roshogolla")], "khaoya", "past", "Did you eat rasgulla?", q=True), S("amra", [("গত মাসে", "goto mashe"), KOLKATAY], "jaoya", "past", "We went to Kolkata last month."), S("se", [AMAKE, ("একটা চিঠি", "ekta chithi")], "lekha", "past", "He / she wrote me a letter."),
             S("ami", [GOTOKAL, BAJARE], "jaoya", "past", "I went to the market yesterday."), S(BABA, [AMAKE, ("একটা বই", "ekta boi")], "deoya", "past", "Father gave me a book."), S("tara", [KOLKATAY], "asha", "past", "They came to Kolkata."), S("apni", [KI], "bola", "past", "What did you say?", q=True)], "Finished actions"),
        signals(PAST_SIGNALS),
        NOTE("কাল (kal) means both 'yesterday' and 'tomorrow'. The tense of the verb tells you which one: কাল গিয়েছিলাম is 'I went yesterday' (past); কাল যাব is 'I will go tomorrow' (future). To be clear, say গতকাল (yesterday) or আগামীকাল (tomorrow)."),
        MISTAKES([
            (("গতকাল আমি বাজারে যাব।", "gotokal ami bajare jabo."), ("গতকাল আমি বাজারে গিয়েছিলাম।", "gotokal ami bajare giyechhilam."), "গতকাল means yesterday, so the verb must be in the past."),
            (("আমি গতকাল ভাত খেয়েছি।", "ami gotokal bhat kheyechhi."), ("আমি গতকাল ভাত খেয়েছিলাম।", "ami gotokal bhat kheyechhilam."), "-েছি is the present perfect (it still matters now). A finished yesterday needs -েছিলাম."),
        ], title="Yesterday means past"),
    ]))
    secs.append(dict(id="simple-neg", title="Simple past: the negative", blocks=[
        H("The rule: -নি, not না"),
        RULE("Take the simple present form and add -নি", "The simple past negative does not use না. Take the SIMPLE PRESENT form of the verb for that person and join নি (ni) to it. It is exactly the same as the present perfect negative.", [S("ami", [GOTOKAL, SKULE], "jaoya", "past", "I did not go to school yesterday.", neg=True)]),
        LIST(["Find the simple PRESENT form for that person: যাই (jai).", "Join নি to it, with no space: যাইনি (jaini).", "Add a past time word (গতকাল) to show it is 'did not', not 'have not'."], ordered=True, title="Three steps"),
        neg_person_table("past", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("past", neg=True, title="Simple past, negative (simple present form + নি)"),
        NOTE("Same as the present perfect negative: খাইনি can mean 'I have not eaten' or 'I did not eat'. The time word tells you which: আজ (today) or এখনও (yet) → 'have not'; গতকাল (yesterday) → 'did not'."),
        H("Examples"),
        EXS([S("ami", [GOTOKAL, SKULE], "jaoya", "past", "I did not go to school yesterday.", neg=True), S("tumi", [GOTOKAL], "asha", "past", "You did not come yesterday.", neg=True), S("se", [GOTOKAL, BHAT], "khaoya", "past", "He / she did not eat rice yesterday.", neg=True),
             S(MA, [GOTOKAL, BAJARE], "jaoya", "past", "Mother did not go to the market yesterday.", neg=True), S("ami", [("সিনেমাটা", "sinemata")], "dekha", "past", "I did not watch the film.", neg=True)], "Negative sentences"),
        H("Questions"),
        EXS([S("apni", [("কি", "ki"), GOTOKAL, OFISE], "jaoya", "past", "Did you go to the office yesterday?", q=True), S("tumi", [GOTOKAL, ("কোথায়", "kothay")], "jaoya", "past", "Where did you go yesterday?", q=True), S("tumi", [GOTOKAL, ("কেন", "keno")], "asha", "past", "Why did you not come yesterday?", q=True, neg=True)], "Questions"),
        MISTAKES([
            (("আমি গতকাল যাইনি না।", "ami gotokal jaini na."), ("আমি গতকাল যাইনি।", "ami gotokal jaini."), "Use only ONE negative marker. -নি already says 'not'."),
            (("আমি গতকাল গিয়েছিলাম না।", "ami gotokal giyechhilam na."), ("আমি গতকাল যাইনি।", "ami gotokal jaini."), "The simple past does not take না. Use the simple present form + নি."),
        ], title="One negative only"),
    ]))
    # ---- past continuous
    secs.append(dict(id="continuous", title="Past continuous: in progress at that time", blocks=[
        H("When do we use it?"),
        P("The past continuous (ঘটমান অতীত, ghotoman otit) describes something that was going on at a certain time in the past. It is the tense of the scene: the background of a story."),
        LIST(["In progress at a certain time: কাল রাত দশটায় আমি টিভি দেখছিলাম। (At ten last night I was watching TV.)", "Going on when something else happened: তুমি যখন ফোন করলে, আমি রান্না করছিলাম। (When you called, I was cooking.)", "The scene or background: বাইরে বৃষ্টি পড়ছিল। (It was raining outside.)"], title="Three uses"),
        H("How the verb changes"),
        RULE("The formula", "root + ছিল + person ending", [("কর + ছিল + াম = করছিলাম", "kor + chhil + am = korchhilam", "I was doing"), ("খা + চ্ছিল + ে = খাচ্ছিলে", "kha + chchhil + e = khachchhile", "you were eating")]),
        person_table("pastcont", title="Past continuous of করা (kora, to do)"),
        NOTE("An easy trick: it is the present continuous with -ইল added. করছি → করছিলাম (korchhi → korchhilam); খাচ্ছে → খাচ্ছিল (khachchhe → khachchhilo). After a vowel-ending root, ছ is doubled to চ্ছ, as in the present continuous."),
        H("Twelve verbs"),
        verbs_table("pastcont", title="Past continuous of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was eating rice then."), S("tumi", [("কাল সন্ধ্যায়", "kal shondhyay"), KI], "kora", "pastcont", "What were you doing yesterday evening?", q=True), ("বাইরে বৃষ্টি পড়ছিল।", "baire brishti porchhilo.", "It was raining outside."),
             S(MA, [TOKHON, ("চা", "cha")], "kora", "pastcont", "Mother was making tea then."), S("amra", [("ট্রেনে", "trene"), GAN], "shona", "pastcont", "We were listening to songs on the train."), S("ora", [TOKHON, MATHE], "khela", "pastcont", "They were playing in the field then.")], "In progress then"),
        H("One action interrupted by another"),
        P("Use যখন … তখন … ('when … then …'). The long action takes the past continuous, and the short action that cut across it takes the simple past."),
        EXS([("তুমি যখন ফোন করেছিলে, আমি রান্না করছিলাম।", "tumi jokhon phone korechhile, ami ranna korchhilam.", "When you phoned, I was cooking."), ("আমি যখন খাচ্ছিলাম তখন ফোন বেজেছিল।", "ami jokhon khachchhilam tokhon phon bejechhilo.", "When I was eating, the phone rang."), ("সে যখন পড়ছিল তখন আলো চলে গিয়েছিল।", "she jokhon porchhilo tokhon alo chole giyechhilo.", "While he / she was studying, the lights went out.")], "While and when"),
        signals(PCONT_SIGNALS),
        MISTAKES([
            (("আমি তখন ভাত খেয়েছিলাম।", "ami tokhon bhat kheyechhilam."), ("আমি তখন ভাত খাচ্ছিলাম।", "ami tokhon bhat khachchhilam."), "তখন with an action that was going on needs the continuous (-ছিলাম), not the simple past."),
        ], title="Was doing, or did?"),
    ]))
    secs.append(dict(id="continuous-neg", title="Past continuous: the negative", blocks=[
        H("The rule"),
        RULE("Add না after the verb", "Keep the past continuous verb exactly as it is. Put না (na) after it as a separate word.", [S("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was not eating rice then.", neg=True)]),
        neg_person_table("pastcont", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("pastcont", neg=True, title="Past continuous, negative"),
        H("Examples"),
        EXS([S("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was not eating rice then.", neg=True), S("tumi", [("আমার কথা", "amar kotha")], "shona", "pastcont", "You were not listening to me.", neg=True), S("se", [TOKHON, ("টিভি", "tibhi")], "dekha", "pastcont", "He / she was not watching TV then.", neg=True),
             S(MA, [TOKHON, ("রান্না", "ranna")], "kora", "pastcont", "Mother was not cooking then.", neg=True)], "Negative sentences"),
        EXS([S("tumi", [TOKHON, KIQ, BOI], "pora", "pastcont", "Were you reading a book then?", q=True)], "A question"),
        MISTAKES([
            (("আমি তখন খাচ্ছিনি।", "ami tokhon khachchhini."), ("আমি তখন খাচ্ছিলাম না।", "ami tokhon khachchhilam na."), "The past continuous takes না, as a separate word, not -নি."),
        ], title="না, not নি"),
    ]))
    # ---- past perfect
    secs.append(dict(id="perfect", title="Past perfect: it had already happened", blocks=[
        H("When do we use it?"),
        P("The past perfect (পুরাঘটিত অতীত, puraghotito otit) is used when TWO past actions are mentioned, and one finished before the other started. It says which came first: the earlier action is the past perfect."),
        LIST(["One past action before another: আমি পৌঁছানোর আগেই ট্রেন চলে গিয়েছিল। (The train had already left before I reached.)", "Something done before a past time: মা আসার আগেই আমরা খেয়েছিলাম। (We had eaten before Ma came.)", "An earlier past experience: ত্রিপুরা যাওয়ার আগে আমি কিছু বাংলা শিখেছিলাম। (Before going to Tripura I had learned some Bengali.)"], title="Three uses"),
        H("How the verb changes"),
        RULE("The formula", "the SAME form as the simple past, plus আগে / আগেই", [("আগেই + করেছিলাম", "agei + korechhilam", "I had already done it"), ("খাওয়ার আগে = before eating", "khaoar age = before eating", "")]),
        P("The verb form is the same as the simple past: করেছিলাম (korechhilam). What marks the past perfect is the word আগে (age, before) or আগেই (agei, already / even before). It tells the listener which action came first."),
        person_table("pastperf", title="Past perfect of করা (kora, to do), with আগেই"),
        H("The key pattern: …ার আগে = before doing …"),
        P("To say 'before doing X', take the verb's noun form (X-া) and add -র, then say আগে or আগেই."),
        TABLE(["Verb", "Before doing …"], [[c("আসা (asha, to come)", "asha"), c("আসার আগে", "ashar age")], [c("যাওয়া (jaoya, to go)", "jaoya"), c("যাওয়ার আগে", "jaoar age")], [c("করা (kora, to do)", "kora"), c("করার আগে", "korar age")], [c("খাওয়া (khaoya, to eat)", "khaoya"), c("খাওয়ার আগে", "khaoar age")], [c("পৌঁছানো (pouchhano, to reach)", "pouchhano"), c("পৌঁছানোর আগে", "pouchhanor age")], [c("ক্লাস (class)", "class"), c("ক্লাসের আগে", "classer age")]], "Before doing …"),
        H("Twelve verbs"),
        verbs_table("pastperf", title="Past perfect of twelve verbs (with আগেই)"),
        H("Examples"),
        EXS([("আমি পৌঁছানোর আগেই ট্রেন চলে গিয়েছিল।", "ami pouchhanor agei tren chole giyechhilo.", "The train had already left before I reached."), ("মা আসার আগেই আমরা খেয়েছিলাম।", "ma ashar agei amra kheyechhilam.", "We had eaten before Ma came."), ("ক্লাসের আগে আমি বইটা পড়েছিলাম।", "classer age ami boita porechhilam.", "I had read the book before class."),
             ("কলকাতায় যাওয়ার আগে আমি কিছু বাংলা শিখেছিলাম।", "kolkatay jaoar age ami kichhu bangla shikhechhilam.", "I had learned some Bengali before going to Kolkata."), ("তুমি ফোন করার আগেই আমি চিঠিটা লিখেছিলাম।", "tumi phon korar agei ami chithita likhechhilam.", "I had written the letter before you phoned."),
             S("se", [AGEI, ("বইটা", "boita")], "pora", "pastperf", "He / she had already read the book.")], "One action before another"),
        signals(PPERF_SIGNALS),
        MISTAKES([
            (("মা আসার আগে আমি খাচ্ছিলাম।", "ma ashar age ami khachchhilam."), ("মা আসার আগেই আমি খেয়েছিলাম।", "ma ashar agei ami kheyechhilam."), "'Had eaten' (finished before) needs -েছিলাম. The continuous -ছিলাম means the eating was still going on."),
            (("আমি আসি আগে।", "ami ashi age."), ("আমি আগেই এসেছিলাম।", "ami agei eshechhilam."), "আগে / আগেই comes before the verb, and the verb is in the past."),
        ], title="Which came first?"),
    ]))
    secs.append(dict(id="perfect-neg", title="Past perfect: the negative", blocks=[
        H("The rule: the same -নি as the simple past"),
        RULE("Simple present form + নি, with আগে", "The past perfect negative is built exactly like the simple past negative: take the simple present form and join নি. Keep the word আগে (before) so the listener knows it is the past perfect.", [S("ami", [("মা আসার", "ma ashar"), AGE], "khaoya", "pastperf", "I had not eaten before Ma came.", neg=True)]),
        neg_person_table("pastperf", title="How the negative is made, person by person (with আগে)"),
        H("Twelve verbs, negative"),
        verbs_table("pastperf", neg=True, title="Past perfect, negative (আগে + simple present form + নি)"),
        H("Examples"),
        EXS([("মা আসার আগে আমি খাইনি।", "ma ashar age ami khaini.", "I had not eaten before Ma came."), ("ক্লাসের আগে সে বইটা পড়েনি।", "classer age she boita poreni.", "He / she had not read the book before class."), ("কলকাতায় যাওয়ার আগে উনি বাংলা শোনেননি।", "kolkatay jaoar age uni bangla shonenni.", "He had not heard Bengali before going to Kolkata.")], "Negative sentences"),
        NOTE("Remember the three negatives that look the same: খাইনি can mean 'I have not eaten' (present perfect, with আজ or এখনও), 'I did not eat' (simple past, with গতকাল) and 'I had not eaten' (past perfect, with আগে). The time word tells you which."),
        MISTAKES([
            (("মা আসার আগে আমি খেয়েছিলাম না।", "ma ashar age ami kheyechhilam na."), ("মা আসার আগে আমি খাইনি।", "ma ashar age ami khaini."), "Do not put না after -েছিলাম. Use the simple present form + নি."),
        ], title="The -নি rule again"),
    ]))
    # ---- habitual
    secs.append(dict(id="habitual", title="Habitual past: what used to happen", blocks=[
        H("When do we use it?"),
        P("The habitual past (নিত্যবৃত্ত অতীত, nityobritto otit) describes what used to happen again and again in the past, and what would happen every time. It is also used for imagined situations: 'I would say if I knew'."),
        LIST(["A past habit: আমি ছোটবেলায় রোজ মাঠে খেলতাম। (In childhood I used to play in the field every day.)", "A past routine: ঠাকুমা আমাদের গল্প বলতেন। (Grandmother used to tell us stories.)", "An imagined situation: আমি জানলে বলতাম। (If I had known, I would have said so.)"], title="Three uses"),
        H("How the verb changes"),
        RULE("The formula", "root + ত + person ending", [("কর + ত + াম = করতাম", "kor + t + am = kortam", "I used to do"), ("বল + ত + েন = বলতেন", "bol + t + en = bolten", "you / he, she used to say (respectful)")]),
        person_table("habit", title="Habitual past of করা (kora, to do)"),
        verbs_table("habit", title="Habitual past of twelve verbs"),
        EXS([S("ami", [CHHOTO, ROJ, MATHE], "khela", "habit", "I used to play in the field every day in my childhood."), S("tumi", [ROJ, KI], "khaoya", "habit", "What did you use to eat every day?", q=True), S(THAKUMA, [("আমাদের", "amader"), GOLPO], "bola", "habit", "Grandmother used to tell us stories."),
             S("amra", [("প্রতি রবিবার", "proti robibar"), BAJARE], "jaoya", "habit", "We used to go to the market every Sunday."), S(BABA, [ROJ, SHOKALE], "hata", "habit", "Father used to walk every morning.")], "Used to"),
        H("Negative: add না after the verb"),
        EXS([S("ami", [TOKHON, PROTIDIN, CHA], "khaoya", "habit", "I did not use to drink tea every day then.", neg=True), S("se", [CHHOTO, BHAT], "khaoya", "habit", "He / she did not use to eat rice in childhood.", neg=True), S("apni", [KIQ, AGE, ("এখানে", "ekhane")], "asha", "habit", "Did you use to come here before?", q=True)], "Negatives and questions"),
        H("Would, if"),
        EXS([("আমি জানলে বলতাম।", "ami janle boltam.", "If I had known, I would have said so."), ("তুমি এলে আমি খুশি হতাম।", "tumi ele ami khushi hotam.", "If you had come, I would have been happy."), ("টাকা থাকলে আমি কিনতাম।", "taka thakle ami kintam.", "If I had money, I would buy it.")], "Unreal ideas"),
    ]))
    secs.append(dict(id="story", title="Telling a story: the past tenses together", blocks=[
        P("In a real story the past tenses work together. The simple past moves the story forward. The past continuous paints the background. The past perfect looks back at what had already happened. The habitual past says what used to be true. Read the example and notice which tense each sentence uses."),
        EXS([("গতকাল সকালে আমি ঘুম থেকে উঠেছিলাম।", "gotokal shokale ami ghum theke uthechhilam.", "Yesterday morning I woke up.  (simple past: the story moves)"), ("মা তখন রান্না করছিলেন।", "ma tokhon ranna korchhilen.", "Mother was cooking then.  (past continuous: background)"),
             ("বাবা আগেই অফিসে চলে গিয়েছিলেন।", "baba agei ofise chole giyechhilen.", "Father had already gone to the office.  (past perfect: earlier)"), ("আমি মুখ ধুয়ে চা খেয়েছিলাম।", "ami mukh dhuye cha kheyechhilam.", "I washed my face and drank tea.  (simple past)"),
             ("ছোটবেলায় আমি হেঁটে স্কুলে যেতাম।", "chhotobelay ami hete skule jetam.", "In my childhood I used to walk to school.  (habitual past)"), ("আজ আমি বাসে স্কুলে গিয়েছিলাম।", "aj ami base skule giyechhilam.", "Today I went to school by bus.  (simple past)")], "One morning"),
        H("The four past tenses side by side"),
        TABLE(["Tense", "It says", "Positive", "Negative"], [
            [c("সাধারণ অতীত", "sadharon otit"), "It happened and is over", c("আমি ভাত খেয়েছিলাম।", "ami bhat kheyechhilam."), c("আমি ভাত খাইনি।", "ami bhat khaini.")],
            [c("ঘটমান অতীত", "ghotoman otit"), "It was in progress", c("আমি ভাত খাচ্ছিলাম।", "ami bhat khachchhilam."), c("আমি ভাত খাচ্ছিলাম না।", "ami bhat khachchhilam na.")],
            [c("পুরাঘটিত অতীত", "puraghotito otit"), "It had happened before", c("আমি আগেই ভাত খেয়েছিলাম।", "ami agei bhat kheyechhilam."), c("আমি আগে ভাত খাইনি।", "ami age bhat khaini.")],
            [c("নিত্যবৃত্ত অতীত", "nityobritto otit"), "It used to happen", c("আমি ভাত খেতাম।", "ami bhat khetam."), c("আমি ভাত খেতাম না।", "ami bhat khetam na.")],
        ]),
    ]))
    secs.append(dict(id="summary", title="Summary: one verb, three past tenses", blocks=[
        P("খাওয়া (khaoya, to eat) in every person, positive and negative. Study the pattern in the table, then test yourself."),
        TABLE(["Person", "Simple past", "Past continuous", "Past perfect"], [[person_cell(i), vcell("khaoya", "past", i), vcell("khaoya", "pastcont", i), vcell("khaoya", "pastperf", i, False, AGEI_P)] for i in range(5)], "Positive"),
        TABLE(["Person", "Simple past", "Past continuous", "Past perfect"], [[person_cell(i), vcell("khaoya", "past", i, True), vcell("khaoya", "pastcont", i, True), vcell("khaoya", "pastperf", i, True, NEG_PREFIX["pastperf"])] for i in range(5)], "Negative"),
        LIST(["Simple past: -েছিলাম. Negative: simple present form + -নি.", "Past continuous: -ছিলাম. Negative: add না.", "Past perfect: the same form as the simple past with আগে / আগেই. Negative: আগে + simple present form + -নি.", "Simple past and past perfect look the same. আগে / আগেই tells you it is the past perfect."], title="Remember"),
    ]))
    return secs

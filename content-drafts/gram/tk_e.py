"""Tense lessons, part 3: the future tenses (simple future -ব, future continuous -তে থাকব, future perfect -এ থাকব)."""
from tk_c import *

FUT_SIGNALS = [(("কাল / আগামীকাল", "kal / agamikal"), "tomorrow"), (("পরশু", "porshu"), "the day after tomorrow"), (("আগামী সপ্তাহে", "agami shoptahe"), "next week"), (("আগামী মাসে", "agami mashe"), "next month"), (("পরে", "pore"), "later"), (("শিগগিরই", "shiggiri"), "soon")]
FCONT_SIGNALS = [(("সারাদিন", "saradin"), "all day"), (("সারারাত", "shararat"), "all night"), (("রোজ", "roj"), "every day"), (("যতদিন", "jotodin"), "as long as")]
FPERF_SIGNALS = [(("ততক্ষণে", "totokkhone"), "by then"), (("…র আগে", "…r age"), "before …"), (("…র মধ্যে", "…r moddhe"), "by, within …"), (("হয়তো", "hoyto"), "maybe"), (("নিশ্চয়ই", "nishchoyi"), "surely")]

def future_topic():
    secs = []
    secs.append(dict(id="glance", title="The future tenses at a glance", blocks=[
        P("ভবিষ্যৎ কাল (bhobishyot kal) is the future. Bengali has three future tenses that you will use every day. A fourth, the future request (a polite 'do it later'), is covered under polite requests."),
        TABLE(["#", "Name", "In English", "The question it answers", "Built as"], [
            ["1", c("সাধারণ ভবিষ্যৎ", "sadharon bhobishyot"), "Simple future", "What will happen?", "root + -ব- + ending"],
            ["2", c("ঘটমান ভবিষ্যৎ", "ghotoman bhobishyot"), "Future continuous", "What will keep going on?", "-তে form + থাকব"],
            ["3", c("পুরাঘটিত ভবিষ্যৎ", "puraghotito bhobishyot"), "Future perfect", "What will be finished by then? (or a guess about the past)", "-এ form + থাকব"],
        ], "Three future tenses"),
        H("How the verb changes"),
        RULE("The formula", "root + ব + person ending", [("কর + ব = করব", "kor + b = korbo", "I will do"), ("কর + বে = করবে", "kor + be = korbe", "you (familiar) / he / she will do"), ("কর + বেন = করবেন", "kor + ben = korben", "you (respectful) / he, she (respectful) will do")]),
        H("The future person endings"),
        TABLE(["Person", "Ending", "করা (kora)"], [[person_cell(i), ending_cell("fut", i), vcell("kora", "fut", i)] for i in range(5)], "Future endings"),
        NOTE("Good news: তুমি and সে have exactly the same form in the future (করবে). The verb does not change for plural: আমি করব and আমরা করব use the same form."),
        H("The same sentence in all three"),
        EXS([S("ami", [KAL, BHAT], "khaoya", "fut", "I will eat rice tomorrow. (simple future)"), S("ami", [("সারাদিন", "saradin")], "khaoya", "futcont", "I will keep eating all day. (future continuous)"), S("ami", [("তুমি আসার আগে", "tumi ashar age")], "khaoya", "futperf", "I will have eaten before you come. (future perfect)")], "One verb, three meanings"),
        NOTE("Every future tense has a negative, and it is the easiest of all: always put না after the verb. Never -নি."),
    ]))
    secs.append(dict(id="simple", title="Simple future: what will happen", blocks=[
        H("When do we use it?"),
        P("The simple future (সাধারণ ভবিষ্যৎ, sadharon bhobishyot) says what will happen. Use it for plans, promises, decisions, predictions and questions about the future."),
        LIST(["Plans and things that will happen: আমরা আগামী মাসে ত্রিপুরা যাব। (We will go to Tripura next month.)", "Promises and decisions: আমি তোমাকে চিঠি লিখব। (I will write you a letter.)", "Predictions: কাল বৃষ্টি হবে। (It will rain tomorrow.)", "Questions about the future: তুমি কখন আসবে? (When will you come?)"], title="Four uses"),
        H("How the verb changes"),
        RULE("The formula", "root + ব + person ending", [("কর + ব = করব", "kor + b = korbo", "I will do"), ("দেখ + বে = দেখবে", "dekh + be = dekhbe", "you / he / she will see"), ("খা + বেন = খাবেন", "kha + ben = khaben", "you / he, she (respectful) will eat")]),
        person_table("fut", title="Simple future of করা (kora, to do)"),
        NOTE("Roots with a vowel change: লেখা → লিখব (likhbo), শোনা → শুনব (shunbo), যাওয়া → যাব (jabo, not গিয়ে-). খাওয়া → খাব (khabo). আসা → আসব (ashbo)."),
        H("Twelve verbs"),
        verbs_table("fut", title="Simple future of twelve verbs"),
        H("Examples"),
        EXS([S("amra", [("আগামী মাসে", "agami mashe"), ("ত্রিপুরা", "tripura")], "jaoya", "fut", "We will go to Tripura next month."), S("ami", [KAL, MACH, ("ঝোল", "jhol")], "khaoya", "fut", "I will eat fish curry tomorrow."), S(MA, [("আমাদের জন্য", "amader jonyo"), ("পায়েস", "payesh")], "kora", "fut", "Ma will make payesh for us."),
             S("tumi", [("কখন", "kokhon")], "asha", "fut", "When will you come?", q=True), S("ami", [("মায়ের সঙ্গে", "mayer shonge"), BANGLA, ("কথা", "kotha")], "bola", "fut", "I will talk with Ma in Bengali."), S("amra", [("আজ রাতে", "aj rate"), ("একটা বাংলা সিনেমা", "ekta bangla sinema")], "dekha", "fut", "We will watch a Bengali film tonight."),
             S("ami", [("তোমাকে", "tomake"), CHITHI], "lekha", "fut", "I will write you a letter."), ("কাল বৃষ্টি হবে।", "kal brishti hobe.", "It will rain tomorrow.")], "Plans, promises, predictions"),
        signals(FUT_SIGNALS),
        H("Polite requests with the future"),
        EXS([("একটু জল দেবেন?", "ektu jol deben?", "Will you give me a little water? (polite)"), ("আমাকে একটু সাহায্য করবেন?", "amake ektu shahajyo korben?", "Will you help me a little? (polite)"), ("এখানে একটু বসবেন?", "ekhane ektu boshben?", "Will you sit here a little? (polite)")], "Polite requests (the 'future request')"),
        MISTAKES([
            (("কাল আমি যাই।", "kal ami jai."), ("কাল আমি যাব।", "kal ami jabo."), "কাল here means tomorrow, so the verb must be in the future."),
            (("আমি কাল যাব গিয়েছিলাম।", "ami kal jabo giyechhilam."), ("আমি কাল যাব।", "ami kal jabo."), "One verb is enough. যাব already says 'will go'."),
        ], title="Tomorrow means future"),
    ]))
    secs.append(dict(id="simple-neg", title="Simple future: the negative", blocks=[
        H("The rule"),
        RULE("Add না after the verb", "Keep the simple future verb exactly as it is and put না (na) after it as a separate word. Never -নি in the future.", [S("ami", [AJ, BHAT], "khaoya", "fut", "I will not eat rice today.", neg=True)]),
        neg_person_table("fut", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("fut", neg=True, title="Simple future, negative"),
        H("Examples"),
        EXS([S("ami", [AJ, BHAT], "khaoya", "fut", "I will not eat rice today.", neg=True), S("tumi", [KAL], "asha", "fut", "You will not come tomorrow.", neg=True), S("se", [("সিনেমাটা", "sinemata")], "dekha", "fut", "He / she will not watch the film.", neg=True),
             S(MA, [KAL, BAJARE], "jaoya", "fut", "Mother will not go to the market tomorrow.", neg=True), S("amra", [AGAMIKAL, SKULE], "jaoya", "fut", "We will not go to school tomorrow.", neg=True)], "Negative sentences"),
        EXS([S("tumi", [KAL, ("কি", "ki")], "asha", "fut", "Will you not come tomorrow?", q=True, neg=True), S("tumi", [KIQ], "jaoya", "fut", "Will you go?", q=True)], "Questions"),
        MISTAKES([
            (("আমি যাবনি।", "ami jabni."), ("আমি যাব না।", "ami jabo na."), "Future negatives always use না as a separate word. -নি is only for finished actions."),
        ], title="না, not নি"),
    ]))
    secs.append(dict(id="continuous", title="Future continuous: will keep doing", blocks=[
        H("When do we use it?"),
        P("The future continuous (ঘটমান ভবিষ্যৎ, ghotoman bhobishyot) says that an action will keep going on in the future: 'will keep doing', 'will go on doing'."),
        LIST(["An action that will keep going: আমি রোজ বাংলা শিখতে থাকব। (I will keep learning Bengali every day.)", "A long action: বৃষ্টি সারাদিন পড়তে থাকবে। (It will keep raining all day.)", "Encouraging someone: চেষ্টা করতে থাকো, শিখবে। (Keep trying and you will learn.)"], title="Three uses"),
        H("How the verb changes"),
        RULE("The formula", "the -তে form of the verb + থাকব (future of থাকা)", [("কর + তে থাকব = করতে থাকব", "kor + te thakbo = korte thakbo", "I will keep doing"), ("খেতে থাকবে", "khete thakbe", "you / he / she will keep eating")]),
        P("Step 1: make the 'to do' form of the verb (the -তে form). Step 2: add থাকা (thaka, to stay) in the future."),
        TABLE(["Verb", "The -তে form"], [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"]), c(*VERBS[k]["inf"])] for k in SIX[:9]], "Step 1: the -তে form"),
        person_table("futcont", title="Future continuous of করা (kora, to do)"),
        H("Twelve verbs"),
        verbs_table("futcont", title="Future continuous of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [ROJ, BANGLA], "shekha" if False else "pora", "futcont", "I will keep studying Bengali every day."), ("বৃষ্টি সারাদিন পড়তে থাকবে।", "brishti saradin porte thakbe.", "It will keep raining all day."), ("মা গল্প বলতে থাকবেন, আর আমরা শুনব।", "ma golpo bolte thakben, ar amra shunbo.", "Ma will keep telling stories, and we will listen."),
             ("ওরা সারারাত গান গাইতে থাকবে।", "ora shararat gan gaite thakbe.", "They will keep singing all night."), ("তুমি চেষ্টা করতে থাকবে, তাহলেই শিখবে।", "tumi chesta korte thakbe, tahole-i shikhbe.", "You will keep trying, and then you will learn.")], "Will keep doing"),
        signals(FCONT_SIGNALS),
        NOTE("In everyday speech, for 'this time tomorrow I will be travelling', Bengalis usually use the present continuous with a time word: কাল এই সময় আমি ট্রেনে যাচ্ছি। (This time tomorrow I will be on the train.)"),
    ]))
    secs.append(dict(id="continuous-neg", title="Future continuous: the negative", blocks=[
        H("The rule"),
        RULE("Add না after থাকব", "Keep the future continuous verb exactly as it is and put না after the last word (থাকব / থাকবে / থাকবেন).", [S("ami", [("সারাদিন", "saradin"), ("টিভি", "tibhi")], "dekha", "futcont", "I will not keep watching TV all day.", neg=True)]),
        neg_person_table("futcont", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("futcont", neg=True, title="Future continuous, negative"),
        EXS([("বৃষ্টি বেশিক্ষণ পড়তে থাকবে না।", "brishti beshikkhon porte thakbe na.", "It will not keep raining for long."), ("আমি সারাদিন টিভি দেখতে থাকব না।", "ami saradin tibhi dekhte thakbo na.", "I will not keep watching TV all day.")], "Negative sentences"),
    ]))
    secs.append(dict(id="perfect", title="Future perfect: will have done", blocks=[
        H("When do we use it?"),
        P("The future perfect (পুরাঘটিত ভবিষ্যৎ, puraghotito bhobishyot) says that an action will be finished before a certain time in the future. It is also used to make a guess about something that has probably already happened."),
        LIST(["Finished before a future time: তুমি আসার আগে আমি রান্না করে থাকব। (I will have cooked before you come.)", "Finished by then: ততক্ষণে ট্রেন চলে গিয়ে থাকবে। (By then the train will have left.)", "A guess about the past: উনি হয়তো খবরটা শুনে থাকবেন। (He may have heard the news.)", "A confident guess: মা নিশ্চয়ই খেয়ে থাকবেন। (Ma must have eaten.)"], title="Four uses"),
        H("How the verb changes"),
        RULE("The formula", "the -এ form of the verb (the 'having done' form) + থাকব", [("কর + এ থাকব = করে থাকব", "kor + e thakbo = kore thakbo", "I will have done"), ("খেয়ে থাকবে", "kheye thakbe", "you / he / she will have eaten")]),
        P("Step 1: make the -এ form (the 'having done' form). Step 2: add থাকা in the future."),
        TABLE(["Verb", "The -এ form"], [[c(VERBS[k]["bn"] + " (" + VERBS[k]["en"] + ")", VERBS[k]["ro"]), c(*VERBS[k]["conj"])] for k in SIX[:9]], "Step 1: the -এ form"),
        person_table("futperf", title="Future perfect of করা (kora, to do)"),
        H("Twelve verbs"),
        verbs_table("futperf", title="Future perfect of twelve verbs"),
        H("Examples"),
        EXS([("কলকাতায় যাওয়ার আগে আমি অনেক বাংলা শিখে থাকব।", "kolkatay jaoar age ami onek bangla shikhe thakbo.", "I will have learned a lot of Bengali before going to Kolkata."), ("তুমি আসার আগেই আমি রান্না করে থাকব।", "tumi ashar agei ami ranna kore thakbo.", "I will have cooked before you come."), ("ততক্ষণে ট্রেন চলে গিয়ে থাকবে।", "totokkhone tren chole giye thakbe.", "By then the train will have left."),
             ("উনি হয়তো খবরটা শুনে থাকবেন।", "uni hoyto khoborta shune thakben.", "He may have heard the news. (a guess)"), ("মা নিশ্চয়ই খেয়ে থাকবেন।", "ma nishchoyi kheye thakben.", "Ma must have eaten. (a guess)")], "Finished by then, and guesses"),
        signals(FPERF_SIGNALS),
        NOTE("In everyday speech, for 'will have done', Bengalis often say করে ফেলব (kore phelbo) or করে নেব (kore nebo): তুমি আসার আগেই আমি রান্না করে ফেলব। (I will have finished cooking before you come.)"),
    ]))
    secs.append(dict(id="perfect-neg", title="Future perfect: the negative", blocks=[
        H("The rule"),
        RULE("Add না after থাকব", "Keep the future perfect verb exactly as it is and put না after the last word. Never -নি.", [S("se", [("হয়তো", "hoyto"), ("এখনও", "ekhono")], "khaoya", "futperf", "He / she probably has not eaten yet.", neg=True)]),
        neg_person_table("futperf", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("futperf", neg=True, title="Future perfect, negative"),
        EXS([("উনি হয়তো খবরটা শুনে থাকবেন না।", "uni hoyto khoborta shune thakben na.", "He may not have heard the news."), ("সে হয়তো এখনও খেয়ে থাকবে না।", "she hoyto ekhono kheye thakbe na.", "She probably has not eaten yet.")], "Negative sentences"),
    ]))
    secs.extend([
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
    ])

    secs.append(dict(id="summary", title="Summary: one verb, three future tenses", blocks=[
        P("খাওয়া (khaoya, to eat) in every person, positive and negative."),
        TABLE(["Person", "Simple future", "Future continuous", "Future perfect"], [[person_cell(i), vcell("khaoya", "fut", i), vcell("khaoya", "futcont", i), vcell("khaoya", "futperf", i)] for i in range(5)], "Positive"),
        TABLE(["Person", "Simple future", "Future continuous", "Future perfect"], [[person_cell(i), vcell("khaoya", "fut", i, True), vcell("khaoya", "futcont", i, True), vcell("khaoya", "futperf", i, True)] for i in range(5)], "Negative"),
        LIST(["Future endings: -ব / -বে / -বে / -বেন (bo / be / be / ben). তুমি and সে are the same.", "Future continuous = the -তে form + থাকব. Future perfect = the -এ form + থাকব.", "Every future negative uses না at the end. Never -নি."], title="Remember"),
    ]))
    return secs

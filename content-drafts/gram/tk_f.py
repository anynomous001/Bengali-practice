"""Tense lessons, part 4: assemble the present, past and future topics with their exercises; exercises for the overview and the verb tables."""
from tk_c import *
from tk_d import past_topic, AGEI
from tk_e import future_topic

INST = "Choose the verb form that fits the sentence."
def tf(subject, parts, verb, tense, others, en, why, q=False, inst=INST):
    return TFILL(subject, parts, verb, tense, others, why, inst, q, en)
def tm(subject, parts, verb, tense, en, wrong, why, neg=False):
    return TMEAN(subject, parts, verb, tense, en, wrong, why, neg)
SIGN_INST = "Choose the tense sign."

# ======================================================================================================================
# PRESENT
# ======================================================================================================================
PRES_EX = [
 PICKW("Which tense answers 'What are you doing right now?'", ["Simple present", "Present continuous", "Present perfect"], 1,
       "The present continuous (ঘটমান বর্তমান) is the tense of right now: আমি খাচ্ছি (ami khachchhi), 'I am eating'. Its sign is -ছ-.",
       {0: "The simple present is for habits and facts: আমি খাই (ami khai), 'I eat (usually)'. It does not say what is happening this minute.", 2: "The present perfect is for something finished: আমি খেয়েছি (ami kheyechhi), 'I have eaten'. It does not describe an action in progress."}, inst="Choose the tense."),
 PICKW("Which sign marks the present perfect?", ["-েছ- (করেছি)", "-ছ- (করছি)", "no sign (করি)"], 0,
       "The present perfect adds -েছ- to the root: কর + েছ + ি = করেছি (korechhi), 'I have done'.",
       {1: "-ছ- is the sign of the present continuous: করছি (korchhi), 'I am doing'.", 2: "A verb with no sign (করি, kori) is the simple present: 'I do'."}, inst=SIGN_INST),
 PICKW("A friend says 'I eat rice every day.' Which Bengali sentence is that?", O(("আমি রোজ ভাত খাই।", "ami roj bhat khai."), ("আমি রোজ ভাত খাচ্ছি।", "ami roj bhat khachchhi."), ("আমি রোজ ভাত খেয়েছি।", "ami roj bhat kheyechhi.")), 0,
       "রোজ (roj, every day) is a habit word, and habits use the simple present: খাই (khai).",
       {1: "খাচ্ছি (khachchhi) means 'I am eating' right now. A habit with রোজ does not use the continuous.", 2: "খেয়েছি (kheyechhi) means 'I have eaten' (finished). It does not describe a habit."}, inst="Choose the Bengali sentence."),
 tf("ami", [ROJ, CHA], "khaoya", "pres", ["cont", "perf", "past"], "I drink tea every day.", "রোজ (every day) is a habit, so the simple present: খাই (khai)."),
 tf("tumi", [EKHON, BOI], "pora", "cont", ["pres", "perf", "fut"], "You are reading a book now.", "এখন (now) needs an action in progress, so the present continuous: পড়ছ (porchho)."),
 tf("se", [EIMATRO], "asha", "perf", ["pres", "cont", "fut"], "He / she has just come.", "এইমাত্র (just now) with a finished action needs the present perfect: এসেছে (eshechhe)."),
 tf("apni", [("কোথায়", "kothay")], "jaoya", "cont", ["pres", "perf", "fut"], "Where are you going?", "A question about what is happening now takes the present continuous: যাচ্ছেন (jachchhen).", q=True),
 tf("amra", [PROTIDIN, PARKE], "hata", "pres", ["cont", "perf", "fut"], "We walk in the park every day.", "প্রতিদিন (every day) is a habit: simple present হাঁটি (hati)."),
 tf("tui", [EKHON, ("কী", "ki")], "kora", "cont", ["pres", "perf", "fut"], "What are you doing now?", "এখন (now): the present continuous with তুই ends in -ছিস: করছিস (korchhis).", q=True),
 tf("o", [GAN], "shona", "pres", ["cont", "perf", "past"], "He / she listens to a song (as a habit).", "A habit in the simple present: ও শোনে (o shone)."),
 tm("ami", [BHAT], "khaoya", "perf", "I have eaten rice.", [("ami", [BHAT], "khaoya", "pres"), ("ami", [BHAT], "khaoya", "cont"), ("ami", [BHAT], "khaoya", "fut")], "'Have eaten' is finished with a result now: the present perfect, -েছি."),
 tm("se", [BOI], "pora", "cont", "He / she is reading a book.", [("se", [BOI], "pora", "pres"), ("se", [BOI], "pora", "perf"), ("se", [BOI], "pora", "fut")], "'Is reading' is in progress: the present continuous, -ছে."),
 # negatives
 PICKW("How do you make the simple present negative?", ["Put না after the verb: খাই না", "Join নি to the verb: খাইনি", "Put না before the verb: না খাই"], 0,
       "The simple present negative keeps the verb exactly as it is and puts না (na) after it: খাই না (khai na).",
       {1: "Joined -নি (khaini) is for finished actions: 'did not' and 'have not'.", 2: "না never goes before the verb in a statement. It comes after: খাই না."}, inst="Choose the rule."),
 PICKW("How do you make the present perfect negative?", ["Simple present form + নি: খাইনি", "Put না after: খেয়েছি না", "Put না before: না খেয়েছি"], 0,
       "The present perfect negative takes the SIMPLE PRESENT form and joins নি: খাই + নি = খাইনি (khaini), 'I have not eaten'.",
       {1: "The perfect form -েছি never takes না. Say খাইনি.", 2: "না does not go before the verb. Use the simple present form + নি."}, inst="Choose the rule."),
 TNEG("ami", [BHAT], "khaoya", "pres", "I do not eat rice.", "cont", "It is the simple present, so the negative is খাই + না."),
 TNEG("ami", [EKHON, BHAT], "khaoya", "cont", "I am not eating rice now.", "pres", "It is the present continuous, so না follows the verb: খাচ্ছি না."),
 TNEG("ami", [("এখনও", "ekhono"), BHAT], "khaoya", "perf", "I have not eaten rice yet.", "cont", "It is the present perfect, so the negative is the simple present form + নি: খাইনি."),
 TNEG("se", [("এখনও", "ekhono")], "asha", "perf", "He / she has not come yet.", "pres", "Present perfect negative: the simple present form আসে + নি = আসেনি (asheni)."),
 TNEG("tumi", [ROJ, SKULE], "jaoya", "pres", "You do not go to school every day.", "cont", "A habit (রোজ) is the simple present, so না follows the verb: যাও না."),
 SPOTW(O(("সে ভাত খায় না।", "she bhat khay na."), ("সে ভাত না খায়।", "she bhat na khay."), ("সে ভাত খেয়েছি না।", "she bhat kheyechhi na.")), 0, "না comes after the verb: খায় না (khay na).",
       {1: "না cannot come before the verb in a normal statement.", 2: "খেয়েছি is a perfect form and does not take না (and ends in -ছি, which is for আমি, not সে)."}),
 SPOTW(O(("আমি এখন ভাত খাচ্ছি।", "ami ekhon bhat khachchhi."), ("আমি এখন ভাত খাই।", "ami ekhon bhat khai."), ("আমি এখন ভাত খেয়েছি।", "ami ekhon bhat kheyechhi.")), 0, "এখন (now) with an action in progress needs the present continuous: খাচ্ছি.",
       {1: "খাই is the simple present: a habit. It does not fit 'now'.", 2: "খেয়েছি is the present perfect (finished). The eating is still going on, so it does not fit."}, inst="Only one sentence uses the right tense for the time word. Choose it."),
 SPOTW(O(("আমি রোজ ভাত খাই।", "ami roj bhat khai."), ("আমি রোজ ভাত খাচ্ছি।", "ami roj bhat khachchhi."), ("আমি রোজ ভাত খেয়েছি।", "ami roj bhat kheyechhi.")), 0, "রোজ (every day) is a habit: the simple present.",
       {1: "The continuous is for right now, not a habit.", 2: "The perfect says something is finished. রোজ describes a repeated habit."}, inst="Only one sentence uses the right tense for the time word. Choose it."),
 PICKW("Which sentence means 'I have not eaten yet'?", O(("আমি এখনও খাইনি।", "ami ekhono khaini."), ("আমি এখনও খাই না।", "ami ekhono khai na."), ("আমি এখনও খাচ্ছি না।", "ami ekhono khachchhi na.")), 0,
       "এখনও (yet, still) with a not-finished action takes the present perfect negative: খাইনি (khaini).",
       {1: "খাই না means 'I do not eat' (a habit). It does not say 'not yet'.", 2: "খাচ্ছি না means 'I am not eating (right now)'. It is not the same as 'I have not eaten yet'."}, inst="Choose the Bengali sentence."),
 tf("tumi", [("কি", "ki"), BHAT], "khaoya", "perf", ["pres", "cont", "past"], "Have you eaten rice?", "'Have you eaten?' asks about a finished action that matters now: the present perfect খেয়েছ (kheyechho).", q=True),
]

# ======================================================================================================================
# PAST
# ======================================================================================================================
PAST_EX = [
 PICKW("Which sign marks the simple past?", ["-েছিল- (করেছিলাম)", "-ছিল- (করছিলাম)", "-ত- (করতাম)"], 0,
       "The simple past is built with -েছিল-: কর + েছিল + াম = করেছিলাম (korechhilam), 'I did'.",
       {1: "-ছিল- (without the extra -ে-) is the past continuous: করছিলাম, 'I was doing'.", 2: "-ত- is the habitual past: করতাম, 'I used to do'."}, inst=SIGN_INST),
 PICKW("Which sign marks the past continuous?", ["-ছিল- (করছিলাম)", "-েছিল- (করেছিলাম)", "-ব- (করব)"], 0,
       "The past continuous uses -ছিল-: it is the present continuous করছি with -ইল added: করছিলাম (korchhilam), 'I was doing'.",
       {1: "-েছিল- is the simple past (and the past perfect with আগে).", 2: "-ব- is the future: করব (korbo), 'I will do'."}, inst=SIGN_INST),
 PICKW("What shows that করেছিলাম is the PAST PERFECT, not the simple past?", ["the word আগে or আগেই (before, already)", "the ending -লাম", "the word না"], 0,
       "The verb form is the same. The word আগে / আগেই (age / agei) says that the action came first, before another past action: আমি আগেই খেয়েছিলাম (I had already eaten).",
       {1: "-লাম is the ending for আমি in every past tense. It does not tell you which past tense it is.", 2: "না is a negative marker. It has nothing to do with the past perfect."}, inst="Choose the answer."),
 tf("ami", [GOTOKAL, BAJARE], "jaoya", "past", ["pres", "cont", "fut"], "I went to the market yesterday.", "গতকাল (yesterday) is over, so the simple past: গিয়েছিলাম (giyechhilam)."),
 tf("tumi", [GOTOKAL, BOI], "pora", "past", ["pres", "pastcont", "fut"], "You read a book yesterday.", "A finished action yesterday: the simple past পড়েছিলে (porechhile)."),
 tf("se", [TOKHON, BHAT], "khaoya", "pastcont", ["past", "pres", "fut"], "He / she was eating rice then.", "তখন (then) with an action that was going on: the past continuous খাচ্ছিল (khachchhilo)."),
 tf("ami", [TOKHON, GAN], "shona", "pastcont", ["past", "pres", "fut"], "I was listening to a song then.", "In progress at that time: the past continuous শুনছিলাম (shunchhilam)."),
 tf("ami", [AGEI, BHAT], "khaoya", "pastperf", ["pastcont", "habit", "pres"], "I had already eaten rice.", "আগেই (already, before) with a finished action: the past perfect খেয়েছিলাম (kheyechhilam)."),
 tf("se", [AGEI, ("বইটা", "boita")], "pora", "pastperf", ["pastcont", "habit", "pres"], "He / she had already read the book.", "'Had already read': the past perfect পড়েছিল (porechhilo), with আগেই before it."),
 tf("ami", [CHHOTO, ROJ, MATHE], "khela", "habit", ["past", "pastcont", "pres"], "In my childhood I used to play in the field every day.", "ছোটবেলায় + রোজ (every day, in childhood) is a past habit: খেলতাম (kheltam)."),
 tf(THAKUMA, [("আমাদের", "amader"), GOLPO], "bola", "habit", ["past", "pastcont", "pres"], "Grandmother used to tell us stories.", "A past habit: বলতেন (bolten)."),
 tf("apni", [KI], "bola", "past", ["pres", "cont", "fut"], "What did you say?", "A question about something finished: the simple past বলেছিলেন (bolechhilen).", q=True),
 tm("ami", [GOTOKAL, SKULE], "jaoya", "past", "I went to school yesterday.", [("ami", [GOTOKAL, SKULE], "jaoya", "pres"), ("ami", [GOTOKAL, SKULE], "jaoya", "cont"), ("ami", [GOTOKAL, SKULE], "jaoya", "fut")], "'Went' (finished, yesterday) is the simple past: গিয়েছিলাম."),
 tm("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was eating rice then.", [("ami", [TOKHON, BHAT], "khaoya", "past"), ("ami", [TOKHON, BHAT], "khaoya", "habit"), ("ami", [TOKHON, BHAT], "khaoya", "pres")], "'Was eating' (in progress then) is the past continuous: খাচ্ছিলাম."),
 PICKW("'When I came, he was sleeping.' Which verb forms?", O(("এসেছিলাম … ঘুমাচ্ছিল", "eshechhilam … ghumachchhilo"), ("আসছিলাম … ঘুমিয়েছিল", "aschhilam … ghumiyechhilo"), ("আসব … ঘুমাচ্ছে", "asbo … ghumachchhe")), 0,
       "The short action that cut across (came) takes the simple past (এসেছিলাম). The long background action (was sleeping) takes the past continuous (ঘুমাচ্ছিল).",
       {1: "আসছিলাম means 'I was coming' (in progress), which is not the short action; and ঘুমিয়েছিল means 'had slept', not 'was sleeping'.", 2: "আসব and ঘুমাচ্ছে are future and present. The sentence is about the past."}, inst="Choose the correct pair."),
 PICKW("'The train had already left before I reached.' Which Bengali is right?", O(("আমি পৌঁছানোর আগেই ট্রেন চলে গিয়েছিল।", "ami pouchhanor agei tren chole giyechhilo."), ("আমি পৌঁছানোর আগেই ট্রেন চলে যাচ্ছিল।", "ami pouchhanor agei tren chole jachchhilo."), ("আমি পৌঁছানোর আগেই ট্রেন চলে যাবে।", "ami pouchhanor agei tren chole jabe.")), 0,
       "The train left FIRST, so it is in the past perfect (গিয়েছিল), marked by আগেই.",
       {1: "চলে যাচ্ছিল means 'was leaving' (in progress), but the train had finished leaving.", 2: "যাবে is the future. The sentence is about the past."}, inst="Choose the Bengali sentence."),
 # negatives
 PICKW("How do you make the simple past negative?", ["Simple present form + নি: যাইনি", "Put না after: গিয়েছিলাম না", "Put না before: না গিয়েছিলাম"], 0,
       "The simple past negative takes the SIMPLE PRESENT form and joins নি: যাই + নি = যাইনি (jaini), 'I did not go'.",
       {1: "The -েছিলাম form never takes না. Use the simple present form + নি.", 2: "না does not come before the verb in a statement."}, inst="Choose the rule."),
 PICKW("How do you make the past continuous negative?", ["Put না after the verb: খাচ্ছিলাম না", "Simple present form + নি: খাইনি", "Put না before: না খাচ্ছিলাম"], 0,
       "The past continuous keeps its form and puts না after it: খাচ্ছিলাম না (khachchhilam na), 'I was not eating'.",
       {1: "খাইনি is the negative of the simple past and the past perfect, not of the continuous.", 2: "না does not come before the verb."}, inst="Choose the rule."),
 TNEG("ami", [GOTOKAL, SKULE], "jaoya", "past", "I did not go to school yesterday.", "pastcont", "Simple past negative: the present form যাই + নি = যাইনি."),
 TNEG("tumi", [GOTOKAL], "asha", "past", "You did not come yesterday.", "pastcont", "Simple past negative: the present form আসো + নি = আসোনি (ashoni)."),
 TNEG("ami", [TOKHON, BHAT], "khaoya", "pastcont", "I was not eating rice then.", "past", "Past continuous negative: না after the verb: খাচ্ছিলাম না."),
 TNEG("se", [TOKHON, ("টিভি", "tibhi")], "dekha", "pastcont", "He / she was not watching TV then.", "past", "Past continuous negative: দেখছিল না."),
 TNEG("ami", [("মা আসার", "ma ashar")], "khaoya", "pastperf", "I had not eaten before Ma came.", "pastcont", "Past perfect negative: আগে + the simple present form + নি = আগে খাইনি."),
 TMEAN("tumi", [GOTOKAL, BOI], "pora", "past", "You did not read the book yesterday.", [("tumi", [GOTOKAL, BOI], "pora", "pres", True), ("tumi", [GOTOKAL, BOI], "pora", "cont", True), ("tumi", [GOTOKAL, BOI], "pora", "fut", True)], "Past negative: the simple present form পড়ো + নি = পড়োনি.", neg=True),
 SPOTW(O(("আমি গতকাল যাইনি।", "ami gotokal jaini."), ("আমি গতকাল যাই না।", "ami gotokal jai na."), ("আমি গতকাল গিয়েছিলাম না।", "ami gotokal giyechhilam na.")), 0, "'Did not go' yesterday is the simple past negative: যাইনি (jaini).",
       {1: "যাই না is the simple present negative ('I do not go'), a habit, not yesterday.", 2: "-েছিলাম never takes না. Use the simple present form + নি."}),
 SPOTW(O(("গতকাল আমি বাজারে গিয়েছিলাম।", "gotokal ami bajare giyechhilam."), ("গতকাল আমি বাজারে যাব।", "gotokal ami bajare jabo."), ("গতকাল আমি বাজারে যাই।", "gotokal ami bajare jai.")), 0, "গতকাল (yesterday) needs the past.",
       {1: "যাব is the future ('I will go').", 2: "যাই is the simple present ('I go')."}, inst="Only one sentence uses the right tense for the time word. Choose it."),
 PICKW("'Tumi kal ashoni keno?' What does it ask?", ["Why did you not come yesterday?", "Why will you not come tomorrow?", "Why are you not coming now?"], 0,
       "আসোনি (ashoni) is the -নি negative, so it is past: 'did not come'. কাল here means yesterday because of the -নি form.",
       {1: "A future negative would use না: আসবে না (ashbe na).", 2: "A present continuous negative would be আসছ না (aschho na)."}, inst="Choose the meaning."),
]

# ======================================================================================================================
# FUTURE
# ======================================================================================================================
FUT_EX = [
 PICKW("Which sign marks the simple future?", ["-ব- (করব)", "-ছ- (করছি)", "-েছিল- (করেছিলাম)"], 0,
       "The future uses -ব-: কর + ব = করব (korbo), 'I will do'.", {1: "-ছ- is the present continuous.", 2: "-েছিল- is the simple past."}, inst=SIGN_INST),
 PICKW("How is the future continuous built?", ["the -তে form + থাকব (করতে থাকব)", "the -এ form + থাকব (করে থাকব)", "root + ছি (করছি)"], 0,
       "The future continuous = the -তে form + থাকব: করতে থাকব (korte thakbo), 'I will keep doing'.",
       {1: "The -এ form + থাকব is the FUTURE PERFECT: করে থাকব, 'I will have done'.", 2: "root + ছি is the present continuous, 'I am doing'."}, inst="Choose the formula."),
 PICKW("How is the future perfect built?", ["the -এ form + থাকব (করে থাকব)", "the -তে form + থাকব (করতে থাকব)", "root + ব (করব)"], 0,
       "The future perfect = the -এ form + থাকব: করে থাকব (kore thakbo), 'I will have done'.",
       {1: "The -তে form + থাকব is the FUTURE CONTINUOUS: 'I will keep doing'.", 2: "root + ব is the simple future: 'I will do'."}, inst="Choose the formula."),
 tf("ami", [KAL, BAJARE], "jaoya", "fut", ["pres", "past", "cont"], "I will go to the market tomorrow.", "কাল here means tomorrow, so the future: যাব (jabo)."),
 tf("tumi", [("কখন", "kokhon")], "asha", "fut", ["pres", "past", "perf"], "When will you come?", "A question about the future: আসবে (ashbe).", q=True),
 tf("apni", [KI], "khaoya", "fut", ["pres", "past", "cont"], "What will you eat?", "A question about what comes next: খাবেন (khaben).", q=True),
 tf("amra", [AGAMIKAL, ("সিনেমা", "sinema")], "dekha", "fut", ["pres", "past", "perf"], "We will see a film tomorrow.", "আগামীকাল means tomorrow: the future দেখব (dekhbo)."),
 tf("ami", [("তোমাকে", "tomake"), CHITHI], "lekha", "fut", ["pres", "past", "perf"], "I will write you a letter.", "A promise: the future লিখব (likhbo). The root লেখ changes its vowel to লিখ before -ব."),
 tf("ami", [ROJ, BANGLA], "pora", "futcont", ["fut", "futperf", "pres"], "I will keep studying Bengali every day.", "'Will keep doing' is the future continuous: the -তে form + থাকব: পড়তে থাকব (porte thakbo)."),
 tf("tumi", [("তুমি আসার আগেই", "tumi ashar agei")], "khaoya", "futperf", ["fut", "futcont", "pres"], "I will have eaten before you come.", "'Will have finished before a time' is the future perfect: the -এ form + থাকব: খেয়ে থাকব (kheye thakbo)."),
 tm("ami", [KAL, BAJARE], "jaoya", "fut", "I will go to the market tomorrow.", [("ami", [KAL, BAJARE], "jaoya", "past"), ("ami", [KAL, BAJARE], "jaoya", "pres"), ("ami", [KAL, BAJARE], "jaoya", "perf")], "'Will go' is the simple future: যাব."),
 PICKW("Which sentence means 'I will keep learning Bengali every day'?", O(("আমি রোজ বাংলা শিখতে থাকব।", "ami roj bangla shikhte thakbo."), ("আমি রোজ বাংলা শিখে থাকব।", "ami roj bangla shikhe thakbo."), ("আমি রোজ বাংলা শিখব।", "ami roj bangla shikhbo.")), 0,
       "'Keep doing' is the future continuous: the -তে form + থাকব → শিখতে থাকব (shikhte thakbo).",
       {1: "শিখে থাকব is the future perfect: 'I will have learned', finished.", 2: "শিখব is the plain future: 'I will learn'. It does not say 'keep'."}, inst="Choose the Bengali sentence."),
 PICKW("How do you say 'Ma must have eaten' (a guess)?", O(("মা নিশ্চয়ই খেয়ে থাকবেন।", "ma nishchoyi kheye thakben."), ("মা নিশ্চয়ই খাবেন।", "ma nishchoyi khaben."), ("মা নিশ্চয়ই খেতে থাকবেন।", "ma nishchoyi khete thakben.")), 0,
       "A guess about something that has probably happened is the future perfect: খেয়ে থাকবেন (kheye thakben).",
       {1: "খাবেন is the simple future: 'Ma will eat'. It is about what comes next, not a guess about the past.", 2: "খেতে থাকবেন means 'will keep eating', which is the future continuous."}, inst="Choose the Bengali sentence."),
 # negatives
 PICKW("How do you make any future negative?", ["Put না after the verb: যাব না", "Join নি to the verb: যাবনি", "Put না before the verb: না যাব"], 0,
       "Every future tense takes না after the last word: যাব না (jabo na), করতে থাকব না (korte thakbo na), করে থাকব না (kore thakbo na).",
       {1: "-নি is only for finished actions (simple past, present perfect, past perfect). The future always uses না.", 2: "না does not come before the verb in a statement."}, inst="Choose the rule."),
 TNEG("ami", [KAL], "asha", "fut", "I will not come tomorrow.", "cont", "Simple future negative: না after the verb: আসব না."),
 TNEG("se", [BHAT], "khaoya", "fut", "He / she will not eat rice.", "pres", "Simple future negative: খাবে না."),
 TNEG("ami", [("সারাদিন", "saradin"), ("টিভি", "tibhi")], "dekha", "futcont", "I will not keep watching TV all day.", "fut", "Future continuous negative: না after থাকব: দেখতে থাকব না."),
 TNEG("uni", [("হয়তো", "hoyto"), ("খবরটা", "khoborta")], "shona", "futperf", "He may not have heard the news.", "fut", "Future perfect negative: না after থাকবেন: শুনে থাকবেন না."),
 tm("se", [KAL], "asha", "fut", "He / she will not come tomorrow.", [("se", [KAL], "asha", "pres", True), ("se", [KAL], "asha", "past", True), ("se", [KAL], "asha", "cont", True)], "Future negative: আসবে না.", neg=True),
 SPOTW(O(("কাল আমি আসব।", "kal ami ashbo."), ("কাল আমি এসেছি।", "kal ami eshechhi."), ("কাল আমি আসি।", "kal ami ashi.")), 0, "For tomorrow, use the future: আসব.",
       {1: "এসেছি is the present perfect: 'I have come'.", 2: "আসি is the simple present: 'I come' (a habit)."}, inst="Only one sentence uses a tense that can mean tomorrow. Choose it."),
 SPOTW(O(("আমি কাল যাব না।", "ami kal jabo na."), ("আমি কাল যাবনি।", "ami kal jabni."), ("আমি কাল যাইনি।", "ami kal jaini.")), 0, "A future negative takes না: যাব না (jabo na).",
       {1: "-নি is never added to a future form.", 2: "যাইনি is the simple past / present perfect negative, 'did not go' or 'have not gone'."}, inst="Choose the correct negative for 'I will not go tomorrow'."),
 PICKW("Which word means 'since'?", O(("থেকে", "theke"), ("ধরে", "dhore"), ("জন্য", "jonyo")), 0, "থেকে (theke) marks a starting point: সকাল থেকে (since morning).",
       {1: "ধরে (dhore) means 'for' a length of time: দুই বছর ধরে (for two years).", 2: "জন্য (jonyo) means 'for the sake of': তোমার জন্য (for you)."}, inst="Choose the Bengali word for the English word."),
 PICKW("How do you say 'I want to learn Bengali'?", O(("আমি বাংলা শিখতে চাই।", "ami bangla shikhte chai."), ("আমি বাংলা শিখি চাই।", "ami bangla shikhi chai."), ("আমি বাংলা শিখলে চাই।", "ami bangla shikhle chai.")), 0, "Wanting uses the -তে form + চাই: শিখতে চাই.",
       {1: "শিখি is a finite present form. 'Want to' needs the -তে form.", 2: "-লে means 'if'. It does not mean 'to'."}, inst="Choose the Bengali sentence."),
 FILL("তুমি ___ আমি খুশি হব।", "tumi ___ ami khushi hobo.", O(("এলে", "ele"), ("এসে", "eshe"), ("আসব", "ashbo")), 0, "'If you come, I will be happy': the 'if' part takes -লে: এলে (ele).", inst="Choose the form that makes the 'if' part.",
      wrong=["", "এসে (eshe) means 'having come'. It would start 'having come, I will…'. It does not mean 'if'.", "আসব (ashbo) means 'I will come'. The 'if' part needs -লে."]),
]

# ======================================================================================================================
OVERVIEW_EX = [
 PICKW("What does কাল mean in 'ক্রিয়ার কাল'?", ["place", "time (tense)", "person"], 1, "কাল (kal) means 'time'. In grammar it means tense: ক্রিয়ার কাল is the tense of the verb.", {0: "A place would be জায়গা or স্থান.", 2: "A person would be পুরুষ (purush), which has its own lesson."}, inst="Choose the meaning."),
 PICKW("Which tense is আমি ভাত খাচ্ছি?", ["Simple present", "Present continuous", "Present perfect"], 1, "-ছি is the sign of the continuous: 'I am eating'.", {0: "The simple present has no sign: খাই.", 2: "The present perfect has -েছি: খেয়েছি."}, inst="Name the tense of the sentence."),
 PICKW("Which tense is আমি ভাত খেয়েছি?", ["Simple past", "Past continuous", "Present perfect"], 2, "-েছি is the present perfect: 'I have eaten' (-েছিলাম, with the extra -ল-, is the past).", {0: "The simple past is -েছিলাম (kheyechhilam), with -ল-.", 1: "The past continuous is -ছিলাম: খাচ্ছিলাম."}, inst="Name the tense of the sentence."),
 PICKW("Which tense is আমি ভাত খেয়েছিলাম (with গতকাল, yesterday)?", ["Simple past", "Present perfect", "Past habitual"], 0, "-েছিলাম with a past time word is the simple past: 'I ate rice yesterday'.", {1: "The present perfect has no -ল-: খেয়েছি.", 2: "The habitual past is -তাম: খেতাম."}, inst="Name the tense of the sentence."),
 PICKW("Which tense is আমি ভাত খেতাম?", ["Past habitual", "Simple past", "Future"], 0, "-তাম is the habitual past: 'I used to eat rice'.", {1: "The simple past is খেয়েছিলাম.", 2: "The future is খাব."}, inst="Name the tense of the sentence."),
 PICKW("Which tense is আমি ভাত খাব?", ["Simple present", "Simple future", "Present perfect"], 1, "-ব is the sign of the future: 'I will eat rice'.", {0: "The simple present is খাই.", 2: "The present perfect is খেয়েছি."}, inst="Name the tense of the sentence."),
 tf("ami", [EKHON, BHAT], "khaoya", "cont", ["pres", "past", "fut"], "I am eating rice now.", "এখন (now) goes with the continuous tense: খাচ্ছি (khachchhi)."),
 tf("ami", [ROJ, BHAT], "khaoya", "pres", ["cont", "past", "fut"], "I eat rice every day.", "রোজ (every day) goes with the simple present: খাই (khai)."),
 tf("ami", [GOTOKAL, BAJARE], "jaoya", "past", ["pres", "cont", "fut"], "I went to the market yesterday.", "গতকাল (yesterday) goes with the simple past: গিয়েছিলাম (giyechhilam)."),
 tf("tumi", [KAL, BAJARE], "jaoya", "fut", ["pres", "past", "cont"], "You will go to the market tomorrow.", "কাল with a future sign means tomorrow: যাবে (jabe)."),
 tf("se", [EIMATRO], "asha", "perf", ["pres", "fut", "habit"], "He / she has just come.", "এইমাত্র (just now) goes with the present perfect: এসেছে (eshechhe)."),
 tf("ami", [TOKHON, BHAT], "khaoya", "pastcont", ["past", "pres", "fut"], "I was eating rice then.", "তখন (at that time) with an action in progress: খাচ্ছিলাম (khachchhilam)."),
 tm("ami", [BHAT], "khaoya", "habit", "I used to eat rice.", [("ami", [BHAT], "khaoya", "past"), ("ami", [BHAT], "khaoya", "pres"), ("ami", [BHAT], "khaoya", "fut")], "'Used to' is the habitual past: খেতাম."),
 PICKW("Which TWO markers make a tense negative?", ["না (after the verb) and -নি (joined to the simple present form)", "না (before the verb) and নেই", "only না"], 0, "না is added after the verb in most tenses; -নি is joined to the simple present form in the present perfect, simple past and past perfect.", {1: "না goes after the verb, not before. নেই means 'is not / there is not', which is a different lesson.", 2: "There is a second marker: -নি, used for finished actions."}, inst="Choose the answer."),
 PICKW("Which tenses take -নি for the negative?", ["present perfect, simple past, past perfect", "simple present, present continuous", "all the future tenses"], 0, "-নি goes with the three finished tenses: খাইনি can mean 'have not eaten', 'did not eat' or 'had not eaten'.", {1: "Those two take না after the verb.", 2: "The future always takes না."}, inst="Choose the answer."),
 TNEG("ami", [GOTOKAL, SKULE], "jaoya", "past", "I did not go to school yesterday.", "pastcont", "Simple past → simple present form যাই + নি = যাইনি."),
 TNEG("ami", [KAL], "asha", "fut", "I will not come tomorrow.", "cont", "Future → না after the verb: আসব না."),
 SPOTW(O(("আমি ভাত খাচ্ছি।", "ami bhat khachchhi."), ("আমি আছি ভাত খাচ্ছি।", "ami achhi bhat khachchhi."), ("আমি খাচ্ছি আছি ভাত।", "ami khachchhi achhi bhat.")), 0, "খাচ্ছি already means 'am eating'.", {1: "Do not add 'am' (আছি). The -ছি ending already says it.", 2: "The verb goes at the end, and there is no need for আছি."}),
 PICKW("What does কাল mean?", ["only 'yesterday'", "only 'tomorrow'", "'yesterday' or 'tomorrow'; the verb tells you which"], 2, "কাল is used for both. কাল গিয়েছিলাম is yesterday (past); কাল যাব is tomorrow (future).", {0: "It can also mean tomorrow.", 1: "It can also mean yesterday."}, inst="Choose the true statement."),
]
TABLES_EX = [
 tf("ami", [GOTOKAL, BOI], "lekha", "past", ["pres", "cont", "fut"], "I wrote a book yesterday.", "A finished action yesterday: লিখেছিলাম (likhechhilam)."),
 tf("tumi", [EKHON, ("কী", "ki")], "shona", "cont", ["pres", "past", "fut"], "What are you listening to now?", "Right now: শুনছ (shunchho).", q=True),
 tf("apni", [KAL, KOLKATAY], "jaoya", "fut", ["pres", "past", "cont"], "You will go to Kolkata tomorrow.", "Tomorrow: যাবেন (jaben)."),
 tf("se", [ROJ, SHOKALE, CHA], "khaoya", "pres", ["cont", "past", "fut"], "He / she drinks tea every morning.", "A daily habit: খায় (khay)."),
 tf("tui", [BOI], "neoya", "perf", ["pres", "cont", "fut"], "You have taken the book.", "Finished, with a result now: নিয়েছিস (niyechhis)."),
 tf("tumi", [AMAKE, JOL], "deoya", "past", ["pres", "cont", "fut"], "You gave me water.", "A finished action: দিয়েছিলে (diyechhile)."),
 tf("amra", [PROTIDIN, PARKE], "hata", "habit", ["pres", "past", "fut"], "We used to walk in the park every day.", "Used to: হাঁটতাম (hattam)."),
 tf("ami", [TOKHON], "ghumano", "pastcont", ["past", "pres", "fut"], "I was sleeping then.", "In progress then: ঘুমাচ্ছিলাম (ghumachchhilam)."),
 tf("tara", [AGAMIKAL], "asha", "fut", ["pres", "past", "perf"], "They will come tomorrow.", "Tomorrow: আসবে (ashbe)."),
 tf(DADU, [GOLPO], "bola", "cont", ["pres", "past", "fut"], "Grandfather is telling a story.", "Right now: বলছেন (bolchhen)."),
 tf("se", [EIMATRO], "asha", "perf", ["pres", "past", "fut"], "He / she has just come.", "Just now: এসেছে (eshechhe)."),
 tf("tumi", [AGEI], "asha", "pastperf", ["pastcont", "pres", "fut"], "You had already come.", "Before that: এসেছিলে (eshechhile), with আগেই."),
 tf("ami", [CHITHI], "lekha", "fut", ["pres", "past", "cont"], "I will write a letter.", "Will write: লিখব (likhbo)."),
 tf("ami", [("তুমি আসার আগেই", "tumi ashar agei")], "kora", "futperf", ["fut", "futcont", "pres"], "I will have done it before you come.", "Will have finished: করে থাকব (kore thakbo)."),
]

PRESENT = finish(dict(id="tense-present", title=("বর্তমান কাল", "Bortoman kal", "The present tenses"),
 blurb="The simple present, the present continuous and the present perfect: when to use each, how the verb changes, the negative of each (না or -নি), twelve verbs, signal words and the common mistakes.",
 sections=present_topic(), exercises=PRES_EX))
PAST = finish(dict(id="tense-past", title=("অতীত কাল", "Otit kal", "The past tenses"),
 blurb="The simple past, the past continuous, the past perfect and the habitual past: when to use each, how the verb changes, the negative of each, twelve verbs, signal words, and a story that uses them together.",
 sections=past_topic(), exercises=PAST_EX))
FUTURE = finish(dict(id="tense-future", title=("ভবিষ্যৎ কাল", "Bhobishyot kal", "The future tenses"),
 blurb="The simple future, the future continuous and the future perfect: when to use each, how the verb changes, the negative of each, twelve verbs, plus other ways to talk about the future, 'if … then', and 'has been doing for'.",
 sections=future_topic(), exercises=FUT_EX))

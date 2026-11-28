"""Tense lessons, part 1: shared builders and the three present tenses.

Every tense gets the same shape: when we use it, how the verb changes (with the person endings), twelve verbs, examples,
signal words, common mistakes, and then a separate NEGATIVE section with its own rule, tables and examples."""
from lib import *

S = SENT
SIX = ("kora", "khaoya", "jaoya", "dekha", "pora", "lekha", "shona", "asha", "bola", "deoya", "neoya", "thaka")
HEAD = ["Verb", "আমি", "তুই", "তুমি", "আপনি / তিনি", "সে"]
PERSON_EN = ["I / we", "you (very familiar)", "you (familiar)", "you / he, she (respectful)", "he / she / they"]
NI_TENSES = ("past", "pastperf", "perf")          # negative = present form + নি
AGEI_P = ("আগেই", "agei")
PREFIX = {"pastperf": ("আগেই", "agei")}
NEG_PREFIX = {"pastperf": ("আগে", "age")}

def vcell(verb, tense, idx, neg=False, prefix=None):
    b, r = (nform if neg else vform)(verb, tense, idx)
    if prefix: b, r = prefix[0] + " " + b, prefix[1] + " " + r
    return c(b, r)
def ending_cell(tid, i):
    b, r = ENDINGS[tid][i]
    return c(("◌" if b[0] in "ািীুূৃেৈোৌ" else "-") + b, "-" + r)
def person_cell(i): return c(PERSONS[i][0], PERSONS[i][1], PERSON_EN[i])

def person_table(tid, verb="kora", neg=False, title=None, pos_tid=None):
    """Person | ending | the verb for that person (positive or negative)"""
    prefix = (NEG_PREFIX if neg else PREFIX).get(tid)
    v = VERBS[verb]
    rows = []
    for i in range(5):
        end = ending_cell(tid if tid in ENDINGS else "fut", i)
        if neg and tid in NI_TENSES: end = c("◌" + ("" ) + vform(verb, "pres", i)[0][-1:] if False else end["bn"], end["ro"])
        rows.append([person_cell(i), end, vcell(verb, tid, i, neg, prefix)])
    return TABLE(["Person", "Ending", f"{v['bn']} ({v['ro']})"], rows, title)
def verbs_table(tid, keys=SIX, neg=False, title=None, prefix=None):
    pf = prefix if prefix is not None else (NEG_PREFIX if neg else PREFIX).get(tid)
    rows = []
    for k in keys:
        v = VERBS[k]
        rows.append([c(v["bn"] + " (" + v["en"] + ")", v["ro"])] + [vcell(k, tid, i, neg, pf) for i in range(5)])
    return TABLE(HEAD, rows, title)
def neg_person_table(tid, verb="kora", title=None):
    """Negative table that shows how the negative is made for each person"""
    v = VERBS[verb]
    rows = []
    for i in range(5):
        pos = vform(verb, tid, i)
        nb, nr = nform(verb, tid, i)
        if tid in NI_TENSES:
            base = vform(verb, "pres", i)
            rows.append([person_cell(i), c(base[0], base[1]), c("নি", "ni"), vcell(verb, tid, i, True, NEG_PREFIX.get(tid))])
        else:
            rows.append([person_cell(i), c(pos[0], pos[1]), c("না", "na"), vcell(verb, tid, i, True)])
    first = "present form" if tid in NI_TENSES else "positive verb"
    sign = "+ নি (joined)" if tid in NI_TENSES else "+ না (separate word)"
    return TABLE(["Person", f"The {first}", sign, f"{v['bn']} ({v['ro']}), negative"], rows, title)

def signals(items, title="Signal words"):
    return TABLE(["Word", "Meaning"], [[c(b, r), en] for (b, r), en in items], title)

def TNEG(subject, parts, verb, tense, en, confuse, why, q=False, inst="Choose the Bengali sentence that means the same as the English sentence."):
    """Negative-building exercise. Options: the right negative, the wrong marker, the negative of a confusable tense, and the positive sentence.
    Every wrong option carries a note saying what is wrong with it."""
    s = subj(subject)
    pf = NEG_PREFIX.get(tense)
    def build(vb, vr):
        parts_b = [s[0]] + ([pf[0]] if pf else []) + [p[0] for p in parts] + [vb]
        parts_r = [s[1]] + ([pf[1]] if pf else []) + [p[1] for p in parts] + [vr]
        return c(" ".join(parts_b) + "।", " ".join(parts_r) + ".")
    right = build(*nform(verb, tense, s[2]))
    pb, pr_ = vform(verb, tense, s[2])
    uses_ni = tense in NI_TENSES
    swapped = build(pb + " না", pr_ + " na") if uses_ni else build(pb + "নি", pr_ + "ni")
    other = build(*nform(verb, confuse, s[2]))
    posf = build(pb, pr_) if not PREFIX.get(tense) else c(" ".join([s[0], PREFIX[tense][0]] + [p[0] for p in parts] + [pb]) + "।", " ".join([s[1], PREFIX[tense][1]] + [p[1] for p in parts] + [pr_]) + ".")
    opts_ = [right, swapped, other, posf]
    note_swapped = ("The " + TENSE_EN[tense].lower() + " does not take a separate না. Take the simple present form and join নি to it.") if uses_ni else ("The " + TENSE_EN[tense].lower() + " does not take -নি. Keep the verb as it is and put না after it as a separate word.")
    notes = ["", f"{swapped['bn']} ({swapped['ro']}) uses the wrong negative marker. " + note_swapped,
             f"{other['bn']} ({other['ro']}) is a negative, but it is in the {TENSE_EN[confuse].lower()}. The English asks for the {TENSE_EN[tense].lower()}.",
             f"{posf['bn']} ({posf['ro']}) has no না or নি, so it says the opposite: it is positive."]
    return MEAN(en, opts_, 0, f"{right['bn']} ({right['ro']}) means '{en.rstrip('.?!')}'. " + why, inst, notes)

def PICKW(q, options, answer, why, wrong, inst="Read the question and choose the correct answer."):
    """PICK with a hand-written note for each wrong option; wrong = {index: note}"""
    notes = [wrong.get(i, "") if i != answer else "" for i in range(len(options))]
    return PICK(q, options, answer, why, inst, None, notes)
def SPOTW(options, answer, why, wrong, inst="Only one sentence is correct. Choose it."):
    notes = [wrong.get(i, "") if i != answer else "" for i in range(len(options))]
    return SPOT(options, answer, why, inst, notes)

# ======================================================================================================================
# PRESENT
# ======================================================================================================================
PRES_SIGNALS = [(("রোজ / প্রতিদিন", "roj / protidin"), "every day"), (("সবসময়", "shobshomoy"), "always"), (("মাঝে মাঝে", "majhe majhe"), "sometimes"), (("সাধারণত", "shadharonoto"), "usually"), (("কখনো … না", "kokhono … na"), "never")]
CONT_SIGNALS = [(("এখন", "ekhon"), "now"), (("এই মুহূর্তে", "ei muhurte"), "at this moment"), (("আজকাল", "ajkal"), "these days"), (("এখনও", "ekhono"), "still"), (("দেখো / শোনো", "dekho / shono"), "look! / listen!")]
PERF_SIGNALS = [(("এইমাত্র", "eimatro"), "just now"), (("ইতিমধ্যে", "itimoddhe"), "already"), (("এখনও … না", "ekhono … na"), "not yet (with a negative)"), (("কখনো", "kokhono"), "ever / never"), (("আজ", "aj"), "today (the day is not over)")]

def present_topic():
    secs = []
    secs.append(dict(id="glance", title="The three present tenses at a glance", blocks=[
        P("বর্তমান কাল (bortoman kal) is the present. Bengali has three present tenses that matter every day. Each one answers a different question: what do you usually do, what are you doing right now, and what have you already done. You will meet them in this order: the simple present, the present continuous and the present perfect."),
        TABLE(["#", "Name", "In English", "The question it answers", "Sign"], [
            ["1", c("সাধারণ বর্তমান", "sadharon bortoman"), "Simple present", "What do you usually do?", "none: root + ending"],
            ["2", c("ঘটমান বর্তমান", "ghotoman bortoman"), "Present continuous", "What are you doing right now?", "-ছ-"],
            ["3", c("পুরাঘটিত বর্তমান", "puraghotito bortoman"), "Present perfect", "What have you already done?", "-েছ-"],
        ], "Three present tenses"),
        H("How every Bengali verb is built"),
        P("Every verb has three parts: the root (ধাতু, dhatu), the tense sign, and the person ending. The root carries the meaning. The sign tells you when. The ending tells you who. For করা (kora, to do) the root is কর্ (kor)."),
        RULE("The formula", "root + tense sign + person ending", [("কর + ছ + ি = করছি", "kor + chh + i = korchhi", "I am doing"), ("কর + েছ + ি = করেছি", "kor + echh + i = korechhi", "I have done"), ("কর + ি = করি", "kor + i = kori", "I do")]),
        H("The present person endings"),
        P("The endings change with the person. Plural pronouns use the same ending as the singular one: আমি and আমরা both take -ি; তুমি and তোমরা both take -ো; সে, ও and ওরা all take -ে; আপনি and আপনারা both take -েন."),
        TABLE(["Person", "Simple present", "Present continuous", "Present perfect"], [[person_cell(i), ending_cell("pres", i), ending_cell("cont", i), ending_cell("perf", i)] for i in range(5)], "Person endings, side by side"),
        NOTE("The three tenses share their endings in the same shape: -i / -o / -e / -en. Learn the simple present endings once and the other two follow. With তুই (very familiar), the ending is -is: করিস, করছিস, করেছিস."),
        H("The same sentence in all three"),
        EXS([S("ami", [BHAT], "khaoya", "pres", "I eat rice (usually)."), S("ami", [BHAT], "khaoya", "cont", "I am eating rice (now)."), S("ami", [BHAT], "khaoya", "perf", "I have eaten rice (it is done).")], "One verb, three meanings"),
        NOTE("Every present tense also has a negative: you will find it in its own section right after the positive. The one rule to remember now: the simple present and the present continuous take না after the verb; the present perfect takes -নি joined to the verb."),
    ]))
    # ---- simple present
    secs.append(dict(id="simple", title="Simple present: habits, facts and routines", blocks=[
        H("When do we use it?"),
        P("The simple present (সাধারণ বর্তমান, sadharon bortoman) is the plainest tense. Use it for what happens again and again, for things that are always true, and for fixed timetables."),
        LIST(["A habit or routine: আমি রোজ চা খাই। (I drink tea every day.)", "A general fact: সূর্য পূর্ব দিকে ওঠে। (The sun rises in the east.)", "A timetable: ট্রেন আটটায় ছাড়ে। (The train leaves at eight.)", "A question about what someone usually does: তুমি কোথায় থাকো? (Where do you live?)"], title="Four uses"),
        H("How the verb changes"),
        RULE("The formula", "root + person ending (no tense sign)", [("কর + ি = করি", "kor + i = kori", "I do"), ("কর + ো = করো", "kor + o = koro", "you (familiar) do"), ("কর + ে = করে", "kor + e = kore", "he / she does"), ("কর + েন = করেন", "kor + en = koren", "you (respectful) / he, she (respectful) do(es)")]),
        person_table("pres", title="Simple present of করা (kora, to do)"),
        NOTE("Verbs with a long vowel in the root change it: খা → খাই, খাও, খায়, খান (yes, খায় ends in -য়). যা → যাই, যাও, যায়, যান. And লেখা (to write) changes its vowel: লিখি, লেখো, লেখে, লেখেন."),
        H("Twelve verbs"),
        verbs_table("pres", title="Simple present of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [ROJ, SHOKALE, CHA], "khaoya", "pres", "I drink tea every morning."), S("tumi", [PROTIDIN, SKULE], "jaoya", "pres", "You go to school every day."), S("se", [ROJ, BOI], "pora", "pres", "He / she reads a book every day."),
             S("amra", [PROTIDIN, PARKE], "hata", "pres", "We walk in the park every day."), S("ami", [ROJ, BANGLA], "bola", "pres", "I speak Bengali every day."), S("o", [ROJ, GAN], "shona", "pres", "He / she listens to a song every day."),
             ("সূর্য পূর্ব দিকে ওঠে।", "shurjo purbo dike othe.", "The sun rises in the east. (fact)"), ("গরু ঘাস খায়।", "goru ghas khay.", "Cows eat grass. (fact)"), ("ট্রেন সকাল আটটায় ছাড়ে।", "tren shokal atotay chhare.", "The train leaves at eight in the morning. (timetable)"),
             S("tumi", [("কোথায়", "kothay")], "thaka", "pres", "Where do you live?", q=True)], "Habits, facts and timetables"),
        signals(PRES_SIGNALS),
        MISTAKES([
            (("আমি রোজ ভাত খাচ্ছি।", "ami roj bhat khachchhi."), ("আমি রোজ ভাত খাই।", "ami roj bhat khai."), "A regular habit (রোজ, every day) needs the simple present, not the continuous."),
            (("সে খায় আজ ভাত।", "she khay aj bhat."), ("সে আজ ভাত খায়।", "she aj bhat khay."), "The verb goes at the end of the sentence."),
        ], title="Habit or right now?"),
    ]))
    secs.append(dict(id="simple-neg", title="Simple present: the negative", blocks=[
        H("The rule"),
        RULE("Add না after the verb", "Keep the simple present verb exactly as it is. Put না (na) after it as a separate word.", [S("ami", [BHAT], "khaoya", "pres", "I do not eat rice.", neg=True)]),
        LIST(["Take the positive verb: খাই (khai).", "Put না after it: খাই না (khai na).", "The verb does not change for the negative. Only না is added."], ordered=True, title="Three steps"),
        neg_person_table("pres", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("pres", neg=True, title="Simple present, negative"),
        H("Examples"),
        EXS([S("ami", [BHAT], "khaoya", "pres", "I do not eat rice.", neg=True), S("se", [MACH], "khaoya", "pres", "He / she does not eat fish.", neg=True), S("amra", [BAJARE], "jaoya", "pres", "We do not go to the market.", neg=True),
             S("tumi", [ROJ, CHA], "khaoya", "pres", "You do not drink tea every day.", neg=True), S("ami", [("সকালে", "shokale"), KHOBOR], "dekha", "pres", "I do not read the news in the morning.", neg=True)], "Negative sentences"),
        H("Questions"),
        P("To ask a yes / no question, add কি (ki) or raise your voice at the end. To ask for information, put a question word (কী, কোথায়, কখন) before the verb."),
        EXS([S("tumi", [ROJ, SKULE], "jaoya", "pres", "Do you go to school every day?", q=True), S("tumi", [("কি", "ki"), CHA], "khaoya", "pres", "Do you drink tea?", q=True), S("apni", [("কোথায়", "kothay")], "thaka", "pres", "Where do you live?", q=True), S("tumi", [("কি", "ki"), BHAT], "khaoya", "pres", "Do you not eat rice?", q=True, neg=True)], "Questions"),
        MISTAKES([
            (("সে ভাত না খায়।", "she bhat na khay."), ("সে ভাত খায় না।", "she bhat khay na."), "না comes AFTER the verb, never before it."),
            (("আমি ভাত খাইনি রোজ।", "ami bhat khaini roj."), ("আমি রোজ ভাত খাই না।", "ami roj bhat khai na."), "A habit uses না. The -নি ending is for finished actions (it would mean 'I have not eaten')."),
        ], title="Where does না go?"),
    ]))
    # ---- present continuous
    secs.append(dict(id="continuous", title="Present continuous: happening now", blocks=[
        H("When do we use it?"),
        P("The present continuous (ঘটমান বর্তমান, ghotoman bortoman) says that an action is in progress. It is the tense of right now."),
        LIST(["An action in progress at this moment: আমি ভাত খাচ্ছি। (I am eating rice.)", "Something temporary around now: সে আজকাল অনেক পড়ছে। (He / she is studying a lot these days.)", "A settled plan for the near future: আমি কাল কলকাতায় যাচ্ছি। (I am going to Kolkata tomorrow.)", "Something that started in the past and is still going on: আমি দুই বছর ধরে বাংলা শিখছি। (I have been learning Bengali for two years.)"], title="Four uses"),
        H("How the verb changes"),
        RULE("The formula", "root + ছ + person ending", [("কর + ছ + ি = করছি", "kor + chh + i = korchhi", "I am doing"), ("দেখ + ছ + ে = দেখছে", "dekh + chh + e = dekhchhe", "he / she is looking")]),
        person_table("cont", title="Present continuous of করা (kora, to do)"),
        NOTE("After a root that ends in a vowel (খা, যা, দে, নে, শো), ছ becomes চ্ছ: খাচ্ছি (khachchhi), যাচ্ছি (jachchhi), দিচ্ছি (dichchhi). An easy way to remember: the -চ্ছ- is the same sound as -ছ-, just doubled after a vowel."),
        H("Twelve verbs"),
        verbs_table("cont", title="Present continuous of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [EKHON, BHAT], "khaoya", "cont", "I am eating rice now."), S("tumi", [EKHON, ("কী", "ki")], "kora", "cont", "What are you doing now?", q=True), S("se", [BOI], "pora", "cont", "He / she is reading a book."),
             S(MA, [("রান্না", "ranna")], "kora", "cont", "Mother is cooking."), S("apni", [("কোথায়", "kothay")], "jaoya", "cont", "Where are you going?", q=True), S("amra", [GAN], "shona", "cont", "We are listening to a song."),
             ("বৃষ্টি পড়ছে।", "brishti porchhe.", "It is raining."), ("আমি বাংলা শিখছি।", "ami bangla shikhchhi.", "I am learning Bengali."),
             S("ami", [KAL, KOLKATAY], "jaoya", "cont", "I am going to Kolkata tomorrow. (a settled plan)")], "In progress, and plans"),
        signals(CONT_SIGNALS),
        MISTAKES([
            (("আমি এখন ভাত খাই।", "ami ekhon bhat khai."), ("আমি এখন ভাত খাচ্ছি।", "ami ekhon bhat khachchhi."), "খাই sounds like a habit ('I eat'). For an action happening right now, say খাচ্ছি."),
            (("আমি আছি ভাত খাচ্ছি।", "ami achhi bhat khachchhi."), ("আমি ভাত খাচ্ছি।", "ami bhat khachchhi."), "Do not add 'am' (আছি). The -ছি ending already means 'am eating'."),
        ], title="Now needs -ছ"),
    ]))
    secs.append(dict(id="continuous-neg", title="Present continuous: the negative", blocks=[
        H("The rule"),
        RULE("Add না after the verb", "Keep the present continuous verb exactly as it is. Put না (na) after it as a separate word. It works exactly like the simple present negative.", [S("ami", [EKHON, BHAT], "khaoya", "cont", "I am not eating rice now.", neg=True)]),
        neg_person_table("cont", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("cont", neg=True, title="Present continuous, negative"),
        H("Examples"),
        EXS([S("ami", [EKHON, BHAT], "khaoya", "cont", "I am not eating rice now.", neg=True), S("se", [BOI], "pora", "cont", "He / she is not reading a book.", neg=True), S("tumi", [EKHON, GAN], "shona", "cont", "You are not listening to a song now.", neg=True),
             S("amra", [KAL, KOLKATAY], "jaoya", "cont", "We are not going to Kolkata tomorrow.", neg=True), ("বৃষ্টি পড়ছে না।", "brishti porchhe na.", "It is not raining.")], "Negative sentences"),
        H("Questions"),
        EXS([S("tumi", [("কেন", "keno")], "kora", "cont", "Why are you doing it?", q=True), S("apni", [("কি", "ki"), GAN], "shona", "cont", "Are you listening to a song?", q=True), S("tumi", [EKHON, ("কী", "ki")], "kora", "cont", "What are you doing now?", q=True)], "Questions"),
        MISTAKES([
            (("আমি ভাত খাচ্ছিনি।", "ami bhat khachchhini."), ("আমি ভাত খাচ্ছি না।", "ami bhat khachchhi na."), "The continuous takes না as a separate word. The joined -নি is only for finished actions."),
        ], title="না, not নি"),
    ]))
    # ---- present perfect
    secs.append(dict(id="perfect", title="Present perfect: finished, with a result now", blocks=[
        H("When do we use it?"),
        P("The present perfect (পুরাঘটিত বর্তমান, puraghotito bortoman) says that an action is finished, and that the result is still true now. Bengali uses it much more than English does for recent events."),
        LIST(["Done, and it matters now: আমি ভাত খেয়েছি। (I have eaten rice. I am not hungry.)", "Just done: সে এইমাত্র এসেছে। (He / she has just come.)", "A life experience: তুমি কি কখনো কলকাতায় এসেছ? (Have you ever come to Kolkata?)", "Something not done yet: আমি এখনও খাইনি। (I have not eaten yet.)"], title="Four uses"),
        H("How the verb changes"),
        RULE("The formula", "root + েছ + person ending (the -েছ- sign is added to the root).", [("কর + েছ + ি = করেছি", "kor + echh + i = korechhi", "I have done"), ("দেখ + েছ + ে = দেখেছে", "dekh + echh + e = dekhechhe", "he / she has seen")]),
        person_table("perf", title="Present perfect of করা (kora, to do)"),
        NOTE("Some roots change their vowel before -েছ-. খা becomes খে (খেয়েছি, kheyechhi). যা becomes গি (গিয়েছি, giyechhi). আস becomes এস (এসেছি, eshechhi). লেখ becomes লিখ (লিখেছি, likhechhi). শোন becomes শুন (শুনেছি, shunechhi). থাক becomes থেক (থেকেছি, thekechhi)."),
        H("Twelve verbs"),
        verbs_table("perf", title="Present perfect of twelve verbs"),
        H("Examples"),
        EXS([S("ami", [BHAT], "khaoya", "perf", "I have eaten rice."), S("tumi", [("কি", "ki"), BHAT], "khaoya", "perf", "Have you eaten rice?", q=True), S("se", [CHITHI], "lekha", "perf", "He / she has written a letter."),
             S(BABA, [OFISE], "jaoya", "perf", "Father has gone to the office."), S("ami", [EIMATRO], "asha", "perf", "I have just come."), S(MA, [("রান্না", "ranna")], "kora", "perf", "Mother has cooked."),
             S("amra", [("ছবিটা", "chhobita")], "dekha", "perf", "We have seen the picture."), S("apni", [("কি", "ki"), KOKHONO, KOLKATAY], "asha", "perf", "Have you ever come to Kolkata?", q=True)], "Done, with a result now"),
        NOTE("Bengali uses the present perfect for events of today. 'I came today' is আমি আজ এসেছি, with the perfect, because today is not over. Use the simple past only when the time is clearly over: আমি গতকাল এসেছিলাম (I came yesterday)."),
        signals(PERF_SIGNALS),
        MISTAKES([
            (("আমি ভাত খাইছি।", "ami bhat khaichhi."), ("আমি ভাত খেয়েছি।", "ami bhat kheyechhi."), "খা changes to খেয়ে before -েছি. Say খেয়েছি."),
            (("আমি গতকাল ভাত খেয়েছি।", "ami gotokal bhat kheyechhi."), ("আমি গতকাল ভাত খেয়েছিলাম।", "ami gotokal bhat kheyechhilam."), "গতকাল (yesterday) is over, so use the simple past (-েছিলাম). The present perfect (-েছি) is for what still matters now."),
        ], title="Now, or then?"),
    ]))
    secs.append(dict(id="perfect-neg", title="Present perfect: the negative", blocks=[
        H("The rule: this one is special"),
        RULE("Do not add না. Add -নি to the simple present form.", "The present perfect negative does not use না. Take the simple present form of the verb and join নি (ni) to it. This is the one negative that does not simply add না.", [S("ami", [EKHON, BHAT], "khaoya", "perf", "I have not eaten rice yet.", neg=True)]),
        LIST(["Take the SIMPLE PRESENT form for that person: খাই (khai).", "Join নি (ni) to it, with no space: খাইনি (khaini).", "Say এখনও (ekhono, yet) with it for 'not yet'."], ordered=True, title="Three steps"),
        neg_person_table("perf", title="How the negative is made, person by person"),
        H("Twelve verbs, negative"),
        verbs_table("perf", neg=True, title="Present perfect, negative (simple present form + নি)"),
        H("Examples"),
        EXS([S("ami", [("এখনও", "ekhono"), BHAT], "khaoya", "perf", "I have not eaten rice yet.", neg=True), S("se", [("এখনও", "ekhono")], "asha", "perf", "He / she has not come yet.", neg=True), S("tumi", [("এখনও", "ekhono"), BOI], "pora", "perf", "You have not read the book yet.", neg=True),
             S("amra", [("এখনও", "ekhono"), CHITHI], "lekha", "perf", "We have not written the letter yet.", neg=True)], "Not yet"),
        NOTE("The present perfect negative and the simple past negative look exactly the same: আমি খাইনি means 'I have not eaten' and also 'I did not eat'. The time word tells you which. With এখনও, আজ (today) or এইমাত্র it is 'have not'. With গতকাল (yesterday) it is 'did not'."),
        MISTAKES([
            (("আমি ভাত খেয়েছি না।", "ami bhat kheyechhi na."), ("আমি ভাত খাইনি।", "ami bhat khaini."), "Do not put না after the perfect. Use the simple present form + নি."),
            (("আমি ভাত খেয়েনি।", "ami bhat kheyeni."), ("আমি ভাত খাইনি।", "ami bhat khaini."), "-নি joins to the simple present form (খাই), not to the perfect form (খেয়ে)."),
        ], title="The -নি rule"),
    ]))
    secs.append(dict(id="compare", title="The three present tenses side by side", blocks=[
        P("The best way to feel the difference is to see one verb in all three present tenses, positive and negative, with the question each one answers."),
        TABLE(["Question it answers", "Tense", "Positive", "Negative"], [
            ["What do you usually do?", c("সাধারণ বর্তমান", "sadharon bortoman"), c("আমি ভাত খাই।", "ami bhat khai."), c("আমি ভাত খাই না।", "ami bhat khai na.")],
            ["What are you doing right now?", c("ঘটমান বর্তমান", "ghotoman bortoman"), c("আমি ভাত খাচ্ছি।", "ami bhat khachchhi."), c("আমি ভাত খাচ্ছি না।", "ami bhat khachchhi na.")],
            ["What have you already done?", c("পুরাঘটিত বর্তমান", "puraghotito bortoman"), c("আমি ভাত খেয়েছি।", "ami bhat kheyechhi."), c("আমি ভাত খাইনি।", "ami bhat khaini.")],
        ], "One verb, three questions"),
        H("Person by person: খাওয়া (khaoya, to eat)"),
        TABLE(["Person", "Simple present", "Present continuous", "Present perfect"], [[person_cell(i), vcell("khaoya", "pres", i), vcell("khaoya", "cont", i), vcell("khaoya", "perf", i)] for i in range(5)], "Positive"),
        TABLE(["Person", "Simple present", "Present continuous", "Present perfect"], [[person_cell(i), vcell("khaoya", "pres", i, True), vcell("khaoya", "cont", i, True), vcell("khaoya", "perf", i, True)] for i in range(5)], "Negative"),
        LIST(["Simple present and present continuous: negative = the same verb + না (a separate word).", "Present perfect: negative = the simple present form + -নি (joined).", "Time words help: রোজ → simple present; এখন → continuous; এইমাত্র / এখনও → perfect."], title="Remember"),
        EXS([S("ami", [ROJ, BOI], "pora", "pres", "I read a book every day."), S("ami", [EKHON, BOI], "pora", "cont", "I am reading a book now."), S("ami", [BOI], "pora", "perf", "I have read the book."),
             S("se", [ROJ, CHITHI], "lekha", "pres", "He / she writes a letter every day."), S("se", [EKHON, CHITHI], "lekha", "cont", "He / she is writing a letter now."), S("se", [CHITHI], "lekha", "perf", "He / she has written the letter.")], "Same verb, three meanings"),
    ]))
    return secs

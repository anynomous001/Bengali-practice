// Devotional Bengali, volume 2: action words, kīrtan and music, food, Braj places, japa numbers, question words, the verse
// decoder, and phrases for the temple, kīrtan, one's own path, festivals and messages. Tagged "Devotional" like volume 1.
// Written from the teacher's notes: the Bengali needs the teacher's review.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Word, Phrase } from "./vocabulary";
import type { Scenario } from "./roleplay";
import type { CwSet } from "./classwork";
import type { DevTopic } from "./devotional";
import { bnToRoman } from "../lib/translit";

const ro = (s: string) =>
  s.replace(/ô/g, "o").replace(/æ/g, "e").replace(/ṭ/g, "t").replace(/ḍ/g, "d").replace(/ṛ/g, "r").replace(/ṇ/g, "n").replace(/ś/g, "sh").replace(/ṅ/g, "ng");
const W = (bn: string, r: string, en: string, note?: string): Word => (note ? [bn, ro(r), en, note] : [bn, ro(r), en]);
/** A word whose romanization is generated. */
const A = (bn: string, en: string, note?: string): Word => W(bn, bnToRoman(bn), en, note);
const P = (bn: string, r: string, en: string): Phrase => [bn, ro(r), en];
const PA = (bn: string, en: string): Phrase => [bn, bnToRoman(bn), en];

const topic = (t: Omit<DevTopic, "group">): DevTopic => ({ group: "devotional", ...t });

export const DEV_VOCAB_2: DevTopic[] = [
  topic({
    id: "dev-verbs", lessonId: "vocabulary/dev-verbs", course: "vocabulary", part: "words",
    title: ["কাজের শব্দ", "kajer shôbdo", "Action words: what devotees do"],
    blurb: "The verbs of worship, kīrtan, service and everyday life, each with a sentence you can say.",
    sections: [
      { title: "Worship and chanting", words: [
        W("প্রণাম করা", "prônam kôra", "to bow", "আমি ঠাকুরকে প্রণাম করি।"),
        W("জপ করা", "jôp kôra", "to chant japa", "আমি সকালে জপ করি।"),
        W("নাম করা", "nam kôra", "to chant the Name", "চলুন, নাম করি।"),
        W("ভোগ দেওয়া", "bhog deoya", "to offer food to the deity", "ঠাকুরকে ভোগ দিয়েছি।"),
        W("আরতি করা", "arôti kôra", "to perform ārati", "পূজারী আরতি করছেন।"),
        W("দর্শন করা", "dôrshôn kôra", "to have darśan", "বাবাজীর সমাধি দর্শন করব।"),
        W("স্নান করা", "snan kôra", "to bathe (a holy dip)", "গঙ্গায় স্নান করব।"),
      ] },
      { title: "Singing, hearing and calling", words: [
        W("গান গাওয়া", "gan gaoya", "to sing", "উনি খুব সুন্দর কীর্তন গান।"),
        W("নাচা", "nacha", "to dance", "ভক্তরা কীর্তনে নাচছেন।"),
        W("শোনা", "shona", "to listen, to hear", "আমি কীর্তন শুনতে ভালবাসি।"),
        W("ডাকা", "ḍaka", "to call", "মন দিয়ে তাঁকে ডাকো।"),
        W("কাঁদা", "ka~da", "to cry", "ভক্ত নামে কাঁদছেন।"),
      ] },
      { title: "Giving, taking and living", words: [
        W("দেখা", "dækha", "to see", "ঠাকুর দেখেছেন?"),
        W("দেওয়া", "deoya", "to give", "প্রসাদ দিন।"),
        W("নেওয়া", "neoya", "to take", "প্রসাদ নিন।"),
        W("পাওয়া", "paoya", "to get, to receive", "কৃপা পেয়েছি।"),
        W("বসা", "bôsha", "to sit", "এখানে বসুন।"),
        W("হাঁটা", "ha~ṭa", "to walk", "আমরা পরিক্রমায় হাঁটব।"),
        W("পড়া", "pôṛa", "to read", "আমি গীতা পড়ি।"),
        W("লেখা", "lekha", "to write", "আমি কৃষ্ণনাম লিখি।"),
        W("শেখা", "shekha", "to learn", "আমি বাংলা শিখছি।"),
        W("মনে রাখা", "mône rakha", "to remember", "নাম মনে রাখবেন।"),
        W("সেবা করা", "sheba kôra", "to serve", "আমি আশ্রমে সেবা করি।"),
        W("ভাবা", "bhaba", "to think, to contemplate", "সবসময় কৃষ্ণকে ভাবো।"),
        W("ভালবাসা", "bhalobasha", "to love", "ঠাকুর ভক্তকে ভালবাসেন।"),
        W("ক্ষমা করা", "kkhôma kôra", "to forgive", "ক্ষমা করবেন।"),
      ] },
    ],
    phrases: [
      PA("আমি ঠাকুরকে প্রণাম করি।", "I bow to the Lord."),
      PA("আমি সকালে জপ করি।", "I chant japa in the morning."),
      PA("চলুন, নাম করি।", "Come, let us chant."),
      PA("উনি খুব সুন্দর কীর্তন গান।", "He sings kīrtan beautifully."),
      PA("ভক্তরা কীর্তনে নাচছেন।", "The devotees are dancing in kīrtan."),
      PA("আমি কীর্তন শুনতে ভালবাসি।", "I love listening to kīrtan."),
      PA("মন দিয়ে তাঁকে ডাকো।", "Call Him with your whole heart."),
      PA("প্রসাদ দিন।", "Please give prasād."),
      PA("প্রসাদ নিন।", "Please take prasād."),
      PA("কৃপা পেয়েছি।", "I have received grace."),
      PA("এখানে বসুন।", "Sit here, please."),
      PA("আমি আশ্রমে সেবা করি।", "I do service at the ashram."),
      PA("ক্ষমা করবেন।", "Please forgive me."),
    ],
  }),
  topic({
    id: "dev-kirtan", lessonId: "vocabulary/dev-kirtan", course: "vocabulary", part: "words",
    title: ["কীর্তন ও গান", "kirtôn o gan", "Kīrtan and music"],
    blurb: "Songs, instruments and the kinds of kīrtan.",
    sections: [
      { title: "Songs and sound", words: [
        W("গান", "gan", "song"), W("সুর", "shur", "tune, melody"), W("তাল", "tal", "rhythm, beat"),
        W("পদ", "pôd", "a devotional song-poem", "পদাবলী is a collection of them"),
        W("আখর", "akhôr", "improvised lines a kīrtan singer adds", "A word that appears in Rāmdās Charitāmṛta"),
        W("হরিধ্বনি", "horidhôni", "the shout “Hari bol!”"),
      ] },
      { title: "People and instruments", words: [
        W("কীর্তনীয়া", "kirtôniya", "kīrtan singer", "Rāmdās Bābājī was a celebrated one"),
        W("হারমোনিয়াম", "harmoniyam", "harmonium"),
        W("ঝাঁঝ", "jha~jh", "small cymbals", "Also মঞ্জিরা"),
      ] },
      { title: "Kinds of kīrtan", words: [
        W("নগর কীর্তন", "nôgôr kirtôn", "kīrtan procession through town", "A chapter of Rāmdās Charitāmṛta"),
        W("অষ্টপ্রহর", "ôshṭoprôhor", "24-hour continuous nām-kīrtan"),
        W("লীলা কীর্তন", "lila kirtôn", "kīrtan that tells Kṛṣṇa's pastimes"),
      ] },
    ],
    phrases: [
      P("কী সুন্দর কীর্তন!", "ki shundôr kirtôn!", "What beautiful kīrtan!"),
      P("আমি কীর্তন ভালবাসি।", "ami kirtôn bhalobashi.", "I love kīrtan."),
    ],
  }),
  topic({
    id: "dev-food", lessonId: "vocabulary/dev-food", course: "vocabulary", part: "words",
    title: ["প্রসাদের খাবার", "prôshader khabar", "Food and prasād"],
    blurb: "The sweets and foods of the prasād episodes in Rāmdās Charitāmṛta, and festival food.",
    sections: [
      { title: "Sweets and milk", words: [
        W("প্যাঁড়া", "pæ~ṛa", "milk sweet", "A Braj specialty"), W("ক্ষীর", "kkhir", "thickened milk"), W("সন্দেশ", "shôndesh", "Bengali milk sweet"),
        W("মাখন", "makhôn", "butter", "Also ননী. Gopāl's favourite"), W("পায়েস", "payesh", "rice pudding"),
      ] },
      { title: "Meals", words: [
        W("লুচি", "luchi", "puffed fried bread"), W("রুটি", "ruṭi", "flatbread", "Braj madhukarī food"), W("ভাত", "bhat", "cooked rice", "Also অন্ন, food"),
        W("খিচুড়ি", "khichuṛi", "rice-lentil dish", "Classic festival prasād"), W("ফল", "phôl", "fruit"), W("জল", "jôl", "water"),
      ] },
      { title: "Serving", words: [
        W("ঠোঙা", "ṭhonga", "paper or leaf bag", "Prasād came in one"), W("কণা", "kôna", "a tiny particle", "A particle of prasād"),
        W("পাতা", "pata", "leaf", "Also কলাপাতা, a banana leaf plate"),
      ] },
    ],
    phrases: [
      P("প্রসাদ পেয়েছেন?", "prôshad peyechhen?", "Have you taken prasād?"),
      P("এক কণা প্রসাদ।", "æk kôna prôshad.", "One tiny particle of prasād."),
    ],
  }),
  topic({
    id: "dev-braj", lessonId: "vocabulary/dev-braj", course: "vocabulary", part: "words",
    title: ["ব্রজ ও বাংলার প্রকৃতি", "Brôj o Banglar prôkriti", "Places and nature in Braj and Bengal"],
    blurb: "Paths, groves, ponds, animals and the times of day, from the Braj chapters of Rāmdās Charitāmṛta.",
    sections: [
      { title: "Paths and places", words: [
        W("পথ", "pôth", "path, road", "Also রাস্তা"), W("ঘাট", "ghaṭ", "bathing steps on a river"), W("কুণ্ড", "kunḍo", "sacred pond", "রাধাকুণ্ড, শ্যামকুণ্ড"),
        W("কুঞ্জ", "kunjo", "grove, bower"), W("বন", "bôn", "forest", "মধুবন, বৃন্দাবন"), W("গিরি", "giri", "hill", "Also পাহাড়. গিরি গোবর্ধন"),
        W("নদী", "nôdi", "river", "তীর is the bank"), W("গ্রাম", "gram", "village"), W("বাড়ি", "baṛi", "house", "Also ঘর, room"),
        W("দরজা", "dôrja", "door", "The verse uses দ্বার"), W("সমাধি", "shômadhi", "samādhi shrine"),
      ] },
      { title: "Trees and animals", words: [
        W("গাছ", "gachh", "tree"), W("কদম গাছ", "kôdôm gachh", "kadamba tree", "Kṛṣṇa's tree"), W("ময়ূর", "môyur", "peacock"),
        W("হরিণ", "horin", "deer", "In the book a deer dances with the Vaishnavas"), W("পাখি", "pakhi", "bird"), W("গরু", "gôru", "cow", "Also গাভী"),
      ] },
      { title: "Times of day", words: [
        W("ভোর", "bhor", "dawn"), W("সকাল", "shôkal", "morning"), W("সন্ধ্যা", "shôndhya", "evening"), W("রাত", "rat", "night"),
      ] },
    ],
    phrases: [
      P("ভোরে ঘাটে স্নান করব।", "bhore ghaṭe snan kôrbo.", "I will bathe at the ghat at dawn."),
      P("কদম গাছের নিচে বসুন।", "kôdôm gachher niche bôshun.", "Please sit under the kadamba tree."),
    ],
  }),
  topic({
    id: "dev-numbers", lessonId: "vocabulary/dev-numbers", course: "vocabulary", part: "words",
    title: ["মালার গোনা", "malar gona", "Counting rounds of japa"],
    blurb: "The numbers 1 to 16, enough to say “sixteen rounds”.",
    sections: [
      { title: "One to eight", words: [
        W("এক", "æk", "one", "১"), W("দুই", "dui", "two", "২"), W("তিন", "tin", "three", "৩"), W("চার", "char", "four", "৪"),
        W("পাঁচ", "pa~ch", "five", "৫"), W("ছয়", "chhôy", "six", "৬"), W("সাত", "shat", "seven", "৭"), W("আট", "aṭ", "eight", "৮"),
      ] },
      { title: "Nine to sixteen", words: [
        W("নয়", "nôy", "nine", "৯"), W("দশ", "dôsh", "ten", "১০"), W("এগারো", "ægaro", "eleven", "১১"), W("বারো", "baro", "twelve", "১২"),
        W("তেরো", "tæro", "thirteen", "১৩"), W("চোদ্দ", "choddo", "fourteen", "১৪"), W("পনেরো", "pônero", "fifteen", "১৫"), W("ষোলো", "sholo", "sixteen", "১৬"),
      ] },
    ],
    phrases: [
      P("আমি রোজ ষোলো মালা জপ করি।", "ami roj sholo mala jôp kori.", "I chant sixteen rounds daily."),
      P("আজ আট মালা হলো।", "aj aṭ mala holo.", "Eight rounds today."),
    ],
  }),
  topic({
    id: "dev-questions", lessonId: "vocabulary/dev-questions", course: "vocabulary", part: "words",
    title: ["প্রশ্নের শব্দ", "prôshner shôbdo", "Question words"],
    blurb: "Who, what, where, when, why, how and how many: for asking and for answering comprehension questions.",
    sections: [
      { title: "Question words", words: [
        W("কে?", "ke?", "who?"), W("কী?", "ki?", "what?", "Also written কি"), W("কোথায়?", "kothay?", "where?"), W("কখন?", "kôkhon?", "when?"),
        W("কেন?", "kæno?", "why?"), W("কেমন?", "kæmon?", "how, in what state?"), W("কত?", "kôto?", "how many, how much?"), W("কার?", "kar?", "whose?"),
      ] },
    ],
    phrases: [
      P("আজ কে কীর্তন করবেন?", "aj ke kirtôn kôrben?", "Who will lead kīrtan today?"),
      P("প্রসাদ কোথায় পাওয়া যাবে?", "prôshad kothay paoya jabe?", "Where can I get prasād?"),
      P("মন্দির কখন খোলে?", "môndir kôkhon khole?", "When does the temple open?"),
      P("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds today?"),
    ],
  }),
  // ---- Phrase lessons
  topic({
    id: "dev-temple", lessonId: "vocabulary/dev-temple", course: "vocabulary", part: "phrases",
    title: ["মন্দিরে", "môndire", "At the temple or ashram"],
    blurb: "Questions you will need to ask when you visit.",
    sections: [{ title: "At the temple", words: [
      W("জুতো কোথায় রাখব?", "juto kothay rakhbo?", "Where should I leave my shoes?"),
      W("মন্দির কখন খোলে?", "môndir kôkhon khole?", "When does the temple open?"),
      W("মঙ্গল আরতি ক'টায়?", "mônggôl arôti kôṭay?", "What time is the early-morning ārati?"),
      W("প্রসাদ কোথায় পাওয়া যাবে?", "prôshad kothay paoya jabe?", "Where can I get prasād?"),
      W("আমি কি কোনো সেবা করতে পারি?", "ami ki kono sheba kôrte pari?", "May I do some service?"),
      W("এখানে বসে জপ করতে পারি?", "ekhane bôshe jôp kôrte pari?", "May I sit here and chant?"),
      W("মালাটা কোথা থেকে কিনব?", "malaṭa kotha theke kinbo?", "Where can I buy japa beads?"),
      W("ঠাকুরের নাম কী?", "ṭhakurer nam ki?", "What is the deity's name?"),
      W("আজ কি কোনো উৎসব আছে?", "aj ki kono utshôb achhe?", "Is there a festival today?"),
      W("বাবাজীর সমাধি কোথায়?", "babajeer shômadhi kothay?", "Where is Bābājī's samādhi?"),
    ] }],
    phrases: [],
  }),
  topic({
    id: "dev-kirtan-phrases", lessonId: "vocabulary/dev-kirtan-phrases", course: "vocabulary", part: "phrases",
    title: ["কীর্তনে", "kirtône", "At kīrtan"],
    blurb: "What to say and call out during and after kīrtan.",
    sections: [{ title: "At kīrtan", words: [
      W("আজ কে কীর্তন করবেন?", "aj ke kirtôn kôrben?", "Who will lead kīrtan today?"),
      W("কী সুন্দর কীর্তন!", "ki shundôr kirtôn!", "What beautiful kīrtan!"),
      W("এই গানের মানে কী?", "ei ganer mane ki?", "What does this song mean?"),
      W("আমি করতাল বাজাতে পারি।", "ami kôrtal bajate pari.", "I can play the cymbals."),
      W("আরেকবার গান, প্রভু!", "arekbar gan, prôbhu!", "Sing once more, Prabhu!"),
      W("বলো হরি, হরিবোল!", "bôlo Hori, Horibol!", "Say Hari, Haribol!", "Call and response"),
      W("নিতাই গৌর হরিবোল!", "Nitai Gour Horibol!", "Nitāi Gaura, Haribol!", "The end-of-kīrtan cheer"),
      W("গৌর প্রেমানন্দে হরি হরিবোল!", "Gour premanônde Hori Horibol!", "Gaura premānande Hari Haribol!", "The traditional closing cry"),
    ] }],
    phrases: [],
  }),
  topic({
    id: "dev-path", lessonId: "vocabulary/dev-path", course: "vocabulary", part: "phrases",
    title: ["নিজের পথের কথা", "nijer pôther kotha", "Talking about your path"],
    blurb: "Say who you follow, what you love and what you want to learn.",
    sections: [{ title: "About me", words: [
      W("আমি রামদাস বাবাজীর পরিবারের।", "ami Ramdash babajeer pôribarer.", "I belong to Rāmdās Bābājī's spiritual family.", "পরিবার here means lineage family"),
      W("আমার দীক্ষা হয়েছে।", "amar dikkha hoyechhe.", "I am initiated."),
      W("এখনো দীক্ষা হয়নি।", "ækhono dikkha hoyni.", "I am not initiated yet."),
      W("আমি নিতাই-গৌরের ভক্ত।", "ami Nitai-Gourer bhôkto.", "I am a devotee of Nitāi-Gaura."),
      W("আমি কীর্তন ভালবাসি।", "ami kirtôn bhalobashi.", "I love kīrtan."),
      W("আমি বাংলায় পদাবলী পড়তে চাই।", "ami Banglay pôdaboli pôṛte chai.", "I want to read the padāvalī in Bengali."),
      W("আমি নবদ্বীপ আর বৃন্দাবন যেতে চাই।", "ami Nôbodwip ar Brindabôn jete chai.", "I want to go to Navadvīp and Vrindavan."),
      W("রামদাস বাবাজীর কথা আরো বলুন।", "Ramdash babajeer kôtha aro bôlun.", "Please tell me more about Rāmdās Bābājī."),
      W("এই কথাটার মানে বুঝিয়ে দিন।", "ei kôthaṭar mane bujhiye din.", "Please explain the meaning of this word."),
      W("আমি এখনো ভাল বাংলা বলতে পারি না।", "ami ækhono bhalo Bangla bôlte pari na.", "I cannot speak Bengali well yet."),
      W("আস্তে আস্তে শিখছি, নিতাইয়ের কৃপায়।", "aste aste shikhchhi, Nitaiyer kripay.", "I am learning slowly, by Nitāi's grace."),
    ] }],
    phrases: [],
  }),
  topic({
    id: "dev-festivals", lessonId: "vocabulary/dev-festivals", course: "vocabulary", part: "phrases",
    title: ["উৎসবের শুভেচ্ছা", "utshôber shubhechchha", "Festival wishes"],
    blurb: "What to say on the big days of the year.",
    sections: [{ title: "Wishes", words: [
      W("শুভ গৌরপূর্ণিমা!", "shubho Gourpurnima!", "Happy Gaura Pūrṇimā", "The full moon of Holi, Caitanya's appearance day"),
      W("শুভ জন্মাষ্টমী!", "shubho Jônmashṭomi!", "Happy Janmāṣṭamī"),
      W("শুভ রাধাষ্টমী!", "shubho Radhashṭomi!", "Happy Rādhāṣṭamī"),
      W("শুভ নিত্যানন্দ ত্রয়োদশী!", "shubho Nittanôndo trôyodôshi!", "Happy Nityānanda Trayodaśī"),
      W("শুভ রথযাত্রা!", "shubho Rôthjatra!", "Happy Ratha-yātrā"),
      W("শুভ দোলযাত্রা!", "shubho Doljatra!", "Happy Dol (Holi)"),
      W("শুভ বিজয়া", "shubho Bijôya", "Happy Bijoya", "A common Bengali seasonal wish; শুভ দীপাবলী is the Diwali wish"),
      W("শুভ আবির্ভাব তিথি", "shubho abirbhab tithi", "Blessed appearance day", "Of a saint"),
      W("তিরোভাব তিথি", "tirobhab tithi", "Disappearance day of a saint", "Said solemnly, without শুভ"),
    ] }],
    phrases: [],
  }),
  topic({
    id: "dev-messages", lessonId: "vocabulary/dev-messages", course: "vocabulary", part: "phrases",
    title: ["বার্তা", "barta", "Messages to devotees"],
    blurb: "Short messages for chat and text.",
    sections: [{ title: "Messages", words: [
      A("জয় নিতাই প্রভু, কেমন আছেন?", "Jay Nitai Prabhu, how are you?"),
      A("আজ সন্ধ্যায় কীর্তনে আসছেন?", "Are you coming to kīrtan this evening?"),
      A("আপনার কৃপায় ভাল আছি।", "I am well, by your kindness."),
      A("আমার জন্য একটু প্রার্থনা করবেন।", "Please pray for me a little."),
      A("দণ্ডবৎ প্রণাম নেবেন। জয় নিতাই!", "Please accept my daṇḍavat. Jay Nitai!"),
      A("কাল দেখা হবে। রাধে রাধে!", "See you tomorrow. Radhe Radhe!"),
    ] }],
    phrases: [],
  }),
];

// ---- Reading: the verse decoder
export const DEV_READING_2: DevTopic[] = [
  topic({
    id: "dev-decoder", lessonId: "reading/dev-decoder", course: "reading", part: "words",
    title: ["পদ্যের শব্দ", "pôdyer shôbdo", "Verse words and everyday words"],
    blurb: "Rāmdās Charitāmṛta is written in old poetic Bengali. This lesson decodes its words into everyday Bengali.",
    sections: [
      { title: "Doing and being", words: [
        A("হেরি", "see (verse). Everyday: দেখি", "Also হেরেন, হেরিয়া: দেখেন, দেখে"),
        A("করিয়া", "having done (verse). Everyday: করে", "Also লইয়া: নিয়ে. হইয়া: হয়ে"),
        A("কহে", "says (verse). Everyday: বলে"),
        A("গমন", "going (verse). Everyday: যাওয়া", "আগমন: আসা"),
      ] },
      { title: "Small words", words: [
        A("মোর", "my (verse). Everyday: আমার", "Also মম, মোরে: আমাকে"),
        A("তোমারে", "to you (verse). Everyday: তোমাকে", "Also তোমা"),
        A("নাহি", "not (verse). Everyday: নেই", "Also নহে: নয়"),
        A("কভু", "ever (verse). Everyday: কখনো"),
        A("সদা", "always (verse). Everyday: সবসময়"),
        A("হেথা", "here (verse). Everyday: এখানে", "সেথা: সেখানে"),
        A("যবে", "when (verse). Everyday: যখন"),
        A("সনে", "with (verse). Everyday: সঙ্গে", "Also সাথে"),
        A("লাগি", "for (verse). Everyday: জন্য"),
      ] },
      { title: "Things", words: [
        A("নয়ন", "eye (verse). Everyday: চোখ"),
        A("বদন", "face (verse). Everyday: মুখ"),
        A("কর", "hand (verse). Everyday: হাত"),
        A("সারমেয়", "dog (verse). Everyday: কুকুর"),
        A("বারি", "water (verse). Everyday: জল", "Also নীর"),
      ] },
    ],
    phrases: [],
  }),
];

// ---- Role plays
type L = [string, string, string];
const l = (bn: string, r: string, en: string): L => [bn, ro(r), en];
const you = (bn: string, r: string, en: string) => ({ who: "you" as const, line: l(bn, r, en) });
const them = (bn: string, r: string, en: string) => ({ who: "them" as const, line: l(bn, r, en) });

export const DEV_SCENARIOS_2: Scenario[] = [
  {
    id: "dev-temple",
    title: "Visiting the temple",
    bn: "মন্দিরে গিয়ে",
    blurb: "Ask where to leave your shoes, when the temple opens and how to take prasād.",
    situation: "You visit a temple for the first time. A devotee at the entrance is happy to help.",
    goal: "Ask the questions a first-time visitor needs, politely.",
    words: [["জুতো", "juto", "shoes"], ["মন্দির", "môndir", "temple"], ["আরতি", "arôti", "ārati"], ["প্রসাদ", "prôshad", "sanctified food"], ["সেবা", "sheba", "service"], ["উৎসব", "utshôb", "festival"]].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "Questions to ask", items: [
        l("জুতো কোথায় রাখব?", "juto kothay rakhbo?", "Where should I leave my shoes?"),
        l("মন্দির কখন খোলে?", "môndir kôkhon khole?", "When does the temple open?"),
        l("মঙ্গল আরতি ক'টায়?", "mônggôl arôti kôṭay?", "What time is the early-morning ārati?"),
        l("প্রসাদ কোথায় পাওয়া যাবে?", "prôshad kothay paoya jabe?", "Where can I get prasād?"),
        l("আমি কি কোনো সেবা করতে পারি?", "ami ki kono sheba kôrte pari?", "May I do some service?"),
        l("আজ কি কোনো উৎসব আছে?", "aj ki kono utshôb achhe?", "Is there a festival today?"),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("জুতো ওখানে রাখুন।", "juto okhane rakhun.", "Leave your shoes over there."),
      l("মন্দির ভোরে খোলে।", "môndir bhore khole.", "The temple opens at dawn."),
      l("আরতির পরে প্রসাদ পাবেন।", "arôtir pôre prôshad paben.", "You will get prasād after ārati."),
    ] }],
    demos: [
      { id: "smooth", title: "A helpful visit", kind: "smooth", setup: "You ask politely and get what you need.",
        turns: [
          you("জয় নিতাই, প্রভু! জুতো কোথায় রাখব?", "jôy Nitai, prôbhu! juto kothay rakhbo?", "Jay Nitāi, Prabhu! Where should I leave my shoes?"),
          them("জুতো ওখানে রাখুন। আসুন।", "juto okhane rakhun. ashun.", "Leave your shoes over there. Please come in."),
          you("ধন্যবাদ। আজ কি কোনো উৎসব আছে?", "dhônnobad. aj ki kono utshôb achhe?", "Thank you. Is there a festival today?"),
          them("না। তবে সন্ধ্যায় কীর্তন হবে। আরতির পরে প্রসাদ পাবেন।", "na. tôbe shôndhyay kirtôn hobe. arôtir pôre prôshad paben.", "No. But there will be kīrtan this evening. You will get prasād after ārati."),
          you("আমি কি কোনো সেবা করতে পারি?", "ami ki kono sheba kôrte pari?", "May I do some service?"),
        ], takeaway: "Greet first, then ask. Ask “may I do some service?” and people will warm to you." },
      { id: "wrong", title: "Walking straight in", kind: "wrong", setup: "You skip the greeting and the shoes.",
        turns: [
          you("এই, মন্দির কখন খোলে?", "ei, môndir kôkhon khole?", "Hey, when does the temple open?"),
          them("জয় নিতাই। ভোরে খোলে।", "jôy Nitai. bhore khole.", "Jay Nitāi. It opens at dawn."),
          you("আচ্ছা। আমার জুতো এখানেই থাক।", "achchha. amar juto ekhanei thak.", "OK. My shoes can stay here."),
          them("প্রভু, জুতো ওখানে রাখুন, দয়া করে।", "prôbhu, juto okhane rakhun, dôya kôre.", "Prabhu, please leave your shoes over there."),
        ], takeaway: "Never begin with “এই”. Greet with জয় নিতাই, call them প্রভু, and leave your shoes outside." },
    ],
  },
  {
    id: "dev-kirtan",
    title: "Joining kīrtan",
    bn: "কীর্তনে যোগ দিয়ে",
    blurb: "Compliment the singing, ask what a song means and join the closing cheer.",
    situation: "You are sitting in kīrtan. A devotee next to you has been singing.",
    goal: "Say something kind, ask what a song means, and join the cheer.",
    words: [["কীর্তন", "kirtôn", "kīrtan"], ["গান", "gan", "song"], ["করতাল", "kôrtal", "hand cymbals"], ["মানে", "mane", "meaning"], ["হরিবোল", "Horibol", "Say Hari!"], ["সুন্দর", "shundôr", "beautiful"]].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "Talking about kīrtan", items: [
        l("কী সুন্দর কীর্তন!", "ki shundôr kirtôn!", "What beautiful kīrtan!"),
        l("আজ কে কীর্তন করবেন?", "aj ke kirtôn kôrben?", "Who will lead kīrtan today?"),
        l("এই গানের মানে কী?", "ei ganer mane ki?", "What does this song mean?"),
        l("আমি করতাল বাজাতে পারি।", "ami kôrtal bajate pari.", "I can play the cymbals."),
        l("আরেকবার গান, প্রভু!", "arekbar gan, prôbhu!", "Sing once more, Prabhu!"),
      ] },
      { title: "The cheers", items: [
        l("বলো হরি, হরিবোল!", "bôlo Hori, Horibol!", "Say Hari, Haribol!"),
        l("নিতাই গৌর হরিবোল!", "Nitai Gour Horibol!", "Nitāi Gaura, Haribol!"),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("আজ রামদাদা কীর্তন করবেন।", "aj Ramdada kirtôn kôrben.", "Today Rāmdādā will lead kīrtan."),
      l("এই গানটা রাধার বিরহের।", "ei ganṭa Radhar birôhor.", "This song is about Rādhā's pain of separation."),
      l("বলো হরি!", "bôlo Hori!", "Say Hari!"),
    ] }],
    demos: [
      { id: "smooth", title: "Between songs", kind: "smooth", setup: "You chat with the devotee beside you.",
        turns: [
          you("প্রভু, কী সুন্দর কীর্তন!", "prôbhu, ki shundôr kirtôn!", "Prabhu, what beautiful kīrtan!"),
          them("নিতাইয়ের কৃপা। আপনি গান গান?", "Nitaiyer kripa. apni gan gan?", "By Nitāi's grace. Do you sing?"),
          you("না, আমি করতাল বাজাতে পারি। এই গানের মানে কী?", "na, ami kôrtal bajate pari. ei ganer mane ki?", "No, I can play the cymbals. What does this song mean?"),
          them("এই গানটা রাধার বিরহের।", "ei ganṭa Radhar birôhor.", "This song is about Rādhā's pain of separation."),
          you("আরেকবার গান, প্রভু!", "arekbar gan, prôbhu!", "Sing once more, Prabhu!"),
        ], takeaway: "Compliment first, then ask. The closing cheers are joined by everyone." },
      { id: "wrong", title: "Talking over the song", kind: "wrong", setup: "You chat loudly while the singing is on.",
        turns: [
          you("এই গানটা কী? বলো তো।", "ei ganṭa ki? bôlo to.", "What is this song? Tell me."),
          them("প্রভু, পরে বলব। এখন কীর্তন।", "prôbhu, pôre bôlbo. ekhôn kirtôn.", "Prabhu, I will tell you later. Now it is kīrtan."),
        ], takeaway: "Wait until the song ends, and use আপনি and প্রভু, not বলো." },
    ],
  },
  {
    id: "dev-path",
    title: "Talking about your path",
    bn: "নিজের পথের কথা",
    blurb: "Say who you follow, what you love and ask to learn more.",
    situation: "A devotee asks you about yourself over prasād.",
    goal: "Say who you follow and what you want to learn, in simple, polite sentences.",
    words: [["ভক্ত", "bhôkto", "devotee"], ["দীক্ষা", "dikkha", "initiation"], ["পরিবার", "pôribar", "family, lineage"], ["পদাবলী", "pôdaboli", "devotional song-poems"], ["কীর্তন", "kirtôn", "kīrtan"], ["কৃপা", "kripa", "grace"]].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "About you", items: [
        l("আমি নিতাই-গৌরের ভক্ত।", "ami Nitai-Gourer bhôkto.", "I am a devotee of Nitāi-Gaura."),
        l("আমি রামদাস বাবাজীর পরিবারের।", "ami Ramdash babajeer pôribarer.", "I belong to Rāmdās Bābājī's spiritual family."),
        l("আমার দীক্ষা হয়েছে।", "amar dikkha hoyechhe.", "I am initiated."),
        l("এখনো দীক্ষা হয়নি।", "ækhono dikkha hoyni.", "I am not initiated yet."),
        l("আমি কীর্তন ভালবাসি।", "ami kirtôn bhalobashi.", "I love kīrtan."),
      ] },
      { title: "Asking for more", items: [
        l("রামদাস বাবাজীর কথা আরো বলুন।", "Ramdash babajeer kôtha aro bôlun.", "Please tell me more about Rāmdās Bābājī."),
        l("এই কথাটার মানে বুঝিয়ে দিন।", "ei kôthaṭar mane bujhiye din.", "Please explain the meaning of this word."),
        l("আমি এখনো ভাল বাংলা বলতে পারি না।", "ami ækhono bhalo Bangla bôlte pari na.", "I cannot speak Bengali well yet."),
        l("আস্তে আস্তে শিখছি, নিতাইয়ের কৃপায়।", "aste aste shikhchhi, Nitaiyer kripay.", "I am learning slowly, by Nitāi's grace."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("আপনি কার ভক্ত?", "apni kar bhôkto?", "Whose devotee are you?"),
      l("আপনার দীক্ষা হয়েছে?", "apnar dikkha hoyechhe?", "Are you initiated?"),
      l("আপনি বাংলা কোথায় শিখছেন?", "apni Bangla kothay shikhchhen?", "Where are you learning Bengali?"),
    ] }],
    demos: [
      { id: "smooth", title: "Getting to know each other", kind: "smooth", setup: "You answer simply and ask to learn more.",
        turns: [
          them("আপনি কার ভক্ত, প্রভু?", "apni kar bhôkto, prôbhu?", "Whose devotee are you, Prabhu?"),
          you("আমি নিতাই-গৌরের ভক্ত। আমি রামদাস বাবাজীর পরিবারের।", "ami Nitai-Gourer bhôkto. ami Ramdash babajeer pôribarer.", "I am a devotee of Nitāi-Gaura. I belong to Rāmdās Bābājī's family."),
          them("আপনার দীক্ষা হয়েছে?", "apnar dikkha hoyechhe?", "Are you initiated?"),
          you("এখনো দীক্ষা হয়নি। আস্তে আস্তে শিখছি, নিতাইয়ের কৃপায়।", "ækhono dikkha hoyni. aste aste shikhchhi, Nitaiyer kripay.", "Not yet. I am learning slowly, by Nitāi's grace."),
          you("রামদাস বাবাজীর কথা আরো বলুন।", "Ramdash babajeer kôtha aro bôlun.", "Please tell me more about Rāmdās Bābājī."),
        ], takeaway: "Short, humble sentences, and end by asking to learn more." },
      { id: "wrong", title: "Answering like a quiz", kind: "wrong", setup: "You answer bluntly.",
        turns: [
          them("আপনি কার ভক্ত?", "apni kar bhôkto?", "Whose devotee are you?"),
          you("আমি জানি না। তুমি বলো।", "ami jani na. tumi bôlo.", "I don't know. You tell me."),
          them("আচ্ছা, প্রভু...", "achchha, prôbhu...", "All right, Prabhu..."),
        ], takeaway: "Say who you follow, even simply, and keep আপনি." },
    ],
  },
];

// ---- Grammar: exercises
export const DEV_CLASSWORK_2: CwSet[] = [
  {
    id: "dev-sayverbs",
    title: "Devotional sentences with verbs",
    blurb: "Put everyday devotional sentences into Bengali using the action words.",
    inst: "Write it in Banglish, using the verb from the course (the I-form, or the polite form where asked).",
    items: [
      { prompt: "I bow to the Lord.", answer: "Ami thakurke pronam kori.", alt: ["Ami thakurke pranam kori."] },
      { prompt: "I chant japa in the morning.", answer: "Ami shokale jop kori.", alt: ["Ami sokale jop kori."] },
      { prompt: "Come, let us chant the Name.", answer: "Chalun, nam kori.", alt: ["Cholun nam kori."] },
      { prompt: "The devotees are dancing in kīrtan.", answer: "Bhoktora kirtone nachchhen.", alt: ["Bhoktora kirtone nachchen."] },
      { prompt: "I love listening to kīrtan.", answer: "Ami kirtan shunte bhalobashi.", alt: ["Ami kirton shunte bhalobashi."] },
      { prompt: "Call Him with your whole heart.", answer: "Mon diye tanke dako.", alt: ["Mon diye take dako."] },
      { prompt: "Please take prasād.", answer: "Proshad nin.", alt: ["Prasad nin."] },
      { prompt: "I have received grace.", answer: "Kripa peyechhi.", alt: ["Kripa peyechi."] },
      { prompt: "I do service at the ashram.", answer: "Ami ashrome sheba kori.", alt: ["Ami ashrome seba kori."] },
      { prompt: "Please forgive me.", answer: "Kkhoma korben.", alt: ["Khoma korben."] },
    ],
  },
  {
    id: "dev-questions",
    title: "Devotional question words",
    blurb: "Choose the right question word for temple and kīrtan questions.",
    inst: "Write the question word in Banglish: ke, ki, kothay, kokhon, keno, kemon or koto.",
    items: [
      { prompt: "Mondir ___ khole? (When does the temple open?)", answer: "kokhon", alt: ["kokhon?"] },
      { prompt: "Proshad ___ paoya jabe? (Where can I get prasād?)", answer: "kothay", alt: ["kothay?"] },
      { prompt: "Aj ___ kirtan korben? (Who will lead kīrtan today?)", answer: "ke", alt: ["ke?"] },
      { prompt: "Ei ganer mane ___? (What does this song mean?)", answer: "ki", alt: ["ki?", "kee"] },
      { prompt: "Aj ___ mala holo? (How many rounds today?)", answer: "koto", alt: ["koto?", "kato"] },
      { prompt: "Apni ___ achhen? (How are you?)", answer: "kemon", alt: ["kemon?"] },
      { prompt: "Thakurer nam ___? (What is the deity's name?)", answer: "ki", alt: ["ki?"] },
      { prompt: "Apni ___ bhokto? (Whose devotee are you?)", answer: "kar", alt: ["kar?"] },
    ],
  },
  {
    id: "dev-counting",
    title: "Counting rounds of japa",
    blurb: "Read the Bengali numbers and say how many rounds you chant.",
    inst: "Write the number word in Banglish (for example ৩ is tin).",
    items: [
      { prompt: "৩", answer: "tin" }, { prompt: "৫", answer: "pach", alt: ["panch"] }, { prompt: "৮", answer: "at", alt: ["aat"] },
      { prompt: "১০", answer: "dosh", alt: ["dos"] }, { prompt: "১২", answer: "baro" }, { prompt: "১৪", answer: "choddo" },
      { prompt: "১৬", answer: "sholo", alt: ["solo"] },
      { prompt: "I chant sixteen rounds daily.", answer: "Ami roj sholo mala jop kori.", alt: ["Ami roj solo mala jop kori."] },
      { prompt: "Eight rounds today.", answer: "Aj at mala holo.", alt: ["Aj aat mala holo."] },
    ],
  },
];

export const DEV_SAY_2: [bn: string, roman: string, en: string][] = [
  ...DEV_VOCAB_2.filter((t) => t.part === "phrases").flatMap((t) => t.sections.flatMap((s) => s.words)).map((w): [string, string, string] => [w[0], w[1], w[2]]),
];

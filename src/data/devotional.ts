// Devotional Bengali: greetings, forms of address, practice words, phrases and short readings from the Gaudiya Vaishnava
// sādhu-saṅga tradition (Rāmdās Bābājī's line). Kept apart from the general courses: every lesson here is tagged "Devotional".
// Sources: RDC = Rāmdās Charitāmṛta, RKK = Śrī Śrī Rāmakṛṣṇa Kathāmṛta, SANGA = everyday spoken usage.
// Written from the teacher's notes: the Bengali needs the teacher's review before students rely on it.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { VocabTopic, Word, Phrase } from "./vocabulary";
import type { Scenario } from "./roleplay";
import type { CwSet } from "./classwork";
import { DEV_VOCAB_2, DEV_READING_2, DEV_SCENARIOS_2, DEV_CLASSWORK_2, DEV_SAY_2 } from "./devotional-2";

/** Romanization in the app's plain style (the source notes use diacritics such as ô and ṭ). */
const ro = (s: string) =>
  s.replace(/ô/g, "o").replace(/æ/g, "e").replace(/ṭ/g, "t").replace(/ḍ/g, "d").replace(/ṛ/g, "r").replace(/ṇ/g, "n").replace(/ś/g, "sh").replace(/ṅ/g, "ng");
const W = (bn: string, r: string, en: string, note?: string): Word => (note ? [bn, ro(r), en, note] : [bn, ro(r), en]);
const P = (bn: string, r: string, en: string): Phrase => [bn, ro(r), en];

export type DevTopic = VocabTopic & {
  /** The curriculum lesson this topic completes. */
  lessonId: string;
  course: "vocabulary" | "reading";
  /** Phrase lessons are listed apart from word lessons. */
  part?: "words" | "phrases";
};

const topic = (t: Omit<DevTopic, "group">): DevTopic => ({ group: "devotional", ...t });

// ---------------------------------------------------------------- Vocabulary

const DEV_VOCAB_1: DevTopic[] = [
  topic({
    id: "dev-greetings", lessonId: "vocabulary/dev-greetings", course: "vocabulary",
    title: ["অভিবাদন", "obhibadon", "Greetings and partings"],
    blurb: "What devotees say instead of hello and goodbye, and how to bow. Jay Nitāi is the usual greeting in Rāmdās Bābājī's line.",
    sections: [
      { title: "Greetings", words: [
        W("জয় নিতাই", "jôy Nitai", "Glory to Nitāi", "Hello, goodbye and thank you. The default greeting among Nitāi-Gaur devotees"),
        W("জয় রাধে", "jôy Radhe", "Glory to Rādhā", "Also called out at a door before entering"),
        W("রাধে রাধে", "Radhe Radhe", "Rādhā, Rādhā", "Very common in Braj and Vrindavan"),
        W("জয় গৌর", "jôy Gour", "Glory to Gaura"),
        W("জয় নিতাই গৌর", "jôy Nitai Gour", "Glory to Nitāi-Gaura", "A fuller greeting"),
        W("হরিবোল", "Horibol", "Say Hari!", "A greeting, a cheer, and the end of kīrtan"),
        W("হরে কৃষ্ণ", "Hore Krishno", "Hare Kṛṣṇa", "Common in ISKCON-influenced circles"),
        W("জয় গুরুদেব", "jôy Gurudeb", "Glory to the guru", "Opening or closing a talk or meeting"),
      ] },
      { title: "Bowing", words: [
        W("প্রণাম", "prônam", "respectful bow", "Said with folded hands to an elder or sādhu"),
        W("দণ্ডবৎ প্রণাম", "dôndobôt prônam", "full prostration", "Also said as a greeting: দণ্ডবৎ, প্রভু"),
        W("সাষ্টাঙ্গ প্রণাম", "shashṭango prônam", "prostration with eight limbs", "Formal bow before the deity or guru"),
        W("প্রণাম নেবেন", "prônam neben", "please accept my obeisances", "A polite closing, in messages too"),
      ] },
      { title: "Parting", words: [
        W("ভজ নিতাই গৌর", "bhôjo Nitai Gour", "worship Nitāi-Gaura", "Short form of Bābājī's nām, used as a sign-off"),
      ] },
    ],
    phrases: [
      P("জয় নিতাই, আবার দেখা হবে।", "jôy Nitai, abar dækha hobe.", "Jay Nitāi, we will meet again."),
      P("দণ্ডবৎ প্রণাম জানাই।", "dôndobôt prônam janai.", "I offer my dandavat praṇām. (A formal opening to a senior devotee.)"),
      P("প্রণাম নেবেন।", "prônam neben.", "Please accept my obeisances."),
      P("জয় রাধে, আসুন।", "jôy Radhe, ashun.", "Jay Rādhe, please come in."),
    ],
  }),
  topic({
    id: "dev-address", lessonId: "vocabulary/dev-address", course: "vocabulary",
    title: ["সম্বোধন", "shômbodhôn", "How to address people"],
    blurb: "Devotees rarely use bare names. These are the titles you will hear all the time.",
    sections: [
      { title: "Everyday forms of address", words: [
        W("প্রভু", "prôbhu", "master, lord", "The standard way to address a male devotee: আসুন, প্রভু"),
        W("মাতাজী", "matajee", "respected mother", "The standard way to address a female devotee"),
        W("মা", "ma", "mother", "Any woman, or Rādhārāṇī, or the Divine Mother"),
        W("দাদা", "dada", "elder brother", "Warm, informal address for an older devotee"),
        W("মশায়", "môshay", "sir", "Polite address, also মহাশয়"),
        W("মহারাজ", "môharaj", "great king", "Title for a monk or senior sādhu"),
        W("ঠাকুর", "ṭhakur", "lord, holy one, deity", "ঠাকুরঘর is the shrine room; Rāmakṛṣṇa is Ṭhākur throughout the Kathāmṛta"),
      ] },
      { title: "Teachers and titles", words: [
        W("গুরুদেব", "gurudeb", "guru", "আমার গুরুদেব = my guru"),
        W("বাবাজী", "babajee", "Bābājī, revered renunciant", "A Vaishnava renunciant, such as রামদাস বাবাজী"),
        W("বাবাজী মহারাজ", "babajee môharaj", "Bābājī Mahārāj", "Respectful title for Rāmdās Bābājī"),
        W("গোস্বামী", "goswami", "Gosvāmī", "A lineage title, also গোঁসাই"),
        W("প্রভুপাদ", "prôbhupad", "at whose feet masters sit", "Title for an exalted ācārya"),
        W("গুরুভাই", "gurubhai", "god-brother", "A disciple of the same guru; গুরুবোন is god-sister"),
      ] },
      { title: "Kinds of people", words: [
        W("ভক্ত", "bhôkto", "devotee"),
        W("সাধু", "shadhu", "holy person, sādhu"),
        W("বৈষ্ণব", "boishnôb", "Vaishnava", "In Bengali speech ব is b: boishnôb, not “vaishnava”"),
        W("দাস", "dash", "servant", "Part of initiated names (নিতাইদাস); দাসী for a woman"),
      ] },
    ],
    phrases: [
      P("আসুন, প্রভু।", "ashun, prôbhu.", "Please come in, Prabhu."),
      P("আমার গুরুদেব রামদাস বাবাজী মহারাজ।", "amar gurudeb Ramdash Babajee Môharaj.", "My guru is Rāmdās Bābājī Mahārāj."),
      P("উনি একজন ভক্ত।", "uni ekjôn bhôkto.", "He (or she) is a devotee."),
      P("এই দাস আপনার সেবায় আছে।", "ei dash apnar shebay achhe.", "This servant is at your service."),
    ],
  }),
  topic({
    id: "dev-practice", lessonId: "vocabulary/dev-practice", course: "vocabulary",
    title: ["সাধনা", "shadhôna", "Practice and daily life"],
    blurb: "The words of chanting, worship, food, service, places and pilgrimage.",
    sections: [
      { title: "Chanting and worship", words: [
        W("নাম", "nam", "the Holy Name", "হরিনাম, নাম জপ"),
        W("জপ", "jôp", "quiet chanting on beads", "জপে বসা = to sit for japa"),
        W("মালা", "mala", "beads, japa-mālā", "Also জপমালা"),
        W("তুলসী", "tulshi", "the sacred basil plant"),
        W("কণ্ঠি", "kônṭhi", "neck beads (tulasī)"),
        W("তিলক", "tilôk", "forehead marking"),
        W("মন্ত্র", "môntro", "mantra"),
        W("ভজন", "bhôjôn", "worship, devotional practice"),
        W("সাধন", "shadhôn", "spiritual discipline", "Also সাধনা"),
        W("দীক্ষা", "dikkha", "initiation"),
        W("আরতি", "arôti", "worship with lamps"),
        W("কীর্তন", "kirtôn", "congregational singing"),
        W("সংকীর্তন", "shôngkirtôn", "public chanting of the Name"),
        W("খোল", "khol", "clay drum", "Also মৃদঙ্গ"),
        W("করতাল", "kôrtal", "hand cymbals"),
        W("টহল", "ṭôhol", "early-morning kīrtan through the streets", "Rāmdās Bābājī's famous practice"),
      ] },
      { title: "Food and service", words: [
        W("প্রসাদ", "prôshad", "sanctified food, mercy", "মহাপ্রসাদ is food offered to the deity"),
        W("ভোগ", "bhog", "food offered to the deity"),
        W("মাধুকরী", "madhukori", "begging food door to door, like a bee", "Bābājī's way of living in Braj"),
        W("ভিক্ষা", "bhikkha", "alms"),
        W("সেবা", "sheba", "service", "বৈষ্ণব সেবা = service to Vaishnavas"),
      ] },
      { title: "Places and pilgrimage", words: [
        W("আশ্রম", "ashrôm", "ashram"),
        W("মন্দির", "môndir", "temple"),
        W("কুটির", "kuṭir", "hut"),
        W("ধাম", "dham", "holy abode", "নবদ্বীপ ধাম, বৃন্দাবন ধাম"),
        W("তীর্থ", "tirtho", "pilgrimage place"),
        W("পরিক্রমা", "pôrikrôma", "circumambulation, pilgrimage walk"),
        W("দর্শন", "dôrshôn", "seeing the holy", "সাধু দর্শন, ঠাকুর দর্শন"),
        W("সাধুসঙ্গ", "shadhushôngo", "company of saints"),
      ] },
      { title: "Other holy things", words: [
        W("চরণ", "chôrôn", "holy feet", "চরণে প্রণাম"),
        W("চরণামৃত", "chôrônamrito", "water that has washed the deity's feet"),
        W("পাঠ", "paṭh", "scripture reading", "ভাগবত পাঠ"),
        W("স্নান", "snan", "holy bath", "গঙ্গা স্নান"),
        W("গ্রন্থ", "grôntho", "holy book"),
        W("উৎসব", "utshôb", "festival"),
        W("তিথি", "tithi", "lunar holy day"),
      ] },
    ],
    phrases: [
      P("কীর্তন কখন শুরু হবে?", "kirtôn kôkhon shuru hobe?", "When will kīrtan start?"),
      P("আরতি কখন?", "arôti kôkhon?", "When is ārati?"),
      P("আমি রোজ জপ করি।", "ami roj jôp kori.", "I chant japa daily."),
      P("ঠাকুর দর্শন করতে যাব।", "ṭhakur dôrshôn kôrte jabo.", "I will go for darśan of the deity."),
      P("হাতে শুধু করতাল, গলে জপমালা।", "hate shudhu kôrtal, gôle jôpmala.", "Only cymbals in hand, japa-beads at the neck."),
    ],
  }),
  topic({
    id: "dev-heart", lessonId: "vocabulary/dev-heart", course: "vocabulary",
    title: ["ভাবের শব্দ", "bhaber shôbdo", "Qualities and feelings"],
    blurb: "The words of the heart: devotion, grace, longing, humility and surrender.",
    sections: [
      { title: "Devotion and love", words: [
        W("ভক্তি", "bhôkti", "devotion"),
        W("প্রেম", "prem", "divine love"),
        W("কৃপা", "kripa", "grace, mercy", "The most frequent word in sādhu-saṅga talk"),
        W("করুণা", "kôruna", "compassion"),
        W("দয়া", "dôya", "kindness", "জীবে দয়া = kindness to all beings"),
        W("আনন্দ", "anôndo", "bliss, joy"),
        W("ভাব", "bhab", "ecstatic feeling, mood", "ভাবে বিভোর = absorbed in bhāva"),
        W("মধুর", "môdhur", "sweet", "মধুর নাম, মধুর কীর্তন"),
        W("ধন্য", "dhônno", "blessed, fortunate", "আমি ধন্য"),
        W("পবিত্র", "pôbitro", "pure, holy"),
      ] },
      { title: "Longing and surrender", words: [
        W("শরণ", "shôrôn", "refuge", "শরণাগত = surrendered"),
        W("ব্যাকুল", "bækul", "intensely longing", "ব্যাকুলতা is the noun"),
        W("আকুল", "akul", "yearning, restless with love"),
        W("বিরহ", "birôho", "the pain of separation", "Central to kīrtan"),
        W("স্মরণ", "shôrôn", "remembrance"),
        W("নিষ্ঠা", "nishṭha", "steadiness, firm faith"),
        W("কৃতজ্ঞ", "kritôggo", "grateful"),
      ] },
      { title: "Humility and what to give up", words: [
        W("বিনয়", "binôy", "humility"),
        W("দীন", "deen", "humble, lowly"),
        W("সরল", "shôrol", "simple", "সরলতা is simplicity"),
        W("বৈরাগ্য", "boiraggo", "detachment"),
        W("অহংকার", "ôhôngkar", "ego"),
        W("অভিমান", "ôbhiman", "pride"),
      ] },
    ],
    phrases: [
      P("ভক্তিই সার।", "bhôktii shar.", "Devotion alone is the essence."),
      P("আমি ধন্য।", "ami dhônno.", "I am blessed."),
      P("আমি দীন, অধম।", "ami deen, ôdhôm.", "I am humble and fallen."),
      P("ঠাকুরের কৃপায়।", "ṭhakurer kripay.", "By the Lord's grace."),
    ],
  }),
  topic({
    id: "dev-names", lessonId: "vocabulary/dev-names", course: "vocabulary",
    title: ["নাম ও ধাম", "nam o dham", "Divine names and holy places"],
    blurb: "Who and where: the Lords, Rādhā, Hari, and the holy places of Bengal and Braj.",
    sections: [
      { title: "Divine names", words: [
        W("নিতাই", "Nitai", "Lord Nityānanda", "Bābājī's life is centred on him; the full name is নিত্যানন্দ"),
        W("গৌর", "Gour", "Śrī Caitanya Mahāprabhu", "Also গৌরাঙ্গ"),
        W("মহাপ্রভু", "Môhaprôbhu", "Caitanya Mahāprabhu"),
        W("রাধা", "Radha", "Śrī Rādhā", "রাধে is the calling form; রাধারাণী"),
        W("কৃষ্ণ", "Krishno", "Śrī Kṛṣṇa"),
        W("শ্যাম", "Shyam", "Śyāma, the dark one (Kṛṣṇa)"),
        W("হরি", "Hori", "Hari, God"),
        W("গোপাল", "Gopal", "child Kṛṣṇa"),
        W("ভগবান", "bhôgoban", "God", "Also ঈশ্বর"),
      ] },
      { title: "Holy places", words: [
        W("নবদ্বীপ", "Nôbodwip", "Caitanya's birthplace"),
        W("বৃন্দাবন", "Brindabôn", "Vrindavan", "Also ব্রজ (Braj)"),
        W("যমুনা", "Jômuna", "the Yamunā river"),
        W("গঙ্গা", "Gôngga", "the Gaṅgā river"),
        W("পুরী", "Puri", "Jagannātha Purī", "Also শ্রীক্ষেত্র"),
        W("পাঠবাড়ী আশ্রম", "Paṭhbari Ashrôm", "Pāṭhbāṛī Ashram", "Bābājī's ashram at Baranagar, Kolkata"),
      ] },
    ],
    phrases: [
      P("পাঠবাড়ী আশ্রম কোথায়?", "Paṭhbari ashrôm kothay?", "Where is Pāṭhbāṛī Ashram?"),
      P("নবদ্বীপ ধাম, বৃন্দাবন ধাম।", "Nôbodwip dham, Brindabôn dham.", "The holy abodes of Navadvīp and Vrindavan."),
      P("রাধে রাধে!", "Radhe Radhe!", "Rādhe, Rādhe!"),
    ],
  }),
  topic({
    id: "dev-phrases", lessonId: "vocabulary/dev-phrases", course: "vocabulary", part: "phrases",
    title: ["সাধুসঙ্গের কথা", "shadhushôngger kotha", "Everyday phrases in sādhu-saṅga"],
    blurb: "Short sentences you can actually use at an ashram. Polite আপনি forms throughout.",
    sections: [
      { title: "Asking and answering", words: [
        W("কেমন আছেন, প্রভু?", "kæmon achhen, prôbhu?", "How are you, Prabhu?"),
        W("নিতাইয়ের কৃপায় ভাল আছি।", "Nitaiyer kripay bhalo achhi.", "By Nitāi's grace, I am well.", "The devotional answer to “how are you”"),
        W("ঠাকুরের কৃপায়।", "ṭhakurer kripay.", "By the Lord's grace.", "An all-purpose answer"),
        W("আসুন, বসুন।", "ashun, bôshun.", "Come in, please sit."),
        W("ধন্যবাদ, প্রভু। জয় নিতাই!", "dhônnobad, prôbhu. jôy Nitai!", "Thank you, Prabhu. Jay Nitāi!"),
      ] },
      { title: "Prasād and kīrtan", words: [
        W("প্রসাদ পেয়েছেন?", "prôshad peyechhen?", "Have you taken prasād?", "Devotees “get” (পাওয়া) prasād rather than “eat” it"),
        W("প্রসাদ পান।", "prôshad pan.", "Please take prasād."),
        W("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds today?", "Asked between devotees about japa"),
        W("কীর্তন কখন শুরু হবে?", "kirtôn kôkhon shuru hobe?", "When will kīrtan start?"),
        W("আরতি কখন?", "arôti kôkhon?", "When is ārati?"),
      ] },
      { title: "Blessing and humility", words: [
        W("কৃপা করুন।", "kripa kôrun.", "Please bless me, be merciful.", "Said to a sādhu or guru"),
        W("আশীর্বাদ করুন।", "ashirbad kôrun.", "Please give your blessing."),
        W("অপরাধ নেবেন না।", "ôpôradh neben na.", "Please forgive my offence.", "The Vaishnava “sorry”. Very characteristic"),
        W("সব নিতাইয়ের ইচ্ছা।", "shôb Nitaiyer ichchha.", "It is all Nitāi's will."),
        W("হরিনাম করুন।", "horinam kôrun.", "Chant the Holy Name."),
      ] },
    ],
    phrases: [
      P("আমি বাংলা শিখছি, একটু আস্তে বলুন।", "ami Bangla shikhchhi, ekṭu aste bôlun.", "I am learning Bengali. Please speak slowly."),
      P("আমার জন্য প্রার্থনা করবেন।", "amar jônno prarthôna kôrben.", "Please pray for me."),
      P("সকলই তোমার ইচ্ছা।", "shôkoli tomar ichchha.", "Everything is Your will."),
      P("আমি রামদাস বাবাজীর ভক্ত।", "ami Ramdash Babajeer bhôkto.", "I am a devotee of Rāmdās Bābājī."),
    ],
  }),
];

// ---------------------------------------------------------------- Reading

const DEV_READING_1: DevTopic[] = [
  topic({
    id: "dev-ladder", lessonId: "reading/dev-ladder", course: "reading",
    title: ["শব্দের সিঁড়ি", "shôbder shi~ri", "Devotional word ladder"],
    blurb: "Devotional words from the easiest to read to the hardest. Each step adds one new feature of the script.",
    sections: [
      { title: "Step 1: plain letters", words: [W("জপ", "jôp", "quiet chanting"), W("ভজ", "bhôjo", "worship"), W("জয়", "jôy", "glory"), W("নয়ন", "nôyôn", "eyes")] },
      { title: "Step 2: the আ sign (া)", words: [W("মা", "ma", "mother"), W("নাম", "nam", "the Name"), W("মালা", "mala", "beads"), W("রাধা", "Radha", "Rādhā"), W("দাদা", "dada", "elder brother"), W("দাস", "dash", "servant")] },
      { title: "Step 3: ই and ঈ signs (written before the letter!)", words: [W("হরি", "Hori", "Hari"), W("নিতাই", "Nitai", "Nitāi"), W("বাবাজী", "babajee", "Bābājī"), W("মাতাজী", "matajee", "respected mother")] },
      { title: "Step 4: signs that wrap around", words: [W("রাধে", "Radhe", "Rādhe"), W("প্রেম", "prem", "love"), W("গৌর", "Gour", "Gaura"), W("সেবা", "sheba", "service"), W("ভোগ", "bhog", "food offered to the deity")] },
      { title: "Step 5: the উ sign (ু)", words: [W("গুরু", "guru", "guru"), W("সাধু", "shadhu", "holy person"), W("তুলসী", "tulshi", "tulasī plant")] },
      { title: "Step 6: easy conjuncts", words: [W("প্রভু", "prôbhu", "master"), W("প্রণাম", "prônam", "obeisance"), W("শ্রী", "shri", "sacred, Śrī"), W("কীর্তন", "kirtôn", "kīrtan"), W("দর্শন", "dôrshôn", "seeing the holy")] },
      { title: "Step 7: harder conjuncts", words: [W("কৃষ্ণ", "Krishno", "Kṛṣṇa"), W("ভক্ত", "bhôkto", "devotee"), W("ভক্তি", "bhôkti", "devotion"), W("মন্দির", "môndir", "temple"), W("শ্যাম", "Shyam", "Śyāma"), W("মন্ত্র", "môntro", "mantra")] },
    ],
    phrases: [
      P("ভজ নিতাই গৌর রাধে শ্যাম, জপ হরে কৃষ্ণ হরে রাম।", "bhôjo Nitai Gour Radhe Shyam, jôpo Hore Krishno Hore Ram.", "Step 8: read the whole nām."),
    ],
  }),
  topic({
    id: "dev-nam", lessonId: "reading/dev-nam", course: "reading",
    title: ["বাবাজীর নাম", "Babajeer nam", "Bābājī's nām"],
    blurb: "The nām Rāmdās Bābājī gave. Almost every letter group a beginner needs is in it.",
    sections: [
      { title: "The words of the nām", words: [
        W("ভজ", "bhôjo", "worship"), W("নিতাই", "Nitai", "Nitāi"), W("গৌর", "Gour", "Gaura"), W("রাধে", "Radhe", "Rādhe"), W("শ্যাম", "Shyam", "Śyāma"),
        W("জপ", "jôpo", "chant"), W("হরে", "Hore", "O Hari"), W("কৃষ্ণ", "Krishno", "Kṛṣṇa"), W("রাম", "Ram", "Rāma"),
      ] },
      { title: "The two lines", words: [
        W("ভজ নিতাই গৌর রাধে শ্যাম", "bhôjo Nitai Gour Radhe Shyam", "Worship Nitāi, Gaura, Rādhe, Śyāma"),
        W("জপ হরে কৃষ্ণ হরে রাম", "jôpo Hore Krishno Hore Ram", "Chant Hare Kṛṣṇa, Hare Rāma"),
      ] },
    ],
    phrases: [
      P("ভজ নিতাই গৌর রাধে শ্যাম, জপ হরে কৃষ্ণ হরে রাম।", "bhôjo Nitai Gour Radhe Shyam, jôpo Hore Krishno Hore Ram.", "Worship Nitāi, Gaura, Rādhe, Śyāma; chant Hare Kṛṣṇa, Hare Rāma."),
    ],
  }),
  topic({
    id: "dev-charitamrita", lessonId: "reading/dev-charitamrita", course: "reading",
    title: ["রামদাস চরিতামৃত", "Ramdash Chôritamrito", "Lines from Rāmdās Charitāmṛta"],
    blurb: "Short lines from the verse biography of Rāmdās Bābājī. The verse is in old literary Bengali: read it to recognise words, not to copy for speaking.",
    sections: [
      { title: "Lines to read", words: [
        W("নিতাই হবেন সহায়।", "Nitai hoben shôhay.", "Nitāi will be your helper."),
        W("যখন যা প্রয়োজন নিতাই দেবে এনে।", "jôkhon ja prôyojôn Nitai debe ene.", "Whatever is needed, Nitāi will bring it when it is needed."),
        W("চরণ শরণে সব দুঃখ দূর হয়।", "chôrôn shôrône shôb dukkho dur hoy.", "Taking shelter at His feet, all sorrow goes away."),
        W("স্মরণ মনন জপ চলে নিয়মিত।", "shôrôn mônôn jôp chôle niyômito.", "Remembrance, reflection and japa go on regularly."),
        W("প্রসাদ, প্রসাদ সদা, অন্ন কভু নয়।", "prôshad, prôshad shôda, ônno kôbhu nôy.", "Prasād is always prasād, never mere food."),
        W("সকলে সাধুরে করে বিদায় প্রণাম।", "shôkole shadhure kôre biday prônam.", "Everyone bows to the sādhu in farewell."),
        W("হাতে শুধু করতাল, গলে জপমালা।", "hate shudhu kôrtal, gôle jôpmala.", "Only cymbals in hand, japa-beads at the neck."),
        W("জয় রাধে রবে শুরু হলো পর্যটন।", "jôy Radhe rôbe shuru holo pôrjôṭôn.", "With the cry “Jay Radhe” the wandering began."),
        W("ভক্তচরণে দীন প্রণাম নিবেদন করি।", "bhôktochôrône deen prônam nibedôn kori.", "I humbly offer my praṇām at the feet of the devotees."),
      ] },
    ],
    phrases: [],
  }),
  topic({
    id: "dev-kathamrita", lessonId: "reading/dev-kathamrita", course: "reading",
    title: ["কথামৃতের কথা", "Kothamritor kotha", "Sayings from the Kathāmṛta"],
    blurb: "Spoken teachings of Śrī Rāmakṛṣṇa on devotion, taken from the Kathāmṛta. The language is plain spoken Bengali.",
    sections: [
      { title: "Sayings", words: [
        W("সাধুসঙ্গ সর্বদা দরকার।", "shadhushôngo shôrbôda dôrkar.", "The company of holy people is always needed."),
        W("সাধু ঈশ্বরের সঙ্গে আলাপ করে দেন।", "shadhu ishshôrer shôngge alap kôre den.", "The sādhu introduces you to God."),
        W("ভক্তিই সার।", "bhôktii shar.", "Devotion alone is the essence."),
        W("খুব ব্যাকুল হয়ে কাঁদলে তাঁকে দেখা যায়।", "khub bækul hoye ka~dle ta~ke dækha jay.", "If you cry for Him with real longing, He can be seen."),
        W("তাঁর দাস হয়ে, তাঁর শরণাগত হয়ে তাঁকে ডাক।", "ta~r dash hoye, ta~r shôrônagôto hoye ta~ke ḍak.", "Become His servant, take refuge in Him, and call on Him."),
        W("সকলই তোমার ইচ্ছা।", "shôkoli tomar ichchha.", "Everything is Your will."),
        W("তুমি যন্ত্রী, আমি যন্ত্র।", "tumi jôntri, ami jôntro.", "You are the operator, I am the instrument."),
        W("নির্জনে গিয়ে তাঁর চিন্তা করা বড় দরকার।", "nirjône giye ta~r chinta kôra bôṛo dôrkar.", "It is very necessary to go into solitude and think of Him."),
        W("হাতে তেল মেখে কাঁঠাল ভাঙবে।", "hate tel mekhe ka~ṭhal bhangbe.", "Oil your hands before you break open the jackfruit.", "Get devotion first, then enter worldly life, so it will not stick"),
        W("সর্বভূতে নারায়ণ আছেন, এইটি জেনে সকলকে নমস্কার করবে।", "shôrbobhute Narayôn achhen, eiṭi jene shôkolke nômoshkar kôrbe.", "God is in all beings. Knowing this, bow to everyone."),
        W("তোমরা হরিনাম কর।", "tomra horinam kôro.", "Chant the Name of Hari."),
      ] },
    ],
    phrases: [],
  }),
];

export const DEV_VOCAB: DevTopic[] = [...DEV_VOCAB_1, ...DEV_VOCAB_2];
export const DEV_READING: DevTopic[] = [...DEV_READING_1, ...DEV_READING_2];
export const DEV_TOPICS: DevTopic[] = [...DEV_VOCAB, ...DEV_READING];
export const getDevTopic = (id: string) => DEV_TOPICS.find((t) => t.id === id);

// ---------------------------------------------------------------- Speaking: role plays

type L = [string, string, string];
const l = (bn: string, r: string, en: string): L => [bn, ro(r), en];
const you = (bn: string, r: string, en: string) => ({ who: "you" as const, line: l(bn, r, en) });
const them = (bn: string, r: string, en: string) => ({ who: "them" as const, line: l(bn, r, en) });

const DEV_SCENARIOS_1: Scenario[] = [
  {
    id: "dev-ashram",
    title: "Arriving at the ashram",
    bn: "আশ্রমে এসে",
    blurb: "Greet a senior devotee at the door, say how you are, and ask when kīrtan starts.",
    situation: "You arrive at the ashram. A senior devotee meets you at the door.",
    goal: "Greet politely with the right title, answer “how are you”, and find out when kīrtan starts.",
    words: [
      ["প্রভু", "prôbhu", "master (a male devotee)"], ["প্রণাম", "prônam", "obeisance"], ["আসুন", "ashun", "please come in"], ["বসুন", "bôshun", "please sit"],
      ["কৃপা", "kripa", "grace"], ["কীর্তন", "kirtôn", "kīrtan"], ["আরতি", "arôti", "ārati"], ["প্রসাদ", "prôshad", "sanctified food"],
    ].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "Greeting and answering", note: "Use আপনি and প্রভু with senior devotees. Never বলো or তুমি here.", items: [
        l("জয় নিতাই, প্রভু!", "jôy Nitai, prôbhu!", "Jay Nitāi, Prabhu!"),
        l("প্রণাম নেবেন।", "prônam neben.", "Please accept my obeisances."),
        l("নিতাইয়ের কৃপায় ভাল আছি।", "Nitaiyer kripay bhalo achhi.", "By Nitāi's grace, I am well."),
        l("ধন্যবাদ, প্রভু।", "dhônnobad, prôbhu.", "Thank you, Prabhu."),
      ] },
      { title: "Asking", items: [
        l("কীর্তন কখন শুরু হবে?", "kirtôn kôkhon shuru hobe?", "When will kīrtan start?"),
        l("আরতি কখন?", "arôti kôkhon?", "When is ārati?"),
        l("আমি বাংলা শিখছি, একটু আস্তে বলুন।", "ami Bangla shikhchhi, ekṭu aste bôlun.", "I am learning Bengali. Please speak slowly."),
        l("আমার গুরুদেব রামদাস বাবাজী মহারাজ।", "amar gurudeb Ramdash Babajee Môharaj.", "My guru is Rāmdās Bābājī Mahārāj."),
      ] },
    ],
    hear: [
      { title: "What they say", items: [
        l("জয় নিতাই! আসুন, বসুন।", "jôy Nitai! ashun, bôshun.", "Jay Nitāi! Come in, please sit."),
        l("কেমন আছেন, প্রভু?", "kæmon achhen, prôbhu?", "How are you, Prabhu?"),
        l("সন্ধ্যায় কীর্তন হবে।", "shôndhyay kirtôn hobe.", "Kīrtan will be in the evening."),
        l("আগে প্রসাদ পান।", "age prôshad pan.", "First, take prasād."),
      ] },
    ],
    demos: [
      { id: "smooth", title: "A warm arrival", kind: "smooth", setup: "You greet the devotee politely and get everything you need.",
        turns: [
          you("জয় নিতাই, প্রভু! প্রণাম নেবেন।", "jôy Nitai, prôbhu! prônam neben.", "Jay Nitāi, Prabhu! Please accept my obeisances."),
          them("জয় নিতাই! কেমন আছেন, প্রভু? আসুন, বসুন।", "jôy Nitai! kæmon achhen, prôbhu? ashun, bôshun.", "Jay Nitāi! How are you, Prabhu? Come in, please sit."),
          you("নিতাইয়ের কৃপায় ভাল আছি। আজ কীর্তন কখন?", "Nitaiyer kripay bhalo achhi. aj kirtôn kôkhon?", "By Nitāi's grace, I am well. When is kīrtan today?"),
          them("সন্ধ্যায়। আগে প্রসাদ পান।", "shôndhyay. age prôshad pan.", "In the evening. First, take prasād."),
          you("ধন্যবাদ, প্রভু। জয় নিতাই!", "dhônnobad, prôbhu. jôy Nitai!", "Thank you, Prabhu. Jay Nitāi!"),
        ], takeaway: "Greeting, title, then your question. Jay Nitāi opens and closes the conversation." },
      { id: "wrong", title: "Too casual", kind: "wrong", setup: "You treat the devotee like a friend in the street.",
        turns: [
          you("হ্যালো! কীর্তন কখন?", "hælo! kirtôn kôkhon?", "Hello! When is kīrtan?"),
          them("জয় নিতাই... সন্ধ্যায়।", "jôy Nitai... shôndhyay.", "Jay Nitāi... in the evening."),
          you("ঠিক আছে। তুমি কেমন আছ?", "thik achhe. tumi kæmon achho?", "OK. How are you? (casual)"),
          them("ভাল আছি, প্রভু... আপনি কি প্রসাদ পেয়েছেন?", "bhalo achhi, prôbhu... apni ki prôshad peyechhen?", "I am well... have you taken prasād?"),
        ], takeaway: "Start with জয় নিতাই or প্রণাম, call them প্রভু, and use আপনি, not তুমি." },
    ],
  },
  {
    id: "dev-prasad",
    title: "Prasād and kīrtan",
    bn: "প্রসাদ ও কীর্তন",
    blurb: "Offer and accept prasād, talk about japa, and say sorry the Vaishnava way.",
    situation: "After kīrtan, devotees sit together for prasād and talk.",
    goal: "Offer prasād politely, answer a question about your japa, and apologise with অপরাধ নেবেন না.",
    words: [
      ["প্রসাদ", "prôshad", "sanctified food"], ["জপ", "jôp", "quiet chanting"], ["মালা", "mala", "round of beads"], ["কীর্তন", "kirtôn", "kīrtan"],
      ["অপরাধ", "ôpôradh", "offence"], ["কৃপা", "kripa", "grace"],
    ].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "Prasād", note: "Devotees “get” (পাওয়া) prasād. They do not “eat” (খাওয়া) it.", items: [
        l("প্রসাদ পেয়েছেন?", "prôshad peyechhen?", "Have you taken prasād?"),
        l("প্রসাদ পান।", "prôshad pan.", "Please take prasād."),
        l("ধন্যবাদ, প্রভু। জয় নিতাই!", "dhônnobad, prôbhu. jôy Nitai!", "Thank you, Prabhu. Jay Nitāi!"),
      ] },
      { title: "Japa and humility", items: [
        l("আমি রোজ জপ করি।", "ami roj jôp kori.", "I chant japa daily."),
        l("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds today?"),
        l("অপরাধ নেবেন না।", "ôpôradh neben na.", "Please forgive my offence."),
        l("সব নিতাইয়ের ইচ্ছা।", "shôb Nitaiyer ichchha.", "It is all Nitāi's will."),
      ] },
    ],
    hear: [
      { title: "What they say", items: [
        l("প্রসাদ পেয়েছেন?", "prôshad peyechhen?", "Have you taken prasād?"),
        l("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds today?"),
        l("হরিনাম করুন।", "horinam kôrun.", "Chant the Holy Name."),
      ] },
    ],
    demos: [
      { id: "smooth", title: "Sharing prasād", kind: "smooth", setup: "You are offered prasād and chat about japa.",
        turns: [
          them("প্রসাদ পেয়েছেন, প্রভু?", "prôshad peyechhen, prôbhu?", "Have you taken prasād, Prabhu?"),
          you("এখনও না। ধন্যবাদ।", "ekhôno na. dhônnobad.", "Not yet. Thank you."),
          them("প্রসাদ পান। আজ কত মালা হলো?", "prôshad pan. aj kôto mala holo?", "Please take prasād. How many rounds today?"),
          you("আমি রোজ জপ করি। আজ ষোলো মালা হলো।", "ami roj jôp kori. aj shôlo mala holo.", "I chant daily. Sixteen rounds today."),
          them("হরিবোল! নিতাইয়ের কৃপা।", "Horibol! Nitaiyer kripa.", "Haribol! Nitāi's grace."),
        ], takeaway: "Answer in short polite sentences. “Haribol” is a happy cheer you will hear often." },
      { id: "wrong", title: "Saying “eat”", kind: "wrong", setup: "You use the everyday word for eating and forget to apologise.",
        turns: [
          them("প্রসাদ পেয়েছেন?", "prôshad peyechhen?", "Have you taken prasād?"),
          you("না, আমি এখনও খাইনি।", "na, ami ekhôno khaini.", "No, I have not eaten yet."),
          them("আচ্ছা, প্রসাদ পান।", "achchha, prôshad pan.", "All right, please take prasād."),
        ], takeaway: "Say প্রসাদ পাওয়া, not খাওয়া. If you slip, say অপরাধ নেবেন না and carry on." },
    ],
  },
  {
    id: "dev-blessing",
    title: "Blessings and leaving",
    bn: "আশীর্বাদ ও বিদায়",
    blurb: "Ask for a blessing, ask someone to pray for you, and take leave with a bow.",
    situation: "It is time to leave the ashram. You meet a senior devotee at the door.",
    goal: "Ask politely for a blessing and take leave with প্রণাম.",
    words: [
      ["আশীর্বাদ", "ashirbad", "blessing"], ["প্রার্থনা", "prarthôna", "prayer"], ["প্রণাম", "prônam", "obeisance"], ["দণ্ডবৎ", "dôndobôt", "full prostration"],
      ["কৃপা", "kripa", "grace"], ["সহায়", "shôhay", "helper"],
    ].map(([a, b, c]) => l(a, b, c)),
    say: [
      { title: "Asking and taking leave", items: [
        l("কৃপা করুন।", "kripa kôrun.", "Please bless me."),
        l("আশীর্বাদ করুন।", "ashirbad kôrun.", "Please give your blessing."),
        l("আমার জন্য প্রার্থনা করবেন।", "amar jônno prarthôna kôrben.", "Please pray for me."),
        l("দণ্ডবৎ প্রণাম, প্রভু। জয় নিতাই!", "dôndobôt prônam, prôbhu. jôy Nitai!", "Dandavat praṇām, Prabhu. Jay Nitāi!"),
        l("জয় নিতাই, আবার দেখা হবে।", "jôy Nitai, abar dækha hobe.", "Jay Nitāi, we will meet again."),
      ] },
    ],
    hear: [
      { title: "What they say", items: [
        l("নিতাই হবেন সহায়।", "Nitai hoben shôhay.", "Nitāi will be your helper."),
        l("আবার আসবেন।", "abar ashben.", "Please come again."),
        l("প্রণাম নেবেন।", "prônam neben.", "Please accept my obeisances."),
      ] },
    ],
    demos: [
      { id: "smooth", title: "A respectful farewell", kind: "smooth", setup: "You ask for a blessing before you go.",
        turns: [
          you("প্রভু, আশীর্বাদ করুন।", "prôbhu, ashirbad kôrun.", "Prabhu, please give your blessing."),
          them("নিতাই হবেন সহায়। আবার আসবেন।", "Nitai hoben shôhay. abar ashben.", "Nitāi will be your helper. Please come again."),
          you("আমার জন্য প্রার্থনা করবেন। দণ্ডবৎ প্রণাম।", "amar jônno prarthôna kôrben. dôndobôt prônam.", "Please pray for me. Dandavat praṇām."),
          them("জয় নিতাই!", "jôy Nitai!", "Jay Nitāi!"),
        ], takeaway: "End with a bow and জয় নিতাই. You ask for blessings with করুন and for prayers with করবেন." },
      { id: "wrong", title: "Leaving with no words", kind: "wrong", setup: "You say a plain goodbye and walk out.",
        turns: [
          you("আমি যাচ্ছি। বাই।", "ami jachchhi. bai.", "I am going. Bye."),
          them("জয় নিতাই... প্রণাম নেবেন।", "jôy Nitai... prônam neben.", "Jay Nitāi... please accept my obeisances."),
        ], takeaway: "A plain “bye” sounds abrupt. Bow with প্রণাম and say জয় নিতাই." },
    ],
  },
];

export const DEV_SCENARIOS: Scenario[] = [...DEV_SCENARIOS_1, ...DEV_SCENARIOS_2];
export const getDevScenario = (id: string) => DEV_SCENARIOS.find((s) => s.id === id);

// ---------------------------------------------------------------- Grammar: devotional exercises

const DEV_CLASSWORK_1: CwSet[] = [
  {
    id: "dev-blanks",
    title: "Complete the devotional line",
    blurb: "Fill in the missing word from lines you have met in the devotional readings.",
    inst: "Write the missing word in Banglish (English letters).",
    items: [
      { prompt: "চরণ ___ সব দুঃখ দূর হয়।", hint: "Taking shelter at His feet, all sorrow goes away.", answer: "shorone", alt: ["sharone", "shoronay"] },
      { prompt: "ভক্তিই ___।", hint: "Devotion alone is the essence.", answer: "shar", alt: ["sar"] },
      { prompt: "সকলই তোমার ___।", hint: "Everything is Your will.", answer: "ichchha", alt: ["iccha", "ichha"] },
      { prompt: "তুমি যন্ত্রী, আমি ___।", hint: "You are the operator, I am the instrument.", answer: "jontro" },
      { prompt: "নিতাই হবেন ___।", hint: "Nitāi will be your helper.", answer: "shohay", alt: ["sahay", "shahay"] },
      { prompt: "সাধুসঙ্গ ___ দরকার।", hint: "The company of holy people is always needed.", answer: "shorboda", alt: ["sorboda", "sarbada"] },
      { prompt: "তোমরা ___ কর।", hint: "Chant the Name of Hari.", answer: "horinam" },
      { prompt: "ভজ নিতাই গৌর রাধে ___।", hint: "The nām: the last word of the first line.", answer: "shyam", alt: ["syam", "shaam"] },
      { prompt: "জপ হরে কৃষ্ণ হরে ___।", hint: "The nām: the last word of the second line.", answer: "ram" },
      { prompt: "জীবে ___।", hint: "Kindness to all beings.", answer: "doya", alt: ["daya"] },
    ],
  },
  {
    id: "dev-polite",
    title: "Say it politely",
    blurb: "Put everyday devotional sentences into Bengali, using the polite আপনি forms.",
    inst: "Write it in Banglish, in the polite apni form, the way you would say it to a senior devotee.",
    items: [
      { prompt: "How are you, Prabhu?", answer: "Kemon achhen, prabhu?", alt: ["Kemon achen prabhu?"] },
      { prompt: "Please come in, please sit.", answer: "Ashun, boshun.", alt: ["Asun boshun"] },
      { prompt: "Have you taken prasād?", answer: "Proshad peyechhen?", alt: ["Prasad peyechen?", "Prashad peyechhen?"], note: "Devotees “get” (paowa) prasād." },
      { prompt: "Please take prasād.", answer: "Proshad pan.", alt: ["Prasad pan.", "Prashad pan."] },
      { prompt: "Please forgive my offence.", answer: "Oporadh neben na.", alt: ["Aporadh neben na."] },
      { prompt: "When is ārati?", answer: "Aroti kokhon?", alt: ["Arati kokhon?"] },
      { prompt: "I chant japa daily.", answer: "Ami roj jop kori.", alt: ["Ami roj jop kori"] },
      { prompt: "I am learning Bengali. Please speak slowly.", answer: "Ami Bangla shikhchhi, ektu aste bolun.", alt: ["Ami Bangla shikchi ektu aste bolun"] },
      { prompt: "Thank you, Prabhu. Jay Nitāi!", answer: "Dhonnobad, prabhu. Joy Nitai!", alt: ["Dhanyabad prabhu joy nitai"] },
      { prompt: "Please give your blessing.", answer: "Ashirbad korun.", alt: ["Ashirvad korun."] },
    ],
  },
  {
    id: "dev-spelling",
    title: "Bengali-style spelling",
    blurb: "English books spell devotional words the Sanskrit way. Write them the way they sound in Bengali.",
    inst: "Write the word the way it is said in Bengali (ব is b, the first অ sounds like o).",
    items: [
      { prompt: "Vaishnava", answer: "boishnob", alt: ["boishnab", "voishnob"], note: "Bengali ব is always “b”, and the first vowel is “oi”." },
      { prompt: "Prabhu", answer: "probhu", alt: ["prabhu"], note: "The inherent অ sounds like “o”." },
      { prompt: "Prasada", answer: "proshad", alt: ["prosad", "proshaad"] },
      { prompt: "Krishna", answer: "krishno", alt: ["krishna"], note: "In speech the final vowel sounds like “o”." },
      { prompt: "Bhakti", answer: "bhokti", alt: ["bhakti"] },
      { prompt: "Kirtan", answer: "kirton", alt: ["kirtan"] },
      { prompt: "Jay Nitai", answer: "joy Nitai", alt: ["jay nitai"], note: "জয় is said “joy”." },
      { prompt: "Hari bol", answer: "Horibol", alt: ["Haribol", "Hori bol"] },
    ],
  },
];

export const DEV_CLASSWORK: CwSet[] = [...DEV_CLASSWORK_1, ...DEV_CLASSWORK_2];
export const getDevClasswork = (id: string) => DEV_CLASSWORK.find((s) => s.id === id);

// ---------------------------------------------------------------- Flashcards

/** Short, useful lines for the say-it-aloud deck. */
export const DEV_SAY: [bn: string, roman: string, en: string][] = [
  ...DEV_VOCAB_1[0].sections[0].words.map((w): [string, string, string] => [w[0], w[1], w[2]]),
  ...DEV_VOCAB_1[5].sections.flatMap((s) => s.words).map((w): [string, string, string] => [w[0], w[1], w[2]]),
  ...DEV_SAY_2,
];

// Devotional reading, volume 3: a bhajan, Vedic mantras, peace invocations, guru prayers and the Rāmakṛṣṇa prayers.
// Written from the teacher's collection. Lines given in Devanagari are converted to Bengali script here; the roman spelling
// is generated and follows Bengali pronunciation (v is b). The English meanings are plain glosses and need the teacher's review,
// and so does the Bengali script of the bhajan, which was read from a screenshot.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Word } from "./vocabulary";
import type { DevTopic } from "./devotional";
import { bnToRoman, sanskritRoman } from "../lib/translit";

/**
 * Devanagari to Bengali script. The two blocks line up letter for letter, with these changes:
 * OM, व (which Bengali writes ব), and य, which is য় except at the start of a word or after a virama (জ্যোতির্, বীর্যং).
 */
const dn = (s: string) =>
  s
    .replace(/ॐ/g, "ওঁ")
    .replace(/व/g, "ব")
    .replace(/(?<![\s्])य/g, "য়")
    .replace(/[ऀ-ॿ]/g, (c) => (c === "।" || c === "॥" || c === "য়" ? c : String.fromCharCode(c.charCodeAt(0) + 0x80)));
/** One line of text: Bengali script, generated roman, English gloss. */
const L = (bn: string, en: string, note?: string): Word => [bn, sanskritRoman(bn), en, ...(note ? [note] : [])] as Word;
/** A line of ordinary Bengali (the bhajan and the Bengali translation). */
const B = (bn: string, en: string, note?: string): Word => [bn, bnToRoman(bn), en, ...(note ? [note] : [])] as Word;

const topic = (t: Omit<DevTopic, "group" | "course" | "part" | "phrases">): DevTopic => ({ group: "devotional", course: "reading", part: "words", phrases: [], ...t });

export const DEV_READING_3: DevTopic[] = [
  topic({
    id: "dev-bhajan", lessonId: "reading/dev-bhajan",
    title: ["ভজ রাধাকৃষ্ণ গোপাল কৃষ্ণ", "bhôjo Radhakrishno Gopal Krishno", "Bhajan: Bhaja Rādhākṛṣṇa Gopāl Kṛṣṇa"],
    blurb: "A devotional song in tritāl by Brajendranāth Mukhopādhyāy. Read it, hear it, and learn what each line says.",
    sections: [{ title: "The song", words: [
      B("ভজ রাধাকৃষ্ণ, গোপাল কৃষ্ণ, কৃষ্ণ কৃষ্ণ বলো মুখে।", "Worship Rādhā-Kṛṣṇa, Gopāl Kṛṣṇa; say “Kṛṣṇa, Kṛṣṇa” with your mouth."),
      B("নামে বুক ভরে যায় অভাব মিটায়, স্বভাব জাগায় মহাসুখে॥", "The Name fills the heart, ends all want and wakes your true nature in great joy."),
      B("হরি দীনবন্ধু, চিরদিন বন্ধু, জীবের চির সুখে দুখে,", "Hari is the friend of the lowly, a friend forever, of living beings in joy and sorrow,"),
      B("ভজোরে অন্ধ, চরণারবিন্দ, দুস্তর এ মায়া বিপাকে।", "O blind one, worship His lotus feet, in this hard-to-cross whirl of māyā."),
      B("ভজো মূঢ়মতি, তব চিরসাথী, যাঁহার করুণা লোকে লোকে।", "Worship, foolish mind, your lifelong companion, whose mercy fills the worlds."),
      B("লীলাময় হরি এসেছে নদীয়াপুরী, রাধার পিরীতি ল'য়ে বুকে ।", "The playful Hari has come to Nadia, carrying Rādhā's love in His heart."),
    ] }],
  }),
  topic({
    id: "dev-vedic", lessonId: "reading/dev-vedic",
    title: ["বৈদিক মন্ত্র", "boidik môntro", "Vedic mantras"],
    blurb: "Three well-known mantras: the prayer for studying together, “lead me from the unreal”, and the Gāyatrī.",
    sections: [
      { title: "Saha nāvavatu: a prayer for teacher and student", words: [
        L(dn("ॐ सह नाववतु ।"), "May He protect us both together."),
        L(dn("सह नौ भुनक्तु ।"), "May He nourish us both together."),
        L(dn("सह वीर्यं करवावहै ।"), "May we work together with great energy."),
        L(dn("तेजस्वि नावधीतमस्तु मा विद्विषावहै ।"), "May our study be bright and effective. May we not hate each other."),
        L(dn("ॐ शान्तिः शान्तिः शान्तिः ॥"), "Om, peace, peace, peace."),
      ] },
      { title: "Asato mā sadgamaya", words: [
        L(dn("ॐ असतो मा सद्गमय ।"), "Lead me from the unreal to the real."),
        L(dn("तमसो मा ज्योतिर्गमय ।"), "Lead me from darkness to light."),
        L(dn("मृत्योर्मा अमृतं गमय ।"), "Lead me from death to immortality."),
        L(dn("ॐ शान्तिः शान्तिः शान्तिः ॥"), "Om, peace, peace, peace."),
      ] },
      { title: "The Gāyatrī", words: [
        L(dn("ॐ भूर्भुवः स्वः"), "Om: the earth, the air and the heavens."),
        L(dn("तत्सवितुर्वरेण्यं"), "That most worshipful light of the Sun,"),
        L(dn("भर्गो देवस्य धीमहि"), "the radiance of the divine one: on it we meditate."),
        L(dn("धियो यो नः प्रचोदयात् ॥"), "May he inspire our minds."),
      ] },
    ],
  }),
  topic({
    id: "dev-shanti", lessonId: "reading/dev-shanti",
    title: ["শান্তিপাঠ", "shantipaṭh", "Peace invocations (Śānti-pāṭh)"],
    blurb: "Three invocations for peace, from the Yajurveda and the Atharvaveda. A gist of each line is given; the last one has the Bengali translation too.",
    sections: [
      { title: "Kṛṣṇa Yajurveda invocation", words: [
        L("ওঁ শং নো মিত্রঃ শং বরুণঃ । শং নো ভবত্বর্যমা ।", "May Mitra be kind to us, and Varuṇa; may Aryamā be kind to us."),
        L("শং ন ইন্দ্রো বৃহস্পতিঃ। শং নো বিষ্ণুরুরুক্ৰমঃ ।", "May Indra and Bṛhaspati be kind to us; may far-striding Viṣṇu be kind to us."),
        L("নমো ব্ৰহ্মণে । নমস্তে বায়ো। ত্বমেব প্রত্যক্ষং ব্রহ্মাসি ।", "Salutations to Brahman. Salutations to you, Vāyu: you are Brahman made visible."),
        L("ত্বমেব প্রত্যক্ষং ব্রহ্ম বদিষ্যামি। ঋতং বদিষ্যামি ।", "I will call you the visible Brahman. I will speak what is right."),
        L("সত্যং বদিষ্যামি। তন্মামবতু। তদ্বক্তারমবতু।", "I will speak the truth. May that protect me; may it protect the speaker."),
        L("অবতু মাম্ । অবতু বক্তারম্।", "May it protect me. May it protect the speaker."),
        L("ওঁ শান্তিঃ শান্তিঃ শান্তিঃ ॥", "Om, peace, peace, peace."),
      ] },
      { title: "Atharvaveda invocation", words: [
        L("ওঁ ভদ্রং কর্ণেভিঃ শৃণুয়াম দেবাঃ ।", "O gods, may we hear what is good with our ears."),
        L("ভদ্রং পশ্যেমাক্ষভির্যজত্রাঃ ।", "May we see what is good with our eyes, O worshipful ones."),
        L("স্থিরৈরঙ্গৈস্তুষ্টুবাগং সস্তনূভিঃ", "Praising you with steady limbs and healthy bodies,"),
        L("ব্যশেম দেবহিতং যদায়ুঃ।", "may we live the life that is given by the gods."),
        L("স্বস্তি ন ইন্দ্রো বৃদ্ধশ্রবাঃ ।", "May Indra, of great renown, give us well-being."),
        L("স্বস্তি নঃ পূষা বিশ্ববেদাঃ ।", "May Pūṣā, who knows all, give us well-being."),
        L("স্বস্তি নস্তার্ক্ষ্যো অরিষ্টনেমিঃ।", "May Tārkṣya, whose wheel is never harmed, give us well-being."),
        L("স্বস্তি নো বৃহস্পতির্দধাতু ॥", "May Bṛhaspati grant us well-being."),
        L("ওঁ শান্তিঃ শান্তিঃ শান্তিঃ ॥", "Om, peace, peace, peace."),
      ] },
      { title: "Śukla Yajurveda invocation: Pūrṇam", words: [
        L("ওঁ পূর্ণমদঃ পূর্ণমিদং পূর্ণাৎ পূর্ণমুদচ্যতে ।", "That is whole, this is whole; from the whole the whole arises."),
        L("পূর্ণস্য পূর্ণমাদায় পূর্ণমেবাবশিষ্যতে ॥", "Taking the whole from the whole, the whole alone remains."),
        L("ওঁ শান্তিঃ শান্তিঃ শান্তিঃ ॥", "Om, peace, peace, peace."),
        B("উহা [পরব্রহ্ম] পূর্ণ, ইহাও [নামরূপস্থ ব্ৰহ্ম] পূর্ণ; পূর্ণ হইতে পূর্ণ উদ্গত হন; পূর্ণের [কার্যব্রহ্মেব] পূর্ণত্ব গ্রহণ করিলে পূর্ণ [পরব্রহ্মই] অবশিষ্ট থাকেন। শান্তি, শান্তি, শান্তি।", "The Bengali translation (বঙ্গানুবাদ) of the invocation above."),
      ] },
    ],
  }),
  topic({
    id: "dev-guru", lessonId: "reading/dev-guru",
    title: ["গুরুপ্রণাম", "guruprônam", "Prayers to the guru"],
    blurb: "Two verses of salutation to the teacher, written in Bengali script with their meaning.",
    sections: [
      { title: "Śrī Guru Praṇāma", words: [
        L("ওঁ অজ্ঞানতিমিরান্ধস্য জ্ঞানাঞ্জনশলাকয়া ।", "Om. To the one blinded by the darkness of ignorance, with the ointment stick of knowledge,"),
        L("চক্ষুরুন্মীলিতং যেন তস্মৈ শ্রীগুরবে নমঃ ॥", "he opened the eyes: salutations to that sacred guru."),
      ] },
      { title: "Prayer to the guru", words: [
        L("গুরুর্ব্রহ্মা গুরুর্বিষ্ণুঃ গুরুর্দেবো মহেশ্বরঃ ।", "The guru is Brahmā, the guru is Viṣṇu, the guru is the god Maheśvara."),
        L("গুরুঃ সাক্ষাৎ পরং ব্রহ্ম তস্মৈ শ্রীগুরবে নমঃ ॥", "The guru is the supreme Brahman itself: salutations to that sacred guru."),
      ] },
    ],
  }),
  topic({
    id: "dev-ramakrishna", lessonId: "reading/dev-ramakrishna",
    title: ["রামকৃষ্ণ ও রামের প্রণাম", "Ramakrishno o Ramer prônam", "Prayers to Rāmakṛṣṇa, Rāma and Vivekānanda"],
    blurb: "The salutation to Rāmakṛṣṇa, two verses to Rāma, and a salutation to Swami Vivekānanda.",
    sections: [
      { title: "Rāmakṛṣṇa praṇām", words: [
        L("ও স্থাপকায় চ ধর্মস্য সর্ব-ধর্ম-স্বরূপিণে,", "Om. To the establisher of dharma, who embodies all dharmas,"),
        L("অবতার-বরিষ্ঠায় রামকৃষ্ণায় তে নমঃ॥", "the best of the avatars, to you, Rāmakṛṣṇa, salutations."),
        L("ও নমঃ শ্রীভগবতে রামকৃষ্ণায় নমো নমঃ।", "Om. Salutations again and again to the blessed Lord Rāmakṛṣṇa.", "Said three times"),
      ] },
      { title: "Two verses to Rāma", words: [
        L("আপদামপহর্তারং দাতারং সর্বসম্পদাম্।", "The remover of calamities, the giver of all wealth and blessings,"),
        L("লোকাভিরামং শ্রীরামং ভূয়ো ভূয়ো নমাম্যহম্॥১॥", "Śrī Rāma, the delight of the world: again and again I bow to him."),
        L("রামায় রামচন্দ্রায় রামভদ্রায় বেধসে।", "To Rāma, Rāmacandra, Rāmabhadra, the Creator,"),
        L("রঘুনাথায় নাথায় সীতায়াঃ পতয়ে নমঃ॥২॥", "to Raghunātha, the Lord, the husband of Sītā: salutations."),
      ] },
      { title: "Salutation to Swami Vivekānanda", words: [
        L("নমঃ শ্ৰীতিরাজায় বিবেকানন্দসূরয়ে।", "Salutations to the king of renunciants, the wise Vivekānanda.", "The word শ্ৰীতিরাজায় may be a typing slip for শ্রীযতিরাজায়: please check"),
        L("সচ্চিত্সুখস্বরূপায় স্বামিনে তাপহারিণে॥", "To the Swami whose nature is being, consciousness and bliss, the remover of suffering.", "সচ্চিত্সুখ may be a slip for সচ্চিৎসুখ: please check"),
      ] },
    ],
  }),
];

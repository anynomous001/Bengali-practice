// Role play for students whose family is in Bangladesh. Written for this app: the Bengali needs review by a native speaker from Dhaka.
// The in-laws are spoken to as আপনি. Many families call a father-in-law আব্বা and a mother-in-law আম্মা, but not all do: follow your family.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Scenario, Turn } from "./roleplay";

const you = (bn: string, ro: string, en: string): Turn => ({ who: "you", line: [bn, ro, en] });
const them = (bn: string, ro: string, en: string): Turn => ({ who: "them", line: [bn, ro, en] });

export const BANGLADESH_SCENARIOS: Scenario[] = [
  {
    id: "bangladesh-inlaws",
    title: "At your in-laws' home in Dhaka",
    bn: "শ্বশুরবাড়িতে",
    blurb: "Greet your spouse's parents, say you are happy to be there, praise the food and say no kindly to more.",
    situation: "You have come to your spouse's family home in Dhaka for the first time. Your father-in-law and mother-in-law greet you at the door, and a table of food is ready.",
    goal: "Greet them politely, say you are happy to be there, ask who someone is, thank them for the invitation, praise the food, and say you are full without offending them.",
    words: [
      ["আব্বা", "abba", "father"], ["আম্মা", "amma", "mother"], ["বাসা", "basha", "home; flat"], ["দাওয়াত", "daoat", "invitation to a meal"],
      ["পানি", "pani", "water"], ["নাশতা", "nashta", "breakfast; a light meal"], ["মেহমান", "mehman", "guest"], ["মজা", "moja", "tasty; delicious"],
      ["রান্না", "ranna", "cooking"], ["পেট ভরে যাওয়া", "pet bhore jaoya", "to be full"], ["আলহামদুলিল্লাহ", "alhamdulillah", "thank God"],
      ["ইনশাআল্লাহ", "inshaallah", "God willing"], ["শুকরিয়া", "shukriya", "thanks"], ["আদাব", "adab", "a greeting"],
    ],
    say: [
      { title: "Greeting them", note: "Use আপনি. The greeting depends on your family: আসসালামু আলাইকুম in Muslim families, নমস্কার in Hindu families. Listen to how they greet you, and answer the same way.", items: [
        ["আসসালামু আলাইকুম, আব্বা। আম্মা, আপনি কেমন আছেন?", "assalamu alaikum, abba. amma, apni kemon achhen?", "Peace be with you, Father. Mother, how are you?"],
        ["আমি ভালো আছি, আলহামদুলিল্লাহ।", "ami bhalo achhi, alhamdulillah.", "I am well, thank God."],
        ["আপনাদের বাসায় এসে খুব ভালো লাগছে।", "apnader bashay eshe khub bhalo lagchhe.", "I am very happy to be at your home."],
        ["আপনাদের দাওয়াতের জন্য শুকরিয়া।", "apnader daoater jonyo shukriya.", "Thank you for your invitation."],
      ] },
      { title: "At the table", items: [
        ["ইনি কে? আমাকে একটু পরিচয় করিয়ে দিন।", "ini ke? amake ektu porichoy koriye din.", "Who is this? Please introduce me."],
        ["খুব মজার রান্না হয়েছে। আপনি নিজে রেঁধেছেন?", "khub mojar ranna hoyechhe. apni nije rendhechhen?", "The food is very tasty. Did you cook it yourself?"],
        ["একটু পানি দিন, প্লিজ।", "ektu pani din, plij.", "Please give me a little water."],
        ["আর একটু নেব।", "ar ektu nebo.", "I will have a little more."],
      ] },
      { title: "Saying no kindly, and leaving", items: [
        ["আর পারব না, পেট ভরে গেছে।", "ar parbo na, pet bhore gechhe.", "I cannot eat more, I am full."],
        ["সবকিছু খুব ভালো লেগেছে।", "shobkichhu khub bhalo legechhe.", "I liked everything very much."],
        ["ইনশাআল্লাহ, কাল আবার আসব।", "inshaallah, kal abar ashbo.", "God willing, I will come again tomorrow."],
        ["আল্লাহ হাফেজ।", "allah hafez.", "Goodbye."],
      ] },
    ],
    hear: [
      { title: "What your in-laws may say", note: "They may say তুমি to you, as a member of the family. That is warm, not rude.", items: [
        ["ওয়ালাইকুম আসসালাম। এসো, বসো।", "walaikum assalam. esho, boso.", "Peace be with you too. Come, sit down."],
        ["পথে কোনো কষ্ট হয়নি তো?", "pothe kono koshto hoyni to?", "The journey was not too hard, I hope?"],
        ["আগে একটু নাশতা করো।", "age ektu nashta koro.", "Have some breakfast first."],
        ["আরেকটু ভাত নাও।", "arekto bhat nao.", "Take a little more rice."],
        ["লজ্জা কোরো না।", "lojja koro na.", "Do not be shy."],
        ["দুপুরে আমরা সবাই একসঙ্গে খাব।", "dupure amra shobai ekshonge khabo.", "At noon we will all eat together."],
        ["তোমার বাংলা তো বেশ ভালো!", "tomar bangla to besh bhalo!", "Your Bengali is quite good!"],
      ] },
    ],
    demos: [
      { id: "arrival", title: "Everything goes well: arriving and eating", kind: "smooth", setup: "Your in-laws meet you at the door and take you to the table.", turns: [
        you("আসসালামু আলাইকুম, আব্বা। আম্মা, আপনি কেমন আছেন?", "assalamu alaikum, abba. amma, apni kemon achhen?", "Peace be with you, Father. Mother, how are you?"),
        them("ওয়ালাইকুম আসসালাম। আমরা ভালো আছি। এসো, বসো।", "walaikum assalam. amra bhalo achhi. esho, boso.", "Peace be with you too. We are well. Come, sit down."),
        you("আপনাদের বাসায় এসে খুব ভালো লাগছে।", "apnader bashay eshe khub bhalo lagchhe.", "I am very happy to be at your home."),
        them("পথে কোনো কষ্ট হয়নি তো? আগে একটু নাশতা করো।", "pothe kono koshto hoyni to? age ektu nashta koro.", "The journey was not too hard, I hope? Have some breakfast first."),
        you("আপনাদের দাওয়াতের জন্য শুকরিয়া। খুব মজার রান্না হয়েছে।", "apnader daoater jonyo shukriya. khub mojar ranna hoyechhe.", "Thank you for your invitation. The food is very tasty."),
        them("আরেকটু ভাত নাও।", "arekto bhat nao.", "Take a little more rice."),
        you("আর একটু নেব। আপনি নিজে রেঁধেছেন?", "ar ektu nebo. apni nije rendhechhen?", "I will have a little more. Did you cook it yourself?"),
        them("হ্যাঁ। তোমার বাংলা তো বেশ ভালো!", "hyan. tomar bangla to besh bhalo!", "Yes. Your Bengali is quite good!"),
      ], takeaway: "Greet first, say you are happy to be there, and praise the food. Use আপনি, and listen to how they greet you before you choose between আসসালামু আলাইকুম and নমস্কার." },
      { id: "too-much-food", title: "Things go wrong: you cannot eat any more", kind: "wrong", setup: "Your mother-in-law keeps offering more food and you are already full.", turns: [
        them("আরেকটু মাছ নাও।", "arekto mach nao.", "Take a little more fish."),
        you("আর পারব না, পেট ভরে গেছে।", "ar parbo na, pet bhore gechhe.", "I cannot eat more, I am full."),
        them("লজ্জা কোরো না। আরেকটু নাও।", "lojja koro na. arekto nao.", "Do not be shy. Take a little more."),
        you("সত্যি, আর পারব না। খুব মজা হয়েছে, শুকরিয়া।", "shotti, ar parbo na. khub moja hoyechhe, shukriya.", "Really, I cannot. It was very tasty, thank you."),
        them("আচ্ছা, তাহলে একটু মিষ্টি খাও।", "achchha, tahole ektu mishti khao.", "All right, then have a little sweet."),
        you("মিষ্টি একটু নেব। ধন্যবাদ।", "mishti ektu nebo. dhonyobad.", "I will have a little sweet. Thank you."),
      ], takeaway: "Refusing once is not enough. Say \"পেট ভরে গেছে\", praise the food, and accept something small, like a sweet. That is polite." },
    ],
  },
];

// Mixed-tense practice sets with a story theme (here: Delhi and Dadu). Two kinds of exercise per set:
// fill in the blanks with the right form of the verb, and translate an English sentence.
// Server-only: pages pass what they need down. The Bengali is the teacher's to check; edit it here.
export type Opt = { bn: string; ro: string };
export type Blank = { verb: string; verbRo: string; options: Opt[]; /** Index of the right option. */ answer: number };
export type FillItem = { tense: string; parts: string[]; partsRo: string[]; blanks: Blank[]; en: string };
export type TranslateItem = { tense: string; en: string; bn: string; ro: string };
export type TenseSet = { id: string; title: string; blurb: string; fill: FillItem[]; translate: TranslateItem[] };

const o = (bn: string, ro: string): Opt => ({ bn, ro });
/** The first option is the right one; the page shuffles them. */
const b = (verb: string, verbRo: string, options: Opt[]): Blank => ({ verb, verbRo, options, answer: 0 });

export const TENSE_SETS: TenseSet[] = [
  {
    id: "delhi-dadu",
    title: "Delhi and Dadu",
    blurb: "A trip to Delhi to see Dadu and Dida, in every tense.",
    fill: [
      { tense: "Simple Present", en: "Dadu has tea every morning after getting up, but Dida does not.",
        parts: ["দাদু প্রতিদিন ভোরে উঠে চা ", ", কিন্তু দিদা চা ", " না।"], partsRo: ["Dadu protidin bhore uthe cha ", ", kintu Dida cha ", " na."],
        blanks: [b("খাওয়া", "khaoya", [o("খান", "khan"), o("খাচ্ছেন", "khachchhen"), o("খেয়েছেন", "kheyechhen"), o("খাবেন", "khaben")]), b("খাওয়া", "khaoya", [o("খান", "khan"), o("খায়", "khay"), o("খাও", "khao"), o("খাই", "khai")])] },
      { tense: "Present Continuous", en: "I am buying sweets for Dadu now, and my sister is wrapping the gift.",
        parts: ["আমি এখন দাদুর জন্য মিষ্টি ", ", আর আমার বোন গিফটটা ", "।"], partsRo: ["Ami ekhon dadur jonno mishti ", ", ar amar bon giftta ", "."],
        blanks: [b("কেনা", "kena", [o("কিনছি", "kinchhi"), o("কিনি", "kini"), o("কিনেছি", "kinechhi"), o("কিনব", "kinbo")]), b("মোড়া", "mora", [o("মুড়ছে", "murchhe"), o("মোড়ে", "more"), o("মুড়েছে", "murechhe"), o("মুড়বে", "murbe")])] },
      { tense: "Present Perfect", en: "Has Dadu written you any letter? No, he has only phoned.",
        parts: ["দাদু কি তোমাকে কোনো চিঠি ", "? না, উনি শুধু ফোন ", "।"], partsRo: ["Dadu ki tomake kono chithi ", "? Na, uni shudhu phone ", "."],
        blanks: [b("লেখা", "lekha", [o("লিখেছেন", "likhechhen"), o("লেখেন", "lekhen"), o("লিখছেন", "likhchhen"), o("লিখবেন", "likhben")]), b("করা", "kora", [o("করেছেন", "korechhen"), o("করেন", "koren"), o("করছেন", "korchhen"), o("করবেন", "korben")])] },
      { tense: "Simple Past", en: "Last year Dadu came to our house, and we watched Durga Puja together.",
        parts: ["গত বছর দাদু আমাদের বাড়িতে ", ", আর আমরা একসঙ্গে দুর্গাপুজো ", "।"], partsRo: ["Goto bochhor dadu amader barite ", ", ar amra ekshonge Durga Pujo ", "."],
        blanks: [b("আসা", "asha", [o("এসেছিলেন", "esechhilen"), o("আসেন", "asen"), o("আসছিলেন", "aschhilen"), o("আসবেন", "asben")]), b("দেখা", "dekha", [o("দেখেছিলাম", "dekhechhilam"), o("দেখি", "dekhi"), o("দেখছিলাম", "dekhchhilam"), o("দেখব", "dekhbo")])] },
      { tense: "Present Perfect Continuous", en: "I have been learning Bengali for six months, so Dadu is very happy.",
        parts: ["আমি ছয় মাস ধরে বাংলা ", ", তাই দাদু খুব খুশি।"], partsRo: ["Ami chhoy mash dhore Bangla ", ", tai Dadu khub khushi."],
        blanks: [b("শেখা", "shekha", [o("শিখছি", "shikhchhi"), o("শিখি", "shikhi"), o("শিখেছি", "shikhechhi"), o("শিখব", "shikhbo")])] },
      { tense: "Simple Past + Past Continuous", en: "When Dadu phoned, I was bathing.",
        parts: ["যখন দাদু ফোন ", ", তখন আমি স্নান ", "।"], partsRo: ["Jokhon dadu phone ", ", tokhon ami snan ", "."],
        blanks: [b("করা", "kora", [o("করেছিলেন", "korechhilen"), o("করেন", "koren"), o("করছিলেন", "korchhilen"), o("করবেন", "korben")]), b("করা", "kora", [o("করছিলাম", "korchhilam"), o("করেছিলাম", "korechhilam"), o("করি", "kori"), o("করব", "korbo")])] },
      { tense: "Past Perfect", en: "Dida had already cooked everything before I arrived.",
        parts: ["আমি পৌঁছানোর আগেই দিদা সব রান্না ", "।"], partsRo: ["Ami pouchhanor agei dida shob ranna ", "."],
        blanks: [b("করা", "kora", [o("করে ফেলেছিলেন", "kore felechhilen"), o("করছিলেন", "korchhilen"), o("করে ফেলেন", "kore felen"), o("করে ফেলবেন", "kore felben")])] },
      { tense: "Past Perfect Continuous + Simple Past", en: "Dadu had been living in a rented house for twenty years, then he bought his own house.",
        parts: ["দাদু কুড়ি বছর ধরে ভাড়া বাড়িতে ", ", তারপর উনি নিজের বাড়ি ", "।"], partsRo: ["Dadu kuri bochhor dhore bhara barite ", ", tarpor uni nijer bari ", "."],
        blanks: [b("থাকা", "thaka", [o("থাকছিলেন", "thakchhilen"), o("থাকেন", "thaken"), o("থেকেছেন", "thekechhen"), o("থাকবেন", "thakben")]), b("কেনা", "kena", [o("কিনেছিলেন", "kinechhilen"), o("কেনেন", "kenen"), o("কিনছিলেন", "kinchhilen"), o("কিনবেন", "kinben")])] },
      { tense: "Simple Future", en: "Tomorrow I will bring hilsa fish for Dadu, and Dida will cook it.",
        parts: ["কাল আমি দাদুর জন্য ইলিশ মাছ ", ", আর দিদা সেটা ", "।"], partsRo: ["Kal ami dadur jonno ilish machh ", ", ar dida seta ", "."],
        blanks: [b("আনা", "ana", [o("আনব", "anbo"), o("আনি", "ani"), o("এনেছি", "enechhi"), o("আনছি", "anchhi")]), b("রান্না করা", "ranna kora", [o("রান্না করবেন", "ranna korben"), o("রান্না করেন", "ranna koren"), o("রান্না করছেন", "ranna korchhen"), o("রান্না করেছেন", "ranna korechhen")])] },
      { tense: "Present Perfect (negative, then positive)", en: "I have not bought the ticket yet, but Dadu has already asked about the date.",
        parts: ["আমি এখনও টিকিট ", ", কিন্তু দাদু আগেই তারিখ ", "।"], partsRo: ["Ami ekhono ticket ", ", kintu dadu agei tarikh ", "."],
        blanks: [b("কাটা", "kata", [o("কাটিনি", "katini"), o("কাটি", "kati"), o("কাটছি", "katchhi"), o("কাটব", "katbo")]), b("জিজ্ঞেস করা", "jigges kora", [o("জিজ্ঞেস করেছেন", "jigges korechhen"), o("জিজ্ঞেস করেন", "jigges koren"), o("জিজ্ঞেস করছেন", "jigges korchhen"), o("জিজ্ঞেস করবেন", "jigges korben")])] },
    ],
    translate: [
      { tense: "Present Continuous", en: "I am packing my bag for Delhi.", bn: "আমি দিল্লির জন্য ব্যাগ গোছাচ্ছি।", ro: "Ami Dillir jonno bag gochhachchhi." },
      { tense: "Present Perfect", en: "I have bought sweets for Dadu.", bn: "আমি দাদুর জন্য মিষ্টি কিনেছি।", ro: "Ami dadur jonno mishti kinechhi." },
      { tense: "Simple Present", en: "Dadu drinks tea every morning.", bn: "দাদু রোজ সকালে চা খান।", ro: "Dadu roj shokale cha khan." },
      { tense: "Present Perfect Continuous", en: "I have been learning Bengali for six months.", bn: "আমি ছয় মাস ধরে বাংলা শিখছি।", ro: "Ami chhoy mash dhore Bangla shikhchhi." },
      { tense: "Simple Past", en: "Yesterday I called Dadu.", bn: "গতকাল আমি দাদুকে ফোন করেছিলাম।", ro: "Gotokal ami daduke phone korechhilam." },
      { tense: "Past Continuous", en: "Dida was cooking when I reached home.", bn: "আমি যখন বাড়ি পৌঁছলাম, দিদা তখন রান্না করছিলেন।", ro: "Ami jokhon bari pouchhlam, dida tokhon ranna korchhilen." },
      { tense: "Past Perfect", en: "The train had already left when I reached the station.", bn: "আমি স্টেশনে পৌঁছানোর আগেই ট্রেন ছেড়ে গিয়েছিল।", ro: "Ami steshone pouchhanor agei tren chhere giyechhilo." },
      { tense: "Past Perfect Continuous", en: "Dadu had been waiting for me for an hour.", bn: "দাদু এক ঘণ্টা ধরে আমার জন্য অপেক্ষা করছিলেন।", ro: "Dadu ek ghonta dhore amar jonno opekkha korchhilen." },
      { tense: "Simple Future", en: "I will go to the market with Dadu.", bn: "আমি দাদুর সঙ্গে বাজারে যাব।", ro: "Ami dadur songe bajare jabo." },
      { tense: "Future Continuous", en: "This time tomorrow, I will be sitting on the plane.", bn: "কাল এই সময়ে আমি প্লেনে বসে থাকব।", ro: "Kal ei shomoye ami pleney boshe thakbo." },
    ],
  },
];

export const getTenseSet = (id: string) => TENSE_SETS.find((s) => s.id === id);

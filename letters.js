// [letter, romanization, example word, word romanization, word meaning]
// Letters without a clean example word use null and are skipped by the quizzes.
const GROUPS = [
  { id: "vowels", title: "Vowels (স্বরবর্ণ)", letters: [
    ["অ", "o", "অজগর", "ojogor", "python"],
    ["আ", "a", "আম", "aam", "mango"],
    ["ই", "i", "ইলিশ", "ilish", "hilsa fish"],
    ["ঈ", "ee", "ঈগল", "igol", "eagle"],
    ["উ", "u", "উট", "ut", "camel"],
    ["ঊ", "oo", "ঊর্ণা", "urna", "wool"],
    ["ঋ", "ri", "ঋষি", "rishi", "sage"],
    ["এ", "e", "এক", "ek", "one"],
    ["ঐ", "oi", "ঐরাবত", "oirabot", "royal elephant"],
    ["ও", "o", "ওল", "ol", "yam"],
    ["ঔ", "ou", "ঔষধ", "oushodh", "medicine"]
  ]},
  { id: "consonants", title: "Consonants (ব্যঞ্জনবর্ণ)", letters: [
    ["ক", "ko", "কলম", "kolom", "pen"],
    ["খ", "kho", "খাতা", "khata", "notebook"],
    ["গ", "go", "গরু", "goru", "cow"],
    ["ঘ", "gho", "ঘর", "ghor", "house"],
    ["ঙ", "ngo", "বাঙালি", "bangali", "Bengali person"],
    ["চ", "cho", "চাঁদ", "chand", "moon"],
    ["ছ", "chho", "ছাতা", "chhata", "umbrella"],
    ["জ", "jo", "জল", "jol", "water"],
    ["ঝ", "jho", "ঝড়", "jhor", "storm"],
    ["ঞ", "ño", null],
    ["ট", "to (ṭ)", "টাকা", "taka", "money"],
    ["ঠ", "tho (ṭh)", "ঠোঁট", "thont", "lips"],
    ["ড", "do (ḍ)", "ডিম", "dim", "egg"],
    ["ঢ", "dho (ḍh)", "ঢাক", "dhak", "drum"],
    ["ণ", "no (ṇ)", "বাণী", "bani", "message"],
    ["ত", "to", "তারা", "tara", "star"],
    ["থ", "tho", "থালা", "thala", "plate"],
    ["দ", "do", "দুধ", "dudh", "milk"],
    ["ধ", "dho", "ধান", "dhan", "paddy"],
    ["ন", "no", "নদী", "nodi", "river"],
    ["প", "po", "পাখি", "pakhi", "bird"],
    ["ফ", "pho", "ফল", "phol", "fruit"],
    ["ব", "bo", "বই", "boi", "book"],
    ["ভ", "bho", "ভাত", "bhat", "rice"],
    ["ম", "mo", "মাছ", "mach", "fish"],
    ["য", "jo (y)", "যন্ত্র", "jontro", "machine"],
    ["র", "ro", "রাত", "raat", "night"],
    ["ল", "lo", "লাল", "laal", "red"],
    ["শ", "sho", "শিশু", "shishu", "child"],
    ["ষ", "sho (ṣ)", "ষাঁড়", "shaand", "bull"],
    ["স", "so", "সাপ", "shaap", "snake"],
    ["হ", "ho", "হাত", "haat", "hand"],
    ["ড়", "ro (ṛ)", "বড়", "boro", "big"],
    ["ঢ়", "rho (ṛh)", "আষাঢ়", "ashar", "a Bengali month"],
    ["য়", "yo", "ময়ূর", "moyur", "peacock"]
  ]},
  { id: "others", title: "Special signs", letters: [
    ["ৎ", "t (khanda ta)", "জগৎ", "jogot", "world"],
    ["ং", "ng (anusvara)", "বাংলা", "bangla", "Bengali language"],
    ["ঃ", "h (bisarga)", "দুঃখ", "dukkho", "sorrow"],
    ["ঁ", "nasal (chandrabindu)", "চাঁদ", "chand", "moon"]
  ]}
];

const LETTERS = GROUPS.flatMap(g => g.letters.map(([ch, rom, word, wrom, wmean]) =>
  ({ ch, rom, word, wrom, wmean, group: g.id })));

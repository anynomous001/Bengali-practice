type Entry = [string, string, string | null, string?, string?];
type Raw = { id: string; title: string; letters: Entry[] };

// [letter, romanization, example word, word romanization, word meaning]
// Letters without a clean example word use null and are skipped by the quizzes.
const GROUPS_RAW: Raw[] = [
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
    ["ঞ", "nyo", null],
    ["ট", "To (hard T)", "টাকা", "taka", "money"],
    ["ঠ", "Tho (hard Th)", "ঠোঁট", "thont", "lips"],
    ["ড", "Do (hard D)", "ডিম", "dim", "egg"],
    ["ঢ", "Dho (hard Dh)", "ঢাক", "dhak", "drum"],
    ["ণ", "No (same as ন)", "বাণী", "bani", "message"],
    ["ত", "to (soft t)", "তারা", "tara", "star"],
    ["থ", "tho (soft th)", "থালা", "thala", "plate"],
    ["দ", "do (soft d)", "দুধ", "dudh", "milk"],
    ["ধ", "dho (soft dh)", "ধান", "dhan", "paddy"],
    ["ন", "no", "নদী", "nodi", "river"],
    ["প", "po", "পাখি", "pakhi", "bird"],
    ["ফ", "pho (p + puff)", "ফল", "phol", "fruit"],
    ["ব", "bo", "বই", "boi", "book"],
    ["ভ", "bho", "ভাত", "bhat", "rice"],
    ["ম", "mo", "মাছ", "mach", "fish"],
    ["য", "jo (same as জ)", "যন্ত্র", "jontro", "machine"],
    ["র", "ro", "রাত", "raat", "night"],
    ["ল", "lo", "লাল", "laal", "red"],
    ["শ", "sho (sh)", "শিশু", "shishu", "child"],
    ["ষ", "sho (same as শ)", "ষাঁড়", "shaand", "bull"],
    ["স", "sho (usually sh)", "সাপ", "shaap", "snake"],
    ["হ", "ho", "হাত", "haat", "hand"],
    ["ড়", "Ro (flap r)", "বড়", "boro", "big"],
    ["ঢ়", "Rho (flap rh)", "আষাঢ়", "ashar", "a Bengali month"],
    ["য়", "yo", "ময়ূর", "moyur", "peacock"]
  ]},
  { id: "others", title: "Special signs", letters: [
    ["ৎ", "t (khanda ta)", "জগৎ", "jogot", "world"],
    ["ং", "ng (anusvara)", "বাংলা", "bangla", "Bengali language"],
    ["ঃ", "h (bisarga)", "দুঃখ", "dukkho", "sorrow"],
    ["ঁ", "nasal (chandrabindu)", "চাঁদ", "chand", "moon"]
  ]}
];


// [trick, easily mixed up with]. "Puff" means a breath of air after the sound: hold a hand in front of your mouth and feel it.
const TIPS: Record<string, [string, string?]> = {
  "অ": ["Say “o” as in hot or dog, with the lips a little rounded. It is the vowel hidden inside most consonants: ক is “k + o”."],
  "আ": ["Open wide and say “aa” as in father or spa."],
  "ই": ["Short “i”, between sit and seat. It sounds exactly like ঈ."],
  "ঈ": ["The same sound as ই: say “ee” as in feet. Only the spelling is long.", "ই, which sounds the same"],
  "উ": ["Short “u” as in put, or the oo in book. It sounds exactly like ঊ."],
  "ঊ": ["The same sound as উ: say “oo” as in moon.", "উ, which sounds the same"],
  "ঋ": ["Say “ri” as in rich or rim, with a quick tapped r."],
  "এ": ["Say “e” as in the French café, or the ay in hay without gliding. At the start of a word it is often flatter, like the a in cat: এক can sound like “ek” or “æk”."],
  "ঐ": ["Say “oi” as in boy or coin."],
  "ও": ["Say “o” as in go or more, held steady without gliding to oo.", "অ, which is shorter and rounder like hot"],
  "ঔ": ["Say “ou”, starting with o and gliding to u, a bit like the ow in know-how."],
  "ক": ["Say “k” as in sky, with no puff of air. Hold a hand in front of your mouth: it should barely move."],
  "খ": ["Say “k” as in kin, with a puff of air. Hold a hand in front of your mouth and feel the breath.", "ক, which has no puff"],
  "গ": ["Say “g” as in go, with no puff."],
  "ঘ": ["Say “g” with a puff, as in the quick “g-h” of dog-house.", "গ, which has no puff"],
  "ঙ": ["Say the “ng” of sing, and hold it. In Bengali it comes after a vowel: বাঙালি (bangali)."],
  "চ": ["Say “ch” as in cheese, without a puff."],
  "ছ": ["Say “ch” with a puff, as in the quick “ch-h” of much harm.", "চ, which has no puff"],
  "জ": ["Say “j” as in jam, without a puff.", "য, which sounds the same"],
  "ঝ": ["Say “j” with a puff, as in the quick “j-h” of hedgehog.", "জ, which has no puff"],
  "ঞ": ["Say “ny” as in canyon. It is rare on its own and mostly seen in joined letters."],
  "ট": ["A hard T. Curl the tip of your tongue back to the roof of your mouth. The t in train, said the American way, is close; Indian English t is the same sound.", "ত, a soft t with the tongue on the teeth"],
  "ঠ": ["A hard T with a puff. Say ট, then add a breath. It is not the “th” of think.", "থ, a soft th with the tongue on the teeth"],
  "ড": ["A hard D. Curl the tongue back as for ট and say it voiced: like the d in drum, said the American way.", "দ, a soft d with the tongue on the teeth"],
  "ঢ": ["A hard D with a puff. Say ড, then add a breath, as in mad-house with the tongue curled back.", "ধ, a soft dh with the tongue on the teeth"],
  "ণ": ["In Bengali it sounds exactly like ন: a plain “n” as in nut. The spelling tells them apart, not the sound.", "ন, which sounds the same"],
  "ত": ["A soft t. Put the tip of your tongue on the back of your top teeth, like the t in Spanish tú or French tu. Do not puff.", "ট, a hard T with the tongue curled back"],
  "থ": ["A soft t with a puff, tongue on the teeth. It is NOT the “th” of think or the. Say ত and add a breath.", "ঠ, a hard Th with the tongue curled back"],
  "দ": ["A soft d. Put the tip of your tongue on the back of your top teeth, like the d in Spanish donde. Do not puff.", "ড, a hard D with the tongue curled back"],
  "ধ": ["A soft d with a puff, tongue on the teeth. It is NOT the “th” of the. Say দ and add a breath.", "ঢ, a hard Dh with the tongue curled back"],
  "ন": ["Say “n” as in nut, with the tongue touching the back of the teeth.", "ণ, which sounds the same"],
  "প": ["Say “p” as in spin, without a puff."],
  "ফ": ["Say “p” with a puff, as in pin. It is not the f of fan: the lips close and open.", "প, which has no puff"],
  "ব": ["Say “b” as in bat. Bengali has no “v”: ব is a b."],
  "ভ": ["Say “b” with a puff, as in the quick “b-h” of club-house.", "ব, which has no puff"],
  "ম": ["Say “m” as in man."],
  "য": ["At the start of a word say “j” as in jam. It sounds like জ.", "জ, which sounds the same"],
  "র": ["Say “r” with a quick tap of the tongue, like the r in Spanish pero or the tt in American butter."],
  "ল": ["Say “l” as in lamp, with a light tongue tip."],
  "শ": ["Say “sh” as in shoe.", "ষ and স, which also sound like “sh”"],
  "ষ": ["Say “sh” as in shoe. It sounds just like শ.", "শ and স, which also sound like “sh”"],
  "স": ["Usually say “sh” as in shoe, like শ. Only in joined letters such as স্কুল (skul, school) is it a plain “s”.", "শ and ষ, which sound the same"],
  "হ": ["Say “h” as in hat."],
  "ড়": ["A flap. Flick the tongue tip back and forward once, like the tt in American butter. The dot under ড makes the difference.", "ড, the hard D"],
  "ঢ়": ["The flap of ড় with a puff. It is rare and mostly at the end of words: আষাঢ়.", "ঢ, the hard Dh"],
  "য়": ["Say “y” as in yes. It is the y you hear in ময়ূর (moyur, peacock).", "য, which sounds like j"],
  "ৎ": ["A “t” that ends a word, with no vowel after it: জগৎ (jogot)."],
  "ং": ["Say “ng” as in sing, at the end of the sound: বাংলা (bangla)."],
  "ঃ": ["A breath of “h” after the vowel, or a doubled sound: দুঃখ is said “dukkho”."],
  "ঁ": ["Say the vowel through your nose, like the on in French bon: চাঁদ (chãd)."],
};

export type Letter = {
  ch: string;
  rom: string;
  word: string | null;
  wrom: string | null;
  wmean: string | null;
  group: string;
  /** A trick for saying the letter, comparing it with English sounds. */
  tip: string | null;
  /** What it is easily mixed up with. */
  vs: string | null;
};

export const GROUPS = GROUPS_RAW.map(({ id, title }) => ({ id, title }));

export const LETTERS: Letter[] = GROUPS_RAW.flatMap((g) =>
  g.letters.map(([ch, rom, word, wrom, wmean]) => ({
    ch,
    rom,
    word: word ?? null,
    wrom: wrom ?? null,
    wmean: wmean ?? null,
    group: g.id,
    tip: TIPS[ch]?.[0] ?? null,
    vs: TIPS[ch]?.[1] ?? null,
  })),
);

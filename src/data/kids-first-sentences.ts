// "First Sentences: Say What I Need, Have, Can Do and Like": a Kids lesson module for ages 6 to 9.
// ALL the lesson content is in this file. To add or change a word, frame, dialogue line or exercise item, edit it here:
// no component needs to change. Every Bengali item has `bengali` (script), `roman` (Banglish) and `english`.
// Audio: an item's `id` is also its audio file name: /assets/audio/<id>.mp3 is played when it exists, otherwise the browser's Bengali voice speaks the script.

export type Item = { id: string; bengali: string; roman: string; english: string };
/** One word of a sentence (a tile). `roman` is what the answer check compares, ignoring capitals and punctuation. */
export type Word = { bengali: string; roman: string };

export type Frame = {
  id: string;
  /** The pattern itself, e.g. আমার ... পেয়েছে. `english` says what it is for. */
  frame: Item;
  useWhen: string;
  /** Set when only these words may go in the blank. */
  onlyThese?: string;
  examples: Item[];
  situation: { text: string; line: Item };
};
export type CheatRow = { id: string; situation: string; frame: string; example: Item };
export type Line = { id: string; speaker: "ma" | "neel"; bengali: string; roman: string; english: string; action?: string; optional?: boolean };

export type FixItem = { id: string; english: string; sentence: Word[]; wrong: string; fix: Word; options: Word[] };
export type BuildItem = { id: string; tiles: Word[]; answer: Item };
export type MeaningItem = { id: string; phrase: Item; meaning: string; /** other accepted spellings when the child types the meaning */ accept?: string[] };

export type FirstSentences = {
  title: string; titleBn: string; subtitle: string; goal: string;
  words: Item[]; helpers: Item[]; frames: Frame[]; cheatSheet: CheatRow[];
  roleplay: { title: string; intro: string; speakers: Record<"ma" | "neel", { name: string; bengali: string }>; lines: Line[] };
  practice: { fix: FixItem[]; build: BuildItem[]; meaning: MeaningItem[] };
  notes: { teaching: string[]; frameOneWarning: string; activities: { title: string; text: string }[]; homeGame: { title: string; minutes: number; steps: string[] } };
};

const it = (id: string, bengali: string, roman: string, english: string): Item => ({ id, bengali, roman, english });
const w = (bengali: string, roman: string): Word => ({ bengali, roman });

// ---- the words the exercises use as tiles and choices
const W = {
  amar: w("আমার", "Amar"), ami: w("আমি", "Ami"), amake: w("আমাকে", "Amake"), eta: w("এটা", "Eta"), ekta: w("একটা", "ekta"),
  khide: w("খিদে", "khide"), testa: w("তেষ্টা", "testa"), ghum: w("ঘুম", "ghum"), peyeche: w("পেয়েছে", "peyeche"),
  am: w("আম", "am"), kola: w("কলা", "kola"), dim: w("ডিম", "dim"), apel: w("আপেল", "apel"), dudh: w("দুধ", "dudh"), jol: w("জল", "jol"), ruti: w("রুটি", "ruti"), mishti: w("মিষ্টি", "mishti"),
  ball: w("বল", "Ball"), kukur: w("কুকুর", "kukur"), ma: w("মা", "Ma"), kothay: w("কোথায়", "kothay"),
  ache: w("আছে", "ache"), pari: w("পারি", "pari"), bhalobashi: w("ভালোবাসি", "bhalobashi"), dao: w("দাও", "dao"),
  lafate: w("লাফাতে", "lafate"), hnatte: w("হাঁটতে", "hnatte"),
};

export const FIRST_SENTENCES: FirstSentences = {
  title: "First Sentences", titleBn: "প্রথম বাক্য",
  subtitle: "Say what I need, have, can do and like",
  goal: "Say real sentences from day one. Learn a few sentence frames, then reuse them with new words.",

  // ---------------------------------------------------------------- PART 1: LEARN
  words: [
    it("fs-w-am", "আম", "am", "mango"), it("fs-w-kola", "কলা", "kola", "banana"), it("fs-w-apel", "আপেল", "apel", "apple"), it("fs-w-dudh", "দুধ", "dudh", "milk"),
    it("fs-w-jol", "জল", "jol", "water"), it("fs-w-dim", "ডিম", "dim", "egg"), it("fs-w-ruti", "রুটি", "ruti", "roti or bread"), it("fs-w-mishti", "মিষ্টি", "mishti", "sweet"),
  ],
  helpers: [
    it("fs-h-dhonnobad", "ধন্যবাদ", "dhonnobad", "thank you"), it("fs-h-abar-bolo", "আবার বলো", "abar bolo", "say it again"),
    it("fs-h-jani-na", "জানি না", "jani na", "I don't know"), it("fs-h-ma", "মা", "Ma", "mom"),
  ],
  frames: [
    {
      id: "need", frame: it("fs-f-need", "আমার ... পেয়েছে", "Amar ... peyeche", "my body needs something"),
      useWhen: "Use it when your body needs something: food, a drink or sleep.",
      onlyThese: "Only three words fit in the blank: খিদে (khide), তেষ্টা (testa) and ঘুম (ghum).",
      examples: [it("fs-s-khide", "আমার খিদে পেয়েছে।", "Amar khide peyeche.", "I'm hungry."), it("fs-s-testa", "আমার তেষ্টা পেয়েছে।", "Amar testa peyeche.", "I'm thirsty."), it("fs-s-ghum", "আমার ঘুম পেয়েছে।", "Amar ghum peyeche.", "I'm sleepy.")],
      situation: { text: "You come home from school and your tummy is rumbling.", line: it("fs-s-ma-khide", "মা, আমার খিদে পেয়েছে।", "Ma, amar khide peyeche.", "Mom, I'm hungry.") },
    },
    {
      id: "where", frame: it("fs-f-where", "... কোথায়?", "... kothay?", "where is it?"),
      useWhen: "Use it when you can't find something or someone.",
      examples: [it("fs-s-ma-kothay", "মা কোথায়?", "Ma kothay?", "Where is Mom?"), it("fs-s-ball-kothay", "বল কোথায়?", "Ball kothay?", "Where is the ball?")],
      situation: { text: "Hide-and-seek with a ball. Where did it roll?", line: it("fs-s-ball-kothay2", "বল কোথায়?", "Ball kothay?", "Where is the ball?") },
    },
    {
      id: "name", frame: it("fs-f-name", "এটা কী? / এটা ...", "Eta ki? / Eta ...", "ask or tell the name of something"),
      useWhen: "Use it to ask what something is called, or to tell someone its name.",
      examples: [it("fs-s-eta-ki", "এটা কী?", "Eta ki?", "What is this?"), it("fs-s-eta-kola", "এটা কলা।", "Eta kola.", "This is a banana.")],
      situation: { text: "You point at things on the table, one by one.", line: it("fs-s-eta-ki2", "এটা কী?", "Eta ki?", "What is this?") },
    },
    {
      id: "have", frame: it("fs-f-have", "আমার ... আছে", "Amar ... ache", "what I have"),
      useWhen: "Use it to say what you have.",
      examples: [it("fs-s-kukur", "আমার একটা কুকুর আছে।", "Amar ekta kukur ache.", "I have a dog."), it("fs-s-ball", "আমার একটা বল আছে।", "Amar ekta ball ache.", "I have a ball.")],
      situation: { text: "Show and tell at school: you hold up your favourite thing.", line: it("fs-s-kukur2", "আমার একটা কুকুর আছে।", "Amar ekta kukur ache.", "I have a dog.") },
    },
    {
      id: "can", frame: it("fs-f-can", "আমি ... পারি", "Ami ... pari", "what I can do"),
      useWhen: "Use it to say what you can do.",
      examples: [it("fs-s-lafate", "আমি লাফাতে পারি।", "Ami lafate pari.", "I can jump."), it("fs-s-hnatte", "আমি হাঁটতে পারি।", "Ami hnatte pari.", "I can walk.")],
      situation: { text: "You show your friends a new trick.", line: it("fs-s-lafate2", "আমি লাফাতে পারি।", "Ami lafate pari.", "I can jump.") },
    },
    {
      id: "like", frame: it("fs-f-like", "আমি ... ভালোবাসি", "Ami ... bhalobashi", "what I like"),
      useWhen: "Use it to say what you like.",
      examples: [it("fs-s-am", "আমি আম ভালোবাসি।", "Ami am bhalobashi.", "I like mangoes."), it("fs-s-mishti", "আমি মিষ্টি ভালোবাসি।", "Ami mishti bhalobashi.", "I like sweets.")],
      situation: { text: "The favourites game: everyone says one thing they love.", line: it("fs-s-am2", "আমি আম ভালোবাসি।", "Ami am bhalobashi.", "I like mangoes.") },
    },
    {
      id: "give", frame: it("fs-f-give", "আমাকে ... দাও", "Amake ... dao", "give me something"),
      useWhen: "Use it to ask someone to give you something.",
      examples: [it("fs-s-kola-dao", "আমাকে কলা দাও।", "Amake kola dao.", "Give me a banana."), it("fs-s-jol-dao", "আমাকে জল দাও।", "Amake jol dao.", "Give me water.")],
      situation: { text: "You are in the kitchen and you see the fruit bowl.", line: it("fs-s-kola-dao2", "আমাকে কলা দাও।", "Amake kola dao.", "Give me a banana.") },
    },
  ],

  cheatSheet: [
    { id: "cs-need", situation: "Say I'm hungry / thirsty / sleepy", frame: "Amar khide / testa / ghum peyeche", example: it("fs-cs-need", "মা, আমার খিদে পেয়েছে।", "Ma, amar khide peyeche.", "Mom, I'm hungry.") },
    { id: "cs-where", situation: "Find something", frame: "... kothay?", example: it("fs-cs-where", "বল কোথায়?", "Ball kothay?", "Where is the ball?") },
    { id: "cs-ask-name", situation: "Ask a name", frame: "Eta ki?", example: it("fs-cs-ask-name", "এটা কী?", "Eta ki?", "What is this?") },
    { id: "cs-say-name", situation: "Say a name", frame: "Eta ...", example: it("fs-cs-say-name", "এটা কলা।", "Eta kola.", "This is a banana.") },
    { id: "cs-have", situation: "Say what I have", frame: "Amar ... ache", example: it("fs-cs-have", "আমার একটা কুকুর আছে।", "Amar ekta kukur ache.", "I have a dog.") },
    { id: "cs-can", situation: "Say what I can do", frame: "Ami ... pari", example: it("fs-cs-can", "আমি লাফাতে পারি।", "Ami lafate pari.", "I can jump.") },
    { id: "cs-like", situation: "Say what I like", frame: "Ami ... bhalobashi", example: it("fs-cs-like", "আমি আম ভালোবাসি।", "Ami am bhalobashi.", "I like mangoes.") },
    { id: "cs-give", situation: "Ask for something", frame: "Amake ... dao", example: it("fs-cs-give", "আমাকে কলা দাও।", "Amake kola dao.", "Give me a banana.") },
  ],

  // ---------------------------------------------------------------- PART 2: ROLEPLAY
  roleplay: {
    title: "Neel and Ma in the kitchen",
    intro: "Read the talk line by line. Then hide Neel's lines and say them yourself!",
    speakers: { ma: { name: "Ma", bengali: "মা" }, neel: { name: "Neel", bengali: "নীল" } },
    lines: [
      { id: "fs-r-01", speaker: "ma", bengali: "নীল, কেমন আছো?", roman: "Neel, kemon acho?", english: "Neel, how are you?" },
      { id: "fs-r-02", speaker: "neel", bengali: "আমি ভালো আছি।", roman: "Ami bhalo achhi.", english: "I'm fine." },
      { id: "fs-r-03", speaker: "neel", bengali: "মা, আমার খিদে পেয়েছে।", roman: "Ma, amar khide peyeche.", english: "Mom, I'm hungry." },
      { id: "fs-r-04", speaker: "ma", bengali: "তুমি কী খাবে?", roman: "Tumi ki khabe?", english: "What will you eat?" },
      { id: "fs-r-05", speaker: "neel", bengali: "আমাকে কলা দাও।", roman: "Amake kola dao.", english: "Give me a banana." },
      { id: "fs-r-06", speaker: "ma", bengali: "এই নাও।", roman: "Ei nao.", english: "Here, take it." },
      { id: "fs-r-07", speaker: "neel", bengali: "এটা কী?", roman: "Eta ki?", english: "What is this?", action: "Neel points at another fruit." },
      { id: "fs-r-08", speaker: "ma", bengali: "এটা আম।", roman: "Eta am.", english: "This is a mango." },
      { id: "fs-r-09", speaker: "neel", bengali: "আমি আম ভালোবাসি।", roman: "Ami am bhalobashi.", english: "I like mangoes." },
      { id: "fs-r-10", speaker: "ma", bengali: "তুমি কি মিষ্টি ভালোবাসো?", roman: "Tumi ki mishti bhalobasho?", english: "Do you like sweets?" },
      { id: "fs-r-11", speaker: "neel", bengali: "হ্যাঁ, আমি মিষ্টি ভালোবাসি।", roman: "Hnya, ami mishti bhalobashi.", english: "Yes, I like sweets." },
      { id: "fs-r-12", speaker: "neel", bengali: "মা, দুধ কোথায়?", roman: "Ma, dudh kothay?", english: "Mom, where is the milk?" },
      { id: "fs-r-13", speaker: "ma", bengali: "এই যে!", roman: "Ei je!", english: "Here it is!" },
      { id: "fs-r-14", speaker: "neel", bengali: "ধন্যবাদ, মা!", roman: "Dhonnobad, Ma!", english: "Thank you, Mom!" },
      { id: "fs-r-15", speaker: "neel", bengali: "আমার একটা বল আছে। আমি লাফাতে পারি!", roman: "Amar ekta ball ache. Ami lafate pari!", english: "I have a ball. I can jump!", optional: true },
    ],
  },

  // ---------------------------------------------------------------- PART 3: PRACTICE (answer keys live here; the screens never show them before the child answers)
  practice: {
    // A. Fix it! The child taps the word that does not match the English, then picks the right word. `wrong` is the roman of that word; `fix` is the right replacement.
    fix: [
      { id: "fx-1", english: "I need to drink water.", sentence: [W.amar, W.ghum, W.peyeche], wrong: "ghum", fix: W.testa, options: [W.testa, W.khide, W.dudh] },
      { id: "fx-2", english: "I'm hungry.", sentence: [W.amar, W.testa, W.peyeche], wrong: "testa", fix: W.khide, options: [W.khide, W.ghum, W.jol] },
      { id: "fx-3", english: "This is a banana.", sentence: [W.eta, W.am], wrong: "am", fix: W.kola, options: [W.kola, W.dim, W.apel] },
      { id: "fx-4", english: "Where is the ball?", sentence: [W.ma, W.kothay], wrong: "Ma", fix: W.ball, options: [W.ball, W.jol, W.kukur] },
      { id: "fx-5", english: "I can jump.", sentence: [W.ami, W.hnatte, W.pari], wrong: "hnatte", fix: W.lafate, options: [W.lafate, W.kola, W.jol] },
      { id: "fx-6", english: "Give me milk.", sentence: [W.amake, W.kola, W.dao], wrong: "kola", fix: W.dudh, options: [W.dudh, W.ruti, W.mishti] },
    ],
    // B. Build the sentence: `tiles` are given in the CORRECT order here; the screen shuffles them.
    build: [
      { id: "bd-1", tiles: [W.amar, W.ekta, W.kukur, W.ache], answer: it("fs-s-kukur", "আমার একটা কুকুর আছে।", "Amar ekta kukur ache.", "I have a dog.") },
      { id: "bd-2", tiles: [W.ami, W.am, W.bhalobashi], answer: it("fs-s-am", "আমি আম ভালোবাসি।", "Ami am bhalobashi.", "I like mangoes.") },
      { id: "bd-3", tiles: [W.amake, W.kola, W.dao], answer: it("fs-s-kola-dao", "আমাকে কলা দাও।", "Amake kola dao.", "Give me a banana.") },
      { id: "bd-4", tiles: [W.ami, W.lafate, W.pari], answer: it("fs-s-lafate", "আমি লাফাতে পারি।", "Ami lafate pari.", "I can jump.") },
      { id: "bd-5", tiles: [W.ball, W.kothay], answer: it("fs-s-ball-kothay", "বল কোথায়?", "Ball kothay?", "Where is the ball?") },
      { id: "bd-6", tiles: [W.amar, W.khide, W.peyeche], answer: it("fs-s-khide", "আমার খিদে পেয়েছে।", "Amar khide peyeche.", "I'm hungry.") },
    ],
    // C. What does it mean? Distractors are the other items' meanings.
    meaning: [
      { id: "mn-1", phrase: it("fs-s-khide", "আমার খিদে পেয়েছে।", "Amar khide peyeche.", "I'm hungry."), meaning: "I'm hungry.", accept: ["I am hungry"] },
      { id: "mn-2", phrase: it("fs-s-testa", "আমার তেষ্টা পেয়েছে।", "Amar testa peyeche.", "I'm thirsty."), meaning: "I'm thirsty.", accept: ["I am thirsty"] },
      { id: "mn-3", phrase: it("fs-s-eta-ache", "আমার এটা আছে।", "Amar eta ache.", "I have this."), meaning: "I have this." },
      { id: "mn-4", phrase: it("fs-s-ball", "আমার একটা বল আছে।", "Amar ekta ball ache.", "I have a ball."), meaning: "I have a ball." },
      { id: "mn-5", phrase: it("fs-s-lafate", "আমি লাফাতে পারি।", "Ami lafate pari.", "I can jump."), meaning: "I can jump." },
      { id: "mn-6", phrase: it("fs-s-hnatte", "আমি হাঁটতে পারি।", "Ami hnatte pari.", "I can walk."), meaning: "I can walk." },
      { id: "mn-7", phrase: it("fs-s-mishti", "আমি মিষ্টি ভালোবাসি।", "Ami mishti bhalobashi.", "I like sweets."), meaning: "I like sweets.", accept: ["I love sweets"] },
      { id: "mn-8", phrase: it("fs-s-jol-dao", "আমাকে জল দাও।", "Amake jol dao.", "Give me water."), meaning: "Give me water." },
      { id: "mn-9", phrase: it("fs-s-ma-kothay", "মা কোথায়?", "Ma kothay?", "Where is Mom?"), meaning: "Where is Mom?", accept: ["Where is Mum", "Where is Mother"] },
      { id: "mn-10", phrase: it("fs-s-eta-ki", "এটা কী?", "Eta ki?", "What is this?"), meaning: "What is this?" },
    ],
  },

  // ---------------------------------------------------------------- PART 4: NOTES
  notes: {
    teaching: [
      "Teach two or three frames at a time, and keep reusing the old ones. Fluency comes from using the same frames again and again with new words.",
      "Let the child say the whole sentence aloud, even if it is slow. A sentence said out loud is worth more than a word recognised on a screen.",
      "Praise every try. Wrong answers in the practice are gentle on purpose: the child just tries again.",
    ],
    frameOneWarning: "Frame 1 (Amar ... peyeche) is not a free slot. Only khide, testa and ghum fit. Do not let the child put other words in it (not Amar dudh peyeche).",
    activities: [
      { title: "Slot swap with picture cards", text: "Hold up a picture card and say \"Ami ___ bhalobashi\". The child says the missing word. Swap cards and repeat." },
      { title: "Hide the ball", text: "Hide a ball in the room. The child asks \"Ball kothay?\" until it is found. Then swap: you hide, they hide." },
      { title: "Show and tell", text: "The child holds something and says \"Amar ekta ... ache\". Try it with toys, a pet, a book." },
      { title: "Stickers", text: "A sticker for every sentence the child says alone, without help." },
    ],
    homeGame: {
      title: "Home game (5 minutes)", minutes: 5,
      steps: [
        "At dinner, the child says \"Amar khide peyeche.\" (আমার খিদে পেয়েছে।)",
        "Then the child asks for food: \"Amake ___ dao.\" (আমাকে ___ দাও।)",
        "The parent answers \"Ei nao!\" (এই নাও!) and gives it.",
        "Swap roles for the next course.",
      ],
    },
  },
};

// "Story relay": a two-person speaking game. Only import this from server code.
import type { L } from "./roleplay";
export type { L };

export type RelayOpening = { id: string; lines: L[] };
export type RelayCard = { id: string; word: L; tense: string; hint: string };

export const HELPERS: L[] = [
  ["তারপর", "tarpor", "then"], ["কিন্তু", "kintu", "but"], ["তাই", "tai", "so"],
  ["কারণ", "karon", "because"], ["হঠাৎ", "hothat", "suddenly"], ["তখন", "tokhon", "at that time"],
];

export const OPENINGS: RelayOpening[] = [
  { id: "bazar", lines: [
    ["এক দিন পিসি বাজারে গেল।", "ek din pishi bajare gelo.", "One day Pishi (aunt) went to the market."],
    ["সে অনেক ফল আর সবজি কিনল।", "se onek phol ar shobji kinlo.", "She bought a lot of fruit and vegetables."],
    ["হঠাৎ, সে একজন পুরনো বন্ধুকে দেখতে পেল।", "hothat, se ekjon purono bondhuke dekhte pelo.", "Suddenly, she saw an old friend."],
  ] },
  { id: "raat", lines: [
    ["দাদা কাল রাতে ঘুমোতে পারছিল না।", "dada kal rate ghumote parchhilo na.", "Dada (elder brother) couldn't sleep last night."],
    ["সে ঘর থেকে বাইরে এল।", "se ghor theke bairey elo.", "He came out of the room."],
    ["বাইরে একটা আজব শব্দ হচ্ছিল।", "bairey ekta ajob shobdo hochchhilo.", "A strange sound was coming from outside."],
  ] },
  { id: "ranna", lines: [
    ["ঠাকুমা এখন রান্না করছেন।", "thakuma ekhon ranna korchhen.", "Thakuma (grandmother) is cooking now."],
    ["ঘরে অনেক মানুষ আসছে।", "ghor-e onek manush asche.", "Many people are coming to the house."],
    ["কিন্তু ভাত এখনও তৈরি হয়নি।", "kintu bhat ekhono toiri hoy ni.", "But the rice is not ready yet."],
  ] },
];

/** Option B: the board cards, used in order. */
export const CARDS: RelayCard[] = [
  { id: "gotokal", word: ["গতকাল", "gotokal", "yesterday"], tense: "Past", hint: "Say what happened yesterday." },
  { id: "jokhon", word: ["যখন … তখন", "jokhon ... tokhon", "when ... then"], tense: "Two actions together", hint: "Join two things with jokhon and tokhon." },
  { id: "ekhon", word: ["এখন", "ekhon", "now"], tense: "Present continuous", hint: "Say what is happening right now." },
  { id: "ekhono", word: ["এখনও … নি", "ekhono ... ni", "not yet"], tense: "Present perfect, negative", hint: "Say what has not happened yet." },
  { id: "agamikal", word: ["আগামীকাল", "agamikal", "tomorrow"], tense: "Future", hint: "Say what will happen tomorrow." },
  { id: "free", word: ["মুক্ত", "mukto", "free"], tense: "Any tense", hint: "No rule. Finish the story any way you like." },
];

export const SAMPLE_A: { who: "you" | "partner"; lines: L[] }[] = [
  { who: "you", lines: OPENINGS[0].lines },
  { who: "partner", lines: [
    ["বন্ধুর নাম মিনা।", "bondhur nam mina.", "The friend's name is Mina."],
    ["তারা দুজন এক সঙ্গে চা খেল।", "tara dujon ek sathe cha khelo.", "The two of them had tea together."],
    ["তারপর মিনা বলল, “আমার একটা খবর আছে।”", "tarpor mina bollo, \"amar ekta khobor achhe.\"", "Then Mina said, \"I have some news.\""],
  ] },
  { who: "you", lines: [
    ["পিসি জানতে চাইল, “কী খবর?”", "pishi jante chailo, \"ki khobor?\"", "Pishi asked, \"What news?\""],
    ["মিনা বলল, “আমি নতুন চাকরি পেয়েছি।”", "mina bollo, \"ami notun chakri peyechhi.\"", "Mina said, \"I have got a new job.\""],
    ["কিন্তু তার মুখে একটা চিন্তা ছিল।", "kintu tar mukhe ekta chinta chhilo.", "But there was a worry on her face."],
  ] },
];

export const SAMPLE_B: L[] = [
  ["এখন পিসি আর মিনা এক সঙ্গে বসে আছে।", "ekhon pishi ar mina ek sathe bose achhe.", "Now Pishi and Mina are sitting together. (card: ekhon)"],
  ["দুজনের মুখে হাসি।", "dujoner mukh-e hashi.", "Both are smiling. (free)"],
  ["কিন্তু মিনা এখনও পিসিকে সব কথা বলেনি।", "kintu mina ekhono pishi-ke shob kotha bole ni.", "But Mina has not told Pishi everything yet. (also uses the card)"],
];

import { LETTERS } from "./letters";
import { NUMBERS } from "./numbers";

const SIGN_CARDS: [sign: string, roman: string, name: string, vowel: string][] = [
  ["া", "kaa", "আ-কার", "আ"], ["ি", "ki", "ই-কার", "ই"], ["ী", "kii", "ঈ-কার", "ঈ"], ["ু", "ku", "উ-কার", "উ"], ["ূ", "kuu", "ঊ-কার", "ঊ"],
  ["ৃ", "kri", "ঋ-কার", "ঋ"], ["ে", "ke", "এ-কার", "এ"], ["ৈ", "koi", "ঐ-কার", "ঐ"], ["ো", "ko", "ও-কার", "ও"], ["ৌ", "kou", "ঔ-কার", "ঔ"],
];
const SIGN_WORDS: [word: string, roman: string, name: string, meaning: string][] = [
  ["কাক", "kaak", "আ-কার (◌া)", "crow"], ["দিন", "din", "ই-কার (◌ি)", "day"], ["নদী", "nodi", "ঈ-কার (◌ী)", "river"], ["ফুল", "phul", "উ-কার (◌ু)", "flower"],
  ["ভূত", "bhut", "ঊ-কার (◌ূ)", "ghost"], ["কৃষ্ণ", "krishno", "ঋ-কার (◌ৃ)", "Krishna"], ["দেশ", "desh", "এ-কার (◌ে)", "country"], ["বৈষ্ণব", "boishnob", "ঐ-কার (◌ৈ)", "Vaishnava"],
  ["গোবিন্দ", "gobindo", "ও-কার (◌ো)", "Govinda"], ["নৌকা", "nouka", "ঔ-কার (◌ৌ)", "boat"],
];

export type Card = {
  id: string;
  front: string;
  /** Shown under the front only when romanization is on. */
  frontRoman?: string;
  /** Main answer line (Bengali or English). Optional: some cards are answered by listening. */
  back?: string;
  /** Romanized English, shown only when romanization is on. */
  roman?: string;
  /** English meaning, always shown on the back. */
  note?: string;
  /** Bengali text to read aloud. */
  speak: string;
};
export type Deck = {
  id: string;
  segment: "reading" | "speaking" | "writing";
  title: string;
  blurb: string;
  /** Instruction shown above the card. */
  hint?: string;
  /** Play the audio when the card is flipped. */
  autoSpeak?: boolean;
  cards: Card[];
};

// New decks (vocabulary, numbers, phrases...) only need to be added here.
export const DECKS: Deck[] = [
  {
    id: "letters",
    segment: "reading",
    title: "Letters",
    blurb: "See the letter, recall its sound.",
    cards: LETTERS.map((l) => ({
      id: `l:${l.ch}`,
      front: l.ch,
      back: l.word ?? undefined,
      roman: l.word ? `${l.rom} · ${l.wrom}` : l.rom,
      note: l.wmean ?? undefined,
      speak: l.ch,
    })),
  },
  {
    id: "words",
    segment: "reading",
    title: "Example words",
    blurb: "See the Bengali word, recall how it sounds and what it means.",
    cards: LETTERS.filter((l) => l.word).map((l) => ({
      id: `w:${l.ch}`,
      front: l.word!,
      roman: l.wrom!,
      note: l.wmean!,
      speak: l.word!,
    })),
  },
  {
    id: "matras",
    segment: "reading",
    title: "Vowel signs",
    blurb: "See a letter with a vowel sign, recall the sound and the sign's name.",
    cards: SIGN_CARDS.map(([sign, roman, name, vowel]) => ({
      id: `m:${sign}`,
      front: `ক${sign}`,
      back: name,
      roman,
      note: `The sign for ${vowel}`,
      speak: `ক${sign}`,
    })),
  },
  {
    id: "matra-words",
    segment: "reading",
    title: "Words with vowel signs",
    blurb: "See a word, recall how to read it, what it means, and which sign it uses.",
    cards: SIGN_WORDS.map(([word, roman, name, meaning]) => ({
      id: `mw:${word}`,
      front: word,
      back: name,
      roman,
      note: meaning,
      speak: word,
    })),
  },
  {
    id: "numbers",
    segment: "reading",
    title: "Numbers",
    blurb: "See the numeral, recall the Bengali word.",
    cards: NUMBERS.map((n) => ({ id: `n:${n.value}`, front: n.numeral, back: n.word, roman: n.wrom, speak: n.word })),
  },
  {
    id: "say-numbers",
    segment: "speaking",
    title: "Say the number",
    blurb: "See the numeral, say it in Bengali, then check.",
    hint: "Say it aloud before you flip the card.",
    autoSpeak: true,
    cards: NUMBERS.map((n) => ({ id: `ns:${n.value}`, front: n.numeral, back: n.word, roman: n.wrom, speak: n.word })),
  },
  {
    id: "say-words",
    segment: "speaking",
    title: "Say the word",
    blurb: "See the meaning, say the Bengali word out loud, then check.",
    hint: "Say it aloud before you flip the card.",
    autoSpeak: true,
    cards: LETTERS.filter((l) => l.word).map((l) => ({
      id: `s:${l.ch}`,
      front: l.wmean!,
      back: l.word!,
      roman: l.wrom!,
      speak: l.word!,
    })),
  },
  {
    id: "write-words",
    segment: "writing",
    title: "Write the word",
    blurb: "See the meaning, write the word on paper, then check your spelling.",
    hint: "Write it on paper before you flip the card.",
    cards: LETTERS.filter((l) => l.word).map((l) => ({
      id: `r:${l.ch}`,
      front: l.wmean!,
      frontRoman: `sounds like “${l.wrom}”`,
      back: l.word!,
      speak: l.word!,
    })),
  },
];

export const ALL_CARD_IDS = new Set(DECKS.flatMap((d) => d.cards.map((c) => c.id)));

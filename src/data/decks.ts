import { LETTERS } from "./letters";
import { NUMBERS } from "./numbers";

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

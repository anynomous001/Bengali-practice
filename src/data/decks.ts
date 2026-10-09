import { LETTERS } from "./letters";

export type Card = {
  id: string;
  front: string;
  frontSub?: string;
  back: string;
  backSub?: string;
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
      back: l.rom,
      backSub: l.word ? `${l.word} (${l.wrom}) – ${l.wmean}` : undefined,
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
      back: l.wrom!,
      backSub: l.wmean!,
      speak: l.word!,
    })),
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
      backSub: l.wrom!,
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
      frontSub: `sounds like “${l.wrom}”`,
      back: l.word!,
      speak: l.word!,
    })),
  },
];

export const ALL_CARD_IDS = new Set(DECKS.flatMap((d) => d.cards.map((c) => c.id)));

import { LETTERS } from "./letters";

export type Card = {
  id: string;
  front: string;
  back: string;
  backSub?: string;
  /** Bengali text to read aloud. */
  speak: string;
};
export type Deck = { id: string; title: string; blurb: string; cards: Card[] };

// New decks (vocabulary, numbers, phrases...) only need to be added here.
export const DECKS: Deck[] = [
  {
    id: "letters",
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
];

export const ALL_CARD_IDS = new Set(DECKS.flatMap((d) => d.cards.map((c) => c.id)));

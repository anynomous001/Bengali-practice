// Things the landing page needs from the teacher. Everything here is optional: any section that depends on an
// empty value is left out of the page, so nothing is ever shown as a placeholder.

export type Quote = {
  text: string;
  name: string;
  city: string;
  kind: "heritage" | "partner" | "devotee" | "general";
  /** A path under /public, for example "/landing/quotes/anna.jpg". */
  photo?: string;
};

/** Student quotes. Add real ones only, with permission. */
export const QUOTES: Quote[] = [];

export const TEACHER: {
  name: string;
  photo?: string;
  videoSrc?: string;
  videoPoster?: string;
  captionsSrc?: string;
  /** A photo of one of the class worksheets. */
  worksheet?: string;
  /** Real numbers only, for example { label: "students taught", value: "120" }. */
  stats: { label: string; value: string }[];
  /** Where to book live lessons. When empty, no link is shown. */
  liveLessonsUrl?: string;
  story: string[];
} = {
  name: "Pritam",
  stats: [],
  story: [
    "I teach Bengali online, one to one, mostly to learners in the US.",
    "My students kept asking the same thing: where can I practice between lessons? There was no proper place to practice Bengali, only phrasebooks and a few flashcard decks.",
    "So I built one. Everything here comes from my own lessons and class worksheets: the alphabet, everyday words, grammar, and real conversations, with every answer explained.",
  ],
};

/**
 * Recorded pronunciations for the mini-quiz on the home page. Map the Bengali text to a file in
 * public/audio/landing/, for example { "ক": "ko.mp3" }. Without a file the browser's Bengali voice is used.
 */
export const CLIPS: Record<string, string> = {};

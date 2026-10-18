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
  nameBn: string;
  place: string;
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
  nameBn: "প্রীতম",
  place: "Kolkata",
  stats: [],
  story: [
    "I teach Bengali online, one to one, from Kolkata. Most of my students live in the USA. Some grew up hearing Bengali at the dinner table, some married into a Bengali family, and some want to read the bhajans they sing.",
    "We would have a good lesson, and then a week would pass with nothing to practice on. Worksheets got lost in email. Flashcards lived on scraps of paper. So I built a place for the work between lessons.",
    "Every lesson here comes from my real classes and worksheets: the same letters, the same stories, the same role plays I use with my students. You work through it at your own pace, ten minutes at a time.",
  ],
};

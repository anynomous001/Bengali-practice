export type Segment = "reading" | "speaking" | "writing";

type Item = { title: string; blurb: string };
export const SEGMENTS: Record<
  Segment,
  { title: string; bn: string; icon: string; blurb: string; activities: (Item & { href: string })[]; soon: Item[] }
> = {
  reading: {
    title: "Reading", bn: "পড়া", icon: "📖",
    blurb: "Recognise Bengali letters and words on the page.",
    activities: [
      { href: "/learn/reading/alphabet", title: "Alphabet", blurb: "Learn every letter, then quiz yourself: letter → word, word → letter." },
      { href: "/learn/reading/numbers", title: "Numbers & money", blurb: "Read numerals and prices in টাকা: numeral → word and word → numeral." },
      { href: "/learn/reading/flashcards", title: "Flashcards", blurb: "Spaced-repetition review of letters, words and numbers." },
    ],
    soon: [
      { title: "Short dialogues", blurb: "Read simple conversations." },
    ],
  },
  speaking: {
    title: "Speaking", bn: "বলা", icon: "🗣️",
    blurb: "Hear Bengali and say it out loud.",
    activities: [
      { href: "/learn/speaking/sounds", title: "Letter sounds", blurb: "Tap any letter to hear it, then take the listening quiz." },
      { href: "/learn/speaking/numbers", title: "Numbers & money listening", blurb: "Hear a number or price, pick the numeral." },
      { href: "/learn/speaking/flashcards", title: "Say it aloud", blurb: "See the English meaning, say the Bengali word, then check." },
    ],
    soon: [
      { title: "Pronunciation drills", blurb: "Listen and repeat tricky sounds." },
      { title: "Basic conversations", blurb: "Greetings, introductions, shopping." },
      { title: "Directions", blurb: "Asking for and giving directions." },
      { title: "Role-play", blurb: "Practise real situations." },
    ],
  },
  writing: {
    title: "Writing", bn: "লেখা", icon: "✍️",
    blurb: "Form the letters and spell words yourself.",
    activities: [
      { href: "/learn/writing/trace", title: "Trace letters", blurb: "Draw each letter with your finger or mouse over a guide." },
      { href: "/learn/writing/words", title: "Build the word", blurb: "Arrange the pieces to spell a word from its meaning." },
      { href: "/learn/writing/sentences", title: "Build the sentence", blurb: "Put the words in order to make a sentence." },
      { href: "/learn/writing/flashcards", title: "Write it down", blurb: "See the meaning, write the word on paper, then check." },
    ],
    soon: [
      { title: "Write numerals", blurb: "০ to ৯ and bigger numbers." },
    ],
  },
};

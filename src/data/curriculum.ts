// The course structure: course -> modules -> lessons. Each lesson points at an existing practice page.
// Progress is stored per lesson id in `lesson_progress`. To add a lesson, add it here and wrap its page in <LessonFrame lessonId="...">.
// Only import this from server code (it pulls in the lesson data).
import { STORIES } from "./stories";
import { GRAMMAR } from "./grammar";
import { WORKOUT } from "./tense-workout";
import { VOCAB, VOCAB_GROUPS, wordCount } from "./vocabulary";

export type CourseId = "reading" | "speaking" | "vocabulary" | "grammar";
export type Kind = "Lesson" | "Practice" | "Quiz" | "Review";
export type Lesson = { id: string; title: string; blurb: string; href: string; kind: Kind };
export type Module = { id: string; title: string; blurb: string; lessons: Lesson[] };
export type Course = {
  id: CourseId; title: string; bn: string; blurb: string; outcomes: string[];
  modules: Module[]; upcoming: { title: string; blurb: string }[];
  /** Extra tools linked from the course page (not lessons). */
  tools?: { label: string; href: string; blurb: string }[];
};

const topic = (id: string): Lesson => {
  const t = GRAMMAR.find((g) => g.id === id)!;
  return { id: `grammar/${id}`, title: t.title[2], blurb: t.blurb, href: `/learn/grammar/${id}`, kind: "Lesson" };
};

export const COURSES: Course[] = [
  {
    id: "reading", title: "Reading", bn: "পড়া",
    blurb: "From the first letter to whole stories: learn to recognise Bengali on the page.",
    outcomes: [
      "Recognise all the vowels, consonants and special signs",
      "Read vowel signs (কার) and know where they sit on a letter",
      "Read numerals and prices in টাকা",
      "Read seven short fables, first word by word and then as one story",
    ],
    modules: [
      { id: "script", title: "The script", blurb: "Letters first, then the signs that change how they sound.", lessons: [
        { id: "reading/alphabet", title: "Alphabet", blurb: "Every vowel and consonant, with a quiz: letter to word and word to letter.", href: "/learn/reading/alphabet", kind: "Lesson" },
        { id: "reading/matras", title: "Vowel signs (কার)", blurb: "What each sign looks like, where it goes, and how to read it.", href: "/learn/reading/matras", kind: "Lesson" },
      ] },
      { id: "numbers", title: "Numbers and money", blurb: "Read the numerals you will see on prices and signs.", lessons: [
        { id: "reading/numbers", title: "Numbers and money", blurb: "Numeral to word and word to numeral, with prices in টাকা.", href: "/learn/reading/numbers", kind: "Practice" },
      ] },
      { id: "stories", title: "Stories", blurb: "Short fables, each in layers: words, Bengali only, line by line, English, quiz.", lessons:
        STORIES.map((s) => ({ id: `reading/story-${s.id}`, title: s.title[2], blurb: `${s.title[0]} · Level ${s.level} · ${s.lines.length + 1} lines`, href: `/learn/reading/stories/${s.id}`, kind: "Quiz" as Kind })) },
      { id: "review", title: "Review", blurb: "Spaced repetition keeps what you learned.", lessons: [
        { id: "reading/flashcards", title: "Reading flashcards", blurb: "Letters, vowel signs, words and numbers. Cards you miss come back sooner.", href: "/learn/reading/flashcards", kind: "Review" },
      ] },
    ],
    upcoming: [{ title: "Short dialogues", blurb: "Read simple conversations." }],
  },
  {
    id: "speaking", title: "Speaking", bn: "বলা",
    blurb: "Hear Bengali, then say it out loud: sounds, numbers and everyday words.",
    outcomes: [
      "Tell similar Bengali sounds apart by ear",
      "Understand numbers and prices when you hear them",
      "Say words aloud, slowly or at normal speed, and check yourself",
    ],
    tools: [{ label: "Vocabulary course", href: "/learn/vocabulary", blurb: "Build your word bank, topic by topic, with phrases to say aloud." }],
    modules: [
      { id: "sounds", title: "Sounds", blurb: "Tap a letter to hear it, then test your ear.", lessons: [
        { id: "speaking/sounds", title: "Letter sounds", blurb: "Listen to every letter, then take the listening quiz.", href: "/learn/speaking/sounds", kind: "Lesson" },
      ] },
      { id: "numbers", title: "Numbers and money", blurb: "Understand what you hear at the market.", lessons: [
        { id: "speaking/numbers", title: "Numbers and money listening", blurb: "Hear a number or price and pick the numeral.", href: "/learn/speaking/numbers", kind: "Practice" },
      ] },
      { id: "say", title: "Say it aloud", blurb: "See the meaning, say the word, then check.", lessons: [
        { id: "speaking/flashcards", title: "Say-it-aloud flashcards", blurb: "English first: say the Bengali word before you reveal it.", href: "/learn/speaking/flashcards", kind: "Review" },
      ] },
    ],
    upcoming: [
      { title: "Pronunciation drills", blurb: "Listen and repeat tricky sounds." },
      { title: "Basic conversations", blurb: "Greetings, introductions, shopping." },
      { title: "Directions", blurb: "Asking for and giving directions." },
      { title: "Role-play", blurb: "Practise real situations." },
    ],
  },
  {
    id: "vocabulary", title: "Vocabulary", bn: "শব্দভান্ডার",
    blurb: "A large word bank, topic by topic, with phrases that show every topic's words in use.",
    outcomes: [
      `Learn about ${Math.round(VOCAB.reduce((n, t) => n + wordCount(t), 0) / 50) * 50} everyday words in ${VOCAB.length} topics`,
      `Hear each word and see it in the Bengali script, romanized and in English`,
      `Use the words in about ${Math.round(VOCAB.reduce((n, t) => n + t.phrases.length, 0) / 10) * 10} example phrases`,
      "Test yourself with practice rounds and spaced-repetition flashcards",
    ],
    tools: [{ label: "Word finder", href: "/learn/vocabulary/search", blurb: "Search every word by Bengali, romanized or English." }],
    modules: [
      ...VOCAB_GROUPS.map((g): Module => ({
        id: g.id, title: g.title, blurb: g.blurb,
        lessons: VOCAB.filter((t) => t.group === g.id).map((t): Lesson => ({
          id: `vocabulary/${t.id}`, title: t.title[2],
          blurb: `${wordCount(t)} words, ${t.phrases.length} phrases · ${t.title[0]}`,
          href: `/learn/vocabulary/${t.id}`, kind: "Lesson",
        })),
      })),
      { id: "review", title: "Review", blurb: "Spaced repetition keeps the words in your memory.", lessons: [
        { id: "vocabulary/flashcards", title: "Vocabulary flashcards", blurb: "One deck per topic: see the meaning, say the word, then check.", href: "/learn/vocabulary/flashcards", kind: "Review" },
      ] },
    ],
    upcoming: [],
  },
  {
    id: "grammar", title: "Grammar", bn: "ব্যাকরণ",
    blurb: "How Bengali works: persons, verbs, tenses, karak and bibhakti, with practice at every step.",
    outcomes: [
      "Use the right pronoun for who is speaking and how polite to be",
      "Build verb forms in the present, past and future for every person",
      "Understand karak and bibhakti: the job each noun does and its endings",
      "Make plurals, count things, say no and ask questions",
    ],
    modules: [
      { id: "foundations", title: "Foundations", blurb: "Who is speaking, and the verb at the heart of the sentence.", lessons: [topic("purush"), topic("kriya")] },
      { id: "tenses", title: "Tenses", blurb: "Present, past and future with full tables for every person.", lessons: [topic("kal")] },
      { id: "workout", title: "Tense workout", blurb: "Ten rounds of drills: cues, negatives, spot the mistake, translate, rewrite and combine.", lessons:
        WORKOUT.map((r, i) => ({ id: `grammar/w-${r.id}`, title: `Round ${i + 1}: ${r.title}`, blurb: r.mode === "check" ? `${r.items.length} items, checked for you` : `${r.items.length} items, write then check`, href: `/learn/grammar/workout/${r.id}`, kind: "Practice" as Kind })) },
      { id: "cases", title: "Karak and bibhakti", blurb: "The job each noun does for the verb, and the endings that show it.", lessons: [topic("karak"), topic("bibhakti")] },
      { id: "sentences", title: "Building sentences", blurb: "Plurals, counting, saying no, and asking.", lessons: [topic("bachan"), topic("nishedh")] },
    ],
    upcoming: [],
  },
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);

export type Located = { course: Course; module: Module; lesson: Lesson; prev: Lesson | null; next: Lesson | null };

export function findLesson(id: string): Located | null {
  for (const course of COURSES) {
    const flat = course.modules.flatMap((m) => m.lessons.map((l) => ({ m, l })));
    const i = flat.findIndex((x) => x.l.id === id);
    if (i >= 0) return { course, module: flat[i].m, lesson: flat[i].l, prev: flat[i - 1]?.l ?? null, next: flat[i + 1]?.l ?? null };
  }
  return null;
}

export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
export const isLessonId = (id: string) => COURSES.some((c) => allLessons(c).some((l) => l.id === id));

/** Counts for one course given the set of completed lesson ids. */
export function courseStats(c: Course, done: ReadonlySet<string>) {
  const lessons = allLessons(c);
  const n = lessons.filter((l) => done.has(l.id)).length;
  const next = lessons.find((l) => !done.has(l.id)) ?? null;
  return { done: n, total: lessons.length, pct: lessons.length ? Math.round((n / lessons.length) * 100) : 0, next };
}

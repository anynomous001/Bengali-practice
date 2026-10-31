// The course structure: course -> modules -> lessons. Each lesson points at an existing practice page.
// Progress is stored per lesson id in `lesson_progress`. To add a lesson, add it here and wrap its page in <LessonFrame lessonId="...">.
// Only import this from server code (it pulls in the lesson data).
import { STORIES } from "./stories";
import { GRAMMAR } from "./grammar";
import { WORKOUT } from "./tense-workout";
import { VOCAB, VOCAB_GROUPS, wordCount } from "./vocabulary";
import { getExam } from "./exams";
import { CLASSWORK } from "./classwork";
import { SCENARIOS } from "./roleplay";
import { DEV_VOCAB, DEV_READING, DEV_SCENARIOS, DEV_CLASSWORK } from "./devotional";
import { DEV_STORIES } from "./devotional-stories";

export type CourseId = "reading" | "speaking" | "vocabulary" | "grammar" | "listening" | "kids";
export type Kind = "Lesson" | "Practice" | "Quiz" | "Review" | "Exam";
export type Lesson = { id: string; title: string; blurb: string; href: string; kind: Kind; /** Who it is for, such as "Clinical". */ tag?: string };
/** `devotional` modules are tagged "Devotional", kept apart from the main course, and not counted in its progress. */
export type Module = { id: string; title: string; blurb: string; lessons: Lesson[]; devotional?: boolean };
export type Course = {
  id: CourseId; title: string; bn: string; blurb: string; outcomes: string[];
  modules: Module[]; upcoming: { title: string; blurb: string }[];
  /** Extra tools linked from the course page (not lessons). */
  tools?: { label: string; href: string; blurb: string }[];
};

const exam = (id: string): Lesson => {
  const e = getExam(id)!;
  return { id: e.lessonId, title: e.title, blurb: `${e.count} questions in ${e.minutes} minutes. Pass with ${e.pass}%.`, href: e.href, kind: "Exam" };
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
      { id: "numbers", title: "Numbers, money and time", blurb: "Numbers, prices, days and months: learn them, then practise.", lessons: [
        { id: "reading/numbers", title: "Numbers, money and time", blurb: "Numbers 0 to 100, prices in টাকা, days and months, then a quiz.", href: "/learn/reading/numbers", kind: "Lesson" },
      ] },
      { id: "stories", title: "Stories", blurb: "Short fables, each in layers: words, Bengali only, line by line, English, quiz.", lessons:
        STORIES.map((s) => ({ id: `reading/story-${s.id}`, title: s.title[2], blurb: `${s.title[0]} · Level ${s.level} · ${s.lines.length + 1} lines`, href: `/learn/reading/stories/${s.id}`, kind: "Quiz" as Kind })) },
      { id: "devotional", devotional: true, title: "Devotional reading", blurb: "Read the words, the nām, the verse decoder, short lines, eight short passages, a bhajan, mantras and prayers. Kept separate from the main course.", lessons:
        [
          ...DEV_READING.map((d): Lesson => ({ id: d.lessonId, title: d.title[2], blurb: `${d.sections.reduce((n, s) => n + s.words.length, 0)} items · ${d.title[0]}`, href: `/learn/reading/devotional/${d.id}`, kind: "Lesson" })),
          ...DEV_STORIES.map((s): Lesson => ({ id: `reading/${s.id}`, title: s.title[2], blurb: `${s.lines.length} lines · Level ${s.level} · ${s.source.startsWith("Rāmdās") ? "Rāmdās Charitāmṛta" : "Kathāmṛta"}`, href: `/learn/reading/devotional/stories/${s.id}`, kind: "Quiz" })),
        ] },
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
      "Handle real situations: bargaining, rickshaws, restaurants and asking the way",
      "Speak on a topic you have never seen before, against the clock",
    ],
    tools: [
      { label: "Vocabulary course", href: "/learn/vocabulary", blurb: "Build your word bank, topic by topic, with phrases to say aloud." },
      { label: "Devotional phrases aloud", href: "/learn/speaking/flashcards?deck=dev-say", blurb: "Devotional: greetings and everyday phrases of the sādhu-saṅga, to say out loud." },
    ],
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
      { id: "roleplay", title: "Role play", blurb: "Real situations: the words, the phrases, and two example conversations each. Then you speak.", lessons:
        SCENARIOS.map((r): Lesson => ({ id: `speaking/roleplay-${r.id}`, title: r.title, blurb: r.blurb, href: `/learn/speaking/roleplay/${r.id}`, kind: "Practice" })) },
      { id: "impromptu", title: "Free speaking", blurb: "Speak on a topic you have never seen, or build a story with a partner.", lessons: [
        { id: "speaking/impromptu", title: "Impromptu topics", blurb: "Choose the kind of topic and how long to prepare and speak. The app picks the topic and keeps time.", href: "/learn/speaking/impromptu", kind: "Practice" },
        { id: "speaking/story-relay", title: "Story relay", blurb: "Build one story together, taking turns of 2 to 3 sentences. Free, or with a tense card each turn.", href: "/learn/speaking/story-relay", kind: "Practice" },
      ] },
      { id: "devotional", devotional: true, title: "Devotional speaking", blurb: "Greetings, prasād and farewells in the sādhu-saṅga, with role plays and say-it-aloud cards. Kept separate from the main course.", lessons: [
        ...DEV_SCENARIOS.map((r): Lesson => ({ id: `speaking/roleplay-${r.id}`, title: r.title, blurb: r.blurb, href: `/learn/speaking/roleplay/${r.id}`, kind: "Practice" })),
      ] },
      { id: "exam", title: "Exam", blurb: "A timed listening test.", lessons: [exam("listening")] },
    ],
    upcoming: [
      { title: "Pronunciation drills", blurb: "Listen and repeat tricky sounds." },
      { title: "More role plays", blurb: "Bank, post office and shopping for groceries." },
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
      { id: "devotional", devotional: true, title: "Devotional vocabulary", blurb: "Greetings, forms of address, practice words, action words, music, food, places, numbers and question words of the sādhu-saṅga. Kept separate from the main course.", lessons:
        DEV_VOCAB.filter((d) => d.part !== "phrases").map((d): Lesson => ({ id: d.lessonId, title: d.title[2], blurb: `${d.sections.reduce((n, s) => n + s.words.length, 0)} items · ${d.title[0]}`, href: `/learn/vocabulary/${d.id}`, kind: "Lesson" })) },
      { id: "devotional-phrases", devotional: true, title: "Devotional phrases", blurb: "What to say at the temple, at kīrtan, about your own path, on festivals and in messages. Kept separate from the main course.", lessons:
        DEV_VOCAB.filter((d) => d.part === "phrases").map((d): Lesson => ({ id: d.lessonId, title: d.title[2], blurb: `${d.sections.reduce((n, s) => n + s.words.length, 0)} phrases · ${d.title[0]}`, href: `/learn/vocabulary/${d.id}`, kind: "Lesson" })) },
      { id: "review", title: "Review", blurb: "Spaced repetition keeps the words in your memory.", lessons: [
        { id: "vocabulary/flashcards", title: "Vocabulary flashcards", blurb: "One deck per topic: see the meaning, say the word, then check.", href: "/learn/vocabulary/flashcards", kind: "Review" },
      ] },
      { id: "exam", title: "Exam", blurb: "A timed test of words from every topic.", lessons: [exam("vocabulary")] },
    ],
    upcoming: [],
  },
  {
    id: "grammar", title: "Grammar", bn: "ব্যাকরণ",
    blurb: "How Bengali works: persons, verbs, tenses, karak and bibhakti, number, negatives and sentence building, with practice, translation and an exam.",
    outcomes: [
      "Use the right pronoun and verb ending for who is speaking and how polite to be",
      "Build every tense (present, past and future) and choose the right one",
      "Read karak and bibhakti: the job of each noun and the endings and little words that show it",
      "Say one and many, count things, say no, ask questions and build whole sentences",
      "Translate both ways and test yourself in a timed exam",
    ],
    modules: [
      { id: "foundations", title: "Foundations", blurb: "Who is speaking and who is spoken to, and the verb at the heart of the sentence.", lessons: [topic("purush"), topic("kriya")] },
      { id: "tenses", title: "Tenses", blurb: "The nine tenses in depth: the big picture, present, past and future, verb tables, and ten practice rounds.", lessons: [
        topic("kal"), topic("tense-present"), topic("tense-past"), topic("tense-future"), topic("tense-tables"),
        ...WORKOUT.map((r, i): Lesson => ({ id: `grammar/w-${r.id}`, title: `Practice round ${i + 1}: ${r.title}`, blurb: r.mode === "check" ? `${r.items.length} items, checked for you` : `${r.items.length} items, write then check`, href: `/learn/grammar/workout/${r.id}`, kind: "Practice" })),
      ] },
      { id: "cases", title: "Karak and bibhakti", blurb: "The job each noun does for the verb, and the endings and little words that show it.", lessons: [topic("karak"), topic("bibhakti")] },
      { id: "sentences", title: "Building sentences", blurb: "Singular and plural, gender, counting, saying no and asking, word order and joining ideas.", lessons: [topic("bachan"), topic("ling"), topic("nishedh"), topic("vakya")] },
      { id: "classwork", title: "Class exercises", blurb: "The kinds of exercises done in class: build, fix, translate, transform and combine sentences.", lessons: CLASSWORK.map((c): Lesson => ({ id: `grammar/class-${c.id}`, title: c.title, blurb: c.blurb, href: `/learn/grammar/class/${c.id}`, kind: "Practice" })) },
      { id: "translate", title: "Translation", blurb: "Turn English into Bengali and Bengali into English, quickly and often.", lessons: [
        { id: "grammar/translate", title: "Quick translation", blurb: "Ten sentences a round, in either direction. Pick the answer, or think it and check.", href: "/learn/grammar/translate", kind: "Practice" },
        { id: "grammar/drills", title: "Translation drills by tense", blurb: "Worksheets of English sentences to turn into Bengali. Pick your tenses, then easy, medium, hard or a step-up round.", href: "/learn/grammar/drills", kind: "Practice" },
      ] },
      { id: "devotional", devotional: true, title: "Devotional practice", blurb: "Complete lines, say things politely and spell devotional words the Bengali way. Kept separate from the main course.", lessons:
        DEV_CLASSWORK.map((c): Lesson => ({ id: `grammar/class-${c.id}`, title: c.title, blurb: c.blurb, href: `/learn/grammar/class/${c.id}`, kind: "Practice" })) },
      { id: "exam", title: "Exam", blurb: "A timed test across the whole course.", lessons: [exam("grammar")] },
    ],
    upcoming: [],
  },
  {
    id: "kids", title: "Kids", bn: "ছোটদের",
    blurb: "Picture lessons and games for young children. See the picture, hear the Bengali word, then say what it is.",
    outcomes: [
      "Name the colours and the parts of the body in Bengali",
      "Answer \"এটা কী?\" (what is this?) in Bengali",
      "Understand spoken Bengali words by pointing, acting and fetching",
    ],
    modules: [
      { id: "colours", title: "Colours", blurb: "Twelve colours with a picture each. Tap to hear, then name each colour.", lessons: [
        { id: "kids/colours-learn", title: "Colour cards", blurb: "Tap a colour to hear it. Tap again to hear it slowly.", href: "/learn/kids/colours/learn", kind: "Lesson", tag: "Kids" },
        { id: "kids/colours-quiz", title: "What colour is this?", blurb: "A colour appears. Say it in Bengali, or pick the word.", href: "/learn/kids/colours/quiz", kind: "Quiz", tag: "Kids" },
        { id: "kids/game-potion", title: "Potion Class", blurb: "Roll the colour dice, find something that colour and brew a potion.", href: "/learn/kids/games/potion", kind: "Practice", tag: "Kids" },
      ] },
      { id: "body", title: "Body parts", blurb: "The parts of the body on a real child, with a glowing ring on each one.", lessons: [
        { id: "kids/body-learn", title: "Body part cards", blurb: "Tap a part to hear its name. Tap again to hear it slowly.", href: "/learn/kids/body-parts/learn", kind: "Lesson", tag: "Kids" },
        { id: "kids/body-quiz", title: "What is this?", blurb: "A body part glows. Say what it is in Bengali, or pick the word.", href: "/learn/kids/body-parts/quiz", kind: "Quiz", tag: "Kids" },
        { id: "kids/game-body", title: "Wizard Body Check", blurb: "Learn the words, find the part, and follow spell commands.", href: "/learn/kids/games/body", kind: "Practice", tag: "Kids" },
      ] },
      { id: "numbers", title: "Numbers", blurb: "Count from one to ten with pictures of things to count.", lessons: [
        { id: "kids/numbers-learn", title: "Number cards", blurb: "Tap a number to hear it. Count the things in the picture.", href: "/learn/kids/numbers/learn", kind: "Lesson", tag: "Kids" },
        { id: "kids/numbers-quiz", title: "How many?", blurb: "Count the things, then say the number in Bengali.", href: "/learn/kids/numbers/quiz", kind: "Quiz", tag: "Kids" },
      ] },
      { id: "animals", title: "Animals", blurb: "Real photos of twelve animals.", lessons: [
        { id: "kids/animals-learn", title: "Animal cards", blurb: "Tap an animal to hear its name. Tap again to hear it slowly.", href: "/learn/kids/animals/learn", kind: "Lesson", tag: "Kids" },
        { id: "kids/animals-quiz", title: "What is this animal?", blurb: "A photo appears. Say the animal in Bengali, or pick the word.", href: "/learn/kids/animals/quiz", kind: "Quiz", tag: "Kids" },
        { id: "kids/game-creatures", title: "Mystery Wizard", blurb: "Guess the creature behind the magic curtain.", href: "/learn/kids/games/creatures", kind: "Practice", tag: "Kids" },
      ] },
      { id: "fruits", title: "Fruits", blurb: "Real photos of twelve fruits.", lessons: [
        { id: "kids/fruits-learn", title: "Fruit cards", blurb: "Tap a fruit to hear its name. Tap again to hear it slowly.", href: "/learn/kids/fruits/learn", kind: "Lesson", tag: "Kids" },
        { id: "kids/fruits-quiz", title: "What fruit is this?", blurb: "A photo appears. Say the fruit in Bengali, or pick the word.", href: "/learn/kids/fruits/quiz", kind: "Quiz", tag: "Kids" },
      ] },
    ],
    upcoming: [
      { title: "More pictures", blurb: "Family, days of the week and food, each with real pictures." },
    ],
    tools: [{ label: "All the games", href: "/learn/kids/games", blurb: "Spell School: body, colour and creature games." }],
  },
  {
    id: "listening", title: "Listening", bn: "শোনা",
    blurb: "Train your ear: hear a story told slowly, answer questions about it, and practise understanding what people say.",
    outcomes: [
      "Follow a short Bengali story that is told slowly",
      "Understand what a patient, a shopkeeper or a relative says",
      "Read the romanization and the English only when you want them",
    ],
    modules: [
      { id: "stories", title: "Stories", blurb: "Hear the story slowly as often as you like. Then read it with romanization if you want, answer questions, and read it in English.", lessons: [
        { id: "listening/story-dipak-sen", title: "Dipak Sen's voice", blurb: "A teacher with a hoarse voice visits a speech therapist, who checks his voice and his memory.", href: "/learn/listening/story/dipak-sen", kind: "Practice", tag: "Clinical" },
      ] },
      { id: "activities", title: "Listening activities", blurb: "Hear it, then show that you understood.", lessons: [
        { id: "listening/patient", title: "Understand your patient", blurb: "Hear what a patient says and pick what it means.", href: "/learn/listening/patient", kind: "Practice", tag: "Clinical" },
        { id: "listening/memory", title: "Three-word memory game", blurb: "Hear three words, count backwards, then pick them from a list.", href: "/learn/listening/memory", kind: "Practice", tag: "Clinical" },
      ] },
    ],
    upcoming: [
      { title: "More stories", blurb: "At the market, on a journey and with the family." },
    ],
  },
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);

export type Located = { course: Course; module: Module; lesson: Lesson; prev: Lesson | null; next: Lesson | null };

export function findLesson(id: string): Located | null {
  for (const course of COURSES) {
    const all = course.modules.flatMap((m) => m.lessons.map((l) => ({ m, l })));
    const at = all.find((x) => x.l.id === id);
    if (!at) continue;
    // Previous and next stay inside the same track: devotional lessons are not part of the main course.
    const flat = all.filter((x) => !!x.m.devotional === !!at.m.devotional);
    const i = flat.findIndex((x) => x.l.id === id);
    if (i >= 0) return { course, module: flat[i].m, lesson: flat[i].l, prev: flat[i - 1]?.l ?? null, next: flat[i + 1]?.l ?? null };
  }
  return null;
}

export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
/** The main course, without the devotional track. */
export const coreLessons = (c: Course) => c.modules.filter((m) => !m.devotional).flatMap((m) => m.lessons);
export const devotionalLessons = (c: Course) => c.modules.filter((m) => m.devotional).flatMap((m) => m.lessons);
export const isLessonId = (id: string) => COURSES.some((c) => allLessons(c).some((l) => l.id === id));

/** Counts for one course given the set of completed lesson ids. */
export function courseStats(c: Course, done: ReadonlySet<string>, devotional = false) {
  const lessons = devotional ? devotionalLessons(c) : coreLessons(c);
  const n = lessons.filter((l) => done.has(l.id)).length;
  const next = lessons.find((l) => !done.has(l.id)) ?? null;
  return { done: n, total: lessons.length, pct: lessons.length ? Math.round((n / lessons.length) * 100) : 0, next };
}

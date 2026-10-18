// Exam definitions. The questions are generated fresh for every attempt (see lib/examgen.ts) and graded on the server.
export type ExamId = "grammar" | "vocabulary" | "listening";
export type ExamDef = {
  id: ExamId;
  course: "grammar" | "vocabulary" | "speaking";
  title: string;
  blurb: string;
  minutes: number;
  count: number;
  /** Percentage needed to pass. */
  pass: number;
  lessonId: string;
  href: string;
};

export const EXAMS: ExamDef[] = [
  { id: "grammar", course: "grammar", title: "Grammar exam", blurb: "Persons, verbs, tenses, karak and bibhakti, number, negatives, word order and translation, all mixed.", minutes: 25, count: 20, pass: 60, lessonId: "grammar/exam", href: "/learn/grammar/exam" },
  { id: "vocabulary", course: "vocabulary", title: "Vocabulary exam", blurb: "Words from every topic: Bengali to English, English to Bengali, and listening.", minutes: 12, count: 25, pass: 60, lessonId: "vocabulary/exam", href: "/learn/vocabulary/exam" },
  { id: "listening", course: "speaking", title: "Alphabet & numbers exam", blurb: "Letters, numbers and everyday words, with a few listening questions. Turn your sound on for those.", minutes: 10, count: 15, pass: 60, lessonId: "speaking/exam", href: "/learn/speaking/exam" },
];
export const getExam = (id: string) => EXAMS.find((e) => e.id === id);

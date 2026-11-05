// What a free preview account can open: a tasting menu with one sample of each skill. Everything else shows a lock.
import { COURSES, allLessons } from "./curriculum";

/** Lesson ids open in the free preview. */
export const PREVIEW_LESSONS = [
  "reading/alphabet",        // reading
  "speaking/sounds",         // speaking and listening
  "speaking/numbers",        // listening
  "vocabulary/family",       // vocabulary
  "grammar/purush",          // grammar
  "kids/body-learn", "kids/body-quiz", "kids/game-creatures", // kids
];
/** Course pages and tools that are open so a visitor can see the whole syllabus. */
const OPEN_PATHS = ["/learn", "/learn/locked", "/learn/feedback", "/learn/writing", "/learn/writing/trace", "/learn/kids/games"];
const COURSE_IDS = ["reading", "speaking", "listening", "vocabulary", "grammar", "writing", "kids"];

const lessonHref = (id: string) => COURSES.flatMap((c) => allLessons(c)).find((l) => l.id === id)?.href;
export const isPreviewLesson = (id: string) => PREVIEW_LESSONS.includes(id);

/** Whether a preview account may open this path. */
export function previewAllows(path: string): boolean {
  const p = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (OPEN_PATHS.includes(p) || COURSE_IDS.some((c) => p === `/learn/${c}`)) return true;
  return PREVIEW_LESSONS.some((id) => {
    const href = lessonHref(id);
    return !!href && (p === href || p.startsWith(href + "/"));
  });
}

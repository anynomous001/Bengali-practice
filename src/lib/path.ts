import { query } from "./db";
import { findLesson, type Lesson } from "@/data/curriculum";
import { getGoal, type PathGoal, type Reads } from "@/data/paths";
import { EXAMS } from "@/data/exams";

export type Chosen = { goal: PathGoal; reads: Reads };

/** The student's chosen goal, or null when they have not picked one (or it was removed from the list). */
export async function loadChosen(email: string): Promise<Chosen | null> {
  const row = (await query<{ goal: string; reads: string }>("SELECT goal, reads FROM student_path WHERE email = $1", [email]))[0];
  const goal = row && getGoal(row.goal);
  if (!row || !goal) return null;
  return { goal, reads: (["no", "little", "yes"].includes(row.reads) ? row.reads : "no") as Reads };
}

/** Minutes for lessons that are longer or shorter than their kind suggests. */
const MINUTES_OVERRIDE: Record<string, number> = {
  "reading/alphabet": 25, "reading/matras": 15, "reading/numbers": 15, "speaking/sounds": 10, "speaking/numbers": 8,
  "speaking/impromptu": 10, "speaking/story-relay": 10, "grammar/translate": 8,
};

/** A rough time for one lesson, so a student can plan. These are estimates, not measured. */
export function lessonMinutes(lesson: Lesson, courseId: string): number {
  if (MINUTES_OVERRIDE[lesson.id]) return MINUTES_OVERRIDE[lesson.id];
  if (lesson.kind === "Exam") return EXAMS.find((e) => e.lessonId === lesson.id)?.minutes ?? 10;
  if (lesson.kind === "Review") return 5;
  if (lesson.kind === "Quiz") return 10; // the story lessons: read in layers, then a quiz
  if (lesson.kind === "Practice") return lesson.id.startsWith("speaking/roleplay") ? 10 : 8;
  return courseId === "grammar" ? 15 : courseId === "speaking" ? 8 : 10;
}

/** "45 min" or "2 h 10 min". */
export function fmtMinutes(m: number): string {
  const r = Math.max(0, Math.round(m / 5) * 5);
  return r < 60 ? `${r || 5} min` : r % 60 ? `${Math.floor(r / 60)} h ${r % 60} min` : `${r / 60} h`;
}

export type BuiltStep = { lesson: Lesson; course: string; why: string; done: boolean; minutes: number };
export type BuiltStage = { title: string; blurb: string; steps: BuiltStep[]; skipped: boolean; minutesLeft: number };
export type BuiltPath = {
  stages: BuiltStage[]; total: number; done: number; next: BuiltStep | null; nextStage: string | null;
  /** Estimated minutes still to go, and how many days that is at ten minutes a day. */
  minutesLeft: number; daysAtTen: number;
};

/** Turns a goal and the set of finished lessons into stages with ticks, the totals and the next step. Steps whose lesson no longer exists are dropped. */
export function buildPath(goal: PathGoal, reads: Reads, doneIds: ReadonlySet<string>): BuiltPath {
  const stages: BuiltStage[] = goal.stages.map((s) => ({
    title: s.title,
    blurb: s.blurb,
    skipped: !!s.script && reads === "yes",
    steps: s.steps.flatMap((st) => {
      const found = findLesson(st.id);
      return found ? [{ lesson: found.lesson, course: found.course.title, why: st.why, done: doneIds.has(st.id), minutes: lessonMinutes(found.lesson, found.course.id) }] : [];
    }),
    minutesLeft: 0,
  }));
  for (const s of stages) s.minutesLeft = s.skipped ? 0 : s.steps.filter((x) => !x.done).reduce((n, x) => n + x.minutes, 0);
  const minutesLeft = stages.reduce((n, s) => n + s.minutesLeft, 0);
  const counted = stages.filter((s) => !s.skipped).flatMap((s) => s.steps);
  const nextStage = stages.find((s) => !s.skipped && s.steps.some((x) => !x.done));
  return {
    stages,
    total: counted.length,
    done: counted.filter((x) => x.done).length,
    next: nextStage?.steps.find((x) => !x.done) ?? null,
    nextStage: nextStage?.title ?? null,
    minutesLeft,
    daysAtTen: Math.ceil(minutesLeft / 10),
  };
}

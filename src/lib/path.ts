import { query } from "./db";
import { findLesson, type Lesson } from "@/data/curriculum";
import { getGoal, type PathGoal, type PathStage, type Reads } from "@/data/paths";
import { EXAMS } from "@/data/exams";

export type Chosen = { goals: PathGoal[]; reads: Reads };

/** The student's chosen goals, in the order they picked them, or null when they have not picked any (or all were removed from the list). */
export async function loadChosen(email: string): Promise<Chosen | null> {
  const row = (await query<{ reads: string }>("SELECT reads FROM student_path WHERE email = $1", [email]))[0];
  const rows = await query<{ goal: string }>("SELECT goal FROM student_goals WHERE email = $1 ORDER BY position, goal", [email]);
  const goals = rows.flatMap((r) => { const g = getGoal(r.goal); return g ? [g] : []; });
  if (!row || !goals.length) return null;
  return { goals, reads: (["no", "little", "yes"].includes(row.reads) ? row.reads : "no") as Reads };
}

/** A heading for the path: the goal's own title, or the short labels joined for a combined path. */
export function pathTitle(goals: PathGoal[]): string {
  return goals.length === 1 ? goals[0].title : goals.map((g) => g.tag).join(" + ");
}

export function pathBlurb(goals: PathGoal[]): string {
  if (goals.length === 1) return goals[0].blurb;
  const names = goals.map((g) => g.title.toLowerCase());
  return `One path for all your goals: ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}. A lesson that helps more than one goal appears once, with a tag for each.`;
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

export type BuiltStep = { lesson: Lesson; course: string; why: string; done: boolean; minutes: number; tags: string[] };
export type BuiltStage = { title: string; blurb: string; steps: BuiltStep[]; skipped: boolean; minutesLeft: number; tags: string[] };
export type BuiltPath = {
  stages: BuiltStage[]; total: number; done: number; next: BuiltStep | null; nextStage: string | null;
  /** Estimated minutes still to go, and how many days that is at ten minutes a day. */
  minutesLeft: number; daysAtTen: number;
};

/**
 * Turns the chosen goals and the set of finished lessons into stages with ticks, the totals and the next step.
 * With several goals the stages are interleaved (the first stage of each goal, then the second of each, and so on), the letters come first,
 * and a lesson that two goals share is shown once with a tag for each. Steps whose lesson no longer exists are dropped.
 */
export function buildPath(goals: PathGoal[], reads: Reads, doneIds: ReadonlySet<string>): BuiltPath {
  const multi = goals.length > 1;
  const stages: BuiltStage[] = [];
  const placed = new Map<string, BuiltStep>();
  const add = (goal: PathGoal, s: PathStage) => {
    let stage = stages.find((x) => x.title === s.title);
    if (!stage) {
      stage = { title: s.title, blurb: s.blurb, steps: [], skipped: !!s.script && reads === "yes", minutesLeft: 0, tags: [] };
      stages.push(stage);
    }
    if (multi && !stage.tags.includes(goal.tag)) stage.tags.push(goal.tag);
    for (const st of s.steps) {
      const have = placed.get(st.id);
      if (have) { if (multi && !have.tags.includes(goal.tag)) have.tags.push(goal.tag); continue; }
      const found = findLesson(st.id);
      if (!found) continue;
      const step: BuiltStep = { lesson: found.lesson, course: found.course.title, why: st.why, done: doneIds.has(st.id), minutes: lessonMinutes(found.lesson, found.course.id), tags: multi ? [goal.tag] : [] };
      placed.set(st.id, step);
      stage.steps.push(step);
    }
  };
  for (const g of goals) for (const s of g.stages) if (s.script) add(g, s);
  const rest = goals.map((g) => g.stages.filter((s) => !s.script));
  for (let i = 0; i < Math.max(0, ...rest.map((r) => r.length)); i++) for (let k = 0; k < goals.length; k++) if (rest[k][i]) add(goals[k], rest[k][i]);
  // A stage that ended up with nothing new (every lesson was already placed) is not shown.
  for (let i = stages.length - 1; i >= 0; i--) if (!stages[i].steps.length) stages.splice(i, 1);
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

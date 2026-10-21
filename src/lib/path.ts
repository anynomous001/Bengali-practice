import { query } from "./db";
import { findLesson, type Lesson } from "@/data/curriculum";
import { getGoal, type PathGoal, type Reads } from "@/data/paths";

export type Chosen = { goal: PathGoal; reads: Reads };

/** The student's chosen goal, or null when they have not picked one (or it was removed from the list). */
export async function loadChosen(email: string): Promise<Chosen | null> {
  const row = (await query<{ goal: string; reads: string }>("SELECT goal, reads FROM student_path WHERE email = $1", [email]))[0];
  const goal = row && getGoal(row.goal);
  if (!row || !goal) return null;
  return { goal, reads: (["no", "little", "yes"].includes(row.reads) ? row.reads : "no") as Reads };
}

export type BuiltStep = { lesson: Lesson; course: string; why: string; done: boolean };
export type BuiltStage = { title: string; blurb: string; steps: BuiltStep[]; skipped: boolean };
export type BuiltPath = { stages: BuiltStage[]; total: number; done: number; next: BuiltStep | null; nextStage: string | null };

/** Turns a goal and the set of finished lessons into stages with ticks, the totals and the next step. Steps whose lesson no longer exists are dropped. */
export function buildPath(goal: PathGoal, reads: Reads, doneIds: ReadonlySet<string>): BuiltPath {
  const stages: BuiltStage[] = goal.stages.map((s) => ({
    title: s.title,
    blurb: s.blurb,
    skipped: !!s.script && reads === "yes",
    steps: s.steps.flatMap((st) => {
      const found = findLesson(st.id);
      return found ? [{ lesson: found.lesson, course: found.course.title, why: st.why, done: doneIds.has(st.id) }] : [];
    }),
  }));
  const counted = stages.filter((s) => !s.skipped).flatMap((s) => s.steps);
  const nextStage = stages.find((s) => !s.skipped && s.steps.some((x) => !x.done));
  return {
    stages,
    total: counted.length,
    done: counted.filter((x) => x.done).length,
    next: nextStage?.steps.find((x) => !x.done) ?? null,
    nextStage: nextStage?.title ?? null,
  };
}

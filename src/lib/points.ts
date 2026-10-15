// The points table: change numbers here to tune the scoring. Streaks never depend on points, only on practising.

export type Kind = "lesson" | "quiz" | "exam" | "flash" | "drill" | "writing";

export const GOALS = [
  { id: 20, label: "Light", blurb: "About 5 minutes a day" },
  { id: 40, label: "Regular", blurb: "About 10 to 15 minutes" },
  { id: 80, label: "Serious", blurb: "About 25 to 30 minutes" },
] as const;
export const DEFAULT_GOAL = 40;

type Rule = {
  /** Points for one action. A quiz or exam can score differently when passed. */
  points: number;
  /** Most points this kind can earn in one day. */
  dailyCap: number;
  /** A lesson earns points only the first time it is completed. */
  once?: boolean;
  /** Counts as a full practice action for the streak. Light kinds need ten of them in a day. */
  heavy: boolean;
};

export const RULES: Record<Kind, Rule> = {
  lesson: { points: 20, dailyCap: 100, once: true, heavy: true },
  quiz: { points: 15, dailyCap: 60, heavy: true }, // 5 if the round was not passed
  exam: { points: 30, dailyCap: 60, heavy: true }, // 10 if the exam was not passed
  flash: { points: 1, dailyCap: 15, heavy: false }, // one point per card reviewed
  drill: { points: 1, dailyCap: 10, heavy: false }, // one point per correct letter or number answer
  writing: { points: 1, dailyCap: 5, heavy: false },
};

/** Fewer points when a quiz or exam was not passed. */
export const TRY_POINTS: Partial<Record<Kind, number>> = { quiz: 5, exam: 10 };

/** Light actions needed in one day to count as a practice day. */
export const LIGHT_DAY_MIN = 10;

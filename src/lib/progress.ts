import { getUser } from "./auth";
import { query } from "./db";

export async function loadProgress() {
  const user = await getUser();
  const rows = user
    ? await query<{ letter: string; right_count: number; wrong_count: number }>(
        "SELECT letter, right_count, wrong_count FROM progress WHERE email = $1",
        [user.email],
      )
    : [];
  return Object.fromEntries(rows.map((r) => [r.letter, { right: r.right_count, wrong: r.wrong_count }]));
}

export async function loadWriting(): Promise<Record<string, number>> {
  const user = await getUser();
  const rows = user
    ? await query<{ item: string; count: number }>("SELECT item, count FROM writing_practice WHERE email = $1", [user.email])
    : [];
  return Object.fromEntries(rows.map((r) => [r.item, r.count]));
}

export type StoryResult = { score: number; total: number; attempts: number };

export async function loadStoryProgress(): Promise<Record<string, StoryResult>> {
  const user = await getUser();
  const rows = user
    ? await query<{ story_id: string; best_score: number; total: number; attempts: number }>(
        "SELECT story_id, best_score, total, attempts FROM story_progress WHERE email = $1",
        [user.email],
      )
    : [];
  return Object.fromEntries(rows.map((r) => [r.story_id, { score: r.best_score, total: r.total, attempts: r.attempts }]));
}

export async function loadGrammarProgress(): Promise<Record<string, StoryResult>> {
  const user = await getUser();
  const rows = user
    ? await query<{ topic_id: string; best_score: number; total: number; attempts: number }>(
        "SELECT topic_id, best_score, total, attempts FROM grammar_progress WHERE email = $1",
        [user.email],
      )
    : [];
  return Object.fromEntries(rows.map((r) => [r.topic_id, { score: r.best_score, total: r.total, attempts: r.attempts }]));
}

/** Lessons the student has completed, with when (most recent first). */
export async function loadLessonProgress(): Promise<{ done: Set<string>; recent: string | null }> {
  const user = await getUser();
  const rows = user
    ? await query<{ lesson_id: string }>("SELECT lesson_id FROM lesson_progress WHERE email = $1 ORDER BY completed_at DESC", [user.email])
    : [];
  return { done: new Set(rows.map((r) => r.lesson_id)), recent: rows[0]?.lesson_id ?? null };
}

export type ExamAttempt = { finishedAt: Date; score: number; total: number };
/** The student's finished attempts at an exam, newest first, and their best percentage. */
export async function loadExamHistory(examId: string): Promise<{ attempts: ExamAttempt[]; best: number | null }> {
  const user = await getUser();
  if (!user) return { attempts: [], best: null };
  const rows = await query<{ finished_at: Date; score: number; total: number }>(
    "SELECT finished_at, score, total FROM exam_attempts WHERE email = $1 AND exam_id = $2 AND finished_at IS NOT NULL ORDER BY finished_at DESC LIMIT 20",
    [user.email, examId],
  );
  const attempts = rows.map((r) => ({ finishedAt: new Date(r.finished_at), score: r.score, total: r.total }));
  const best = attempts.length ? Math.max(...attempts.map((a) => Math.round((a.score / a.total) * 100))) : null;
  return { attempts: attempts.slice(0, 5), best };
}

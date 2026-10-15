import { cookies } from "next/headers";
import { query } from "./db";
import { COURSES, allLessons, coreLessons, devotionalLessons } from "@/data/curriculum";
import { DEFAULT_GOAL, LIGHT_DAY_MIN, RULES, TRY_POINTS, type Kind } from "./points";
import { addDays, computeStreak, dayIn, validTz, weekStart } from "./streak";

export type Settings = { tz: string | null; goal: number; name: string | null; remind: boolean };

async function loadSettings(email: string): Promise<Settings> {
  const r = (await query<{ tz: string | null; daily_goal: number; display_name: string | null; remind: boolean }>(
    "SELECT tz, daily_goal, display_name, remind FROM student_settings WHERE email = $1",
    [email],
  ))[0];
  return { tz: r?.tz ?? null, goal: r?.daily_goal ?? DEFAULT_GOAL, name: r?.display_name ?? null, remind: r?.remind ?? false };
}
export const getSettings = loadSettings;

/** The student's time zone: what the browser last reported, else what we saved, else UTC. */
async function timeZoneFor(email: string, saved: string | null): Promise<string> {
  let tz = saved;
  try {
    const c = (await cookies()).get("bp_tz")?.value;
    if (c && validTz(decodeURIComponent(c))) tz = decodeURIComponent(c);
  } catch { /* no request context */ }
  tz = tz && validTz(tz) ? tz : "UTC";
  if (tz !== saved) {
    await query(
      "INSERT INTO student_settings (email, tz) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET tz = $2",
      [email, tz],
    ).catch(() => undefined);
  }
  return tz;
}

/**
 * Records one practice action and the points it earns. Never throws: a problem here must not break the lesson.
 * `pass` is for quizzes and exams, which score less when not passed.
 */
export async function recordActivity(email: string, kind: Kind, ref = "", opts: { pass?: boolean; count?: number } = {}) {
  try {
    const rule = RULES[kind];
    const s = await loadSettings(email);
    const day = dayIn(await timeZoneFor(email, s.tz));
    let points = opts.pass === false && TRY_POINTS[kind] !== undefined ? TRY_POINTS[kind]! : rule.points;
    points *= opts.count ?? 1;

    if (rule.once) {
      const seen = await query("SELECT 1 FROM activity WHERE email = $1 AND kind = $2 AND ref = $3 LIMIT 1", [email, kind, ref]);
      if (seen.length) points = 0;
    } else if (kind === "quiz" || kind === "exam") {
      // the same quiz or exam earns points once a day
      const again = await query("SELECT 1 FROM activity WHERE email = $1 AND day = $2 AND kind = $3 AND ref = $4 AND points > 0 LIMIT 1", [email, day, kind, ref]);
      if (again.length) points = 0;
    }
    if (points > 0) {
      const used = (await query<{ n: string }>("SELECT COALESCE(SUM(points), 0) AS n FROM activity WHERE email = $1 AND day = $2 AND kind = $3", [email, day, kind]))[0];
      points = Math.max(0, Math.min(points, rule.dailyCap - Number(used?.n ?? 0)));
    }
    await query("INSERT INTO activity (email, day, kind, ref, points) VALUES ($1, $2, $3, $4, $5)", [email, day, kind, ref.slice(0, 120), points]);
  } catch (e) {
    console.error("recordActivity failed", e);
  }
}

// ---------------------------------------------------------------- reading it back

export type Stats = {
  tz: string;
  today: string;
  goal: number;
  pointsToday: number;
  weekPoints: number;
  totalPoints: number;
  current: number;
  longest: number;
  practisedToday: boolean;
  freezeAvailable: boolean;
  /** Days practised in the last 17 weeks, with points. */
  calendar: Record<string, number>;
};

const HEAVY = (Object.keys(RULES) as Kind[]).filter((k) => RULES[k].heavy);

/** Days on which the student really practised: a full action, or enough light ones. */
export function qualifyingDays(rows: { day: string; heavy: number; n: number }[]): string[] {
  return rows.filter((r) => r.heavy > 0 || r.n >= LIGHT_DAY_MIN).map((r) => r.day);
}

export async function loadStats(email: string, tzHint?: string | null): Promise<Stats> {
  const s = await loadSettings(email);
  const tz = tzHint ?? (await timeZoneFor(email, s.tz));
  const today = dayIn(tz);
  const rows = await query<{ day: string; pts: string; heavy: string; n: string }>(
    `SELECT day, SUM(points) AS pts, COUNT(*) FILTER (WHERE kind = ANY($2::text[])) AS heavy, COUNT(*) AS n
       FROM activity WHERE email = $1 GROUP BY day`,
    [email, HEAVY],
  );
  const days = rows.map((r) => ({ day: r.day, pts: Number(r.pts), heavy: Number(r.heavy), n: Number(r.n) }));
  const streak = computeStreak(qualifyingDays(days), today);
  const weekFrom = addDays(today, -6);
  const calFrom = addDays(weekStart(today), -16 * 7);
  return {
    tz, today, goal: s.goal,
    pointsToday: days.find((d) => d.day === today)?.pts ?? 0,
    weekPoints: days.filter((d) => d.day >= weekFrom && d.day <= today).reduce((n, d) => n + d.pts, 0),
    totalPoints: days.reduce((n, d) => n + d.pts, 0),
    current: streak.current, longest: streak.longest, practisedToday: streak.practisedToday, freezeAvailable: streak.freezeAvailable,
    calendar: Object.fromEntries(days.filter((d) => d.day >= calFrom && (d.heavy > 0 || d.n >= LIGHT_DAY_MIN)).map((d) => [d.day, d.pts])),
  };
}

// ---------------------------------------------------------------- milestones

export type Milestone = { key: string; group: "streak" | "progress" | "devotional"; title: string; text: string };

export const MILESTONES: Milestone[] = [
  ...[3, 7, 14, 30, 60, 100].map((n): Milestone => ({ key: `streak-${n}`, group: "streak", title: `${n}-day streak`, text: `You practised ${n} days in a row.` })),
  { key: "first-lesson", group: "progress", title: "First lesson", text: "You completed your first lesson." },
  { key: "lessons-10", group: "progress", title: "10 lessons", text: "Ten lessons completed." },
  { key: "lessons-25", group: "progress", title: "25 lessons", text: "Twenty-five lessons completed." },
  { key: "lessons-50", group: "progress", title: "50 lessons", text: "Fifty lessons completed." },
  ...COURSES.map((c): Milestone => ({ key: `course-${c.id}`, group: "progress", title: `${c.title} complete`, text: `You finished every lesson in the ${c.title} course.` })),
  { key: "first-exam", group: "progress", title: "First exam passed", text: "You passed your first timed exam." },
  { key: "first-story", group: "progress", title: "First story read", text: "You finished a reading story." },
  { key: "words-50", group: "progress", title: "50 words learned", text: "Fifty vocabulary cards are in your long-term memory." },
  { key: "words-100", group: "progress", title: "100 words learned", text: "One hundred vocabulary cards are in your long-term memory." },
  { key: "points-100", group: "progress", title: "100 points", text: "You have earned 100 points." },
  { key: "points-500", group: "progress", title: "500 points", text: "You have earned 500 points." },
  { key: "points-1000", group: "progress", title: "1,000 points", text: "You have earned 1,000 points." },
  { key: "dev-first", group: "devotional", title: "First devotional lesson", text: "You completed your first devotional lesson." },
  { key: "dev-nam", group: "devotional", title: "Bābājī's nām", text: "You learned Bābājī's nām." },
  { key: "dev-passages", group: "devotional", title: "All eight passages", text: "You read all eight devotional reading passages." },
  { key: "dev-10", group: "devotional", title: "10 devotional lessons", text: "Ten devotional lessons completed." },
];

/** Works out which milestones the student has now, saves new ones, and returns the keys earned and the ones not yet shown. */
export async function syncMilestones(email: string, stats: Stats): Promise<{ earned: Set<string>; fresh: string[] }> {
  const done = new Set((await query<{ lesson_id: string }>("SELECT lesson_id FROM lesson_progress WHERE email = $1", [email])).map((r) => r.lesson_id));
  const learned = Number((await query<{ n: string }>("SELECT COUNT(*) AS n FROM flashcards WHERE email = $1 AND box >= 3 AND card_id LIKE 'vc:%'", [email]))[0]?.n ?? 0);

  const earned = new Set<string>();
  for (const n of [3, 7, 14, 30, 60, 100]) if (stats.longest >= n) earned.add(`streak-${n}`);
  const coreDone = COURSES.reduce((n, c) => n + coreLessons(c).filter((l) => done.has(l.id)).length, 0);
  if (coreDone >= 1) earned.add("first-lesson");
  for (const n of [10, 25, 50]) if (coreDone >= n) earned.add(`lessons-${n}`);
  for (const c of COURSES) {
    const core = coreLessons(c);
    if (core.length && core.every((l) => done.has(l.id))) earned.add(`course-${c.id}`);
  }
  if (COURSES.some((c) => allLessons(c).some((l) => l.kind === "Exam" && done.has(l.id)))) earned.add("first-exam");
  if ([...done].some((id) => id.startsWith("reading/story-"))) earned.add("first-story");
  if (learned >= 50) earned.add("words-50");
  if (learned >= 100) earned.add("words-100");
  for (const n of [100, 500, 1000]) if (stats.totalPoints >= n) earned.add(`points-${n}`);
  const devDone = COURSES.reduce((n, c) => n + devotionalLessons(c).filter((l) => done.has(l.id)).length, 0);
  if (devDone >= 1) earned.add("dev-first");
  if (devDone >= 10) earned.add("dev-10");
  if (done.has("reading/dev-nam")) earned.add("dev-nam");
  if (Array.from({ length: 8 }, (_, i) => `reading/dev-rp${i + 1}`).every((id) => done.has(id))) earned.add("dev-passages");

  const have = new Set((await query<{ key: string; seen: boolean }>("SELECT key, seen FROM milestones WHERE email = $1", [email])).map((r) => r.key));
  for (const key of earned) if (!have.has(key)) await query("INSERT INTO milestones (email, key) VALUES ($1, $2) ON CONFLICT DO NOTHING", [email, key]);
  const fresh = (await query<{ key: string }>("SELECT key FROM milestones WHERE email = $1 AND seen = false", [email])).map((r) => r.key);
  return { earned, fresh };
}

export async function markMilestonesSeen(email: string) {
  await query("UPDATE milestones SET seen = true WHERE email = $1 AND seen = false", [email]);
}

// ---------------------------------------------------------------- class views

export type BoardRow = { name: string; points: number; streak: number; you: boolean };

/** Points over the last seven days for students who chose a display name. */
export async function loadLeaderboard(email: string): Promise<BoardRow[]> {
  const students = await query<{ email: string; display_name: string; tz: string | null }>(
    "SELECT email, display_name, tz FROM student_settings WHERE display_name IS NOT NULL AND display_name <> ''",
  );
  const out: BoardRow[] = [];
  for (const s of students) {
    const st = await loadStats(s.email, s.tz || "UTC");
    out.push({ name: s.display_name, points: st.weekPoints, streak: st.current, you: s.email === email });
  }
  return out.sort((a, b) => b.points - a.points || b.streak - a.streak).slice(0, 20);
}

export type TeacherRow = { email: string; current: number; longest: number; lastActive: string | null; weekPoints: number; totalPoints: number };

/** Every student's streak and activity, for the teacher. */
export async function loadTeacherView(): Promise<TeacherRow[]> {
  const students = await query<{ email: string; tz: string | null }>(
    "SELECT s.email, ss.tz FROM students s LEFT JOIN student_settings ss ON ss.email = s.email",
  );
  const rows: TeacherRow[] = [];
  for (const s of students) {
    const st = await loadStats(s.email, s.tz || "UTC");
    const last = (await query<{ d: string | null }>("SELECT MAX(day) AS d FROM activity WHERE email = $1", [s.email]))[0]?.d ?? null;
    rows.push({ email: s.email, current: st.current, longest: st.longest, lastActive: last, weekPoints: st.weekPoints, totalPoints: st.totalPoints });
  }
  return rows.sort((a, b) => (b.lastActive ?? "").localeCompare(a.lastActive ?? ""));
}

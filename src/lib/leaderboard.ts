import { query } from "./db";
import { getSettings, loadStats } from "./activity";
import { addDays } from "./streak";
import { BUDDIES, BUDDY_MAX_REAL } from "@/data/buddies";

export type Range = "week" | "month" | "all";
export const RANGES: { id: Range; label: string; days: number | null }[] = [
  { id: "week", label: "This week", days: 7 },
  { id: "month", label: "This month", days: 30 },
  { id: "all", label: "All time", days: null },
];

export type Tag = { text: string; tone: "great" | "good" | "push" };
export type BoardRow = { name: string; points: number; streak: number; you: boolean; buddy: boolean; tag?: Tag };

/** Where a student stands against the buddy pace for their own goal. */
function tagFor(points: number, goal: number, days: number, withBuddies: boolean): Tag {
  const pace = goal * days;
  const ratio = pace ? points / pace : 0;
  const [top, mid, low, floor] = BUDDIES; // ordered by factor, fastest first
  if (ratio >= top.factor) return { text: withBuddies ? `Ahead of ${top.name}` : "Ahead of goal pace", tone: "great" };
  if (ratio >= 1) return { text: withBuddies ? `Perfect pace · above ${mid.name}` : "Perfect pace", tone: "great" };
  if (ratio >= mid.factor) return { text: withBuddies ? `Almost there · catch ${mid.name}` : "Almost on goal pace", tone: "good" };
  if (ratio >= low.factor) return { text: withBuddies ? `Catch up to ${low.name}` : "Behind goal pace", tone: "push" };
  if (ratio >= floor.factor) return { text: withBuddies ? `Catch up to ${floor.name}` : "Behind goal pace", tone: "push" };
  return { text: "Time to practise", tone: "push" };
}

export async function buddiesOn(): Promise<boolean> {
  const r = await query<{ value: string }>("SELECT value FROM app_flags WHERE key = 'buddies'");
  return (r[0]?.value ?? "on") !== "off";
}

/** A stable small number from text, so the same buddy moves the same way for everyone on the same day. */
function seeded(text: string): number {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

export async function loadLeaderboard(email: string, range: Range): Promise<{ rows: BoardRow[]; hidden: boolean; buddiesShown: boolean; goal: number }> {
  const def = RANGES.find((r) => r.id === range)!;
  const today = new Date().toISOString().slice(0, 10);
  const from = def.days ? addDays(today, -(def.days - 1)) : "0000-00-00";
  const students = await query<{ email: string; display_name: string | null; tz: string | null; show_board: boolean | null; daily_goal: number | null; created_at: Date }>(
    `SELECT s.email, ss.display_name, ss.tz, ss.show_board, ss.daily_goal, s.created_at FROM students s
       LEFT JOIN student_settings ss ON ss.email = s.email
      WHERE s.access_expires_at > now()`,
  );
  const pts = new Map((await query<{ email: string; p: string }>("SELECT email, SUM(points) AS p FROM activity WHERE day >= $1 GROUP BY email", [from])).map((r) => [r.email, Number(r.p)]));

  const visible = students.filter((s) => s.show_board !== false);
  const showBuddies = await buddiesOn();
  const real: BoardRow[] = [];
  for (const s of visible) {
    const st = await loadStats(s.email, s.tz || "UTC");
    const points = pts.get(s.email) ?? 0;
    const days = def.days ?? Math.min(365, Math.max(7, Math.ceil((Date.now() - s.created_at.getTime()) / 864e5)));
    real.push({
      name: s.display_name?.trim() || `Student ${100 + Math.floor(seeded(s.email) * 900)}`,
      points, streak: st.current, you: s.email === email, buddy: false,
      tag: tagFor(points, s.daily_goal ?? 40, days, showBuddies),
    });
  }

  let buddies: BoardRow[] = [];
  const buddiesShown = real.length < BUDDY_MAX_REAL && showBuddies;
  if (buddiesShown) {
    // Buddies keep a pace based on the viewer's own daily goal, so the goal is also a place on the board to aim for.
    const goal = (await getSettings(email)).goal;
    const joined = (await query<{ d: Date }>("SELECT created_at AS d FROM students WHERE email = $1", [email]))[0]?.d;
    const sinceJoin = joined ? Math.ceil((Date.now() - joined.getTime()) / 864e5) : 7;
    const days = def.days ?? Math.min(365, Math.max(7, sinceJoin));
    buddies = BUDDIES.map((b) => {
      const wobble = 0.95 + seeded(b.name + today) * 0.1;
      return { name: b.name, points: Math.round(goal * days * b.factor * wobble), streak: 2 + Math.floor(seeded(b.name) * 12), you: false, buddy: true };
    });
  }
  const rows = [...real, ...buddies].sort((a, b) => b.points - a.points || b.streak - a.streak);
  const hidden = !visible.some((s) => s.email === email);
  return { rows, hidden, buddiesShown, goal: (await getSettings(email)).goal };
}

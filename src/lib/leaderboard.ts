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

export type BoardRow = { name: string; points: number; streak: number; you: boolean; buddy: boolean };

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
  const students = await query<{ email: string; display_name: string | null; tz: string | null; show_board: boolean | null }>(
    `SELECT s.email, ss.display_name, ss.tz, ss.show_board FROM students s
       LEFT JOIN student_settings ss ON ss.email = s.email
      WHERE s.access_expires_at > now()`,
  );
  const pts = new Map((await query<{ email: string; p: string }>("SELECT email, SUM(points) AS p FROM activity WHERE day >= $1 GROUP BY email", [from])).map((r) => [r.email, Number(r.p)]));

  const visible = students.filter((s) => s.show_board !== false);
  const real: BoardRow[] = [];
  for (const s of visible) {
    const st = await loadStats(s.email, s.tz || "UTC");
    real.push({
      name: s.display_name?.trim() || `Student ${100 + Math.floor(seeded(s.email) * 900)}`,
      points: pts.get(s.email) ?? 0, streak: st.current, you: s.email === email, buddy: false,
    });
  }

  let buddies: BoardRow[] = [];
  const buddiesShown = real.length < BUDDY_MAX_REAL && (await buddiesOn());
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

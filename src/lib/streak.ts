// Streak rules, kept free of the database so they are easy to test. A day is a calendar date ("2026-10-15") in the student's own time zone.

const MS = 86_400_000;
const toTime = (d: string) => Date.parse(d + "T00:00:00Z");
const toDay = (t: number) => new Date(t).toISOString().slice(0, 10);
export const addDays = (d: string, n: number) => toDay(toTime(d) + n * MS);
/** The Monday that starts the week containing this day. */
export const weekStart = (d: string) => addDays(d, -((new Date(toTime(d)).getUTCDay() + 6) % 7));

/** Today's date in a time zone, as "YYYY-MM-DD". Falls back to UTC for an unknown zone. */
export function dayIn(tz: string | null | undefined, at = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz || "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
  } catch {
    return at.toISOString().slice(0, 10);
  }
}
export const validTz = (tz: string) => { try { new Intl.DateTimeFormat("en-CA", { timeZone: tz }); return true; } catch { return false; } };

export type Streak = { current: number; longest: number; practisedToday: boolean; freezeAvailable: boolean; frozen: string[] };

/**
 * One missed day per week is forgiven (a "freeze") when a streak is running: the day does not count, but the streak carries on.
 * A second missed day in the same week ends it. A day that is not over yet never breaks the streak.
 */
export function computeStreak(activeDays: Iterable<string>, today: string): Streak {
  const set = new Set(activeDays);
  if (!set.size) return { current: 0, longest: 0, practisedToday: false, freezeAvailable: true, frozen: [] };
  const first = [...set].sort()[0];
  let cur = 0;
  let longest = 0;
  const usedWeeks = new Set<string>();
  const frozen: string[] = [];
  for (let d = first; d <= today; d = addDays(d, 1)) {
    if (set.has(d)) cur++;
    else if (d === today) { /* still to do today */ }
    else if (cur > 0 && !usedWeeks.has(weekStart(d))) { usedWeeks.add(weekStart(d)); frozen.push(d); }
    else cur = 0;
    if (cur > longest) longest = cur;
  }
  return { current: cur, longest, practisedToday: set.has(today), freezeAvailable: !usedWeeks.has(weekStart(today)), frozen };
}

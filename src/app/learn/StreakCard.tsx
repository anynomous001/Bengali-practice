import Link from "next/link";
import type { Stats } from "@/lib/activity";
import Icon from "./Icon";

/** A circle that fills as today's points reach the daily goal. */
export function GoalRing({ value, goal, size = 76 }: { value: number; goal: number; size?: number }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / goal);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value} of ${goal} points today`} className="ring">
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" />
      <circle cx={size / 2} cy={size / 2} r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="ring-text">{value}</text>
    </svg>
  );
}

/** The dashboard summary: streak, today's goal, this week's points and the next milestone. */
export default function StreakCard({ stats, next }: { stats: Stats; next: string | null }) {
  const hit = stats.pointsToday >= stats.goal;
  return (
    <section className="streak-card" aria-label="Daily practice">
      <div className="sc-streak">
        <span className={"sc-flame" + (stats.practisedToday ? " on" : "")}><Icon name="flame" size={30} weight="fill" /></span>
        <div>
          <b>{stats.current} {stats.current === 1 ? "day" : "days"}</b>
          <small>{stats.practisedToday ? "Practised today" : stats.current ? "Practise today to keep it going" : "Start your streak today"}</small>
        </div>
      </div>
      <div className="sc-goal">
        <GoalRing value={stats.pointsToday} goal={stats.goal} />
        <div>
          <b>{hit ? "Daily goal reached" : `${stats.goal - stats.pointsToday} points to your goal`}</b>
          <small>{stats.pointsToday} of {stats.goal} points today</small>
        </div>
      </div>
      <div className="sc-week">
        <b>{stats.weekPoints}</b>
        <small>points this week</small>
        {stats.freezeAvailable && stats.current > 0 && <small className="sc-freeze">One missed day this week is forgiven</small>}
      </div>
      <div className="sc-next">
        {next && <><small>Next milestone</small><b>{next}</b></>}
        <Link href="/learn/progress" className="btn ghost small">My progress<Icon name="next" size={14} /></Link>
      </div>
    </section>
  );
}

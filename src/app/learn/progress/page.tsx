import { requireAccess } from "@/lib/access";
import { getSettings, loadLeaderboard, loadStats, markMilestonesSeen, MILESTONES, syncMilestones } from "@/lib/activity";
import { GOALS } from "@/lib/points";
import { addDays, weekStart } from "@/lib/streak";
import Icon from "../Icon";
import { GoalRing } from "../StreakCard";
import { saveSettings } from "./actions";

const fmtDay = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

export default async function ProgressPage() {
  const user = await requireAccess();
  const stats = await loadStats(user.email);
  const settings = await getSettings(user.email);
  const { earned, fresh } = await syncMilestones(user.email, stats);
  if (fresh.length) await markMilestonesSeen(user.email);
  const board = await loadLeaderboard(user.email);

  // Calendar: 17 weeks, Monday first, ending with the current week.
  const start = addDays(weekStart(stats.today), -16 * 7);
  const weeks = Array.from({ length: 17 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)));
  const level = (day: string) => (day > stats.today ? "future" : day in stats.calendar ? (stats.calendar[day] >= stats.goal ? "high" : "some") : "none");

  return (
    <main className="wide progress-page">
      <header>
        <p className="eyebrow">My progress</p>
        <h1>Daily practice</h1>
        <p className="lede">A little practice each day. Your days follow your own time zone ({stats.tz.replace(/_/g, " ")}).</p>
      </header>

      <section className="pg-top">
        <div className="pg-stat"><span className="sc-flame on"><Icon name="flame" size={28} weight="fill" /></span><b>{stats.current}</b><small>day streak</small></div>
        <div className="pg-stat"><Icon name="trophy" size={28} /><b>{stats.longest}</b><small>longest streak</small></div>
        <div className="pg-stat"><GoalRing value={stats.pointsToday} goal={stats.goal} size={64} /><b>{stats.pointsToday} / {stats.goal}</b><small>points today</small></div>
        <div className="pg-stat"><Icon name="target" size={28} /><b>{stats.weekPoints}</b><small>points this week</small></div>
        <div className="pg-stat"><Icon name="check" size={28} /><b>{stats.totalPoints}</b><small>points in total</small></div>
      </section>
      <p className="muted">A day counts when you finish a lesson, a quiz, a role play or an exam, or review ten flashcards. If you miss one day in a week, your streak is kept{stats.freezeAvailable ? " (this week's is still available)" : " (this week's has been used)"}.</p>

      <h2 className="section-title">The last 17 weeks</h2>
      <div className="cal" role="img" aria-label="Calendar of practice days">
        {weeks.map((wk, i) => (
          <div key={i} className="cal-col">
            {wk.map((day) => <span key={day} className={"cal-cell " + level(day) + (day === stats.today ? " today" : "")} title={`${fmtDay(day)}${day in stats.calendar ? `: ${stats.calendar[day]} points` : ""}`} />)}
          </div>
        ))}
      </div>
      <p className="cal-key"><span className="cal-cell none" /> no practice <span className="cal-cell some" /> practised <span className="cal-cell high" /> goal reached</p>

      <h2 className="section-title">Milestones</h2>
      {(["streak", "progress", "devotional"] as const).map((g) => (
        <section key={g} className="ms-group">
          <h3>{g === "streak" ? "Streaks" : g === "progress" ? "Progress" : "Devotional"} {g === "devotional" && <span className="dev-tag">Devotional</span>}</h3>
          <ul className="ms-list">
            {MILESTONES.filter((m) => m.group === g).map((m) => (
              <li key={m.key} className={earned.has(m.key) ? "got" : "locked"}>
                <Icon name={earned.has(m.key) ? "trophy" : "lock"} size={20} weight={earned.has(m.key) ? "fill" : "regular"} />
                <span><b>{m.title}</b><small>{m.text}</small></span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2 className="section-title">Class this week</h2>
      {board.length ? (
        <ol className="board">
          {board.map((r, i) => (
            <li key={i} className={r.you ? "you" : ""}>
              <span className="rank">{i + 1}</span>
              <span className="who">{r.name}{r.you && " (you)"}</span>
              <span className="streak"><Icon name="flame" size={14} weight="fill" />{r.streak}</span>
              <b>{r.points}</b>
            </li>
          ))}
        </ol>
      ) : <p className="muted">Nobody is on the class board yet. Choose a display name below to join it.</p>}
      <p className="muted">Only students who choose a display name appear here. Points are from the last seven days.</p>

      <h2 className="section-title">Settings</h2>
      <form action={saveSettings} className="stack card-static settings-form">
        <fieldset>
          <legend>Daily goal</legend>
          <div className="goal-opts">
            {GOALS.map((g) => (
              <label key={g.id} className="choice"><input type="radio" name="goal" value={g.id} defaultChecked={settings.goal === g.id} /><span><b>{g.label}</b> · {g.id} points<small>{g.blurb}</small></span></label>
            ))}
          </div>
        </fieldset>
        <label className="field">Display name on the class board
          <input name="name" defaultValue={settings.name ?? ""} maxLength={24} placeholder="Leave empty to stay off the board" autoComplete="nickname" />
        </label>
        <label className="check"><input type="checkbox" name="remind" defaultChecked={settings.remind} /> Email me a reminder in the evening if I have not practised yet</label>
        <button className="btn">Save</button>
      </form>
    </main>
  );
}

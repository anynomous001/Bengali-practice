import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadLessonProgress } from "@/lib/progress";
import { COURSES, allLessons, courseStats } from "@/data/curriculum";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";
import StreakCard from "./StreakCard";
import { loadChosen, buildPath } from "@/lib/path";
import { loadStats, markMilestonesSeen, MILESTONES, syncMilestones } from "@/lib/activity";

export default async function Dashboard() {
  const user = await requireAccess();
  const { done, recent } = await loadLessonProgress();
  const stats = await loadStats(user.email);
  const { earned, fresh } = await syncMilestones(user.email, stats);
  if (fresh.length) await markMilestonesSeen(user.email);
  const nextMilestone = MILESTONES.find((m) => !earned.has(m.key))?.title ?? null;
  const freshMilestones = MILESTONES.filter((m) => fresh.includes(m.key));

  const chosen = await loadChosen(user.email);
  const myPath = chosen ? buildPath(chosen.goal, chosen.reads, done) : null;

  const daysLeft = user.expiresAt ? Math.ceil((user.expiresAt.getTime() - Date.now()) / 86_400_000) : Infinity;
  const rows = COURSES.map((c) => ({ c, s: courseStats(c, done) }));
  const total = rows.reduce((n, r) => n + r.s.total, 0);
  const complete = rows.reduce((n, r) => n + r.s.done, 0);

  // Resume where the student last worked; otherwise the first course with something left.
  const lastCourse = recent ? COURSES.find((c) => allLessons(c).some((l) => l.id === recent)) : undefined;
  const open = (r: (typeof rows)[number]) => r.s.next !== null;
  const target = (lastCourse && rows.find((r) => r.c.id === lastCourse.id && open(r))) || rows.find(open);

  return (
    <main className="wide">
      {user.expiresAt && !user.isAdmin && daysLeft <= 30 && (
        <div className="renew-banner" role="status">
          <span>{daysLeft <= 0 ? "Your access has ended." : `Your access ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}.`} Renew now and 12 months are added to the end of your current time.</span>
          <Link href="/buy" className="btn small">Renew access</Link>
        </div>
      )}
      {freshMilestones.map((m) => (
        <div key={m.key} className="milestone-banner" role="status">
          <Icon name="trophy" size={22} weight="fill" />
          <span><b>New milestone: {m.title}.</b> {m.text}</span>
        </div>
      ))}
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Welcome back</p>
          <h1><span lang="bn">স্বাগতম</span></h1>
          <p className="hero-sub">
            {user.expiresAt && !user.isAdmin
              ? `Your access runs until ${user.expiresAt.toLocaleDateString("en-GB", { dateStyle: "long" })}.`
              : "A little every day goes a long way."}
          </p>
          {target?.s.next ? (
            <Link href={target.s.next.href} className="btn light">
              <span className="btn-stack"><small>{complete ? `Resume ${target.c.title}` : "Start with"}</small><b>{target.s.next.title}</b></span>
              <Icon name="next" size={18} />
            </Link>
          ) : (
            <p className="hero-sub">You have finished every lesson. Keep it fresh with flashcards.</p>
          )}
        </div>
        <div className="overall">
          <div className="overall-top"><span>Overall progress</span><b>{total ? Math.round((complete / total) * 100) : 0}%</b></div>
          <ProgressBar value={complete} max={total} label="Overall progress" size="lg" />
          <p>{complete} of {total} lessons complete</p>
        </div>
      </section>

      {chosen && myPath ? (
        <section className="pth-card">
          <div>
            <p className="eyebrow">My path</p>
            <h2>{chosen.goal.title}</h2>
            <ProgressBar value={myPath.done} max={myPath.total} label="Path progress" />
            <p className="muted">{myPath.done} of {myPath.total} steps</p>
          </div>
          {myPath.next ? (
            <Link href={myPath.next.lesson.href} className="btn">
              <span className="btn-stack"><small>{myPath.done ? "Next step" : "Start here"}</small><b>{myPath.next.lesson.title}</b></span>
              <Icon name="next" size={18} />
            </Link>
          ) : (
            <Link href="/learn/path?change=1" className="btn ghost">Pick a new goal</Link>
          )}
          <Link href="/learn/path" className="pth-all">See the whole path</Link>
        </section>
      ) : (
        <section className="pth-card">
          <div>
            <p className="eyebrow">My path</p>
            <h2>Not sure where to start?</h2>
            <p className="muted">Pick a goal, such as talking with family or reading, and get a path through the lessons.</p>
          </div>
          <Link href="/learn/path" className="btn">Choose my path</Link>
        </section>
      )}

      <StreakCard stats={stats} next={nextMilestone} />

      <h2 className="section-title">Your courses</h2>
      <div className="course-grid">
        {rows.map(({ c, s }) => (
          <article key={c.id} className="course-card" data-seg={c.id}>
            <Link href={`/learn/${c.id}`} className="seg-head">
              <span className="seg-icon"><Icon name={c.id} size={22} /></span>
              <span className="seg-title"><b>{c.title}</b><span lang="bn">{c.bn}</span></span>
            </Link>
            <p>{c.blurb}</p>
            <div className="cc-progress">
              <ProgressBar value={s.done} max={s.total} label={`${c.title} progress`} />
              <span><b>{s.pct}%</b> · {s.done}/{s.total} lessons</span>
            </div>
            {s.next && <p className="cc-next"><small>{s.done ? "Up next" : "First lesson"}</small>{s.next.title}</p>}
            <Link href={s.next?.href ?? `/learn/${c.id}`} className={"btn" + (s.done ? "" : " ghost")}>
              {s.next ? (s.done ? "Resume" : "Start") : "Review"}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

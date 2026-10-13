import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadLessonProgress } from "@/lib/progress";
import { COURSES, allLessons, courseStats } from "@/data/curriculum";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";

export default async function Dashboard() {
  const user = await requireAccess();
  const { done, recent } = await loadLessonProgress();

  const rows = COURSES.map((c) => ({ c, s: courseStats(c, done) }));
  const total = rows.reduce((n, r) => n + r.s.total, 0);
  const complete = rows.reduce((n, r) => n + r.s.done, 0);

  // Resume where the student last worked; otherwise the first course with something left.
  const lastCourse = recent ? COURSES.find((c) => allLessons(c).some((l) => l.id === recent)) : undefined;
  const open = (r: (typeof rows)[number]) => r.s.next !== null;
  const target = (lastCourse && rows.find((r) => r.c.id === lastCourse.id && open(r))) || rows.find(open);

  return (
    <main className="wide">
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

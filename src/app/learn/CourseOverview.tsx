import NewTag from "./NewTag";
import { isNew } from "@/data/new";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/access";
import { loadLessonProgress } from "@/lib/progress";
import { courseStats, getCourse } from "@/data/curriculum";
import { loadStats } from "@/lib/activity";
import Icon from "./Icon";
import LessonStatus from "./LessonStatus";
import ProgressBar from "./ProgressBar";

/** The course home: progress, resume, what you will learn, and the full syllabus. */
export default async function CourseOverview({ courseId }: { courseId: string }) {
  const user = await requireAccess();
  const course = getCourse(courseId);
  if (!course) notFound();
  const { done, recent } = await loadLessonProgress();
  const day = await loadStats(user.email);
  const stats = courseStats(course, done);
  const started = stats.done > 0;
  const finished = stats.done === stats.total;
  const lastDone = recent && course.modules.flatMap((m) => m.lessons).find((l) => l.id === recent);
  const resume = stats.next ?? course.modules[0].lessons[0];

  return (
    <main data-seg={course.id} className="wide course">
      <header className="course-head">
        <div className="course-intro">
          <p className="eyebrow" lang="bn">{course.bn}</p>
          <h1>{course.title}</h1>
          <p className="lede">{course.blurb}</p>
          <Link href="/learn/progress" className={"practised" + (day.practisedToday ? " on" : "")}><Icon name="flame" size={16} weight="fill" />{day.practisedToday ? "Practised today" : "Not practised yet today"}{day.current > 0 && ` · ${day.current}-day streak`}</Link>
          {course.tools && course.tools.length > 0 && (
            <div className="tools">
              {course.tools.map((t) => (
                <Link key={t.href} href={t.href} className="tool">
                  <Icon name="list" size={18} />
                  <span><b>{t.label}</b><small>{t.blurb}</small></span>
                  <Icon name="next" size={16} />
                </Link>
              ))}
            </div>
          )}
          <h2 className="learn-h">What you will learn</h2>
          <ul className="outcomes">
            {course.outcomes.map((o) => (<li key={o}><Icon name="check" size={16} />{o}</li>))}
          </ul>
        </div>
        <aside className="progress-card">
          <div className="pc-top"><b>{stats.pct}%</b><span>{stats.done} of {stats.total} lessons complete</span></div>
          <ProgressBar value={stats.done} max={stats.total} label={`${course.title} progress`} size="lg" />
          <Link href={resume.href} className="btn">
            <Icon name={finished ? "reading" : "play"} size={16} />
            {finished ? "Review the course" : started ? "Resume" : "Start course"}
          </Link>
          <p className="pc-next">
            {finished ? "You have finished every lesson." : <><small>{started ? "Up next" : "First lesson"}</small><b>{resume.title}</b></>}
          </p>
          {started && !finished && lastDone && <p className="pc-last">Last completed: {lastDone.title}</p>}
        </aside>
      </header>

      <h2 className="section-title">Syllabus</h2>
      <div className="syllabus">
        {course.modules.map((m, mi) => {
          const mDone = m.lessons.filter((l) => done.has(l.id)).length;
          const open = finished || m.lessons.some((l) => !done.has(l.id)); // finished modules fold away
          return (
            <details key={m.id} className="module" open={open}>
              <summary>
                <span className="mod-num">{mi + 1}</span>
                <span className="mod-info"><b>{m.title}{m.devotional && <span className="dev-tag">Devotional</span>}</b><small>{m.blurb}</small></span>
                <span className="mod-meta">
                  <span>{mDone}/{m.lessons.length}</span>
                  <ProgressBar value={mDone} max={m.lessons.length} label={`${m.title} progress`} size="sm" />
                </span>
                <span className="mod-chev"><Icon name="chevron" size={18} /></span>
              </summary>
              <ol className="lessons">
                {m.lessons.map((l) => (
                  <li key={l.id}>
                    <Link href={l.href} className={done.has(l.id) ? "is-done" : ""}>
                      <LessonStatus done={done.has(l.id)} />
                      <span className="les-info"><b>{l.title}{l.tag && <span className="pth-tag">{l.tag}</span>}{isNew(l.id) && <NewTag />}</b><small>{l.blurb}</small></span>
                      <span className="kind">{l.kind}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </details>
          );
        })}
      </div>

      {course.upcoming.length > 0 && (
        <>
          <h2 className="section-title">Coming soon</h2>
          <ul className="upcoming">
            {course.upcoming.map((u) => (<li key={u.title}><b>{u.title}</b><span>{u.blurb}</span></li>))}
          </ul>
        </>
      )}
    </main>
  );
}

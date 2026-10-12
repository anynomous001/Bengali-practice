import Link from "next/link";
import { notFound } from "next/navigation";
import { findLesson, courseStats } from "@/data/curriculum";
import { loadLessonProgress } from "@/lib/progress";
import CompleteButton from "./CompleteButton";
import Icon from "./Icon";
import LessonStatus from "./LessonStatus";
import OnThisPage from "./OnThisPage";
import ProgressBar from "./ProgressBar";
import type { TocItem } from "@/lib/toc";

/** Wraps a lesson page: breadcrumb, course progress, syllabus outline, and complete / previous / next. */
export default async function LessonFrame({ lessonId, toc, children }: { lessonId: string; toc?: TocItem[]; children: React.ReactNode }) {
  const at = findLesson(lessonId);
  if (!at) notFound();
  const { course, module, lesson, prev, next } = at;
  const { done } = await loadLessonProgress();
  const stats = courseStats(course, done);
  const courseHref = `/learn/${course.id}`;

  return (
    <main data-seg={course.id} className="lesson-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={courseHref}>{course.title}</Link>
        <Icon name="chevron" size={14} />
        <span>{module.title}</span>
      </nav>
      <div className="lp-progress">
        <ProgressBar value={stats.done} max={stats.total} label={`${course.title} course progress`} size="sm" />
        <span>{stats.done} of {stats.total} lessons · {stats.pct}%</span>
      </div>

      <div className="lp-grid">
        <div className="lp-content">
          {toc && <OnThisPage items={toc} variant="bar" />}
          {children}
          <footer className="lp-foot">
            <div className="lp-nav">
              {prev ? <Link href={prev.href} className="btn ghost small"><Icon name="back" size={16} />{prev.title}</Link> : <span />}
            </div>
            <CompleteButton lessonId={lesson.id} done={done.has(lesson.id)} nextHref={next?.href ?? null} courseHref={courseHref} />
          </footer>
        </div>

        <aside className="lp-outline" aria-label="Course outline">
          {toc && <OnThisPage items={toc} variant="side" />}
          <Link href={courseHref} className="lp-outline-title">{course.title} <span lang="bn">{course.bn}</span></Link>
          {course.modules.map((m, mi) => {
            const mDone = m.lessons.filter((l) => done.has(l.id)).length;
            return (
              <details key={m.id} open={m.id === module.id}>
                <summary>
                  <span className="mod-name"><b>{mi + 1}.</b> {m.title}</span>
                  <span className="mod-count">{mDone}/{m.lessons.length}</span>
                </summary>
                <ul>
                  {m.lessons.map((l) => (
                    <li key={l.id}>
                      <Link href={l.href} aria-current={l.id === lesson.id ? "page" : undefined}>
                        <LessonStatus done={done.has(l.id)} size={16} />
                        <span>{l.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </aside>
      </div>
    </main>
  );
}

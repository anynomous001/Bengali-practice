import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadLessonProgress } from "@/lib/progress";
import { loadChosen, buildPath, fmtMinutes, pathBlurb, pathTitle } from "@/lib/path";
import { GOALS, READS } from "@/data/paths";
import Icon, { IconTile } from "../Icon";
import ProgressBar from "../ProgressBar";
import NewTag from "../NewTag";
import { isNew } from "@/data/new";
import { choosePath } from "./actions";

export default async function PathPage({ searchParams }: { searchParams: Promise<{ change?: string; need?: string }> }) {
  const user = await requireAccess();
  const { change, need } = await searchParams;
  const chosen = await loadChosen(user.email);

  if (!chosen || change) {
    return (
      <main className="wide">
        <header className="page-head">
          <IconTile name="path" size={60} />
          <div>
            <p className="eyebrow">My path</p>
            <h1>What do you want to get better at?</h1>
            <p className="lede">Pick one goal or several. You get a path through the lessons, in the order that helps most. With more than one goal, we combine them into one path and tag each lesson, so you can see what it is for. You can change it any time.</p>
          </div>
        </header>
        <form action={choosePath} className="pth-form">
          <fieldset className="pth-reads">
            <legend>Can you read Bengali letters yet?</legend>
            {READS.map((r) => (
              <label key={r.id}><input type="radio" name="reads" value={r.id} defaultChecked={(chosen?.reads ?? "no") === r.id} /> {r.label}</label>
            ))}
            <p className="muted">If you can read, we leave out the lessons on letters.</p>
          </fieldset>
          <div className="pth-goals">
            {GOALS.map((g) => (
              <label key={g.id} className="pth-goal">
                <input type="checkbox" name="goal" value={g.id} defaultChecked={chosen?.goals.some((x) => x.id === g.id)} />
                <span className="pth-bn" lang="bn">{g.bn}</span>
                <b>{g.title}{isNew(`goal:${g.id}`) && <NewTag />}</b>
                <span>{g.blurb}</span>
                <small>{g.who}</small>
                <small className="pth-pick">Selected</small>
              </label>
            ))}
          </div>
          {need && <p className="msg bad" role="status">Pick at least one goal.</p>}
          <p><button className="btn">Make my path</button> <span className="muted">You can pick up to four.</span></p>
        </form>
        {chosen && <p><Link href="/learn/path" className="back"><Icon name="prev" size={16} />Back to my path</Link></p>}
      </main>
    );
  }

  const { done } = await loadLessonProgress();
  const path = buildPath(chosen.goals, chosen.reads, done);
  return (
    <main className="wide">
      <header className="page-head">
        <IconTile name="path" size={60} />
        <div>
          <p className="eyebrow">My path</p>
          <h1>{pathTitle(chosen.goals)}</h1>
          <p className="lede">{pathBlurb(chosen.goals)}</p>
        </div>
      </header>

      <section className="pth-top">
        <div className="pth-prog">
          <div className="overall-top"><span>{path.done} of {path.total} steps</span><b>{path.total ? Math.round((path.done / path.total) * 100) : 0}%</b></div>
          <ProgressBar value={path.done} max={path.total} label="Path progress" size="lg" />
          {path.minutesLeft > 0 && <p className="muted pth-time">About {fmtMinutes(path.minutesLeft)} left. At ten minutes a day, that is about {path.daysAtTen} {path.daysAtTen === 1 ? "day" : "days"}.</p>}
        </div>
        {path.next ? (
          <Link href={path.next.lesson.href} className="btn pth-next">
            <span className="btn-stack"><small>{path.done ? "Next step" : "Start here"}</small><b>{path.next.lesson.title}</b></span>
            <Icon name="next" size={18} />
          </Link>
        ) : (
          <p className="pth-finished"><Icon name="trophy" size={20} weight="fill" /> You have finished this path. Pick another goal, or keep it fresh with flashcards.</p>
        )}
      </section>

      <ol className="pth-stages">
        {path.stages.map((s, i) => {
          const left = s.steps.filter((x) => !x.done).length;
          const current = !s.skipped && path.nextStage === s.title;
          return (
            <li key={s.title} className={"pth-stage" + (current ? " current" : "") + (!s.skipped && left === 0 ? " done" : "") + (s.skipped ? " skipped" : "")}>
              <div className="pth-stage-head">
                <span className="pth-n">{s.skipped ? "–" : left === 0 ? <Icon name="check" size={16} /> : i + 1}</span>
                <div className="pth-stage-text">
                  <h2>{s.title}{s.tags.length > 0 && <span className="pth-tags">{s.tags.map((t) => <span key={t} className="pth-tag">{t}</span>)}</span>}</h2>
                  <p className="muted">{s.skipped ? "Skipped, because you can already read Bengali letters." : s.blurb}</p>
                </div>
                {!s.skipped && <small className="pth-stage-time">{left === 0 ? "Done" : fmtMinutes(s.minutesLeft)}</small>}
              </div>
              {!s.skipped && (
                <ul className="pth-steps">
                  {s.steps.map((x) => (
                    <li key={x.lesson.id} className={x.done ? "done" : path.next?.lesson.id === x.lesson.id ? "next" : ""}>
                      <Link href={x.lesson.href}>
                        <span className="pth-tick">{x.done ? <Icon name="check" size={14} /> : null}</span>
                        <span className="pth-text"><b>{x.lesson.title}{isNew(x.lesson.id) && <NewTag />}{x.tags.map((t) => <span key={t} className="pth-tag">{t}</span>)}</b><span className="muted">{x.why}</span></span>
                        <small className="pth-kind">{x.course} · {x.lesson.kind} · {fmtMinutes(x.minutes)}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      {chosen.goals.filter((g) => g.note).map((g) => <p key={g.id} className="muted pth-note">{chosen.goals.length > 1 ? `${g.tag}: ` : ""}{g.note}</p>)}
      <p><Link href="/learn/path?change=1" className="btn ghost small">Change my path</Link></p>
    </main>
  );
}

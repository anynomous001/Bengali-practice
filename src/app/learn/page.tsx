import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress, loadProgress, loadStoryProgress } from "@/lib/progress";
import { SEGMENTS, type Segment } from "@/data/segments";
import { LETTERS } from "@/data/letters";
import { STORIES } from "@/data/stories";
import { GRAMMAR } from "@/data/grammar";
import Icon from "./Icon";

export default async function Dashboard() {
  const user = await requireAccess();
  const [letters, stories, grammar] = await Promise.all([loadProgress(), loadStoryProgress(), loadGrammarProgress()]);

  const lettersDone = Object.keys(letters).length;
  const storiesDone = STORIES.filter((s) => stories[s.id]).length;
  const grammarDone = GRAMMAR.filter((g) => grammar[g.id]).length;

  const nextStory = STORIES.find((s) => !stories[s.id]);
  const nextTopic = GRAMMAR.find((g) => !grammar[g.id]);
  const next =
    lettersDone < LETTERS.length / 2
      ? { href: "/learn/reading/alphabet", label: "Alphabet", note: lettersDone ? "Keep going with the letters" : "Start with the letters" }
      : nextStory
        ? { href: `/learn/reading/stories/${nextStory.id}`, label: nextStory.title[2], note: "Read your next story" }
        : nextTopic
          ? { href: `/learn/grammar/${nextTopic.id}`, label: nextTopic.title[2], note: "Next grammar topic" }
          : { href: "/learn/reading/flashcards", label: "Flashcards", note: "Review what you have learned" };

  const stats = [
    { n: lettersDone, of: LETTERS.length, label: "Letters practised" },
    { n: storiesDone, of: STORIES.length, label: "Stories read" },
    { n: grammarDone, of: GRAMMAR.length, label: "Grammar topics" },
  ];

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
          <Link href={next.href} className="btn light">
            <span className="btn-stack"><small>{next.note}</small><b>{next.label}</b></span>
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd><b>{s.n}</b><span>/ {s.of}</span></dd>
              <div className="meter" aria-hidden><i style={{ width: `${Math.min(100, (s.n / s.of) * 100)}%` }} /></div>
            </div>
          ))}
        </dl>
      </section>

      <h2 className="section-title">Practice</h2>
      <div className="seg-grid">
        {(Object.keys(SEGMENTS) as Segment[]).map((k) => {
          const s = SEGMENTS[k];
          return (
            <article key={k} className="seg-card" data-seg={k}>
              <Link href={`/learn/${k}`} className="seg-head">
                <span className="seg-icon"><Icon name={k} size={22} /></span>
                <span className="seg-title"><b>{s.title}</b><span lang="bn">{s.bn}</span></span>
                <span className="arrow"><Icon name="arrow" size={18} /></span>
              </Link>
              <p>{s.blurb}</p>
              <ul className="seg-links">
                {s.activities.slice(0, 5).map((a) => (
                  <li key={a.href}><Link href={a.href}>{a.title}<Icon name="arrow" size={14} /></Link></li>
                ))}
              </ul>
              {s.activities.length > 5 && <Link href={`/learn/${k}`} className="more">+{s.activities.length - 5} more</Link>}
            </article>
          );
        })}
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { conjunctsOf, getConjCategory, CONJ_CATEGORIES, CONJUNCTS } from "@/data/conjuncts";
import Link from "next/link";
import { STORIES } from "@/data/stories";
import { findConjuncts } from "@/lib/conj-in-text";
import { requireAccess } from "@/lib/access";
import ConjunctQuiz from "../../../ConjunctQuiz";
import ConjunctTable from "../../../ConjunctTable";
import LessonFrame from "../../../LessonFrame";

export function generateStaticParams() {
  return CONJ_CATEGORIES.map((c) => ({ cat: c.id }));
}

export default async function Page({ params }: { params: Promise<{ cat: string }> }) {
  await requireAccess();
  const cat = getConjCategory((await params).cat);
  if (!cat) notFound();
  const rows = conjunctsOf(cat.id);
  const mine = new Set(rows.map((r) => r.conj));
  const inStories = STORIES.map((s) => ({ s, hit: findConjuncts([...s.lines.map((l) => l[0])]).filter((f) => mine.has(f.conj)) })).filter((x) => x.hit.length > 0);
  return (
    <LessonFrame lessonId={`reading/conj-${cat.id}`}>
      <h1><span lang="bn">{cat.bn}</span> <small className="muted">{cat.en}</small></h1>
      <p className="lede">{cat.blurb}</p>
      <p className="muted">{cat.look}</p>
      <h2>The conjuncts in this group <span className="muted">({rows.length})</span></h2>
      <p className="muted">Tap a word to hear it.</p>
      <ConjunctTable rows={rows} />
      {inStories.length > 0 && (
        <>
          <h2>See them in stories</h2>
          <ul className="pv-list">
            {inStories.map(({ s, hit }) => (
              <li key={s.id}><Link href={`/learn/reading/stories/${s.id}`}><b>{s.title[2]} <span lang="bn" className="muted">{s.title[0]}</span></b><small lang="bn">{hit.slice(0, 8).map((h) => h.conj).join("  ")}</small></Link></li>
            ))}
          </ul>
        </>
      )}
      <h2>Practice this group</h2>
      <ConjunctQuiz all={CONJUNCTS} categories={CONJ_CATEGORIES} fixed={cat.id} />
    </LessonFrame>
  );
}

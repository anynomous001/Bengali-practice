import { notFound } from "next/navigation";
import { conjunctsOf, getConjCategory, CONJ_CATEGORIES, CONJUNCTS } from "@/data/conjuncts";
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
  return (
    <LessonFrame lessonId={`reading/conj-${cat.id}`}>
      <h1><span lang="bn">{cat.bn}</span> <small className="muted">{cat.en}</small></h1>
      <p className="lede">{cat.blurb}</p>
      <p className="muted">{cat.look}</p>
      <h2>The conjuncts in this group <span className="muted">({rows.length})</span></h2>
      <p className="muted">Tap a word to hear it.</p>
      <ConjunctTable rows={rows} />
      <h2>Practice this group</h2>
      <ConjunctQuiz all={CONJUNCTS} categories={CONJ_CATEGORIES} fixed={cat.id} />
    </LessonFrame>
  );
}

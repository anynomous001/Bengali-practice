import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { GRAMMAR } from "@/data/grammar";
import { WORKOUT } from "@/data/tense-workout";
import StoryTitle from "../reading/stories/StoryTitle";

export default async function GrammarPage() {
  await requireAccess();
  const progress = await loadGrammarProgress();
  return (
    <main data-seg="grammar" className="wide">
      <Link href="/learn" className="back">← Home</Link>
      <h1>Grammar <span className="bn" lang="bn">ব্যাকরণ</span></h1>
      <p className="muted">Each topic has short lessons with tables and examples, then a practice quiz. Take them in order, or jump to what you need.</p>
      <div className="menu">
        <Link href="/learn/grammar/workout" className="card activity">
          <b>Tense workout</b>
          <span>Ten rounds of drills: tense cues, negatives, spot the mistake, translate, rewrite and combine sentences.</span>
          <span className="chips"><span className="chip">{WORKOUT.reduce((n, r) => n + r.items.length, 0)} items</span><span className="chip">auto-checked and write-then-check</span></span>
        </Link>
        {GRAMMAR.map((t) => {
          const r = progress[t.id];
          return (
            <Link key={t.id} href={`/learn/grammar/${t.id}`} className="card activity">
              <StoryTitle bn={t.title[0]} roman={t.title[1]} en={t.title[2]} />
              <span>{t.blurb}</span>
              <span className="chips">
                <span className="chip">{t.sections.length} lessons</span>
                <span className={"chip" + (r ? " ok" : "")}>{r ? `Practice ${r.score}/${r.total}` : `${t.exercises.length} questions`}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

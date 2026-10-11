import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { GRAMMAR } from "@/data/grammar";
import StoryTitle from "../reading/stories/StoryTitle";

export default async function GrammarPage() {
  await requireAccess();
  const progress = await loadGrammarProgress();
  return (
    <main data-seg="grammar">
      <Link href="/learn" className="back">← All segments</Link>
      <h1>📐 Grammar <span className="bn">ব্যাকরণ</span></h1>
      <p className="muted">Each topic has short lessons with tables and examples, then a practice quiz. Take them in order, or jump to what you need.</p>
      <div className="menu">
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

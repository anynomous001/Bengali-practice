import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress } from "@/lib/progress";
import { WORKOUT } from "@/data/tense-workout";

export default async function WorkoutPage() {
  await requireAccess();
  const progress = await loadGrammarProgress();
  return (
    <main data-seg="grammar">
      <Link href="/learn/grammar" className="back">← Grammar</Link>
      <h1>Tense workout</h1>
      <p className="muted">Ten rounds to practise tenses, persons and linking words. Rounds marked <b>auto-checked</b> mark your answer straight away. Rounds marked <b>write, then check</b> ask you to write first (on paper is fine), then show a model answer and ask you to judge yourself.</p>
      <div className="menu">
        {WORKOUT.map((r, i) => {
          const s = progress[`w-${r.id}`];
          return (
            <Link key={r.id} href={`/learn/grammar/workout/${r.id}`} className="card activity">
              <b>{i + 1}. {r.title}</b>
              <span>{r.intro}</span>
              <span className="chips">
                <span className="chip">{r.items.length} items</span>
                <span className="chip">{r.mode === "check" ? "auto-checked" : "write, then check"}</span>
                <span className={"chip" + (s ? " ok" : "")}>{s ? `Best ${s.score}/${s.total}` : "Not tried"}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

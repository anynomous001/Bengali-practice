import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadStoryProgress } from "@/lib/progress";
import { STORIES } from "@/data/stories";
import StoryTitle from "./StoryTitle";

export default async function StoriesPage() {
  await requireAccess();
  const progress = await loadStoryProgress();
  return (
    <main data-seg="reading">
      <Link href="/learn/reading" className="back">← Reading</Link>
      <h1>Stories</h1>
      <p className="muted">Short fables to read. Each one has words to learn, then the story in layers, then a quiz. Start with Level 1.</p>
      <div className="menu">
        {STORIES.map((s) => {
          const r = progress[s.id];
          return (
            <Link key={s.id} href={`/learn/reading/stories/${s.id}`} className="card activity">
              <StoryTitle bn={s.title[0]} roman={s.title[1]} en={s.title[2]} />
              <span className="chips">
                <span className="chip">Level {s.level}</span>
                <span className="chip">{s.lines.length + 1} lines</span>
                <span className={"chip" + (r ? " ok" : "")}>{r ? `Quiz ${r.score}/${r.total}` : "Quiz not tried"}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

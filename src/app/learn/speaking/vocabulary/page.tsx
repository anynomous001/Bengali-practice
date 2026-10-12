import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { loadGrammarProgress, loadLessonProgress } from "@/lib/progress";
import { VOCAB, VOCAB_GROUPS, wordCount } from "@/data/vocabulary";
import Icon from "../../Icon";
import LessonStatus from "../../LessonStatus";
import WordRow from "../../WordRow";

const MAX = 120;

export default async function VocabularyPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireAccess();
  const q = ((await searchParams).q ?? "").trim().slice(0, 60);
  const total = VOCAB.reduce((n, t) => n + wordCount(t), 0);
  const phrases = VOCAB.reduce((n, t) => n + t.phrases.length, 0);

  const needle = q.toLowerCase();
  const hits = needle
    ? VOCAB.flatMap((t) => t.sections.flatMap((s) => s.words.map((w) => ({ t, w }))))
        .filter(({ w }) => w[0].includes(q) || w[1].toLowerCase().includes(needle) || w[2].toLowerCase().includes(needle))
    : [];

  const [{ done }, best] = await Promise.all([loadLessonProgress(), loadGrammarProgress()]);

  return (
    <main data-seg="speaking" className="wide vocab-home">
      <Link href="/learn/speaking" className="back">← Speaking</Link>
      <header className="page-head">
        <span className="page-icon"><Icon name="list" size={26} /></span>
        <div>
          <h1>Vocabulary</h1>
          <p className="lede">{total} words and {phrases} phrases in {VOCAB.length} topics. Search for any word, or pick a topic to study.</p>
        </div>
      </header>

      <form className="finder" action="/learn/speaking/vocabulary" role="search">
        <input name="q" type="search" defaultValue={q} placeholder="Search in Bengali, romanized or English: water, jol, জল" aria-label="Search words" />
        <button className="btn">Search</button>
        {q && <Link href="/learn/speaking/vocabulary" className="btn ghost">Clear</Link>}
      </form>

      {q ? (
        <section>
          <h2 className="section-title">{hits.length ? `${hits.length} ${hits.length === 1 ? "word" : "words"} for “${q}”` : `No words for “${q}”`}</h2>
          {hits.length === 0 && <p className="muted">Try a shorter search, or search in English.</p>}
          <ul className="wlist results">
            {hits.slice(0, MAX).map(({ t, w }) => (
              <li key={t.id + w[0]} className="hit">
                <WordRow bn={w[0]} roman={w[1]} en={w[2]} />
                <Link className="hit-topic" href={`/learn/speaking/vocabulary/${t.id}`}>{t.title[2]}</Link>
              </li>
            ))}
          </ul>
          {hits.length > MAX && <p className="muted">Showing the first {MAX}. Search for something more specific to narrow it down.</p>}
        </section>
      ) : (
        VOCAB_GROUPS.map((g) => (
          <section key={g.id}>
            <h2 className="section-title">{g.title}</h2>
            <div className="menu topics">
              {VOCAB.filter((t) => t.group === g.id).map((t) => {
                const b = best[`v-${t.id}`];
                return (
                  <Link key={t.id} href={`/learn/speaking/vocabulary/${t.id}`} className="card topic">
                    <span className="topic-top"><LessonStatus done={done.has(`speaking/vocab-${t.id}`)} size={18} /><span lang="bn">{t.title[0]}</span></span>
                    <b>{t.title[2]}</b>
                    <span>{wordCount(t)} words · {t.phrases.length} phrases</span>
                    {b && <span className="chip ok">Best {b.score}/{b.total}</span>}
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

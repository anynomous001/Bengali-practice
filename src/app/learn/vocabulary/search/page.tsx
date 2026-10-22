import Link from "next/link";
import { requireAccess } from "@/lib/access";
import { VOCAB, wordCount } from "@/data/vocabulary";
import Icon, { IconTile } from "../../Icon";
import WordRow from "../../WordRow";

const MAX = 120;
const EXAMPLES = ["water", "jol", "জল", "mother", "bazar", "tea", "market", "ghor"];

export default async function WordFinderPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requireAccess();
  const q = ((await searchParams).q ?? "").trim().slice(0, 60);
  const total = VOCAB.reduce((n, t) => n + wordCount(t), 0);

  const needle = q.toLowerCase();
  const hits = needle
    ? VOCAB.flatMap((t) => t.sections.flatMap((s) => s.words.map((w) => ({ t, w }))))
        .filter(({ w }) => w[0].includes(q) || w[1].toLowerCase().includes(needle) || w[2].toLowerCase().includes(needle))
    : [];

  return (
    <main data-seg="vocabulary" className="wide vocab-home">
      <Link href="/learn/vocabulary" className="back"><Icon name="prev" size={16} />Vocabulary</Link>
      <header className="page-head">
        <IconTile name="list" tone="vocabulary" size={60} />
        <div>
          <h1>Word finder</h1>
          <p className="lede">Search all {total} words by Bengali, romanized or English.</p>
        </div>
      </header>

      <form className="finder" action="/learn/vocabulary/search" role="search">
        <input name="q" type="search" defaultValue={q} placeholder="Search: water, jol, জল" aria-label="Search words" autoFocus={!q} />
        <button className="btn">Search</button>
        {q && <Link href="/learn/vocabulary/search" className="btn ghost">Clear</Link>}
      </form>

      {q ? (
        <section>
          <h2 className="section-title">{hits.length ? `${hits.length} ${hits.length === 1 ? "word" : "words"} for “${q}”` : `No words for “${q}”`}</h2>
          {hits.length === 0 && <p className="muted">Try a shorter search, or search in English.</p>}
          <ul className="wlist results">
            {hits.slice(0, MAX).map(({ t, w }) => (
              <li key={t.id + w[0]} className="hit">
                <WordRow bn={w[0]} roman={w[1]} en={w[2]} />
                <Link className="hit-topic" href={`/learn/vocabulary/${t.id}`}>{t.title[2]}</Link>
              </li>
            ))}
          </ul>
          {hits.length > MAX && <p className="muted">Showing the first {MAX}. Search for something more specific to narrow it down.</p>}
        </section>
      ) : (
        <section>
          <h2 className="section-title">Try one of these</h2>
          <div className="chips">
            {EXAMPLES.map((e) => <Link key={e} className="chip" href={`/learn/vocabulary/search?q=${encodeURIComponent(e)}`}>{e}</Link>)}
          </div>
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { CONJ_CATEGORIES } from "@/data/conjuncts";
import type { Story } from "@/data/stories";
import { findConjuncts } from "@/lib/conj-in-text";
import ConjunctTable from "./ConjunctTable";

/** The conjuncts in a story, word by word, with the group each belongs to and a link to learn it. */
export default function StoryConjuncts({ story }: { story: Story }) {
  const lines = [...story.lines.map((l) => l[0]), ...(story.moral ? [story.moral[0]] : [])];
  const found = findConjuncts(lines);
  if (!found.length) return null;
  const vocab = new Map(story.vocab.map((v) => [v[0], v] as const));
  const name = (cat: string | null) => CONJ_CATEGORIES.find((c) => c.id === cat)?.bn ?? "Other";
  const rows = found.map((f) => ({
    id: f.conj, conj: f.conj, parts: f.parts, group: name(f.cat),
    words: f.words.map((w) => { const v = vocab.get(w); return v ? { bn: w, ro: v[1], en: v[2] } : { bn: w }; }),
  }));
  const groups = [...new Set(found.map((f) => f.cat).filter((c): c is string => !!c))];
  return (
    <section className="story-conj">
      <h2>Conjuncts in this story <span className="muted">({found.length})</span></h2>
      <p className="muted">Each word below holds a conjunct (যুক্তাক্ষর). Tap a word to hear it.</p>
      <ConjunctTable rows={rows} />
      {groups.length > 0 && (
        <p className="muted">Learn the groups: {groups.map((g, i) => (
          <span key={g}>{i > 0 && ", "}<Link href={`/learn/reading/conjuncts/${g}`} lang="bn">{name(g)}</Link></span>
        ))}.</p>
      )}
    </section>
  );
}

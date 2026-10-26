import { requireAccess } from "@/lib/access";
import { VOCAB } from "@/data/vocabulary";
import MemoryGame, { type MemRound, type MemWord } from "../../MemoryGame";
import LessonFrame from "../../LessonFrame";

// Everyday nouns from topics where every word has a recorded clip. One word, no spaces, so they are easy to say and to tell apart.
const TOPICS = ["fruits", "animals", "things", "clothes", "house"];
const ROUNDS = 5;

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeRounds(): MemRound[] {
  const seen = new Set<string>();
  const pool: MemWord[] = [];
  for (const t of VOCAB.filter((x) => TOPICS.includes(x.id)))
    for (const s of t.sections) for (const w of s.words) {
      if (w[0].includes(" ") || [...w[0]].length > 8 || seen.has(w[0]) || seen.has(w[2])) continue;
      seen.add(w[0]); seen.add(w[2]);
      pool.push({ bn: w[0], ro: w[1], en: w[2] });
    }
  const words = shuffle(pool).slice(0, ROUNDS * 8);
  return Array.from({ length: ROUNDS }, (_, r) => {
    const group = words.slice(r * 8, r * 8 + 8);
    return { targets: group.slice(0, 3), options: shuffle(group) };
  });
}

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="speaking/listen-memory">
      <h1>Three-word memory game</h1>
      <p className="lede">The memory check you do with a patient, for your own ears. Hear three words, count backwards for a few seconds, then pick the three words from a list.</p>
      <MemoryGame rounds={makeRounds()} />
    </LessonFrame>
  );
}

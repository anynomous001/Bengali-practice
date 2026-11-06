// Finds the conjuncts (যুক্তাক্ষর) in Bengali text. A conjunct is a consonant, then one or more (hasanta + consonant).
import { CONJUNCTS } from "@/data/conjuncts";

const VIRAMA = "্";
const CLUSTER = /[ক-হড়-য়](?:্[ক-হড়-য়])+/g;
const TOKEN_SPLIT = /[\s।,.?!"'“”:;()\-–]+/;

export type FoundConjunct = { conj: string; parts: string[]; cat: string | null; words: string[] };

const byConj = new Map<string, string>();
for (const c of CONJUNCTS) if (!byConj.has(c.conj)) byConj.set(c.conj, c.cat);

/** Every conjunct in the lines, in the order it first appears, with the words that hold it (up to six). */
export function findConjuncts(lines: string[]): FoundConjunct[] {
  const found = new Map<string, FoundConjunct>();
  for (const line of lines) {
    for (const token of line.split(TOKEN_SPLIT)) {
      if (!token) continue;
      const seen = new Set<string>();
      for (const m of token.matchAll(CLUSTER)) {
        const conj = m[0];
        if (seen.has(conj)) continue;
        seen.add(conj);
        const e = found.get(conj) ?? { conj, parts: conj.split(VIRAMA), cat: byConj.get(conj) ?? null, words: [] };
        if (!e.words.includes(token) && e.words.length < 6) e.words.push(token);
        found.set(conj, e);
      }
    }
  }
  return [...found.values()];
}

// Word-by-word meanings for hover pop-ups. Built on the server from the course word lists, then only the words a page
// actually shows are sent to the browser (so the full dictionary never ships in the public JS bundle).
import { VOCAB } from "@/data/vocabulary";
import { DEV_VOCAB } from "@/data/devotional";
import { SCENARIOS } from "@/data/roleplay";
import { DEV_SCENARIOS } from "@/data/devotional";
import { EXTRA_GLOSS } from "@/data/gloss-extra";

export type Gloss = Record<string, string>;

const PUNCT = /[\s.,!?;:'"“”‘’()\[\]{}\-–—।॥/…]+/;
const SUFFIXES = ["গুলোর", "গুলোকে", "গুলো", "গুলি", "টাকে", "টার", "টা", "টি", "খানা", "দের", "রা", "কে", "েরই", "ের", "র", "তে", "য়", "ে", "ও"];

let index: Map<string, string> | null = null;

function shortEn(en: string) {
  // "to give, to offer" stays as is; strip a trailing parenthetical note to keep the pop-up short.
  return en.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function add(map: Map<string, string>, bn: string, en: string, force = false) {
  const key = bn.trim();
  if (!key || /\s/.test(key) || !en) return;
  if (force || !map.has(key)) map.set(key, shortEn(en));
}

function build() {
  const m = new Map<string, string>();
  // Lines from a scenario's own word list come first, so a word means what it means in that role play.
  for (const s of [...SCENARIOS, ...DEV_SCENARIOS]) for (const w of s.words) add(m, w[0], w[2]);
  for (const t of [...VOCAB, ...DEV_VOCAB]) for (const sec of t.sections) for (const w of sec.words) add(m, w[0], w[2]);
  for (const [bn, en] of Object.entries(EXTRA_GLOSS)) add(m, bn, en, true);
  return m;
}

/** Split text into its words, dropping punctuation. */
export function tokens(text: string) {
  return text.split(PUNCT).filter((t) => /[ঀ-৿]/.test(t));
}

/** Meaning for one word: exact, or the word with a common ending (টা, কে, র, তে...) taken off. */
export function glossFor(word: string): string | undefined {
  index ??= build();
  const hit = index.get(word);
  if (hit) return hit;
  for (const suf of SUFFIXES) {
    if (word.length > suf.length + 1 && word.endsWith(suf)) {
      const base = word.slice(0, -suf.length);
      const b = index.get(base);
      if (b) return `${base}: ${b}`;
    }
  }
  return undefined;
}

/** The meanings for every word in these lines. Send this to the page's GlossProvider. */
export function glossFrom(texts: string[]): Gloss {
  const out: Gloss = {};
  for (const t of texts) for (const w of tokens(t)) {
    if (out[w] !== undefined) continue;
    const g = glossFor(w);
    if (g) out[w] = g;
  }
  return out;
}

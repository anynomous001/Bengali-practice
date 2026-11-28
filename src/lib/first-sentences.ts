// The answer checking for the "First Sentences" practice (Kids). Pure functions, so they are easy to test and the screens stay thin.
// The screens never show an answer before the child has answered; they only ask these functions "is this right?".
import type { BuildItem, FixItem, MeaningItem, Word } from "@/data/kids-first-sentences";

/** A random number in [0, 1). Tests pass a fixed one. */
export type Rng = () => number;

const norm = (s: string) => s.trim().toLowerCase().replace(/[.,!?।'’"]/g, "");

/** Fisher-Yates shuffle that never changes the input. */
export function shuffled<T>(items: T[], rng: Rng = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle, but make sure the result is not already the right order (when there is more than one possible order). */
export function shuffledNotSame<T>(items: T[], same: (a: T, b: T) => boolean, rng: Rng = Math.random): T[] {
  const alike = (x: T[]) => x.every((t, i) => same(t, items[i]));
  if (items.length < 2 || items.every((t) => same(t, items[0]))) return items.slice();
  let out = shuffled(items, rng);
  for (let tries = 0; alike(out) && tries < 20; tries++) out = shuffled(items, rng);
  if (alike(out)) out = [...items.slice(1), items[0]]; // a guaranteed different order
  return out;
}

// ---------------------------------------------------------------- A. Fix it!
/** Which word in the sentence does not match the English? */
export function wrongIndex(item: FixItem): number {
  return item.sentence.findIndex((w) => norm(w.roman) === norm(item.wrong));
}
/** The child tapped a word: was it the wrong one? */
export function checkFixTap(item: FixItem, tapped: number): boolean {
  return tapped === wrongIndex(item);
}
/** The child chose a replacement: is it the right word? */
export function checkFixChoice(item: FixItem, chosen: Word): boolean {
  return norm(chosen.roman) === norm(item.fix.roman);
}
/** The sentence with the wrong word replaced by the right one. */
export function fixedSentence(item: FixItem): Word[] {
  return item.sentence.map((w, i) => (i === wrongIndex(item) ? item.fix : w));
}

// ---------------------------------------------------------------- B. Build the sentence
export type Tile = { key: string; word: Word };
/** Shuffled tiles with their own keys (two tiles can show the same word), never in the right order. */
export function buildTiles(item: BuildItem, rng: Rng = Math.random): Tile[] {
  const tiles = item.tiles.map((word, i) => ({ key: `${item.id}-${i}`, word }));
  return shuffledNotSame(tiles, (a, b) => norm(a.word.roman) === norm(b.word.roman), rng);
}
export type BuildResult = "empty" | "incomplete" | "correct" | "wrong";
/** Is the order of the placed tiles the right sentence? Compared word by word, so tiles that show the same word are interchangeable. */
export function checkBuild(item: BuildItem, placed: Tile[]): BuildResult {
  if (!placed.length) return "empty";
  if (placed.length < item.tiles.length) return "incomplete";
  const ok = placed.length === item.tiles.length && placed.every((t, i) => norm(t.word.roman) === norm(item.tiles[i].roman));
  return ok ? "correct" : "wrong";
}

// ---------------------------------------------------------------- C. What does it mean?
/** Make "I'm" and "I am" the same, and ignore capitals, spaces and punctuation, so a typed answer is judged kindly. */
export function normalizeMeaning(s: string): string {
  return norm(s.replace(/’/g, "'").replace(/\bi'm\b/gi, "i am").replace(/\bdon't\b/gi, "do not"))
    .replace(/\s+/g, " ")
    .trim();
}
/** A typed answer: right if it matches the meaning (or one of the accepted spellings) after normalising. */
export function checkMeaningTyped(item: MeaningItem, typed: string): boolean {
  const t = normalizeMeaning(typed);
  if (!t) return false;
  return [item.meaning, ...(item.accept ?? [])].some((m) => normalizeMeaning(m) === t);
}
/** The choices for one item: its meaning and (count - 1) other, different meanings. Shuffled. */
export function meaningOptions(items: MeaningItem[], index: number, count = 3, rng: Rng = Math.random): string[] {
  const right = items[index].meaning;
  const others = shuffled(items.filter((_, i) => i !== index).map((m) => m.meaning).filter((m) => normalizeMeaning(m) !== normalizeMeaning(right)), rng);
  const picked = [...new Set(others)].slice(0, Math.max(1, count - 1));
  return shuffled([right, ...picked], rng);
}
export function checkMeaningChoice(item: MeaningItem, chosen: string): boolean {
  return normalizeMeaning(chosen) === normalizeMeaning(item.meaning);
}

// The checking rules for the Kitchen Bengali practice exercises. No React in here, so they can be tested on their own.

/** Build: the tiles in the order the learner tapped them must be exactly the answer's words. */
export const checkBuild = (built: string[], answer: string) => built.join(" ") === answer;

/** Counter: the first word of the answer is the number with its counter, for example তিনটে. */
export const checkCounter = (chosen: string, answer: string) => chosen === answer.split(" ")[0];

/** Fill: the chosen word must be the answer. */
export const checkFill = (chosen: string | null, answer: string) => chosen === answer;

/** Categorise: how many words were put in the right category, and which were wrong. */
export function checkCategories(picks: Record<string, string>, categories: { name: string; words: string[] }[]) {
  const right = new Map(categories.flatMap((c) => c.words.map((w) => [w, c.name] as const)));
  const wrong = [...right.keys()].filter((w) => picks[w] !== right.get(w));
  return { correct: right.size - wrong.length, total: right.size, wrong };
}

/** Dialogue: which blanks are right. A blank left empty is wrong. */
export const checkDialogue = (picks: (string | null)[], answers: string[]) => answers.map((a, i) => picks[i] === a);

/** The words for the tiles of one build item: the answer's words and the extra words, in a random order. */
export function tilesFor(answer: string, extra: string[], rand: () => number = Math.random): string[] {
  const a = [...answer.split(" "), ...extra];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

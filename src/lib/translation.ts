import { GRAMMAR } from "@/data/grammar";
import { VOCAB } from "@/data/vocabulary";
import { SENTENCES } from "@/data/sentences";

export type Source = "all" | "phrases" | "grammar";
export type Direction = "en2bn" | "bn2en";
export type Pair = { bn: string; ro: string; en: string; src: "phrases" | "grammar" };
export type TOption = { text?: string; bn?: string; ro?: string };
export type TQuestion = { prompt: string; promptRo?: string; options: TOption[]; answer: number; src: string };

export const TRANSLATE_LEN = 10;

export const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
};

let cache: Pair[] | null = null;
/** Every clean sentence pair the app knows: vocabulary phrases, the class sentences, and grammar examples. */
export function bank(): Pair[] {
  if (cache) return cache;
  const seen = new Set<string>();
  const out: Pair[] = [];
  const add = (bn: string, ro: string, en: string, src: Pair["src"]) => {
    const e = en.trim();
    if (!bn || !e || e.length > 110 || bn.includes("___")) return;
    if (/[(ঀ-৿]/.test(e)) return; // annotated or mixed-script English is not a clean translation target
    if (seen.has(bn)) return;
    seen.add(bn);
    out.push({ bn, ro, en: e, src });
  };
  for (const t of VOCAB) for (const p of t.phrases) add(p[0], p[1], p[2], "phrases");
  for (const s of SENTENCES) add(s.bn.endsWith("।") || s.bn.endsWith("?") ? s.bn : s.bn + "।", s.rom, s.en.endsWith(".") || s.en.endsWith("?") ? s.en : s.en + ".", "phrases");
  for (const t of GRAMMAR) for (const sec of t.sections) for (const b of sec.blocks) if (b.t === "ex" || b.t === "rule") for (const it of b.items) add(it[0], it[1], it[2], "grammar");
  return (cache = out);
}

const words = (s: string) => s.trim().split(/\s+/).length;

/** Pick three wrong answers that look like the right one (similar length), never the same meaning. */
function distractors(correct: Pair, dir: Direction, all: Pair[]): Pair[] {
  const near = shuffle(all.filter((p) => p.bn !== correct.bn && p.en.toLowerCase() !== correct.en.toLowerCase()));
  const key = (p: Pair) => (dir === "en2bn" ? words(p.bn) : words(p.en));
  const target = key(correct);
  const close = near.filter((p) => Math.abs(key(p) - target) <= 1);
  return [...close, ...near].filter((p, i, arr) => arr.findIndex((q) => q.bn === p.bn) === i).slice(0, 3);
}

export function makeRound(dir: Direction, source: Source, n = TRANSLATE_LEN): TQuestion[] {
  const all = bank();
  const pool = source === "all" ? all : all.filter((p) => p.src === source);
  return shuffle(pool).slice(0, n).map((p) => {
    const options = shuffle([p, ...distractors(p, dir, all)]);
    const toOpt = (x: Pair): TOption => (dir === "en2bn" ? { bn: x.bn, ro: x.ro } : { text: x.en });
    return {
      prompt: dir === "en2bn" ? p.en : p.bn,
      promptRo: dir === "bn2en" ? p.ro : undefined,
      options: options.map(toOpt),
      answer: options.indexOf(p),
      src: p.src,
    };
  });
}

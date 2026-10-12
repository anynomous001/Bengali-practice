import type { Cell } from "@/data/grammar";
import { GRAMMAR } from "@/data/grammar";
import { LETTERS } from "@/data/letters";
import { NUMBERS } from "@/data/numbers";
import { VOCAB } from "@/data/vocabulary";
import type { ExamId } from "@/data/exams";
import { makeRound, shuffle } from "./translation";

/** One exam question, with its answer. The answer and the reason are removed before the question is sent to the browser. */
export type ExamQ = {
  id: string;
  topic: string;
  inst: string;
  q: string;
  sentence: { bn: string; ro: string } | null;
  /** Bengali text the student can listen to. */
  audio?: string;
  options: Cell[];
  answer: number;
  why?: string;
};
export type PublicExamQ = Omit<ExamQ, "answer" | "why">;

const withShuffledOptions = (base: Omit<ExamQ, "options" | "answer">, options: Cell[], answer: number, why?: string): ExamQ => {
  const order = shuffle(options.map((o, k) => ({ o, k })));
  return { ...base, options: order.map((x) => x.o), answer: order.findIndex((x) => x.k === answer), why };
};

function grammarExam(count: number): ExamQ[] {
  const out: ExamQ[] = [];
  const pool: { topic: string; id: string; ex: (typeof GRAMMAR)[number]["exercises"][number]; i: number }[] = [];
  for (const t of GRAMMAR) t.exercises.forEach((ex, i) => pool.push({ topic: t.title[2], id: t.id, ex, i }));
  // one from each topic first, so every area is tested, then fill up at random
  const firsts = GRAMMAR.map((t) => shuffle(pool.filter((p) => p.id === t.id))[0]);
  const rest = shuffle(pool.filter((p) => !firsts.includes(p)));
  const translateCount = 3;
  const picks = [...shuffle(firsts), ...rest].slice(0, count - translateCount);
  for (const p of picks) {
    out.push(withShuffledOptions({ id: `g:${p.id}:${p.i}`, topic: p.topic, inst: p.ex.inst ?? "Choose the correct answer.", q: p.ex.q, sentence: p.ex.sentence }, p.ex.options, p.ex.answer, p.ex.why));
  }
  makeRound("en2bn", "all", translateCount).forEach((t, i) => {
    out.push({ id: `t:${i}`, topic: "Translation", inst: "Choose the Bengali sentence that means the same as the English sentence.", q: t.prompt, sentence: null, options: t.options.map((o) => ({ bn: o.bn ?? "", ro: o.ro ?? "" })), answer: t.answer, why: `Correct: ${t.options[t.answer].bn}` });
  });
  return shuffle(out);
}

type W = { bn: string; ro: string; en: string; topic: string };
const allWords = (): W[] => VOCAB.flatMap((t) => t.sections.flatMap((s) => s.words.map((w) => ({ bn: w[0], ro: w[1], en: w[2], topic: t.title[2] }))));

function wrongWords(w: W, pool: W[], n = 3): W[] {
  const same = pool.filter((x) => x.topic === w.topic && x.bn !== w.bn && x.en !== w.en);
  const others = pool.filter((x) => x.topic !== w.topic && x.bn !== w.bn && x.en !== w.en);
  return [...shuffle(same), ...shuffle(others)].filter((x, i, a) => a.findIndex((y) => y.en === x.en) === i).slice(0, n);
}

function vocabExam(count: number): ExamQ[] {
  const pool = allWords();
  const picks = shuffle(pool.filter((w, i, a) => a.findIndex((x) => x.bn === w.bn) === i)).slice(0, count);
  return picks.map((w, i): ExamQ => {
    const bad = wrongWords(w, pool);
    const kind = i % 5 < 2 ? "bn2en" : i % 5 < 4 ? "en2bn" : "listen";
    if (kind === "bn2en") return withShuffledOptions({ id: `v:${i}`, topic: w.topic, inst: "Choose the English meaning of the Bengali word.", q: w.bn, sentence: null }, [w.en, ...bad.map((b) => b.en)], 0, `${w.bn} means “${w.en}”.`);
    if (kind === "en2bn") return withShuffledOptions({ id: `v:${i}`, topic: w.topic, inst: "Choose the Bengali word for the English meaning.", q: w.en, sentence: null }, [{ bn: w.bn, ro: w.ro }, ...bad.map((b) => ({ bn: b.bn, ro: b.ro }))], 0, `“${w.en}” is ${w.bn}.`);
    return withShuffledOptions({ id: `v:${i}`, topic: w.topic, inst: "Press Play and listen. Then choose the meaning of the word you heard.", q: "What does the word mean?", sentence: null, audio: w.bn }, [w.en, ...bad.map((b) => b.en)], 0, `You heard ${w.bn}, which means “${w.en}”.`);
  });
}

function listeningExam(count: number): ExamQ[] {
  const per = Math.floor(count / 3);
  const out: ExamQ[] = [];
  const letters = shuffle(LETTERS).slice(0, per);
  for (const l of letters) {
    const bad = shuffle(LETTERS.filter((x) => x.ch !== l.ch)).slice(0, 3);
    out.push(withShuffledOptions({ id: `l:${out.length}`, topic: "Letter sounds", inst: "Press Play and listen. Then choose the letter you heard.", q: "Which letter did you hear?", sentence: null, audio: l.ch },
      [{ bn: l.ch, ro: l.rom }, ...bad.map((b) => ({ bn: b.ch, ro: b.rom }))], 0, `You heard ${l.ch} (${l.rom}).`));
  }
  for (const n of shuffle(NUMBERS).slice(0, per)) {
    const bad = shuffle(NUMBERS.filter((x) => x.value !== n.value)).slice(0, 3);
    out.push(withShuffledOptions({ id: `l:${out.length}`, topic: "Numbers", inst: "Press Play and listen. Then choose the number you heard.", q: "Which number did you hear?", sentence: null, audio: n.word },
      [{ bn: n.numeral, ro: n.wrom }, ...bad.map((b) => ({ bn: b.numeral, ro: b.wrom }))], 0, `You heard ${n.word}, which is ${n.numeral}.`));
  }
  const pool = allWords();
  for (const w of shuffle(pool).slice(0, count - out.length)) {
    const bad = wrongWords(w, pool);
    out.push(withShuffledOptions({ id: `l:${out.length}`, topic: "Words", inst: "Press Play and listen. Then choose the meaning of the word you heard.", q: "What does the word mean?", sentence: null, audio: w.bn }, [w.en, ...bad.map((b) => b.en)], 0, `You heard ${w.bn}, which means “${w.en}”.`));
  }
  return shuffle(out);
}

export function generateExam(id: ExamId, count: number): ExamQ[] {
  if (id === "grammar") return grammarExam(count);
  if (id === "vocabulary") return vocabExam(count);
  return listeningExam(count);
}

export const toPublic = (qs: ExamQ[]): PublicExamQ[] => qs.map(({ answer: _a, why: _w, ...rest }) => { void _a; void _w; return rest; });

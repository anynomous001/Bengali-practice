"use client";

import { useCallback, useEffect, useState } from "react";
import type { Letter } from "@/data/letters";
import { recordWriting } from "../../../actions";
import { useRoman } from "../../Roman";

function pieces(word: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(word)].map((s) => s.segment);
  }
  return Array.from(word);
}

function shuffled<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

type Q = { letter: Letter; target: string[]; tiles: { id: number; text: string }[] };

function makeQuestion(words: Letter[], prev?: string): Q {
  const options = words.filter((l) => l.ch !== prev && pieces(l.word!).length >= 2);
  const letter = options[Math.floor(Math.random() * options.length)];
  const target = pieces(letter.word!);
  const tiles = target.map((text, id) => ({ id, text }));
  let mix = shuffled(tiles);
  // Make sure the starting order isn't already the answer.
  for (let n = 0; n < 5 && mix.map((t) => t.text).join("") === letter.word; n++) mix = shuffled(tiles);
  return { letter, target, tiles: mix };
}

export default function Builder({ initialCounts, letters }: { initialCounts: Record<string, number>; letters: Letter[] }) {
  const { roman } = useRoman();
  const words = letters.filter((l) => l.word);
  const [q, setQ] = useState<Q | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [total, setTotal] = useState(() => Object.keys(initialCounts).filter((k) => k.startsWith("w:")).length);

  // Pick the first word after mount so server and client markup match.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setQ(makeQuestion(words)), []);

  const next = useCallback(() => {
    setQ((cur) => makeQuestion(words, cur?.letter.ch));
    setPicked([]);
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!q) return null;
  const built = picked.map((id) => q.tiles.find((t) => t.id === id)!.text);

  function pick(id: number) {
    if (result) return;
    const now = [...picked, id];
    setPicked(now);
    if (now.length === q!.tiles.length) {
      const ok = now.map((i) => q!.tiles.find((t) => t.id === i)!.text).join("") === q!.letter.word;
      setResult(ok ? "right" : "wrong");
      if (ok) {
        void recordWriting(`w:${q!.letter.ch}`);
        setTotal((t) => t + 1);
      }
    }
  }

  return (
    <>
      <p className="muted">{total} word{total === 1 ? "" : "s"} built so far</p>
      <div className="prompt">
        <span className="word-en">{q.letter.wmean}</span>
        {roman && <small>sounds like “{q.letter.wrom}”</small>}
      </div>
      <div className={"built" + (result ? " " + result : "")} aria-live="polite">
        {built.length ? built.join("") : <span className="muted">Tap the pieces in order</span>}
      </div>
      <div className="pieces">
        {q.tiles.map((t) => (
          <button key={t.id} className="piece" disabled={picked.includes(t.id) || !!result} onClick={() => pick(t.id)}>
            {t.text}
          </button>
        ))}
      </div>
      {result === "right" && <p className="feedback good">Correct! {q.letter.word}</p>}
      {result === "wrong" && <p className="feedback bad">Not quite. The word is {q.letter.word}.</p>}
      <button className="btn ghost" disabled={!picked.length || result === "right"} onClick={() => { setPicked([]); setResult(null); }}>Start over</button>
      {result && <button className="btn" onClick={next}>Next word →</button>}
    </>
  );
}

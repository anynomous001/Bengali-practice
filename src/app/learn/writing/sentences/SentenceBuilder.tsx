"use client";

import { useEffect, useState } from "react";
import { SENTENCES, type Sentence } from "@/data/sentences";
import { recordWriting } from "../../../actions";

function shuffled<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

type Q = { s: Sentence; tiles: { id: number; text: string }[] };

function makeQuestion(prev?: string): Q {
  const pool = SENTENCES.filter((s) => s.id !== prev);
  const s = pool[Math.floor(Math.random() * pool.length)];
  const tiles = s.bn.split(" ").map((text, id) => ({ id, text }));
  let mix = shuffled(tiles);
  for (let n = 0; n < 5 && mix.map((t) => t.text).join(" ") === s.bn; n++) mix = shuffled(tiles);
  return { s, tiles: mix };
}

export default function SentenceBuilder({ initialCounts }: { initialCounts: Record<string, number> }) {
  const [q, setQ] = useState<Q | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [total, setTotal] = useState(() => Object.keys(initialCounts).filter((k) => k.startsWith("s:")).length);

  // Choose the first sentence after mount so server and client markup match.
  useEffect(() => setQ(makeQuestion()), []);
  if (!q) return null;

  const text = (id: number) => q.tiles.find((t) => t.id === id)!.text;

  function pick(id: number) {
    if (result || !q) return;
    const now = [...picked, id];
    setPicked(now);
    if (now.length === q.tiles.length) {
      const ok = now.map(text).join(" ") === q.s.bn;
      setResult(ok ? "right" : "wrong");
      if (ok) {
        void recordWriting(`s:${q.s.id}`);
        setTotal((t) => t + 1);
      }
    }
  }

  return (
    <>
      <p className="muted">{total} of {SENTENCES.length} sentences built</p>
      <div className="prompt"><span className="word-en">{q.s.en}</span><small>{q.s.rom}</small></div>
      <div className={"built" + (result ? " " + result : "")} aria-live="polite">
        {picked.length ? picked.map(text).join(" ") : <span className="muted">Tap the words in order</span>}
      </div>
      <div className="pieces">
        {q.tiles.map((t) => (
          <button key={t.id} className="piece" disabled={picked.includes(t.id) || !!result} onClick={() => pick(t.id)}>{t.text}</button>
        ))}
      </div>
      {result === "right" && <p className="feedback good">Correct!</p>}
      {result === "wrong" && <p className="feedback bad">Not quite. It is: {q.s.bn}</p>}
      <button className="btn ghost" disabled={!picked.length || result === "right"} onClick={() => { setPicked([]); setResult(null); }}>Start over</button>
      {result && <button className="btn" onClick={() => { setQ(makeQuestion(q.s.id)); setPicked([]); setResult(null); }}>Next →</button>}
    </>
  );
}

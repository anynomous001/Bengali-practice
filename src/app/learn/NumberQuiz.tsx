"use client";

import { useState } from "react";
import type { Num } from "@/data/numbers";

type Mode = "n2w" | "w2n" | "listen";
type Kind = "numbers" | "prices";
type Run = { mode: Mode; kind: Kind; queue: Num[]; i: number; score: number };

const TAKA = "টাকা";

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "bn-BD";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

const numeralText = (n: Num, k: Kind) => (k === "prices" ? `${n.numeral} ${TAKA}` : n.numeral);
const wordText = (n: Num, k: Kind) => (k === "prices" ? `${n.word} ${TAKA}` : n.word);

export default function NumberQuiz({ numbers, listening }: { numbers: Num[]; listening?: boolean }) {
  const [kind, setKind] = useState<Kind>("numbers");
  const [run, setRun] = useState<Run | null>(null);

  const start = (mode: Mode) => setRun({ mode, kind, queue: shuffle(numbers).slice(0, 10), i: 0, score: 0 });

  if (!run) {
    return (
      <>
        <div className="menu">
          {listening ? (
            <button className="card" onClick={() => start("listen")}><b>Listen → numeral</b><span>Hear it, pick the numeral</span></button>
          ) : (
            <>
              <button className="card" onClick={() => start("n2w")}><b>Numeral → word</b><span>See ৫০, pick পঞ্চাশ</span></button>
              <button className="card" onClick={() => start("w2n")}><b>Word → numeral</b><span>See পঞ্চাশ, pick ৫০</span></button>
            </>
          )}
        </div>
        <p className="muted">Practise with:</p>
        <select value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
          <option value="numbers">Plain numbers</option>
          <option value="prices">Prices in {TAKA}</option>
        </select>
      </>
    );
  }

  if (run.i >= run.queue.length) {
    return (
      <>
        <h2>You scored {run.score} / {run.queue.length}</h2>
        <button className="btn" onClick={() => setRun(null)}>Back</button>
      </>
    );
  }

  return <Question key={run.i} run={run} setRun={setRun} numbers={numbers} />;
}

function Question({ run, setRun, numbers }: { run: Run; setRun: React.Dispatch<React.SetStateAction<Run | null>>; numbers: Num[] }) {
  const q = run.queue[run.i];
  const [options] = useState(() => shuffle([q, ...shuffle(numbers.filter((n) => n.value !== q.value)).slice(0, 3)]));
  const [picked, setPicked] = useState<number | null>(null);
  const { mode, kind } = run;
  const label = (n: Num) => (mode === "n2w" ? wordText(n, kind) : numeralText(n, kind));

  function choose(n: Num) {
    setPicked(n.value);
    if (n.value === q.value) setRun((r) => r && { ...r, score: r.score + 1 });
  }

  return (
    <>
      <p className="muted">Question {run.i + 1} of {run.queue.length} · Score {run.score}</p>
      {mode === "n2w" && <div className="big">{numeralText(q, kind)}</div>}
      {mode === "w2n" && <div className="prompt"><span className="word">{wordText(q, kind)}</span><small>{q.wrom}{kind === "prices" ? " taka" : ""}</small></div>}
      {mode === "listen" && <button className="btn big-btn" onClick={() => speak(wordText(q, kind))}>🔊 Play</button>}
      <div className={"options" + (mode === "n2w" ? "" : " letters")}>
        {options.map((o) => {
          const cls = picked !== null ? (o.value === q.value ? " right" : o.value === picked ? " wrong" : "") : "";
          return <button key={o.value} className={"opt" + cls} disabled={picked !== null} onClick={() => choose(o)}>{label(o)}</button>;
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">
            {picked === q.value ? "Correct!" : "Not quite."} {numeralText(q, kind)} = {wordText(q, kind)} ({q.wrom})
          </p>
          <button className="btn ghost" onClick={() => speak(wordText(q, kind))}>🔊 Hear it</button>
          <button className="btn" onClick={() => setRun((r) => r && { ...r, i: r.i + 1 })}>Next →</button>
        </>
      )}
    </>
  );
}

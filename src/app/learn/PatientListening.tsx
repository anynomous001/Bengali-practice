"use client";

import { useEffect, useState } from "react";
import { speak } from "@/lib/speak";
import Icon from "./Icon";
import { useRoman } from "./Roman";

type Line = [bn: string, ro: string, en: string];
type Run = { queue: Line[]; i: number; score: number };

const ROUND = 10;

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Hear what a patient says, then pick what it means. The Bengali text stays hidden until the student answers. */
export default function PatientListening({ lines }: { lines: Line[] }) {
  const [run, setRun] = useState<Run | null>(null);
  if (!run) {
    return (
      <>
        <p className="lede">You will hear {ROUND} things a patient may say. Listen, then pick what the patient means. You can play each one as often as you like.</p>
        <button className="btn big-btn" onClick={() => setRun({ queue: shuffle(lines).slice(0, ROUND), i: 0, score: 0 })}>Start</button>
      </>
    );
  }
  if (run.i >= run.queue.length) {
    return (
      <>
        <h2>You scored {run.score} / {run.queue.length}</h2>
        <p className="muted">{run.score >= 8 ? "You understand your patients well." : "Listen once more to the ones you missed, then try again."}</p>
        <button className="btn" onClick={() => setRun({ queue: shuffle(lines).slice(0, ROUND), i: 0, score: 0 })}>Try again</button>
      </>
    );
  }
  return <Question key={run.i} run={run} setRun={setRun} lines={lines} />;
}

function Question({ run, setRun, lines }: { run: Run; setRun: React.Dispatch<React.SetStateAction<Run | null>>; lines: Line[] }) {
  const q = run.queue[run.i];
  const [options] = useState(() => shuffle([q[2], ...shuffle(lines.filter((l) => l[2] !== q[2])).slice(0, 3).map((l) => l[2])]));
  const [picked, setPicked] = useState<string | null>(null);
  const { roman } = useRoman();

  // The line plays by itself when the question appears, then again whenever the student taps Play.
  useEffect(() => { speak(q[0]); }, [q]);

  function choose(en: string) {
    setPicked(en);
    if (en === q[2]) setRun((r) => r && { ...r, score: r.score + 1 });
  }

  return (
    <>
      <p className="muted">Question {run.i + 1} of {run.queue.length} · Score {run.score}</p>
      <p>What does the patient mean?</p>
      <button className="btn big-btn" onClick={() => speak(q[0])}><Icon name="sound" size={18} /> Play</button>
      <div className="options">
        {options.map((o) => {
          const cls = picked !== null ? (o === q[2] ? " right" : o === picked ? " wrong" : "") : "";
          return <button key={o} className={"opt text" + cls} disabled={picked !== null} onClick={() => choose(o)}>{o}</button>;
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q[2] ? "Correct!" : "Not quite."}</p>
          <p><span lang="bn" className="g-ex-bn">{q[0]}</span>{roman && <span className="g-ro-line">{q[1]}</span>}</p>
          <button className="btn" onClick={() => setRun((r) => r && { ...r, i: r.i + 1 })}>Next</button>
        </>
      )}
    </>
  );
}

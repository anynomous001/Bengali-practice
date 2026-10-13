"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Cell } from "@/data/grammar";
import type { WorkItem, WorkRound } from "@/data/tense-workout";
import { recordGrammarQuiz } from "../../../../actions";
import { CellView, shuffle } from "../../../LessonReader";
import { useRoman } from "../../../Roman";

type Best = { score: number; total: number; attempts: number } | null;

export default function WorkoutReader({ round, best }: { round: WorkRound; best: Best }) {
  const [run, setRun] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const total = round.items.length;

  function done(correct: boolean) {
    const next = score + (correct ? 1 : 0);
    setScore(next);
    if (i + 1 >= total) void recordGrammarQuiz(`w-${round.id}`, next);
    setI(i + 1);
  }

  return (
    <>
      <h1>{round.title}</h1>
      <p className="lede">{round.intro}</p>
      <p className="muted"><span className="q-kind">{round.mode === "check" ? "Checked for you" : "Write, then check"}</span> {total} items{best && i === 0 ? ` · your best: ${best.score} / ${best.total}` : ""}</p>
      {i >= total ? (
        <div className="card-static">
          <h2>You scored {score} / {total}</h2>
          <p>{score === total ? "Perfect score." : score >= total * 0.8 ? "Very good." : "Look at the tense lessons and tables again, then try once more."}</p>
          <button className="btn" onClick={() => { setRun((r) => r + 1); setI(0); setScore(0); }}>Try again</button>
          <Link className="btn ghost" href="/learn/grammar">Back to the course</Link>
        </div>
      ) : (
        <Item key={`${run}-${i}`} item={round.items[i]} n={i + 1} total={total} score={score} onDone={done} />
      )}
    </>
  );
}

function Item({ item, n, total, score, onDone }: { item: WorkItem; n: number; total: number; score: number; onDone: (ok: boolean) => void }) {
  const { roman } = useRoman();
  // Shuffle after mount so the server and the browser never disagree (and the answer order is never shown unshuffled).
  const [order, setOrder] = useState<{ o: Cell; k: number }[]>([]);
  useEffect(() => {
    if (item.kind === "choose") setOrder(shuffle(item.options.map((o, k) => ({ o, k }))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [picked, setPicked] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <div className="q-card">
      <div className="q-top">
        <span className="q-kind">{item.kind === "choose" ? "Choose the answer" : "Write the answer"}</span>
        <span className="q-count">{n} of {total} · score {score}</span>
      </div>
      <div className="bar" aria-hidden><div style={{ width: `${((n - 1) / total) * 100}%` }} /></div>
      <p className="q-inst"><b>What to do:</b> {item.kind === "choose" ? "Read the instruction below and choose the correct Bengali sentence. You will see straight away whether you were right." : "Write the Bengali sentence the instruction asks for, in the box or on paper. Then press Show model answer, compare, and say honestly whether you got it."}</p>
      <h3 className="quiz-q">{item.q}</h3>
      {item.sentence && (
        <p className="g-sentence">
          <span lang="bn" className="g-ex-bn">{item.sentence.bn}</span>
          {roman && <span className="g-ro-line">{item.sentence.ro}</span>}
        </p>
      )}

      {item.kind === "choose" ? (
        <>
          <div className="options">
            {order.map(({ o, k }) => {
              const cls = picked === null ? "" : k === item.answer ? " right" : k === picked ? " wrong" : "";
              return (
                <button key={k} className={"opt text g-opt" + cls} disabled={picked !== null} onClick={() => setPicked(k)}>
                  <CellView cell={o} roman={roman} />
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <p className="feedback">{picked === item.answer ? "Correct! " : "Not quite. "}<span className="g-why">{item.why}</span></p>
              <button className="btn" onClick={() => onDone(picked === item.answer)}>{n === total ? "See my score" : "Next"}</button>
            </>
          )}
        </>
      ) : (
        <>
          <label className="visually-hidden" htmlFor="draft">Your answer</label>
          <textarea id="draft" className="draft" rows={3} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write your answer here, or on paper. This box is just for you; it is not marked." />
          {!shown ? (
            <button className="btn" onClick={() => setShown(true)}>Show model answer</button>
          ) : (
            <>
              <div className="model">
                <p className="model-label">Model answer</p>
                <span lang="bn" className="g-ex-bn">{item.answer.bn}</span>
                {roman && <span className="g-ro-line">{item.answer.ro}</span>}
                {item.also && <p className="g-also"><b>Also fine:</b> <span lang="bn">{item.also}</span></p>}
                <p className="g-why">{item.why}</p>
              </div>
              <p className="muted">Compare with what you wrote. Did you use the right tense and verb ending?</p>
              <div className="step-nav">
                <button className="btn ghost" onClick={() => onDone(false)}>Not yet</button>
                <button className="btn" onClick={() => onDone(true)}>I got it</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

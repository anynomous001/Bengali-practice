"use client";

import { useState } from "react";
import type { Block, Cell, Exercise, ExerciseKind, GrammarTopic } from "@/data/grammar";
import { recordGrammarQuiz } from "../actions";
import Icon from "./Icon";
import { useRoman } from "./Roman";
import BnText from "./BnText";

export function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CellView({ cell, roman }: { cell: Cell; roman: boolean }) {
  if (typeof cell === "string") return <BnText text={cell} />;
  return (
    <>
      <span lang="bn" className="g-bn">{cell.bn}</span>
      {roman && cell.ro && <small className="g-ro">{cell.ro}</small>}
    </>
  );
}

function Examples({ items, roman }: { items: [string, string, string][]; roman: boolean }) {
  return (
    <ul className="g-exlist">
      {items.map(([bn, ro, en]) => (
        <li key={bn}>
          <span lang="bn" className="g-ex-bn">{bn}</span>
          {roman && <span className="g-ro-line">{ro}</span>}
          <span className="g-en gloss">{en}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockView({ block, roman }: { block: Block; roman: boolean }) {
  switch (block.t) {
    case "p":
      return <p className="g-p"><BnText text={block.text} /></p>;
    case "h":
      return <h3 className="g-h"><BnText text={block.text} /></h3>;
    case "note":
      return <p className="g-note"><b>Note:</b> <BnText text={block.text} /></p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <div className="g-list">
          {block.title && <h3><BnText text={block.title} /></h3>}
          <Tag>{block.items.map((it, i) => <li key={i}><BnText text={it} /></li>)}</Tag>
        </div>
      );
    }
    case "rule":
      return (
        <div className="g-rule">
          <p className="g-rule-title"><BnText text={block.title} /></p>
          <p className="g-rule-text"><BnText text={block.text} /></p>
          {block.items.length > 0 && <Examples items={block.items} roman={roman} />}
        </div>
      );
    case "mistakes":
      return (
        <div className="g-mistakes">
          <h3><BnText text={block.title} /></h3>
          <ul>
            {block.items.map(([wb, wr, rb, rr, why]) => (
              <li key={wb}>
                <p className="mis wrong"><Icon name="close" size={16} /><span><span lang="bn" className="g-ex-bn">{wb}</span>{roman && <span className="g-ro-line">{wr}</span>}</span></p>
                <p className="mis right"><Icon name="check" size={16} /><span><span lang="bn" className="g-ex-bn">{rb}</span>{roman && <span className="g-ro-line">{rr}</span>}</span></p>
                <p className="mis-why"><BnText text={why} /></p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "ex":
      return (
        <div className="g-ex">
          {block.title && <h3><BnText text={block.title} /></h3>}
          <Examples items={block.items} roman={roman} />
        </div>
      );
    case "table":
      return (
        <div className="g-table-wrap">
          {block.title && <h3><BnText text={block.title} /></h3>}
          <div className="g-scroll" tabIndex={0} role="region" aria-label={block.title ?? "Table"}>
            <table className="g-table">
              <thead><tr>{block.head.map((h, i) => <th key={i} scope="col"><BnText text={h} /></th>)}</tr></thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row"><CellView cell={c} roman={roman} /></th> : <td key={j}><CellView cell={c} roman={roman} /></td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
  }
}

type Best = { score: number; total: number; attempts: number } | null;

/** A lesson as one scrolling article: every section in order, then practice. The page's "On this page" list jumps between them. */
export default function LessonReader({ topic, best }: { topic: GrammarTopic; best: Best }) {
  const { roman } = useRoman();
  return (
    <>
      <header className="lesson-head">
        <h1 lang="bn" className="story-h1">{topic.title[0]}</h1>
        <p className="muted">{roman ? `${topic.title[1]} · ` : ""}{topic.title[2]}</p>
        <p className="lede">{topic.blurb}</p>
      </header>

      {topic.sections.map((s) => (
        <section key={s.id} id={`sec-${s.id}`} className="g-sec">
          <h2>{s.title}</h2>
          <div className="g-section">
            {s.blocks.map((b, i) => <BlockView key={i} block={b} roman={roman} />)}
          </div>
        </section>
      ))}

      <section id="sec-practice" className="g-sec">
        <h2>Practice</h2>
        <Practice topic={topic} best={best} />
      </section>
    </>
  );
}

const KIND_LABEL: Record<ExerciseKind, string> = { pick: "Choose the answer", fill: "Fill the blank", meaning: "Meaning", spot: "Spot the correct sentence", change: "Change the sentence" };

function Practice({ topic, best }: { topic: GrammarTopic; best: Best }) {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<number[]>([]);
  const { roman } = useRoman();
  const total = topic.exercises.length;

  if (!started) {
    return (
      <div className="practice-intro">
        <p>{total} questions about this lesson. Each one starts with a line telling you exactly what to do. You see whether you were right straight after you answer, with a short reason. Your best score is saved.</p>
        {best && <p className="muted">Your best so far: {best.score} / {best.total}</p>}
        <button className="btn" onClick={() => setStarted(true)}>Start practice</button>
      </div>
    );
  }
  if (i >= total) {
    return (
      <div className="card-static practice-done">
        <h3>You scored {score} / {total}</h3>
        <p>{score === total ? "Perfect score." : score >= total * 0.8 ? "Very good." : "Read the sections above again, then try once more."}</p>
        {missed.length > 0 && (
          <div className="missed">
            <p><b>To review</b></p>
            <ul>
              {missed.map((m) => {
                const ex = topic.exercises[m];
                const right = ex.options[ex.answer];
                return (
                  <li key={m}>
                    <span className="g-en">{ex.sentence ? `${ex.q} ` : `${ex.q} `}</span>
                    <span lang="bn" className="g-ex-bn"><CellView cell={right} roman={roman} /></span>
                    <span className="g-why"> <BnText text={ex.why} /></span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button className="btn" onClick={() => { setRound((r) => r + 1); setI(0); setScore(0); setMissed([]); }}>Try again</button>
      </div>
    );
  }
  return (
    <Question
      key={`${round}-${i}`}
      ex={topic.exercises[i]}
      n={i + 1}
      total={total}
      onDone={(correct) => {
        const next = score + (correct ? 1 : 0);
        setScore(next);
        if (!correct) setMissed((m) => [...m, i]);
        if (i + 1 >= total) void recordGrammarQuiz(topic.id, next);
        setI(i + 1);
      }}
    />
  );
}

function Question({ ex, n, total, onDone }: { ex: Exercise; n: number; total: number; onDone: (correct: boolean) => void }) {
  const { roman } = useRoman();
  // questions only appear after "Start practice" is tapped, so they never hydrate from the server and can shuffle freely
  const [order] = useState(() => shuffle(ex.options.map((o, k) => ({ o, k }))));
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="q-card">
      <div className="q-top">
        <span className="q-kind">{ex.kind ? KIND_LABEL[ex.kind] : "Question"}</span>
        <span className="q-count">{n} of {total}</span>
      </div>
      <div className="bar" aria-hidden><div style={{ width: `${((n - 1) / total) * 100}%` }} /></div>
      {ex.inst && <p className="q-inst"><b>What to do:</b> <BnText text={ex.inst} /></p>}
      <h3 className="quiz-q"><BnText text={ex.q} /></h3>
      {ex.sentence && (
        <p className="g-sentence">
          <span lang="bn" className="g-ex-bn">{ex.sentence.bn}</span>
          {roman && <span className="g-ro-line">{ex.sentence.ro}</span>}
        </p>
      )}
      <div className="options">
        {order.map(({ o, k }) => {
          const cls = picked === null ? "" : k === ex.answer ? " right" : k === picked ? " wrong" : "";
          return (
            <button key={k} className={"opt text g-opt" + cls} disabled={picked !== null} onClick={() => setPicked(k)}>
              <CellView cell={o} roman={roman} />
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === ex.answer ? "Correct. " : "Not quite. "}<span className="g-why"><BnText text={ex.why} /></span></p>
          <button className="btn" onClick={() => onDone(picked === ex.answer)}>{n === total ? "See my score" : "Next question"}</button>
        </>
      )}
    </div>
  );
}

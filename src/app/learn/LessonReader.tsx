"use client";

import { useState } from "react";
import type { Block, Cell, Exercise, GrammarTopic } from "@/data/grammar";
import { recordGrammarQuiz } from "../actions";
import { useRoman } from "./Roman";

export function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CellView({ cell, roman }: { cell: Cell; roman: boolean }) {
  if (typeof cell === "string") return <>{cell}</>;
  return (
    <>
      <span lang="bn" className="g-bn">{cell.bn}</span>
      {roman && cell.ro && <small className="g-ro">{cell.ro}</small>}
    </>
  );
}

function BlockView({ block, roman }: { block: Block; roman: boolean }) {
  switch (block.t) {
    case "p":
      return <p className="g-p">{block.text}</p>;
    case "note":
      return <p className="g-note"><b>Note:</b> {block.text}</p>;
    case "ex":
      return (
        <div className="g-ex">
          {block.title && <h3>{block.title}</h3>}
          <ul>
            {block.items.map(([bn, ro, en]) => (
              <li key={bn}>
                <span lang="bn" className="g-ex-bn">{bn}</span>
                {roman && <span className="g-ro-line">{ro}</span>}
                <span className="g-en">{en}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div className="g-table-wrap">
          {block.title && <h3>{block.title}</h3>}
          <div className="g-scroll" tabIndex={0} role="region" aria-label={block.title ?? "Table"}>
            <table className="g-table">
              <thead><tr>{block.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
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

type Tab = string; // a section id, or "practice"

export default function LessonReader({ topic, best }: { topic: GrammarTopic; best: { score: number; total: number; attempts: number } | null }) {
  const { roman } = useRoman();
  const [tab, setTab] = useState<Tab>(topic.sections[0].id);
  const idx = tab === "practice" ? topic.sections.length : topic.sections.findIndex((s) => s.id === tab);
  const section = topic.sections.find((s) => s.id === tab);
  const labels = [...topic.sections.map((s) => ({ id: s.id, label: s.title })), { id: "practice", label: "Practice" }];

  return (
    <>
      <h1 lang="bn" className="story-h1">{topic.title[0]}</h1>
      <p className="muted">{roman ? `${topic.title[1]} · ` : ""}{topic.title[2]}</p>

      <nav className="tabs steps scroll" aria-label="Lessons">
        {labels.map((l, i) => (
          <button key={l.id} className={tab === l.id ? "active" : ""} onClick={() => setTab(l.id)} aria-current={tab === l.id ? "step" : undefined}>
            <small>{i + 1}</small> {l.label}
          </button>
        ))}
      </nav>

      {section && (
        <article className="g-section">
          {section.blocks.map((b, i) => <BlockView key={i} block={b} roman={roman} />)}
        </article>
      )}
      {tab === "practice" && <Practice topic={topic} best={best} />}

      {tab !== "practice" && (
        <div className="step-nav">
          {idx > 0 && <button className="btn ghost" onClick={() => { setTab(labels[idx - 1].id); window.scrollTo({ top: 0 }); }}>← {labels[idx - 1].label}</button>}
          <button className="btn" onClick={() => { setTab(labels[idx + 1].id); window.scrollTo({ top: 0 }); }}>{labels[idx + 1].label} →</button>
        </div>
      )}
    </>
  );
}

function Practice({ topic, best }: { topic: GrammarTopic; best: { score: number; total: number; attempts: number } | null }) {
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const total = topic.exercises.length;

  if (i >= total) {
    return (
      <div className="card-static">
        <h2>You scored {score} / {total}</h2>
        <p>{score === total ? "Perfect! 🎉" : score >= total * 0.8 ? "Very good!" : "Read the lessons again, then try once more."}</p>
        <button className="btn" onClick={() => { setRound((r) => r + 1); setI(0); setScore(0); }}>Try again</button>
      </div>
    );
  }
  return (
    <>
      {best && <p className="muted">Your best: {best.score} / {best.total}</p>}
      <Question
        key={`${round}-${i}`}
        ex={topic.exercises[i]}
        n={i + 1}
        total={total}
        score={score}
        onDone={(correct) => {
          const next = score + (correct ? 1 : 0);
          setScore(next);
          if (i + 1 >= total) void recordGrammarQuiz(topic.id, next);
          setI(i + 1);
        }}
      />
    </>
  );
}

function Question({ ex, n, total, score, onDone }: { ex: Exercise; n: number; total: number; score: number; onDone: (correct: boolean) => void }) {
  const { roman } = useRoman();
  const [order] = useState(() => shuffle(ex.options.map((o, k) => ({ o, k }))));
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <>
      <p className="muted">Question {n} of {total} · Score {score}</p>
      <h2 className="quiz-q">{ex.q}</h2>
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
          <p className="feedback">{picked === ex.answer ? "Correct! " : "Not quite. "}<span className="g-why">{ex.why}</span></p>
          <button className="btn" onClick={() => onDone(picked === ex.answer)}>{n === total ? "See my score" : "Next →"}</button>
        </>
      )}
    </>
  );
}

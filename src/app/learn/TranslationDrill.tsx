"use client";

import { useState } from "react";
import type { Cell } from "@/data/grammar";
import type { Direction, Source, TOption, TQuestion } from "@/lib/translation";
import { recordGrammarQuiz, translationRound } from "../actions";
import Icon from "./Icon";
import { CellView } from "./LessonReader";
import { useRoman } from "./Roman";

type Phase = "setup" | "loading" | "run" | "done";
type Mode = "pick" | "self";
const toCell = (o: TOption): Cell => (o.text !== undefined ? o.text : { bn: o.bn ?? "", ro: o.ro ?? "" });

const DIRECTIONS: { id: Direction; label: string; hint: string }[] = [
  { id: "en2bn", label: "English to Bengali", hint: "You see an English sentence and find its Bengali." },
  { id: "bn2en", label: "Bengali to English", hint: "You see a Bengali sentence and find its meaning." },
];
const SOURCES: { id: Source; label: string; hint: string }[] = [
  { id: "all", label: "Everything", hint: "Phrases and grammar examples mixed." },
  { id: "phrases", label: "Everyday phrases", hint: "The phrases from the vocabulary topics." },
  { id: "grammar", label: "Grammar sentences", hint: "Sentences from the grammar lessons." },
];
const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "pick", label: "Pick the answer", hint: "Choose from four options. You see at once if you were right." },
  { id: "self", label: "Think, then check", hint: "Say or write your answer first, then reveal it and judge yourself." },
];

function Choice<T extends string>({ name, items, value, onChange }: { name: string; items: { id: T; label: string; hint: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="choice-group" role="radiogroup" aria-label={name}>
      {items.map((it) => (
        <label key={it.id} className={"choice" + (value === it.id ? " on" : "")}>
          <input type="radio" name={name} checked={value === it.id} onChange={() => onChange(it.id)} />
          <span><b>{it.label}</b><small>{it.hint}</small></span>
        </label>
      ))}
    </div>
  );
}

export default function TranslationDrill({ best }: { best: { score: number; total: number } | null }) {
  const { roman } = useRoman();
  const [phase, setPhase] = useState<Phase>("setup");
  const [dir, setDir] = useState<Direction>("en2bn");
  const [source, setSource] = useState<Source>("all");
  const [mode, setMode] = useState<Mode>("pick");
  const [qs, setQs] = useState<TQuestion[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState("");

  async function start() {
    setPhase("loading");
    const round = await translationRound(dir, source);
    if (!round.length) { setPhase("setup"); return; }
    setQs(round); setI(0); setScore(0); setMissed([]); setPicked(null); setRevealed(false); setDraft(""); setPhase("run");
  }
  function finish(next: number) {
    setScore(next);
    setPhase("done");
    void recordGrammarQuiz("translate", next);
  }
  function advance(correct: boolean) {
    const next = score + (correct ? 1 : 0);
    if (!correct) setMissed((m) => [...m, i]);
    if (i + 1 >= qs.length) { finish(next); return; }
    setScore(next); setI(i + 1); setPicked(null); setRevealed(false); setDraft("");
  }

  if (phase === "setup" || phase === "loading") {
    return (
      <div className="drill-setup">
        <p className="lede">Ten quick questions. Pick how you want to practise, then start. Every round is new, drawn from {`hundreds`} of sentences you have met in the vocabulary and grammar lessons.</p>
        {best && <p className="muted">Your best so far: {best.score} / {best.total}</p>}
        <h3>1. Direction</h3>
        <Choice name="Direction" items={DIRECTIONS} value={dir} onChange={setDir} />
        <h3>2. Sentences from</h3>
        <Choice name="Sentences" items={SOURCES} value={source} onChange={setSource} />
        <h3>3. How to answer</h3>
        <Choice name="Mode" items={MODES} value={mode} onChange={setMode} />
        <button className="btn" onClick={start} disabled={phase === "loading"}>{phase === "loading" ? "Getting your sentences…" : "Start"}</button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="card-static practice-done">
        <h2>You scored {score} / {qs.length}</h2>
        <p>{score === qs.length ? "Perfect score." : score >= qs.length * 0.7 ? "Well done: this round counts as complete." : "Keep going: a score of 7 or more completes the lesson."}</p>
        {missed.length > 0 && (
          <div className="missed">
            <p><b>To review</b></p>
            <ul>
              {missed.map((m) => {
                const q = qs[m]; const right = q.options[q.answer];
                return (
                  <li key={m}>
                    <span className="g-en">{q.prompt}</span>
                    <span className="g-ex-bn"><CellView cell={toCell(right)} roman={roman} /></span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button className="btn" onClick={start}>Another round</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
      </div>
    );
  }

  const q = qs[i];
  const correctCell = toCell(q.options[q.answer]);
  return (
    <div className="q-card">
      <div className="q-top">
        <span className="q-kind">{dir === "en2bn" ? "English to Bengali" : "Bengali to English"}</span>
        <span className="q-count">{i + 1} of {qs.length} · score {score}</span>
      </div>
      <div className="bar" aria-hidden><div style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <p className="q-inst"><b>What to do:</b> {mode === "pick"
        ? (dir === "en2bn" ? "Choose the Bengali sentence that means the same as the English sentence." : "Choose the English sentence that means the same as the Bengali sentence.")
        : (dir === "en2bn" ? "Say or write the Bengali for this English sentence. Then reveal the answer and judge yourself." : "Say the English meaning of this Bengali sentence. Then reveal the answer and judge yourself.")}</p>
      <div className="t-prompt">
        {dir === "en2bn" ? <span className="t-en">{q.prompt}</span> : (
          <>
            <span lang="bn" className="g-ex-bn t-bn">{q.prompt}</span>
            {roman && q.promptRo && <span className="g-ro-line">{q.promptRo}</span>}
          </>
        )}
      </div>

      {mode === "pick" ? (
        <>
          <div className="options">
            {q.options.map((o, k) => {
              const cls = picked === null ? "" : k === q.answer ? " right" : k === picked ? " wrong" : "";
              return (
                <button key={k} className={"opt text g-opt" + cls} disabled={picked !== null} onClick={() => setPicked(k)}>
                  <CellView cell={toCell(o)} roman={roman} />
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <p className="feedback">{picked === q.answer ? "Correct." : "Not quite. The right answer is highlighted."}</p>
              <button className="btn" onClick={() => advance(picked === q.answer)}>{i + 1 >= qs.length ? "See my score" : "Next sentence"}</button>
            </>
          )}
        </>
      ) : (
        <>
          <label className="visually-hidden" htmlFor="tdraft">Your answer</label>
          <textarea id="tdraft" className="draft" rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your answer here, or say it aloud. This box is only for you." />
          {!revealed ? (
            <button className="btn" onClick={() => setRevealed(true)}>Show the answer</button>
          ) : (
            <>
              <div className="model">
                <p className="model-label">Answer</p>
                <span className="g-ex-bn"><CellView cell={correctCell} roman={roman} /></span>
              </div>
              <div className="step-nav">
                <button className="btn ghost" onClick={() => advance(false)}>Not yet</button>
                <button className="btn" onClick={() => advance(true)}>I got it</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

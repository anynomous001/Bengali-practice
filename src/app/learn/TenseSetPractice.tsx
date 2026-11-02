"use client";

import { useRef, useState } from "react";
import type { FillItem, TenseSet, TranslateItem } from "@/data/tense-sets";
import { speak } from "@/lib/speak";
import { finishTenseSet } from "../actions";
import Icon from "./Icon";
import { useRoman } from "./Roman";

type Kind = "fill" | "translate";
type Phase = "setup" | "run" | "sheet" | "done";
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

const MODES: Record<Kind, { id: string; label: string; hint: string }[]> = {
  fill: [
    { id: "pick", label: "Pick the right form", hint: "Choose the correct form of the verb for each blank. A wrong pick shakes and you try again." },
    { id: "say", label: "Say it, then check", hint: "Say each sentence aloud with the right verb forms, then reveal the answers and rate yourself." },
  ],
  translate: [
    { id: "say", label: "One at a time", hint: "Say or write the Bengali, reveal the answer, then rate yourself." },
    { id: "sheet", label: "Worksheet", hint: "All ten sentences on one page. Show each answer when you are ready." },
  ],
};

export default function TenseSetPractice({ kind, sets }: { kind: Kind; sets: TenseSet[] }) {
  const { roman, english } = useRoman();
  const [phase, setPhase] = useState<Phase>("setup");
  const [setId, setSetId] = useState(sets[0].id);
  const [mode, setMode] = useState(MODES[kind][0].id);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  // pick mode
  const [k, setK] = useState(0);
  const [order, setOrder] = useState<number[][]>([]);
  const [chosen, setChosen] = useState<(number | null)[]>([]);
  const [tried, setTried] = useState<number[]>([]);
  const [slipped, setSlipped] = useState(false);
  const [shake, setShake] = useState<number | null>(null);
  const totalRef = useRef(0);

  const set = sets.find((s) => s.id === setId) ?? sets[0];
  const items = (kind === "fill" ? set.fill : set.translate) as (FillItem | TranslateItem)[];
  const cur = items[i];

  function enterFill(idx: number) {
    const it = set.fill[idx];
    setOrder(it.blanks.map((bl) => shuffle(bl.options.map((_, n) => n))));
    setChosen(it.blanks.map(() => null)); setK(0); setTried([]); setSlipped(false); setShown(false);
  }
  function start() {
    setI(0); setScore(0); setShown(false); setOpen({});
    totalRef.current = kind === "fill" && mode === "pick" ? set.fill.reduce((n, f) => n + f.blanks.length, 0) : items.length;
    if (kind === "fill" && mode === "pick") enterFill(0);
    setPhase(kind === "translate" && mode === "sheet" ? "sheet" : "run");
  }
  function finish(s: number) { setScore(s); setPhase("done"); void finishTenseSet(kind, s, totalRef.current); }
  function nextItem(add: number) {
    const s = score + add;
    if (i + 1 >= items.length) { finish(s); return; }
    setScore(s); setI(i + 1); setShown(false);
    if (kind === "fill" && mode === "pick") enterFill(i + 1);
  }

  // ---------- setup ----------
  if (phase === "setup") {
    return (
      <div className="drill-setup">
        <p className="lede">{kind === "fill"
          ? "Each sentence has one or two blanks, and each blank needs the right form of the verb in brackets. Different blanks can need different tenses."
          : "Ten English sentences in mixed tenses. Turn each into Bengali, then check yourself."}</p>
        {sets.length > 1 && (<><h3>1. Story</h3><div className="choice-group" role="radiogroup" aria-label="Story">{sets.map((s) => (
          <label key={s.id} className={"choice" + (setId === s.id ? " on" : "")}><input type="radio" name="set" checked={setId === s.id} onChange={() => setSetId(s.id)} /><span><b>{s.title}</b><small>{s.blurb}</small></span></label>
        ))}</div></>)}
        <h3>{sets.length > 1 ? "2. " : "1. "}How to practice</h3>
        <div className="choice-group" role="radiogroup" aria-label="Mode">{MODES[kind].map((m) => (
          <label key={m.id} className={"choice" + (mode === m.id ? " on" : "")}><input type="radio" name="mode" checked={mode === m.id} onChange={() => setMode(m.id)} /><span><b>{m.label}</b><small>{m.hint}</small></span></label>
        ))}</div>
        {sets.length === 1 && <p className="muted">Story: {set.title}. {set.blurb}</p>}
        <button className="btn" onClick={start}>Start</button>
      </div>
    );
  }

  if (phase === "done") {
    const unit = kind === "fill" && mode === "pick" ? "blanks right first try" : "sentences";
    return (
      <div className="card-static practice-done">
        <h2>{score} of {totalRef.current}</h2>
        <p className="muted">{unit}</p>
        <p>{score >= Math.ceil(totalRef.current * 0.7) ? "Well done: this practice counts as complete." : "Keep going: 70 percent or more completes the lesson."}</p>
        <button className="btn" onClick={start}>Practice again</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
      </div>
    );
  }

  // ---------- translate: worksheet ----------
  if (phase === "sheet") {
    return (
      <div className="card-static">
        <h2>Worksheet: {set.title}</h2>
        <p className="muted">Turn each sentence into Bengali, then press Show.</p>
        <ol className="drill-sheet">
          {(items as TranslateItem[]).map((t, n) => (
            <li key={n}>
              <div className="t-prompt"><span className="t-en">{t.en}</span></div>
              <small className="muted">{t.tense}</small>
              {open[n] ? <div className="model"><span lang="bn" className="g-ex-bn">{t.bn}</span>{roman && <span className="g-ro-line">{t.ro}</span>}</div>
                : <button className="btn ghost" onClick={() => setOpen({ ...open, [n]: true })}>Show</button>}
            </li>
          ))}
        </ol>
        <button className="btn" onClick={() => setOpen(Object.fromEntries(items.map((_, n) => [n, true])))}>Show all answers</button>
        <button className="btn ghost" onClick={start}>Again</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
      </div>
    );
  }

  // ---------- translate: one at a time ----------
  if (kind === "translate") {
    const t = cur as TranslateItem;
    return (
      <div className="q-card">
        <div className="q-top"><span className="q-kind">{t.tense}</span><span className="q-count">{i + 1} of {items.length} · {score} so far</span></div>
        <div className="bar" aria-hidden><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
        <p className="q-inst"><b>What to do:</b> Say or write this in Bengali. Then check, and rate yourself.</p>
        <div className="t-prompt"><span className="t-en">{t.en}</span></div>
        {!shown ? <button className="btn" onClick={() => setShown(true)}>Show the answer</button> : (
          <>
            <div className="model"><p className="model-label">Answer</p><span lang="bn" className="g-ex-bn">{t.bn}</span>{roman && <span className="g-ro-line">{t.ro}</span>}
              <button type="button" className="icon-link" aria-label="Hear it" onClick={() => speak(t.bn)}><Icon name="sound" size={20} /></button></div>
            <div className="step-nav"><button className="btn ghost" onClick={() => nextItem(0)}>Not yet</button><button className="btn" onClick={() => nextItem(1)}>I got it</button></div>
          </>
        )}
      </div>
    );
  }

  // ---------- fill ----------
  const f = cur as FillItem;
  const sentence = (filled: (number | null)[] | null) => (
    <p className="kk-sentence" lang="bn">
      {f.parts.map((p, n) => (
        <span key={n}>{p}{n < f.blanks.length && (
          filled && filled[n] !== null ? <b className="kk-filled">{f.blanks[n].options[filled[n] as number].bn}</b>
            : filled && n === k ? <b className="kk-blank on">{"_____"} <small>({f.blanks[n].verb})</small></b>
            : <b className="kk-blank">{"_____"} <small>({f.blanks[n].verb})</small></b>)}</span>
      ))}
    </p>
  );
  const romanLine = (filled: (number | null)[] | null) => roman && (
    <p className="g-ro-line">{f.partsRo.map((p, n) => `${p}${n < f.blanks.length ? (filled && filled[n] !== null ? f.blanks[n].options[filled[n] as number].ro : `___ (${f.blanks[n].verbRo})`) : ""}`).join("")}</p>
  );
  const head = (
    <>
      <div className="q-top"><span className="q-kind">{f.tense}</span><span className="q-count">{i + 1} of {items.length} · {score} so far</span></div>
      <div className="bar" aria-hidden><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
    </>
  );

  if (mode === "say") {
    return (
      <div className="q-card">
        {head}
        <p className="q-inst"><b>What to do:</b> Say the whole sentence aloud with the right form of each verb in brackets. Then check.</p>
        {sentence(shown ? f.blanks.map(() => 0) : null)}
        {english && <p className="g-en">{f.en}</p>}
        {!shown ? <button className="btn" onClick={() => setShown(true)}>Show the answers</button> : (
          <>
            {romanLine(f.blanks.map(() => 0))}
            <button type="button" className="icon-link" aria-label="Hear the sentence" onClick={() => speak(f.parts.map((p, n) => p + (n < f.blanks.length ? f.blanks[n].options[0].bn : "")).join(""))}><Icon name="sound" size={20} /></button>
            <div className="step-nav"><button className="btn ghost" onClick={() => nextItem(0)}>Not yet</button><button className="btn" onClick={() => nextItem(1)}>I got them all</button></div>
          </>
        )}
      </div>
    );
  }

  // pick mode
  const allDone = k >= f.blanks.length;
  const bl = allDone ? null : f.blanks[k];
  function pick(optIdx: number) {
    if (!bl || tried.includes(optIdx)) return;
    if (optIdx === bl.answer) {
      if (!slipped) setScore((s) => s + 1);
      setChosen((c) => c.map((x, n) => (n === k ? optIdx : x)));
      setK(k + 1); setTried([]); setSlipped(false);
    } else { setTried((t) => [...t, optIdx]); setSlipped(true); setShake(optIdx); setTimeout(() => setShake(null), 450); }
  }
  return (
    <div className="q-card">
      {head}
      <p className="q-inst"><b>What to do:</b> {allDone ? "All blanks are filled." : `Choose the right form for blank ${k + 1} of ${f.blanks.length}: ${bl!.verb}.`}</p>
      {sentence(chosen)}
      {romanLine(chosen)}
      {english && <p className="g-en">{f.en}</p>}
      {!allDone && bl && (
        <div className="options">
          {order[k]?.map((oi) => (
            <button key={oi} type="button" className={"opt text g-opt" + (tried.includes(oi) ? " wrong" : "") + (shake === oi ? " kk-shake" : "")} disabled={tried.includes(oi)} onClick={() => pick(oi)}>
              <span lang="bn" className="kk-opt-bn">{bl.options[oi].bn}</span>{roman && <small>{bl.options[oi].ro}</small>}
            </button>
          ))}
        </div>
      )}
      {allDone && (
        <>
          <button type="button" className="icon-link" aria-label="Hear the sentence" onClick={() => speak(f.parts.map((p, n) => p + (n < f.blanks.length ? f.blanks[n].options[f.blanks[n].answer].bn : "")).join(""))}><Icon name="sound" size={20} /> Hear it</button>
          <button type="button" className="btn" onClick={() => nextItem(0)}>{i + 1 >= items.length ? "See my score" : "Next sentence"}</button>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import type { KExercise, KExItem } from "@/data/kitchen/content";
import { checkBuild, checkCategories, checkCounter, checkDialogue, checkFill, tilesFor } from "@/lib/kitchen-exercises";
import Icon from "../Icon";
import { speakBn } from "./speech";

const Verdict = ({ ok, text }: { ok: boolean; text?: string }) => <b className={"kt-verdict " + (ok ? "good" : "bad")}>{text ?? (ok ? "Correct" : "Try again")}</b>;
const Listen = ({ text }: { text: string }) => <button type="button" className="kt-listen small" onClick={() => speakBn(text)} aria-label="Listen"><Icon name="sound" size={18} /></button>;

/** The practice exercises: sort words, build an amount, choose a counter, fill a blank, complete a dialogue. */
export default function Exercises({ exercises }: { exercises: KExercise[] }) {
  return (
    <div className="kt-exs">
      {exercises.map((ex) => (
        <section key={ex.id} className="kt-ex" aria-label={ex.title}>
          <h3>{ex.title}</h3>
          {ex.type === "categorise" && <Categorise ex={ex} />}
          {ex.type === "build" && ex.items.map((it, i) => <Build key={i} no={i + 1} item={it} />)}
          {ex.type === "counter" && ex.items.map((it, i) => <Counter key={i} no={i + 1} item={it} />)}
          {ex.type === "fill" && ex.items.map((it, i) => <Fill key={i} no={i + 1} item={it} />)}
          {ex.type === "dialogue" && <Dialogue ex={ex} />}
        </section>
      ))}
    </div>
  );
}

function Categorise({ ex }: { ex: KExercise }) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const res = checkCategories(picks, ex.categories);
  return (
    <div>
      <ul className="kt-sort">
        {ex.words.map((w) => {
          const right = checked && !res.wrong.includes(w);
          return (
            <li key={w} className={checked ? (right ? "right" : "wrong") : ""}>
              <span className="kt-bn small" lang="bn">{w}</span>
              <Listen text={w} />
              <select aria-label={`Category for ${w}`} value={picks[w] ?? ""} onChange={(e) => { setPicks((p) => ({ ...p, [w]: e.target.value })); setChecked(false); }}>
                <option value="">Choose a category</option>
                {ex.categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </li>
          );
        })}
      </ul>
      <div className="kt-ex-actions">
        <button type="button" className="btn small" onClick={() => setChecked(true)}>Check</button>
        <button type="button" className="btn ghost small" onClick={() => { setPicks(Object.fromEntries(ex.categories.flatMap((c) => c.words.map((w) => [w, c.name])))); setChecked(true); }}>Show answers</button>
        <button type="button" className="btn ghost small" onClick={() => { setPicks({}); setChecked(false); }}>Start again</button>
        {checked && <Verdict ok={res.wrong.length === 0} text={res.wrong.length === 0 ? "Correct. All 6 are right." : `${res.correct} of ${res.total} right. Try again.`} />}
      </div>
    </div>
  );
}

function Build({ no, item }: { no: number; item: KExItem }) {
  const [tiles, setTiles] = useState<string[]>(() => [...item.answer.split(" "), ...item.options]); // shuffled after the first render
  useEffect(() => { setTiles(tilesFor(item.answer, item.options)); }, [item]);
  const [built, setBuilt] = useState<number[]>([]);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const words = built.map((i) => tiles[i]);
  const check = () => { const ok = checkBuild(words, item.answer); setState(ok ? "right" : "wrong"); if (ok) speakBn(item.answer); };
  return (
    <div className="kt-item">
      <p className="kt-prompt"><b>{no}.</b> {item.prompt}</p>
      <div className="kt-answer" aria-live="polite">
        {built.length === 0 ? <span className="muted">Tap the words in order.</span> : built.map((i, k) => (
          <button key={k} type="button" className="kt-tile on" lang="bn" onClick={() => { setBuilt((b) => b.filter((_, j) => j !== k)); setState("idle"); }} aria-label={`Remove ${tiles[i]}`}>{tiles[i]}</button>
        ))}
      </div>
      <div className="kt-bank" role="group" aria-label="Words">
        {tiles.map((t, i) => <button key={i} type="button" className="kt-tile" lang="bn" disabled={built.includes(i)} onClick={() => { setBuilt((b) => [...b, i]); setState("idle"); }}>{t}</button>)}
      </div>
      <div className="kt-ex-actions">
        <button type="button" className="btn small" disabled={!built.length} onClick={check}>Check</button>
        <button type="button" className="btn ghost small" onClick={() => { setBuilt([]); setState("idle"); }}>Clear</button>
        <button type="button" className="btn ghost small" onClick={() => setState("right")}>Show answer</button>
        {state !== "idle" && state === "wrong" && <Verdict ok={false} />}
        {state === "right" && <Verdict ok text={checkBuild(words, item.answer) ? "Correct" : "Answer"} />}
      </div>
      {state === "right" && <Answer item={item} />}
    </div>
  );
}

const Answer = ({ item, text }: { item: KExItem; text?: string }) => (
  <p className="kt-reveal"><span className="kt-bn small" lang="bn">{text ?? item.answer}</span> <span className="kt-ro">{item.ro}</span> <span className="kt-en show">{item.en}</span> <Listen text={text ?? item.answer} /></p>
);

function Counter({ no, item }: { no: number; item: KExItem }) {
  const noun = item.answer.split(" ").slice(1).join(" ");
  const [picked, setPicked] = useState<string | null>(null);
  const ok = picked !== null && checkCounter(picked, item.answer);
  return (
    <div className="kt-item">
      <p className="kt-prompt"><b>{no}.</b> {item.prompt}: <span className="kt-blank">{ok ? picked : "____"}</span> <span className="kt-bn small" lang="bn">{noun}</span></p>
      <div className="kt-bank" role="group" aria-label="Choose the number with its counter">
        {item.options.map((o) => <button key={o} type="button" lang="bn" className={"kt-tile" + (picked === o ? (ok ? " right" : " wrong") : "")} disabled={ok} onClick={() => { setPicked(o); if (checkCounter(o, item.answer)) speakBn(item.answer); }}>{o}</button>)}
      </div>
      {picked !== null && <Verdict ok={ok} />}
      {ok && <Answer item={item} />}
    </div>
  );
}

function Fill({ no, item }: { no: number; item: KExItem }) {
  const [picked, setPicked] = useState<string | null>(null);
  const ok = checkFill(picked, item.answer);
  const [before, after] = item.prompt.split("____");
  return (
    <div className="kt-item">
      <p className="kt-prompt"><b>{no}.</b> <span className="kt-bn small" lang="bn">{before}<span className="kt-blank">{ok ? picked : "____"}</span>{after}</span></p>
      <div className="kt-bank" role="group" aria-label="Choose the word">
        {item.options.map((o) => <button key={o} type="button" lang="bn" className={"kt-tile" + (picked === o ? (ok ? " right" : " wrong") : "")} disabled={ok} onClick={() => { setPicked(o); if (checkFill(o, item.answer)) speakBn(`${before}${o}${after}`); }}>{o}</button>)}
      </div>
      {picked !== null && <Verdict ok={ok} />}
      {ok && <p className="kt-reveal"><span className="kt-ro">{item.ro}</span> <span className="kt-en show">{item.en}</span></p>}
    </div>
  );
}

function Dialogue({ ex }: { ex: KExercise }) {
  const [picks, setPicks] = useState<(string | null)[]>(() => ex.items.map(() => null));
  const [checked, setChecked] = useState(false);
  const answers = useMemo(() => ex.items.map((i) => i.answer), [ex]);
  const res = checkDialogue(picks, answers);
  const all = res.every(Boolean);
  const used = (w: string, at: number) => picks.some((p, k) => p === w && k !== at);
  return (
    <div>
      <p className="muted">Choose from: <span lang="bn" className="kt-inline-bn">{ex.bank.join("  ·  ")}</span>. Use each word once.</p>
      <ol className="kt-dialog">
        {ex.items.map((it, k) => {
          const [before, after] = it.prompt.split("____");
          return (
            <li key={k} className={checked ? (res[k] ? "right" : "wrong") : ""}>
              <span className="kt-who">{it.who}</span>
              <span className="kt-bn small" lang="bn">{before}
                <select lang="bn" aria-label={`Blank ${k + 1}`} value={picks[k] ?? ""} onChange={(e) => { setPicks((p) => p.map((v, j) => (j === k ? e.target.value || null : v))); setChecked(false); }}>
                  <option value="">____</option>
                  {ex.bank.map((w) => <option key={w} value={w} disabled={used(w, k)}>{w}</option>)}
                </select>{after}
              </span>
              {checked && res[k] && <span className="kt-ro">{it.ro} · {it.en}</span>}
            </li>
          );
        })}
      </ol>
      <div className="kt-ex-actions">
        <button type="button" className="btn small" disabled={picks.some((p) => p === null)} onClick={() => { setChecked(true); if (all) speakBn(ex.items.map((it) => it.prompt.replace("____", it.answer)).join(" ")); }}>Check</button>
        <button type="button" className="btn ghost small" onClick={() => { setPicks(answers); setChecked(true); }}>Show answers</button>
        <button type="button" className="btn ghost small" onClick={() => { setPicks(ex.items.map(() => null)); setChecked(false); }}>Start again</button>
        {checked && <Verdict ok={all} text={all ? "Correct" : `${res.filter(Boolean).length} of ${res.length} right. Try again.`} />}
      </div>
      {checked && all && (
        <button type="button" className="btn ghost small" onClick={() => speakBn(ex.items.map((it) => it.prompt.replace("____", it.answer)).join(" "))}><Icon name="sound" size={16} /> Listen to the dialogue</button>
      )}
    </div>
  );
}

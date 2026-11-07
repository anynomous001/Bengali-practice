"use client";

import { useState } from "react";
import type { PicSpec } from "@/lib/kids-pics";
import { speak } from "@/lib/speak";
import { finishKidsQuiz } from "../../actions";
import { useRoman } from "../Roman";
import Icon from "../Icon";
import Cauldron from "./Cauldron";
import KidPic from "./KidPic";
import "./kids-lessons.css";

type Item = { id: string; bn: string; ro: string; en: string; pic: PicSpec; tint?: string };
type Q = { item: Item; options: Item[] };
type Mode = "say" | "pick";
const ROUNDS = 10;
const MAGIC = ["#ff8ac8", "#8ad4ff", "#ffd54a", "#7cf29a", "#b69cff"];

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** Shows a picture and asks what it is. The child answers in Bengali: say it and check, or pick the Bengali word. */
export default function KidsQuiz({ topic, items, question, fill }: { topic: string; items: Item[]; question: { bn: string; ro: string; en: string }; fill?: "colours" | "magic" }) {
  const { roman, english } = useRoman();
  const [phase, setPhase] = useState<"setup" | "run" | "done">("setup");
  const [mode, setMode] = useState<Mode>("say");
  const [qs, setQs] = useState<Q[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]); // option ids tried wrong on this question
  const [right, setRight] = useState(false);
  const [shown, setShown] = useState(false);
  const [shake, setShake] = useState<string | null>(null);
  const [layers, setLayers] = useState<string[]>([]); // the cauldron: one color per right answer
  const addLayer = (it: Item) => setLayers((l) => [...l, fill === "colours" ? (it.tint ?? "#ffc107") : MAGIC[l.length % MAGIC.length]]);

  function start(m: Mode) {
    const order = shuffle(items).slice(0, Math.min(ROUNDS, items.length));
    setQs(order.map((item) => ({ item, options: shuffle([item, ...shuffle(items.filter((x) => x.id !== item.id)).slice(0, 3)]) })));
    setMode(m); setI(0); setScore(0); setLayers([]); setWrong([]); setRight(false); setShown(false); setPhase("run");
  }
  function next(gotIt: boolean) {
    const s = score + (gotIt ? 1 : 0);
    if (i + 1 >= qs.length) { setScore(s); setPhase("done"); void finishKidsQuiz(topic, s, qs.length); return; }
    setScore(s); setI(i + 1); setWrong([]); setRight(false); setShown(false);
  }
  function pick(o: Item) {
    if (right || wrong.includes(o.id)) return;
    speak(o.bn);
    if (o.id === qs[i].item.id) { setRight(true); addLayer(qs[i].item); return; }
    setWrong((w) => [...w, o.id]); setShake(o.id); setTimeout(() => setShake(null), 500);
  }

  if (phase === "setup") {
    return (
      <div className="kk-setup">
        <p className="lede">A picture appears and asks what it is. Answer in Bengali. {Math.min(ROUNDS, items.length)} questions.</p>
        <div className="choice-group" role="group">
          <button type="button" className="choice" onClick={() => start("say")}><span><b>Say it, then check</b><small>He says the Bengali word aloud, then the answer is shown and he marks himself.</small></span></button>
          <button type="button" className="choice" onClick={() => start("pick")}><span><b>Pick the Bengali word</b><small>Choose the right word from four. A wrong pick shakes and he tries again.</small></span></button>
        </div>
      </div>
    );
  }
  if (phase === "done") {
    return (
      <div className="card-static practice-done">
        <h2>{score} of {qs.length}</h2>
        {fill && <div className="kk-done-fill"><Cauldron colors={layers} goal={qs.length} label={`Jar with ${layers.length} of ${qs.length} layers`} /></div>}
        <p className="kk-stars" aria-hidden>{Array.from({ length: qs.length }, (_, k) => <span key={k} className={k < score ? "on" : ""}>★</span>)}</p>
        <p>{score >= Math.ceil(qs.length * 0.7) ? <><b lang="bn">খুব ভালো!</b> This lesson counts as complete.</> : "Good try. Seven or more completes the lesson. Play again."}</p>
        <button type="button" className="btn" onClick={() => start(mode)}>Play again</button>
        <button type="button" className="btn ghost" onClick={() => setPhase("setup")}>Change how to answer</button>
      </div>
    );
  }

  const q = qs[i];
  return (
    <div className="q-card kk-quiz">
      <div className="q-top"><span className="q-kind">{mode === "say" ? "Say it" : "Pick the word"}</span><span className="q-count">{i + 1} of {qs.length}</span></div>
      <div className="bar" aria-hidden><div style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <div className={"kk-stage" + (fill ? " has-fill" : "")}>
      <div>
      <div className="kk-qpic"><KidPic pic={q.item.pic} label="Picture to name" /></div>
      <p className="kk-ask"><span lang="bn">{question.bn}</span><button type="button" className="icon-link" aria-label="Hear the question" onClick={() => speak(question.bn)}><Icon name="sound" size={22} /></button></p>
      {(roman || english) && <p className="kk-ask-sub">{roman && question.ro}{roman && english && " · "}{english && question.en}</p>}
      </div>
      {fill && <figure className="kk-fill"><Cauldron colors={layers} goal={qs.length} /><figcaption>{fill === "colours" ? "Fill the jar with colors" : "Fill the jar"}: {layers.length} of {qs.length}</figcaption></figure>}
      </div>

      {mode === "pick" ? (
        <>
          <div className="options kk-options">
            {q.options.map((o) => {
              const cls = right ? (o.id === q.item.id ? " right" : "") : wrong.includes(o.id) ? " wrong" : "";
              return (
                <button key={o.id} type="button" className={"opt text g-opt" + cls + (shake === o.id ? " kk-shake" : "")} onClick={() => pick(o)} disabled={right || wrong.includes(o.id)}>
                  <span lang="bn" className="kk-opt-bn">{o.bn}</span>{roman && <small>{o.ro}</small>}
                </button>
              );
            })}
          </div>
          {right && (<><p className="feedback"><b lang="bn">খুব ভালো!</b> ⭐ {wrong.length === 0 ? "" : "Try the next one."}</p><button type="button" className="btn" onClick={() => next(wrong.length === 0)}>{i + 1 >= qs.length ? "See my stars" : "Next"}</button></>)}
        </>
      ) : !shown ? (
        <button type="button" className="btn" onClick={() => { setShown(true); speak(q.item.bn); }}>Show the answer</button>
      ) : (
        <>
          <div className="model"><p className="model-label">Answer</p><p className="kk-answer" lang="bn">{q.item.bn}</p>{roman && <p className="kk-ro">{q.item.ro}</p>}{english && <p className="kk-en">{q.item.en}</p>}</div>
          <div className="step-nav">
            <button type="button" className="btn ghost" onClick={() => next(false)}>Not yet</button>
            <button type="button" className="btn" onClick={() => { addLayer(q.item); next(true); }}>He said it right</button>
          </div>
        </>
      )}
    </div>
  );
}

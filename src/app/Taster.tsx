"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import { CLIPS } from "@/data/landing";
import { speak } from "@/lib/speak";
import BuyLink from "./BuyLink";
import BnPath, { type Phase } from "./BnPath";
import { motionAllowed, prefersReducedMotion } from "./landing-motion";
import Icon from "./learn/Icon";

type Q = { bn: string; prompt: string; hint: string; options: string[]; answer: string; after: string };

const QUESTIONS: Q[] = [
  { bn: "ক", prompt: "Which sound is this letter?", hint: "The first consonant.", options: ["ko", "kho", "go"], answer: "ko", after: "ক is “ko”, said with no puff of air. খ is “kho”, the same sound with a puff." },
  { bn: "জল", prompt: "What does this word (jol) mean?", hint: "You drink it.", options: ["water", "rice", "book"], answer: "water", after: "জল is water. ভাত is rice, বই is a book." },
  { bn: "৫", prompt: "Which number is this?", hint: "Bengali has its own numerals.", options: ["three", "five", "eight"], answer: "five", after: "৫ is five, পাঁচ (panch). Every number up to 100 has its own word." },
];

/** Plays a recorded clip when there is one, otherwise the browser's Bengali voice. */
function hear(bn: string) {
  const file = CLIPS[bn];
  if (file) { void new Audio(`/audio/landing/${file}`).play().catch(() => speak(bn)); return; }
  speak(bn);
}

/** A three-question taste of the practice, with no sign-up. It sits on the dark hero band and ends with the way in. */
export default function Taster() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [canSpeak, setCanSpeak] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  // The letter draws itself like chalk. The phase is tied to the question it was set for, so a new question starts hidden, never flashes.
  const [ph, setPh] = useState<{ i: number; v: Phase }>({ i: -1, v: "hold" });
  const phase: Phase = ph.i === i ? ph.v : "hold";
  const done = i >= QUESTIONS.length;
  const q = QUESTIONS[i];

  useEffect(() => { setCanSpeak("speechSynthesis" in window); }, []);
  useEffect(() => {
    if (done) return;
    const play = i === 0 ? motionAllowed() : !prefersReducedMotion();
    setPh({ i, v: play ? "draw" : "done" });
  }, [i, done]);
  useEffect(() => { if (done) track("quiz_finished", { score }); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (picked) nextRef.current?.focus(); }, [picked]);

  if (done) {
    return (
      <div className="taster done" id="try">
        <h2>You got {score} of {QUESTIONS.length}.</h2>
        <p>That was one minute of a full alphabet course, 900 words and a full grammar course. Pick up where you left off, with every answer explained.</p>
        <div className="cta">
          <BuyLink place="quiz" className="btn">Start learning</BuyLink>
          <button type="button" className="btn ghost" onClick={() => { setI(0); setPicked(null); setScore(0); }}>Try again</button>
        </div>
      </div>
    );
  }
  const canHear = !!CLIPS[q.bn] || canSpeak;
  return (
    <div className="taster" id="try">
      <p className="tq-step">Question {i + 1} of {QUESTIONS.length}</p>
      <p className="tq-prompt">{q.prompt}</p>
      <div className="tq-bn-row">
        <span className="tq-bn"><BnPath key={i} text={q.bn} phase={phase} seconds={i === 0 ? 0.9 : 0.5} /></span>
        {canHear && <button type="button" className="tq-hear" onClick={() => hear(q.bn)}><Icon name="sound" size={18} /> Hear it</button>}
      </div>
      <div className="tq-opts" role="group" aria-label="Answers">
        {q.options.map((o) => {
          const cls = picked ? (o === q.answer ? " right" : o === picked ? " wrong" : "") : "";
          return <button key={o} type="button" className={"tq-opt" + cls} disabled={!!picked} onClick={() => { setPicked(o); if (o === q.answer) setScore((s) => s + 1); }}>{o}</button>;
        })}
      </div>
      <div aria-live="polite" role="status" className="tq-live">
        {picked && <p className={"tq-fb " + (picked === q.answer ? "ok" : "no")}>{picked === q.answer ? "Correct. " : "Not quite. "}{q.after}</p>}
      </div>
      {picked ? (
        <>
          <button ref={nextRef} type="button" className="btn" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 === QUESTIONS.length ? "See my result" : "Next"}</button>
        </>
      ) : <p className="tq-hint">{q.hint}</p>}
    </div>
  );
}

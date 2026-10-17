"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import BuyLink from "./BuyLink";

type Q = { prompt: React.ReactNode; hint: string; options: string[]; answer: string; after: string };

const QUESTIONS: Q[] = [
  { prompt: <>Which sound is this letter? <span className="tq-big" lang="bn">ক</span></>, hint: "The first consonant.", options: ["ko", "kho", "go"], answer: "ko", after: "ক is “ko”, said with no puff of air. খ is “kho”, the same sound with a puff." },
  { prompt: <>What does <span className="tq-word" lang="bn">জল</span> <small>(jol)</small> mean?</>, hint: "You drink it.", options: ["water", "rice", "book"], answer: "water", after: "জল is water. ভাত is rice, বই is a book." },
  { prompt: <>Which number is this? <span className="tq-big" lang="bn">৫</span></>, hint: "Bengali has its own numerals.", options: ["three", "five", "eight"], answer: "five", after: "৫ is five, পাঁচ (panch). Every number up to 100 has its own word." },
];

/** A three-question taste of the practice, with no sign-up. It ends with the way in. */
export default function Taster() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= QUESTIONS.length;
  const q = QUESTIONS[i];
  useEffect(() => { if (done) track("quiz_finished", { score }); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) {
    return (
      <div className="taster done">
        <h3>You got {score} of {QUESTIONS.length}.</h3>
        <p>That was one minute of a full alphabet course, 900 words and a full grammar course. Pick up where you left off, with every answer explained.</p>
        <div className="cta">
          <BuyLink place="quiz" className="btn">Start learning</BuyLink>
          <button type="button" className="btn ghost" onClick={() => { setI(0); setPicked(null); setScore(0); }}>Try again</button>
        </div>
      </div>
    );
  }
  return (
    <div className="taster" aria-live="polite">
      <p className="tq-step">Question {i + 1} of {QUESTIONS.length}</p>
      <p className="tq-prompt">{q.prompt}</p>
      <div className="tq-opts">
        {q.options.map((o) => {
          const cls = picked ? (o === q.answer ? " right" : o === picked ? " wrong" : "") : "";
          return <button key={o} type="button" className={"tq-opt" + cls} disabled={!!picked} onClick={() => { setPicked(o); if (o === q.answer) setScore((s) => s + 1); }}>{o}</button>;
        })}
      </div>
      {picked ? (
        <>
          <p className={"tq-fb " + (picked === q.answer ? "ok" : "no")}>{picked === q.answer ? "Correct. " : "Not quite. "}{q.after}</p>
          <button type="button" className="btn" onClick={() => { setI(i + 1); setPicked(null); }}>{i + 1 === QUESTIONS.length ? "See my result" : "Next"}</button>
        </>
      ) : <p className="tq-hint">{q.hint}</p>}
    </div>
  );
}

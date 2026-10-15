"use client";

import BnText from "../../../BnText";
import { useState } from "react";
import type { Story } from "@/data/stories";
import { speak } from "@/lib/speak";
import Icon from "../../../Icon";
import { recordStoryQuiz } from "../../../../actions";
import { useRoman } from "../../../Roman";
import Stepper from "../../../Stepper";

type Step = "words" | "bengali" | "lines" | "english" | "original" | "quiz";
const ALL_STEPS: { id: Step; label: string; blurb: string }[] = [
  { id: "words", label: "Words", blurb: "Learn the new words first." },
  { id: "bengali", label: "Bengali", blurb: "Layer 1 · The story in Bengali only. Try reading it yourself." },
  { id: "lines", label: "Lines", blurb: "Layer 2 · Line by line, with the meaning of each line." },
  { id: "english", label: "English", blurb: "Layer 3 · The whole story in English." },
  { id: "original", label: "Original", blurb: "Layer 4 · The text as it is written in the book. Use what you have learned to read it." },
  { id: "quiz", label: "Quiz", blurb: "Check what you understood." },
];

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StoryReader({ story, best }: { story: Story; best: { score: number; total: number; attempts: number } | null }) {
  const { roman } = useRoman();
  const [step, setStep] = useState<Step>("words");
  const STEPS = ALL_STEPS.filter((s) => s.id !== "original" || !!story.original);
  const idx = STEPS.findIndex((s) => s.id === step);

  return (
    <>
      {story.devotional && <p><span className="dev-tag">Devotional</span></p>}
      <h1 lang="bn" className="story-h1">{story.title[0]}</h1>
      <p className="muted">{roman ? `${story.title[1]} · ` : ""}{story.title[2]} · Level {story.level}</p>

      <Stepper steps={STEPS} current={step} onSelect={setStep as (id: string) => void} label="Reading layers" />
      <p className="muted step-blurb">{STEPS[idx].blurb}</p>

      {step === "words" && (
        <ul className="vocab">
          {story.vocab.map(([bn, ro, en]) => (
            <li key={bn + en}>
              <span lang="bn" className="vocab-bn">{bn}</span>
              <span className="vocab-meaning">{roman && <i>{ro}</i>}<span>{en}</span></span>
              <button className="icon-btn" onClick={() => speak(bn)} aria-label={`Hear ${en}`}><Icon name="sound" size={18} /></button>
            </li>
          ))}
        </ul>
      )}

      {step === "bengali" && (
        <article className="story-text">
          <button className="btn ghost small" onClick={() => speak(story.lines.map((l) => l[0]).join(" "))}><Icon name="sound" size={16} /> Listen to the story</button>
          <p lang="bn" className="story-bn">{story.lines.map((l) => l[0]).join(" ")}</p>
          {story.moral && <p lang="bn" className="story-bn lesson"><b>শিক্ষা:</b> {story.moral[0]}</p>}
          {roman && <p className="story-roman">{story.lines.map((l) => l[1]).join(" ")}</p>}
        </article>
      )}

      {step === "lines" && (
        <ol className="lines">
          {[...story.lines, ...(story.moral ? [story.moral] : [])].map(([bn, ro, en], i) => (
            <li key={i} className={i === story.lines.length ? "lesson" : ""}>
              <div className="line-top">
                <span lang="bn" className="line-bn">{i === story.lines.length && <b>শিক্ষা: </b>}{bn}</span>
                <button className="icon-btn" onClick={() => speak(bn)} aria-label="Hear this line"><Icon name="sound" size={18} /></button>
              </div>
              {roman && <span className="line-roman">{ro}</span>}
              <span className="line-en">{en}</span>
            </li>
          ))}
        </ol>
      )}

      {step === "english" && (
        <article className="story-text">
          <p className="story-en">{story.lines.map((l) => l[2]).join(" ")}</p>
          {story.moral && <p className="story-en lesson"><b>Lesson:</b> {story.moral[2]}</p>}
        </article>
      )}

      {step === "original" && story.original && (
        <article className="story-text">
          <button className="btn ghost small" onClick={() => speak(story.original!.join(" "))}><Icon name="sound" size={16} /> Listen</button>
          {story.original.map((l, i) => <p key={i} className="story-orig"><BnText text={l} /></p>)}
          <p className="muted">{story.source}</p>
        </article>
      )}

      {step === "quiz" && <Quiz story={story} best={best} />}
      {step === "quiz" && story.tryThis && <div className="card-static try-this"><h2>Try this</h2><p><BnText text={story.tryThis} /></p></div>}

      {step !== "quiz" && (
        <div className="step-nav">
          {idx > 0 && <button className="btn ghost" onClick={() => setStep(STEPS[idx - 1].id)}><Icon name="prev" size={16} />{STEPS[idx - 1].label}</button>}
          <button className="btn" onClick={() => { setStep(STEPS[idx + 1].id); window.scrollTo({ top: 0 }); }}>{STEPS[idx + 1].label}<Icon name="next" size={16} /></button>
        </div>
      )}
    </>
  );
}

function Quiz({ story, best }: { story: Story; best: { score: number; total: number; attempts: number } | null }) {
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const total = story.quiz.length;

  if (i >= total) {
    return (
      <div className="card-static">
        <h2>You scored {score} / {total}</h2>
        <p>{score === total ? "Perfect! 🎉" : score >= total - 1 ? "Very good!" : "Read the story again, then try once more."}</p>
        <button className="btn" onClick={() => { setRound((r) => r + 1); setI(0); setScore(0); }}>Try again</button>
      </div>
    );
  }
  return (
    <>
      {best && <p className="muted">Your best: {best.score} / {best.total}</p>}
      <Question
        key={`${round}-${i}`}
        story={story}
        index={i}
        score={score}
        onDone={(correct) => {
          const next = score + (correct ? 1 : 0);
          setScore(next);
          if (i + 1 >= total) void recordStoryQuiz(story.id, next);
          setI(i + 1);
        }}
      />
    </>
  );
}

function Question({ story, index, score, onDone }: { story: Story; index: number; score: number; onDone: (correct: boolean) => void }) {
  const q = story.quiz[index];
  const [order] = useState(() => shuffle(q.options.map((text, k) => ({ text, k }))));
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <>
      <p className="muted">Question {index + 1} of {story.quiz.length} · Score {score}</p>
      <h2 className="quiz-q"><BnText text={q.q} /></h2>
      <div className="options">
        {order.map((o) => {
          const cls = picked === null ? "" : o.k === q.answer ? " right" : o.k === picked ? " wrong" : "";
          return <button key={o.k} className={"opt text" + cls} disabled={picked !== null} onClick={() => setPicked(o.k)}><BnText text={o.text} /></button>;
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? "Correct!" : <>Not quite. The answer is: <BnText text={q.options[q.answer]} /></>}</p>
          <button className="btn" onClick={() => onDone(picked === q.answer)}>{index + 1 === story.quiz.length ? "See my score" : "Next"}</button>
        </>
      )}
    </>
  );
}

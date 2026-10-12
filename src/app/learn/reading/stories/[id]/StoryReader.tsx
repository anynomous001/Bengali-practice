"use client";

import { useState } from "react";
import type { Story } from "@/data/stories";
import { speak } from "@/lib/speak";
import { recordStoryQuiz } from "../../../../actions";
import { useRoman } from "../../../Roman";

type Step = "words" | "bengali" | "lines" | "english" | "quiz";
const STEPS: { id: Step; label: string; blurb: string }[] = [
  { id: "words", label: "Words", blurb: "Learn the new words first." },
  { id: "bengali", label: "Bengali", blurb: "Layer 1 · The story in Bengali only. Try reading it yourself." },
  { id: "lines", label: "Lines", blurb: "Layer 2 · Line by line, with the meaning of each line." },
  { id: "english", label: "English", blurb: "Layer 3 · The whole story in English." },
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
  const idx = STEPS.findIndex((s) => s.id === step);

  return (
    <>
      <h1 lang="bn" className="story-h1">{story.title[0]}</h1>
      <p className="muted">{roman ? `${story.title[1]} · ` : ""}{story.title[2]} · Level {story.level}</p>

      <nav className="tabs steps" aria-label="Reading layers">
        {STEPS.map((s, i) => (
          <button key={s.id} className={step === s.id ? "active" : ""} onClick={() => setStep(s.id)} aria-current={step === s.id ? "step" : undefined}>
            <small>{i + 1}</small> {s.label}
          </button>
        ))}
      </nav>
      <p className="muted step-blurb">{STEPS[idx].blurb}</p>

      {step === "words" && (
        <ul className="vocab">
          {story.vocab.map(([bn, ro, en]) => (
            <li key={bn + en}>
              <span lang="bn" className="vocab-bn">{bn}</span>
              <span className="vocab-meaning">{roman && <i>{ro}</i>}<span>{en}</span></span>
              <button className="icon-btn" onClick={() => speak(bn)} aria-label={`Hear ${en}`}>🔊</button>
            </li>
          ))}
        </ul>
      )}

      {step === "bengali" && (
        <article className="story-text">
          <button className="btn ghost small" onClick={() => speak(story.lines.map((l) => l[0]).join(" "))}>🔊 Listen to the story</button>
          <p lang="bn" className="story-bn">{story.lines.map((l) => l[0]).join(" ")}</p>
          <p lang="bn" className="story-bn lesson"><b>শিক্ষা:</b> {story.moral[0]}</p>
        </article>
      )}

      {step === "lines" && (
        <ol className="lines">
          {[...story.lines, story.moral].map(([bn, ro, en], i) => (
            <li key={i} className={i === story.lines.length ? "lesson" : ""}>
              <div className="line-top">
                <span lang="bn" className="line-bn">{i === story.lines.length && <b>শিক্ষা: </b>}{bn}</span>
                <button className="icon-btn" onClick={() => speak(bn)} aria-label="Hear this line">🔊</button>
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
          <p className="story-en lesson"><b>Lesson:</b> {story.moral[2]}</p>
        </article>
      )}

      {step === "quiz" && <Quiz story={story} best={best} />}

      {step !== "quiz" && (
        <div className="step-nav">
          {idx > 0 && <button className="btn ghost" onClick={() => setStep(STEPS[idx - 1].id)}>← {STEPS[idx - 1].label}</button>}
          <button className="btn" onClick={() => { setStep(STEPS[idx + 1].id); window.scrollTo({ top: 0 }); }}>{STEPS[idx + 1].label} →</button>
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
      <h2 className="quiz-q">{q.q}</h2>
      <div className="options">
        {order.map((o) => {
          const cls = picked === null ? "" : o.k === q.answer ? " right" : o.k === picked ? " wrong" : "";
          return <button key={o.k} className={"opt text" + cls} disabled={picked !== null} onClick={() => setPicked(o.k)}>{o.text}</button>;
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? "Correct!" : `Not quite. The answer is: ${q.options[q.answer]}`}</p>
          <button className="btn" onClick={() => onDone(picked === q.answer)}>{index + 1 === story.quiz.length ? "See my score" : "Next →"}</button>
        </>
      )}
    </>
  );
}

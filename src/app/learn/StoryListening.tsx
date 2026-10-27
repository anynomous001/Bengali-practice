"use client";

import { useRef, useState } from "react";
import type { ListeningStory } from "@/data/listening-stories";
import { speak, speakThen, stopSpeaking } from "@/lib/speak";
import Icon from "./Icon";

type Step = "listen" | "read" | "questions" | "english";
const STEPS: { id: Step; label: string }[] = [
  { id: "listen", label: "Listen" },
  { id: "read", label: "Read (optional)" },
  { id: "questions", label: "Questions" },
  { id: "english", label: "English" },
];
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A listening story in four steps: hear it read slowly (as often as you like), read it with romanization if you want,
 * answer questions about it, then read the whole story in English. The Bengali stays hidden until the reading step.
 */
export default function StoryListening({ story }: { story: ListeningStory }) {
  const [step, setStep] = useState<Step>("listen");
  const [wantsRead, setWantsRead] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>(() => story.questions.map(() => null));
  const reached = STEPS.findIndex((s) => s.id === step);

  return (
    <>
      <ol className="story-steps" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={s.id} className={i === reached ? "on" : i < reached ? "done" : ""} aria-current={i === reached ? "step" : undefined}>{i + 1}. {s.label}</li>
        ))}
      </ol>

      {step === "listen" && <Listen story={story} onNext={() => { stopSpeaking(); setStep("read"); }} />}

      {step === "read" && (
        <ReadStep story={story} wantsRead={wantsRead} setWantsRead={setWantsRead} onNext={() => { stopSpeaking(); setStep("questions"); }} onBack={() => { stopSpeaking(); setStep("listen"); }} />
      )}

      {step === "questions" && (
        <Questions story={story} answers={answers} setAnswers={setAnswers} onDone={() => setStep("english")} />
      )}

      {step === "english" && (
        <EnglishStep story={story} answers={answers} onAgain={() => { setAnswers(story.questions.map(() => null)); setWantsRead(null); setStep("listen"); }} />
      )}
    </>
  );
}

function Listen({ story, onNext }: { story: ListeningStory; onNext: () => void }) {
  const [idx, setIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const token = useRef(0);
  const n = story.lines.length;

  async function playFrom(start: number, all: boolean) {
    const mine = ++token.current;
    setPlaying(true);
    for (let i = start; i < n; i++) {
      if (token.current !== mine) return;
      setIdx(i);
      await speakThen(story.lines[i].bn, true);
      if (!all) break;
      await pause(900);
    }
    if (token.current === mine) setPlaying(false);
  }
  function stop() { token.current++; stopSpeaking(); setPlaying(false); }

  return (
    <section className="story-panel">
      <p>Listen to the story. It is read slowly. You can play it as many times as you like, or go line by line. The words stay hidden for now.</p>
      <div className="story-player">
        <button className="btn big-btn" onClick={() => (playing ? stop() : playFrom(0, true))}>
          <Icon name={playing ? "close" : "sound"} size={18} /> {playing ? "Stop" : idx >= 0 ? "Play the whole story again" : "Play the whole story"}
        </button>
        <p className="muted" aria-live="polite">{idx >= 0 ? `Line ${idx + 1} of ${n}` : `${n} lines`}</p>
        <div className="story-lines" role="group" aria-label="Play one line">
          <button className="btn ghost small" disabled={idx <= 0} onClick={() => { stop(); void playFrom(idx - 1, false); }}><Icon name="prev" size={16} /> Previous line</button>
          <button className="btn ghost small" disabled={idx < 0} onClick={() => { stop(); void playFrom(idx, false); }}><Icon name="sound" size={16} /> Replay this line</button>
          <button className="btn ghost small" disabled={idx >= n - 1} onClick={() => { stop(); void playFrom(idx + 1, false); }}>Next line <Icon name="next" size={16} /></button>
        </div>
      </div>
      <p><button className="btn" onClick={onNext}>I have listened enough. Continue</button></p>
    </section>
  );
}

function ReadStep({ story, wantsRead, setWantsRead, onNext, onBack }: { story: ListeningStory; wantsRead: boolean | null; setWantsRead: (v: boolean) => void; onNext: () => void; onBack: () => void }) {
  return (
    <section className="story-panel">
      {wantsRead === null && (
        <>
          <p>Would you like to read the story in Bengali, with the romanized spelling next to it?</p>
          <div className="story-choice">
            <button className="btn" onClick={() => setWantsRead(true)}>Yes, show me the story</button>
            <button className="btn ghost" onClick={onNext}>No, go to the questions</button>
            <button className="btn ghost" onClick={onBack}>Listen again</button>
          </div>
        </>
      )}
      {wantsRead && (
        <>
          <p className="muted">Tap the sound button next to any line to hear it slowly.</p>
          <ol className="story-text">
            {story.lines.map((l, i) => (
              <li key={i}>
                <button type="button" className="wplay" onClick={() => speak(l.bn, true)} aria-label={`Hear line ${i + 1}`}><Icon name="sound" size={18} /></button>
                <span>
                  <span lang="bn" className="g-ex-bn">{l.bn}</span>
                  <span className="g-ro-line">{l.ro}</span>
                </span>
              </li>
            ))}
          </ol>
          <p><button className="btn" onClick={onNext}>Continue to the questions</button> <button className="btn ghost" onClick={onBack}>Listen again</button></p>
        </>
      )}
    </section>
  );
}

function Questions({ story, answers, setAnswers, onDone }: { story: ListeningStory; answers: (string | null)[]; setAnswers: React.Dispatch<React.SetStateAction<(string | null)[]>>; onDone: () => void }) {
  const [i, setI] = useState(0);
  const q = story.questions[i];
  const [options] = useState(() => story.questions.map((x) => shuffle(x.options)));
  const picked = answers[i];
  const right = picked === q.options[0];
  const line = story.lines[q.line - 1];

  function choose(o: string) {
    setAnswers((a) => a.map((x, k) => (k === i ? o : x)));
  }

  return (
    <section className="story-panel">
      <p className="muted">Question {i + 1} of {story.questions.length} · Right so far {answers.filter((a, k) => a !== null && a === story.questions[k].options[0]).length}</p>
      <h2 className="quiz-q">{q.q}</h2>
      <div className="options">
        {options[i].map((o) => {
          const cls = picked !== null ? (o === q.options[0] ? " right" : o === picked ? " wrong" : "") : "";
          return <button key={o} className={"opt text" + cls} disabled={picked !== null} onClick={() => choose(o)}>{o}</button>;
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{right ? "Correct!" : `Not quite. The answer is: ${q.options[0]}.`}</p>
          <p className="story-evidence">
            <button type="button" className="wplay" onClick={() => speak(line.bn, true)} aria-label="Hear this line"><Icon name="sound" size={18} /></button>
            <span><span lang="bn" className="g-ex-bn">{line.bn}</span><span className="g-ro-line">{line.ro}</span></span>
          </p>
          <button className="btn" onClick={() => (i + 1 < story.questions.length ? setI(i + 1) : onDone())}>{i + 1 < story.questions.length ? "Next question" : "See my score"}</button>
        </>
      )}
    </section>
  );
}

function EnglishStep({ story, answers, onAgain }: { story: ListeningStory; answers: (string | null)[]; onAgain: () => void }) {
  const right = answers.filter((a, k) => a === story.questions[k].options[0]).length;
  const wrong = story.questions.map((q, k) => ({ q, k })).filter(({ q, k }) => answers[k] !== q.options[0]);
  const total = story.questions.length;
  return (
    <section className="story-panel">
      <h2>You got {right} of {total} right{wrong.length ? `, and ${wrong.length} wrong` : ""}</h2>
      <p className="muted">{right === total ? "Perfect. You understood the whole story." : right >= total * 0.7 ? "Good listening. Check the ones you missed below." : "Listen once more and try again. The English story is below."}</p>
      {wrong.length > 0 && (
        <ul className="story-missed">
          {wrong.map(({ q, k }) => (
            <li key={k}><b>{q.q}</b> <span>{q.options[0]}</span></li>
          ))}
        </ul>
      )}
      <h2>The story in English</h2>
      <ol className="story-text story-en">
        {story.lines.map((l, i) => <li key={i}><span>{l.en}</span></li>)}
      </ol>
      <p><button className="btn" onClick={onAgain}>Listen again from the start</button></p>
    </section>
  );
}

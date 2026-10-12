"use client";

import { createContext, useContext, useState } from "react";
import type { Letter } from "@/data/letters";
import { recordAnswer } from "../../../actions";
import { useRoman } from "../../Roman";

type Progress = Record<string, { right: number; wrong: number }>;
type Mode = "letter2word" | "word2letter" | "listen";
type Tab = "learn" | "quiz" | "progress";

type Data = { LETTERS: Letter[]; GROUPS: { id: string; title: string }[]; QUIZ_LETTERS: Letter[] };
const D = createContext<Data>(null as unknown as Data);
const mastered = (p: Progress, ch: string) => !!p[ch] && p[ch].right >= 3 && p[ch].right > p[ch].wrong;

function shuffle<T>(a: T[]): T[] {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "bn-BD";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export default function Alphabet({
  initialProgress,
  segment,
  letters,
  groups,
}: {
  initialProgress: Progress;
  segment: "reading" | "speaking";
  letters: Letter[];
  groups: { id: string; title: string }[];
}) {
  const speaking = segment === "speaking";
  const tabs: Tab[] = speaking ? ["learn", "quiz"] : ["learn", "quiz", "progress"];
  const labels: Record<Tab, string> = speaking
    ? { learn: "Sounds", quiz: "Listening quiz", progress: "Progress" }
    : { learn: "Learn", quiz: "Quiz", progress: "Progress" };
  const modes: Mode[] = speaking ? ["listen"] : ["letter2word", "word2letter"];
  const [tab, setTab] = useState<Tab>("learn");
  const [progress, setProgress] = useState<Progress>(initialProgress);

  function answered(ch: string, correct: boolean) {
    setProgress((p) => {
      const s = p[ch] ?? { right: 0, wrong: 0 };
      return { ...p, [ch]: { right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) } };
    });
    void recordAnswer(ch, correct);
  }

  return (
    <D.Provider value={{ LETTERS: letters, GROUPS: groups, QUIZ_LETTERS: letters.filter((l) => l.word) }}>
      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
            {labels[t]}
          </button>
        ))}
      </nav>
      {tab === "learn" && <Learn progress={progress} />}
      {tab === "quiz" && <Quiz progress={progress} onAnswer={answered} modes={modes} />}
      {tab === "progress" && <ProgressView progress={progress} />}
    </D.Provider>
  );
}

function Learn({ progress }: { progress: Progress }) {
  const { LETTERS, GROUPS } = useContext(D);
  const { roman } = useRoman();
  const [sel, setSel] = useState<Letter | null>(null);
  return (
    <>
      {sel && (
        <section className="detail">
          <div className="big">{sel.ch}</div>
          <div>
            {roman && <p className="sound">Sounds like: <b>{sel.rom}</b></p>}
            {sel.word && <p><span className="word">{sel.word}</span>{roman && ` (${sel.wrom})`} – {sel.wmean}</p>}
            <button className="btn" onClick={() => speak(sel.ch)}>🔊 Letter</button>
            {sel.word && <button className="btn" onClick={() => speak(sel.word!)}>🔊 Word</button>}
          </div>
        </section>
      )}
      {GROUPS.map((g) => (
        <section key={g.id}>
          <h2>{g.title}</h2>
          <div className="grid">
            {LETTERS.filter((l) => l.group === g.id).map((l) => (
              <button key={l.ch} className={"tile" + (mastered(progress, l.ch) ? " done" : "")} onClick={() => setSel(l)}>
                <span className="ch">{l.ch}</span>
                {roman && <span className="rom">{l.rom}</span>}
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

type Run = { mode: Mode; queue: Letter[]; i: number; score: number };

function Quiz({ progress, onAnswer, modes }: { progress: Progress; onAnswer: (ch: string, ok: boolean) => void; modes: Mode[] }) {
  const { QUIZ_LETTERS, GROUPS } = useContext(D);
  const [scope, setScope] = useState("all");
  const [run, setRun] = useState<Run | null>(null);

  function start(mode: Mode) {
    let pool = QUIZ_LETTERS;
    if (scope === "weak") pool = pool.filter((l) => !mastered(progress, l.ch));
    else if (scope !== "all") pool = pool.filter((l) => l.group === scope);
    if (pool.length < 4) pool = QUIZ_LETTERS;
    setRun({ mode, queue: shuffle(pool).slice(0, 10), i: 0, score: 0 });
  }

  if (!run) {
    return (
      <>
        <h2>Choose a quiz</h2>
        <div className="menu">
          {modes.includes("letter2word") && <button className="card" onClick={() => start("letter2word")}><b>Letter → word</b><span>See a letter, pick the word it starts</span></button>}
          {modes.includes("word2letter") && <button className="card" onClick={() => start("word2letter")}><b>Word → letter</b><span>See a word, pick its first letter</span></button>}
          {modes.includes("listen") && <button className="card" onClick={() => start("listen")}><b>Listen</b><span>Hear a letter, pick the right one</span></button>}
        </div>
        <p className="muted">Scope:</p>
        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="all">All letters</option>
          {GROUPS.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
          <option value="weak">My weak letters</option>
        </select>
      </>
    );
  }

  if (run.i >= run.queue.length) {
    return (
      <>
        <h2>You scored {run.score} / {run.queue.length}</h2>
        <button className="btn" onClick={() => setRun(null)}>Back to quizzes</button>
      </>
    );
  }

  return (
    <Question
      key={run.i}
      run={run}
      onAnswer={(ok) => { onAnswer(run.queue[run.i].ch, ok); if (ok) setRun({ ...run, score: run.score + 1 }); }}
      onNext={() => setRun((r) => r && { ...r, i: r.i + 1 })}
    />
  );
}

function Question({ run, onAnswer, onNext }: { run: Run; onAnswer: (ok: boolean) => void; onNext: () => void }) {
  const { QUIZ_LETTERS } = useContext(D);
  const { roman } = useRoman();
  const q = run.queue[run.i];
  const [options] = useState(() =>
    shuffle([q, ...shuffle(QUIZ_LETTERS.filter((l) => l.ch !== q.ch && l.word !== q.word)).slice(0, 3)]),
  );
  const [picked, setPicked] = useState<string | null>(null);
  const m = run.mode;

  return (
    <>
      <p className="muted">Question {run.i + 1} of {run.queue.length} · Score {run.score}</p>
      {m === "letter2word" && <div className="big">{q.ch}</div>}
      {m === "word2letter" && (
        <div className="prompt"><span className="word">{q.word}</span><small>{roman ? `${q.wrom} – ${q.wmean}` : q.wmean}</small></div>
      )}
      {m === "listen" && <button className="btn big-btn" onClick={() => speak(q.ch)}>🔊 Play sound</button>}
      <div className={"options" + (m === "letter2word" ? "" : " letters")}>
        {options.map((o) => {
          const cls = picked ? (o.ch === q.ch ? " right" : o.ch === picked ? " wrong" : "") : "";
          return (
            <button key={o.ch} className={"opt" + cls} disabled={!!picked}
              onClick={() => { setPicked(o.ch); onAnswer(o.ch === q.ch); }}>
              {m === "letter2word" ? (roman ? `${o.word} (${o.wrom})` : o.word) : o.ch}
            </button>
          );
        })}
      </div>
      {picked && (
        <>
          <p className="feedback">{picked === q.ch ? "Correct!" : `Not quite – it's ${q.ch}${roman ? ` (${q.rom})` : ""}.`}</p>
          <button className="btn" onClick={onNext}>Next →</button>
        </>
      )}
    </>
  );
}

function ProgressView({ progress }: { progress: Progress }) {
  const { LETTERS } = useContext(D);
  const done = LETTERS.filter((l) => mastered(progress, l.ch)).length;
  const pct = Math.round((100 * done) / LETTERS.length);
  return (
    <>
      <h2>{done} of {LETTERS.length} letters mastered</h2>
      <div className="bar"><div style={{ width: `${pct}%` }} /></div>
      <p className="muted">A letter is mastered after 3+ correct answers with more right than wrong.</p>
      <div className="grid">
        {LETTERS.map((l) => {
          const s = progress[l.ch];
          return (
            <div key={l.ch} className={"tile static" + (mastered(progress, l.ch) ? " done" : "")}>
              <span className="ch">{l.ch}</span>
              <span className="rom">{s ? `✓${s.right} ✗${s.wrong}` : "–"}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

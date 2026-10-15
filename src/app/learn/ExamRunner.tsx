"use client";

import BnText from "./BnText";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExamResult, StartedExam } from "../actions";
import { startExam, submitExam } from "../actions";
import { speak } from "@/lib/speak";
import Icon from "./Icon";
import { CellView } from "./LessonReader";
import { useRoman } from "./Roman";

type Pub = { id: string; title: string; blurb: string; minutes: number; count: number; pass: number };
type Hist = { attempts: { finishedAt: string; score: number; total: number }[]; best: number | null };
type Phase = "intro" | "loading" | "run" | "done";

const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

export default function ExamRunner({ exam, history }: { exam: Pub; history: Hist }) {
  const { roman } = useRoman();
  const [phase, setPhase] = useState<Phase>("intro");
  const [error, setError] = useState("");
  const [run, setRun] = useState<StartedExam | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [cur, setCur] = useState(0);
  const [left, setLeft] = useState(exam.minutes * 60);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const submitting = useRef(false);
  const offset = useRef(0);

  const key = (id: string) => `exam:${id}`;

  async function begin() {
    setPhase("loading"); setError("");
    const r = await startExam(exam.id);
    if ("error" in r) { setError(r.error); setPhase("intro"); return; }
    offset.current = Date.parse(r.serverNow) - Date.now();
    let saved: (number | null)[] | null = null;
    try { const raw = localStorage.getItem(key(r.attemptId)); if (raw) saved = JSON.parse(raw); } catch { /* storage may be unavailable */ }
    setAnswers(saved && saved.length === r.questions.length ? saved : r.questions.map(() => null));
    setRun(r); setCur(0); setConfirm(false); submitting.current = false; setPhase("run");
  }

  const submit = useCallback(async (finalAnswers: (number | null)[], attemptId: string) => {
    if (submitting.current) return;
    submitting.current = true;
    const r = await submitExam(attemptId, finalAnswers);
    if ("error" in r) { setError(r.error); submitting.current = false; return; }
    try { localStorage.removeItem(key(attemptId)); } catch { /* ignore */ }
    setResult(r); setPhase("done");
  }, []);

  // the clock: counts down to the server's deadline and submits by itself when it reaches zero
  useEffect(() => {
    if (phase !== "run" || !run) return;
    const tick = () => {
      const s = Math.ceil((Date.parse(run.deadline) - (Date.now() + offset.current)) / 1000);
      setLeft(s);
      if (s <= 0) void submit(answersRef.current, run.attemptId);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [phase, run, submit]);

  const answersRef = useRef<(number | null)[]>([]);
  useEffect(() => { answersRef.current = answers; }, [answers]);

  function choose(k: number) {
    if (!run) return;
    setAnswers((a) => {
      const next = a.slice(); next[cur] = k;
      try { localStorage.setItem(key(run.attemptId), JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }

  if (phase === "intro" || phase === "loading") {
    return (
      <div className="exam-intro">
        <h1>{exam.title}</h1>
        <p className="lede">{exam.blurb}</p>
        <ul className="exam-rules">
          <li><b>{exam.count} questions</b> in <b>{exam.minutes} minutes</b>.</li>
          <li>You pass with <b>{exam.pass}%</b> or more. Passing completes this lesson.</li>
          <li>You do not see whether an answer is right until you finish. You can go back and change answers.</li>
          <li>The timer keeps running if you leave the page. When it reaches zero the exam is submitted for you.</li>
          <li>Every attempt has new questions, so you can sit it again.</li>
        </ul>
        {error && <p className="msg bad" role="alert">{error}</p>}
        <button className="btn" onClick={begin} disabled={phase === "loading"}>{phase === "loading" ? "Preparing your exam…" : "Start the exam"}</button>
        {history.attempts.length > 0 && (
          <div className="exam-history">
            <h2>Your attempts</h2>
            <p className="muted">Best score: {history.best}%</p>
            <ul>
              {history.attempts.map((a, n) => (
                <li key={n}><span>{new Date(a.finishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span><b>{a.score} / {a.total}</b><span className="muted">{Math.round((a.score / a.total) * 100)}%</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (phase === "done" && result) {
    const shown = result.review.map((r, n) => ({ r, n })).filter(({ r }) => !onlyWrong || r.chosen !== r.answer);
    return (
      <div className="exam-result">
        <h1>{exam.title}</h1>
        <div className={"score-card " + (result.passed ? "pass" : "fail")}>
          <p className="score-big">{result.pct}%</p>
          <p><b>{result.score} / {result.total}</b> correct · {mmss(result.seconds)} used</p>
          <p>{result.late ? "The exam was submitted too long after the time ended, so it was not counted." : result.passed ? `Passed. You needed ${result.pass}% and this lesson is now complete.` : `Not passed yet. You need ${result.pass}%. Review the answers below, then try again.`}</p>
        </div>
        <button className="btn" onClick={() => { setResult(null); setPhase("intro"); }}>Back to the exam page</button>
        <h2>Review your answers</h2>
        <label className="check"><input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} /> Show only the ones I got wrong</label>
        <ol className="review">
          {shown.map(({ r, n }) => (
            <li key={n} className={r.chosen === r.answer ? "ok" : "no"}>
              <p className="rv-top"><b>{n + 1}.</b> <span className="q-kind">{r.topic}</span> <span className="rv-flag">{r.chosen === r.answer ? "Correct" : r.chosen === null ? "Not answered" : "Wrong"}</span></p>
              <p className="rv-inst"><BnText text={r.inst} /></p>
              <p className="quiz-q"><BnText text={r.q} /></p>
              {r.sentence && <p className="g-sentence"><span lang="bn" className="g-ex-bn">{r.sentence.bn}</span>{roman && <span className="g-ro-line">{r.sentence.ro}</span>}</p>}
              <ul className="rv-opts">
                {r.options.map((o, k) => (
                  <li key={k} className={k === r.answer ? "right" : k === r.chosen ? "wrong" : ""}>
                    <Icon name={k === r.answer ? "check" : k === r.chosen ? "close" : "circle"} size={16} />
                    <span><CellView cell={o} roman={roman} /></span>
                  </li>
                ))}
              </ul>
              {r.why && <p className="g-why"><BnText text={r.why} /></p>}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (!run) return null;
  const q = run.questions[cur];
  const answered = answers.filter((a) => a !== null).length;
  const warn = left <= 60;
  return (
    <div className="exam-run">
      <div className="exam-bar">
        <span className={"timer" + (warn ? " warn" : "")} role="timer" aria-label="Time left"><Icon name="clock" size={18} />{mmss(left)}</span>
        <span className="muted">{answered} of {run.questions.length} answered</span>
      </div>
      <div className="q-card">
        <div className="q-top"><span className="q-kind">{q.topic}</span><span className="q-count">Question {cur + 1} of {run.questions.length}</span></div>
        <p className="q-inst"><b>What to do:</b> <BnText text={q.inst} /></p>
        {q.audio && (
          <div className="exam-audio">
            <button className="btn big-btn" onClick={() => speak(q.audio!)}><Icon name="sound" size={18} /> Play</button>
            <button className="btn ghost" onClick={() => speak(q.audio!, { slow: true })}>Play slowly</button>
          </div>
        )}
        <h3 className="quiz-q"><BnText text={q.q} /></h3>
        {q.sentence && <p className="g-sentence"><span lang="bn" className="g-ex-bn">{q.sentence.bn}</span>{roman && <span className="g-ro-line">{q.sentence.ro}</span>}</p>}
        <div className="options">
          {q.options.map((o, k) => (
            <button key={k} className={"opt text g-opt" + (answers[cur] === k ? " picked" : "")} aria-pressed={answers[cur] === k} onClick={() => choose(k)}>
              <CellView cell={o} roman={roman} />
            </button>
          ))}
        </div>
        <div className="exam-nav">
          <button className="btn ghost" disabled={cur === 0} onClick={() => setCur(cur - 1)}>Previous</button>
          {cur < run.questions.length - 1 ? <button className="btn" onClick={() => setCur(cur + 1)}>Next</button> : <button className="btn" onClick={() => setConfirm(true)}>Finish</button>}
        </div>
      </div>
      <div className="qmap" role="group" aria-label="Question map">
        {run.questions.map((_, n) => (
          <button key={n} className={(answers[n] !== null ? "done " : "") + (n === cur ? "cur" : "")} onClick={() => setCur(n)} aria-label={`Question ${n + 1}${answers[n] !== null ? ", answered" : ""}`}>{n + 1}</button>
        ))}
      </div>
      {error && <p className="msg bad" role="alert">{error}</p>}
      {!confirm ? (
        <button className="btn ghost" onClick={() => setConfirm(true)}>Submit the exam</button>
      ) : (
        <div className="exam-confirm" role="alertdialog" aria-label="Submit the exam">
          <p>{answered < run.questions.length ? `You have ${run.questions.length - answered} unanswered ${run.questions.length - answered === 1 ? "question" : "questions"}. Submit anyway?` : "Submit your answers now?"}</p>
          <button className="btn" onClick={() => void submit(answers, run.attemptId)}>Yes, submit</button>
          <button className="btn ghost" onClick={() => setConfirm(false)}>Keep going</button>
        </div>
      )}
    </div>
  );
}

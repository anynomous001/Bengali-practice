"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PLACES, type Letter } from "@/data/letters";
import { recordAnswer, sendLetterFeedback } from "../../../actions";
import { speak } from "@/lib/speak";
import Icon from "../../Icon";
import UnderlineTabs from "../../UnderlineTabs";
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
      <UnderlineTabs tabs={tabs.map((t) => ({ id: t, label: labels[t] }))} value={tab} onChange={setTab} label="Alphabet modes" />
      {tab === "learn" && <Learn progress={progress} />}
      {tab === "quiz" && <Quiz progress={progress} onAnswer={answered} modes={modes} />}
      {tab === "progress" && <ProgressView progress={progress} />}
    </D.Provider>
  );
}

/** Tip text with the Bengali letters in it shown large enough to read. */
function TipText({ text }: { text: string }) {
  return <>{text.split(/([\u0980-\u09FF]+)/).map((s, i) => (/[\u0980-\u09FF]/.test(s) ? <span key={i} lang="bn" className="tip-bn">{s}</span> : s))}</>;
}

function Learn({ progress }: { progress: Progress }) {
  const { LETTERS, GROUPS } = useContext(D);
  const { roman } = useRoman();
  const [sel, setSel] = useState<Letter | null>(null);
  const [view, setView] = useState<"order" | "place">("order");
  // "On this page" links point at the in-order sections: switch to that view first if the sound-place view is showing.
  useEffect(() => {
    const onHash = () => {
      const id = location.hash.slice(1);
      if (!id.startsWith("sec-") || document.getElementById(id)) return;
      setView("order");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const place = sel ? PLACES.find((p) => p.id === sel.place) : null;
  const tile = (l: Letter) => (
    <div key={l.ch} className={"lcard" + (mastered(progress, l.ch) ? " done" : "") + (sel?.ch === l.ch ? " current" : "")}>
      <button type="button" className="lcard-main" onClick={() => { setSel(l); speak(l.ch); }} aria-label={`${l.ch}, ${l.rom}. Hear it and see more.`}>
        <span className="ch" lang="bn">{l.ch}</span>
        {roman && <span className="rom">{l.rom}</span>}
      </button>
      {l.word && <span className="ex"><span lang="bn">{l.word}</span>{roman && ` (${l.wrom})`}: {l.wmean}</span>}
      {l.tip && <span className="ex tip"><b>Trick: </b><TipText text={l.tip} /></span>}
      <div className="lcard-btns">
        <button type="button" onClick={() => speak(l.ch)}><Icon name="sound" size={14} /> Letter</button>
        {l.word && <button type="button" onClick={() => speak(l.word!)}><Icon name="sound" size={14} /> Word</button>}
      </div>
    </div>
  );
  return (
    <>
      {sel && (
        <section className="detail more">
          <div>
            <p className="sound"><b lang="bn" className="more-ch">{sel.ch}</b>{roman && <> sounds like <b>{sel.rom}</b></>}</p>
            {place && <p className="place-line">Made in the <b lang="bn">{place.bn}</b> place: {place.en}. {place.how}</p>}
            {sel.vs && <p className="trick-vs">Do not mix it up with <TipText text={sel.vs} />.</p>}
            <LetterFeedback key={sel.ch} letter={sel.ch} />
          </div>
        </section>
      )}
      <div className="place-switch" role="group" aria-label="Group the letters by">
        <button type="button" className={view === "order" ? "on" : ""} onClick={() => setView("order")}>In order</button>
        <button type="button" className={view === "place" ? "on" : ""} onClick={() => setView("place")}>By sound place</button>
      </div>
      {view === "order" && GROUPS.map((g) => (
        <section key={g.id} id={`sec-${g.id}`} className="anchor">
          <h2>{g.title}</h2>
          <div className="lgrid">{LETTERS.filter((l) => l.group === g.id).map(tile)}</div>
        </section>
      ))}
      {view === "place" && PLACES.map((p) => {
        const ls = LETTERS.filter((l) => l.place === p.id);
        if (!ls.length) return null;
        return (
          <section key={p.id} className="anchor">
            <h2><span lang="bn">{p.bn}</span> <span className="place-en">{p.en}</span></h2>
            <p className="place-how">{p.how}</p>
            <div className="lgrid">{ls.map(tile)}</div>
          </section>
        );
      })}
    </>
  );
}

function LetterFeedback({ letter }: { letter: string }) {
  const topics = ["Sound is wrong", "Tip is unclear", "Example word is wrong", "Place of sound is wrong", "Other"];
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [msg, setMsg] = useState("");
  const [state, setState] = useState<"idle" | "sent" | "failed">("idle");
  if (state === "sent") return <p className="muted">Thank you. Your teacher will see this.</p>;
  if (!open) return <p><button type="button" className="linkbtn" onClick={() => setOpen(true)}>Report a problem with this letter</button></p>;
  return (
    <form className="fb-form" onSubmit={async (e) => { e.preventDefault(); const r = await sendLetterFeedback(letter, topic, msg); setState(r.ok ? "sent" : "failed"); }}>
      <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="What is wrong">{topics.map((t) => <option key={t}>{t}</option>)}</select>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={500} placeholder="Tell your teacher more (optional)" aria-label="More detail" />
      <button className="btn small">Send</button>
      {state === "failed" && <span className="msg bad" role="status">Could not send. Please try again.</span>}
    </form>
  );
}

type Run = { mode: Mode; queue: Letter[]; pool: Letter[]; i: number; score: number };

function Quiz({ progress, onAnswer, modes }: { progress: Progress; onAnswer: (ch: string, ok: boolean) => void; modes: Mode[] }) {
  const { LETTERS, QUIZ_LETTERS, GROUPS } = useContext(D);
  const { roman } = useRoman();
  const [scope, setScope] = useState("all");
  const [run, setRun] = useState<Run | null>(null);
  // A range: the first and last letter the student has learned so far, in alphabet order.
  const [from, setFrom] = useState(LETTERS[0].ch);
  const [to, setTo] = useState(LETTERS[LETTERS.length - 1].ch);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bp_alpha_range") ?? "null");
      if (saved && LETTERS.some((l) => l.ch === saved.from) && LETTERS.some((l) => l.ch === saved.to)) { setFrom(saved.from); setTo(saved.to); setScope("range"); }
    } catch { /* no saved range */ }
  }, [LETTERS]);
  const order = (ch: string) => LETTERS.findIndex((l) => l.ch === ch);
  const lo = Math.min(order(from), order(to));
  const hi = Math.max(order(from), order(to));
  const inRange = new Set(LETTERS.slice(lo, hi + 1).map((l) => l.ch));
  const rangePool = QUIZ_LETTERS.filter((l) => inRange.has(l.ch));
  const rangeTooSmall = scope === "range" && rangePool.length < 4;
  const label = (ch: string) => { const l = LETTERS.find((x) => x.ch === ch)!; return roman ? `${l.ch}  (${l.rom})` : l.ch; };

  function pick(setter: (v: string) => void, other: string, isFrom: boolean) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      const next = isFrom ? { from: e.target.value, to: other } : { from: other, to: e.target.value };
      try { localStorage.setItem("bp_alpha_range", JSON.stringify(next)); } catch { /* storage unavailable */ }
    };
  }

  function start(mode: Mode) {
    let pool = QUIZ_LETTERS;
    if (scope === "range") pool = rangePool;
    else if (scope === "weak") pool = pool.filter((l) => !mastered(progress, l.ch));
    else if (scope.startsWith("place:")) pool = pool.filter((l) => l.place === scope.slice(6));
    else if (scope !== "all") pool = pool.filter((l) => l.group === scope);
    if (pool.length < 4) pool = QUIZ_LETTERS;
    setRun({ mode, queue: shuffle(pool).slice(0, 10), pool, i: 0, score: 0 });
  }

  if (!run) {
    return (
      <>
        <h2>Choose a quiz</h2>
        <div className="menu">
          {modes.includes("letter2word") && <button className="card" disabled={rangeTooSmall} onClick={() => start("letter2word")}><b>Letter to word</b><span>See a letter, pick the word it starts</span></button>}
          {modes.includes("word2letter") && <button className="card" disabled={rangeTooSmall} onClick={() => start("word2letter")}><b>Word to letter</b><span>See a word, pick its first letter</span></button>}
          {modes.includes("listen") && <button className="card" disabled={rangeTooSmall} onClick={() => start("listen")}><b>Listen</b><span>Hear a letter, pick the right one</span></button>}
        </div>
        <p className="muted">Scope:</p>
        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="all">All letters</option>
          <option value="range">A range of letters (from … to …)</option>
          {GROUPS.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
          {PLACES.filter((p) => QUIZ_LETTERS.filter((l) => l.place === p.id).length >= 4).map((p) => <option key={p.id} value={"place:" + p.id}>Sound place: {p.bn}, {p.en}</option>)}
          <option value="weak">My weak letters</option>
        </select>
        {scope === "range" && (
          <div className="alpha-range">
            <label>From
              <select value={from} onChange={pick(setFrom, to, true)}>{LETTERS.map((l) => <option key={l.ch} value={l.ch}>{label(l.ch)}</option>)}</select>
            </label>
            <label>To
              <select value={to} onChange={pick(setTo, from, false)}>{LETTERS.map((l) => <option key={l.ch} value={l.ch}>{label(l.ch)}</option>)}</select>
            </label>
            <p className="muted">{rangeTooSmall ? "Pick a range with at least 4 letters, for example অ to ঈ. All questions and answer choices come from this range only." : `${rangePool.length} letters in this range. All questions and answer choices come from this range only.`}</p>
          </div>
        )}
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
  const { roman } = useRoman();
  const q = run.queue[run.i];
  const [options] = useState(() =>
    shuffle([q, ...shuffle(run.pool.filter((l) => l.ch !== q.ch && l.word !== q.word)).slice(0, 3)]),
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
      {m === "listen" && <button className="btn big-btn" onClick={() => speak(q.ch)}><Icon name="sound" size={18} /> Play sound</button>}
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
          <button className="btn" onClick={onNext}>Next</button>
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
              <span className="rom">{s ? <><Icon name="check" size={12} />{s.right} <Icon name="close" size={12} />{s.wrong}</> : "–"}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

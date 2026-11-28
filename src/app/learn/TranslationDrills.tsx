"use client";

import { useState } from "react";
import { drillRound, finishDrill } from "../actions";
import { useRoman } from "./Roman";

type Item = { bn: string; ro: string; en: string; tense: string; level: string; kind?: string };
type Tense = { id: string; label: string; example: string };
type Phase = "setup" | "loading" | "run" | "sheet" | "done";

const LEVELS = [
  { id: "easy", label: "Easy", hint: "I, you, he or she. One short sentence." },
  { id: "medium", label: "Medium", hint: "Every person, with negatives and questions." },
  { id: "hard", label: "A little hard", hint: "Two ideas in one sentence." },
  { id: "step", label: "Step up", hint: "Starts easy, then medium, then hard, like a worksheet." },
];
const MODES = [
  { id: "one", label: "One at a time", hint: "Say or write it, check, and rate yourself." },
  { id: "sheet", label: "Worksheet", hint: "All the sentences on one page. Reveal answers when you are done." },
];

/** What to remember about each tense, shown with the answer. */
const TIPS: Record<string, { sign: string; neg: string }> = {
  pres: { sign: "root + ending (no sign): করি, করো, করে, করেন", neg: "add না after the verb: করি না" },
  cont: { sign: "root + ছ + ending: করছি", neg: "add না after the verb: করছি না" },
  perf: { sign: "root + েছ + ending: করেছি", neg: "simple present form + নি: করিনি (use এখনও for 'not yet')" },
  perfcont: { sign: "present continuous + ধরে / থেকে: দুই বছর ধরে শিখছি", neg: "add না after the verb" },
  past: { sign: "root + েছিল + ending: করেছিলাম (with a past time word like গতকাল)", neg: "simple present form + নি: করিনি" },
  pastcont: { sign: "root + ছিল + ending: করছিলাম (with তখন)", neg: "add না after the verb: করছিলাম না" },
  pastperf: { sign: "the same form as the simple past, plus আগে / আগেই: আগেই করেছিলাম", neg: "আগে + simple present form + নি: আগে করিনি" },
  habit: { sign: "root + ত + ending: করতাম", neg: "add না after the verb: করতাম না" },
  fut: { sign: "root + ব + ending: করব, করবে, করবেন", neg: "add না after the verb: করব না" },
  futcont: { sign: "the -তে form + থাকব: করতে থাকব", neg: "add না after the verb: করতে থাকব না" },
  futperf: { sign: "the -এ form + থাকব: করে থাকব", neg: "add না after the verb: করে থাকব না" },
};
const KIND_TIP: Record<string, string> = { q: "For a yes / no question add কি after the subject; the tense does not change.", two: "Two ideas: translate each clause in its own tense, then join them with আর (and) or কিন্তু (but)." };

function Tip({ d }: { d: Item }) {
  const t = TIPS[d.tense];
  if (!t) return null;
  return (
    <div className="drill-tip">
      <p><b>The tense:</b> {t.sign}</p>
      {d.kind === "neg" || d.kind === "two" ? <p><b>Negative:</b> {t.neg}</p> : null}
      {d.kind && KIND_TIP[d.kind] ? <p>{KIND_TIP[d.kind]}</p> : null}
    </div>
  );
}

export default function TranslationDrills({ tenses, only, embedded }: { tenses: Tense[]; only?: string[]; embedded?: boolean }) {
  tenses = only ? tenses.filter((t) => only.includes(t.id)) : tenses;
  const { roman } = useRoman();
  const [phase, setPhase] = useState<Phase>("setup");
  const [picked, setPicked] = useState<string[]>(only ?? ["pres", "cont"]);
  const [level, setLevel] = useState("easy");
  const [mode, setMode] = useState("one");
  const [dir, setDir] = useState<"en2bn" | "bn2en">("en2bn");
  const [items, setItems] = useState<Item[]>([]);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const label = (id: string) => tenses.find((t) => t.id === id)?.label ?? id;
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function start() {
    if (!picked.length) return;
    setPhase("loading");
    const round = await drillRound(picked, level, 10);
    if (!round.length) { setPhase("setup"); return; }
    setItems(round); setI(0); setShown(false); setScore(0); setOpen({});
    setPhase(mode === "sheet" ? "sheet" : "run");
  }
  function rate(got: boolean) {
    const next = score + (got ? 1 : 0);
    if (i + 1 >= items.length) { setScore(next); setPhase("done"); void finishDrill(next, items.length); return; }
    setScore(next); setI(i + 1); setShown(false);
  }
  const prompt = (d: Item) => dir === "en2bn"
    ? <span className="t-en">{d.en}</span>
    : <><span lang="bn" className="g-ex-bn t-bn">{d.bn}</span>{roman && <span className="g-ro-line">{d.ro}</span>}</>;
  const answer = (d: Item) => dir === "en2bn"
    ? <><span lang="bn" className="g-ex-bn">{d.bn}</span>{roman && <span className="g-ro-line">{d.ro}</span>}</>
    : <span className="g-en">{d.en}</span>;

  if (phase === "setup" || phase === "loading") {
    return (
      <div className="drill-setup">
        <p className="lede">{embedded ? "Translate sentences in the tenses of this lesson. Start easy, then try medium (negatives and questions) and hard (two ideas in one sentence). After each answer you see a reminder of how the tense is built." : "Short sets of sentences for the tenses you choose. Start easy, then try medium and hard, or take a step-up round that climbs through all three. Every round is mixed fresh."}</p>
        <h3>{embedded ? "1. Which tenses" : "1. Tenses"}</h3>
        <div className="choice-group" role="group" aria-label="Tenses">
          {tenses.map((t) => (
            <label key={t.id} className={"choice" + (picked.includes(t.id) ? " on" : "")}>
              <input type="checkbox" checked={picked.includes(t.id)} onChange={() => toggle(t.id)} />
              <span><b>{t.label}</b><small>{t.example}</small></span>
            </label>
          ))}
        </div>
        {!embedded && (
          <p className="muted">
            <button className="btn ghost" onClick={() => setPicked(tenses.map((t) => t.id))}>All tenses</button>{" "}
            <button className="btn ghost" onClick={() => setPicked(["pres", "cont", "perf", "perfcont"])}>The present tenses</button>{" "}
            <button className="btn ghost" onClick={() => setPicked(["past", "pastcont", "pastperf", "habit"])}>The past tenses</button>{" "}
            <button className="btn ghost" onClick={() => setPicked(["fut", "futcont", "futperf"])}>The future tenses</button>
          </p>
        )}
        <h3>2. Level</h3>
        <div className="choice-group" role="radiogroup" aria-label="Level">
          {LEVELS.map((l) => (
            <label key={l.id} className={"choice" + (level === l.id ? " on" : "")}>
              <input type="radio" name="level" checked={level === l.id} onChange={() => setLevel(l.id)} />
              <span><b>{l.label}</b><small>{l.hint}</small></span>
            </label>
          ))}
        </div>
        <h3>3. How to practise</h3>
        <div className="choice-group" role="radiogroup" aria-label="Mode">
          {MODES.map((l) => (
            <label key={l.id} className={"choice" + (mode === l.id ? " on" : "")}>
              <input type="radio" name="mode" checked={mode === l.id} onChange={() => setMode(l.id)} />
              <span><b>{l.label}</b><small>{l.hint}</small></span>
            </label>
          ))}
        </div>
        <h3>4. Direction</h3>
        <div className="choice-group" role="radiogroup" aria-label="Direction">
          {[{ id: "en2bn", label: "English to Bengali", hint: "You see English and say the Bengali." }, { id: "bn2en", label: "Bengali to English", hint: "You see Bengali and say the meaning." }].map((l) => (
            <label key={l.id} className={"choice" + (dir === l.id ? " on" : "")}>
              <input type="radio" name="dir" checked={dir === l.id} onChange={() => setDir(l.id as "en2bn" | "bn2en")} />
              <span><b>{l.label}</b><small>{l.hint}</small></span>
            </label>
          ))}
        </div>
        <button className="btn" onClick={start} disabled={phase === "loading" || !picked.length}>{phase === "loading" ? "Getting your sentences…" : picked.length ? "Start" : "Pick at least one tense"}</button>
      </div>
    );
  }

  if (phase === "sheet") {
    return (
      <div className="card-static">
        <h2>Worksheet</h2>
        <p className="muted">{dir === "en2bn" ? "Translate each sentence into Bengali" : "Translate each sentence into English"}, then tap Show to check.</p>
        <ol className="drill-sheet">
          {items.map((d, k) => (
            <li key={k}>
              <div className="t-prompt">{prompt(d)}</div>
              <small className="muted">{label(d.tense)}</small>
              {open[k] ? <div className="model">{answer(d)}<Tip d={d} /></div> : <button className="btn ghost" onClick={() => setOpen({ ...open, [k]: true })}>Show</button>}
            </li>
          ))}
        </ol>
        <button className="btn" onClick={() => setOpen(Object.fromEntries(items.map((_, k) => [k, true])))}>Show all answers</button>
        <button className="btn ghost" onClick={start}>New worksheet</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="card-static practice-done">
        <h2>You got {score} of {items.length}</h2>
        <p>{score >= Math.ceil(items.length * 0.7) ? "Well done: this round counts as complete." : "Keep going: 7 or more completes the lesson."}</p>
        <button className="btn" onClick={start}>Another round</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
      </div>
    );
  }

  const d = items[i];
  return (
    <div className="q-card">
      <div className="q-top">
        <span className="q-kind">{label(d.tense)}</span>
        <span className="q-count">{i + 1} of {items.length} · {score} so far</span>
      </div>
      <div className="bar" aria-hidden><div style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <p className="q-inst"><b>What to do:</b> {dir === "en2bn" ? "Say or write this in Bengali." : "Say what this means in English."} Then check, and rate yourself.</p>
      <div className="t-prompt">{prompt(d)}</div>
      {!shown ? (
        <button className="btn" onClick={() => setShown(true)}>Show the answer</button>
      ) : (
        <>
          <div className="model"><p className="model-label">Answer</p>{answer(d)}</div>
          <Tip d={d} />
          <div className="step-nav">
            <button className="btn ghost" onClick={() => rate(false)}>Not yet</button>
            <button className="btn" onClick={() => rate(true)}>I got it</button>
          </div>
        </>
      )}
    </div>
  );
}

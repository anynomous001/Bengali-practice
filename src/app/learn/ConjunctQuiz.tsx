"use client";

import { useMemo, useState } from "react";
import { finishConjunctQuiz } from "../actions";
import { speak } from "@/lib/speak";
import { useRoman } from "./Roman";

type Word = { bn: string; ro: string; en: string };
type Conj = { id: string; cat: string; conj: string; parts: string[]; words: Word[] };
type Cat = { id: string; bn: string; en: string };
type Mode = "match" | "which" | "parts" | "type";
type Phase = "setup" | "run" | "done";
type Pair = { c: Conj; w: Word };
type Q = { prompt: Word | Conj; kind: "which" | "parts" | "type"; options: { key: string; label: string; right: boolean }[] };

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "match", label: "Match the pair", hint: "Six words and the letters their conjunct is made of. Match each word, and there is one extra option." },
  { id: "which", label: "Which conjunct is in the word?", hint: "A word appears. Pick the conjunct it contains." },
  { id: "parts", label: "What letters make it?", hint: "A conjunct appears. Pick the two or three letters it is made of." },
  { id: "type", label: "Which group is it?", hint: "A conjunct appears. Pick its group, such as র-ফলা, রেফ or য-ফলা. Needs two or more groups." },
];
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const partsText = (c: { parts: string[] }) => c.parts.join(" + ");

/** Conjunct practice. Pick the groups to practice and how; with `fixed` it practices one group only. */
export default function ConjunctQuiz({ all, categories, fixed, completes }: { all: Conj[]; categories: Cat[]; fixed?: string; completes?: boolean }) {
  const { roman, english } = useRoman();
  const [phase, setPhase] = useState<Phase>("setup");
  const [cats, setCats] = useState<string[]>(fixed ? [fixed] : categories.map((c) => c.id));
  const [mode, setMode] = useState<Mode>("match");
  // match
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [opts, setOpts] = useState<{ key: string; label: string; cid: string | null }[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, string>>({}); // word index -> option key
  const [slipped, setSlipped] = useState<number[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  // questions
  const [qs, setQs] = useState<Q[]>([]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const pool = useMemo(() => all.filter((c) => cats.includes(c.cat)), [all, cats]);
  // one entry per conjunct string, merging words and keeping a single group when it belongs to only one of the chosen groups
  const uniq = useMemo(() => {
    const m = new Map<string, { c: Conj; groups: Set<string>; words: Word[] }>();
    for (const c of pool) {
      const e = m.get(c.conj) ?? { c, groups: new Set<string>(), words: [] };
      e.groups.add(c.cat);
      for (const w of c.words) if (!e.words.some((x) => x.bn === w.bn)) e.words.push(w);
      m.set(c.conj, e);
    }
    return [...m.values()];
  }, [pool]);
  const allUniq = useMemo(() => [...new Map(all.map((c) => [c.conj, c])).values()], [all]);
  const modes = MODES.filter((m) => (m.id !== "type" || (cats.length >= 2 && !fixed)) && (m.id !== "match" || uniq.length >= 6));
  const catName = (id: string) => categories.find((c) => c.id === id)?.bn ?? id;
  const toggleCat = (id: string) => setCats((cs) => (cs.includes(id) ? cs.filter((x) => x !== id) : [...cs, id]));

  function startMatch() {
    const chosen: Pair[] = [];
    for (const e of shuffle(uniq)) {
      if (chosen.length >= 6) break;
      if (chosen.some((p) => p.c.parts.join() === e.c.parts.join())) continue;
      const w = shuffle(e.words).find((w) => !chosen.some((p) => w.bn.includes(p.c.conj) || p.w.bn.includes(e.c.conj)));
      if (w) chosen.push({ c: e.c, w });
    }
    if (chosen.length < 4) return false;
    const extra = shuffle(allUniq).find((c) => !chosen.some((p) => p.c.conj === c.conj || p.c.parts.join() === c.parts.join() || p.w.bn.includes(c.conj)));
    const options = chosen.map((p) => ({ key: p.c.id, label: partsText(p.c), cid: p.c.id as string | null }));
    if (extra) options.push({ key: "extra", label: partsText(extra), cid: null });
    setPairs(chosen); setOpts(shuffle(options)); setSel(null); setMatched({}); setSlipped([]); setTotal(chosen.length);
    return true;
  }
  function startQuestions(m: Exclude<Mode, "match">) {
    const list: Q[] = [];
    const base = shuffle(uniq);
    for (const e of base) {
      if (list.length >= 10) break;
      if (m === "which") {
        const w = shuffle(e.words)[0];
        const distract = shuffle(allUniq).filter((c) => c.conj !== e.c.conj && !w.bn.includes(c.conj)).slice(0, 3);
        list.push({ prompt: w, kind: "which", options: shuffle([{ key: e.c.conj, label: e.c.conj, right: true }, ...distract.map((d) => ({ key: d.conj, label: d.conj, right: false }))]) });
      } else if (m === "parts") {
        const seen = new Set([partsText(e.c)]);
        const distract = shuffle(allUniq).filter((c) => !seen.has(partsText(c)) && seen.add(partsText(c))).slice(0, 3);
        list.push({ prompt: e.c, kind: "parts", options: shuffle([{ key: "r", label: partsText(e.c), right: true }, ...distract.map((d) => ({ key: d.conj, label: partsText(d), right: false }))]) });
      } else {
        if (e.groups.size !== 1) continue;
        const [g] = [...e.groups];
        const others = shuffle(cats.filter((x) => x !== g)).slice(0, 3);
        list.push({ prompt: e.c, kind: "type", options: shuffle([{ key: g, label: catName(g), right: true }, ...others.map((o) => ({ key: o, label: catName(o), right: false }))]) });
      }
    }
    if (list.length < 3) return false;
    setQs(list); setI(0); setPicked(null); setScore(0); setTotal(list.length);
    return true;
  }
  function start(m: Mode = mode) {
    setScore(0); setMode(m);
    const ok = m === "match" ? startMatch() : startQuestions(m);
    if (ok) setPhase("run");
  }
  function finish(s: number, t: number) {
    setScore(s); setPhase("done");
    if (completes) void finishConjunctQuiz(s, t);
  }

  // ---------- setup ----------
  if (phase === "setup") {
    const mm = modes.some((m) => m.id === mode) ? mode : modes[0]?.id;
    return (
      <div className="drill-setup">
        {!fixed && (
          <>
            <h3>1. Choose the groups to practice</h3>
            <p><button type="button" className="btn ghost small" onClick={() => setCats(categories.map((c) => c.id))}>All groups</button> <button type="button" className="btn ghost small" onClick={() => setCats([])}>None</button> <span className="muted">{uniq.length} conjuncts chosen</span></p>
            <div className="choice-group" role="group" aria-label="Groups">
              {categories.map((c) => (
                <label key={c.id} className={"choice" + (cats.includes(c.id) ? " on" : "")}>
                  <input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggleCat(c.id)} />
                  <span><b lang="bn">{c.bn}</b><small>{c.en}</small></span>
                </label>
              ))}
            </div>
          </>
        )}
        <h3>{fixed ? "How to practice" : "2. How to practice"}</h3>
        <div className="choice-group" role="radiogroup" aria-label="Mode">
          {modes.map((m) => (
            <label key={m.id} className={"choice" + (mm === m.id ? " on" : "")}>
              <input type="radio" name="cjmode" checked={mm === m.id} onChange={() => setMode(m.id)} />
              <span><b>{m.label}</b><small>{m.hint}</small></span>
            </label>
          ))}
        </div>
        <button className="btn" disabled={!uniq.length || !modes.length} onClick={() => mm && start(mm)}>Start</button>
        {!uniq.length && <p className="muted">Choose at least one group.</p>}
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="card-static practice-done">
        <h2>{score} of {total}</h2>
        <p>{score >= Math.ceil(total * 0.7) ? "Well done." + (completes ? " This quiz counts as complete." : "") : "Keep going. Seven in ten is a good score."}</p>
        <button className="btn" onClick={() => start()}>Practice again</button>
        <button className="btn ghost" onClick={() => setPhase("setup")}>Change groups or mode</button>
      </div>
    );
  }

  // ---------- match the pair ----------
  if (mode === "match") {
    const done = Object.keys(matched).length === pairs.length;
    const clickOpt = (o: { key: string; cid: string | null }) => {
      if (sel === null || Object.values(matched).includes(o.key)) return;
      if (o.cid && o.cid === pairs[sel].c.id) { setMatched({ ...matched, [sel]: o.key }); setSel(null); speak(pairs[sel].w.bn); }
      else { setShake(o.key); setTimeout(() => setShake(null), 450); setSlipped((s) => (s.includes(sel) ? s : [...s, sel])); }
    };
    return (
      <div className="q-card">
        <div className="q-top"><span className="q-kind">Match the pair</span><span className="q-count">{Object.keys(matched).length} of {pairs.length} matched</span></div>
        <p className="q-inst"><b>What to do:</b> Tap a word, then tap the letters its conjunct is made of. One option is extra and matches no word.</p>
        <div className="cj-match">
          <ol>
            {pairs.map((p, n) => (
              <li key={p.w.bn}><button type="button" disabled={n in matched} className={"cj-mb" + (sel === n ? " on" : "") + (n in matched ? " ok" : "")} onClick={() => setSel(n)}>
                <b lang="bn">{p.w.bn}</b>{roman && <i>{p.w.ro}</i>}{english && <small>{p.w.en}</small>}
              </button></li>
            ))}
          </ol>
          <ul>
            {opts.map((o) => {
              const used = Object.values(matched).includes(o.key);
              return <li key={o.key}><button type="button" disabled={used} className={"cj-mb opt" + (used ? " ok" : "") + (shake === o.key ? " kk-shake" : "")} onClick={() => clickOpt(o)}><b lang="bn">{o.label}</b></button></li>;
            })}
          </ul>
        </div>
        {done && (<><p className="feedback"><b>All matched.</b> {slipped.length === 0 ? "No mistakes." : `${pairs.length - slipped.length} right first time.`}</p>
          <button className="btn" onClick={() => finish(pairs.length - slipped.length, pairs.length)}>{completes ? "See my score" : "Done"}</button></>)}
      </div>
    );
  }

  // ---------- questions ----------
  const q = qs[i];
  const answered = picked !== null;
  const right = q.options.find((o) => o.right)!;
  const next = () => {
    const s = score + (picked === right.key ? 1 : 0);
    if (i + 1 >= qs.length) { finish(s, qs.length); return; }
    setScore(s); setI(i + 1); setPicked(null);
  };
  const promptWord = q.kind === "which" ? (q.prompt as Word) : null;
  const promptConj = q.kind !== "which" ? (q.prompt as Conj) : null;
  return (
    <div className="q-card">
      <div className="q-top"><span className="q-kind">{MODES.find((m) => m.id === q.kind)?.label}</span><span className="q-count">{i + 1} of {qs.length} · {score} so far</span></div>
      <div className="bar" aria-hidden><div style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <p className="q-inst"><b>What to do:</b> {q.kind === "which" ? "Pick the conjunct that is in this word." : q.kind === "parts" ? "Pick the letters this conjunct is made of." : "Pick the group this conjunct belongs to."}</p>
      {promptWord && <div className="t-prompt"><button type="button" className="cj-big" lang="bn" onClick={() => speak(promptWord.bn)} aria-label="Hear the word">{promptWord.bn}</button>{roman && <span className="g-ro-line">{promptWord.ro}</span>}{english && <span className="g-en">{promptWord.en}</span>}</div>}
      {promptConj && <div className="t-prompt"><span className="cj-big" lang="bn">{promptConj.conj}</span></div>}
      <div className="options">
        {q.options.map((o) => {
          const cls = !answered ? "" : o.right ? " right" : o.key === picked ? " wrong" : "";
          return <button key={o.key} type="button" className={"opt text g-opt" + cls} disabled={answered} onClick={() => setPicked(o.key)}><b lang="bn" className="kk-opt-bn">{o.label}</b></button>;
        })}
      </div>
      {answered && (<>
        <p className="feedback">{picked === right.key ? "Correct." : <>Not quite. The answer is <b lang="bn">{right.label}</b>.</>}{promptConj && q.kind !== "type" && <> <span lang="bn">{promptConj.conj}</span> as in <span lang="bn">{promptConj.words[0].bn}</span> ({promptConj.words[0].en}).</>}</p>
        <button type="button" className="btn" onClick={next}>{i + 1 >= qs.length ? "See my score" : "Next"}</button>
      </>)}
    </div>
  );
}

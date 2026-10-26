"use client";

import { useEffect, useState } from "react";
import { speak, speakThen } from "@/lib/speak";
import Icon from "./Icon";
import { useRoman } from "./Roman";

export type MemWord = { bn: string; ro: string; en: string };
export type MemRound = { targets: MemWord[]; options: MemWord[] };

const COUNT_SECONDS = 8;
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * The three-word memory check, as practice for the language of the check: hear three words, count backwards
 * for a few seconds, then pick the three words from a list. Words are common nouns that have recorded clips.
 */
export default function MemoryGame({ rounds }: { rounds: MemRound[] }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  if (i >= rounds.length) {
    return (
      <>
        <h2>You remembered {score} of {rounds.length * 3} words</h2>
        <p className="muted">Try again for new words. The more often you hear a word, the longer you keep it.</p>
        <button className="btn" onClick={() => window.location.reload()}>New words</button>
      </>
    );
  }
  return <Round key={i} round={rounds[i]} n={i + 1} total={rounds.length} score={score} onDone={(got) => { setScore((s) => s + got); setI((x) => x + 1); }} />;
}

function Round({ round, n, total, score, onDone }: { round: MemRound; n: number; total: number; score: number; onDone: (got: number) => void }) {
  const [step, setStep] = useState<"listen" | "count" | "choose" | "result">("listen");
  const [playing, setPlaying] = useState(false);
  const [heard, setHeard] = useState(false);
  const [secs, setSecs] = useState(COUNT_SECONDS);
  const [sel, setSel] = useState<string[]>([]);
  const { roman } = useRoman();
  const targetSet = new Set(round.targets.map((t) => t.bn));

  async function play() {
    setPlaying(true);
    for (const t of round.targets) { await speakThen(t.bn); await pause(700); }
    setPlaying(false);
    setHeard(true);
  }

  useEffect(() => {
    if (step !== "count") return;
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, secs]);

  const toggle = (bn: string) => setSel((s) => (s.includes(bn) ? s.filter((x) => x !== bn) : s.length < 3 ? [...s, bn] : s));
  const got = sel.filter((b) => targetSet.has(b)).length;

  return (
    <>
      <p className="muted">Round {n} of {total} · Words remembered {score}</p>

      {step === "listen" && (
        <>
          <p>Listen to three words. Try to remember them. You will be asked for them in a moment.</p>
          <button className="btn big-btn" disabled={playing} onClick={play}><Icon name="sound" size={18} /> {heard ? "Play again" : "Play the three words"}</button>
          <p><button className="btn" disabled={!heard || playing} onClick={() => { setSecs(COUNT_SECONDS); setStep("count"); }}>I am ready</button></p>
        </>
      )}

      {step === "count" && (
        <>
          <p>Now count backwards from ten, out loud: <span lang="bn" className="g-ex-bn">দশ, নয়, আট, সাত…</span></p>
          <div className="big" aria-live="polite">{secs > 0 ? secs : "✓"}</div>
          <button className="btn" onClick={() => setStep("choose")}>{secs > 0 ? "Skip" : "Continue"}</button>
        </>
      )}

      {step === "choose" && (
        <>
          <p>Which three words did you hear? Pick three.</p>
          <div className="options">
            {round.options.map((w) => (
              <button key={w.bn} className={"opt" + (sel.includes(w.bn) ? " picked" : "")} aria-pressed={sel.includes(w.bn)} onClick={() => toggle(w.bn)}>
                <span lang="bn">{w.bn}</span>{roman && <small className="opt-ro">{w.ro}</small>}
              </button>
            ))}
          </div>
          <p className="muted">{sel.length} of 3 picked</p>
          <button className="btn" disabled={sel.length !== 3} onClick={() => setStep("result")}>Check my answer</button>
        </>
      )}

      {step === "result" && (
        <>
          <p className="feedback">{got === 3 ? "All three! Well done." : `You remembered ${got} of 3.`}</p>
          <ul className="wlist one">
            {round.targets.map((t) => (
              <li key={t.bn}>
                <div className="wrow">
                  <button type="button" className="wplay" onClick={() => speak(t.bn)} aria-label={`Hear ${t.en}`}><Icon name="sound" size={18} /></button>
                  <span className="wtext"><span className="wbn" lang="bn">{t.bn}</span>{roman && <span className="wro">{t.ro}</span>}</span>
                  <span className="wen gloss">{t.en}{sel.includes(t.bn) ? " ✓" : ""}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn" onClick={() => onDone(got)}>{n === total ? "See my score" : "Next round"}</button>
        </>
      )}
    </>
  );
}

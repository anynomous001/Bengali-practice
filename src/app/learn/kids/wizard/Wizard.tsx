"use client";

import { useCallback, useRef, useState } from "react";
import { recordKidsSession } from "../../../actions";
import { speak } from "@/lib/speak";
import { useRoman } from "../../Roman";

const STAR_GOAL = 10;

/** Stars for one game. Reaching ten shows the celebration and saves a session once. */
export function useStars(game: string) {
  const [stars, setStars] = useState(0);
  const [done, setDone] = useState(false);
  const saved = useRef(false);
  const addStar = useCallback(() => {
    setStars((s) => {
      const n = Math.min(STAR_GOAL, s + 1);
      if (n >= STAR_GOAL && !saved.current) { saved.current = true; setDone(true); void recordKidsSession(game, n); }
      return n;
    });
  }, [game]);
  const reset = useCallback(() => { setStars(0); setDone(false); saved.current = false; }, []);
  return { stars, addStar, reset, done };
}

/** Each game's own English and romanization switches start from the sidebar's settings. */
export function useShowText() {
  const g = useRoman();
  const [showEn, setShowEn] = useState(g.english);
  const [showRo, setShowRo] = useState(g.roman);
  return { showEn, setShowEn, showRo, setShowRo };
}

export function StarMeter({ stars, onReset }: { stars: number; onReset: () => void }) {
  return (
    <div className="wz-stars">
      <div className="wz-star-row" role="img" aria-label={`${stars} of ${STAR_GOAL} stars`}>
        {Array.from({ length: STAR_GOAL }, (_, i) => <span key={i} className={i < stars ? "on" : ""} aria-hidden>★</span>)}
      </div>
      <button type="button" className="wz-link" onClick={onReset}>Reset stars</button>
    </div>
  );
}

export function Celebration({ line, onAgain }: { line: string; onAgain: () => void }) {
  return (
    <div className="wz-celebrate" role="dialog" aria-label="Well done">
      <div className="wz-confetti" aria-hidden>{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.18}s`, background: ["#ffd54a", "#7cf29a", "#ff8ac8", "#8ad4ff"][i % 4] }} />)}</div>
      <div className="wz-celebrate-box">
        <p className="wz-celebrate-bn" lang="bn">খুব ভালো!</p>
        <p className="wz-celebrate-ro">khub bhalo!</p>
        <p className="wz-celebrate-en">{line}</p>
        <GameButton kind="primary" onClick={onAgain}>Play again</GameButton>
      </div>
    </div>
  );
}

export function GameButton({ kind = "primary", children, ...rest }: { kind?: "primary" | "success" | "danger" | "ghost" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...rest} className={`wz-btn ${kind}${rest.className ? " " + rest.className : ""}`}>{children}</button>;
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="wz-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function SpeakBtn({ text, label = "Hear it" }: { text: string; label?: string }) {
  return <button type="button" className="wz-speak" aria-label={`${label}: ${text}`} onClick={() => speak(text)}>🔊</button>;
}

/** Bengali first (largest), then romanization, then English, as the teacher asked. */
export function WordCard({ bn, ro, en, hint, verdict, verdictKind, showEn, showRo, hidden, speakText, small }: {
  bn: string; ro: string; en: string; hint?: string; verdict?: string; verdictKind?: "yes" | "no";
  showEn: boolean; showRo: boolean; hidden?: boolean; speakText?: string; small?: boolean;
}) {
  return (
    <div className={"wz-word" + (small ? " small" : "")}>
      {hidden ? <p className="wz-word-bn" aria-live="polite">👂</p> : (
        <>
          <p className="wz-word-bn" lang="bn">{bn}{speakText !== undefined && <SpeakBtn text={speakText || bn} />}</p>
          {showRo && <p className="wz-word-ro">{ro}</p>}
          {showEn && <p className="wz-word-en">{en}</p>}
        </>
      )}
      {!hidden && hint && <p className="wz-word-hint">{hint}</p>}
      {verdict && <p className={`wz-verdict ${verdictKind ?? ""}`}>{verdict}</p>}
    </div>
  );
}

/** A random index that is never the same as the last one. */
export function pickNew(length: number, last: number | null): number {
  if (length < 2) return 0;
  let n = Math.floor(Math.random() * length);
  if (n === last) n = (n + 1 + Math.floor(Math.random() * (length - 1))) % length;
  return n;
}

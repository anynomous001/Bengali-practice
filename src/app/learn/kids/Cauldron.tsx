"use client";

import { useId } from "react";
import "./kids-lessons.css";

/** A cauldron that fills up, one layer of color at a time. Used by the picture quizzes: a right answer adds a layer. */
export default function Cauldron({ colors, goal, label }: { colors: string[]; goal: number; label?: string }) {
  const id = useId().replace(/:/g, "");
  const top = 92, bottom = 206, h = (bottom - top) / Math.max(1, goal);
  return (
    <svg viewBox="0 0 240 240" className="kc-cauldron" role="img" aria-label={label ?? `Cauldron with ${colors.length} of ${goal} layers`}>
      <defs><clipPath id={`kc-pot-${id}`}><path d="M44 96 Q40 190 80 214 L160 214 Q200 190 196 96 Z" /></clipPath></defs>
      <ellipse cx="120" cy="226" rx="78" ry="9" fill="rgba(0,0,0,.25)" />
      <g clipPath={`url(#kc-pot-${id})`}>
        <rect x="30" y="90" width="180" height="130" fill="#2a1f3d" />
        {colors.map((c, i) => <rect key={i} className="kc-layer" x="30" y={bottom - h * (i + 1)} width="180" height={h + 0.5} fill={c} />)}
      </g>
      <path d="M44 96 Q40 190 80 214 L160 214 Q200 190 196 96" fill="none" stroke="#4b3a73" strokeWidth="9" />
      <ellipse cx="120" cy="96" rx="78" ry="14" fill="none" stroke="#6a579b" strokeWidth="8" />
      <path d="M52 130 q-26 6 -22 28" stroke="#4b3a73" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M188 130 q26 6 22 28" stroke="#4b3a73" strokeWidth="7" fill="none" strokeLinecap="round" />
      {colors.length > 0 && [0, 1, 2].map((i) => <circle key={i} className="kc-bubble" cx={92 + i * 34} cy="92" r={5 + i} fill="rgba(255,255,255,.7)" style={{ animationDelay: `${i * 0.5}s` }} />)}
    </svg>
  );
}

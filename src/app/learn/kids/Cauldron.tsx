"use client";

import { useId } from "react";
import "./kids-lessons.css";

/** A clear glass jar that fills up with liquid, one layer of color at a time. Used by the picture quizzes: a right answer adds a layer. */
export default function Cauldron({ colors, goal, label }: { colors: string[]; goal: number; label?: string }) {
  const id = useId().replace(/:/g, "");
  const bottom = 232, top = 62, h = (bottom - top) / Math.max(1, goal);
  const level = bottom - h * colors.length;
  const full = colors.length >= goal && goal > 0;
  const jar = "M72 24 H128 V50 Q164 62 164 104 V202 Q164 236 130 236 H70 Q36 236 36 202 V104 Q36 62 72 50 Z";
  const topColor = colors[colors.length - 1];
  return (
    <svg viewBox="0 0 200 262" className="kc-jar" role="img" aria-label={label ?? `Jar with ${colors.length} of ${goal} layers`}>
      <defs>
        <clipPath id={`kc-clip-${id}`}><path d={jar} /></clipPath>
        <linearGradient id={`kc-glass-${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity=".9" /><stop offset="1" stopColor="#e6defc" stopOpacity=".55" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="248" rx="68" ry="8" fill="rgba(60,40,120,.18)" />
      <path d={jar} fill={`url(#kc-glass-${id})`} />
      <g clipPath={`url(#kc-clip-${id})`}>
        {colors.map((c, i) => <rect key={i} className="kc-layer" x="30" y={bottom - h * (i + 1)} width="140" height={h + 0.6} fill={c} />)}
        {topColor && (
          <g className="kc-wave-wrap" style={{ transform: `translateY(${level}px)` }}>
            <path className="kc-wave" d="M-100 0 Q-75 -7 -50 0 T0 0 T50 0 T100 0 T150 0 T200 0 T250 0 V10 H-100 Z" fill={topColor} opacity=".85" />
          </g>
        )}
        {colors.length > 0 && [0, 1, 2, 3].map((i) => <circle key={i} className="kc-bubble" cx={62 + i * 24} cy={bottom - 6} r={3 + (i % 2)} fill="rgba(255,255,255,.7)" style={{ animationDelay: `${i * 0.6}s` }} />)}
      </g>
      {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="156" x2="164" y1={bottom - (bottom - top) * f} y2={bottom - (bottom - top) * f} stroke="#8a78c8" strokeWidth="3" strokeLinecap="round" opacity=".55" />)}
      <path d="M50 96 Q48 66 70 56" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".85" />
      <path d="M48 120 V196" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".6" />
      <path d={jar} fill="none" stroke="#7a67c2" strokeWidth="5" strokeLinejoin="round" />
      <rect x="62" y="14" width="76" height="14" rx="7" fill="#c9bdf0" stroke="#7a67c2" strokeWidth="4" />
      {full && [[44, 40], [160, 30], [150, 84]].map(([x, y], i) => <text key={i} className="kc-spark" x={x} y={y} fontSize="22" textAnchor="middle" fill="#ffc107" style={{ animationDelay: `${i * 0.25}s` }}>★</text>)}
    </svg>
  );
}

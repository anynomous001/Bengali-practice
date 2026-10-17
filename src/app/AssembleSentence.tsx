"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SHAPED } from "@/lib/glyphs";
import { motionAllowed, prefersReducedMotion } from "./landing-motion";

const PAD = 26;
type State = "hold" | "run" | "done";

/**
 * A Bengali sentence that assembles itself when it scrolls into view. Glyphs are grouped by HarfBuzz cluster, so a
 * letter and its vowel sign always move as one piece. Then a chalk line sweeps along the headline bar, and the
 * romanization and meaning fade in underneath.
 */
export default function AssembleSentence({ text, roman, english }: { text: string; roman: string; english: string }) {
  const s = SHAPED[text];
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("hold");

  useEffect(() => {
    if (!motionAllowed()) { setState("done"); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setState("run"); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => { if (prefersReducedMotion()) setState("done"); }, []);

  if (!s) return <p lang="bn">{text}</p>;
  const top = s.yTop + PAD, bottom = s.yBottom - PAD, w = s.width + 2 * PAD, h = top - bottom;
  // one group per cluster, in reading order; the space between words has no outline and is skipped
  const clusters = [...new Set(s.glyphs.map((g) => g.cl))].map((cl) => s.glyphs.filter((g) => g.cl === cl && g.d)).filter((g) => g.length);
  const n = clusters.length;
  const style = { width: `${w / s.upem}em`, height: `${h / s.upem}em` } as CSSProperties;
  return (
    <div ref={ref} className={`assemble ${state}`} style={{ "--n": n } as CSSProperties}>
      <svg role="img" aria-label={text} lang="bn" className="assemble-svg" viewBox={`${-PAD} ${-top} ${w} ${h}`} style={style} focusable="false">
        {clusters.map((gs, i) => (
          <g key={i} className="grp" aria-hidden style={{ "--i": i, "--dx": `${((i * 37) % 7 - 3) * 110}px`, "--dy": `${((i * 53) % 7 - 3) * 110}px`, "--rot": `${((i * 29) % 9 - 4) * 2}deg` } as CSSProperties}>
            <g transform="scale(1,-1)">{gs.map((g, j) => <path key={j} d={g.d} transform={`translate(${g.x} ${g.y})`} />)}</g>
          </g>
        ))}
        <rect className="sweep" aria-hidden x={0} y={-s.barY - s.barThickness / 2} width={s.width} height={s.barThickness} />
      </svg>
      <p className="assemble-ro">{roman}</p>
      <p className="assemble-en">{english}</p>
    </div>
  );
}

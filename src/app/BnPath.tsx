import type { CSSProperties } from "react";
import { SHAPED } from "@/lib/glyphs";

export type Phase = "done" | "hold" | "draw";
const PAD = 26; // font units of room around the glyphs so strokes are not clipped

/**
 * Bengali drawn from outlines shaped by HarfBuzz, as inline SVG that scales like text (sized in em).
 * phase "hold" hides it, "draw" traces the outline and then fades the fill in, "done" is the finished letter.
 */
export default function BnPath({ text, phase = "done", seconds = 0.9, className = "" }: { text: string; phase?: Phase; seconds?: number; className?: string }) {
  const s = SHAPED[text];
  if (!s) return <span lang="bn">{text}</span>;
  const top = s.yTop + PAD, bottom = s.yBottom - PAD, w = s.width + 2 * PAD, h = top - bottom;
  const paths = s.glyphs.filter((g) => g.d).map((g, i) => ({ d: g.d, t: `translate(${g.x} ${g.y})`, i }));
  const style = { width: `${w / s.upem}em`, height: `${h / s.upem}em`, verticalAlign: `${bottom / s.upem}em`, "--draw": `${seconds}s` } as CSSProperties;
  return (
    <svg role="img" aria-label={text} lang="bn" className={`bn-path ${phase} ${className}`} viewBox={`${-PAD} ${-top} ${w} ${h}`} style={style} focusable="false">
      {phase !== "done" && (
        <g className="bn-strokes" transform="scale(1,-1)" aria-hidden>
          {paths.map((p) => <path key={p.i} d={p.d} transform={p.t} pathLength={1} />)}
        </g>
      )}
      <g className="bn-fills" transform="scale(1,-1)" aria-hidden>
        {paths.map((p) => <path key={p.i} d={p.d} transform={p.t} />)}
      </g>
    </svg>
  );
}

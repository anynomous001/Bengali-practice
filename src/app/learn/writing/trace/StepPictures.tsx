import type { StepPic } from "@/data/vowel-steps";

type Pt = [number, number];
const r1 = (n: number) => Math.round(n * 10) / 10;

/** A smooth line through the points (Catmull-Rom turned into cubic curves). */
function smooth(pts: Pt[]): string {
  if (pts.length === 1) return `M${pts[0][0]} ${pts[0][1]}h0.01`;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/**
 * "How to write it": one small picture per step, each showing everything written so far. What is new in a step is coloured;
 * what came before is dark. Drawn from the data in src/data/vowel-steps.ts.
 */
export default function StepPictures({ steps, label }: { steps: StepPic[]; label: string }) {
  const xs: number[] = [], ys: number[] = [];
  for (const s of steps) {
    for (const st of s.strokes) for (const [x, y] of st) { xs.push(x); ys.push(y); }
    for (const [x, y, r] of s.dots) { xs.push(x - r, x + r); ys.push(y - r, y + r); }
  }
  const pad = 22, x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad;
  const w = Math.max(...xs) - Math.min(...xs) + 2 * pad, h = Math.max(...ys) - Math.min(...ys) + 2 * pad;
  const side = Math.max(w, h); // a square card, the letter centred
  const vx = x0 - (side - w) / 2, vy = y0 - (side - h) / 2;
  return (
    <ol className="steps-pics" aria-label={`How to write ${label}, step by step`}>
      {steps.map((_, k) => (
        <li key={k}>
          <svg viewBox={`${r1(vx)} ${r1(vy)} ${r1(side)} ${r1(side)}`} role="img" aria-label={`Step ${k + 1} of ${steps.length}`} focusable="false">
            {steps.slice(0, k + 1).map((s, j) => (
              <g key={j} className={j === k ? "sp-new" : "sp-old"}>
                {s.strokes.map((st, i) => <path key={i} d={smooth(st)} />)}
                {s.dots.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
              </g>
            ))}
          </svg>
          <span>Step {k + 1}</span>
        </li>
      ))}
    </ol>
  );
}

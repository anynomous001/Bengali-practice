import type { PicSpec } from "@/lib/kids-pics";
import { BODY_AREAS, BODY_SIZE } from "@/lib/kids-pics";

/** One picture for a kids' card or question: a colour swatch, a photo, or a part of the child figure with a glowing ring. */
export default function KidPic({ pic, label = "" }: { pic: PicSpec; label?: string }) {
  if (pic.kind === "swatch") {
    return <svg viewBox="0 0 240 180" className="kp" role="img" aria-label={label}><rect x="8" y="8" width="224" height="164" rx="34" fill={pic.hex} stroke="rgba(0,0,0,.18)" strokeWidth="4" /><rect x="22" y="20" width="196" height="40" rx="20" fill="#fff" opacity=".18" /></svg>;
  }
  if (pic.kind === "count") {
    // n objects in two rows of five: the real photo when there is one, plain dots until then
    const dots = ["#e53935", "#1e88e5", "#43a047", "#fb8c00", "#8e24aa"];
    return (
      <svg viewBox="0 0 400 260" className="kp" role="img" aria-label={label}>
        {Array.from({ length: pic.n }, (_, i) => {
          const per = pic.n > 5 ? 5 : pic.n, row = Math.floor(i / 5), col = i % 5;
          const inRow = row === 0 ? per : pic.n - 5;
          const x = 200 + (col - (inRow - 1) / 2) * 76, y = pic.n > 5 ? 70 + row * 120 : 130;
          return pic.src
            ? <image key={i} href={pic.src} x={x - 36} y={y - 36} width="72" height="72" preserveAspectRatio="xMidYMid slice" clipPath="inset(0 round 14px)" />
            : <circle key={i} cx={x} cy={y} r="30" fill={dots[i % dots.length]} stroke="rgba(0,0,0,.18)" strokeWidth="3" />;
        })}
      </svg>
    );
  }
  if (pic.kind === "cells") {
    // a week or a year laid out in cells, with the one being asked about highlighted
    const rows = Math.ceil(pic.labels.length / pic.cols), gap = 8, cw = (400 - gap * (pic.cols + 1)) / pic.cols, ch = Math.min(cw * (pic.cols > 5 ? 1.9 : 0.8), (190 - gap * (rows + 1)) / rows);
    const vh = gap + rows * (ch + gap);
    return (
      <svg viewBox={`0 0 400 ${vh}`} className="kp" role="img" aria-label={label}>
        {pic.labels.map((t, k) => {
          const x = gap + (k % pic.cols) * (cw + gap), y = gap + Math.floor(k / pic.cols) * (ch + gap), on = k === pic.i;
          return (
            <g key={k}>
              <rect x={x} y={y} width={cw} height={ch} rx="12" fill={on ? "#ffc107" : "#ffffff"} stroke={on ? "#c79100" : "#cfc8ee"} strokeWidth={on ? 4 : 2} />
              <text x={x + cw / 2} y={y + ch / 2 + 6} textAnchor="middle" fontSize={pic.cols > 5 ? 20 : 19} fontWeight={on ? 800 : 600} fill={on ? "#3b2a00" : "#6a6490"} fontFamily="var(--font-ui), sans-serif">{t}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (pic.kind === "photo") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={pic.src} alt={label} className="kp kp-photo" />;
  }
  const area = BODY_AREAS[pic.key];
  if (!area) return null;
  const [x, y, w, h] = area.zoom;
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} className="kp" role="img" aria-label={label}>
      <image href="/kids/body-boy.webp" x="0" y="0" width={BODY_SIZE.w} height={BODY_SIZE.h} />
      {area.shapes.map((s, i) => s.t === "e"
        ? <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} className="kp-ring" />
        : <path key={i} d={s.d} className="kp-ring" />)}
    </svg>
  );
}

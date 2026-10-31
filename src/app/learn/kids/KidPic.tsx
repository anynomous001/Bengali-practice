import type { PicSpec } from "@/lib/kids-pics";
import { BODY_AREAS, BODY_SIZE } from "@/lib/kids-pics";

/** One picture for a kids' card or question: a colour swatch, a photo, or a part of the child figure with a glowing ring. */
export default function KidPic({ pic, label = "" }: { pic: PicSpec; label?: string }) {
  if (pic.kind === "swatch") {
    return <svg viewBox="0 0 240 180" className="kp" role="img" aria-label={label}><rect x="8" y="8" width="224" height="164" rx="34" fill={pic.hex} stroke="rgba(0,0,0,.18)" strokeWidth="4" /><rect x="22" y="20" width="196" height="40" rx="20" fill="#fff" opacity=".18" /></svg>;
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

"use client";

import { useEffect, useState } from "react";
import { Drop, Fire, Footprints, Hand, Knife, CookingPot, Package, Power, Prohibit, Warning, Wine } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Icon from "../Icon";
import { speakBn } from "./speech";

type Item = { bn: string; ro: string; en: string };
type Pic = { icon: string; badge?: string; alt: string };

const ICONS: Record<string, PhosphorIcon> = { Drop, Fire, Footprints, Hand, Knife, CookingPot, Package, Power, Prohibit, Warning, Wine };

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** Tap a picture, then tap its sentence. */
export default function PictureMatch({ items, pictures }: { items: Item[]; pictures: Pic[] }) {
  const [round, setRound] = useState(0);
  // The first render keeps the original order (so the server and the browser agree); the shuffle happens right after.
  const [order, setOrder] = useState(() => ({ pics: items.map((_, i) => i), phrases: items.map((_, i) => i) }));
  useEffect(() => { setOrder({ pics: shuffle(items.map((_, i) => i)), phrases: shuffle(items.map((_, i) => i)) }); }, [items, round]);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function tapPhrase(p: number) {
    if (done.has(p)) return;
    if (picked === null) return setMsg({ ok: false, text: "Tap a picture first." });
    if (picked === p) {
      setDone((d) => new Set(d).add(p)); setMsg({ ok: true, text: "Correct" }); speakBn(items[p].bn); setPicked(null);
    } else {
      setMsg({ ok: false, text: "Try again" }); setPicked(null);
    }
  }
  const restart = () => { setRound((r) => r + 1); setDone(new Set()); setPicked(null); setMsg(null); };
  const finished = done.size === items.length;

  return (
    <div className="kt-match">
      <p className="kt-score" role="status" aria-live="polite">
        {finished ? "All matched. Well done." : msg ? <b className={msg.ok ? "good" : "bad"}>{msg.text}</b> : "Tap a picture, then tap the sentence that goes with it."}
        <span className="kt-count">{done.size} of {items.length}</span>
      </p>
      <div className="kt-match-grid">
        <ul className="kt-pics" aria-label="Pictures">
          {order.pics.map((i) => {
            const pic = pictures[i]; const Main = ICONS[pic.icon]; const Badge = pic.badge ? ICONS[pic.badge] : null;
            return (
              <li key={i}>
                <button type="button" className={"kt-pic" + (picked === i ? " picked" : "") + (done.has(i) ? " done" : "")} disabled={done.has(i)} aria-pressed={picked === i} aria-label={`Picture: ${pic.alt}`} onClick={() => { setPicked(i); setMsg(null); }}>
                  <Main size={44} weight="duotone" aria-hidden />
                  {Badge && <span className={"kt-badge" + (pic.badge === "Prohibit" ? " no" : "")}><Badge size={18} weight="fill" aria-hidden /></span>}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="kt-phrases" aria-label="Sentences">
          {order.phrases.map((i) => (
            <li key={i}>
              <button type="button" className={"kt-phrase" + (done.has(i) ? " done" : "")} disabled={done.has(i)} onClick={() => tapPhrase(i)}>
                <span className="kt-bn" lang="bn">{items[i].bn}</span>
                <span className="kt-ro">{items[i].ro}</span>
                {done.has(i) && <span className="kt-en">{items[i].en}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="btn ghost small" onClick={restart}><Icon name="next" size={14} /> Start again</button>
    </div>
  );
}

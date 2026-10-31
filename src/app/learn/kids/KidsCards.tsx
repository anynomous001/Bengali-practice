"use client";

import { useRef, useState } from "react";
import type { PicSpec } from "@/lib/kids-pics";
import { speak } from "@/lib/speak";
import { useRoman } from "../Roman";
import KidPic from "./KidPic";
import "./kids-lessons.css";

type Item = { id: string; bn: string; ro: string; en: string; pic: PicSpec; badge?: string };

/** Picture cards. Tap to hear the word, tap again to hear it slowly. */
export default function KidsCards({ items }: { items: Item[] }) {
  const { roman, english } = useRoman();
  const [bounce, setBounce] = useState<string | null>(null);
  const [slowCue, setSlowCue] = useState<string | null>(null);
  const slowNext = useRef<Record<string, boolean>>({});

  function tap(it: Item) {
    const slow = !!slowNext.current[it.id];
    speak(it.bn, slow);
    slowNext.current[it.id] = !slow;
    setSlowCue(slow ? it.id : null);
    setBounce(it.id + Math.random());
  }

  return (
    <div className="kk-cards">
      {items.map((it) => (
        <button key={it.id} type="button" className="kk-card" onClick={() => tap(it)} aria-label={`${it.en}. ${it.ro}. Tap to hear it.`}>
          <span className={"kk-pic" + (bounce?.startsWith(it.id) ? " bounce" : "")} key={bounce?.startsWith(it.id) ? bounce : it.id}><KidPic pic={it.pic} label={it.en} /></span>
          {it.badge && <span className="kk-badge" lang="bn">{it.badge}</span>}
          <span className="kk-bn" lang="bn">{it.bn}</span>
          {roman && <span className="kk-ro">{it.ro}</span>}
          {english && <span className="kk-en">{it.en}</span>}
          {slowCue === it.id && <span className="kk-slow" aria-hidden>slowly</span>}
        </button>
      ))}
    </div>
  );
}

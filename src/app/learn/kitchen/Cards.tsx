"use client";

import { useState } from "react";
import Icon from "../Icon";
import { speakBn } from "./speech";

type Item = { bn: string; ro: string; en: string };

/** Vocabulary cards. Tap one to hear it and see the English. Short words are shown as a grid, longer phrases as a list. */
export default function Cards({ items, layout }: { items: Item[]; layout?: "grid" | "list" }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const mode = layout ?? (items.every((i) => i.bn.length <= 13) ? "grid" : "list");
  const tap = (i: number) => {
    speakBn(items[i].bn);
    setOpen((o) => { const n = new Set(o); n.add(i); return n; });
  };
  return (
    <ul className={"kt-cards " + mode}>
      {items.map((it, i) => (
        <li key={i}>
          <button type="button" className={"kt-card" + (open.has(i) ? " open" : "")} onClick={() => tap(i)} aria-label={`${it.bn}. ${it.ro}. Tap to hear it.`}>
            <span className="kt-bn" lang="bn">{it.bn}</span>
            <span className="kt-ro">{it.ro}</span>
            <span className="kt-en" aria-live="polite">{open.has(i) ? it.en : "Tap for English"}</span>
            <span className="kt-ear" aria-hidden><Icon name="sound" size={18} /></span>
          </button>
        </li>
      ))}
    </ul>
  );
}

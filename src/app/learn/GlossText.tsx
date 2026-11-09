"use client";

import { createContext, useContext } from "react";

type Gloss = Record<string, string>;
const Ctx = createContext<Gloss | null>(null);

/** Gives the text below it word-by-word meanings. The server sends only the words the page shows (see lib/glossary.ts). */
export function GlossProvider({ gloss, children }: { gloss: Gloss; children: React.ReactNode }) {
  return <Ctx.Provider value={gloss}>{children}</Ctx.Provider>;
}

const WORD = /[ঀ-৿‌‍]+/g;

/** Bengali text where each known word shows its English meaning in a small pop-up on hover, focus or tap. */
export default function GlossText({ text }: { text: string }) {
  const gloss = useContext(Ctx);
  if (!gloss) return <>{text}</>;
  const out: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(WORD)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const tip = gloss[m[0]];
    out.push(tip
      ? <span key={k++} className="gw" tabIndex={0}>{m[0]}<span className="gw-tip" role="tooltip">{tip}</span></span>
      : m[0]);
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

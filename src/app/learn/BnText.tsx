"use client";

import { Fragment } from "react";
import { bnToRoman } from "@/lib/translit";
import { useRoman } from "./Roman";

const RUN = /[ঀ-৿‌‍]+(?:[  ]+[ঀ-৿‌‍]+)*/g;
/** Bengali that is already followed by its own romanization, as in "পুরুষ (purush)". */
const HAS_ROMAN = /^\s*[([]\s*[A-Za-z][A-Za-z~'’ ,/.\-]*[)\]]/;

/**
 * Text that may contain Bengali words. When romanization is on, each Bengali word or phrase gets its roman
 * spelling next to it, unless the text already spells it out. Use it for any question, option or note that mixes in Bengali.
 */
export default function BnText({ text }: { text: string }) {
  const { roman } = useRoman();
  // One wrapper, so a flex or grid parent (like an answer button) treats the whole text as one item, not one item per word.
  if (!/[ঀ-৿]/.test(text)) return <span className="bn-text">{text}</span>;
  // A mostly-Bengali sentence reads best with one roman line under it, not a roman word after every word.
  const bnLetters = (text.match(/[ঀ-৿]/g) ?? []).length;
  const letters = (text.match(/[A-Za-zঀ-৿]/g) ?? []).length;
  if (bnLetters / Math.max(letters, 1) >= 0.6) {
    return (
      <span className="bn-text">
        <span lang="bn">{text}</span>
        {roman && <span className="g-ro-line bn-ro-line">{bnToRoman(text)}</span>}
      </span>
    );
  }
  const parts: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(RUN)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(<Fragment key={k++}>{text.slice(last, at)}</Fragment>);
    const end = at + m[0].length;
    parts.push(<span key={k++} lang="bn">{m[0]}</span>);
    if (roman && !HAS_ROMAN.test(text.slice(end))) parts.push(<span key={k++} className="bn-ro"> {bnToRoman(m[0])}</span>);
    last = end;
  }
  if (last < text.length) parts.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <span className="bn-text">{parts}</span>;
}

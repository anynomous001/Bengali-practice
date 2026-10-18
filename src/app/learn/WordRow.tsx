"use client";

import { useState } from "react";
import { speak } from "@/lib/speak";
import Icon from "./Icon";
import { useRoman } from "./Roman";

/** A line or verse rather than a word: it gets its own full-width, stacked layout. */
export const isLong = (bn: string) => bn.length > 22;

/** One vocabulary word: Bengali, romanized (if on), English, and a listen button. Optionally hides the English until tapped. */
export default function WordRow({ bn, roman, en, hideMeaning = false, sound = true }: { bn: string; roman: string; en: string; hideMeaning?: boolean; sound?: boolean }) {
  const { roman: showRoman } = useRoman();
  const [shown, setShown] = useState(false);
  const covered = hideMeaning && !shown;
  return (
    <div className={"wrow" + (isLong(bn) ? " long" : "")}>
      {sound && <button type="button" className="wplay" onClick={() => speak(bn)} aria-label={`Hear ${en}`}><Icon name="sound" size={18} /></button>}
      <span className="wtext">
        <span className="wbn" lang="bn">{bn}</span>
        {showRoman && <span className="wro">{roman}</span>}
      </span>
      <button type="button" className={"wen gloss" + (covered ? " covered" : "")} onClick={() => setShown((v) => !v)} disabled={!hideMeaning} aria-label={covered ? "Show meaning" : undefined}>
        {covered ? "tap to reveal" : en}
      </button>
    </div>
  );
}

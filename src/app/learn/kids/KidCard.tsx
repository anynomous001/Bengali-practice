"use client";

import { useRef, useState } from "react";
import type { KidWord } from "@/data/kids";
import { speak } from "@/lib/speak";
import { useEnglish } from "../Roman";

/** A picture card. Tap to hear the word, tap again to hear it slowly, and so on. */
export default function KidCard({ word, tone }: { word: KidWord; tone: string }) {
  const { english } = useEnglish();
  const [bounce, setBounce] = useState(0);
  const slowNext = useRef(false);
  const [slowCue, setSlowCue] = useState(false);

  function tap() {
    speak(word.bn, slowNext.current);
    setSlowCue(slowNext.current);
    slowNext.current = !slowNext.current;
    setBounce((b) => b + 1);
  }

  return (
    <button type="button" className={`k-card tone-${tone}`} onClick={tap} aria-label={`${word.en}. ${word.ro}. Tap to hear it.`}>
      <span key={bounce} className={"k-pic" + (bounce ? " bounce" : "")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/kids/pic/${word.pic}.svg`} alt="" width={120} height={120} />
      </span>
      {english && <span className="k-en">{word.en}</span>}
      <span className="k-ro">{word.ro}</span>
      <span className="k-bn" lang="bn">{word.bn}</span>
      {slowCue && <span className="k-slow" aria-hidden>slowly</span>}
    </button>
  );
}

"use client";

import { useState } from "react";
import Icon from "../Icon";
import { speakBn } from "./speech";

type Step = { bn: string; ro: string; en: string };

/** A recipe card, one step at a time, with audio for each step. */
export default function RecipeReader({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const [en, setEn] = useState(false);
  const s = steps[i];
  const go = (k: number) => { setI(k); setEn(false); speakBn(steps[k].bn); };
  return (
    <div className="kt-recipe">
      <p className="kt-step-no">Step {i + 1} of {steps.length}</p>
      <div className="kt-recipe-card">
        <button type="button" className="kt-line-text" onClick={() => setEn((v) => !v)} aria-expanded={en}>
          <span className="kt-bn big" lang="bn">{s.bn}</span>
          <span className="kt-ro">{s.ro}</span>
          <span className="kt-en">{en ? s.en : "Tap for English"}</span>
        </button>
        <button type="button" className="btn small" onClick={() => speakBn(s.bn)}><Icon name="sound" size={16} /> Listen</button>
      </div>
      <div className="kt-recipe-nav">
        <button type="button" className="btn ghost small" disabled={i === 0} onClick={() => go(i - 1)}><Icon name="prev" size={14} /> Back</button>
        <button type="button" className="btn small" disabled={i === steps.length - 1} onClick={() => go(i + 1)}>Next <Icon name="next" size={14} /></button>
      </div>
    </div>
  );
}

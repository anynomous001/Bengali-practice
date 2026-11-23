"use client";

import { useState } from "react";
import Icon from "../Icon";
import { speakBn } from "./speech";

type Item = { bn: string; ro: string; en: string };

/** Choose a number, a measure and an ingredient. It shows the Bengali phrase, the English, and a button to hear it. */
export default function SentenceBuilder({ numbers, measures, ingredients, plural }: { numbers: Item[]; measures: Item[]; ingredients: Item[]; plural: Record<string, string> }) {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const [g, setG] = useState(0);
  const num = numbers[n], meas = measures[m], ing = ingredients[g];
  const bn = `${num.bn} ${meas.bn} ${ing.bn}`;
  const ro = `${num.ro} ${meas.ro} ${ing.ro}`;
  const many = num.en !== "1"; // plural English only when the number is not one
  const en = `${num.en} ${many ? plural[meas.en] ?? meas.en : meas.en} of ${ing.en}`;
  const pick = (label: string, value: number, set: (v: number) => void, list: Item[], show: (i: Item) => string) => (
    <label className="kt-field">{label}
      <select value={value} onChange={(e) => set(Number(e.target.value))}>
        {list.map((it, i) => <option key={i} value={i}>{show(it)}</option>)}
      </select>
    </label>
  );
  return (
    <div className="kt-builder">
      <div className="kt-fields">
        {pick("Number", n, setN, numbers, (i) => `${i.bn} (${i.en})`)}
        {pick("Measure", m, setM, measures, (i) => `${i.bn} (${i.en})`)}
        {pick("Ingredient", g, setG, ingredients, (i) => `${i.bn} (${i.en})`)}
      </div>
      <div className="kt-built" aria-live="polite">
        <span className="kt-bn big" lang="bn">{bn}</span>
        <span className="kt-ro">{ro}</span>
        <span className="kt-en show">{en}</span>
        <button type="button" className="btn small" onClick={() => speakBn(bn)}><Icon name="sound" size={16} /> Listen</button>
      </div>
    </div>
  );
}

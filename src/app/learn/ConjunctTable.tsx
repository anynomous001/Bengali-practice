"use client";

import { speak } from "@/lib/speak";
import Icon from "./Icon";
import { useRoman } from "./Roman";

type Word = { bn: string; ro: string; en: string };
type Row = { id: string; conj: string; parts: string[]; words: Word[] };

/** The conjuncts of one group: the conjunct, the letters it is made of, and example words you can hear. */
export default function ConjunctTable({ rows, typeLabel }: { rows: Row[]; typeLabel?: string }) {
  const { roman, english } = useRoman();
  return (
    <div className="cj-table" role="table" aria-label="Conjuncts">
      <div className="cj-head" role="row"><span>Conjunct</span><span>Made of</span><span>Example words</span></div>
      {rows.map((r) => (
        <div className="cj-row" role="row" key={r.id}>
          <span className="cj-conj" lang="bn" role="cell">{r.conj}</span>
          <span className="cj-parts" lang="bn" role="cell">{r.parts.join(" + ")}{typeLabel && <small>{typeLabel}</small>}</span>
          <ul className="cj-words" role="cell">
            {r.words.map((w) => (
              <li key={w.bn}>
                <button type="button" className="cj-word" onClick={() => speak(w.bn)} aria-label={`Hear ${w.ro}`}>
                  <b lang="bn">{w.bn}</b>
                  {roman && <i>{w.ro}</i>}
                  {english && <small>{w.en}</small>}
                  <Icon name="sound" size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

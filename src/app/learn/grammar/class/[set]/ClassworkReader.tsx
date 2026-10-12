"use client";

import { useState } from "react";
import type { CwSet } from "@/data/classwork";
import { setLessonDone } from "../../../../actions";

type Mark = "got" | "missed";

export default function ClassworkReader({ set }: { set: CwSet }) {
  const [i, setI] = useState(0);
  const [drafts, setDrafts] = useState<string[]>(() => set.items.map(() => ""));
  const [revealed, setRevealed] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const done = marks.length === set.items.length;
  const item = set.items[i];

  function mark(m: Mark) {
    const next = [...marks, m];
    setMarks(next);
    setRevealed(false);
    if (next.length === set.items.length) void setLessonDone(`grammar/class-${set.id}`, true);
    else setI(i + 1);
  }
  function restart() {
    setI(0); setMarks([]); setRevealed(false); setDrafts(set.items.map(() => ""));
  }

  if (done) {
    const got = marks.filter((m) => m === "got").length;
    const missed = set.items.map((it, n) => ({ it, n })).filter(({ n }) => marks[n] === "missed");
    return (
      <div className="card-static practice-done">
        <h1>{set.title}</h1>
        <h2>You marked {got} of {set.items.length} as right</h2>
        <p>This lesson is now complete. {missed.length ? "Here are the ones to look at again." : "Nothing to review."}</p>
        {missed.length > 0 && (
          <ol className="missed">
            {missed.map(({ it, n }) => (
              <li key={n}>
                <span className="g-en">{it.prompt}{it.hint ? ` (${it.hint})` : ""}</span>
                <b>{it.answer}</b>
                {it.note && <span className="g-why">{it.note}</span>}
              </li>
            ))}
          </ol>
        )}
        <button className="btn" onClick={restart}>Do it again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{set.title}</h1>
      <p className="lede">{set.blurb}</p>
      <div className="q-card">
        <div className="q-top">
          <span className="q-kind">Write the answer</span>
          <span className="q-count">{i + 1} of {set.items.length}</span>
        </div>
        <div className="bar" aria-hidden><div style={{ width: `${(i / set.items.length) * 100}%` }} /></div>
        <p className="q-inst"><b>What to do:</b> {set.inst}</p>
        <p className="quiz-q">{item.prompt}</p>
        {item.hint && <p className="muted">{item.hint}</p>}
        <label className="visually-hidden" htmlFor="cw-draft">Your answer</label>
        <textarea id="cw-draft" className="draft" rows={2} value={drafts[i]} readOnly={revealed}
          onChange={(e) => setDrafts((d) => d.map((x, k) => (k === i ? e.target.value : x)))}
          placeholder="Type your answer in Banglish here" autoCapitalize="off" spellCheck={false} />
        {!revealed ? (
          <button className="btn" onClick={() => setRevealed(true)}>Check my answer</button>
        ) : (
          <>
            <div className="model">
              <p className="model-label">Model answer</p>
              <b>{item.answer}</b>
              {item.alt?.map((a) => <span key={a} className="g-also">Also fine: {a}</span>)}
              {item.note && <p className="g-why">{item.note}</p>}
              <p className="muted">Spelling in Banglish can vary. Compare the verb ending and the tense, not every letter.</p>
            </div>
            <div className="step-nav">
              <button className="btn ghost" onClick={() => mark("missed")}>I missed it</button>
              <button className="btn" onClick={() => mark("got")}>I got it right</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

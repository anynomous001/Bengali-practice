"use client";

import type { FirstSentences } from "@/data/kids-first-sentences";
import { PartNav } from "./Shared";

export default function Notes({ data }: { data: FirstSentences }) {
  const n = data.notes;
  return (
    <div className="fs">
      <PartNav cheatSheet={data.cheatSheet} />
      <h2>For parents and tutors</h2>
      <p className="fs-help">Short notes for the grown-up sitting next to the child. Open any heading.</p>

      <details className="fs-notes" open>
        <summary>How to teach this</summary>
        <ul>{n.teaching.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="fs-warn" role="note"><b>Important:</b> {n.frameOneWarning}</p>
      </details>

      <details className="fs-notes">
        <summary>Activities to try</summary>
        <ul>{n.activities.map((a) => <li key={a.title}><b>{a.title}.</b> {a.text}</li>)}</ul>
      </details>

      <details className="fs-notes" open>
        <summary>{n.homeGame.title}</summary>
        <ol>{n.homeGame.steps.map((s) => <li key={s}>{s}</li>)}</ol>
      </details>
    </div>
  );
}

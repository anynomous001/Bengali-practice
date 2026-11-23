"use client";

import { useState } from "react";

// Ticks stay in memory while the learner moves around the journey in this session.
const memory = new Map<string, boolean>();

/** The teacher's checklist for a stage. Tick boxes during a lesson. */
export default function ProgressCheck({ stage, goal, items }: { stage: number; goal?: string; items: string[] }) {
  const [, force] = useState(0);
  const key = (i: number) => `${stage}:${i}`;
  const ticked = items.filter((_, i) => memory.get(key(i))).length;
  return (
    <div className="kt-check">
      {goal && <p className="kt-goal"><b>Goal for this stage:</b> {goal}</p>}
      <ul>
        {items.map((t, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={!!memory.get(key(i))} onChange={(e) => { memory.set(key(i), e.target.checked); force((n) => n + 1); }} />
              <span>{t}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="muted">{ticked} of {items.length} ticked</p>
    </div>
  );
}

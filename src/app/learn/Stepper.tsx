"use client";

import Icon from "./Icon";

/** A numbered stepper: finished steps get a tick, the current step is filled, any step can be opened. */
export default function Stepper({ steps, current, onSelect, label }: { steps: { id: string; label: string }[]; current: string; onSelect: (id: string) => void; label: string }) {
  const at = steps.findIndex((s) => s.id === current);
  return (
    <ol className="stepper" aria-label={label}>
      {steps.map((s, i) => {
        const state = i < at ? "done" : i === at ? "current" : "todo";
        return (
          <li key={s.id} className={state}>
            <button type="button" onClick={() => onSelect(s.id)} aria-current={state === "current" ? "step" : undefined}>
              <span className="dot">{state === "done" ? <Icon name="check" size={14} /> : i + 1}</span>
              <span className="lbl">{s.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

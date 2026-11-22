"use client";

import { useMemo, useState } from "react";
import type { PickerGroup } from "@/lib/lesson-picker";

/** Choose the lessons a PDF should appear in. Search by name, tick as many as you like. Also fills hidden fields when used in a form. */
export default function LessonPicker({ groups, value, onChange, name }: { groups: PickerGroup[]; value: string[]; onChange: (v: string[]) => void; name?: string }) {
  const [q, setQ] = useState("");
  const titles = useMemo(() => new Map(groups.flatMap((g) => g.lessons.map((l) => [l.id, l.title] as const))), [groups]);
  const needle = q.trim().toLowerCase();
  const shown = groups
    .map((g) => ({ ...g, lessons: g.lessons.filter((l) => !needle || l.title.toLowerCase().includes(needle) || g.label.toLowerCase().includes(needle)) }))
    .filter((g) => g.lessons.length);
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

  return (
    <div className="lpk">
      {name && value.map((id) => <input key={id} type="hidden" name={name} value={id} />)}
      <div className="lpk-chosen" aria-live="polite">
        {value.length === 0 ? <span className="muted">No lesson chosen yet.</span> : value.map((id) => (
          <button key={id} type="button" className="lpk-chip" onClick={() => toggle(id)} aria-label={`Remove ${titles.get(id) ?? id}`}>{titles.get(id) ?? id} <span aria-hidden>×</span></button>
        ))}
      </div>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons, for example tens, animals, past tense" aria-label="Search lessons" />
      <div className="lpk-list" role="group" aria-label="Lessons">
        {shown.length === 0 && <p className="muted" style={{ padding: 12 }}>No lesson matches.</p>}
        {shown.map((g) => (
          <fieldset key={g.label} className="lpk-group">
            <legend>{g.label}</legend>
            {g.lessons.map((l) => (
              <label key={l.id} className="lpk-row">
                <input type="checkbox" checked={value.includes(l.id)} onChange={() => toggle(l.id)} />
                <span>{l.title}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
    </div>
  );
}

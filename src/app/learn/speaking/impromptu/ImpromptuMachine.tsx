"use client";

import { useEffect, useRef, useState } from "react";
import { impromptuTopic, setLessonDone } from "../../../actions";
import Icon from "../../Icon";

type Kind = "casual" | "professional" | "open" | "any";
type Topic = { en: string; ideas: string[]; kind: string };
type Phase = "setup" | "topic" | "prep" | "speak" | "done";

const KINDS: { id: Kind; label: string; hint: string }[] = [
  { id: "casual", label: "Casual", hint: "Everyday life: family, food, weekends, your city." },
  { id: "professional", label: "Professional", hint: "Work and study: meetings, updates, explaining things." },
  { id: "open", label: "Open", hint: "Open-ended ideas you can take in any direction." },
  { id: "any", label: "Surprise me", hint: "Any kind of topic, chosen at random." },
];
const PREP = [{ s: 30, label: "30 seconds" }, { s: 60, label: "1 minute" }, { s: 120, label: "2 minutes" }];
const TALK = [{ s: 60, label: "1 minute" }, { s: 120, label: "2 minutes" }, { s: 180, label: "3 minutes" }];
const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
const KIND_NAME: Record<string, string> = { casual: "Casual", professional: "Professional", open: "Open" };

const CHECKS = [
  "I kept going until the time was up",
  "I spoke in Bengali, even when I had to use simple words",
  "I used at least three words or phrases from the lessons",
  "I paused to think instead of switching to English",
];

function beep(freq = 880, ms = 220) {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx(); const o = ctx.createOscillator(); const g = ctx.createGain();
    o.frequency.value = freq; g.gain.value = 0.15; o.connect(g); g.connect(ctx.destination); o.start();
    setTimeout(() => { o.stop(); void ctx.close(); }, ms);
  } catch { /* sound is optional */ }
}

function Choice<T extends string | number>({ name, items, value, onChange }: { name: string; items: { id: T; label: string; hint?: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="choice-group" role="radiogroup" aria-label={name}>
      {items.map((it) => (
        <label key={String(it.id)} className={"choice" + (value === it.id ? " on" : "")}>
          <input type="radio" name={name} checked={value === it.id} onChange={() => onChange(it.id)} />
          <span><b>{it.label}</b>{it.hint && <small>{it.hint}</small>}</span>
        </label>
      ))}
    </div>
  );
}

export default function ImpromptuMachine() {
  const [kind, setKind] = useState<Kind>("casual");
  const [easy, setEasy] = useState(true);
  const [prep, setPrep] = useState(60);
  const [talk, setTalk] = useState(120);
  const [phase, setPhase] = useState<Phase>("setup");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);
  const [ticked, setTicked] = useState<boolean[]>(CHECKS.map(() => false));
  const [showIdeas, setShowIdeas] = useState(false);
  const endsAt = useRef(0);

  async function generate() {
    setBusy(true);
    const t = await impromptuTopic(kind === "any" ? "" : kind, easy ? "easy" : "any", seen);
    setBusy(false);
    if (!t) return;
    setTopic(t); setSeen((s) => [...s, t.en]); setShowIdeas(false); setPhase("topic");
  }
  function run(seconds: number, p: Phase) { endsAt.current = Date.now() + seconds * 1000; setLeft(seconds); setPhase(p); }

  // one clock for both countdowns, based on the wall clock so it stays right if the tab sleeps
  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    const id = setInterval(() => {
      const s = Math.ceil((endsAt.current - Date.now()) / 1000);
      setLeft(s);
      if (s <= 0) {
        clearInterval(id);
        if (phase === "prep") { beep(880, 300); run(talk, "speak"); }
        else { beep(660, 500); setTicked(CHECKS.map(() => false)); setPhase("done"); void setLessonDone("speaking/impromptu", true); }
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase, talk]);

  if (phase === "setup") {
    return (
      <div className="drill-setup">
        <p className="lede">Get a random topic, take a little time to prepare, then speak about it in Bengali. It is practice you do on your own: choose how long you need.</p>
        <h3>1. Kind of topic</h3>
        <Choice name="Kind of topic" items={KINDS} value={kind} onChange={setKind} />
        <label className="check rp-easy"><input type="checkbox" checked={easy} onChange={(e) => setEasy(e.target.checked)} /> Beginner topics only (simple ideas and familiar words)</label>
        <h3>2. Preparation time</h3>
        <Choice name="Preparation time" items={PREP.map((p) => ({ id: p.s, label: p.label }))} value={prep} onChange={setPrep} />
        <h3>3. Speaking time</h3>
        <Choice name="Speaking time" items={TALK.map((p) => ({ id: p.s, label: p.label }))} value={talk} onChange={setTalk} />
        <button className="btn" onClick={generate} disabled={busy}>{busy ? "Choosing a topic…" : "Give me a topic"}</button>
      </div>
    );
  }

  const total = phase === "prep" ? prep : talk;
  return (
    <div className="q-card imp">
      <div className="q-top">
        <span className="q-kind">{topic ? KIND_NAME[topic.kind] ?? "Topic" : "Topic"}</span>
        <span className="q-count">{phase === "topic" ? "Ready" : phase === "prep" ? "Preparing" : phase === "speak" ? "Speaking" : "Finished"}</span>
      </div>
      <h2 className="imp-topic">{topic?.en}</h2>

      {phase === "topic" && (
        <>
          <p className="q-inst"><b>What to do:</b> Read the topic. When you press Start you get {PREP.find((p) => p.s === prep)?.label} to prepare, then {TALK.find((p) => p.s === talk)?.label} to speak in Bengali.</p>
          <button className="btn" onClick={() => run(prep, "prep")}><Icon name="play" size={16} /> Start</button>
          <button className="btn ghost" onClick={generate} disabled={busy}>Different topic</button>
          <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
        </>
      )}

      {(phase === "prep" || phase === "speak") && (
        <>
          <p className="q-inst"><b>What to do:</b> {phase === "prep"
            ? "Think about what you will say. You can write notes on paper. A sound will tell you when to start speaking."
            : "Speak now, aloud, in Bengali. Keep going until the time is up. If you get stuck, use simpler words and carry on."}</p>
          <div className={"imp-clock" + (phase === "speak" ? " speak" : "") + (left <= 10 ? " warn" : "")} role="timer" aria-label="Time left">{mmss(left)}</div>
          <div className="bar" aria-hidden><div style={{ width: `${Math.min(100, ((total - left) / total) * 100)}%` }} /></div>
          <button type="button" className="btn ghost small" onClick={() => setShowIdeas((v) => !v)}>{showIdeas ? "Hide ideas" : "Need ideas?"}</button>
          {showIdeas && <ul className="imp-ideas">{topic?.ideas.map((x) => <li key={x}>{x}</li>)}</ul>}
          {phase === "prep" && <button className="btn" onClick={() => { beep(880, 300); run(talk, "speak"); }}>I am ready, start speaking</button>}
          {phase === "speak" && <button className="btn ghost" onClick={() => { setTicked(CHECKS.map(() => false)); setPhase("done"); void setLessonDone("speaking/impromptu", true); }}>I am finished</button>}
        </>
      )}

      {phase === "done" && (
        <>
          <p className="q-inst"><b>What to do:</b> Be honest with yourself. Tick what you did. The app cannot hear you, so this check is yours.</p>
          <ul className="imp-checks">
            {CHECKS.map((c, i) => (
              <li key={c}><label className="check"><input type="checkbox" checked={ticked[i]} onChange={() => setTicked((t) => t.map((x, k) => (k === i ? !x : x)))} /> {c}</label></li>
            ))}
          </ul>
          <p>{ticked.filter(Boolean).length === CHECKS.length ? "Great round." : "Try the same topic again, or take a new one."} This lesson is now complete.</p>
          <button className="btn" onClick={generate} disabled={busy}>New topic</button>
          <button className="btn ghost" onClick={() => run(prep, "prep")}>Same topic again</button>
          <button className="btn ghost" onClick={() => setPhase("setup")}>Change settings</button>
        </>
      )}
    </div>
  );
}

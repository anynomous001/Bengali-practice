"use client";

import { useRef, useState } from "react";
import Icon from "../Icon";
import { speakBn, stopSpeaking } from "./speech";

type Line = { bn: string; ro: string; en: string; who?: string };
type Scene = { id: string; title: string; items: Line[] };
const ROLES = ["Shift lead", "Team member"] as const;

/** A scene: lines in order, tap a line for the English, a button to hear each line, and a choice of which role you play. */
export default function Roleplay({ scenes }: { scenes: Scene[] }) {
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const [me, setMe] = useState<(typeof ROLES)[number]>("Team member");
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState(false);
  const run = useRef(0);
  const scene = scenes.find((s) => s.id === sceneId)!;
  const key = (i: number) => `${scene.id}:${i}`;
  const toggle = (i: number) => setShown((s) => { const n = new Set(s); if (n.has(key(i))) n.delete(key(i)); else n.add(key(i)); return n; });
  const allShown = scene.items.every((_, i) => shown.has(key(i)));

  function stop() { run.current++; stopSpeaking(); setPlaying(false); }
  /** Plays the other person's lines one after another, with a pause so you can say your own line out loud. */
  function playOther() {
    stop();
    const id = ++run.current;
    const lines = scene.items.filter((l) => l.who !== me);
    setPlaying(true);
    const step = (k: number) => {
      if (run.current !== id) return;
      if (k >= lines.length) { setPlaying(false); return; }
      speakBn(lines[k].bn, () => { window.setTimeout(() => step(k + 1), 1500); });
    };
    step(0);
  }
  const pickScene = (id: string) => { stop(); setSceneId(id); };

  return (
    <div className="kt-role">
      {scenes.length > 1 && (
        <div className="kt-scenes" role="tablist" aria-label="Scenes">
          {scenes.map((s) => <button key={s.id} type="button" role="tab" aria-selected={s.id === sceneId} className={s.id === sceneId ? "on" : ""} onClick={() => pickScene(s.id)}>{s.title}</button>)}
        </div>
      )}
      <div className="kt-role-tools">
        <div className="kt-speed" role="radiogroup" aria-label="Your role">
          <span className="kt-speed-label">I am the</span>
          {ROLES.map((r) => <button key={r} type="button" role="radio" aria-checked={me === r} className={me === r ? "on" : ""} onClick={() => { stop(); setMe(r); }}>{r}</button>)}
        </div>
        <button type="button" className="btn ghost small" onClick={playing ? stop : playOther}>
          <Icon name={playing ? "close" : "play"} size={14} /> {playing ? "Stop" : "Play the other person's lines"}
        </button>
        <button type="button" className="btn ghost small" onClick={() => setShown((s) => { const n = new Set(s); scene.items.forEach((_, i) => { if (allShown) n.delete(key(i)); else n.add(key(i)); }); return n; })}>{allShown ? "Hide English" : "Show all English"}</button>
      </div>
      <ol className="kt-lines">
        {scene.items.map((l, i) => {
          const mine = l.who === me;
          return (
            <li key={i} className={"kt-line" + (mine ? " mine" : "")}>
              <span className="kt-who">{mine ? `You (${l.who})` : l.who}</span>
              <button type="button" className="kt-line-text" onClick={() => toggle(i)} aria-expanded={shown.has(key(i))} aria-label="Tap to show or hide the English">
                <span className="kt-bn" lang="bn">{l.bn}</span>
                <span className="kt-ro">{l.ro}</span>
                <span className="kt-en">{shown.has(key(i)) ? l.en : "Tap for English"}</span>
              </button>
              <button type="button" className="kt-listen" onClick={() => speakBn(l.bn)} aria-label={`Listen to line ${i + 1}`}><Icon name="sound" size={20} /></button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

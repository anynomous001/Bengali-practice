"use client";

import { useEffect, useRef, useState } from "react";
import { recordKidsSession } from "../../../actions";
import type { PotionColour } from "@/data/kids-games";
import { Celebration, GameButton, SpeakBtn, StarMeter, Toggle, WordCard, pickNew, useShowText, useStars } from "./Wizard";
import Jar from "../Cauldron";
import "./wizard.css";

const NUM_BN = ["শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ"];

export default function PotionClass({ colours, goal, timers }: { colours: PotionColour[]; goal: number; timers: number[] }) {
  const { stars, addStar, reset, done } = useStars("potion");
  const { showEn, setShowEn, showRo, setShowRo } = useShowText();
  const [cur, setCur] = useState<number | null>(null);
  const [face, setFace] = useState<number | null>(null); // colour shown on the die while it rolls
  const [rolling, setRolling] = useState(false);
  const [found, setFound] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [listen, setListen] = useState(false);
  const [limit, setLimit] = useState(timers[1] ?? 30);
  const [left, setLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [layers, setLayers] = useState<number[]>([]);
  const [potionDone, setPotionDone] = useState(false);
  const last = useRef<number | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const roll = useRef<ReturnType<typeof setInterval> | null>(null);
  const rollEnd = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimer = () => { if (tick.current) clearInterval(tick.current); tick.current = null; };
  useEffect(() => () => { stopTimer(); if (roll.current) clearInterval(roll.current); if (rollEnd.current) clearTimeout(rollEnd.current); }, []);

  function rollDie() {
    if (rolling) return;
    stopTimer(); setTimeUp(false); setFound(false); setRevealed(false); setRolling(true); setCur(null);
    const target = pickNew(colours.length, last.current);
    last.current = target;
    roll.current = setInterval(() => setFace(Math.floor(Math.random() * colours.length)), 90);
    rollEnd.current = setTimeout(() => {
      if (roll.current) clearInterval(roll.current);
      setFace(target); setCur(target); setRolling(false);
      if (limit > 0) {
        setLeft(limit);
        tick.current = setInterval(() => setLeft((l) => {
          if (l <= 1) { stopTimer(); setTimeUp(true); return 0; }
          return l - 1;
        }), 1000);
      }
    }, 1000);
  }

  function foundIt() {
    if (cur === null || found || rolling) return;
    stopTimer(); setFound(true); setRevealed(true); addStar();
    const next = [...layers, cur];
    setLayers(next);
    if (next.length >= goal) { setPotionDone(true); void recordKidsSession("potion", Math.max(stars + 1, goal)); }
  }
  function newPotion() { setLayers([]); setPotionDone(false); }

  const hideColour = listen && !revealed && cur !== null;
  const c = cur !== null ? colours[cur] : null;
  const dieColour = rolling ? (face !== null ? colours[face] : null) : hideColour ? null : cur !== null ? colours[cur] : null;

  return (
    <div className="wiz" onKeyDown={(e) => { if (e.key === " " && (e.target as HTMLElement).tagName !== "BUTTON" && (e.target as HTMLElement).tagName !== "SELECT") { e.preventDefault(); rollDie(); } }} tabIndex={-1}>
      <div className="wiz-head">
        <div>
          <a className="wiz-back" href="/learn/kids/games">← Spell School</a>
          <h1>Potion Class <small lang="bn">জাদুর শরবত</small></h1>
          <p className="wz-lede">We are brewing a magic potion. Roll the colour dice, find something that colour in your room, and bring it back before the timer runs out.</p>
        </div>
        <StarMeter stars={stars} onReset={reset} />
      </div>

      <div className="pc-grid">
        <div className="pc-main">
          <button type="button" className={"pc-die" + (rolling ? " rolling" : "")} onClick={rollDie} aria-label="Roll the colour dice"
            style={{ background: dieColour?.hex ?? "var(--surface-2)", color: dieColour?.textOn ?? "var(--ink-2)", borderColor: dieColour ? (dieColour.hex === "#fafafa" ? "#ccc" : "rgba(0,0,0,.2)") : "var(--line-2)" }}>
            {dieColour ? <span className="pc-die-dots" aria-hidden>●</span> : <span className="pc-die-q">?</span>}
          </button>

          {c && !rolling ? (
            <>
              <WordCard bn={c.bn} ro={c.ro} en={c.en} showEn={showEn} showRo={showRo} hidden={hideColour} speakText={c.bn} small />
              {!hideColour ? (
                <div className="wz-word small pc-spell">
                  <p className="wz-word-bn" lang="bn">{c.bn} কিছু নিয়ে এসো!<SpeakBtn text={`${c.bn} কিছু নিয়ে এসো!`} /></p>
                  {showRo && <p className="wz-word-ro">{c.ro} kichhu niye esho!</p>}
                  {showEn && <p className="wz-word-en">Bring something {c.en}!</p>}
                </div>
              ) : <div className="wz-word small pc-spell"><p className="wz-word-bn" lang="bn">শোনো</p><p className="wz-word-en">Listen to your teacher&apos;s spell</p></div>}
            </>
          ) : <div className="wz-word small"><p className="wz-word-en">{rolling ? "Rolling…" : "Roll the dice to start"}</p></div>}

          {limit > 0 && c && !rolling && (
            <div className="pc-timer" aria-live="off">
              <div className="pc-bar"><div style={{ width: `${(left / limit) * 100}%`, background: left <= 5 ? "var(--w-bad)" : "var(--w-gold)" }} /></div>
              <small>{timeUp ? "Time's up. Roll again?" : found ? "Found it!" : `${left} s · `}{!timeUp && !found && <span lang="bn">তাড়াতাড়ি!</span>}{!timeUp && !found && " (taratari, quickly!)"}</small>
            </div>
          )}

          <div>
            <GameButton onClick={rollDie} disabled={rolling}>Roll</GameButton>
            <GameButton kind="success" onClick={foundIt} disabled={cur === null || found || rolling}>Found it</GameButton>
            {listen && <GameButton kind="ghost" onClick={() => setRevealed(true)} disabled={cur === null || revealed}>Reveal colour</GameButton>}
          </div>
          <p className="wz-prompt">Say the spell aloud. When he shows the object, ask <b lang="bn">এটা কী রং?</b> (eta ki rong?)</p>
        </div>

        <aside className="pc-side">
          <Jar colors={layers.map((i) => colours[i].hex)} goal={goal} label={`Jar with ${layers.length} of ${goal} colours`} />
          <p className="pc-count"><span lang="bn">{NUM_BN[Math.min(layers.length, 5)]}</span> · {layers.length} / {goal} ingredients</p>
          <GameButton kind="ghost" onClick={newPotion}>New potion</GameButton>
          <div className="wz-toggles">
            <Toggle label="Listening round" checked={listen} onChange={setListen} />
            <Toggle label="Show English" checked={showEn} onChange={setShowEn} />
            <Toggle label="Show romanization" checked={showRo} onChange={setShowRo} />
            <label className="wz-toggle">Timer
              <select className="wz-select" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                {timers.map((t) => <option key={t} value={t}>{t === 0 ? "Off" : `${t} s`}</option>)}
              </select>
            </label>
          </div>
          <ul className="pc-legend">
            {colours.map((k) => (
              <li key={k.en}><i style={{ background: k.hex }} /><span lang="bn">{k.bn}</span>{showRo && <small>{k.ro}</small>}</li>
            ))}
          </ul>
        </aside>
      </div>
      {(potionDone || done) && <Celebration line={potionDone ? "Potion ready!" : "Great potion master!"} onAgain={() => { newPotion(); reset(); }} />}
    </div>
  );
}

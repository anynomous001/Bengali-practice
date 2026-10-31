"use client";

import { useEffect, useRef, useState } from "react";
import type { Creature } from "@/data/kids-games";
import { Celebration, GameButton, StarMeter, Toggle, WordCard, pickNew, useShowText, useStars } from "./Wizard";
import "./wizard.css";

type Tab = "meet" | "mystery";
const TILES = 16;

export default function MysteryWizard({ creatures }: { creatures: Creature[] }) {
  const { stars, addStar, reset, done } = useStars("creatures");
  const { showEn, setShowEn, showRo, setShowRo } = useShowText();
  const [tab, setTabState] = useState<Tab>("meet");
  const [listen, setListen] = useState(false);

  // meet
  const [picked, setPicked] = useState<number | null>(null);
  const [ask, setAsk] = useState<number | null>(null);
  const [askDone, setAskDone] = useState(false);
  const [bad, setBad] = useState<number | null>(null);
  const [hideNames, setHideNames] = useState(false);
  const lastAsk = useRef<number | null>(null);

  // mystery
  const [mys, setMys] = useState<number | null>(null);
  const [tiles, setTiles] = useState<number[]>([]); // indexes still covering the picture
  const [solved, setSolved] = useState(false);
  const [choices, setChoices] = useState(true);
  const [badChoice, setBadChoice] = useState<number | null>(null);
  const lastMys = useRef<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  function setTab(t: Tab) { clearTimers(); setTabState(t); setPicked(null); setAsk(null); setAskDone(false); setMys(null); setTiles([]); setSolved(false); }
  const wrong = (setter: (n: number | null) => void, i: number) => { setter(i); timers.current.push(setTimeout(() => setter(null), 500)); };

  function clickCreature(i: number) {
    if (ask !== null && !askDone) {
      if (i === ask) { setAskDone(true); setPicked(i); addStar(); } else wrong(setBad, i);
      return;
    }
    setPicked(i);
  }
  function newAsk() {
    const i = pickNew(creatures.length, lastAsk.current); lastAsk.current = i;
    setAsk(i); setAskDone(false); setPicked(null);
  }

  function nextMystery() {
    clearTimers();
    const i = pickNew(creatures.length, lastMys.current); lastMys.current = i;
    setMys(i); setSolved(false); setBadChoice(null);
    const all = Array.from({ length: TILES }, (_, k) => k);
    setTiles(all);
    timers.current.push(setTimeout(() => {
      setTiles((t) => { const a = [...t]; for (let n = 0; n < 2; n++) a.splice(Math.floor(Math.random() * a.length), 1); return a; });
    }, 700));
  }
  function revealPiece() {
    if (mys === null || solved) return;
    setTiles((t) => { if (t.length <= 1) return t; const a = [...t]; a.splice(Math.floor(Math.random() * a.length), 1); return a; });
  }
  function solve() {
    if (mys === null || solved) return;
    setSolved(true); setTiles([]); addStar();
  }
  function chooseMystery(i: number) {
    if (mys === null || solved) return;
    if (i === mys) solve(); else wrong(setBadChoice, i);
  }

  const mc = mys !== null ? creatures[mys] : null;
  const ac = ask !== null ? creatures[ask] : null;
  const pc = picked !== null ? creatures[picked] : null;
  const names = !hideNames;

  return (
    <div className="wiz" onKeyDown={(e) => { if (tab === "mystery" && e.key === " " && (e.target as HTMLElement).tagName !== "BUTTON") { e.preventDefault(); revealPiece(); } }} tabIndex={-1}>
      <div className="wiz-head">
        <div>
          <a className="wiz-back" href="/learn/kids/games">← Spell School</a>
          <h1>Mystery Wizard <small lang="bn">জাদুর প্রাণী</small></h1>
        </div>
        <StarMeter stars={stars} onReset={reset} />
      </div>

      <div className="wz-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "meet"} className="wz-tab" onClick={() => setTab("meet")}>Meet the creatures</button>
        <button type="button" role="tab" aria-selected={tab === "mystery"} className="wz-tab" onClick={() => setTab("mystery")}>Mystery reveal (এটা কী?)</button>
      </div>

      {tab === "meet" && (
        <>
          <div className="mw-cards">
            {creatures.map((c, i) => (
              <button key={c.key} type="button" className={"mw-card" + (picked === i ? " on" : "") + (askDone && ask === i ? " right" : "") + (bad === i ? " wrong wz-shake" : "")} onClick={() => clickCreature(i)} aria-label={`${c.en}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo ?? `/kids/pic/${c.pic}.svg`} alt="" width={96} height={96} className={c.photo ? "mw-photo" : undefined} />
                {names && <b lang="bn">{c.bn}</b>}
                {names && showRo && <small className="mw-ro">{c.ro}</small>}
                {names && showEn && <small>{c.en}</small>}
                {names && showEn && <small className="mw-fun">{c.fun}</small>}
              </button>
            ))}
          </div>
          {ac && !askDone ? (
            <WordCard bn={`${ac.bn} কোথায়?`} ro={`${ac.ro} kothay?`} en={`Where is the ${ac.en}?`} showEn={showEn} showRo={showRo} hidden={listen} speakText={`${ac.bn} কোথায়?`} small />
          ) : ac && askDone ? (
            <WordCard bn={`${ac.bn} কোথায়?`} ro={`${ac.ro} kothay?`} en={`Where is the ${ac.en}?`} showEn={showEn} showRo={showRo} speakText={`${ac.bn} কোথায়?`} verdict="হ্যাঁ! খুব ভালো! ⭐" verdictKind="yes" small />
          ) : pc ? (
            <WordCard bn={pc.bn} ro={pc.ro} en={pc.en} showEn={showEn} showRo={showRo} speakText={pc.bn} small />
          ) : <div className="wz-word small"><p className="wz-word-en">Tap a creature, or press Where is it?</p></div>}
          <div>
            <GameButton onClick={newAsk}>🔍 Where is it? (কোথায়?)</GameButton>
            {ac && !askDone && <GameButton kind="success" onClick={() => { setAskDone(true); setPicked(ask); addStar(); }}>✅ He pointed right!</GameButton>}
            <GameButton kind="ghost" onClick={() => setHideNames((h) => !h)}>{hideNames ? "👀 Show names" : "🙈 Hide names"}</GameButton>
          </div>
        </>
      )}

      {tab === "mystery" && (
        <>
          <div className="mw-stage-wrap">
            <div className="mw-stage">
              {mc && /* eslint-disable-next-line @next/next/no-img-element */ <img src={mc.photo ?? `/kids/pic/${mc.pic}.svg`} alt={solved ? mc.en : "A hidden creature"} className={"mw-hidden-pic" + (mc.photo ? " mw-photo-full" : "")} />}
              {mc && (
                <div className="mw-curtain" aria-hidden>
                  {Array.from({ length: TILES }, (_, k) => (
                    <i key={k} className={tiles.includes(k) ? "" : "gone"}>{k % 2 ? "✦" : "☾"}</i>
                  ))}
                </div>
              )}
              {!mc && <p className="mw-empty">🔮 Press Next mystery</p>}
            </div>
            <p className="wz-prompt">Pieces revealed: {mc ? TILES - tiles.length : 0} / {TILES}</p>
          </div>

          {mc && !solved && (
            <WordCard bn="এটা কী?" ro="eta ki?" en="What is this?" showEn={showEn} showRo={showRo} hidden={listen} speakText="এটা কী?" small />
          )}
          {mc && solved && (
            <WordCard bn={`এটা ${mc.bn}!`} ro={`eta ${mc.ro}!`} en={`It's ${/^[aeiou]/.test(mc.en) ? "an" : "a"} ${mc.en}!`} showEn={showEn} showRo={showRo} speakText={`এটা ${mc.bn}!`} verdict="খুব ভালো! ⭐" verdictKind="yes" small />
          )}

          {choices && mc && (
            <div className="mw-choices">
              {creatures.map((c, i) => (
                <button key={c.key} type="button" className={"mw-choice" + (badChoice === i ? " wrong wz-shake" : "") + (solved && i === mys ? " right" : "")} onClick={() => chooseMystery(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.photo ?? `/kids/pic/${c.pic}.svg`} alt="" width={44} height={44} className={c.photo ? "mw-photo" : undefined} />
                  <b lang="bn">{c.bn}</b>{showRo && <small>{c.ro}</small>}
                </button>
              ))}
            </div>
          )}

          <div>
            <GameButton onClick={nextMystery}>🔮 Next mystery</GameButton>
            <GameButton kind="ghost" onClick={revealPiece} disabled={!mc || solved}>✨ Reveal a piece</GameButton>
            <GameButton kind="success" onClick={solve} disabled={!mc || solved}>🎉 Show the creature</GameButton>
          </div>
          <p className="wz-prompt">When it is solved, he repeats the whole sentence: <b lang="bn">এটা ___!</b> That is his first full Bengali sentence.</p>
        </>
      )}

      <div className="wz-toggles">
        <Toggle label="👂 Listening mode" checked={listen} onChange={setListen} />
        <Toggle label="Show English" checked={showEn} onChange={setShowEn} />
        <Toggle label="Show romanization" checked={showRo} onChange={setShowRo} />
        {tab === "mystery" && <Toggle label="Show creature choices" checked={choices} onChange={setChoices} />}
      </div>
      <p className="wz-tip">Pictures: <a href="https://github.com/jdecked/twemoji" target="_blank" rel="noopener" style={{ color: "inherit" }}>Twemoji</a>, CC-BY 4.0.</p>
      {done && <Celebration line="You found every creature!" onAgain={reset} />}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import type { BodyCommand, BodyPart } from "@/data/kids-games";
import { Celebration, GameButton, StarMeter, Toggle, WordCard, pickNew, useShowText, useStars } from "./Wizard";
import "./wizard.css";

type Tab = "learn" | "spells" | "commands";
type Flash = { key: string; kind: "right" | "wrong" } | null;
type Yn = { key: string; asked: string; revealed: boolean } | null;

export default function BodyCheck({ parts, order, commands }: { parts: BodyPart[]; order: string[]; commands: BodyCommand[] }) {
  const byKey = (k: string) => parts.find((p) => p.key === k)!;
  const { stars, addStar, reset, done } = useStars("body");
  const { showEn, setShowEn, showRo, setShowRo } = useShowText();
  const [tab, setTabState] = useState<Tab>("learn");
  const [sel, setSel] = useState<string | null>("matha");
  const [flash, setFlash] = useState<Flash>(null);
  const [labels, setLabels] = useState(false);
  const [listen, setListen] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [ask, setAsk] = useState<string | null>(null);
  const [yn, setYn] = useState<Yn>(null);
  const [cmd, setCmd] = useState<{ c: BodyCommand; magic: boolean } | null>(null);
  const [cmdMarked, setCmdMarked] = useState(false);
  const [trick, setTrick] = useState(false);
  const lastAsk = useRef<number | null>(null);
  const lastCmd = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setTab(t: Tab) {
    setTabState(t); setFlash(null); setAnswered(false); setAsk(null); setYn(null); setCmd(null); setCmdMarked(false);
    setSel(t === "learn" ? "matha" : null);
  }
  function flashPart(key: string, kind: "right" | "wrong") {
    if (timer.current) clearTimeout(timer.current);
    setFlash({ key, kind });
    timer.current = setTimeout(() => setFlash(null), 1100);
  }

  // Learn tab
  const learnIdx = sel ? order.indexOf(sel) : 0;
  const step = (d: number) => setSel(order[(learnIdx + d + order.length) % order.length]);

  // Secret spells
  function newSpell() {
    const i = pickNew(parts.length, lastAsk.current); lastAsk.current = i;
    setAsk(parts[i].key); setYn(null); setAnswered(false); setSel(null); setFlash(null);
  }
  function newYn() {
    const i = pickNew(parts.length, lastAsk.current); lastAsk.current = i;
    const shown = parts[i].key;
    const same = Math.random() < 0.45;
    const others = parts.filter((p) => p.key !== shown);
    const asked = same ? shown : others[Math.floor(Math.random() * others.length)].key;
    setYn({ key: shown, asked, revealed: false }); setAsk(null); setAnswered(false); setSel(shown); setFlash(null);
  }
  function pointed(correct: boolean, key: string) {
    if (correct) { if (!answered) { setAnswered(true); addStar(); } flashPart(key, "right"); } else flashPart(key, "wrong");
  }
  function clickPart(key: string) {
    if (tab === "learn") { setSel(key); return; }
    if (tab === "spells" && ask) { pointed(key === ask, key); return; }
    setSel(key);
  }
  function revealYn() {
    if (!yn || yn.revealed) return;
    setYn({ ...yn, revealed: true }); setAnswered(true); addStar();
  }
  function castSpell() {
    const i = pickNew(commands.length, lastCmd.current); lastCmd.current = i;
    const c = commands[i];
    setCmd({ c, magic: trick ? Math.random() < 0.6 : true }); setCmdMarked(false); setFlash(null);
    setSel(listen ? null : c.part);
  }
  function markCmd(ok: boolean) {
    if (!cmd || cmdMarked) return;
    setCmdMarked(true);
    if (cmd.c.part) flashPart(cmd.c.part, ok ? "right" : "wrong");
    if (ok) addStar();
  }

  const cur = sel ? byKey(sel) : null;
  const askPart = ask ? byKey(ask) : null;
  const ynPart = yn ? byKey(yn.asked) : null;

  // what the big card shows
  let card: React.ReactNode;
  if (tab === "learn" && cur) {
    card = <WordCard bn={cur.bn} ro={cur.ro} en={cur.en} hint={`🖐 ${cur.gesture}`} showEn={showEn} showRo={showRo} speakText={cur.bn} />;
  } else if (tab === "spells" && askPart) {
    card = <WordCard bn={`${askPart.bn} কোথায়?`} ro={`${askPart.ro} kothay?`} en={`Where is the ${askPart.en}?`} showEn={showEn} showRo={showRo} hidden={listen && !answered} speakText={`${askPart.bn} কোথায়?`}
      verdict={answered ? "হ্যাঁ! খুব ভালো! ⭐" : undefined} verdictKind="yes" />;
  } else if (tab === "spells" && yn && ynPart) {
    const same = yn.asked === yn.key;
    card = <WordCard bn={`এটা ${ynPart.bn}?`} ro={`eta ${ynPart.ro}?`} en={`Is this the ${ynPart.en}?`} showEn={showEn} showRo={showRo} hidden={listen && !yn.revealed} speakText={`এটা ${ynPart.bn}?`}
      verdict={yn.revealed ? (same ? "হ্যাঁ! 👍" : `না! 👎 ${byKey(yn.key).bn}`) : undefined} verdictKind={same ? "yes" : "no"} />;
  } else if (tab === "commands" && cmd) {
    const text = cmd.magic ? `জাদু! ${cmd.c.bn}` : cmd.c.bn;
    card = <WordCard bn={text} ro={cmd.magic ? `jadu! ${cmd.c.ro}` : cmd.c.ro} en={cmd.magic ? `Magic! ${cmd.c.en}` : cmd.c.en} showEn={showEn} showRo={showRo} hidden={listen && !cmdMarked} speakText={text}
      verdict={cmdMarked && trick ? (cmd.magic ? "Do it! ✅" : "Freeze! 🧊") : undefined} verdictKind={cmd.magic ? "yes" : "no"} />;
  } else {
    card = <WordCard bn="🪄" ro="" en={tab === "spells" ? "Press a spell button to begin" : "Press Cast a spell to begin"} showEn showRo={false} />;
  }

  const labelAll = labels || false;
  return (
    <div className="wiz" onKeyDown={(e) => { if (tab !== "learn") return; if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } }}>
      <div className="wiz-head">
        <div>
          <a className="wiz-back" href="/learn/kids/games">← Spell School</a>
          <h1>Wizard Body Check <small lang="bn">শরীরের জাদু</small></h1>
        </div>
        <StarMeter stars={stars} onReset={reset} />
      </div>

      <div className="wz-tabs" role="tablist">
        {([["learn", "Learn the words"], ["spells", "Secret spells (কোথায়?)"], ["commands", "Spell commands"]] as [Tab, string][]).map(([t, l]) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className="wz-tab" onClick={() => setTab(t)}>{l}</button>
        ))}
      </div>

      <div className="bc-grid">
        <div className="bc-fig">
          <Figure parts={parts} sel={sel} flash={flash} labels={labelAll} showEn={showEn} showRo={showRo} onPick={clickPart} />
        </div>
        <div className="bc-side">
          {card}

          {tab === "learn" && (
            <>
              <div className="wz-chips">
                {order.map((k) => { const p = byKey(k); return (
                  <button key={k} type="button" className={"wz-chip" + (sel === k ? " on" : "")} onClick={() => setSel(k)}>
                    <b lang="bn">{p.bn}</b>{showRo && <small>{p.ro}</small>}
                  </button>
                ); })}
              </div>
              <div>
                <GameButton kind="ghost" onClick={() => step(-1)}>◀ Back</GameButton>
                <GameButton onClick={() => step(1)}>Next ▶</GameButton>
                <GameButton kind="success" onClick={() => { if (sel) { addStar(); flashPart(sel, "right"); } }}>⭐ He did the gesture!</GameButton>
              </div>
              <p className="wz-prompt">Say the word, he does the gesture. Later, say only the Bengali. Arrow keys also move.</p>
            </>
          )}

          {tab === "spells" && (
            <div>
              <GameButton onClick={newSpell}>🔮 New spell</GameButton>
              <GameButton kind="ghost" onClick={newYn}>🤔 Yes / No spell</GameButton>
              {ask && <GameButton kind="success" onClick={() => pointed(true, ask)} disabled={answered}>✅ He pointed right!</GameButton>}
              {yn && <GameButton kind="ghost" onClick={revealYn} disabled={yn.revealed}>👀 Show answer</GameButton>}
              <p className="wz-prompt">{ask ? "He points on his own body. Then click that part on the wizard." : yn ? "Is the glowing part the one named?" : "Press a spell to begin."}</p>
            </div>
          )}

          {tab === "commands" && (
            <div>
              <GameButton onClick={castSpell}>🪄 Cast a spell</GameButton>
              {cmd && <><GameButton kind="success" onClick={() => markCmd(true)} disabled={cmdMarked}>✅ Got it right</GameButton><GameButton kind="danger" onClick={() => markCmd(false)} disabled={cmdMarked}>❌ Oops</GameButton></>}
              <Toggle label="🪄 Trick round (only act after জাদু!)" checked={trick} onChange={setTrick} />
            </div>
          )}

          <div className="wz-toggles">
            <Toggle label="Show all labels on the wizard" checked={labels} onChange={setLabels} />
            <Toggle label="👂 Listening mode" checked={listen} onChange={setListen} />
            <Toggle label="Show English" checked={showEn} onChange={setShowEn} />
            <Toggle label="Show romanization" checked={showRo} onChange={setShowRo} />
          </div>
        </div>
      </div>
      <p className="wz-tip">Teacher tip: say each word aloud first. The child answers with his body, then you click.</p>
      {done && <Celebration line="Wizard body check complete!" onAgain={reset} />}
    </div>
  );
}

function Figure({ parts, sel, flash, labels, showEn, showRo, onPick }: {
  parts: BodyPart[]; sel: string | null; flash: Flash; labels: boolean; showEn: boolean; showRo: boolean; onPick: (k: string) => void;
}) {
  const cls = (k: string) => "bc-part" + (sel === k ? " hl" : "") + (flash?.key === k ? ` ${flash.kind}` : "");
  const hit = (k: string) => ({ "data-part": k, className: cls(k), onClick: (e: React.MouseEvent) => { e.stopPropagation(); onPick(k); }, role: "button" as const, tabIndex: 0, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onPick(k); } }, "aria-label": parts.find((p) => p.key === k)?.en });
  // The picture is 971 x 1619. Each part is an invisible shape over it that glows when chosen. Small parts come last so they win the click.
  return (
    <svg viewBox="-260 0 1490 1619" className="bc-svg" role="group" aria-label="A child standing. Tap a body part.">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <image href="/kids/body-boy.webp" x="0" y="0" width="971" height="1619" style={{ pointerEvents: "none" }} />
      <g {...hit("pa")}>
        <rect x="335" y="1125" width="118" height="290" rx="40" /><rect x="520" y="1125" width="118" height="290" rx="40" />
        <ellipse cx="340" cy="1505" rx="100" ry="95" /><ellipse cx="632" cy="1500" rx="95" ry="95" />
        <rect x="325" y="1380" width="90" height="70" /><rect x="565" y="1380" width="90" height="70" />
      </g>
      <g {...hit("hat")}>
        <path d="M270 620 L340 650 L302 880 L264 1030 L190 990 L222 870 Z" /><path d="M702 620 L632 650 L670 880 L708 1030 L782 990 L750 870 Z" />
      </g>
      <g {...hit("pet")}><ellipse cx="482" cy="715" rx="125" ry="115" /></g>
      <g {...hit("matha")}><ellipse cx="470" cy="200" rx="190" ry="205" /></g>
      <g {...hit("kan")}><ellipse cx="350" cy="268" rx="34" ry="52" /><ellipse cx="594" cy="252" rx="32" ry="52" /></g>
      <g {...hit("chokh")}><ellipse cx="418" cy="228" rx="52" ry="34" /><ellipse cx="520" cy="222" rx="52" ry="34" /></g>
      <g {...hit("nak")}><ellipse cx="478" cy="268" rx="30" ry="36" /></g>
      <g {...hit("mukh")}><ellipse cx="478" cy="304" rx="58" ry="32" /></g>
      {parts.map((p) => {
        if (!(labels || sel === p.key)) return null;
        const left = p.side === "L";
        const x = left ? 160 : 810, tx = left ? -250 : 820;
        return (
          <g key={p.key} style={{ pointerEvents: "none" }}>
            <line x1={p.anchor[0]} y1={p.anchor[1]} x2={x} y2={p.labelY + 60} stroke="#ffd54a" strokeWidth="6" strokeDasharray="16 12" />
            <circle cx={p.anchor[0]} cy={p.anchor[1]} r="12" fill="#ffd54a" stroke="#1b1035" strokeWidth="4" />
            <text x={tx} y={p.labelY + 62} fontSize="64" fontWeight="700" fill="#fff" fontFamily="var(--font-bn)">{p.bn}</text>
            {showRo && <text x={tx} y={p.labelY + 112} fontSize="44" fontWeight="600" fill="#ffd54a">{p.ro}</text>}
            {showEn && <text x={tx} y={p.labelY + (showRo ? 156 : 112)} fontSize="38" fill="#bfb3e6">{p.en}</text>}
          </g>
        );
      })}
    </svg>
  );
}

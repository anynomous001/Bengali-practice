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
          <a className="wiz-back" href="/learn/kids">← Spell School</a>
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
  const hit = (k: string) => ({ "data-part": k, className: cls(k), onClick: (e: React.MouseEvent) => { e.stopPropagation(); onPick(k); }, role: "button" as const, tabIndex: 0, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); onPick(k); } }, "aria-label": parts.find((p) => p.key === k)?.en });
  const skin = "#ffd7b0", robe = "#6a3fc4";
  return (
    <svg viewBox="0 0 560 570" className="bc-svg" role="group" aria-label="A cartoon wizard child. Tap a body part.">
      {/* legs and feet (pa) */}
      <g {...hit("pa")}>
        <rect x="250" y="425" width="28" height="62" rx="12" fill={skin} /><rect x="282" y="425" width="28" height="62" rx="12" fill={skin} />
        <ellipse cx="258" cy="494" rx="26" ry="12" fill="#3a2478" /><ellipse cx="302" cy="494" rx="26" ry="12" fill="#3a2478" />
      </g>
      {/* arms and hands (hat) */}
      <g {...hit("hat")}>
        <path d="M236 240 L182 350" stroke={robe} strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M324 240 L378 350" stroke={robe} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="180" cy="358" r="18" fill={skin} /><circle cx="380" cy="358" r="18" fill={skin} />
      </g>
      {/* wand */}
      <g style={{ pointerEvents: "none" }}>
        <line x1="382" y1="352" x2="424" y2="268" stroke="#8d5a2b" strokeWidth="6" strokeLinecap="round" />
        <text x="424" y="262" fontSize="30" textAnchor="middle" fill="#ffd54a">★</text>
      </g>
      {/* robe, tummy (pet) */}
      <path d="M232 222 L328 222 L362 432 L198 432 Z" fill={robe} style={{ pointerEvents: "none" }} />
      <g {...hit("pet")}><ellipse cx="280" cy="326" rx="40" ry="48" fill="#8d68e4" /><circle cx="280" cy="326" r="5" fill="#6a3fc4" /></g>
      {/* ears (kan) behind the head */}
      <g {...hit("kan")}><circle cx="222" cy="168" r="15" fill={skin} /><circle cx="338" cy="168" r="15" fill={skin} /></g>
      {/* head */}
      <g {...hit("matha")}>
        <circle cx="280" cy="162" r="60" fill={skin} />
        <path d="M222 150 Q230 100 280 98 Q330 100 338 150 Q300 128 222 150 Z" fill="#6b3a1c" />
      </g>
      {/* face parts drawn after the head so they win the click */}
      <g {...hit("chokh")}>
        <circle cx="260" cy="160" r="9" fill="#fff" stroke="#3a2478" strokeWidth="2" /><circle cx="300" cy="160" r="9" fill="#fff" stroke="#3a2478" strokeWidth="2" />
        <circle cx="262" cy="162" r="4.5" fill="#2b2140" /><circle cx="298" cy="162" r="4.5" fill="#2b2140" />
        <circle cx="260" cy="160" r="15" fill="transparent" /><circle cx="300" cy="160" r="15" fill="transparent" />
      </g>
      <g {...hit("nak")}><ellipse cx="280" cy="182" rx="7" ry="9" fill="#f0a77a" /><circle cx="280" cy="182" r="14" fill="transparent" /></g>
      <g {...hit("mukh")}><path d="M262 204 Q280 222 298 204" stroke="#c0392b" strokeWidth="5" strokeLinecap="round" fill="none" /><rect x="256" y="196" width="48" height="30" fill="transparent" /></g>
      {/* hat (not clickable) */}
      <g style={{ pointerEvents: "none" }}>
        <polygon points="222,122 338,122 298,18" fill="#5b34b5" /><ellipse cx="280" cy="124" rx="84" ry="14" fill="#4a2a9a" />
        <text x="288" y="86" fontSize="26" textAnchor="middle" fill="#ffd54a">★</text>
      </g>
      {/* labels */}
      {parts.map((p) => {
        const show = labels || sel === p.key;
        if (!show) return null;
        const x = p.side === "L" ? 118 : 442;
        const tx = p.side === "L" ? 8 : 450;
        return (
          <g key={p.key} style={{ pointerEvents: "none" }}>
            <line x1={p.anchor[0]} y1={p.anchor[1]} x2={x} y2={p.labelY + 14} stroke="#ffd54a" strokeWidth="2" strokeDasharray="5 4" />
            <circle cx={p.anchor[0]} cy={p.anchor[1]} r="4" fill="#ffd54a" />
            <text x={tx} y={p.labelY + 10} fontSize="20" fontWeight="700" fill="#fff" fontFamily="var(--font-bn)">{p.bn}</text>
            {showRo && <text x={tx} y={p.labelY + 28} fontSize="13" fill="#ffd54a">{p.ro}</text>}
            {showEn && <text x={tx} y={p.labelY + (showRo ? 43 : 28)} fontSize="12" fill="#bfb3e6">{p.en}</text>}
          </g>
        );
      })}
    </svg>
  );
}

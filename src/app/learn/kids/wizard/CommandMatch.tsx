"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { recordKidsSession } from "../../../actions";
import { attempt, isDone, isMatched, newRound, type MatchState } from "@/lib/match-game";
import { speak } from "@/lib/speak";
import { GameButton, Toggle, useShowText } from "./Wizard";
import "./wizard.css";
import "./commands.css";

export type Command = { id: string; bn: string; ro: string; en: string; alt: string; image: string; audio: string };

const DRAG_START = 8; // pixels before a press becomes a drag (below that it is a tap, which selects the picture)
const ROUND_SIZES = [3, 5, 10];

// ---- sound: a short chime when right, a soft low note when wrong (made with the browser, so there is no file to load)
let ctx: AudioContext | null = null;
function tone(freqs: number[], dur: number, type: OscillatorType = "sine", gain = 0.16) {
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const t0 = ctx.currentTime;
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + i * dur); g.gain.exponentialRampToValueAtTime(gain, t0 + i * dur + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + (i + 1) * dur);
      o.connect(g).connect(ctx!.destination); o.start(t0 + i * dur); o.stop(t0 + (i + 1) * dur + 0.02);
    });
  } catch { /* no sound available: the game still works */ }
}
const chime = () => tone([660, 880, 1175], 0.11);
const nope = () => tone([220, 180], 0.12, "triangle", 0.1);

// ---- the spoken command: the tutor's recording when there is one, otherwise the app's Bengali voice
const missingAudio = new Set<string>();
let playing: HTMLAudioElement | null = null;
function say(cmd: Command) {
  if (typeof window === "undefined") return;
  playing?.pause();
  if (missingAudio.has(cmd.audio)) return speak(cmd.bn);
  const a = new Audio(cmd.audio);
  playing = a;
  const fallback = () => { missingAudio.add(cmd.audio); speak(cmd.bn); };
  a.addEventListener("error", fallback, { once: true });
  a.play().catch(() => { /* a missing file raises the error event above; a blocked play does nothing */ });
}

type Drag = { id: string; pointerId: number; sx: number; sy: number; dx: number; dy: number; moving: boolean };

export default function CommandMatch({ commands }: { commands: Command[] }) {
  const byId = useMemo(() => new Map(commands.map((c) => [c.id, c])), [commands]);
  const allIds = useMemo(() => commands.map((c) => c.id), [commands]);
  const { showEn, setShowEn, showRo, setShowRo } = useShowText();

  const [size, setSize] = useState(Math.min(5, commands.length));
  const [game, setGame] = useState<MatchState | null>(null); // made after mount, so the server and browser agree
  const [listen, setListen] = useState(false);
  const [sound, setSound] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [hot, setHot] = useState<string | null>(null);     // the box under a dragged picture
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [note, setNote] = useState("");                    // for screen readers
  const [celebrate, setCelebrate] = useState(false);

  const gameRef = useRef<MatchState | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const savedRound = useRef(false);

  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const setGameBoth = (g: MatchState | null) => { gameRef.current = g; setGame(g); };
  const setDragBoth = (d: Drag | null) => { dragRef.current = d; setDrag(d); };

  /** Start a new round and clear everything that belongs to the old one: a drag in progress, a selection, timers. */
  const startRound = useCallback((n: number) => {
    clearTimers();
    setDragBoth(null); setSelected(null); setShake(null); setHot(null); setCelebrate(false); setNote("");
    suppressClick.current = false; savedRound.current = false;
    setGameBoth(newRound(allIds, n));
  }, [allIds]);

  useEffect(() => { startRound(size); return clearTimers; /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  // load the pictures of the round ahead of time, so a card never pops in while it is dragged
  useEffect(() => {
    game?.ids.forEach((id) => { const img = new Image(); img.src = byId.get(id)!.image; });
  }, [game?.ids, byId]);

  // a drag must never get stuck: cancel it if the window loses focus, or Escape is pressed
  useEffect(() => {
    const stop = () => setDragBoth(null);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { stop(); setSelected(null); } };
    window.addEventListener("blur", stop); window.addEventListener("keydown", key);
    return () => { window.removeEventListener("blur", stop); window.removeEventListener("keydown", key); };
  }, []);

  /** The one place a match is tried, from a drop or from a click. Reads the latest state, so a double drop is harmless. */
  function place(cardId: string, boxId: string) {
    const g = gameRef.current;
    if (!g) return;
    const res = attempt(g, cardId, boxId);
    if (res.outcome === "ignored") return;
    setGameBoth(res.state);
    setSelected(null);
    const cmd = byId.get(cardId)!;
    if (res.outcome === "correct") {
      if (sound) chime();
      say(cmd);
      setNote(`Correct. ${cmd.en}.`);
      if (isDone(res.state)) {
        later(() => setCelebrate(true), 700);
        if (res.state.ids.length >= 5 && !savedRound.current) { savedRound.current = true; void recordKidsSession("commands", res.state.ids.length); }
      }
    } else {
      if (sound) nope();
      setNote("Not that one. Try again.");
      setShake(cardId);
      later(() => setShake((s) => (s === cardId ? null : s)), 500);
    }
  }

  // ---- pointer events: one code path for mouse, touch and pen
  function onDown(e: React.PointerEvent<HTMLButtonElement>, id: string) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (dragRef.current || !gameRef.current || isMatched(gameRef.current, id)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragBoth({ id, pointerId: e.pointerId, sx: e.clientX, sy: e.clientY, dx: 0, dy: 0, moving: false });
  }
  function boxAt(x: number, y: number): string | null {
    for (const el of document.elementsFromPoint(x, y)) {
      const box = (el as HTMLElement).closest?.("[data-box]") as HTMLElement | null;
      if (box) return box.dataset.box ?? null;
    }
    return null;
  }
  function onMove(e: React.PointerEvent<HTMLButtonElement>) {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    const moving = d.moving || Math.hypot(dx, dy) > DRAG_START;
    setDragBoth({ ...d, dx, dy, moving });
    if (moving) setHot(boxAt(e.clientX, e.clientY));
  }
  function onUp(e: React.PointerEvent<HTMLButtonElement>) {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    setDragBoth(null); setHot(null);
    if (!d.moving) return; // a tap: the click handler selects the picture
    suppressClick.current = true; later(() => { suppressClick.current = false; }, 0);
    const box = boxAt(e.clientX, e.clientY);
    if (box) place(d.id, box);
    else { setShake(d.id); later(() => setShake((s) => (s === d.id ? null : s)), 500); } // dropped on nothing: it slides back
  }
  const onCancel = () => { setDragBoth(null); setHot(null); };

  // ---- click to select, click to place (also what keyboard users get)
  function onCardClick(id: string) {
    if (suppressClick.current || !game || isMatched(game, id)) return;
    setSelected((s) => (s === id ? null : id));
    setNote(selected === id ? "Picture put down." : `Picture picked up: ${byId.get(id)!.alt}. Now choose a word box.`);
  }
  function onBoxClick(id: string) {
    if (selected) place(selected, id);
  }

  if (!game) return <div className="wiz cm"><p className="wz-lede">Getting the cards ready…</p></div>;

  const total = game.ids.length, score = game.matched.length;
  const cardImg = (id: string) => {
    const c = byId.get(id)!;
    return missing.has(id)
      ? <span className="cm-ph" aria-hidden>Picture</span>
      // eslint-disable-next-line @next/next/no-img-element
      : <img src={c.image} alt={c.alt} draggable={false} onError={() => setMissing((m) => new Set(m).add(id))} />;
  };

  return (
    <div className="wiz cm">
      <div className="wiz-head">
        <div>
          <a className="wiz-back" href="/learn/kids/games">← Spell School</a>
          <h1>Drag &amp; Match <small lang="bn">আদেশ মেলাও</small></h1>
          <p className="wz-lede">Drag each picture onto its Bengali command. Or tap a picture, then tap the box. Tap 🔊 to hear a word.</p>
        </div>
        <p className="cm-score" aria-live="polite"><b>{score}</b> of {total}</p>
      </div>

      <div className="cm-controls">
        <div className="cm-sizes" role="group" aria-label="Round size">
          {ROUND_SIZES.filter((n) => n <= commands.length).map((n) => (
            <button key={n} type="button" className="wz-tab" aria-pressed={size === n} onClick={() => { setSize(n); startRound(n); }}>{n} cards</button>
          ))}
        </div>
        <GameButton kind="primary" onClick={() => startRound(size)}>New round</GameButton>
        <div className="wz-toggles">
          <Toggle label="👂 Listen mode (hide the words)" checked={listen} onChange={setListen} />
          <Toggle label="Show English" checked={showEn} onChange={setShowEn} />
          <Toggle label="Show romanization" checked={showRo} onChange={setShowRo} />
          <Toggle label="Sounds" checked={sound} onChange={setSound} />
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{note}</p>

      <div className="cm-board">
        <section className="cm-tray" aria-label="Pictures">
          {game.cardOrder.map((id) => {
            const matched = isMatched(game, id);
            const d = drag?.id === id ? drag : null;
            return (
              <div key={id} className="cm-slot">
                {matched ? null : (
                  <button
                    type="button"
                    className={"cm-card" + (selected === id ? " selected" : "") + (d?.moving ? " dragging" : "") + (shake === id ? " cm-shake" : "")}
                    style={d?.moving ? { transform: `translate(${d.dx}px, ${d.dy}px) scale(1.06)` } : undefined}
                    aria-label={`Picture: ${byId.get(id)!.alt}${selected === id ? " (picked up)" : ""}. Press Enter to pick it up, then choose a word box.`}
                    aria-pressed={selected === id}
                    onPointerDown={(e) => onDown(e, id)} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onCancel} onLostPointerCapture={onCancel}
                    onClick={() => onCardClick(id)}
                  >{cardImg(id)}</button>
                )}
              </div>
            );
          })}
        </section>

        <section className="cm-boxes" aria-label="Bengali commands">
          {game.boxOrder.map((id, i) => {
            const c = byId.get(id)!, matched = isMatched(game, id);
            const hidden = listen && !matched;
            return (
              <div key={id} data-box={id} className={"cm-box" + (matched ? " matched" : "") + (hot === id ? " hot" : "") + (selected && !matched ? " ready" : "")}>
                <button type="button" className="cm-hear" aria-label={hidden ? `Hear word ${i + 1}` : `Hear ${c.en}`} onClick={() => say(c)}>🔊</button>
                <button type="button" className="cm-drop" onClick={() => onBoxClick(id)} disabled={matched}
                  aria-label={matched ? `${c.en}: matched` : hidden ? `Word ${i + 1}. Put the picked-up picture here` : `${c.bn}, ${c.en}. Put the picked-up picture here`}>
                  {matched ? <span className="cm-placed">{cardImg(id)}</span> : null}
                  {hidden ? <span className="cm-q" aria-hidden>?</span> : (
                    <span className="cm-word">
                      <span className="cm-bn" lang="bn">{c.bn}</span>
                      {showRo && <span className="cm-ro">{c.ro}</span>}
                      {showEn && <span className="cm-en">{c.en}</span>}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </section>
      </div>

      {celebrate && (
        <div className="wz-celebrate" role="dialog" aria-label="Round complete">
          <div className="wz-confetti" aria-hidden>{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.18}s`, background: ["#ffd54a", "#7cf29a", "#ff8ac8", "#8ad4ff"][i % 4] }} />)}</div>
          <div className="wz-celebrate-box">
            <p className="wz-celebrate-bn" lang="bn">শাবাশ!</p>
            <p className="wz-celebrate-ro">shabash!</p>
            <p className="wz-celebrate-en">All {total} matched.</p>
            <GameButton kind="primary" onClick={() => startRound(size)}>New round</GameButton>
            <GameButton kind="ghost" onClick={() => setCelebrate(false)}>Look at the board</GameButton>
          </div>
        </div>
      )}
    </div>
  );
}

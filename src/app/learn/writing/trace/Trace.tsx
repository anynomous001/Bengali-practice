"use client";

import { useEffect, useRef, useState } from "react";
import { recordWriting } from "../../../actions";
import { useRoman } from "../../Roman";
import Icon from "../../Icon";
import { speak } from "@/lib/speak";
import { VOWEL_STEPS } from "@/data/vowel-steps";
import { CONSONANT_STEPS } from "@/data/consonant-steps";
import { NUMERAL_STEPS } from "@/data/numeral-steps";
import StepPictures from "./StepPictures";

const SIZE = 400;
const PEN = 9;
const ERASER = 30;
/** One thing to practice writing: a letter, or a consonant with a vowel sign. */
export type TraceItem = {
  /** What is recorded in the practice count. */
  id: string;
  /** The faint shape drawn behind the pad. */
  guide: string;
  /** Short label for the grid tile. */
  tile: string;
  rom: string;
  group: string;
  /** What to say aloud for the sound button. Defaults to the guide. */
  say?: string;
  /** Extra line under the pad, for example the name of a vowel sign. */
  note?: string;
  /** Guide size as a share of the pad; longer shapes need less. Defaults to the page's value. */
  scale?: number;
};
type Pt = { x: number; y: number };
/** One pen or eraser stroke, kept only in memory so Undo can redraw the pad. Nothing here is saved or sent. */
type Stroke = { erase: boolean; pts: Pt[] };

function segment(ctx: CanvasRenderingContext2D, s: Stroke, i: number) {
  ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
  ctx.lineWidth = s.erase ? ERASER : PEN;
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.beginPath();
  const from = s.pts[Math.max(0, i - 1)];
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(s.pts[i].x + 0.01, s.pts[i].y);
  ctx.stroke();
  ctx.globalCompositeOperation = "source-over";
}

export default function Trace({
  initialCounts,
  items: ITEMS,
  groups: GROUPS,
  noun = "Letter",
  intro = "Trace the faint letter with your finger, a pen or the mouse.",
  scale = 0.62,
}: {
  initialCounts: Record<string, number>;
  items: TraceItem[];
  groups: { id: string; title: string }[];
  noun?: string;
  intro?: string;
  scale?: number;
}) {
  const { roman } = useRoman();
  const [counts, setCounts] = useState(initialCounts);
  const [sel, setSel] = useState(ITEMS[0].id);
  const [guide, setGuide] = useState(true);
  const guideRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const live = useRef<Stroke | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [inked, setInked] = useState(false);
  const item = ITEMS.find((l) => l.id === sel)!;
  const steps = VOWEL_STEPS[item.id] ?? CONSONANT_STEPS[item.id] ?? NUMERAL_STEPS[item.id];

  // Both canvases are sized for the device pixel ratio so strokes stay sharp.
  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    for (const c of [guideRef.current, drawRef.current]) {
      if (!c) continue;
      c.width = SIZE * dpr;
      c.height = SIZE * dpr;
      c.getContext("2d")!.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    const c = guideRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = "rgba(128,128,128,.35)";
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(0.5, 0.5, SIZE - 1, SIZE - 1);
    ctx.beginPath(); ctx.moveTo(0, SIZE / 2); ctx.lineTo(SIZE, SIZE / 2); ctx.moveTo(SIZE / 2, 0); ctx.lineTo(SIZE / 2, SIZE); ctx.stroke();
    ctx.setLineDash([]);
    if (guide) {
      ctx.fillStyle = "rgba(192,57,43,.22)";
      const family = getComputedStyle(document.documentElement).getPropertyValue("--font-bn").trim() || '"Noto Sans Bengali", "Nirmala UI", sans-serif';
      ctx.font = `${SIZE * (item.scale ?? scale)}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.guide, SIZE / 2, SIZE / 2);
    }
  }, [item, guide, scale]);

  function redraw() {
    const c = drawRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = getComputedStyle(c).color;
    for (const st of strokes.current) for (let i = 0; i < st.pts.length; i++) segment(ctx, st, i);
  }
  const clear = () => { strokes.current = []; live.current = null; setInked(false); redraw(); };
  const undo = () => { strokes.current.pop(); setInked(strokes.current.length > 0); redraw(); };
  useEffect(clear, [sel]); // eslint-disable-line react-hooks/exhaustive-deps

  function pos(e: { clientX: number; clientY: number; currentTarget: HTMLCanvasElement }): Pt {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    live.current = { erase: tool === "eraser", pts: [] };
    add(e, [e.nativeEvent]);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!live.current) return;
    const batch = e.nativeEvent.getCoalescedEvents?.();
    add(e, batch && batch.length ? batch : [e.nativeEvent]);
  }
  function add(e: React.PointerEvent<HTMLCanvasElement>, evs: PointerEvent[]) {
    const st = live.current;
    if (!st) return;
    const ctx = e.currentTarget.getContext("2d")!;
    ctx.strokeStyle = getComputedStyle(e.currentTarget).color;
    for (const ev of evs) {
      st.pts.push(pos({ clientX: ev.clientX, clientY: ev.clientY, currentTarget: e.currentTarget }));
      segment(ctx, st, st.pts.length - 1);
    }
  }
  function up() {
    const st = live.current;
    live.current = null;
    if (st && st.pts.length) { strokes.current.push(st); setInked(true); }
  }

  function done() {
    setCounts((c) => ({ ...c, [sel]: (c[sel] ?? 0) + 1 }));
    void recordWriting(sel);
    const i = ITEMS.findIndex((l) => l.id === sel);
    setSel(ITEMS[(i + 1) % ITEMS.length].id);
  }

  return (
    <>
      <p className="muted">{intro} Use the eraser or undo if you slip. When you are happy with it, tap “I&apos;m done”. Nothing you draw is saved: only how many times you practiced each one.</p>
      <p className="trace-now">{noun} <b lang="bn">{item.guide}</b>{roman && ` (${item.rom})`}{counts[sel] ? ` · practiced ${counts[sel]}×` : ""}{item.note && <><br /><span className="muted">{item.note}</span></>}</p>
      <p className="trace-hear"><button type="button" className="btn small ghost" onClick={() => speak(item.say ?? item.guide)}><Icon name="sound" size={16} /> Hear it</button></p>
      <div className="trace-box">
        <canvas ref={guideRef} className="trace-canvas" aria-hidden />
        <canvas
          ref={drawRef}
          className="trace-canvas draw"
          role="img"
          aria-label={`Drawing area for ${item.guide}. Draw with a finger, a pen or the mouse.`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <div className="trace-tools" role="group" aria-label="Drawing tools">
        <button type="button" className="btn ghost small" aria-pressed={tool === "pen"} onClick={() => setTool("pen")}>Pen</button>
        <button type="button" className="btn ghost small" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")}>Eraser</button>
        <button type="button" className="btn ghost small" onClick={undo} disabled={!inked}>Undo</button>
        <button type="button" className="btn ghost small" onClick={clear} disabled={!inked}>Clear</button>
        <button type="button" className="btn ghost small" onClick={() => setGuide((g) => !g)}>{guide ? "Hide letter" : "Show letter"}</button>
      </div>
      {steps && (
        <section>
          <h2 className="steps-h">How to write it</h2>
          <p className="muted steps-note">Draw the main shapes from the top down. The little flicks come last, drawn from the bottom up. The new part in each step is in color.</p>
          <StepPictures steps={steps} label={item.guide} />
        </section>
      )}
      <button className="btn trace-done" onClick={done}>I&apos;m done · next {noun.toLowerCase()}</button>
      {GROUPS.map((g) => (
        <section key={g.id}>
          <h2>{g.title}</h2>
          <div className="grid">
            {ITEMS.filter((l) => l.group === g.id).map((l) => (
              <button key={l.id} className={"tile" + (counts[l.id] ? " done" : "") + (l.id === sel ? " current" : "")} onClick={() => setSel(l.id)}>
                <span className="ch">{l.tile}</span>
                <span className="rom">{counts[l.id] ? `${counts[l.id]}×` : roman ? l.rom : ""}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

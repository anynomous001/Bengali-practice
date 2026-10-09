"use client";

import { useEffect, useRef, useState } from "react";
import type { Letter } from "@/data/letters";
import { recordWriting } from "../../../actions";

const SIZE = 320;

export default function Trace({
  initialCounts,
  letters: LETTERS,
  groups: GROUPS,
}: {
  initialCounts: Record<string, number>;
  letters: Letter[];
  groups: { id: string; title: string }[];
}) {
  const [counts, setCounts] = useState(initialCounts);
  const [sel, setSel] = useState(LETTERS[0].ch);
  const [guide, setGuide] = useState(true);
  const guideRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const letter = LETTERS.find((l) => l.ch === sel)!;

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
      ctx.font = `${SIZE * 0.62}px "Noto Sans Bengali", "Nirmala UI", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sel, SIZE / 2, SIZE / 2);
    }
  }, [sel, guide]);

  const clear = () => drawRef.current?.getContext("2d")!.clearRect(0, 0, SIZE, SIZE);
  useEffect(clear, [sel]);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    last.current = pos(e);
    move(e);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!last.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = getComputedStyle(e.currentTarget).color;
    ctx.lineWidth = 9;
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
    last.current = p;
  }
  const up = () => { last.current = null; };

  function done() {
    setCounts((c) => ({ ...c, [sel]: (c[sel] ?? 0) + 1 }));
    void recordWriting(sel);
    clear();
    const i = LETTERS.findIndex((l) => l.ch === sel);
    setSel(LETTERS[(i + 1) % LETTERS.length].ch);
  }

  return (
    <>
      <p className="muted">Trace the faint letter with your finger or mouse. Then tap “I wrote it”. Tracing counts for practice only; you judge your own writing.</p>
      <div className="trace-box">
        <canvas ref={guideRef} className="trace-canvas" />
        <canvas ref={drawRef} className="trace-canvas draw" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
      </div>
      <p>Letter <b>{sel}</b> ({letter.rom}){counts[sel] ? ` · written ${counts[sel]}×` : ""}</p>
      <button className="btn" onClick={done}>I wrote it ✓</button>
      <button className="btn ghost" onClick={clear}>Clear</button>
      <button className="btn ghost" onClick={() => setGuide((g) => !g)}>{guide ? "Hide guide" : "Show guide"}</button>
      {GROUPS.map((g) => (
        <section key={g.id}>
          <h2>{g.title}</h2>
          <div className="grid">
            {LETTERS.filter((l) => l.group === g.id).map((l) => (
              <button key={l.ch} className={"tile" + (counts[l.ch] ? " done" : "") + (l.ch === sel ? " current" : "")} onClick={() => setSel(l.ch)}>
                <span className="ch">{l.ch}</span>
                <span className="rom">{counts[l.ch] ? `✓ ${counts[l.ch]}×` : l.rom}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

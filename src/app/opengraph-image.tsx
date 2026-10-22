import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Bengali Practice: learn to read, speak and write Bengali online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Subsets of the fonts, kept next to this file, so the image never depends on a network fetch at build time.
const font = async (name: string) => { const b = await readFile(join(process.cwd(), "src/app/fonts", name)); return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer; };

const TILES: { ch: string; bg: string; rot: number }[] = [
  { ch: "ক", bg: "#6fe0d4", rot: -7 },
  { ch: "আ", bg: "#aab0ff", rot: 6 },
  { ch: "৫", bg: "#ffe0a0", rot: 5 },
  { ch: "কি", bg: "#f8b46b", rot: -6 },
];

export default async function Image() {
  const [bn, bold, medium] = await Promise.all([font("noto-serif-bengali-600-og.ttf"), font("inter-700-og.otf"), font("inter-500-og.otf")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 80px",
          background: "radial-gradient(760px 460px at 85% 0%, rgba(120,140,255,.38), transparent 62%), radial-gradient(640px 380px at 0% 100%, rgba(216,52,79,.22), transparent 62%), #0f1538",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Inter", fontWeight: 500, fontSize: 26, color: "#a3acd0" }}>
            <span style={{ fontFamily: "Noto Serif Bengali", fontSize: 40, color: "#ffe0a0", marginRight: 14, display: "flex" }}>বাংলা</span> Bengali Practice
          </div>
          <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 86, lineHeight: 1.04, color: "#ffffff", marginTop: 26, display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex" }}>Learn Bengali</span>
            <span style={{ display: "flex", color: "#ffe0a0" }}>online.</span>
          </div>
          <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 30, lineHeight: 1.35, color: "#c9cfe8", marginTop: 26, display: "flex" }}>
            Read, speak and write Bengali with short daily lessons from a Kolkata teacher.
          </div>
          <div style={{ display: "flex", marginTop: 34, fontFamily: "Inter", fontWeight: 700, fontSize: 24, color: "#0f1538" }}>
            {["Reading", "Speaking", "Writing", "Grammar"].map((t) => (
              <span key={t} style={{ display: "flex", background: "#ffffff", borderRadius: 999, padding: "9px 20px", marginRight: 12 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: 400, justifyContent: "center" }}>
          {TILES.map((t) => (
            <div
              key={t.ch}
              style={{
                width: 180, height: 180, margin: 10, borderRadius: 44, background: t.bg, color: "#0f1538", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Noto Serif Bengali", fontSize: 104, transform: `rotate(${t.rot}deg)`, boxShadow: "0 24px 40px rgba(0,0,0,.45)",
              }}
            >
              {t.ch}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Serif Bengali", data: bn, weight: 600, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}

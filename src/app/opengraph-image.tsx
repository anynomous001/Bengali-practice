import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Bengali Practice: Learn Bengali online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Small subsets of the fonts, kept next to this file, so the image never depends on a network fetch at build time.
const font = (name: string) => readFile(join(process.cwd(), "src/app/fonts", name));

export default async function Image() {
  const [bn, latin] = await Promise.all([font("noto-serif-bengali-700.ttf"), font("plus-jakarta-sans-600.ttf")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(700px 420px at 100% 0%, rgba(120,140,255,.35), transparent 60%), radial-gradient(700px 420px at 0% 100%, rgba(216,52,79,.22), transparent 60%), #0f1538",
        }}
      >
        <div style={{ fontFamily: "Noto Serif Bengali", fontSize: 280, lineHeight: 1.2, color: "#ffe0a0", display: "flex" }}>বাংলা</div>
        <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: 48, color: "#ffffff", marginTop: 8, display: "flex" }}>Bengali Practice · Learn Bengali online</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Serif Bengali", data: bn.buffer.slice(bn.byteOffset, bn.byteOffset + bn.byteLength) as ArrayBuffer, weight: 700, style: "normal" },
        { name: "Plus Jakarta Sans", data: latin.buffer.slice(latin.byteOffset, latin.byteOffset + latin.byteLength) as ArrayBuffer, weight: 600, style: "normal" },
      ],
    },
  );
}

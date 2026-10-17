/**
 * Shapes a few Bengali strings with HarfBuzz and writes their glyph outlines to src/data/glyph-paths.json.
 * Real shaping matters: vowel signs like ি are drawn before the consonant and conjuncts join, which a plain
 * font parser would get wrong. Run with `npm run glyphs`. The font is only used here, at build time; it is
 * downloaded once into node_modules/.cache and is not committed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import * as hb from "harfbuzzjs";

// The night-band Bengali is set in Noto Serif Bengali at weight 600 (see --font-bn-serif and .tq-bn in globals.css).
const WEIGHT = 600;
const CACHE = join(process.cwd(), "node_modules/.cache/glyphs", `NotoSerifBengali-${WEIGHT}.ttf`);
const OUT = join(process.cwd(), "src/data/glyph-paths.json");
const OLD_BROWSER = "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

// Keep this list in step with what the landing page shows.
const STRINGS = ["ক", "জল", "৫", "আমি বাংলা শিখছি।", "ক", "কা", "কি", "কী", "কু", "কে", "কো"];

async function loadFont(): Promise<ArrayBuffer> {
  if (!existsSync(CACHE)) {
    // Google Fonts hands an old browser a plain static TTF for one weight, which is what HarfBuzz needs.
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@${WEIGHT}`, { headers: { "User-Agent": OLD_BROWSER } })).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error("Could not find the font file in the Google Fonts response");
    mkdirSync(dirname(CACHE), { recursive: true });
    writeFileSync(CACHE, Buffer.from(await (await fetch(url)).arrayBuffer()));
  }
  const buf = readFileSync(CACHE);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

/** Reads the absolute coordinates out of an SVG path made of M L Q C Z commands. */
function points(d: string): { x: number; y: number; on: boolean }[] {
  const out: { x: number; y: number; on: boolean }[] = [];
  for (const m of d.matchAll(/([MLQCZ])([^MLQCZ]*)/g)) {
    const n = m[2].trim().split(/[\s,]+/).filter(Boolean).map(Number);
    if (m[1] === "M" || m[1] === "L") out.push({ x: n[0], y: n[1], on: true });
    if (m[1] === "Q") { out.push({ x: n[0], y: n[1], on: false }, { x: n[2], y: n[3], on: true }); }
    if (m[1] === "C") { out.push({ x: n[0], y: n[1], on: false }, { x: n[2], y: n[3], on: false }, { x: n[4], y: n[5], on: true }); }
  }
  return out;
}

async function main() {
  const font = new hb.Font(new hb.Face(new hb.Blob(await loadFont())));
  const upem = font.face.upem;

  function shape(text: string) {
    const buf = new hb.Buffer();
    buf.addText(text);
    buf.guessSegmentProperties();
    hb.shape(font, buf);
    const infos = buf.getGlyphInfos();
    const pos = buf.getGlyphPositions();
    let pen = 0, yTop = -Infinity, yBottom = Infinity;
    const glyphs = infos.map((info, i) => {
      const d = font.glyphToPath(info.codepoint);
      const x = pen + pos[i].xOffset, y = pos[i].yOffset;
      for (const p of points(d)) { yTop = Math.max(yTop, p.y + y); yBottom = Math.min(yBottom, p.y + y); }
      pen += pos[i].xAdvance;
      return { d, x, y, adv: pos[i].xAdvance, cl: info.cluster };
    });
    return { upem, width: pen, yTop, yBottom, glyphs };
  }

  // The headline bar (মাত্রা): the flat band across the top of ক. Its centre is where an overlay line sits.
  const kaGlyph = shape("ক").glyphs[0];
  const kaPts = points(kaGlyph.d);
  const top = Math.max(...kaPts.map((p) => p.y));
  // distinct y levels of on-curve points just under the top: the first one below it is the underside of the bar
  const levels = [...new Set(kaPts.filter((p) => p.on).map((p) => Math.round(p.y)))].sort((a, b) => b - a);
  const under = levels.find((y) => y < top - 5 && y > top - 0.14 * upem);
  const thickness = under !== undefined ? top - under : 0.055 * upem;
  const barY = top - thickness / 2;

  const result: Record<string, ReturnType<typeof shape> & { barY: number; barThickness: number }> = {};
  for (const s of STRINGS) result[s] = { ...shape(s), barY, barThickness: thickness };
  writeFileSync(OUT, JSON.stringify({ font: `Noto Serif Bengali ${WEIGHT}`, upem, barY, barThickness: thickness, strings: result }));
  console.log(`wrote ${OUT}: ${Object.keys(result).length} strings, upem ${upem}, bar y ${Math.round(barY)} (thickness ${Math.round(thickness)})`);
  for (const [s, r] of Object.entries(result)) console.log(`${s}\t${r.glyphs.length} glyphs\tclusters ${[...new Set(r.glyphs.map((g) => g.cl))].join(",")}`);
}
main();

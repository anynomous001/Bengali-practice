import raw from "@/data/glyph-paths.json";

/** One glyph of a shaped string: its outline (font units, y up), where it sits, and which cluster it belongs to. */
export type ShapedGlyph = { d: string; x: number; y: number; adv: number; cl: number };
export type Shaped = { upem: number; width: number; yTop: number; yBottom: number; glyphs: ShapedGlyph[]; barY: number; barThickness: number };

/** Strings shaped at build time with HarfBuzz by `npm run glyphs`. */
export const SHAPED = raw.strings as unknown as Record<string, Shaped>;

// Pictures for the kids' lessons. A picture is a colour swatch, a part of the body on the child figure, or a photo file.
// The child figure is public/kids/body-boy.webp (971 x 1619). Shapes are in that picture's own coordinates.
export type PicSpec =
  | { kind: "swatch"; hex: string }
  | { kind: "body"; key: string }
  | { kind: "photo"; src: string };

export type Shape = { t: "e"; cx: number; cy: number; rx: number; ry: number } | { t: "p"; d: string };
export type BodyArea = { shapes: Shape[]; zoom: [number, number, number, number] };

const e = (cx: number, cy: number, rx: number, ry: number): Shape => ({ t: "e", cx, cy, rx, ry });
const p = (d: string): Shape => ({ t: "p", d });

export const BODY_SIZE = { w: 971, h: 1619 };
export const BODY_AREAS: Record<string, BodyArea> = {
  matha: { shapes: [e(470, 200, 190, 205)], zoom: [210, 0, 520, 470] },
  chul: { shapes: [e(470, 92, 182, 96)], zoom: [210, 0, 520, 470] },
  chokh: { shapes: [e(418, 228, 52, 34), e(520, 222, 52, 34)], zoom: [310, 140, 320, 170] },
  nak: { shapes: [e(478, 268, 30, 36)], zoom: [380, 180, 200, 180] },
  kan: { shapes: [e(350, 268, 34, 52), e(594, 252, 32, 52)], zoom: [270, 170, 380, 200] },
  mukh: { shapes: [e(478, 304, 58, 32)], zoom: [380, 240, 200, 130] },
  gola: { shapes: [e(478, 402, 60, 36)], zoom: [340, 320, 280, 190] },
  kandh: { shapes: [e(305, 470, 62, 46), e(662, 470, 62, 46)], zoom: [210, 370, 560, 220] },
  hat: { shapes: [p("M270 620 L340 650 L302 880 L264 1030 L190 990 L222 870 Z"), p("M702 620 L632 650 L670 880 L708 1030 L782 990 L750 870 Z")], zoom: [150, 590, 680, 480] },
  pet: { shapes: [e(482, 715, 125, 115)], zoom: [290, 570, 390, 300] },
  hantu: { shapes: [e(395, 1185, 66, 52), e(585, 1190, 66, 52)], zoom: [290, 1070, 400, 240] },
  pa: { shapes: [e(396, 1270, 62, 150), e(580, 1270, 62, 150), e(340, 1505, 100, 95), e(632, 1500, 95, 95)], zoom: [220, 1100, 540, 519] },
};

/** The part of the shape list as SVG-ready props. */
export const shapePath = (s: Shape) => (s.t === "p" ? s.d : "");

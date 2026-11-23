// Settings for the Kitchen Bengali activities. This file holds no Bengali: every Bengali word comes from content.ts.

/** The speed choices and the speech rate each one uses. */
export const SPEEDS = [
  { id: "slow", label: "Slow", rate: 0.6 },
  { id: "normal", label: "Normal", rate: 0.8 },
  { id: "fast", label: "Faster", rate: 1.0 },
] as const;
export type SpeedId = (typeof SPEEDS)[number]["id"];
export const DEFAULT_SPEED: SpeedId = "normal";

/** English plural for each measure, used only when the number is not one. */
export const MEASURE_PLURAL: Record<string, string> = {
  spoon: "spoons", cup: "cups", gram: "grams", kilo: "kilos", litre: "litres", piece: "pieces", handful: "handfuls", pinch: "pinches",
};

/** The picture for each warning sentence in section 1.3, in the same order as content.ts. Icons are Phosphor names, with an optional badge. */
export const WARNING_PICTURES: { icon: string; badge?: string; alt: string }[] = [
  { icon: "Footprints", badge: "Warning", alt: "Footprints on a slippery floor" },
  { icon: "Drop", alt: "A wet floor" },
  { icon: "CookingPot", badge: "Fire", alt: "A hot pan" },
  { icon: "Fire", badge: "Hand", alt: "A hand near the fire" },
  { icon: "Drop", badge: "Fire", alt: "Hot oil splashing" },
  { icon: "Knife", alt: "A sharp knife" },
  { icon: "Knife", badge: "Prohibit", alt: "A knife pointing at you, not allowed" },
  { icon: "Wine", badge: "Warning", alt: "A broken glass" },
  { icon: "Fire", badge: "Power", alt: "The gas, to turn off" },
  { icon: "Package", badge: "Prohibit", alt: "A heavy box, not to lift alone" },
];

/** Plain English labels for the screens. */
export const LABELS = {
  journey: "Kitchen Bengali",
  speed: "Speed",
  tapToHear: "Tap a card to hear it and see the English.",
};

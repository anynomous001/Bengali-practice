// Content for the three kids' wizard games. Server-only, like the other content files: pages resolve it with `resolveRo`
// and pass it to the client. Romanization is taken from the vocabulary record when the word already exists there.
import { VOCAB } from "./vocabulary";

export type BodyPart = { key: string; bn: string; ro: string; en: string; gesture: string; anchor: [number, number]; side: "L" | "R"; labelY: number };
export type BodyCommand = { bn: string; ro: string; en: string; part: string | null };
export type PotionColour = { bn: string; ro: string; en: string; hex: string; textOn: string };
export type Creature = { key: string; pic: string; bn: string; ro: string; en: string; fun: string; /** A real photo, filled in by the page when public/kids/photo/animals-<key>.webp exists. */ photo?: string };

// Body part labels sit left or right of the figure; anchor and labelY are in the figure's own coordinates: the picture is 971 x 1619 (see BodyCheck.tsx).
export const BODY_PARTS: BodyPart[] = [
  { key: "matha", bn: "মাথা", ro: "matha", en: "head", gesture: "pat your head", anchor: [600, 70], side: "R", labelY: 20 },
  { key: "chokh", bn: "চোখ", ro: "chokh", en: "eye(s)", gesture: "point at your eyes", anchor: [420, 228], side: "L", labelY: 110 },
  { key: "nak", bn: "নাক", ro: "nak", en: "nose", gesture: "tap your nose", anchor: [470, 270], side: "L", labelY: 300 },
  { key: "kan", bn: "কান", ro: "kan", en: "ear", gesture: "pull your ear gently", anchor: [596, 252], side: "R", labelY: 200 },
  { key: "mukh", bn: "মুখ", ro: "mukh", en: "mouth / face", gesture: "point at your mouth", anchor: [440, 304], side: "L", labelY: 470 },
  { key: "hat", bn: "হাত", ro: "hat", en: "hand / arm", gesture: "wave your hand", anchor: [222, 960], side: "L", labelY: 900 },
  { key: "pet", bn: "পেট", ro: "pet", en: "tummy", gesture: "pat your tummy", anchor: [580, 720], side: "R", labelY: 640 },
  { key: "pa", bn: "পা", ro: "pa", en: "leg / foot", gesture: "lift your foot", anchor: [600, 1350], side: "R", labelY: 1250 },
];
/** The fixed order the Learn tab steps through. */
export const BODY_ORDER = ["matha", "chokh", "nak", "kan", "mukh", "hat", "pa", "pet"];

export const BODY_COMMANDS: BodyCommand[] = [
  { bn: "মাথা ধরো", ro: "matha dhoro", en: "touch your head", part: "matha" },
  { bn: "নাক ধরো", ro: "nak dhoro", en: "touch your nose", part: "nak" },
  { bn: "কান ধরো", ro: "kan dhoro", en: "hold your ear", part: "kan" },
  { bn: "পেট ধরো", ro: "pet dhoro", en: "touch your tummy", part: "pet" },
  { bn: "চোখ বন্ধ করো", ro: "chokh bondho koro", en: "close your eyes", part: "chokh" },
  { bn: "চোখ খোলো", ro: "chokh kholo", en: "open your eyes", part: "chokh" },
  { bn: "মুখ খোলো", ro: "mukh kholo", en: "open your mouth", part: "mukh" },
  { bn: "হাত তোলো", ro: "hat tolo", en: "raise your hand", part: "hat" },
  { bn: "হাত নাড়াও", ro: "hat narao", en: "wave your hand", part: "hat" },
  { bn: "পা নাড়াও", ro: "pa narao", en: "wiggle your foot", part: "pa" },
  { bn: "ওঠো", ro: "otho", en: "stand up", part: null },
  { bn: "বসো", ro: "bosho", en: "sit down", part: null },
  { bn: "লাফাও", ro: "lafao", en: "jump", part: null },
];

export const POTION_COLOURS: PotionColour[] = [
  { bn: "লাল", ro: "lal", en: "red", hex: "#e53935", textOn: "#fff" },
  { bn: "নীল", ro: "nil", en: "blue", hex: "#1e88e5", textOn: "#fff" },
  { bn: "হলুদ", ro: "holud", en: "yellow", hex: "#fdd835", textOn: "#2b2140" },
  { bn: "সবুজ", ro: "shobuj", en: "green", hex: "#43a047", textOn: "#fff" },
  { bn: "সাদা", ro: "shada", en: "white", hex: "#fafafa", textOn: "#2b2140" },
  { bn: "কালো", ro: "kalo", en: "black", hex: "#212121", textOn: "#fff" },
];
export const POTION_GOAL = 5;

export const CREATURES: Creature[] = [
  { key: "owl", pic: "1f989", bn: "পেঁচা", ro: "pecha", en: "owl", fun: "carries the post" },
  { key: "cat", pic: "1f431", bn: "বিড়াল", ro: "biral", en: "cat", fun: "says ম্যাও (myao)" },
  { key: "frog", pic: "1f438", bn: "ব্যাঙ", ro: "byang", en: "frog", fun: "jumps: লাফাও!" },
  { key: "elephant", pic: "1f418", bn: "হাতি", ro: "hati", en: "elephant", fun: "has a long trunk" },
  { key: "snake", pic: "1f40d", bn: "সাপ", ro: "shap", en: "snake", fun: "goes হিস্‌স্‌ (hiss)" },
];

/** Where a word is already in the vocabulary, use that record's romanization so the app spells it one way. */
export function resolveRo<T extends { bn: string; ro: string }>(items: T[]): T[] {
  const known = new Map<string, string>();
  for (const t of VOCAB) for (const s of t.sections) for (const w of s.words) if (!known.has(w[0])) known.set(w[0], w[1]);
  return items.map((i) => (known.has(i.bn) ? { ...i, ro: known.get(i.bn)! } : i));
}

/** Phrases the games speak, so the audio script can make clips for them. */
export const KIDS_PHRASES: string[] = [
  "কোথায়?", "এটা কী?", "এটা কী রং?", "তাড়াতাড়ি!", "জাদু!", "খুব ভালো!", "হ্যাঁ!", "না!",
  ...BODY_PARTS.flatMap((p) => [p.bn, `${p.bn} কোথায়?`, `এটা ${p.bn}?`]),
  ...BODY_COMMANDS.flatMap((c) => [c.bn, `জাদু! ${c.bn}`]),
  ...POTION_COLOURS.flatMap((c) => [c.bn, `${c.bn} কিছু নিয়ে এসো!`]),
  ...CREATURES.flatMap((c) => [c.bn, `${c.bn} কোথায়?`, `এটা ${c.bn}!`]),
];

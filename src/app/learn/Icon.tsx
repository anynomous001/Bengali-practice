import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  ArrowRight, BookOpenText, Fire, Target, Trophy, CaretDown, CaretLeft, CaretRight, Cards, Check, CheckCircle, Circle, Clock, Desktop, House, ListBullets,
  Lock, Microphone, Moon, PencilSimpleLine, Play, ShieldCheck, SignOut, SpeakerHigh, Sun, TextAa, Translate, X,
} from "@phosphor-icons/react/dist/ssr";

// One icon family (Phosphor) for the whole app, so strokes, corners and weights match everywhere.
// Course icons use the duotone weight; everything else is a regular line icon.
const ICONS = {
  home: House,
  reading: BookOpenText,
  speaking: Microphone,
  writing: PencilSimpleLine,
  grammar: TextAa,
  vocabulary: Translate,
  arrow: ArrowRight,
  next: CaretRight,
  prev: CaretLeft,
  back: CaretLeft,
  chevron: CaretDown,
  logout: SignOut,
  shield: ShieldCheck,
  close: X,
  check: Check,
  cards: Cards,
  sound: SpeakerHigh,
  clock: Clock,
  sun: Sun,
  moon: Moon,
  system: Desktop,
  done: CheckCircle,
  circle: Circle,
  list: ListBullets,
  play: Play,
  lock: Lock,
  flame: Fire,
  trophy: Trophy,
  target: Target,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof ICONS;
type Weight = "regular" | "bold" | "fill" | "duotone";

const COURSE = new Set<IconName>(["reading", "speaking", "vocabulary", "grammar", "writing"]);

export default function Icon({ name, size = 20, weight }: { name: IconName; size?: number; weight?: Weight }) {
  const Cmp = ICONS[name];
  const w: Weight = weight ?? (name === "done" || name === "play" ? "fill" : COURSE.has(name) ? "duotone" : "regular");
  return <Cmp size={size} weight={w} aria-hidden focusable="false" />;
}

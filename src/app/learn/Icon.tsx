import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  ArrowRight, BookOpenText, Gift, List, Medal, ChatCircleText, Fire, Target, Trophy, CaretDown, CaretLeft, CaretRight, Cards, Check, CheckCircle, Circle, Clock, Desktop, House, ListBullets,
  Headphones, Smiley, Lock, Microphone, Moon, Path, PencilSimpleLine, Play, ShieldCheck, SignOut, SpeakerHigh, Sun, TextAa, Translate, X,
} from "@phosphor-icons/react/dist/ssr";

// One icon family (Phosphor) for the whole app, so strokes, corners and weights match everywhere.
// Course icons use the duotone weight; everything else is a regular line icon.
const ICONS = {
  home: House,
  kids: Smiley,
  reading: BookOpenText,
  speaking: Microphone,
  listening: Headphones,
  writing: PencilSimpleLine,
  path: Path,
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
  feedback: ChatCircleText,
  medal: Medal,
  gift: Gift,
  menu: List,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof ICONS;
type Weight = "regular" | "bold" | "fill" | "duotone";

const COURSE = new Set<IconName>(["reading", "speaking", "listening", "vocabulary", "grammar", "writing"]);

export default function Icon({ name, size = 20, weight }: { name: IconName; size?: number; weight?: Weight }) {
  const Cmp = ICONS[name];
  const w: Weight = weight ?? (name === "done" || name === "play" ? "fill" : COURSE.has(name) ? "duotone" : "regular");
  return <Cmp size={size} weight={w} aria-hidden focusable="false" />;
}

/** The colour of the tile behind an icon, by icon name. Each section of the app has its own colour. */
const TONES: Partial<Record<IconName, string>> = {
  home: "home", path: "path", reading: "reading", speaking: "speaking", listening: "listening", vocabulary: "vocabulary", grammar: "grammar", writing: "writing",
  trophy: "progress", medal: "leader", gift: "gift", feedback: "chat", shield: "slate", logout: "slate", flame: "flame", target: "leader", lock: "slate",
};

/** A section icon as a rounded colour tile with a solid white glyph, like an app icon. Decorative: the label next to it names it. */
export function IconTile({ name, size = 32, tone, muted }: { name: IconName; size?: number; tone?: string; muted?: boolean }) {
  return (
    <span className={"itile t-" + (muted ? "muted" : tone ?? TONES[name] ?? "slate")} style={{ width: size, height: size, borderRadius: Math.round(size * 0.28) }} aria-hidden>
      <Icon name={name} size={Math.round(size * 0.56)} weight="fill" />
    </span>
  );
}

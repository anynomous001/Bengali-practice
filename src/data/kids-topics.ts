// Kids' picture lessons (Colours, Body parts). Server-only: pages resolve romanization from the vocabulary and pass props down.
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { PicSpec } from "@/lib/kids-pics";
import { resolveRo } from "./kids-games";

export type KidWordItem = { id: string; bn: string; ro: string; en: string; pic: PicSpec };
export type KidQuestion = { bn: string; ro: string; en: string };

const w = (id: string, bn: string, ro: string, en: string, pic: PicSpec): KidWordItem => ({ id, bn, ro, en, pic });
const sw = (hex: string): PicSpec => ({ kind: "swatch", hex });
const body = (key: string): PicSpec => ({ kind: "body", key });

const COLOURS: KidWordItem[] = [
  w("lal", "লাল", "lal", "red", sw("#e53935")), w("nil", "নীল", "nil", "blue", sw("#1e88e5")),
  w("holud", "হলুদ", "holud", "yellow", sw("#fdd835")), w("sobuj", "সবুজ", "sobuj", "green", sw("#43a047")),
  w("shada", "সাদা", "shada", "white", sw("#fafafa")), w("kalo", "কালো", "kalo", "black", sw("#212121")),
  w("komola", "কমলা", "komola", "orange", sw("#fb8c00")), w("golapi", "গোলাপি", "golapi", "pink", sw("#f48fb1")),
  w("beguni", "বেগুনি", "beguni", "purple", sw("#8e24aa")), w("badami", "বাদামি", "badami", "brown", sw("#795548")),
  w("dhushor", "ধূসর", "dhushor", "grey", sw("#9e9e9e")), w("akashi", "আকাশি", "akashi", "sky blue", sw("#4fc3f7")),
];

const BODY: KidWordItem[] = [
  w("matha", "মাথা", "matha", "head", body("matha")), w("chul", "চুল", "chul", "hair", body("chul")),
  w("chokh", "চোখ", "chokh", "eyes", body("chokh")), w("nak", "নাক", "nak", "nose", body("nak")),
  w("kan", "কান", "kan", "ears", body("kan")), w("mukh", "মুখ", "mukh", "mouth", body("mukh")),
  w("gola", "গলা", "gola", "neck", body("gola")), w("kandh", "কাঁধ", "kandh", "shoulders", body("kandh")),
  w("hat", "হাত", "hat", "hand / arm", body("hat")), w("pet", "পেট", "pet", "tummy", body("pet")),
  w("hantu", "হাঁটু", "hantu", "knees", body("hantu")), w("pa", "পা", "pa", "leg / foot", body("pa")),
];

export type KidTopic = { id: string; slug: string; title: string; bn: string; words: KidWordItem[]; question: KidQuestion; learnLesson: string; quizLesson: string };

const TOPICS: KidTopic[] = [
  { id: "colours", slug: "colours", title: "Colours", bn: "রং", words: COLOURS, question: { bn: "এটা কী রং?", ro: "eta ki rong?", en: "What colour is this?" }, learnLesson: "kids/colours-learn", quizLesson: "kids/colours-quiz" },
  { id: "body", slug: "body-parts", title: "Body parts", bn: "শরীর", words: BODY, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, learnLesson: "kids/body-learn", quizLesson: "kids/body-quiz" },
];

/** A topic with the vocabulary's romanization, and a real photo in place of the swatch when public/kids/photo/<topic>-<id>.webp exists. */
export function getKidTopic(id: string): KidTopic | undefined {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return undefined;
  const words = resolveRo(t.words).map((wd) => {
    if (wd.pic.kind === "body") return wd;
    const file = `kids/photo/${t.id}-${wd.id}.webp`;
    return existsSync(join(process.cwd(), "public", file)) ? { ...wd, pic: { kind: "photo", src: `/${file}` } as PicSpec } : wd;
  });
  return { ...t, words };
}
export const kidTopicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug)?.id;
export const KID_TOPIC_IDS = TOPICS.map((t) => t.id);
export const KID_TOPIC_WORDS = TOPICS.flatMap((t) => t.words.map((x) => x.bn));
export const KID_TOPIC_QUESTIONS = TOPICS.map((t) => t.question.bn);

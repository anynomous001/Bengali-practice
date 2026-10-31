// Kids' picture lessons. Server-only: pages resolve romanization from the vocabulary and pass props down.
// Photos are files in public/kids/photo/<topic>-<id>.webp. Topics marked "photos: required" only show words that have a photo.
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { PicSpec } from "@/lib/kids-pics";
import { NUMBERS } from "./numbers";
import { resolveRo } from "./kids-games";

export type KidWordItem = { id: string; bn: string; ro: string; en: string; pic: PicSpec; badge?: string };
export type KidQuestion = { bn: string; ro: string; en: string };

const w = (id: string, bn: string, ro: string, en: string, pic: PicSpec, badge?: string): KidWordItem => ({ id, bn, ro, en, pic, badge });
const sw = (hex: string): PicSpec => ({ kind: "swatch", hex });
const body = (key: string): PicSpec => ({ kind: "body", key });
const photoOf = (topic: string, id: string): PicSpec => ({ kind: "photo", src: `/kids/photo/${topic}-${id}.webp` });

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

const ANIMALS: KidWordItem[] = ([
  ["dog", "কুকুর", "kukur"], ["cat", "বিড়াল", "biral"], ["cow", "গরু", "goru"], ["elephant", "হাতি", "hati"], ["tiger", "বাঘ", "bagh"], ["bird", "পাখি", "pakhi"],
  ["fish", "মাছ", "mach"], ["monkey", "বাঁদর", "bandor"], ["horse", "ঘোড়া", "ghora"], ["owl", "পেঁচা", "pencha"], ["frog", "ব্যাঙ", "byang"], ["snake", "সাপ", "shap"],
] as const).map(([id, bn, ro]) => w(id, bn, ro, id, photoOf("animals", id)));

const FRUITS: KidWordItem[] = ([
  ["mango", "আম", "am"], ["banana", "কলা", "kola"], ["apple", "আপেল", "apel"], ["orange", "কমলালেবু", "komolalebu"], ["jackfruit", "কাঁঠাল", "kanthal"], ["lychee", "লিচু", "lichu"],
  ["guava", "পেয়ারা", "peyara"], ["papaya", "পেঁপে", "pepe"], ["watermelon", "তরমুজ", "tormuj"], ["coconut", "নারকেল", "narkel"], ["grapes", "আঙুর", "angur"], ["pineapple", "আনারস", "anarosh"],
] as const).map(([id, bn, ro]) => w(id, bn, ro, id, photoOf("fruits", id)));

const NUMBER_EN = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const NUMBERS_1_10: KidWordItem[] = NUMBERS.filter((n) => n.value >= 1 && n.value <= 10)
  .map((n) => w(`n${n.value}`, n.word, n.wrom, NUMBER_EN[n.value], { kind: "count", n: n.value }, `${n.numeral} · ${n.value}`));

type Photos = "required" | "optional" | "none";
export type KidTopic = { id: string; slug: string; title: string; bn: string; words: KidWordItem[]; question: KidQuestion; photos: Photos; ready: boolean };

const TOPICS: Omit<KidTopic, "ready">[] = [
  { id: "colours", slug: "colours", title: "Colours", bn: "রং", words: COLOURS, question: { bn: "এটা কী রং?", ro: "eta ki rong?", en: "What colour is this?" }, photos: "optional" },
  { id: "body", slug: "body-parts", title: "Body parts", bn: "শরীর", words: BODY, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "none" },
  { id: "numbers", slug: "numbers", title: "Numbers 1 to 10", bn: "সংখ্যা", words: NUMBERS_1_10, question: { bn: "কয়টা?", ro: "koyta?", en: "How many?" }, photos: "optional" },
  { id: "animals", slug: "animals", title: "Animals", bn: "পশুপাখি", words: ANIMALS, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "required" },
  { id: "fruits", slug: "fruits", title: "Fruits", bn: "ফল", words: FRUITS, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "required" },
];

const has = (src: string) => existsSync(join(process.cwd(), "public", src));

/** A topic with the vocabulary's romanization. Real photos replace swatches and dots when the files exist, and "required" topics show only the words that have one. */
export function getKidTopic(id: string): KidTopic | undefined {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return undefined;
  let words = resolveRo(t.words).map((wd) => {
    if (wd.pic.kind === "body" || wd.pic.kind === "count") return wd;
    if (wd.pic.kind === "photo") return has(wd.pic.src) ? wd : null;
    const file = `/kids/photo/${t.id}-${wd.id}.webp`;
    return has(file) ? { ...wd, pic: { kind: "photo", src: file } as PicSpec } : wd;
  }).filter((x): x is KidWordItem => !!x);
  if (t.id === "numbers") { // count real fruit when there is a mango photo
    const mango = "/kids/photo/fruits-mango.webp";
    if (has(mango)) words = words.map((wd) => (wd.pic.kind === "count" ? { ...wd, pic: { ...wd.pic, src: mango } } : wd));
  }
  return { ...t, words, ready: words.length >= 4 };
}
export const kidTopicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug)?.id;
export const kidLessonIds = (id: string) => ({ learn: `kids/${id}-learn`, quiz: `kids/${id}-quiz` });
export const KID_TOPIC_IDS = TOPICS.map((t) => t.id);
export const KID_TOPIC_WORDS = TOPICS.flatMap((t) => t.words.map((x) => x.bn));
export const KID_TOPIC_QUESTIONS = [...new Set(TOPICS.map((t) => t.question.bn))];

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

const FAMILY: KidWordItem[] = ([
  ["mother", "মা", "ma", "mother"], ["father", "বাবা", "baba", "father"], ["grandmother", "ঠাকুমা", "thakuma", "grandmother (dad's mom)"], ["grandfather", "ঠাকুরদা", "thakurda", "grandfather (dad's dad)"],
  ["elder-brother", "দাদা", "dada", "elder brother"], ["elder-sister", "দিদি", "didi", "elder sister"], ["brother", "ভাই", "bhai", "younger brother"], ["sister", "বোন", "bon", "younger sister"],
  ["baby", "শিশু", "shishu", "baby"], ["uncle", "কাকা", "kaka", "uncle (dad's younger brother)"], ["aunt", "মাসি", "mashi", "aunt (mom's sister)"], ["family", "পরিবার", "poribar", "family"],
] as const).map(([id, bn, ro, en]) => w(id, bn, ro, en, photoOf("family", id)));

const DAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS: KidWordItem[] = ([
  ["sunday", "রবিবার", "robibar", "Sunday"], ["monday", "সোমবার", "shombar", "Monday"], ["tuesday", "মঙ্গলবার", "mongolbar", "Tuesday"], ["wednesday", "বুধবার", "budhbar", "Wednesday"],
  ["thursday", "বৃহস্পতিবার", "brihoshpotibar", "Thursday"], ["friday", "শুক্রবার", "shukrobar", "Friday"], ["saturday", "শনিবার", "shonibar", "Saturday"],
] as const).map(([id, bn, ro, en], i) => w(id, bn, ro, en, { kind: "cells", i, labels: DAY_EN, cols: 7 }));

const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS: KidWordItem[] = ([
  ["jan", "জানুয়ারি", "januari", "January"], ["feb", "ফেব্রুয়ারি", "phebruari", "February"], ["mar", "মার্চ", "march", "March"], ["apr", "এপ্রিল", "epril", "April"],
  ["may", "মে", "me", "May"], ["jun", "জুন", "jun", "June"], ["jul", "জুলাই", "julai", "July"], ["aug", "আগস্ট", "agosto", "August"],
  ["sep", "সেপ্টেম্বর", "septembor", "September"], ["oct", "অক্টোবর", "oktobor", "October"], ["nov", "নভেম্বর", "novembor", "November"], ["dec", "ডিসেম্বর", "disembor", "December"],
] as const).map(([id, bn, ro, en], i) => w(id, bn, ro, en, { kind: "cells", i, labels: MONTH_EN, cols: 4 }));

const BMONTH_RANGE = ["Apr-May", "May-Jun", "Jun-Jul", "Jul-Aug", "Aug-Sep", "Sep-Oct", "Oct-Nov", "Nov-Dec", "Dec-Jan", "Jan-Feb", "Feb-Mar", "Mar-Apr"];
const BMONTHS: KidWordItem[] = ([
  ["boishakh", "বৈশাখ", "boishakh"], ["joishtho", "জ্যৈষ্ঠ", "joishtho"], ["asharh", "আষাঢ়", "asharh"], ["shrabon", "শ্রাবণ", "shrabon"], ["bhadro", "ভাদ্র", "bhadro"], ["ashwin", "আশ্বিন", "ashwin"],
  ["kartik", "কার্তিক", "kartik"], ["ograhayon", "অগ্রহায়ণ", "ograhayon"], ["poush", "পৌষ", "poush"], ["magh", "মাঘ", "magh"], ["phalgun", "ফাল্গুন", "phalgun"], ["choitro", "চৈত্র", "choitro"],
] as const).map(([id, bn, ro], i) => w(id, bn, ro, `Bengali month ${i + 1} (${BMONTH_RANGE[i]})`, { kind: "cells", i, labels: BMONTH_RANGE, cols: 4 }));

const SEASONS: KidWordItem[] = ([
  ["summer", "গ্রীষ্ম", "grishmo", "summer"], ["monsoon", "বর্ষা", "borsha", "monsoon (rainy season)"], ["autumn", "শরৎ", "shorot", "autumn"],
  ["late-autumn", "হেমন্ত", "hemonto", "late autumn"], ["winter", "শীত", "shit", "winter"], ["spring", "বসন্ত", "boshonto", "spring"],
] as const).map(([id, bn, ro, en]) => w(id, bn, ro, en, photoOf("seasons", id)));

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
  { id: "days", slug: "days", title: "Days of the week", bn: "বার", words: DAYS, question: { bn: "এটা কী বার?", ro: "eta ki bar?", en: "Which day is this?" }, photos: "none" },
  { id: "months", slug: "months", title: "Months", bn: "মাস", words: MONTHS, question: { bn: "এটা কী মাস?", ro: "eta ki mash?", en: "Which month is this?" }, photos: "none" },
  { id: "bmonths", slug: "bengali-months", title: "Bengali months", bn: "বাংলা মাস", words: BMONTHS, question: { bn: "এটা কী মাস?", ro: "eta ki mash?", en: "Which month is this?" }, photos: "none" },
  { id: "seasons", slug: "seasons", title: "Seasons", bn: "ঋতু", words: SEASONS, question: { bn: "এটা কোন ঋতু?", ro: "eta kon ritu?", en: "Which season is this?" }, photos: "required" },
  { id: "family", slug: "family", title: "Family", bn: "পরিবার", words: FAMILY, question: { bn: "ইনি কে?", ro: "ini ke?", en: "Who is this?" }, photos: "required" },
  { id: "fruits", slug: "fruits", title: "Fruits", bn: "ফল", words: FRUITS, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "required" },
];

const has = (src: string) => existsSync(join(process.cwd(), "public", src));

/** A topic with the vocabulary's romanization. Real photos replace swatches and dots when the files exist, and "required" topics show only the words that have one. */
export function getKidTopic(id: string): KidTopic | undefined {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return undefined;
  let words = resolveRo(t.words).map((wd) => {
    if (wd.pic.kind === "body" || wd.pic.kind === "count" || wd.pic.kind === "cells") return wd;
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

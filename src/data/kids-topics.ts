// Kids' picture lessons. Server-only: pages resolve romanization from the vocabulary and pass props down.
// Photos are files in public/kids/photo/<topic>-<id>.webp. Topics marked "photos: required" only show words that have a photo.
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { PicSpec } from "@/lib/kids-pics";
import { NUMBER_CHART, NUMBERS, toBengaliDigits } from "./numbers";
import { resolveRo } from "./kids-games";

export type KidWordItem = { id: string; bn: string; ro: string; en: string; pic: PicSpec; badge?: string; /** The color of a colour word, kept when a photo replaces the swatch. */ tint?: string };
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

// More parts of the body. They need a photo (body-<id>.webp) and appear on their own once the file exists.
const BODY_MORE: KidWordItem[] = ([
  ["kopal", "কপাল", "kopal", "forehead"], ["bhuru", "ভুরু", "bhuru", "eyebrows"], ["gal", "গাল", "gal", "cheek"], ["thutni", "থুতনি", "thutni", "chin"],
  ["thont", "ঠোঁট", "thont", "lips"], ["dant", "দাঁত", "dant", "teeth"], ["jibh", "জিভ", "jibh", "tongue"], ["angul", "আঙুল", "angul", "fingers"],
  ["nokh", "নখ", "nokh", "nails"], ["buk", "বুক", "buk", "chest"], ["pith", "পিঠ", "pith", "back"],
] as const).map(([id, bn, ro, en]) => w(id, bn, ro, en, photoOf("body", id)));

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

const ONES_EN = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS_EN = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const numEn = (n: number) => (n < 20 ? ONES_EN[n] : n % 10 === 0 ? TENS_EN[n / 10] : `${TENS_EN[Math.floor(n / 10)]}-${ONES_EN[n % 10]}`);
const nw = (value: number, word: string, wrom: string, en = numEn(value)) =>
  w(`n${value}`, word, wrom, en, { kind: "numeral", text: toBengaliDigits(value), sub: String(value) });
/** The numbers from the chart, a range at a time. Bengali numbers up to 100 are all separate words, so each one is learned by itself. */
const range = (from: number, to: number) => NUMBER_CHART.filter((n) => n.value >= from && n.value <= to).map((n) => nw(n.value, n.word, n.wrom));
const NUMBERS_0_10 = range(0, 10);
const NUMBERS_11_20 = range(11, 20);
const NUMBERS_21_50 = range(21, 50);
const NUMBERS_51_100 = range(51, 100);
const NUMBERS_BIG: KidWordItem[] = [
  ...[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => { const n = NUMBER_CHART[v]; return nw(v, n.word, n.wrom); }),
  ...NUMBERS.filter((n) => n.value >= 100).map((n) => nw(n.value, n.word, n.wrom, { 100: "one hundred", 200: "two hundred", 500: "five hundred", 1000: "one thousand" }[n.value] ?? String(n.value))),
];

type Photos = "required" | "optional" | "none";
/** "colours": the cauldron fills with the colors asked. "magic": it fills with a sparkle of colors. Left out: no cauldron. */
export type KidFill = "colours" | "magic";
export type KidTopic = { id: string; slug: string; title: string; bn: string; words: KidWordItem[]; question: KidQuestion; photos: Photos; ready: boolean; fill?: KidFill };

const TOPICS: Omit<KidTopic, "ready">[] = [
  { id: "colours", slug: "colours", title: "Colours", bn: "রং", words: COLOURS, question: { bn: "এটা কী রং?", ro: "eta ki rong?", en: "What colour is this?" }, photos: "optional", fill: "colours" },
  { id: "body", slug: "body-parts", title: "Body parts", bn: "শরীর", words: [...BODY, ...BODY_MORE], question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "none", fill: "magic" },
  { id: "numbers", slug: "numbers", title: "Numbers 0 to 10", bn: "সংখ্যা", words: NUMBERS_0_10, question: { bn: "এটা কোন সংখ্যা?", ro: "eta kon shongkhya?", en: "What number is this?" }, photos: "none" },
  { id: "numbers-11", slug: "numbers-11-to-20", title: "Numbers 11 to 20", bn: "এগারো থেকে বিশ", words: NUMBERS_11_20, question: { bn: "এটা কোন সংখ্যা?", ro: "eta kon shongkhya?", en: "What number is this?" }, photos: "none" },
  { id: "numbers-21", slug: "numbers-21-to-50", title: "Numbers 21 to 50", bn: "একুশ থেকে পঞ্চাশ", words: NUMBERS_21_50, question: { bn: "এটা কোন সংখ্যা?", ro: "eta kon shongkhya?", en: "What number is this?" }, photos: "none" },
  { id: "numbers-51", slug: "numbers-51-to-100", title: "Numbers 51 to 100", bn: "একান্ন থেকে একশো", words: NUMBERS_51_100, question: { bn: "এটা কোন সংখ্যা?", ro: "eta kon shongkhya?", en: "What number is this?" }, photos: "none" },
  { id: "numbers-big", slug: "big-numbers", title: "Tens, hundreds and a thousand", bn: "বড় সংখ্যা", words: NUMBERS_BIG, question: { bn: "এটা কোন সংখ্যা?", ro: "eta kon shongkhya?", en: "What number is this?" }, photos: "none" },
  { id: "animals", slug: "animals", title: "Animals", bn: "পশুপাখি", words: ANIMALS, question: { bn: "এটা কী?", ro: "eta ki?", en: "What is this?" }, photos: "required", fill: "magic" },
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
    if (wd.pic.kind === "body") { // a real close-up photo when there is one, otherwise the child figure with a ring
      const file = `/kids/photo/body-${wd.id}.webp`;
      return has(file) ? { ...wd, pic: { kind: "photo", src: file } as PicSpec } : wd;
    }
    if (wd.pic.kind === "count" || wd.pic.kind === "cells" || wd.pic.kind === "numeral") return wd;
    if (wd.pic.kind === "photo") return has(wd.pic.src) ? wd : null;
    const file = `/kids/photo/${t.id}-${wd.id}.webp`;
    const tint = wd.pic.kind === "swatch" ? wd.pic.hex : undefined;
    return has(file) ? { ...wd, tint, pic: { kind: "photo", src: file } as PicSpec } : { ...wd, tint };
  }).filter((x): x is KidWordItem => !!x);
  return { ...t, words, ready: words.length >= 4 };
}
export const kidTopicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug)?.id;
export const kidLessonIds = (id: string) => ({ learn: `kids/${id}-learn`, quiz: `kids/${id}-quiz` });
export const KID_TOPIC_IDS = TOPICS.map((t) => t.id);
export const KID_TOPIC_WORDS = TOPICS.flatMap((t) => t.words.map((x) => x.bn));
export const KID_TOPIC_QUESTIONS = [...new Set(TOPICS.map((t) => t.question.bn))];

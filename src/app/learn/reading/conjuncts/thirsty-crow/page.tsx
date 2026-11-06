import { requireAccess } from "@/lib/access";
import ConjunctTable from "../../../ConjunctTable";
import LessonFrame from "../../../LessonFrame";

// Conjuncts used in the story, with the story text. Words in [[double brackets]] are highlighted.
const STORY = [
  "একদিন [[প্রচণ্ড]] গরমে একটি কাক [[তৃষ্ণায়]] কাতর হয়ে জল খোঁজার জন্য উড়ছিল। অনেক খোঁজার পর সে একটি কলসি দেখতে পেল। কলসিতে অল্প একটু জল ছিল, কিন্তু কলসির গলা এত সরু যে কাকের ঠোঁট জল পর্যন্ত পৌঁছাতে পারছিল না।",
  "কাকটি অনেক [[চেষ্টা]] করল, কিন্তু [[ব্যর্থ]] হলো। তখন তার চোখে পড়ল কিছু নুড়ি পাথর। [[বুদ্ধিমান]] কাকটি একটি একটি করে নুড়ি পাথর কলসির [[মধ্যে]] ফেলতে লাগল। [[আস্তে]] আস্তে জলের [[স্তর]] উঁচুতে উঠে এল। শেষে কাকটি আরামে জল খেয়ে তার [[তৃষ্ণা]] মেটালো।",
];
const GLOSS = "প্রচণ্ড severe, তৃষ্ণায় in thirst, কলসি pitcher, গলা neck, সরু narrow, ঠোঁট beak, চেষ্টা try, ব্যর্থ failed, নুড়ি পাথর pebbles, বুদ্ধিমান intelligent, আস্তে আস্তে slowly, স্তর level";
const ROWS: { word: string; ro: string; conj: string; parts: string; en: string; note?: string }[] = [
  { word: "প্রচণ্ড", ro: "prochondo", conj: "প্র", parts: "প + র", en: "severe, intense" },
  { word: "প্রচণ্ড", ro: "prochondo", conj: "ণ্ড", parts: "ণ + ড", en: "(part of the same word)" },
  { word: "তৃষ্ণায়", ro: "trishnay", conj: "ষ্ণ", parts: "ষ + ণ", en: "in thirst" },
  { word: "চেষ্টা", ro: "cheshta", conj: "ষ্ট", parts: "ষ + ট", en: "try, effort" },
  { word: "ব্যর্থ", ro: "byortho", conj: "ব্য", parts: "ব + য", en: "failed" },
  { word: "ব্যর্থ", ro: "byortho", conj: "র্থ", parts: "র + থ", en: "(part of the same word)" },
  { word: "বুদ্ধিমান", ro: "buddhiman", conj: "দ্ধ", parts: "দ + ধ", en: "intelligent, wise" },
  { word: "মধ্যে", ro: "moddhe", conj: "ধ্য", parts: "ধ + য", en: "inside, among" },
  { word: "আস্তে", ro: "aste", conj: "স্ত", parts: "স + ত", en: "slowly" },
  { word: "স্তর", ro: "stor", conj: "স্ত", parts: "স + ত", en: "level, layer (same conjunct, another word)" },
  { word: "তৃষ্ণা", ro: "trishna", conj: "ষ্ণ", parts: "ষ + ণ", en: "thirst (the last line)" },
];

function Line({ text }: { text: string }) {
  return <p className="cj-story" lang="bn">{text.split(/(\[\[.*?\]\])/).map((t, i) => (t.startsWith("[[") ? <mark key={i}>{t.slice(2, -2)}</mark> : t))}</p>;
}

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/conj-crow">
      <h1>Conjuncts in a story <span className="muted">The Thirsty Crow</span></h1>
      <p className="lede">Here are the conjuncts of a short story. The highlighted words each hold a conjunct. Read the story, then check the table below the story.</p>
      <h2 lang="bn">কাকের তৃষ্ণা</h2>
      {STORY.map((s, i) => <Line key={i} text={s} />)}
      <p className="muted">Words: {GLOSS}.</p>
      <h2>The conjuncts, word by word</h2>
      <div className="cj-table" role="table" aria-label="Conjuncts in the story">
        <div className="cj-head story" role="row"><span>Word</span><span>Conjunct</span><span>Made of</span><span>Meaning</span></div>
        {ROWS.map((r, i) => (
          <div className="cj-row story" role="row" key={i}>
            <span role="cell"><b lang="bn">{r.word}</b> <i>{r.ro}</i></span>
            <span className="cj-conj" lang="bn" role="cell">{r.conj}</span>
            <span className="cj-parts" lang="bn" role="cell">{r.parts}</span>
            <span role="cell">{r.en}</span>
          </div>
        ))}
      </div>
      <p className="muted">Two of the conjuncts, <span lang="bn">ষ্ণ</span> and <span lang="bn">স্ত</span>, appear in more than one word.</p>
    </LessonFrame>
  );
}

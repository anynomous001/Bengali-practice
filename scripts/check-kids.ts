/** Checks kids-mode words: each Bengali word must be in the grown-up vocabulary, each picture file must exist. Run: npm run check:kids */
import { existsSync } from "node:fs";
import { KID_TOPICS } from "../src/data/kids";
import { NUMBERS } from "../src/data/numbers";
import { VOCAB } from "../src/data/vocabulary";

const vocab = new Set<string>();
for (const t of VOCAB) for (const s of t.sections) for (const w of s.words) vocab.add(w[0].normalize("NFC"));
for (const n of NUMBERS) vocab.add(n.word.normalize("NFC"));
let bad = 0, total = 0;
for (const t of KID_TOPICS) {
  if (!existsSync(`public/kids/pic/${t.pic}.svg`)) { bad++; console.log(`no picture: topic ${t.id} ${t.pic}`); }
  for (const w of t.words) {
    total++;
    if (!vocab.has(w.bn.normalize("NFC"))) { bad++; console.log(`not in vocabulary: ${t.id} / ${w.bn} (${w.en})`); }
    if (!existsSync(`public/kids/pic/${w.pic}.svg`)) { bad++; console.log(`no picture: ${t.id} / ${w.en} ${w.pic}`); }
    if (!/^[a-z][a-z .'-]*$/.test(w.ro)) { bad++; console.log(`romanization: ${t.id} / ${w.ro}`); }
  }
}
console.log(`${KID_TOPICS.length} topics, ${total} words, ${bad} problems`);
process.exit(bad ? 1 : 0);

// Run with: npm test
// Checks the business persona content (team and client communication): shape, romanization style and the register (আপনি) rule.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SCENARIOS } from "./roleplay";
import { CLASSWORK } from "./classwork";
import { VOCAB } from "./vocabulary";
import { GOALS } from "./paths";

const RO = /^[a-z][a-z0-9 .?!',;:…-]*$/;
const biz = SCENARIOS.filter((s) => s.id.startsWith("biz-"));
const lines = (s: (typeof biz)[number]) => [...s.say, ...s.hear].flatMap((g) => g.items).concat(s.demos.flatMap((d) => d.turns.map((t) => t.line)));

test("every business role play line has Bengali, romanization and English", () => {
  assert.ok(biz.length >= 7);
  for (const s of biz) for (const [bn, ro, en] of lines(s)) {
    assert.ok(/[ঀ-৿]/.test(bn) && ro.trim() && en.trim(), `${s.id}: incomplete ${bn}`);
    assert.match(ro.toLowerCase(), RO, `${s.id}: odd romanization ${ro}`);
  }
});

test("the client call is a long multi-turn dialogue with an apology, a reason, a new date and a reassurance", () => {
  const s = SCENARIOS.find((x) => x.id === "biz-client-delay")!;
  const turns = s.demos[0].turns;
  assert.ok(turns.length >= 18);
  const text = turns.map((t) => t.line[0]).join(" ");
  for (const w of ["দুঃখিত", "কারণ", "তারিখ", "নিশ্চিত"]) assert.ok(text.includes(w), `missing ${w}`);
});

test("in the good examples, staff and clients are addressed as আপনি, never তুমি, তোমরা or তুই", () => {
  for (const s of biz) for (const d of s.demos.filter((x) => x.kind === "smooth")) for (const t of d.turns) assert.ok(!/(তুমি|তোমরা|তুই|তোমার|তোর)/.test(t.line[0]), `${s.id}: casual 'you' in ${t.line[0]}`);
  for (const s of biz) assert.ok(s.demos.some((d) => d.kind === "wrong") || s.demos.length === 1);
});

test("business vocabulary: six topics of 12 words with at least 8 phrases each, all with romanization and English", () => {
  const t = VOCAB.filter((x) => x.group === "business");
  assert.equal(t.length, 6);
  for (const topic of t) {
    const words = topic.sections.flatMap((s) => s.words);
    assert.ok(words.length >= 8 && words.length <= 12, `${topic.id}: ${words.length} words`);
    assert.ok(topic.phrases.length >= 8 && topic.phrases.length <= 12, `${topic.id}: ${topic.phrases.length} phrases`);
    for (const [bn, ro, en] of [...words, ...topic.phrases]) assert.ok(bn && ro && en, `${topic.id}: ${bn}`);
  }
});

test("business class exercises and the My path goal", () => {
  const sets = CLASSWORK.filter((c) => c.id.startsWith("biz-"));
  assert.equal(sets.length, 5);
  for (const c of sets) { assert.ok(c.items.length >= 8); for (const it of c.items) assert.ok(it.prompt && it.answer, `${c.id}: ${it.prompt}`); }
  const goal = GOALS.find((g) => g.id === "business")!;
  assert.equal(goal.tag, "Business");
  const steps = goal.stages.flatMap((s) => s.steps.map((x) => x.id));
  for (const id of ["speaking/roleplay-biz-client-delay", "vocabulary/biz-client", "grammar/class-biz-client"]) assert.ok(steps.includes(id), id);
});

// Run with: npm test
// Checks that the Kitchen Bengali data matches content-drafts/kitchen/content.md exactly, and that the screens use no timeline wording.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { KITCHEN } from "./content";
import { DEFAULT_SPEED, SPEEDS } from "./config";

const md = readFileSync(join(process.cwd(), "content-drafts/kitchen/content.md"), "utf8");
const mdLines = md.split("\n");

test("every item in the data is in content.md with the same Bengali, romanization and English", () => {
  let n = 0;
  for (const stage of KITCHEN.stages) for (const sec of stage.sections) for (const it of sec.items) {
    n++;
    const full = `${it.bn} (${it.ro}) — ${it.en}`;
    const found = mdLines.some((l) => l.includes(full));
    // the two dialogue lines that have only the Bengali in content.md repeat an earlier line
    const bareRepeat = !found && mdLines.some((l) => l.endsWith(`${it.who}: ${it.bn}`)) && mdLines.some((l) => l.includes(`${it.bn} (${it.ro}) — ${it.en}`));
    assert.ok(found || bareRepeat, `not in content.md: ${full}`);
  }
  for (const lv of KITCHEN.listening) for (const it of lv.items) assert.ok(mdLines.some((l) => l.includes(`${it.bn} (${it.ro}) — ${it.en}`)), `listening item not in content.md: ${it.bn}`);
  assert.equal(n, 239);
});

test("the data has the five stages, the three listening levels and the five progress checks", () => {
  assert.deepEqual(KITCHEN.stages.map((s) => s.id), [1, 2, 3, 4, 5]);
  assert.deepEqual(KITCHEN.listening.map((l) => l.items.length), [5, 4, 3]);
  assert.equal(KITCHEN.progress.length, 5);
  assert.equal(KITCHEN.stages[3].sections.filter((s) => s.kind === "dialogue").length, 7); // scenes A to G
  assert.equal(KITCHEN.stages[0].sections.find((s) => s.id === "1.3")!.items.length, 10);
});

test("the speed choices are Slow 0.6, Normal 0.8 (the default) and Faster 1.0", () => {
  assert.deepEqual(SPEEDS.map((s) => s.rate), [0.6, 0.8, 1.0]);
  assert.equal(SPEEDS.find((s) => s.id === DEFAULT_SPEED)!.rate, 0.8);
});

test("no month, timeline or fluency wording in the screens or in the data shown to learners", () => {
  const dir = join(process.cwd(), "src/app/learn/kitchen");
  const files = [...readdirSync(dir).filter((f) => /\.(tsx|ts)$/.test(f)).map((f) => join(dir, f)), join(dir, "stage/[n]/page.tsx"), join(dir, "listening/page.tsx")];
  const shown = files.map((f) => readFileSync(f, "utf8")).join("\n") + JSON.stringify(KITCHEN);
  for (const word of [/\bmonths?\b/i, /timeline/i, /fluen/i, /\bweeks\b/i, /\byears?\b/i, /in \d+ (days|weeks|months)/i]) assert.ok(!word.test(shown), `found ${word}`);
});

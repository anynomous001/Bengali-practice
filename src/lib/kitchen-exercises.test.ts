// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { checkBuild, checkCategories, checkCounter, checkDialogue, checkFill, tilesFor } from "./kitchen-exercises";
import { KITCHEN } from "../data/kitchen/content";

const ex = (type: string) => KITCHEN.exercises.find((e) => e.type === type)!;

test("every exercise answer is accepted, and a wrong answer is not", () => {
  for (const it of ex("build").items) {
    assert.ok(checkBuild(it.answer.split(" "), it.answer));
    assert.ok(!checkBuild([...it.answer.split(" ")].reverse(), it.answer));
    const tiles = tilesFor(it.answer, it.options, () => 0.3);
    assert.equal(tiles.length, it.answer.split(" ").length + it.options.length);
    for (const w of it.answer.split(" ")) assert.ok(tiles.includes(w)); // every needed word is on a tile
  }
  for (const it of ex("counter").items) { assert.ok(checkCounter(it.answer.split(" ")[0], it.answer)); assert.equal(it.options.filter((o) => checkCounter(o, it.answer)).length, 1); }
  for (const it of ex("fill").items) { assert.ok(checkFill(it.answer, it.answer)); assert.equal(it.options.filter((o) => checkFill(o, it.answer)).length, 1); assert.ok(!checkFill(null, it.answer)); }
});

test("categorise counts the right words and names the wrong ones", () => {
  const c = ex("categorise");
  const all = Object.fromEntries(c.categories.flatMap((k) => k.words.map((w) => [w, k.name])));
  assert.deepEqual(checkCategories(all, c.categories), { correct: 6, total: 6, wrong: [] });
  const one = { ...all, আলু: "Spices" };
  const r = checkCategories(one, c.categories);
  assert.equal(r.correct, 5); assert.deepEqual(r.wrong, ["আলু"]);
  assert.equal(checkCategories({}, c.categories).correct, 0);
});

test("the dialogue is complete when every blank has its word, and each word is used once", () => {
  const d = ex("dialogue");
  const answers = d.items.map((i) => i.answer);
  assert.deepEqual(checkDialogue(answers, answers), [true, true, true, true]);
  assert.deepEqual(checkDialogue([null, answers[1], "দাও", answers[3]], answers), [false, true, false, true]);
  assert.deepEqual([...answers].sort(), [...d.bank].sort());
});

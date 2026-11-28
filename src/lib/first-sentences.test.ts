import { test } from "node:test";
import assert from "node:assert/strict";
import { FIRST_SENTENCES } from "../data/kids-first-sentences";
import { buildTiles, checkBuild, checkFixChoice, checkFixTap, checkMeaningChoice, checkMeaningTyped, fixedSentence, meaningOptions, normalizeMeaning, shuffled, wrongIndex } from "./first-sentences";

const { fix, build, meaning } = FIRST_SENTENCES.practice;
const seeded = (seed: number) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

// ---- A. Fix it!
test("fix it: the wrong word is found in every item, and only that word counts as the right tap", () => {
  for (const item of fix) {
    const wi = wrongIndex(item);
    assert.ok(wi >= 0, item.id);
    assert.equal(checkFixTap(item, wi), true, item.id);
    item.sentence.forEach((_, i) => { if (i !== wi) assert.equal(checkFixTap(item, i), false, `${item.id} word ${i}`); });
  }
});
test("fix it: only the right replacement passes, and the fixed sentence has it in place", () => {
  for (const item of fix) {
    assert.equal(checkFixChoice(item, item.fix), true, item.id);
    const wrong = item.options.filter((o) => o.roman !== item.fix.roman);
    assert.equal(wrong.length, item.options.length - 1, `${item.id}: the right word appears once`);
    wrong.forEach((o) => assert.equal(checkFixChoice(item, o), false, `${item.id} ${o.roman}`));
    assert.equal(fixedSentence(item)[wrongIndex(item)].roman, item.fix.roman);
    assert.equal(fixedSentence(item).length, item.sentence.length);
  }
});
test("fix it: three options each, and the wrong word itself is not an option", () => {
  for (const item of fix) {
    assert.equal(item.options.length, 3, item.id);
    assert.ok(!item.options.some((o) => o.roman.toLowerCase() === item.wrong.toLowerCase()), item.id);
  }
});
test("fix it: tapping outside the sentence is wrong", () => {
  assert.equal(checkFixTap(fix[0], 99), false);
  assert.equal(checkFixTap(fix[0], -1), false);
});

// ---- B. Build the sentence
test("build: the tiles are shuffled, never in the right order, and keep every word", () => {
  for (const item of build) {
    for (let s = 1; s <= 8; s++) {
      const tiles = buildTiles(item, seeded(s));
      assert.equal(tiles.length, item.tiles.length);
      assert.notDeepEqual(tiles.map((t) => t.word.roman), item.tiles.map((t) => t.roman), `${item.id} seed ${s}`);
      assert.deepEqual(tiles.map((t) => t.word.roman).sort(), item.tiles.map((t) => t.roman).sort());
    }
  }
});
test("build: the right order is correct, whatever order the tiles started in", () => {
  for (const item of build) {
    const tiles = buildTiles(item, seeded(7));
    const used = new Set<string>();
    const placed = item.tiles.map((w) => tiles.find((t) => t.word.roman === w.roman && !used.has(t.key) && (used.add(t.key), true))!);
    assert.equal(checkBuild(item, placed), "correct", item.id);
  }
});
test("build: a wrong order, an unfinished sentence and nothing placed are told apart", () => {
  const item = build[0]; // Amar ekta kukur ache
  const tiles = item.tiles.map((word, i) => ({ key: `k${i}`, word }));
  assert.equal(checkBuild(item, []), "empty");
  assert.equal(checkBuild(item, tiles.slice(0, 2)), "incomplete");
  assert.equal(checkBuild(item, [tiles[1], tiles[0], tiles[2], tiles[3]]), "wrong");
  assert.equal(checkBuild(item, [...tiles].reverse()), "wrong");
  assert.equal(checkBuild(item, tiles), "correct");
});
test("build: a short two-word sentence can be built either way round only one way is right", () => {
  const item = build.find((b) => b.id === "bd-5")!; // Ball kothay?
  const [a, b] = item.tiles.map((word, i) => ({ key: `k${i}`, word }));
  assert.equal(checkBuild(item, [a, b]), "correct");
  assert.equal(checkBuild(item, [b, a]), "wrong");
});
test("build: completion, every item can be finished by placing its tiles in order", () => {
  let finished = 0;
  for (const item of build) {
    const tiles = item.tiles.map((word, i) => ({ key: `k${i}`, word }));
    if (checkBuild(item, tiles) === "correct") finished++;
  }
  assert.equal(finished, build.length);
});

// ---- C. What does it mean?
test("meaning: every item has options that include its meaning once, with different distractors", () => {
  meaning.forEach((item, i) => {
    for (const count of [3, 4]) {
      const opts = meaningOptions(meaning, i, count, seeded(i + count));
      assert.equal(opts.length, count, `${item.id} ${count}`);
      assert.equal(new Set(opts.map(normalizeMeaning)).size, opts.length, "no duplicate options");
      assert.equal(opts.filter((o) => checkMeaningChoice(item, o)).length, 1, `${item.id}: exactly one right option`);
    }
  });
});
test("meaning: choosing the right and the wrong option", () => {
  const item = meaning[0];
  assert.equal(checkMeaningChoice(item, "I'm hungry."), true);
  assert.equal(checkMeaningChoice(item, "I'm thirsty."), false);
});
test("meaning: a typed answer is judged kindly (capitals, punctuation, I'm / I am)", () => {
  const hungry = meaning[0];
  for (const ok of ["I'm hungry.", "i'm hungry", "I am hungry", "  I AM HUNGRY!  ", "I’m hungry"]) assert.equal(checkMeaningTyped(hungry, ok), true, ok);
  for (const bad of ["", "   ", "I'm thirsty", "hungry", "I am very hungry"]) assert.equal(checkMeaningTyped(hungry, bad), false, bad);
  assert.equal(checkMeaningTyped(meaning.find((m) => m.id === "mn-9")!, "where is mom"), true);
});
test("meaning: all ten items are in the data, each answer is unique", () => {
  assert.equal(meaning.length, 10);
  assert.equal(new Set(meaning.map((m) => normalizeMeaning(m.meaning))).size, 10);
});

// ---- shuffling
test("shuffled keeps every item and does not change its input", () => {
  const a = [1, 2, 3, 4, 5];
  const s = shuffled(a, seeded(3));
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
  assert.deepEqual([...s].sort(), a);
});

// ---- the lesson data
test("data: counts match the lesson plan and every item has script, Banglish and English", () => {
  const d = FIRST_SENTENCES;
  assert.equal(d.words.length, 8); assert.equal(d.helpers.length, 4); assert.equal(d.frames.length, 7); assert.equal(d.cheatSheet.length, 8);
  assert.equal(fix.length, 6); assert.equal(build.length, 6); assert.equal(meaning.length, 10);
  const items = [...d.words, ...d.helpers, ...d.frames.flatMap((f) => [f.frame, ...f.examples, f.situation.line]), ...d.cheatSheet.map((c) => c.example), ...build.map((b) => b.answer), ...meaning.map((m) => m.phrase)];
  for (const x of items) {
    assert.match(x.bengali, /[ঀ-৿]/, x.id); assert.match(x.roman, /[A-Za-z]/, x.id); assert.ok(x.english.length > 1, x.id); assert.match(x.id, /^fs-/);
  }
  for (const l of d.roleplay.lines) { assert.match(l.bengali, /[ঀ-৿]/, l.id); assert.ok(l.roman && l.english, l.id); }
  assert.equal(d.frames[0].examples.length, 3); // hungry, thirsty, sleepy
  assert.ok(d.frames.slice(1).every((f) => f.examples.length === 2));
});
test("data: the built sentence's words are exactly its tiles", () => {
  for (const b of build) {
    const said = b.answer.roman.replace(/[.?!]/g, "").split(" ").map((x) => x.toLowerCase());
    assert.deepEqual(b.tiles.map((t) => t.roman.toLowerCase()), said, b.id);
    assert.equal(b.tiles.map((t) => t.bengali).join(" ").replace(/[।?]/g, ""), b.answer.bengali.replace(/[।?]/g, ""), b.id);
  }
});

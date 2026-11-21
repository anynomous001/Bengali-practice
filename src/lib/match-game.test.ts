// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { attempt, isDone, newRound, type MatchState } from "./match-game";

const ALL = ["boso", "darao", "dekho", "shono", "dao", "nao", "lafao", "thamo", "hnato", "bolo"];
const seeded = (seed: number) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const round = (size = 3): MatchState => newRound(ALL, size, seeded(7));

test("a new round has the right number of distinct commands, shuffled apart", () => {
  for (const size of [3, 5, 10]) {
    const r = newRound(ALL, size, seeded(size));
    assert.equal(r.ids.length, size);
    assert.equal(new Set(r.ids).size, size);
    assert.deepEqual([...r.cardOrder].sort(), [...r.ids].sort());
    assert.deepEqual([...r.boxOrder].sort(), [...r.ids].sort());
    assert.notDeepEqual(r.cardOrder, r.boxOrder);
    assert.equal(r.matched.length, 0);
  }
  assert.equal(newRound(ALL, 50).ids.length, ALL.length); // asking for more than exist gives all of them
});

test("a correct match counts once", () => {
  const r = round();
  const id = r.ids[0];
  const res = attempt(r, id, id);
  assert.equal(res.outcome, "correct");
  assert.deepEqual(res.state.matched, [id]);
  assert.equal(res.state.tries, 0);
});

test("a wrong match changes nothing except the tries counter", () => {
  const r = round();
  const res = attempt(r, r.ids[0], r.ids[1]);
  assert.equal(res.outcome, "wrong");
  assert.deepEqual(res.state.matched, []);
  assert.equal(res.state.tries, 1);
});

test("a double drop, or a drop on a matched box, is ignored", () => {
  const r = round();
  const id = r.ids[0];
  const once = attempt(r, id, id).state;
  const twice = attempt(once, id, id);
  assert.equal(twice.outcome, "ignored");
  assert.deepEqual(twice.state.matched, [id]);
  assert.equal(attempt(once, r.ids[1], id).outcome, "ignored"); // the box is already taken
  assert.equal(attempt(once, id, r.ids[1]).outcome, "ignored"); // the picture is already placed
  assert.equal(attempt(r, "not-in-round", r.ids[0]).outcome, "ignored");
});

test("the round is complete when every command is matched, and wrong tries on the way do not stop it", () => {
  let r = round(5);
  assert.equal(isDone(r), false);
  r.ids.forEach((id, k) => {
    const other = r.ids.find((x) => x !== id && !r.matched.includes(x));
    if (other) r = attempt(r, id, other).state; // a wrong try first, while another box is still open
    r = attempt(r, id, id).state;
    assert.equal(isDone(r), k === r.ids.length - 1);
  });
  assert.equal(r.matched.length, 5);
  assert.equal(r.tries, 4); // the last picture had no other open box to try
  assert.equal(attempt(r, r.ids[0], r.ids[0]).outcome, "ignored"); // nothing left to do
});

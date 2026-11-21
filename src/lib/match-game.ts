// The rules of Drag & Match, with no React in it so they can be tested on their own.
// A round has some commands (ids). The pictures and the word boxes are shuffled separately. Matching a picture to its own
// box counts; a wrong match changes nothing except the "tries" counter (there is no penalty); a picture or box that is
// already matched, or an id that is not in the round, is ignored, so a double drop can never break the round.

export type MatchState = {
  ids: string[];        // the commands in this round
  cardOrder: string[];  // the order the pictures are shown in
  boxOrder: string[];   // the order the word boxes are shown in
  matched: string[];    // ids matched so far, in order
  tries: number;        // wrong attempts, for the tutor to see only
};

export type Outcome = "correct" | "wrong" | "ignored";

export function shuffle<T>(items: T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** A fresh round of `size` distinct commands (or all of them, if there are fewer). Pictures and boxes are shuffled apart, and never left in the same order when there is more than one. */
export function newRound(all: string[], size: number, rand: () => number = Math.random): MatchState {
  const n = Math.max(1, Math.min(Math.floor(size) || 1, all.length));
  const ids = shuffle(all, rand).slice(0, n);
  const cardOrder = shuffle(ids, rand);
  let boxOrder = shuffle(ids, rand);
  if (n > 1 && boxOrder.every((id, i) => id === cardOrder[i])) boxOrder = [...boxOrder.slice(1), boxOrder[0]];
  return { ids, cardOrder, boxOrder, matched: [], tries: 0 };
}

export function isMatched(state: MatchState, id: string) { return state.matched.includes(id); }
export function isDone(state: MatchState) { return state.ids.length > 0 && state.matched.length === state.ids.length; }

/** Try to put picture `cardId` into the box for `boxId`. Returns the new state and what happened. */
export function attempt(state: MatchState, cardId: string, boxId: string): { state: MatchState; outcome: Outcome } {
  const inRound = (id: string) => state.ids.includes(id);
  if (!inRound(cardId) || !inRound(boxId) || isMatched(state, cardId) || isMatched(state, boxId)) return { state, outcome: "ignored" };
  if (cardId === boxId) return { state: { ...state, matched: [...state.matched, cardId] }, outcome: "correct" };
  return { state: { ...state, tries: state.tries + 1 }, outcome: "wrong" };
}

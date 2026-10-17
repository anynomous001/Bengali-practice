/**
 * Example classmates shown on the leaderboard, labelled "Practice buddy"; they are not real people.
 * Each one paces itself to the viewer's own daily goal: `factor` is the share of that goal pace they keep up.
 * Meeting your goal every day puts you above the ones under 1.
 */
export const BUDDIES = [
  { name: "Ananya", factor: 1.2 },
  { name: "Rohan", factor: 0.9 },
  { name: "Meera", factor: 0.65 },
  { name: "Arjun", factor: 0.4 },
];
/** Buddies disappear once this many real students are on the board. */
export const BUDDY_MAX_REAL = 8;

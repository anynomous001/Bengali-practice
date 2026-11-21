# Drag & Match: Bengali Commands

The game is at `/learn/kids/games/commands` (Kids, then Spell School, then Drag & Match).

| Part | File |
|---|---|
| The list of commands | `src/data/commands-game.ts` |
| The match rules (no React, tested) | `src/lib/match-game.ts`, tests in `src/lib/match-game.test.ts` |
| The game screen | `src/app/learn/kids/wizard/CommandMatch.tsx`, styles in `commands.css` |
| The page (reads the list, passes it down) | `src/app/learn/kids/games/commands/page.tsx` |
| Photos | `public/assets/commands/<id>.webp` (square, 512 x 512) |
| Tutor recordings (optional) | `public/assets/audio/<id>.mp3` |

## Add a command

1. Add the photo `public/assets/commands/<id>.webp` (square, 512 x 512).
2. Optional: add your recording `public/assets/audio/<id>.mp3`. Without it the app speaks the word with its Bengali voice.
3. Add one line to `COMMANDS` in `src/data/commands-game.ts`:

   ```ts
   { id: "khao", bn: "খাও", ro: "khao", en: "Eat", alt: "A boy eating an apple" },
   ```

   `alt` describes the photo for screen readers. `image` and `audio` can be set on the line if a file lives somewhere else.
4. That is all. Rounds of 3, 5 or 10 are picked at random from the whole list.

If the photo is missing the card shows a plain "Picture" tile, so the game still works while you add files.

## How it plays

- Drag a picture onto a word box (mouse, finger or pen). Or tap a picture, then tap a box. With a keyboard: Tab to a picture, Enter to pick it up, Tab to a box, Enter to place it. Escape puts the picture down.
- Right: the picture snaps into the box, a chime plays, the word is spoken, the score goes up. Wrong: the picture shakes and goes back, with no penalty.
- Listen mode hides the words. The tutor says a command (or taps 🔊 on a box) and the child finds the picture.
- A round of 5 or 10 that is finished is saved to the child's progress (the lesson ticks). Rounds of 3 are not saved. Nothing else is kept.

## Tests

`npm test` runs the match rules (a correct match, a wrong match, a double drop, a finished round).

# Kitchen Bengali

A separate journey for people who work in restaurant kitchens with Bengali-speaking colleagues. It is in the sidebar as **Kitchen Bengali** (`/learn/kitchen`) and on the home page with the other courses.

| Part | File |
|---|---|
| The content (single source of truth) | `content-drafts/kitchen/content.md` |
| Builds the data from it | `python3 content-drafts/build_kitchen.py` writes `src/data/kitchen/content.ts` |
| Settings with no Bengali (speeds, English plurals, picture icons) | `src/data/kitchen/config.ts` |
| Pages | `src/app/learn/kitchen/` (`stage/[n]`, `listening`) |
| Activities | `Cards`, `PictureMatch`, `SentenceBuilder`, `ListeningQuiz`, `Roleplay`, `RecipeReader`, `ProgressCheck` in the same folder |
| Audio | `speech.ts`: the browser voice, `bn-IN`, speeds Slow 0.6, Normal 0.8, Faster 1.0 |

## Change the content

Edit `content-drafts/kitchen/content.md`, run `python3 content-drafts/build_kitchen.py`, then `npm test`. The test checks that every Bengali word, romanization and English meaning in the data is in `content.md`. Do not edit `content.ts` by hand.

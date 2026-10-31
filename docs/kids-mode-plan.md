# Kids mode (ছোটদের): plan

A separate, picture-first interface for young children learning Bengali, built to sit beside the grown-up app. It shares the sign-in, the brand colors and the Bengali voice, but not the layout: no sidebar, no lesson lists, no progress bars or counts. Big pictures, big tap targets, stars.

Route: `/kids` (outside `/learn`, with its own layout). Reached from a "Kids" link in the grown-up sidebar. Access check is the same as the rest of the app.

## Pictures
Never copy cartoons from websites and never use known characters. Only free libraries that allow commercial use:
- **Twemoji** (`@twemoji/svg`, graphics CC-BY 4.0, code MIT): used now. SVGs are copied into `public/kids/pic/`. Credit shown in the kids footer.
- OpenMoji (CC BY-SA 4.0) and Noto Emoji are the fallbacks if a picture is missing from Twemoji.
- The "body" figure is our own SVG cartoon child, drawn in this repo, so it is ours (step 4).

## Build order (each step is usable with a child as soon as it ships)
1. **Picture card.** Big picture, then English, romanized, Bengali. Tap to hear the word, tap again to hear it slowly. A grown-up switch hides the English (hold the grown-ups button for one second to open it, so a child cannot hit it by accident).
2. **Kids home (ছোটদের).** Six big tiles: Hello, Colours, Animals, My body, Numbers, Family. Stars on each tile, no counts. Six words per topic to start (`src/data/kids.ts`).
3. **Tap what you hear.** The app says a word; the child picks the picture out of three. Right: a star pops with a sound. Wrong: the card shakes gently and they try again.
4. **Body figure (Simon Says).** Our own SVG child with labels. Learn mode: tap a part to hear it. Game mode: "মাথা" and the child taps the head.
5. **Colour hunt.** Balloons or objects; the app says "লাল!" and the child taps the red one.
6. **Count with me (1 to 10).** Tap mangoes or balloons one by one while hearing এক, দুই, তিন. Then "How many ducks?" with three choices.
7. **Star chart and rewards.** A star per finished game, a sticker every 5 stars, and a simple parent view of what the child practised this week (for lesson recaps). This is the first step that needs a database table (`kid_stars`); until then stars live in the browser.
8. **Rhymes and stories.** One short rhyme with pictures and audio, then the existing fables as picture books: one picture and one short sentence per page.

## Rules for kids content
- Words are real Bengali from the grown-up vocabulary where it exists; `scripts/check-kids.ts` flags any kids word missing from it.
- American spelling in English labels; romanization in lowercase to match the rest of the app.
- Audio uses the same Sarvam voice and `/api/audio`; kids words are added to `scripts/make-audio.ts` so they have clips, with the browser voice as the fallback.
- No timers, no lives, no negative scoring. A wrong answer is a gentle shake and another try.
- Stars only. No leaderboards.

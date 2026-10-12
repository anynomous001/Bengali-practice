# Pronunciation clips

Each file is `<id>.mp3`, where `<id>` is the id of the text it says (see `npm run audio -- --list`).
The app plays a clip when one exists and otherwise falls back to the browser's Bengali voice.
Clips are served only to signed-in students with access (`/api/audio`); they are never in `public/`.

- Generate clips with a neural voice: `TTS_API_KEY=... npm run audio` (details at the top of `scripts/make-audio.ts`).
- Use your teacher's recordings instead: record each item, save it as `<id>.mp3` here. Existing clips are never overwritten.
- Commit the clips so they deploy with the app.

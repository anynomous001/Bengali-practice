# Pronunciation clips

Each file is `<id>.mp3`, where `<id>` is the id of the text it says (see `npm run audio -- --list`).
The app plays a clip when one exists and otherwise falls back to the browser's Bengali voice.
Clips are served only to signed-in students with access (`/api/audio`); they are never in `public/`.

- Generate clips with a neural voice (details at the top of `scripts/make-audio.ts`). Try voices first: `TTS_PROVIDER=sarvam TTS_API_KEY=... TTS_VOICES=a,b npm run audio -- --sample` writes 10 test clips per voice to `content-audio/samples/` (not committed). Then `TTS_PROVIDER=sarvam TTS_API_KEY=... TTS_VOICE=<speaker> npm run audio` makes the real clips (letters, numbers, vocabulary words; add `--phrases` for phrases).
- Use your teacher's recordings instead: record each item, save it as `<id>.mp3` here. Existing clips are never overwritten.
- Commit the clips so they deploy with the app.

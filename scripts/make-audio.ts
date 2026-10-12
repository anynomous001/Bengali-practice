/**
 * Make pronunciation clips for everything the app can say aloud.
 *
 *   TTS_API_KEY=... npm run audio                 # Google Cloud Text-to-Speech (default)
 *   TTS_PROVIDER=azure TTS_API_KEY=... TTS_REGION=centralindia npm run audio
 *   npm run audio -- --list        # print the texts and ids, make nothing (use this for recordings)
 *   npm run audio -- --voices      # list the Bengali voices your provider offers (Google)
 *   npm run audio -- --force       # regenerate even clips that exist
 *
 * Clips are written to content-audio/<id>.mp3 and served only to signed-in students (see /api/audio).
 * A clip that already exists is never overwritten, so a recording by your teacher
 * (saved under the same <id>.mp3 name) always wins over a generated voice.
 */
import { mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { audioId } from "../src/lib/audio";
import { LETTERS } from "../src/data/letters";
import { NUMBERS } from "../src/data/numbers";
import { SENTENCES } from "../src/data/sentences";
import { DECKS } from "../src/data/decks";
import { STORIES } from "../src/data/stories";

const DIR = path.join(process.cwd(), "content-audio");
const args = new Set(process.argv.slice(2));
const provider = (process.env.TTS_PROVIDER ?? "google").toLowerCase();
const key = process.env.TTS_API_KEY ?? "";
const endpoint = process.env.TTS_ENDPOINT; // override, used by the tests
const voiceName = process.env.TTS_VOICE ?? (provider === "azure" ? "bn-IN-TanishaaNeural" : "bn-IN-Wavenet-A");
const TAKA = "টাকা";

/** Every text the app speaks, with where it comes from. */
function collect(): Map<string, string> {
  const out = new Map<string, string>();
  const add = (text: string | null | undefined, from: string) => {
    const t = text?.normalize("NFC").trim();
    if (t && !out.has(t)) out.set(t, from);
  };
  for (const l of LETTERS) { add(l.ch, "letter"); add(l.word, "letter word"); }
  for (const n of NUMBERS) { add(n.word, "number"); add(`${n.word} ${TAKA}`, "price"); }
  for (const s of SENTENCES) add(s.bn, "sentence");
  for (const d of DECKS) for (const c of d.cards) add(c.speak, `deck ${d.id}`);
  for (const s of STORIES) {
    add(s.title[0], `story ${s.id}`);
    for (const l of s.lines) add(l[0], `story ${s.id}`);
    for (const v of s.vocab) add(v[0], `story ${s.id} vocab`);
    add(s.lines.map((l) => l[0]).join(" "), `story ${s.id} whole`);
  }
  return out;
}

async function synth(text: string): Promise<Buffer> {
  if (provider === "azure") {
    const region = process.env.TTS_REGION ?? "centralindia";
    const url = endpoint ?? `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const ssml = `<speak version="1.0" xml:lang="bn-IN"><voice name="${voiceName}"><prosody rate="-10%">${esc}</prosody></voice></speak>`;
    const r = await fetch(url, { method: "POST", headers: { "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3" }, body: ssml });
    if (!r.ok) throw new Error(`Azure ${r.status}: ${await r.text()}`);
    return Buffer.from(await r.arrayBuffer());
  }
  const url = endpoint ?? `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`;
  const r = await fetch(url, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: { text }, voice: { languageCode: "bn-IN", name: voiceName }, audioConfig: { audioEncoding: "MP3", speakingRate: 0.9 } }),
  });
  if (!r.ok) throw new Error(`Google ${r.status}: ${await r.text()}`);
  return Buffer.from(((await r.json()) as { audioContent: string }).audioContent, "base64");
}

const exists = (f: string) => access(f).then(() => true, () => false);

async function main() {
  const texts = collect();
  if (args.has("--list")) {
    for (const [t, from] of texts) console.log(`${audioId(t)}\t${from}\t${t}`);
    console.log(`\n${texts.size} texts`);
    return;
  }
  if (args.has("--voices")) {
    const r = await fetch(endpoint ?? `https://texttospeech.googleapis.com/v1/voices?languageCode=bn-IN&key=${encodeURIComponent(key)}`);
    const j = (await r.json()) as { voices?: { name: string; ssmlGender: string }[] };
    for (const v of j.voices ?? []) console.log(v.name, v.ssmlGender);
    return;
  }
  if (!key) { console.error("Set TTS_API_KEY (see the comment at the top of this file)."); process.exit(1); }
  await mkdir(DIR, { recursive: true });
  let made = 0, kept = 0, failed = 0;
  for (const [text] of texts) {
    const file = path.join(DIR, `${audioId(text)}.mp3`);
    if (!args.has("--force") && (await exists(file))) { kept++; continue; }
    try { await writeFile(file, await synth(text)); made++; process.stdout.write("."); }
    catch (e) { failed++; console.error(`\nfailed: ${text}: ${(e as Error).message}`); if (failed >= 5) { console.error("Stopping after 5 failures."); break; } }
  }
  const index = Object.fromEntries([...texts].map(([t, from]) => [audioId(t), { text: t, from }]));
  await writeFile(path.join(DIR, "index.json"), JSON.stringify(index, null, 1));
  const total = (await readdir(DIR)).filter((f) => f.endsWith(".mp3")).length;
  console.log(`\nmade ${made}, kept ${kept}, failed ${failed}. ${total} clips in content-audio/`);
}
main();

/**
 * Make pronunciation clips for the places the app plays sound: letters (and their example words),
 * numbers, and vocabulary words. Phrases are left out unless you ask for them with --phrases.
 *
 *   TTS_PROVIDER=sarvam TTS_API_KEY=... TTS_VOICE=<speaker> npm run audio -- --sample
 *       # 10 test clips per voice in content-audio/samples/, for your teacher to compare. TTS_VOICES=a,b,c tries several.
 *   TTS_PROVIDER=sarvam TTS_API_KEY=... TTS_VOICE=<speaker> npm run audio
 *   TTS_PROVIDER=google TTS_API_KEY=... npm run audio          # Google Cloud Text-to-Speech (needs a billing account)
 *   TTS_PROVIDER=azure TTS_API_KEY=... TTS_REGION=centralindia npm run audio
 *   npm run audio -- --list        # print the texts and ids, make nothing (use this for recordings)
 *   npm run audio -- --voices      # list the Bengali voices your provider offers (Google)
 *   npm run audio -- --force       # regenerate even clips that exist
 *
 * Sarvam: TTS_MODEL defaults to bulbul:v3, whose Bengali speakers are shubh (male, the default) and ishita (female).
 * Free keys are limited to about 30 requests a minute, so the script paces itself (TTS_RPM to change it).
 * Generate the final clips through the API with your own key, not the web playground.
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
import { VOCAB } from "../src/data/vocabulary";
import { PATIENT_LINES } from "../src/data/listening-clinical";

const DIR = path.join(process.cwd(), "content-audio");
const args = new Set(process.argv.slice(2));
const provider = (process.env.TTS_PROVIDER ?? "google").toLowerCase();
const key = process.env.TTS_API_KEY ?? "";
const endpoint = process.env.TTS_ENDPOINT; // override, used by the tests
const voiceName = process.env.TTS_VOICE ?? (provider === "azure" ? "bn-IN-TanishaaNeural" : provider === "sarvam" ? "shubh" : "bn-IN-Wavenet-A");
const model = process.env.TTS_MODEL ?? "bulbul:v3";
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
  for (const t of VOCAB) {
    for (const sec of t.sections) for (const w of sec.words) add(w[0], `vocab ${t.id}`);
    if (args.has("--phrases")) for (const p of t.phrases) add(p[0], `vocab ${t.id} phrase`);
  }
  for (const l of PATIENT_LINES) add(l[0], "listening patient");
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function synth(text: string, speaker = voiceName): Promise<Buffer> {
  if (provider === "sarvam") {
    if (!speaker) throw new Error("Set TTS_VOICE to a Sarvam speaker name (see the comment at the top of this file).");
    // bulbul:v3 has shubh (male) and ishita (female). bulbul:v4-flash has arnab_bn_conversation, roopa_bn_conversational, bimal_bn_suspense.
    // Names are lowercase and must match the model.
    let r: Response;
    for (let attempt = 0; ; attempt++) {
      r = await fetch(endpoint ?? "https://api.sarvam.ai/text-to-speech", {
        method: "POST", headers: { "Content-Type": "application/json", "api-subscription-key": key },
        body: JSON.stringify({ text, language_code: "bn-IN", speaker, model, output_audio_codec: "mp3" }),
      });
      if (r.status !== 429 || attempt >= 5) break;
      await sleep(5000 * (attempt + 1)); // over the rate limit: wait, then try again
    }
    if (!r.ok) throw new Error(`Sarvam ${r.status}: ${await r.text()}`);
    const j = (await r.json()) as { audios?: string[] };
    if (!j.audios?.[0]) throw new Error("Sarvam returned no audio");
    return Buffer.from(j.audios[0], "base64");
  }
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

const gap = provider === "sarvam" ? Math.ceil(60000 / Number(process.env.TTS_RPM ?? 28)) : 0;

/** Ten texts that cover what the app says: a letter, a number, short and long words, a conjunct, a price. */
const SAMPLE = ["অ", "ক", "পঞ্চাশ", "জল", "ভাত", "বিদ্যালয়", "ধন্যবাদ", "আমি ভালো আছি।", "একশো টাকা", "স্বাগতম"];

async function sample() {
  const voices = (process.env.TTS_VOICES ?? voiceName).split(",").map((v) => v.trim()).filter(Boolean);
  if (!voices.length) { console.error("Set TTS_VOICE (or TTS_VOICES=a,b,c) to try."); process.exit(1); }
  const dir = path.join(DIR, "samples");
  await mkdir(dir, { recursive: true });
  for (const v of voices) {
    for (const [i, t] of SAMPLE.entries()) {
      const file = path.join(dir, `${v}-${String(i + 1).padStart(2, "0")}.mp3`);
      await writeFile(file, await synth(t, v));
      process.stdout.write(".");
      if (gap) await sleep(gap);
    }
  }
  await writeFile(path.join(dir, "samples.txt"), SAMPLE.map((t, i) => `${i + 1}\t${t}`).join("\n") + "\n");
  console.log(`\n${voices.length * SAMPLE.length} sample clips in content-audio/samples/ (numbers match samples.txt). Nothing was added to the app.`);
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
  if (args.has("--sample")) return sample();
  await mkdir(DIR, { recursive: true });
  let made = 0, kept = 0, failed = 0;
  for (const [text] of texts) {
    const file = path.join(DIR, `${audioId(text)}.mp3`);
    if (!args.has("--force") && (await exists(file))) { kept++; continue; }
    try { await writeFile(file, await synth(text)); made++; process.stdout.write("."); if (gap) await sleep(gap); }
    catch (e) { failed++; console.error(`\nfailed: ${text}: ${(e as Error).message}`); if (failed >= 5) { console.error("Stopping after 5 failures."); break; } }
  }
  const index = Object.fromEntries([...texts].map(([t, from]) => [audioId(t), { text: t, from }]));
  await writeFile(path.join(DIR, "index.json"), JSON.stringify(index, null, 1));
  const total = (await readdir(DIR)).filter((f) => f.endsWith(".mp3")).length;
  console.log(`\nmade ${made}, kept ${kept}, failed ${failed}. ${total} clips in content-audio/`);
}
main();

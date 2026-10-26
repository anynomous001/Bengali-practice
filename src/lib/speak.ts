/**
 * Say Bengali text aloud.
 * 1. Plays a recorded or generated clip (/api/audio) when there is one: consistent on every device.
 * 2. Otherwise uses the best Bengali voice the browser has, preferring West Bengal (bn-IN) voices.
 */
let audio: HTMLAudioElement | null = null;
const noClip = new Set<string>(); // texts with no clip, so we go straight to the browser voice next time
let voices: SpeechSynthesisVoice[] = [];

function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  voices = speechSynthesis.getVoices();
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  // Browsers fill the voice list asynchronously; asking too early gets the wrong (default) voice.
  speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
}

function bestVoice(): SpeechSynthesisVoice | undefined {
  const score = (v: SpeechSynthesisVoice) =>
    (/^bn[-_]IN/i.test(v.lang) ? 10 : /^bn/i.test(v.lang) ? 4 : -100) + (/natural|neural|online|google/i.test(v.name) ? 3 : 0) + (v.localService ? 0 : 1);
  return [...voices].sort((a, b) => score(b) - score(a)).find((v) => score(v) > 0);
}

function useBrowserVoice(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) { onEnd?.(); return; }
  if (!voices.length) loadVoices();
  const voice = bestVoice();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice ?? null;
  u.lang = voice?.lang ?? "bn-IN";
  u.rate = 0.85;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export function speak(text: string) {
  if (typeof window === "undefined") return;
  audio?.pause();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  if (noClip.has(text)) return useBrowserVoice(text);

  // The element is created and started inside the tap, which keeps mobile Safari happy.
  const a = new Audio(`/api/audio?t=${encodeURIComponent(text)}`);
  audio = a;
  a.addEventListener("error", () => { noClip.add(text); useBrowserVoice(text); }, { once: true });
  a.play().catch(() => { /* an error event handles missing clips; a blocked play does nothing */ });
}

/** Like speak, but resolves when the clip has finished, so a list of words can be played one after another. */
export function speakThen(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    audio?.pause();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (noClip.has(text)) return useBrowserVoice(text, resolve);
    const a = new Audio(`/api/audio?t=${encodeURIComponent(text)}`);
    audio = a;
    a.addEventListener("ended", () => resolve(), { once: true });
    a.addEventListener("error", () => { noClip.add(text); useBrowserVoice(text, resolve); }, { once: true });
    a.play().catch(() => resolve());
  });
}

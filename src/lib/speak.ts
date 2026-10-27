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

const key = (text: string, slow: boolean) => (slow ? `slow|${text}` : text);
const clipUrl = (text: string, slow: boolean) => `/api/audio?t=${encodeURIComponent(text)}${slow ? "&v=slow" : ""}`;

function useBrowserVoice(text: string, onEnd?: () => void, slow = false) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) { onEnd?.(); return; }
  if (!voices.length) loadVoices();
  const voice = bestVoice();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice ?? null;
  u.lang = voice?.lang ?? "bn-IN";
  u.rate = slow ? 0.65 : 0.85;
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export function speak(text: string, slow = false) {
  if (typeof window === "undefined") return;
  audio?.pause();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  if (noClip.has(key(text, slow))) return useBrowserVoice(text, undefined, slow);

  // The element is created and started inside the tap, which keeps mobile Safari happy.
  const a = new Audio(clipUrl(text, slow));
  audio = a;
  a.addEventListener("error", () => { noClip.add(key(text, slow)); useBrowserVoice(text, undefined, slow); }, { once: true });
  a.play().catch(() => { /* an error event handles missing clips; a blocked play does nothing */ });
}

/** Like speak, but resolves when the clip has finished, so a list of words can be played one after another. */
export function speakThen(text: string, slow = false): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    audio?.pause();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (noClip.has(key(text, slow))) return useBrowserVoice(text, resolve, slow);
    const a = new Audio(clipUrl(text, slow));
    audio = a;
    a.addEventListener("ended", () => resolve(), { once: true });
    a.addEventListener("error", () => { noClip.add(key(text, slow)); useBrowserVoice(text, resolve, slow); }, { once: true });
    a.play().catch(() => resolve());
  });
}

/** Stops whatever is playing. */
export function stopSpeaking() {
  if (typeof window === "undefined") return;
  audio?.pause();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

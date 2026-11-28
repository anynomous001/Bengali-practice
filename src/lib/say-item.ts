// Say one lesson item aloud: its recorded clip /assets/audio/<id>.mp3 when the file exists, otherwise the app's Bengali voice
// (speech synthesis, bn-IN). Missing files and missing voices never raise an error: the button just stays quiet.
import { speak } from "@/lib/speak";

const missing = new Set<string>();
let playing: HTMLAudioElement | null = null;

export function sayItem(id: string, bengali: string): void {
  if (typeof window === "undefined") return;
  const url = `/assets/audio/${id}.mp3`;
  const fallback = () => { missing.add(url); try { speak(bengali); } catch { /* no voice available */ } };
  try {
    playing?.pause();
    if (missing.has(url)) return fallback();
    const a = new Audio(url);
    playing = a;
    a.addEventListener("error", fallback, { once: true });
    a.play().catch(() => { /* a missing file raises the error event above; a play blocked by the browser does nothing */ });
  } catch { fallback(); }
}

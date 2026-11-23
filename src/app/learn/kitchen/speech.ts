"use client";

// Kitchen Bengali audio: the browser's speech voice, language bn-IN, at the speed the learner chose.
// If the device has no Bengali voice the default voice is used, and the page shows a note. Nothing fails silently.
import { useSyncExternalStore } from "react";
import { DEFAULT_SPEED, SPEEDS, type SpeedId } from "@/data/kitchen/config";

type VoiceState = "unknown" | "bengali" | "default" | "none";

let speed: SpeedId = DEFAULT_SPEED;       // kept in memory for the session
let voiceState: VoiceState = "unknown";
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

const synth = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);

function findBengaliVoice(): SpeechSynthesisVoice | undefined {
  const s = synth();
  if (!s) return undefined;
  const all = s.getVoices();
  return all.find((v) => /^bn[-_]IN$/i.test(v.lang)) ?? all.find((v) => /^bn/i.test(v.lang));
}

function refreshVoices() {
  const s = synth();
  const next: VoiceState = !s ? "none" : findBengaliVoice() ? "bengali" : s.getVoices().length ? "default" : voiceState === "default" ? "default" : "unknown";
  if (next !== voiceState) { voiceState = next; emit(); }
}
if (typeof window !== "undefined") {
  refreshVoices();
  synth()?.addEventListener?.("voiceschanged", refreshVoices);
}

export const useSpeed = () => useSyncExternalStore(subscribe, () => speed, () => DEFAULT_SPEED);
export const useVoiceState = () => useSyncExternalStore(subscribe, () => voiceState, () => "unknown" as VoiceState);
export function setSpeed(id: SpeedId) { speed = id; emit(); }
const rate = () => SPEEDS.find((s) => s.id === speed)!.rate;

/** Say Bengali text aloud. `onEnd` runs when it finishes (or cannot play), so a list can be played one line after another. */
export function speakBn(text: string, onEnd?: () => void) {
  const s = synth();
  if (!s) { voiceState = "none"; emit(); onEnd?.(); return; }
  s.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = findBengaliVoice();
  u.lang = "bn-IN";
  u.rate = rate();
  if (voice) u.voice = voice;
  if (!voice && voiceState !== "default") { voiceState = "default"; emit(); } // no Bengali voice: tell the learner
  if (onEnd) { u.onend = () => onEnd(); u.onerror = () => onEnd(); }
  s.speak(u);
}

export function stopSpeaking() { synth()?.cancel(); }

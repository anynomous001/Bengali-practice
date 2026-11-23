"use client";

import { SPEEDS } from "@/data/kitchen/config";
import { setSpeed, useSpeed, useVoiceState } from "./speech";

/** The speed choice for all audio on the page, and a note when the device has no Bengali voice. */
export default function AudioBar() {
  const speed = useSpeed();
  const voice = useVoiceState();
  return (
    <div className="kt-audio">
      <div className="kt-speed" role="radiogroup" aria-label="Speed of the audio">
        <span className="kt-speed-label">Speed</span>
        {SPEEDS.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={speed === s.id} className={speed === s.id ? "on" : ""} onClick={() => setSpeed(s.id)}>{s.label}</button>
        ))}
      </div>
      {voice === "default" && <p className="kt-note" role="status">No Bengali voice was found on this device, so the audio uses the default voice. It may sound different. Audio depends on your device.</p>}
      {voice === "none" && <p className="kt-note" role="status">This device cannot play audio. Audio depends on your device.</p>}
    </div>
  );
}

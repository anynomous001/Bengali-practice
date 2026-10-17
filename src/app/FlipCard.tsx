"use client";

import { useState } from "react";

/** A flashcard drawn in CSS: Bengali on the front, the meaning on the back. Flips on hover, focus or tap. */
export default function FlipCard({ front, back, note }: { front: string; back: string; note: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button type="button" className={"flip" + (flipped ? " is-flipped" : "")} onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} aria-label={`Flashcard: ${front}. Tap to ${flipped ? "hide" : "show"} the meaning.`}>
      <span className="flip-inner">
        <span className="flip-face front" lang="bn">{front}</span>
        <span className="flip-face back"><b>{back}</b><small>{note}</small></span>
      </span>
    </button>
  );
}

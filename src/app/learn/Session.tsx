"use client";

import { useCallback, useEffect, useState } from "react";
import type { Card } from "@/data/decks";
import { rateCard } from "../actions";

type Rating = "again" | "good" | "easy";

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "bn-BD";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export default function Session({
  cards,
  hint,
  autoSpeak,
  backHref,
}: {
  cards: Card[];
  hint?: string;
  autoSpeak?: boolean;
  backHref: string;
}) {
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [missed, setMissed] = useState(0);
  const total = cards.length;
  const card = queue[0];

  const flip = useCallback(() => {
    setFlipped((f) => {
      if (!f && autoSpeak && card) speak(card.speak);
      return !f;
    });
  }, [autoSpeak, card]);

  const rate = useCallback(
    (r: Rating) => {
      if (!card) return;
      void rateCard(card.id, r);
      setFlipped(false);
      if (r === "again") {
        setMissed((m) => m + 1);
        // Show it again after a few other cards (or at the end if the queue is short).
        setQueue((q) => [...q.slice(1, 4), q[0], ...q.slice(4)]);
      } else {
        setDone((d) => d + 1);
        setQueue((q) => q.slice(1));
      }
    },
    [card],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flip();
      } else if (flipped && e.key === "1") rate("again");
      else if (flipped && e.key === "2") rate("good");
      else if (flipped && e.key === "3") rate("easy");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, rate, flip]);

  if (!total) return <p className="card-static">Nothing to review right now. Come back later!</p>;

  if (!card) {
    return (
      <div className="card-static">
        <h2>Session complete 🎉</h2>
        <p>You reviewed {total} card{total === 1 ? "" : "s"}{missed ? ` (${missed} needed another try)` : ""}.</p>
        <a className="btn" href={backHref}>Back to decks</a>
      </div>
    );
  }

  return (
    <>
      <p className="muted">{done} of {total} done · {queue.length} left</p>
      <div className="bar"><div style={{ width: `${(100 * done) / total}%` }} /></div>
      {hint && <p className="hint">{hint}</p>}
      <button className="flash" onClick={flip} aria-label={flipped ? "Hide answer" : "Show answer"}>
        <span className={card.front.length > 3 ? "flash-front small" : "flash-front"}>{card.front}</span>
        {card.frontSub && <span className="muted">{card.frontSub}</span>}
        {flipped ? (
          <span className="flash-back">
            <b>{card.back}</b>
            {card.backSub && <span>{card.backSub}</span>}
          </span>
        ) : (
          <span className="muted">Tap to reveal</span>
        )}
      </button>
      <button className="btn ghost" onClick={() => speak(card.speak)}>🔊 Listen</button>
      {flipped && (
        <div className="rate">
          <button className="btn bad-btn" onClick={() => rate("again")}>Again <small>1</small></button>
          <button className="btn" onClick={() => rate("good")}>Good <small>2</small></button>
          <button className="btn good-btn" onClick={() => rate("easy")}>Easy <small>3</small></button>
        </div>
      )}
      <p className="muted">Space flips the card. Keys 1, 2, 3 rate it.</p>
    </>
  );
}

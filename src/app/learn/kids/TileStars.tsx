"use client";

import { useEffect, useState } from "react";

const KEY = "bp_kid_stars";
/** Stars a child has earned in a topic (kept in this browser for now). Games call addKidStar. */
export function readKidStars(topic: string): number {
  try { return Math.min(3, Number(JSON.parse(localStorage.getItem(KEY) ?? "{}")[topic]) || 0); } catch { return 0; }
}
export function addKidStar(topic: string) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    all[topic] = Math.min(3, (Number(all[topic]) || 0) + 1);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch { /* private mode: stars just do not stick */ }
}

export default function TileStars({ topic }: { topic: string }) {
  const [n, setN] = useState(0);
  useEffect(() => setN(readKidStars(topic)), [topic]);
  return (
    <span className="k-stars" aria-label={`${n} of 3 stars`}>
      {[0, 1, 2].map((i) => <span key={i} className={i < n ? "on" : ""} aria-hidden>★</span>)}
    </span>
  );
}

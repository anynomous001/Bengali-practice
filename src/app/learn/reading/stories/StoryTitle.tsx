"use client";

import { useRoman } from "../../Roman";

/** Title block that follows the Romanized English switch. */
export default function StoryTitle({ bn, roman, en }: { bn: string; roman: string; en: string }) {
  const r = useRoman();
  return (
    <span className="story-title">
      <b lang="bn" className="story-title-bn">{bn}</b>
      <span>{r.roman ? `${roman} · ${en}` : en}</span>
    </span>
  );
}

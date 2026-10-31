"use client";

import { useKidsEnglish } from "./KidsShell";

/** English text that follows the grown-ups switch. */
export default function KidEnglish({ className, children }: { className?: string; children: React.ReactNode }) {
  return useKidsEnglish() ? <span className={className}>{children}</span> : null;
}

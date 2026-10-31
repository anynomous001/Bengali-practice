"use client";

import { useEnglish } from "../Roman";

/** English text that follows the app-wide "English meanings" switch. */
export default function KidEnglish({ className, children }: { className?: string; children: React.ReactNode }) {
  return useEnglish().english ? <span className={className}>{children}</span> : null;
}

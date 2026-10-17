"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

export type Place = "nav" | "hero" | "pricing" | "final" | "sticky" | "quiz";

/** A link to /buy that records where on the landing page it was clicked. Nothing personal is sent. */
export default function BuyLink({ place, className, children }: { place: Place; className?: string; children: React.ReactNode }) {
  return <Link href="/buy" className={className} onClick={() => track("get_access_click", { place })}>{children}</Link>;
}

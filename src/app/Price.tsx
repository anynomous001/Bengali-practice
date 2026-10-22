"use client";

import { useIndia } from "@/lib/geo";

/** The price in the visitor's currency. The page is built once, so it ships both and the visitor's country picks one. */
export function usePrice(usd: number, inr: number) {
  const india = useIndia();
  return {
    india,
    price: india ? `₹${inr.toLocaleString("en-IN")}` : `$${usd}`,
    perMonth: india ? `₹${Math.round(inr / 12 / 10) * 10}` : `$${(usd / 12).toFixed(2)}`,
  };
}

export function Price({ usd, inr, per = false }: { usd: number; inr: number; per?: boolean }) {
  const p = usePrice(usd, inr);
  return <>{per ? p.perMonth : p.price}</>;
}

/** One of two texts, depending on whether the visitor is in India. */
export function IndiaText({ india, other }: { india: string; other: string }) {
  return <>{useIndia() ? india : other}</>;
}

"use client";

import { useEffect, useState } from "react";

export type Geo = { india: boolean; needsConsent: boolean };

let cached: Promise<Geo> | undefined;
/** The visitor's region hints, fetched once per page load. If it fails, assume the strictest analytics setting and dollars. */
export function getGeo(): Promise<Geo> {
  cached ??= fetch("/api/geo", { cache: "no-store" })
    .then((r) => (r.ok ? (r.json() as Promise<Geo>) : Promise.reject()))
    .catch(() => ({ india: false, needsConsent: true }));
  return cached;
}

/** True once we know the visitor is in India (false until then, so pages first show dollars). */
export function useIndia(): boolean {
  const [india, setIndia] = useState(false);
  useEffect(() => { let on = true; getGeo().then((g) => { if (on) setIndia(g.india); }); return () => { on = false; }; }, []);
  return india;
}

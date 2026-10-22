import { track as vercelTrack } from "@vercel/analytics";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

/** Sends a named event to Vercel Analytics and, when it is switched on, Google Analytics 4. Never include personal data. */
export function track(name: string, props?: Record<string, string | number | boolean>) {
  vercelTrack(name, props);
  try { window.gtag?.("event", name, props); } catch { /* analytics must never break the page */ }
}

"use client";

import { useEffect } from "react";

/**
 * The home page is served from the CDN and cannot see the session cookie, which is HttpOnly. This leaves a plain "signed in"
 * hint (no secrets, the real check still happens on the server) that the home page reads to send students straight to the app.
 * "set" renders inside the app; "clear" renders on the sign-in page, so an expired session does not bounce back and forth.
 */
export default function SessionHint({ mode }: { mode: "set" | "clear" }) {
  useEffect(() => {
    document.cookie = mode === "set" ? "bp_in=1; path=/; max-age=2592000; SameSite=Lax" : "bp_in=; path=/; max-age=0; SameSite=Lax";
  }, [mode]);
  return null;
}

/** Runs first on the home page, before anything is painted. */
export const REDIRECT_IF_SIGNED_IN = `if(/(?:^|; )bp_in=1/.test(document.cookie))location.replace("/learn");`;

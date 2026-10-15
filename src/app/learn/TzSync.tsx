"use client";

import { useEffect } from "react";

/** Tells the server which time zone the student is in, so "today" and the streak follow their own calendar. */
export default function TzSync() {
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && !document.cookie.split("; ").some((c) => c === `bp_tz=${encodeURIComponent(tz)}`)) {
        document.cookie = `bp_tz=${encodeURIComponent(tz)}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch { /* time zone not available */ }
  }, []);
  return null;
}

"use client";

import { track } from "@/lib/analytics";
import { useEffect } from "react";

/** Records, once per page view, that the pricing section scrolled into view. */
export default function PricingSeen({ targetId = "pricing" }: { targetId?: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        track("pricing_seen");
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);
  return null;
}

"use client";

import { useEffect } from "react";
import { motionAllowed } from "./landing-motion";

/**
 * One shared observer for the landing page. It marks section eyebrows and tiles marked data-reveal with "in" the
 * first time they scroll into view. Without motion, or on a repeat visit, it does nothing and the CSS shows the
 * finished state.
 */
export default function LandingMotion() {
  useEffect(() => {
    const root = document.querySelector(".cr");
    if (!root) return;
    if (!motionAllowed()) { root.classList.add("motion-off"); return; }
    root.classList.add("motion-on");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { threshold: 0.25 });
    root.querySelectorAll(".eyebrow, [data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

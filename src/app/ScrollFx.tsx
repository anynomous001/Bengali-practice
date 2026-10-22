"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "./landing-motion";

/**
 * Scroll-linked effects for the landing page. Elements marked data-fx get a --fx number that follows how far they have
 * travelled through the viewport; the CSS decides what it does (zoom, focus, parallax, tilt). Nothing runs under reduced
 * motion, and without JS the page simply shows its finished state.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>(".cr");
    if (!root) return;
    root.classList.add("fx-on");
    const els = [...root.querySelectorAll<HTMLElement>("[data-fx]")];
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    let raf = 0;
    const run = () => {
      raf = 0;
      const vh = window.innerHeight;
      const wide = window.innerWidth >= 1000;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) continue;
        const p = clamp((vh - r.top) / (vh + r.height)); // 0 as it enters at the bottom, 1 as it leaves at the top
        const amt = Number(el.dataset.amt || 0);
        let v = 0;
        switch (el.dataset.fx) {
          case "zoom": v = 1 + 0.2 * (1 - clamp(p / 0.5)); break; // 1.2 settling to 1 by mid-screen
          case "focus": v = 1 - 0.75 * clamp((Math.abs((r.top + r.height / 2 - vh / 2) / (vh * 0.35)) - 0.3) / 0.7); break; // 1 at centre, 0.25 away from it
          case "par": v = wide ? (p - 0.5) * amt : 0; break;
          case "tilt": v = (p - 0.5) * amt; break;
        }
        el.style.setProperty("--fx", v.toFixed(3));
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); root.classList.remove("fx-on"); };
  }, []);
  return null;
}

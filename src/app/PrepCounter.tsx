"use client";

import { useEffect, useRef, useState } from "react";
import { motionAllowed } from "./landing-motion";

/** The prep timer on the impromptu tile: counts 0:30 down to 0:27 once, when it scrolls into view, then stops. */
export default function PrepCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const [left, setLeft] = useState(30);
  useEffect(() => {
    if (!motionAllowed()) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      timer = setInterval(() => setLeft((v) => { if (v <= 27) { clearInterval(timer); return v; } return v - 1; }), 1000);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);
  return <span ref={ref} className="tnum">0:{String(left).padStart(2, "0")}</span>;
}

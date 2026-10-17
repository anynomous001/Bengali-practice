"use client";

import { useEffect, useRef, useState } from "react";
import BnPath from "./BnPath";
import { prefersReducedMotion } from "./landing-motion";

const SET = ["ক", "কা", "কি", "কী", "কু", "কে", "কো"];

/**
 * One letter with each vowel sign in turn, crossfading every 1.2 seconds. It only moves while it is on screen.
 * Under reduced motion, or before it starts, all seven are shown side by side in the same space.
 */
export default function VowelStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [cycling, setCycling] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver((entries) => {
      const on = entries.some((e) => e.isIntersecting);
      clearInterval(timer);
      if (on) { setCycling(true); timer = setInterval(() => setI((v) => (v + 1) % SET.length), 1200); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  return (
    <div ref={ref} className={"vstrip" + (cycling ? " cycling" : "")} aria-label="The letter ক with each vowel sign" role="group">
      {SET.map((t, k) => (
        <span key={t} className={"vs-item" + (cycling && k === i ? " on" : "")} aria-hidden={cycling && k !== i}>
          <BnPath text={t} className="ink" />
        </span>
      ))}
    </div>
  );
}

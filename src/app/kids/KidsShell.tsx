"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const Ctx = createContext<{ english: boolean }>({ english: true });
export const useKidsEnglish = () => useContext(Ctx).english;

/** Header, grown-ups panel and footer for kids mode. Holding the grown-ups button for a second opens the panel, so a child cannot change settings by accident. */
export default function KidsShell({ initialEnglish, children }: { initialEnglish: boolean; children: React.ReactNode }) {
  const [english, setEnglish] = useState(initialEnglish);
  const [open, setOpen] = useState(false);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function down() {
    setHolding(true);
    timer.current = setTimeout(() => { setOpen(true); setHolding(false); }, 1000);
  }
  function up() {
    setHolding(false);
    if (timer.current) clearTimeout(timer.current);
  }
  function set(v: boolean) {
    setEnglish(v);
    document.cookie = `bp_kids_en=${v ? "1" : "0"}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <Ctx.Provider value={{ english }}>
      <div className="kids">
        <header className="k-top">
          <Link href="/kids" className="k-brand" aria-label="Kids home">
            <span lang="bn">ছোটদের</span>
          </Link>
          <button
            type="button"
            className={"k-grown" + (holding ? " holding" : "")}
            onPointerDown={down}
            onPointerUp={up}
            onPointerLeave={up}
            onPointerCancel={up}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
            aria-label="Grown-ups: press and hold for one second"
          >
            Grown-ups
            <small>hold</small>
          </button>
        </header>

        {open && (
          <div className="k-panel" role="dialog" aria-label="Grown-ups settings">
            <h2>For grown-ups</h2>
            <label className="k-switch-row">
              <span>Show English words on the cards<small>Turn this off once your child knows the word.</small></span>
              <button type="button" role="switch" aria-checked={english} className="switch" onClick={() => set(!english)}><span className="switch-knob" /></button>
            </label>
            <div className="k-panel-actions">
              <Link href="/learn" className="btn ghost">Back to the grown-up app</Link>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        )}

        <main className="k-main">{children}</main>

        <footer className="k-foot">
          Pictures: <a href="https://github.com/jdecked/twemoji" target="_blank" rel="noopener">Twemoji</a>, CC-BY 4.0.
        </footer>
      </div>
    </Ctx.Provider>
  );
}

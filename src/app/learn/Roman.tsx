"use client";

import { createContext, useCallback, useContext, useState } from "react";

const Ctx = createContext<{ roman: boolean; setRoman: (v: boolean) => void; english: boolean; setEnglish: (v: boolean) => void }>({ roman: true, setRoman: () => {}, english: true, setEnglish: () => {} });

/** Whether to show romanized English (e.g. "ko", "kolom"). The choice is kept in a cookie so the server renders it correctly. */
export function RomanProvider({ initial, initialEnglish = true, children }: { initial: boolean; initialEnglish?: boolean; children: React.ReactNode }) {
  const [roman, set] = useState(initial);
  const [english, setEn] = useState(initialEnglish);
  const setRoman = useCallback((v: boolean) => {
    set(v);
    document.cookie = `bp_roman=${v ? "1" : "0"}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);
  /** Turns English meanings on or off. The page hides them with CSS (the .gloss class) so server-rendered text follows at once. */
  const setEnglish = useCallback((v: boolean) => {
    setEn(v);
    document.cookie = `bp_english=${v ? "1" : "0"}; path=/; max-age=31536000; SameSite=Lax`;
    document.querySelector(".app")?.setAttribute("data-english", v ? "on" : "off");
  }, []);
  return <Ctx.Provider value={{ roman, setRoman, english, setEnglish }}>{children}</Ctx.Provider>;
}

export const useRoman = () => useContext(Ctx);
export const useEnglish = () => { const { english, setEnglish } = useContext(Ctx); return { english, setEnglish }; };

export function RomanToggle({ label = "Romanized English" }: { label?: string }) {
  const { roman, setRoman } = useRoman();
  return (
    <div className="toolbar">
      <span className="toolbar-label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={roman}
        aria-label="Romanized English"
        className="switch"
        onClick={() => setRoman(!roman)}
      >
        <span className="switch-knob" />
        <span className="switch-text">{roman ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

/** Shows or hides the English meanings and translations. Questions and instructions in English always stay. */
export function EnglishToggle({ label = "English meanings" }: { label?: string }) {
  const { english, setEnglish } = useEnglish();
  return (
    <div className="toolbar">
      <span className="toolbar-label">{label}</span>
      <button type="button" role="switch" aria-checked={english} aria-label="English meanings" className="switch" onClick={() => setEnglish(!english)}>
        <span className="switch-knob" />
        <span className="switch-text">{english ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

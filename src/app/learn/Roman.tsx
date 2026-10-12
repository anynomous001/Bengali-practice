"use client";

import { createContext, useCallback, useContext, useState } from "react";

const Ctx = createContext<{ roman: boolean; setRoman: (v: boolean) => void }>({ roman: true, setRoman: () => {} });

/** Whether to show romanized English (e.g. "ko", "kolom"). The choice is kept in a cookie so the server renders it correctly. */
export function RomanProvider({ initial, children }: { initial: boolean; children: React.ReactNode }) {
  const [roman, set] = useState(initial);
  const setRoman = useCallback((v: boolean) => {
    set(v);
    document.cookie = `bp_roman=${v ? "1" : "0"}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);
  return <Ctx.Provider value={{ roman, setRoman }}>{children}</Ctx.Provider>;
}

export const useRoman = () => useContext(Ctx);

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

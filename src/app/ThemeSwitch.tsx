"use client";

import { useEffect, useState } from "react";
import Icon from "./learn/Icon";

type Mode = "light" | "dark";

/** A sun/moon button for the landing nav. It uses the same bp_theme cookie as the app, so the choice carries over. */
export default function ThemeSwitch({ initial }: { initial: Mode | "system" }) {
  const [mode, setMode] = useState<Mode>(initial === "dark" ? "dark" : "light");
  useEffect(() => {
    if (initial === "system") setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, [initial]);
  const flip = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    document.cookie = `bp_theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
  };
  return (
    <button type="button" className="cr-theme" onClick={flip} aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <Icon name={mode === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}

"use client";

import { useState } from "react";
import Icon from "./Icon";

type Theme = "system" | "light" | "dark";
const OPTIONS: { value: Theme; label: string; icon: "system" | "sun" | "moon" }[] = [
  { value: "system", label: "System", icon: "system" },
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
];

function apply(t: Theme) {
  if (t === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", t);
  document.cookie = `bp_theme=${t}; path=/; max-age=31536000; SameSite=Lax`;
}

/** Light / dark / system. The choice is a cookie, so the server renders the right theme with no flash. */
export default function ThemeToggle({ initial, compact = false }: { initial: Theme; compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>(initial);
  const pick = (t: Theme) => { setTheme(t); apply(t); };

  if (compact) {
    // one button for small screens: cycles light -> dark -> system
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    const cur = OPTIONS.find((o) => o.value === theme)!;
    return (
      <button type="button" className="icon-link" onClick={() => pick(next)} aria-label={`Theme: ${cur.label}. Switch to ${next}`}>
        <Icon name={cur.icon} size={18} />
      </button>
    );
  }
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={theme === o.value} className={theme === o.value ? "on" : ""} onClick={() => pick(o.value)}>
          <Icon name={o.icon} size={15} />
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

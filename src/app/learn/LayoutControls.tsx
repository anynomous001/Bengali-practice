"use client";

import { useState } from "react";
import Icon from "./Icon";

/** Layout choices live on the .app element as data attributes, and in cookies so the server renders them with no flash. */
function setApp(attr: string, cookie: string, value: string) {
  document.querySelector(".app")?.setAttribute(attr, value);
  document.cookie = `${cookie}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

/** Hides or shows the left sidebar. "in" sits in the sidebar; "out" is the small button left behind when it is hidden. */
export function SideToggle({ place }: { place: "in" | "out" }) {
  const hide = place === "in";
  return (
    <button type="button" className={`lc-btn lc-side lc-${place}`} aria-label={hide ? "Hide the sidebar" : "Show the sidebar"} title={hide ? "Hide the sidebar" : "Show the sidebar"} onClick={() => setApp("data-side", "bp_side", hide ? "off" : "on")}>
      <Icon name="menu" size={20} />
    </button>
  );
}

/** Hides or shows the "course outline" panel on the right of a lesson. */
export function RailToggle({ place }: { place: "in" | "out" }) {
  const hide = place === "in";
  return (
    <button type="button" className={`lc-btn lc-rail lc-${place}`} aria-label={hide ? "Hide the outline" : "Show the outline"} title={hide ? "Hide the outline" : "Show the outline"} onClick={() => setApp("data-rail", "bp_rail", hide ? "off" : "on")}>
      <Icon name="list" size={20} />{!hide && <span>Outline</span>}
    </button>
  );
}

/** Kid mode: the same pages and the same layout, shown with bigger, friendlier, more colorful navigation and cards. */
export function KidModeToggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="toolbar">
      <span className="toolbar-label">Kid mode</span>
      <button type="button" role="switch" aria-checked={on} aria-label="Kid mode" className="switch" onClick={() => { setOn(!on); setApp("data-kid", "bp_kid", on ? "off" : "on"); }}>
        <span className="switch-knob" />
        <span className="switch-text">{on ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

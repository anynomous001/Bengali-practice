"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import Icon from "./Icon";

/**
 * "On this page" navigation for a long lesson. variant "side" is a list beside the lesson on wide screens;
 * variant "bar" is a sticky "Jump to" bar on narrower screens. Both follow the scroll position.
 */
export default function OnThisPage({ items, variant }: { items: TocItem[]; variant: "side" | "bar" }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  const current = items.find((i) => i.id === active) ?? items[0];

  if (variant === "bar") {
    return (
      <div className="otp-bar">
        <button type="button" className="otp-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span><small>On this page</small><b>{current?.label}</b></span>
          <Icon name="chevron" size={18} />
        </button>
        {open && (
          <ul className="otp-menu">
            {items.map((i) => (
              <li key={i.id}><a href={`#${i.id}`} aria-current={i.id === active ? "true" : undefined} onClick={() => setOpen(false)}>{i.label}</a></li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return (
    <nav className="otp" aria-label="On this page">
      <p className="otp-title">On this page</p>
      <ul>
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} aria-current={i.id === active ? "true" : undefined}>{i.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

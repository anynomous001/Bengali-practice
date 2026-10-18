"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./Icon";

type Item = { href: string; label: string; icon: IconName };

/**
 * The phone menu in the top bar. The bar keeps only the logo and this button; everything else lives here:
 * the less-used pages, the display switches and sign out. It closes on a link, on Escape and on a tap outside.
 */
export default function MobileMenu({ items, controls, footer }: { items: Item[]; controls: React.ReactNode; footer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button ref={button} type="button" className="icon-link mm-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>
      {open && <button type="button" className="mm-backdrop" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} />}
      <div id="mobile-menu" className={"mm-panel" + (open ? " open" : "")} hidden={!open}>
        <nav aria-label="More">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="mm-link" aria-current={path === it.href ? "page" : undefined} onClick={() => setOpen(false)}>
              <Icon name={it.icon} size={20} />{it.label}
            </Link>
          ))}
        </nav>
        <div className="mm-controls">{controls}</div>
        <div className="mm-footer">{footer}</div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "./Icon";

const ITEMS: { href: string; label: string; bn?: string; icon: IconName; seg?: string }[] = [
  { href: "/learn", label: "Home", icon: "home" },
  { href: "/learn/reading", label: "Reading", bn: "পড়া", icon: "reading", seg: "reading" },
  { href: "/learn/speaking", label: "Speaking", bn: "বলা", icon: "speaking", seg: "speaking" },
  { href: "/learn/writing", label: "Writing", bn: "লেখা", icon: "writing", seg: "writing" },
  { href: "/learn/grammar", label: "Grammar", bn: "ব্যাকরণ", icon: "grammar", seg: "grammar" },
];

/** Primary navigation: a sidebar list on large screens, a bottom tab bar on small ones. */
export default function NavLinks({ variant }: { variant: "side" | "tabs" }) {
  const path = usePathname();
  return (
    <>
      {ITEMS.map((it) => {
        const active = it.href === "/learn" ? path === "/learn" : path === it.href || path.startsWith(it.href + "/");
        return (
          <Link key={it.href} href={it.href} data-seg={it.seg} className={variant === "side" ? "nav-item" : "tab"} aria-current={active ? "page" : undefined}>
            <Icon name={it.icon} size={variant === "side" ? 19 : 22} />
            <span>{it.label}</span>
            {variant === "side" && it.bn && <span className="nav-bn" lang="bn">{it.bn}</span>}
          </Link>
        );
      })}
    </>
  );
}

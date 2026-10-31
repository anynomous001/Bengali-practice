"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconTile, type IconName } from "./Icon";
import NewTag from "./NewTag";
import { isNew } from "@/data/new";

const ITEMS: { href: string; label: string; bn?: string; icon: IconName; seg?: string; sideOnly?: boolean }[] = [
  { href: "/learn", label: "Home", icon: "home" },
  { href: "/learn/path", label: "My path", icon: "path", sideOnly: true },
  { href: "/learn/reading", label: "Reading", bn: "পড়া", icon: "reading", seg: "reading" },
  { href: "/learn/speaking", label: "Speaking", bn: "বলা", icon: "speaking", seg: "speaking" },
  { href: "/learn/listening", label: "Listening", bn: "শোনা", icon: "listening", seg: "listening", sideOnly: true },
  { href: "/learn/vocabulary", label: "Vocabulary", bn: "শব্দ", icon: "vocabulary", seg: "vocabulary" },
  { href: "/learn/grammar", label: "Grammar", bn: "ব্যাকরণ", icon: "grammar", seg: "grammar" },
  { href: "/learn/writing", label: "Writing", bn: "লেখা", icon: "writing", seg: "writing", sideOnly: true },
  { href: "/learn/kids", label: "Kids", bn: "ছোটদের", icon: "kids", seg: "kids", sideOnly: true },
  { href: "/learn/progress", label: "My progress", icon: "trophy", sideOnly: true },
  { href: "/learn/leaderboard", label: "Leaderboard", icon: "medal", sideOnly: true },
  { href: "/learn/refer", label: "Refer a friend", icon: "gift", sideOnly: true },
  { href: "/learn/feedback", label: "Feedback", icon: "feedback", sideOnly: true },
];

/** Primary navigation: a sidebar list on large screens, a bottom tab bar on small ones. */
export default function NavLinks({ variant }: { variant: "side" | "tabs" }) {
  const path = usePathname();
  return (
    <>
      {ITEMS.filter((it) => variant === "side" || !it.sideOnly).map((it) => {
        const active = it.href === "/learn" ? path === "/learn" : path === it.href || path.startsWith(it.href + "/");
        return (
          <Link key={it.href} href={it.href} data-seg={it.seg} className={variant === "side" ? "nav-item" : "tab"} aria-current={active ? "page" : undefined}>
            <IconTile name={it.icon} size={variant === "side" ? 32 : 30} />
            <span>{it.label}{variant === "side" && isNew(`nav:${it.seg ?? ""}`) && <NewTag />}</span>
            {variant === "side" && it.bn && <span className="nav-bn" lang="bn">{it.bn}</span>}
          </Link>
        );
      })}
    </>
  );
}

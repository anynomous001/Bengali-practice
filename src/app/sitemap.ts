import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { BUSINESS } from "@/data/business";

// Only public pages that should appear in search. The app (/learn), checkout (/buy) and sign-in pages are left out on purpose.
const PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; updated?: string }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/learn-bengali", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bengali-alphabet", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bengali-numbers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
  { path: "/refunds", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: new Date(p.updated ?? CONTENT_UPDATED),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

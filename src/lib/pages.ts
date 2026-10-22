import { BUSINESS } from "@/data/business";
import { CONTENT_UPDATED } from "./site";

/** Every public page that should appear in search. The sitemap and IndexNow both read this list. */
export const PUBLIC_PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; updated: string }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", updated: CONTENT_UPDATED },
  { path: "/learn-bengali", priority: 0.9, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  { path: "/bengali-alphabet", priority: 0.9, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  { path: "/bengali-numbers", priority: 0.8, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly", updated: CONTENT_UPDATED },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
  { path: "/refunds", priority: 0.2, changeFrequency: "yearly", updated: BUSINESS.updated },
];

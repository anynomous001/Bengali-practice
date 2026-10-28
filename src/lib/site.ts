/** The public address of the site, used for sharing cards, the sitemap, robots.txt and structured data. */
export const SITE_URL = (process.env.APP_URL || "https://bengali-practice.gencore.co.in").replace(/\/$/, "");
export const SITE_NAME = "Bengali Practice";
export const SITE_TITLE = "Learn Bengali Online | Bengali Practice by a Kolkata Teacher";
export const SITE_DESCRIPTION = "Learn to read, speak and write Bengali with short daily lessons from a Kolkata teacher: alphabet, vocabulary, grammar and role plays.";
/** A shorter line for share cards, where about 120 characters fit before the preview is cut. */
export const SOCIAL_DESCRIPTION = "Read, speak and write Bengali with short daily lessons from a Kolkata teacher. Try a letter free.";
export const SITE_KEYWORDS = [
  "learn Bengali", "learn Bengali online", "Bengali practice", "Bengali learning", "Bengali lessons", "Bengali for beginners",
  "Bengali alphabet", "Bengali vocabulary", "Bengali grammar", "learn Bengali script", "Bengali language course", "Bangla learning",
  "learn Bangla online", "Bengali flashcards", "Bengali tutor", "Kolkata Bengali",
];
export const PREPLY_URL = "https://preply.in/PRITAM6EN35993949102";
/** Pritam's Preply referral link: new students get 30% off their lessons (all subjects, all tutors). */
export const PREPLY_REFERRAL_URL = "https://preply.com/en/?pref=MjgyMjgxOTk=&id=1793158415.967744&ep=a2";
/** When the public content last changed in a way worth telling search engines. */
export const CONTENT_UPDATED = "2026-10-22";
/** The share card, attached explicitly to pages that set their own openGraph block (Next only inherits it otherwise). */
export const OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Bengali Practice: learn to read, speak and write Bengali online" }];
/** Your X / Twitter username without the @, from NEXT_PUBLIC_TWITTER_HANDLE. Left out of the page until you set it. */
export const TWITTER_SITE = process.env.NEXT_PUBLIC_TWITTER_HANDLE ? `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE.replace(/^@/, "")}` : undefined;

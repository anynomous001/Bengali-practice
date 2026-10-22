import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Newsreader, Noto_Sans_Bengali, Noto_Serif_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import GoogleAnalytics from "./GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Pritam", url: SITE_URL }],
  creator: "Pritam",
  publisher: SITE_NAME,
  category: "education",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Search Console and Bing Webmaster Tools verification: set these two variables in Vercel, no code change needed.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
  openGraph: { siteName: SITE_NAME, type: "website", url: "/", title: SITE_TITLE, description: SITE_DESCRIPTION, locale: "en_US" },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f3f5fa" }, { media: "(prefers-color-scheme: dark)", color: "#0a0e1f" }] };

// Fonts are downloaded at build time and served from this site, so the page never waits on a font stylesheet from another host.
const ui = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"], display: "swap", variable: "--f-ui" });
// A Latin serif for the landing page headings, chosen to sit beside Noto Serif Bengali.
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--f-serif" });
const bnSans = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--f-bn", preload: false });
const bnSerif = Noto_Serif_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--f-bn-serif", preload: false });

const MOTION_OK = `(function(){try{var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;var seen=false;try{seen=!!sessionStorage.getItem("bp_lp_motion")}catch(e){}if(!seen)d.classList.add("motion-ok")}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const t = (await cookies()).get("bp_theme")?.value;
  const theme = t === "light" || t === "dark" ? t : undefined; // otherwise follow the system
  return (
    <html lang="en" data-theme={theme} className={`${ui.variable} ${serif.variable} ${bnSans.variable} ${bnSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Animated parts of the home page start hidden only when this class is set. Without it, or without JavaScript, every page shows its finished state. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_OK }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

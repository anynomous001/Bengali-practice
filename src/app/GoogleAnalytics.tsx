import GaClient from "./GaClient";

/**
 * Google Analytics 4. Measurement ID G-HWQC9EJ9N6 (override with NEXT_PUBLIC_GA_ID). The visitor's region is looked
 * up in the browser (see /api/geo), so pages can stay static. Ad features are off, and in the EU, UK and Switzerland nothing
 * is stored until the visitor accepts. Page views are sent without query strings, so sign-in links and other tokens in the
 * address never reach Google.
 */
export default function GoogleAnalytics() {
  // A measurement ID is public (it is in every site's page source), so it is safe to keep here. NEXT_PUBLIC_GA_ID overrides it.
  const id = process.env.NEXT_PUBLIC_GA_ID || "G-HWQC9EJ9N6";
  if (!id || !/^G-[A-Z0-9]{4,}$/.test(id)) return null;
  return <GaClient id={id} />;
}

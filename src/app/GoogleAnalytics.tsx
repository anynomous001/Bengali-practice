import GaClient from "./GaClient";

/**
 * Google Analytics 4. It only loads when NEXT_PUBLIC_GA_ID (the G-XXXX measurement ID) is set. The visitor's region is looked
 * up in the browser (see /api/geo), so pages can stay static. Ad features are off, and in the EU, UK and Switzerland nothing
 * is stored until the visitor accepts. Page views are sent without query strings, so sign-in links and other tokens in the
 * address never reach Google.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !/^G-[A-Z0-9]{4,}$/.test(id)) return null;
  return <GaClient id={id} />;
}

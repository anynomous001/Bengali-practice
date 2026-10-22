import Script from "next/script";
import { headers } from "next/headers";
import GaClient from "./GaClient";

/** Countries where analytics cookies need a yes first: the EU, Iceland, Liechtenstein, Norway, the UK and Switzerland. */
const CONSENT_COUNTRIES = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH".split(" "));

/**
 * Google Analytics 4. It only loads when NEXT_PUBLIC_GA_ID (the G-XXXX measurement ID) is set. Ad features are off, and in the
 * countries above nothing is stored until the visitor accepts. Page views are sent without query strings, so sign-in links
 * and other tokens in the address never reach Google.
 */
export default async function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !/^G-[A-Z0-9]{4,}$/.test(id)) return null;
  const country = (await headers()).get("x-vercel-ip-country");
  const needsConsent = !country || CONSENT_COUNTRIES.has(country.toUpperCase());
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;` +
    `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'${needsConsent ? "denied" : "granted"}'});` +
    (needsConsent ? `try{if(localStorage.getItem('bp_consent')==='granted')gtag('consent','update',{analytics_storage:'granted'})}catch(e){}` : "") +
    `gtag('js',new Date());gtag('config','${id}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});`;
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">{init}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <GaClient needsConsent={needsConsent} />
    </>
  );
}

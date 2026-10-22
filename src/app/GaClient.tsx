"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getGeo } from "@/lib/geo";

/** Starts Google Analytics once the visitor's region is known, sends a page view on every route change, and shows the consent notice where it is needed. */
export default function GaClient({ id }: { id: string }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    let on = true;
    getGeo().then(({ needsConsent }) => {
      if (!on || window.gtag) return;
      let stored: string | null = null;
      try { stored = localStorage.getItem("bp_consent"); } catch { /* blocked storage: ask every time */ }
      window.dataLayer = window.dataLayer || [];
      // gtag.js needs the real `arguments` object, not an array
      window.gtag = function gtag() { // eslint-disable-next-line prefer-rest-params
        (window.dataLayer as unknown[]).push(arguments);
      };
      window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: needsConsent && stored !== "granted" ? "denied" : "granted" });
      window.gtag("js", new Date());
      window.gtag("config", id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(s);
      setAsk(needsConsent && !stored);
      setReady(true);
    });
    return () => { on = false; };
  }, [id]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      window.gtag?.("event", "page_view", { page_location: window.location.origin + pathname, page_path: pathname, page_title: document.title });
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, ready]);

  const choose = (granted: boolean) => {
    try { localStorage.setItem("bp_consent", granted ? "granted" : "denied"); } catch { /* the choice just will not be remembered */ }
    if (granted) window.gtag?.("consent", "update", { analytics_storage: "granted" });
    setAsk(false);
  };

  if (!ask) return null;
  return (
    <aside className="consent" role="dialog" aria-label="Analytics cookies">
      <p>May we use analytics cookies to see which pages help people learn Bengali? We never use them for ads. <a href="/privacy">Privacy policy</a></p>
      <div>
        <button type="button" className="consent-no" onClick={() => choose(false)}>No thanks</button>
        <button type="button" className="consent-yes" onClick={() => choose(true)}>Allow</button>
      </div>
    </aside>
  );
}

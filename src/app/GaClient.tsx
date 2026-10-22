"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Sends a page view on every route change (address without query or hash) and shows the consent notice where it is needed. */
export default function GaClient({ needsConsent }: { needsConsent: boolean }) {
  const pathname = usePathname();
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      window.gtag?.("event", "page_view", { page_location: window.location.origin + pathname, page_path: pathname, page_title: document.title });
    }, 60);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!needsConsent) return;
    try { if (!localStorage.getItem("bp_consent")) setAsk(true); } catch { setAsk(true); }
  }, [needsConsent]);

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

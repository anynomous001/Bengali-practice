"use client";

import { useEffect, useState } from "react";

/** A short confirmation at the bottom of the screen. It hides itself after a few seconds. */
export default function Toast({ message, kind = "good", clearParam }: { message: string | null | undefined; kind?: "good" | "bad"; clearParam?: string }) {
  const [shown, setShown] = useState<string | null>(null);
  useEffect(() => {
    if (!message) return;
    setShown(message);
    if (clearParam) {
      // drop the notice from the address so a refresh does not show it again
      try { const u = new URL(location.href); u.searchParams.delete(clearParam); history.replaceState(null, "", u.toString()); } catch { /* ignore */ }
    }
    const t = setTimeout(() => setShown(null), 4500);
    return () => clearTimeout(t);
  }, [message, clearParam]);
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {shown && <div className={"toast " + kind}><span>{shown}</span><button type="button" aria-label="Dismiss" onClick={() => setShown(null)}>×</button></div>}
    </div>
  );
}

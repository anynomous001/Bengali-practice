"use client";

import { useState } from "react";
import Toast from "../../Toast";

export default function CopyLink({ link }: { link: string }) {
  const [n, setN] = useState(0);
  async function copy() {
    try { await navigator.clipboard.writeText(link); } catch { /* the field is selectable as a fallback */ }
    setN((x) => x + 1);
  }
  return (
    <div className="ref-copy">
      <input readOnly value={link} aria-label="Your referral link" onFocus={(e) => e.currentTarget.select()} />
      <button type="button" className="btn" onClick={copy}>Copy link</button>
      {n > 0 && <Toast key={n} message="Link copied. Send it to a friend." />}
    </div>
  );
}

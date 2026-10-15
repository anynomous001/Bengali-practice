"use client";

import { useState } from "react";

type RzResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RzOptions = Record<string, unknown>;
declare global {
  interface Window { Razorpay?: new (o: RzOptions) => { open(): void; on(e: string, cb: (r: { error?: { description?: string } }) => void): void } }
}

function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load the payment window. Check your connection."));
    document.head.append(s);
  });
}

export default function BuyForm({ price, inr, rate, fixedInr, start, knownEmail, children }: { children?: React.ReactNode; price: number; inr: number; rate: number; fixedInr: boolean; start: "USD" | "INR"; knownEmail?: string }) {
  const [currency, setCurrency] = useState<"USD" | "INR">(start);
  const shown = currency === "INR" ? `₹${inr.toLocaleString("en-IN")}` : `$${price}`;
  const [email, setEmail] = useState(knownEmail ?? "");
  const [again, setAgain] = useState(knownEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [paidEmail, setPaidEmail] = useState("");

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== again.trim().toLowerCase()) { setError("The two email addresses do not match. Access is sent to this address, so please check it."); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, currency }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error ?? "Could not start the payment.");
      await loadCheckout();

      const rz = new window.Razorpay!({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Bengali Practice",
        description: "12 months of access",
        prefill: { email },
        theme: { color: "#c0392b" },
        handler: async (r: RzResponse) => {
          const v = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          });
          const out = await v.json();
          if (v.ok) setPaidEmail(out.email);
          else setError(out.error ?? "Could not confirm the payment.");
          setBusy(false);
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.on("payment.failed", (r) => {
        setError(r.error?.description ?? "The payment failed. You have not been charged.");
        setBusy(false);
      });
      rz.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (paidEmail) {
    return (
      <div className="card-static">
        <h2>Payment received</h2>
        <p>Your access is active. We emailed a sign-in link to <b>{paidEmail}</b> (valid for 15 minutes). You can also <a href="/login">request a new link</a> any time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={pay} className="stack">
      <div className="price">{shown} <small>one-time · 12 months</small></div>
      <p className="muted small price-note">
        {currency === "INR"
          ? <>Pay with UPI, cards or net banking. {fixedInr ? "" : `Converted from $${price} at today's rate (₹${rate} per US dollar). `}</>
          : <>Pay by credit or debit card. </>}
        <button type="button" className="textbtn" onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}>
          {currency === "INR" ? `Pay in US dollars ($${price}) instead` : `Pay in Indian rupees (₹${inr.toLocaleString("en-IN")}) instead`}
        </button>
      </p>
      {children}
      <label htmlFor="email">Your email (this is how you'll sign in)</label>
      <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" readOnly={!!knownEmail} />
      {!knownEmail && (
        <>
          <label htmlFor="email2">Type it again to be sure</label>
          <input id="email2" type="email" required value={again} onChange={(e) => setAgain(e.target.value)} placeholder="you@example.com" autoComplete="off" onPaste={(e) => e.preventDefault()} />
        </>
      )}
      <button className="btn" disabled={busy}>{busy ? "Please wait…" : `Pay ${shown}`}</button>
      {error && <p className="msg bad" role="alert">{error}</p>}
    </form>
  );
}

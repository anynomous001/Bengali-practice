import { createHmac, timingSafeEqual } from "node:crypto";
import { query } from "./db";

const API = process.env.RAZORPAY_API_BASE ?? "https://api.razorpay.com/v1";

export const priceUsd = () => Number(process.env.PRICE_USD ?? 40);
export const configured = () => !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET;

function auth() {
  return "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
}

async function rz<T>(path: string, init?: { method: string; body: unknown }): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: init ? JSON.stringify(init.body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (json as { error?: { description?: string } }).error?.description ?? `Razorpay error ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}

export function safeEqualHex(a: string, b: string) {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  return x.length === y.length && timingSafeEqual(x, y);
}

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("hex");

/** Signature the Checkout widget returns after a successful payment. */
export const checkoutSignatureOk = (orderId: string, paymentId: string, signature: string) =>
  safeEqualHex(hmac(process.env.RAZORPAY_KEY_SECRET ?? "", `${orderId}|${paymentId}`), signature);

/** Signature on webhook bodies (X-Razorpay-Signature). */
export const webhookSignatureOk = (rawBody: string, signature: string) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  return !!secret && safeEqualHex(hmac(secret, rawBody), signature);
};

export async function createOrder(email: string) {
  const amount = Math.round(priceUsd() * 100); // USD cents
  const recent = await query<{ n: string }>(
    "SELECT count(*) AS n FROM orders WHERE email = $1 AND created_at > now() - interval '1 hour'",
    [email],
  );
  if (Number(recent[0].n) >= 10) throw new Error("Too many attempts. Please try again later.");
  const burst = await query<{ n: string }>("SELECT count(*) AS n FROM orders WHERE created_at > now() - interval '1 minute'");
  if (Number(burst[0].n) >= 30) throw new Error("Busy right now. Please try again in a minute.");
  const order = await rz<{ id: string }>("/orders", {
    method: "POST",
    body: { amount, currency: "USD", receipt: `bp_${Date.now()}`, notes: { email } },
  });
  await query("INSERT INTO orders (order_id, email, amount, currency) VALUES ($1, $2, $3, 'USD')", [order.id, email, amount]);
  return { orderId: order.id, amount, currency: "USD", keyId: process.env.RAZORPAY_KEY_ID! };
}

type Payment = { id: string; order_id: string; status: string; amount: number; currency: string };

/**
 * Confirms with Razorpay that the payment is real and matches our order, then
 * grants 12 months once. Safe to call repeatedly (checkout redirect + webhook).
 * Returns the buyer's email when this order is paid, or null if it is not.
 */
export async function fulfillOrder(orderId: string, paymentId: string): Promise<string | null> {
  const rows = await query<{ email: string; amount: number; currency: string; status: string }>(
    "SELECT email, amount, currency, status FROM orders WHERE order_id = $1",
    [orderId],
  );
  const order = rows[0];
  if (!order) return null;
  if (order.status === "paid") return order.email;

  let payment = await rz<Payment>(`/payments/${encodeURIComponent(paymentId)}`);
  if (payment.order_id !== orderId || payment.amount !== order.amount || payment.currency !== order.currency) return null;
  if (payment.status === "authorized") {
    // Account is on manual capture: capture it ourselves.
    payment = await rz<Payment>(`/payments/${encodeURIComponent(paymentId)}/capture`, {
      method: "POST",
      body: { amount: order.amount, currency: order.currency },
    });
  }
  if (payment.status !== "captured") return null;

  // Only the first caller flips created -> paid, so access is granted exactly once.
  const claimed = await query(
    "UPDATE orders SET status = 'paid', payment_id = $2, paid_at = now() WHERE order_id = $1 AND status = 'created' RETURNING order_id",
    [orderId, paymentId],
  );
  if (claimed.length) {
    await query(
      `INSERT INTO students (email, note, access_expires_at) VALUES ($1, 'paid online', now() + interval '12 months')
       ON CONFLICT (email) DO UPDATE SET
         access_expires_at = GREATEST(now(), COALESCE(students.access_expires_at, now())) + interval '12 months'`,
      [order.email],
    );
  }
  return order.email;
}

/**
 * A full refund takes the 12 months back (a partial one does not). Granted once per payment.
 * Access then ends unless the student has other paid time on top.
 */
export async function handleRefund(paymentId: string, refundedAmount: number) {
  const rows = await query<{ email: string }>(
    "UPDATE orders SET status = 'refunded' WHERE payment_id = $1 AND status = 'paid' AND amount <= $2 RETURNING email",
    [paymentId, refundedAmount],
  );
  if (rows.length) {
    await query("UPDATE students SET access_expires_at = access_expires_at - interval '12 months' WHERE email = $1", [rows[0].email]);
  }
}

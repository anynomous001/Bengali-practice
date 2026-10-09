import { NextResponse } from "next/server";
import { createLoginToken } from "@/lib/auth";
import { appBase } from "@/lib/base-url";
import { sendLoginEmail } from "@/lib/email";
import { checkoutSignatureOk, fulfillOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const orderId = String(b.razorpay_order_id ?? "");
  const paymentId = String(b.razorpay_payment_id ?? "");
  const signature = String(b.razorpay_signature ?? "");
  if (!orderId || !paymentId || !checkoutSignatureOk(orderId, paymentId, signature)) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }
  try {
    const email = await fulfillOrder(orderId, paymentId);
    if (!email) return NextResponse.json({ error: "Payment is not confirmed yet." }, { status: 409 });
    // Send a sign-in link straight away; failure here must not undo the purchase.
    try {
      const token = await createLoginToken(email);
      if (token) {
        const base = await appBase();
        await sendLoginEmail(email, `${base}/login/verify?token=${encodeURIComponent(token)}`);
      }
    } catch (e) {
      console.error("post-payment email failed", e);
    }
    return NextResponse.json({ ok: true, email });
  } catch (e) {
    console.error("verify failed", e);
    return NextResponse.json({ error: "Could not confirm the payment. If you were charged, contact your teacher." }, { status: 502 });
  }
}

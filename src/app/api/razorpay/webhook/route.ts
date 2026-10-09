import { NextResponse } from "next/server";
import { fulfillOrder, webhookSignatureOk } from "@/lib/razorpay";

// Backup for buyers who pay but close the tab before the browser calls /api/checkout/verify.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!webhookSignatureOk(raw, req.headers.get("x-razorpay-signature") ?? "")) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  let event: { event?: string; payload?: { payment?: { entity?: { id?: string; order_id?: string } } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const p = event.payload?.payment?.entity;
  if ((event.event === "payment.captured" || event.event === "order.paid") && p?.id && p.order_id) {
    try {
      await fulfillOrder(p.order_id, p.id);
    } catch (e) {
      console.error("webhook fulfil failed", e);
      return NextResponse.json({ error: "retry" }, { status: 500 }); // Razorpay retries on non-2xx
    }
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { fulfillOrder, handleRefund, webhookSignatureOk } from "@/lib/razorpay";

// Backup for buyers who pay but close the tab before the browser calls /api/checkout/verify.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!webhookSignatureOk(raw, req.headers.get("x-razorpay-signature") ?? "")) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  let event: {
    event?: string;
    payload?: {
      payment?: { entity?: { id?: string; order_id?: string } };
      refund?: { entity?: { payment_id?: string; amount?: number } };
    };
  };
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
  const r = event.payload?.refund?.entity;
  if (event.event === "refund.processed" && r?.payment_id && typeof r.amount === "number") {
    try {
      await handleRefund(r.payment_id, r.amount);
    } catch (e) {
      console.error("webhook refund failed", e);
      return NextResponse.json({ error: "retry" }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}

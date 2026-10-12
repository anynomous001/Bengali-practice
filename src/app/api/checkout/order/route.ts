import { NextResponse } from "next/server";
import { normalizeEmail, validEmail } from "@/lib/auth";
import { configured, createOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  if (!configured()) return NextResponse.json({ error: "Online payment isn't enabled yet." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const email = normalizeEmail(String(body.email ?? ""));
  if (!validEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  try {
    return NextResponse.json(await createOrder(email));
  } catch (e) {
    console.error("createOrder failed", e);
    const msg = e instanceof Error ? e.message : "Could not start the payment.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

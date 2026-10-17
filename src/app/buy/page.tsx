import Link from "next/link";
import { getUser } from "@/lib/auth";
import { headers } from "next/headers";
import { defaultCurrency, priceInr, priceUsd } from "@/lib/pricing";
import { codeIsValid } from "@/lib/referrals";
import AuthFrame from "../AuthFrame";
import BuyForm from "./BuyForm";

export default async function BuyPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const referred = await codeIsValid(ref);
  const price = priceUsd();
  const [user, inr, h] = await Promise.all([getUser(), priceInr(), headers()]);
  const start = defaultCurrency(h.get("x-vercel-ip-country"));
  return (
    <AuthFrame>
      <p className="eyebrow">Get access</p>
      <h1>12 months of Bengali practice</h1>
      {referred && <p className="msg good">A friend invited you. Welcome! They get a thank-you when you join.</p>}
      <div className="price-card">
        <BuyForm price={price} inr={inr.amount} rate={Math.round(inr.rate * 100) / 100} fixedInr={inr.fixed} start={start} knownEmail={user?.email} refCode={referred ? ref : undefined}>
          <ul className="ticks">
            <li>Reading, speaking, vocabulary and grammar courses</li>
            <li>Role plays, quick translation and timed exams</li>
            <li>Flashcards that remember what you know</li>
            <li>New lessons added during your year</li>
            <li>Renew early and 12 months are added on</li>
          </ul>
        </BuyForm>
      </div>
      <p className="muted small">Payments are processed securely by Razorpay. Already have access? <Link href="/login">Sign in</Link>. By paying you agree to the <Link href="/terms">terms</Link> and the <Link href="/refunds">refund policy</Link>; see also the <Link href="/privacy">privacy policy</Link>.</p>
    </AuthFrame>
  );
}

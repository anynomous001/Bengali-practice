import Link from "next/link";
import { getUser } from "@/lib/auth";
import { priceUsd } from "@/lib/razorpay";
import AuthFrame from "../AuthFrame";
import BuyForm from "./BuyForm";

export default async function BuyPage() {
  const price = priceUsd();
  const user = await getUser();
  return (
    <AuthFrame>
      <p className="eyebrow">Get access</p>
      <h1>12 months of Bengali practice</h1>
      <div className="price-card">
        <div className="price">${price} <small>one-time · 12 months</small></div>
        <ul className="ticks">
          <li>Reading, speaking, vocabulary and grammar courses</li>
          <li>Role plays, quick translation and timed exams</li>
          <li>Flashcards that remember what you know</li>
          <li>New lessons added during your year</li>
          <li>Renew early and 12 months are added on</li>
        </ul>
        <BuyForm price={price} knownEmail={user?.email} />
      </div>
      <p className="muted small">Pay by card in US dollars, processed securely by Razorpay. Already have access? <Link href="/login">Sign in</Link>. By paying you agree to the <Link href="/terms">terms</Link> and the <Link href="/refunds">refund policy</Link>; see also the <Link href="/privacy">privacy policy</Link>.</p>
    </AuthFrame>
  );
}

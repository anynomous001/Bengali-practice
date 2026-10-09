import Link from "next/link";
import { priceUsd } from "@/lib/razorpay";
import BuyForm from "./BuyForm";

export default function BuyPage() {
  const price = priceUsd();
  return (
    <main className="page narrow">
      <Link href="/" className="back">← Home</Link>
      <h1>Get access</h1>
      <div className="card-static">
        <div className="price">${price} <small>one-time · 12 months</small></div>
        <ul className="ticks">
          <li>Reading, speaking and writing practice</li>
          <li>Flashcards that remember what you know</li>
          <li>New activities added during your year</li>
          <li>Renew early and 12 months are added on</li>
        </ul>
        <BuyForm price={price} />
      </div>
      <p className="muted">Pay by card in US dollars, processed securely by Razorpay. Already have access? <Link href="/login">Sign in</Link>.</p>
    </main>
  );
}

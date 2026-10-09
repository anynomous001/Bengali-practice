import Link from "next/link";
import { priceUsd } from "@/lib/razorpay";
import BuyForm from "./BuyForm";

export default function BuyPage() {
  const price = priceUsd();
  return (
    <main className="page narrow">
      <h1>Get access</h1>
      <p>
        <b>${price}</b> one-time payment for <b>12 months</b> of full access: reading, speaking and writing practice,
        flashcards, and everything I add during the year. Renewing before your access ends adds 12 more months.
      </p>
      <BuyForm price={price} />
      <p className="muted">Pay by card in US dollars (processed by Razorpay). Already have access? <Link href="/login">Sign in</Link>.</p>
    </main>
  );
}

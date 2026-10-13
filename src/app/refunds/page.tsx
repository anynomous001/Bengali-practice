import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Refund and cancellation policy", robots: { index: true, follow: true } };

export default function Refunds() {
  return (
    <LegalPage title="Refund and cancellation policy">
      <h2>What you are buying</h2>
      <p>{BUSINESS.product} is a digital service. Access starts as soon as your payment is confirmed. It is a one-time payment for 12 months. It does not renew automatically, so there is nothing to cancel and you will not be charged again unless you choose to buy again.</p>
      <h2>Refunds</h2>
      <p>If {BUSINESS.product} is not right for you, write to us within <b>{BUSINESS.refundDays} days</b> of your payment at {BUSINESS.email} from the email address you bought with, and we will refund the full amount.</p>
      <p>After {BUSINESS.refundDays} days we do not normally give refunds, because the service has been available to you. We will always fix or refund a payment that was taken in error, for example a duplicate charge.</p>
      <h2>What happens to your access</h2>
      <p>When a refund is made, the 12 months bought with that payment are removed from your account.</p>
      <h2>How refunds are paid</h2>
      <p>Refunds go back to the card or payment method you used, through Razorpay. They usually reach your account within 5 to 7 working days, depending on your bank. Because you pay in US dollars, your bank may show the amount in your own currency, and small differences from exchange rates are outside our control.</p>
      <h2>Payment problems</h2>
      <p>If you were charged but did not get access, wait a few minutes: access is switched on automatically and a sign-in link is emailed. If nothing arrives, write to {BUSINESS.email} with the email address you used and the payment reference from your bank or Razorpay receipt.</p>
    </LegalPage>
  );
}

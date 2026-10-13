import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: true, follow: true } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy">
      <p>This policy explains what {BUSINESS.name} collects when you use {BUSINESS.product}, why, and your choices.</p>
      <h2>What we collect</h2>
      <ul>
        <li><b>Email address.</b> Used to give you access, send sign-in links and, if you buy, to link the payment to your account.</li>
        <li><b>Learning progress.</b> Lessons you complete, quiz and exam scores, flashcard ratings and similar activity, so the app can show your progress.</li>
        <li><b>Payment details.</b> Payments are handled by Razorpay. Your card details go to Razorpay and are never seen or stored by us. We keep the order, the payment reference, the amount and the date.</li>
        <li><b>Technical data.</b> Our hosting provider may log standard request information, such as IP address and browser type, for security and reliability.</li>
      </ul>
      <h2>Cookies</h2>
      <p>We use a small number of cookies that the service needs to work: one to keep you signed in, and two to remember your light or dark theme and your romanization setting. We do not use advertising or tracking cookies.</p>
      <h2>How we use it</h2>
      <p>To run the service, show your progress, send sign-in and purchase emails, prevent misuse, and answer your questions. We do not sell your data and we do not use it for advertising.</p>
      <h2>Who we share it with</h2>
      <p>Only with services that help us run {BUSINESS.product}: Razorpay (payments), our email delivery provider (sign-in and purchase emails) and our hosting and database providers. They process data on our behalf. We may also share information if the law requires it.</p>
      <h2>How long we keep it</h2>
      <p>We keep your account and progress while you have an account and for a reasonable period after your access ends, so you can renew and carry on. Payment records are kept as long as accounting law requires.</p>
      <h2>Your choices</h2>
      <p>You can ask us to see, correct or delete your data by writing to {BUSINESS.email}. Deleting your account removes your progress.</p>
      <h2>Children</h2>
      <p>The service is meant for adults and for children using it with a parent or guardian, who should be the one to buy access.</p>
      <h2>Changes</h2>
      <p>If we change this policy we will update the date at the top of this page.</p>
      <h2>Contact</h2>
      <p>{BUSINESS.name}, {BUSINESS.address}. Email: {BUSINESS.email}.</p>
    </LegalPage>
  );
}

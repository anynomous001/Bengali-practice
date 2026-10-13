import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Terms and conditions", robots: { index: true, follow: true } };

export default function Terms() {
  return (
    <LegalPage title="Terms and conditions">
      <h2>1. The service</h2>
      <p>{BUSINESS.product} is a private online Bengali learning service made up of reading, speaking, vocabulary and grammar courses, practice activities, quizzes and exams. It is built around the lessons of one teacher in Kolkata. By buying access or signing in you agree to these terms.</p>
      <h2>2. Access and price</h2>
      <p>Access lasts 12 months from the date of purchase. The price is shown in US dollars on the <a href="/buy">purchase page</a> before you pay. Buying again before your access ends adds 12 months to the end of your current access. Access is by email address, with no password: we send a one-time sign-in link to the address you registered.</p>
      <h2>3. Your account</h2>
      <p>Access is personal. Do not share your sign-in links or let other people use your account. We may suspend access if an account is shared, resold or used to copy the lessons. You are responsible for entering your email address correctly when you buy, because access and sign-in links go to that address.</p>
      <h2>4. Content and copyright</h2>
      <p>All lessons, audio, exercises, quizzes and text in {BUSINESS.product} belong to {BUSINESS.name} or are used with permission. You may use them for your own learning. You may not copy, record, republish, sell or share them without written permission.</p>
      <h2>5. Learning results</h2>
      <p>The service is a practice tool. We do not promise a particular level of fluency or any result in an exam or job. Progress tracking, scores and exam results are for your own guidance. The app cannot assess your spoken Bengali; self-checks are your own judgement.</p>
      <h2>6. Availability and changes</h2>
      <p>We work to keep the service available, but it may be interrupted for maintenance or for reasons outside our control. We add and improve lessons during your access period and may change or remove individual activities.</p>
      <h2>7. Payments and refunds</h2>
      <p>Payments are processed by Razorpay. Refunds are covered in the <a href="/refunds">refund and cancellation policy</a>.</p>
      <h2>8. Liability</h2>
      <p>To the extent the law allows, our liability for any claim about the service is limited to the amount you paid for the current access period. We are not liable for indirect or consequential loss.</p>
      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of India. Disputes are subject to the courts at Kolkata, West Bengal.</p>
      <h2>10. Contact</h2>
      <p>Questions about these terms: {BUSINESS.email}. More details on the <a href="/contact">contact page</a>.</p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Contact us", robots: { index: true, follow: true } };

export default function Contact() {
  return (
    <LegalPage title="Contact us">
      <p>Questions about access, payments or lessons? Write or call and we will reply as soon as we can, usually within two working days.</p>
      <dl className="contact-list">
        <div><dt>Business name</dt><dd>{BUSINESS.name}</dd></div>
        <div><dt>Email</dt><dd>{BUSINESS.email}</dd></div>
        <div><dt>Phone</dt><dd>{BUSINESS.phone}</dd></div>
        <div><dt>Address</dt><dd>{BUSINESS.address}</dd></div>
      </dl>
      <p>When you write about a payment, please include the email address you bought with.</p>
    </LegalPage>
  );
}

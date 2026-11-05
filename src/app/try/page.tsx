import type { Metadata } from "next";
import Link from "next/link";
import AuthFrame from "../AuthFrame";
import SessionHint from "../SessionHint";
import TryForm from "./TryForm";

export const metadata: Metadata = {
  title: "Try Bengali Practice free",
  description: "Look inside the real app before you decide: sample lessons in reading, speaking, listening, vocabulary and grammar. No card, no password.",
  robots: { index: true, follow: true },
};

export default function TryPage() {
  return (
    <AuthFrame>
      <SessionHint mode="clear" />
      <p className="eyebrow">Free preview</p>
      <h1>Look inside first</h1>
      <p className="muted">Open sample lessons from the real app: the alphabet, letter sounds, a vocabulary topic, a grammar lesson, listening practice and the kids&apos; picture lessons. No card and no password. We email you a one-time sign-in link.</p>
      <TryForm />
      <p className="muted">Already a student? <Link href="/login">Sign in here</Link>.</p>
    </AuthFrame>
  );
}

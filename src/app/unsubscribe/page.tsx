import type { Metadata } from "next";
import Link from "next/link";
import AuthFrame from "../AuthFrame";
import { emailFromUnsubscribeToken } from "@/lib/unsub";
import { stopUpdates } from "./actions";

export const metadata: Metadata = { title: "Stop update emails", robots: { index: false, follow: false } };

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ t?: string; done?: string }> }) {
  const { t, done } = await searchParams;
  const email = await emailFromUnsubscribeToken(t);
  return (
    <AuthFrame>
      <p className="eyebrow">Update emails</p>
      {!email && (
        <>
          <h1>This link is not valid</h1>
          <p className="muted">It may be incomplete. Please use the link in the email again, or write to us and we will take you off the list.</p>
        </>
      )}
      {email && done && (
        <>
          <h1>You are off the list</h1>
          <p className="muted">We will not send {email} any more update emails. Sign-in links and receipts still arrive, because you need them.</p>
        </>
      )}
      {email && !done && (
        <>
          <h1>Stop update emails?</h1>
          <p className="muted">You will no longer get news about new lessons and features at {email}. Sign-in links and receipts are not affected.</p>
          <form action={stopUpdates}>
            <input type="hidden" name="t" value={t} />
            <button className="btn" type="submit">Yes, stop them</button>
          </form>
        </>
      )}
      <p className="muted" style={{ marginTop: 24 }}><Link href="/">Back to Bengali Practice</Link></p>
    </AuthFrame>
  );
}

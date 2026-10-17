import type { Metadata } from "next";
import AuthFrame from "../../AuthFrame";
import { verifyLogin } from "../../actions";

// The link only shows a button; the token is consumed on click, so email
// scanners that pre-fetch links can't use it up.
export const metadata: Metadata = { robots: { index: false } };

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthFrame back={false}>
      <p className="eyebrow">One more step</p>
      <h1>Almost there</h1>
      <p className="muted">Confirm to finish signing in on this device.</p>
      <form action={verifyLogin} className="stack">
        <input type="hidden" name="token" value={token ?? ""} />
        <button className="btn">Continue to Bengali Practice</button>
      </form>
    </AuthFrame>
  );
}

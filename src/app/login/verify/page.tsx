import { verifyLogin } from "../../actions";

// The link only shows a button; the token is consumed on click, so email
// scanners that pre-fetch links can't use it up.
export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <main className="page narrow">
      <h1>Almost there</h1>
      <form action={verifyLogin} className="stack">
        <input type="hidden" name="token" value={token ?? ""} />
        <button className="btn">Continue to Bengali Practice</button>
      </form>
    </main>
  );
}

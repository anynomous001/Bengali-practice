import { requireAccess } from "@/lib/access";
import { appBase } from "@/lib/base-url";
import { query } from "@/lib/db";
import { codeFor, REFERRAL_MONTHS } from "@/lib/referrals";
import CopyLink from "./CopyLink";

const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });
const mask = (e: string) => { const [l, d] = e.split("@"); return `${l.slice(0, 1)}${"•".repeat(Math.max(2, Math.min(6, l.length - 1)))}@${d}`; };

export default async function ReferPage() {
  const user = await requireAccess();
  const code = await codeFor(user.email);
  if (!code) {
    return (
      <main className="wide">
        <header>
          <p className="eyebrow">Refer a friend</p>
          <h1>Referral links are for students</h1>
          <p className="lede">This account has no student plan, so there is nothing to extend with free months. Sign in with a student account to see its referral link.</p>
        </header>
      </main>
    );
  }
  const link = `${await appBase()}/buy?ref=${code}`;
  const joined = await query<{ referee_email: string; reversed: boolean; created_at: Date }>(
    "SELECT referee_email, reversed, created_at FROM referrals WHERE referrer_email = $1 ORDER BY created_at DESC",
    [user.email],
  );
  const counted = joined.filter((j) => !j.reversed).length;
  return (
    <main className="wide">
      <header>
        <p className="eyebrow">Refer a friend</p>
        <h1>Give a friend Bengali, get {REFERRAL_MONTHS} months free</h1>
        <p className="lede">Share your link. When a friend joins for the first time and pays, {REFERRAL_MONTHS} months are added to your plan. There is no limit: every friend who joins adds another {REFERRAL_MONTHS} months.</p>
      </header>
      <section className="card-static">
        <h2>Your link</h2>
        <CopyLink link={link} />
        <ul className="ticks">
          <li>The reward is added after your friend&apos;s payment is confirmed.</li>
          <li>It works for people who have never had an account before.</li>
        </ul>
      </section>
      <div className="pg-top">
        <div className="pg-stat"><b>{counted}</b><small>friends joined</small></div>
        <div className="pg-stat"><b>{counted * REFERRAL_MONTHS}</b><small>months earned</small></div>
      </div>
      {joined.length > 0 && (
        <>
          <h2>Friends who joined</h2>
          <div className="list">
            {joined.map((j) => (
              <div key={j.referee_email} className="row">
                <span><b>{mask(j.referee_email)}</b></span>
                <span className="muted">{fmt(j.created_at)}{j.reversed ? " · refunded" : ` · +${REFERRAL_MONTHS} months`}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

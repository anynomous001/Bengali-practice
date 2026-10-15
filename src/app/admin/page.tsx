import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { addStudent, grantYear, inviteStudent, removeStudent, revokeAccess } from "./actions";
import Icon from "../learn/Icon";

type Row = { email: string; note: string; access_expires_at: Date | null; created_at: Date };
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ invite?: string; to?: string }> }) {
  const { invite, to } = await searchParams;
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const students = await query<Row>("SELECT email, note, access_expires_at, created_at FROM students ORDER BY created_at DESC");

  const orders = await query<{ email: string; amount: number; currency: string; payment_id: string; paid_at: Date }>(
    "SELECT email, amount, currency, payment_id, paid_at FROM orders WHERE status = 'paid' ORDER BY paid_at DESC LIMIT 20",
  );

  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="navbtn"><Icon name="prev" size={16} />Back</Link>
        <span className="spacer" />
        <span className="chip">{students.length} students</span>
      </header>

      <form action={inviteStudent} className="stack card-static">
        <h2>Invite someone</h2>
        <p className="muted">Gives them 12 months of access and emails them a sign-in link. Nothing else is recorded: they just appear in the list below.</p>
        <input name="email" type="email" required placeholder="friend@example.com" />
        <button className="btn">Send invite</button>
        {invite === "sent" && <p className="msg good" role="status">Invite sent to {to}.</p>}
        {invite === "failed" && <p className="msg bad" role="status">{to} now has access, but the email could not be sent. Ask them to use the Sign in page.</p>}
        {invite === "limited" && <p className="msg bad" role="status">{to} now has access, but too many links were requested for them just now. Try again in a few minutes.</p>}
        {invite === "invalid" && <p className="msg bad" role="status">That email address doesn&apos;t look right.</p>}
      </form>

      <form action={addStudent} className="stack card-static">
        <h2>Add a student</h2>
        <input name="email" type="email" required placeholder="student@example.com" />
        <input name="note" placeholder="Note (optional, e.g. paid via PayPal)" maxLength={200} />
        <label><input type="checkbox" name="grant" defaultChecked /> Grant 12 months of access from today</label>
        <button className="btn">Add</button>
      </form>

      <div className="list">
        {students.map((s) => {
          const active = !!s.access_expires_at && s.access_expires_at.getTime() > Date.now();
          return (
            <div key={s.email} className="row">
              <div>
                <b>{s.email}</b> {s.note && <span className="muted">· {s.note}</span>}
                <div className="chips">
                  <span className={"chip " + (active ? "ok" : "bad")}>
                    {active ? `Active until ${fmt(s.access_expires_at!)}` : s.access_expires_at ? `Expired ${fmt(s.access_expires_at)}` : "No access"}
                  </span>
                </div>
              </div>
              <div className="actions">
                <form action={grantYear}><input type="hidden" name="email" value={s.email} /><button className="btn small">+12 months</button></form>
                {active && <form action={revokeAccess}><input type="hidden" name="email" value={s.email} /><button className="btn small ghost">Revoke</button></form>}
                <form action={removeStudent}><input type="hidden" name="email" value={s.email} /><button className="btn small ghost">Remove</button></form>
              </div>
            </div>
          );
        })}
        {!students.length && <p className="muted">No students yet.</p>}
      </div>

      <h2>Recent online payments</h2>
      <div className="list">
        {orders.map((o) => (
          <div key={o.payment_id} className="row">
            <span><b>{o.email}</b> · {(o.amount / 100).toFixed(2)} {o.currency}</span>
            <span className="muted">{fmt(o.paid_at)} · {o.payment_id}</span>
          </div>
        ))}
        {!orders.length && <p className="muted">No online payments yet.</p>}
      </div>
    </div>
  );
}

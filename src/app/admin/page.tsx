import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { addStudent, grantYear, removeStudent, revokeAccess } from "./actions";

type Row = { email: string; note: string; access_expires_at: Date | null; created_at: Date };
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });

export default async function AdminPage() {
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const students = await query<Row>("SELECT email, note, access_expires_at, created_at FROM students ORDER BY created_at DESC");

  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="brand">← Back</Link>
        <span className="spacer" />
        <b>Students ({students.length})</b>
      </header>

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
                <div className={active ? "good" : "bad"}>
                  {active ? `Active until ${fmt(s.access_expires_at!)}` : s.access_expires_at ? `Expired ${fmt(s.access_expires_at)}` : "No access"}
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
    </div>
  );
}

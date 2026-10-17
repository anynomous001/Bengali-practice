import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { addStudent, grantYear, inviteSomeone, removeStudent, resolveFeedback, revokeAccess } from "./actions";
import { LETTERS, PLACES } from "@/data/letters";
import Icon from "../learn/Icon";
import { loadTeacherView } from "@/lib/activity";

type Row = { email: string; note: string; access_expires_at: Date | null; created_at: Date };
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ invite?: string; to?: string }> }) {
  const { invite, to } = await searchParams;
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const students = await query<Row>("SELECT email, note, access_expires_at, created_at FROM students ORDER BY created_at DESC");

  const activity = await loadTeacherView();
  const orders = await query<{ email: string; amount: number; currency: string; payment_id: string; paid_at: Date }>(
    "SELECT email, amount, currency, payment_id, paid_at FROM orders WHERE status = 'paid' ORDER BY paid_at DESC LIMIT 20",
  );

  const feedback = await query<{ id: number; email: string; ref: string; topic: string; message: string; resolved: boolean; created_at: Date }>(
    "SELECT id, email, ref, topic, message, resolved, created_at FROM feedback ORDER BY resolved, created_at DESC LIMIT 50",
  );
  const answers = await query<{ letter: string; r: string; w: string }>("SELECT letter, SUM(right_count) AS r, SUM(wrong_count) AS w FROM progress GROUP BY letter");
  const tally = new Map(answers.map((a) => [a.letter, { r: Number(a.r), w: Number(a.w) }]));
  const byPlace = PLACES.map((p) => {
    let r = 0, w = 0;
    for (const l of LETTERS.filter((x) => x.place === p.id)) { const t = tally.get(l.ch); if (t) { r += t.r; w += t.w; } }
    return { ...p, r, w };
  }).filter((p) => p.r + p.w > 0);
  const hardest = LETTERS.map((l) => ({ ch: l.ch, ...(tally.get(l.ch) ?? { r: 0, w: 0 }) }))
    .filter((l) => l.r + l.w >= 5).map((l) => ({ ...l, miss: l.w / (l.r + l.w) })).sort((a, b) => b.miss - a.miss).slice(0, 8);

  return (
    <div className="page">
      <header className="top">
        <Link href="/learn" className="navbtn"><Icon name="prev" size={16} />Back</Link>
        <span className="spacer" />
        <span className="chip">{students.length} students</span>
      </header>

      <form action={inviteSomeone} className="stack card-static">
        <h2>Invite someone</h2>
        <p className="muted">Emails them a link to the site. It gives no access and nothing is recorded: they pay like anyone else.</p>
        <input name="email" type="email" required placeholder="friend@example.com" />
        <button className="btn">Send invite</button>
        {invite === "sent" && <p className="msg good" role="status">Invite sent to {to}.</p>}
        {invite === "failed" && <p className="msg bad" role="status">The email to {to} could not be sent. Please try again.</p>}
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

      <h2>Student activity</h2>
      <div className="list">
        {activity.map((a) => (
          <div key={a.email} className="row">
            <span><b>{a.email}</b></span>
            <span className="muted">{a.current}-day streak (best {a.longest}) · {a.weekPoints} points this week · {a.totalPoints} in total · last practised {a.lastActive ? fmt(new Date(a.lastActive + "T00:00:00Z")) : "never"}</span>
          </div>
        ))}
        {!activity.length && <p className="muted">No students yet.</p>}
      </div>

      <h2>Letter feedback {feedback.some((f) => !f.resolved) && <span className="chip bad">{feedback.filter((f) => !f.resolved).length} open</span>}</h2>
      <div className="list">
        {feedback.map((f) => (
          <div key={f.id} className="row">
            <span>
              <b lang="bn" className="tip-bn">{f.ref}</b> · {f.topic}{f.resolved && <span className="chip ok"> done</span>}
              {f.message && <span className="muted"> · “{f.message}”</span>}
              <span className="muted"> · {f.email} · {fmt(f.created_at)}</span>
            </span>
            <form action={resolveFeedback}><input type="hidden" name="id" value={f.id} /><button className="btn small ghost">{f.resolved ? "Reopen" : "Mark done"}</button></form>
          </div>
        ))}
        {!feedback.length && <p className="muted">No feedback yet. Students can report a problem from any letter on the alphabet page.</p>}
      </div>

      <h2>Alphabet quiz results by sound place</h2>
      <div className="list">
        {byPlace.map((p) => (
          <div key={p.id} className="row">
            <span><b lang="bn">{p.bn}</b> <span className="muted">{p.en}</span></span>
            <span className="muted">{Math.round((p.r / (p.r + p.w)) * 100)}% correct · {p.r + p.w} answers</span>
          </div>
        ))}
        {!byPlace.length && <p className="muted">No quiz answers yet.</p>}
        {hardest.length > 0 && <p className="muted">Hardest letters (most misses, at least 5 answers): {hardest.map((l) => `${l.ch} ${Math.round(l.miss * 100)}%`).join(" · ")}</p>}
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

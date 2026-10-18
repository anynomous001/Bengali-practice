import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { addStudent, grantYear, inviteSomeone, removeStudent, resolveFeedback, revokeAccess, setBuddies } from "./actions";
import Icon from "../learn/Icon";
import Toast from "../Toast";
import { loadTeacherView } from "@/lib/activity";
import { buddiesOn } from "@/lib/leaderboard";
import { BUDDIES, BUDDY_MAX_REAL } from "@/data/buddies";

type Row = { email: string; note: string; access_expires_at: Date | null; created_at: Date };
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { dateStyle: "medium" });
const fmtDay = (d: string | null) => (d ? fmt(new Date(d + "T00:00:00Z")) : "Never");

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "students", label: "Students" },
  { id: "feedback", label: "Feedback" },
  { id: "payments", label: "Payments" },
] as const;
type TabId = (typeof TABS)[number]["id"];

export const metadata: Metadata = { robots: { index: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string; invite?: string; to?: string; notice?: string }> }) {
  const { tab: tabParam, invite, to, notice } = await searchParams;
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const tab: TabId = TABS.some((t) => t.id === tabParam) ? (tabParam as TabId) : "overview";

  const students = await query<Row>("SELECT email, note, access_expires_at, created_at FROM students ORDER BY created_at DESC");
  const activity = new Map((await loadTeacherView()).map((a) => [a.email, a]));
  const orders = await query<{ email: string; amount: number; currency: string; payment_id: string; paid_at: Date }>(
    "SELECT email, amount, currency, payment_id, paid_at FROM orders WHERE status = 'paid' ORDER BY paid_at DESC LIMIT 50",
  );
  const feedback = await query<{ id: number; email: string; area: string; ref: string; topic: string; message: string; resolved: boolean; created_at: Date }>(
    "SELECT id, email, area, ref, topic, message, resolved, created_at FROM feedback ORDER BY resolved, created_at DESC LIMIT 100",
  );
  const reviews = await query<{ email: string; rating: number; comment: string; updated_at: Date }>(
    "SELECT email, rating, comment, updated_at FROM reviews ORDER BY updated_at DESC LIMIT 100",
  );
  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const referrals = await query<{ referee_email: string; referrer_email: string; reversed: boolean; created_at: Date }>(
    "SELECT referee_email, referrer_email, reversed, created_at FROM referrals ORDER BY created_at DESC LIMIT 50",
  );
  const buddies = await buddiesOn();
  const now = Date.now();
  const isActive = (s: Row) => !!s.access_expires_at && s.access_expires_at.getTime() > now;
  const activeCount = students.filter(isActive).length;
  const openFeedback = feedback.filter((f) => !f.resolved).length;
  const weekAgo = new Date(now - 7 * 864e5).toISOString().slice(0, 10);
  const practisedThisWeek = [...activity.values()].filter((a) => a.lastActive && a.lastActive >= weekAgo).length;
  const expiring = students.filter((s) => isActive(s) && s.access_expires_at!.getTime() < now + 30 * 864e5);

  return (
    <div className="page adm">
      <Toast message={notice} kind={notice && /doesn.t look right|could not/.test(notice) ? "bad" : "good"} clearParam="notice" />
      <header className="adm-head">
        <div>
          <p className="eyebrow">Teacher area</p>
          <h1>Admin</h1>
        </div>
        <Link href="/learn" className="navbtn"><Icon name="prev" size={16} />Back to lessons</Link>
      </header>

      <nav className="adm-tabs" aria-label="Admin sections">
        {TABS.map((t) => (
          <Link key={t.id} href={`/admin?tab=${t.id}`} className={tab === t.id ? "on" : ""} aria-current={tab === t.id ? "page" : undefined}>
            {t.label}
            {t.id === "feedback" && openFeedback > 0 && <span className="adm-badge">{openFeedback}</span>}
          </Link>
        ))}
      </nav>

      {tab === "overview" && (
        <>
          <div className="adm-stats">
            <Link href="/admin?tab=students" className="adm-stat"><b>{activeCount}</b><span>Active students</span><small>{students.length} added in total</small></Link>
            <div className="adm-stat"><b>{practisedThisWeek}</b><span>Practised this week</span><small>of {students.length} students</small></div>
            <Link href="/admin?tab=feedback" className="adm-stat"><b>{openFeedback}</b><span>Open feedback</span><small>{openFeedback ? "waiting for you" : "all caught up"}</small></Link>
            <Link href="/admin?tab=feedback" className="adm-stat"><b>{reviews.length ? avgRating.toFixed(1) : "–"}</b><span>Average rating</span><small>{reviews.length ? `${reviews.length} review${reviews.length === 1 ? "" : "s"}` : "no reviews yet"}</small></Link>
            <Link href="/admin?tab=payments" className="adm-stat"><b>{orders.length}</b><span>Online payments</span><small>{orders[0] ? `latest ${fmt(orders[0].paid_at)}` : "none yet"}</small></Link>
          </div>

          <section className="adm-card">
            <h2>Access ending in the next 30 days</h2>
            {expiring.length ? (
              <ul className="adm-plain">
                {expiring.map((s) => (
                  <li key={s.email}><span>{s.email}</span><span className="muted">ends {fmt(s.access_expires_at!)}</span>
                    <form action={grantYear}><input type="hidden" name="tab" value={tab} /><input type="hidden" name="email" value={s.email} /><button className="btn small">+12 months</button></form>
                  </li>
                ))}
              </ul>
            ) : <p className="muted">Nobody&apos;s access ends soon.</p>}
          </section>

          <section className="adm-card">
            <h2>Leaderboard practice buddies</h2>
            <p className="muted">Example classmates ({BUDDIES.map((b) => b.name).join(", ")}) shown on the student leaderboard, labelled “Practice buddy”. Each paces itself to the viewing student&apos;s own daily goal, so the goal becomes a place to aim for. They are not real accounts and appear in no counts. They hide automatically once {BUDDY_MAX_REAL} real students are on the board.</p>
            <form action={setBuddies}>
              <input type="hidden" name="tab" value="overview" />
              <input type="hidden" name="on" value={buddies ? "0" : "1"} />
              <button className="btn small">{buddies ? "Turn practice buddies off" : "Turn practice buddies on"}</button>
              <span className={"chip " + (buddies ? "ok" : "")} style={{ marginLeft: 10 }}>{buddies ? "On" : "Off"}</span>
            </form>
          </section>

          <section className="adm-card">
            <h2>Latest feedback</h2>
            {feedback.slice(0, 3).map((f) => <FeedbackItem key={f.id} f={f} tab={tab} />)}
            {!feedback.length && <p className="muted">Nothing yet. Students send ideas from the Feedback page.</p>}
            {feedback.length > 0 && <Link href="/admin?tab=feedback" className="adm-more">See all feedback</Link>}
          </section>
        </>
      )}

      {tab === "students" && (
        <>
          <div className="adm-forms">
            <form action={addStudent} className="adm-card stack">
              <h2>Add a student</h2>
              <input name="email" type="email" required placeholder="student@example.com" aria-label="Student email" />
              <input name="note" placeholder="Note (optional, e.g. paid via PayPal)" maxLength={200} aria-label="Note" />
              <label className="adm-check"><input type="checkbox" name="grant" defaultChecked /> Give 12 months of access from today</label>
              <button className="btn">Add student</button>
            </form>
            <form action={inviteSomeone} className="adm-card stack">
              <h2>Invite someone</h2>
              <p className="muted">Emails them a link to the site. It gives no access and nothing is recorded: they pay like anyone else.</p>
              <input name="email" type="email" required placeholder="friend@example.com" aria-label="Email to invite" />
              <button className="btn">Send invite</button>
              {invite === "sent" && <p className="msg good" role="status">Invite sent to {to}.</p>}
              {invite === "failed" && <p className="msg bad" role="status">The email to {to} could not be sent. Please try again.</p>}
              {invite === "invalid" && <p className="msg bad" role="status">That email address doesn&apos;t look right.</p>}
            </form>
          </div>

          <section className="adm-card flush">
            <h2 className="adm-pad">All students <span className="muted">({students.length})</span></h2>
            <div className="adm-table" role="table" aria-label="Students">
              <div className="adm-tr adm-th" role="row"><span role="columnheader">Student</span><span role="columnheader">Access</span><span role="columnheader">Practice</span><span role="columnheader" className="adm-end">Actions</span></div>
              {students.map((s) => {
                const a = activity.get(s.email);
                const active = isActive(s);
                return (
                  <div key={s.email} className="adm-tr" role="row">
                    <span role="cell" className="adm-who"><b>{s.email}</b>{s.note && <small className="muted">{s.note}</small>}</span>
                    <span role="cell"><span className={"chip " + (active ? "ok" : "bad")}>{active ? `Until ${fmt(s.access_expires_at!)}` : s.access_expires_at ? `Expired ${fmt(s.access_expires_at)}` : "No access"}</span></span>
                    <span role="cell" className="adm-prac">
                      <span><b>{a?.current ?? 0}</b>-day streak · {a?.weekPoints ?? 0} pts this week</span>
                      <small className="muted">Last practised {fmtDay(a?.lastActive ?? null)}</small>
                    </span>
                    <span role="cell" className="adm-end adm-actions">
                      <form action={grantYear}><input type="hidden" name="tab" value={tab} /><input type="hidden" name="email" value={s.email} /><button className="btn small">+12 months</button></form>
                      {active && <form action={revokeAccess}><input type="hidden" name="tab" value="students" /><input type="hidden" name="email" value={s.email} /><button className="btn small ghost">Revoke</button></form>}
                      <form action={removeStudent}><input type="hidden" name="tab" value="students" /><input type="hidden" name="email" value={s.email} /><button className="btn small ghost">Remove</button></form>
                    </span>
                  </div>
                );
              })}
              {!students.length && <p className="muted adm-pad">No students yet.</p>}
            </div>
          </section>
        </>
      )}

      {tab === "feedback" && (
        <section className="adm-card">
          <h2>Website reviews {reviews.length > 0 && <span className="chip">{avgRating.toFixed(1)} ★ from {reviews.length}</span>}</h2>
          {reviews.map((r) => (
            <article key={r.email} className="adm-fb">
              <div className="adm-fb-top"><b className="rate-static" aria-label={`${r.rating} out of 5 stars`}>{"★".repeat(r.rating)}<span className="off">{"★".repeat(5 - r.rating)}</span></b></div>
              {r.comment && <p className="adm-fb-msg">{r.comment}</p>}
              <small className="muted">{r.email} · {fmt(r.updated_at)}</small>
            </article>
          ))}
          {!reviews.length && <p className="muted">No reviews yet. Students rate the website from the Feedback page.</p>}
        </section>
      )}

      {tab === "feedback" && (
        <section className="adm-card">
          <h2>Student feedback {openFeedback > 0 && <span className="chip bad">{openFeedback} open</span>}</h2>
          {feedback.map((f) => <FeedbackItem key={f.id} f={f} tab={tab} />)}
          {!feedback.length && <p className="muted">No feedback yet. Students send ideas and problems from the Feedback page, or report a letter from the alphabet page.</p>}
        </section>
      )}

      {tab === "payments" && (
        <section className="adm-card flush">
          <h2 className="adm-pad">Recent online payments</h2>
          <div className="adm-table" role="table" aria-label="Payments">
            <div className="adm-tr adm-th adm-pay" role="row"><span role="columnheader">Student</span><span role="columnheader">Amount</span><span role="columnheader">Date</span><span role="columnheader">Payment ID</span></div>
            {orders.map((o) => (
              <div key={o.payment_id} className="adm-tr adm-pay" role="row">
                <span role="cell"><b>{o.email}</b></span>
                <span role="cell">{(o.amount / 100).toFixed(2)} {o.currency}</span>
                <span role="cell">{fmt(o.paid_at)}</span>
                <span role="cell" className="muted adm-id">{o.payment_id}</span>
              </div>
            ))}
            {!orders.length && <p className="muted adm-pad">No online payments yet.</p>}
          </div>
        </section>
      )}

      {tab === "payments" && (
        <section className="adm-card flush">
          <h2 className="adm-pad">Referrals <span className="muted">(+3 months for the referrer)</span></h2>
          <div className="adm-table" role="table" aria-label="Referrals">
            <div className="adm-tr adm-th adm-pay" role="row"><span role="columnheader">Referrer</span><span role="columnheader">Friend who joined</span><span role="columnheader">Date</span><span role="columnheader">Status</span></div>
            {referrals.map((r) => (
              <div key={r.referee_email} className="adm-tr adm-pay" role="row">
                <span role="cell"><b>{r.referrer_email}</b></span>
                <span role="cell">{r.referee_email}</span>
                <span role="cell">{fmt(r.created_at)}</span>
                <span role="cell"><span className={"chip " + (r.reversed ? "bad" : "ok")}>{r.reversed ? "Reversed (refund)" : "3 months added"}</span></span>
              </div>
            ))}
            {!referrals.length && <p className="muted adm-pad">No referrals yet.</p>}
          </div>
        </section>
      )}
    </div>
  );
}

type FB = { id: number; email: string; area: string; ref: string; topic: string; message: string; resolved: boolean; created_at: Date };

function FeedbackItem({ f, tab }: { f: FB; tab: string }) {
  return (
    <article className={"adm-fb" + (f.resolved ? " done" : "")}>
      <div className="adm-fb-top">
        <span className="chip">{f.area === "alphabet" ? "Letter" : "App"}</span>
        <b>{f.topic}</b>
        {f.area === "alphabet" && <b lang="bn" className="tip-bn">{f.ref}</b>}
        {f.resolved && <span className="chip ok">Done</span>}
        <span className="spacer" />
        <form action={resolveFeedback}><input type="hidden" name="tab" value={tab} /><input type="hidden" name="id" value={f.id} /><button className="btn small ghost">{f.resolved ? "Reopen" : "Mark done"}</button></form>
      </div>
      {f.message && <p className="adm-fb-msg">{f.message}</p>}
      <small className="muted">{f.email} · {fmt(f.created_at)}</small>
    </article>
  );
}

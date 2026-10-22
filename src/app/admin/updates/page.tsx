import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import Icon from "../../learn/Icon";
import Toast from "../../Toast";
import Composer, { type Template } from "./Composer";
import { countAudience } from "./actions";

export const metadata: Metadata = { title: "Send updates", robots: { index: false } };
export const maxDuration = 60;

// A starting point. Edit any of it in the page before sending.
const TEMPLATE: Template = {
  subject: "What's new on Bengali Practice",
  heading: "New things to try this week",
  intro: "Hello! I added a few things since you last visited. Here is a quick look.",
  bullets: [
    "Step-by-step pictures that show how to write each vowel, consonant and number",
    "Grammar lessons with more examples and short exercises",
    "A new Writing course with tracing practice",
    "Light and dark mode, so it is easier on your eyes",
  ].join("\n"),
  closing: "Reply to this email if something is unclear or you would like a topic added. I read every message.",
  buttonLabel: "Check it out",
};

export default async function UpdatesPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  const user = await getUser();
  if (!user?.isAdmin) notFound();
  const counts = { active: await countAudience("active"), all: await countAudience("all") };
  const history = await query<{ id: number; subject: string; audience: string; recipients: number; sent: number; failed: number; sent_at: Date }>(
    "SELECT id, subject, audience, recipients, sent, failed, sent_at FROM announcements ORDER BY sent_at DESC LIMIT 20",
  );
  return (
    <div className="page adm">
      <Toast message={notice} kind="good" clearParam="notice" />
      <header className="adm-head">
        <div>
          <p className="eyebrow">Teacher area</p>
          <h1>Send updates</h1>
        </div>
        <Link href="/admin" className="navbtn"><Icon name="prev" size={16} />Back to admin</Link>
      </header>
      <Composer template={TEMPLATE} counts={counts} />
      <section className="upd-history">
        <h2>Sent so far</h2>
        {history.length === 0 ? <p className="muted">Nothing sent yet.</p> : (
          <ul>
            {history.map((h) => (
              <li key={h.id}>
                <strong>{h.subject}</strong>
                <span className="muted"> · {h.sent_at.toLocaleDateString("en-GB", { dateStyle: "medium" })} · {h.sent} of {h.recipients} sent{h.failed ? `, ${h.failed} failed` : ""} · {h.audience === "all" ? "everyone" : "active students"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

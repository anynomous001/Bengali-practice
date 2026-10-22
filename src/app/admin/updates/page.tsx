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
  subject: "{name}, set your goal and get a path made for you",
  heading: "Now you can set your goal on Bengali Practice!",
  intro: "Hi {name}! Bengali Practice just got its biggest update yet. You can now learn to write Bengali, step by step, and your practice can follow the goal you care about most.",
  bullets: [
    "Brand new Writing course: a full course just for writing Bengali, with exercises for every vowel, consonant and number",
    "Tracing practice: trace each letter right on your screen, with a guide to follow",
    "Step-by-step pictures: see exactly how to build each letter, one stroke at a time",
    "Goals: tell us why you are learning, such as talking with family, travel or work",
    "A path made for your goal: pick a goal and we suggest what to practice next",
    "Light and dark mode: switch with one tap",
].join("\n"),
  closing: "This is just the start. More is on the way, and I would love to hear what you want next. Reply to this email with any idea or question.",
  signoff: "Warmly,\nPritam",
  buttonLabel: "Start writing",
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

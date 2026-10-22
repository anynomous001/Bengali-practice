"use server";

import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { appBase } from "@/lib/base-url";
import { query } from "@/lib/db";
import { renderMail, sendBatch, updateMail, type UpdateDraft } from "@/lib/email";
import { unsubscribeToken } from "@/lib/unsub";

async function admin() {
  const user = await getUser();
  if (!user?.isAdmin) throw new Error("Forbidden");
  return user;
}

function draftFrom(fd: FormData): UpdateDraft {
  const s = (k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);
  return {
    subject: s("subject", 150),
    heading: s("heading", 150),
    intro: s("intro", 800),
    bullets: s("bullets", 4000).split("\n").map((l) => l.replace(/^[-*•]\s*/, "").trim()).filter(Boolean).slice(0, 15),
    closing: s("closing", 800),
    signoff: s("signoff", 200),
    buttonLabel: s("buttonLabel", 40) || "See what's new",
  };
}

/** Fills {name} with the student's first name, or "there" when they have not set one. */
function personalize(d: UpdateDraft, name: string | null): UpdateDraft {
  const first = (name ?? "").trim().split(/\s+/)[0] || "there";
  const f = (t: string) => t.replace(/\{name\}/gi, first);
  return { ...d, subject: f(d.subject), heading: f(d.heading), intro: f(d.intro), bullets: d.bullets.map(f), closing: f(d.closing), signoff: f(d.signoff) };
}

async function mailFor(draft: UpdateDraft, email: string, name: string | null) {
  const d = personalize(draft, name);
  const base = await appBase();
  const unsub = `${base}/unsubscribe?t=${encodeURIComponent(await unsubscribeToken(email))}`;
  return { to: email, subject: d.subject, mail: updateMail(d, `${base}/learn`, unsub), unsubscribe: unsub };
}

/** The email exactly as students will see it, for the preview pane. */
export async function previewHtml(fd: FormData): Promise<string> {
  await admin();
  return renderMail(updateMail(personalize(draftFrom(fd), "Asha"), `${await appBase()}/learn`, `${await appBase()}/unsubscribe`)).html;
}

export type SendResult = { ok: boolean; message: string };

/** Sends the draft to the signed-in teacher only, so it can be checked in a real inbox. */
export async function sendTest(fd: FormData): Promise<SendResult> {
  const user = await admin();
  const d = draftFrom(fd);
  if (!d.subject || !d.heading) return { ok: false, message: "Add a subject and a heading first." };
  try {
    const me = await query<{ display_name: string | null }>("SELECT display_name FROM student_settings WHERE email = $1", [user.email]);
    await sendBatch([await mailFor(d, user.email, me[0]?.display_name ?? null)]);
  } catch (e) {
    return { ok: false, message: `The test did not send: ${(e as Error).message}` };
  }
  return { ok: true, message: `Test sent to ${user.email}.` };
}

/** Counts who would get the email for each audience. */
export async function countAudience(audience: string): Promise<number> {
  const rows = await query<{ n: number }>(
    `SELECT COUNT(*)::int AS n FROM students s LEFT JOIN student_settings t ON t.email = s.email
     WHERE COALESCE(t.news, true) ${audience === "all" ? "" : "AND s.access_expires_at > now()"}`,
  );
  return rows[0]?.n ?? 0;
}

export async function sendToStudents(fd: FormData): Promise<SendResult> {
  const user = await admin();
  const d = draftFrom(fd);
  const audience = fd.get("audience") === "all" ? "all" : "active";
  if (!d.subject || !d.heading) return { ok: false, message: "Add a subject and a heading first." };
  if (fd.get("confirm") !== "on") return { ok: false, message: "Tick the box to confirm you want to send this." };

  const list = await query<{ email: string; display_name: string | null }>(
    `SELECT s.email, t.display_name FROM students s LEFT JOIN student_settings t ON t.email = s.email
     WHERE COALESCE(t.news, true) ${audience === "all" ? "" : "AND s.access_expires_at > now()"} ORDER BY s.email`,
  );
  let sent = 0;
  let failed = 0;
  for (let i = 0; i < list.length; i += 100) {
    const chunk = list.slice(i, i + 100);
    try {
      sent += await sendBatch(await Promise.all(chunk.map((r) => mailFor(d, r.email, r.display_name))));
    } catch (e) {
      console.error("[updates] batch failed", e);
      failed += chunk.length;
    }
  }
  await query(
    `INSERT INTO announcements (subject, body, audience, recipients, sent, failed, sent_by) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [d.subject, JSON.stringify(d), audience, list.length, sent, failed, user.email],
  );
  redirect(`/admin/updates?notice=${encodeURIComponent(failed ? `Sent to ${sent}. ${failed} did not go through, see the history below.` : `Sent to ${sent} student${sent === 1 ? "" : "s"}.`)}`);
}

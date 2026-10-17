"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, normalizeEmail, validEmail } from "@/lib/auth";
import { appBase } from "@/lib/base-url";
import { query } from "@/lib/db";
import { sendInviteEmail } from "@/lib/email";

async function requireAdmin() {
  const user = await getUser();
  if (!user?.isAdmin) throw new Error("Forbidden");
}

/** Goes back to the admin tab the action came from, with a short confirmation shown as a toast. */
function done(fd: FormData, fallbackTab: string, notice: string): never {
  const t = String(fd.get("tab") ?? fallbackTab);
  const tab = ["overview", "students", "feedback", "payments"].includes(t) ? t : fallbackTab;
  redirect(`/admin?tab=${tab}&notice=${encodeURIComponent(notice)}`);
}

const emailOf = (fd: FormData) => normalizeEmail(String(fd.get("email") ?? ""));

export async function addStudent(fd: FormData) {
  await requireAdmin();
  const email = emailOf(fd);
  if (!validEmail(email)) done(fd, "students", "That email address doesn't look right.");
  const note = String(fd.get("note") ?? "").slice(0, 200);
  const grant = fd.get("grant") === "on";
  await query(
    `INSERT INTO students (email, note, access_expires_at)
     VALUES ($1, $2, CASE WHEN $3 THEN now() + interval '12 months' END)
     ON CONFLICT (email) DO NOTHING`,
    [email, note, grant],
  );
  done(fd, "students", `${email} added${grant ? " with 12 months of access" : ""}.`);
}

/** Adds 12 months, counted from today or from the current expiry if that is later. */
export async function grantYear(fd: FormData) {
  await requireAdmin();
  await query(
    `UPDATE students SET access_expires_at = GREATEST(now(), COALESCE(access_expires_at, now())) + interval '12 months'
     WHERE email = $1`,
    [emailOf(fd)],
  );
  done(fd, "students", `12 months added for ${emailOf(fd)}.`);
}

export async function revokeAccess(fd: FormData) {
  await requireAdmin();
  await query("UPDATE students SET access_expires_at = NULL WHERE email = $1", [emailOf(fd)]);
  done(fd, "students", `Access removed for ${emailOf(fd)}.`);
}

export async function removeStudent(fd: FormData) {
  await requireAdmin();
  const email = emailOf(fd);
  await query("DELETE FROM students WHERE email = $1", [email]);
  await query("DELETE FROM progress WHERE email = $1", [email]);
  done(fd, "students", `${email} removed.`);
}

/** Emails the person a link to the site. Nothing is stored and no access is granted: they pay like anyone else. */
export async function inviteSomeone(fd: FormData) {
  await requireAdmin();
  const email = emailOf(fd);
  if (!validEmail(email)) redirect("/admin?tab=students&invite=invalid");
  let result = "sent";
  try {
    await sendInviteEmail(email, `${await appBase()}/buy`);
  } catch (e) {
    console.error("invite email failed", e);
    result = "failed";
  }
  redirect(`/admin?tab=students&invite=${result}&to=${encodeURIComponent(email)}&notice=${encodeURIComponent(result === "sent" ? `Invite sent to ${email}.` : "The invite could not be sent.")}`);
}

export async function resolveFeedback(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  await query("UPDATE feedback SET resolved = NOT resolved WHERE id = $1", [id]);
  done(fd, "feedback", "Feedback updated.");
}

export async function setBuddies(fd: FormData) {
  await requireAdmin();
  const value = fd.get("on") === "1" ? "on" : "off";
  await query("INSERT INTO app_flags (key, value) VALUES ('buddies', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [value]);
  revalidatePath("/learn/leaderboard");
  done(fd, "overview", value === "on" ? "Practice buddies are on." : "Practice buddies are off.");
}

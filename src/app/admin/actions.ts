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

const emailOf = (fd: FormData) => normalizeEmail(String(fd.get("email") ?? ""));

export async function addStudent(fd: FormData) {
  await requireAdmin();
  const email = emailOf(fd);
  if (!validEmail(email)) return;
  const note = String(fd.get("note") ?? "").slice(0, 200);
  const grant = fd.get("grant") === "on";
  await query(
    `INSERT INTO students (email, note, access_expires_at)
     VALUES ($1, $2, CASE WHEN $3 THEN now() + interval '12 months' END)
     ON CONFLICT (email) DO NOTHING`,
    [email, note, grant],
  );
  revalidatePath("/admin");
}

/** Adds 12 months, counted from today or from the current expiry if that is later. */
export async function grantYear(fd: FormData) {
  await requireAdmin();
  await query(
    `UPDATE students SET access_expires_at = GREATEST(now(), COALESCE(access_expires_at, now())) + interval '12 months'
     WHERE email = $1`,
    [emailOf(fd)],
  );
  revalidatePath("/admin");
}

export async function revokeAccess(fd: FormData) {
  await requireAdmin();
  await query("UPDATE students SET access_expires_at = NULL WHERE email = $1", [emailOf(fd)]);
  revalidatePath("/admin");
}

export async function removeStudent(fd: FormData) {
  await requireAdmin();
  const email = emailOf(fd);
  await query("DELETE FROM students WHERE email = $1", [email]);
  await query("DELETE FROM progress WHERE email = $1", [email]);
  revalidatePath("/admin");
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
  redirect(`/admin?tab=students&invite=${result}&to=${encodeURIComponent(email)}`);
}

export async function resolveFeedback(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  await query("UPDATE feedback SET resolved = NOT resolved WHERE id = $1", [id]);
  revalidatePath("/admin");
}

export async function setBuddies(fd: FormData) {
  await requireAdmin();
  const value = fd.get("on") === "1" ? "on" : "off";
  await query("INSERT INTO app_flags (key, value) VALUES ('buddies', $1) ON CONFLICT (key) DO UPDATE SET value = $1", [value]);
  revalidatePath("/admin");
  revalidatePath("/learn/leaderboard");
}

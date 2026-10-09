"use server";

import { revalidatePath } from "next/cache";
import { getUser, normalizeEmail, validEmail } from "@/lib/auth";
import { query } from "@/lib/db";

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

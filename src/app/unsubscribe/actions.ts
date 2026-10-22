"use server";

import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { emailFromUnsubscribeToken } from "@/lib/unsub";

/** Turns update emails off for the person the signed link belongs to. */
export async function stopUpdates(fd: FormData) {
  const token = String(fd.get("t") ?? "");
  const email = await emailFromUnsubscribeToken(token);
  if (!email) redirect("/unsubscribe");
  await query(
    `INSERT INTO student_settings (email, news) VALUES ($1, false) ON CONFLICT (email) DO UPDATE SET news = false`,
    [email],
  );
  redirect(`/unsubscribe?t=${encodeURIComponent(token)}&done=1`);
}

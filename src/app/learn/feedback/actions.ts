"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { FEEDBACK_KINDS } from "./kinds";

export type FeedbackState = { ok: boolean; message: string } | undefined;

/** Feedback about the whole app: an idea, a problem, a question. The teacher reads it on the admin page. */
export async function sendFeedback(_prev: FeedbackState, fd: FormData): Promise<FeedbackState> {
  const user = await getUser();
  if (!user?.hasAccess) return { ok: false, message: "Please sign in again." };
  const kind = String(fd.get("kind") ?? "");
  const message = String(fd.get("message") ?? "").trim().slice(0, 2000);
  if (!FEEDBACK_KINDS.includes(kind)) return { ok: false, message: "Please choose what kind of feedback this is." };
  if (message.length < 5) return { ok: false, message: "Please write a few words so your teacher understands." };
  const recent = await query<{ n: string }>("SELECT COUNT(*) AS n FROM feedback WHERE email = $1 AND created_at > now() - interval '1 hour'", [user.email]);
  if (Number(recent[0]?.n ?? 0) >= 20) return { ok: false, message: "That is a lot of messages for one hour. Please try again later." };
  await query("INSERT INTO feedback (email, area, ref, topic, message) VALUES ($1, 'app', '', $2, $3)", [user.email, kind, message]);
  revalidatePath("/learn/feedback");
  return { ok: true, message: "Thank you. Your teacher will read this." };
}

/** A review of the whole website: one per student, which they can change later. */
export async function saveReview(_prev: FeedbackState, fd: FormData): Promise<FeedbackState> {
  const user = await getUser();
  if (!user?.hasAccess) return { ok: false, message: "Please sign in again." };
  const rating = Number(fd.get("rating"));
  const comment = String(fd.get("comment") ?? "").trim().slice(0, 1000);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { ok: false, message: "Please choose 1 to 5 stars." };
  await query(
    `INSERT INTO reviews (email, rating, comment) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = now()`,
    [user.email, rating, comment],
  );
  revalidatePath("/learn/feedback");
  return { ok: true, message: "Thank you for your review. You can change it any time." };
}

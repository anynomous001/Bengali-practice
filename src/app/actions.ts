"use server";

import { redirect } from "next/navigation";
import { ALL_CARD_IDS } from "@/data/decks";
import { LETTERS } from "@/data/letters";
import {
  canSignIn,
  consumeLoginToken,
  createLoginToken,
  endSession,
  getUser,
  normalizeEmail,
  startSession,
  validEmail,
} from "@/lib/auth";
import { query } from "@/lib/db";
import { sendLoginEmail } from "@/lib/email";

export type FormState = { message: string; ok?: boolean } | undefined;

export async function requestLogin(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!validEmail(email)) return { message: "Please enter a valid email address." };
  // Same reply whether or not the email is enrolled, so the list can't be probed.
  try {
    if (await canSignIn(email)) {
      const token = await createLoginToken(email);
      if (token) {
        const base = (process.env.APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
        await sendLoginEmail(email, `${base}/login/verify?token=${encodeURIComponent(token)}`);
      }
    }
  } catch (e) {
    console.error("requestLogin failed", e);
    return { message: "Something went wrong sending the email. Please try again shortly." };
  }
  return { ok: true, message: "If this email is enrolled, a sign-in link is on its way. Check your inbox." };
}

export async function verifyLogin(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const email = token ? await consumeLoginToken(token) : null;
  if (!email) redirect("/login?error=expired");
  await startSession(email);
  redirect("/learn");
}

export async function logout() {
  await endSession();
  redirect("/");
}

export async function recordAnswer(letter: string, correct: boolean) {
  const user = await getUser();
  if (!user?.hasAccess || !LETTERS.some((l) => l.ch === letter)) return;
  await query(
    `INSERT INTO progress (email, letter, right_count, wrong_count) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email, letter) DO UPDATE SET
       right_count = progress.right_count + $3, wrong_count = progress.wrong_count + $4`,
    [user.email, letter, correct ? 1 : 0, correct ? 0 : 1],
  );
}

// Leitner boxes: days until a card is due again, by box.
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];

export async function rateCard(cardId: string, rating: "again" | "good" | "easy") {
  const user = await getUser();
  if (!user?.hasAccess || !ALL_CARD_IDS.has(cardId)) return;
  if (rating !== "again" && rating !== "good" && rating !== "easy") return;
  const jump = rating === "again" ? 0 : rating === "good" ? 1 : 2;
  const max = INTERVAL_DAYS.length - 1;
  // "again" sends the card back to box 0; otherwise move up by 1 or 2 boxes.
  await query(
    `INSERT INTO flashcards (email, card_id, box, due_at, reviews)
     VALUES ($1, $2, LEAST($3::int, $4), now() + ($5::int[])[LEAST($3::int, $4) + 1] * interval '1 day', 1)
     ON CONFLICT (email, card_id) DO UPDATE SET
       box = CASE WHEN $6 THEN 0 ELSE LEAST(flashcards.box + $3::int, $4) END,
       due_at = now() + ($5::int[])[(CASE WHEN $6 THEN 0 ELSE LEAST(flashcards.box + $3::int, $4) END) + 1] * interval '1 day',
       reviews = flashcards.reviews + 1`,
    [user.email, cardId, jump, max, INTERVAL_DAYS, rating === "again"],
  );
}

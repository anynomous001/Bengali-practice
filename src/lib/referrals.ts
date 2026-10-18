import { randomBytes } from "node:crypto";
import { query } from "./db";
import { sendReferralEmail } from "./email";

/** Months added to the referrer's plan for each friend who joins and pays. */
export const REFERRAL_MONTHS = 3;

/** The same mailbox written differently (dots or +tags in Gmail) counts as one person. */
export function canonEmail(email: string): string {
  const [l0, d0] = email.trim().toLowerCase().split("@");
  let l = (l0 ?? "").split("+")[0];
  let d = d0 ?? "";
  if (d === "gmail.com" || d === "googlemail.com") { l = l.replace(/\./g, ""); d = "gmail.com"; }
  return `${l}@${d}`;
}

export const validRefCode = (c: unknown): c is string => typeof c === "string" && /^[a-z0-9]{6,12}$/.test(c);

/** A student's own referral code, made the first time it is needed. Null when the account has no student plan (an admin account), since there is nothing to extend. */
export async function codeFor(email: string): Promise<string | null> {
  const row = (await query<{ ref_code: string | null }>("SELECT ref_code FROM students WHERE email = $1", [email]))[0];
  if (!row) return null;
  if (row.ref_code) return row.ref_code;
  for (let i = 0; i < 5; i++) {
    const code = randomBytes(6).toString("base64url").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
    if (code.length < 6) continue;
    try {
      const r = await query<{ ref_code: string }>("UPDATE students SET ref_code = COALESCE(ref_code, $2) WHERE email = $1 RETURNING ref_code", [email, code]);
      if (r[0]) return r[0].ref_code;
    } catch { /* code already used: try another */ }
  }
  throw new Error("Could not make a referral code");
}

export async function codeIsValid(code: string | undefined): Promise<boolean> {
  if (!validRefCode(code)) return false;
  return (await query("SELECT 1 FROM students WHERE ref_code = $1 AND access_expires_at IS NOT NULL", [code])).length > 0;
}

/** Called once, when a first-time buyer's payment is confirmed. Adds three months to the referrer's plan. */
export async function applyReferral(code: string, buyer: string, orderId: string, base?: string) {
  try {
    const ref = (await query<{ email: string }>("SELECT email FROM students WHERE ref_code = $1 AND access_expires_at IS NOT NULL", [code]))[0];
    if (!ref || canonEmail(ref.email) === canonEmail(buyer)) return;
    const added = await query("INSERT INTO referrals (referee_email, referrer_email, order_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING referee_email", [buyer, ref.email, orderId]);
    if (!added.length) return;
    await query(
      `UPDATE students SET access_expires_at = GREATEST(now(), access_expires_at) + ($2 || ' months')::interval WHERE email = $1`,
      [ref.email, String(REFERRAL_MONTHS)],
    );
    const origin = base ?? process.env.APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
    await sendReferralEmail(ref.email, `${origin}/learn/refer`, REFERRAL_MONTHS).catch((e) => console.error("referral email failed", e));
  } catch (e) {
    console.error("applyReferral failed", e);
  }
}

/** A full refund by the friend takes the three months back from the referrer. */
export async function reverseReferral(referee: string) {
  const r = await query<{ referrer_email: string }>("UPDATE referrals SET reversed = true WHERE referee_email = $1 AND reversed = false RETURNING referrer_email", [referee]);
  if (r.length) {
    await query("UPDATE students SET access_expires_at = access_expires_at - ($2 || ' months')::interval WHERE email = $1", [r[0].referrer_email, String(REFERRAL_MONTHS)]);
  }
}

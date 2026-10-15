import { NextResponse } from "next/server";
import { loadStats } from "@/lib/activity";
import { appBase } from "@/lib/base-url";
import { query } from "@/lib/db";
import { sendReminderEmail } from "@/lib/email";

/** Called once a day by Vercel Cron (see vercel.json). Vercel sends `Authorization: Bearer $CRON_SECRET`. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const rows = await query<{ email: string; tz: string | null; last_reminded: string | null }>(
    `SELECT ss.email, ss.tz, ss.last_reminded FROM student_settings ss
       LEFT JOIN students s ON s.email = ss.email
      WHERE ss.remind = true AND (s.access_expires_at > now())`,
  );
  const base = await appBase();
  let sent = 0;
  for (const r of rows) {
    try {
      const st = await loadStats(r.email, r.tz || "UTC");
      if (st.practisedToday || r.last_reminded === st.today) continue;
      await sendReminderEmail(r.email, `${base}/learn`, st.current);
      await query("UPDATE student_settings SET last_reminded = $2 WHERE email = $1", [r.email, st.today]);
      sent++;
    } catch (e) {
      console.error("reminder failed", r.email, e);
    }
  }
  return NextResponse.json({ checked: rows.length, sent });
}

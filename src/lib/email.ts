import { BUSINESS } from "@/data/business";

const BRAND = BUSINESS.product;
const BLUE = "#3830d0";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Mail = {
  /** Hidden preview line shown next to the subject in the inbox. */
  preheader: string;
  heading: string;
  paragraphs: string[];
  button: { label: string; href: string };
  /** Small print under the button. */
  note: string;
};

/** Table-based, inline-styled HTML so it renders the same in Gmail, Outlook and Apple Mail. */
function render(m: Mail) {
  const origin = new URL(m.button.href).origin;
  const logo = `${origin}/logo-email.png`;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(m.heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f5fa;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f3f5fa;">${esc(m.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f5fa;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">
      <tr><td style="padding:0 4px 20px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:middle;"><img src="${logo}" width="44" height="44" alt="${esc(BRAND)}" style="display:block;border:0;border-radius:10px;"></td>
          <td style="vertical-align:middle;padding-left:12px;font:700 20px/1.2 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111830;">${esc(BRAND)}</td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#ffffff;border:1px solid #e3e7f1;border-radius:16px;padding:36px 32px;font:400 16px/1.6 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111830;">
        <h1 style="margin:0 0 16px 0;font:700 24px/1.3 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#111830;">${esc(m.heading)}</h1>
        ${m.paragraphs.map((p) => `<p style="margin:0 0 16px 0;color:#3a4260;">${esc(p)}</p>`).join("\n        ")}
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr>
          <td style="background:${BLUE};border-radius:10px;"><a href="${esc(m.button.href)}" style="display:inline-block;padding:14px 28px;font:600 16px/1 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none;">${esc(m.button.label)}</a></td>
        </tr></table>
        <p style="margin:0 0 20px 0;font-size:14px;color:#6a7392;">${esc(m.note)}</p>
        <p style="margin:0;padding-top:20px;border-top:1px solid #e3e7f1;font-size:13px;line-height:1.5;color:#6a7392;">Button not working? Copy this link into your browser:<br><a href="${esc(m.button.href)}" style="color:${BLUE};word-break:break-all;">${esc(m.button.href)}</a></p>
      </td></tr>
      <tr><td style="padding:20px 8px 0 8px;font:400 12px/1.6 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#8a92ad;text-align:center;">
        ${esc(BRAND)} &middot; ${esc(BUSINESS.address)}<br>
        <a href="mailto:${esc(BUSINESS.email)}" style="color:#8a92ad;">${esc(BUSINESS.email)}</a> &middot;
        <a href="${origin}/terms" style="color:#8a92ad;">Terms</a> &middot;
        <a href="${origin}/privacy" style="color:#8a92ad;">Privacy</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
  const text = [m.heading, "", ...m.paragraphs.flatMap((p) => [p, ""]), `${m.button.label}: ${m.button.href}`, "", m.note, "", `${BRAND}, ${BUSINESS.address}`, BUSINESS.email].join("\n");
  return { html, text };
}

async function send(to: string, subject: string, mail: Mail) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[${subject} for ${to}] ${mail.button.href}`);
    return;
  }
  const { html, text } = render(mail);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

export function sendLoginEmail(to: string, link: string) {
  return send(to, `Your ${BRAND} sign-in link`, {
    preheader: "Your one-time sign-in link. It works for 15 minutes.",
    heading: `Sign in to ${BRAND}`,
    paragraphs: ["Click the button below to sign in. You don't need a password."],
    button: { label: "Sign in", href: link },
    note: "This link works once and expires in 15 minutes. If it has expired, go to the Sign in page and request a new one. If you didn't ask for this email, you can safely ignore it.",
  });
}

/** A plain invitation: just a way in. It grants nothing; the person pays like anyone else. */
export function sendInviteEmail(to: string, link: string) {
  return send(to, `You're invited to ${BRAND}`, {
    preheader: "A private space for learning Bengali with your teacher.",
    heading: `You're invited to ${BRAND}`,
    paragraphs: [
      `${BRAND} is a private space for learning Bengali, with reading, speaking, vocabulary and grammar courses built around one teacher's lessons.`,
      "Follow the button below to get started.",
    ],
    button: { label: "Get started", href: link },
    note: "You received this because someone at Bengali Practice invited you.",
  });
}

/** An optional evening nudge, sent only to students who switched reminders on and have not practised today. */
export function sendReminderEmail(to: string, link: string, streak: number) {
  return send(to, `A few minutes of Bengali today?`, {
    preheader: streak > 0 ? `Keep your ${streak}-day streak going.` : "A short session is enough.",
    heading: "A few minutes of Bengali today?",
    paragraphs: [
      streak > 0 ? `You are on a ${streak}-day streak. A short lesson, a quiz or ten flashcards keeps it going.` : "A short lesson, a quiz or ten flashcards is enough to count as a practice day.",
    ],
    button: { label: "Practise now", href: link },
    note: "You get this because you turned on reminders. You can switch them off any time on the My progress page.",
  });
}

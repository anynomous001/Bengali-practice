export async function sendLoginEmail(to: string, link: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[login link for ${to}] ${link}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Your Shikhi sign-in link",
      text: `Click to sign in (valid for 15 minutes, works once):\n\n${link}\n\nIf you didn't ask for this, ignore this email.`,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

/** A plain invitation: just the address to get started. It grants nothing; the person pays like anyone else. */
export async function sendInviteEmail(to: string, link: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[invite for ${to}] ${link}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to,
      subject: "You're invited to Shikhi",
      text: `You've been invited to Shikhi, a private space for learning Bengali with your teacher.\n\nGet started here:\n\n${link}`,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

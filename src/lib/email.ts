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
      subject: "Your Bengali Practice sign-in link",
      text: `Click to sign in (valid for 15 minutes, works once):\n\n${link}\n\nIf you didn't ask for this, ignore this email.`,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

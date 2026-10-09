# Bengali Practice

Private practice web app for my Bengali students. Next.js (App Router) + Postgres, deployed on Vercel.

## What's in it

- **Email sign-in (no passwords).** Students get a one-time link. Only emails on the student list (or in `ADMIN_EMAILS`) can sign in, and the sign-in form gives the same reply either way.
- **12-month access.** Each student has an expiry date. When it passes they can still sign in but see an "access ended" page. Revoking or removing a student takes effect immediately.
- **Admin page** at `/admin` (admins only): add students, grant/extend 12 months, revoke, remove.
- **Three segments**, each with its own activities and progress:
  - **Reading**: alphabet (learn + letter→word and word→letter quizzes), recognition flashcards.
  - **Speaking**: letter sounds with a listening quiz, "say it aloud" flashcards (audio plays on flip).
  - **Writing**: trace letters on a canvas, build words from pieces, "write it down" flashcards.
- **Flashcards** use Leitner spaced repetition (1, 3, 7, 14, 30 days). New decks are added in `src/data/decks.ts`; new activities are listed per segment in `src/data/segments.ts`.
- **Numbers & money** (reading quiz, listening quiz, flashcards) and **Build the sentence** use the lists in `src/data/numbers.ts` and `src/data/sentences.ts`. Sentences are placeholders; swap in your own.
- Conversations, directions, role-play and reading passages are not built yet.

## Setup

1. Create a Postgres database (Neon, Supabase or Vercel Marketplace) and copy its connection string.
2. Create a [Resend](https://resend.com) account, verify a sending domain and make an API key.
3. In Vercel → Project → Settings → Environment Variables, set everything in `.env.example`:
   `DATABASE_URL`, `AUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_EMAILS`, `APP_URL`, `RESEND_API_KEY`, `EMAIL_FROM`.
4. Redeploy. Tables are created automatically on first use.
5. Sign in with your admin email, open `/admin`, and add students.

Without `RESEND_API_KEY`, sign-in links are printed to the server log instead of emailed, which is handy locally.

## Online payment (Razorpay)

Students can buy 12 months of access at `/buy` ($40 by default, set `PRICE_USD`). The server creates a USD order, the student pays in Razorpay Checkout, and the server then confirms the payment with Razorpay before granting access (and emails a sign-in link). Buying again before expiry adds another 12 months. Each order grants access once, even if Checkout and the webhook both report it.

Setup:
1. In the Razorpay dashboard, request **International Payments** so USD cards work, and use **Test mode** keys first.
2. Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` and `PRICE_USD` in Vercel.
3. Add a webhook: Settings → Webhooks → URL `https://<your-site>/api/razorpay/webhook`, events **payment.captured** and **refund.processed**, and a secret of your choice. Put the same secret in `RAZORPAY_WEBHOOK_SECRET`. This is the backup that grants access if a student closes the tab right after paying.
4. Pay once yourself in test mode, then check the payment shows under "Recent online payments" in `/admin`, before switching to live keys.

Razorpay settles to your bank in rupees. Fees and conversion are shown in your dashboard.

## How access is protected

- Only enrolled emails (added by you or created by a verified payment) can sign in; sign-in links are single-use and expire in 15 minutes.
- **Every lesson page checks access itself** (`requireAccess()` in `src/lib/access.ts`), not just the layout, because layouts are skipped on client-side navigation. Access is read from the database on each request, so expiring, revoking or removing a student takes effect on their next click.
- **Lesson content is never in the public JavaScript.** Pages pass it to the interactive components as props after the access check. When you add new content (dialogues, vocabulary, audio), keep it in server code and send it the same way. Do not import content files from `"use client"` components, and serve audio from a route that calls `requireAccess()`, not from `/public`.
- Server actions (saving progress, flashcards) re-check access. `/admin` and its actions are admin-only.
- A full refund (`refund.processed`) takes the 12 months back. Partial refunds and disputes are not handled automatically; use `/admin` to revoke.
- Session cookie is `__Host-` prefixed, HttpOnly, Secure, SameSite=Lax. Security headers are set in `next.config.ts`.

Known limits: a paying student can still share their login or copy what is on their screen, and sign-in is not limited to one device.

## Local development

```
npm install
cp .env.example .env.local   # fill in
npm run dev
```

## Planned

Audio recordings and the remaining modules.

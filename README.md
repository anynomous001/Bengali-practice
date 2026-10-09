# Bengali Practice

Private practice web app for my Bengali students. Next.js (App Router) + Postgres, deployed on Vercel.

## What's in it

- **Email sign-in (no passwords).** Students get a one-time link. Only emails on the student list (or in `ADMIN_EMAILS`) can sign in, and the sign-in form gives the same reply either way.
- **12-month access.** Each student has an expiry date. When it passes they can still sign in but see an "access ended" page. Revoking or removing a student takes effect immediately.
- **Admin page** at `/admin` (admins only): add students, grant/extend 12 months, revoke, remove.
- **Alphabet module**: learn, three quiz types, per-student progress saved in the database.
- Other modules (pronunciation, conversations, numbers, directions, role-play) are placeholders.

## Setup

1. Create a Postgres database (Neon, Supabase or Vercel Marketplace) and copy its connection string.
2. Create a [Resend](https://resend.com) account, verify a sending domain and make an API key.
3. In Vercel → Project → Settings → Environment Variables, set everything in `.env.example`:
   `DATABASE_URL`, `AUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_EMAILS`, `APP_URL`, `RESEND_API_KEY`, `EMAIL_FROM`.
4. Redeploy. Tables are created automatically on first use.
5. Sign in with your admin email, open `/admin`, and add students.

Without `RESEND_API_KEY`, sign-in links are printed to the server log instead of emailed, which is handy locally.

## Local development

```
npm install
cp .env.example .env.local   # fill in
npm run dev
```

## Planned

Razorpay checkout ($40 / 12 months, USD) that grants access automatically, audio recordings, and the remaining modules.

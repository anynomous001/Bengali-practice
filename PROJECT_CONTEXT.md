# Bengali Practice: full project context

Last updated: 15 Oct 2026. Written so the whole thing can be pasted into a new chat or handed to another developer. No secrets are included; only the names of environment variables.

---

## 1. What this is

A private Bengali-learning web app for the students of one teacher in Kolkata. Most students live in the USA. The brand is **Bengali Practice** (wordmark "বাংলা PRACTICE"). Tagline: "Learn Bengali with your teacher". The logo is a white sprout growing out of a speech bubble on an indigo rounded square (`public/logo.png`, tab icon `src/app/icon.png`, `src/app/apple-icon.png`, email logo `public/logo-email.png`). The owner has registered this name with other services, so it stays.

- Live site: https://bengali-practice.gencore.co.in/
- Repo: `anynomous001/Bengali-practice` (GitHub). I develop on branch `claude/grammar-deep` and push to `main` only when the owner says "push it to main" (`git push origin claude/grammar-deep:main`). Vercel deploys from main.
- Stack: Next.js 16 (App Router), React 19, TypeScript, plain CSS (`src/app/globals.css`), deployed on Vercel.
- Access model: **paid, email-allowlisted**. 12 months of access for **$50** (or the rupee equivalent for Indian visitors). Lesson content stays on the server and is only sent to signed-in people with access.
- Four courses: **Reading, Speaking, Vocabulary, Grammar**.

## 2. People and accounts

- Owner/admin: the site owner signs in as `chakrobortypritam.work@gmail.com` (the only admin, via `ADMIN_EMAILS`).
- The Razorpay account email is `chakrobortypritam1@gmail.com`.
- Teacher: lives in Kolkata, writes the lessons. All Bengali I authored still needs the teacher's review.
- Business details (name, address, contact) live in `src/data/business.ts` and are shown on the policy pages.

## 3. How sign-in and access work

- **No passwords.** Magic-link sign-in: the user enters their email on `/login`, and if allowed, gets a one-time link valid 15 minutes (`/login/verify?token=...`). Clicking the button on that page starts a session (JWT cookie, signed with `AUTH_SECRET`).
- **Who may sign in** (`canSignIn` in `src/lib/auth.ts`): anyone in `ADMIN_EMAILS`, or anyone in the `students` table (even if their access expired).
- **Who has access** to lessons: admins, and students whose `access_expires_at` is in the future. Expired students see the "access ended" page and can renew.
- The login form always answers "If this email is enrolled, a sign-in link is on its way", whether or not the email is enrolled, so nobody can probe the list. Limit: 5 links per email per 10 minutes.
- **Email** is sent through **Resend** (`src/lib/email.ts`): branded HTML emails (logo, business name, button, footer with address and contact) with a plain-text fallback. With no `RESEND_API_KEY`, the link is only written to the server log. The sending domain `mail.gencore.co.in` is **verified** in Resend; `EMAIL_FROM` must be `Bengali Practice <login@mail.gencore.co.in>` (a wrong domain was the cause of an earlier failure).
- **Post-payment email:** right after a payment is confirmed, the app also emails a sign-in link to the buyer (`/api/checkout/verify`). Tested live; it can take a few minutes to arrive on a new sending domain.
- **Admin page** `/admin`: shows a 404 unless signed in as admin. Add or remove students, grant 12 months, revoke access, and see the last 20 paid orders.

## 4. Payments (Razorpay)

- Razorpay Standard Checkout. Cards in USD for international buyers; **UPI, cards and netbanking in INR** for Indian visitors.
- **Region-based currency:** the visitor's country comes from the `x-vercel-ip-country` header. India shows rupees, everyone else dollars, and either can switch with a link on the buy form.
- **Pricing** (`src/lib/pricing.ts`): `PRICE_USD` (target $50). The rupee price is the USD price times the live exchange rate (api.frankfurter.dev, cached 6 hours, falls back to `USD_INR_RATE`, default 90), rounded to the nearest ₹10. Do **not** set `PRICE_INR` unless you want a fixed rupee price. The live rate lookup has not been verified from the dev sandbox (host not allowed there).
- **Flow:** `/buy` form (email entered twice) → `POST /api/checkout/order` creates the Razorpay order and an `orders` row (amount, currency) → Razorpay checkout → `POST /api/checkout/verify` (HMAC-SHA256 signature check) → `fulfillOrder`.
- **`fulfillOrder`** (in `src/lib/razorpay.ts`) is idempotent: checks the payment with Razorpay, captures it if only authorized, flips the order `created → paid` exactly once, and adds/extends the student by 12 months.
- **Webhook** `POST /api/razorpay/webhook` (signature checked with `RAZORPAY_WEBHOOK_SECRET`): handles `payment.captured` (grants access even if the buyer closed the page) and `refund.processed` (a full refund revokes access). Events to subscribe: `payment.captured`, `refund.processed` only.
- **Status:** Razorpay is now in **Live mode** with live keys in Vercel. A live test payment succeeded and granted access (verified in the database). Refund and webhook delivery have not been confirmed yet.
- **Environment variables (Vercel, Production):** `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `PRICE_USD`, `APP_URL`, `ADMIN_EMAILS`, `AUTH_SECRET`, `DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`. Changed variables only take effect after a redeploy.
- `PRICE_USD` is set to `50`.

## 5. Data and infrastructure

- **Database:** Postgres on **Neon** (pooled `DATABASE_URL`). Locally the app uses PGlite (an in-process database) when `DATABASE_URL` is empty. On Vercel it uses a `pg` Pool with `attachDatabasePool`. The schema is created automatically in `src/lib/db.ts`.
- **Tables:** `students`, `login_tokens`, `progress`, `story_progress`, `grammar_progress`, `lesson_progress`, `exam_attempts`, `orders`, `writing_practice`, `flashcards`.
- **Object storage:** Neon Object Storage (S3-compatible, bucket `assets`, `AWS_*` variables) used by `/api/recordings` (upload a recording up to 5 MB, list, play back; owner only; folder = first 24 hex of sha256 of the email). The backend exists and was tested locally, but there is **no recording UI** yet, and `AWS_*` variables may not be set in Vercel.
- **Neon config:** `neon.ts`, CLI `neon init / deploy / config plan`. Project id `wild-star-72988088`, branch `production`.
- Policy pages: `/terms`, `/privacy`, `/refunds`, `/contact` (real business details). Refund window of 7 days is a guess that needs the owner's decision.

## 6. The courses and what exists

### Reading
Alphabet and reading lessons with letters, practice and tracked progress (`progress` table).

### Vocabulary
Vocabulary lessons, flashcards, and a timed vocabulary exam.

### Grammar (13 topics)
- Rewritten in depth. 12 earlier topics became 13 after adding **Bochon (বচন, number) and Ling (লিঙ্গ, gender)**, including a board-summary section from class. The tense workout was merged into the Tenses topic.
- Content is generated by Python scripts in `content-drafts/gram/*.py` and `build_grammar.py`, which write `src/data/grammar.ts`.
- **Quick translation** drill (`TranslationDrill.tsx`, `src/lib/translation.ts`).
- **Timed exams** for grammar, vocabulary and listening (`src/data/exams.ts`, `src/lib/examgen.ts`, `ExamRunner.tsx`); attempts are stored in `exam_attempts`.
- **Class exercise sets** (7 sets in `src/data/classwork.ts`, route `grammar/class/[set]`), built from the teacher's worksheets (Exercise E/F, mixed tenses, translation, transformation, combination). Each question can be marked "I got it right" or "I missed it".

### Speaking
- **Role plays** (8 scenarios in `src/data/roleplay.ts`): shop bargaining, doctor, phone call, hotel booking, train booking, and others, with useful phrases and demo dialogues showing it going well and badly.
- **Impromptu topics** (`src/data/impromptu.ts`): casual, professional and ambiguous topics with prep and speaking timers.
- **Story relay** (`src/data/story-relay.ts`): each turn is 2 to 3 sentences; Option A free, Option B guided by tenses.
- Ideas proposed but **not built**: record-and-play-back UI, audio clips for role plays and phrases (the `npm run audio` script does not include the new lines), shadowing, pronunciation pairs, a speaking exam.

## 7. Design and front end

- Docs-style lesson layout with underline tabs and a stepper (replaced the old tab bars).
- **Phosphor icon overhaul** (`src/app/learn/Icon.tsx`) after the owner said the old icons and arrows looked AI-generated and wanted a "real premium website" feel.
- Light and dark themes (cookie `bp_theme`, else follows the system), custom radio buttons, mobile bottom tab bar, `Logo` component (`src/app/Logo.tsx`) and `src/app/icon.png` for the browser tab.
- Fonts: Plus Jakarta Sans (UI), Noto Sans/Serif Bengali (loaded from Google Fonts).

## 8. Testing approach used so far

- Playwright (playwright-core, Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) with a saved login state, screenshots at desktop and phone widths.
- Live payment test in test mode (test Visa) passed, with database writes checked on Neon; later a real live test payment.
- Sandbox notes: outbound network needs an allowlist (Razorpay, Neon, Resend hosts were added by the owner; `api.frankfurter.dev` was not). Don't kill processes with `pkill -f`; don't delete `.next` under a running dev server.

## 9. Open items / next steps

1. Refund the live test payment and check that the refund removes access (tests the refund webhook).
2. Confirm the live webhook shows successful deliveries in Razorpay; secret in Razorpay must match `RAZORPAY_WEBHOOK_SECRET` in Vercel.
3. **Rotate secrets that were pasted into chats:** Razorpay live and test key secrets, webhook secret, Neon API key, Neon database password, Resend key.
4. Confirm UPI is enabled in Razorpay (Payment Methods) and International Cards is enabled.
5. Watch the delay on the post-payment sign-in email (arrived after a few minutes); check Resend → Emails for send time.
6. Teacher must review all authored Bengali (grammar, class exercise answers including a question about "bhali", role plays, impromptu, story relay). Decide the refund window.
7. Optional: `AWS_*` variables and a recording UI; audio for role plays; PayPal; an Apple touch icon (PNG); rebuild the outdated grammar review markdown renderer (`render_grammar_md.py`).

## 10. How the owner likes to work

- Works step by step, says "push it to main" after each feature; does not want a pull request unless asked.
- Wants things done for them where possible; things needing their accounts (Vercel, Razorpay, Resend, Neon dashboards) are explained as short numbered steps.
- Prefers plain answers about what is verified and what is not.

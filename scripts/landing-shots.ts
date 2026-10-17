/**
 * Captures real screenshots of the app for the landing page ("What you'll do here"). Development only.
 *
 *   npm run shots
 *
 * It starts the app locally with the embedded database (empty DATABASE_URL), makes a demo student in that local
 * database, signs in with a one-time token written straight into it, adds a little progress, and saves 1440 and 390
 * wide light-theme WebP files in public/landing/shots/. Nothing here talks to the real database.
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = join(ROOT, "public/landing/shots");
const PORT = 3141;
const BASE = `http://localhost:${PORT}`;
const EMAIL = "demo.student@local.test";
const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

/** Child mode: write the demo student, their progress and a login token into the local database, print the token. */
async function seed() {
  const { query } = await import("../src/lib/db");
  const { createLoginToken } = await import("../src/lib/auth");
  for (const t of ["activity", "lesson_progress", "student_settings", "milestones", "flashcards", "login_tokens", "students"]) {
    await query(`DELETE FROM ${t} WHERE email = $1`, [EMAIL]);
  }
  await query("INSERT INTO students (email, note, access_expires_at) VALUES ($1, 'demo for screenshots', now() + interval '12 months')", [EMAIL]);
  const days = [0, 1, 2, 3, 4, 5];
  for (const d of days) {
    const day = new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
    // today only has a few flashcards, so the goal ring is part way round; earlier days have a lesson too
    if (d > 0) await query("INSERT INTO activity (email, day, kind, ref, points) VALUES ($1, $2, 'lesson', $3, 20)", [EMAIL, day, `demo-${d}`]);
    await query("INSERT INTO activity (email, day, kind, ref, points) VALUES ($1, $2, 'flash', $3, 12)", [EMAIL, day, `demo-f${d}`]);
  }
  for (const id of ["reading/alphabet", "reading/matras", "vocabulary/people", "grammar/purush"]) {
    await query("INSERT INTO lesson_progress (email, lesson_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [EMAIL, id]);
  }
  await query("INSERT INTO student_settings (email, tz, daily_goal, display_name) VALUES ($1, 'America/New_York', 80, 'Demo') ON CONFLICT (email) DO NOTHING", [EMAIL]);
  const token = await createLoginToken(EMAIL);
  console.log("TOKEN:" + token);
  process.exit(0);
}

async function waitFor(url: string, ms = 90000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { if ((await fetch(url)).status < 500) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 700));
  }
  throw new Error("The app did not start");
}

async function main() {
  // 1. seed in a child process, so its database lock is released before the app starts
  const env = { ...process.env, DATABASE_URL: "", ADMIN_EMAILS: "", RESEND_API_KEY: "", NODE_ENV: "development" } as NodeJS.ProcessEnv;
  const seeded = spawnSync("npx", ["tsx", "scripts/landing-shots.ts", "--seed"], { cwd: ROOT, env, encoding: "utf8" });
  const token = seeded.stdout.match(/TOKEN:(\S+)/)?.[1];
  if (!token) throw new Error("Could not seed the local database:\n" + seeded.stdout + seeded.stderr);

  // 2. start the app
  const server = spawn("npx", ["next", "dev", "-p", String(PORT)], { cwd: ROOT, env, stdio: "ignore", detached: true });
  try {
    await waitFor(BASE + "/login");
    rmSync(OUT, { recursive: true, force: true });
    mkdirSync(OUT, { recursive: true });
    const browser = await chromium.launch({ executablePath: CHROME });
    let session: Awaited<ReturnType<import("playwright-core").BrowserContext["storageState"]>> | undefined;
    for (const [label, width, height] of [["1440", 1440, 900], ["390", 390, 844]] as const) {
      const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: "light", deviceScaleFactor: label === "390" ? 2 : 1, storageState: session });
      await ctx.addCookies([{ name: "bp_theme", value: "light", url: BASE }]);
      const page = await ctx.newPage();
      if (!session) {
        // the sign-in token works once, so sign in the first time and reuse that session for the second width
        await page.goto(`${BASE}/login/verify?token=${encodeURIComponent(token!)}`);
        await page.click("button.btn");
        await page.waitForURL("**/learn**");
        session = await ctx.storageState();
      }
      const shot = async (name: string, prep?: () => Promise<void>) => {
        await page.waitForTimeout(1200);
        if (prep) await prep();
        await page.waitForTimeout(600);
        const png = await page.screenshot();
        await sharp(png).webp({ quality: 82 }).toFile(join(OUT, `${name}-${label}.webp`));
        console.log("saved", `${name}-${label}.webp`);
      };
      await page.goto(`${BASE}/learn`);
      await shot("home");
      await page.goto(`${BASE}/learn/vocabulary/flashcards`);
      await page.locator("a.card").first().click();
      await page.waitForURL("**deck=**");
      await shot("flashcard");
      await page.goto(`${BASE}/learn/speaking/roleplay/shop`);
      await shot("roleplay");
      await page.goto(`${BASE}/learn/grammar/purush`);
      await shot("grammar", async () => { await page.evaluate(() => document.getElementById("sec-practice")?.scrollIntoView()); });
      await page.goto(`${BASE}/learn/grammar/exam`);
      await shot("exam", async () => { await page.getByRole("button", { name: /start the exam/i }).click({ timeout: 5000 }).catch(() => undefined); await page.waitForTimeout(1500); });
      await ctx.close();
    }
    await browser.close();
  } finally {
    // stop the whole process group, so no dev server is left running holding the local database
    try { process.kill(-server.pid!, "SIGTERM"); } catch { server.kill("SIGTERM"); }
  }
}

(process.argv.includes("--seed") ? seed() : main()).catch((e) => { console.error(e); process.exit(1); });

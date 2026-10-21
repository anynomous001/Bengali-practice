import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// Zero-config local mode: with no DATABASE_URL, `npm run dev` stores data in ./.local-db (embedded Postgres).
// Never used in production builds.
const LOCAL = !process.env.DATABASE_URL && process.env.NODE_ENV !== "production";

type Local = { query: (t: string, p?: unknown[]) => Promise<{ rows: unknown[] }>; exec: (t: string) => Promise<unknown> };
const globalForPool = globalThis as unknown as { pool?: Pool; local?: Promise<Local>; schema?: Promise<void>; schemaSql?: string };

function pool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!globalForPool.pool) {
    // Pooled Neon connection string (-pooler host): right for serverless web traffic. On Vercel, attachDatabasePool
    // lets Fluid compute close idle connections cleanly before the function is suspended.
    globalForPool.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      ssl: process.env.DATABASE_URL.includes("localhost") ? undefined : { rejectUnauthorized: false },
    });
    if (process.env.VERCEL) attachDatabasePool(globalForPool.pool);
  }
  return globalForPool.pool;
}

function local(): Promise<Local> {
  return (globalForPool.local ??= import("@electric-sql/pglite").then(async ({ PGlite }) => {
    console.log("[local mode] no DATABASE_URL set: using embedded database in ./.local-db");
    const db = new PGlite("./.local-db");
    await db.waitReady;
    return db as unknown as Local;
  }));
}

const SCHEMA = `
    CREATE TABLE IF NOT EXISTS students (
      email text PRIMARY KEY,
      access_expires_at timestamptz,
      note text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS login_tokens (
      token_hash text PRIMARY KEY,
      email text NOT NULL,
      expires_at timestamptz NOT NULL,
      used_at timestamptz,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS progress (
      email text NOT NULL,
      letter text NOT NULL,
      right_count int NOT NULL DEFAULT 0,
      wrong_count int NOT NULL DEFAULT 0,
      PRIMARY KEY (email, letter)
    );
    CREATE TABLE IF NOT EXISTS story_progress (
      email text NOT NULL,
      story_id text NOT NULL,
      best_score int NOT NULL DEFAULT 0,
      total int NOT NULL DEFAULT 0,
      attempts int NOT NULL DEFAULT 0,
      updated_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (email, story_id)
    );
    CREATE TABLE IF NOT EXISTS grammar_progress (
      email text NOT NULL,
      topic_id text NOT NULL,
      best_score int NOT NULL DEFAULT 0,
      total int NOT NULL DEFAULT 0,
      attempts int NOT NULL DEFAULT 0,
      updated_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (email, topic_id)
    );
    CREATE TABLE IF NOT EXISTS lesson_progress (
      email text NOT NULL,
      lesson_id text NOT NULL,
      completed_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (email, lesson_id)
    );
    UPDATE lesson_progress SET lesson_id = 'vocabulary/' || substr(lesson_id, 16) WHERE lesson_id LIKE 'speaking/vocab-%';
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id text PRIMARY KEY,
      email text NOT NULL,
      exam_id text NOT NULL,
      started_at timestamptz NOT NULL DEFAULT now(),
      deadline timestamptz NOT NULL,
      questions text NOT NULL,
      answers text,
      finished_at timestamptz,
      score int,
      total int
    );
    CREATE TABLE IF NOT EXISTS orders (
      order_id text PRIMARY KEY,
      email text NOT NULL,
      amount int NOT NULL,
      currency text NOT NULL,
      status text NOT NULL DEFAULT 'created',
      payment_id text,
      created_at timestamptz NOT NULL DEFAULT now(),
      paid_at timestamptz
    );
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS ref_code text;
    ALTER TABLE students ADD COLUMN IF NOT EXISTS ref_code text;
    CREATE UNIQUE INDEX IF NOT EXISTS students_ref_code ON students (ref_code);
    CREATE TABLE IF NOT EXISTS referrals (
      referee_email text PRIMARY KEY,
      referrer_email text NOT NULL,
      order_id text NOT NULL,
      reversed boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS writing_practice (
      email text NOT NULL,
      item text NOT NULL,
      count int NOT NULL DEFAULT 0,
      PRIMARY KEY (email, item)
    );
    CREATE TABLE IF NOT EXISTS activity (
      id bigserial PRIMARY KEY,
      email text NOT NULL,
      day text NOT NULL,
      kind text NOT NULL,
      ref text NOT NULL DEFAULT '',
      points int NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS activity_email_day ON activity (email, day);
    CREATE TABLE IF NOT EXISTS student_settings (
      email text PRIMARY KEY,
      tz text,
      daily_goal int NOT NULL DEFAULT 40,
      display_name text,
      remind boolean NOT NULL DEFAULT false,
      last_reminded text
    );
    ALTER TABLE student_settings ADD COLUMN IF NOT EXISTS show_board boolean NOT NULL DEFAULT true;
    CREATE TABLE IF NOT EXISTS app_flags (
      key text PRIMARY KEY,
      value text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS milestones (
      email text NOT NULL,
      key text NOT NULL,
      earned_at timestamptz NOT NULL DEFAULT now(),
      seen boolean NOT NULL DEFAULT false,
      PRIMARY KEY (email, key)
    );
    CREATE TABLE IF NOT EXISTS feedback (
      id bigserial PRIMARY KEY,
      email text NOT NULL,
      area text NOT NULL,
      ref text NOT NULL DEFAULT '',
      topic text NOT NULL,
      message text NOT NULL DEFAULT '',
      resolved boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS reviews (
      email text PRIMARY KEY,
      rating int NOT NULL,
      comment text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS student_path (
      email text PRIMARY KEY,
      goal text NOT NULL,
      reads text NOT NULL DEFAULT 'no',
      updated_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS flashcards (
      email text NOT NULL,
      card_id text NOT NULL,
      box int NOT NULL DEFAULT 0,
      due_at timestamptz NOT NULL DEFAULT now(),
      reviews int NOT NULL DEFAULT 0,
      PRIMARY KEY (email, card_id)
    );
  `;

async function ensureSchema() {
  if (LOCAL) await (await local()).exec(SCHEMA);
  else await pool().query(SCHEMA);
}

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  // Retry the schema setup on the next call if it failed (e.g. DB briefly unreachable).
  // Re-run when the schema text changes (a hot-reloaded dev server would otherwise keep a stale, older run).
  if (globalForPool.schemaSql !== SCHEMA) {
    globalForPool.schemaSql = SCHEMA;
    globalForPool.schema = undefined;
  }
  globalForPool.schema ??= ensureSchema().catch((e) => {
    globalForPool.schema = undefined;
    throw e;
  });
  await globalForPool.schema;
  if (LOCAL) return (await (await local()).query(text, params)).rows as T[];
  return (await pool().query(text, params)).rows as T[];
}

import { Pool } from "pg";

// Zero-config local mode: with no DATABASE_URL, `npm run dev` stores data in ./.local-db (embedded Postgres).
// Never used in production builds.
const LOCAL = !process.env.DATABASE_URL && process.env.NODE_ENV !== "production";

type Local = { query: (t: string, p?: unknown[]) => Promise<{ rows: unknown[] }>; exec: (t: string) => Promise<unknown> };
const globalForPool = globalThis as unknown as { pool?: Pool; local?: Promise<Local>; schema?: Promise<void> };

function pool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  return (globalForPool.pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    ssl: process.env.DATABASE_URL.includes("localhost") ? undefined : { rejectUnauthorized: false },
  }));
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
    CREATE TABLE IF NOT EXISTS writing_practice (
      email text NOT NULL,
      item text NOT NULL,
      count int NOT NULL DEFAULT 0,
      PRIMARY KEY (email, item)
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
  globalForPool.schema ??= ensureSchema().catch((e) => {
    globalForPool.schema = undefined;
    throw e;
  });
  await globalForPool.schema;
  if (LOCAL) return (await (await local()).query(text, params)).rows as T[];
  return (await pool().query(text, params)).rows as T[];
}

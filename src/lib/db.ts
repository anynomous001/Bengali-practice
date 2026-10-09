import { Pool } from "pg";

const globalForPool = globalThis as unknown as { pool?: Pool; schema?: Promise<void> };

function pool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  return (globalForPool.pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    ssl: process.env.DATABASE_URL.includes("localhost") ? undefined : { rejectUnauthorized: false },
  }));
}

async function ensureSchema() {
  await pool().query(`
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
  `);
}

export async function query<T extends object = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const p = pool();
  // Retry the schema setup on the next call if it failed (e.g. DB briefly unreachable).
  globalForPool.schema ??= ensureSchema().catch((e) => {
    globalForPool.schema = undefined;
    throw e;
  });
  await globalForPool.schema;
  return (await p.query(text, params)).rows as T[];
}

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes } from "node:crypto";
import { query } from "./db";

// __Host- makes browsers refuse the cookie unless it is Secure, path=/ and has no Domain.
const COOKIE = process.env.NODE_ENV === "production" ? "__Host-bp_session" : "bp_session";
const SESSION_DAYS = 30;
const TOKEN_MINUTES = 15;

export const normalizeEmail = (s: string) => s.trim().toLowerCase();

const isEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const validEmail = isEmail;

// In local development only, a built-in admin lets you sign in with no .env file.
const DEV = process.env.NODE_ENV !== "production";
export const DEV_ADMIN = "admin@local.test";

export function isAdminEmail(email: string) {
  return (process.env.ADMIN_EMAILS ?? (DEV ? DEV_ADMIN : ""))
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean)
    .includes(email);
}

function secret() {
  const s = process.env.AUTH_SECRET ?? (DEV ? "local-development-secret-do-not-use-in-production" : undefined);
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ chars): openssl rand -base64 32");
  return new TextEncoder().encode(s);
}

const hash = (t: string) => createHash("sha256").update(t).digest("hex");

type StudentRow = { email: string; access_expires_at: Date | null };

/** Who may sign in: admins, and anyone on the student list (even if their access has expired). */
export async function canSignIn(email: string): Promise<boolean> {
  if (isAdminEmail(email)) return true;
  const rows = await query<StudentRow>("SELECT email FROM students WHERE email = $1", [email]);
  return rows.length > 0;
}

/** Returns the raw token to email, or null if rate limited. */
export async function createLoginToken(email: string): Promise<string | null> {
  const recent = await query<{ n: string }>(
    "SELECT count(*) AS n FROM login_tokens WHERE email = $1 AND created_at > now() - interval '10 minutes'",
    [email],
  );
  if (Number(recent[0].n) >= 5) return null;
  const token = randomBytes(32).toString("base64url");
  await query(
    "INSERT INTO login_tokens (token_hash, email, expires_at) VALUES ($1, $2, now() + $3 * interval '1 minute')",
    [hash(token), email, TOKEN_MINUTES],
  );
  return token;
}

/** Consumes a token (single use). Returns the email on success. */
export async function consumeLoginToken(token: string): Promise<string | null> {
  const rows = await query<{ email: string }>(
    `UPDATE login_tokens SET used_at = now()
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()
     RETURNING email`,
    [hash(token)],
  );
  const email = rows[0]?.email;
  return email && (await canSignIn(email)) ? email : null;
}

export async function startSession(email: string) {
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
  (await cookies()).set(COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export type User = { email: string; isAdmin: boolean; hasAccess: boolean; expiresAt: Date | null };

/** Current user, re-checked against the database on every call so revocation is immediate. */
export async function getUser(): Promise<User | null> {
  const jwt = (await cookies()).get(COOKIE)?.value;
  if (!jwt) return null;
  let email: string;
  try {
    const { payload } = await jwtVerify(jwt, secret(), { algorithms: ["HS256"] });
    email = payload.sub ?? "";
  } catch {
    return null;
  }
  const isAdmin = isAdminEmail(email);
  const rows = await query<StudentRow>(
    "SELECT email, access_expires_at FROM students WHERE email = $1",
    [email],
  );
  if (!rows.length && !isAdmin) return null;
  const expiresAt = rows[0]?.access_expires_at ?? null;
  return {
    email,
    isAdmin,
    expiresAt,
    hasAccess: isAdmin || (!!expiresAt && expiresAt.getTime() > Date.now()),
  };
}

import { SignJWT, jwtVerify } from "jose";

// A signed link that lets one student stop update emails without signing in. It carries only their email address.
const DEV = process.env.NODE_ENV !== "production";
function secret() {
  const s = process.env.AUTH_SECRET ?? (DEV ? "local-development-secret-do-not-use-in-production" : undefined);
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ chars)");
  return new TextEncoder().encode(s);
}

export async function unsubscribeToken(email: string): Promise<string> {
  return new SignJWT({ purpose: "news" }).setProtectedHeader({ alg: "HS256" }).setSubject(email).sign(secret());
}

/** The email address in a valid token, or null. */
export async function emailFromUnsubscribeToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    return payload.purpose === "news" && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// The home page is built once and served from the CDN, so it cannot look at who is signed in. This runs before it and sends
// anyone with a valid session straight to the app. (The app re-checks the session against the database as before.)
const COOKIE = process.env.NODE_ENV === "production" ? "__Host-bp_session" : "bp_session";
const DEV_SECRET = "local-development-secret-do-not-use-in-production";

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get(COOKIE)?.value;
  if (jwt) {
    const secret = process.env.AUTH_SECRET ?? (process.env.NODE_ENV !== "production" ? DEV_SECRET : "");
    if (secret.length >= 32) {
      try {
        await jwtVerify(jwt, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
        return NextResponse.redirect(new URL("/learn", request.url));
      } catch { /* expired or invalid: show the home page */ }
    }
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };

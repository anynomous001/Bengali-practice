import { headers } from "next/headers";

/** Public site URL for links in emails. Locally it follows the address you are actually using. */
export async function appBase(): Promise<string> {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  if (process.env.NODE_ENV !== "production") {
    const host = (await headers()).get("host");
    if (host) return `http://${host}`;
  }
  return "http://localhost:3000";
}

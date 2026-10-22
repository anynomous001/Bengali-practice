import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { PUBLIC_PAGES } from "@/lib/pages";

export const dynamic = "force-dynamic";

/**
 * Called once a day by Vercel Cron (see vercel.json) with `Authorization: Bearer $CRON_SECRET`. It tells IndexNow about public
 * pages whose date in src/lib/pages.ts is within the last three days, so a content change is announced to Bing automatically.
 * Add `?all=1` to announce every page, for example the first time.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const all = new URL(req.url).searchParams.get("all") === "1";
  const cutoff = Date.now() - 3 * 86400_000;
  const paths = PUBLIC_PAGES.filter((p) => all || new Date(p.updated).getTime() >= cutoff).map((p) => p.path);
  if (!paths.length) return NextResponse.json({ skipped: "no recently changed pages" });
  try {
    return NextResponse.json(await submitToIndexNow(paths));
  } catch (e) {
    console.error("indexnow failed", e);
    return NextResponse.json({ error: "IndexNow request failed" }, { status: 502 });
  }
}

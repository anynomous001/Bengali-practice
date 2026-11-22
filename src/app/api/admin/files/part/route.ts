import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { CHUNK_BYTES } from "@/lib/lesson-files";
import { fileStoreReady, purgeStaleUploads, putObject } from "@/lib/storage";

/** Teacher only: one piece of an upload (raw bytes). The pieces are put together by the finish call. */
export async function POST(req: Request) {
  const user = await getUser();
  if (!user?.isAdmin) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  if (!fileStoreReady()) return NextResponse.json({ error: "File storage isn't set up." }, { status: 503 });
  const url = new URL(req.url);
  const upload = url.searchParams.get("upload") ?? "";
  const n = Number(url.searchParams.get("n"));
  if (!/^[0-9a-f-]{36}$/.test(upload) || !Number.isInteger(n) || n < 0 || n > 20) return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const bytes = new Uint8Array(await req.arrayBuffer());
  if (!bytes.length || bytes.length > CHUNK_BYTES + 1024) return NextResponse.json({ error: "Bad piece size." }, { status: 413 });
  if (n === 0) await purgeStaleUploads().catch(() => undefined);
  await putObject(`files/tmp/${upload}/${String(n).padStart(3, "0")}`, bytes, "application/octet-stream");
  return NextResponse.json({ ok: true });
}

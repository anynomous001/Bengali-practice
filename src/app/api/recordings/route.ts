import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { listObjects, ownerFolder, putObject, storageConfigured } from "@/lib/storage";

const MAX_BYTES = 5 * 1024 * 1024; // a few minutes of speech
const TYPES: Record<string, string> = { "audio/webm": "webm", "audio/ogg": "ogg", "audio/mp4": "m4a", "audio/mpeg": "mp3", "audio/wav": "wav" };

/** Save one speaking recording for the signed-in student. The body is the raw audio. */
export async function POST(req: Request) {
  const user = await getUser();
  if (!user?.hasAccess) return NextResponse.json({ error: "Sign in to save recordings." }, { status: 401 });
  if (!storageConfigured()) return NextResponse.json({ error: "Recording storage isn't set up." }, { status: 503 });
  const type = (req.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  const ext = TYPES[type];
  if (!ext) return NextResponse.json({ error: "Unsupported audio type." }, { status: 415 });
  const bytes = new Uint8Array(await req.arrayBuffer());
  if (!bytes.length) return NextResponse.json({ error: "Empty recording." }, { status: 400 });
  if (bytes.length > MAX_BYTES) return NextResponse.json({ error: "Recording is too long." }, { status: 413 });
  const id = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  await putObject(`recordings/${ownerFolder(user.email)}/${id}`, bytes, type);
  return NextResponse.json({ id, size: bytes.length });
}

/** The signed-in student's own recordings, newest first. */
export async function GET() {
  const user = await getUser();
  if (!user?.hasAccess) return NextResponse.json({ error: "Sign in to see recordings." }, { status: 401 });
  if (!storageConfigured()) return NextResponse.json({ error: "Recording storage isn't set up." }, { status: 503 });
  const prefix = `recordings/${ownerFolder(user.email)}/`;
  const items = (await listObjects(prefix)).map((o) => ({ id: o.key.slice(prefix.length), size: o.size, modified: o.modified }));
  return NextResponse.json({ recordings: items.sort((a, b) => (a.id < b.id ? 1 : -1)) });
}

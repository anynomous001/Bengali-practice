import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { cleanLessonIds, MAX_PDF_BYTES } from "@/lib/lesson-files";
import { deleteObject, fileStoreReady, getObject, putObject } from "@/lib/storage";

export const maxDuration = 60;

/** Teacher only: put the uploaded pieces together into one PDF, store it, and attach it to the chosen lessons. */
export async function POST(req: Request) {
  const user = await getUser();
  if (!user?.isAdmin) return NextResponse.json({ error: "Not allowed." }, { status: 403 });
  if (!fileStoreReady()) return NextResponse.json({ error: "File storage isn't set up." }, { status: 503 });
  const body = (await req.json().catch(() => null)) as { upload?: string; parts?: number; title?: string; filename?: string; lessons?: unknown } | null;
  const upload = body?.upload ?? "";
  const parts = Number(body?.parts);
  const title = String(body?.title ?? "").trim().slice(0, 120);
  const filename = String(body?.filename ?? "file.pdf").replace(/[^\w .()-]+/g, "_").slice(0, 120) || "file.pdf";
  const lessons = cleanLessonIds(body?.lessons);
  if (!/^[0-9a-f-]{36}$/.test(upload) || !Number.isInteger(parts) || parts < 1 || parts > 21) return NextResponse.json({ error: "Bad request." }, { status: 400 });
  if (!title) return NextResponse.json({ error: "Give the PDF a title." }, { status: 400 });
  if (!lessons.length) return NextResponse.json({ error: "Choose at least one lesson for it to appear in." }, { status: 400 });

  const keys = Array.from({ length: parts }, (_, i) => `files/tmp/${upload}/${String(i).padStart(3, "0")}`);
  const chunks: Uint8Array[] = [];
  for (const k of keys) {
    const o = await getObject(k);
    if (!o) return NextResponse.json({ error: "Part of the upload is missing. Please try again." }, { status: 400 });
    chunks.push(o.bytes);
  }
  const size = chunks.reduce((a, c) => a + c.length, 0);
  const all = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) { all.set(c, at); at += c.length; }
  const cleanUp = () => Promise.all(keys.map((k) => deleteObject(k).catch(() => undefined)));
  if (size > MAX_PDF_BYTES) { await cleanUp(); return NextResponse.json({ error: "That PDF is over 30 MB." }, { status: 413 }); }
  if (new TextDecoder().decode(all.slice(0, 5)) !== "%PDF-") { await cleanUp(); return NextResponse.json({ error: "That file isn't a PDF." }, { status: 415 }); }

  const key = `files/${randomUUID()}.pdf`;
  await putObject(key, all, "application/pdf");
  await cleanUp();
  const [row] = await query<{ id: number }>(
    "INSERT INTO lesson_files (title, filename, storage_key, size, uploaded_by) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [title, filename, key, size, user.email],
  );
  for (const l of lessons) await query("INSERT INTO lesson_file_links (file_id, lesson_id) VALUES ($1, $2) ON CONFLICT DO NOTHING", [row.id, l]);
  return NextResponse.json({ id: row.id, size });
}

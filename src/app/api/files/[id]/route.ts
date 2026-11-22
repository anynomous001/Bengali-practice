import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { fileStoreReady, getObject } from "@/lib/storage";

/** A lesson PDF, shown in the browser. Any signed-in student with access can read it, and so can the teacher. */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user || !(user.hasAccess || user.isAdmin)) return NextResponse.json({ error: "Sign in to open this file." }, { status: 401 });
  if (!fileStoreReady()) return NextResponse.json({ error: "File storage isn't set up." }, { status: 503 });
  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const [row] = await query<{ storage_key: string; filename: string }>("SELECT storage_key, filename FROM lesson_files WHERE id = $1", [id]);
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const file = await getObject(row.storage_key);
  if (!file) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const download = new URL(req.url).searchParams.get("download") === "1";
  const name = row.filename.replace(/[^\w .()-]/g, "_");
  return new Response(Buffer.from(file.bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${name}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

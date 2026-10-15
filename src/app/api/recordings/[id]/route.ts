import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { getObject, ownerFolder, storageConfigured } from "@/lib/storage";

/** Play back one of the signed-in student's own recordings. The folder comes from the session, never from the URL. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user?.hasAccess) return NextResponse.json({ error: "Sign in to listen." }, { status: 401 });
  if (!storageConfigured()) return NextResponse.json({ error: "Recording storage isn't set up." }, { status: 503 });
  const { id } = await ctx.params;
  if (!/^\d+-[0-9a-f]{8}\.(webm|ogg|m4a|mp3|wav)$/.test(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const file = await getObject(`recordings/${ownerFolder(user.email)}/${id}`);
  if (!file) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return new Response(Buffer.from(file.bytes), { headers: { "Content-Type": file.contentType, "Cache-Control": "private, no-store" } });
}

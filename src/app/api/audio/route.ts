import { readFile } from "node:fs/promises";
import path from "node:path";
import { getUser } from "@/lib/auth";
import { audioId } from "@/lib/audio";

// Pronunciation clips live in content-audio/ (not in public/), so only signed-in students with access can fetch them.
export async function GET(req: Request) {
  const user = await getUser();
  if (!user?.hasAccess) return new Response("Not allowed", { status: 401 });
  const text = new URL(req.url).searchParams.get("t") ?? "";
  if (!text || text.length > 2000) return new Response("Bad request", { status: 400 });
  try {
    const file = await readFile(path.join(process.cwd(), "content-audio", `${audioId(text)}.mp3`));
    return new Response(new Uint8Array(file), {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("No clip", { status: 404 }); // the browser voice is used instead
  }
}

import { createHash } from "node:crypto";

/** Stable id for a spoken text: the clip is stored as content-audio/<id>.mp3. */
export const audioId = (text: string) => createHash("sha1").update(text.normalize("NFC").trim()).digest("hex").slice(0, 16);

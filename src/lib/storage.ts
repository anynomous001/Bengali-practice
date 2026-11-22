import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Neon Object Storage (S3-compatible). Credentials, endpoint and region come from the injected AWS_* variables.
// The bucket is declared in neon.ts and is private: files are only reachable through our own authenticated routes.
export const BUCKET = "assets";

let client: S3Client | undefined;
const s3 = () => (client ??= new S3Client({ forcePathStyle: true })); // Neon needs path-style addressing

export const storageConfigured = () => !!process.env.AWS_ENDPOINT_URL_S3 && !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY;

/** A stable, non-reversible folder name for one student, so object keys never contain an email address. */
export const ownerFolder = (email: string) => createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 24);

// With no bucket set up, `npm run dev` keeps files in ./.local-storage instead (never in production), the way the database does.
const LOCAL_DIR = join(process.cwd(), ".local-storage");
const localMode = () => !storageConfigured() && process.env.NODE_ENV !== "production";
const localPath = (key: string) => join(LOCAL_DIR, ...key.split("/").filter((p) => p && p !== ".."));
/** True when files can be stored here: the bucket is configured, or this is a local dev run. */
export const fileStoreReady = () => storageConfigured() || localMode();

export async function putObject(key: string, body: Uint8Array, contentType: string) {
  if (localMode()) { const f = localPath(key); await mkdir(dirname(f), { recursive: true }); await writeFile(f, body); return; }
  await s3().send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
}

export async function deleteObject(key: string) {
  if (localMode()) { await rm(localPath(key), { force: true }); return; }
  await s3().send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function getObject(key: string): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  if (localMode()) {
    try { return { bytes: new Uint8Array(await readFile(localPath(key))), contentType: key.endsWith(".pdf") ? "application/pdf" : "application/octet-stream" }; } catch { return null; }
  }
  try {
    const r = await s3().send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    return { bytes: (await r.Body?.transformToByteArray()) ?? new Uint8Array(), contentType: r.ContentType ?? "application/octet-stream" };
  } catch (e) {
    if ((e as { name?: string }).name === "NoSuchKey") return null;
    throw e;
  }
}

export async function listObjects(prefix: string) {
  const r = await s3().send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, MaxKeys: 100 }));
  return (r.Contents ?? []).map((o) => ({ key: o.Key!, size: o.Size ?? 0, modified: o.LastModified?.toISOString() ?? "" }));
}

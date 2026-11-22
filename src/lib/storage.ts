import { createHash } from "node:crypto";
import { query } from "./db";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Neon Object Storage (S3-compatible). Credentials, endpoint and region come from the injected AWS_* variables.
// The bucket is declared in neon.ts and is private: files are only reachable through our own authenticated routes.
export const BUCKET = "assets";

let client: S3Client | undefined;
const s3 = () => (client ??= new S3Client({ forcePathStyle: true })); // Neon needs path-style addressing

export const storageConfigured = () => !!process.env.AWS_ENDPOINT_URL_S3 && !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY;

/** A stable, non-reversible folder name for one student, so object keys never contain an email address. */
export const ownerFolder = (email: string) => createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 24);

// With no bucket set up (no AWS_* variables), files are kept in the database instead (table stored_objects), so uploads work
// everywhere with no extra setup. When a bucket is configured, it is used.
const dbMode = () => !storageConfigured();
/** Files can always be stored: in the bucket when there is one, otherwise in the database. */
export const fileStoreReady = () => true;

export async function putObject(key: string, body: Uint8Array, contentType: string) {
  if (dbMode()) {
    await query("INSERT INTO stored_objects (key, content_type, data) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET content_type = $2, data = $3", [key, contentType, Buffer.from(body)]);
    return;
  }
  await s3().send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
}

export async function deleteObject(key: string) {
  if (dbMode()) { await query("DELETE FROM stored_objects WHERE key = $1", [key]); return; }
  await s3().send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function getObject(key: string): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  if (dbMode()) {
    const [row] = await query<{ data: Uint8Array; content_type: string }>("SELECT data, content_type FROM stored_objects WHERE key = $1", [key]);
    return row ? { bytes: new Uint8Array(row.data), contentType: row.content_type } : null;
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

/** Throws away upload pieces that were never finished (a closed tab, a failed upload). Only needed for database storage. */
export async function purgeStaleUploads() {
  if (dbMode()) await query("DELETE FROM stored_objects WHERE key LIKE 'files/tmp/%' AND created_at < now() - interval '1 day'");
}

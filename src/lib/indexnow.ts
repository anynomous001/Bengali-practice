import { SITE_URL } from "./site";

/** The IndexNow key. It is public by design: the same text is served at /<key>.txt so search engines can check we own the site. */
export const INDEXNOW_KEY = "eacad283664a1d7a390b4703c4c1c9c4";

/** Tells Bing (and the other IndexNow search engines) that these pages are new or changed, so they are crawled sooner. */
export async function submitToIndexNow(paths: string[]): Promise<{ status: number; submitted: string[] }> {
  const urlList = paths.map((p) => `${SITE_URL}${p === "/" ? "" : p}`);
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(10000),
  });
  return { status: res.status, submitted: urlList };
}

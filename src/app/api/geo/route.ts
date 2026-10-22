import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/** Countries where analytics cookies need a yes first: the EU, Iceland, Liechtenstein, Norway, the UK and Switzerland. */
const CONSENT_COUNTRIES = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH".split(" "));

/**
 * What the public pages need to know about the visitor, from the country Vercel adds to the request. Keeping this out of the
 * pages themselves lets them be built once and served from the CDN. Nothing personal is returned or stored.
 */
export async function GET() {
  const country = ((await headers()).get("x-vercel-ip-country") ?? "").toUpperCase();
  return NextResponse.json(
    { india: country === "IN", needsConsent: !country || CONSENT_COUNTRIES.has(country) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

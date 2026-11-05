import { NextResponse, type NextRequest } from "next/server";

/** Passes the page path to server code, so access rules can see which lesson is being opened. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-bp-path", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/learn/:path*"] };

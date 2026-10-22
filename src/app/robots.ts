import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      // Rules match by prefix, so the app is "/learn/" plus the exact "/learn". A bare "/learn" would also block /learn-bengali.
      disallow: ["/learn/", "/learn$", "/admin", "/api", "/login", "/buy", "/access-ended"],
    }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

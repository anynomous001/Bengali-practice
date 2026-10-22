import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: Learn Bengali online`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/learn",
    display: "standalone",
    background_color: "#0f1538",
    theme_color: "#0f1538",
    categories: ["education"],
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

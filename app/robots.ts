import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/account", "/*?*"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: new URL(SITE_URL).host,
  };
}

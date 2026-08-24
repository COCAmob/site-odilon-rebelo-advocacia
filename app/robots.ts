import type { MetadataRoute } from "next";
import { brand } from "./site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${brand.website}/sitemap.xml`,
    host: brand.website,
  };
}

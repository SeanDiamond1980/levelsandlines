import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/webhook-", "/debug-", "/test-", "/logs", "/mobile-debug", "/verify-webhook"],
    },
    sitemap: "https://levelsandlines.com/sitemap.xml",
  }
}

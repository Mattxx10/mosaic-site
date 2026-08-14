import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  const lastModified = new Date("2026-08-13T00:00:00Z");
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/release-notes`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/installation`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/license`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}

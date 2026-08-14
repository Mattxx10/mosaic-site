import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mosaic-site.vercel.app";
  const lastModified = new Date("2026-08-13T00:00:00Z");
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/release-notes`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/installation`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/license`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}

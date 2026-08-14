import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DownloadDialog } from "@/components/download";
import { formatFileSize, getReleaseManifest } from "@/lib/release";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mosaic — One agentic workspace for the product lifecycle",
    template: "%s · Mosaic",
  },
  description:
    "Plan durable product documents and working designs with Codex in a local, opinionated workspace. Free macOS alpha for Apple Silicon.",
  applicationName: "Mosaic",
  keywords: [
    "agentic development",
    "Codex",
    "AI product planning",
    "spec-driven development",
    "interactive prototype",
    "developer tools",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/mosaic-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/mosaic-mark.svg" }],
  },
  openGraph: {
    title: "Mosaic — Plan, build, ship, and scale through one agentic workspace.",
    description: "Plan Studio is available today as a free macOS alpha. The complete agentic product lifecycle is coming next.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Mosaic Plan Studio inside a local agentic workspace" }],
    locale: "en_US",
    siteName: "Mosaic",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mosaic — Local agentic planning studio",
    description: "Turn product intent into durable documents and working designs with Codex.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070910",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const release = await getReleaseManifest();

  return (
    <html lang="en">
      <body>
        {children}
        <DownloadDialog fileSize={formatFileSize(release.fileSize)} release={release} />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}

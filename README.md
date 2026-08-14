# Mosaic marketing site

The public download and product website for Mosaic, a local agentic planning studio. The site is intentionally separate from the private Mosaic desktop application and from product repositories managed by Mosaic.

## Current public promise

Mosaic `0.1.0-alpha.1` ships **Plan Studio only** for Apple Silicon Macs on macOS 13 or later. Projects, implementation, deployment, provider writes, Attention, Activity, Windows, and Plan-to-project handoff are roadmap capabilities and must remain labeled **Coming soon**.

## Stack

- Next.js App Router, React, and TypeScript
- Product-scoped CSS variables and semantic components
- Vercel Web Analytics for aggregate, cookie-free page and download-click analytics
- Build-time validated release metadata from the public `mosaic-releases` repository
- Playwright coverage in Chromium, WebKit, and Firefox at 1440px, 768px, and 360px

There is no authentication, database, server action, waitlist, email collection, or runtime CMS.

## Local setup

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local build reads and validates [`release.json`](./release.json). Production requires `MOSAIC_RELEASE_MANIFEST_URL`, preventing a deploy from silently presenting a stale bundled release.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium webkit firefox
npm run test:e2e
```

Optimize a new set of high-resolution source captures with:

```bash
npm run assets:optimize
```

Source PNGs are intentionally ignored. Commit the resulting WebP and AVIF files and visually inspect the Open Graph image.

## Release dependency

The website must launch only after the public `Mattxx10/mosaic-releases` repository contains the immutable `v0.1.0-alpha.1` tag and these assets:

- `Mosaic-0.1.0-alpha.1-arm64.dmg`
- `Mosaic-0.1.0-alpha.1-arm64.dmg.sha256`
- `release.json`
- release notes, installation guide, and Alpha Evaluation License

The production Vercel project must set:

```text
MOSAIC_RELEASE_MANIFEST_URL=https://raw.githubusercontent.com/Mattxx10/mosaic-releases/main/release.json
NEXT_PUBLIC_SITE_URL=https://<generated-vercel-domain>
```

`src/lib/release.ts` rejects unexpected hosts, paths, versions, architectures, minimum OS versions, signatures, file names, sizes, and checksums. A production build without the remote manifest variable fails closed.

## Deploy to Vercel

After the GitHub release is public and validated:

```bash
npx vercel
npx vercel env add MOSAIC_RELEASE_MANIFEST_URL production
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

Use Vercel’s generated domain for the alpha. Re-run the production build after updating `NEXT_PUBLIC_SITE_URL` to that domain so canonical, Open Graph, robots, and sitemap URLs agree.

## Privacy and downloads

The site uses Vercel’s aggregate analytics and emits only non-personal events for opening the unsigned-download disclosure and starting a download. Download CTAs always open the disclosure first. Installation guidance never recommends disabling Gatekeeper or using `xattr`.

The website code is copyright © 2026 Matheus Leal. The downloadable Mosaic application is proprietary and governed by the separate Mosaic Alpha Evaluation License in the release repository.

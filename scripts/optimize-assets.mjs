import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productDir = path.join(root, "public", "product");
const brandDir = path.join(root, "public", "brand");

const screens = [
  "plan-library",
  "new-plan",
  "design-workspace",
  "live-codex",
  "comments",
];

for (const screen of screens) {
  const input = path.join(productDir, `${screen}-source.png`);
  const pipeline = sharp(input).resize({ width: 2400, withoutEnlargement: true });

  await pipeline
    .clone()
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(path.join(productDir, `${screen}.webp`));

  await pipeline
    .clone()
    .avif({ quality: 52, effort: 6, chromaSubsampling: "4:4:4" })
    .toFile(path.join(productDir, `${screen}.avif`));
}

const screenshotWidth = 570;
const screenshotHeight = 357;
const screenshot = await sharp(path.join(productDir, "design-workspace-source.png"))
  .resize(screenshotWidth, screenshotHeight, { fit: "cover", position: "top" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${screenshotWidth}" height="${screenshotHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="18" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const logo = await sharp(path.join(brandDir, "mosaic-mark.svg"))
  .resize(58, 58)
  .png()
  .toBuffer();

const copy = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <style>
      .brand { font: 700 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; fill: #f7f8fc; }
      .eyebrow { font: 700 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: 2.4px; fill: #9ba4ff; }
      .headline { font: 700 51px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: -2px; fill: #f7f8fc; }
      .support { font: 500 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; fill: #a8afc0; }
      .badge { font: 700 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; fill: #c6caff; }
    </style>
    <rect x="0" y="0" width="1200" height="630" fill="#070911" fill-opacity=".34"/>
    <rect x="52" y="42" width="1096" height="546" rx="32" fill="#080b13" fill-opacity=".58" stroke="#8290ba" stroke-opacity=".22"/>
    <text x="136" y="82" class="brand">Mosaic</text>
    <rect x="969" y="58" width="142" height="34" rx="17" fill="#242449" stroke="#838bff" stroke-opacity=".55"/>
    <text x="1040" y="80" class="badge" text-anchor="middle">FREE ALPHA</text>
    <text x="78" y="163" class="eyebrow">LOCAL AGENTIC PLANNING</text>
    <text x="78" y="230" class="headline">Plan, build, ship,</text>
    <text x="78" y="288" class="headline">and scale through one</text>
    <text x="78" y="346" class="headline">agentic workspace.</text>
    <text x="78" y="413" class="support">Plan Studio is available today.</text>
    <text x="78" y="445" class="support">The complete lifecycle is coming next.</text>
    <rect x="78" y="495" width="190" height="48" rx="14" fill="#7c83ff"/>
    <text x="173" y="526" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="16" font-weight="700" fill="#080a12">Mosaic for macOS</text>
    <rect x="583" y="148" width="590" height="377" rx="24" fill="#111623" stroke="#a0a8c0" stroke-opacity=".3"/>
    <circle cx="609" cy="174" r="5" fill="#f87171"/><circle cx="627" cy="174" r="5" fill="#fbbf24"/><circle cx="645" cy="174" r="5" fill="#34d399"/>
  </svg>
`);

const og = sharp(path.join(brandDir, "og-background.png"))
  .resize(1200, 630, { fit: "cover", position: "center" })
  .composite([
    { input: copy, left: 0, top: 0 },
    { input: logo, left: 68, top: 53 },
    { input: screenshot, left: 593, top: 188 },
  ]);

await og.clone().png({ compressionLevel: 9 }).toFile(path.join(root, "public", "opengraph-image.png"));
await og.clone().webp({ quality: 86, effort: 6 }).toFile(path.join(root, "public", "opengraph-image.webp"));

console.log(`Optimized ${screens.length} product screens and generated Open Graph assets.`);

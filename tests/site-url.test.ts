import assert from "node:assert/strict";
import test from "node:test";
import { resolveSiteUrl } from "../src/lib/site-url.ts";

test("uses an explicitly configured site URL first", () => {
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://mosaic.example/path",
      VERCEL_PROJECT_PRODUCTION_URL: "generated.vercel.app",
    }),
    "https://mosaic.example",
  );
});

test("uses Vercel's generated production domain when no explicit URL is configured", () => {
  assert.equal(
    resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "mosaic-site-generated.vercel.app" }),
    "https://mosaic-site-generated.vercel.app",
  );
});

test("keeps the local fallback when no deployment metadata is available", () => {
  assert.equal(resolveSiteUrl({}), "https://mosaic-site.vercel.app");
});

test("rejects unsupported URL protocols", () => {
  assert.throws(
    () => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "javascript:alert(1)" }),
    /must use HTTP or HTTPS/,
  );
});

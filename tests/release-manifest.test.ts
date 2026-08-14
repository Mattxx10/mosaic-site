import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { EXPECTED_RELEASE_VERSION, validateReleaseManifest } from "../src/lib/release.ts";

const fixture = JSON.parse(await readFile(new URL("../release.json", import.meta.url), "utf8"));

test("accepts the pinned Apple Silicon GitHub release", () => {
  const release = validateReleaseManifest(fixture);
  assert.equal(release.version, EXPECTED_RELEASE_VERSION);
  assert.equal(release.architecture, "arm64");
  assert.equal(release.minimumOS, "13.0");
  assert.equal(release.signed, false);
});

test("rejects a non-GitHub asset host", () => {
  assert.throws(
    () => validateReleaseManifest({ ...fixture, downloadUrl: "https://example.com/Mosaic.dmg" }),
    /allowlisted GitHub host/,
  );
});

test("rejects a stale version", () => {
  assert.throws(
    () => validateReleaseManifest({ ...fixture, version: "0.1.0-alpha.0" }),
    /Refusing a stale release/,
  );
});

test("rejects an unsupported platform contract", () => {
  assert.throws(() => validateReleaseManifest({ ...fixture, architecture: "x64" }), /arm64/);
  assert.throws(() => validateReleaseManifest({ ...fixture, minimumOS: "12.0" }), /13.0/);
  assert.throws(() => validateReleaseManifest({ ...fixture, signed: true }), /signed: false/);
});

test("rejects a malformed checksum", () => {
  assert.throws(() => validateReleaseManifest({ ...fixture, sha256: "not-a-checksum" }), /SHA-256/);
});

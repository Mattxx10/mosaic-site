import { readFile } from "node:fs/promises";
import path from "node:path";

export const EXPECTED_RELEASE_VERSION = "0.1.0-alpha.1";

export type ReleaseManifest = {
  version: string;
  channel: "alpha";
  publishedAt: string;
  platform: "macOS";
  architecture: "arm64";
  minimumOS: "13.0";
  assetName: string;
  fileSize: number;
  downloadUrl: string;
  sha256: string;
  signed: false;
  releaseNotesUrl: string;
};

const manifestSourceHosts = new Set(["raw.githubusercontent.com", "github.com"]);
const releaseAssetHosts = new Set(["github.com"]);

function assertRecord(value: unknown): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Mosaic release manifest must be a JSON object.");
  }
}

function safeHttpsUrl(value: unknown, field: string, hosts: Set<string>): URL {
  if (typeof value !== "string") {
    throw new Error(`${field} must be an HTTPS URL.`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${field} must be a valid URL.`);
  }

  if (url.protocol !== "https:" || !hosts.has(url.hostname) || url.username || url.password) {
    throw new Error(`${field} must be a credential-free URL on an allowlisted GitHub host.`);
  }

  return url;
}

export function validateReleaseManifest(value: unknown): ReleaseManifest {
  assertRecord(value);

  const requiredKeys = [
    "version",
    "channel",
    "publishedAt",
    "platform",
    "architecture",
    "minimumOS",
    "assetName",
    "fileSize",
    "downloadUrl",
    "sha256",
    "signed",
    "releaseNotesUrl",
  ];

  for (const key of requiredKeys) {
    if (!(key in value)) throw new Error(`Mosaic release manifest is missing ${key}.`);
  }

  if (value.version !== EXPECTED_RELEASE_VERSION) {
    throw new Error(
      `Expected Mosaic ${EXPECTED_RELEASE_VERSION}, received ${String(value.version)}. Refusing a stale release.`,
    );
  }
  if (value.channel !== "alpha") throw new Error('Release channel must be "alpha".');
  if (value.platform !== "macOS") throw new Error('Release platform must be "macOS".');
  if (value.architecture !== "arm64") throw new Error('Release architecture must be "arm64".');
  if (value.minimumOS !== "13.0") throw new Error('Minimum supported OS must be macOS 13.0.');
  if (value.signed !== false) throw new Error("The alpha manifest must explicitly declare signed: false.");
  if (!Number.isSafeInteger(value.fileSize) || Number(value.fileSize) <= 0) {
    throw new Error("Release fileSize must be a positive integer byte count.");
  }
  if (typeof value.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(value.sha256)) {
    throw new Error("Release SHA-256 must be 64 lowercase hexadecimal characters.");
  }
  if (
    typeof value.assetName !== "string" ||
    !/^Mosaic-\d+\.\d+\.\d+-alpha\.\d+-arm64\.dmg$/.test(value.assetName)
  ) {
    throw new Error("Release asset must be a path-free Mosaic Apple Silicon alpha DMG.");
  }
  if (
    typeof value.publishedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value.publishedAt) ||
    Number.isNaN(Date.parse(`${value.publishedAt}T00:00:00Z`))
  ) {
    throw new Error("Release publishedAt must be a valid ISO calendar date.");
  }

  const download = safeHttpsUrl(value.downloadUrl, "downloadUrl", releaseAssetHosts);
  const notes = safeHttpsUrl(value.releaseNotesUrl, "releaseNotesUrl", releaseAssetHosts);
  const expectedTag = `v${value.version}`;
  const expectedDownloadPath =
    `/Mattxx10/mosaic-releases/releases/download/${expectedTag}/${value.assetName}`;
  const expectedNotesPath = `/Mattxx10/mosaic-releases/releases/tag/${expectedTag}`;

  if (download.pathname !== expectedDownloadPath) {
    throw new Error("Release download URL does not match the immutable GitHub release asset path.");
  }
  if (notes.pathname !== expectedNotesPath) {
    throw new Error("Release notes URL does not match the immutable GitHub release tag.");
  }

  return value as ReleaseManifest;
}

async function loadManifestSource(): Promise<unknown> {
  const remoteSource = process.env.MOSAIC_RELEASE_MANIFEST_URL;

  if (process.env.VERCEL_ENV === "production" && !remoteSource) {
    throw new Error(
      "MOSAIC_RELEASE_MANIFEST_URL is required for production so Mosaic never serves a stale bundled download.",
    );
  }

  if (remoteSource) {
    const url = safeHttpsUrl(remoteSource, "MOSAIC_RELEASE_MANIFEST_URL", manifestSourceHosts);
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Could not load the Mosaic release manifest (${response.status}).`);
    }
    const declaredLength = Number(response.headers.get("content-length") ?? "0");
    if (declaredLength > 64_000) throw new Error("Remote release manifest is unexpectedly large.");
    const body = await response.text();
    if (body.length > 64_000) throw new Error("Remote release manifest is unexpectedly large.");
    return JSON.parse(body) as unknown;
  }

  const localPath = path.join(process.cwd(), "release.json");
  return JSON.parse(await readFile(localPath, "utf8")) as unknown;
}

export async function getReleaseManifest(): Promise<ReleaseManifest> {
  return validateReleaseManifest(await loadManifestSource());
}

export function formatFileSize(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

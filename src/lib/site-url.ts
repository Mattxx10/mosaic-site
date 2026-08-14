const fallbackSiteUrl = "https://mosaic-site.vercel.app";

type SiteUrlEnvironment = Partial<
  Pick<NodeJS.ProcessEnv, "NEXT_PUBLIC_SITE_URL" | "VERCEL_PROJECT_PRODUCTION_URL">
>;

export function resolveSiteUrl(
  environment: SiteUrlEnvironment = process.env as SiteUrlEnvironment,
): string {
  const configuredUrl = environment.NEXT_PUBLIC_SITE_URL?.trim();
  const productionDomain = environment.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate = configuredUrl || (productionDomain ? `https://${productionDomain}` : fallbackSiteUrl);
  const url = new URL(candidate);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Mosaic site URL must use HTTP or HTTPS.");
  }

  return url.origin;
}

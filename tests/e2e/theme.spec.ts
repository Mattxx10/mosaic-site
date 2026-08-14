import { expect, test } from "@playwright/test";

type Palette = {
  bodyBackground: string;
  bodyColor: string;
  colorScheme: string;
  costBackground: string;
  downloadBackground: string;
  featureBackground: string;
  footerBackground: string;
  headerBackground: string;
  productBackground: string;
  roadmapBackground: string;
};

async function readPalette(page: import("@playwright/test").Page): Promise<Palette> {
  return page.evaluate(() => {
    const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);

    return {
      bodyBackground: style("body").backgroundColor,
      bodyColor: style("body").color,
      colorScheme: style(":root").colorScheme,
      costBackground: style(".mosaic-cost-section").backgroundColor,
      downloadBackground: style(".mosaic-download-card").backgroundColor,
      featureBackground: style(".mosaic-feature-grid article").backgroundImage,
      footerBackground: style(".mosaic-footer").backgroundColor,
      headerBackground: style(".mosaic-header").backgroundColor,
      productBackground: style(".mosaic-product-section").backgroundColor,
      roadmapBackground: style(".mosaic-roadmap-section").backgroundColor,
    };
  });
}

test("follows the system color preference and responds without a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  const dark = await readPalette(page);

  expect(dark.colorScheme).toBe("dark");
  expect(dark.bodyBackground).toBe("rgb(7, 9, 16)");
  expect(dark.bodyColor).toBe("rgb(244, 246, 251)");

  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await expect.poll(async () => (await readPalette(page)).bodyBackground).toBe("rgb(247, 248, 252)");
  const light = await readPalette(page);

  expect(light.bodyBackground).toBe("rgb(247, 248, 252)");
  expect(light.bodyColor).toBe("rgb(21, 25, 36)");
  await expect(page.locator(".mosaic-hero-window img")).toHaveCSS("filter", "none");
  await expect(page.locator(".mosaic-gallery-window img")).toHaveCSS("filter", "none");

  for (const key of Object.keys(light) as Array<keyof Palette>) {
    if (key !== "colorScheme") expect(light[key]).not.toBe(dark[key]);
  }

  await page.getByTestId("download-trigger-hero").click();
  const dialogPalette = await page.getByTestId("download-dialog").locator(".mosaic-dialog-surface").evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color,
  }));
  expect(dialogPalette).toEqual({ background: "rgb(255, 255, 255)", color: "rgb(21, 25, 36)" });
  await page.keyboard.press("Escape");

  await page.goto("/privacy");
  await expect(page.locator(".mosaic-legal")).toHaveCSS("background-color", "rgb(243, 245, 249)");
});

test("publishes theme-aware browser metadata", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Metadata is identical across browser projects.");
  await page.goto("/");

  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "light dark");
  const themeColors = await page.locator('meta[name="theme-color"]').evaluateAll((elements) =>
    elements.map((element) => ({
      color: element.getAttribute("content"),
      media: element.getAttribute("media"),
    })),
  );

  expect(themeColors).toEqual(expect.arrayContaining([
    { color: "#f7f8fc", media: "(prefers-color-scheme: light)" },
    { color: "#070910", media: "(prefers-color-scheme: dark)" },
  ]));
});

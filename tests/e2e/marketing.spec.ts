import { expect, test } from "@playwright/test";

test("presents the plan-only alpha without implying future features are live", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Plan, build, ship");
  await expect(page.getByText("Plan Studio is available today", { exact: false })).toBeVisible();
  await expect(page.getByText("A deliberately focused alpha.")).toBeVisible();
  await expect(page.getByText("Project creation, repository implementation", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mosaic for Windows" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Windows coming soon" })).toBeDisabled();
});

test("switches gallery artifacts", async ({ page }) => {
  await page.goto("/#alpha");
  const tab = page.getByRole("tab", { name: /Element comments/ });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").getByAltText(/Element comments/)).toBeVisible();
});

test("discloses the unsigned alpha before download", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("download-trigger-hero").click();
  const dialog = page.getByTestId("download-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "This alpha is unsigned." })).toBeVisible();
  await expect(dialog).toContainText("Control-click Mosaic");
  await expect(dialog).toContainText("b043ce737044c0dc5ea05db4f947bad9b1517cc9a1673207a4e5a81375466f4e");
  await expect(page.getByTestId("download-confirm")).toHaveAttribute("href", /github\.com\/Mattxx10\/mosaic-releases\/releases\/download/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("has no page-level horizontal clipping", async ({ page }) => {
  await page.goto("/");
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport + 1);
});

test("keeps legal and support routes reachable", async ({ page }) => {
  for (const route of ["/privacy", "/license", "/installation", "/release-notes"]) {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("main")).toBeVisible();
  }
});

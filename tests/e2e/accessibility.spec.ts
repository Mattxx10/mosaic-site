import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const axePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../node_modules/axe-core/axe.min.js");

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  async function expectNoSeriousViolations(context: string) {
    const violations = await page.evaluate(async () => {
      const result = await (window as typeof window & { axe: { run: () => Promise<{ violations: Array<{ impact: string | null; id: string }> }> } }).axe.run();
      return result.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious");
    });
    const summary = violations.map((violation) => ({
      id: violation.id,
      nodes: (violation as { nodes?: Array<{ target?: string[] }> }).nodes?.map((node) => node.target),
    }));
    expect(violations, `${context}: ${JSON.stringify(summary, null, 2)}`).toHaveLength(0);
  }

  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await page.addScriptTag({ path: axePath });
    await expectNoSeriousViolations(`${colorScheme} homepage`);

    await page.getByTestId("download-trigger-hero").click();
    await expectNoSeriousViolations(`${colorScheme} download dialog`);
    await page.keyboard.press("Escape");

    await page.goto("/privacy");
    await page.addScriptTag({ path: axePath });
    await expectNoSeriousViolations(`${colorScheme} legal page`);
  }
});

test("keeps visible text at the Mosaic readability floor", async ({ page }) => {
  async function findUndersizedText(context: string) {
    return page.locator("body *").evaluateAll(
      (elements, options) =>
        elements.flatMap((element) => {
          if (element.closest('[aria-hidden="true"]')) return [];

          const ownText = [...element.childNodes]
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent?.trim() ?? "")
            .filter(Boolean)
            .join(" ");

          if (!ownText) return [];

          const style = getComputedStyle(element);
          const bounds = element.getBoundingClientRect();
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            Number(style.opacity) === 0 ||
            bounds.width === 0 ||
            bounds.height === 0
          ) {
            return [];
          }

          const minimum = element.matches("a, button, summary")
            ? options.controlMinimum
            : options.textMinimum;
          const actual = Number.parseFloat(style.fontSize);

          return actual + 0.01 < minimum
            ? [
                {
                  actual,
                  className: element.getAttribute("class") ?? "",
                  context: options.context,
                  element: element.tagName.toLowerCase(),
                  minimum,
                  text: ownText.slice(0, 80),
                },
              ]
            : [];
        }),
      { context, controlMinimum: 13, textMinimum: 12 },
    );
  }

  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    expect(await findUndersizedText(`${colorScheme} homepage`)).toEqual([]);

    await page.getByTestId("download-trigger-hero").click();
    expect(await findUndersizedText(`${colorScheme} download dialog`)).toEqual([]);
    await page.keyboard.press("Escape");

    await page.goto("/privacy");
    expect(await findUndersizedText(`${colorScheme} legal pages`)).toEqual([]);
  }
});

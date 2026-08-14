import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const axePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../node_modules/axe-core/axe.min.js");

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => {
    const result = await (window as typeof window & { axe: { run: () => Promise<{ violations: Array<{ impact: string | null; id: string }> }> } }).axe.run();
    return result.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious");
  });
  const summary = violations.map((violation) => ({
    id: violation.id,
    nodes: (violation as { nodes?: Array<{ target?: string[] }> }).nodes?.map((node) => node.target),
  }));
  expect(violations, JSON.stringify(summary, null, 2)).toHaveLength(0);
});

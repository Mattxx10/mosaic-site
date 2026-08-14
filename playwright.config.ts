import { defineConfig, devices } from "@playwright/test";

const widths = [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "tablet", viewport: { width: 768, height: 1000 } },
  { name: "phone", viewport: { width: 360, height: 800 } },
];

const browsers = [
  { name: "chromium", use: devices["Desktop Chrome"] },
  { name: "webkit", use: devices["Desktop Safari"] },
  { name: "firefox", use: devices["Desktop Firefox"] },
];

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3111",
    trace: "retain-on-failure",
  },
  projects: browsers.flatMap((browser) =>
    widths.map((size) => ({
      name: `${browser.name}-${size.name}`,
      use: { ...browser.use, viewport: size.viewport },
    })),
  ),
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3111",
    url: "http://127.0.0.1:3111",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});

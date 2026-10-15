import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`;
const isCI = Boolean(process.env.CI);
const workers = process.env.PLAYWRIGHT_WORKERS ?? (isCI ? 4 : "50%");

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  snapshotPathTemplate: "{testDir}/.visual-baselines/{projectName}/{testFilePath}/{arg}{ext}",
  expect: {
    timeout: 7_500,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.001,
      stylePath: path.join(process.cwd(), "tests/visual/screenshot.css"),
    },
  },
  use: {
    baseURL,
    locale: "en-US",
    timezoneId: "Europe/Berlin",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: isCI ? `bun run start --port ${port}` : `bun run dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "visual-chromium",
      testMatch: /visual\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "responsive-chromium",
      testMatch: /responsive\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "accessibility-chromium",
      testMatch: /accessibility\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "functional-chromium",
      testMatch: /functional\/.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "functional-webkit",
      testMatch: /functional\/.*\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

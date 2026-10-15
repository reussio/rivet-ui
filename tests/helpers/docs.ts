import { expect, type Locator, type Page } from "@playwright/test";

type ThemeName = "dark" | "light";

const exampleSelector = '[data-slot="component-example"]';
const previewSelector = '[data-slot="component-example-preview"]';

async function openComponentPage(page: Page, slug: string, theme: ThemeName = "dark") {
  await page.addInitScript(
    ({ selectedTheme }) => {
      window.localStorage.setItem("rivet-ui:theme", selectedTheme);
    },
    { selectedTheme: theme },
  );
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
  await page.goto(`/components/${slug}`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(`${exampleSelector}[data-test-ready="true"]`).first()).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.locator(previewSelector).first()).toBeVisible();
}

async function openBlockPage(page: Page, slug: string, theme: ThemeName = "dark") {
  await page.addInitScript(
    ({ selectedTheme }) => {
      window.localStorage.setItem("rivet-ui:theme", selectedTheme);
    },
    { selectedTheme: theme },
  );
  await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
  await page.goto(`/blocks/${slug}`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('[data-slot="block-example"][data-test-ready="true"]')).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.locator('[data-slot="block-preview"]')).toBeVisible();
}

function getExamples(page: Page) {
  return page.locator(exampleSelector);
}

function getPreviews(page: Page) {
  return page.locator(previewSelector);
}

function getFirstPreview(page: Page): Locator {
  return getPreviews(page).first();
}

function getBlockPreview(page: Page): Locator {
  return page.locator('[data-slot="block-preview"]');
}

export type { ThemeName };
export {
  getBlockPreview,
  getExamples,
  getFirstPreview,
  getPreviews,
  openBlockPage,
  openComponentPage,
};

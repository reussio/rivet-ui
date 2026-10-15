import { expect, type Locator, type Page } from "@playwright/test";

import { getFirstPreview } from "./docs";

type OverlayCase = {
  contentSelector: string;
  name: string;
  open: (page: Page, preview: Locator) => Promise<void>;
  slug: string;
};

const overlayCases: readonly OverlayCase[] = [
  createButtonCase("alert-dialog", "confirmation", "Delete environment", "alert-dialog-content"),
  createClickCase("color-picker", "custom-color", "color-picker-trigger", "color-picker-content"),
  createButtonCase("command-bar", "commands", "Open command bar", "command-bar"),
  createClickCase("combobox", "regions", "combobox-trigger", "combobox-content"),
  createClickCase("date-picker", "calendar", "date-picker-trigger", "date-picker-content"),
  createButtonCase("dialog", "new-deployment", "New deployment", "dialog-content"),
  createButtonCase("drawer", "deployment-actions", "Actions", "drawer-content"),
  createButtonCase(
    "dropdown-menu",
    "deployment-actions",
    "Open deployment actions",
    "dropdown-menu-content",
  ),
  createClickCase(
    "multi-select",
    "deployment-environments",
    "multi-select-trigger",
    "multi-select-content",
  ),
  createButtonCase("popover", "deployment-alias", "Configure", "popover-content"),
  createClickCase("select", "runtime", "select-trigger", "select-content"),
  createButtonCase("sheet", "runtime-configuration", "Configure", "sheet-content"),
  createClickCase("time-picker", "time", "time-picker-trigger", "time-picker-content"),
  {
    slug: "context-menu",
    name: "artifact-actions",
    contentSelector: '[data-slot="context-menu-content"]',
    async open(_page, preview) {
      await preview
        .locator('[data-slot="context-menu-trigger"]')
        .first()
        .click({ button: "right" });
    },
  },
  {
    slug: "tooltip",
    name: "deployment-url",
    contentSelector: '[data-slot="tooltip-content"]',
    async open(_page, preview) {
      await preview.getByRole("button", { name: "Copy deployment URL" }).hover();
    },
  },
] as const;

function createClickCase(
  slug: string,
  name: string,
  triggerSlot: string,
  contentSlot: string,
): OverlayCase {
  return {
    slug,
    name,
    contentSelector: `[data-slot="${contentSlot}"]`,
    async open(_page, preview) {
      await preview.locator(`[data-slot="${triggerSlot}"]`).first().click();
    },
  };
}

function createButtonCase(
  slug: string,
  name: string,
  buttonName: string,
  contentSlot: string,
): OverlayCase {
  return {
    slug,
    name,
    contentSelector: `[data-slot="${contentSlot}"]`,
    async open(page, preview) {
      const trigger = preview.getByRole("button", { name: buttonName });
      await trigger.evaluate((element) => {
        document.documentElement.style.scrollBehavior = "auto";
        document.body.style.scrollBehavior = "auto";
        element.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
      });
      await trigger.focus();
      await page.keyboard.press("Enter");
    },
  };
}

async function openOverlay(page: Page, overlayCase: OverlayCase) {
  const preview = getFirstPreview(page);
  await overlayCase.open(page, preview);
  const content = page.locator(overlayCase.contentSelector).last();
  await expect(content).toBeVisible();
  return content;
}

export type { OverlayCase };
export { openOverlay, overlayCases };

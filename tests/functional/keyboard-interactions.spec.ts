import { expect, test } from "@playwright/test";

import { getFirstPreview, getPreviews, openComponentPage } from "../helpers/docs";

test("dialog closes with Escape and restores trigger focus", async ({ page }) => {
  await openComponentPage(page, "dialog");
  const trigger = getFirstPreview(page).getByRole("button", { name: "New deployment" });

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "New deployment" })).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.getByRole("dialog", { name: "New deployment" })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("dropdown supports Arrow navigation, Escape, and focus restoration", async ({ page }) => {
  await openComponentPage(page, "dropdown-menu");
  const trigger = getFirstPreview(page).getByRole("button", {
    name: "Open deployment actions",
  });

  await trigger.focus();
  await page.keyboard.press("Enter");
  const firstItem = page.getByRole("menuitem", { name: /View details/ });
  await expect(firstItem).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: /Copy identifier/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("radio groups use roving Arrow key navigation", async ({ page }) => {
  await openComponentPage(page, "radio-group");
  const preview = getFirstPreview(page);
  const development = preview.getByRole("radio", { name: /Development/ });
  const staging = preview.getByRole("radio", { name: /Staging/ });

  await development.focus();
  await page.keyboard.press("ArrowDown");

  await expect(staging).toBeFocused();
  await expect(staging).toBeChecked();
});

test("tabs use roving Arrow key navigation", async ({ page }) => {
  await openComponentPage(page, "tabs");
  const preview = getFirstPreview(page);
  const overview = preview.getByRole("tab", { name: "Overview" });
  const activity = preview.getByRole("tab", { name: "Activity" });

  await overview.focus();
  await page.keyboard.press("ArrowRight");

  await expect(activity).toBeFocused();
  await expect(activity).toHaveAttribute("aria-selected", "true");
});

test("form states expose native disabled and invalid semantics", async ({ page }) => {
  await openComponentPage(page, "input");
  const statesPreview = getPreviews(page).nth(1);

  await expect(statesPreview.getByRole("textbox", { name: "Archived project" })).toBeDisabled();
  await expect(statesPreview.getByRole("textbox", { name: "Invalid token" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("keyboard focus remains visibly distinguishable", async ({ page }) => {
  await openComponentPage(page, "button");
  const button = getFirstPreview(page).getByRole("button").first();

  await button.focus();

  await expect(button).toBeFocused();
  expect(await button.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
});

test("reduced motion disables the spinner animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openComponentPage(page, "spinner");
  const spinner = getFirstPreview(page).locator('[data-slot="spinner"]').first();

  await expect(spinner).toBeVisible();
  expect(await spinner.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
});

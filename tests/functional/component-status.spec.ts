import { expect, test } from "@playwright/test";

test("component status is explained in the hero", async ({ page }) => {
  await page.goto("/components/alert");

  const status = page.getByRole("button", { name: "Stable component status" });
  await expect(status).toBeVisible();
  await status.hover();

  await expect(page.getByRole("tooltip")).toContainText(
    "API, accessibility, responsive behavior, and automated tests are approved.",
  );
  await expect(page.getByRole("tooltip")).toContainText("Available since v0.1.0.");
});

test("component overview and search stay status-free", async ({ page }) => {
  await page.goto("/#components");

  await expect(page.locator('[data-slot="component-status"]')).toHaveCount(0);

  await page.keyboard.press("ControlOrMeta+K");
  const search = page.getByRole("combobox", { name: "Search documentation" });
  await search.fill("website link");

  const result = page.getByRole("option", { name: /Website Link/ });
  await expect(result).toBeVisible();
  await expect(result).not.toContainText("Experimental");
});

import { expect, test } from "@playwright/test";

import { getBlockPreview, openBlockPage } from "../helpers/docs";

test("authentication exposes verification and recovery views", async ({ page }) => {
  await openBlockPage(page, "authentication");
  const preview = getBlockPreview(page);

  await preview.getByLabel("Email").fill("operator@example.com");
  await preview
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("correct-horse-battery-staple");
  await preview.getByRole("button", { name: "Continue" }).click();
  await expect(preview.getByRole("heading", { name: "Verify access" })).toBeVisible();
  await expect(preview.getByLabel("Verification code")).toBeVisible();

  await preview.getByRole("button", { name: "Back" }).click();
  await preview.getByRole("button", { name: "Forgot password?" }).click();
  await expect(preview.getByRole("heading", { name: "Recover access" })).toBeVisible();
});

test("command dashboard filters services and opens its command bar", async ({ page }) => {
  await openBlockPage(page, "command-dashboard");
  const preview = getBlockPreview(page);

  await preview.getByLabel("Search services").fill("worker");
  await expect(preview.getByRole("heading", { name: "Event Worker" })).toBeVisible();
  await expect(preview.getByRole("heading", { name: "API Gateway" })).toBeHidden();

  await preview.getByRole("button", { name: /Quick actions/ }).click();
  await expect(page.getByRole("dialog", { name: "Operational commands" })).toBeVisible();
});

test("deployment list confirms destructive actions", async ({ page }) => {
  await openBlockPage(page, "deployment-list");
  const preview = getBlockPreview(page);

  await preview.getByRole("button", { name: "Actions" }).first().click();
  await page.getByRole("menuitem", { name: "Delete deployment" }).click();
  await expect(page.getByRole("alertdialog", { name: "Delete api-gateway?" })).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("alertdialog", { name: "Delete api-gateway?" })).toBeHidden();
});

test("settings form exposes its native form controls", async ({ page }) => {
  await openBlockPage(page, "settings-form");
  const preview = getBlockPreview(page);

  await expect(preview.getByLabel("Workspace name")).toHaveValue("Northstar Systems");
  await expect(preview.getByLabel("Log retention")).toHaveValue("30");
  await expect(preview.getByRole("switch", { name: "Preview features" })).toBeChecked();
});

import { expect, test } from "@playwright/test";

import { componentAuditMatrix } from "../../quality/component-audit-matrix";
import { getPreviews, openComponentPage } from "../helpers/docs";

test.describe.configure({ mode: "parallel" });

for (const component of componentAuditMatrix) {
  test(`${component.slug} renders documented previews`, async ({ page }) => {
    await openComponentPage(page, component.slug);
    await expect(getPreviews(page).first()).toBeVisible();
  });
}

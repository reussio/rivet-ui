import { expect, test } from "@playwright/test";

import { componentAuditMatrix } from "../../quality/component-audit-matrix";
import { getPreviews, openComponentPage, type ThemeName } from "../helpers/docs";

const themes = ["dark", "light"] as const satisfies readonly ThemeName[];

test.describe.configure({ mode: "parallel" });

for (const component of componentAuditMatrix) {
  for (const theme of themes) {
    test(`${component.slug} renders every preview in ${theme}`, async ({ page }) => {
      await openComponentPage(page, component.slug, theme);
      const previews = getPreviews(page);
      const previewCount = await previews.count();

      expect(previewCount, `${component.slug} must expose at least one preview`).toBeGreaterThan(0);

      for (let index = 0; index < previewCount; index += 1) {
        const preview = previews.nth(index);
        await preview.scrollIntoViewIfNeeded();
        await expect(preview).toHaveScreenshot(
          `${component.slug}-${theme}-preview-${String(index + 1).padStart(2, "0")}.png`,
        );
      }
    });
  }
}

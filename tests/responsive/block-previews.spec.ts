import { expect, test } from "@playwright/test";

import { getBlockPreview, openBlockPage } from "../helpers/docs";
import { findUncontainedOverflow, getPageOverflow } from "../helpers/responsive";

const blocks = ["authentication", "command-dashboard", "deployment-list", "settings-form"] as const;
const mobileViewports = [
  { height: 800, name: "320px", width: 320 },
  { height: 812, name: "375px", width: 375 },
] as const;

test.describe.configure({ mode: "parallel", timeout: 90_000 });

for (const block of blocks) {
  for (const viewport of mobileViewports) {
    test(`${block} block fits ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await openBlockPage(page, block, "light");
      const preview = getBlockPreview(page);

      expect((await getPageOverflow(page)).maxScrollX).toBeLessThanOrEqual(1);
      expect(await findUncontainedOverflow(preview)).toEqual([]);
      await expect(preview).toHaveScreenshot(`${block}-${viewport.name}.png`);
    });
  }
}

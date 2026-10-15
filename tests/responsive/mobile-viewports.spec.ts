import { expect, test } from "@playwright/test";

import { componentAuditMatrix } from "../../quality/component-audit-matrix";
import { getPreviews, openComponentPage } from "../helpers/docs";
import { findUndersizedPrimaryTargets, getPageOverflow } from "../helpers/responsive";

const mobileViewports = [
  { height: 800, name: "320px", width: 320 },
  { height: 812, name: "375px", width: 375 },
] as const;

test.describe.configure({ mode: "parallel", timeout: 90_000 });

for (const component of componentAuditMatrix) {
  test(`${component.slug} works at mobile viewport widths`, async ({ page }) => {
    for (const [index, viewport] of mobileViewports.entries()) {
      await page.setViewportSize(viewport);
      if (index === 0) {
        await openComponentPage(page, component.slug, "light");
      } else {
        await page.evaluate(() => new Promise(requestAnimationFrame));
      }

      const dimensions = await getPageOverflow(page);
      expect(
        dimensions.maxScrollX,
        `${component.slug} can scroll horizontally (${dimensions.scrollWidth}px document in a ${dimensions.clientWidth}px viewport)`,
      ).toBeLessThanOrEqual(1);

      if (viewport.width === 320) {
        expect(await findUndersizedPrimaryTargets(getPreviews(page))).toEqual([]);
      }
    }
  });
}

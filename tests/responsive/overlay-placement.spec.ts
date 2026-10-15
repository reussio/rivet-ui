import { expect, test } from "@playwright/test";

import { openComponentPage } from "../helpers/docs";
import { openOverlay, overlayCases } from "../helpers/overlay-cases";

const mobileViewports = [
  { height: 800, name: "320px", width: 320 },
  { height: 812, name: "375px", width: 375 },
] as const;

test.describe.configure({ mode: "parallel" });

for (const overlayCase of overlayCases) {
  for (const viewport of mobileViewports) {
    test(`${overlayCase.slug} keeps ${overlayCase.name} inside ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await openComponentPage(page, overlayCase.slug, "light");
      const content = await openOverlay(page, overlayCase);
      const bounds = await content.boundingBox();

      expect(bounds).not.toBeNull();
      expect(bounds?.x ?? -1).toBeGreaterThanOrEqual(0);
      expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(viewport.width);
      expect(bounds?.y ?? -1).toBeGreaterThanOrEqual(0);
      expect((bounds?.y ?? 0) + (bounds?.height ?? 0)).toBeLessThanOrEqual(viewport.height);

      await expect(content).toHaveScreenshot(
        `${overlayCase.slug}-${overlayCase.name}-${viewport.name}-open.png`,
      );
    });
  }
}

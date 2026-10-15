import { expect, test } from "@playwright/test";

import { openComponentPage, type ThemeName } from "../helpers/docs";
import { openOverlay, overlayCases } from "../helpers/overlay-cases";

const themes = ["dark", "light"] as const satisfies readonly ThemeName[];

test.describe.configure({ mode: "parallel" });

for (const overlayCase of overlayCases) {
  for (const theme of themes) {
    test(`${overlayCase.slug} captures ${overlayCase.name} open in ${theme}`, async ({ page }) => {
      await openComponentPage(page, overlayCase.slug, theme);
      const content = await openOverlay(page, overlayCase);

      await expect(content).toHaveScreenshot(
        `${overlayCase.slug}-${overlayCase.name}-${theme}-open.png`,
      );
    });
  }
}

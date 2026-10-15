import { expect, test } from "@playwright/test";

import { getBlockPreview, openBlockPage, type ThemeName } from "../helpers/docs";

const blocks = ["authentication", "command-dashboard", "deployment-list", "settings-form"] as const;
const themes = ["dark", "light"] as const satisfies readonly ThemeName[];

test.describe.configure({ mode: "parallel" });

for (const block of blocks) {
  for (const theme of themes) {
    test(`${block} block renders in ${theme}`, async ({ page }) => {
      await openBlockPage(page, block, theme);
      await expect(getBlockPreview(page)).toHaveScreenshot(`${block}-${theme}.png`);
    });
  }
}

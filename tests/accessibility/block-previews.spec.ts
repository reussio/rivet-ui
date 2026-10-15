import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { openBlockPage, type ThemeName } from "../helpers/docs";

const blocks = ["authentication", "command-dashboard", "deployment-list", "settings-form"] as const;
const themes = ["dark", "light"] as const satisfies readonly ThemeName[];

test.describe.configure({ mode: "parallel" });

for (const block of blocks) {
  for (const theme of themes) {
    test(`${block} block has no serious preview violations in ${theme}`, async ({ page }) => {
      await openBlockPage(page, block, theme);
      const results = await new AxeBuilder({ page })
        .include('[data-slot="block-preview"]')
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const blockingViolations = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );

      expect(blockingViolations).toEqual([]);
    });
  }
}

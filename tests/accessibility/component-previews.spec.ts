import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { componentAuditMatrix } from "../../quality/component-audit-matrix";
import { knownPreviewAccessibilityIssues } from "../../quality/known-accessibility-issues";
import { getPreviews, openComponentPage, type ThemeName } from "../helpers/docs";

const themes = ["dark", "light"] as const satisfies readonly ThemeName[];
const blockingImpacts = new Set(["critical", "serious"]);

test.describe.configure({ mode: "parallel" });

for (const component of componentAuditMatrix) {
  for (const theme of themes) {
    test(`${component.slug} has no new serious preview violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await openComponentPage(page, component.slug, theme);
      const previews = getPreviews(page);
      const previewCount = await previews.count();
      const blockingViolations = [];

      for (let index = 0; index < previewCount; index += 1) {
        const auditId = `${component.slug}-${index}`;
        await previews.nth(index).evaluate((element, value) => {
          element.setAttribute("data-audit-preview", value);
        }, auditId);

        const results = await new AxeBuilder({ page })
          .include(`[data-audit-preview="${auditId}"]`)
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();

        blockingViolations.push(
          ...results.violations.filter((violation) => blockingImpacts.has(violation.impact ?? "")),
        );
      }

      const scope = `${component.slug}:${theme}` as keyof typeof knownPreviewAccessibilityIssues;
      const knownRuleIds = new Set<string>(knownPreviewAccessibilityIssues[scope] ?? []);
      const observedRuleIds = new Set(blockingViolations.map((violation) => violation.id));
      const unexpectedViolations = blockingViolations.filter(
        (violation) => !knownRuleIds.has(violation.id),
      );
      const staleKnownRules = [...knownRuleIds].filter((ruleId) => !observedRuleIds.has(ruleId));

      if (blockingViolations.length > 0) {
        await testInfo.attach("axe-violations-including-known", {
          body: JSON.stringify(blockingViolations, null, 2),
          contentType: "application/json",
        });
      }

      expect({ staleKnownRules, unexpectedViolations }).toEqual({
        staleKnownRules: [],
        unexpectedViolations: [],
      });
    });
  }
}

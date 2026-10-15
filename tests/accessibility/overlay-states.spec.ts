import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { knownOverlayAccessibilityIssues } from "../../quality/known-accessibility-issues";
import { openComponentPage } from "../helpers/docs";
import { openOverlay, overlayCases } from "../helpers/overlay-cases";

const blockingImpacts = new Set(["critical", "serious"]);

test.describe.configure({ mode: "parallel" });

for (const overlayCase of overlayCases) {
  test(`${overlayCase.slug} open state has no new serious violations`, async ({
    page,
  }, testInfo) => {
    await openComponentPage(page, overlayCase.slug);
    await openOverlay(page, overlayCase);

    const results = await new AxeBuilder({ page }).include(overlayCase.contentSelector).analyze();
    const blockingViolations = results.violations.filter((violation) =>
      blockingImpacts.has(violation.impact ?? ""),
    );
    const scope =
      `${overlayCase.slug}:${overlayCase.name}` as keyof typeof knownOverlayAccessibilityIssues;
    const knownRuleIds = new Set<string>(knownOverlayAccessibilityIssues[scope] ?? []);
    const observedRuleIds = new Set(blockingViolations.map((violation) => violation.id));
    const unexpectedViolations = blockingViolations.filter(
      (violation) => !knownRuleIds.has(violation.id),
    );
    const staleKnownRules = [...knownRuleIds].filter((ruleId) => !observedRuleIds.has(ruleId));

    if (blockingViolations.length > 0) {
      await testInfo.attach("axe-violations", {
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

import { expect, test } from "@playwright/test";

import { componentAuditMatrix } from "../../quality/component-audit-matrix";
import { getPreviews, openComponentPage } from "../helpers/docs";
import { constrainPreview, findUncontainedOverflow } from "../helpers/responsive";

const containerWidths = [280, 400] as const;

test.describe.configure({ mode: "parallel", timeout: 90_000 });

for (const component of componentAuditMatrix) {
  test(`${component.slug} fits isolated narrow containers`, async ({ page }) => {
    await openComponentPage(page, component.slug, "light");
    const previews = getPreviews(page);
    const previewCount = await previews.count();

    for (const width of containerWidths) {
      for (let index = 0; index < previewCount; index += 1) {
        const preview = previews.nth(index);
        await constrainPreview(preview, width);
        await preview.scrollIntoViewIfNeeded();

        expect(
          await findUncontainedOverflow(preview),
          `${component.slug} preview ${index + 1} escapes its ${width}px container`,
        ).toEqual([]);

        await expect(preview).toHaveScreenshot(
          `${component.slug}-container-${width}-preview-${String(index + 1).padStart(2, "0")}.png`,
        );
      }
    }
  });
}

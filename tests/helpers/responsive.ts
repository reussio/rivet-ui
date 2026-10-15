import type { Locator, Page } from "@playwright/test";

type OverflowFinding = {
  element: string;
  left: number;
  right: number;
  rootLeft: number;
  rootRight: number;
};

type UndersizedTarget = {
  element: string;
  height: number;
  width: number;
};

async function constrainPreview(preview: Locator, width: number) {
  await preview.evaluate((element, constrainedWidth) => {
    const htmlElement = element as HTMLElement;
    const reviewGutter = 32;
    htmlElement.style.width = `${constrainedWidth + reviewGutter}px`;
    htmlElement.style.maxWidth = `${constrainedWidth + reviewGutter}px`;
    htmlElement.style.minWidth = "0";
    htmlElement.style.marginInline = "0";
    htmlElement.style.padding = "16px";
  }, width);
}

async function findUncontainedOverflow(root: Locator): Promise<OverflowFinding[]> {
  return root.evaluate((rootElement) => {
    const rootRect = rootElement.getBoundingClientRect();
    const tolerance = 1;

    function hasOverflowBoundary(element: Element) {
      let current = element.parentElement;

      while (current && current !== rootElement) {
        const style = getComputedStyle(current);
        if (
          [style.overflowX, style.overflow].some((value) => /(auto|scroll|hidden|clip)/.test(value))
        ) {
          return true;
        }
        current = current.parentElement;
      }

      return false;
    }

    return [...rootElement.querySelectorAll("*")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const outside =
          rect.left < rootRect.left - tolerance || rect.right > rootRect.right + tolerance;

        return (
          outside &&
          rect.width > 0 &&
          rect.height > 0 &&
          style.position !== "fixed" &&
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          !hasOverflowBoundary(element)
        );
      })
      .slice(0, 12)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const htmlElement = element as HTMLElement;
        const identifier =
          htmlElement.dataset.slot ?? element.getAttribute("role") ?? element.tagName.toLowerCase();

        return {
          element: identifier,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          rootLeft: Math.round(rootRect.left),
          rootRight: Math.round(rootRect.right),
        };
      });
  });
}

async function getPageOverflow(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const initialScrollX = window.scrollX;
    window.scrollTo({ left: root.scrollWidth, behavior: "instant" });
    const maxScrollX = window.scrollX;
    window.scrollTo({ left: initialScrollX, behavior: "instant" });

    return {
      clientWidth: root.clientWidth,
      maxScrollX,
      scrollWidth: Math.max(root.scrollWidth, document.body.scrollWidth),
    };
  });
}

async function findUndersizedPrimaryTargets(
  root: Locator,
  minimumSize = 24,
): Promise<UndersizedTarget[]> {
  // Compact checkbox, radio, switch, and slider visuals expose their hit area through a wrapping
  // label or an expanded pseudo-element. This guard targets controls whose rendered box is the
  // complete pointer target; their compact counterparts remain covered by interaction tests.
  const controls = root.locator(
    [
      "button",
      "select",
      "textarea",
      'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="range"])',
    ].join(","),
  );

  return controls.evaluateAll(
    (elements, requiredSize) =>
      elements.flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const isVisible =
          rect.width > 1 &&
          rect.height > 1 &&
          style.display !== "none" &&
          style.visibility !== "hidden";

        if (!isVisible || (rect.width >= requiredSize && rect.height >= requiredSize)) {
          return [];
        }

        return [
          {
            element:
              element.getAttribute("data-slot") ??
              element.getAttribute("aria-label") ??
              element.tagName.toLowerCase(),
            height: Math.round(rect.height),
            width: Math.round(rect.width),
          },
        ];
      }),
    minimumSize,
  );
}

export type { OverflowFinding, UndersizedTarget };
export { constrainPreview, findUncontainedOverflow, findUndersizedPrimaryTargets, getPageOverflow };

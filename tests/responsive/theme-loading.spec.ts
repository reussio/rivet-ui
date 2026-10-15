import { expect, type Page, test } from "@playwright/test";

type ThemeFrame = {
  colorScheme: string;
  dark: boolean;
};

declare global {
  interface Window {
    __rivetThemeFrames?: ThemeFrame[];
  }
}

async function recordInitialThemeFrames(page: Page, theme?: "dark" | "light") {
  await page.addInitScript((storedTheme) => {
    if (storedTheme) {
      window.localStorage.setItem("rivet-ui:theme", storedTheme);
    } else {
      window.localStorage.removeItem("rivet-ui:theme");
    }

    window.__rivetThemeFrames = [];

    function sampleTheme() {
      window.__rivetThemeFrames?.push({
        colorScheme: document.documentElement.style.colorScheme,
        dark: document.documentElement.classList.contains("dark"),
      });

      if ((window.__rivetThemeFrames?.length ?? 0) < 3) {
        window.requestAnimationFrame(sampleTheme);
      }
    }

    window.requestAnimationFrame(sampleTheme);
  }, theme);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect.poll(() => page.evaluate(() => window.__rivetThemeFrames?.length ?? 0)).toBe(3);

  return page.evaluate(() => window.__rivetThemeFrames ?? []);
}

test("applies the dark default before the first rendered frame", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });

  await expect(recordInitialThemeFrames(page)).resolves.toEqual([
    { colorScheme: "dark", dark: true },
    { colorScheme: "dark", dark: true },
    { colorScheme: "dark", dark: true },
  ]);
});

test("applies a stored light preference before the first rendered frame", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });

  await expect(recordInitialThemeFrames(page, "light")).resolves.toEqual([
    { colorScheme: "light", dark: false },
    { colorScheme: "light", dark: false },
    { colorScheme: "light", dark: false },
  ]);
});

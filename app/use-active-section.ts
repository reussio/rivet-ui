"use client";

import * as React from "react";

type ActiveSection = {
  readonly id: string;
};

function useActiveSection(sections: readonly ActiveSection[]) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");

  React.useEffect(() => {
    let animationFrame: number | undefined;

    function updateActiveSection() {
      const marker = Math.min(window.innerHeight * 0.25, 192);
      let nextActiveId = sections[0]?.id ?? "";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (element && element.getBoundingClientRect().top <= marker) {
          nextActiveId = section.id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        nextActiveId = sections.at(-1)?.id ?? nextActiveId;
      }

      setActiveId((currentId) => (currentId === nextActiveId ? currentId : nextActiveId));
    }

    function scheduleUpdate() {
      if (animationFrame !== undefined) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined;
        updateActiveSection();
      });
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [sections]);

  return [activeId, setActiveId] as const;
}

export { useActiveSection };

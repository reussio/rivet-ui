"use client";

import { useActiveSection } from "@/app/use-active-section";
import { cn } from "@/lib/utils";

const componentSections = [
  { id: "preview", label: "Preview", compactLabel: "Preview" },
  { id: "installation", label: "Installation", compactLabel: "Installation" },
  { id: "usage", label: "Usage", compactLabel: "Usage" },
  { id: "api-reference", label: "API reference", compactLabel: "API" },
] as const;

type PageSection = {
  readonly id: string;
  readonly label: string;
  readonly compactLabel?: string;
};

type OnThisPageProps = {
  variant?: "desktop" | "mobile";
  sections?: readonly PageSection[];
};

function OnThisPage({ variant = "desktop", sections = componentSections }: OnThisPageProps) {
  const [activeId, setActiveId] = useActiveSection(sections);

  if (variant === "mobile") {
    return (
      <nav
        className="flex gap-5 overflow-x-auto font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="On this page"
      >
        {sections.map((section) => {
          const active = activeId === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active ? "location" : undefined}
              onClick={() => setActiveId(section.id)}
              className={cn(
                "shrink-0 border-b py-0.5 transition-colors",
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent hover:text-foreground",
              )}
            >
              {section.compactLabel ?? section.label}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="mt-5 grid text-sm" aria-label="On this page">
      {sections.map((section) => {
        const active = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active ? "location" : undefined}
            onClick={() => setActiveId(section.id)}
            className={cn(
              "border-l py-1.5 pl-3 transition-colors",
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}

export { OnThisPage };

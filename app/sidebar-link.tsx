"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

function SidebarLink({
  active: activeOverride,
  href,
  children,
}: {
  active?: boolean;
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const path = href.split("#", 1)[0] || "/";
  const active = activeOverride ?? (href.includes("#") ? false : pathname === path);
  const current = activeOverride === undefined ? "page" : "location";

  React.useEffect(() => {
    if (!active) {
      return;
    }

    const link = linkRef.current;
    const scrollContainer = link?.closest<HTMLElement>("[data-slot='docs-sidebar-scroll']");

    if (!link || !scrollContainer) {
      return;
    }

    const linkRect = link.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();

    if (linkRect.top < containerRect.top) {
      scrollContainer.scrollTop -= containerRect.top - linkRect.top;
    } else if (linkRect.bottom > containerRect.bottom) {
      scrollContainer.scrollTop += linkRect.bottom - containerRect.bottom;
    }
  }, [active]);

  return (
    <Link
      ref={linkRef}
      href={href}
      aria-current={active ? current : undefined}
      className={`relative border-l px-3 py-1.5 outline-none transition-colors hover:border-foreground/50 hover:bg-muted/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 ${
        active
          ? "border-foreground bg-muted/50 font-medium text-foreground"
          : "border-transparent text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export { SidebarLink };

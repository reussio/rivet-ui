"use client";

import { usePathname } from "next/navigation";

import { homeSections } from "@/app/docs-structure";
import { SidebarLink } from "@/app/sidebar-link";
import { useActiveSection } from "@/app/use-active-section";

const gettingStartedLinks = [
  { href: "/", id: "introduction", label: "Introduction" },
  { href: "/#quick-start", id: "quick-start", label: "Quick start" },
  { href: "/#principles", id: "principles", label: "Principles" },
] as const;

function HomeSidebarLinks() {
  const pathname = usePathname();
  const [activeId] = useActiveSection(homeSections);
  const onHomePage = pathname === "/";

  return gettingStartedLinks.map((link) => (
    <SidebarLink key={link.id} href={link.href} active={onHomePage && activeId === link.id}>
      {link.label}
    </SidebarLink>
  ));
}

export { HomeSidebarLinks };

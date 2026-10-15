"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/registry/rivetui/components/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/rivetui/components/dropdown-menu/dropdown-menu";

type DocsHeaderSection = "blocks" | "changelog" | "docs";

const navigationItems = [
  { href: "/", label: "Docs", section: "docs" },
  { href: "/blocks", label: "Blocks", section: "blocks" },
  { href: "/changelog", label: "Changelog", section: "changelog" },
  { href: "/r/registry.json", label: "Registry" },
] as const;

export function MobileDocsNavigation({ active }: { active: DocsHeaderSection }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="size-9 text-muted-foreground hover:text-foreground md:hidden"
          />
        }
        aria-label="Open navigation"
      >
        <Menu className="size-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 md:hidden">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          {navigationItems.map((item) => {
            const isActive = "section" in item && item.section === active;

            return (
              <DropdownMenuItem
                key={item.href}
                render={<Link href={item.href} />}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "bg-accent text-accent-foreground" : undefined}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <span className="ml-auto font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Current
                  </span>
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

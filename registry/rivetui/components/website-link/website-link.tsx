"use client";

import { ExternalLink, Globe2, Link2, Mail, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

type WebsiteLinkProps = Omit<React.ComponentProps<"a">, "children" | "href" | "title"> & {
  href: string;
  title?: string;
};

function WebsiteLink({ href, title, className, rel, target, ...props }: WebsiteLinkProps) {
  const { faviconUrl, fallbackTitle, kind } = getLinkIdentity(href);
  const FallbackIcon = getFallbackIcon(kind);

  return (
    <a
      data-slot="website-link"
      data-kind={kind}
      href={href}
      target={target}
      rel={getLinkRel(rel, target)}
      className={cn(
        "group inline-flex h-7 max-w-full items-center gap-1.5 border border-border bg-muted/20 px-1.5 align-middle text-sm font-medium leading-none text-foreground no-underline outline-none transition-[background-color,border-color,box-shadow] duration-100 hover:border-foreground/30 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <span
        data-slot="website-link-leading-icon"
        className="relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden text-muted-foreground"
      >
        <FallbackIcon className="size-3" aria-hidden="true" />
        {faviconUrl ? (
          // biome-ignore lint/performance/noImgElement: Favicons are arbitrary external resources in this framework-agnostic registry component.
          <img
            key={faviconUrl}
            src={faviconUrl}
            alt=""
            aria-hidden="true"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 size-full bg-background object-cover"
            onLoad={(event) => {
              event.currentTarget.hidden = false;
            }}
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        ) : null}
      </span>
      <span data-slot="website-link-title" className="truncate">
        {title ?? fallbackTitle}
      </span>
      {kind === "website" ? (
        <ExternalLink
          data-slot="website-link-icon"
          className="size-3.5 shrink-0 text-muted-foreground transition-colors duration-100 group-hover:text-foreground motion-reduce:transition-none"
          aria-hidden="true"
        />
      ) : null}
      {target === "_blank" ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function getLinkRel(rel: string | undefined, target: React.HTMLAttributeAnchorTarget | undefined) {
  if (target !== "_blank") {
    return rel;
  }

  const values = new Set(rel?.split(/\s+/).filter(Boolean));
  values.add("noopener");
  values.add("noreferrer");

  return Array.from(values).join(" ");
}

type WebsiteLinkKind = "email" | "link" | "phone" | "website";

function getFallbackIcon(kind: WebsiteLinkKind) {
  if (kind === "email") {
    return Mail;
  }

  if (kind === "phone") {
    return Phone;
  }

  if (kind === "website") {
    return Globe2;
  }

  return Link2;
}

function getLinkIdentity(href: string): {
  fallbackTitle: string;
  faviconUrl: string | null;
  kind: WebsiteLinkKind;
} {
  try {
    const url = new URL(href);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return {
        faviconUrl: new URL("/favicon.ico", url.origin).toString(),
        fallbackTitle: url.hostname.replace(/^www\./, ""),
        kind: "website",
      };
    }

    if (url.protocol === "mailto:") {
      return {
        faviconUrl: null,
        fallbackTitle: decodeURIComponent(url.pathname),
        kind: "email",
      };
    }

    if (url.protocol === "tel:") {
      return {
        faviconUrl: null,
        fallbackTitle: decodeURIComponent(url.pathname),
        kind: "phone",
      };
    }

    return {
      faviconUrl: null,
      fallbackTitle: href,
      kind: "link",
    };
  } catch {
    return { faviconUrl: null, fallbackTitle: href, kind: "link" };
  }
}

export type { WebsiteLinkProps };
export { WebsiteLink };

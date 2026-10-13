"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink, Globe2, Link2, Mail, Phone } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const websiteLinkVariants = cva(
  "group/website-link inline-flex max-w-full items-center border border-border bg-muted/20 align-middle font-medium leading-none text-foreground no-underline outline-none transition-[background-color,border-color,box-shadow] duration-100 hover:border-foreground/30 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted motion-reduce:transition-none",
  {
    variants: {
      size: {
        sm: "h-6 gap-1 px-1 text-xs",
        md: "h-7 gap-1.5 px-1.5 text-sm",
        lg: "h-9 gap-2 px-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type WebsiteLinkProps = Omit<React.ComponentProps<"a">, "children" | "href" | "title"> &
  VariantProps<typeof websiteLinkVariants> & {
    href: string;
    title?: string;
  };

function WebsiteLink({
  href,
  title,
  size = "md",
  className,
  rel,
  target,
  ...props
}: WebsiteLinkProps) {
  const { faviconUrls, fallbackTitle, kind } = getLinkIdentity(href);
  const FallbackIcon = getFallbackIcon(kind);

  return (
    <a
      data-slot="website-link"
      data-kind={kind}
      data-size={size}
      href={href}
      target={target}
      rel={getLinkRel(rel, target)}
      className={cn(websiteLinkVariants({ size, className }))}
      {...props}
    >
      <span
        data-slot="website-link-leading-icon"
        className="relative inline-flex size-4 shrink-0 items-center justify-center overflow-hidden text-muted-foreground group-data-[size=sm]/website-link:size-3.5 group-data-[size=lg]/website-link:size-5"
      >
        <FallbackIcon
          className="size-3 group-data-[size=sm]/website-link:size-2.5 group-data-[size=lg]/website-link:size-3.5"
          aria-hidden="true"
        />
        <WebsiteLinkFavicon key={href} sources={faviconUrls} />
      </span>
      <span data-slot="website-link-title" className="truncate">
        {title ?? fallbackTitle}
      </span>
      {kind === "website" ? (
        <ExternalLink
          data-slot="website-link-icon"
          className="size-3.5 shrink-0 text-muted-foreground transition-colors duration-100 group-hover/website-link:text-foreground group-data-[size=sm]/website-link:size-3 group-data-[size=lg]/website-link:size-4 motion-reduce:transition-none"
          aria-hidden="true"
        />
      ) : null}
      {target === "_blank" ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function WebsiteLinkFavicon({ sources }: { sources: readonly string[] }) {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const source = sources[sourceIndex];

  if (!source) {
    return null;
  }

  return (
    // biome-ignore lint/performance/noImgElement: Favicons are arbitrary external resources in this framework-agnostic registry component.
    <img
      key={source}
      src={source}
      alt=""
      aria-hidden="true"
      decoding="async"
      referrerPolicy="no-referrer"
      data-loaded={loaded ? "" : undefined}
      className="absolute inset-0 size-full bg-background object-cover opacity-0 data-loaded:opacity-100"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setSourceIndex((currentIndex) => currentIndex + 1);
      }}
    />
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
  faviconUrls: readonly string[];
  kind: WebsiteLinkKind;
} {
  try {
    const url = new URL(href);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return {
        faviconUrls: ["/favicon.ico", "/favicon.svg", "/icon.svg", "/apple-touch-icon.png"].map(
          (path) => new URL(path, url.origin).toString(),
        ),
        fallbackTitle: url.hostname.replace(/^www\./, ""),
        kind: "website",
      };
    }

    if (url.protocol === "mailto:") {
      return {
        faviconUrls: [],
        fallbackTitle: decodeURIComponent(url.pathname),
        kind: "email",
      };
    }

    if (url.protocol === "tel:") {
      return {
        faviconUrls: [],
        fallbackTitle: decodeURIComponent(url.pathname),
        kind: "phone",
      };
    }

    return {
      faviconUrls: [],
      fallbackTitle: href,
      kind: "link",
    };
  } catch {
    return { faviconUrls: [], fallbackTitle: href, kind: "link" };
  }
}

export type { WebsiteLinkProps };
export { WebsiteLink, websiteLinkVariants };

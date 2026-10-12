"use client";

import { QRCodeSVG } from "qrcode.react";
import * as React from "react";

import { cn } from "@/lib/utils";

type QRCodeLogo = {
  crossOrigin?: "anonymous" | "use-credentials" | "";
  opacity?: number;
  size?: number;
  src: string;
};

type QRCodeProps = Omit<
  React.ComponentProps<typeof QRCodeSVG>,
  "bgColor" | "fgColor" | "imageSettings" | "level" | "marginSize" | "size"
> & {
  background?: string;
  foreground?: string;
  level?: "L" | "M" | "Q" | "H";
  logo?: QRCodeLogo;
  quietZone?: number;
  size?: number;
};

const QRCode = React.forwardRef<SVGSVGElement, QRCodeProps>(function QRCode(
  {
    "aria-label": ariaLabel,
    background = "#FFFFFF",
    className,
    foreground = "#000000",
    level,
    logo,
    quietZone = 4,
    size = 192,
    style,
    title,
    ...props
  },
  forwardedRef,
) {
  const logoSize = logo
    ? Math.min(logo.size ?? Math.round(size * 0.18), Math.floor(size * 0.25))
    : undefined;

  return (
    <QRCodeSVG
      ref={forwardedRef}
      data-slot="qr-code"
      role="img"
      aria-label={ariaLabel ?? title ?? "QR code"}
      bgColor={background}
      fgColor={foreground}
      level={level ?? (logo ? "H" : "M")}
      marginSize={quietZone}
      size={size}
      title={title}
      imageSettings={
        logo && logoSize
          ? {
              src: logo.src,
              width: logoSize,
              height: logoSize,
              excavate: true,
              opacity: logo.opacity,
              crossOrigin: logo.crossOrigin,
            }
          : undefined
      }
      className={cn("block shrink-0", className)}
      style={{ width: size, height: "auto", maxWidth: "100%", ...style }}
      {...props}
    />
  );
});

export type { QRCodeLogo, QRCodeProps };
export { QRCode };

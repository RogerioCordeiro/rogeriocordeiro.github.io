"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ThemeLogoProps {
  srcLogo: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export function ThemeLogo({
  srcLogo,
  width = 32,
  height = 32,
  className = "",
  alt = "Rogerio Cordeiro",
}: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`bg-muted animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  const logoSrc = srcLogo;
  const imageClassName = `${className} transition-all duration-200 ${
    isDark ? "brightness-0 invert" : ""
  }`;

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={imageClassName}
      priority={true}
    />
  );
}

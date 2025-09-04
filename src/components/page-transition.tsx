"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pages = ["/", "/apis", "/sites", "/games", "/contact"];
  const currentIndex = pages.indexOf(pathname);

  const navigateToPage = (direction: "next" | "prev") => {
    if (isTransitioning) return;

    let nextIndex;
    if (direction === "next") {
      nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    }

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(pages[nextIndex]);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          navigateToPage("next");
        } else if (e.deltaY < 0) {
          navigateToPage("prev");
        }
      }, 100);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        navigateToPage("next");
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigateToPage("prev");
      }
    };

    // Expor função global para SectionNavigation
    (window as any).navigateToSection = (index: number) => {
      if (isTransitioning || index === currentIndex) return;

      setIsTransitioning(true);
      setTimeout(() => {
        router.push(pages[index]);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 150);
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, isTransitioning, router]);

  return (
    <div
      className={`h-full transition-all duration-300 ${
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {children}
    </div>
  );
}

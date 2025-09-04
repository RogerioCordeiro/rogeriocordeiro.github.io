"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const pages = ["/", "/apis", "/sites", "/games", "/contact"];
  const currentIndex = pages.indexOf(pathname);

  const navigateToPage = (dir: "next" | "prev") => {
    if (isTransitioning) return;

    let nextIndex;
    if (dir === "next") {
      nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    }

    setDirection(dir);
    setIsTransitioning(true);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Navigate immediately but keep transition state
    router.push(pages[nextIndex]);

    // Reset transition state after animation completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(null);
    }, 600);
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = true;
        if (e.deltaY > 0) {
          navigateToPage("next");
        } else if (e.deltaY < 0) {
          navigateToPage("prev");
        }

        // Reset scrolling flag after a delay
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        isScrolling = true;
        navigateToPage("next");
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        isScrolling = true;
        navigateToPage("prev");
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    // Expor função global para SectionNavigation
    (window as any).navigateToSection = (index: number) => {
      if (isTransitioning || index === currentIndex || isScrolling) return;

      const dir = index > currentIndex ? "next" : "prev";
      isScrolling = true;
      setDirection(dir);
      setIsTransitioning(true);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      router.push(pages[index]);

      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
        isScrolling = false;
      }, 600);
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, isTransitioning, router]);

  // Reset transition state when pathname changes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setDirection(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, isTransitioning]);

  return (
    <div className="h-full w-full absolute inset-0">
      <div
        className={`h-full w-full ${
          isTransitioning
            ? direction === "next"
              ? "animate-slide-out-up"
              : "animate-slide-out-down"
            : "animate-slide-in opacity-100"
        }`}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

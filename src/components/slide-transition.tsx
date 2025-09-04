"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SlideTransitionProps {
  children: React.ReactNode[];
  className?: string;
}

export function SlideTransition({ children, className }: SlideTransitionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    },
    [currentIndex, isTransitioning]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      if (e.deltaY > 0 && currentIndex < children.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" && currentIndex < children.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, children.length, isTransitioning, goToSlide]);

  // Expose the navigation function globally for the navigation component
  useEffect(() => {
    (window as any).navigateToSection = goToSlide;
  }, [goToSlide]);

  return (
    <div className={cn("page-container", className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn("page-section", {
            active: index === currentIndex,
            prev: index === currentIndex - 1,
            next: index === currentIndex + 1,
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

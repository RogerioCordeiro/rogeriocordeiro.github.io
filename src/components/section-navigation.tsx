"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Início", path: "/", index: 0 },
  { id: "apis", label: "APIs", path: "/apis", index: 1 },
  { id: "sites", label: "Sites", path: "/sites", index: 2 },
  { id: "games", label: "Jogos", path: "/games", index: 3 },
  { id: "contact", label: "Contato", path: "/contact", index: 4 },
];

export function SectionNavigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const currentSection = sections.find(
      (section) => section.path === pathname
    );
    if (currentSection) {
      setActiveSection(currentSection.index);
    }
  }, [pathname]);

  const scrollToSection = (index: number) => {
    if ((window as any).navigateToSection) {
      (window as any).navigateToSection(index);
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 z-50 -translate-y-1/2 space-y-3">
      {sections.map(({ id, label, index }) => (
        <button
          key={id}
          onClick={() => scrollToSection(index)}
          className={cn(
            "group relative block h-3 w-3 rounded-full border-2 transition-all duration-300",
            activeSection === index
              ? "border-primary bg-primary scale-125 glow-effect"
              : "border-muted-foreground/30 bg-transparent hover:border-primary/50 hover:scale-110"
          )}
          aria-label={`Ir para ${label}`}
        >
          <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded backdrop-elegant px-3 py-2 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

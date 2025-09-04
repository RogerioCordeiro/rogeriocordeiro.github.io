"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Início", index: 0 },
  { id: "apis", label: "APIs", index: 1 },
  { id: "sites", label: "Sites", index: 2 },
  { id: "games", label: "Jogos", index: 3 },
  { id: "contact", label: "Contato", index: 4 },
];

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (index: number) => {
    if ((window as any).navigateToSection) {
      (window as any).navigateToSection(index);
      setActiveSection(index);
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

"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Início" },
  { id: "apis", label: "APIs" },
  { id: "sites", label: "Sites" },
  { id: "games", label: "Jogos" },
  { id: "contact", label: "Contato" },
]

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed right-6 top-1/2 z-50 -translate-y-1/2 space-y-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            "group relative block h-3 w-3 rounded-full border-2 transition-all duration-300",
            activeSection === id
              ? "border-primary bg-primary scale-125"
              : "border-muted-foreground/30 bg-transparent hover:border-primary/50 hover:scale-110",
          )}
          aria-label={`Ir para ${label}`}
        >
          <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-background/90 px-2 py-1 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm border">
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}

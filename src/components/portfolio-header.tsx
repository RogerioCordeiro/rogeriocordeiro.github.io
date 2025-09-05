"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export function PortfolioHeader() {
  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full">
            <Image
              src="/logoRo.svg"
              alt="Rogerio Cordeiro"
              width={32}
              height={32}
            />
          </div>
          <span className="text-lg font-semibold">Rogerio Cordeiro</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#sobre"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sobre
          </a>
          <a
            href="#apis"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            APIs
          </a>
          <a
            href="#sites"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sites
          </a>
          <a
            href="#jogos"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Jogos
          </a>
          <a
            href="#contato"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:contato@exemplo.com">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

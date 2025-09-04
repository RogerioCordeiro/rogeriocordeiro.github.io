import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PortfolioHeader } from "@/components/portfolio-header";
import { SectionNavigation } from "@/components/section-navigation";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Portfolio | Desenvolvedor Fullstack",
  description:
    "Portfolio profissional de desenvolvedor fullstack especializado em backend, APIs REST, desenvolvimento web e jogos.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen overflow-hidden">
        <ThemeProvider>
          <div className="h-screen flex flex-col">
            <PortfolioHeader />
            <div className="flex-1 relative">
              <PageTransition>{children}</PageTransition>
            </div>
            <SectionNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

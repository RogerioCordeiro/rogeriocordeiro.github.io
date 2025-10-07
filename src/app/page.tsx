import { PortfolioHeader } from "@/components/portfolio-header";
import { HeroSection } from "@/components/hero-section";
import { ApisSection } from "@/components/apis-section";
import { SitesSection } from "@/components/sites-section";
import { GamesSection } from "@/components/games-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PortfolioHeader />
      <main>
        <HeroSection />
        <ApisSection />
        <SitesSection />
        <GamesSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer className="border-t bg-background">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-6 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2024 Portfolio Desenvolvedor. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

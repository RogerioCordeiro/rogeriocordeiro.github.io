import { PortfolioHeader } from "@/components/portfolio-header";
import { HeroSection } from "@/components/hero-section";
import { ApisSection } from "@/components/apis-section";
import { SitesSection } from "@/components/sites-section";
import { GamesSection } from "@/components/games-section";
import { ContactSection } from "@/components/contact-section";
import { SectionNavigation } from "@/components/section-navigation";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <PortfolioHeader />

      <main className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar">
        <section
          id="hero"
          className="min-h-full snap-start snap-always flex items-center justify-center"
        >
          <HeroSection />
        </section>

        <section
          id="apis"
          className="min-h-full snap-start snap-always flex items-center justify-center"
        >
          <ApisSection />
        </section>

        <section
          id="sites"
          className="min-h-full snap-start snap-always flex items-center justify-center"
        >
          <SitesSection />
        </section>

        <section
          id="games"
          className="min-h-full snap-start snap-always flex items-center justify-center"
        >
          <GamesSection />
        </section>

        <section
          id="contact"
          className="min-h-full snap-start snap-always flex items-center justify-center"
        >
          <ContactSection />
        </section>
      </main>

      <SectionNavigation />
    </div>
  );
}

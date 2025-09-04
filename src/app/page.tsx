import { PortfolioHeader } from "@/components/portfolio-header";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <PortfolioHeader />

      <main className="h-[calc(100vh-4rem)] overflow-y-auto">
        <section className="min-h-full flex items-center justify-center">
          <HeroSection />
        </section>
      </main>
    </div>
  );
}

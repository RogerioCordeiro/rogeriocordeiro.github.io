import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Database, Server } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="sobre"
      className="min-h-screen flex justify-center items-center relative py-20 md:py-28 bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Server className="h-4 w-4" />
              <span>Desenvolvedor Fullstack</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Especialista em
              <span className="text-primary"> Backend</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl text-pretty">
              Desenvolvedor fullstack com foco em arquiteturas robustas de
              backend, APIs REST escaláveis e soluções web completas. Transformo
              ideias em sistemas funcionais e eficientes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <Code className="h-4 w-4 text-primary" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <Database className="h-4 w-4 text-primary" />
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <Database className="h-4 w-4 text-primary" />
              <span>Prisma</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <Server className="h-4 w-4 text-primary" />
              <span>Docker</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base">
              Ver Projetos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base bg-transparent"
            >
              Entrar em Contato
            </Button>
          </div>

          <div className="pt-8 animate-bounce items">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}

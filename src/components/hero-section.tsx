import { Button } from "@/components/ui/button";

const CodeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </svg>
);

const ServerIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);

export function HeroSection() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <ServerIcon />
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
              <CodeIcon />
              <span>Node.js</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <DatabaseIcon />
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm">
              <ServerIcon />
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
        </div>
      </div>
    </div>
  );
}

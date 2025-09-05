import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export function ApisSection() {
  const apis = [
    {
      title: "E-commerce API",
      description:
        "API REST completa para sistema de e-commerce com autenticação JWT, pagamentos e gestão de produtos.",
      technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Stripe"],
      gifUrl: "/api-rest-e-commerce-code-demo.jpg",
      githubUrl: "#",
      docsUrl: "#",
    },
    {
      title: "Social Media API",
      description:
        "Backend para rede social com sistema de posts, comentários, likes e notificações em tempo real.",
      technologies: ["Node.js", "Socket.io", "MongoDB", "Redis", "AWS S3"],
      gifUrl: "/social-media-api-endpoints-demo.jpg",
      githubUrl: "#",
      docsUrl: "#",
    },
    {
      title: "Task Management API",
      description:
        "Sistema de gerenciamento de tarefas com colaboração em equipe, notificações e relatórios.",
      technologies: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Docker"],
      gifUrl: "/task-management-api-code-showcase.jpg",
      githubUrl: "#",
      docsUrl: "#",
    },
  ];

  return (
    <section id="apis" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            APIs REST
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
            Desenvolvimento de APIs robustas e escaláveis com documentação
            completa e testes automatizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
          {apis.map((api, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 w-full max-w-sm"
            >
              <CardHeader>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={api.gifUrl || "/placeholder.svg"}
                    alt={`Demo da ${api.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl">{api.title}</CardTitle>
                <CardDescription className="text-pretty">
                  {api.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {api.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={api.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Código
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href={api.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Docs
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

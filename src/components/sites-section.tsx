import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";

export function SitesSection() {
  const sites = [
    {
      title: "Dashboard Administrativo",
      description:
        "Painel completo para gestão de usuários, relatórios e configurações do sistema.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Prisma",
        "PostgreSQL",
      ],
      videoUrl: "/admin-dashboard-navigation-video.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "E-learning Platform",
      description:
        "Plataforma de ensino online com sistema de cursos, avaliações e certificados.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
      videoUrl: "/e-learning-platform-demo-video.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Corporativo",
      description:
        "Site institucional responsivo com CMS personalizado e otimização SEO.",
      technologies: ["Next.js", "Sanity CMS", "Vercel", "TypeScript"],
      videoUrl: "/corporate-portfolio-website-demo.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="sites" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Desenvolvimento Web
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
            Criação de aplicações web completas, desde o frontend responsivo até
            a arquitetura backend robusta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
          {sites.map((site, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 w-full max-w-sm"
            >
              <CardHeader>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                  <img
                    src={site.videoUrl || "/placeholder.svg"}
                    alt={`Demo do ${site.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{site.title}</CardTitle>
                <CardDescription className="text-pretty">
                  {site.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {site.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a
                      href={site.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Site
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={site.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Código
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

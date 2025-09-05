import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Play } from "lucide-react";

export function GamesSection() {
  const games = [
    {
      title: "RPG Adventure",
      description:
        "Jogo de RPG 2D com sistema de combate por turnos, inventário e progressão de personagem.",
      technologies: ["Unity", "C#", "SQLite", "Photon"],
      trailerUrl: "/rpg-game-trailer-gameplay.jpg",
      playUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Puzzle Platformer",
      description:
        "Jogo de plataforma com mecânicas de puzzle e física realista usando motor personalizado.",
      technologies: [
        "JavaScript",
        "Canvas API",
        "Web Audio API",
        "LocalStorage",
      ],
      trailerUrl: "/puzzle-platformer-game-trailer.jpg",
      playUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Multiplayer Racing",
      description:
        "Jogo de corrida multiplayer em tempo real com sistema de ranking e customização.",
      technologies: ["Node.js", "Socket.io", "Three.js", "WebGL"],
      trailerUrl: "/multiplayer-racing-game-trailer.jpg",
      playUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="jogos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Desenvolvimento de Jogos
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pretty">
            Criação de jogos desde conceito até implementação, com foco em
            gameplay envolvente e código otimizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
          {games.map((game, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 w-full max-w-sm"
            >
              <CardHeader>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                  <img
                    src={game.trailerUrl || "/placeholder.svg"}
                    alt={`Trailer do ${game.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/50 text-white">Trailer</Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{game.title}</CardTitle>
                <CardDescription className="text-pretty">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {game.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a
                      href={game.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Jogar
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={game.githubUrl}
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

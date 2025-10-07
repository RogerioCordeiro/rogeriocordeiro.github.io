"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ChevronRight,
  Code,
  Database,
  Server,
  Globe,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { CurriculumVisualizer } from "./curriculum-visualizer";

// Componente de barra de progresso para habilidades
const SkillProgressBar = ({
  skill,
  level,
  color = "bg-primary",
}: {
  skill: string;
  level: number;
  color?: string;
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.width = `${level}%`;
        }
      }, 300);
    }
  }, [level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          ref={progressRef}
          className={`h-2.5 rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

// Componente de timeline para experiências e formação
const TimelineItem = ({
  period,
  title,
  company,
  description,
}: {
  period: string;
  title: string;
  company: string;
  description: string;
}) => {
  return (
    <div className="mb-8 flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-0.5 h-full bg-border"></div>
      </div>
      <div className="pt-1">
        <Badge variant="outline" className="mb-2">
          {period}
        </Badge>
        <h3 className="text-lg font-bold">{title}</h3>
        <h4 className="text-muted-foreground mb-2">{company}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// Componente de card 3D para projetos destacados
const ProjectCard = ({
  title,
  description,
  technologies,
}: {
  title: string;
  description: string;
  technologies: string[];
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="relative perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className="p-5 h-full transform transition-transform duration-200 ease-out bg-gradient-to-br from-card to-card/80 border-primary/10"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("skills");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // Simular download (substituir por download real do PDF)
    setTimeout(() => {
      setIsDownloading(false);
      window.open("/RogerioCordeiro_CV.pdf", "_blank");
    }, 1500);
  };

  return (
    <section
      id="curriculo"
      className="py-20 md:py-28 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>Minha Trajetória</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Currículo Interativo
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg text-pretty">
            Explore minha experiência profissional, formação e habilidades
            técnicas em um formato interativo e dinâmico.
          </p>
        </div>

        {/* Menu de navegação */}
        <div className="flex justify-center mb-12 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "skills"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            Habilidades
          </button>
          <div className="flex space-x-2 p-1 bg-muted rounded-lg">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "experience"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Experiência
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "education"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("education")}
            >
              Formação
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "projects"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Projetos
            </button>
          </div>
        </div>

        {/* Conteúdo da aba selecionada */}
        <div className="relative overflow-hidden mb-12">
          <div
            className={`transition-all duration-500 ${
              activeTab === "experience" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {activeTab === "experience" && (
              <div className="max-w-3xl mx-auto">
                <TimelineItem
                  period="AGO 2024 - PRESENTE"
                  title="Desenvolvedor Full Stack Pleno"
                  company="Conquiste 360 (WeScore)"
                  description="Liderança no desenvolvimento de APIs RESTful com NestJS que processam +30k requisições/dia com 99.9% de disponibilidade. Otimização de interfaces React com redução de 40% no tempo de carregamento."
                />
                <TimelineItem
                  period="JUL 2023 - JAN 2024"
                  title="Desenvolvedor Backend Node.js"
                  company="Compass UOL"
                  description="Desenvolvimento de APIs RESTful com Node.js e Express suportando +10k usuários simultâneos. Implementação de pipeline CI/CD com GitHub Actions reduzindo tempo de deploy de 3 horas para 20 minutos."
                />
                <TimelineItem
                  period="JUL 2021 - AGO 2023"
                  title="Desenvolvedor Full Stack"
                  company="GBTEC Consultoria (Fiat Amazonas)"
                  description="Implementação de sistema de catálogo eletrônico utilizado por 120+ concessionárias. Desenvolvimento de endpoints com .NET 7 e Node.js com resposta média 50% mais rápida que a versão anterior."
                />
              </div>
            )}
          </div>

          <div
            className={`transition-all duration-500 ${
              activeTab === "skills" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {activeTab === "skills" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Especialista</span>
                  </h3>
                  <SkillProgressBar
                    skill="Node.js"
                    level={95}
                    color="bg-emerald-500"
                  />
                  <SkillProgressBar
                    skill="TypeScript"
                    level={90}
                    color="bg-blue-500"
                  />
                  <SkillProgressBar
                    skill="NestJS"
                    level={92}
                    color="bg-red-500"
                  />
                  <SkillProgressBar
                    skill="React"
                    level={88}
                    color="bg-cyan-500"
                  />
                  <SkillProgressBar
                    skill="API RESTful"
                    level={96}
                    color="bg-indigo-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Proficiente</span>
                  </h3>
                  <SkillProgressBar
                    skill="Docker"
                    level={85}
                    color="bg-blue-500"
                  />
                  <SkillProgressBar
                    skill="CI/CD"
                    level={80}
                    color="bg-purple-500"
                  />
                  <SkillProgressBar
                    skill="SQL Server"
                    level={82}
                    color="bg-red-500"
                  />
                  <SkillProgressBar
                    skill="Redis"
                    level={75}
                    color="bg-emerald-500"
                  />
                  <SkillProgressBar
                    skill="Jest"
                    level={78}
                    color="bg-amber-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <Wrench className="h-5 w-5 text-primary" />
                    <span>Conhecimento</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "C#",
                      ".NET 7",
                      "Python",
                      "AWS",
                      "Azure",
                      "MongoDB",
                      "PostgreSQL",
                      "RabbitMQ",
                      "SOLID",
                      "Clean Code",
                      "TDD",
                      "Scrum",
                      "Kanban",
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 rounded-full bg-card px-4 py-2 text-sm border border-border/50"
                      >
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`transition-all duration-500 ${
              activeTab === "education" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {activeTab === "education" && (
              <div className="max-w-3xl mx-auto">
                <div className="mb-8 relative">
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                    <Badge variant="outline" className="mb-2">
                      JAN 2024 - JUL 2026 (Em andamento)
                    </Badge>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>Análise e Desenvolvimento de Sistemas</span>
                    </h3>
                    <p className="text-muted-foreground">SENAC SP</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Desenvolvimento de software com foco em soluções
                          empresariais
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Arquitetura de sistemas distribuídos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Metodologias ágeis e gestão de projetos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-border"></div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary"></div>
                    <Badge variant="outline" className="mb-2">
                      JAN 2008 - JUL 2012
                    </Badge>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>Bacharelado em Administração</span>
                    </h3>
                    <p className="text-muted-foreground">ITALOBRASILEIRO</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Gestão estratégica e planejamento de negócios
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Administração financeira e análise de custos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`transition-all duration-500 ${
              activeTab === "projects" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {activeTab === "projects" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <ProjectCard
                  title="WeScore API Admin"
                  description="Sistema de gerenciamento com dashboard para acompanhamento de KPIs em tempo real"
                  technologies={["NestJS", "TypeScript", "Redis", "React"]}
                />
                <ProjectCard
                  title="Via-Webhook"
                  description="Plataforma de integração com parceiros processando 5.000+ webhooks diários"
                  technologies={["Node.js", "Express", "MongoDB", "Docker"]}
                />
                <ProjectCard
                  title="Lead-Data"
                  description="Sistema de processamento de leads com taxa de conversão 25% superior ao anterior"
                  technologies={["TypeScript", "NestJS", "SQL Server", "React"]}
                />
              </div>
            )}
          </div>
        </div>

        {/* Visualizador 3D de currículo */}
        <div className="w-full max-w-4xl mx-auto mt-12 mb-16 relative">
          <div className="h-96 rounded-lg bg-card/40 border border-border/50 overflow-hidden relative shadow-lg">
            <CurriculumVisualizer className="z-10" />
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-background/80 to-transparent z-20">
              <span className="text-sm font-medium">
                Visualização de Habilidades Técnicas
              </span>
              <Badge variant="outline" className="text-xs">
                Interativa
              </Badge>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Visualização dinâmica das minhas competências e níveis de
            proficiência.
          </div>
        </div>

        {/* Botão de download CV */}
        <div className="flex justify-center">
          <Button
            onClick={handleDownload}
            size="lg"
            className="text-base group"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <span className="mr-2">Baixando...</span>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                Baixar CV Completo
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

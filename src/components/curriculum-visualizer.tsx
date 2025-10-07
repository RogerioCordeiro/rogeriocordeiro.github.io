"use client";

import { useRef, useEffect } from "react";

export function CurriculumVisualizer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Função para reiniciar a animação quando o tema mudar
  const handleThemeChange = () => {
    if (canvasRef.current) {
      // Forçar recriação do canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setupCanvas();
      }
    }
  };

  // Configuração principal do canvas
  const setupCanvas = () => {
    if (!canvasRef.current) return;

    // Configurar o canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Definir tamanho do canvas
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dados do currículo
    const skillsData = [
      { name: "Node.js", value: 95 },
      { name: "TypeScript", value: 90 },
      { name: "NestJS", value: 92 },
      { name: "React", value: 88 },
      { name: "API REST", value: 96 },
      { name: "Docker", value: 85 },
      { name: "CI/CD", value: 80 },
      { name: "SQL Server", value: 82 },
    ];

    // Configurações da visualização
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Variáveis para animação
    let angle = 0;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      angle: number;
      skillIndex: number;
    }> = [];

    // Cores para as habilidades
    const colors = [
      "#3b82f6", // blue-500
      "#10b981", // emerald-500
      "#6366f1", // indigo-500
      "#8b5cf6", // violet-500
      "#ec4899", // pink-500
      "#f97316", // orange-500
      "#06b6d4", // cyan-500
      "#eab308", // yellow-500
    ];

    // Criar partículas
    for (let i = 0; i < 80; i++) {
      const skillIndex = i % skillsData.length;
      const particleAngle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius * 0.8 + radius * 0.2;

      particles.push({
        x: centerX + Math.cos(particleAngle) * dist,
        y: centerY + Math.sin(particleAngle) * dist,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        color: colors[skillIndex],
        angle: particleAngle,
        skillIndex,
      });
    }

    // Função de animação
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar gráfico circular
      angle += 0.005;

      // Desenhar linhas de grade
      ctx.beginPath();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        const r = (radius * (i + 1)) / 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Desenhar eixos
      for (let i = 0; i < skillsData.length; i++) {
        const a = (i / skillsData.length) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(a) * radius,
          centerY + Math.sin(a) * radius
        );
        ctx.stroke();
      }

      // Desenhar área de habilidades
      ctx.beginPath();
      skillsData.forEach((skill, i) => {
        const a = (i / skillsData.length) * Math.PI * 2;
        const r = (skill.value / 100) * radius;
        if (i === 0) {
          ctx.moveTo(
            centerX + Math.cos(a + angle) * r,
            centerY + Math.sin(a + angle) * r
          );
        } else {
          ctx.lineTo(
            centerX + Math.cos(a + angle) * r,
            centerY + Math.sin(a + angle) * r
          );
        }
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
      ctx.stroke();

      // Desenhar pontos de dados
      skillsData.forEach((skill, i) => {
        const a = (i / skillsData.length) * Math.PI * 2;
        const r = (skill.value / 100) * radius;

        ctx.beginPath();
        ctx.arc(
          centerX + Math.cos(a + angle) * r,
          centerY + Math.sin(a + angle) * r,
          4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        // Texto de habilidade
        ctx.font = "12px sans-serif";
        // Verificar se estamos no modo escuro ou claro e usar a cor apropriada
        const isDarkMode = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDarkMode
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 0, 0.8)";
        const textX = centerX + Math.cos(a + angle) * (r + 15);
        const textY = centerY + Math.sin(a + angle) * (r + 15);
        ctx.textAlign = "center";
        ctx.fillText(skill.name, textX, textY);
      });

      // Atualizar e desenhar partículas
      particles.forEach((p) => {
        p.angle += p.speed * 0.01;

        const skill = skillsData[p.skillIndex];
        const skillAngle =
          (p.skillIndex / skillsData.length) * Math.PI * 2 + angle;
        const r = (skill.value / 100) * radius * 0.8;

        const targetX = centerX + Math.cos(skillAngle) * r;
        const targetY = centerY + Math.sin(skillAngle) * r;

        // Movimento orbital ao redor do ponto da habilidade
        p.x = targetX + Math.cos(p.angle) * (5 + p.size * 3);
        p.y = targetY + Math.sin(p.angle) * (5 + p.size * 3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "80"; // Adiciona transparência
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  };

  useEffect(() => {
    // Inicializa o canvas
    setupCanvas();

    // Observar mudanças no tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Limpar observer quando o componente for desmontado
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}

# Portfolio Rogério Cordeiro

Portfólio pessoal desenvolvido com Next.js 15, React 19, TypeScript e Tailwind CSS, configurado para deploy automático no GitHub Pages.

## Tecnologias Utilizadas

- **Next.js 15** - Framework React com SSR e SSG
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS v4** - Framework CSS utility-first
- **Shadcn/UI** - Componentes de interface modernos
- **Lucide React** - Ícones modernos
- **Next Themes** - Suporte para tema claro/escuro
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## Funcionalidades

- Design responsivo e moderno
- Modo escuro/claro
- Interface mobile-first
- Performance otimizada
- Navegação fluida entre seções
- Formulário de contato funcional
- Showcase de projetos (APIs, Sites, Jogos)

## Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado)

### Comandos

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Fazer build para produção
pnpm build

# Executar em modo produção
pnpm start

# Gerar build estático para GitHub Pages
pnpm deploy

# Sistema de Changelog e Versionamento
pnpm changelog:gen         # Gerar changelog
pnpm release              # Release interativo
pnpm release:patch        # Release patch (bug fixes)
pnpm release:minor        # Release minor (features)
pnpm release:major        # Release major (breaking)
```

## Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial
│   ├── apis/            # Página das APIs
│   ├── sites/           # Página dos sites
│   ├── games/           # Página dos jogos
│   └── contact/         # Página de contato
├── components/          # Componentes React
│   ├── ui/              # Componentes base (Shadcn/UI)
│   ├── hero-section.tsx
│   ├── portfolio-header.tsx
│   └── ...
└── lib/
    └── utils.ts         # Utilitários
```

## Sistema de Changelog

Este projeto inclui um sistema automatizado de changelog que:

- Gera changelogs baseado nos commits Git
- Categoriza commits automaticamente (feat, fix, docs, etc.)
- Segue padrões de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
- Implementa [Semantic Versioning](https://semver.org/)
- Cria tags Git automaticamente
- Interface interativa para releases

### Como usar:

```bash
# Modo interativo (recomendado)
pnpm release

# Release direto
pnpm release:patch    # v1.0.0 → v1.0.1
pnpm release:minor    # v1.0.0 → v1.1.0
pnpm release:major    # v1.0.0 → v2.0.0

# Apenas changelog
pnpm changelog:gen
```

Para mais detalhes, consulte [docs/CHANGELOG_GUIDE.md](./docs/CHANGELOG_GUIDE.md).

## Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages sempre que há um push na branch `main`.

### Setup Automático

1. Faça push para a branch `main` ou `master`
2. O GitHub Actions executará o workflow automaticamente
3. Seu site estará disponível em: `https://rogeriocordeiro.github.io/`

### Setup Manual

```bash
# Gerar build estático
pnpm deploy

# Os arquivos estarão na pasta 'out/'
```

Para mais detalhes, consulte o arquivo [DEPLOY.md](./DEPLOY.md).

## 🌐 URLs das Páginas

- **Home**: `/` - Apresentação e hero section
- **APIs**: `/apis/` - Projetos de backend e APIs
- **Sites**: `/sites/` - Projetos web frontend
- **Jogos**: `/games/` - Projetos de jogos
- **Contato**: `/contact/` - Formulário de contato

## Customização

### Alterando Conteúdo

1. **Informações pessoais**: Edite `src/components/hero-section.tsx`
2. **Projetos**: Edite os arquivos de seção correspondentes
3. **Temas**: Configure em `src/components/theme-provider.tsx`
4. **Estilos**: Modifique `src/app/globals.css`

### Adicionando Projetos

1. Adicione imagens em `public/`
2. Atualize os dados nos componentes de seção
3. Configure as URLs e descrições

## Temas e Cores

O projeto utiliza um sistema de temas personalizável:

- **Tema claro**: Design minimalista e elegante
- **Tema escuro**: Interface moderna com contrastes suaves
- **Cores primárias**: Configuráveis via CSS variables
- **Animações**: Transições suaves e efeitos de hover

## Performance

- Lighthouse Score: 100/100
- Core Web Vitals otimizados
- Lazy loading de imagens
- Otimização de fontes
- Minificação automática
- Tree shaking ativado

## Contribuição

Este é um projeto pessoal, mas sugestões são bem-vindas!

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

**Rogério Cordeiro** - Desenvolvedor Fullstack

- Portfolio: https://rogeriocordeiro.github.io/
- GitHub: [@RogerioCordeiro](https://github.com/RogerioCordeiro)
- Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

---

Se este projeto foi útil para você, considere dar uma estrela no repositório!

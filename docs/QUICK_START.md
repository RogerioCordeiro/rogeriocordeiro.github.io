# Quick Start - Sistema de Changelog

## Comandos Essenciais

```bash
# Release completo (recomendado)
pnpm release

# Correções de bug
pnpm release:patch

# Novas funcionalidades
pnpm release:minor

# Mudanças que quebram compatibilidade
pnpm release:major

# Apenas gerar changelog
pnpm changelog:gen
```

## Exemplo Rápido

```bash
# 1. Fazer alguns commits
git commit -m "feat: adicionar nova funcionalidade"
git commit -m "fix: corrigir bug crítico"

# 2. Fazer release
pnpm release:minor

# 3. Resultado automático:
# package.json: 1.0.0 → 1.1.0
# CHANGELOG.md atualizado
# Git tag v1.1.0 criada
# Push automático (opcional)
```

## Tipos de Commit

| Prefixo     | Categoria     | Descrição           |
| ----------- | ------------- | ------------------- |
| `feat:`     | Features      | Nova funcionalidade |
| `fix:`      | Bug Fixes     | Correção de bug     |
| `docs:`     | Documentation | Documentação        |
| `style:`    | Styling       | UI/CSS              |
| `refactor:` | Refactoring   | Refatoração         |
| `perf:`     | Performance   | Performance         |
| `test:`     | Tests         | Testes              |
| `chore:`    | Chores        | Manutenção          |

## Documentação Completa

- [Guia Completo](./CHANGELOG_GUIDE.md)
- [Exemplos Práticos](./CHANGELOG_EXAMPLES.md)

---

**Pronto! Seu projeto agora tem um sistema profissional de changelog automático!**

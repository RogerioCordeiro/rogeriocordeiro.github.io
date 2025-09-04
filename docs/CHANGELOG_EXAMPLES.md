# Exemplos Práticos do Sistema de Changelog

Este guia mostra exemplos práticos de como usar o sistema de changelog no dia a dia.

## Cenários Comuns

### 1. Desenvolvimento Diário

**Situação**: Você fez algumas correções de bugs e quer fazer um release patch.

```bash
# Durante o desenvolvimento
git add .
git commit -m "fix: corrigir validação de formulário"
git commit -m "fix: resolver problema de responsividade no mobile"

# Fazer release
pnpm release:patch
```

**Resultado**: Versão vai de `1.0.0` para `1.0.1` com changelog automático.

### 2. Nova Funcionalidade

**Situação**: Implementou uma nova feature e quer fazer um release minor.

```bash
git add .
git commit -m "feat: adicionar autenticação com Google"
git commit -m "docs: atualizar README com instruções de OAuth"

pnpm release:minor
```

**Resultado**: Versão vai de `1.0.1` para `1.1.0`.

### 3. Breaking Changes

**Situação**: Fez mudanças que quebram compatibilidade.

```bash
git commit -m "feat!: migrar para nova API v2"
# ou
git commit -m "feat: migrar para nova API v2

BREAKING CHANGE: A API antiga não é mais suportada"

pnpm release:major
```

**Resultado**: Versão vai de `1.1.0` para `2.0.0`.

### 4. Release Interativo

**Situação**: Não tem certeza de que tipo de release fazer.

```bash
pnpm release
```

**Output exemplo**:

```
Release Manager

Commits desde a última tag:
- feat: adicionar dark mode
- fix: corrigir bug no header
- docs: atualizar documentação

Fazer Release

Escolha o tipo de release:
1) Patch   (1.0.0 → 1.0.1)
2) Minor   (1.0.0 → 1.1.0)
3) Major   (1.0.0 → 2.0.0)
4) Apenas Changelog
5) Apenas Tag
0) Cancelar

Sua escolha:
```

## Exemplos de Saída do Changelog

### Release com Múltiplas Categorias

```markdown
## [1.2.0] - 2024-01-15

### Features

- feat: adicionar sistema de notificações
- feat: implementar modo escuro
- feat(ui): novo componente de modal

### Bug Fixes

- fix: corrigir vazamento de memória no dashboard
- fix(auth): resolver problema de token expirado
- fix: ajustar layout em dispositivos pequenos

### Documentation

- docs: adicionar guia de instalação
- docs: atualizar changelog
- docs(api): documentar novos endpoints

### Styling

- style: melhorar consistência visual
- style: ajustar espaçamentos no footer

### Refactoring

- refactor: extrair lógica de validação para service
- refactor(components): simplificar estrutura de pastas

### Performance

- perf: otimizar carregamento de imagens
- perf: reduzir bundle size em 20%

### Chores

- chore: atualizar dependências
- chore: configurar prettier
- chore(deps): bump react to v18

### CI/CD

- ci: adicionar testes automatizados
- ci: configurar deploy automático

### Tests

- test: adicionar testes para componente Button
- test: melhorar cobertura de testes da API

### Breaking Changes

- feat!: remover suporte para Node.js < 16
- refactor!: renomear propriedade 'data' para 'content'
```

### Release Simples

```markdown
## [1.0.1] - 2024-01-10

### Bug Fixes

- fix: corrigir problema de carregamento
- fix: resolver erro 404 na página de contato
```

## Dicas de Workflow

### 1. Desenvolvimento com Commits Pequenos

```bash
# Pequenas mudanças, commits frequentes
git commit -m "fix: corrigir typo na documentação"
git commit -m "style: ajustar cor do botão"
git commit -m "feat: adicionar validação de email"

# Release quando necessário
pnpm release:minor
```

### 2. Só Atualizar Changelog

```bash
# Quando quiser apenas gerar changelog sem fazer release
pnpm changelog:gen

# Verificar resultado
cat CHANGELOG.md
```

### 3. Preview Antes do Release

```bash
# Ver que commits estão pendentes
pnpm changelog:preview

# Decidir se faz sentido fazer release
pnpm release
```

### 4. Configuração de Repositório Remoto

Se você mudou de repositório ou está configurando um novo projeto:

```bash
# Atualizar configuração
vim scripts/changelog.config.json

# Editar:
{
  "repository": {
    "url": "https://github.com/seuusuario/seurepositorio"
  }
}
```

## Resolução de Problemas

### Erro: "No commits found"

**Causa**: Não há commits desde a última tag.

**Solução**:

```bash
# Fazer alguns commits primeiro
git add .
git commit -m "feat: alguma mudança"

# Então fazer release
pnpm release
```

### Erro: "Git not clean"

**Causa**: Há mudanças não commitadas.

**Solução**:

```bash
git status
git add .
git commit -m "tipo: descrição"
pnpm release
```

### Changelog não aparece formatado

**Causa**: Problema na configuração do repositório.

**Solução**:

```bash
# Verificar configuração
cat scripts/changelog.config.json

# Verificar se o repositório está correto
git remote -v
```

### Tags não aparecem no GitHub

**Causa**: Tags não foram enviadas para o repositório remoto.

**Solução**:

```bash
# Enviar tags específicas
git push origin v1.0.0

# Ou enviar todas as tags
git push --tags
```

## Automatização Avançada

### GitHub Actions para Release

Criar `.github/workflows/release.yml`:

```yaml
name: Release
on:
  workflow_dispatch:
    inputs:
      release_type:
        description: "Release type"
        required: true
        default: "patch"
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Release
        run: pnpm release:${{ github.event.inputs.release_type }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Hooks de Pre-commit

Configurar husky para validar commits:

```bash
# Instalar husky
pnpm add -D husky

# Configurar hook
echo '#!/bin/sh
npx --no-install commitlint --edit "$1"' > .husky/commit-msg

# Adicionar script no package.json
"scripts": {
  "prepare": "husky install"
}
```

## Versionamento Semântico

### Diretrizes para Commits

- **patch** (1.0.0 → 1.0.1):

  - `fix:` - correções de bugs
  - `perf:` - melhorias de performance
  - `style:` - mudanças estéticas

- **minor** (1.0.0 → 1.1.0):

  - `feat:` - novas funcionalidades
  - `docs:` - documentação

- **major** (1.0.0 → 2.0.0):
  - `feat!:` - funcionalidades com breaking changes
  - Commits com `BREAKING CHANGE:` no corpo

### Exemplo de Corpo de Commit

```
feat: adicionar sistema de cache

Implementa cache em memória para melhorar performance
das consultas mais frequentes.

BREAKING CHANGE: A configuração de cache agora é obrigatória
no arquivo config.json
```

Este sistema garante que o versionamento seja sempre preciso e o changelog seja informativo para usuários e desenvolvedores.

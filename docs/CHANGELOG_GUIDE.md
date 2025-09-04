# Sistema de Changelog Automático

Este projeto utiliza um sistema automatizado para gerar changelogs baseado nos commits do Git, seguindo as convenções do [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e [Semantic Versioning](https://semver.org/).

## Como Usar

### Comandos Disponíveis

```bash
# Gerar changelog para commits desde a última tag
pnpm changelog:gen

# Fazer release com bump de versão patch + changelog + tag
pnpm changelog:release

# Fazer release com bump de versão minor
pnpm changelog:release:minor

# Fazer release com bump de versão major
pnpm changelog:release:major

# Apenas criar tag da versão atual
pnpm changelog:tag

# Atalhos para bump de versão
pnpm version:patch    # v1.0.0 → v1.0.1
pnpm version:minor    # v1.0.0 → v1.1.0
pnpm version:major    # v1.0.0 → v2.0.0
```

### Workflow Recomendado

1. **Durante o desenvolvimento**, faça commits seguindo as convenções:

   ```bash
   git commit -m "feat: adicionar nova funcionalidade X"
   git commit -m "fix: corrigir bug na validação"
   git commit -m "docs: atualizar README"
   ```

2. **Para fazer um release**:

   ```bash
   # Para correções (patch)
   pnpm changelog:release

   # Para novas funcionalidades (minor)
   pnpm changelog:release:minor

   # Para mudanças quebra-compatibilidade (major)
   pnpm changelog:release:major
   ```

3. **Push com tags**:
   ```bash
   git push origin main --tags
   ```

## Convenções de Commit

O sistema reconhece automaticamente os tipos de commit e os categoriza:

### Tipos Suportados

| Prefixo     | Categoria        | Descrição                            |
| ----------- | ---------------- | ------------------------------------ |
| `feat:`     | Features         | Nova funcionalidade                  |
| `fix:`      | Bug Fixes        | Correção de bug                      |
| `docs:`     | Documentation    | Atualização de documentação          |
| `style:`    | Styling          | Mudanças de estilo/UI                |
| `refactor:` | Refactoring      | Refatoração de código                |
| `perf:`     | Performance      | Melhoria de performance              |
| `test:`     | Tests            | Adição/correção de testes            |
| `chore:`    | Chores           | Tarefas de manutenção                |
| `ci:`       | CI/CD            | Mudanças no CI/CD                    |
| `breaking:` | Breaking Changes | Mudanças que quebram compatibilidade |

### Exemplos de Commits

```bash
# Features
git commit -m "feat: adicionar sistema de autenticação"
git commit -m "feat(api): implementar endpoint de usuários"

# Bug Fixes
git commit -m "fix: corrigir validação de email"
git commit -m "fix(ui): resolver problema de responsividade"

# Documentation
git commit -m "docs: atualizar guia de instalação"
git commit -m "docs(api): documentar novos endpoints"

# Styling
git commit -m "style: melhorar layout da página inicial"
git commit -m "style(components): atualizar tema dark"

# Refactoring
git commit -m "refactor: simplificar lógica de validação"

# Performance
git commit -m "perf: otimizar carregamento de imagens"

# Chores
git commit -m "chore: atualizar dependências"
git commit -m "chore(deps): atualizar Next.js para v15"

# Breaking Changes
git commit -m "breaking: alterar estrutura da API de usuários"
```

## Configuração

### Arquivo de Configuração

O sistema utiliza `scripts/changelog.config.json` para personalização:

```json
{
  "repository": {
    "owner": "RogerioCordeiro",
    "name": "rogeriocordeiro.github.io"
  },
  "categories": {
    "features": {
      "title": "Features",
      "keywords": ["feat", "feature", "add", "new"]
    }
    // ... outras categorias
  },
  "options": {
    "includeAuthor": false,
    "includeDate": true,
    "includeHash": true,
    "linkToCommit": true
  }
}
```

### Personalização

Você pode personalizar:

- **Categorias**: Adicionar/remover/modificar categorias
- **Keywords**: Palavras-chave que identificam cada tipo
- **Templates**: Formato do cabeçalho e rodapé
- **Opções**: Incluir/excluir informações no changelog

## Arquivos Gerados

- **`CHANGELOG.md`**: Arquivo principal com histórico de versões
- **Tags Git**: Tags automáticas para cada release (ex: `v1.2.3`)
- **`package.json`**: Versão atualizada automaticamente

## Exemplo de Saída

```markdown
## [1.2.0] - 2024-09-04

### Features

- Adicionar sistema de autenticação ([a1b2c3d](https://github.com/RogerioCordeiro/rogeriocordeiro.github.io/commit/a1b2c3d))
- Implementar dashboard do usuário ([e4f5g6h](https://github.com/RogerioCordeiro/rogeriocordeiro.github.io/commit/e4f5g6h))

### Bug Fixes

- Corrigir validação de formulário ([i7j8k9l](https://github.com/RogerioCordeiro/rogeriocordeiro.github.io/commit/i7j8k9l))

### Documentation

- Atualizar README com novas instruções ([m1n2o3p](https://github.com/RogerioCordeiro/rogeriocordeiro.github.io/commit/m1n2o3p))
```

## Semantic Versioning

O sistema segue o [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, pequenas correções
- **MINOR** (1.0.0 → 1.1.0): Novas funcionalidades (backward compatible)
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes, mudanças incompatíveis

### Quando usar cada tipo?

- **Patch**: `fix:`, `docs:`, `style:`, `test:`, `chore:`
- **Minor**: `feat:`, `perf:`, novos recursos
- **Major**: `breaking:`, mudanças na API, remoção de funcionalidades

## Contribuindo

Para manter a consistência:

1. Use sempre os prefixos de commit convencionais
2. Seja descritivo nas mensagens de commit
3. Faça commits atômicos (uma alteração por commit)
4. Execute `pnpm changelog:gen` antes de fazer PR

## Troubleshooting

### Problemas Comuns

**"Nenhum commit encontrado"**

- Verifique se existe uma tag anterior
- Use `git tag` para listar tags existentes

**"Erro ao criar tag"**

- Verifique se já existe uma tag com o mesmo nome
- Use `git tag -d v1.0.0` para remover tag local

**"Arquivo package.json não encontrado"**

- Execute o comando na raiz do projeto
- Verifique se o arquivo existe

### Reset do Sistema

Para recomeçar o versionamento:

```bash
# Remover todas as tags
git tag -d $(git tag -l)

# Resetar versão no package.json
# Editar manualmente para "0.1.0"

# Primeiro release
pnpm changelog:release
```

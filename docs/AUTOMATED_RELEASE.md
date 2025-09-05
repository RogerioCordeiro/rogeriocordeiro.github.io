# Sistema de Release Automatizado 🚀

Este documento explica como funciona o novo sistema de deploy automatizado com versionamento semântico e geração automática de changelog.

## 📋 Visão Geral

O workflow de deploy foi aprimorado para incluir:

1. **Versionamento Automático**: Baseado no título do Pull Request
2. **Geração de Changelog**: Automática baseada nos commits
3. **Tags e Releases**: Criação automática no GitHub
4. **Deploy Contínuo**: Para GitHub Pages

## 🎯 Como Funciona

### Triggers

O workflow é executado em dois cenários:

1. **Push direto na main/master**: Apenas faz o build e deploy
2. **Pull Request mergeado**: Executa todo o fluxo de release + deploy

### Padrões de Título de PR

O sistema analisa o título do Pull Request para determinar o tipo de versionamento:

#### Breaking Changes (Major) 🔺
```
feat!!: adicionar nova API incompatível
refactor!!: remover endpoint deprecated
```
- **Padrão**: `<tipo>!!: <descrição>`
- **Versão**: `v1.2.3` → `v2.0.0`

#### Features (Minor) 🔹
```
feat!: adicionar sistema de comentários
feature!: implementar dark mode
```
- **Padrão**: `<tipo>!: <descrição>`
- **Versão**: `v1.2.3` → `v1.3.0`

#### Patches (Patch) 🔸
```
fix: corrigir bug no header
docs: atualizar README
style: ajustar espaçamento
```
- **Padrão**: `<tipo>: <descrição>`
- **Versão**: `v1.2.3` → `v1.2.4`

#### Sem Versionamento ⚠️
```
update documentação
teste de build
```
- **Padrão**: Qualquer título que não siga a convenção
- **Versão**: Mantém a atual, apenas faz deploy

## 📦 Processo de Release

### 1. Version and Release Job

Executado apenas quando uma PR é mergeada:

1. **Análise do Título**: Determina o tipo de versão
2. **Cálculo da Nova Versão**: Baseado na última tag
3. **Atualização do package.json**: Nova versão
4. **Geração do Changelog**: Usando o script existente
5. **Commit das Alterações**: Com `[skip ci]` para evitar loop
6. **Criação da Tag**: Nova tag no Git
7. **Criação do Release**: No GitHub com notas automáticas

### 2. Build Job

Executa após o job de release (ou diretamente em push):

1. **Checkout do Código**: Versão mais atual
2. **Setup do Ambiente**: Node.js, pnpm, cache
3. **Build da Aplicação**: Next.js build
4. **Preparação para Pages**: Artifacts

### 3. Deploy Job

Executa após o build:

1. **Deploy para GitHub Pages**: Usando artifacts

## 🛠️ Scripts Utilizados

O workflow utiliza o script existente de changelog:

```bash
node scripts/changelog.js generate
```

Este script:
- Analisa commits desde a última tag
- Categoriza por tipo (feat, fix, docs, etc.)
- Gera entrada no CHANGELOG.md
- Mantém histórico organizado

## 📊 Outputs e Informações

### Logs do Workflow

O workflow produz logs detalhados:

```
🔍 Título da PR: feat!: adicionar sistema de comentários
🔹 Commit com flag de feature (!) – atualizando MINOR
🚀 Nova versão calculada: v1.3.0
📦 package.json atualizado para versão 1.3.0
📝 Gerando changelog...
✅ Changelog atualizado com sucesso
✅ Alterações commitadas e enviadas
🏷️ Tag v1.3.0 criada
```

### Release Notes Automáticas

Cada release inclui:

- **Informações da PR**: Número, autor, título
- **Link para Changelog**: Detalhes completos
- **Status do Deploy**: Confirmação automática
- **Release Notes**: Geradas automaticamente pelo GitHub

## 🎨 Personalizações

### Configuração do Changelog

O comportamento pode ser ajustado em:
- `scripts/changelog.config.json`
- `scripts/changelog.js`

### Permissões Necessárias

O workflow requer:
- `contents: write` - Para commits e tags
- `pages: write` - Para deploy
- `id-token: write` - Para autenticação
- `pull-requests: read` - Para informações da PR

## 🔄 Fluxo de Trabalho Recomendado

### Para Desenvolvedores

1. **Criar Feature Branch**:
   ```bash
   git checkout -b feat/minha-feature
   ```

2. **Fazer Commits Convencionais**:
   ```bash
   git commit -m "feat: adicionar nova funcionalidade"
   git commit -m "fix: corrigir bug encontrado"
   ```

3. **Criar Pull Request** com título seguindo convenção:
   ```
   feat!: implementar sistema de autenticação
   ```

4. **Merge da PR**: O sistema automaticamente:
   - Calcula nova versão
   - Gera changelog
   - Cria release
   - Faz deploy

### Para Releases de Emergência

Para hotfixes críticos:

```bash
# Push direto na main (apenas deploy)
git checkout main
git pull origin main
git commit -m "hotfix: correção crítica"
git push origin main
```

## 🎯 Benefícios

1. **Automação Completa**: Sem intervenção manual
2. **Versionamento Consistente**: Seguindo SemVer
3. **Changelog Automático**: Sempre atualizado
4. **Rastreabilidade**: Histórico completo de releases
5. **Deploy Contínuo**: Sempre sincronizado com releases

## ⚠️ Considerações

- O título da PR é **crucial** para o versionamento correto
- Commits com `[skip ci]` não disparam o workflow
- O script de changelog depende da estrutura de commits
- Tags são imutáveis - cuidado com erros de versionamento

## 🚨 Troubleshooting

### Problema: Versão não foi incrementada
- **Causa**: Título da PR não segue convenção
- **Solução**: Usar padrões `tipo:`, `tipo!:` ou `tipo!!:`

### Problema: Changelog vazio
- **Causa**: Não há commits novos desde a última tag
- **Solução**: Verificar se há commits para processar

### Problema: Falha no deploy
- **Causa**: Erro no build ou configuração de Pages
- **Solução**: Verificar logs do job de build

### Problema: Falha ao criar tag
- **Causa**: Tag já existe ou problema de permissões
- **Solução**: Verificar se a tag é única e se as permissões estão corretas

---

## 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Automatizado com ❤️ pelo GitHub Actions**

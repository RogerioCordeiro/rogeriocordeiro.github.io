# Deploy do Next.js para GitHub Pages

## Configuração Completa

Seu projeto Next.js agora está configurado para funcionar no GitHub Pages! Aqui estão os passos que foram implementados:

### 1. Configuração do Next.js (`next.config.ts`)

- Habilitado export estático (`output: 'export'`)
- Configurado `basePath` e `assetPrefix` para GitHub Pages
- Habilitado `trailingSlash` para compatibilidade
- Desabilitado otimização de imagens (`images: { unoptimized: true }`)

### 2. Scripts do Package.json

- `pnpm run deploy` - Gera build e prepara para deploy
- `pnpm run export` - Faz build para produção

### 3. GitHub Actions

- Workflow automático criado em `.github/workflows/deploy.yml`
- Deploy automático quando você fizer push na branch `main` ou `master`

### 4. Arquivos de Configuração

- `.nojekyll` para desabilitar processamento Jekyll
- Estrutura de pastas otimizada para GitHub Pages

## Como fazer o deploy:

### Opção 1: Deploy Automático (Recomendado)

1. Faça commit das suas alterações
2. Execute: `git push origin main` (ou `master`)
3. O GitHub Actions fará o deploy automaticamente!

### Opção 2: Deploy Manual

1. Execute: `pnpm run deploy`
2. Copie o conteúdo da pasta `out/` para a branch `gh-pages` do seu repositório
3. Configure o GitHub Pages para usar a branch `gh-pages`

## Configuração do GitHub Pages:

1. Vá em **Settings** do seu repositório
2. Clique em **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. Seu site estará disponível em: `https://rogeriocordeiro.github.io/`

## URLs do seu projeto:

- **URL principal**: https://rogeriocordeiro.github.io/
- **Estrutura das rotas**:
  - `/` - Página inicial
  - `/apis/` - Página das APIs
  - `/sites/` - Página dos sites
  - `/games/` - Página dos jogos
  - `/contact/` - Página de contato

## Testando localmente:

Para testar como ficará no GitHub Pages:

```bash
pnpm run deploy
cd out
python -m http.server 8000
```

Acesse: http://localhost:8000

## Importante:

- O arquivo `index.html` está sendo gerado automaticamente na pasta `out/`
- Todos os assets (CSS, JS, imagens) são processados corretamente
- As rotas do Next.js funcionam como páginas estáticas
- O tema dark/light mode funciona sem JavaScript no servidor

Seu projeto está pronto para o GitHub Pages!

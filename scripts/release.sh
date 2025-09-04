#!/bin/bash

# Script de Release Automático
# Facilita o processo de criação de releases com changelog

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de output
info() {
    echo -e "${BLUE}$1${NC}"
}

success() {
    echo -e "${GREEN}$1${NC}"
}

warning() {
    echo -e "${YELLOW}$1${NC}"
}

error() {
    echo -e "${RED}$1${NC}"
}

# Verificar se estamos em um repositório git
check_git() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        error "Este não é um repositório git!"
        exit 1
    fi
}

# Verificar se há mudanças não commitadas
check_clean() {
    if ! git diff-index --quiet HEAD --; then
        warning "Há mudanças não commitadas. Commit ou stash antes de fazer release."
        git status --short
        read -p "Continuar mesmo assim? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Obter versão atual
get_current_version() {
    node -p "require('./package.json').version"
}

# Listar commits desde a última tag
show_commits() {
    local last_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    local range=${last_tag:+$last_tag..}HEAD
    
    info "Commits desde a última tag:"
    echo
    git log $range --oneline --no-merges | head -10
    echo
    
    local commit_count=$(git rev-list $range --count --no-merges)
    if [ $commit_count -gt 10 ]; then
        info "... e mais $(($commit_count - 10)) commits"
        echo
    fi
}

# Menu interativo para escolher tipo de release
choose_release_type() {
    local current_version=$(get_current_version)
    
    echo -e "${BLUE}Fazer Release${NC}"
    echo -e "Versão atual: ${YELLOW}v$current_version${NC}"
    echo
    echo "Escolha o tipo de release:"
    echo
    echo "1) Patch   ($current_version → $(node -e "const v=process.argv[1].split('.').map(Number); console.log(\`\${v[0]}.\${v[1]}.\${v[2]+1}\`)" $current_version))"
    echo "2) Minor   ($current_version → $(node -e "const v=process.argv[1].split('.').map(Number); console.log(\`\${v[0]}.\${v[1]+1}.0\`)" $current_version))"
    echo "3) Major   ($current_version → $(node -e "const v=process.argv[1].split('.').map(Number); console.log(\`\${v[0]+1}.0.0\`)" $current_version))"
    echo "4) Apenas Changelog"
    echo "5) Apenas Tag"
    echo "0) Cancelar"
    echo
    
    read -p "Sua escolha [1]: " choice
    choice=${choice:-1}
    
    case $choice in
        1) echo "patch" ;;
        2) echo "minor" ;;
        3) echo "major" ;;
        4) echo "changelog" ;;
        5) echo "tag" ;;
        0) exit 0 ;;
        *) error "Opção inválida"; exit 1 ;;
    esac
}

# Executar release
do_release() {
    local type=$1
    
    case $type in
        "patch"|"minor"|"major")
            info "Fazendo release $type..."
            pnpm changelog:release:$type
            success "Release $type concluído!"
            ;;
        "changelog")
            info "Gerando apenas changelog..."
            pnpm changelog:gen
            success "Changelog atualizado!"
            ;;
        "tag")
            info "Criando apenas tag..."
            pnpm changelog:tag
            success "Tag criada!"
            ;;
    esac
}

# Perguntar se deve fazer push
ask_push() {
    echo
    read -p "Fazer push das alterações e tags? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        info "Fazendo push..."
        git push origin main --tags
        success "Push concluído!"
        
        # Mostrar URL do repositório
        local repo_url=$(git config --get remote.origin.url | sed 's/\.git$//')
        if [[ $repo_url == *"github.com"* ]]; then
            info "Repositório: $repo_url"
            info "Tags: $repo_url/tags"
        fi
    fi
}

# Função principal
main() {
    echo -e "${GREEN}Release Manager${NC}"
    echo "================================"
    echo
    
    check_git
    check_clean
    show_commits
    
    local release_type=$(choose_release_type)
    
    echo
    info "Executando: $release_type"
    echo
    
    # Confirmar antes de prosseguir
    read -p "Continuar? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        warning "Operação cancelada"
        exit 0
    fi
    
    do_release $release_type
    ask_push
    
    echo
    success "Processo concluído!"
}

# Verificar argumentos da linha de comando
if [ $# -eq 0 ]; then
    main
else
    case $1 in
        "patch"|"minor"|"major")
            check_git
            check_clean
            do_release $1
            ask_push
            ;;
        "changelog"|"gen")
            pnpm changelog:gen
            ;;
        "tag")
            pnpm changelog:tag
            ;;
        "help"|"-h"|"--help")
            echo "Uso: $0 [patch|minor|major|changelog|tag]"
            echo
            echo "Opções:"
            echo "  patch      - Release patch (bug fixes)"
            echo "  minor      - Release minor (new features)"  
            echo "  major      - Release major (breaking changes)"
            echo "  changelog  - Apenas gerar changelog"
            echo "  tag        - Apenas criar tag"
            echo "  (nenhum)   - Modo interativo"
            ;;
        *)
            error "Opção inválida. Use '$0 help' para ver as opções."
            exit 1
            ;;
    esac
fi

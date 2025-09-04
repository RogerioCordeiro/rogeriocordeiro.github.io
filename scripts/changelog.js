#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ChangelogGenerator {
    constructor() {
        this.packagePath = path.join(process.cwd(), 'package.json');
        this.changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
        this.configPath = path.join(process.cwd(), 'scripts', 'changelog.config.json');
        this.currentVersion = this.getCurrentVersion();
        this.config = this.loadConfig();
    }

    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                return JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            }
        } catch (error) {
            console.warn('Erro ao carregar configuração, usando padrões:', error.message);
        }

        // Configuração padrão
        return {
            repository: {
                owner: 'RogerioCordeiro',
                name: 'rogeriocordeiro.github.io'
            },
            categories: {
                breaking: { title: 'BREAKING CHANGES', keywords: ['breaking', 'break', 'major'] },
                features: { title: 'Features', keywords: ['feat', 'feature', 'add', 'new', 'implement'] },
                fixes: { title: 'Bug Fixes', keywords: ['fix', 'bug', 'error', 'issue', 'patch'] },
                performance: { title: 'Performance', keywords: ['perf', 'performance', 'optimize', 'speed'] },
                refactor: { title: 'Refactoring', keywords: ['refactor', 'refact', 'restructure', 'cleanup'] },
                styling: { title: 'Styling', keywords: ['style', 'css', 'ui', 'design', 'theme', 'color'] },
                docs: { title: 'Documentation', keywords: ['doc', 'docs', 'readme', 'comment', 'guide'] },
                tests: { title: 'Tests', keywords: ['test', 'spec', 'jest', 'cypress', 'e2e'] },
                chores: { title: 'Chores', keywords: ['chore', 'deps', 'dependency', 'config', 'setup', 'build'] },
                ci: { title: 'CI/CD', keywords: ['ci', 'cd', 'deploy', 'pipeline', 'github', 'action'] },
                security: { title: 'Security', keywords: ['security', 'secure', 'vulnerability', 'auth', 'permission'] }
            },
            options: {
                includeAuthor: false,
                includeDate: true,
                includeHash: true,
                linkToCommit: true,
                groupByType: true,
                sortByDate: true
            }
        };
    }

    getCurrentVersion() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
            return packageJson.version;
        } catch (error) {
            console.error('Erro ao ler package.json:', error.message);
            return '0.1.0';
        }
    }

    getCommitsSinceLastTag() {
        try {
            // Obter a última tag
            const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""', {
                encoding: 'utf8'
            }).trim();

            // Se não houver tags, pegar todos os commits
            const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';

            // Obter commits no formato desejado
            const commits = execSync(
                `git log ${range} --pretty=format:"%h|%s|%an|%ad" --date=short --no-merges`,
                { encoding: 'utf8' }
            ).trim();

            if (!commits) return [];

            return commits.split('\n').map(commit => {
                const [hash, subject, author, date] = commit.split('|');
                return { hash, subject, author, date };
            });
        } catch (error) {
            console.error('Erro ao obter commits:', error.message);
            return [];
        }
    }

    categorizeCommits(commits) {
        const categories = {};

        // Inicializar categorias vazias
        Object.keys(this.config.categories).forEach(key => {
            categories[key] = [];
        });
        categories.other = [];

        commits.forEach(commit => {
            const subject = commit.subject.toLowerCase();
            let categorized = false;

            // Verificar cada categoria configurada
            for (const [categoryKey, categoryConfig] of Object.entries(this.config.categories)) {
                if (categoryConfig.keywords.some(keyword => subject.includes(keyword))) {
                    categories[categoryKey].push(commit);
                    categorized = true;
                    break;
                }
            }

            // Se não foi categorizado, adicionar em 'other'
            if (!categorized) {
                categories.other.push(commit);
            }
        });

        return categories;
    }

    formatCommitEntry(commit) {
        const { owner, name } = this.config.repository;
        let entry = `- ${commit.subject}`;

        if (this.config.options.linkToCommit && this.config.options.includeHash) {
            entry += ` ([${commit.hash}](https://github.com/${owner}/${name}/commit/${commit.hash}))`;
        } else if (this.config.options.includeHash) {
            entry += ` (${commit.hash})`;
        }

        if (this.config.options.includeAuthor) {
            entry += ` - ${commit.author}`;
        }

        return entry;
    }

    generateChangelogEntry(version, categories) {
        const currentDate = new Date().toISOString().split('T')[0];
        let entry = `## [${version}] - ${currentDate}\n\n`;

        // Ordem específica para as categorias
        const categoryOrder = ['breaking', 'features', 'fixes', 'performance', 'refactor', 'styling', 'docs', 'tests', 'chores', 'ci', 'security'];

        // Processar categorias na ordem definida
        categoryOrder.forEach(categoryKey => {
            if (categories[categoryKey] && categories[categoryKey].length > 0) {
                const categoryConfig = this.config.categories[categoryKey];
                entry += `### ${categoryConfig.title}\n\n`;
                categories[categoryKey].forEach(commit => {
                    entry += `${this.formatCommitEntry(commit)}\n`;
                });
                entry += '\n';
            }
        });

        // Adicionar categoria 'other' no final, se houver
        if (categories.other && categories.other.length > 0) {
            entry += `### Others\n\n`;
            categories.other.forEach(commit => {
                entry += `${this.formatCommitEntry(commit)}\n`;
            });
            entry += '\n';
        }

        return entry;
    }

    updateChangelog(newEntry) {
        let existingContent = '';

        if (fs.existsSync(this.changelogPath)) {
            existingContent = fs.readFileSync(this.changelogPath, 'utf8');
        } else {
            existingContent = `# Changelog

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;
        }

        // Inserir nova entrada após o cabeçalho
        const headerEnd = existingContent.indexOf('\n## ');
        if (headerEnd !== -1) {
            const header = existingContent.substring(0, headerEnd);
            const rest = existingContent.substring(headerEnd);
            const newContent = header + '\n\n' + newEntry + rest;
            fs.writeFileSync(this.changelogPath, newContent);
        } else {
            // Se não há entradas anteriores
            fs.writeFileSync(this.changelogPath, existingContent + '\n' + newEntry);
        }
    }

    generateChangelog() {
        console.log('Gerando changelog...');

        const commits = this.getCommitsSinceLastTag();

        if (commits.length === 0) {
            console.log('Nenhum commit novo encontrado desde a última tag.');
            return;
        }

        console.log(`Encontrados ${commits.length} commits para processar`);

        const categories = this.categorizeCommits(commits);
        const changelogEntry = this.generateChangelogEntry(this.currentVersion, categories);

        this.updateChangelog(changelogEntry);

        console.log(`Changelog atualizado para a versão ${this.currentVersion}`);
        console.log(`Arquivo: ${this.changelogPath}`);
    }

    // Método para bump de versão
    bumpVersion(type = 'patch') {
        const [major, minor, patch] = this.currentVersion.split('.').map(Number);

        let newVersion;
        switch (type) {
            case 'major':
                newVersion = `${major + 1}.0.0`;
                break;
            case 'minor':
                newVersion = `${major}.${minor + 1}.0`;
                break;
            case 'patch':
            default:
                newVersion = `${major}.${minor}.${patch + 1}`;
                break;
        }

        // Atualizar package.json
        const packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
        packageJson.version = newVersion;
        fs.writeFileSync(this.packagePath, JSON.stringify(packageJson, null, 2));

        this.currentVersion = newVersion;
        console.log(`Versão atualizada para ${newVersion}`);

        return newVersion;
    }

    // Método para criar tag Git
    createTag(version = this.currentVersion) {
        try {
            execSync(`git tag -a v${version} -m "Release v${version}"`, { stdio: 'inherit' });
            console.log(`Tag v${version} criada`);
        } catch (error) {
            console.error('Erro ao criar tag:', error.message);
        }
    }
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

const generator = new ChangelogGenerator();

switch (command) {
    case 'generate':
    case 'gen':
        generator.generateChangelog();
        break;

    case 'release':
        const versionType = args[1] || 'patch'; // patch, minor, major
        const newVersion = generator.bumpVersion(versionType);
        generator.generateChangelog();
        generator.createTag(newVersion);
        break;

    case 'tag':
        generator.createTag();
        break;

    default:
        console.log(`
Gerador de Changelog

Uso:
  node scripts/changelog.js generate     - Gera changelog para commits desde a última tag
  node scripts/changelog.js release     - Bump patch version + changelog + tag
  node scripts/changelog.js release minor - Bump minor version + changelog + tag  
  node scripts/changelog.js release major - Bump major version + changelog + tag
  node scripts/changelog.js tag         - Cria tag da versão atual

Exemplos:
  pnpm changelog:gen
  pnpm changelog:release
  pnpm changelog:release minor
    `);
}

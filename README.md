# Trilha React Desafio 3

Frontend em React que simula uma plataforma de aprendizagem com área pública, autenticação mockada, cadastro, feed autenticado e ranking lateral. O projeto foi evoluído com foco em arquitetura de cliente, qualidade de código, testabilidade, documentação e preparo para uma futura troca do backend fake por uma API real.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-6.3-CA4245?logo=reactrouter&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-5.3.5-DB7093?logo=styledcomponents&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.13.6-5A29E4?logo=axios&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-enabled-E33332?logo=testinglibrary&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

## ✨ Visão geral

O projeto entrega hoje:

- home pública com CTA principal;
- login com validação;
- cadastro com verificação de e-mail já existente;
- feed autenticado com ranking;
- sessão local no frontend;
- API mock via `json-server`;
- camada HTTP com interceptores, logging e normalização de erro;
- testes unitários, integração, acessibilidade, smoke E2E e regressão visual;
- Docker, CI e workflow de release;
- documentação técnica de arquitetura, UI, ADRs e plano de saída do CRA.

Importante: este repositório **não possui backend corporativo real** neste estágio. O uso de `json-server` é intencional e serve para simular autenticação, cadastro e carregamento do feed enquanto o frontend amadurece.

## 🧭 Sumário

- [Objetivo](#-objetivo)
- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Rotas](#-rotas)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Execução local](#-execução-local)
- [Execução com Docker](#-execução-com-docker)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Qualidade e testes](#-qualidade-e-testes)
- [Observabilidade](#-observabilidade)
- [Mock de dados](#-mock-de-dados)
- [Documentação técnica](#-documentação-técnica)
- [Limitações conhecidas](#-limitações-conhecidas)

## 🎯 Objetivo

O objetivo atual do projeto não é simular uma stack completa de produção no servidor. O foco está em consolidar um frontend profissional, com:

- organização clara por domínio;
- separação entre UI, rotas, serviços e utilitários;
- base consistente para evolução incremental;
- baixo acoplamento com o formato bruto da API mockada;
- preparo para futura integração com backend real sem colapso arquitetural.

## 🧱 Stack

### Aplicação

- React 18
- React Router DOM 6
- Styled Components
- React Hook Form
- Axios
- React Icons
- Web Vitals

### Mock e ambiente

- JSON Server
- Docker
- Docker Compose

### Qualidade e testes

- ESLint
- Prettier
- Testing Library
- Jest Axe
- Playwright

### Build atual

- Create React App (`react-scripts`)

Observação:

- o projeto ainda usa CRA como bundler atual;
- existe um plano documentado para sair do `react-scripts` em [docs/cra-exit-plan.md](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/docs/cra-exit-plan.md);
- a migração ainda **não** foi iniciada e está tratada como iniciativa separada de tooling.

## 🏗️ Arquitetura

O frontend foi estruturado para manter responsabilidades separadas:

- `src/features`: domínios da aplicação, como `auth` e `feed`
- `src/components`: componentes compartilhados de UI e layout
- `src/routes`: paths, guardas e composição de rotas
- `src/config`: resolução e validação de ambiente
- `src/services`: infraestrutura HTTP
- `src/lib`: utilitários transversais, observabilidade, sessão e helpers
- `src/styles`: tema e estilos globais

### Decisões arquiteturais já consolidadas

- organização por feature;
- sessão atual controlada no frontend via contexto;
- cliente HTTP central com interceptores;
- mapeadores entre API mock e UI;
- tratamento padronizado de `loading`, `error` e `empty`;
- documentação por ADR para decisões estruturais.

### Fluxo de bootstrap

Em [src/App.js](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/src/App.js), a aplicação é montada nesta ordem:

1. `AuthProvider`
2. `ThemeProvider`
3. `BrowserRouter`
4. `AppErrorBoundary`
5. `AppRoutes`

Essa ordem é importante porque sessão, tema, roteamento e fallback global precisam estar disponíveis para toda a árvore.

## 🛣️ Rotas

Rotas atuais:

- `/` → home pública
- `/componentes` → vitrine interna dos componentes compartilhados
- `/login` → login
- `/cadastro` → cadastro
- `/feed` → área autenticada com feed e ranking

Regras de navegação:

- rotas públicas de autenticação redirecionam usuário autenticado para `/feed`;
- a rota `/feed` exige sessão local válida;
- rotas inválidas voltam para a home.

## 🗂️ Estrutura de pastas

```text
docs/
  adr/               ADRs com decisões arquiteturais
  cra-exit-plan.md   plano incremental de saída do CRA
  frontend-architecture.md
  ui-components.md

src/
  assets/            recursos estáticos
  components/        UI compartilhada
  config/            ambiente e configuração
  constants/         mensagens e chaves reutilizáveis
  features/          domínios da aplicação
  lib/               utilitários transversais
  pages/             páginas fora de feature, como a home
  routes/            rotas, paths e guardas
  services/          infraestrutura HTTP
  styles/            tema e estilos globais
  test/              helpers e fixtures de teste

tests/
  e2e/               smoke e regressão visual com Playwright
```

## 🚀 Execução local

### Pré-requisitos

- Node.js `18` alinhado com [.nvmrc](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/.nvmrc)
- `npm` como gerenciador padrão

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

Use [.env.example](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/.env.example) como base:

```bash
cp .env.example .env
```

Principais variáveis:

- `REACT_APP_API_URL`
- `REACT_APP_ENABLE_WEB_VITALS`
- `REACT_APP_ENABLE_SENTRY`
- `REACT_APP_LOG_LEVEL`
- `REACT_APP_SENTRY_DSN`
- `REACT_APP_SENTRY_ENVIRONMENT`
- `TRILHA_API_PORT`
- `TRILHA_FRONTEND_PORT`
- `TRILHA_API_IMAGE`
- `TRILHA_FRONTEND_IMAGE`

Sem configuração explícita, o frontend usa `http://127.0.0.1:8001` como base da API mock.

### 3. Subir a API mock

```bash
npm run api
```

API disponível em `http://127.0.0.1:8001`.

### 4. Subir o frontend

Em outro terminal:

```bash
npm start
```

Frontend disponível em `http://localhost:3000`.

### Fluxo recomendado de reset da base mock

Quando precisar voltar a um estado limpo:

```bash
npm run api:reset
```

Isso restaura [db.json](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/db.json) a partir de [data/mock/db.seed.json](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/data/mock/db.seed.json).

## 🐳 Execução com Docker

O projeto pode subir frontend e API mock juntos.

### Subir containers

```bash
docker compose up --build
```

ou:

```bash
npm run docker:up
```

### Acessos padrão

- frontend → `http://localhost:3000`
- API mock → `http://localhost:8001`

### Encerrar containers

```bash
docker compose down
```

ou:

```bash
npm run docker:down
```

### O que já foi endurecido no ambiente Docker

- frontend com `nginx` unprivileged;
- API mock rodando como usuário `node`;
- `healthcheck` no Compose e nos Dockerfiles;
- portas e nomes de imagem parametrizáveis por ambiente;
- workflow de release preparado para publicar imagem do frontend.

## 🧪 Scripts disponíveis

### Desenvolvimento

- `npm start` → sobe o frontend em desenvolvimento
- `npm run api` → sobe o `json-server`
- `npm run api:reset` → restaura a base mock

### Build

- `npm run build` → gera a build de produção
- `npm run docker:build:frontend` → build local da imagem do frontend

### Qualidade

- `npm run lint`
- `npm run lint:fix`
- `npm run format`
- `npm run format:check`
- `npm run verify`
- `npm run verify:ci`

### Dependências e tooling

- `npm run tooling:update-browserslist`
- `npm run deps:outdated`
- `npm run deps:audit`
- `npm run deps:audit:prod`

### Testes

- `npm test -- --watchAll=false`
- `npm run test:ci`
- `npm run test:coverage`
- `npm run e2e`
- `npm run e2e:headed`
- `npm run e2e:install`
- `npm run e2e:visual`
- `npm run e2e:visual:update`

## ✅ Qualidade e testes

O projeto já possui uma cobertura de qualidade acima do básico:

- testes de integração do app;
- testes unitários de componentes e serviços;
- testes de acessibilidade com `jest-axe`;
- smoke E2E com Playwright;
- regressão visual com snapshots;
- piso mínimo de cobertura global no Jest.

Cobertura mínima configurada:

- `90%` de statements
- `70%` de branches
- `90%` de functions
- `90%` de lines

## 📡 Observabilidade

O frontend possui uma camada inicial de observabilidade:

- logger central em `src/lib/observability/logger.js`
- integração opcional com Sentry
- Web Vitals opcionais
- `AppErrorBoundary` integrada ao fluxo de monitoramento

Isso permite observabilidade gradual sem espalhar código do provedor por toda a aplicação.

## 🧪 Mock de dados

O backend atual é um mock simples com `json-server`.

Arquivos principais:

- [data/mock/db.seed.json](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/data/mock/db.seed.json) → base limpa de referência
- [db.json](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/db.json) → base viva usada no desenvolvimento

Recursos mockados:

- `/users`
- `/posts`

Esse mock existe para suportar:

- login
- cadastro
- carregamento do feed
- ranking lateral

## 📚 Documentação técnica

Além deste README, o projeto mantém documentação complementar:

- [docs/frontend-architecture.md](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/docs/frontend-architecture.md) → visão de arquitetura e fluxo do frontend
- [docs/ui-components.md](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/docs/ui-components.md) → contrato dos componentes compartilhados
- [docs/adr/README.md](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/docs/adr/README.md) → decisões arquiteturais registradas
- [docs/cra-exit-plan.md](/home/cognsys/Documentos/projetos/projetosReact/trilha-react-desafio-3/docs/cra-exit-plan.md) → plano de saída do CRA

Também existe uma vitrine visual interna dos componentes em:

- `/componentes`

## ⚠️ Limitações conhecidas

Estas limitações são conhecidas e compatíveis com o escopo atual:

- não há backend corporativo real;
- autenticação e sessão continuam mockadas no frontend;
- a persistência de dados da API fake acontece em arquivo JSON local;
- boa parte dos alertas restantes de dependência ainda vem da cadeia do `react-scripts`;
- a migração para um bundler mais moderno foi planejada, mas ainda não executada.

## 🧩 Estado atual do projeto

Dentro do escopo atual, o projeto já se posiciona como:

- frontend organizado por domínio;
- base profissional de cliente para continuar crescendo;
- aplicação preparada para futura integração com backend real;
- repositório com qualidade técnica acima de um simples desafio de código.

Se o próximo passo for evoluir para um backend real, o frontend já está razoavelmente preparado para isso sem exigir reescrita total.

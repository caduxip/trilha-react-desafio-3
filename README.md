# Trilha React Desafio 3

Aplicação frontend em React que simula uma plataforma de aprendizagem com fluxo público e autenticado. O projeto foi estruturado para exercitar navegação, autenticação mockada, formulários com validação, consumo de API via `json-server` e organização incremental de componentes e serviços.

## Objetivo da aplicação

O projeto representa uma interface de comunidade/estudo com:

- página inicial institucional;
- login com validação;
- cadastro de novos usuários;
- área autenticada com feed e ranking;
- backend fake para suportar autenticação e listagem de conteúdo.

O objetivo atual não é implementar autenticação real de produção, e sim consolidar uma base frontend clara, evolutiva e segura para continuidade do desenvolvimento.

## Funcionalidades disponíveis

- navegação entre rotas públicas e privadas;
- proteção da rota `/feed`;
- persistência local da sessão do usuário;
- formulário de login com `react-hook-form` e validação por schema;
- formulário de cadastro com validação por schema e verificação de e-mail já cadastrado;
- integração com API mockada via `axios`;
- feed carregado a partir do `json-server`;
- ranking lateral carregado da API;
- botão de logout no cabeçalho autenticado;
- tema global com tokens compartilhados;
- camada de dados com mapeamento e normalização de erro;
- componentes base com contratos mais consistentes;
- landmarks e navegação por teclado refinados;
- testes automatizados ampliados para fluxos críticos e utilitários.

## Stack utilizada

- React 18
- React Router DOM 6
- Styled Components
- React Hook Form
- Axios
- JSON Server
- Create React App
- Testing Library
- Docker
- Docker Compose

## Estrutura principal

```text
src/
  assets/            imagens e recursos estáticos
  components/        componentes reutilizáveis de UI e layout
  config/            configuração compartilhada da aplicação
  constants/         mensagens, chaves e regras reutilizáveis
  features/          módulos por domínio, como auth e feed
  lib/               utilitários compartilhados, como sessão local e schemas de formulário
  pages/             páginas globais fora dos domínios, como a home
  routes/            configuração de paths, guardas e composição de rotas
  services/          infraestrutura compartilhada, como cliente HTTP
  styles/            estilos globais, tema e tokens visuais
```

## Rotas da aplicação

- `/`: landing page pública
- `/login`: acesso de usuário
- `/cadastro`: criação de nova conta
- `/feed`: área autenticada com publicações e ranking

## Como executar o projeto

### 1. Instalar dependências

```bash
npm install
```

Recomendação de ambiente local:

- Node.js `18`, alinhado com o arquivo `.nvmrc`;
- `npm` como gerenciador padrão deste projeto.
- `.editorconfig` para manter indentação, quebra de linha e newline final consistentes.

### 2. Configurar variáveis de ambiente

Use o arquivo `.env.example` como referência:

```bash
cp .env.example .env
```

Variáveis disponíveis:

- `REACT_APP_API_URL`: URL base da API consumida pelo frontend.

Se não for definida, a aplicação usa `http://127.0.0.1:8001` por padrão.

### 3. Subir a API fake

```bash
npm run api
```

A API será exposta em `http://127.0.0.1:8001`.

### 4. Subir o frontend

Em outro terminal:

```bash
npm start
```

O frontend será iniciado em `http://localhost:3000`.

## Como executar com Docker

O projeto agora possui conteinerização para subir o frontend e a API mock juntos.

### 1. Subir os containers

```bash
docker compose up --build
```

ou, se preferir via script:

```bash
npm run docker:up
```

### 2. Acessar os serviços

- frontend: `http://localhost:3000`
- API mock: `http://localhost:8001`

### 3. Encerrar os containers

```bash
docker compose down
```

ou:

```bash
npm run docker:down
```

## Scripts disponíveis

- `npm start`: inicia o frontend em modo de desenvolvimento
- `npm run build`: gera a build de produção
- `npm run lint`: executa o ESLint no código-fonte do frontend
- `npm run lint:fix`: aplica correções automáticas suportadas pelo ESLint
- `npm run format`: alias pragmático para `lint:fix`, usado como padronização automatizada atual
- `npm run format:check`: valida o padrão atual de código via ESLint
- `npm test -- --watchAll=false`: executa os testes uma vez
- `npm run test:ci`: executa os testes em modo apropriado para pipeline
- `npm run verify`: executa `lint` + `test:ci` + `build`
- `npm run api`: inicia o `json-server` usando o arquivo `db.json`
- `npm run docker:up`: sobe frontend + API mock via Docker Compose
- `npm run docker:down`: encerra os containers do Docker Compose

## Dados mockados

O arquivo `db.json` contém:

- usuários para login/cadastro;
- publicações usadas no feed;
- dados de ranking consumidos pela área autenticada.

O cadastro cria novos usuários diretamente nessa API fake enquanto o `json-server` estiver rodando.

## Autenticação atual

O fluxo de autenticação é local/mockado:

- login consulta o usuário no `json-server`;
- a sessão é persistida em `localStorage` via utilitário dedicado em `src/lib/storage/session.js`;
- rotas privadas são protegidas no frontend;
- logout remove a sessão local.

Esse comportamento é intencional para fins de estudo e prototipação.

## Arquitetura de navegação

O projeto possui uma camada dedicada para rotas em `src/routes`, responsável por:

- centralizar os paths da aplicação;
- separar guardas de rota pública e privada;
- compor as rotas principais do app;
- aplicar `lazy loading` nas páginas para reduzir o bundle inicial.

## Configuração compartilhada

O projeto agora centraliza parte das definições transversais para reduzir duplicação e acoplamento:

- `src/config/api.js`: configuração base de integração HTTP, como `baseURL` e `timeout`;
- `src/config/env.js`: resolução e validação das variáveis de ambiente do frontend;
- `src/constants/messages.js`: mensagens reutilizadas de autenticação e feed;
- `src/constants/storage.js`: chaves persistidas no `localStorage`;
- `src/features/auth/validation/schema.js`: schemas compartilhados de validação para os formulários de autenticação.

Essa organização ajuda a evitar strings e regras espalhadas por páginas e testes.

## Resiliência de interface

O frontend passou a contar com uma camada mínima de resiliência para falhas de UI e estados assíncronos:

- `src/components/AppErrorBoundary`: fallback global para erros de render em nível de rota;
- `src/components/AsyncState`: componente compartilhado para estados de carregamento, erro e vazio;
- `src/lib/storage/session.js`: encapsulamento de leitura e escrita da sessão local.

Com isso, a aplicação reduz lógica repetida e trata falhas de forma mais uniforme.

## Formulários e validação

Os formulários de autenticação agora usam uma estratégia baseada em schema dentro do próprio projeto:

- `src/lib/forms/schema.js`: utilitários genéricos para composição de validadores e criação de `resolver`;
- `src/features/auth/validation/schema.js`: schemas de login e cadastro usados pelo `react-hook-form`;
- `src/components/Input`: suporte melhorado a `label`, `id`, `aria-invalid`, `aria-describedby` e `autocomplete`.

Esse modelo mantém a validação declarativa e preparada para crescer sem depender de validações inline espalhadas pelas páginas.

## Organização por feature

Os domínios principais da aplicação foram agrupados em `src/features`:

- `src/features/auth`: contexto, páginas, validação, mapeadores e serviço de autenticação;
- `src/features/feed`: página, mapeadores e serviço do feed autenticado.

Essa organização aproxima UI, regras e integração de cada domínio, reduzindo dependências cruzadas entre pastas genéricas.

## Camada de dados frontend

Os serviços da aplicação passaram a trabalhar com uma camada mais explícita de dados:

- `src/features/auth/services/auth.mapper.js`: normalização do usuário autenticado e payload de cadastro;
- `src/features/feed/services/feed.mapper.js`: transformação de posts e ranking para o formato da UI;
- `src/lib/http/errors.js`: criação e normalização de erros de integração;
- `src/features/feed/services/feed.js`: método consolidado `getFeedOverview()` para entregar o domínio pronto para a tela.

Com isso, a UI fica menos acoplada ao formato bruto do `json-server` e mais preparada para troca futura de backend.

## Tema e sistema visual

O projeto possui uma base de tema centralizada em `src/styles/theme.js`, usada via `ThemeProvider`.

Essa camada concentra:

- paleta de cores;
- tipografia;
- espaçamentos;
- raios de borda;
- breakpoints;
- tamanhos reutilizáveis de layout e controles.

Com isso, os estilos centrais deixaram de depender de valores visuais espalhados em múltiplos arquivos, o que reduz inconsistência e facilita manutenção.

## Componentes reutilizáveis

Os componentes base da interface foram fortalecidos para servir como biblioteca interna mínima:

- `src/components/Button`: suporta variantes, tamanhos, estado de carregamento e ícones decorativos;
- `src/components/Card`: estrutura de conteúdo mais estável para posts e metadados;
- `src/components/UserInfo`: contrato compatível com props legadas e normalizadas, com semântica de progresso.

Essa camada reduz improviso nas telas e melhora a previsibilidade para evolução visual futura.

## Acessibilidade e responsividade

O fluxo principal recebeu uma camada extra de refinamento para uso real:

- `skip link` no cabeçalho para acesso rápido ao conteúdo principal;
- landmarks semânticos em `header`, `main`, `section` e `aside`;
- foco visível em links, botões e inputs;
- semântica melhorada em heading principal, busca e barra de progresso;
- ajustes de layout para navegação e conteúdo em telas menores.

Isso melhora a navegação por teclado e reduz fragilidade da interface em cenários mobile.

## Testes automatizados

A cobertura atual do frontend foi ampliada para proteger os fluxos mais sensíveis:

- testes de integração do app para login, cadastro, logout, redirecionamentos e estados do feed;
- testes unitários de serviços para autenticação e camada de dados do feed;
- testes unitários dos componentes base reutilizáveis;
- testes dedicados para `AppErrorBoundary`, persistência de sessão em `localStorage` e resolução de ambiente.

Com isso, a aplicação ganha uma base mais segura para refatorações incrementais.

## Ambientes e entrega

O projeto agora possui uma base mínima para padronização de ambiente e entrega contínua:

- `.env.example` como referência de configuração local;
- `.nvmrc` fixando a versão principal de Node usada pelo projeto;
- `.editorconfig` definindo regras básicas de consistência entre editores;
- `.dockerignore` reduzindo o contexto de build dos containers;
- `Dockerfile.frontend` para gerar a build React e servir via nginx;
- `Dockerfile.api` para subir o `json-server` em container;
- `docker-compose.yml` orquestrando frontend e API mock juntos;
- validação de `REACT_APP_API_URL` em tempo de bootstrap;
- workflow de CI em `.github/workflows/frontend-ci.yml` executando `npm ci`, `npm run lint`, `npm run test:ci` e `npm run build`;
- padronização do repositório em `npm`, evitando ambiguidade entre lockfiles.

## Qualidade e manutenção

O projeto já conta com:

- organização por feature para `auth` e `feed`;
- separação entre componentes globais, domínio e infraestrutura compartilhada;
- serviço dedicado para autenticação;
- serviço dedicado para feed;
- layout compartilhado para telas de autenticação;
- configuração e constantes reutilizáveis centralizadas;
- boundary de erro em nível de aplicação;
- padrão compartilhado para estados de loading, erro e vazio;
- validação de formulários baseada em schema interno;
- camada de dados desacoplada com mapeadores e erros normalizados;
- componentes reutilizáveis com contratos e testes dedicados;
- melhorias de acessibilidade e responsividade no fluxo principal;
- tema global com tokens compartilhados;
- rotas modularizadas com carregamento sob demanda;
- ambiente padronizado com `.env.example`, `.nvmrc` e workflow de CI;
- lint automatizado e autofix via ESLint integrados ao fluxo do projeto;
- conteinerização com Docker e Docker Compose para frontend + API mock;
- testes cobrindo navegação, redirecionamentos, validação de login, serviços, componentes base, cadastro, logout, skip navigation, boundary de erro, sessão local e estados do feed.

Melhorias futuras recomendadas:

- documentar padrões de componentes;
- refinar ainda mais a responsividade das páginas;
- evoluir a camada de API para cenários além do mock;
- revisar a base CRA em uma etapa posterior, sem migração precipitada.

## Observações

- o projeto utiliza `Create React App`, portanto depende do ecossistema do `react-scripts`;
- para o fluxo completo funcionar, o frontend e o `json-server` devem estar rodando ao mesmo tempo;
- se a API fake não estiver ativa, login, cadastro e feed autenticado não carregarão dados.

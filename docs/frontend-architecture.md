# Arquitetura do frontend

Este documento descreve como o frontend foi organizado para que novas pessoas no projeto entendam rapidamente onde cada responsabilidade mora.

## Visão geral

O projeto é uma SPA em React com quatro fluxos principais:

1. home pública
2. login
3. cadastro
4. feed autenticado

Mesmo usando `json-server` como backend mock, a aplicação já separa navegação, sessão, componentes compartilhados, serviços HTTP e domínio por feature.

## Camadas principais

### `src/App.js`

É o ponto de montagem da aplicação. Ele organiza os providers globais nesta ordem:

1. `AuthProvider`
2. `ThemeProvider`
3. `BrowserRouter`
4. `AppErrorBoundary`
5. `AppRoutes`

Essa ordem é importante porque:

- as guardas de rota dependem do contexto de autenticação;
- os componentes dependem do tema visual;
- a navegação depende do roteador;
- a boundary de erro precisa envolver as telas para capturar falhas de render.

### `src/routes`

Concentra a navegação do app:

- `paths.js`: define as rotas em um único lugar;
- `guards.jsx`: protege rotas públicas e privadas;
- `index.jsx`: compõe as rotas e aplica `lazy loading`.

O objetivo é evitar strings soltas e impedir que cada página decida sozinha se pode ou não ser acessada.

### `src/features`

Cada feature agrupa o que pertence ao mesmo domínio.

#### `src/features/auth`

Concentra:

- contexto de autenticação;
- hooks de login e cadastro;
- serviços de autenticação;
- páginas de login e cadastro;
- schema de validação.

#### `src/features/feed`

Concentra:

- hook de feed;
- serviço do feed;
- página autenticada principal.

Essa organização evita que componentes, páginas e serviços fiquem espalhados sem relação clara.

### `src/components`

Guarda componentes reutilizáveis em mais de um fluxo, como:

- `Header`
- `Button`
- `Input`
- `AuthLayout`
- `AsyncState`
- `AppErrorBoundary`

Eles não devem carregar regra de negócio de domínio. O papel deles é estruturar interface e reutilizar comportamento de UI.

### `src/services` e `src/lib`

`src/services` guarda a infraestrutura HTTP comum, como a instância do `axios`.

`src/lib` guarda utilidades transversais:

- tratamento de erros HTTP;
- sessão local;
- logger;
- schemas auxiliares;
- helpers de teste.

## Fluxo de autenticação

### Login

1. a página renderiza o formulário;
2. o hook `useLogin` recebe os dados válidos;
3. o hook chama `authService.login`;
4. se der certo, o usuário é salvo no `AuthContext`;
5. o `AuthContext` persiste a sessão em `localStorage`;
6. a navegação vai para `/feed`.

### Cadastro

1. a página coleta nome, e-mail e senha;
2. o hook `useRegister` chama `authService.register`;
3. o serviço verifica e-mail duplicado no mock;
4. com sucesso, a sessão também é criada no frontend;
5. o usuário entra direto no feed.

## Fluxo do feed

1. a guarda privada libera acesso apenas para usuário autenticado;
2. a página chama `useFeed`;
3. o hook aciona `feedService.getFeedOverview`;
4. o serviço consulta a API mock e monta um contrato mais simples para a UI;
5. a página renderiza loading, erro, vazio ou conteúdo.

## Tratamento de erros e estados assíncronos

O projeto usa duas linhas principais:

- `AppErrorBoundary` para erros inesperados de renderização;
- `AsyncState` para loading, erro recuperável e estado vazio.

Isso evita repetir blocos de fallback em cada tela e padroniza a experiência.

## Preparação para backend real

O frontend ainda usa mock, mas já foi organizado para que a troca futura seja incremental:

- a UI não chama `axios` direto;
- serviços de domínio escondem detalhes do `json-server`;
- erros HTTP são normalizados;
- sessão local está encapsulada;
- rotas e paths estão centralizados.

Quando surgir um backend real, a tendência é trocar principalmente:

- contratos dos serviços em `features/*/services`;
- regras de sessão em `features/auth/context` e `lib/storage/session`;
- política de autenticação e autorização.

## Como adicionar uma nova feature

Fluxo recomendado:

1. criar uma pasta em `src/features/nome-da-feature`;
2. separar `pages`, `hooks`, `services` e arquivos auxiliares;
3. reutilizar componentes globais antes de criar novos;
4. expor a feature por um `index.js` local quando fizer sentido;
5. conectar a feature nas rotas em `src/routes`.

## Como pensar a manutenção

Se uma mudança for visual e reutilizável, ela tende a ficar em `src/components`.

Se a mudança depende de regra de domínio, integração ou fluxo de usuário, ela tende a ficar em `src/features`.

Se a mudança for transversal, como ambiente, logger ou sessão, ela tende a ficar em `src/config`, `src/constants`, `src/lib` ou `src/services`.

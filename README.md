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
- formulário de login com `react-hook-form`;
- formulário de cadastro com validação e verificação de e-mail já cadastrado;
- integração com API mockada via `axios`;
- feed carregado a partir do `json-server`;
- ranking lateral carregado da API;
- botão de logout no cabeçalho autenticado;
- testes básicos de roteamento e fluxo público.

## Stack utilizada

- React 18
- React Router DOM 6
- Styled Components
- React Hook Form
- Axios
- JSON Server
- Create React App
- Testing Library

## Estrutura principal

```text
src/
  assets/            imagens e recursos estáticos
  components/        componentes reutilizáveis de UI e layout
  contexts/          contexto de autenticação
  pages/             páginas da aplicação
  services/          integração com API e regras de acesso a dados
  styles/            estilos globais
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

### 2. Subir a API fake

```bash
npm run api
```

A API será exposta em `http://localhost:8001`.

### 3. Subir o frontend

Em outro terminal:

```bash
npm start
```

O frontend será iniciado em `http://localhost:3000`.

## Scripts disponíveis

- `npm start`: inicia o frontend em modo de desenvolvimento
- `npm run build`: gera a build de produção
- `npm test -- --watchAll=false`: executa os testes uma vez
- `npm run api`: inicia o `json-server` usando o arquivo `db.json`

## Dados mockados

O arquivo `db.json` contém:

- usuários para login/cadastro;
- publicações usadas no feed;
- dados de ranking consumidos pela área autenticada.

O cadastro cria novos usuários diretamente nessa API fake enquanto o `json-server` estiver rodando.

## Autenticação atual

O fluxo de autenticação é local/mockado:

- login consulta o usuário no `json-server`;
- a sessão é persistida em `localStorage`;
- rotas privadas são protegidas no frontend;
- logout remove a sessão local.

Esse comportamento é intencional para fins de estudo e prototipação.

## Qualidade e manutenção

O projeto já conta com:

- separação entre páginas, componentes, contexto e serviços;
- serviço dedicado para autenticação;
- serviço dedicado para feed;
- layout compartilhado para telas de autenticação;
- testes iniciais de navegação.

Melhorias futuras recomendadas:

- ampliar cobertura de testes;
- documentar padrões de componentes;
- melhorar responsividade das páginas;
- evoluir a camada de API para cenários além do mock;
- revisar a base CRA em uma etapa posterior, sem migração precipitada.

## Observações

- o projeto utiliza `Create React App`, portanto depende do ecossistema do `react-scripts`;
- para o fluxo completo funcionar, o frontend e o `json-server` devem estar rodando ao mesmo tempo;
- se a API fake não estiver ativa, login, cadastro e feed autenticado não carregarão dados.

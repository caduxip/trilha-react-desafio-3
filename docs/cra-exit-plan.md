# Plano de saída do Create React App

Este documento registra como sair do `react-scripts` sem transformar a migração em uma reescrita desnecessária.

O objetivo não é migrar agora. O objetivo é deixar claro:

- por que a troca faz sentido no futuro;
- o que já está preparado no projeto;
- quais dependências ainda prendem o frontend ao CRA;
- como executar a migração em fases, com risco controlado.

## Situação atual

Hoje o frontend ainda depende de `react-scripts` para:

- `npm start`
- `npm run build`
- `npm test`
- configuração implícita de Babel, Webpack e Jest
- convenções de ambiente baseadas em `REACT_APP_*`

Ao mesmo tempo, a aplicação já reduziu parte do acoplamento ao CRA porque:

- a configuração de ambiente está centralizada em `src/config/env.js`;
- a aplicação usa `ReactDOM.createRoot`, `BrowserRouter` e providers explícitos;
- a camada HTTP e os serviços não dependem do bundler;
- os testes e a documentação já estão estruturados;
- a observabilidade, o Docker e a CI não dependem diretamente da pasta interna do CRA.

## Objetivo da migração

O alvo recomendado para a saída do CRA é um bundler mais moderno e enxuto, com preferência prática por `Vite`.

O motivo da recomendação:

- tempo de startup menor;
- build mais previsível;
- ecossistema mais atual para React;
- menos dependência de uma cadeia antiga que hoje concentra boa parte dos alertas de `npm audit`.

Importante: esta recomendação é arquitetural. Ela não significa que a migração deva acontecer agora.

## Critérios para iniciar a saída do CRA

A migração deve começar apenas quando estes pontos estiverem verdadeiros:

1. a base funcional do frontend estiver estável;
2. os fluxos críticos estiverem protegidos por testes suficientes;
3. o time aceitar uma janela curta de ajuste em tooling e CI;
4. houver tempo para validar desenvolvimento local, build, Docker e pipeline.

## O que não deve mudar na migração

A troca do bundler não deve virar motivo para reestruturar o produto.

Devem permanecer:

- organização por `features`;
- rotas e guardas;
- `styled-components`;
- serviços HTTP;
- contexto de autenticação;
- smoke E2E, regressão visual e testes principais;
- Docker, com adaptação apenas do processo de build.

## Principais pontos de acoplamento com o CRA

### 1. Scripts de execução

Hoje `start`, `build` e `test` dependem de `react-scripts`.

Impacto:

- qualquer migração vai alterar `package.json`, CI e release.

### 2. Variáveis de ambiente

Hoje a convenção do projeto usa `REACT_APP_*`.

Impacto:

- em Vite, a convenção padrão passa a ser `VITE_*`;
- o projeto vai precisar decidir entre:
  - migrar todas as variáveis de uma vez;
  - ou manter uma camada de compatibilidade temporária.

### 3. Jest implícito do CRA

Os testes atuais usam a configuração padrão do CRA.

Impacto:

- o time deve decidir se mantém `Jest` com configuração explícita;
- ou se migra para `Vitest` em uma segunda etapa.

Recomendação:

- primeiro sair do CRA mantendo Jest;
- só depois avaliar troca do runner de testes.

### 4. Build da imagem Docker

Hoje o `Dockerfile.frontend` roda `npm run build`, que por sua vez chama `react-scripts build`.

Impacto:

- a imagem continua existindo, mas o estágio de build muda junto com o bundler.

## Estratégia recomendada

### Fase 1: congelar baseline

Objetivo:

- garantir que a migração compare o mesmo comportamento antes e depois.

Checklist:

- `npm run lint`
- `npm test -- --watchAll=false`
- `npm run build`
- `npm run e2e`
- `npm run e2e:visual`

Saída esperada:

- uma referência clara de funcionamento do app antes da troca.

### Fase 2: introduzir o novo bundler em paralelo

Objetivo:

- preparar o novo ambiente sem quebrar imediatamente o antigo.

Ações:

- instalar `vite` e `@vitejs/plugin-react`;
- criar `vite.config.js`;
- criar `index.html` compatível com a nova entrada;
- ajustar scripts paralelos de migração, por exemplo:
  - `dev:vite`
  - `build:vite`

Saída esperada:

- o projeto sobe e builda também pelo novo bundler, ainda sem remover o CRA.

### Fase 3: adaptar ambiente e bootstrap

Objetivo:

- resolver os pontos específicos do bundler.

Ações:

- revisar como `src/index.js` é consumido;
- adaptar a carga de variáveis de ambiente;
- revisar import de assets estáticos;
- validar `lazy loading`, `reportWebVitals` e observabilidade.

Saída esperada:

- frontend funcional no novo bundler com o mesmo comportamento do app atual.

### Fase 4: estabilizar testes e CI

Objetivo:

- garantir que a migração não quebre a esteira.

Ações:

- adaptar pipeline para usar os novos scripts;
- validar build local e da workflow de CI;
- revisar release Docker/GHCR.

Saída esperada:

- CI verde e imagem de frontend gerada pelo novo processo.

### Fase 5: remover o CRA

Objetivo:

- encerrar a convivência dupla.

Ações:

- remover `react-scripts`;
- remover scripts antigos;
- limpar dependências e documentação;
- atualizar README, ADRs e Dockerfiles se necessário.

Saída esperada:

- projeto operando sem `react-scripts`.

## Ordem recomendada dos arquivos mais sensíveis

Os pontos que mais merecem atenção durante a migração são:

1. `package.json`
2. `src/index.js`
3. `src/config/env.js`
4. `Dockerfile.frontend`
5. `.github/workflows/frontend-ci.yml`
6. `.github/workflows/frontend-release.yml`

## Riscos conhecidos

### Risco baixo

- ajustes de scripts e documentação

### Risco médio

- compatibilidade de ambiente;
- adaptação da pipeline;
- diferenças sutis no build final

### Risco alto

- tentar trocar bundler, runner de testes e convenção de variáveis ao mesmo tempo

## Recomendação final

O projeto já tem organização suficiente para sair do CRA sem colapso arquitetural. A troca faz sentido, mas deve acontecer como uma iniciativa dedicada de tooling, e não misturada com mudança de produto.

Resumo prático:

1. não migrar agora só porque o CRA é antigo;
2. quando migrar, fazer em fases;
3. manter UI, domínio e testes o mais intactos possível;
4. trocar primeiro o bundler;
5. só depois discutir runner de testes ou outras modernizações maiores.

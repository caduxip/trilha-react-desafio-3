# Guia dos componentes compartilhados

Este guia descreve o contrato dos componentes reutilizáveis do projeto e como evoluí-los sem criar inconsistência.

## Princípios

Os componentes compartilhados devem:

- resolver um problema visual ou estrutural recorrente;
- ter contrato simples;
- evitar regra de negócio específica de uma feature;
- ser previsíveis para quem consome;
- ser fáceis de testar.

## `Button`

Arquivo principal: `src/components/Button/index.jsx`

Responsabilidade:

- renderizar o botão base do projeto;
- aplicar variantes visuais;
- lidar com estado de loading;
- aceitar uso como botão nativo ou como link via prop `as`.

Contrato atual:

- `title`: texto principal quando `children` não é usado;
- `children`: sobrescreve `title` para casos mais flexíveis;
- `variant`: estilo visual, como `primary` e `secondary`;
- `size`: tamanho visual;
- `fullWidth`: expande horizontalmente;
- `iconLeft` e `iconRight`: ícones decorativos;
- `isLoading`: desabilita interação e sinaliza operação em andamento.

Quando evoluir:

- prefira adicionar variantes reutilizáveis em vez de criar botões específicos por tela;
- mantenha suporte a props nativas do botão para acessibilidade e formulários.

## `Input`

Arquivo principal: `src/components/Input/index.jsx`

Responsabilidade:

- renderizar o campo visual da aplicação;
- integrar com `react-hook-form` por meio de `Controller`;
- exibir erro do campo com semântica acessível.

Contrato atual:

- `name` e `control` conectam o campo ao formulário;
- `label` melhora semântica e acessibilidade;
- `errorMessage` controla o feedback visual;
- `leftIcon` adiciona apoio visual sem afetar valor do campo.

Quando evoluir:

- preserve `id`, `aria-invalid` e `aria-describedby`;
- não misture validação de domínio dentro do componente;
- mantenha regras de validação em schema ou hook da feature.

## `Header`

Arquivo principal: `src/components/Header/index.jsx`

Responsabilidade:

- exibir navegação pública;
- exibir navegação/autoria quando o usuário está autenticado;
- oferecer saída da sessão;
- manter o `skip link` para acessibilidade.

Ponto importante:

- ele funciona em dois modos: público e autenticado;
- a decisão final usa o contexto de autenticação, mas também aceita a prop `autenticado` para cenários específicos.

## `AuthLayout`

Arquivo principal: `src/components/AuthLayout/index.jsx`

Responsabilidade:

- padronizar a composição visual de login e cadastro;
- reaproveitar header, área institucional e área de formulário.

Regra prática:

- qualquer nova tela pública de autenticação deve tentar reutilizar esse layout antes de criar um novo container.

## `AsyncState`

Arquivo principal: `src/components/AsyncState/index.jsx`

Responsabilidade:

- exibir fallback de carregamento, erro ou vazio;
- opcionalmente permitir ação de retry.

Regra prática:

- sempre que uma tela assíncrona tiver loading/erro/vazio explícitos, prefira reutilizar esse componente.

## `AppErrorBoundary`

Arquivo principal: `src/components/AppErrorBoundary/index.jsx`

Responsabilidade:

- evitar quebra total da interface quando um componente lança erro em renderização;
- mostrar fallback claro para o usuário;
- registrar a falha no logger do frontend.

## `Card` e `UserInfo`

Responsabilidade:

- `Card` representa uma publicação do feed;
- `UserInfo` representa um item do ranking.

Esses componentes recebem dados já preparados pela camada de domínio. Isso é importante porque evita que o componente precise conhecer detalhes do contrato bruto da API.

## Como criar um novo componente compartilhado

Checklist recomendado:

1. confirmar que o problema aparece em mais de uma tela;
2. definir um contrato simples de props;
3. documentar o papel do componente com comentário curto no topo do arquivo;
4. escrever pelo menos um teste unitário se o componente tiver comportamento relevante;
5. adicionar ao guia quando ele passar a fazer parte da base comum do projeto.

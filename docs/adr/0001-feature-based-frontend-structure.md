# ADR 0001: organizar o frontend por feature

- Status: aceito
- Data: 2026-03-18

## Contexto

O projeto começou pequeno, mas já possui fluxos com responsabilidades diferentes:

- autenticação;
- feed autenticado;
- páginas públicas;
- componentes compartilhados;
- infraestrutura de sessão, ambiente e HTTP.

Se tudo continuasse organizado apenas por tipo de arquivo, como `pages`, `services` e `hooks`, o custo de navegação e manutenção aumentaria à medida que cada fluxo crescesse.

## Decisão

Os domínios principais do frontend ficam organizados em `src/features`, aproximando:

- páginas;
- hooks;
- serviços;
- validações;
- arquivos auxiliares do mesmo fluxo.

Componentes verdadeiramente compartilhados continuam em `src/components`. Infraestrutura transversal continua em `src/config`, `src/lib`, `src/services` e `src/styles`.

## Consequências

### Positivas

- reduz espalhamento de arquivos relacionados;
- facilita onboarding porque cada fluxo mora em uma mesma área;
- deixa a troca futura do mock por backend real mais localizada;
- ajuda a evitar regra de negócio sendo empurrada para componentes globais.

### Negativas

- exige disciplina para decidir o que é compartilhado e o que pertence à feature;
- pode parecer mais “estruturado demais” para mudanças muito pequenas, se usado sem critério.

## Impacto no código

Esta decisão aparece principalmente em:

- `src/features/auth`
- `src/features/feed`
- `src/components`
- `src/routes`

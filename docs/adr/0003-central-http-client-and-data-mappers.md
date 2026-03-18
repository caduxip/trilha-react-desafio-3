# ADR 0003: centralizar o cliente HTTP e usar mapeadores entre API e UI

- Status: aceito
- Data: 2026-03-18

## Contexto

Mesmo usando `json-server`, a aplicação já precisa lidar com:

- `baseURL` por ambiente;
- timeout;
- logging de requests;
- normalização de erros;
- contratos da UI que não deveriam depender do formato bruto da API.

Se as páginas consumissem `axios` diretamente, a troca futura para backend real exigiria retrabalho maior e aumentaria o acoplamento do frontend com o mock.

## Decisão

O projeto adota:

- instância única de `axios` em `src/services/api.js`;
- normalização de falhas em `src/lib/http/errors.js`;
- mapeadores por domínio em `features/*/services/*.mapper.js`;
- hooks e páginas consumindo serviços de domínio, não a infraestrutura HTTP diretamente.

## Consequências

### Positivas

- separa transporte de regra de apresentação;
- facilita padronizar logs, tempo de resposta e falhas;
- reduz impacto de futuras mudanças no contrato da API;
- melhora testabilidade da camada de dados.

### Negativas

- adiciona uma camada a mais entre tela e API;
- exige manter mapeadores alinhados quando o contrato do backend mudar.

## Impacto no código

Esta decisão aparece principalmente em:

- `src/services/api.js`
- `src/lib/http/errors.js`
- `src/features/auth/services`
- `src/features/feed/services`

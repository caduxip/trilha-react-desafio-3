# ADR 0002: manter a sessão de autenticação no frontend enquanto o backend é mockado

- Status: aceito
- Data: 2026-03-18

## Contexto

O projeto ainda não possui backend corporativo real. O login e o cadastro dependem apenas de `json-server`, então não existe sessão segura em servidor, token real ou política de autorização.

Mesmo assim, a aplicação precisa:

- saber se o usuário está “logado”;
- proteger a rota `/feed`;
- restaurar sessão ao recarregar a página;
- manter o fluxo de login, cadastro e logout consistente.

## Decisão

A sessão atual é de responsabilidade do frontend:

- o `AuthContext` expõe `user`, `isAuthenticated`, `signIn` e `signOut`;
- a persistência usa `localStorage` encapsulado em `src/lib/storage/session.js`;
- guardas de rota consultam o contexto para permitir ou bloquear navegação.

## Consequências

### Positivas

- mantém o fluxo funcional no escopo atual;
- evita espalhar acesso a `localStorage` por vários componentes;
- facilita a futura troca para sessão real, porque a UI depende do contexto, não do armazenamento bruto.

### Negativas

- não representa autenticação segura de produção;
- exige futura revisão quando existir backend real.

## Impacto no código

Esta decisão aparece principalmente em:

- `src/features/auth/context/auth.jsx`
- `src/lib/storage/session.js`
- `src/routes/guards.jsx`
- páginas e hooks de autenticação

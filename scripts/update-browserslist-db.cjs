#!/usr/bin/env node

// Este wrapper existe para deixar explícito no repositório
// como atualizamos o banco de navegadores usado por build, lint e testes.
// Assim, quem entrar no projeto não precisa decorar o comando do `npx`.
//
// Ele faz parte da rotina de manutenção de dependências do frontend,
// junto com `npm run deps:outdated` e `npm run deps:audit`.
// A ideia é separar:
// 1. atualização segura e recorrente de tooling;
// 2. análise de dependências desatualizadas;
// 3. análise de vulnerabilidades reportadas pelo npm.
const { spawnSync } = require('node:child_process');

const command = spawnSync('npx', ['update-browserslist-db@latest'], {
  stdio: 'inherit',
  shell: true,
});

if (command.status !== 0) {
  process.exit(command.status ?? 1);
}

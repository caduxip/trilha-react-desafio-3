#!/usr/bin/env node

// Este wrapper existe para deixar explícito no repositório
// como atualizamos o banco de navegadores usado por build, lint e testes.
// Assim, quem entrar no projeto não precisa decorar o comando do `npx`.
const { spawnSync } = require('node:child_process');

const command = spawnSync('npx', ['update-browserslist-db@latest'], {
  stdio: 'inherit',
  shell: true,
});

if (command.status !== 0) {
  process.exit(command.status ?? 1);
}

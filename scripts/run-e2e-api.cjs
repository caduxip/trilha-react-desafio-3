const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

// Para os testes E2E, usamos uma cópia temporária do seed versionado.
// Assim, o fluxo de cadastro pode criar usuários à vontade sem
// depender do estado atual do db.json principal do projeto.
const sourceDbPath = path.resolve(__dirname, '..', 'data', 'mock', 'db.seed.json');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'trilha-react-e2e-'));
const tempDbPath = path.join(tempDir, 'db.json');

fs.copyFileSync(sourceDbPath, tempDbPath);

const jsonServerBin = require.resolve('json-server/lib/cli/bin');
const apiProcess = spawn(
  process.execPath,
  [jsonServerBin, '--watch', tempDbPath, '--host', '127.0.0.1', '-p', '8001'],
  {
    stdio: 'inherit',
  },
);

const cleanup = () => {
  if (!apiProcess.killed) {
    apiProcess.kill('SIGTERM');
  }

  fs.rmSync(tempDir, { recursive: true, force: true });
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

apiProcess.on('exit', (code) => {
  fs.rmSync(tempDir, { recursive: true, force: true });
  process.exit(code ?? 0);
});

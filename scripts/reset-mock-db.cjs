const fs = require('fs');
const path = require('path');

// O seed é a fotografia limpa e versionada do mock.
// O db.json continua sendo a base "viva", alterada por login/cadastro local.
const seedPath = path.resolve(__dirname, '..', 'data', 'mock', 'db.seed.json');
const dbPath = path.resolve(__dirname, '..', 'db.json');

// O reset é um copy simples para manter o fluxo previsível e fácil de entender.
fs.copyFileSync(seedPath, dbPath);

console.log(`Mock resetado com sucesso a partir de ${path.relative(process.cwd(), seedPath)}.`);

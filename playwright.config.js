const { defineConfig } = require('@playwright/test');

// Esta configuração sobe a API mock e o frontend automaticamente
// antes da suíte E2E começar. Assim, o teste fica reproduzível
// sem depender que o desenvolvedor abra dois terminais manualmente.
module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'node scripts/run-e2e-api.cjs',
      url: 'http://127.0.0.1:8001/users',
      reuseExistingServer: !process.env.CI,
      timeout: 30 * 1000,
    },
    {
      command: 'HOST=127.0.0.1 PORT=3000 BROWSER=none npm start',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 90 * 1000,
    },
  ],
});

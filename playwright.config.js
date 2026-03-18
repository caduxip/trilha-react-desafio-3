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
      // Fixamos as variáveis do frontend para que a suíte E2E não dependa
      // de um `.env` local que o desenvolvedor possa ter configurado.
      command:
        'HOST=127.0.0.1 PORT=3000 BROWSER=none REACT_APP_API_URL=http://127.0.0.1:8001 REACT_APP_ENABLE_SENTRY=false REACT_APP_ENABLE_WEB_VITALS=false REACT_APP_LOG_LEVEL=silent npm start',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 90 * 1000,
    },
  ],
});

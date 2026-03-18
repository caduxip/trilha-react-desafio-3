const { test, expect } = require('@playwright/test');

const { authenticateSeedUser } = require('./helpers/auth');

const screenshotOptions = {
  animations: 'disabled',
  caret: 'hide',
  fullPage: true,
};

test.describe('Regressao visual da aplicacao', () => {
  test.use({
    viewport: { width: 1440, height: 1080 },
  });

  test('mantem a home publica estavel', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /implemente/i })).toBeVisible();

    // O snapshot serve como alarme para mudanças involuntárias de layout, espaçamento e tipografia.
    await expect(page).toHaveScreenshot('home-publica.png', screenshotOptions);
  });

  test('mantem a tela de login estavel', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /faça seu login/i })).toBeVisible();

    await expect(page).toHaveScreenshot('login.png', screenshotOptions);
  });

  test('mantem a tela de cadastro estavel', async ({ page }) => {
    await page.goto('/cadastro');
    await expect(page.getByRole('heading', { name: /comece agora grátis/i })).toBeVisible();

    await expect(page).toHaveScreenshot('cadastro.png', screenshotOptions);
  });

  test('mantem o feed autenticado estavel', async ({ page }) => {
    await authenticateSeedUser(page);
    await page.goto('/feed');
    await expect(page.getByRole('button', { name: 'Atualizar' })).toBeVisible({
      timeout: 15000,
    });

    await expect(page).toHaveScreenshot('feed-autenticado.png', screenshotOptions);
  });
});

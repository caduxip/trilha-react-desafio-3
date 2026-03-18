const { test, expect } = require('@playwright/test');

const { defaultUser, loginWithDefaultUser } = require('./helpers/auth');

const createUniqueUser = () => {
  const suffix = `${Date.now()}-${Math.round(Math.random() * 1000)}`;

  return {
    name: `Smoke User ${suffix}`,
    email: `smoke-${suffix}@email.com`,
    password: '123456',
  };
};

test.describe('Smoke da aplicacao', () => {
  test('permite navegar da home para login', async ({ page }) => {
    // Este teste garante que a aplicação sobe e que a navegação pública básica funciona.
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /implemente/i })).toBeVisible();
    await page.getByRole('link', { name: 'Entrar' }).click();

    await expect(page.getByRole('heading', { name: /faça seu login/i })).toBeVisible();
  });

  test('permite autenticar um usuario existente e abrir o feed', async ({ page }) => {
    // Usamos um usuário seed da base mock para validar o caminho feliz de autenticação.
    await loginWithDefaultUser(page);

    await expect(page.getByRole('heading', { name: 'Feed' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Atualizar' })).toBeVisible();
    await expect(page.getByText('Projeto para curso de HTML e CSS')).toBeVisible();
  });

  test('permite cadastrar um novo usuario e entrar automaticamente', async ({ page }) => {
    const user = createUniqueUser();

    await page.goto('/cadastro');

    // O e-mail dinâmico evita colisão entre execuções locais e de CI.
    await page.getByLabel('Nome completo').fill(user.name);
    await page.getByLabel('E-mail').fill(user.email);
    await page.getByLabel('Senha').fill(user.password);
    await page.getByRole('button', { name: 'Criar minha conta' }).click();

    await expect(page.getByRole('heading', { name: 'Feed' })).toBeVisible();
    await expect(page.getByText(user.name)).toBeVisible();
  });
});

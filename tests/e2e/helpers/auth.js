const defaultUser = {
  avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
  email: 'pablo@email.com',
  id: 1,
  name: 'Pablo Henrique',
  password: '123456',
  percentual: 92,
};

const loginWithDefaultUser = async (page) => {
  // Este helper mantém o fluxo autenticado consistente entre cenários
  // funcionais e visuais, sem repetir o mesmo passo a passo em vários testes.
  await page.goto('/login');
  await page.getByLabel('E-mail').fill(defaultUser.email);
  await page.getByLabel('Senha').fill(defaultUser.password);
  await page.getByRole('button', { name: 'Entrar' }).click();
};

const authenticateSeedUser = async (page) => {
  // Para testes visuais, a sessão pré-carregada deixa o cenário mais estável
  // do que depender do fluxo de formulário para chegar ao feed.
  await page.addInitScript((user) => {
    window.localStorage.setItem('@dio:user', JSON.stringify(user));
  }, defaultUser);
};

module.exports = {
  authenticateSeedUser,
  defaultUser,
  loginWithDefaultUser,
};

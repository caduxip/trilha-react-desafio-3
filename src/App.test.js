import { render, screen } from '@testing-library/react';

import App from './App';

const renderAtRoute = (route) => {
  window.history.pushState({}, 'Test page', route);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
});

test('redirects unauthenticated users from feed to login', async () => {
  renderAtRoute('/feed');

  expect(await screen.findByText('Faça seu login')).toBeInTheDocument();
});

test('renders the registration screen at /cadastro', async () => {
  renderAtRoute('/cadastro');

  expect(await screen.findByText('Comece agora grátis')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /criar minha conta/i })).toBeInTheDocument();
});

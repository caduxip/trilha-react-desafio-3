// Testes de acessibilidade dos fluxos principais.
// A ideia aqui é validar automaticamente violações óbvias de semântica e landmarks
// sem depender apenas de revisão manual de interface.
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import App from './App';
import { authService } from './features/auth/services/auth';
import { feedService } from './features/feed/services/feed';
import { ROUTES } from './routes/paths';
import { authenticateUser, createPost, createRankingEntry, createUser } from './test/appTestData';

jest.mock('./features/auth/services/auth', () => ({
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  authService: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

jest.mock('./features/feed/services/feed', () => ({
  feedService: {
    getFeedOverview: jest.fn(),
  },
}));

const mockedAuthService = authService;
const mockedFeedService = feedService;

const renderAtRoute = (route) => {
  window.history.pushState({}, 'Accessibility test page', route);

  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();

  mockedAuthService.login.mockResolvedValue(createUser());
  mockedAuthService.register.mockResolvedValue(createUser());
  mockedFeedService.getFeedOverview.mockResolvedValue({
    posts: [createPost()],
    ranking: [createRankingEntry()],
  });
});

test('home publica nao possui violacoes basicas de acessibilidade', async () => {
  const { container } = renderAtRoute(ROUTES.home);

  await screen.findByRole('heading', {
    level: 1,
    name: /implemente o seu futuro global agora/i,
  });

  // O axe faz uma varredura automática no DOM renderizado e nos ajuda
  // a detectar problemas básicos de semântica e navegação.
  expect(await axe(container)).toHaveNoViolations();
});

test('login nao possui violacoes basicas de acessibilidade', async () => {
  const { container } = renderAtRoute(ROUTES.login);

  await screen.findByRole('heading', {
    name: /faça seu login/i,
  });

  expect(await axe(container)).toHaveNoViolations();
});

test('feed autenticado nao possui violacoes basicas de acessibilidade', async () => {
  authenticateUser();
  const { container } = renderAtRoute(ROUTES.feed);

  // Esperamos o conteúdo do feed terminar de carregar antes da varredura do axe.
  // Isso evita analisar um DOM em transição e reduz warnings de act.
  await screen.findByText('Projeto para curso de HTML e CSS');

  expect(await axe(container)).toHaveNoViolations();
});

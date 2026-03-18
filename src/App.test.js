// Testes de integração do fluxo principal do app.
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { MESSAGES } from './constants/messages';
import { STORAGE_KEYS } from './constants/storage';
import { authService } from './features/auth/services/auth';
import { AUTH_VALIDATION_MESSAGES } from './features/auth/validation/schema';
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
  // Simula a navegação do navegador antes de renderizar a aplicação.
  window.history.pushState({}, 'Test page', route);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();

  mockedFeedService.getFeedOverview.mockResolvedValue({
    posts: [createPost()],
    ranking: [createRankingEntry()],
  });
});

test('redirects unauthenticated users from feed to login', async () => {
  renderAtRoute(ROUTES.feed);

  expect(await screen.findByText('Faça seu login')).toBeInTheDocument();
});

test('renders the registration screen at /cadastro', async () => {
  renderAtRoute(ROUTES.register);

  expect(await screen.findByText('Comece agora grátis')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /criar minha conta/i })).toBeInTheDocument();
});

test('redirects authenticated users away from the public login route', async () => {
  authenticateUser();

  renderAtRoute(ROUTES.login);

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();
  expect(screen.getByText('# RANKING 5 TOP DA SEMANA')).toBeInTheDocument();
});

test('renders skip navigation and a primary heading on the home page', async () => {
  renderAtRoute(ROUTES.home);

  expect(
    await screen.findByRole('link', {
      name: /pular para o conteúdo principal/i,
    }),
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('heading', {
      level: 1,
      name: /implemente o seu futuro global agora/i,
    }),
  ).toBeInTheDocument();
});

test('blocks login submit when the form data is invalid', async () => {
  renderAtRoute(ROUTES.login);

  userEvent.type(screen.getByPlaceholderText('E-mail'), 'email-invalido');
  userEvent.type(screen.getByPlaceholderText('Password'), '123');
  userEvent.click(screen.getByRole('button', { name: /entrar/i }));

  expect(await screen.findByText(AUTH_VALIDATION_MESSAGES.emailInvalid)).toBeInTheDocument();
  expect(screen.getByText(AUTH_VALIDATION_MESSAGES.passwordMinLength)).toBeInTheDocument();
  expect(mockedAuthService.login).not.toHaveBeenCalled();
});

test('allows the user to log in and load the authenticated feed', async () => {
  mockedAuthService.login.mockResolvedValue(createUser());

  renderAtRoute(ROUTES.login);

  userEvent.type(screen.getByPlaceholderText('E-mail'), 'pablo@email.com');
  userEvent.type(screen.getByPlaceholderText('Password'), '123456');
  userEvent.click(screen.getByRole('button', { name: /entrar/i }));

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();
  expect(screen.getByText('# RANKING 5 TOP DA SEMANA')).toBeInTheDocument();
  expect(screen.getAllByText('Pablo Henrique').length).toBeGreaterThan(0);

  await waitFor(() => {
    expect(mockedFeedService.getFeedOverview).toHaveBeenCalledTimes(1);
  });
});

test('shows duplicated email feedback in the registration flow', async () => {
  const duplicatedEmailError = new Error('EMAIL_IN_USE');

  duplicatedEmailError.code = 'EMAIL_IN_USE';
  mockedAuthService.register.mockRejectedValue(duplicatedEmailError);

  renderAtRoute(ROUTES.register);

  userEvent.type(screen.getByPlaceholderText('Nome completo'), 'Novo Usuario');
  userEvent.type(screen.getByPlaceholderText('E-mail'), 'novo@email.com');
  userEvent.type(screen.getByPlaceholderText('Password'), '123456');
  userEvent.click(screen.getByRole('button', { name: /criar minha conta/i }));

  expect(await screen.findByText(MESSAGES.auth.emailInUse)).toBeInTheDocument();
});

test('allows the user to register and access the authenticated feed', async () => {
  mockedAuthService.register.mockResolvedValue(createUser());

  renderAtRoute(ROUTES.register);

  userEvent.type(screen.getByPlaceholderText('Nome completo'), 'Novo Usuario');
  userEvent.type(screen.getByPlaceholderText('E-mail'), 'novo@email.com');
  userEvent.type(screen.getByPlaceholderText('Password'), '123456');
  userEvent.click(screen.getByRole('button', { name: /criar minha conta/i }));

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();
  expect(mockedAuthService.register).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(mockedFeedService.getFeedOverview).toHaveBeenCalledTimes(1);
  });
});

test('allows the authenticated user to log out from the feed', async () => {
  authenticateUser();

  renderAtRoute(ROUTES.feed);

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /sair/i }));

  expect(
    await screen.findByRole('heading', {
      level: 1,
      name: /a plataforma para você aprender com experts/i,
    }),
  ).toBeInTheDocument();
  expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).toBeNull();
});

test('shows the empty state when the feed has no posts', async () => {
  authenticateUser();
  mockedFeedService.getFeedOverview.mockResolvedValue({
    posts: [],
    ranking: [],
  });

  renderAtRoute(ROUTES.feed);

  expect(await screen.findByText('Feed vazio')).toBeInTheDocument();
  expect(screen.getByText(MESSAGES.feed.empty)).toBeInTheDocument();
});

test('shows an error state and retries feed loading', async () => {
  authenticateUser();

  mockedFeedService.getFeedOverview
    .mockRejectedValueOnce(new Error('network'))
    .mockResolvedValueOnce({
      posts: [createPost()],
      ranking: [createRankingEntry()],
    });

  renderAtRoute(ROUTES.feed);

  expect(await screen.findByText('Falha ao carregar o feed')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: MESSAGES.ui.retry }));

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();

  await waitFor(() => {
    expect(mockedFeedService.getFeedOverview).toHaveBeenCalledTimes(2);
  });
});

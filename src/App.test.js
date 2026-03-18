import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { MESSAGES } from './constants/messages';
import { STORAGE_KEYS } from './constants/storage';
import { ROUTES } from './routes/paths';
import { authService } from './services/auth';
import { feedService } from './services/feed';

jest.mock('./services/auth', () => ({
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  authService: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

jest.mock('./services/feed', () => ({
  feedService: {
    getPosts: jest.fn(),
    getRanking: jest.fn(),
  },
}));

const mockedAuthService = authService;
const mockedFeedService = feedService;

const createUser = () => ({
  id: 1,
  name: 'Pablo Henrique',
  email: 'pablo@email.com',
  avatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
  percentual: 92,
});

const createPost = () => ({
  id: 1,
  title: 'Projeto para curso de HTML e CSS',
  summary: 'Projeto focado em HTML semântico e composição de interface.',
  tags: ['HTML', 'CSS'],
  likes: 10,
  publishedAt: 'Há 8 minutos',
  authorName: 'Pablo Henrique',
  authorAvatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
});

const renderAtRoute = (route) => {
  window.history.pushState({}, 'Test page', route);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();

  mockedFeedService.getPosts.mockResolvedValue([createPost()]);
  mockedFeedService.getRanking.mockResolvedValue([
    {
      id: 1,
      nome: 'Pablo Henrique',
      image: 'https://avatars.githubusercontent.com/u/45184516?v=4',
      percentual: 92,
    },
  ]);
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
    expect(mockedFeedService.getPosts).toHaveBeenCalledTimes(1);
    expect(mockedFeedService.getRanking).toHaveBeenCalledTimes(1);
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

test('allows the authenticated user to log out from the feed', async () => {
  window.localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(createUser()));

  renderAtRoute(ROUTES.feed);

  expect(await screen.findByText('Projeto para curso de HTML e CSS')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /sair/i }));

  expect(await screen.findByText('Implemente')).toBeInTheDocument();
  expect(window.localStorage.getItem(STORAGE_KEYS.authUser)).toBeNull();
});

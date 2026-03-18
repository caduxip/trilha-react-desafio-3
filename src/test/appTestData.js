import { STORAGE_KEYS } from '../constants/storage';

// Estes helpers concentram dados fake recorrentes da suíte.
// Assim, quando o formato visual do app muda, os testes ajustam
// fixtures em um ponto único e evitam duplicação entre arquivos.
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

const createRankingEntry = () => ({
  id: 1,
  nome: 'Pablo Henrique',
  image: 'https://avatars.githubusercontent.com/u/45184516?v=4',
  percentual: 92,
});

const authenticateUser = () => {
  // Em testes de rota privada, este helper simula a sessão já persistida.
  window.localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(createUser()));
};

export { authenticateUser, createPost, createRankingEntry, createUser };

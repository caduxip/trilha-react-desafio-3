// Mapeadores do feed.
// Transformam o formato cru vindo da API em estruturas prontas para a UI.
const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/45184516?v=4';
const DEFAULT_AUTHOR_NAME = 'Usuário da comunidade';
const DEFAULT_PUBLISHED_AT = 'Agora';

// Cria um índice por id para buscar rapidamente o autor de cada post.
const createUsersById = (users) =>
  users.reduce((accumulator, user) => {
    accumulator[user.id] = user;
    return accumulator;
  }, {});

const toFeedPost = (post, usersById) => {
  const author = usersById[post.userId] ?? {};

  return {
    id: post.id,
    title: post.title,
    summary: post.summary,
    tags: post.tags ?? [],
    likes: post.likes ?? 0,
    publishedAt: post.publishedAt ?? DEFAULT_PUBLISHED_AT,
    authorName: author.name ?? DEFAULT_AUTHOR_NAME,
    authorAvatar: author.avatar ?? DEFAULT_AVATAR,
  };
};

const toRankingEntry = (user) => ({
  id: user.id,
  nome: user.name,
  image: user.avatar ?? DEFAULT_AVATAR,
  percentual: user.percentual ?? 0,
});

export { createUsersById, toFeedPost, toRankingEntry };

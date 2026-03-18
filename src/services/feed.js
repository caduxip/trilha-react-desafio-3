import { api } from './api';

const USERS_RESOURCE = '/users';
const POSTS_RESOURCE = '/posts';
const DEFAULT_AVATAR = 'https://avatars.githubusercontent.com/u/45184516?v=4';

const buildUserMap = (users) =>
  users.reduce((accumulator, user) => {
    accumulator[user.id] = user;
    return accumulator;
  }, {});

const normalizePost = (post, usersById) => {
  const author = usersById[post.userId] ?? {};

  return {
    id: post.id,
    title: post.title,
    summary: post.summary,
    tags: post.tags ?? [],
    likes: post.likes ?? 0,
    publishedAt: post.publishedAt ?? 'Agora',
    authorName: author.name ?? 'Usuário da comunidade',
    authorAvatar: author.avatar ?? DEFAULT_AVATAR,
  };
};

const feedService = {
  async getPosts() {
    const [{ data: posts }, { data: users }] = await Promise.all([
      api.get(POSTS_RESOURCE, {
        params: {
          _sort: 'id',
          _order: 'desc',
        },
      }),
      api.get(USERS_RESOURCE),
    ]);

    const usersById = buildUserMap(users);

    return posts.map((post) => normalizePost(post, usersById));
  },

  async getRanking() {
    const { data } = await api.get(USERS_RESOURCE, {
      params: {
        _sort: 'percentual',
        _order: 'desc',
        _limit: 5,
      },
    });

    return data.map((user) => ({
      id: user.id,
      nome: user.name,
      image: user.avatar ?? DEFAULT_AVATAR,
      percentual: user.percentual ?? 0,
    }));
  },
};

export { feedService };

// Serviço do feed.
// A página consome um objeto já pronto (`posts` + `ranking`) sem conhecer detalhes da API.
import { api } from '../../../services/api';
import { normalizeRequestError } from '../../../lib/http/errors';
import { createUsersById, toFeedPost, toRankingEntry } from './feed.mapper';

const USERS_RESOURCE = '/users';
const POSTS_RESOURCE = '/posts';

const feedService = {
  async getFeedOverview() {
    try {
      // Carregamos posts e usuários em paralelo para reduzir o tempo total.
      const [{ data: posts }, { data: users }] = await Promise.all([
        api.get(POSTS_RESOURCE, {
          params: {
            _sort: 'id',
            _order: 'desc',
          },
        }),
        api.get(USERS_RESOURCE, {
          params: {
            _sort: 'percentual',
            _order: 'desc',
          },
        }),
      ]);

      const usersById = createUsersById(users);

      // Com o ranking e os autores em mãos, devolvemos o domínio já normalizado.
      return {
        posts: posts.map((post) => toFeedPost(post, usersById)),
        ranking: users.slice(0, 5).map((user) => toRankingEntry(user)),
      };
    } catch (error) {
      throw normalizeRequestError(error, 'Falha ao carregar os dados do feed.');
    }
  },
};

export { feedService };

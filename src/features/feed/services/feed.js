import { api } from '../../../services/api';
import { normalizeRequestError } from '../../../lib/http/errors';
import { createUsersById, toFeedPost, toRankingEntry } from './feed.mapper';

const USERS_RESOURCE = '/users';
const POSTS_RESOURCE = '/posts';

const feedService = {
  async getFeedOverview() {
    try {
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

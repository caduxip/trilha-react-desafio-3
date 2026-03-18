import { APP_ERROR_CODES } from '../../../lib/http/errors';
import { api } from '../../../services/api';
import { feedService } from './feed';

jest.mock('../../../services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockedApi = api;

describe('feedService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns the normalized feed overview for the UI', async () => {
    mockedApi.get
      .mockResolvedValueOnce({
        data: [
          {
            id: 10,
            title: 'Projeto para curso de HTML e CSS',
            summary: 'Projeto focado em HTML semântico e composição de interface.',
            userId: 1,
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: 1,
            name: 'Pablo Henrique',
            percentual: 92,
          },
        ],
      });

    await expect(feedService.getFeedOverview()).resolves.toEqual({
      posts: [
        {
          id: 10,
          title: 'Projeto para curso de HTML e CSS',
          summary: 'Projeto focado em HTML semântico e composição de interface.',
          tags: [],
          likes: 0,
          publishedAt: 'Agora',
          authorName: 'Pablo Henrique',
          authorAvatar: 'https://avatars.githubusercontent.com/u/45184516?v=4',
        },
      ],
      ranking: [
        {
          id: 1,
          nome: 'Pablo Henrique',
          image: 'https://avatars.githubusercontent.com/u/45184516?v=4',
          percentual: 92,
        },
      ],
    });
  });

  test('normalizes request failures while loading the feed', async () => {
    mockedApi.get.mockRejectedValue({
      response: { status: 500 },
    });

    await expect(feedService.getFeedOverview()).rejects.toMatchObject({
      code: APP_ERROR_CODES.requestFailed,
      message: 'Falha ao carregar os dados do feed.',
    });
  });
});

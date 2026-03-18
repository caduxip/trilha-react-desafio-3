import { act, renderHook, waitFor } from '@testing-library/react';

import { feedService } from '../services/feed';
import { useFeed } from './useFeed';

jest.mock('../services/feed', () => ({
  feedService: {
    getFeedOverview: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const createDeferred = () => {
  let resolve;

  const promise = new Promise((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
};

test('carrega posts e ranking ao montar o hook', async () => {
  const deferredFeed = createDeferred();
  feedService.getFeedOverview.mockReturnValue(deferredFeed.promise);

  const { result } = renderHook(() => useFeed());

  await act(async () => {
    deferredFeed.resolve({
      posts: [{ id: 1, title: 'Projeto para curso de HTML e CSS' }],
      ranking: [{ id: 1, nome: 'Pablo Henrique', percentual: 92 }],
    });
    await deferredFeed.promise;
  });

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.posts).toHaveLength(1);
  expect(result.current.ranking).toHaveLength(1);
  expect(result.current.error).toBe('');
});

test('permite recarregar o feed via reloadFeed', async () => {
  const firstFeed = createDeferred();
  const secondFeed = createDeferred();

  feedService.getFeedOverview
    .mockReturnValueOnce(firstFeed.promise)
    .mockReturnValueOnce(secondFeed.promise);

  const { result } = renderHook(() => useFeed());

  await act(async () => {
    firstFeed.resolve({
      posts: [],
      ranking: [],
    });
    await firstFeed.promise;
  });

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  act(() => {
    result.current.reloadFeed();
  });

  await act(async () => {
    secondFeed.resolve({
      posts: [{ id: 1, title: 'Projeto para curso de HTML e CSS' }],
      ranking: [{ id: 1, nome: 'Pablo Henrique', percentual: 92 }],
    });
    await secondFeed.promise;
  });

  await waitFor(() => {
    expect(feedService.getFeedOverview).toHaveBeenCalledTimes(2);
  });
});

import { useCallback, useEffect, useState } from 'react';

import { MESSAGES } from '../../../constants/messages';
import { feedService } from '../services/feed';

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const reloadFeed = useCallback(() => {
    // O reloadKey é um gatilho simples para reexecutar o efeito de carregamento.
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadFeed = async () => {
      setIsLoading(true);
      setError('');

      try {
        const { posts: nextPosts, ranking: nextRanking } = await feedService.getFeedOverview();

        if (!isMounted) {
          return;
        }

        setPosts(nextPosts);
        setRanking(nextRanking);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(MESSAGES.feed.loadError);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFeed();

    return () => {
      // Evita atualização de estado quando a tela já saiu de cena.
      isMounted = false;
    };
  }, [reloadKey]);

  return {
    error,
    isLoading,
    posts,
    ranking,
    reloadFeed,
  };
};

export { useFeed };

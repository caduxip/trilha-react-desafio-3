import { useCallback, useEffect, useRef, useState } from 'react';

import { MESSAGES } from '../../../constants/messages';
import { feedService } from '../services/feed';

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  // Estes refs evitam que uma resposta antiga sobrescreva um reload mais novo.
  const isMountedRef = useRef(true);
  const latestRequestRef = useRef(0);

  const reloadFeed = useCallback(() => {
    // O reloadKey é um gatilho simples para reexecutar o efeito de carregamento.
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    return () => {
      // Mantém uma referência estável para impedir updates depois do unmount.
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const loadFeed = async () => {
      // Cada carregamento recebe um id. Só a chamada mais recente
      // pode alterar o estado final do hook.
      const requestId = latestRequestRef.current + 1;

      latestRequestRef.current = requestId;
      setIsLoading(true);
      setError('');

      try {
        const { posts: nextPosts, ranking: nextRanking } = await feedService.getFeedOverview();

        if (!isMountedRef.current || latestRequestRef.current !== requestId) {
          return;
        }

        setPosts(nextPosts);
        setRanking(nextRanking);
      } catch (loadError) {
        if (!isMountedRef.current || latestRequestRef.current !== requestId) {
          return;
        }

        setError(MESSAGES.feed.loadError);
      } finally {
        if (isMountedRef.current && latestRequestRef.current === requestId) {
          setIsLoading(false);
        }
      }
    };

    loadFeed();
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

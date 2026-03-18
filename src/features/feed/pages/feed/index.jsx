import React, { useEffect, useState } from 'react';

import { AsyncState } from '../../../../components/AsyncState';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { UserInfo } from '../../../../components/UserInfo';
import { Header } from '../../../../components/Header';
import { MESSAGES } from '../../../../constants/messages';
import { feedService } from '../../services/feed';

import {
  Container,
  Column,
  SectionHeader,
  Title,
  TitleHighlight,
} from './styles';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

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
      isMounted = false;
    };
  }, [reloadKey]);

  return (
    <>
      <Header />
      <Container>
        <Column as="section" aria-labelledby="feed-title" flex={3}>
          <SectionHeader>
            <Title id="feed-title">Feed</Title>
            {!isLoading && !error ? (
              <Button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                title="Atualizar"
              />
            ) : null}
          </SectionHeader>

          {isLoading ? <AsyncState title="Carregando feed" description={MESSAGES.feed.loading} /> : null}

          {!isLoading && error ? (
            <AsyncState
              title="Falha ao carregar o feed"
              description={error}
              actionLabel={MESSAGES.ui.retry}
              onAction={() => setReloadKey((current) => current + 1)}
            />
          ) : null}

          {!isLoading && !error && !posts.length ? (
            <AsyncState title="Feed vazio" description={MESSAGES.feed.empty} />
          ) : null}

          {!isLoading && !error ? posts.map((post) => <Card key={post.id} post={post} />) : null}
        </Column>

        <Column as="aside" aria-labelledby="ranking-title" flex={1}>
          <TitleHighlight id="ranking-title"># RANKING 5 TOP DA SEMANA</TitleHighlight>
          {ranking.map((user) => (
            <UserInfo
              key={user.id}
              avatar={user.image}
              name={user.nome}
              percentage={user.percentual}
            />
          ))}
        </Column>
      </Container>
    </>
  );
};

export { Feed };

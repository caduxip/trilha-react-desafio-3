import React, { useEffect, useState } from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { UserInfo } from '../../../../components/UserInfo';
import { Header } from '../../../../components/Header';
import { MESSAGES } from '../../../../constants/messages';
import { feedService } from '../../services/feed';

import {
  Container,
  Column,
  EmptyText,
  SectionHeader,
  StatusCard,
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
        const [nextPosts, nextRanking] = await Promise.all([
          feedService.getPosts(),
          feedService.getRanking(),
        ]);

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
        <Column flex={3}>
          <SectionHeader>
            <Title>Feed</Title>
            {!isLoading && !error ? (
              <Button
                type="button"
                onClick={() => setReloadKey((current) => current + 1)}
                title="Atualizar"
              />
            ) : null}
          </SectionHeader>

          {isLoading ? <StatusCard>{MESSAGES.feed.loading}</StatusCard> : null}

          {!isLoading && error ? (
            <StatusCard>
              <p>{error}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setReloadKey((current) => current + 1)}
                title="Tentar novamente"
              />
            </StatusCard>
          ) : null}

          {!isLoading && !error && !posts.length ? (
            <StatusCard>
              <EmptyText>{MESSAGES.feed.empty}</EmptyText>
            </StatusCard>
          ) : null}

          {!isLoading && !error ? posts.map((post) => <Card key={post.id} post={post} />) : null}
        </Column>

        <Column flex={1}>
          <TitleHighlight># RANKING 5 TOP DA SEMANA</TitleHighlight>
          {ranking.map((user) => (
            <UserInfo
              key={user.id}
              nome={user.nome}
              image={user.image}
              percentual={user.percentual}
            />
          ))}
        </Column>
      </Container>
    </>
  );
};

export { Feed };

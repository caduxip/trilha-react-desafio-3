// Página autenticada principal.
// O hook da feature busca os dados; a página fica focada em composição visual.
import React from 'react';

import { AsyncState } from '../../../../components/AsyncState';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { UserInfo } from '../../../../components/UserInfo';
import { Header } from '../../../../components/Header';
import { MESSAGES } from '../../../../constants/messages';
import { useFeed } from '../../hooks/useFeed';

import { Container, Column, SectionHeader, Title, TitleHighlight } from './styles';

const Feed = () => {
  // O hook centraliza o carregamento, o erro e o retry.
  const { error, isLoading, posts, ranking, reloadFeed } = useFeed();

  return (
    <>
      <Header />
      {/* O feed representa a área principal da rota autenticada. */}
      <Container as="main" id="page-content">
        <Column as="section" aria-labelledby="feed-title" flex={3}>
          <SectionHeader>
            <Title id="feed-title">Feed</Title>
            {!isLoading && !error ? (
              <Button
                type="button"
                // O botão delega o retry ao hook da feature.
                onClick={reloadFeed}
                title="Atualizar"
              />
            ) : null}
          </SectionHeader>

          {isLoading ? (
            <AsyncState title="Carregando feed" description={MESSAGES.feed.loading} />
          ) : null}

          {!isLoading && error ? (
            <AsyncState
              title="Falha ao carregar o feed"
              description={error}
              actionLabel={MESSAGES.ui.retry}
              onAction={reloadFeed}
            />
          ) : null}

          {!isLoading && !error && !posts.length ? (
            <AsyncState title="Feed vazio" description={MESSAGES.feed.empty} />
          ) : null}

          {!isLoading && !error ? posts.map((post) => <Card key={post.id} post={post} />) : null}
        </Column>

        <Column as="aside" aria-labelledby="ranking-title" flex={1}>
          <TitleHighlight id="ranking-title"># RANKING 5 TOP DA SEMANA</TitleHighlight>
          {/* O ranking já chega ordenado pelo serviço; aqui a tela só apresenta os dados. */}
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
